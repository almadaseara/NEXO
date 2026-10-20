/* NEXO — Acervo Digital Pessoal: cadernos do aluno (escrita à mão, PDFs anotados, quadro
   branco, flashcards, IA com a chave do próprio aluno), app em acervo/.
   - Abre numa página própria, em tela cheia (item na barra lateral, botão na barra de acesso do
     celular e atalho na busca Ctrl K): a barra do Acervo tem a logomarca e "Home", que voltam ao
     painel do NEXO, e "Tema". As seções e pastas ficam nas abas do próprio Acervo.
   - O app roda num iframe da mesma origem, isolado do CSS/JS do NEXO, que fica vivo enquanto a
     página estiver aberta: dá para ir à lei seca e voltar ao caderno exatamente onde estava.
   - Para conta ativa com permissão de aluno (can_student), no modo Aluno ou ADM; ao sair da conta,
     o iframe é descartado.
   - #acervo e #acervo/caderno/ID reabrem o Acervo (e o caderno) depois de recarregar.
   Os cadernos ficam no navegador (IndexedDB "nexo-acervo"). Nada aqui toca o Supabase. */
(function(){
'use strict';

function $(s, r){ return (r || document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function cur(){ try{ return current; }catch(e){ return null; } }
function setCur(v){ try{ current = v; }catch(e){} }
function setHead(t){ var h = document.getElementById('head'); if(h) h.textContent = t; }
function fecharMenuMovel(){ try{ if(typeof closeMobileNav === 'function') closeMobileNav(); }catch(e){} }

var ICONE = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7c-2.5-1.8-5.5-1.8-8-1v12c2.5-.8 5.5-.8 8 1 2.5-1.8 5.5-1.8 8-1V6c-2.5-.8-5.5-.8-8 1Z"/><path d="M12 7v12"/></svg>';
var SECOES = [['all', 'Documentos'], ['trash', 'Lixeira'], ['favorites', 'Favoritos'], ['study', 'Estudar'], ['bookmarks', 'Páginas marcadas']];
var A = { pronto:false, nav:'all', pastas:[], due:0, editor:null, pendente:null };
var hashInicial = /^#acervo/.test(location.hash) ? location.hash : '';

/* Perfil já validado pelo NEXO no login (loadNexoProfile). Também usado pelo guarda de acervo/index.html. */
function perfil(){
  try{
    var p = nexoProfile;
    if(!p || p.active !== true) return null;
    if(p.can_student === false || (p.can_student == null && p.role !== 'student')) return null;
    return { id:p.id, active:true };
  }catch(e){ return null; }
}
window.nexoAcervoPerfil = perfil;

/* ---------- iframe ---------- */
function host(){
  var h = document.getElementById('acervo-host');
  if(!h){
    var v = document.getElementById('view'); if(!v) return null;
    v.insertAdjacentHTML('afterend', '<div id="acervo-host" hidden>' + barraHTML() + '</div>');
    h = document.getElementById('acervo-host');
    temaBotao();
  }
  return h;
}

/* ---------- página própria ----------
   Aberto, o Acervo ocupa a tela inteira (sem a barra lateral, o cabeçalho e a barra de acesso do
   NEXO), com uma barra própria: logomarca e "Home" voltam ao painel do NEXO; "Tema" troca claro/escuro.
   O iframe continua vivo: ao voltar ao Acervo, o caderno está onde ficou. */
function barraHTML(){
  return '<div class="nx-acervo-top" role="banner">' +
    '<a class="nx-acervo-brand" href="#" onclick="nexoSairAcervo();return false" title="Voltar ao NEXO Revisão" aria-label="NEXO Revisão — voltar ao início">' +
      '<span class="nx-acervo-logo">NEXO</span><span class="nx-acervo-sub">revisão</span><span class="nx-acervo-badge">Acervo</span></a>' +
    '<nav class="nx-acervo-links" aria-label="Acervo">' +
      '<button type="button" onclick="nexoSairAcervo()" title="Voltar ao painel do NEXO"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V20h-5v-5H9v5H4z"/></svg><span>Home</span></button>' +
      '<button type="button" id="nx-acervo-tema" onclick="nexoAcervoTema()"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/></svg><span>Tema</span></button>' +
    '</nav>' +
    '<span class="nx-acervo-nota">Dados neste aparelho · sem sincronização</span>' +
  '</div>';
}
function temaBotao(){
  var b = document.getElementById('nx-acervo-tema'); if(!b) return;
  var escuro = document.documentElement.getAttribute('data-theme') === 'dark';
  b.setAttribute('aria-label', escuro ? 'Usar tema claro' : 'Usar tema escuro');
  b.title = escuro ? 'Tema claro' : 'Tema escuro';
}
window.nexoAcervoTema = function(){
  var t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  if(typeof window.nexoSetTheme === 'function') window.nexoSetTheme(t);
  else document.documentElement.setAttribute('data-theme', t);
  temaBotao();
};
window.nexoSairAcervo = function(){
  if(typeof window.home === 'function') window.home();
  else { setCur(null); try{ syncAccess(); }catch(e){} }
  try{ window.scrollTo(0, 0); }catch(e){}
};
function frame(criar){
  var f = document.getElementById('acervo-frame');
  if(!f && criar){
    var caderno = ((hashInicial || location.hash).match(/^#acervo\/caderno\/(.+)$/) || [])[1];
    f = document.createElement('iframe');
    f.id = 'acervo-frame';
    f.title = 'Acervo Digital Pessoal';
    f.allow = 'fullscreen; microphone; clipboard-read; clipboard-write';
    f.setAttribute('allowfullscreen', '');
    f.src = 'acervo/' + (caderno ? '#caderno/' + caderno : '');
    host().appendChild(f);
    hashInicial = '';
  }
  return f;
}
function descartar(){
  var f = frame(false); if(f) f.remove();
  A = { pronto:false, nav:'all', pastas:[], due:0, editor:null, pendente:null };
}
function enviar(msg){
  var f = frame(false);
  if(!f || !A.pronto){ A.pendente = msg; return; }
  msg.source = 'nexo';
  f.contentWindow.postMessage(msg, location.origin);
}

/* ---------- abrir ---------- */
function abrir(nav){
  if(!perfil()) return;
  fecharMenuMovel();
  setCur('acervo');
  frame(true);
  if(nav){ A.nav = nav; A.editor = null; enviar({ type:'nav', nav:nav }); }
  try{ renderNav(); }catch(e){}
  cabecalho();
  ajustarAltura();
}
window.nexoAbrirAcervo = abrir;

function cabecalho(){
  if(cur() !== 'acervo') return;
  var pasta = A.nav.indexOf('folder:') === 0 && A.pastas.find(function(f){ return 'folder:' + f.id === A.nav; });
  var secao = SECOES.find(function(s){ return s[0] === A.nav; });
  setHead('Acervo Digital Pessoal / ' + (A.editor ? A.editor.title : pasta ? pasta.name : (secao || SECOES[0])[1]));
}

/* ---------- barra lateral ---------- */
/* Só o item principal: as seções (Todos, Favoritos, Estudar, Páginas marcadas) e as pastas
   ficam nas abas dentro do próprio Acervo. */
function navHTML(){
  var on = cur() === 'acervo';
  return '<button type="button" class="primary-nav nx-acervo-nav' + (on ? ' active' : '') + '" onclick="nexoAbrirAcervo()"' + (on ? ' aria-current="page"' : '') + '>' + ICONE + ' Acervo Digital Pessoal</button>';
}
var renderNavOriginal = window.renderNav;
window.renderNav = function(){
  var r; try{ if(typeof renderNavOriginal === 'function') r = renderNavOriginal.apply(this, arguments); }catch(e){}
  var nav = document.getElementById('nav'); if(!nav) return r;
  $$('.nx-acervo-nav', nav).forEach(function(x){ x.remove(); });
  if(!perfil()) return r;
  /* junto das áreas pessoais do aluno: depois de "Meus grifos", "Desempenho" ou "Flashcards" */
  var botoes = $$('.primary-nav', nav), achar = function(re){ return botoes.filter(function(b){ return re.test(b.getAttribute('onclick') || '') || re.test(b.textContent); }).pop(); };
  var ref = achar(/Meus grifos/) || achar(/nexoDesempenho/) || achar(/showFlashcards/) || botoes.pop();
  if(ref) ref.insertAdjacentHTML('afterend', navHTML()); else nav.insertAdjacentHTML('afterbegin', navHTML());
  return r;
};

/* ---------- barra de acesso (celular), view e endereço ---------- */
function prepararBarraAcesso(){
  var bar = $('.access-bar'); if(!bar || bar.querySelector('[data-area="acervo"]')) return;
  var ref = bar.querySelector('[data-area="perf"]') || bar.querySelector('[data-area="maps"]') || bar.querySelector('.access-mobile-search');
  var html = '<button type="button" data-area="acervo" onclick="nexoAbrirAcervo()">' + ICONE + '<span>Acervo</span></button>';
  if(ref) ref.insertAdjacentHTML('afterend', html); else bar.insertAdjacentHTML('beforeend', html);
}
var syncOriginal = window.syncAccess;
window.syncAccess = function(){
  var r; try{ if(typeof syncOriginal === 'function') r = syncOriginal.apply(this, arguments); }catch(e){}
  prepararBarraAcesso();
  var pode = !!perfil();
  if(!pode){ descartar(); if(cur() === 'acervo') setCur(null); }
  var on = pode && cur() === 'acervo';
  var b = $('.access-bar [data-area="acervo"]'); if(b) b.hidden = !pode;
  if(on){
    $$('.access-bar [data-area]').forEach(function(x){ x.classList.remove('selected'); x.removeAttribute('aria-current'); });
    if(b){ b.classList.add('selected'); b.setAttribute('aria-current', 'page'); }
  }
  var v = document.getElementById('view'), h = host();
  if(v) v.hidden = on;
  if(h) h.hidden = !on;
  document.body.classList.toggle('nx-acervo-on', on);
  /* o endereço lembra o Acervo (e o caderno aberto) para recarregar no mesmo lugar */
  if(!hashInicial){
    var alvo = on ? '#acervo' + (A.editor && A.editor.id ? '/caderno/' + A.editor.id : '') : '';
    if(on ? location.hash !== alvo : /^#acervo/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search + alvo);
  }
  if(on) ajustarAltura();
  return r;
};

/* No celular a página rola inteira e a barra de acesso é fixa embaixo: o iframe ocupa o espaço entre as duas. */
function ajustarAltura(){
  var h = host(); if(!h || h.hidden) return;
  /* página própria: o cabeçalho e a barra de acesso do NEXO ficam escondidos, então ocupa a altura toda */
  h.style.height = window.innerWidth > 700 ? '' : Math.max(320, window.innerHeight) + 'px';
}
window.addEventListener('resize', ajustarAltura);

/* ---------- busca (Ctrl K) ---------- */
var renderCommandOriginal = window.renderCommand;
if(typeof renderCommandOriginal === 'function'){
  window.renderCommand = function(){
    var r = renderCommandOriginal.apply(this, arguments);
    try{
      var q = String((document.getElementById('command-input') || {}).value || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
      var box = document.getElementById('command-results');
      if(box && perfil() && (!q || 'acervo digital pessoal cadernos pdf anotacoes quadro branco'.indexOf(q) >= 0)){
        box.querySelector('.command-empty') && box.querySelector('.command-empty').remove();
        var item = '<button type="button" class="command-result" onclick="closeCommand();nexoAbrirAcervo()">' + ICONE + '<span><b>Acervo Digital Pessoal</b><small>Seus cadernos e PDFs anotados</small></span>' + (typeof icon === 'function' ? icon('arrow') : '') + '</button>';
        var grupo = box.querySelector('.command-group');
        if(grupo) grupo.insertAdjacentHTML('afterend', item); else box.insertAdjacentHTML('afterbegin', '<div class="command-group">ACESSO RÁPIDO</div>' + item);
      }
    }catch(e){}
    return r;
  };
}

/* ---------- mensagens do Acervo ---------- */
window.addEventListener('message', function(e){
  var f = frame(false);
  if(e.origin !== location.origin || !f || e.source !== f.contentWindow || !e.data || e.data.source !== 'acervo') return;
  var d = e.data;
  if(d.type === 'ready'){
    A.pronto = true;
    if(A.pendente){ var m = A.pendente; A.pendente = null; enviar(m); }
    return;
  }
  if(d.type === 'library'){ A.nav = d.nav || 'all'; A.pastas = d.folders || []; A.due = d.due || 0; A.editor = null; }
  if(d.type === 'editor') A.editor = { id:d.id, title:d.title || 'Caderno' };
  if(cur() === 'acervo'){ try{ renderNav(); }catch(err){} cabecalho(); }
});

/* ---------- abrir pelo endereço (#acervo) depois que o login carregar ----------
   O login termina em home() (modo Aluno) ou em openAdminRobot() (modo ADM). */
['home', 'openAdminRobot'].forEach(function(nome){
  var original = window[nome];
  if(typeof original !== 'function') return;
  window[nome] = function(){
    if(hashInicial && perfil()) return abrir();
    return original.apply(this, arguments);
  };
});

function iniciar(){ host(); prepararBarraAcesso(); try{ syncAccess(); }catch(e){} }
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
