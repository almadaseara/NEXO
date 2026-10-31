#!/usr/bin/env python3
"""Converte o PDF do Planalto em texto tratando o texto TACHADO do texto compilado.

No texto compilado do Planalto, o que foi tachado é:
  (a) redação antiga já substituída (ex.: Art. 20 da Lei 8.112 aparece 3 vezes)  -> descartada;
  (b) dispositivo revogado ("(Revogado pela ...)") -> fica só o rótulo + a nota "(Revogado ...)";
  (c) dispositivo com execução suspensa pelo Senado ("(Execução suspensa pela RSF ...)") -> fica inteiro.
O pdftotext perde o tachado e mistura tudo; aqui os traços finos horizontais sobre as letras são detectados.

Uso:  python3 tools/pdf-sem-tachado.py arquivo.pdf saida.txt
Depois: python3 tools/vade-extrair.py saida.txt <id> "<nome>" "<prefixo>" <url> ["<ementa>"]
"""
import sys, re, pdfplumber

ROTULO = re.compile(r'^\s*(A?rt\.\s*\d+[ºo°]?(?:-[A-Z]+)?\.?|§\s*\d+[ºo°]?(?:-[A-Z]+)?|Parágrafo único\.?|[IVXLC]+(?:-[A-Z])?\s*[-–]|[a-z]\))')
src, dst = sys.argv[1], sys.argv[2]
saida = []
st = {'tachados': 0, 'mantidos_rev': 0, 'mantidos_susp': 0, 'descartados': 0}

def agrupa_linhas(chars):
    """Agrupa caracteres por linha (o expoente 'º' fica um pouco mais alto e não pode virar outra linha)."""
    out = {}; n = -1; ref = None
    for c in sorted(chars, key=lambda c: (c['top'] + c['bottom']) / 2):
        meio = (c['top'] + c['bottom']) / 2
        if ref is None or meio - ref > 4.5: n += 1; ref = meio
        out.setdefault(n, []).append(c)
    return out

def chave(c): return (round(c['x0'], 1), round(c['top'], 1), c['text'])

with pdfplumber.open(src) as pdf:
    for pg in pdf.pages:
        riscos = [r for r in pg.rects if (r['bottom'] - r['top']) < 1.3 and (r['x1'] - r['x0']) > 1.5]
        def risca(c):
            h = c['bottom'] - c['top']
            if h <= 0: return False
            for r in riscos:
                meio = (r['top'] + r['bottom']) / 2
                if c['top'] + 0.30 * h <= meio <= c['bottom'] - 0.30 * h and r['x0'] - 0.5 <= (c['x0'] + c['x1']) / 2 <= r['x1'] + 0.5:
                    return True
            return False
        tach = [c for c in pg.chars if risca(c)]
        st['tachados'] += len(tach)
        # linhas tachadas, de cima para baixo
        linhas = agrupa_linhas(tach)
        grupos = []
        for k in sorted(linhas):
            cs = sorted(linhas[k], key=lambda c: c['x0'])
            s = ''.join(c['text'] for c in cs)
            if ROTULO.match(s) or not grupos: grupos.append(list(cs))
            else: grupos[-1].extend(cs)
        manter = set()
        todas = agrupa_linhas(pg.chars)
        chaves = sorted(todas)
        def linha_de(c):
            for k, cs in todas.items():
                if c in cs: return k
        def nao_tachado(k): return ''.join(c['text'] for c in sorted(todas.get(k, []), key=lambda c: c['x0']) if not risca(c))
        for g in grupos:
            s = ''.join(c['text'] for c in g)
            k_ult = linha_de(g[-1])
            # nota que vem depois do trecho tachado (muitas vezes a nota NÃO está tachada)
            post = nao_tachado(k_ult)
            i = chaves.index(k_ult) if k_ult in chaves else -1
            if i >= 0 and i + 1 < len(chaves):
                prox = nao_tachado(chaves[i + 1])
                if prox.strip() and not ROTULO.match(prox): post += ' ' + prox
            tudo = s + ' ' + post
            m = ROTULO.match(s)
            if re.search(r'Execução suspensa', tudo):
                for c in g: manter.add(chave(c))
                st['mantidos_susp'] += 1
            elif re.search(r'Revogad', tudo):
                if m:
                    ini_nota = s.rfind('(Revogad')
                    for c in g[:m.end()]: manter.add(chave(c))
                    if ini_nota >= 0:
                        for c in g[ini_nota:]: manter.add(chave(c))
                    st['mantidos_rev'] += 1
                else: st['descartados'] += 1
            else: st['descartados'] += 1
        def filtro(o):
            if o.get('object_type') != 'char': return True
            return (not risca(o)) or chave(o) in manter
        txt = pg.filter(filtro).extract_text(layout=True) or ''
        saida.append('\n'.join(l.rstrip() for l in txt.split('\n')))
open(dst, 'w', encoding='utf8').write('\n'.join(saida))
print(st)
