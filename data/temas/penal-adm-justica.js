/* Direito Penal — Crimes contra a Administração III (Administração da Justiça, arts. 338 a 359) e
   IV (licitações e contratos, arts. 337-E a 337-P; finanças públicas, arts. 359-A a 359-H).
   Conferido em 14/10/2026. Texto legal: Código Penal (Planalto); Leis 14.110/2020, 14.133/2021,
   14.245/2021 e 15.280/2025 (art. 338-A). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STJINF = "https://processo.stj.jus.br/jurisprudencia/externo/informativo/";
var TEMA = function(n){ return "https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp?novaConsulta=true&tipo_pesquisa=T&cod_tema_inicial="+n+"&cod_tema_final="+n; };

/* ======================= ADMINISTRAÇÃO DA JUSTIÇA ======================= */
T.penal_adm_justica = {
meta:{ tema:"Crimes contra a Administração III — Administração da Justiça", atualizado:AT,
  foco:"Descumprimento de medida protetiva (338-A, Lei 15.280/2025), denunciação caluniosa (Lei 14.110/2020), comunicação falsa, autoacusação, falso testemunho, coação no curso do processo, exercício arbitrário, fraude processual, favorecimentos, fuga e evasão, patrocínio infiel e exploração de prestígio." },
secoes:[
{ id:"imputacoes", titulo:"Imputações falsas e falso testemunho", curto:"Imputações",
  rapido:["Denunciação caluniosa (339): <b>dar causa à instauração</b> de inquérito policial, PIC, processo judicial, PAD, inquérito civil ou ação de improbidade, imputando <b>crime, infração ético-disciplinar ou ato ímprobo</b> a quem <b>sabe inocente</b> — reclusão de <b>2 a 8</b> e multa. +1/6 com anonimato ou nome suposto; −metade se a imputação é de contravenção.",
    "Comunicação falsa de crime ou contravenção (340): provocar a ação da autoridade comunicando infração <b>que sabe não ter ocorrido</b> (sem imputar a alguém) — detenção de 1 a 6 meses, ou multa.",
    "Autoacusação falsa (341): acusar-se de crime inexistente ou praticado por outrem — detenção de 3 meses a 2 anos, ou multa. Não abrange contravenção.",
    "Falso testemunho ou falsa perícia (342): afirmação falsa, negar ou calar a verdade como testemunha, perito, contador, tradutor ou intérprete em processo judicial, administrativo, inquérito ou juízo arbitral — reclusão de <b>2 a 4</b> e multa; +1/6 a 1/3 se mediante suborno ou para prova em processo penal ou civil com ente público; <b>retratação antes da sentença</b> extingue a punibilidade."],
  teoria:[
    { h:"Denunciação caluniosa", p:[
      "Exige a <b>instauração</b> do procedimento e dolo direto (sabe inocente). Mera notícia que gera só diligências preliminares, sem IP, não basta (redação da Lei 14.110/2020).",
      "Em crimes de ação privada ou condicionada, só quem pode oferecer queixa ou representação pratica o crime nessa modalidade.",
      "Imputação falsa com finalidade eleitoral: Código Eleitoral, art. 326-A (especialidade).",
      "Calúnia × denunciação caluniosa: na calúnia, só se atribui o fato a terceiros; na denunciação, movimenta-se o aparato estatal (absorve a calúnia). Ação penal: pública incondicionada."]},
    { h:"Falso testemunho", p:[
      "Crime de <b>mão própria</b>: admite participação (o advogado que instrui a testemunha a mentir é partícipe — STJ), não coautoria. Falsa perícia admite coautoria entre peritos.",
      "Testemunha que mente para não se incriminar não comete crime (não autoincriminação). Informante (sem compromisso): prevalece que pode cometer, mas é divergente.",
      "Formal: consuma-se com o encerramento do depoimento. Competência: falso testemunho em processo trabalhista é da Justiça Federal (Súmula 165 do STJ).",
      "Corromper testemunha ou perito: art. 343 (dar, oferecer ou prometer) — reclusão de 3 a 4 e multa."]}
  ],
  quadro:{ titulo:"Quatro figuras parecidas", head:["Crime","O agente…","Imputa a alguém?"], rows:[
    ["Calúnia (138)","Atribui falsamente crime a alguém perante terceiros","Sim (sem movimentar o Estado)"],
    ["Denunciação caluniosa (339)","Faz instaurar IP, PIC, processo, PAD, IC ou ação de improbidade contra inocente","Sim"],
    ["Comunicação falsa (340)","Comunica crime ou contravenção que não ocorreu","Não"],
    ["Autoacusação falsa (341)","Acusa a si mesmo de crime inexistente ou alheio","A si próprio"]]},
  pegadinhas:["Autoacusação de contravenção não é crime (o art. 341 fala em crime).","Retratação no falso testemunho deve ocorrer antes da sentença no processo em que se mentiu."]},
{ id:"processo", titulo:"Coação, exercício arbitrário e fraude processual", curto:"Processo",
  rapido:["Coação no curso do processo (344): violência ou grave ameaça contra autoridade, parte ou qualquer pessoa que intervém em processo, inquérito ou juízo arbitral, para favorecer interesse — reclusão de 1 a 4 e multa, além da violência; <b>+1/3 até a metade</b> se o processo envolver crime contra a dignidade sexual (Lei 14.245/2021).",
    "Exercício arbitrário das próprias razões (345): fazer justiça pelas próprias mãos para satisfazer pretensão, <b>embora legítima</b> — detenção de 15 dias a 1 mês, ou multa, além da violência. Sem violência, só se procede mediante <b>queixa</b>.",
    "Fraude processual (347): inovar artificiosamente o estado de lugar, coisa ou pessoa para induzir a erro juiz ou perito — detenção de 3 meses a 2 anos e multa; <b>em dobro</b> se para processo penal, ainda que não iniciado.",
    "Descumprimento de medida protetiva (338-A, Lei 15.280/2025): reclusão de <b>2 a 5</b> e multa; independe da competência civil ou criminal do juiz; só o juiz pode dar fiança. Na Lei Maria da Penha, continua o art. 24-A (especialidade)."],
  teoria:[
    { h:"Pontos de prova", p:[
      "Exercício arbitrário: se a pretensão é ilegítima, pode ser outro crime (furto, roubo, extorsão). Credor que toma o celular do devedor para se pagar: 345.",
      "Art. 346: tirar, suprimir, destruir ou danificar coisa própria em poder de terceiro por determinação judicial ou convenção.",
      "Fraude processual: alterar a cena do crime para enganar o perito é crime, e a autodefesa não protege essa conduta (STJ, HC 834.126/RS).",
      "Medidas protetivas: para o STJ (Tema 1249), têm natureza de tutela inibitória, não dependem de BO, inquérito ou processo, duram enquanto houver risco e não caem automaticamente com absolvição ou arquivamento."]}
  ],
  pegadinhas:["No 345, a pretensão pode ser legítima — o crime está no meio (fazer justiça com as próprias mãos).","Coação no curso do processo exige violência ou grave ameaça; simples pedido para a testemunha mentir é participação no falso testemunho."]},
{ id:"favorecimento", titulo:"Favorecimentos, fuga e crimes de advogado", curto:"Favorecimentos",
  rapido:["Favorecimento pessoal (348): auxiliar autor de crime a subtrair-se da autoridade — detenção de 1 a 6 meses e multa (15 dias a 3 meses se o crime não tem reclusão). <b>Isento de pena</b> se ascendente, descendente, cônjuge ou irmão.",
    "Favorecimento real (349): auxílio para tornar seguro o <b>proveito</b> do crime, fora dos casos de coautoria ou receptação — detenção de 1 a 6 meses e multa. 349-A: fazer entrar celular em presídio — 3 meses a 1 ano.",
    "Fuga de pessoa presa (351): promover ou facilitar — detenção de 6 meses a 2 anos; armado, por mais de uma pessoa ou arrombando: reclusão de 2 a 6; pelo custodiante: reclusão de 1 a 4; <b>culpa</b> do custodiante: detenção de 3 meses a 1 ano, ou multa. Evasão mediante violência (352): só é crime se houver <b>violência contra a pessoa</b>.",
    "Patrocínio infiel (355): advogado que trai o dever, prejudicando interesse confiado. Sonegação de autos (356). Exploração de prestígio (357): a pretexto de influir em juiz, jurado, MP, perito, testemunha — 1 a 5; +1/3 se insinua que o dinheiro vai também para eles."],
  teoria:[
    { h:"Distinções", p:[
      "Combinação prévia de ajuda = concurso de pessoas no crime. Ajuda posterior não combinada = favorecimento.",
      "Favorecimento pessoal protege a <b>pessoa</b> do criminoso; real, o <b>proveito</b> do crime. Receptação exige proveito próprio ou alheio (fim de lucro); o favorecimento real visa só ajudar o autor.",
      "Favorecimento pessoal é crime acessório: exige crime anterior (não contravenção) com pena de reclusão para a figura do caput. Consuma-se com o êxito da ocultação.",
      "Fuga sem violência do próprio preso não é crime (só falta disciplinar). Quem compra a influência na exploração de prestígio não é sujeito ativo (STJ, RHC 55.940/SP).",
      "Art. 359: exercer função, atividade, direito ou múnus de que foi suspenso por decisão judicial — detenção de 3 meses a 2 anos, ou multa."]}
  ],
  quadro:{ titulo:"Favorecimento pessoal × real × receptação", head:["","Pessoal (348)","Real (349)","Receptação (180)"], rows:[
    ["Protege","O autor do crime","O proveito do crime para o autor","O próprio interesse (lucro)"],
    ["Imunidade de parentes","Sim (§2º)","Não","Não"],["Pena","Detenção 1 a 6 meses e multa","Detenção 1 a 6 meses e multa","Reclusão (dolosa)"]]},
  pegadinhas:["A isenção de pena do favorecimento pessoal alcança ascendente, descendente, cônjuge e irmão — não alcança tio, primo ou amigo.","Exploração de prestígio: aumento de 1/3. Tráfico de influência (332): aumento de metade."]}
],
lei:[
{ art:"CP, arts. 338-A a 343", nome:"Imputações falsas e falso testemunho", sec:"imputacoes", itens:[
  { id:"cp339", rot:"Arts. 339 a 341", t:"Art. 339. <b class='g1'>Dar causa à instauração</b> de inquérito policial, de procedimento investigatório criminal, de processo judicial, de processo administrativo disciplinar, de inquérito civil ou de ação de improbidade administrativa contra alguém, imputando-lhe <b class='g1'>crime, infração ético-disciplinar ou ato ímprobo</b> <b class='g3'>de que o sabe inocente</b>: Pena - reclusão, de <b class='g2'>dois a oito anos, e multa</b>. § 1º - A pena é aumentada de <b class='g2'>sexta parte</b>, se o agente se serve de <b class='g1'>anonimato ou de nome suposto</b>. § 2º - A pena é diminuída de <b class='g2'>metade</b>, se a imputação é de prática de <b class='g1'>contravenção</b>.<br>Art. 340 - Provocar a ação de autoridade, <b class='g1'>comunicando-lhe a ocorrência de crime ou de contravenção que sabe não se ter verificado</b>: Pena - detenção, de <b class='g2'>um a seis meses, ou multa</b>.<br>Art. 341 - <b class='g1'>Acusar-se</b>, perante a autoridade, de <b class='g1'>crime inexistente ou praticado por outrem</b>: Pena - detenção, de <b class='g2'>três meses a dois anos, ou multa</b>.", nota:"Caput do art. 339 com redação da Lei 14.110/2020.", c:["aj1","aj2","aj3","aj4"] },
  { id:"cp342", rot:"Arts. 342 e 343", t:"Art. 342. Fazer <b class='g1'>afirmação falsa, ou negar ou calar a verdade</b> como <b class='g1'>testemunha, perito, contador, tradutor ou intérprete</b> em processo judicial, ou administrativo, inquérito policial, ou em juízo arbitral: Pena - reclusão, de <b class='g2'>2 (dois) a 4 (quatro) anos, e multa</b>. § 1º As penas aumentam-se de <b class='g2'>um sexto a um terço</b>, se o crime é praticado mediante suborno ou se cometido com o fim de obter prova destinada a produzir efeito em processo penal, ou em processo civil em que for parte entidade da administração pública direta ou indireta. § 2º O fato <b class='g3'>deixa de ser punível</b> se, <b class='g3'>antes da sentença</b> no processo em que ocorreu o ilícito, o agente <b class='g1'>se retrata ou declara a verdade</b>.<br>Art. 343. <b class='g1'>Dar, oferecer ou prometer</b> dinheiro ou qualquer outra vantagem a testemunha, perito, contador, tradutor ou intérprete, para fazer afirmação falsa, negar ou calar a verdade em depoimento, perícia, cálculos, tradução ou interpretação: Pena - reclusão, de <b class='g2'>três a quatro anos, e multa</b>.", c:["aj5","aj6","aj7"], j:["stj-s165","stj-advogado342"] }
]},
{ art:"CP, arts. 338-A e 344 a 347", nome:"Processo e medidas protetivas", sec:"processo", itens:[
  { id:"cp338a", rot:"Art. 338-A", t:"<b class='g1'>Descumprir decisão judicial que defere medidas protetivas de urgência</b>: Pena – reclusão, de <b class='g2'>2 (dois) a 5 (cinco) anos, e multa</b>. § 1º A configuração do crime <b class='g3'>independe da competência civil ou criminal</b> do juiz que deferiu as medidas. § 2º Na hipótese de prisão em flagrante, <b class='g3'>apenas a autoridade judicial pode conceder fiança</b>. § 3º O disposto neste artigo não exclui a aplicação de outras sanções cabíveis.", nota:"Incluído pela Lei 15.280/2025 (DOU 08/12/2025). Na violência doméstica contra a mulher, aplica-se o art. 24-A da Lei 11.340/2006.", novo:true, c:["aj8"], j:["stj-t1249"] },
  { id:"cp344", rot:"Arts. 344 a 347", t:"Art. 344 - Usar de <b class='g1'>violência ou grave ameaça</b>, com o fim de favorecer interesse próprio ou alheio, contra autoridade, parte, ou qualquer outra pessoa que funciona ou é chamada a intervir em processo judicial, policial ou administrativo, ou em juízo arbitral: Pena - reclusão, de <b class='g2'>um a quatro anos, e multa</b>, além da pena correspondente à violência. Parágrafo único. A pena aumenta-se de <b class='g2'>1/3 (um terço) até a metade</b> se o processo envolver <b class='g1'>crime contra a dignidade sexual</b>.<br>Art. 345 - <b class='g1'>Fazer justiça pelas próprias mãos</b>, para satisfazer pretensão, <b class='g3'>embora legítima</b>, salvo quando a lei o permite: Pena - detenção, de <b class='g2'>quinze dias a um mês, ou multa</b>, além da pena correspondente à violência. Parágrafo único - Se não há emprego de violência, <b class='g3'>somente se procede mediante queixa</b>.<br>Art. 346 - Tirar, suprimir, destruir ou danificar <b class='g1'>coisa própria</b>, que se acha em poder de terceiro por determinação judicial ou convenção: Pena - detenção, de <b class='g2'>seis meses a dois anos, e multa</b>.<br>Art. 347 - <b class='g1'>Inovar artificiosamente</b>, na pendência de processo civil ou administrativo, o estado de lugar, de coisa ou de pessoa, com o fim de induzir a erro o juiz ou o perito: Pena - detenção, de <b class='g2'>três meses a dois anos, e multa</b>. Parágrafo único - Se a inovação se destina a produzir efeito em <b class='g1'>processo penal, ainda que não iniciado</b>, as penas aplicam-se <b class='g2'>em dobro</b>.", c:["aj9","aj10","aj11"], j:["stj-fraudeprocessual"] }
]},
{ art:"CP, arts. 348 a 359", nome:"Favorecimentos, fuga e outros", sec:"favorecimento", itens:[
  { id:"cp348", rot:"Arts. 348 a 349-A", t:"Art. 348 - <b class='g1'>Auxiliar a subtrair-se à ação de autoridade pública</b> autor de crime a que é cominada pena de reclusão: Pena - detenção, de <b class='g2'>um a seis meses, e multa</b>. § 1º - Se ao crime não é cominada pena de reclusão: Pena - detenção, de <b class='g2'>quinze dias a três meses, e multa</b>. § 2º - Se quem presta o auxílio é <b class='g3'>ascendente, descendente, cônjuge ou irmão</b> do criminoso, fica <b class='g3'>isento de pena</b>.<br>Art. 349 - Prestar a criminoso, <b class='g3'>fora dos casos de co-autoria ou de receptação</b>, auxílio destinado a <b class='g1'>tornar seguro o proveito do crime</b>: Pena - detenção, de <b class='g2'>um a seis meses, e multa</b>.<br>Art. 349-A. Ingressar, promover, intermediar, auxiliar ou facilitar a entrada de <b class='g1'>aparelho telefônico de comunicação móvel, de rádio ou similar</b>, sem autorização legal, em estabelecimento prisional: Pena: detenção, de <b class='g2'>3 (três) meses a 1 (um) ano</b>.", c:["aj12","aj13","aj14"] },
  { id:"cp351", rot:"Arts. 351 a 357", t:"Art. 351 - <b class='g1'>Promover ou facilitar a fuga</b> de pessoa legalmente presa ou submetida a medida de segurança detentiva: Pena - detenção, de <b class='g2'>seis meses a dois anos</b>. § 1º - Se o crime é praticado a mão armada, ou por mais de uma pessoa, ou mediante arrombamento, a pena é de reclusão, de <b class='g2'>dois a seis anos</b>. § 3º - A pena é de reclusão, de <b class='g2'>um a quatro anos</b>, se o crime é praticado por pessoa sob cuja custódia ou guarda está o preso. § 4º - No caso de <b class='g1'>culpa do funcionário</b> incumbido da custódia ou guarda, aplica-se a pena de detenção, de <b class='g2'>três meses a um ano, ou multa</b>.<br>Art. 352 - <b class='g1'>Evadir-se ou tentar evadir-se</b> o preso ou o indivíduo submetido a medida de segurança detentiva, <b class='g3'>usando de violência contra a pessoa</b>: Pena - detenção, de <b class='g2'>três meses a um ano</b>, além da pena correspondente à violência.<br>Art. 355 - <b class='g1'>Trair</b>, na qualidade de advogado ou procurador, o dever profissional, prejudicando interesse, cujo patrocínio, em juízo, lhe é confiado: Pena - detenção, de <b class='g2'>seis meses a três anos, e multa</b>.<br>Art. 357 - Solicitar ou receber dinheiro ou qualquer outra utilidade, <b class='g3'>a pretexto de influir em juiz, jurado, órgão do Ministério Público, funcionário de justiça, perito, tradutor, intérprete ou testemunha</b>: Pena - reclusão, de <b class='g2'>um a cinco anos, e multa</b>. Parágrafo único - As penas aumentam-se de <b class='g2'>um terço</b>, se o agente alega ou insinua que o dinheiro ou utilidade também se destina a qualquer das pessoas referidas neste artigo.", nota:"Arts. 353 (arrebatamento de preso), 354 (motim), 356 (sonegação de autos), 358 (fraude em arrematação) e 359 resumidos na aba Resumo.", c:["aj15","aj16","aj17"] }
]}
],
juris:[
{ id:"stj-t1249", trib:"STJ", tipo:"Tema repetitivo", num:"1249", sec:"processo", status:"vigente", data:"3ª Seção, 13/11/2024",
  titulo:"Medidas protetivas: tutela inibitória, sem prazo fixo", texto:"As medidas protetivas de urgência têm natureza jurídica de tutela inibitória e sua vigência não se subordina à existência (atual ou vindoura) de boletim de ocorrência, inquérito policial, processo cível ou criminal. Sua duração vincula-se à persistência da situação de risco à mulher, devendo ser fixadas por prazo indeterminado. Extinção da punibilidade, arquivamento ou absolvição não originam, necessariamente, sua extinção. A revogação exige contraditório, com oitiva da vítima e do suposto agressor.",
  explica:"REsp 2.070.863/MG. Base para entender os crimes de descumprimento (24-A da Lei Maria da Penha e 338-A do CP).", lei:["cp338a"], fonte:TEMA(1249) },
{ id:"stj-s165", trib:"STJ", tipo:"Súmula", num:"165", sec:"imputacoes", status:"vigente", data:"",
  titulo:"Falso testemunho na Justiça do Trabalho", texto:"Compete à Justiça Federal processar e julgar crime de falso testemunho cometido no processo trabalhista.",
  explica:"A Justiça do Trabalho é federal; o interesse é da União.", lei:["cp342"], fonte:STJS },
{ id:"stj-advogado342", trib:"STJ", tipo:"Jurisprudência", num:"HC 30.858/RS", sec:"imputacoes", status:"vigente", data:"6ª Turma",
  titulo:"Advogado pode ser partícipe de falso testemunho", texto:"Apesar de o crime de falso testemunho ser de mão própria, pode haver a participação do advogado no seu cometimento.",
  explica:"Mão própria admite participação (induzir, instigar), não coautoria — o STF tem decisão isolada admitindo coautoria.", lei:["cp342"], fonte:STJJ },
{ id:"stj-fraudeprocessual", trib:"STJ", tipo:"Jurisprudência", num:"HC 834.126/RS", sec:"processo", status:"vigente", data:"6ª Turma, 05/09/2023",
  titulo:"Autodefesa não autoriza fraude processual", texto:"O nemo tenetur se detegere é garantia fundamental, mas encontra limites: a lei atribui relevância penal à mentira ou ao encobrimento em hipóteses como a autoacusação falsa, a falsa identidade (Súmula 522), a fraude processual (art. 347, parágrafo único) e a coação de testemunhas (art. 344).",
  explica:"Autor que altera a cena do crime para enganar o perito responde por fraude processual (pena em dobro).", lei:["cp344"], fonte:STJJ }
],
cards:[
{ id:"aj1", tipo:"caso", sec:"imputacoes", f:"A registra ocorrência dizendo que o vizinho B furtou seu carro, sabendo ser mentira; é instaurado inquérito. Crime?", v:"<b>Denunciação caluniosa</b> (339) — reclusão de 2 a 8. Absorve a calúnia.", lei:["cp339"] },
{ id:"aj2", tipo:"caso", sec:"imputacoes", f:"Para receber o seguro, A comunica à polícia o roubo do próprio carro, que vendeu, sem apontar autor.", v:"<b>Comunicação falsa de crime</b> (340) — além do estelionato/fraude contra seguro, conforme o caso. Não há denunciação: ninguém foi acusado.", lei:["cp339"] },
{ id:"aj3", tipo:"ce", sec:"imputacoes", f:"Certo ou errado: o pai que confessa um crime cometido pelo filho, para salvá-lo, comete autoacusação falsa.", v:"<b>Certo.</b> O motivo nobre não exclui o crime (341).", lei:["cp339"] },
{ id:"aj4", tipo:"numero", sec:"imputacoes", f:"Denunciação caluniosa: aumento por anonimato e redução se for contravenção.", v:"<b>+1/6</b> (anonimato ou nome suposto); <b>−1/2</b> (contravenção).", lei:["cp339"] },
{ id:"aj5", tipo:"caso", sec:"imputacoes", f:"Testemunha mente em juízo, mas se retrata antes da sentença. Consequência?", v:"<b>O fato deixa de ser punível</b> (342, §2º).", lei:["cp342"] },
{ id:"aj6", tipo:"distincao", sec:"imputacoes", f:"Falso testemunho: coautoria ou participação?", v:"Só <b>participação</b> (crime de mão própria). Na falsa perícia, cabe coautoria entre peritos.", lei:["cp342"], j:["stj-advogado342"] },
{ id:"aj7", tipo:"caso", sec:"imputacoes", f:"Réu oferece R$ 5 mil para a testemunha mentir; ela aceita e mente. Crimes?", v:"Réu: <b>343</b> (corrupção de testemunha). Testemunha: <b>342 com aumento</b> de 1/6 a 1/3 (mediante suborno).", lei:["cp342"] },
{ id:"aj8", tipo:"caso", sec:"processo", f:"Pai investigado por estupro do filho descumpre o afastamento do lar fixado pelo juiz (CPP, art. 350-A). E se fosse medida da Lei Maria da Penha a favor da esposa?", v:"Filho: <b>338-A do CP</b> (2 a 5). Esposa (MPU da Lei 11.340): <b>art. 24-A</b> da Lei Maria da Penha.", lei:["cp338a"] },
{ id:"aj9", tipo:"caso", sec:"processo", f:"Credor entra na casa do devedor e leva a TV para quitar a dívida, sem violência. Crime e ação penal?", v:"<b>Exercício arbitrário das próprias razões</b> (345) — ação privada (sem violência).", lei:["cp344"] },
{ id:"aj10", tipo:"caso", sec:"processo", f:"Autor do homicídio lava o sangue e muda o corpo de lugar para enganar a perícia. Crime?", v:"<b>Fraude processual</b> com pena <b>em dobro</b> (347, parágrafo único). Autodefesa não afasta.", lei:["cp344"], j:["stj-fraudeprocessual"] },
{ id:"aj11", tipo:"numero", sec:"processo", f:"Coação no curso do processo que envolve crime sexual: aumento.", v:"<b>1/3 até a metade</b> (Lei 14.245/2021).", lei:["cp344"] },
{ id:"aj12", tipo:"caso", sec:"favorecimento", f:"Mãe esconde o filho foragido, autor de roubo. Crime?", v:"Tipicamente <b>favorecimento pessoal</b>, mas ela é <b>isenta de pena</b> (348, §2º).", lei:["cp348"] },
{ id:"aj13", tipo:"distincao", sec:"favorecimento", f:"Favorecimento real × receptação.", v:"<b>Real</b>: guardar o produto só para ajudar o autor. <b>Receptação</b>: agir em proveito próprio ou de terceiro que não o autor (fim de lucro).", lei:["cp348"] },
{ id:"aj14", tipo:"caso", sec:"favorecimento", f:"Antes do assalto, A combina com B que o esconderá depois; B o esconde. Crime de B?", v:"<b>Partícipe do roubo</b> (ajuda combinada antes). Sem combinação prévia, seria favorecimento pessoal.", lei:["cp348"] },
{ id:"aj15", tipo:"ce", sec:"favorecimento", f:"Certo ou errado: o preso que foge pulando o muro, sem violência, comete o art. 352.", v:"<b>Errado.</b> A evasão só é crime com violência contra a pessoa.", lei:["cp351"] },
{ id:"aj16", tipo:"caso", sec:"favorecimento", f:"Agente penitenciário cochila no plantão e o preso foge. Crime?", v:"<b>Fuga de pessoa presa culposa</b> (351, §4º) — detenção de 3 meses a 1 ano, ou multa.", lei:["cp351"] },
{ id:"aj17", tipo:"distincao", sec:"favorecimento", f:"Tráfico de influência × exploração de prestígio.", v:"<b>332</b>: a pretexto de influir em funcionário público (2 a 5; +1/2). <b>357</b>: em juiz, jurado, MP, perito, testemunha (1 a 5; +1/3).", lei:["cp351"] }
],
questoes:[]
};

/* ======================= LICITAÇÕES E FINANÇAS PÚBLICAS ======================= */
T.penal_adm_financas = {
meta:{ tema:"Crimes contra a Administração IV — Licitações e Finanças Públicas", atualizado:AT,
  foco:"Crimes em licitações e contratos (arts. 337-E a 337-P, Lei 14.133/2021) com a jurisprudência herdada da Lei 8.666/93 (Súmula 645, dolo específico, abolitio parcial do art. 89) e crimes contra as finanças públicas (arts. 359-A a 359-H, Lei 10.028/2000). Fecha o bloco com um mapa comparativo dos crimes contra a Administração." },
secoes:[
{ id:"licitacoes", titulo:"Crimes em licitações e contratos", curto:"Licitações",
  rapido:["A Lei 14.133/2021 revogou os crimes da Lei 8.666/93 e criou o Capítulo II-B no CP (arts. 337-E a 337-P), com <b>continuidade típico-normativa</b> e penas maiores.",
    "Contratação direta ilegal (337-E): admitir, possibilitar ou dar causa a contratação direta fora das hipóteses legais — reclusão de <b>4 a 8</b>. Frustração do caráter competitivo (337-F) — reclusão de <b>4 a 8</b>. Modificação ou pagamento irregular (337-H) — 4 a 8. Fraude em licitação ou contrato (337-L) — 4 a 8.",
    "Patrocínio de contratação indevida (337-G) — 6 meses a 3 anos. Perturbação (337-I) — detenção de 6 meses a 3 anos. Violação de sigilo de proposta (337-J) — detenção de 2 a 3 anos. Afastamento de licitante (337-K) — 3 a 5 + violência.",
    "Inidôneo (337-M): admitir à licitação — 1 a 3; contratar — 3 a 6. Impedir inscrição em cadastro (337-N). Omissão grave de dado (337-O). Multa (337-P): não inferior a 2% do valor do contrato."],
  teoria:[
    { h:"Jurisprudência herdada", p:[
      "Súmula 645 do STJ: a fraude à licitação (antigo art. 90, hoje 337-F) é <b>formal</b>: dispensa prova de prejuízo ou de vantagem.",
      "Contratação direta (antigo art. 89, hoje 337-E): STF e STJ exigem <b>dolo específico</b> de causar dano ao erário e <b>efetivo prejuízo</b> — tema ainda debatido na doutrina.",
      "O STJ entendeu que a parte final do antigo art. 89 (\"deixar de observar as formalidades\" da dispensa/inexigibilidade), não reproduzida no 337-E, sofreu <b>abolitio criminis</b> (o material de estudo cita o AgRg no AREsp 2.079.040/SP, Informativo 883/2026).",
      "Penas novas são mais graves: fatos anteriores a abril de 2021 seguem as penas da Lei 8.666/93.",
      "337-J revogou tacitamente o art. 326; 337-I e 337-K, em grande parte, o art. 335."]}
  ],
  pegadinhas:["337-F (frustrar o caráter competitivo) é formal (Súmula 645). 337-E (contratação direta) exige, para STF/STJ, dano ao erário.","337-J tem pena de detenção de 2 a 3 anos (maior que o antigo art. 326)."]},
{ id:"financas", titulo:"Crimes contra as finanças públicas", curto:"Finanças",
  rapido:["Lei 10.028/2000 (complemento penal da Lei de Responsabilidade Fiscal). Crimes próprios de agentes com atribuição para ordenar despesas, operações de crédito etc.",
    "359-A: operação de crédito sem autorização legislativa — reclusão de 1 a 2. 359-B: inscrição em restos a pagar de despesa não empenhada ou acima do limite — detenção de 6 meses a 2 anos.",
    "359-C: assunção de obrigação nos <b>dois últimos quadrimestres</b> do mandato que não possa ser paga no mesmo exercício (ou sem caixa para a parcela seguinte) — reclusão de 1 a 4. 359-D: ordenar despesa não autorizada por lei — 1 a 4.",
    "359-E: garantia sem contragarantia — 3 meses a 1 ano. 359-F: não cancelar restos a pagar irregulares — 6 meses a 2 anos. 359-G: aumentar despesa com pessoal nos <b>180 dias</b> anteriores ao fim do mandato — 1 a 4. 359-H: oferta de títulos da dívida sem lei ou registro — 1 a 4."],
  teoria:[
    { h:"Pontos de prova", p:[
      "359-C: para o STJ, a falta de caixa deve ser aferida em relação à obrigação específica assumida, não pela iliquidez global do órgão.",
      "Prefeitos têm crimes próprios no DL 201/67 para várias dessas condutas (especialidade).",
      "Todos são crimes dolosos; não há forma culposa."]}
  ],
  quadro:{ titulo:"Prazos dos crimes de fim de mandato", head:["Artigo","Conduta","Período"], rows:[
    ["359-C","Assumir obrigação sem caixa para pagá-la","Dois últimos quadrimestres do mandato ou legislatura"],
    ["359-G","Ato que aumente despesa total com pessoal","180 dias anteriores ao fim do mandato ou legislatura"]]}},
{ id:"mapa", titulo:"Mapa dos crimes contra a Administração", curto:"Mapa",
  rapido:["Capítulo I (312 a 327): funcionário contra a administração. Capítulo II (328 a 337-A): particular. II-A (337-B a 337-D): administração estrangeira. II-B (337-E a 337-P): licitações. III (338 a 359): administração da Justiça. IV (359-A a 359-H): finanças públicas.",
    "Insignificância: inaplicável como regra (Súmula 599), salvo descaminho até R$ 20 mil e casos excepcionais.",
    "Reparação do dano extingue a punibilidade só no peculato culposo (antes do trânsito). Retratação extingue no falso testemunho (antes da sentença)."],
  teoria:[
    { h:"Pares que mais confundem", p:[
      "Concussão (exige) × corrupção passiva (solicita) × extorsão (violência/grave ameaça alheia ao cargo).",
      "Corrupção ativa (oferecer/prometer) × tráfico de influência (vender influência fingida) × exploração de prestígio (o mesmo, perante a Justiça).",
      "Resistência (violência ou ameaça) × desobediência (sem violência) × desacato (ofensa à função).",
      "Prevaricação (interesse pessoal) × corrupção privilegiada (pedido de outrem) × condescendência (indulgência com subordinado).",
      "Advocacia administrativa (321) × patrocínio de contratação indevida (337-G, em licitação)."]}
  ],
  quadro:{ titulo:"Penas de referência", head:["Crime","Pena"], rows:[
    ["Peculato, concussão, corrupção passiva e ativa","Reclusão 2 a 12 e multa"],["Inserção de dados falsos (313-A)","Reclusão 2 a 12 e multa"],
    ["Contratação direta ilegal / frustração do caráter competitivo","Reclusão 4 a 8 e multa"],["Denunciação caluniosa","Reclusão 2 a 8 e multa"],
    ["Falso testemunho","Reclusão 2 a 4 e multa"],["Descumprimento de medida protetiva (338-A e LMP 24-A)","Reclusão 2 a 5 e multa"],
    ["Contrabando / descaminho","Reclusão 2 a 5 / 1 a 4"]]}}
],
lei:[
{ art:"CP, arts. 337-E a 337-H", nome:"Licitações (I)", sec:"licitacoes", itens:[
  { id:"cp337e", rot:"Arts. 337-E a 337-H", t:"Art. 337-E. <b class='g1'>Admitir, possibilitar ou dar causa à contratação direta fora das hipóteses previstas em lei</b>: Pena - reclusão, de <b class='g2'>4 (quatro) a 8 (oito) anos, e multa</b>.<br>Art. 337-F. <b class='g1'>Frustrar ou fraudar</b>, com o intuito de obter para si ou para outrem vantagem decorrente da adjudicação do objeto da licitação, <b class='g1'>o caráter competitivo do processo licitatório</b>: Pena - reclusão, de <b class='g2'>4 (quatro) anos a 8 (oito) anos, e multa</b>.<br>Art. 337-G. <b class='g1'>Patrocinar</b>, direta ou indiretamente, interesse privado perante a Administração Pública, dando causa à instauração de licitação ou à celebração de contrato cuja invalidação vier a ser decretada pelo Poder Judiciário: Pena - reclusão, de <b class='g2'>6 (seis) meses a 3 (três) anos, e multa</b>.<br>Art. 337-H. Admitir, possibilitar ou dar causa a qualquer <b class='g1'>modificação ou vantagem, inclusive prorrogação contratual</b>, em favor do contratado, durante a execução dos contratos celebrados com a Administração Pública, sem autorização em lei, no edital da licitação ou nos respectivos instrumentos contratuais, ou, ainda, <b class='g1'>pagar fatura com preterição da ordem cronológica</b> de sua exigibilidade: Pena - reclusão, de <b class='g2'>4 (quatro) anos a 8 (oito) anos, e multa</b>.", nota:"Incluídos pela Lei 14.133/2021.", c:["lf1","lf2","lf3"], j:["stj-s645","stj-89dolo","stj-inf883"] }
]},
{ art:"CP, arts. 337-I a 337-P", nome:"Licitações (II)", sec:"licitacoes", itens:[
  { id:"cp337i", rot:"Arts. 337-I a 337-L", t:"Art. 337-I. <b class='g1'>Impedir, perturbar ou fraudar</b> a realização de qualquer ato de processo licitatório: Pena - detenção, de <b class='g2'>6 (seis) meses a 3 (três) anos, e multa</b>.<br>Art. 337-J. <b class='g1'>Devassar o sigilo de proposta</b> apresentada em processo licitatório ou proporcionar a terceiro o ensejo de devassá-lo: Pena - detenção, de <b class='g2'>2 (dois) anos a 3 (três) anos, e multa</b>.<br>Art. 337-K. <b class='g1'>Afastar ou tentar afastar licitante</b> por meio de violência, grave ameaça, fraude ou oferecimento de vantagem de qualquer tipo: Pena - reclusão, de <b class='g2'>3 (três) anos a 5 (cinco) anos, e multa</b>, além da pena correspondente à violência. Parágrafo único. Incorre na mesma pena quem <b class='g1'>se abstém ou desiste de licitar em razão de vantagem oferecida</b>.<br>Art. 337-L. <b class='g1'>Fraudar, em prejuízo da Administração Pública</b>, licitação ou contrato dela decorrente, mediante: I - entrega de mercadoria ou prestação de serviços com qualidade ou em quantidade diversas das previstas; II - fornecimento, como verdadeira ou perfeita, de mercadoria falsificada, deteriorada, inservível para consumo ou com prazo de validade vencido; III - entrega de uma mercadoria por outra; IV - alteração da substância, qualidade ou quantidade da mercadoria ou do serviço fornecido; V - qualquer meio fraudulento que torne injustamente mais onerosa para a Administração Pública a proposta ou a execução do contrato: Pena - reclusão, de <b class='g2'>4 (quatro) anos a 8 (oito) anos, e multa</b>.", c:["lf4","lf5"] },
  { id:"cp337m", rot:"Arts. 337-M a 337-P", t:"Art. 337-M. <b class='g1'>Admitir à licitação empresa ou profissional declarado inidôneo</b>: Pena - reclusão, de <b class='g2'>1 (um) ano a 3 (três) anos, e multa</b>. § 1º <b class='g1'>Celebrar contrato</b> com empresa ou profissional declarado inidôneo: Pena - reclusão, de <b class='g2'>3 (três) anos a 6 (seis) anos, e multa</b>. § 2º Incide na mesma pena do caput deste artigo aquele que, declarado inidôneo, venha a participar de licitação e, na mesma pena do § 1º deste artigo, aquele que, declarado inidôneo, venha a contratar com a Administração Pública.<br>Art. 337-N. Obstar, impedir ou dificultar injustamente a inscrição de qualquer interessado nos registros cadastrais ou promover indevidamente a alteração, a suspensão ou o cancelamento de registro do inscrito: Pena - reclusão, de <b class='g2'>6 (seis) meses a 2 (dois) anos, e multa</b>.<br>Art. 337-O. Omitir, modificar ou entregar à Administração Pública levantamento cadastral ou condição de contorno em relevante dissonância com a realidade, em frustração ao caráter competitivo da licitação ou em detrimento da seleção da proposta mais vantajosa: Pena - reclusão, de <b class='g2'>6 (seis) meses a 3 (três) anos, e multa</b> (em dobro se para obter benefício).<br>Art. 337-P. A pena de multa cominada aos crimes previstos neste Capítulo seguirá a metodologia de cálculo prevista neste Código e não poderá ser inferior a <b class='g2'>2% (dois por cento) do valor do contrato</b> licitado ou celebrado com contratação direta.", c:["lf6"] }
]},
{ art:"CP, arts. 359-A a 359-H", nome:"Finanças públicas", sec:"financas", itens:[
  { id:"cp359a", rot:"Arts. 359-A a 359-H", t:"Art. 359-A. Ordenar, autorizar ou realizar <b class='g1'>operação de crédito</b>, interno ou externo, <b class='g3'>sem prévia autorização legislativa</b>: Pena - reclusão, de <b class='g2'>1 (um) a 2 (dois) anos</b>.<br>Art. 359-B. Ordenar ou autorizar a <b class='g1'>inscrição em restos a pagar</b>, de despesa que não tenha sido previamente empenhada ou que exceda limite estabelecido em lei: Pena - detenção, de <b class='g2'>6 (seis) meses a 2 (dois) anos</b>.<br>Art. 359-C. Ordenar ou autorizar a assunção de obrigação, <b class='g3'>nos dois últimos quadrimestres do último ano do mandato ou legislatura</b>, cuja despesa não possa ser paga no mesmo exercício financeiro ou, caso reste parcela a ser paga no exercício seguinte, que não tenha contrapartida suficiente de disponibilidade de caixa: Pena - reclusão, de <b class='g2'>1 (um) a 4 (quatro) anos</b>.<br>Art. 359-D. <b class='g1'>Ordenar despesa não autorizada por lei</b>: Pena - reclusão, de <b class='g2'>1 (um) a 4 (quatro) anos</b>.<br>Art. 359-E. Prestar garantia em operação de crédito sem que tenha sido constituída contragarantia em valor igual ou superior ao valor da garantia prestada, na forma da lei: Pena - detenção, de <b class='g2'>3 (três) meses a 1 (um) ano</b>.<br>Art. 359-F. Deixar de ordenar, de autorizar ou de promover o cancelamento do montante de restos a pagar inscrito em valor superior ao permitido em lei: Pena - detenção, de <b class='g2'>6 (seis) meses a 2 (dois) anos</b>.<br>Art. 359-G. Ordenar, autorizar ou executar ato que acarrete <b class='g1'>aumento de despesa total com pessoal</b>, <b class='g3'>nos cento e oitenta dias anteriores ao final do mandato ou da legislatura</b>: Pena - reclusão, de <b class='g2'>1 (um) a 4 (quatro) anos</b>.<br>Art. 359-H. Ordenar, autorizar ou promover a oferta pública ou a colocação no mercado financeiro de títulos da dívida pública sem que tenham sido criados por lei ou sem que estejam registrados em sistema centralizado de liquidação e de custódia: Pena - reclusão, de <b class='g2'>1 (um) a 4 (quatro) anos</b>.", nota:"Incluídos pela Lei 10.028/2000. Parágrafo único do 359-A (operação com inobservância de limite, condição ou montante) não reproduzido.", c:["lf7","lf8"] }
]}
],
juris:[
{ id:"stj-s645", trib:"STJ", tipo:"Súmula", num:"645", sec:"licitacoes", status:"vigente", data:"2021",
  titulo:"Fraude à licitação é crime formal", texto:"O crime de fraude à licitação é formal, e sua consumação prescinde da comprovação do prejuízo ou da obtenção de vantagem.",
  explica:"Editada sobre o antigo art. 90 da Lei 8.666/93; aplica-se ao 337-F.", lei:["cp337e"], fonte:STJS },
{ id:"stj-89dolo", trib:"STJ/STF", tipo:"Jurisprudência", num:"AgRg no HC 737.122/SP; AgRg no HC 669.347/SP", sec:"licitacoes", status:"divergencia", data:"2022–2023",
  titulo:"Contratação direta ilegal: dolo específico e prejuízo", texto:"A consumação do crime descrito no art. 89 da Lei n. 8.666/1993, agora disposto no art. 337-E do CP, exige a demonstração do dolo específico de causar dano ao erário, bem como efetivo prejuízo aos cofres públicos.",
  explica:"Doutrina diverge (há quem veja crime formal). Em prova de STF/STJ, siga a exigência de dolo específico e dano.", lei:["cp337e"], fonte:STJJ },
{ id:"stj-inf883", trib:"STJ", tipo:"Informativo", num:"883 (AgRg no AREsp 2.079.040/SP)", sec:"licitacoes", status:"atencao", data:"31/03/2026 (conforme o material de estudo)",
  titulo:"Abolitio da parte final do antigo art. 89", texto:"A revogação da parte final do art. 89 da Lei n. 8.666/1993 pela Lei n. 14.133/2021, não reproduzida no art. 337-E do Código Penal, configura abolitio criminis da conduta de deixar de observar as formalidades pertinentes à dispensa ou à inexigibilidade de licitação.",
  explica:"Referência extraída do material de estudo; confira o informativo antes de citar.", lei:["cp337e"], fonte:STJINF }
],
cards:[
{ id:"lf1", tipo:"numero", sec:"licitacoes", f:"Penas de 337-E, 337-F, 337-H e 337-L.", v:"Todos: reclusão de <b>4 a 8</b> e multa.", lei:["cp337e"] },
{ id:"lf2", tipo:"juris", sec:"licitacoes", f:"Empresas combinam preços e frustram a competição, mas a Administração acaba pagando menos. Há crime?", v:"<b>Sim</b> (337-F). Crime formal: dispensa prejuízo (Súmula 645).", lei:["cp337e"], j:["stj-s645"] },
{ id:"lf3", tipo:"ce", sec:"licitacoes", f:"Certo ou errado: para o STJ, a contratação direta ilegal (337-E) dispensa prova de dano ao erário.", v:"<b>Errado.</b> STF e STJ exigem dolo específico e efetivo prejuízo.", lei:["cp337e"], j:["stj-89dolo"] },
{ id:"lf4", tipo:"caso", sec:"licitacoes", f:"Fornecedor entrega merenda com validade vencida como se fosse boa, em contrato licitado. Crime?", v:"<b>337-L, II</b> (fraude em licitação ou contrato) — 4 a 8.", lei:["cp337i"] },
{ id:"lf5", tipo:"caso", sec:"licitacoes", f:"Concorrente aceita dinheiro para desistir da licitação. Crime dele?", v:"<b>337-K, parágrafo único</b> (abster-se ou desistir em razão de vantagem) — mesma pena de quem ofereceu.", lei:["cp337i"] },
{ id:"lf6", tipo:"distincao", sec:"licitacoes", f:"Inidôneo: admitir à licitação × contratar.", v:"Admitir: <b>1 a 3</b>. Contratar: <b>3 a 6</b>. O inidôneo que participa ou contrata recebe as mesmas penas.", lei:["cp337m"] },
{ id:"lf7", tipo:"numero", sec:"financas", f:"359-C e 359-G: períodos.", v:"359-C: <b>dois últimos quadrimestres</b>. 359-G: <b>180 dias</b> antes do fim do mandato.", lei:["cp359a"] },
{ id:"lf8", tipo:"caso", sec:"financas", f:"Governador contrai empréstimo externo sem autorização legislativa. Crime?", v:"<b>359-A</b> (operação de crédito sem autorização) — reclusão de 1 a 2.", lei:["cp359a"] }
],
questoes:[]
};

})();
