/* NEXO — ilustrações vetoriais (SVG) para a revisão visual dos mapas mentais.
   Estilo: cartum plano com contorno escuro, como os mapas ilustrados de Medicina Legal.
   Desenhos originais da NEXO. window.NEXO_ILUSTRA.desenho(nome) → string SVG;
   window.NEXO_ILUSTRA.escolher(texto) → nome do desenho mais adequado ao texto. */
(function(){
'use strict';
var K = '#22324a';               /* contorno */
var PELE = '#f4c9a6', PELE2 = '#e3a983', CABELO = '#3b2a20', BRANCO = '#ffffff';
function svg(corpo){ return '<svg class="nx-ilu" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" stroke="' + K + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' + corpo + '</svg>'; }
function cabeca(x, y, cab, extra){
  return '<circle cx="' + x + '" cy="' + y + '" r="15" fill="' + PELE + '"/>'
    + (cab || '<path d="M' + (x - 15) + ' ' + (y - 2) + 'c0-12 8-18 15-18s15 6 15 18c-4-6-10-8-15-8s-11 2-15 8z" fill="' + CABELO + '"/>')
    + '<circle cx="' + (x - 5) + '" cy="' + (y + 1) + '" r="1.6" fill="' + K + '" stroke="none"/><circle cx="' + (x + 5) + '" cy="' + (y + 1) + '" r="1.6" fill="' + K + '" stroke="none"/>'
    + '<path d="M' + (x - 5) + ' ' + (y + 7) + 'q5 4 10 0" stroke-width="2"/>' + (extra || '');
}
var D = {
  medico:svg('<path d="M30 112c2-24 14-36 30-36s28 12 30 36z" fill="' + BRANCO + '"/><path d="M52 77l8 14 8-14" fill="#9fd3f5"/><path d="M60 91v21" /><path d="M47 80c-3 10-2 18 4 22" stroke="#2c6fd1"/><circle cx="52" cy="104" r="4" fill="#2c6fd1"/><rect x="70" y="92" width="12" height="9" rx="2" fill="#2c6fd1"/>' + cabeca(60, 50) ),
  policial:svg('<path d="M30 112c2-24 14-36 30-36s28 12 30 36z" fill="#2f4f8f"/><path d="M53 78l7 10 7-10" fill="#8fb3e8"/><path d="M50 96l5 3 5-3v-6l-5-2-5 2z" fill="#f2c94c"/>' + cabeca(60, 52, '<path d="M42 44h36l-4-14H46z" fill="#2f4f8f"/><path d="M40 44h40" stroke-width="4"/><circle cx="60" cy="36" r="3" fill="#f2c94c"/>')),
  juiz:svg('<path d="M28 112c2-24 15-36 32-36s30 12 32 36z" fill="#2b2b35"/><path d="M52 77l8 9 8-9" fill="' + BRANCO + '"/><path d="M60 86v26" stroke="#55556a"/>' + cabeca(60, 50, '<path d="M45 46c-1-14 6-21 15-21s16 7 15 21c-3-5-9-7-15-7s-12 2-15 7z" fill="#cfcfd6"/>') + '<path d="M84 96l14-14" stroke-width="5" stroke="#8a5a2b"/><rect x="92" y="72" width="16" height="10" rx="3" transform="rotate(45 100 77)" fill="#a8703a"/>'),
  delegado:svg('<path d="M30 112c2-24 14-36 30-36s28 12 30 36z" fill="#3a3f4b"/><path d="M53 77l7 12 7-12" fill="' + BRANCO + '"/><path d="M60 89l-3 6 3 17 3-17z" fill="#b8323b"/>' + cabeca(60, 50, '<path d="M45 46c-1-14 6-20 15-20s16 6 15 20c-4-7-10-9-15-9s-11 2-15 9z" fill="' + CABELO + '"/>', '<path d="M50 59q10 8 20 0" stroke-width="2.4" fill="#5a4030"/>')),
  estudante:svg('<path d="M32 112c2-22 13-33 28-33s26 11 28 33z" fill="#2fa36b"/>' + cabeca(60, 52, '<path d="M44 48c-2-13 6-21 16-21s18 8 16 21c-3-6-10-9-16-9s-13 3-16 9z" fill="#6b3e1f"/>') + '<circle cx="92" cy="26" r="11" fill="#ffe27a"/><path d="M92 37v4M88 44h8"/>'),
  vitima:svg('<path d="M32 112c2-22 13-33 28-33s26 11 28 33z" fill="#c25c8a"/>' + cabeca(60, 52, '<path d="M44 52c-3-17 6-25 16-25s19 8 16 25c-1-8-6-14-16-14s-15 6-16 14z" fill="#7a3e1c"/><path d="M44 52c0 10-2 18-6 22M76 52c0 10 2 18 6 22" stroke="#7a3e1c" stroke-width="6"/>')),
  criminoso:svg('<path d="M32 112c2-22 13-33 28-33s26 11 28 33z" fill="#555a66"/>' + cabeca(60, 52, '<path d="M44 46c0-12 7-18 16-18s16 6 16 18" fill="#2b2b2b"/><path d="M43 46h34v6H43z" fill="#2b2b2b"/>') + '<path d="M60 92v20" stroke="#7a808c"/>'),
  balanca:svg('<path d="M60 16v84M38 104h44" stroke-width="4"/><circle cx="60" cy="16" r="5" fill="#f2c94c"/><path d="M22 30h76" stroke-width="4"/><path d="M30 30 16 62h28zM90 30 76 62h28z" fill="none"/><path d="M14 62a16 9 0 0 0 32 0z" fill="#f2c94c"/><path d="M74 62a16 9 0 0 0 32 0z" fill="#f2c94c"/><path d="M50 104l10-12 10 12z" fill="#e0a92e"/>'),
  martelo:svg('<rect x="34" y="96" width="52" height="12" rx="3" fill="#a8703a"/><path d="M40 82l38-38" stroke-width="8" stroke="#8a5a2b"/><path d="M40 82l38-38"/><rect x="62" y="16" width="34" height="20" rx="5" transform="rotate(45 79 26)" fill="#b77b40"/>'),
  documento:svg('<path d="M30 12h44l18 18v78H30z" fill="' + BRANCO + '"/><path d="M74 12v18h18"/><path d="M42 44h38M42 56h38M42 68h26" stroke="#7d8da3"/><circle cx="74" cy="90" r="11" fill="#e85d4a"/><path d="M68 100l-3 10 9-5 9 5-3-10" fill="#e85d4a"/>'),
  laudo:svg('<path d="M24 18h50l14 14v74H24z" fill="' + BRANCO + '"/><path d="M36 44h40M36 56h40M36 68h28" stroke="#7d8da3"/><text x="56" y="34" font-size="11" font-weight="800" text-anchor="middle" fill="' + K + '" stroke="none" font-family="Arial">LAUDO</text><path d="M78 100l22-38 6 4-22 38-8 4z" fill="#2c6fd1"/>'),
  prancheta:svg('<rect x="26" y="20" width="68" height="88" rx="6" fill="#d7a76b"/><rect x="34" y="30" width="52" height="70" rx="3" fill="' + BRANCO + '"/><rect x="46" y="14" width="28" height="12" rx="3" fill="#9aa4b5"/><path d="M42 48l4 4 7-8M58 48h20M42 66l4 4 7-8M58 66h20M42 84l4 4 7-8M58 84h20" stroke="#2f9a4a"/>'),
  algemas:svg('<circle cx="38" cy="74" r="20" fill="#c8ced8"/><circle cx="38" cy="74" r="11" fill="' + BRANCO + '"/><circle cx="82" cy="74" r="20" fill="#c8ced8"/><circle cx="82" cy="74" r="11" fill="' + BRANCO + '"/><path d="M50 56c4-10 16-10 20 0" stroke-width="5" stroke="#8b94a3"/><path d="M50 56c4-10 16-10 20 0"/>'),
  lupa:svg('<circle cx="50" cy="50" r="28" fill="#cfe8fb"/><circle cx="50" cy="50" r="20" fill="#e9f5ff" stroke-width="2"/><path d="M71 71l26 26" stroke-width="10" stroke="#8a5a2b"/><path d="M71 71l26 26"/><path d="M38 42q6-8 14-6" stroke="' + BRANCO + '" stroke-width="4"/>'),
  livro:svg('<path d="M14 24h40a8 8 0 0 1 8 8v76c-2-4-5-6-9-6H14z" fill="#2c6fd1"/><path d="M106 24H68a8 8 0 0 0-8 8v76c2-4 5-6 9-6h37z" fill="#3f86e8"/><text x="36" y="66" font-size="16" font-weight="900" text-anchor="middle" fill="' + BRANCO + '" stroke="none" font-family="Arial">LEI</text><path d="M74 48h22M74 60h22M74 72h16" stroke="' + BRANCO + '"/>'),
  predio:svg('<path d="M12 44 60 14l48 30z" fill="#e9e3d3"/><rect x="18" y="44" width="84" height="8" fill="#d8cfb8"/><path d="M28 52v42M46 52v42M74 52v42M92 52v42" stroke-width="6" stroke="#cfc4a8"/><path d="M28 52v42M46 52v42M74 52v42M92 52v42"/><rect x="12" y="94" width="96" height="14" fill="#d8cfb8"/><circle cx="60" cy="32" r="6" fill="#f2c94c"/>'),
  ampulheta:svg('<path d="M32 14h56M32 106h56" stroke-width="5"/><path d="M38 16c0 26 22 30 22 44s-22 18-22 44h44c0-26-22-30-22-44s22-18 22-44z" fill="#e9f5ff"/><path d="M46 96c4-10 10-12 14-12s10 2 14 12z" fill="#f2c94c"/><path d="M50 34h20l-10 14z" fill="#f2c94c"/>'),
  cela:svg('<rect x="14" y="16" width="92" height="90" rx="6" fill="#e7ebf1"/><path d="M34 16v90M52 16v90M70 16v90M88 16v90" stroke-width="5" stroke="#5d6675"/><path d="M14 40h92" stroke-width="5" stroke="#5d6675"/>'),
  dinheiro:svg('<path d="M40 40c-14 10-22 26-22 40 0 18 18 28 42 28s42-10 42-28c0-14-8-30-22-40z" fill="#7cc576"/><path d="M44 40l-6-18c8 4 14 4 22 0s14-4 22 0l-6 18z" fill="#6bb465"/><text x="60" y="88" font-size="30" font-weight="900" text-anchor="middle" fill="' + BRANCO + '" stroke="none" font-family="Arial">R$</text>'),
  escudo:svg('<path d="M60 10 22 24v28c0 28 17 46 38 56 21-10 38-28 38-56V24z" fill="#3f86e8"/><path d="M42 58l12 12 24-26" stroke="' + BRANCO + '" stroke-width="7"/>'),
  coracao:svg('<path d="M60 102S16 76 16 44a22 22 0 0 1 44-6 22 22 0 0 1 44 6c0 32-44 58-44 58z" fill="#ef6b6b"/><path d="M26 58h18l8-14 10 26 8-12h22" stroke="' + BRANCO + '" stroke-width="4"/>'),
  caveira:svg('<path d="M60 14c-24 0-40 16-40 38 0 12 6 20 12 24v16h56V76c6-4 12-12 12-24 0-22-16-38-40-38z" fill="#f2efe6"/><circle cx="45" cy="52" r="9" fill="' + K + '"/><circle cx="75" cy="52" r="9" fill="' + K + '"/><path d="M60 62l-5 10h10z" fill="' + K + '"/><path d="M48 92v14M60 92v14M72 92v14"/>'),
  alvo:svg('<circle cx="56" cy="64" r="40" fill="#ef6b6b"/><circle cx="56" cy="64" r="28" fill="' + BRANCO + '"/><circle cx="56" cy="64" r="15" fill="#ef6b6b"/><path d="M56 64l46-46" stroke-width="4"/><path d="M92 18l10 0 0 10" stroke-width="4"/>'),
  lampada:svg('<path d="M60 10a32 32 0 0 0-18 58c4 4 6 9 6 14h24c0-5 2-10 6-14a32 32 0 0 0-18-58z" fill="#ffe27a"/><rect x="46" y="84" width="28" height="12" rx="3" fill="#b9c2d0"/><path d="M50 104h20"/><path d="M12 40H4M116 40h-8M22 14l-6-6M98 14l6-6" stroke="#f2a93b"/>'),
  foguete:svg('<path d="M60 8c18 12 24 34 18 62H42c-6-28 0-50 18-62z" fill="#e9eef6"/><circle cx="60" cy="40" r="9" fill="#5fb0ff"/><path d="M42 70 28 84l16-2M78 70l14 14-16-2" fill="#ef6b6b"/><path d="M50 72c0 14 4 24 10 34 6-10 10-20 10-34z" fill="#f2a93b"/>'),
  livros:svg('<rect x="16" y="78" width="88" height="20" rx="4" fill="#f2c94c"/><rect x="22" y="58" width="84" height="20" rx="4" fill="#2fa36b"/><rect x="12" y="38" width="86" height="20" rx="4" fill="#e85d4a"/><rect x="20" y="18" width="80" height="20" rx="4" fill="#2c6fd1"/>'),
  caduceu:svg('<path d="M60 12v98" stroke-width="5"/><path d="M60 22c-22 6-22 18 0 22s22 18 0 22-22 18 0 22" stroke="#2fa36b" stroke-width="6"/><path d="M60 22c-22 6-22 18 0 22s22 18 0 22-22 18 0 22"/><path d="M40 16c10-6 30-6 40 0" stroke-width="4"/>'),
  carro:svg('<path d="M14 80l8-24c2-6 6-8 12-8h52c6 0 10 2 12 8l8 24v18H14z" fill="#e85d4a"/><path d="M30 56h60l6 18H24z" fill="#cfe8fb"/><circle cx="34" cy="98" r="10" fill="#4a4f5a"/><circle cx="86" cy="98" r="10" fill="#4a4f5a"/>'),
  casa:svg('<path d="M14 58 60 18l46 40" fill="#e85d4a"/><rect x="24" y="56" width="72" height="50" fill="#f6e7c8"/><rect x="50" y="76" width="20" height="30" fill="#a8703a"/><rect x="32" y="66" width="12" height="12" fill="#cfe8fb"/><rect x="76" y="66" width="12" height="12" fill="#cfe8fb"/>'),
  arma:svg('<path d="M14 46h76v16H40l-6 28H18l6-28h-10z" fill="#5d6675"/><path d="M90 50h14" stroke-width="6"/><path d="M44 62c0 8 6 10 12 8"/>'),
  seringa:svg('<path d="M28 92l50-50 12 12-50 50z" fill="#e9f5ff"/><path d="M40 80l30-30 6 6-30 30z" fill="#ef6b6b" stroke="none"/><path d="M84 36l12-12M90 42l12-12M22 98l-10 10"/>'),
  familia:svg('<path d="M14 112c1-18 9-28 22-28s21 10 22 28z" fill="#2c6fd1"/><path d="M62 112c1-18 9-28 22-28s21 10 22 28z" fill="#c25c8a"/>' + cabeca(36, 66, '<path d="M23 62c0-10 6-16 13-16s13 6 13 16c-3-5-8-7-13-7s-10 2-13 7z" fill="' + CABELO + '"/>') + cabeca(84, 66, '<path d="M71 66c-2-13 5-20 13-20s15 7 13 20c-2-7-7-11-13-11s-11 4-13 11z" fill="#7a3e1c"/>'))
};
/* escolha pelo texto: o primeiro padrão que bater define o desenho */
var REGRAS = [
  [/laudo|perito|per[ií]cia|necr[oó]psia|exame de corpo/i, 'laudo'], [/m[eé]dic|atestado|sa[uú]de|hospital|enfermi/i, 'medico'],
  [/auto\b|escriv[aã]o|delegad|inqu[eé]rito|autoridade policial/i, 'delegado'], [/juiz|magistrad|judicial|senten[cç]a|tribunal|\bj[uú]ri\b|\bSTF\b|\bSTJ\b|s[uú]mula/i, 'juiz'],
  [/pol[ií]cia|policial|agente de seguran[cç]a|flagrante|pris[aã]o em flagrante/i, 'policial'], [/pris[aã]o|reclus[aã]o|deten[cç][aã]o|regime (fechado|semiaberto|aberto|inicial)|pena privativa|cumprimento da pena/i, 'cela'],
  [/algema|preso|captura/i, 'algemas'], [/\bpenas?\b|dosimetr|culpabilidade|ilicitude|justi[cç]a|equival|propor|retroag|abolitio/i, 'balanca'],
  [/prescri|\bprazo|\btempo\b|\bdias\b|\banos\b|decad|cronotanat|iter criminis|tentativa/i, 'ampulheta'], [/prova|investiga|identifica|vest[ií]gio|cust[oó]dia|lupa|digital/i, 'lupa'],
  [/\bmorte|cad[aá]ver|[oó]bito|homic[ií]dio|tanatolog|exuma/i, 'caveira'], [/\bvida\b|\bles[aã]o|\bcorpo|\bcorporal|integridade f|asfixia|trauma|\bsangue/i, 'coracao'],
  [/\barmas?\b|disparo|proj[eé]til|\btiros?\b/i, 'arma'], [/droga|t[oó]xic|veneno|embriaguez|subst[aâ]ncia/i, 'seringa'],
  [/patrim[oô]nio|furto|roubo|estelionato|dinheiro|vantagem|valor|fazenda|tribut|peculato|corrup/i, 'dinheiro'], [/tr[aâ]nsito(?! em julgado)|ve[ií]culo|dire[cç][aã]o de ve|\bCTB\b/i, 'carro'],
  [/domic[ií]lio|\bcasa\b|resid[eê]ncia/i, 'casa'], [/fam[ií]lia|filho|crian[cç]a|mulher|vulner[aá]vel|idoso|m[aã]e/i, 'familia'],
  [/v[ií]tima|ofendid|sujeito passivo/i, 'vitima'], [/autor|agente|r[eé]u|acusado|criminos|sujeito ativo|part[ií]cipe|coautor/i, 'criminoso'],
  [/servidor|funcion[aá]rio|administra|[oó]rg[aã]o|entidade|estado|uni[aã]o|munic|poder p[uú]blico/i, 'predio'], [/garantia|\bdireitos?\b|defesa|prote[cç]|seguran[cç]a/i, 'escudo'],
  [/\blei\b|princ[ií]pio|\bnorma|c[oó]digo|constitui|\bartigo|\bfonte/i, 'livro'], [/documento|declara|relat[oó]rio|parecer|registro|certid/i, 'documento'],
  [/requisito|elemento|\blista|esp[eé]cie|classifica|\btipos\b|mnem[oô]nico/i, 'prancheta'], [/objetivo|finalidade|\bdolo|inten[cç]/i, 'alvo']
];
var ROTA = ['prancheta', 'documento', 'lupa', 'balanca', 'livro', 'escudo', 'estudante', 'alvo'];
window.NEXO_ILUSTRA = {
  nomes:Object.keys(D),
  desenho:function(n){ return D[n] || D.documento; },
  escolher:function(texto, i, evitar){
    var t = String(texto || '');
    for(var k = 0; k < REGRAS.length; k++) if(REGRAS[k][0].test(t) && (!evitar || evitar.indexOf(REGRAS[k][1]) < 0)) return REGRAS[k][1];
    var r = ROTA[(i || 0) % ROTA.length]; return r;
  }
};
})();
