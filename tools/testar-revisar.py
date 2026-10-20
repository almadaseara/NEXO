#!/usr/bin/env python3
"""Testa o módulo Revisar (aluno) e o caderno de erros por disciplina/assunto, em largura de celular.

Uso (na raiz do repositório):  python3 tools/testar-revisar.py
Requisitos: pip install playwright  &&  python3 -m playwright install chromium
Falha (código 1) se algum critério de aceite não for cumprido ou houver erro de JavaScript.
"""
import asyncio, functools, http.server, socketserver, sys, threading, os
from playwright.async_api import async_playwright

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def servidor():
    class Quieto(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("127.0.0.1", 0), functools.partial(Quieto, directory=RAIZ))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv

JS = r"""() => {
  const o = {}, txt = () => document.querySelector('#view').textContent;
  const larg = () => document.documentElement.scrollWidth;
  localStorage.clear();
  // 1. Revisar logo depois de Questões (Praticar questões) na barra de acesso e na lateral
  renderNav();
  const bar = [...document.querySelectorAll('.access-bar [data-area]')];
  const iq = bar.findIndex(b => b.dataset.area === 'questions');
  o.barraAbaixo = iq >= 0 && bar[iq + 1].dataset.area === 'revisar' && /Revisar/.test(bar[iq + 1].textContent);
  o.navLateral = !!document.querySelector('#nav .nx-rva-nav') && /nexoRevisao\(\)/.test(document.querySelector('#nav .nx-rva-nav').nextElementSibling.getAttribute('onclick') || '');
  // disciplina com ao menos dois assuntos que têm questões
  const comQ = modules.filter(m => (m.official_questions || []).some(q => q.options && q.answer));
  const porD = {}; comQ.forEach(m => (porD[m.discipline || 'Direito Constitucional'] ||= []).push(m));
  const nomeD = Object.keys(porD).find(d => porD[d].length >= 2);
  const [A, B] = porD[nomeD];
  o.disc = nomeD; o.A = A.id; o.B = B.id;
  // 2. sem histórico: nunca 0%
  nexoRevisarHub(); o.hubSemHistorico = txt().includes('Sem histórico') && !/\b0%/.test(txt()); o.sw1 = larg();
  // 3. cálculo somado: A 3/8 e B 12/15 => disciplina 15/23 = 65,2%
  const ev = (m, ok) => nexoRegistrar({ k:'q', m, ok });
  for (let i = 0; i < 8; i++) ev(A.id, i < 3);
  for (let i = 0; i < 15; i++) ev(B.id, i < 12);
  nexoRevisarDisc(nomeD);
  const t = txt();
  o.pctDisc = t.includes('65,2%'); o.pctA = t.includes('37,5%'); o.pctB = t.includes('80%'); o.sw2 = larg();
  // 4. flashcards não mudam o percentual de questões
  nexoRegistrar({ k:'f', m:A.id, g:2 }); nexoRegistrar({ k:'f', m:B.id, g:0 });
  nexoRevisarDisc(nomeD); o.flashFora = txt().includes('65,2%') && txt().includes('15 acertos em 23');
  // 5. erro único e pendência que só fecha por ação do aluno
  const qi = A.official_questions.findIndex(q => q.options && q.answer), key = `official_${A.id}_${qi}`;
  const api = nexoCadernoApi, pend = () => api.erradas().filter(x => x.skey === key).length;
  savePracticeAnswer(key, false, 'A'); savePracticeAnswer(key, false, 'B');
  o.unica = pend() === 1;
  savePracticeAnswer(key, true, A.official_questions[qi].answer);
  o.acertoNaoFecha = pend() === 1;
  nexoCadernoResolver(key); o.resolvida = pend() === 0 && api.registros().some(x => x.skey === key && x.situacao === 'resolvida');
  savePracticeAnswer(key, false, 'C'); o.novoErroReabre = pend() === 1;
  nexoCadernoResolver(key); nexoCadernoReabrir(key); o.reabrir = pend() === 1;
  // 6. Revisar > disciplina > assunto > Questões: caderno já filtrado, filtro mantido no retorno
  nexoRevisarDisc(nomeD);
  document.querySelector('[data-rva-questoes="' + A.id + '"]').click();
  o.cadAssunto = document.querySelector('#cad-ass').value === A.id && document.querySelector('#cad-disc').value === nomeD;
  o.cadSoDoAssunto = [...document.querySelectorAll('.cad-item')].every(e => e.dataset.cad.includes(A.id)) && document.querySelectorAll('.cad-item').length === 1;
  o.sw3 = larg();
  nexoCadernoResolver(key);   // volta para o caderno: filtros preservados
  o.filtroMantido = document.querySelector('#cad-ass').value === A.id;
  o.vazioPendentes = txt().includes('Nenhum erro pendente') && !!document.querySelector('.nx-empty');
  nexoCadernoErros({ status:'resolvida' }); o.veResolvidas = document.querySelectorAll('.cad-item').length === 1 && txt().includes('Reabrir erro');
  // 7. motivo e anotação
  const sel = document.querySelector('[data-cad-motivo]'); sel.value = 'Chutei'; sel.dispatchEvent(new Event('change', { bubbles:true }));
  const ta = document.querySelector('[data-cad-nota]'); ta.value = 'ver art. 5º'; ta.dispatchEvent(new Event('change', { bubbles:true }));
  const nt = JSON.parse(localStorage.getItem('nexo_caderno_notas'))[key]; o.notas = nt.motivo === 'Chutei' && nt.nota === 'ver art. 5º';
  nexoCadernoErros({ status:'pendente' }); nexoCadernoReabrir(key); nexoCadernoErros({ status:'todas' });
  o.notaPersiste = document.querySelector('[data-cad-nota]').value === 'ver art. 5º';
  // 8. flashcards da disciplina e do assunto abrem o fichário
  nexoRevisarDisc(nomeD); document.querySelector('[data-fx-scope="d:' + nomeD + '"]').click(); o.flashDisc = !!document.getElementById('fx-card') || /Nada para revisar/.test(txt());
  nexoRevisarDisc(nomeD); document.querySelector('[data-fx-scope="m:' + A.id + '"]').click(); o.flashAssunto = !!document.getElementById('fx-card') || /Nada para revisar/.test(txt());
  // 9. caderno vazio sem erros
  localStorage.removeItem('nexo_caderno_erros'); localStorage.removeItem('nexo_practice_answers'); localStorage.removeItem('nexo_caderno_resolvidas');
  nexoCadernoErros({ disc:'', assunto:'', status:'pendente', origem:false }); o.cadVazio = txt().includes('Nenhuma questão no caderno'); o.sw4 = larg();
  return o;
}"""

async def main():
    srv = servidor(); porta = srv.server_address[1]; falhas = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 390, 'height': 844})
        erros = []
        pg.on('pageerror', lambda e: erros.append(str(e)))
        await pg.goto(f'http://127.0.0.1:{porta}/index.html')
        await pg.wait_for_timeout(1500)
        r = await pg.evaluate(JS)
        larguras = [r.pop(k) for k in ('sw1', 'sw2', 'sw3', 'sw4')]
        for k, v in r.items():
            if k in ('disc', 'A', 'B'): continue
            ok = v is True
            falhas += 0 if ok else 1
            print('✓' if ok else '✗', k)
        sem_rolagem = max(larguras) <= 390
        falhas += 0 if sem_rolagem else 1
        print('✓' if sem_rolagem else '✗', 'sem rolagem horizontal no celular', larguras)
        erros = [e for e in erros if 'createClient' not in e]
        if erros: falhas += len(erros); print('Erros de JavaScript:', *erros, sep='\n  ')
        await b.close()
    srv.shutdown()
    print('\nOK — tudo certo.' if not falhas else f'\nFALHAS: {falhas}')
    sys.exit(1 if falhas else 0)

asyncio.run(main())
