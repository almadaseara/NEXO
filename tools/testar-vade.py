#!/usr/bin/env python3
"""Testa o Vade Mecum num navegador sem tela (celular e computador).

Uso (na raiz do repositório):   python3 tools/testar-vade.py [--fotos pasta]
Confere: menu, lista de leis, carregamento, busca por artigo e por palavra, modo leitura,
julgados/cards fechados até clicar, grifar ao selecionar (popup) e botão mostra/oculta, sem rolagem horizontal.
Falha (código 1) se algo não bater.
"""
import asyncio, functools, http.server, socketserver, sys, threading, os, json
from playwright.async_api import async_playwright

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOTOS = sys.argv[sys.argv.index('--fotos') + 1] if '--fotos' in sys.argv else None
PORTA = 0

def servidor():
    class Quieto(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    global PORTA
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("127.0.0.1", 0), functools.partial(Quieto, directory=RAIZ))
    PORTA = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv

falhas = 0
def conf(nome, cond, extra=''):
    global falhas
    if not cond: falhas += 1
    print('✓' if cond else '✗', nome, extra if not cond else '')

async def cenario(p, largura, altura, nome):
    b = await p.chromium.launch()
    pg = await b.new_page(viewport={'width': largura, 'height': altura})
    erros = []
    pg.on('pageerror', lambda e: erros.append(str(e)))
    await pg.goto(f'http://127.0.0.1:{PORTA}/index.html')
    await pg.wait_for_timeout(1500)
    await pg.evaluate("() => { try { localStorage.clear(); } catch (e) {} document.body.classList.remove('logged-out'); }")  # sem login (Supabase offline) o app esconde a área principal
    print('---', nome)
    conf('botão no menu', await pg.evaluate("() => !!document.querySelector('#nav .nx-vade-nav')"))
    await pg.evaluate("() => nexoVade()")
    conf('lista de leis', await pg.evaluate("() => document.querySelectorAll('.vd-lei').length") >= 1)
    await pg.evaluate("() => nexoVade('l8429')")
    await pg.wait_for_selector('#vd-a17')
    n = await pg.evaluate("() => document.querySelectorAll('.vd-art').length")
    conf('35 artigos', n == 35, n)
    conf('julgados/cards fechados', await pg.evaluate("() => document.querySelectorAll('.vd-pane').length + document.querySelectorAll('.vd-j').length") == 0)
    conf('dica de grifar visível e sem grifos ainda', await pg.evaluate("() => !!document.querySelector('.vd-dica') && document.querySelectorAll('.vd-m').length == 0"))
    conf('botões de julgados no art. 23', await pg.evaluate("() => !!document.querySelector('#vd-a23 [data-pane=juris]')"))
    # abrir julgados só ao clicar
    await pg.click('#vd-a23 [data-pane=juris]')
    conf('painel de julgados abre', await pg.evaluate("() => document.querySelectorAll('#vd-a23 .vd-j').length") >= 1)
    conf('texto do julgado ainda fechado', await pg.evaluate("() => document.querySelectorAll('#vd-a23 .vd-jb').length") == 0)
    await pg.click('#vd-a23 .vd-jh')
    conf('julgado abre ao clicar', await pg.evaluate("() => document.querySelectorAll('#vd-a23 .vd-jb').length") == 1)
    await pg.click('#vd-a17 [data-pane=cards]')
    conf('cards abrem ao clicar', await pg.evaluate("() => document.querySelectorAll('#vd-a17 .vd-card').length") >= 1)
    conf('card começa na pergunta', await pg.evaluate("() => !document.querySelector('#vd-a17 .vd-card.vira')"))
    await pg.click('#vd-a17 .vd-card')
    conf('card vira ao clicar', await pg.evaluate("() => !!document.querySelector('#vd-a17 .vd-card.vira')"))
    if FOTOS: await pg.screenshot(path=os.path.join(FOTOS, f'{nome}-lei.png'))
    # busca
    await pg.fill('#vd-busca', '17-B')
    r = await pg.evaluate("() => [...document.querySelectorAll('.vd-art')].map(a => a.id)")
    conf('busca por artigo 17-B', r == ['vd-a17B'], r)
    await pg.fill('#vd-busca', 'art 12')
    r = await pg.evaluate("() => [...document.querySelectorAll('.vd-art')].map(a => a.id)")
    conf('busca “art 12”', r == ['vd-a12'], r)
    await pg.fill('#vd-busca', 'homologação judicial')
    r = await pg.evaluate("() => ({n: document.querySelectorAll('.vd-art').length, m: document.querySelectorAll('.vd-busca').length})")
    conf('busca por palavra', r['n'] >= 1 and r['m'] >= 1, r)
    await pg.fill('#vd-busca', 'zzzxxx')
    conf('busca sem resultado', await pg.evaluate("() => !!document.querySelector('.vd-vazio')"))
    await pg.fill('#vd-busca', '')
    conf('busca limpa volta tudo', await pg.evaluate("() => document.querySelectorAll('.vd-art').length") == 35)
    # modo leitura
    await pg.click('[data-vd=leitura]')
    r = await pg.evaluate("() => ({ac: getComputedStyle(document.querySelector('.vd-acoes')).display, alt: getComputedStyle(document.querySelector('.vd-vide')).display, rev: getComputedStyle(document.querySelector('.vd-rev')).display})")
    conf('modo leitura esconde botões, notas de alteração e revogados', r == {'ac': 'none', 'alt': 'none', 'rev': 'none'}, r)
    if FOTOS: await pg.screenshot(path=os.path.join(FOTOS, f'{nome}-leitura.png'))
    await pg.click('[data-vd=leitura]')
    # ocultar revogados
    antes = await pg.evaluate("() => [...document.querySelectorAll('.vd-rev,.vd-artrev,.vd-titrev')].filter(e => e.offsetParent !== null).length")
    await pg.click('[data-vd=semrev]')
    depois = await pg.evaluate("() => [...document.querySelectorAll('.vd-rev,.vd-artrev,.vd-titrev')].filter(e => e.offsetParent !== null).length")
    conf('ocultar revogados esconde dispositivos, artigos e títulos', antes > 0 and depois == 0, (antes, depois))
    await pg.click('[data-vd=semrev]')
    conf('revogados voltam ao desligar', await pg.evaluate("() => document.querySelector('#vd-a4').offsetParent !== null"))
    # grifos e notas
    await pg.click('[data-vd=grifos]'); await pg.click('[data-vd=grifos]')  # desliga e liga: o grifo vale sem modo prévio
    conf('botão de nota aparece com grifos visíveis', await pg.evaluate("() => !!document.querySelector('#vd-a1 [data-vd=nota]')"))
    await pg.evaluate("""() => {
      const pt = document.querySelector('#vd-a2 .vd-pt'); pt.scrollIntoView({block:'center'}); const w = pt.firstChild;
      const r = document.createRange(); r.setStart(w, 0); r.setEnd(w, 30);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    }""")
    await pg.wait_for_selector('.vd-pop', timeout=3000)
    await pg.click('.vd-pop .vd-d-vd')
    r = await pg.evaluate("() => ({m: document.querySelectorAll('#vd-a2 .vd-m').length, t: document.querySelector('#vd-a2 .vd-m').textContent, salvo: JSON.parse(localStorage.getItem('nexo_vade_marcas_v1')).l8429.length})")
    conf('grifo criado e salvo', r['m'] == 1 and r['salvo'] == 1 and len(r['t']) >= 20, r)
    await pg.click('[data-vd=grifos]')
    conf('grifos somem ao desligar', await pg.evaluate("() => document.querySelectorAll('.vd-m').length") == 0)
    await pg.click('[data-vd=grifos]')
    conf('grifos voltam ao ligar', await pg.evaluate("() => document.querySelectorAll('#vd-a2 .vd-m').length") == 1)
    # clicar no grifo: trocar cor, cor extra/personalizada e lixeira
    await pg.click('#vd-a2 .vd-m')
    await pg.wait_for_selector('.vd-pop .vd-del')
    conf('popup do grifo existente tem cores e lixeira', await pg.evaluate("() => document.querySelectorAll('.vd-pop .vd-cores .vd-cor').length") >= 5)
    await pg.click('.vd-pop .vd-mais')
    conf('+ expande mais cores', await pg.evaluate("() => !document.querySelector('.vd-extra').hidden && document.querySelectorAll('.vd-extra .vd-cor').length >= 8"))
    await pg.click('.vd-pop .vd-extra [data-c="#fb923c"]')
    conf('cor extra aplicada ao grifo', await pg.evaluate("() => JSON.parse(localStorage.getItem('nexo_vade_marcas_v1')).l8429.some(m => m.c === '#fb923c')"))
    await pg.click('#vd-a2 .vd-m'); await pg.wait_for_selector('.vd-pop .vd-del')
    await pg.evaluate("() => { const i = document.querySelector('.vd-pop [data-vd=cor-livre]'); i.value = '#123456'; i.dispatchEvent(new Event('change', {bubbles:true})); }")
    conf('cor personalizada aplicada', await pg.evaluate("() => JSON.parse(localStorage.getItem('nexo_vade_marcas_v1')).l8429.some(m => m.c === '#123456')"))
    await pg.click('#vd-a2 .vd-m'); await pg.click('.vd-pop .vd-d-az')
    conf('trocar de cor pelo popup', await pg.evaluate("() => document.querySelectorAll('#vd-a2 .vd-m')[0].className.includes('vd-c-az')"))
    await pg.click('#vd-a2 .vd-m'); await pg.click('.vd-pop .vd-del')
    conf('lixeira remove o grifo', await pg.evaluate("() => document.querySelectorAll('.vd-m').length") == 0)
    await pg.evaluate("""() => { const pt = document.querySelector('#vd-a2 .vd-pt'); const r = document.createRange(); r.setStart(pt.firstChild,0); r.setEnd(pt.firstChild,30); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }""")
    await pg.wait_for_selector('.vd-pop', timeout=3000); await pg.click('.vd-pop .vd-d-vd')
    # selecionar com grifos ocultos também abre o popup e religa os grifos
    await pg.click('[data-vd=grifos]')
    await pg.evaluate("""() => { const pt = document.querySelector('#vd-a11 .vd-pt'); pt.scrollIntoView({block:'center'}); const r = document.createRange(); r.setStart(pt.firstChild,0); r.setEnd(pt.firstChild,20); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }""")
    await pg.wait_for_selector('.vd-pop', timeout=3000)
    await pg.click('.vd-pop .vd-d-am')
    conf('selecionar com grifos ocultos grifa e religa', await pg.evaluate("() => document.querySelectorAll('.vd-m').length") == 2)
    # nota do artigo
    await pg.click('#vd-a3 [data-vd=nota]')
    await pg.fill('#vd-a3 textarea', 'Terceiro só com dolo.')
    r = await pg.evaluate("() => JSON.parse(localStorage.getItem('nexo_vade_notas_v1')).l8429.a3")
    conf('nota do artigo salva', r == 'Terceiro só com dolo.', r)
    if FOTOS: await pg.screenshot(path=os.path.join(FOTOS, f'{nome}-grifos.png'))
    await pg.click('[data-vd=grifos]')
    conf('nota some com grifos ocultos', await pg.evaluate("() => document.querySelectorAll('.vd-nota').length") == 0)
    sw = await pg.evaluate("() => document.documentElement.scrollWidth")
    conf('sem rolagem horizontal', sw <= largura + 1, sw)
    erros = [e for e in erros if 'createClient' not in e]
    conf('sem erro de JavaScript', not erros, erros)
    await b.close()

async def main():
    srv = servidor()
    if FOTOS: os.makedirs(FOTOS, exist_ok=True)
    async with async_playwright() as p:
        await cenario(p, 400, 860, 'celular')
        await cenario(p, 1280, 860, 'computador')
    srv.shutdown()
    print('\nOK — tudo certo.' if not falhas else f'\nFALHAS: {falhas}')
    sys.exit(1 if falhas else 0)

asyncio.run(main())
