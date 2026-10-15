#!/usr/bin/env python3
"""Gera ui/nexo-escuro.css a partir dos estilos do index.html e do temas/temas-ricos.js.

Para cada regra CSS, troca as cores claras de fundo por tons escuros e as cores
escuras de texto por tons claros, preservando o matiz. Todas as regras geradas
ficam sob html[data-theme="dark"], então o tema claro não muda.
Rode de novo sempre que mudar cores no index.html:  python3 tools/gerar-tema-escuro.py
Ajustes finos ficam em ui/nexo-ui.css (seção "Tema escuro — ajustes manuais").
"""
import re, colorsys, os, sys
# matiz e saturação dos fundos escuros (padrão: carvão neutro). Uso opcional: --matiz 0.54 --sat 0.37 --saida arquivo.css
ARGS = dict(zip(sys.argv[1::2], sys.argv[2::2]))
MATIZ = float(ARGS.get("--matiz", 0.66)); SAT = float(ARGS.get("--sat", 0.04))
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = ':where(html[data-theme="dark"])'  # :where() não aumenta a especificidade: estados (:hover, .active) continuam valendo

def css_do_index():
    s = open(os.path.join(RAIZ, 'index.html'), encoding='utf-8').read()
    blocos = re.findall(r'<style[^>]*>(.*?)</style>', s, re.S)
    return '\n'.join(blocos)

def css_dos_temas():
    s = open(os.path.join(RAIZ, 'temas', 'temas-ricos.js'), encoding='utf-8').read()
    partes = re.findall(r"'((?:[^'\\]|\\.)*)'", s)
    return '\n'.join(p for p in partes if '{' in p and ':' in p and '}' in p)

HEX = re.compile(r'#([0-9a-fA-F]{3,8})\b')
RGBA = re.compile(r'rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)')

def parse_hex(h):
    h = h.lstrip('#')
    if len(h) in (3, 4): h = ''.join(c*2 for c in h)
    r, g, b = (int(h[i:i+2], 16)/255 for i in (0, 2, 4))
    a = int(h[6:8], 16)/255 if len(h) == 8 else None
    return r, g, b, a

def lum(r, g, b):
    return 0.2126*r + 0.7152*g + 0.0722*b

def to_hex(r, g, b, a=None):
    s = '#%02x%02x%02x' % tuple(max(0, min(255, round(v*255))) for v in (r, g, b))
    return s + ('%02x' % round(a*255) if a is not None else '')

def mapear(r, g, b, papel):
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    L = lum(r, g, b)
    neutro = s < 0.08
    if papel == 'fundo':
        if L < 0.55: return None
        nl = 0.105 + (1 - L) * 0.85
        if max(r, g, b) - min(r, g, b) < 0.12: h, s, nl = MATIZ, SAT, 0.125 + (1 - L) * 0.9  # tons claros pálidos viram a superfície da paleta
        ns = min(s, 0.32) * (0.75 if s > 0.2 else 1)
        # fundos com matiz forte (avisos, badges) ficam um pouco mais claros e saturados
        if s > 0.45: nl, ns = 0.17 + (1-L)*0.5, min(s, 0.55)
    elif papel == 'texto':
        if L > 0.55: return None
        nl = 0.93 - L * 0.55
        ns = min(s, 0.55)
    else:  # borda
        if L < 0.55: return None
        if max(r, g, b) - min(r, g, b) < 0.12: h, s = MATIZ, SAT * 0.7
        nl = 0.20 + (1 - L) * 0.6
        ns = min(s, 0.25)
    nl = max(0, min(1, nl))
    return colorsys.hls_to_rgb(h, nl, ns)

def papel_da_prop(prop, valor_var=None):
    p = prop.strip().lower()
    if p.startswith('--'):
        n = p
        if any(k in n for k in ('line', 'border')): return 'borda'
        if any(k in n for k in ('text', 'ink', 'muted')): return 'texto'
        if any(k in n for k in ('bg', 'panel', 'surface', 'paper')): return 'fundo'
        return None
    if p in ('background', 'background-color', 'background-image'): return 'fundo'
    if p in ('color', 'fill', 'caret-color', 'text-decoration-color', '-webkit-text-fill-color'): return 'texto'
    if p.startswith('border') or p.startswith('outline') or p in ('box-shadow', 'stroke'): return 'borda'
    return None

def converter_valor(valor, papel):
    mudou = False
    def troca_hex(m):
        nonlocal mudou
        r, g, b, a = parse_hex(m.group(0))
        novo = mapear(r, g, b, papel)
        if novo is None: return m.group(0)
        mudou = True
        return to_hex(*novo, a)
    def troca_rgba(m):
        nonlocal mudou
        r, g, b = (float(m.group(i))/255 for i in (1, 2, 3))
        a = m.group(4)
        novo = mapear(r, g, b, papel)
        if novo is None: return m.group(0)
        mudou = True
        rr, gg, bb = (round(v*255) for v in novo)
        return f'rgba({rr},{gg},{bb},{a})' if a is not None else f'rgb({rr},{gg},{bb})'
    v = HEX.sub(troca_hex, valor)
    v = RGBA.sub(troca_rgba, v)
    if papel == 'fundo' and re.search(r'\b(white|#fff)\b', v):
        v = re.sub(r'\bwhite\b', '#16262a', v); mudou = True
    if papel == 'texto' and re.search(r'\bblack\b', v):
        v = re.sub(r'\bblack\b', '#e6efec', v); mudou = True
    return v, mudou

def prefixar(seletor, forte=False):
    pre = 'html[data-theme="dark"]' if forte else P
    out = []
    for s in seletor.split(','):
        s = s.strip()
        if not s: continue
        if s.startswith(':root'): out.append('html[data-theme="dark"]' + s[5:])
        elif s.startswith('html'): out.append('html[data-theme="dark"]' + s[4:])
        elif s.startswith('body'): out.append(pre + ' ' + s)
        else: out.append(pre + ' ' + s)
    return ',\n'.join(out)

def regras(css):
    """Divide CSS em (prelúdio, corpo) respeitando chaves aninhadas."""
    i, n, res = 0, len(css), []
    while i < n:
        j = css.find('{', i)
        if j < 0: break
        prel = css[i:j].strip()
        prof, k = 1, j+1
        while k < n and prof:
            if css[k] == '{': prof += 1
            elif css[k] == '}': prof -= 1
            k += 1
        res.append((prel, css[j+1:k-1]))
        i = k
    return res

IGNORAR = re.compile(r'primary-cta|landing|product-preview|preview-|feature-|hero-art|banner-art|art-orbit|study-sheet|sheet-|dashboard-banner|banner-|brand-mark|^aside|\baside\b|\.brand\b|\.search\b|\.nav\b|folder-|sidebar|module-nav|primary-nav|nav-empty|\.sec\b|mobile-nav|@keyframes|^@font-face|^@import')

def processar(css, forte=False):
    saida = []
    for prel, corpo in regras(css):
        prel = re.sub(r'/\*.*?\*/', '', prel, flags=re.S).strip()
        if prel.startswith('@media') or prel.startswith('@supports'):
            inner = processar(corpo, forte)
            if inner: saida.append(prel + '{\n' + inner + '\n}')
            continue
        if prel.startswith('@') or not prel: continue
        seletores = [s for s in prel.split(',') if not IGNORAR.search(s.strip())]
        if not seletores: continue
        decls = []
        for d in re.split(r';(?![^(]*\))', corpo):
            if ':' not in d: continue
            prop, valor = d.split(':', 1)
            if 'var(' in valor: continue  # cores via variáveis já mudam pelo :root escuro
            papel = papel_da_prop(prop)
            if not papel: continue
            novo, mudou = converter_valor(valor, papel)
            if mudou: decls.append(f'{prop.strip()}:{novo.strip()}')
        if decls:
            saida.append(prefixar(','.join(seletores), forte) + '{' + ';'.join(decls) + '}')
    return '\n'.join(saida)

# o CSS dos temas é injetado depois, em tempo de execução; por isso usa o prefixo mais forte
css = processar(css_do_index()) + '\n' + processar(css_dos_temas(), True)
cab = '/* GERADO por tools/gerar-tema-escuro.py — não edite à mão. Ajustes manuais: ui/nexo-ui.css */\n'
open(ARGS.get('--saida', os.path.join(RAIZ, 'ui', 'nexo-escuro.css')), 'w', encoding='utf-8').write(cab + css + '\n')
print('ui/nexo-escuro.css:', css.count('{'), 'regras')
