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
        # páginas da camada de interface (ui/): fichário, fichas, desempenho, filtro de questões, tesoura, painel, trilha e marca-texto
        extra = await pg.evaluate("""() => {
          const out = {};
          try { showFlashcards(); out.fichario = document.querySelectorAll('.fx-deck').length; out.sw1 = document.documentElement.scrollWidth;
            document.querySelector('[data-fx-scope="all"]').click(); document.getElementById('fx-virar').click();
            out.notas = document.querySelectorAll('.fx-grade').length; document.querySelector('.fx-grade.g2').click();
            nexoDesempenho('30'); out.desempenho = document.querySelector('#view').textContent.length; out.sw2 = document.documentElement.scrollWidth;
            out.arvore = document.querySelectorAll('#nav .nx-leaf').length + document.querySelectorAll('#nav .nx-group').length;
            nexoPraticar({}); out.praticar = document.querySelectorAll('.practice-question-card').length; out.sw3 = document.documentElement.scrollWidth;
            const t = document.querySelector('.nx-cut'); t.click(); out.tesoura = t.closest('label.opt').classList.contains('nx-cortada'); t.click();
            home(); out.painel = document.querySelectorAll('.pn-panel').length + document.querySelectorAll('.nx-pd').length;
            nexoLivros(); out.livros = document.querySelectorAll('.lv-livro').length;
            nexoLivro.abrir('penal_aplicacao'); out.capitulo = document.querySelectorAll('.lv-lateral .lv-parte').length;
            nexoCronogramaCriar('pcba','investigador'); document.querySelector('#nt-form').requestSubmit();
            const st = nexoEstudo.plano(), wk = st.weeks[Object.keys(st.weeks)[0]];
            out.trilha = wk.tarefas.length;
            out.trilhaCabe = [0,1,2,3,4,5,6].every(d => wk.tarefas.filter(t => t.d === d).reduce((a, t) => a + t.min, 0) <= (st.plan.minutos[new Date(Date.now() + d * 864e5).getDay()] || 0) + 1);
            out.sw4 = document.documentElement.scrollWidth;
            openModule('penal_principios');
            const rc = document.querySelector('.reading-content'), alvo = [...rc.querySelectorAll('p')].find(p => p.textContent.length > 80).firstChild;
            const r = document.createRange(); r.setStart(alvo, 0); r.setEnd(alvo, 25); getSelection().removeAllRanges(); getSelection().addRange(r);
            document.querySelector('[data-mkt="hl"]').click(); document.dispatchEvent(new MouseEvent('mouseup', { bubbles:true }));
          } catch (e) { out.erro = String(e); }
          return out;
        }""")
        await pg.wait_for_timeout(300)
        extra.update(await pg.evaluate("""() => { const o = {}; try {
            o.marca = document.querySelectorAll('.reading-content .nx-mk').length;
            renderTab(modules.find(m => m.id === 'penal_principios'), 'resumo'); o.marcaFica = document.querySelectorAll('.reading-content .nx-mk').length;
            document.querySelector('[data-mkt="undo"]').click(); o.desfeita = document.querySelectorAll('.reading-content .nx-mk').length;
          } catch (e) { o.erro = String(e); } return o; }"""))
        ok_extra = not extra.get('erro') and extra.get('fichario', 0) >= 4 and extra.get('notas') == 3 and extra.get('desempenho', 0) > 300 and extra.get('praticar', 0) >= 1 and extra.get('tesoura') is True and extra.get('painel', 0) >= 1 and extra.get('livros') == 5 and extra.get('capitulo', 0) >= 3 and extra.get('trilha', 0) >= 5 and extra.get('trilhaCabe') is True and extra.get('marca', 0) >= 1 and extra.get('marcaFica', 0) >= 1 and extra.get('desfeita') == 0 and max(extra.get('sw1', 0), extra.get('sw2', 0), extra.get('sw3', 0), extra.get('sw4', 0)) <= 400
        falhas += 0 if ok_extra else 1
        print('✓' if ok_extra else '✗', 'interface'.ljust(30), extra)
        await pg.evaluate("() => { try { localStorage.clear(); } catch (e) {} }")
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
