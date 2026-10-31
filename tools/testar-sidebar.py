#!/usr/bin/env python3
"""Testa que a barra lateral anima (computador, tablet de toque e celular).
Uso: python3 tools/testar-sidebar.py"""
import asyncio, functools, http.server, socketserver, sys, threading, os
from playwright.async_api import async_playwright
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORTA = 0
def servidor():
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    global PORTA
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("127.0.0.1", 0), functools.partial(Q, directory=RAIZ))
    PORTA = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv
falhas = 0
def conf(n, c, x=''):
    global falhas
    if not c: falhas += 1
    print('✓' if c else '✗', n, '' if c else x)
async def abre(b, **kw):
    ctx = await b.new_context(**kw); pg = await ctx.new_page()
    await pg.goto(f'http://127.0.0.1:{PORTA}/index.html'); await pg.wait_for_timeout(1500)
    await pg.evaluate("() => document.body.classList.remove('logged-out')")
    return pg
async def main():
    srv = servidor()
    async with async_playwright() as p:
        b = await p.chromium.launch()
        # computador: largura passa por valores intermediários ao abrir e ao fechar
        pg = await abre(b, viewport={'width':1280, 'height':800})
        w = lambda: pg.evaluate("() => document.querySelector('aside').getBoundingClientRect().width")
        w0 = await w(); await pg.mouse.move(30, 300); await pg.wait_for_timeout(140); w1 = await w()
        await pg.wait_for_timeout(500); w2 = await w()
        conf('computador: abre aos poucos', w0 < w1 < w2, (w0, w1, w2))
        await pg.mouse.move(700, 300); await pg.wait_for_timeout(330); w3 = await w(); await pg.wait_for_timeout(500); w4 = await w()
        conf('computador: fecha aos poucos', w2 > w3 > w4, (w2, w3, w4))
        conf('computador: busca esmaece (não some de uma vez)', await pg.evaluate("() => getComputedStyle(document.querySelector('aside .search')).display") != 'none')
        # celular: gaveta desliza, fundo escurece, itens entram
        pg = await abre(b, viewport={'width':400, 'height':860}, has_touch=True, is_mobile=True)
        x = lambda: pg.evaluate("() => document.querySelector('aside').getBoundingClientRect().left")
        o = lambda: pg.evaluate("() => parseFloat(getComputedStyle(document.body, '::after').opacity)")
        x0, o0 = await x(), await o()
        await pg.click('#navToggle'); await pg.wait_for_timeout(120); x1, o1 = await x(), await o()
        await pg.wait_for_timeout(600); x2, o2 = await x(), await o()
        conf('celular: gaveta desliza ao abrir', x0 < x1 < x2 and abs(x2) < 1, (x0, x1, x2))
        conf('celular: fundo escurece aos poucos', o0 == 0 and 0 < o1 < o2 and o2 > .9, (o0, o1, o2))
        conf('celular: itens entram', await pg.evaluate("() => parseFloat(getComputedStyle(document.querySelector('aside .nav > *')).opacity)") > .9)
        await pg.evaluate("() => closeMobileNav()"); await pg.wait_for_timeout(120); x3 = await x(); await pg.wait_for_timeout(500); x4 = await x()
        vis = await pg.evaluate("() => getComputedStyle(document.querySelector('aside')).visibility")
        conf('celular: gaveta desliza ao fechar', x2 > x3 > x4 and vis == 'hidden', (x2, x3, x4, vis))
        # tablet de toque: tocar na marca abre o trilho
        pg = await abre(b, viewport={'width':900, 'height':1100}, has_touch=True, is_mobile=True)
        w = lambda: pg.evaluate("() => document.querySelector('aside').getBoundingClientRect().width")
        a0 = await w(); await pg.tap('aside .brand'); await pg.wait_for_timeout(700); a1 = await w()
        await pg.tap('main'); await pg.mouse.move(600, 500); await pg.wait_for_timeout(700); a2 = await w()  # o mouse simulado não move o "hover" sozinho
        conf('tablet: tocar na marca abre e tocar fora fecha', a0 < 100 and a1 > 250 and a2 < 100, (a0, a1, a2))
        await b.close()
    srv.shutdown()
    print('\nOK — tudo certo.' if not falhas else f'\nFALHAS: {falhas}')
    sys.exit(1 if falhas else 0)
asyncio.run(main())
