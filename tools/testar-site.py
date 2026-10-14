#!/usr/bin/env python3
"""Abre o NEXO num navegador sem tela, em largura de celular, e renderiza as abas dos temas aprofundados.

Uso (na raiz do repositório):
    python3 tools/testar-site.py                 # todos os módulos com tema aprofundado
    python3 tools/testar-site.py ml_pericias,adm_atos

Requisitos: pip install playwright  &&  python3 -m playwright install chromium
O script sobe um servidor local temporário; não precisa rodar outro.
Falha (código 1) se houver erro de JavaScript, aba vazia ou rolagem horizontal no celular.
"""
import asyncio, functools, http.server, socketserver, sys, threading, os
from playwright.async_api import async_playwright

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORTA = 0  # escolhido automaticamente

def servidor():
    class Quieto(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    handler = functools.partial(Quieto, directory=RAIZ)
    global PORTA
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("127.0.0.1", 0), handler)
    PORTA = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv

JS = """(ids) => {
  const alvo = ids.length ? ids : modules.filter(m => m.rich).map(m => m.id);
  return alvo.map(id => {
    const m = modules.find(x => x.id === id);
    if (!m) return {id, erro: 'módulo não existe'};
    if (!m.rich) return {id, erro: 'módulo sem tema aprofundado (m.rich vazio)'};
    const tam = {};
    for (const t of ['resumo','lei','juris','flashcard_topico','quest']) {
      renderTab(m, t);
      const rc = document.querySelector('#view .reading-content');
      tam[t] = rc ? rc.textContent.length : -1;
    }
    return {id, tam, sw: document.documentElement.scrollWidth};
  });
}"""

async def main():
    ids = [x for x in (sys.argv[1].split(',') if len(sys.argv) > 1 else []) if x]
    srv = servidor()
    falhas = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 400, 'height': 860})
        erros = []
        pg.on('pageerror', lambda e: erros.append(str(e)))
        await pg.goto(f'http://127.0.0.1:{PORTA}/index.html')
        await pg.wait_for_timeout(1500)
        for r in await pg.evaluate(JS, ids):
            if 'erro' in r:
                falhas += 1; print('✗', r['id'], '-', r['erro']); continue
            ruins = [t for t in ('resumo', 'lei', 'flashcard_topico') if r['tam'][t] < 200]
            larg = r['sw'] > 400
            ok = not ruins and not larg
            falhas += 0 if ok else 1
            print('✓' if ok else '✗', r['id'].ljust(30), ' '.join(f"{k}:{v}" for k, v in r['tam'].items()),
                  ('ABAS VAZIAS: ' + ','.join(ruins)) if ruins else '', 'ROLAGEM HORIZONTAL' if larg else '')
        erros = [e for e in erros if 'createClient' not in e]  # Supabase indisponível offline é esperado
        if erros:
            falhas += len(erros); print('Erros de JavaScript:', *erros, sep='\n  ')
        await b.close()
    srv.shutdown()
    print('\nOK — tudo certo.' if not falhas else f'\nFALHAS: {falhas}')
    sys.exit(1 if falhas else 0)

asyncio.run(main())
