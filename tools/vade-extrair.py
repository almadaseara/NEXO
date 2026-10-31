#!/usr/bin/env python3
"""Converte o PDF/HTML compilado de uma lei (salvo do Planalto) em data/vade/<id>.js para o Vade Mecum.

Uso:  python3 tools/vade-extrair.py <arquivo.pdf|.txt> <id> "<nome curto>" "<prefixo usado nos temas>" <url-oficial>
Ex.:  python3 tools/vade-extrair.py L8429compilada.pdf l8429 "Lei 8.429/1992 — Improbidade administrativa" "Lei 8.429/1992" https://www.planalto.gov.br/ccivil_03/leis/l8429compilada.htm

- Não altera o texto da lei: apenas separa caput, parágrafos, incisos e alíneas e guarda as notas de
  alteração ("Redação dada pela Lei...", "Vide ADI...") à parte, para o modo leitura poder escondê-las.
- Revise o resultado e rode `node tools/validar-vade.js`.
"""
import sys, re, json, subprocess, os, datetime

if len(sys.argv) < 6:
    print(__doc__); sys.exit(1)
src, lid, nome, prefixo, url = sys.argv[1:6]

if src.lower().endswith('.pdf'):
    txt = subprocess.run(['pdftotext', '-layout', src, '-'], capture_output=True, text=True, check=True).stdout
else:
    txt = open(src, encoding='utf8').read()

NOTA = re.compile(r'\s*\((?:Redação dada|Incluíd[oa]|Revogad[oa]|Vide|Vigência|Regulamento|VETADO|Renumerad[oa]|Promulgação|Produção de efeito)[^()]*\)\s*,?', re.I)

# --- limpeza de cabeçalhos e rodapés de impressão
linhas = []
for l in txt.split('\n'):
    s = l.strip()
    if not s: linhas.append(('', 0)); continue
    if re.match(r'^\d{2}/\d{2}/\d{4},\s*\d', s): continue
    if 'planalto.gov.br' in s and re.search(r'\d+/\d+\s*$', s): continue
    if s.startswith('http') and re.search(r'\d+/\d+\s*$', s): continue
    linhas.append((s, len(l) - len(l.lstrip())))

# --- início do texto: depois de "Faço saber..." / antes disso fica o preâmbulo
ini = 0
for i, (s, _) in enumerate(linhas):
    if re.search(r'decreta e eu sanciono|O PRESIDENTE DA REPÚBLICA', s): ini = i + 1
cab = [s for s, _ in linhas[:ini] if s]
titulo_lei = next((s for s in cab if re.match(r'^(LEI|DECRETO|CÓDIGO|CONSTITUIÇÃO|EMENDA)', s)), nome)
ementa = ''
for i, (s, ind) in enumerate(linhas[:ini]):
    if re.match(r'^LEI', s):
        partes = []
        for s2, ind2 in linhas[i + 1:ini]:
            if not s2:
                if partes: break
                continue
            if re.match(r'^O PRESIDENTE', s2): break
            partes.append(s2)
        ementa = NOTA.sub('', ' '.join(partes)).strip()
        break

itens = []   # sequência: títulos de capítulo/seção e artigos
art = None
bloco = None  # [tipo, rotulo, texto]
cap = None

def fecha_bloco():
    global bloco
    if not bloco or art is None: bloco = None; return
    tipo, rot, t = bloco
    t = re.sub(r'\s+', ' ', t).strip()
    notas = [re.sub(r'\s+', ' ', n).strip(' ,()') for n in NOTA.findall(t)]
    notas = ['(' + n + ')' if not n.startswith('(') else n for n in [re.sub(r'\s+', ' ', m.group(0)).strip(' ,') for m in NOTA.finditer(t)]]
    limpo = NOTA.sub(' ', t).strip()
    limpo = re.sub(r'\s+', ' ', limpo).strip(' ,')
    if limpo.count('(') > limpo.count(')'): limpo += ')'
    it = {'k': tipo, 'r': rot, 't': limpo}
    if notas: it['n'] = notas
    if re.fullmatch(r'\(?(Revogad[oa]|VETADO)\)?\.?', limpo, re.I) or (re.fullmatch(r'[\s.;,:]*', limpo) and any('revogad' in n.lower() or 'vetado' in n.lower() for n in notas)):
        it['rev'] = 1
        it['t'] = ''
    art['p'].append(it)
    bloco = None

def fecha_art():
    global art
    fecha_bloco()
    if art: itens.append(art); art = None

esperando_sub = None
fim = False
for idx in range(ini, len(linhas)):
    s, ind = linhas[idx]
    if not s: continue
    if re.match(r'^(Brasília|Rio de Janeiro|Este texto não substitui|\*$)', s) and ind < 30 and 'Art.' not in s and itens:
        fecha_art(); break
    if esperando_sub is not None and not re.match(r'^(Art\.|Seção|SEÇÃO|Subseção|SUBSEÇÃO|CAPÍTULO|TÍTULO)', s, re.I):
        esperando_sub['s'] = (esperando_sub['s'] + ' ' + s).strip(); continue
    if ind > 14:  # título centralizado
        if re.match(r'^(CAPÍTULO|TÍTULO|LIVRO|PARTE)\b', s, re.I):
            fecha_art(); cap = {'k': 'cap', 't': s, 's': ''}; itens.append(cap); esperando_sub = cap; continue
        if re.match(r'^(Seção|SEÇÃO|Subseção|SUBSEÇÃO)\b', s):
            fecha_art(); sec = {'k': 'sec', 't': s, 's': ''}; itens.append(sec); esperando_sub = sec; continue
        if esperando_sub is not None:
            esperando_sub['s'] = (esperando_sub['s'] + ' ' + s).strip(); continue
        continue
    esperando_sub = None
    m = re.match(r'^Art\.\s*(\d+)\s*[º°o]?\s*(?:-\s*([A-Z]{1,2}))?\s*[.\-–]?\s*(.*)$', s)
    if m and not re.match(r'^Art\.\s*\d+[º°]?\s+(desta|da|do)\b', s):
        fecha_art()
        num = m.group(1) + (('-' + m.group(2)) if m.group(2) else '')
        disp = m.group(1) + ('º' if int(m.group(1)) < 10 else '') + (('-' + m.group(2)) if m.group(2) else '')
        art = {'k': 'art', 'n': disp, 'id': 'a' + num.replace('-', ''), 'p': []}
        bloco = ['cx', '', m.group(3)]
        continue
    if art is None: continue
    m = re.match(r'^§\s*(\d+)\s*[º°o]?\s*(?:-\s*([A-Z]))?\s*[.\-–]?\s*(.*)$', s)
    if m:
        fecha_bloco(); rot = '§ ' + m.group(1) + ('º' if int(m.group(1)) < 10 else '') + (('-' + m.group(2)) if m.group(2) else '')
        bloco = ['par', rot, m.group(3)]; continue
    m = re.match(r'^Parágrafo único\.?\s*(.*)$', s)
    if m:
        fecha_bloco(); bloco = ['par', 'Parágrafo único', m.group(1)]; continue
    m = re.match(r'^([IVXLC]+)(?:-([A-Z]))?\s*[-–]\s*(.*)$', s)
    if m and bloco is not None:
        fecha_bloco(); bloco = ['inc', m.group(1) + (('-' + m.group(2)) if m.group(2) else ''), m.group(3)]; continue
    m = re.match(r'^([a-z])\)\s*(.*)$', s)
    if m and bloco is not None:
        fecha_bloco(); bloco = ['ali', m.group(1) + ')', m.group(2)]; continue
    if bloco is not None:
        bloco[2] += ' ' + s
fecha_art()

# o primeiro bloco de cada artigo é o caput
for a in itens:
    if a['k'] == 'art' and a['p']:
        a['p'][0]['k'] = 'cap'

lei = {
    'id': lid, 'nome': nome, 'prefixo': prefixo, 'titulo': titulo_lei, 'ementa': ementa, 'fonte': url,
    'extraido': datetime.date.today().isoformat(),
    'itens': itens,
}
os.makedirs('data/vade', exist_ok=True)
saida = 'data/vade/%s.js' % lid
with open(saida, 'w', encoding='utf8') as f:
    f.write('/* Vade Mecum — %s. Texto compilado conferido no Planalto (arquivo salvo em %s). Gerado por tools/vade-extrair.py */\n' % (nome, lei['extraido']))
    f.write('(window.NEXO_VADE = window.NEXO_VADE || {})["%s"] = ' % lid)
    f.write(json.dumps(lei, ensure_ascii=False, separators=(',', ':')))
    f.write(';\n')
na = sum(1 for a in itens if a['k'] == 'art')
print('%s: %d artigos, %d títulos, %d bytes' % (saida, na, len(itens) - na, os.path.getsize(saida)))
