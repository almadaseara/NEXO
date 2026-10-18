/* NEXO — dados de estudo por conta no mesmo aparelho (auditoria N-02).
   Plano, marcações, desempenho, fichário, respostas, cronômetro e as chaves do Acervo ficam no
   navegador com nomes fixos. Sem separação, quem entrasse depois de outra pessoa no mesmo aparelho via
   (e a sincronização enviava para a própria conta) os dados da anterior.
   Aqui o aparelho lembra de quem são os dados ("nexo_dono"). Quando outra conta entra, os dados da
   anterior são guardados à parte ("nexo_conta:<id>") e os da nova são restaurados; nada vai para a
   conta errada. Carregado antes dos outros módulos ui/, para a troca acontecer antes de qualquer tela. */
(function(){
'use strict';

var DADOS = ['nexo_estudo', 'nexo_marcas', 'nexo_estudo_fila', 'nexo_eventos', 'nexo_eventos_import', 'nexo_fichario',
  'nexo_fichario_novas', 'nexo_minhas_fichas', 'nexo_practice_answers', 'nexo_cronometro',
  'nexo_last_practice_filter', 'nexo_saved_practice_filter', 'nexo_filtro_q'];
var PREFIXOS = ['acervo.']; /* chaves de IA e preferências do Acervo Digital Pessoal */
var DONO = 'nexo_dono', GUARDADO = 'nexo_conta:';

function ler(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function gravar(k, v){ try{ localStorage.setItem(k, v); return true; }catch(e){ return false; } }
function remover(k){ try{ localStorage.removeItem(k); }catch(e){} }
function chavesDaConta(){
  var out = DADOS.slice();
  try{
    for(var i = 0; i < localStorage.length; i++){
      var k = localStorage.key(i);
      if(k && PREFIXOS.some(function(p){ return k.indexOf(p) === 0; })) out.push(k);
    }
  }catch(e){}
  return out;
}
/* id da conta pela sessão que o supabase-js guarda (sb-<projeto>-auth-token), sem esperar a rede */
function idDaSessao(){
  try{
    for(var i = 0; i < localStorage.length; i++){
      var k = localStorage.key(i);
      if(k && /^sb-[a-z0-9]+-auth-token$/.test(k)){
        var s = JSON.parse(localStorage.getItem(k));
        if(s && s.user && s.user.id) return s.user.id;
      }
    }
  }catch(e){}
  return null;
}

/* Deixa no aparelho os dados de "id". Devolve true se trocou de conta (as telas devem se redesenhar). */
function trocar(id){
  if(!id) return false;
  var dono = ler(DONO);
  if(dono === id) return false;
  if(!dono){ gravar(DONO, id); return false; } /* primeira vez: os dados que já estão aqui são desta conta */
  var pacote = {};
  chavesDaConta().forEach(function(k){ var v = ler(k); if(v != null) pacote[k] = v; });
  if(Object.keys(pacote).length && !gravar(GUARDADO + dono, JSON.stringify(pacote))) return false; /* sem espaço: não apaga nada */
  Object.keys(pacote).forEach(remover);
  var salvo = ler(GUARDADO + id);
  if(salvo){
    try{
      var p = JSON.parse(salvo);
      Object.keys(p).forEach(function(k){
        if(DADOS.indexOf(k) >= 0 || PREFIXOS.some(function(x){ return k.indexOf(x) === 0; })) gravar(k, p[k]);
      });
    }catch(e){}
    remover(GUARDADO + id);
  }
  gravar(DONO, id);
  try{ document.dispatchEvent(new CustomEvent('nexo:conta', { detail:id })); }catch(e){}
  return true;
}

window.nexoConta = { trocar:trocar, dono:function(){ return ler(DONO); } };
trocar(idDaSessao());
})();
