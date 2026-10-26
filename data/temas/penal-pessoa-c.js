/* Direito Penal — Crimes contra a Pessoa (III): lesão corporal; periclitação da vida e da saúde; rixa.
   Conferido em 14/10/2026. Texto legal: Código Penal (Planalto), Leis 14.994/2024, 15.134/2025,
   15.159/2025, 15.163/2025, 15.358/2026 e 15.455/2026 (DOU de 02/07/2026). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var L15455 = "https://www.planalto.gov.br/ccivil_03/_Ato2023-2026/2026/Lei/l15455.htm";

/* ======================= LESÃO CORPORAL ======================= */
T.penal_pessoa_07 = {
meta:{ tema:"Lesão corporal (art. 129)", atualizado:AT,
  foco:"Lesão leve, grave, gravíssima e seguida de morte; violência doméstica (§§9º a 11) e de gênero (§13); lesão funcional e em instituição de ensino (§12); antifacção (§§3º-A e 8º-A); culposa, privilégio e ação penal." },
secoes:[
{ id:"simples", titulo:"Lesão leve, privilégio e ação penal", curto:"Simples",
  rapido:["Leve (caput): detenção de <b>3 meses a 1 ano</b> — infração de menor potencial ofensivo. Agressão sem lesão é <b>vias de fato</b> (LCP, art. 21).",
    "Privilégio (§4º): redução de <b>1/6 a 1/3</b>. Substituição da detenção por multa (§5º): só lesão leve, privilegiada ou recíproca."],
  teoria:[
    { h:"Ação penal", p:[
      "Regra: pública incondicionada. Leve e culposa: condicionada à representação (Lei 9.099, art. 88), salvo violência doméstica contra a mulher (incondicionada).",
      "O STF, na ADI 4424, deu interpretação conforme à Lei Maria da Penha: a lesão em violência doméstica contra a mulher é de ação pública incondicionada, qualquer que seja a extensão."]},
    { h:"Formas da lesão, privilégio e preterdolo", p:[
      "Formas do crime: <b>simples</b> (leve, caput), <b>privilegiada</b> (§4º), <b>qualificada pelo resultado</b> (grave, §1º; gravíssima, §2º), <b>preterdolosa</b> (seguida de morte, §3º), <b>culposa</b> (§6º) e <b>majorada</b> (§§7º, 8º-A, 10, 11 e 12). Os §§9º e 13 acrescentam a lesão doméstica e a de gênero.",
      "As qualificadoras dos §§1º a 3º são <b>objetivas</b>: dependem do resultado produzido, não do motivo do agente. O privilégio do §4º (relevante valor social ou moral, ou violenta emoção logo em seguida a injusta provocação) é <b>subjetivo</b>. Por isso a doutrina majoritária admite a combinação do privilégio com as formas dolosas qualificadas pelo resultado (lesão qualificada-privilegiada). O motivo torpe ou fútil não qualifica a lesão: entra na pena-base ou como agravante.",
      "Preterdolo só existe onde o tipo prevê resultado agravador culposo, como no §3º: dolo na lesão e culpa na morte (art. 19). Se houve dolo quanto à morte, direto ou eventual, o crime é homicídio. <b>Não existe “homicídio preterdoloso”</b>, e a lesão seguida de morte não recebe as qualificadoras do art. 121 nem vai a júri. O crime preterdoloso não admite tentativa."]}
  ],
  pegadinhas:["A substituição da detenção por multa (§5º) não cabe em lesão grave: só a leve é punida com detenção."]},
{ id:"qualificadoras", titulo:"Grave, gravíssima, seguida de morte e violência doméstica", curto:"Qualificadoras",
  rapido:["Grave (§1º, 1 a 5 anos): incapacidade para ocupações habituais por <b>mais de 30 dias</b>; perigo de vida; <b>debilidade</b> permanente de membro, sentido ou função; <b>aceleração de parto</b>.",
    "Gravíssima (§2º, 2 a 8 anos): incapacidade <b>permanente para o trabalho</b>; enfermidade incurável; <b>perda ou inutilização</b> de membro, sentido ou função; deformidade permanente; <b>aborto</b>.",
    "Seguida de morte (§3º, 4 a 12 anos): preterdolo — o agente não quis nem assumiu o risco da morte. Não vai a júri. Se ligada a facção/milícia/grupo paramilitar: <b>20 a 40 anos</b> (§3º-A).",
    "§9º: lesão contra ascendente, descendente, irmão, cônjuge, companheiro, <b>pessoa com relação de trabalho doméstico</b> (Lei 15.455/2026) ou com quem conviva ou tenha convivido, ou prevalecendo-se de relações domésticas, de trabalho doméstico, de coabitação ou hospitalidade — reclusão de <b>2 a 5 anos</b>.",
    "§13: lesão contra a <b>mulher por razões da condição do sexo feminino</b> — reclusão de <b>2 a 5 anos</b> (Lei 14.994/2024).",
    "Violência doméstica contra a mulher: ação <b>incondicionada</b> (Súmula 542), sem transação nem sursis processual (Súmula 536), sem substituição por restritivas (Súmula 588), sem insignificância (Súmula 589), sem exigir coabitação (Súmula 600)."],
  teoria:[
    { h:"Lesão grave", p:[
      "Incapacidade por mais de 30 dias = 31 dias ou mais, para qualquer ocupação habitual <b>lícita</b> (trabalho, estudo, lazer). Exige exame complementar após o 30º dia (CPP, art. 168, §2º); a falta pode ser suprida por prova testemunhal.",
      "Perigo de vida: risco concreto de morte, atestado por perícia, sem dolo de matar (se houvesse, seria tentativa de homicídio).",
      "Debilidade: enfraquecimento da função (ex.: perda parcial da audição). Órgãos duplos: perder um rim ou um olho é <b>debilidade</b> (grave), não perda da função.",
      "Aceleração de parto: o bebê nasce vivo antes do tempo. Exige que o agente conheça a gravidez. Se quisesse o aborto e só acelerasse o parto: tentativa de aborto (125)."]},
    { h:"Lesão gravíssima", p:[
      "Incapacidade permanente para o trabalho: prevalece que é para o trabalho em geral, com cautela nos casos de restrição severa.",
      "Perda (mutilação ou amputação) ou inutilização <b>total</b> de membro, sentido ou função. Inutilização parcial = debilidade (grave).",
      "Deformidade permanente: dano estético relevante e duradouro, ainda que em parte não exposta do corpo (prevalece). Cirurgia reparadora posterior não afasta a qualificadora, segundo o STJ, se a vítima não é obrigada a se submeter a ela.",
      "Aborto: resultado culposo. Dolo de aborto → art. 125 + lesão."]},
    { h:"Violência doméstica e de gênero (§§9º e 13)", p:[
      "Os §§9º e 13 qualificam a lesão <b>leve</b> (pela relação ou pelo gênero, não pelo resultado). Se o resultado for grave, gravíssimo ou morte, aplica-se o §1º, §2º ou §3º, com o aumento de 1/3 do §10 (veja a aba Majorantes).",
      "O §9º protege qualquer vítima (homem, mulher, idoso, irmão). O §13 exige vítima mulher e motivação ou vulnerabilidade de gênero (121-A, §1º).",
      "Pena de 2 a 5 anos (desde 10/10/2024): não cabe suspensão condicional do processo. Antes, o §9º era detenção de 3 meses a 3 anos e o §13, reclusão de 1 a 4."]},
    { h:"Lei 15.455/2026", p:[
      "Incluiu expressamente a pessoa com relação de trabalho doméstico e o prevalecimento das relações de trabalho doméstico. Ex.: patrão que agride o jardineiro ou a empregada doméstica responde pelo §9º.",
      "Vigência em 02/07/2026; mais grave, não retroage para fatos anteriores que só se encaixariam pela nova redação. A mesma lei obriga a autoridade policial a comunicar ao MTE e ao MPT, em 48 horas, indícios de trabalho análogo ao de escravo ou de violência doméstica contra trabalhadora doméstica (Lei Maria da Penha, art. 11, parágrafo único)."]}
  ],
  quadro:{ titulo:"Grave × gravíssima", head:["Lesão grave (§1º) — 1 a 5","Lesão gravíssima (§2º) — 2 a 8"], rows:[
    ["Incapacidade para ocupações habituais por mais de 30 dias","Incapacidade permanente para o trabalho"],
    ["Perigo de vida","Enfermidade incurável"],
    ["Debilidade permanente de membro, sentido ou função","Perda ou inutilização de membro, sentido ou função"],
    ["Aceleração de parto","Aborto"],
    ["—","Deformidade permanente"]]},
  pegadinhas:["\"Lesão gravíssima\" é nome doutrinário: o CP chama ambas de \"natureza grave\", mas a pena do §2º é maior.","Lesão grave admite suspensão condicional do processo (pena mínima de 1 ano); gravíssima não.","Lesão leve contra a mulher em contexto doméstico: ação pública <b>incondicionada</b>, mesmo sendo leve.","Retratação da representação não se aplica à lesão doméstica contra a mulher, porque a ação é incondicionada."]},
{ id:"majorantes", titulo:"Majorantes da lesão dolosa (§§7º, 8º-A e 10 a 12)", curto:"Majorantes",
  rapido:["§12, I (+1/3 a 2/3): contra agentes dos arts. 142 e 144, sistema prisional, Força Nacional (parente <b>consanguíneo</b>) ou membros do Judiciário, MP, Defensoria, Advocacia Pública e oficial de justiça (parente <b>inclusive por afinidade</b>); ou <b>nas dependências de instituição de ensino</b>.",
    "§12, II (+2/3 ao dobro): em instituição de ensino <b>e</b> vítima com deficiência/doença limitante ou autor com autoridade sobre ela, professor ou funcionário da instituição.",
    "§8º-A (+2/3): lesão por integrante de facção, milícia ou grupo paramilitar no contexto da atuação do grupo — exceto a lesão seguida de morte, que tem a qualificadora do §3º-A.",
    "§10: se o resultado for grave, gravíssimo ou morte (§§1º a 3º) nas circunstâncias do §9º, aumenta-se <b>1/3</b>. §11: vítima com deficiência no §9º, <b>+1/3</b>.",
    "§7º (+1/3): se ocorrer qualquer das hipóteses dos §§4º e 6º do art. 121 — vítima <b>menor de 14 ou maior de 60</b>, milícia privada ou grupo de extermínio (na lesão <b>culposa</b>, regra técnica, omissão de socorro ou fuga: veja a aba Culposo)."],
  teoria:[
    { h:"Aumentos da violência doméstica (§§10 e 11)", p:[
      "§10: nos casos dos §§1º a 3º (lesão grave, gravíssima ou seguida de morte), se as circunstâncias são as do §9º, aumenta-se a pena em <b>1/3</b>.",
      "§11: na hipótese do §9º, a pena aumenta <b>1/3</b> se a vítima é pessoa com deficiência."]},
    { h:"Comparação com o homicídio", p:[
      "Contra agente de segurança ou em instituição de ensino: no homicídio é <b>qualificadora</b>; na lesão, <b>majorante</b>.",
      "Lesão gravíssima e seguida de morte contra esses agentes, seus familiares ou em instituição de ensino são <b>hediondas</b> (Lei 8.072, art. 1º, I-A, com a redação da Lei 15.159/2025)."]}
  ],
  pegadinhas:["§12, I, c (ensino): +1/3 a 2/3. §12, II (ensino + vítima vulnerável ou autor professor/com autoridade): +2/3 ao dobro."]},
{ id:"culposo", titulo:"Lesão culposa e perdão judicial", curto:"Culposo",
  rapido:["Lesão culposa (§6º): detenção de <b>2 meses a 1 ano</b>. Sem gradação: não existe \"lesão culposa gravíssima\".",
    "Majorante de <b>1/3</b> (§7º, remetendo ao 121, §4º): regra técnica, omissão de socorro, fuga do flagrante. <b>Perdão judicial</b> (§8º).",
    "No trânsito: CTB, art. 303 (especialidade)."],
  teoria:[
    { h:"Lesão culposa", p:[
      "§6º: detenção de 2 meses a 1 ano. <b>Não há gradação</b>: lesão culposa que deforma a vítima continua lesão culposa simples.",
      "Majorante de 1/3 (§7º, remetendo ao 121, §4º): regra técnica, omissão de socorro, fuga do flagrante. Perdão judicial (§8º).",
      "No trânsito: CTB, art. 303 (especialidade)."]}
  ],
  pegadinhas:["Lesão culposa que deforma a vítima continua sendo lesão culposa simples (§6º): <b>não há gradação</b>.","Lesão leve e culposa: ação condicionada à representação (Lei 9.099, art. 88)."]}
],
lei:[
{ art:"CP, art. 129, caput, §§4º e 5º", nome:"Lesão simples e privilégio", sec:"simples", itens:[
  { id:"cp129", rot:"Art. 129, caput", t:"<b class='g1'>Ofender a integridade corporal ou a saúde</b> de outrem:<br>Pena - detenção, de <b class='g2'>três meses a um ano</b>.", c:["lc1"] },
  { id:"cp129p", rot:"§§4º e 5º", t:"§ 4° Se o agente comete o crime impelido por motivo de <b class='g1'>relevante valor social ou moral</b> ou sob o <b class='g1'>domínio de violenta emoção, logo em seguida a injusta provocação</b> da vítima, o juiz pode reduzir a pena de <b class='g2'>um sexto a um terço</b>.<br>§ 5° O juiz, <b class='g3'>não sendo graves as lesões</b>, pode ainda substituir a pena de detenção pela de multa: I - se ocorre qualquer das hipóteses do parágrafo anterior; II - se as <b class='g1'>lesões são recíprocas</b>.", c:["lc14"] }
]},
{ art:"CP, art. 129, §§1º a 3º-A, 9º e 13", nome:"Lesão qualificada", sec:"qualificadoras", itens:[
  { id:"cp129g", rot:"§§1º e 2º", t:"§ 1º Se resulta:<br>I - Incapacidade para as ocupações habituais, por <b class='g2'>mais de trinta dias</b>;<br>II - <b class='g1'>perigo de vida</b>;<br>III - <b class='g1'>debilidade</b> permanente de membro, sentido ou função;<br>IV - <b class='g1'>aceleração de parto</b>:<br>Pena - reclusão, de <b class='g2'>um a cinco anos</b>.<br>§ 2° Se resulta:<br>I - Incapacidade <b class='g1'>permanente para o trabalho</b>;<br>II - <b class='g1'>enfermidade incurável</b>;<br>III - <b class='g1'>perda ou inutilização</b> do membro, sentido ou função;<br>IV - <b class='g1'>deformidade permanente</b>;<br>V - <b class='g1'>aborto</b>:<br>Pena - reclusão, de <b class='g2'>dois a oito anos</b>.", c:["lc2","lc3","lc4","lc5"] },
  { id:"cp129m", rot:"§§3º e 3º-A", t:"§ 3° Se resulta morte e as circunstâncias evidenciam que o agente <b class='g3'>não quis o resultado, nem assumiu o risco de produzi-lo</b>:<br>Pena - reclusão, de <b class='g2'>quatro a doze anos</b>.<br>§ 3º-A. No crime previsto no § 3º deste artigo, se cometido <b class='g1'>no contexto da atuação ou para a consecução das condutas</b> previstas no art. 2º da lei que institui o marco legal do combate ao crime organizado no Brasil:<br>Pena - reclusão, de <b class='g2'>20 (vinte) a 40 (quarenta) anos</b>.", nota:"§3º-A incluído pela Lei 15.358/2026.", novo:true, c:["lc6","lc7"] },
  { id:"cp129d9", rot:"§9º", t:"§ 9º Se a lesão for praticada contra <b class='g1'>ascendente, descendente, irmão, cônjuge ou companheiro, pessoa com relação de trabalho doméstico</b> ou com quem <b class='g1'>conviva ou tenha convivido</b>, ou, ainda, prevalecendo-se o agente das relações domésticas, de trabalho doméstico, de coabitação ou de hospitalidade:<br>Pena – reclusão, de <b class='g2'>2 (dois) a 5 (cinco) anos</b>.", nota:"Redação do caput do §9º pela Lei 15.455/2026; pena pela Lei 14.994/2024.", novo:true, c:["lc9","lc11"], j:["stj-s542-lc","stj-s536","stj-s588","stj-s589","stj-s600"] },
  { id:"cp129g13", rot:"§13", t:"§ 13. Se a lesão é praticada <b class='g1'>contra a mulher, por razões da condição do sexo feminino</b>, nos termos do § 1º do art. 121-A deste Código:<br>Pena – reclusão, de <b class='g2'>2 (dois) a 5 (cinco) anos</b>.", nota:"Redação da Lei 14.994/2024.", novo:true, c:["lc12"] }
]},
{ art:"CP, art. 129, §§7º, 8º-A e 10 a 12", nome:"Majorantes da lesão dolosa", sec:"majorantes", itens:[
  { id:"cp129c7", rot:"§7º", t:"§ 7º Aumenta-se a pena de <b class='g2'>1/3</b> se ocorrer qualquer das hipóteses dos §§ 4º e 6º do art. 121 deste Código." },
  { id:"cp129c8a", rot:"§8º-A", t:"§ 8º-A. <b class='g3'>Com exceção do disposto no § 3º-A</b> deste artigo, aumenta-se a pena em <b class='g2'>2/3</b> se a lesão é praticada por <b class='g1'>integrante de organização criminosa ultraviolenta, grupo paramilitar ou milícia privada</b>, no contexto da atuação ou para a consecução das condutas previstas no art. 2º da lei que institui o marco legal do combate ao crime organizado no Brasil.", nota:"§8º-A incluído pela Lei 15.358/2026.", novo:true, c:["lc7"] },
  { id:"cp129d10", rot:"§§10 e 11", t:"§ 10. Nos casos previstos nos <b class='g3'>§§ 1º a 3º</b> deste artigo, se as circunstâncias são as indicadas no § 9º deste artigo, aumenta-se a pena em <b class='g2'>1/3</b>.<br>§ 11. Na hipótese do § 9º deste artigo, a pena será aumentada de <b class='g2'>um terço</b> se o crime for cometido contra <b class='g1'>pessoa portadora de deficiência</b>.", c:["lc10"] },
  { id:"cp129f", rot:"§12", t:"§ 12. Aumenta-se a pena de:<br>I - <b class='g2'>1/3 (um terço) a 2/3 (dois terços)</b> se a lesão dolosa for praticada:<br>a) contra autoridade ou agente descrito nos arts. 142 e 144 da Constituição Federal ou integrantes do sistema prisional ou da Força Nacional de Segurança Pública, no exercício da função ou em decorrência dela, ou contra seu cônjuge, companheiro ou <b class='g3'>parente consanguíneo</b> até terceiro grau, em razão dessa condição;<br>b) contra membro do Poder Judiciário, do Ministério Público, da Defensoria Pública ou da Advocacia Pública, de que tratam os arts. 131 e 132 da Constituição Federal, ou oficial de justiça, no exercício da função ou em decorrência dela, ou contra seu cônjuge, companheiro ou parente, <b class='g3'>inclusive por afinidade</b>, até o terceiro grau, em razão dessa condição; ou<br>c) <b class='g1'>nas dependências de instituição de ensino</b>;<br>II - <b class='g2'>2/3 (dois terços) ao dobro</b> se a lesão dolosa for praticada nas dependências de instituição de ensino e:<br>a) a vítima for pessoa com deficiência ou com doença que acarrete condição limitante ou de vulnerabilidade física ou mental; ou<br>b) o autor for ascendente, padrasto ou madrasta, tio, irmão, cônjuge, companheiro, tutor, curador, preceptor ou empregador da vítima ou por qualquer outro título tiver autoridade sobre ela ou, ainda, for <b class='g1'>professor ou funcionário da instituição de ensino</b>.", nota:"Redação da Lei 15.159/2025.", novo:true, c:["lc13","lc15"] }
]},
{ art:"CP, art. 129, §§6º e 8º", nome:"Lesão culposa e perdão judicial", sec:"culposo", itens:[
  { id:"cp129c6", rot:"§6º", t:"§ 6° Se a lesão é <b class='g1'>culposa</b>:<br>Pena - detenção, de <b class='g2'>dois meses a um ano</b>.", c:["lc8"] },
  { id:"cp129c8", rot:"§8º", t:"§ 8º - Aplica-se à lesão culposa o disposto no § 5º do art. 121 (<b class='g1'>perdão judicial</b>)." }
]}
],
juris:[
{ id:"stj-s542-lc", trib:"STJ", tipo:"Súmula", num:"542", sec:"qualificadoras", status:"vigente", data:"",
  titulo:"Ação penal incondicionada", texto:"A ação penal relativa ao crime de lesão corporal resultante de violência doméstica contra a mulher é pública incondicionada.",
  explica:"No mesmo sentido, STF, ADI 4424 (2012). Vale também para a lesão leve.", lei:["cp129d9","cp129g13"], fonte:STJS },
{ id:"stj-s536", trib:"STJ", tipo:"Súmula", num:"536", sec:"qualificadoras", status:"vigente", data:"",
  titulo:"Sem transação e sem sursis processual", texto:"A suspensão condicional do processo e a transação penal não se aplicam na hipótese de delitos sujeitos ao rito da Lei Maria da Penha.",
  explica:"Reflexo do art. 41 da Lei 11.340/2006 (não se aplica a Lei 9.099/95).", lei:["cp129d9"], fonte:STJS },
{ id:"stj-s588", trib:"STJ", tipo:"Súmula", num:"588", sec:"qualificadoras", status:"vigente", data:"",
  titulo:"Sem penas restritivas de direitos", texto:"A prática de crime ou contravenção penal contra a mulher com violência ou grave ameaça no ambiente doméstico impossibilita a substituição da pena privativa de liberdade por restritiva de direitos.",
  explica:"Alcança também as contravenções (ex.: vias de fato).", lei:["cp129d9"], fonte:STJS },
{ id:"stj-s589", trib:"STJ", tipo:"Súmula", num:"589", sec:"qualificadoras", status:"vigente", data:"",
  titulo:"Sem insignificância", texto:"É inaplicável o princípio da insignificância nos crimes ou contravenções penais praticados contra a mulher no âmbito das relações domésticas.",
  explica:"Mesmo lesão levíssima.", lei:["cp129d9"], fonte:STJS },
{ id:"stj-s600", trib:"STJ", tipo:"Súmula", num:"600", sec:"qualificadoras", status:"vigente", data:"",
  titulo:"Sem exigência de coabitação", texto:"Para configuração da violência doméstica e familiar prevista no artigo 5º da Lei 11.340/2006, Lei Maria da Penha, não se exige a coabitação entre autor e vítima.",
  explica:"Namoro e ex-relacionamentos entram.", lei:["cp129d9","cp129g13"], fonte:STJS },
{ id:"stf-adi4424", trib:"STF", tipo:"ADI", num:"4424", sec:"qualificadoras", status:"vigente", data:"Plenário, 09/02/2012",
  titulo:"Lei Maria da Penha: lesão sem representação", texto:"Interpretação conforme aos arts. 12, I, 16 e 41 da Lei 11.340/2006 para assentar a natureza incondicionada da ação penal em caso de crime de lesão corporal, pouco importando a extensão desta, praticado contra a mulher no ambiente doméstico.",
  explica:"Origem da Súmula 542 do STJ.", lei:["cp129d9"], fonte:STFJ },
{ id:"lei15455", trib:"Legislação", tipo:"Lei", num:"15.455/2026", sec:"qualificadoras", status:"vigente", data:"DOU 02/07/2026",
  titulo:"Trabalho doméstico no §9º", texto:"Altera o art. 129, §9º, do CP para incluir a pessoa com relação de trabalho doméstico e o prevalecimento das relações de trabalho doméstico; acrescenta parágrafo único ao art. 11 da Lei Maria da Penha (comunicação ao MTE e ao MPT em 48 horas).",
  explica:"Também prevê medidas assistenciais para trabalhadores resgatados de condição análoga à de escravo (seguro-desemprego, CadÚnico, Bolsa Família).", lei:["cp129d9"], fonte:L15455 }
],
cards:[
{ id:"lc1", tipo:"distincao", sec:"simples", f:"Lesão leve × vias de fato.", v:"<b>Lesão</b>: ofende a integridade ou a saúde (há dano). <b>Vias de fato</b> (LCP, art. 21): violência sem lesão (empurrão, puxão de cabelo).", lei:["cp129"] },
{ id:"lc2", tipo:"numero", sec:"qualificadoras", f:"Incapacidade para as ocupações habituais: quantos dias para ser grave?", v:"<b>Mais de 30</b> (31 ou mais). Com exatos 30, é leve.", lei:["cp129g"] },
{ id:"lc3", tipo:"caso", sec:"qualificadoras", f:"Ladrão profissional fica 40 dias sem poder \"trabalhar\" após ser agredido. Lesão grave?", v:"<b>Não.</b> A ocupação habitual precisa ser <b>lícita</b>. Lesão leve.", lei:["cp129g"] },
{ id:"lc4", tipo:"caso", sec:"qualificadoras", f:"Vítima perde a visão de um olho. Grave ou gravíssima?", v:"<b>Grave</b> (debilidade da visão). Órgão duplo: a função persiste com o outro olho.", lei:["cp129g"] },
{ id:"lc5", tipo:"distincao", sec:"qualificadoras", f:"Debilidade × inutilização.", v:"<b>Debilidade</b>: enfraquecimento (grave, §1º, III). <b>Inutilização</b>: perda total da função, ainda que o membro permaneça (gravíssima, §2º, III).", lei:["cp129g"] },
{ id:"lc6", tipo:"caso", sec:"qualificadoras", f:"Soco no rosto; a vítima cai, bate a cabeça e morre. Agente queria só machucar.", v:"<b>Lesão corporal seguida de morte</b> (129, §3º — 4 a 12). Preterdolo. Não vai a júri.", lei:["cp129m"] },
{ id:"lc7", tipo:"distincao", sec:"qualificadoras", f:"Lesão por integrante de facção no contexto do grupo: §3º-A × §8º-A.", v:"Se resulta <b>morte</b> (preterdolosa): qualificadora do <b>§3º-A</b> (20 a 40). Demais lesões: <b>+2/3</b> (§8º-A). Não se somam.", lei:["cp129m","cp129c8a"] },
{ id:"lc8", tipo:"ce", sec:"culposo", f:"Certo ou errado: lesão culposa que causa deformidade permanente é \"lesão culposa gravíssima\".", v:"<b>Errado.</b> Não há gradação na lesão culposa (§6º).", lei:["cp129c6"] },
{ id:"lc9", tipo:"caso", sec:"qualificadoras", f:"Irmão de 25 anos agride o irmão de 18 por causa de tarefas da casa; lesão leve. Enquadramento e pena?", v:"<b>129, §9º</b> — reclusão de 2 a 5 anos (vítima homem também entra no §9º).", lei:["cp129d9"] },
{ id:"lc10", tipo:"caso", sec:"majorantes", f:"Marido agride a esposa e ela fica 45 dias incapacitada. Enquadramento?", v:"<b>129, §1º, I</b> (lesão grave) com aumento de <b>1/3</b> do §10. Ação incondicionada.", lei:["cp129d10"] },
{ id:"lc11", tipo:"caso", sec:"qualificadoras", f:"Patrão agride o jardineiro que trabalha na casa (fato de agosto de 2026). Enquadramento?", v:"<b>129, §9º</b>: relação de trabalho doméstico, incluída pela Lei 15.455/2026.", lei:["cp129d9"], j:["lei15455"] },
{ id:"lc12", tipo:"juris", sec:"qualificadoras", f:"Lesão leve do namorado contra a namorada: cabe transação penal? Precisa de representação?", v:"<b>Não</b> e <b>não</b>: Súmulas 536 e 542 do STJ.", lei:["cp129g13"], j:["stj-s536","stj-s542-lc"] },
{ id:"lc13", tipo:"caso", sec:"majorantes", f:"Pai de aluno agride outro pai durante reunião na escola. E se fosse o professor agredindo o aluno?", v:"Pai × pai: <b>+1/3 a 2/3</b> (§12, I, c). Professor × aluno: <b>+2/3 ao dobro</b> (§12, II, b).", lei:["cp129f"] },
{ id:"lc14", tipo:"ce", sec:"simples", f:"Certo ou errado: na lesão grave recíproca, o juiz pode substituir a pena por multa.", v:"<b>Errado.</b> O §5º só vale \"não sendo graves as lesões\".", lei:["cp129p"] },
{ id:"lc15", tipo:"distincao", sec:"majorantes", f:"Agredir policial em razão da função: homicídio × lesão.", v:"Homicídio: <b>qualificadora</b> (121, §2º, VII). Lesão: <b>majorante</b> de 1/3 a 2/3 (129, §12, I). Lesão gravíssima ou seguida de morte nesse caso é hedionda.", lei:["cp129f"] }
],
importancia:{ nivel:5,
  texto:"Lesão corporal é muito cobrada em provas policiais: graduação (leve, grave, gravíssima), preterdolo, violência doméstica e de gênero, e as novas majorantes das Leis 14.994/2024, 15.159/2025, 15.358/2026 e 15.455/2026.",
  decore:[
    ["Lesão leve (caput)","detenção de <b>3 meses a 1 ano</b>"],
    ["Lesão grave (§1º)","reclusão de <b>1 a 5 anos</b>; incapacidade por <b>mais de 30 dias</b>, perigo de vida, debilidade permanente, aceleração de parto"],
    ["Lesão gravíssima (§2º)","reclusão de <b>2 a 8 anos</b>; incapacidade permanente, enfermidade incurável, perda ou inutilização, deformidade, aborto"],
    ["Lesão seguida de morte (§3º)","reclusão de <b>4 a 12 anos</b>; preterdolo; fora do júri"],
    ["Facção, milícia ou paramilitar","§3º-A: <b>20 a 40 anos</b>; §8º-A: <b>+2/3</b> nas demais lesões"],
    ["Privilégio (§4º)","reduz <b>1/6 a 1/3</b>"],
    ["Lesão culposa (§6º)","detenção de <b>2 meses a 1 ano</b>"],
    ["Violência doméstica (§9º) e de gênero (§13)","reclusão de <b>2 a 5 anos</b>"],
    ["Aumento no §10","<b>+1/3</b> nos §§1º a 3º com circunstâncias do §9º"],
    ["Súmula 542 do STJ","lesão em violência doméstica contra a mulher: ação <b>incondicionada</b>"]],
  macetes:[
    ["Grave: “IPDA”","<b>I</b>ncapacidade por mais de 30 dias, <b>P</b>erigo de vida, <b>D</b>ebilidade permanente, <b>A</b>celeração de parto."],
    ["Gravíssima: “IEPDA”","<b>I</b>ncapacidade permanente, <b>E</b>nfermidade incurável, <b>P</b>erda ou inutilização, <b>D</b>eformidade permanente, <b>A</b>borto."],
    ["Preterdolo: dolo na ida, culpa na volta","Quer machucar e mata sem querer nem assumir o risco: art. 129, §3º. É a forma preterdolosa; não existe “homicídio preterdoloso”."],
    ["Debilidade é grave, inutilização é gravíssima","Perder um olho ou um rim é debilidade (órgão duplo). Perda ou inutilização total da função é gravíssima."]] },
comparativo:{ titulo:"Qualificado × majorado na lesão corporal", head:["Qualificada (novo patamar de pena)","Majorada (fração sobre a pena)"], rows:[
  ["<b>O que faz:</b> cria outra moldura: §1º (1 a 5), §2º (2 a 8), §3º (4 a 12), §3º-A (20 a 40), §9º e §13 (2 a 5)","<b>O que faz:</b> fração aplicada na 3ª fase: §7º (+1/3), §8º-A (+2/3), §10 e §11 (+1/3), §12 (1/3 a 2/3 e 2/3 ao dobro)"],
  ["<b>Natureza:</b> pelo resultado (§§1º a 3º, objetiva), pela relação (§9º) ou pelo gênero (§13)","<b>Natureza:</b> pela vítima, pelo local ou pelo autor: agente de segurança, instituição de ensino, deficiência, facção"],
  ["<b>Facção:</b> lesão seguida de morte tem qualificadora (§3º-A)","<b>Facção:</b> nas demais lesões, majorante de 2/3 (§8º-A); não se soma à qualificadora do §3º-A"],
  ["<b>Violência doméstica:</b> o §9º qualifica a lesão leve","<b>Violência doméstica:</b> o §10 aumenta 1/3 quando o resultado é grave, gravíssimo ou morte"],
  ["<b>Privilégio (§4º):</b> redução de 1/6 a 1/3 por relevante valor social ou moral ou violenta emoção após injusta provocação","<b>Forma culposa:</b> não há graduação; só a majorante do §7º, que remete ao art. 121, §4º, e o perdão judicial do §8º"]]},
prova:[
  { tipo:"ce", enun:"A incapacidade para as ocupações habituais por exatamente 30 dias configura lesão corporal grave.", gab:"Errado", com:"A lei exige incapacidade por mais de 30 dias (31 ou mais). Com 30 dias, a lesão é leve." },
  { tipo:"ce", enun:"A perda de um dos olhos configura lesão corporal gravíssima por perda de sentido.", gab:"Errado", com:"Por ser órgão duplo, a perda de um olho é debilidade de sentido, lesão grave (§1º, III)." },
  { tipo:"ce", enun:"O agente que quer apenas machucar e, sem querer nem assumir o risco, causa a morte da vítima responde por lesão corporal seguida de morte, e não por homicídio.", gab:"Certo", com:"É a forma preterdolosa do art. 129, §3º (4 a 12 anos). O crime não vai a júri e não admite as qualificadoras do art. 121." },
  { tipo:"ce", enun:"A lesão corporal culposa que deixa deformidade permanente na vítima é lesão culposa gravíssima.", gab:"Errado", com:"Não há gradação na lesão culposa: aplica-se sempre o §6º (detenção de 2 meses a 1 ano)." },
  { tipo:"caso", enun:"Marido agride a esposa e a deixa 45 dias incapacitada para as ocupações habituais. Qual o enquadramento e a ação penal?", com:"Lesão grave (§1º, I) com aumento de 1/3 do §10, por serem as circunstâncias do §9º. Ação pública incondicionada (violência doméstica contra a mulher)." },
  { tipo:"ce", enun:"A lesão corporal dolosa praticada contra agente de segurança em razão da função é qualificadora do art. 129, assim como o é no homicídio.", gab:"Errado", com:"No homicídio é qualificadora (art. 121, §2º, VII). Na lesão é causa de aumento de 1/3 a 2/3 (art. 129, §12, I)." }],
resumo:[
  "Lesão leve: detenção de 3 meses a 1 ano. Agressão sem lesão é vias de fato (LCP, art. 21).",
  "Lesão grave (§1º) e gravíssima (§2º) são qualificadas pelo <b>resultado</b>; os resultados podem ser dolosos ou preterdolosos (art. 19).",
  "Lesão seguida de morte (§3º): preterdolo, dolo na lesão e culpa na morte, de 4 a 12 anos, fora do júri. Com contexto de facção, 20 a 40 anos (§3º-A).",
  "Privilégio (§4º) é subjetivo e reduz de 1/6 a 1/3. A substituição por multa (§5º) só vale se as lesões não são graves.",
  "Lesão culposa (§6º): 2 meses a 1 ano; sem graduação; majorante do §7º e perdão judicial.",
  "§9º (relação doméstica, inclusive trabalho doméstico, Lei 15.455/2026) e §13 (gênero): reclusão de 2 a 5 anos; §10 e §11 aumentam 1/3.",
  "§12: majorante para agentes de segurança, Judiciário, MP e afins, e instituições de ensino. §8º-A: +2/3 para facção.",
  "Violência doméstica contra a mulher: ação incondicionada (Súm. 542), sem transação e sursis (Súm. 536), sem restritivas (Súm. 588), sem insignificância (Súm. 589), sem coabitação (Súm. 600)."],
checklist:[
  "Listar os incisos da lesão grave e da gravíssima",
  "Diferenciar debilidade de perda ou inutilização",
  "Explicar o preterdolo do §3º e por que não há “homicídio preterdoloso”",
  "Diferenciar o §3º-A (qualificadora) do §8º-A (majorante)",
  "Aplicar os §§9º, 10, 11 e 13 em casos de violência doméstica",
  "Comparar a circunstância no homicídio (qualifica) e na lesão (majora)",
  "Aplicar as Súmulas 536, 542, 588, 589 e 600 do STJ",
  "Explicar a lesão culposa, o §7º e o perdão judicial"],
questoes:[]
};

/* ======================= PERICLITAÇÃO E RIXA ======================= */
T.penal_pessoa_08 = {
meta:{ tema:"Periclitação da vida e da saúde, omissão de socorro e rixa (arts. 130 a 137)", atualizado:AT,
  foco:"Crimes de perigo (contágio venéreo e de moléstia grave, perigo para a vida), abandono de incapaz e maus-tratos com as penas da Lei 15.163/2025, omissão de socorro, art. 135-A e rixa." },
secoes:[
{ id:"perigo", titulo:"Contágio e perigo para a vida", curto:"Perigo",
  rapido:["Art. 130: expor alguém, por <b>relação sexual ou ato libidinoso</b>, a contágio de moléstia venérea de que <b>sabe ou deve saber</b> estar contaminado — detenção de 3 meses a 1 ano, ou multa. Com <b>intenção de transmitir</b> (§1º): reclusão de 1 a 4 anos. Ação por <b>representação</b>.",
    "Art. 131: praticar, <b>com o fim de transmitir</b> moléstia grave, ato capaz de produzir o contágio — reclusão de 1 a 4 anos. Forma livre; dolo específico (sem dolo eventual).",
    "Art. 132: expor a vida ou a saúde de outrem a <b>perigo direto e iminente</b> — detenção de 3 meses a 1 ano, <b>se o fato não constitui crime mais grave</b> (subsidiariedade expressa). +1/6 a 1/3 no transporte irregular de trabalhadores."],
  teoria:[
    { h:"Pontos de prova", p:[
      "130: crime de forma vinculada (só por relação sexual ou ato libidinoso). O consentimento da vítima é irrelevante. Vítima já contaminada: crime impossível. Consuma-se com o ato, ainda que não haja contágio.",
      "131: se a vítima é contaminada e sofre só lesão leve, absorvida; se lesão grave, gravíssima ou morte, responde pelo resultado (lesão ou, havendo dolo de matar, homicídio).",
      "132: perigo concreto, dolo de perigo (não de dano). Crime subsidiário: se o agente quer matar, é tentativa de homicídio."]}
  ],
  pegadinhas:["Dos crimes de periclitação, só o art. 130 é de ação condicionada à representação.","\"Sabe ou deve saber\" (130) admite dolo eventual; \"com o fim de transmitir\" (131) exige dolo específico."]},
{ id:"abandono", titulo:"Abandono de incapaz, de recém-nascido e maus-tratos", curto:"Abandono",
  rapido:["Art. 133 (abandono de incapaz) e art. 136 (maus-tratos), após a <b>Lei 15.163/2025</b>: reclusão de <b>2 a 5</b>; lesão grave, <b>3 a 7</b>; morte, <b>8 a 14</b>.",
    "Art. 133, §3º (+1/3): lugar ermo; agente ascendente, descendente, cônjuge, irmão, tutor ou curador; vítima maior de 60 anos.",
    "Art. 134: expor ou abandonar <b>recém-nascido para ocultar desonra própria</b> — detenção de 6 meses a 2 anos (1 a 3 se lesão grave; 2 a 6 se morte).",
    "Art. 136: expor a perigo pessoa sob autoridade, guarda ou vigilância, <b>para fim de educação, ensino, tratamento ou custódia</b>, privando de alimentos ou cuidados, sujeitando a trabalho excessivo ou abusando de meios de correção. +1/3 se vítima menor de 14."],
  teoria:[
    { h:"Abandono de incapaz", p:[
      "Crime próprio: exige dever de cuidado, guarda, vigilância ou autoridade. \"Incapaz\" é quem não pode se defender dos riscos do abandono (critério concreto, não civil). Adolescente maduro de 15 anos sozinho por 3 horas em casa: não há crime.",
      "Dolo de perigo. Se o agente abandona querendo a morte (ou assumindo esse risco, como deixar o bebê em matagal isolado), é homicídio (tentado ou consumado)."]},
    { h:"Maus-tratos × tortura × ECA × Estatuto da Pessoa Idosa", p:[
      "Maus-tratos: dolo de perigo com finalidade de educar, ensinar, tratar ou custodiar, abusando dos meios. Tortura-castigo (Lei 9.455, art. 1º, II): intenso sofrimento físico ou mental como forma de castigo ou medida preventiva.",
      "Expor criança a vexame ou constrangimento sem perigo à vida ou à saúde: ECA, art. 232.",
      "Vítima com 60 anos ou mais: Estatuto da Pessoa Idosa, art. 99 (penas também alteradas pela Lei 15.163/2025)."]}
  ],
  quadro:{ titulo:"Penas após a Lei 15.163/2025", head:["Crime","Simples","Lesão grave","Morte"], rows:[
    ["Abandono de incapaz (133)","Reclusão 2 a 5","Reclusão 3 a 7","Reclusão 8 a 14"],
    ["Maus-tratos (136)","Reclusão 2 a 5","Reclusão 3 a 7","Reclusão 8 a 14"],
    ["Maus-tratos à pessoa idosa (EPI, art. 99)","Reclusão 2 a 5","Reclusão 3 a 7","Reclusão 8 a 14"],
    ["Abandono de recém-nascido (134)","Detenção 6m a 2","Detenção 1 a 3","Detenção 2 a 6"]]},
  pegadinhas:["O art. 134 não mudou com a Lei 15.163/2025: continua com detenção.","Lesões leves nos maus-tratos ficam absorvidas."]},
{ id:"socorro", titulo:"Omissão de socorro e art. 135-A", curto:"Socorro",
  rapido:["Art. 135: deixar de prestar assistência, <b>quando possível sem risco pessoal</b>, a criança abandonada ou extraviada, pessoa inválida ou ferida, ao desamparo ou em grave e iminente perigo; ou não pedir o socorro da autoridade — detenção de 1 a 6 meses, ou multa. +1/2 se lesão grave; <b>triplica</b> se morte.",
    "Omissivo próprio: não admite tentativa. Quem pode socorrer diretamente não pode escolher apenas chamar a autoridade.",
    "Art. 135-A: exigir cheque-caução, nota promissória, garantia ou preenchimento prévio de formulários como condição para <b>atendimento emergencial</b> — detenção de 3 meses a 1 ano e multa; até o dobro (lesão grave) e até o triplo (morte)."],
  teoria:[
    { h:"Especialidades", p:[
      "Condutor envolvido no sinistro que não socorre: CTB, art. 304. Quem só passava e não socorreu: art. 135 do CP.",
      "Vítima idosa: Estatuto da Pessoa Idosa, art. 97.",
      "Quem causou dolosamente o perigo querendo o dano (ex.: esfaqueou para matar) não responde também por omissão de socorro: responde pelo crime de dano.",
      "A recusa da vítima não exime de socorrer, salvo se impossibilitar o socorro."]}
  ],
  pegadinhas:["Omissão de socorro: lesão grave = +metade; morte = pena triplicada. Art. 135-A: até o dobro e até o triplo.","Não há crime se o socorro geraria risco pessoal ao omitente (o risco a terceiros ou patrimonial não exclui o dever)."]},
{ id:"rixa", titulo:"Rixa", curto:"Rixa",
  rapido:["Participar de rixa, salvo para separar os contendores — detenção de <b>15 dias a 2 meses</b>, ou multa.",
    "Rixa: briga generalizada de <b>3 ou mais</b> pessoas, sem grupos definidos. Dois grupos identificáveis → lesões recíprocas, não rixa.",
    "Qualificada (parágrafo único): se ocorre <b>morte ou lesão grave</b> — detenção de <b>6 meses a 2 anos</b>, pelo fato da participação."],
  teoria:[
    { h:"Rixa qualificada", p:[
      "Prevalece que <b>todos</b> os participantes respondem pela rixa qualificada; quem causou a lesão grave ou a morte responde também pelo crime correspondente (lesão ou homicídio), em concurso.",
      "Quem saiu antes do resultado responde pela forma qualificada (contribuiu para a rixa). Quem entrou depois do resultado responde pela simples.",
      "Várias mortes ou lesões graves não multiplicam a rixa: um só crime qualificado, com reflexo na pena-base.",
      "Tentativa: possível na rixa <i>ex proposito</i> (combinada); não na <i>ex improviso</i>."]}
  ],
  pegadinhas:["Crime de concurso necessário: exige pelo menos 3 rixosos, mas inimputáveis contam para o número.","Quem entra para separar não comete crime."]}
],
lei:[
{ art:"CP, arts. 130 a 132", nome:"Crimes de perigo", sec:"perigo", itens:[
  { id:"cp130", rot:"Art. 130", t:"Expor alguém, por meio de <b class='g1'>relações sexuais ou qualquer ato libidinoso</b>, a contágio de moléstia venérea, de que <b class='g1'>sabe ou deve saber</b> que está contaminado:<br>Pena - detenção, de <b class='g2'>três meses a um ano, ou multa</b>.<br>§ 1º - Se é <b class='g1'>intenção do agente transmitir</b> a moléstia:<br>Pena - reclusão, de <b class='g2'>um a quatro anos, e multa</b>.<br>§ 2º - <b class='g3'>Somente se procede mediante representação</b>.", c:["pc1","pc2"] },
  { id:"cp131", rot:"Art. 131", t:"Praticar, <b class='g1'>com o fim de transmitir</b> a outrem moléstia grave de que está contaminado, ato capaz de produzir o contágio:<br>Pena - reclusão, de <b class='g2'>um a quatro anos, e multa</b>.", c:["pc2"] },
  { id:"cp132", rot:"Art. 132", t:"Expor a vida ou a saúde de outrem a <b class='g1'>perigo direto e iminente</b>:<br>Pena - detenção, de <b class='g2'>três meses a um ano</b>, <b class='g3'>se o fato não constitui crime mais grave</b>.<br>Parágrafo único. A pena é aumentada de <b class='g2'>um sexto a um terço</b> se a exposição da vida ou da saúde de outrem a perigo decorre do <b class='g1'>transporte de pessoas para a prestação de serviços</b> em estabelecimentos de qualquer natureza, em desacordo com as normas legais.", c:["pc3"] }
]},
{ art:"CP, arts. 133, 134 e 136", nome:"Abandono e maus-tratos", sec:"abandono", itens:[
  { id:"cp133", rot:"Art. 133", t:"<b class='g1'>Abandonar</b> pessoa que está sob seu <b class='g1'>cuidado, guarda, vigilância ou autoridade</b>, e, por qualquer motivo, <b class='g1'>incapaz de defender-se</b> dos riscos resultantes do abandono:<br>Pena - reclusão, de <b class='g2'>2 (dois) a 5 (cinco) anos</b>.<br>§ 1º - Se do abandono resulta lesão corporal de natureza grave: Pena - reclusão, de <b class='g2'>3 (três) a 7 (sete) anos</b>.<br>§ 2º - Se resulta a morte: Pena - reclusão, de <b class='g2'>8 (oito) a 14 (quatorze) anos</b>.<br>§ 3º - As penas cominadas neste artigo aumentam-se de <b class='g2'>um terço</b>: I - se o abandono ocorre em <b class='g1'>lugar ermo</b>; II - se o agente é <b class='g1'>ascendente ou descendente, cônjuge, irmão, tutor ou curador</b> da vítima; III - se a vítima é <b class='g1'>maior de 60 anos</b>.", nota:"Penas com redação da Lei 15.163/2025.", novo:true, c:["pc4","pc5"] },
  { id:"cp134", rot:"Art. 134", t:"Expor ou abandonar <b class='g1'>recém-nascido</b>, <b class='g3'>para ocultar desonra própria</b>:<br>Pena - detenção, de <b class='g2'>seis meses a dois anos</b>.<br>§ 1º - Se do fato resulta lesão corporal de natureza grave: Pena - detenção, de <b class='g2'>um a três anos</b>.<br>§ 2º - Se resulta a morte: Pena - detenção, de <b class='g2'>dois a seis anos</b>.", c:["pc6"] },
  { id:"cp136", rot:"Art. 136", t:"Expor a perigo a vida ou a saúde de pessoa sob sua autoridade, guarda ou vigilância, <b class='g3'>para fim de educação, ensino, tratamento ou custódia</b>, quer <b class='g1'>privando-a de alimentação ou cuidados indispensáveis</b>, quer sujeitando-a a <b class='g1'>trabalho excessivo ou inadequado</b>, quer <b class='g1'>abusando de meios de correção ou disciplina</b>:<br>Pena - reclusão, de <b class='g2'>2 (dois) a 5 (cinco) anos</b>.<br>§ 1º - Se do fato resulta lesão corporal de natureza grave: Pena - reclusão, de <b class='g2'>3 (três) a 7 (sete) anos</b>.<br>§ 2º - Se resulta a morte: Pena - reclusão, de <b class='g2'>8 (oito) a 14 (quatorze) anos</b>.<br>§ 3º - Aumenta-se a pena de <b class='g2'>um terço</b>, se o crime é praticado contra pessoa <b class='g1'>menor de 14 (catorze) anos</b>.", nota:"Penas com redação da Lei 15.163/2025.", novo:true, c:["pc7","pc8"] }
]},
{ art:"CP, arts. 135 e 135-A", nome:"Omissão de socorro", sec:"socorro", itens:[
  { id:"cp135", rot:"Art. 135", t:"Deixar de prestar assistência, <b class='g3'>quando possível fazê-lo sem risco pessoal</b>, à <b class='g1'>criança abandonada ou extraviada, ou à pessoa inválida ou ferida, ao desamparo ou em grave e iminente perigo</b>; ou <b class='g1'>não pedir</b>, nesses casos, o socorro da autoridade pública:<br>Pena - detenção, de <b class='g2'>um a seis meses, ou multa</b>.<br>Parágrafo único - A pena é aumentada de <b class='g2'>metade</b>, se da omissão resulta lesão corporal de natureza grave, e <b class='g2'>triplicada</b>, se resulta a morte.", c:["pc9","pc10"] },
  { id:"cp135a", rot:"Art. 135-A", t:"Exigir <b class='g1'>cheque-caução, nota promissória ou qualquer garantia</b>, bem como o <b class='g1'>preenchimento prévio de formulários administrativos</b>, como condição para o <b class='g3'>atendimento médico-hospitalar emergencial</b>:<br>Pena - detenção, de <b class='g2'>3 (três) meses a 1 (um) ano, e multa</b>.<br>Parágrafo único. A pena é aumentada <b class='g2'>até o dobro</b> se da negativa de atendimento resulta lesão corporal de natureza grave, e <b class='g2'>até o triplo</b> se resulta a morte.", c:["pc11"] }
]},
{ art:"CP, art. 137", nome:"Rixa", sec:"rixa", itens:[
  { id:"cp137", rot:"Art. 137", t:"<b class='g1'>Participar de rixa</b>, <b class='g3'>salvo para separar os contendores</b>:<br>Pena - detenção, de <b class='g2'>quinze dias a dois meses, ou multa</b>.<br>Parágrafo único - Se ocorre <b class='g1'>morte ou lesão corporal de natureza grave</b>, aplica-se, <b class='g3'>pelo fato da participação na rixa</b>, a pena de detenção, de <b class='g2'>seis meses a dois anos</b>.", c:["pc12","pc13","pc14"] }
]}
],
juris:[],
cards:[
{ id:"pc1", tipo:"ce", sec:"perigo", f:"Certo ou errado: no art. 130, o consentimento do parceiro afasta o crime.", v:"<b>Errado.</b> A saúde é indisponível para esse fim; o consentimento é irrelevante (prevalece).", lei:["cp130"] },
{ id:"pc2", tipo:"distincao", sec:"perigo", f:"Art. 130, §1º × art. 131.", v:"<b>130, §1º</b>: intenção de transmitir doença <b>venérea</b>, por <b>ato sexual</b>. <b>131</b>: moléstia <b>grave</b> qualquer, por <b>qualquer ato</b> capaz de transmitir. Mesma pena (1 a 4).", lei:["cp130","cp131"] },
{ id:"pc3", tipo:"caso", sec:"perigo", f:"Fazendeiro transporta boias-frias na caçamba do caminhão, sem proteção. Crime?", v:"<b>Art. 132</b> com aumento de 1/6 a 1/3 (parágrafo único).", lei:["cp132"] },
{ id:"pc4", tipo:"caso", sec:"abandono", f:"Mãe deixa o filho de 2 anos sozinho à noite para ir a uma festa; ele morre engasgado. Enquadramento?", v:"<b>Abandono de incapaz com morte</b> (133, §2º — 8 a 14) <b>+1/3</b> por ser ascendente (§3º, II).", lei:["cp133"] },
{ id:"pc5", tipo:"numero", sec:"abandono", f:"Abandono de incapaz: penas após a Lei 15.163/2025.", v:"<b>2 a 5</b>; lesão grave <b>3 a 7</b>; morte <b>8 a 14</b> (reclusão).", lei:["cp133"] },
{ id:"pc6", tipo:"caso", sec:"abandono", f:"Mulher deixa o bebê na porta de um convento, toca a campainha e espera alguém pegá-lo, para esconder a gravidez.", v:"<b>Fato atípico</b> para a doutrina: não houve perigo concreto ao recém-nascido.", lei:["cp134"] },
{ id:"pc7", tipo:"distincao", sec:"abandono", f:"Maus-tratos × tortura-castigo.", v:"<b>Maus-tratos</b>: perigo à vida/saúde por abuso dos meios de correção, com fim de educar. <b>Tortura</b> (Lei 9.455, art. 1º, II): <b>intenso sofrimento</b> como castigo.", lei:["cp136"] },
{ id:"pc8", tipo:"caso", sec:"abandono", f:"Mãe obriga a filha de 13 anos a ir à escola com orelhas de burro, sem risco à saúde. Crime?", v:"<b>ECA, art. 232</b> (vexame ou constrangimento). Sem perigo à vida ou saúde, não há maus-tratos.", lei:["cp136"] },
{ id:"pc9", tipo:"ce", sec:"socorro", f:"Certo ou errado: quem pode socorrer sem risco pode optar por apenas ligar para o SAMU.", v:"<b>Errado.</b> A assistência indireta só é válida quando a direta não é possível sem risco pessoal.", lei:["cp135"] },
{ id:"pc10", tipo:"caso", sec:"socorro", f:"Motorista envolvido no acidente e pedestre que passava: ambos não socorrem. Crimes?", v:"Motorista: <b>CTB, art. 304</b>. Pedestre: <b>CP, art. 135</b>.", lei:["cp135"] },
{ id:"pc11", tipo:"caso", sec:"socorro", f:"Hospital exige cheque-caução para atender paciente em emergência; ele morre. Crime e pena?", v:"<b>Art. 135-A</b>, com pena aumentada <b>até o triplo</b>.", lei:["cp135a"] },
{ id:"pc12", tipo:"caso", sec:"rixa", f:"Briga entre duas torcidas organizadas bem identificadas. Há rixa?", v:"<b>Não.</b> Com grupos definidos, cada lado responde pelas lesões causadas ao outro.", lei:["cp137"] },
{ id:"pc13", tipo:"caso", sec:"rixa", f:"Em rixa com 10 pessoas, uma morre por golpe de A. Como respondem A e os demais?", v:"Todos: <b>rixa qualificada</b>. A: rixa qualificada <b>+ homicídio</b> (prevalece).", lei:["cp137"] },
{ id:"pc14", tipo:"caso", sec:"rixa", f:"B entra na rixa depois que a vítima já morreu. Responde pela qualificada?", v:"<b>Não</b>: rixa simples. Quem saiu antes do resultado, ao contrário, responde pela qualificada.", lei:["cp137"] }
],
importancia:{ nivel:4,
  texto:"Crimes de perigo e rixa caem em letra de lei e em pegadinhas de pena. Após a Lei 15.163/2025 a banca cobra as novas penas do abandono de incapaz e dos maus-tratos, a omissão de socorro e os requisitos da rixa.",
  decore:[
    ["Art. 130 (contágio venéreo)","detenção de 3 meses a 1 ano, ou multa; <b>representação</b>; com intenção de transmitir (§1º), reclusão de 1 a 4"],
    ["Art. 131","reclusão de <b>1 a 4 anos</b>; fim de transmitir moléstia grave"],
    ["Art. 132 (perigo direto e iminente)","detenção de 3 meses a 1 ano, <b>se não houver crime mais grave</b>"],
    ["Arts. 133 e 136 (após a Lei 15.163/2025)","<b>2 a 5</b>; lesão grave <b>3 a 7</b>; morte <b>8 a 14</b> (reclusão)"],
    ["Art. 133, §3º e art. 136, §3º","<b>+1/3</b>"],
    ["Art. 134 (recém-nascido)","detenção de 6 meses a 2 anos, para <b>ocultar desonra própria</b>"],
    ["Omissão de socorro (art. 135)","detenção de 1 a 6 meses, ou multa; <b>+1/2</b> (lesão grave) e <b>triplicada</b> (morte)"],
    ["Art. 135-A","detenção de 3 meses a 1 ano e multa; <b>até o dobro</b> e <b>até o triplo</b>"],
    ["Rixa (art. 137)","detenção de <b>15 dias a 2 meses</b>, ou multa; qualificada: <b>6 meses a 2 anos</b>"],
    ["Rixa","mínimo de <b>3</b> pessoas, sem grupos definidos"]],
  macetes:[
    ["Quem pode, ajuda; quem não pode, pede","Na omissão de socorro, quem pode prestar assistência sem risco pessoal deve prestá-la. Pedir socorro à autoridade só vale quando a ajuda direta não é possível."],
    ["Artigo 134 ficou para trás","A Lei 15.163/2025 mudou os arts. 133 e 136, mas o art. 134 continua com detenção."],
    ["Rixa qualificada pune todos","Morte ou lesão grave: todos os rixosos respondem pela forma qualificada, pelo fato da participação. Quem causou o resultado responde também pelo crime correspondente."]] },
comparativo:{ titulo:"Qualificado pelo resultado × causa de aumento", head:["Resultado qualificador (arts. 133, 134 e 136, §§1º e 2º)","Causa de aumento (arts. 132, 133, 135, 135-A e 136)"], rows:[
  ["<b>O que faz:</b> cria nova pena conforme o resultado: lesão grave (3 a 7 no 133 e no 136; 1 a 3 no 134) ou morte (8 a 14; 2 a 6 no 134)","<b>O que faz:</b> fração aplicada à pena: +1/3 (133, §3º; 136, §3º), +1/6 a 1/3 (132), +1/2 e triplo (135), até o dobro e triplo (135-A)"],
  ["<b>Natureza:</b> resultado agravador (objetiva); o crime-base é de perigo","<b>Natureza:</b> objetiva, ligada ao local, à vítima, ao autor ou ao resultado"],
  ["<b>Exemplos:</b> abandono do incapaz que acaba morrendo (133, §2º)","<b>Exemplos:</b> lugar ermo, agente ascendente, vítima maior de 60 anos, vítima menor de 14 (maus-tratos)"],
  ["<b>No art. 135:</b> lesão grave e morte não criam nova moldura, são <b>aumento</b> (1/2 e triplicada)","<b>No art. 135-A:</b> lesão grave e morte são aumento (até o dobro e até o triplo)"]]},
prova:[
  { tipo:"ce", enun:"Dos crimes de periclitação da vida e da saúde, o art. 130 é o de ação penal condicionada à representação.", gab:"Certo", com:"Art. 130, §2º. Os demais são de ação pública incondicionada." },
  { tipo:"ce", enun:"O art. 132 pune a exposição a perigo direto e iminente apenas se o fato não constituir crime mais grave.", gab:"Certo", com:"Subsidiariedade expressa. Se o agente quer matar, a hipótese é de tentativa de homicídio." },
  { tipo:"ce", enun:"Após a Lei 15.163/2025, a pena do abandono de incapaz é de reclusão de 2 a 5 anos, e a do abandono de recém-nascido para ocultar desonra própria também foi alterada.", gab:"Errado", com:"O art. 133 passou a 2 a 5 anos, mas o art. 134 não mudou: segue com detenção de 6 meses a 2 anos." },
  { tipo:"ce", enun:"Quem pode socorrer a pessoa ferida sem risco pessoal cumpre o art. 135 se apenas ligar para o serviço de emergência.", gab:"Errado", com:"A assistência indireta só basta quando a direta não é possível sem risco pessoal." },
  { tipo:"caso", enun:"Em uma briga generalizada entre três pessoas, sem grupos definidos, uma delas morre pelo golpe de um dos participantes. Como respondem os participantes?", com:"Todos pela rixa qualificada (art. 137, parágrafo único), pelo fato da participação. Quem desferiu o golpe responde também pelo homicídio, em concurso, segundo a posição que prevalece." },
  { tipo:"ce", enun:"O hospital que exige cheque-caução para atendimento emergencial responde pelo art. 135-A, com pena que pode ser aumentada até o triplo se o paciente morre.", gab:"Certo", com:"Art. 135-A e parágrafo único: até o dobro (lesão grave) e até o triplo (morte)." }],
resumo:[
  "Periclitação protege a vida e a saúde expostas a perigo (crimes de perigo).",
  "Art. 130: exposição ao contágio de moléstia venérea por ato sexual; só ação por representação. Art. 131: fim de transmitir moléstia grave, forma livre e dolo específico.",
  "Art. 132: perigo direto e iminente, subsidiário. Aumento de 1/6 a 1/3 no transporte irregular de trabalhadores.",
  "Arts. 133 e 136 (Lei 15.163/2025): 2 a 5; 3 a 7 se lesão grave; 8 a 14 se morte; +1/3 nas majorantes do §3º.",
  "Art. 134: recém-nascido para ocultar desonra própria, detenção. Maus-tratos exigem fim de educação, ensino, tratamento ou custódia.",
  "Omissão de socorro: omissivo próprio, sem tentativa. Art. 135-A: exigência de garantia como condição do atendimento emergencial.",
  "Rixa: três ou mais, sem grupos definidos; participar, salvo para separar. Qualificada com morte ou lesão grave.",
  "Quem saiu antes do resultado responde pela rixa qualificada; quem entrou depois, pela simples."],
checklist:[
  "Dizer a pena e a ação penal dos arts. 130, 131 e 132",
  "Citar as novas penas dos arts. 133 e 136 e a majorante do §3º",
  "Diferenciar abandono de incapaz, abandono de recém-nascido e maus-tratos",
  "Explicar a omissão de socorro e a assistência direta e indireta",
  "Aplicar o art. 135-A",
  "Distinguir rixa de briga entre grupos definidos",
  "Resolver a rixa qualificada, inclusive para quem saiu antes ou entrou depois"],
questoes:[]
};

})();
