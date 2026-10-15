/* Direito Penal — Parte Geral. Temas aprofundados. Conferido em 14/10/2026.
   Texto legal: Código Penal (DL 2.848/1940) e CF/88, conforme Planalto. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var TEMA = function(n){ return "https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp?novaConsulta=true&tipo_pesquisa=T&cod_tema_inicial="+n+"&cod_tema_final="+n; };
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STFS = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30";
var STFRG = "https://portal.stf.jus.br/jurisprudenciaRepercussao/pagina.asp";

/* ============================ PRINCÍPIOS ============================ */
T.penal_principios = {
meta:{ tema:"Princípios e Fundamentos do Direito Penal", atualizado:AT,
  foco:"Legalidade, anterioridade, culpabilidade, intervenção mínima, lesividade, insignificância, presunção de inocência, fontes do Direito Penal e vedações constitucionais (art. 5º, XLII a XLIV)." },
secoes:[
{ id:"legalidade", titulo:"Legalidade e anterioridade", curto:"Legalidade",
  rapido:["Não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal (CF, art. 5º, XXXIX; CP, art. 1º).",
    "Só <b>lei em sentido estrito</b> (lei ordinária ou complementar federal) cria crime e pena. Medida provisória não pode tratar de Direito Penal (CF, art. 62, §1º, I, b).",
    "Desdobramentos: <b>lei escrita, estrita, certa e prévia</b> — veda costume incriminador, analogia <i>in malam partem</i>, tipos vagos e retroatividade gravosa."],
  teoria:[
    { h:"Reserva legal e anterioridade", p:[
      "O princípio da legalidade tem duas faces: a <b>reserva legal</b> (só a lei, em sentido estrito, define crimes e penas) e a <b>anterioridade</b> (a lei precisa existir antes do fato). A competência para legislar sobre Direito Penal é privativa da União (CF, art. 22, I); lei complementar pode autorizar os Estados a legislar sobre questões específicas.",
      "Medida provisória não pode criar crime nem pena. O STF, porém, admite MP que <b>beneficie</b> o réu (ex.: MPs do Estatuto do Desarmamento que prorrogaram prazos de entrega de armas, tratadas como abolitio temporária).",
      "<b>Normas penais em branco</b> não ferem a legalidade: o complemento (ex.: a portaria da Anvisa que lista as drogas) apenas preenche o conteúdo de um tipo já criado por lei. Em branco homogênea: complemento vem de lei; heterogênea: de ato infralegal."]},
    { h:"Lei certa, estrita e escrita", p:[
      "<b>Lei escrita</b>: costume não cria crime, mas pode ajudar a interpretar (ex.: \"repouso noturno\", \"ato obsceno\"). <b>Lei estrita</b>: proíbe a analogia contra o réu; a analogia <i>in bonam partem</i> é admitida. <b>Lei certa</b> (taxatividade): o tipo deve ser claro, sem expressões vagas que deixem o juiz decidir o que é crime.",
      "Não confunda analogia (integração de lacuna) com interpretação analógica, que é permitida mesmo contra o réu quando a própria lei dá a fórmula genérica após exemplos (ex.: \"ou outro meio insidioso ou cruel\", no homicídio qualificado)."]}
  ],
  pegadinhas:["Medida provisória não pode criar crime, mas o STF já admitiu MP favorável ao réu.","Interpretação analógica (autorizada pela lei) ≠ analogia (integração). Só a analogia gravosa é vedada."]},
{ id:"limitadores", titulo:"Princípios limitadores do poder de punir", curto:"Limitadores",
  rapido:["Intervenção mínima: o Direito Penal é a <i>ultima ratio</i> — subsidiário e fragmentário.",
    "Lesividade (ofensividade): só condutas que lesam ou expõem a perigo bens jurídicos alheios podem ser crime — não se pune autolesão, pensamento ou modo de vida.",
    "Culpabilidade: não há responsabilidade penal objetiva; a pena depende de dolo ou culpa e se mede pela reprovabilidade.",
    "Pessoalidade (intranscendência): a pena não passa da pessoa do condenado (CF, art. 5º, XLV)."],
  teoria:[
    { h:"Intervenção mínima, fragmentariedade e subsidiariedade", p:[
      "<b>Subsidiariedade</b>: o Direito Penal só deve agir quando os outros ramos (civil, administrativo) falham. <b>Fragmentariedade</b>: só protege os bens mais importantes, contra os ataques mais graves — é um \"fragmento\" do ordenamento.",
      "<b>Adequação social</b>: condutas socialmente aceitas não devem ser crime (ex.: furar orelha de criança para brinco). O STJ não aceita adequação social para afastar crimes como a venda de CDs e DVDs piratas (Súmula 502)."]},
    { h:"Lesividade, alteridade e culpabilidade", p:[
      "Pela <b>alteridade</b>, a conduta precisa atingir bem de terceiro: por isso a autolesão não é crime (salvo quando atinge outro bem, como a fraude contra seguro do art. 171, §2º, V). Pela lesividade, também não se pune o simples estado de ser (Direito Penal do autor), apenas o fato.",
      "A <b>culpabilidade</b> como princípio veda a responsabilidade objetiva (CP, art. 19: pelo resultado agravador só responde quem o causou ao menos culposamente) e serve de medida da pena (CP, art. 59).",
      "<b>Individualização da pena</b> (CF, art. 5º, XLVI) ocorre em três fases: legislativa, judicial e executória. <b>Humanidade</b>: vedadas penas de morte (salvo guerra declarada), perpétuas, de trabalhos forçados, de banimento e cruéis (art. 5º, XLVII)."]}
  ],
  quadro:{ titulo:"Penas vedadas pela CF (art. 5º, XLVII)", head:["Vedada","Observação"], rows:[
    ["Morte","Salvo em caso de guerra declarada (art. 84, XIX)"],["Caráter perpétuo","Limite de cumprimento: 40 anos (CP, art. 75, Lei 13.964/2019)"],
    ["Trabalhos forçados","O trabalho do preso é dever, remunerado, e conta para remição"],["Banimento","Expulsão de brasileiro do país"],["Cruéis","Inclui castigos físicos"]]},
  pegadinhas:["Pessoalidade: a pena não passa do condenado, mas a obrigação de reparar o dano e o perdimento de bens podem ser estendidos aos sucessores, até o limite do patrimônio transferido (CF, art. 5º, XLV).","O limite de cumprimento de pena é 40 anos desde a Lei 13.964/2019 (antes, 30)."]},
{ id:"insignificancia", titulo:"Princípio da insignificância", curto:"Insignificância",
  rapido:["Exclui a <b>tipicidade material</b>: o fato é formalmente típico, mas a lesão é irrelevante.",
    "Vetores do STF: mínima ofensividade da conduta, nenhuma periculosidade social da ação, reduzido grau de reprovabilidade do comportamento e inexpressividade da lesão jurídica.",
    "Descaminho e crimes tributários federais: até <b>R$ 20 mil</b> (Tema 157 do STJ).",
    "Não se aplica: crimes contra a Administração Pública (Súm. 599), violência doméstica contra a mulher (Súm. 589), roubo e crimes com violência ou grave ameaça, tráfico de drogas, moeda falsa."],
  teoria:[
    { h:"Onde cabe e onde não cabe", p:[
      "Origem em Claus Roxin. É causa supralegal de exclusão da tipicidade material e pode ser reconhecida pelo juiz. Na fase policial, prevalece que o delegado não deixa de lavrar o flagrante com base na insignificância: a análise cabe ao MP e ao juiz.",
      "<b>Cabe</b>, em regra: furto de pequeníssimo valor (até cerca de 10% do salário mínimo), descaminho e crimes tributários federais até R$ 20 mil, alguns crimes ambientais de lesão ínfima.",
      "<b>Não cabe</b>: crimes contra a Administração Pública (Súmula 599 do STJ — o STF já admitiu em casos excepcionais), crimes e contravenções com violência doméstica contra a mulher (Súmula 589), roubo, tráfico de drogas, moeda falsa (bem jurídico: fé pública), contrabando (em regra), estelionato previdenciário, transmissão clandestina de internet (Súmula 606).",
      "Reincidência e maus antecedentes não impedem automaticamente a aplicação (STF, análise caso a caso), mas costumam afastá-la quando há habitualidade criminosa."]},
    { h:"Presunção de inocência e execução da pena", p:[
      "Ninguém será considerado culpado até o trânsito em julgado da sentença penal condenatória (CF, art. 5º, LVII). O STF (ADCs 43, 44 e 54, 2019) vedou a execução provisória da pena após a condenação em 2ª instância.",
      "Exceção: no <b>Tribunal do Júri</b>, a soberania dos veredictos autoriza a execução imediata da condenação imposta pelo Conselho de Sentença, qualquer que seja a pena (STF, Tema 1068 de repercussão geral).",
      "Inquéritos e ações penais em curso não podem agravar a pena-base (Súmula 444 do STJ)."]}
  ],
  pegadinhas:["Insignificância exclui a tipicidade <b>material</b>, não a ilicitude nem a culpabilidade.","No descaminho o teto é R$ 20 mil (Tema 157), mas para tributos estaduais vale o patamar da lei local.","Execução imediata da pena: só no júri (Tema 1068 do STF), não na condenação comum em 2º grau."]},
{ id:"fontes", titulo:"Conceito e fontes do Direito Penal", curto:"Fontes",
  rapido:["Fonte material (de produção): a União (CF, art. 22, I).","Fonte formal imediata: a lei. Mediatas: costumes e princípios gerais do direito (não criam crime).",
    "Jurisprudência, doutrina e tratados ajudam a interpretar; tratados de direitos humanos podem limitar o poder punitivo."],
  teoria:[{ h:"Direito Penal objetivo e subjetivo", p:[
    "Direito Penal objetivo é o conjunto de normas; subjetivo é o direito de punir (<i>jus puniendi</i>) do Estado, que nasce com a prática do crime. Direito Penal do fato (adotado) se opõe ao Direito Penal do autor (vedado).",
    "Velocidades do Direito Penal (Silva Sánchez): 1ª — pena de prisão com todas as garantias; 2ª — penas alternativas com flexibilização de garantias; 3ª — prisão com garantias reduzidas (Direito Penal do inimigo, de Jakobs)."]}]},
{ id:"constitucionais", titulo:"Vedações constitucionais (CF, art. 5º, XLII a XLIV)", curto:"Vedações da CF",
  rapido:["Racismo: <b>inafiançável e imprescritível</b>, sujeito a reclusão (XLII).",
    "Tortura, tráfico de drogas, terrorismo e hediondos (<b>3TH</b>): inafiançáveis e <b>insuscetíveis de graça ou anistia</b> — mas <b>prescrevem</b> (XLIII).",
    "Ação de grupos armados, civis ou militares, contra a ordem constitucional e o Estado Democrático: <b>inafiançável e imprescritível</b> (XLIV).",
    "Só dois crimes são imprescritíveis na CF: <b>racismo</b> e <b>ação de grupos armados</b>."],
  teoria:[
    { h:"Mandados constitucionais de criminalização", p:[
      "Nesses incisos a Constituição não cria crimes: ela obriga o legislador a criá-los e já fixa o tratamento mais duro que devem receber (proibição de fiança, de graça, de anistia ou de prescrição). Por isso são chamados de mandados de criminalização. Outros exemplos: retenção dolosa do salário (art. 7º, X), condutas lesivas ao meio ambiente (art. 225, §3º) e abuso, violência e exploração sexual de criança e adolescente (art. 227, §4º).",
      "Inafiançável não quer dizer que o preso fica sempre preso. A vedação atinge só a fiança: a liberdade provisória <b>sem fiança</b> continua possível quando não estão presentes os requisitos da prisão preventiva.",
      "A Lei dos Crimes Hediondos (Lei 8.072/90, art. 2º) foi além da CF e também proibiu o <b>indulto</b>. No inciso XLIII, a CF manda punir não só mandantes e executores, mas também quem, <b>podendo evitar</b> o crime, se omite."]},
    { h:"Racismo, injúria racial e homotransfobia", p:[
      "Em 2021 o STF decidiu que a injúria racial é uma espécie de racismo e, por isso, também é imprescritível (HC 154.248). Em 2023, a Lei 14.532 transferiu a injúria racial do Código Penal para a Lei 7.716/89 (art. 2º-A), com pena de reclusão de 2 a 5 anos e multa.",
      "Na ADO 26 (2019), o STF enquadrou as condutas homofóbicas e transfóbicas nos crimes da Lei 7.716/89, até que o Congresso aprove lei específica."]}
  ],
  quadro:{ titulo:"O que a CF veda para cada grupo", head:["Crime","Fiança","Prescrição","Graça e anistia"], rows:[
    ["Racismo (XLII)","Vedada","Imprescritível","CF não veda"],
    ["Tortura, tráfico, terrorismo e hediondos (XLIII)","Vedada","Prescreve","Vedadas (a Lei 8.072 veda também o indulto)"],
    ["Ação de grupos armados (XLIV)","Vedada","Imprescritível","CF não veda"]]},
  pegadinhas:["Tráfico de drogas, tortura, terrorismo e hediondos <b>prescrevem</b>: imprescritíveis são só racismo e ação de grupos armados.",
    "Inafiançabilidade não impede a liberdade provisória sem fiança.",
    "A CF veda graça e anistia aos 3TH; a proibição do indulto vem da Lei 8.072/90, não da CF."]}
],
lei:[
{ art:"CF, art. 5º", nome:"Garantias penais", sec:"legalidade", itens:[
  { id:"cf5-39", rot:"inc. XXXIX e XL", t:"XXXIX - <b class='g1'>não há crime sem lei anterior que o defina</b>, nem pena sem <b class='g1'>prévia cominação legal</b>;<br>XL - a lei penal <b class='g3'>não retroagirá, salvo para beneficiar o réu</b>;", c:["pp1","pp2"] },
  { id:"cf5-45", rot:"inc. XLV a XLVII", t:"XLV - <b class='g1'>nenhuma pena passará da pessoa do condenado</b>, podendo a obrigação de reparar o dano e a decretação do perdimento de bens ser, nos termos da lei, estendidas aos sucessores e contra eles executadas, <b class='g3'>até o limite do valor do patrimônio transferido</b>;<br>XLVI - a lei regulará a <b class='g1'>individualização da pena</b> (...);<br>XLVII - não haverá penas: a) de <b class='g1'>morte</b>, <b class='g3'>salvo em caso de guerra declarada</b>, nos termos do art. 84, XIX; b) de caráter <b class='g1'>perpétuo</b>; c) de <b class='g1'>trabalhos forçados</b>; d) de <b class='g1'>banimento</b>; e) <b class='g1'>cruéis</b>;", c:["pp5","pp6"] },
  { id:"cf5-57", rot:"inc. LVII", t:"LVII - ninguém será considerado culpado até o <b class='g1'>trânsito em julgado</b> de sentença penal condenatória;", j:["stf-t1068"], c:["pp11"] }
]},
{ art:"CP, art. 1º", nome:"Anterioridade da lei", sec:"legalidade", itens:[
  { id:"cp1", rot:"Art. 1º", t:"<b class='g1'>Não há crime sem lei anterior</b> que o defina. <b class='g1'>Não há pena sem prévia cominação legal</b>.", c:["pp1","pp3"] }
]},
{ art:"CF, art. 5º, XLII a XLIV", nome:"Vedações constitucionais", sec:"constitucionais", itens:[
  { id:"cf5-42", rot:"inc. XLII", t:"XLII - a prática do <b class='g1'>racismo</b> constitui crime <b class='g3'>inafiançável e imprescritível</b>, sujeito à pena de <b class='g2'>reclusão</b>, nos termos da lei;", j:["stf-hc154248","stf-ado26"], c:["pp15","pp18","pp19"] },
  { id:"cf5-43", rot:"inc. XLIII", t:"XLIII - a lei considerará crimes <b class='g3'>inafiançáveis e insuscetíveis de graça ou anistia</b> a prática da <b class='g1'>tortura</b>, o <b class='g1'>tráfico ilícito de entorpecentes e drogas afins</b>, o <b class='g1'>terrorismo</b> e os definidos como <b class='g1'>crimes hediondos</b>, por eles respondendo os mandantes, os executores e <b class='g3'>os que, podendo evitá-los, se omitirem</b>;", c:["pp15","pp16","pp17"] },
  { id:"cf5-44", rot:"inc. XLIV", t:"XLIV - constitui crime <b class='g3'>inafiançável e imprescritível</b> a <b class='g1'>ação de grupos armados, civis ou militares</b>, contra a ordem constitucional e o Estado Democrático;", c:["pp19"] }
]}
],
juris:[
{ id:"stf-t1068", trib:"STF", tipo:"Tema de repercussão geral", num:"1068", sec:"insignificancia", status:"vigente", data:"",
  titulo:"Júri: execução imediata da pena", texto:"A soberania dos veredictos do Tribunal do Júri autoriza a imediata execução de condenação imposta pelo corpo de jurados, independentemente do total da pena aplicada.",
  explica:"Exceção à regra das ADCs 43, 44 e 54 (proibição de execução provisória).", lei:["cf5-57"], fonte:STFRG },
{ id:"stj-t157", trib:"STJ", tipo:"Tema repetitivo", num:"157", sec:"insignificancia", status:"vigente", data:"Revisado em 28/02/2018",
  titulo:"Descaminho e tributos federais: até R$ 20 mil", texto:"Incide o princípio da insignificância aos crimes tributários federais e de descaminho quando o débito tributário verificado não ultrapassar o limite de R$ 20.000,00, a teor do disposto no art. 20 da Lei n. 10.522/2002, com as atualizações efetivadas pelas Portarias 75 e 130, ambas do Ministério da Fazenda.",
  explica:"Para tributos estaduais, vale o patamar da lei local.", lei:[], fonte:TEMA(157) },
{ id:"stj-s599", trib:"STJ", tipo:"Súmula", num:"599", sec:"insignificancia", status:"atencao", data:"",
  titulo:"Sem insignificância contra a Administração Pública", texto:"O princípio da insignificância é inaplicável aos crimes contra a administração pública.",
  explica:"O STF já admitiu a insignificância em casos excepcionais (ex.: peculato de valor ínfimo). Em prova, siga a súmula, salvo se a questão pedir o STF.", lei:[], fonte:STJS },
{ id:"stj-s589", trib:"STJ", tipo:"Súmula", num:"589", sec:"insignificancia", status:"vigente", data:"",
  titulo:"Violência doméstica contra a mulher", texto:"É inaplicável o princípio da insignificância nos crimes ou contravenções penais praticados contra a mulher no âmbito das relações domésticas.", explica:"", lei:[], fonte:STJS },
{ id:"stj-s606", trib:"STJ", tipo:"Súmula", num:"606", sec:"insignificancia", status:"vigente", data:"",
  titulo:"Internet clandestina", texto:"Não se aplica o princípio da insignificância a casos de transmissão clandestina de sinal de internet via radiofrequência, que caracteriza o fato típico previsto no art. 183 da Lei n. 9.472/1997.", explica:"", lei:[], fonte:STJS },
{ id:"stj-s502", trib:"STJ", tipo:"Súmula", num:"502", sec:"limitadores", status:"vigente", data:"",
  titulo:"Pirataria não é adequação social", texto:"Presentes a materialidade e a autoria, afigura-se típica, em relação ao crime previsto no art. 184, § 2º, do CP, a conduta de expor à venda CDs e DVDs piratas.", explica:"O STJ rejeita a adequação social nesse caso.", lei:[], fonte:STJS },
{ id:"stj-s444", trib:"STJ", tipo:"Súmula", num:"444", sec:"insignificancia", status:"vigente", data:"",
  titulo:"Inquéritos em curso não agravam a pena-base", texto:"É vedada a utilização de inquéritos policiais e ações penais em curso para agravar a pena-base.", explica:"Decorre da presunção de inocência.", lei:["cf5-57"], fonte:STJS },
{ id:"stf-hc154248", trib:"STF", tipo:"Plenário", num:"HC 154.248", sec:"constitucionais", status:"vigente", data:"28/10/2021",
  titulo:"Injúria racial é imprescritível", texto:"(Síntese) A injúria racial é espécie do gênero racismo e, por isso, é imprescritível, nos termos do art. 5º, XLII, da Constituição.",
  explica:"Texto resumido, não é a ementa literal. Depois do julgado, a Lei 14.532/2023 levou a injúria racial para o art. 2º-A da Lei 7.716/89.", lei:["cf5-42"], fonte:"https://jurisprudencia.stf.jus.br/pages/search?base=acordaos&queryString=HC%20154248" },
{ id:"stf-ado26", trib:"STF", tipo:"Plenário", num:"ADO 26", sec:"constitucionais", status:"vigente", data:"13/06/2019",
  titulo:"Homotransfobia e Lei do Racismo", texto:"(Síntese) Até que o Congresso edite lei específica, as condutas homofóbicas e transfóbicas enquadram-se nos tipos penais da Lei 7.716/89 (racismo, na dimensão social).",
  explica:"Texto resumido, não é a tese literal. Julgada com o MI 4.733.", lei:["cf5-42"], fonte:"https://jurisprudencia.stf.jus.br/pages/search?base=acordaos&queryString=ADO%2026" }
],
cards:[
{ id:"pp1", tipo:"ce", sec:"legalidade", f:"Certo ou errado: medida provisória pode criar crime, desde que convertida em lei.", v:"<b>Errado.</b> A CF veda MP sobre Direito Penal (art. 62, §1º, I, b). O STF só admitiu MP que beneficie o réu.", lei:["cp1"] },
{ id:"pp2", tipo:"distincao", sec:"legalidade", f:"Analogia × interpretação analógica.", v:"<b>Analogia</b>: integra lacuna aplicando norma de caso semelhante — vedada contra o réu. <b>Interpretação analógica</b>: a própria lei dá exemplos e uma fórmula genérica (\"ou outro meio cruel\") — permitida mesmo contra o réu.", lei:["cf5-39"] },
{ id:"pp3", tipo:"lacuna", sec:"legalidade", f:"CP, art. 1º: \"Não há crime sem lei ______ que o defina. Não há pena sem ______ cominação legal.\"", v:"<b>anterior</b> · <b>prévia</b>", lei:["cp1"] },
{ id:"pp4", tipo:"distincao", sec:"legalidade", f:"Norma penal em branco homogênea × heterogênea.", v:"<b>Homogênea</b>: o complemento vem de lei (mesma fonte). <b>Heterogênea</b>: vem de ato infralegal — ex.: portaria da Anvisa que lista as drogas (Lei 11.343/06).", lei:[] },
{ id:"pp5", tipo:"numero", sec:"limitadores", f:"Qual o limite máximo de cumprimento das penas privativas de liberdade?", v:"<b>40 anos</b> (CP, art. 75, desde a Lei 13.964/2019). Antes, 30 anos.", lei:["cf5-45"] },
{ id:"pp6", tipo:"caso", sec:"limitadores", f:"O condenado por estelionato morre. A multa e a obrigação de reparar o dano passam aos herdeiros?", v:"A <b>multa</b> (pena) não passa. A <b>reparação do dano</b> e o perdimento de bens podem ser cobrados dos sucessores, até o limite do patrimônio transferido (CF, art. 5º, XLV).", lei:["cf5-45"] },
{ id:"pp7", tipo:"distincao", sec:"limitadores", f:"Subsidiariedade × fragmentariedade.", v:"<b>Subsidiariedade</b>: o Penal só atua se os outros ramos falharem (<i>ultima ratio</i>). <b>Fragmentariedade</b>: só protege os bens mais relevantes contra os ataques mais graves.", lei:[] },
{ id:"pp8", tipo:"caso", sec:"insignificancia", f:"Servidor público se apropria de R$ 30 em material de escritório. Pela Súmula 599, cabe insignificância?", v:"<b>Não.</b> A Súmula 599 do STJ veda a insignificância em crimes contra a Administração Pública.", lei:[], j:["stj-s599"] },
{ id:"pp9", tipo:"numero", sec:"insignificancia", f:"Até que valor de tributo iludido o STJ aplica a insignificância no descaminho?", v:"<b>R$ 20.000</b> (Tema 157).", lei:[], j:["stj-t157"] },
{ id:"pp10", tipo:"lacuna", sec:"insignificancia", f:"Vetores do STF para a insignificância: mínima ______ da conduta; nenhuma ______ social da ação; reduzido grau de ______; inexpressividade da ______ jurídica.", v:"<b>ofensividade</b> · <b>periculosidade</b> · <b>reprovabilidade</b> do comportamento · <b>lesão</b>", lei:[] },
{ id:"pp11", tipo:"juris", sec:"insignificancia", f:"Condenado pelo júri a 8 anos pode começar a cumprir a pena antes do trânsito em julgado?", v:"<b>Sim.</b> Tema 1068 do STF: a soberania dos veredictos autoriza a execução imediata, qualquer que seja a pena.", lei:["cf5-57"], j:["stf-t1068"] },
{ id:"pp12", tipo:"ce", sec:"insignificancia", f:"Certo ou errado: a insignificância exclui a ilicitude do fato.", v:"<b>Errado.</b> Exclui a <b>tipicidade material</b>.", lei:[] },
{ id:"pp13", tipo:"caso", sec:"insignificancia", f:"Marido subtrai R$ 20 da esposa com ameaça, no contexto de violência doméstica. Cabe insignificância?", v:"<b>Não.</b> Súmula 589: inaplicável nos crimes e contravenções contra a mulher no âmbito doméstico (e há grave ameaça).", lei:[], j:["stj-s589"] },
{ id:"pp14", tipo:"ce", sec:"limitadores", f:"Certo ou errado: a autolesão é punida, em regra, por violar a integridade física.", v:"<b>Errado.</b> Pelo princípio da alteridade, a autolesão não é crime — salvo quando atinge bem de terceiro (ex.: fraude contra seguro, art. 171, §2º, V).", lei:[] },
{ id:"pp15", tipo:"ce", sec:"constitucionais", f:"Certo ou errado: por força da Constituição, o tráfico de drogas é crime imprescritível.", v:"<b>Errado.</b> O tráfico é inafiançável e insuscetível de graça ou anistia, mas <b>prescreve</b>. Imprescritíveis são só o racismo e a ação de grupos armados.", lei:["cf5-43","cf5-42"] },
{ id:"pp16", tipo:"lacuna", sec:"constitucionais", f:"CF, art. 5º, XLIII: tortura, tráfico, terrorismo e hediondos são inafiançáveis e insuscetíveis de ______ ou ______.", v:"<b>graça</b> · <b>anistia</b> (o indulto é vedado pela Lei 8.072/90)", lei:["cf5-43"] },
{ id:"pp17", tipo:"caso", sec:"constitucionais", f:"Preso em flagrante por roubo com emprego de arma de fogo (hediondo). Como o crime é inafiançável, o delegado informa que ele não pode ser solto antes do julgamento. Está certo?", v:"<b>Não.</b> A vedação é só da <b>fiança</b>. O juiz pode conceder liberdade provisória sem fiança se não houver requisitos para a preventiva.", lei:["cf5-43"] },
{ id:"pp18", tipo:"juris", sec:"constitucionais", f:"Injúria racial cometida em 2015 (então no art. 140, §3º, do CP). Prescreve?", v:"<b>Não.</b> O STF (HC 154.248, 2021) considerou a injúria racial espécie de racismo, logo imprescritível.", lei:["cf5-42"], j:["stf-hc154248"] },
{ id:"pp19", tipo:"distincao", sec:"constitucionais", f:"Quais crimes a CF declara imprescritíveis?", v:"Só dois: <b>racismo</b> (XLII) e <b>ação de grupos armados</b>, civis ou militares, contra a ordem constitucional e o Estado Democrático (XLIV).", lei:["cf5-42","cf5-44"] }
],
questoes:[]
};

/* ====================== APLICAÇÃO DA LEI PENAL ====================== */
T.penal_aplicacao = {
meta:{ tema:"Aplicação da Lei Penal e Infração Penal", atualizado:AT, foco:"Lei penal no tempo, no espaço e em relação às pessoas; tempo e lugar do crime; disposições preliminares do CP (arts. 8º a 12); infração penal (crime e contravenção) e seus sujeitos; conflito aparente de normas." },
secoes:[
{ id:"tempo", titulo:"Lei penal no tempo", curto:"Tempo",
  rapido:["Regra: aplica-se a lei vigente na data do fato (<i>tempus regit actum</i>).","Lei mais benéfica <b>retroage</b>, inclusive após o trânsito em julgado; lei mais grave não retroage.",
    "<i>Abolitio criminis</i> apaga os efeitos penais (inclusive reincidência), mas não os efeitos civis.","Leis excepcionais e temporárias são <b>ultra-ativas</b> (art. 3º)."],
  teoria:[
    { h:"Conflito de leis no tempo", p:[
      "<b>Abolitio criminis</b> (art. 2º, caput): a lei nova deixa de considerar o fato crime. Cessa a execução e os efeitos penais da condenação; permanecem os efeitos extrapenais (dever de indenizar, perda do cargo já efetivada). É causa extintiva da punibilidade (art. 107, III).",
      "<b>Novatio legis in mellius</b> (art. 2º, parágrafo único): lei que de qualquer modo favorece retroage, mesmo com trânsito em julgado. Depois do trânsito, quem aplica é o juízo da execução (Súmula 611 do STF).",
      "<b>Novatio legis in pejus</b> e <b>novatio legis incriminadora</b>: não retroagem. A lei mais grave só alcança fatos posteriores à sua vigência.",
      "<b>Combinação de leis</b> (pegar a parte boa de cada uma): o STJ veda (Súmula 501, sobre a Lei de Drogas); aplica-se integralmente a lei que, no conjunto, for mais favorável.",
      "<b>Princípio da continuidade normativo-típica</b>: se a lei revoga o artigo mas a conduta continua crime em outro dispositivo, não há abolitio (ex.: atentado violento ao pudor, absorvido pelo estupro em 2009)."]},
    { h:"Crime continuado e permanente", p:[
      "Súmula 711 do STF: a lei penal mais grave aplica-se ao crime continuado ou ao crime permanente se a sua vigência é anterior à cessação da continuidade ou da permanência. Ex.: extorsão mediante sequestro que dura de antes até depois da lei nova mais grave — aplica-se a nova.",
      "Leis <b>excepcionais</b> (para situação anormal, como calamidade) e <b>temporárias</b> (com prazo de vigência prefixado) continuam se aplicando aos fatos praticados durante sua vigência, mesmo após revogadas (ultra-atividade)."]}
  ],
  quadro:{ titulo:"Lei nova × fato anterior", head:["Situação","Efeito"], rows:[["Deixa de ser crime","Abolitio: retroage, apaga efeitos penais"],["Favorece de qualquer modo","Retroage, até após o trânsito (Súm. 611)"],["Agrava a pena","Não retroage"],["Cria crime novo","Não retroage"],["Crime permanente ou continuado","Lei mais grave se aplica se vigente antes de cessar (Súm. 711)"]]},
  pegadinhas:["Abolitio não apaga efeitos civis: a vítima ainda pode executar a sentença para indenização.","Exemplo atual: as Leis 15.397/2026 e 15.358/2026 agravaram penas patrimoniais — só valem para fatos posteriores."]},
{ id:"momento-lugar", titulo:"Tempo e lugar do crime", curto:"Tempo e lugar",
  rapido:["Tempo do crime: teoria da <b>atividade</b> (art. 4º) — momento da ação ou omissão.","Lugar do crime: teoria da <b>ubiquidade</b> (art. 6º) — onde houve a conduta ou o resultado.","Mnemônico: <b>LUTA</b> — Lugar = Ubiquidade; Tempo = Atividade."],
  teoria:[{ h:"Por que importa", p:[
    "A teoria da atividade define, por exemplo, a imputabilidade: quem dispara aos 17 anos contra vítima que morre depois de ele completar 18 responde como menor (ECA).",
    "A ubiquidade resolve os crimes a distância (conduta num país, resultado em outro): ambos podem aplicar sua lei. Não confunda com a <b>competência</b> interna do CPP, que em regra segue o lugar da consumação (art. 70 do CPP)."]}],
  pegadinhas:["Teoria da ubiquidade é do CP (aplicação da lei no espaço); o CPP adota, em regra, o lugar da consumação para fixar o foro."]},
{ id:"espaco", titulo:"Lei penal no espaço", curto:"Espaço",
  rapido:["Regra: <b>territorialidade temperada</b> (art. 5º) — a lei brasileira se aplica ao crime cometido no território nacional, ressalvados tratados.",
    "Extensão do território: embarcações e aeronaves públicas brasileiras em qualquer lugar; privadas brasileiras em alto-mar ou espaço aéreo correspondente.",
    "Extraterritorialidade <b>incondicionada</b> (art. 7º, I) e <b>condicionada</b> (art. 7º, II e §3º)."],
  teoria:[{ h:"Extraterritorialidade", p:[
    "<b>Incondicionada</b>: crimes contra a vida ou a liberdade do Presidente da República; contra o patrimônio ou a fé pública da União, DF, Estados, Territórios, Municípios, empresas públicas, sociedades de economia mista, autarquias e fundações; contra a administração pública por quem está a seu serviço; genocídio, quando o agente for brasileiro ou domiciliado no Brasil. Aplica-se a lei brasileira ainda que o agente tenha sido absolvido ou condenado no estrangeiro.",
    "<b>Condicionada</b>: crimes que o Brasil se obrigou a reprimir por tratado; praticados por brasileiro; praticados em aeronaves ou embarcações brasileiras privadas no estrangeiro e aí não julgados. Condições cumulativas: entrar no território nacional; fato punível também no país onde ocorreu; crime extraditável; não absolvido nem cumprida a pena no estrangeiro; não perdoado nem extinta a punibilidade.",
    "Crime de estrangeiro contra brasileiro fora do Brasil (§3º): além das condições, não pode ter sido pedida ou ter sido negada a extradição, e deve haver requisição do Ministro da Justiça.",
    "Pena cumprida no estrangeiro (art. 8º): atenua a pena imposta no Brasil pelo mesmo crime, quando diversas, ou é computada, quando idênticas — evita o <i>bis in idem</i>."]}],
  pegadinhas:["Na incondicionada, mesmo a absolvição no estrangeiro não impede o processo no Brasil.","Navio público estrangeiro em porto brasileiro é extensão do território estrangeiro, não do nosso."]},
{ id:"pessoas", titulo:"Lei penal em relação às pessoas", curto:"Imunidades",
  rapido:["Imunidade diplomática: agentes diplomáticos respondem pela lei do Estado que representam (Convenção de Viena).",
    "Parlamentares federais: imunidade <b>material</b> (inviolabilidade por opiniões, palavras e votos) e <b>formal</b> (prisão só em flagrante de crime inafiançável; sustação do processo).",
    "Vereadores: só imunidade material, na circunscrição do Município e com pertinência ao mandato."],
  teoria:[{ h:"Imunidades parlamentares (CF, art. 53)", p:[
    "Deputados e senadores são invioláveis, civil e penalmente, por quaisquer opiniões, palavras e votos (imunidade material). Desde a diplomação, não podem ser presos, salvo em flagrante de crime inafiançável, caso em que os autos vão em 24 horas à Casa, que resolve sobre a prisão pelo voto da maioria de seus membros.",
    "Recebida a denúncia por crime ocorrido após a diplomação, o STF dá ciência à Casa, que pode sustar o andamento da ação, por iniciativa de partido político e voto da maioria; a sustação suspende a prescrição.",
    "Deputados estaduais têm as mesmas imunidades (art. 27, §1º). Vereadores: só a material, nos limites do Município (art. 29, VIII)."]}]},
{ id:"infracao", titulo:"Infração penal: crime, contravenção e sujeitos", curto:"Infração penal",
  rapido:["O Brasil adota o sistema <b>bipartido</b>: infração penal é o gênero; <b>crime</b> (ou delito) e <b>contravenção</b> são as espécies.",
    "O critério é a pena (Lei de Introdução ao CP, art. 1º): crime tem <b>reclusão ou detenção</b>; contravenção tem só <b>prisão simples e/ou multa</b>.",
    "Contravenção: tentativa <b>não é punível</b>, a lei brasileira só se aplica no <b>território nacional</b> e a prisão simples não passa de <b>5 anos</b>.",
    "Sujeito passivo <b>formal</b> (constante) é sempre o Estado; o <b>material</b> (eventual) é o titular do bem jurídico atingido."],
  teoria:[
    { h:"Crime × contravenção", p:[
      "A diferença é de grau, não de natureza: o legislador decide quais condutas são mais graves. O critério legal está no art. 1º da Lei de Introdução ao Código Penal: se a lei comina reclusão ou detenção (sozinhas ou com multa), é crime; se comina apenas prisão simples ou multa, isoladas ou em conjunto, é contravenção. Por isso a contravenção é chamada de \"crime anão\".",
      "Pelo conceito analítico majoritário (tripartido), crime é fato <b>típico, ilícito e culpável</b>. Os elementos do fato típico (conduta, resultado, nexo causal e tipicidade) estão no módulo Teoria do Delito I.",
      "Regras próprias da Lei das Contravenções Penais (DL 3.688/41): basta a ação ou omissão voluntária (art. 3º); a tentativa não é punível (art. 4º); não há extraterritorialidade (art. 2º); o erro escusável sobre a lei permite deixar de aplicar a pena (art. 8º); a ação penal é sempre pública incondicionada (art. 17); a prisão simples tem limite de 5 anos (art. 10). No restante, aplicam-se as regras gerais do CP (LCP, art. 1º; CP, art. 12).",
      "Contravenções são infrações de menor potencial ofensivo (Lei 9.099/95, art. 61) e são julgadas pela <b>Justiça Estadual</b>, ainda que atinjam bens ou interesses da União, porque o art. 109, IV, da CF exclui as contravenções da competência federal (Súmula 38 do STJ). A ressalva fica por conta do foro por prerrogativa de função."]},
    { h:"Sujeito ativo", p:[
      "Sujeito ativo é quem pratica a infração penal: o autor que realiza o verbo do tipo e também quem concorre para o crime sem realizá-lo (partícipe), pelas regras do concurso de pessoas (art. 29).",
      "Crime <b>comum</b> pode ser praticado por qualquer pessoa. Crime <b>próprio</b> exige uma qualidade especial do agente (peculato exige funcionário público) e admite coautoria e participação de quem não tem a qualidade, se ela for conhecida (art. 30). Crime <b>de mão própria</b> exige atuação pessoal (falso testemunho) e, em regra, não admite coautoria, só participação.",
      "<b>Pessoa jurídica</b>: a CF (art. 225, §3º) e a Lei 9.605/98 (art. 3º) admitem sua responsabilidade penal nos crimes ambientais. O STF (RE 548.181, 2013) afastou a teoria da dupla imputação: a empresa pode ser processada mesmo que a pessoa física responsável não seja identificada ou denunciada, entendimento depois seguido pelo STJ."]},
    { h:"Sujeito passivo e objeto do crime", p:[
      "Sujeito passivo <b>formal</b> (mediato ou constante) é o Estado, titular do interesse em ver a lei cumprida — está presente em todo crime. Sujeito passivo <b>material</b> (imediato ou eventual) é o titular do bem jurídico lesado: o dono do celular furtado, a vítima da lesão corporal. O Estado também pode ser sujeito passivo material, como no peculato.",
      "<b>Crimes vagos</b> têm como sujeito passivo um ente sem personalidade jurídica, como a coletividade ou a família (ex.: tráfico de drogas, vilipêndio a cadáver). Morto e animais não são sujeitos passivos: o cadáver é <b>objeto material</b> do crime.",
      "<b>Objeto material</b> é a pessoa ou coisa sobre a qual recai a conduta (o celular, no furto); <b>objeto jurídico</b> é o bem jurídico protegido (o patrimônio). Pela alteridade, ninguém é sujeito ativo e passivo do mesmo crime: quem se autolesiona para receber o seguro comete estelionato contra a seguradora (art. 171, §2º, V)."]}
  ],
  quadro:{ titulo:"Crime × contravenção", head:["Ponto","Crime","Contravenção"], rows:[
    ["Pena","Reclusão ou detenção (com ou sem multa)","Prisão simples e/ou multa"],
    ["Tentativa","Punível (art. 14, II, do CP)","Não punível (LCP, art. 4º)"],
    ["Extraterritorialidade","Possível (art. 7º do CP)","Não há (LCP, art. 2º)"],
    ["Ação penal","Pública ou privada, conforme o tipo","Sempre pública incondicionada (LCP, art. 17)"],
    ["Limite de cumprimento","40 anos (art. 75 do CP)","5 anos (LCP, art. 10)"],
    ["Competência","Estadual ou Federal","Estadual, mesmo contra a União (Súmula 38 do STJ)"]]},
  pegadinhas:["A tentativa de contravenção existe na realidade, mas a lei não a pune.",
    "Contravenção contra bens da União vai para a Justiça <b>Estadual</b> (CF, art. 109, IV, e Súmula 38 do STJ).",
    "Pessoa jurídica pode ser denunciada por crime ambiental sem que a pessoa física seja denunciada junto (STF, RE 548.181).",
    "O cadáver não é vítima: é objeto material. A vítima do vilipêndio é a coletividade (crime vago)."]},
{ id:"conflito", titulo:"Conflito aparente de normas", curto:"Conflito aparente",
  rapido:["Há conflito <b>aparente</b> quando um único fato parece se encaixar em vários tipos penais, mas só um deve ser aplicado.",
    "Requisitos: <b>unidade de fato</b> e <b>pluralidade de normas</b> vigentes que parecem incidir sobre ele.",
    "Princípios de solução: <b>especialidade</b>, <b>subsidiariedade</b>, <b>consunção</b> e <b>alternatividade</b>.",
    "Súmula 17 do STJ: o falso que se esgota no estelionato é absorvido por ele."],
  teoria:[
    { h:"Especialidade e subsidiariedade", p:[
      "<b>Especialidade</b>: a norma especial contém todos os elementos da norma geral e mais algum elemento que a especializa, e por isso prevalece, tenha pena maior ou menor. A comparação é feita entre os tipos, em abstrato. Exemplos: infanticídio (art. 123) × homicídio; homicídio culposo na direção de veículo (CTB, art. 302) × homicídio culposo do CP.",
      "<b>Subsidiariedade</b>: a norma principal, mais grave, afasta a subsidiária, que funciona como um \"soldado de reserva\" e só é aplicada se a principal não incidir. É <b>expressa</b> quando o próprio tipo avisa que só se aplica se o fato não constituir crime mais grave (ex.: perigo para a vida ou a saúde de outrem, art. 132). É <b>tácita</b> quando o crime menos grave integra a execução do mais grave (o constrangimento ilegal dentro do roubo). A análise depende do caso concreto."]},
    { h:"Consunção e alternatividade", p:[
      "<b>Consunção</b> (absorção): o crime-meio, ou o crime que é etapa normal de outro, é absorvido pelo crime-fim. Aparece no crime progressivo (as lesões causadas para matar ficam absorvidas pelo homicídio), na progressão criminosa (o agente queria lesionar e, no meio da execução, decide matar), no antefato impunível (a violação de domicílio cometida só para furtar dentro da casa) e no pós-fato impunível (o ladrão que destrói a coisa furtada não responde por dano).",
      "A consunção pode até levar à absorção de crime com pena maior. É o caso da Súmula 17 do STJ: a falsificação de documento é absorvida pelo estelionato quando se esgota na fraude e não tem mais potencial para enganar ninguém. Se o documento falso continua apto a ser usado em outras fraudes, há concurso de crimes.",
      "<b>Alternatividade</b>: nos tipos mistos alternativos (vários verbos no mesmo tipo), praticar mais de um verbo contra o mesmo objeto, no mesmo contexto, configura um <b>crime único</b>. Ex.: importar, guardar e vender a mesma porção de droga é um só tráfico (Lei 11.343/06, art. 33)."]}
  ],
  quadro:{ titulo:"Como identificar cada princípio", head:["Princípio","Pergunta-chave","Exemplo"], rows:[
    ["Especialidade","Um tipo tem todos os elementos do outro e mais algum?","Infanticídio × homicídio"],
    ["Subsidiariedade","Um tipo só se aplica se não houver crime mais grave?","Art. 132 do CP; constrangimento ilegal no roubo"],
    ["Consunção","Um crime foi meio, etapa ou exaurimento de outro?","Falso absorvido pelo estelionato (Súmula 17 do STJ)"],
    ["Alternatividade","Vários verbos do mesmo tipo, mesmo objeto e mesmo contexto?","Importar, guardar e vender a mesma droga"]]},
  pegadinhas:["A especialidade não depende da pena: a norma especial pode ser mais branda (infanticídio).",
    "Conflito aparente não é concurso de crimes: no conflito incide uma só norma; no concurso, várias.",
    "A Súmula 17 só se aplica se o falso se <b>esgota</b> no estelionato; se o documento pode enganar de novo, há concurso."]}
],
lei:[
{ art:"CP, arts. 2º a 4º", nome:"Lei penal no tempo", sec:"tempo", itens:[
  { id:"cp2", rot:"Art. 2º", t:"Ninguém pode ser punido por fato que <b class='g1'>lei posterior deixa de considerar crime</b>, cessando em virtude dela a execução e os <b class='g3'>efeitos penais</b> da sentença condenatória.<br>Parágrafo único - A lei posterior, que de qualquer modo <b class='g1'>favorecer o agente</b>, aplica-se aos fatos anteriores, <b class='g3'>ainda que decididos por sentença condenatória transitada em julgado</b>.", j:["stf-s611","stj-s501"], c:["ap1","ap2","ap3"] },
  { id:"cp3", rot:"Art. 3º", t:"A lei <b class='g1'>excepcional ou temporária</b>, embora decorrido o período de sua duração ou cessadas as circunstâncias que a determinaram, <b class='g3'>aplica-se ao fato praticado durante sua vigência</b>.", c:["ap4"] },
  { id:"cp4", rot:"Art. 4º", t:"Considera-se praticado o crime no <b class='g1'>momento da ação ou omissão</b>, ainda que outro seja o momento do resultado.", c:["ap5"] }
]},
{ art:"CP, arts. 5º a 8º", nome:"Lei penal no espaço", sec:"espaco", itens:[
  { id:"cp5", rot:"Art. 5º", t:"Aplica-se a lei brasileira, sem prejuízo de convenções, tratados e regras de direito internacional, ao crime cometido no <b class='g1'>território nacional</b>.<br>§ 1º - Para os efeitos penais, consideram-se como extensão do território nacional as embarcações e aeronaves brasileiras, <b class='g1'>de natureza pública ou a serviço do governo brasileiro onde quer que se encontrem</b>, bem como as aeronaves e as embarcações brasileiras, mercantes ou de propriedade privada, que se achem, respectivamente, no espaço aéreo correspondente ou <b class='g3'>em alto-mar</b>.<br>§ 2º - É também aplicável a lei brasileira aos crimes praticados a bordo de aeronaves ou embarcações estrangeiras de propriedade privada, achando-se aquelas em pouso no território nacional ou em vôo no espaço aéreo correspondente, e estas em porto ou mar territorial do Brasil.", c:["ap6","ap7"] },
  { id:"cp6", rot:"Art. 6º", t:"Considera-se praticado o crime no lugar em que ocorreu a <b class='g1'>ação ou omissão</b>, no todo ou em parte, bem como onde se produziu ou deveria produzir-se o <b class='g1'>resultado</b>.", c:["ap5"] },
  { id:"cp7", rot:"Art. 7º", t:"Ficam sujeitos à lei brasileira, embora cometidos no estrangeiro:<br>I - os crimes: a) contra a <b class='g1'>vida ou a liberdade do Presidente da República</b>; b) contra o patrimônio ou a fé pública da União, do Distrito Federal, de Estado, de Território, de Município, de empresa pública, sociedade de economia mista, autarquia ou fundação instituída pelo Poder Público; c) contra a administração pública, por quem está a seu serviço; d) de <b class='g1'>genocídio</b>, quando o agente for brasileiro ou domiciliado no Brasil;<br>II - os crimes: a) que, por tratado ou convenção, o Brasil se obrigou a reprimir; b) praticados por brasileiro; c) praticados em aeronaves ou embarcações brasileiras, mercantes ou de propriedade privada, quando em território estrangeiro e aí não sejam julgados.<br>§ 1º - Nos casos do inciso I, o agente é punido segundo a lei brasileira, <b class='g3'>ainda que absolvido ou condenado no estrangeiro</b>.<br>§ 2º - Nos casos do inciso II, a aplicação da lei brasileira depende do concurso das seguintes condições: a) entrar o agente no território nacional; b) ser o fato punível também no país em que foi praticado; c) estar o crime incluído entre aqueles pelos quais a lei brasileira autoriza a extradição; d) não ter sido o agente absolvido no estrangeiro ou não ter aí cumprido a pena; e) não ter sido o agente perdoado no estrangeiro ou, por outro motivo, não estar extinta a punibilidade, segundo a lei mais favorável.<br>§ 3º - A lei brasileira aplica-se também ao crime cometido por estrangeiro contra brasileiro fora do Brasil, se, reunidas as condições previstas no parágrafo anterior: a) não foi pedida ou foi negada a extradição; b) houve requisição do Ministro da Justiça.", c:["ap8","ap9","ap10"] },
  { id:"cp8", rot:"Art. 8º", t:"A pena cumprida no estrangeiro <b class='g1'>atenua</b> a pena imposta no Brasil pelo mesmo crime, quando diversas, ou nela é <b class='g1'>computada</b>, quando idênticas.", c:["ap11"] },
  { id:"cp9", rot:"Art. 9º", t:"A sentença estrangeira, quando a aplicação da lei brasileira produz na espécie as mesmas conseqüências, pode ser <b class='g1'>homologada no Brasil</b> para:<br>I - obrigar o condenado à <b class='g1'>reparação do dano</b>, a restituições e a outros efeitos civis;<br>II - sujeitá-lo a <b class='g1'>medida de segurança</b>.<br>Parágrafo único - A homologação depende:<br>a) para os efeitos previstos no inciso I, de <b class='g3'>pedido da parte interessada</b>;<br>b) para os outros efeitos, da existência de <b class='g3'>tratado de extradição</b> com o país de cuja autoridade judiciária emanou a sentença, ou, na falta de tratado, de <b class='g3'>requisição do Ministro da Justiça</b>.", nota:"A homologação de sentença estrangeira compete ao STJ (CF, art. 105, I, i).", c:["ap31"] }
]},
{ art:"CP, arts. 10 a 12", nome:"Prazos, frações e legislação especial", sec:"momento-lugar", itens:[
  { id:"cp10", rot:"Art. 10", t:"O dia do começo <b class='g1'>inclui-se no cômputo do prazo</b>. Contam-se os dias, os meses e os anos pelo <b class='g1'>calendário comum</b>.", c:["ap12"] },
  { id:"cp11", rot:"Art. 11", t:"<b class='g1'>Desprezam-se</b>, nas penas privativas de liberdade e nas restritivas de direitos, as <b class='g2'>frações de dia</b>, e, na pena de multa, as <b class='g2'>frações de cruzeiro</b>.", nota:"\"Cruzeiro\" é a moeda da época; entende-se como a fração da moeda atual (centavos).", c:["ap32"] },
  { id:"cp12", rot:"Art. 12", t:"As <b class='g1'>regras gerais deste Código</b> aplicam-se aos fatos incriminados por <b class='g1'>lei especial</b>, <b class='g3'>se esta não dispuser de modo diverso</b>.", c:["ap33"] }
]},
{ art:"Lei de Introdução ao CP (DL 3.914/41), art. 1º", nome:"Crime e contravenção", sec:"infracao", itens:[
  { id:"licp1", rot:"Art. 1º", t:"Considera-se <b class='g1'>crime</b> a infração penal que a lei comina pena de <b class='g2'>reclusão ou de detenção</b>, quer isoladamente, quer alternativa ou cumulativamente com a pena de multa; <b class='g1'>contravenção</b>, a infração penal a que a lei comina, isoladamente, pena de <b class='g2'>prisão simples ou de multa</b>, ou ambas, alternativa ou cumulativamente.", c:["ap20"] }
]},
{ art:"Lei das Contravenções Penais (DL 3.688/41)", nome:"Regras próprias das contravenções", sec:"infracao", itens:[
  { id:"lcp2", rot:"Art. 2º", t:"A lei brasileira <b class='g3'>só é aplicável</b> à contravenção praticada no <b class='g1'>território nacional</b>.", c:["ap18"] },
  { id:"lcp3", rot:"Art. 3º", t:"Para a existência da contravenção, <b class='g1'>basta a ação ou omissão voluntária</b>. Deve-se, todavia, ter em conta o dolo ou a culpa, se a lei faz depender, de um ou de outra, qualquer efeito jurídico." },
  { id:"lcp4", rot:"Art. 4º", t:"<b class='g1'>Não é punível a tentativa</b> de contravenção.", c:["ap17"] },
  { id:"lcp8", rot:"Art. 8º", t:"No caso de ignorância ou de errada compreensão da lei, <b class='g3'>quando escusáveis</b>, a pena <b class='g1'>pode deixar de ser aplicada</b>." },
  { id:"lcp10", rot:"Art. 10", t:"A duração da pena de prisão simples não pode, em caso algum, ser superior a <b class='g2'>cinco anos</b>, nem a importância das multas ultrapassar cinquenta contos.", nota:"O valor em \"contos\" está superado; a multa segue as regras do CP.", c:["ap16"] },
  { id:"lcp17", rot:"Art. 17", t:"A ação penal é <b class='g1'>pública</b>, devendo a autoridade <b class='g1'>proceder de ofício</b>." }
]},
{ art:"Lei 9.605/98, art. 3º", nome:"Pessoa jurídica como sujeito ativo", sec:"infracao", itens:[
  { id:"l9605-3", rot:"Art. 3º", t:"As <b class='g1'>pessoas jurídicas serão responsabilizadas administrativa, civil e penalmente</b> conforme o disposto nesta Lei, nos casos em que a infração seja cometida <b class='g3'>por decisão de seu representante legal ou contratual, ou de seu órgão colegiado, no interesse ou benefício da sua entidade</b>.<br>Parágrafo único. A responsabilidade das pessoas jurídicas <b class='g3'>não exclui</b> a das pessoas físicas, autoras, co-autoras ou partícipes do mesmo fato.", j:["stf-re548181"], c:["ap22"] }
]},
{ art:"CF, art. 53", nome:"Imunidades parlamentares", sec:"pessoas", itens:[
  { id:"cf53", rot:"caput e § 2º", t:"Os Deputados e Senadores são <b class='g1'>invioláveis, civil e penalmente, por quaisquer de suas opiniões, palavras e votos</b>.<br>(...) § 2º Desde a expedição do diploma, os membros do Congresso Nacional não poderão ser presos, <b class='g3'>salvo em flagrante de crime inafiançável</b>. Nesse caso, os autos serão remetidos dentro de <b class='g2'>vinte e quatro horas</b> à Casa respectiva, para que, pelo voto da <b class='g2'>maioria de seus membros</b>, resolva sobre a prisão.", c:["ap13"] }
]}
],
juris:[
{ id:"stf-s711", trib:"STF", tipo:"Súmula", num:"711", sec:"tempo", status:"vigente", data:"", titulo:"Crime continuado e permanente",
  texto:"A lei penal mais grave aplica-se ao crime continuado ou ao crime permanente, se a sua vigência é anterior à cessação da continuidade ou da permanência.", explica:"", lei:["cp2"], fonte:STFS },
{ id:"stf-s611", trib:"STF", tipo:"Súmula", num:"611", sec:"tempo", status:"vigente", data:"", titulo:"Lei benéfica após o trânsito",
  texto:"Transitada em julgado a sentença condenatória, compete ao juízo das execuções a aplicação de lei mais benigna.", explica:"", lei:["cp2"], fonte:STFS },
{ id:"stj-s501", trib:"STJ", tipo:"Súmula", num:"501", sec:"tempo", status:"vigente", data:"", titulo:"Vedada a combinação de leis",
  texto:"É cabível a aplicação retroativa da Lei n. 11.343/2006, desde que o resultado da incidência das suas disposições, na íntegra, seja mais favorável ao réu do que o advindo da aplicação da Lei n. 6.368/1976, sendo vedada a combinação de leis.", explica:"Aplica-se uma lei inteira, a mais favorável no conjunto.", lei:["cp2"], fonte:STJS },
{ id:"stf-vereador", trib:"STF", tipo:"Repercussão geral", num:"RE 600.063 (Tema 469)", sec:"pessoas", status:"vigente", data:"", titulo:"Imunidade material do vereador",
  texto:"Nos limites da circunscrição do Município e havendo pertinência com o exercício do mandato, garante-se a imunidade prevista no art. 29, VIII, da Constituição aos vereadores.", explica:"Vereador não tem imunidade formal.", lei:["cf53"], fonte:STFRG },
{ id:"stj-s38", trib:"STJ", tipo:"Súmula", num:"38", sec:"infracao", status:"vigente", data:"",
  titulo:"Contravenção: Justiça Estadual", texto:"Compete à Justiça Estadual Comum, na vigência da Constituição de 1988, o processo por contravenção penal, ainda que praticada em detrimento de bens, serviços ou interesse da União ou de suas entidades.",
  explica:"Decorre do art. 109, IV, da CF, que exclui as contravenções da competência federal. Ressalva: foro por prerrogativa de função.", lei:["licp1"], fonte:STJS },
{ id:"stf-re548181", trib:"STF", tipo:"1ª Turma (Info 714)", num:"RE 548.181", sec:"infracao", status:"vigente", data:"06/08/2013",
  titulo:"Pessoa jurídica sem dupla imputação", texto:"(Síntese) O art. 225, §3º, da CF não condiciona a responsabilização penal da pessoa jurídica por crime ambiental à simultânea persecução penal da pessoa física em tese responsável.",
  explica:"Texto resumido, não é a ementa literal. Julgado de Turma; o STJ passou a seguir o mesmo entendimento a partir de 2015.", lei:["l9605-3"], fonte:"https://jurisprudencia.stf.jus.br/pages/search?base=acordaos&queryString=RE%20548181" },
{ id:"stj-s17", trib:"STJ", tipo:"Súmula", num:"17", sec:"conflito", status:"vigente", data:"28/11/1990",
  titulo:"Falso absorvido pelo estelionato", texto:"Quando o falso se exaure no estelionato, sem mais potencialidade lesiva, é por este absorvido.",
  explica:"Aplicação do princípio da consunção, mesmo sendo a pena do falso maior que a do estelionato.", lei:[], fonte:STJS }
],
cards:[
{ id:"ap1", tipo:"distincao", sec:"tempo", f:"Abolitio criminis × novatio legis in mellius.", v:"<b>Abolitio</b>: o fato deixa de ser crime — extingue a punibilidade e apaga efeitos penais. <b>In mellius</b>: o fato continua crime, mas a lei nova é mais branda — retroage no que beneficiar.", lei:["cp2"] },
{ id:"ap2", tipo:"ce", sec:"tempo", f:"Certo ou errado: a abolitio criminis apaga também a obrigação de indenizar a vítima.", v:"<b>Errado.</b> Só cessam os efeitos <b>penais</b>; os civis permanecem.", lei:["cp2"] },
{ id:"ap3", tipo:"caso", sec:"tempo", f:"Réu condenado definitivamente; depois sai lei que reduz a pena do crime. Quem aplica a lei nova?", v:"O <b>juízo da execução</b> (Súmula 611 do STF). A lei benéfica retroage mesmo após o trânsito em julgado.", lei:["cp2"], j:["stf-s611"] },
{ id:"ap4", tipo:"ce", sec:"tempo", f:"Certo ou errado: revogada lei temporária, os fatos praticados durante sua vigência deixam de ser puníveis.", v:"<b>Errado.</b> Leis temporárias e excepcionais são ultra-ativas (art. 3º).", lei:["cp3"] },
{ id:"ap5", tipo:"lacuna", sec:"momento-lugar", f:"Mnemônico LUTA: Lugar = ______; Tempo = ______.", v:"<b>Ubiquidade</b> (art. 6º) · <b>Atividade</b> (art. 4º)", lei:["cp4","cp6"] },
{ id:"ap6", tipo:"caso", sec:"espaco", f:"Crime cometido a bordo de navio mercante brasileiro em alto-mar. Qual lei se aplica?", v:"A <b>brasileira</b>: o navio privado brasileiro em alto-mar é extensão do território nacional (art. 5º, §1º).", lei:["cp5"] },
{ id:"ap7", tipo:"caso", sec:"espaco", f:"Crime a bordo de avião privado estrangeiro pousado no aeroporto de Salvador.", v:"Aplica-se a lei <b>brasileira</b> (art. 5º, §2º).", lei:["cp5"] },
{ id:"ap8", tipo:"distincao", sec:"espaco", f:"Extraterritorialidade incondicionada: quais crimes?", v:"Contra a <b>vida ou liberdade do Presidente</b>; contra <b>patrimônio ou fé pública</b> dos entes e entidades públicas; contra a <b>administração pública</b> por quem está a seu serviço; <b>genocídio</b> por brasileiro ou domiciliado no Brasil.", lei:["cp7"] },
{ id:"ap9", tipo:"ce", sec:"espaco", f:"Certo ou errado: no crime contra a vida do Presidente cometido no exterior, se o agente foi absolvido lá, não pode ser processado no Brasil.", v:"<b>Errado.</b> Extraterritorialidade incondicionada: punido segundo a lei brasileira ainda que absolvido ou condenado no estrangeiro (art. 7º, §1º).", lei:["cp7"] },
{ id:"ap10", tipo:"lacuna", sec:"espaco", f:"Estrangeiro contra brasileiro no exterior (art. 7º, §3º): além das condições do §2º, exige-se que não tenha sido pedida ou tenha sido ______ a extradição e que haja ______ do Ministro da Justiça.", v:"<b>negada</b> · <b>requisição</b>", lei:["cp7"] },
{ id:"ap11", tipo:"distincao", sec:"espaco", f:"Pena cumprida no estrangeiro: atenua ou computa?", v:"<b>Atenua</b> quando as penas são diversas; é <b>computada</b> quando idênticas (art. 8º).", lei:["cp8"] },
{ id:"ap12", tipo:"ce", sec:"momento-lugar", f:"Certo ou errado: nos prazos penais (art. 10), exclui-se o dia do começo.", v:"<b>Errado.</b> No Direito Penal, o dia do começo <b>inclui-se</b>. A exclusão é regra do prazo processual.", lei:["cp10"] },
{ id:"ap13", tipo:"numero", sec:"pessoas", f:"Deputado federal preso em flagrante de crime inafiançável: prazo para enviar os autos à Casa e quórum para decidir.", v:"<b>24 horas</b>; decisão pelo voto da <b>maioria de seus membros</b> (absoluta).", lei:["cf53"] },
{ id:"ap14", tipo:"juris", sec:"pessoas", f:"Vereador tem imunidade formal (prisão e processo)?", v:"<b>Não.</b> Só imunidade material, na circunscrição do Município e com pertinência ao mandato.", lei:["cf53"], j:["stf-vereador"] },
{ id:"ap15", tipo:"juris", sec:"tempo", f:"Extorsão mediante sequestro começou antes e terminou depois de lei mais grave. Qual se aplica?", v:"A <b>mais grave</b>, porque vigente antes de cessar a permanência (Súmula 711 do STF).", lei:["cp2"], j:["stf-s711"] },
{ id:"ap16", tipo:"numero", sec:"infracao", f:"Limite máximo de cumprimento: pena de crime × prisão simples de contravenção.", v:"Crime: <b>40 anos</b> (CP, art. 75). Contravenção: <b>5 anos</b> (LCP, art. 10).", lei:["lcp10"] },
{ id:"ap17", tipo:"ce", sec:"infracao", f:"Certo ou errado: a tentativa de contravenção é punida com a pena reduzida de 1/3 a 2/3.", v:"<b>Errado.</b> A tentativa de contravenção <b>não é punível</b> (LCP, art. 4º).", lei:["lcp4"] },
{ id:"ap18", tipo:"caso", sec:"infracao", f:"Brasileiro pratica vias de fato contra outro brasileiro em Buenos Aires e volta ao Brasil. Aplica-se a lei brasileira?", v:"<b>Não.</b> Vias de fato é contravenção, e a lei brasileira só se aplica à contravenção praticada no território nacional (LCP, art. 2º). Não há extraterritorialidade.", lei:["lcp2"] },
{ id:"ap19", tipo:"juris", sec:"infracao", f:"Contravenção praticada contra bem de uma autarquia federal. Qual Justiça julga?", v:"A <b>Justiça Estadual</b> (Súmula 38 do STJ; CF, art. 109, IV, exclui as contravenções).", lei:["licp1"], j:["stj-s38"] },
{ id:"ap20", tipo:"lacuna", sec:"infracao", f:"LICP, art. 1º: crime é a infração a que a lei comina ______ ou ______; contravenção, a que comina isoladamente ______ ou multa.", v:"<b>reclusão</b> · <b>detenção</b> · <b>prisão simples</b>", lei:["licp1"] },
{ id:"ap21", tipo:"distincao", sec:"infracao", f:"Sujeito passivo formal × sujeito passivo material.", v:"<b>Formal</b> (mediato, constante): o <b>Estado</b>, presente em todo crime. <b>Material</b> (imediato, eventual): o <b>titular do bem jurídico</b> lesado — a vítima. O Estado pode ser os dois (peculato).", lei:[] },
{ id:"ap22", tipo:"caso", sec:"infracao", f:"Empresa despeja resíduos em um rio. A investigação não consegue identificar qual diretor decidiu. O MP pode denunciar só a pessoa jurídica?", v:"<b>Sim.</b> O STF (RE 548.181) afastou a dupla imputação: a responsabilidade penal da PJ por crime ambiental não depende da denúncia simultânea da pessoa física.", lei:["l9605-3"], j:["stf-re548181"] },
{ id:"ap23", tipo:"ce", sec:"infracao", f:"Certo ou errado: no vilipêndio a cadáver, o morto é o sujeito passivo do crime.", v:"<b>Errado.</b> O cadáver é <b>objeto material</b>. O sujeito passivo é a coletividade e a família do morto (crime vago).", lei:[] },
{ id:"ap24", tipo:"distincao", sec:"infracao", f:"Crime próprio × crime de mão própria.", v:"<b>Próprio</b>: exige qualidade especial do agente (peculato), mas admite <b>coautoria</b> e participação. <b>Mão própria</b>: exige atuação pessoal (falso testemunho); em regra só admite <b>participação</b>.", lei:[] },
{ id:"ap25", tipo:"caso", sec:"conflito", f:"Mãe, sob a influência do estado puerperal, mata o filho logo após o parto. Homicídio ou infanticídio?", v:"<b>Infanticídio</b> (art. 123), pelo princípio da <b>especialidade</b>. Não importa que a pena seja menor que a do homicídio.", lei:[] },
{ id:"ap26", tipo:"juris", sec:"conflito", f:"Agente falsifica um cheque e o entrega para comprar uma TV; o cheque fica com a loja e não pode mais ser usado. Quantos crimes?", v:"Só <b>estelionato</b>. O falso se esgotou na fraude e foi absorvido (Súmula 17 do STJ, consunção).", lei:[], j:["stj-s17"] },
{ id:"ap27", tipo:"distincao", sec:"conflito", f:"Especialidade × subsidiariedade.", v:"<b>Especialidade</b>: comparação em abstrato; a norma especial prevalece, tenha pena maior ou menor. <b>Subsidiariedade</b>: análise no caso concreto; a norma principal (mais grave) afasta a subsidiária (\"soldado de reserva\").", lei:[] },
{ id:"ap28", tipo:"caso", sec:"conflito", f:"Traficante importa, guarda e depois vende a mesma porção de cocaína, no mesmo contexto. Quantos crimes de tráfico?", v:"<b>Um só.</b> O art. 33 da Lei 11.343/06 é tipo misto alternativo (princípio da <b>alternatividade</b>).", lei:[] },
{ id:"ap29", tipo:"ce", sec:"conflito", f:"Certo ou errado: o conflito aparente de normas pressupõe pluralidade de fatos.", v:"<b>Errado.</b> Pressupõe <b>unidade de fato</b> e pluralidade de normas. Pluralidade de fatos leva ao concurso de crimes.", lei:[] },
{ id:"ap30", tipo:"caso", sec:"conflito", f:"Ladrão furta um celular e, irritado por estar bloqueado, o destrói. Responde também por dano?", v:"<b>Não.</b> A destruição é <b>pós-fato impunível</b>, absorvido pelo furto (consunção): o patrimônio da vítima já tinha sido atingido.", lei:[] },
{ id:"ap31", tipo:"lacuna", sec:"espaco", f:"CP, art. 9º: a sentença estrangeira pode ser homologada no Brasil para obrigar o condenado à ______ do dano e para sujeitá-lo a ______.", v:"<b>reparação</b> · <b>medida de segurança</b> (a homologação é feita pelo STJ)", lei:["cp9"] },
{ id:"ap32", tipo:"ce", sec:"momento-lugar", f:"Certo ou errado: calculada a pena em 1 ano, 2 meses e 10 dias e meio, a fração de dia é arredondada para cima.", v:"<b>Errado.</b> As frações de dia são <b>desprezadas</b> (art. 11): 1 ano, 2 meses e 10 dias.", lei:["cp11"] },
{ id:"ap33", tipo:"caso", sec:"momento-lugar", f:"Uma lei penal especial não diz nada sobre legítima defesa. As regras do CP se aplicam aos crimes dessa lei?", v:"<b>Sim.</b> As regras gerais do CP valem para a legislação especial, se esta não dispuser de modo diverso (art. 12). Exemplo de disposição diversa: a LCP não pune a tentativa.", lei:["cp12"] }
],
questoes:[]
};

/* ============================ FATO TÍPICO ============================ */
T.penal_fato_tipico = {
meta:{ tema:"Fato Típico", atualizado:"15/10/2026", foco:"Conceito de crime, conduta, resultado, nexo causal, tipicidade, iter criminis, tentativa, desistência, arrependimentos e crime impossível." },
secoes:[
{ id:"conceito", titulo:"Conceito de crime; crime e contravenção", curto:"Conceito",
  rapido:["Crime pode ser visto sob três aspectos: <b>material</b> (lesão ou perigo relevante a bem jurídico), <b>legal ou formal</b> (infração punida com reclusão ou detenção) e <b>analítico</b> (decomposto em elementos).",
    "No conceito analítico prevalece a teoria <b>tripartida</b>: crime é fato <b>típico</b>, <b>ilícito</b> e <b>culpável</b>. Para a bipartida, a culpabilidade é só pressuposto da pena.",
    "Sistema <b>dicotômico</b>: infração penal é gênero; crime (ou delito) e contravenção são espécies. Crime: reclusão ou detenção; contravenção: prisão simples e/ou multa (LICP, art. 1º)."],
  teoria:[
   { h:"Os três aspectos do conceito", p:[
    "No aspecto <b>material</b>, crime é a conduta humana que lesa ou expõe a perigo um bem jurídico relevante de outra pessoa. Esse olhar pergunta pelo conteúdo: uma lei que punisse \"chorar em público\" criaria um crime apenas no papel, porque nenhum bem jurídico é atingido.",
    "No aspecto <b>legal</b> (formal), o que define o crime é a pena prevista. O art. 1º da Lei de Introdução ao Código Penal chama de crime a infração punida com reclusão ou detenção (isoladas, alternativas ou cumulativas com multa) e de contravenção a infração punida só com prisão simples ou multa, isoladas ou cumulativas. No Brasil, \"delito\" é sinônimo de crime.",
    "No aspecto <b>analítico</b>, o crime é dividido em partes para ser estudado. A teoria quadripartida (fato típico, ilícito, culpável e punível) praticamente desapareceu. Hoje disputam a <b>tripartida</b> (típico, ilícito e culpável), que é a majoritária e a mais segura em prova, e a <b>bipartida</b> (típico e ilícito, com a culpabilidade como pressuposto da pena). Os três aspectos convivem: uma conduta pode ser materialmente danosa sem ser crime por falta de lei, e uma lei pode prever um crime formal que não ofende bem jurídico algum."]},
   { h:"Crime × contravenção na prática", p:[
    "Além da pena, as duas espécies têm regras diferentes que caem em prova: a tentativa de contravenção <b>não é punível</b> (LCP, art. 4º); a lei brasileira só se aplica à contravenção praticada <b>no território nacional</b> (LCP, art. 2º); e a contravenção é apurada, em regra, pelo procedimento dos Juizados Especiais por ser infração de menor potencial ofensivo. Por serem infrações menores, a doutrina às vezes as chama de \"crimes anões\"."]}],
  quadro:{ titulo:"Crime × contravenção penal", head:["","Crime","Contravenção"], rows:[["Pena privativa de liberdade","Reclusão ou detenção","Prisão simples"],["Tentativa","Punível (art. 14, II)","Não punível (LCP, art. 4º)"],["Lei aplicável a fato no exterior","Pode haver extraterritorialidade (art. 7º)","Só se aplica a fato no Brasil (LCP, art. 2º)"]]},
  pegadinhas:["A culpabilidade integra o crime para a tripartida; para a bipartida, é pressuposto de aplicação da pena.","Contravenção nunca é punida na forma tentada, ainda que a tentativa ocorra."]},

{ id:"conduta", titulo:"Conduta: teorias, ação e omissão", curto:"Conduta",
  rapido:["Fato típico = <b>conduta</b> + <b>resultado naturalístico</b> + <b>nexo causal</b> + <b>tipicidade</b> (<b>resultado</b> e <b>nexo</b> só são exigidos por inteiro nos crimes materiais consumados).",
    "O CP segue a teoria <b>finalista</b> (Welzel): conduta é a ação ou omissão voluntária dirigida a um fim. Por isso <b>dolo e culpa estão no fato típico</b>, não na culpabilidade.",
    "Omissão <b>própria</b>: o tipo descreve um não fazer (omissão de socorro). Omissão <b>imprópria</b>: o <b>garantidor</b> que devia e podia agir responde pelo resultado (art. 13, §2º)."],
  teoria:[
   { h:"Teorias da conduta", p:[
    "Para a teoria <b>causal-naturalista</b> (clássica), conduta é o movimento corporal voluntário que causa o resultado, sem olhar para o conteúdo da vontade; dolo e culpa ficavam na culpabilidade. O motorista prudente que atropela quem atravessa fora da faixa já teria \"conduta\" penalmente relevante.",
    "Para a teoria <b>finalista</b>, adotada pelo CP, a conduta é sempre dirigida a uma finalidade. Quando a vontade se dirige ao resultado criminoso, o crime é doloso; quando se dirige a outro fim, mas o resultado vem da falta de cuidado, o crime é culposo. Um sinal claro dessa escolha está no art. 20: o erro sobre elemento do tipo exclui o dolo — o que só faz sentido se o dolo estiver no tipo.",
    "A teoria <b>social</b> exige, além da vontade, relevância social da conduta. É criticada por imprecisa e por misturar elementos da ilicitude."]},
   { h:"Ação, omissão e conduta mista", p:[
    "Na conduta <b>comissiva</b> o agente faz algo: golpeia, subtrai, falsifica. É a forma da imensa maioria dos tipos.",
    "Na conduta <b>omissiva</b> o agente deixa de fazer o que a norma esperava. A omissão importa ao Direito pela ação esperada que não ocorreu (teoria normativa). Há duas espécies. Na omissão <b>própria</b> (pura), o próprio tipo descreve o não fazer, e o crime se consuma com a simples abstenção, sem depender de resultado — é o caso da omissão de socorro (art. 135) e da prevaricação na forma \"deixar de praticar\" (art. 319). Na omissão <b>imprópria</b> (impura ou comissivo por omissão), o tipo descreve uma ação (matar, estuprar), mas é atribuído a quem, tendo o dever específico de evitar o resultado, se omitiu: a mãe que deixa de alimentar o bebê para que ele morra responde por homicídio; a mãe que sabe que o companheiro abusa da filha e nada faz responde pelo estupro de vulnerável.",
    "O art. 13, §2º, diz quem é garantidor: quem tem por <b>lei</b> obrigação de cuidado, proteção ou vigilância (pais, tutores); quem, de outra forma, <b>assumiu a responsabilidade</b> de impedir o resultado (a vizinha que se oferece para cuidar da criança); e quem, com seu <b>comportamento anterior</b>, criou o risco do resultado. Em todos os casos é preciso que o garantidor <b>pudesse</b> agir.",
    "Há ainda a conduta <b>mista</b>, em que o tipo exige uma ação e uma omissão — por exemplo, na apropriação de coisa achada (art. 169, parágrafo único, II), o agente se apropria da coisa e deixa de devolvê-la ou entregá-la à autoridade em quinze dias."]},
   { h:"Quando não há conduta", p:[
    "Sem vontade, não há conduta e, portanto, não há fato típico. É o que acontece na <b>coação física irresistível</b> (alguém segura o braço de outro e o obriga a esfaquear — quem foi coagido não agiu; responde o coator), nos <b>atos reflexos</b> (o susto que faz alguém abrir os braços e atingir outra pessoa), no <b>sonambulismo</b> e na <b>hipnose</b>, e nas situações de <b>força da natureza</b> (alguém arremessado pelo vento).",
    "No <b>caso fortuito</b> também não há fato típico, porque o resultado não decorre de dolo nem de culpa: o motorista que sofre um infarto ao volante e atropela alguém não violou dever de cuidado.",
    "Não confunda: a coação <b>moral</b> irresistível não exclui a conduta — o coagido age com vontade, embora viciada — e sim a <b>culpabilidade</b>, por inexigibilidade de conduta diversa (art. 22)."]}],
  quadro:{ titulo:"Omissão própria × imprópria", head:["","Própria (pura)","Imprópria (comissivo por omissão)"], rows:[["O tipo descreve","Um não fazer","Uma ação"],["Quem pode praticar","Qualquer pessoa que se omite","Só o garantidor (art. 13, §2º)"],["Resultado","Irrelevante para a consumação","É imputado ao omitente"],["Tentativa","Não admite","Admite"],["Exemplo","Omissão de socorro (art. 135)","Mãe que deixa o filho morrer de fome"]]},
  pegadinhas:["Coação física irresistível exclui a conduta (fato típico); coação moral irresistível exclui a culpabilidade.","O garantidor só responde se podia agir: quem não sabe nadar não é obrigado a se lançar ao mar.","Crime omissivo próprio não admite tentativa; o impróprio admite."]},

{ id:"resultado", titulo:"Resultado naturalístico e jurídico", curto:"Resultado",
  rapido:["Resultado <b>naturalístico</b> é a modificação no mundo exterior causada pela conduta (a morte, a perda do bem).",
    "Resultado <b>jurídico</b> (normativo) é a lesão ou o perigo ao bem jurídico protegido — <b>existe em todo crime</b>.",
    "Crimes <b>materiais</b> exigem o resultado naturalístico para consumar; <b>formais</b> o preveem, mas consumam sem ele; de <b>mera conduta</b> nem o descrevem."],
  teoria:[
   { h:"Material, formal e de mera conduta", p:[
    "No crime <b>material</b> o tipo descreve um resultado e exige que ele aconteça: o homicídio só se consuma com a morte; sem ela, há tentativa.",
    "No crime <b>formal</b> (de consumação antecipada ou de resultado cortado) o tipo menciona um resultado, mas a consumação ocorre antes dele. Na extorsão (art. 158), basta constranger a vítima com violência ou grave ameaça para obter vantagem; receber a vantagem é só exaurimento. Na concussão (art. 316), basta exigir a vantagem indevida.",
    "No crime de <b>mera conduta</b> o tipo descreve apenas o comportamento, sem resultado naturalístico: a violação de domicílio (art. 150) se consuma com a simples entrada ou permanência indevida.",
    "Mesmo quando não há resultado naturalístico, sempre há resultado <b>jurídico</b>. Na concussão, ainda que o servidor não receba nada, a moralidade e a probidade administrativas já foram ofendidas. Por isso se diz que não existe crime sem resultado jurídico."]}],
  pegadinhas:["Todo crime tem resultado jurídico; nem todo tem resultado naturalístico.","No crime formal, o recebimento da vantagem é exaurimento e pode pesar na pena, mas não muda o momento da consumação."]},

{ id:"nexo", titulo:"Nexo de causalidade e imputação objetiva", curto:"Nexo causal",
  rapido:["Regra do CP: teoria da <b>equivalência dos antecedentes</b> (<i>conditio sine qua non</i>) — causa é toda ação ou omissão sem a qual o resultado não teria ocorrido (art. 13). O excesso é filtrado pela exigência de <b>dolo ou culpa</b>.",
    "Exceção: a <b>causa superveniente relativamente independente que, por si só, produz o resultado</b> exclui a imputação (art. 13, §1º — causalidade adequada); o agente responde pelos atos já praticados.",
    "Causas <b>absolutamente</b> independentes sempre rompem o nexo; relativamente independentes <b>preexistentes e concomitantes</b> não rompem."],
  teoria:[
   { h:"Equivalência dos antecedentes", p:[
    "Para saber se uma conduta é causa, usa-se o <b>processo hipotético de eliminação</b> (de Thyrén): retira-se mentalmente a conduta da cadeia de fatos; se o resultado desaparecer, ela é causa. Quem compra uma arma e mata o desafeto: tomar café de manhã não é causa; comprar a arma e atirar são.",
    "O defeito da teoria é o regresso ao infinito — até o vendedor da arma ou os pais do agente seriam \"causa\". A correção vem do elemento subjetivo: só responde quem deu causa com <b>dolo ou culpa</b>. O comerciante que vendeu a arma legalmente contribuiu fisicamente, mas não responde."]},
   { h:"Concausas", p:[
    "Concausas são fatores que atuam junto com a conduta. As <b>absolutamente independentes</b> não têm relação com o que o agente fez e podem ser preexistentes (a vítima baleada morre, na verdade, de veneno ingerido antes), concomitantes (o teto desaba sobre a vítima durante os disparos) ou supervenientes (a vítima envenenada morre atingida por um raio antes de o veneno agir). Em todas, eliminada a conduta, o resultado ocorreria do mesmo jeito: o agente <b>não responde pelo resultado</b>, mas pela <b>tentativa</b>.",
    "As <b>relativamente independentes</b> só produzem o resultado porque se somaram à conduta. Se são <b>preexistentes</b> (a vítima hemofílica golpeada morre por sangramento) ou <b>concomitantes</b> (duas pessoas, sem combinação, põem doses insuficientes de veneno na mesma bebida e a soma mata), o agente responde pelo resultado, desde que tenha dolo ou culpa quanto a ele.",
    "As <b>supervenientes relativamente independentes</b> pedem atenção. Se a nova causa <b>produziu o resultado por si só</b>, fugindo do desdobramento normal da conduta, o nexo se rompe: a vítima baleada morre porque a ambulância bate numa carreta, ou porque o hospital pega fogo — o atirador responde só por tentativa. Se a nova causa <b>se soma</b> ao desdobramento natural do ferimento — infecção hospitalar, complicação cirúrgica —, o agente responde pelo resultado consumado. Aqui o CP adotou a teoria da <b>causalidade adequada</b>."]},
   { h:"Imputação objetiva e causalidade na omissão", p:[
    "A teoria da <b>imputação objetiva</b>, desenvolvida por Roxin, acrescenta filtros normativos à causalidade física. Para imputar o resultado, a conduta precisa: <b>criar ou aumentar um risco</b> (quem empurra o amigo para salvá-lo de um vaso que cai, ferindo-lhe o braço, diminuiu o risco); o risco precisa ser <b>proibido</b> pelo Direito (presentear os pais com uma viagem de avião na esperança de que o avião caia cria risco permitido); e o resultado precisa estar no <b>alcance do risco criado</b> (quem incendeia a casa responde pelo incêndio, mas não pela morte da moradora que, por decisão própria, entrou nas chamas para salvar uma fotografia — autocolocação em perigo).",
    "Nos crimes <b>omissivos próprios</b> não há nexo causal físico: pune-se o descumprimento do mandamento. Nos <b>omissivos impróprios</b>, a omissão não causa nada fisicamente; o resultado é atribuído por equiparação legal (nexo <b>normativo</b>). Exige-se um juízo hipotético — o chamado nexo de <b>evitação</b>: é preciso demonstrar que a ação devida provavelmente teria evitado o resultado."]}],
  quadro:{ titulo:"Concausas", head:["Tipo","Rompe o nexo?","Agente responde por"], rows:[
    ["Absolutamente independente (qualquer momento)","Sim","Tentativa (atos praticados)"],["Relativamente independente preexistente (ex.: hemofilia)","Não","Resultado"],
    ["Relativamente independente concomitante","Não","Resultado"],["Relativamente independente superveniente que por si só produziu o resultado (ex.: incêndio no hospital)","Sim (art. 13, §1º)","Atos praticados"],
    ["Superveniente que não produz o resultado por si só (ex.: infecção hospitalar)","Não","Resultado"]]},
  pegadinhas:["Hemofilia da vítima não rompe o nexo — o agente responde pelo resultado se houver dolo ou culpa quanto a ele.","Acidente com a ambulância rompe o nexo; infecção hospitalar não.","Regra do CP é a equivalência dos antecedentes; a causalidade adequada aparece só no §1º do art. 13."]},

{ id:"tipicidade", titulo:"Tipicidade e tipo penal", curto:"Tipicidade",
  rapido:["Tipicidade <b>formal</b>: encaixe da conduta no tipo — <b>imediata</b> (direta) ou <b>mediata</b> (por norma de extensão, como a tentativa, art. 14, II, e a participação, art. 29).",
    "Tipicidade <b>material</b>: ofensa relevante ao bem jurídico. Falta na insignificância e na adequação social.",
    "O tipo tem função <b>indiciária</b> da ilicitude (<i>ratio cognoscendi</i>): o fato típico se presume ilícito até prova de uma excludente."],
  teoria:[
   { h:"Formal, material e conglobante", p:[
    "A tipicidade <b>formal</b> é a subsunção: a conduta real corresponde ao modelo descrito na lei. Quando o agente mata a vítima, a adequação ao art. 121 é <b>imediata</b>. Quando atira e erra, ou quando apenas empresta a arma, o \"matar alguém\" não ocorreu por inteiro, e a adequação depende de uma norma de extensão — o art. 14, II (tentativa) ou o art. 29 (participação). É a adequação <b>mediata</b>.",
    "A tipicidade <b>material</b> exige que a conduta atinja de forma significativa o bem jurídico. Subtrair uma folha de papel em branco da escola é formalmente furto, mas não tem relevância material — aplica-se o princípio da insignificância. A adequação social (condutas toleradas pela sociedade) também afasta a tipicidade material.",
    "A teoria da tipicidade <b>conglobante</b>, de Zaffaroni, diz que não é típico o que o próprio ordenamento manda ou fomenta. O oficial de justiça que arromba a porta para cumprir uma ordem judicial não praticaria fato típico. Pela doutrina tradicional, que deve ser usada na prova salvo comando expresso, o fato é típico, mas lícito (estrito cumprimento do dever legal)."]},
   { h:"Tipo penal: espécies, elementos e funções", p:[
    "Tipo penal é o modelo abstrato de comportamento previsto em lei. Há tipos <b>incriminadores</b> (descrevem o proibido, com preceito primário e pena — o secundário) e <b>permissivos</b> (descrevem o permitido, como a legítima defesa do art. 25). Quando a prova fala só em \"tipo penal\", normalmente se refere ao incriminador.",
    "Os elementos do tipo podem ser <b>objetivos ou descritivos</b> (compreensíveis pela simples constatação: \"matar\", \"alguém\"), <b>normativos</b> (exigem juízo de valor, jurídico ou social: \"documento\", \"funcionário público\", \"indevidamente\", \"sem justa causa\") e <b>subjetivos</b> (dolo, culpa e o especial fim de agir: \"com o fim de\", \"para si ou para outrem\").",
    "O tipo cumpre funções de <b>garantia</b> (o que não está descrito é permitido), <b>fundamentadora e limitadora</b> do poder de punir, <b>seletiva</b> (escolhe os bens protegidos), de <b>diferenciação do erro</b> (o dolo precisa abranger todos os elementos; o desconhecimento de um deles é erro de tipo) e <b>indiciária</b> da ilicitude."]},
   { h:"Classificações dos tipos", p:[
    "<b>Congruentes</b> (o que o agente quer coincide com o que o tipo exige, como no homicídio consumado) × <b>incongruentes</b> (o tipo exige uma intenção que vai além do resultado necessário — na extorsão mediante sequestro, o agente quer o resgate, mas o crime se consuma sem ele).",
    "<b>Fechados</b> (descrição completa) × <b>abertos</b> (precisam de complemento valorativo, como os tipos culposos, que não descrevem em que consiste a imprudência).",
    "<b>Simples</b> (um só verbo) × <b>mistos</b>. Nos mistos <b>alternativos</b>, praticar mais de um verbo no mesmo contexto gera um só crime (o tráfico do art. 33 da Lei de Drogas: importar, transportar, guardar e vender a mesma droga = um tráfico). Nos mistos <b>cumulativos</b>, cada conduta é um crime (art. 198 do CP).",
    "<b>Fundamentais</b> (forma básica, em geral no caput) × <b>derivados</b> (qualificados, privilegiados ou equiparados)."]}],
  pegadinhas:["Insignificância exclui a tipicidade material, não a ilicitude.","Em prova, use a doutrina clássica: estrito cumprimento do dever legal exclui a ilicitude, não a tipicidade (salvo se a questão cobrar a conglobante).","Tipo misto alternativo: vários verbos no mesmo contexto, crime único."]},

{ id:"classificacao", titulo:"Classificação dos crimes", curto:"Classificação",
  rapido:["Material (exige resultado), formal (resultado dispensável) e de mera conduta (sem resultado).","Instantâneo, permanente (consumação se prolonga — flagrante a qualquer tempo) e instantâneo de efeitos permanentes.",
    "Comum, próprio (exige qualidade do agente; admite coautoria e participação) e de mão própria (só o agente pessoalmente — ex.: falso testemunho)."],
  teoria:[
   { h:"As classificações mais cobradas", p:[
    "<b>Comum × próprio × de mão própria.</b> O crime comum pode ser praticado por qualquer pessoa (furto). O próprio exige uma qualidade especial do autor (peculato exige funcionário público; infanticídio exige a mãe em estado puerperal), mas o estranho que conhece essa qualidade responde junto, porque a elementar se comunica (art. 30). O de mão própria só pode ser executado pessoalmente (falso testemunho): não admite coautoria, mas admite participação — o advogado que induz a testemunha a mentir.",
    "<b>Dano × perigo.</b> No crime de dano o bem é efetivamente lesado (furto). No de perigo, basta expô-lo a risco: de perigo <b>concreto</b>, quando o risco precisa ser provado (incêndio, art. 250, que exige perigo à vida, à integridade ou ao patrimônio de outrem); de perigo <b>abstrato</b>, quando a lei presume o risco (embriaguez ao volante, art. 306 do CTB).",
    "<b>Instantâneo × permanente × instantâneo de efeitos permanentes.</b> No instantâneo a consumação ocorre num momento certo (homicídio). No permanente a consumação se prolonga enquanto durar a conduta (sequestro e cárcere privado, art. 148) — o que permite flagrante enquanto dura e conta a prescrição só do fim da permanência. No instantâneo de efeitos permanentes, a consumação é instantânea e só as consequências duram.",
    "<b>Simples × complexo.</b> O complexo funde dois tipos: o roubo (subtração + violência ou ameaça) e a extorsão mediante sequestro (extorsão + sequestro).",
    "<b>Unissubsistente × plurissubsistente.</b> O unissubsistente se realiza num só ato e não admite tentativa (injúria verbal presencial); o plurissubsistente permite fracionar a execução.",
    "<b>Plurissubjetivo × monossubjetivo.</b> O primeiro exige vários agentes (associação criminosa — concurso necessário); o segundo pode ser cometido por um só (concurso eventual)."]},
   { h:"Outras classificações", p:[
    "<b>Habitual</b>: exige reiteração; um ato isolado é irrelevante (curandeirismo, art. 284). <b>De atentado ou empreendimento</b>: o tipo pune igualmente tentar e conseguir (evasão mediante violência, art. 352), por isso não há tentativa. <b>Vago</b>: o sujeito passivo é uma coletividade sem personalidade jurídica (incitação ao crime, tráfico).",
    "<b>Acessório</b> (parasitário): depende de um crime anterior (receptação). <b>Exaurido</b>: além de consumado, produziu todas as consequências (o servidor recebe a vantagem que exigiu). <b>Putativo</b>: o agente pensa cometer crime, mas o fato é atípico — por erro sobre os fatos (transporta farinha achando que é cocaína), por erro sobre a norma (pensa que o incesto entre adultos é crime) ou por obra do agente provocador (flagrante preparado).",
    "<b>De forma livre</b> (qualquer meio, como o homicídio) × <b>de forma vinculada</b> (meio definido no tipo, como o perigo de contágio venéreo por relação sexual). <b>A distância</b> (conduta e resultado em países diferentes) × <b>plurilocal</b> (em cidades diferentes do mesmo país). <b>A prazo</b>: só se sabe se houve a forma qualificada depois de um tempo (lesão grave por incapacidade por mais de 30 dias). <b>De ímpeto</b>: vontade repentina, sem reflexão.",
    "<b>De tendência interna transcendente</b>: o agente busca um resultado que vai além do necessário para consumar. Divide-se em crimes de <b>resultado cortado</b> (o resultado buscado depende de terceiro — o pagamento do resgate) e <b>mutilados de dois atos</b> (depende de nova conduta do próprio agente — para quem exige essa intenção na moeda falsa, colocar a moeda em circulação)."]}],
  pegadinhas:["Crime habitual e crime de atentado não admitem tentativa.","Crime próprio admite coautoria; o de mão própria, só participação.","No crime permanente, o flagrante é possível enquanto durar a permanência."]},

{ id:"itercriminis", titulo:"Iter criminis, consumação e tentativa", curto:"Tentativa",
  rapido:["Etapas: <b>cogitação</b> (idealização, deliberação, resolução) → <b>preparação</b> → <b>execução</b> → <b>consumação</b> (→ exaurimento).",
    "Cogitação nunca é punível. Preparação, só quando a lei a pune expressamente (atos preparatórios de terrorismo, art. 5º da Lei 13.260/2016) ou quando é crime autônomo (petrechos para falsificação de moeda, art. 291).",
    "Tentativa: iniciada a execução, não se consuma por <b>circunstâncias alheias</b> à vontade do agente. Pena do consumado reduzida de <b>1/3 a 2/3</b>, conforme a proximidade da consumação.",
    "Não admitem tentativa (\"CCHOUPE\"): <b>C</b>ontravenções, <b>C</b>ulposos, <b>H</b>abituais, <b>O</b>missivos próprios, <b>U</b>nissubsistentes, <b>P</b>reterdolosos e de <b>E</b>mpreendimento."],
  teoria:[
   { h:"Onde começa a execução", p:[
    "Separar ato preparatório de ato de execução é um dos temas mais disputados. Pela teoria <b>material</b> (da hostilidade ao bem jurídico), a execução começa quando se cria perigo ao bem — esconder-se atrás da moita esperando a vítima já seria execução. Pela <b>objetivo-formal</b>, começa com a realização do verbo do tipo. Pela <b>objetivo-material</b>, inclui os atos imediatamente anteriores ao verbo, na visão de um observador. Pela <b>objetivo-individual</b>, consideram-se também os atos imediatamente anteriores segundo o plano do autor — quem invade a casa para furtar já iniciou a execução, mesmo sem tocar nos bens.",
    "Não há consenso. Boa parte da doutrina aponta a objetivo-formal como base do CP, complementada pela análise do plano do autor, e cresce a adoção da objetivo-individual. O STJ já reconheceu tentativa de furto qualificado em quem começou a romper o obstáculo sem conseguir subtrair (veja a aba Jurisprudência)."]},
   { h:"Consumação, exaurimento e tentativa", p:[
    "O crime está <b>consumado</b> quando reúne todos os elementos de sua definição legal (art. 14, I). O <b>exaurimento</b> é o que acontece depois e não muda a tipificação: a condenação de alguém em razão do falso testemunho já consumado.",
    "Na <b>tentativa</b> (art. 14, II), o agente inicia a execução e é impedido por fator externo. A punição usa a pena do consumado reduzida de um a dois terços (teoria <b>objetiva</b> ou realista da punibilidade: pune-se menos porque o resultado não ocorreu). O juiz escolhe a fração pelo caminho percorrido: quem deixa a vítima paraplégica quase chegou ao fim (redução mínima); quem só sacou a arma antes da chegada da polícia ficou longe (redução máxima). A adequação típica é mediata.",
    "Espécies: tentativa <b>branca</b> ou incruenta (o objeto nem é atingido) × <b>vermelha</b> ou cruenta (é atingido sem o resultado visado); <b>perfeita</b> ou acabada, também chamada de crime falho (o agente esgota os meios e mesmo assim não consuma) × <b>imperfeita</b> ou inacabada (é interrompido antes de esgotar os meios). Podem se combinar entre os pares (cruenta e imperfeita), nunca dentro do mesmo par."]},
   { h:"Crime impossível", p:[
    "O art. 17 não pune a tentativa quando, por <b>ineficácia absoluta do meio</b> ou <b>absoluta impropriedade do objeto</b>, era impossível consumar o crime: esfaquear quem já estava morto; tentar matar com arma de brinquedo. O bem jurídico nunca correu risco, por isso o CP adotou a teoria <b>objetiva</b> da punibilidade do crime impossível.",
    "A ineficácia ou impropriedade precisa ser <b>absoluta</b>. Se a vítima escapou porque usava colete à prova de balas, ou se a loja tinha câmeras e seguranças, o crime podia se consumar: há tentativa (Súmula 567 do STJ). Já o flagrante <b>preparado</b>, em que a polícia induz o crime e ao mesmo tempo impede a consumação, é crime impossível (Súmula 145 do STF); o flagrante <b>esperado</b> é válido."]}],
  quadro:{ titulo:"O que não admite tentativa (CCHOUPE)", head:["Infração","Por quê"], rows:[["Contravenção","A lei não pune (LCP, art. 4º)"],["Crime culposo","O resultado não é querido"],["Crime habitual","Ato isolado é irrelevante"],["Omissivo próprio","Ou se omite (consuma) ou age (não há crime)"],["Unissubsistente","Execução não se fraciona"],["Preterdoloso","O resultado agravador é culposo"],["Crime de empreendimento (atentado)","Tentar já é consumar"]]},
  pegadinhas:["Crime impossível exige ineficácia ou impropriedade absoluta; se relativa, há tentativa.","Câmeras e seguranças não tornam o furto impossível (Súmula 567 do STJ).","Cogitação nunca é punida; preparação, só se for crime autônomo ou houver previsão expressa."]},

{ id:"desistencia", titulo:"Desistência voluntária e arrependimentos", curto:"Arrependimentos",
  rapido:["<b>Desistência voluntária</b>: o agente pode prosseguir, mas não quer. <b>Arrependimento eficaz</b>: já terminou a execução e age para impedir o resultado. Nos dois, responde só pelos <b>atos já praticados</b> (art. 15).",
    "Fórmula de Frank: na tentativa, \"quero, mas não posso\"; na desistência, \"posso, mas não quero\".",
    "<b>Arrependimento posterior</b> (art. 16): crime <b>sem violência ou grave ameaça à pessoa</b>, já consumado; reparação do dano ou restituição da coisa, por ato voluntário, <b>até o recebimento da denúncia ou queixa</b> → redução de <b>1/3 a 2/3</b>."],
  teoria:[
   { h:"Desistência voluntária e arrependimento eficaz", p:[
    "Na <b>desistência voluntária</b> o agente interrompe a execução quando ainda podia continuar. Quem dá uma facada no desafeto e, lembrando da antiga amizade, desiste de desferir as demais não responde por tentativa de homicídio — a consumação não deixou de ocorrer por fator externo, mas por vontade dele. Despreza-se a intenção inicial e ele responde pelo que efetivamente causou (lesão corporal leve).",
    "No <b>arrependimento eficaz</b> a execução já acabou: o agente deu as facadas que achava suficientes e foi embora. Depois, arrependido, volta e leva a vítima ao hospital, salvando-a. Responde só pela lesão causada (grave, no exemplo).",
    "Os dois institutos só funcionam se o resultado <b>não</b> ocorrer. Se a vítima morre apesar do socorro, o agente responde pelo homicídio, com a atenuante do art. 65, III, b. A doutrina chama esses institutos de \"ponte de ouro\" e, majoritariamente, os trata como causas de exclusão da tipicidade da tentativa; por isso, praticados por um coautor, aproveitam aos demais.",
    "Voluntário não é o mesmo que espontâneo: a desistência sugerida por outra pessoa vale. A doutrina admite até a desistência para retomar depois (para não levantar suspeitas), enquanto a execução não for retomada."]},
   { h:"Arrependimento posterior", p:[
    "É <b>causa de diminuição de pena</b>, não exclui o crime, que já se consumou. Requisitos: crime sem violência ou grave ameaça <b>à pessoa</b>; reparação do dano ou restituição da coisa; ato voluntário; e antes do <b>recebimento</b> da denúncia ou queixa. Quem quebra a vidraça da padaria (dano) e paga o prejuízo antes de recebida a queixa tem a pena reduzida.",
    "Violência contra <b>coisa</b> não impede o benefício. A doutrina também o admite na violência <b>culposa</b> (lesão corporal culposa com todas as despesas pagas). Na violência <b>imprópria</b> (amarrar a vítima, sem agredi-la) há divergência. A fração varia conforme a <b>presteza</b> da reparação: quanto mais rápida, maior a redução.",
    "Prevalece na doutrina que o arrependimento posterior é circunstância objetiva e se comunica aos coautores; e que a recusa da vítima em receber não impede a redução. Reparação feita <b>depois</b> do recebimento da denúncia vale só como atenuante genérica (art. 65, III, b)."]}],
  quadro:{ titulo:"Desistência, arrependimentos e tentativa", head:["Instituto","Momento","Efeito"], rows:[
    ["Tentativa","Execução interrompida por fator externo","Pena do consumado − 1/3 a 2/3"],["Desistência voluntária","Durante a execução, por vontade própria","Responde só pelos atos praticados"],
    ["Arrependimento eficaz","Execução encerrada; agente impede o resultado","Responde só pelos atos praticados"],["Arrependimento posterior","Após a consumação, até o recebimento da denúncia","Redução de 1/3 a 2/3 (sem violência/grave ameaça à pessoa)"],
    ["Crime impossível","Meio ou objeto absolutamente inidôneos","Fato não punível"]]},
  pegadinhas:["Desistência voluntária não precisa ser espontânea: basta ser voluntária.","Se o resultado ocorre apesar do arrependimento, não há arrependimento eficaz: só atenuante.","Arrependimento posterior: até o RECEBIMENTO (não o oferecimento) da denúncia."]}
],
lei:[
{ art:"CP, art. 13", nome:"Relação de causalidade", sec:"nexo", itens:[
  { id:"cp13", rot:"caput e § 1º", t:"O resultado, de que depende a existência do crime, somente é imputável a quem lhe deu causa. Considera-se causa a <b class='g1'>ação ou omissão sem a qual o resultado não teria ocorrido</b>.<br>§ 1º - A superveniência de <b class='g1'>causa relativamente independente</b> exclui a imputação quando, <b class='g3'>por si só, produziu o resultado</b>; os fatos anteriores, entretanto, imputam-se a quem os praticou.", c:["ft1","ft2","ft3"] },
  { id:"cp13-2", rot:"§ 2º", t:"A omissão é penalmente relevante quando o omitente <b class='g1'>devia e podia agir</b> para evitar o resultado. O dever de agir incumbe a quem: a) tenha por <b class='g1'>lei</b> obrigação de cuidado, proteção ou vigilância; b) de outra forma, <b class='g1'>assumiu a responsabilidade</b> de impedir o resultado; c) com seu <b class='g1'>comportamento anterior, criou o risco</b> da ocorrência do resultado.", c:["ft4","ft5"] }
]},
{ art:"CP, arts. 14 a 17", nome:"Consumação, tentativa e crime impossível", sec:"itercriminis", itens:[
  { id:"cp14", rot:"Art. 14", t:"Diz-se o crime: I - <b class='g1'>consumado</b>, quando nele se reúnem todos os elementos de sua definição legal; II - <b class='g1'>tentado</b>, quando, iniciada a execução, não se consuma por <b class='g3'>circunstâncias alheias à vontade do agente</b>.<br>Parágrafo único - <b class='g3'>Salvo disposição em contrário</b>, pune-se a tentativa com a pena correspondente ao crime consumado, diminuída de <b class='g2'>um a dois terços</b>.", c:["ft6","ft7"] },
  { id:"cp15", rot:"Art. 15", t:"O agente que, <b class='g1'>voluntariamente, desiste</b> de prosseguir na execução ou <b class='g1'>impede que o resultado se produza</b>, só responde pelos <b class='g3'>atos já praticados</b>.", c:["ft8","ft9"] },
  { id:"cp16", rot:"Art. 16", t:"Nos crimes cometidos <b class='g3'>sem violência ou grave ameaça à pessoa</b>, reparado o dano ou restituída a coisa, <b class='g2'>até o recebimento da denúncia ou da queixa</b>, por <b class='g1'>ato voluntário</b> do agente, a pena será reduzida de <b class='g2'>um a dois terços</b>.", c:["ft10"] },
  { id:"cp17", rot:"Art. 17", t:"Não se pune a tentativa quando, por <b class='g1'>ineficácia absoluta do meio</b> ou por <b class='g1'>absoluta impropriedade do objeto</b>, é impossível consumar-se o crime.", j:["stf-s145"], c:["ft11","ft12"] }
]}
],
juris:[
{ id:"stf-s145", trib:"STF", tipo:"Súmula", num:"145", sec:"itercriminis", status:"vigente", data:"", titulo:"Flagrante preparado", texto:"Não há crime, quando a preparação do flagrante pela polícia torna impossível a sua consumação.", explica:"Flagrante esperado (a polícia só aguarda) é válido.", lei:["cp17"], fonte:STFS },
{ id:"stj-inf887-ft", trib:"STJ", tipo:"Informativo 887", num:"AgRg no REsp 2.255.737-MG", sec:"itercriminis", status:"vigente", data:"Julgado em 07/04/2026", titulo:"Início da execução antes do verbo", texto:"Quem inicia o rompimento de obstáculo e não consegue subtrair por circunstâncias alheias responde por tentativa de furto qualificado, e não por mero ato preparatório.", explica:"Aproximação da teoria objetivo-material.", lei:["cp14"], fonte:"https://processo.stj.jus.br/jurisprudencia/externo/informativo/?acao=pesquisarumaedicao&livre=%270887%27.cod." },
{ id:"stj-s567-ft", trib:"STJ", tipo:"Súmula", num:"567", sec:"itercriminis", status:"vigente", data:"", titulo:"Vigilância não gera crime impossível", texto:"Sistema de vigilância realizado por monitoramento eletrônico ou por existência de segurança no interior de estabelecimento comercial, por si só, não torna impossível a configuração do crime de furto.", explica:"", lei:["cp17"], fonte:STJS }
],
cards:[
{ id:"ft1", tipo:"caso", sec:"nexo", f:"A atira em B, que é levado ao hospital e morre no incêndio do prédio. Por qual crime A responde?", v:"<b>Tentativa de homicídio.</b> O incêndio é causa superveniente relativamente independente que, por si só, produziu o resultado (art. 13, §1º).", lei:["cp13"] },
{ id:"ft2", tipo:"caso", sec:"nexo", f:"A golpeia B levemente; B, hemofílico, morre. A sabia da doença. Responde pelo resultado?", v:"<b>Sim.</b> Concausa preexistente relativamente independente não rompe o nexo. Como A sabia, responde por homicídio (doloso ou culposo, conforme o caso).", lei:["cp13"] },
{ id:"ft3", tipo:"ce", sec:"nexo", f:"Certo ou errado: o CP adota, como regra, a teoria da causalidade adequada.", v:"<b>Errado.</b> Regra: equivalência dos antecedentes (<i>conditio sine qua non</i>). A causalidade adequada aparece na exceção do §1º.", lei:["cp13"] },
{ id:"ft4", tipo:"lacuna", sec:"conduta", f:"Art. 13, §2º: a omissão é relevante quando o omitente ______ e ______ agir para evitar o resultado.", v:"<b>devia</b> · <b>podia</b>", lei:["cp13-2"] },
{ id:"ft5", tipo:"caso", sec:"conduta", f:"Babá contratada vê a criança cair na piscina e nada faz; a criança morre. Qual o crime?", v:"<b>Homicídio</b> (comissivo por omissão): ela assumiu a responsabilidade de impedir o resultado (art. 13, §2º, b). Dolo ou culpa conforme o caso.", lei:["cp13-2"] },
{ id:"ft6", tipo:"numero", sec:"itercriminis", f:"Fração de redução da tentativa e critério para escolhê-la.", v:"<b>1/3 a 2/3</b>; quanto mais perto da consumação, menor a redução (iter percorrido).", lei:["cp14"] },
{ id:"ft7", tipo:"ce", sec:"itercriminis", f:"Certo ou errado: crimes culposos admitem tentativa.", v:"<b>Errado.</b> Na tentativa o agente quer o resultado; no culposo não. (Exceção doutrinária: culpa imprópria.)", lei:["cp14"] },
{ id:"ft8", tipo:"distincao", sec:"desistencia", f:"Desistência voluntária × arrependimento eficaz.", v:"<b>Desistência</b>: interrompe a execução antes de terminá-la. <b>Arrependimento eficaz</b>: termina a execução, mas age para impedir o resultado. Ambos: responde só pelos atos praticados.", lei:["cp15"] },
{ id:"ft9", tipo:"caso", sec:"desistencia", f:"Agente envenena a vítima e, arrependido, leva-a ao hospital, onde ela é salva com lesão grave. Qual o crime?", v:"<b>Lesão corporal grave</b> — arrependimento eficaz: responde só pelos atos praticados (art. 15). Se a vítima morresse, responderia pelo homicídio.", lei:["cp15"] },
{ id:"ft10", tipo:"caso", sec:"desistencia", f:"Furtou o celular e devolveu voluntariamente antes do recebimento da denúncia. Efeito?", v:"<b>Arrependimento posterior</b>: redução de 1/3 a 2/3 (art. 16). O crime continua consumado.", lei:["cp16"] },
{ id:"ft11", tipo:"caso", sec:"itercriminis", f:"Atirar com arma sem munição contra a vítima. Crime impossível?", v:"Se a arma estava absolutamente inapta: <b>crime impossível</b> (ineficácia absoluta do meio). Se falhou por acaso (munição \"picotou\"), é <b>tentativa</b>.", lei:["cp17"] },
{ id:"ft12", tipo:"juris", sec:"itercriminis", f:"Flagrante preparado × esperado.", v:"<b>Preparado</b> (a polícia induz o crime e impede a consumação): crime impossível (Súmula 145 do STF). <b>Esperado</b> (a polícia só aguarda): flagrante válido.", lei:["cp17"], j:["stf-s145"] },
{ id:"ft13", tipo:"ce", sec:"classificacao", f:"Certo ou errado: crime de mão própria admite coautoria.", v:"<b>Errado</b>, em regra: só admite participação (ex.: falso testemunho). Crime próprio é que admite coautoria e participação.", lei:[] },
{ id:"ft14", tipo:"distincao", sec:"resultado", f:"Crime material × formal × de mera conduta.", v:"<b>Material</b>: exige resultado naturalístico (homicídio). <b>Formal</b>: o resultado pode ocorrer, mas é dispensável (extorsão). <b>Mera conduta</b>: não há resultado naturalístico (violação de domicílio).", lei:[] },
{ id:"ft15", tipo:"distincao", sec:"conceito", f:"Crime × contravenção penal: diferenças em pena e tentativa.", v:"Crime: <b>reclusão ou detenção</b>; contravenção: <b>prisão simples ou multa</b>. Tentativa de contravenção <b>não é punível</b> (LCP, art. 4º).", lei:[] },
{ id:"ft16", tipo:"distincao", sec:"conduta", f:"Teoria causal × teoria finalista: onde ficam o dolo e a culpa?", v:"<b>Causal</b>: na culpabilidade. <b>Finalista</b> (CP): na conduta, portanto no fato típico. Sinal no CP: o erro de tipo exclui o dolo (art. 20).", lei:[] },
{ id:"ft17", tipo:"caso", sec:"conduta", f:"José segura à força o braço de Maria e a faz esfaquear uma pessoa que dormia. Maria responde?", v:"<b>Não.</b> Coação física irresistível: Maria não teve conduta (sem vontade). Responde José.", lei:[] },
{ id:"ft18", tipo:"caso", sec:"conduta", f:"Vizinha se oferece para cuidar de uma criança de 2 anos e, distraída de propósito, deixa-a cair na piscina. Qual a base da responsabilidade dela?", v:"Ela é <b>garantidora</b> por ter assumido a responsabilidade de impedir o resultado (art. 13, §2º, b) e responde pelo resultado (omissão imprópria).", lei:["cp13-2"] },
{ id:"ft19", tipo:"caso", sec:"nexo", f:"A dá tiros em B; a ambulância que leva B bate numa carreta e B morre do acidente. Por qual crime A responde?", v:"<b>Tentativa de homicídio.</b> O acidente é causa superveniente relativamente independente que por si só produziu o resultado (art. 13, §1º).", lei:["cp13"] },
{ id:"ft20", tipo:"lacuna", sec:"nexo", f:"Imputação objetiva: a conduta deve ______ ou aumentar um risco, o risco deve ser ______ e o resultado deve estar no alcance do risco criado.", v:"<b>criar</b> · <b>proibido</b> (não permitido)", lei:[] },
{ id:"ft21", tipo:"ce", sec:"resultado", f:"Certo ou errado: existe crime sem resultado jurídico.", v:"<b>Errado.</b> Todo crime ofende ou expõe a perigo um bem jurídico. O que pode faltar é o resultado naturalístico.", lei:[] },
{ id:"ft22", tipo:"distincao", sec:"tipicidade", f:"Adequação típica imediata × mediata.", v:"<b>Imediata</b>: a conduta corresponde direto ao tipo (matar e a vítima morre). <b>Mediata</b>: depende de norma de extensão — tentativa (art. 14, II) ou participação (art. 29).", lei:["cp14"] },
{ id:"ft23", tipo:"ce", sec:"tipicidade", f:"Certo ou errado: o princípio da insignificância exclui a ilicitude do fato.", v:"<b>Errado.</b> Exclui a <b>tipicidade material</b>.", lei:[] },
{ id:"ft24", tipo:"caso", sec:"tipicidade", f:"José importa, transporta, guarda e vende a mesma carga de droga. Quantos crimes de tráfico?", v:"<b>Um só.</b> O art. 33 da Lei de Drogas é tipo misto alternativo.", lei:[] },
{ id:"ft25", tipo:"lacuna", sec:"itercriminis", f:"Não admitem tentativa (CCHOUPE): Contravenções, Culposos, ______, Omissivos próprios, ______, Preterdolosos e de Empreendimento.", v:"<b>Habituais</b> · <b>Unissubsistentes</b>", lei:["cp14"] },
{ id:"ft26", tipo:"distincao", sec:"itercriminis", f:"Tentativa perfeita × imperfeita.", v:"<b>Perfeita</b> (acabada, crime falho): o agente esgota os meios e não consuma. <b>Imperfeita</b> (inacabada): é interrompido antes de esgotá-los.", lei:["cp14"] },
{ id:"ft27", tipo:"caso", sec:"itercriminis", f:"A atira para matar B, que sobrevive porque usava colete à prova de balas. Crime impossível?", v:"<b>Não.</b> O meio não era absolutamente ineficaz: há <b>tentativa</b> de homicídio.", lei:["cp17"] },
{ id:"ft28", tipo:"caso", sec:"desistencia", f:"Depois de envenenar a vítima, o agente se arrepende e a socorre, mas ela morre. Há arrependimento eficaz?", v:"<b>Não.</b> O resultado ocorreu: responde pelo homicídio, com a atenuante do art. 65, III, b.", lei:["cp15"] },
{ id:"ft29", tipo:"ce", sec:"desistencia", f:"Certo ou errado: no roubo com amarração da vítima (violência imprópria), o arrependimento posterior é pacificamente admitido.", v:"<b>Errado.</b> Há divergência doutrinária sobre a violência imprópria. Pacífico é que violência contra coisa não impede e que violência ou grave ameaça à pessoa impede.", lei:["cp16"] },
{ id:"ft30", tipo:"distincao", sec:"classificacao", f:"Crime permanente × instantâneo de efeitos permanentes.", v:"<b>Permanente</b>: a consumação se prolonga (sequestro) — flagrante enquanto durar. <b>Instantâneo de efeitos permanentes</b>: consuma num instante; só os efeitos duram (homicídio).", lei:[] }
],
questoes:[]
};

/* ============================ DOLO E CULPA ============================ */
T.penal_dolo_culpa = {
meta:{ tema:"Dolo e Culpa", atualizado:"15/10/2026", foco:"Dolo direto e eventual, culpa consciente e inconsciente, modalidades de culpa, crime preterdoloso e excepcionalidade do crime culposo." },
secoes:[
{ id:"dolo", titulo:"Dolo: teorias e espécies", curto:"Dolo",
  rapido:["Doloso: o agente <b>quis</b> o resultado (dolo direto) ou <b>assumiu o risco</b> de produzi-lo (dolo eventual) — art. 18, I.",
    "Teorias adotadas pelo CP: da <b>vontade</b> (dolo direto) e do <b>assentimento</b> ou consentimento (dolo eventual). A teoria da representação, que bastaria a previsão, não foi adotada.",
    "Elementos do dolo: <b>consciência</b> (saber o que faz) + <b>vontade</b> (querer fazer). No finalismo, o dolo é <b>natural</b>: não inclui a consciência da ilicitude, que foi para a culpabilidade."],
  teoria:[
   { h:"O que é dolo e onde ele fica", p:[
    "Dolo é a vontade consciente de realizar os elementos do tipo. Tem um lado intelectual (o agente sabe o que está fazendo e o que pode resultar) e um lado volitivo (ele quer fazer, ou aceita o resultado). Faltando a consciência — porque o agente se engana sobre um elemento do tipo — não há dolo: é o erro de tipo (art. 20).",
    "Para os causalistas, o dolo era <b>normativo</b>: ficava na culpabilidade e carregava a consciência da ilicitude (\"dolo mau\"). O finalismo, adotado pelo CP, levou o dolo para a conduta e o deixou <b>natural</b>, sem a consciência da ilicitude, que passou a ser elemento autônomo da culpabilidade (potencial consciência). Isso explica por que o erro de proibição não exclui o dolo, só a culpabilidade (art. 21)."]},
   { h:"Teorias do dolo", p:[
    "Pela teoria da <b>vontade</b>, há dolo quando o agente quer o resultado. Pela teoria do <b>assentimento</b>, também há dolo quando ele prevê o resultado e o aceita. Pela teoria da <b>representação</b>, bastaria prever o resultado como possível — o que apagaria a fronteira com a culpa consciente; por isso não foi adotada.",
    "O art. 18, I, combina as duas primeiras: \"quis o resultado\" (vontade, dolo direto) ou \"assumiu o risco de produzi-lo\" (assentimento, dolo eventual)."]},
   { h:"Espécies de dolo", p:[
    "<b>Direto de 1º grau</b>: o resultado é exatamente o que o agente busca. <b>Direto de 2º grau</b> (de consequências necessárias): o agente não deseja o efeito colateral, mas sabe que ele virá com certeza junto com o fim buscado — quem explode o avião para matar um passageiro tem dolo de 2º grau quanto aos demais. A diferença para o dolo eventual é a <b>certeza</b>: no 2º grau o efeito é inevitável; no eventual, apenas possível.",
    "<b>Eventual</b>: o agente prevê o resultado como possível e segue em frente, indiferente a ele (\"se acontecer, aconteceu\"). <b>Alternativo</b>: o agente quer um ou outro resultado, sem preferência (ferir ou matar), e responde pelo mais grave que produziu ou, se nada ocorreu, pela tentativa do mais grave. Dolo <b>indeterminado</b> é o gênero que reúne o alternativo e o eventual.",
    "<b>Genérico</b> × <b>específico</b>: o genérico é a vontade de realizar o verbo; o específico é o especial fim de agir exigido por alguns tipos (\"com o fim de obter vantagem\", \"para si ou para outrem\"). Hoje a doutrina prefere falar em <b>elemento subjetivo especial do tipo</b>.",
    "<b>Geral</b> (<i>dolus generalis</i>, erro sucessivo): o agente acredita ter consumado o crime e, em novo ato com outro objetivo, é que causa o resultado — estrangula a vítima, pensa que ela morreu, joga o \"corpo\" no rio, e ela morre afogada. Responde por homicídio doloso consumado: o desvio no curso causal é irrelevante, porque o resultado querido ocorreu.",
    "<b>De dano</b> (quer lesar o bem) × <b>de perigo</b> (quer só expô-lo a risco). <b>Antecedente</b> (presente no momento da conduta) é o único que importa; o dolo <b>subsequente</b> (surgido depois) não transforma em crime doloso um fato que não o era — quem recebe por engano um valor e só depois decide ficar com ele comete apropriação de coisa havida por erro (art. 169), não estelionato."]},
   { h:"Dolo eventual no trânsito", p:[
    "Homicídio de trânsito com embriaguez ou racha não é automaticamente doloso. STF e STJ exigem que as circunstâncias concretas demonstrem que o motorista aceitou o resultado; a embriaguez, sozinha, não basta para presumir o dolo eventual. A decisão costuma ficar com o júri quando há indícios suficientes. Confira o caso concreto antes de responder em prova discursiva."]}],
  quadro:{ titulo:"Espécies de dolo", head:["Espécie","O que o agente faz em relação ao resultado"], rows:[["Direto de 1º grau","Busca o resultado"],["Direto de 2º grau","Não deseja, mas sabe que é certo (efeito colateral necessário)"],["Eventual","Prevê como possível e aceita"],["Alternativo","Quer um ou outro, indiferentemente"],["Geral","Pensa que já consumou; o resultado vem de ato posterior"]]},
  pegadinhas:["Dolo de 2º grau: certeza do efeito colateral. Dolo eventual: mera possibilidade aceita.","O CP não adotou a teoria da representação.","Dolo subsequente não torna doloso um fato anterior."]},

{ id:"culpa", titulo:"Culpa: elementos, modalidades e espécies", curto:"Culpa",
  rapido:["Culposo: o agente deu causa ao resultado por <b>imprudência, negligência ou imperícia</b> (art. 18, II).",
    "<b>Excepcionalidade</b>: só há crime culposo se a lei previr expressamente (art. 18, parágrafo único). No silêncio da lei, o tipo é só doloso.",
    "Elementos: conduta voluntária + <b>violação do dever objetivo de cuidado</b> + resultado naturalístico <b>involuntário</b> + nexo causal + <b>previsibilidade objetiva</b> + tipicidade.",
    "Não existe <b>compensação</b> de culpas; existe <b>concorrência</b> — cada um responde pela sua."],
  teoria:[
   { h:"Elementos do crime culposo", p:[
    "A conduta culposa é voluntária, mas dirigida a um fim lícito (ou penalmente irrelevante); o problema está no <b>modo</b> de agir, que desrespeita o cuidado exigido de todos. O tipo culposo é <b>aberto</b>: a lei não descreve o comportamento descuidado, cabe ao juiz compará-lo com o de uma pessoa prudente na mesma situação.",
    "Exige-se <b>resultado naturalístico</b>: em regra, o crime culposo é material. Exige-se <b>previsibilidade objetiva</b>, ou seja, que um homem médio pudesse prever o resultado. Se nem o homem médio preveria, não há culpa: o fato é caso fortuito. A previsibilidade <b>subjetiva</b> (a capacidade daquela pessoa de prever) é analisada na culpabilidade.",
    "Por fim, é preciso <b>tipicidade</b>: previsão expressa da forma culposa. O dano culposo, por exemplo, não é crime no CP."]},
   { h:"Modalidades", p:[
    "<b>Imprudência</b> é agir sem cautela — uma culpa \"positiva\", que acontece junto com a ação: dirigir em alta velocidade numa rua com escola. <b>Negligência</b> é deixar de tomar a precaução devida antes de agir — uma culpa \"negativa\": sair com o carro sabendo que os freios estão ruins. <b>Imperícia</b> é a falta de aptidão técnica no exercício de arte, profissão ou ofício: o cirurgião que corta um nervo por despreparo.",
    "Não confunda imperícia com <b>erro profissional</b>: se o profissional age conforme a técnica e mesmo assim erra porque a própria ciência é limitada, não há crime. E a imperícia pressupõe exercício de atividade técnica: quem dirige sem saber dirigir age com imprudência, não imperícia."]},
   { h:"Espécies de culpa", p:[
    "<b>Inconsciente</b> (sem previsão): o agente não prevê o que era previsível. <b>Consciente</b> (com previsão): prevê o resultado, mas acredita sinceramente que ele não acontecerá, confiando em sua habilidade. É a espécie que mais se confunde com o dolo eventual: em ambos há previsão; a diferença está na atitude — aceitar (dolo eventual) ou rejeitar (culpa consciente) o resultado.",
    "<b>Própria</b>: o agente não quer o resultado. <b>Imprópria</b> (por extensão, equiparação ou assimilação): o agente quer o resultado, mas age assim porque, por erro evitável, imaginou estar numa situação que justificaria sua conduta — atira no vulto que pensa ser um ladrão e era o vizinho. A lei manda puni-lo por crime culposo (art. 20, §1º, 2ª parte), embora a conduta seja dolosa na essência; por isso a doutrina admite tentativa nesse caso, exceção à regra de que crime culposo não tem tentativa.",
    "<b>Mediata ou indireta</b>: o agente causa culposamente um resultado e, desse primeiro fato, decorre outro (quem atropela por descuido e a vítima é depois atingida por outro carro)."]},
   { h:"Concorrência, coautoria e participação", p:[
    "Não há <b>compensação</b> de culpas: se motorista e pedestre agiram com descuido, a culpa da vítima não apaga a do agente — no máximo pesa na pena (comportamento da vítima, art. 59). Se dois motoristas imprudentes colidem e ferem terceiros, há <b>concorrência</b> de culpas: cada um responde pelo seu crime culposo. Só a culpa <b>exclusiva</b> da vítima afasta a responsabilidade do agente, porque nesse caso ele não violou dever de cuidado.",
    "Prevalece que o crime culposo admite <b>coautoria</b> (dois operários que, juntos, jogam uma tábua do andaime sem olhar, ferindo alguém), mas <b>não admite participação</b>, porque não se induz nem se auxilia, dolosamente, quem não quer o resultado."]}],
  quadro:{ titulo:"Dolo eventual × culpa consciente", head:["","Dolo eventual","Culpa consciente"], rows:[["Previsão do resultado","Sim","Sim"],["Atitude","Aceita, é indiferente","Confia que não ocorrerá"],["Fórmula","\"Se acontecer, aconteceu\"","\"Não vai acontecer\""],["Exemplo","Atirar na multidão para assustar","Atirador de facas do circo que confia na própria habilidade"]]},
  pegadinhas:["Compensação de culpas não existe no Direito Penal: a culpa da vítima pode influir na pena (art. 59), mas não exclui a do agente.","Crime culposo exige previsão expressa: dano culposo não é crime no CP.","Culpa imprópria é a única forma de culpa que admite tentativa, segundo a doutrina.","Dirigir sem saber dirigir é imprudência, não imperícia."]},

{ id:"preterdolo", titulo:"Crime preterdoloso e qualificado pelo resultado", curto:"Preterdolo",
  rapido:["Preterdoloso: <b>dolo no antecedente</b> e <b>culpa no consequente</b> (lesão corporal seguida de morte, art. 129, §3º).",
    "Art. 19: pelo resultado que agrava a pena, só responde quem o causou <b>ao menos culposamente</b> — vedada a responsabilidade objetiva.",
    "Todo preterdoloso é qualificado pelo resultado, mas nem todo qualificado pelo resultado é preterdoloso."],
  teoria:[
   { h:"Qualificados pelo resultado e suas combinações", p:[
    "Crime qualificado pelo resultado é aquele em que a lei descreve uma conduta básica e acrescenta um resultado que aumenta a pena. Há quatro combinações possíveis: dolo e dolo (lesão corporal com perda de membro, querida pelo agente); culpa e culpa (incêndio culposo com morte culposa); culpa e dolo (atropelar por descuido e fugir sem prestar socorro, para que a vítima morra — no CTB a omissão de socorro é causa de aumento); e dolo e culpa, que é o crime <b>preterdoloso</b>.",
    "No preterdolo, o agente quer o primeiro resultado e produz, por descuido, um resultado mais grave que não queria nem aceitou. O exemplo clássico é o soco no rosto que faz a vítima cair, bater a cabeça e morrer: lesão corporal seguida de morte. Se o resultado mais grave sequer era previsível, o agente responde só pela lesão — é a consequência do art. 19.",
    "O <b>latrocínio</b> é crime qualificado pelo resultado, mas não necessariamente preterdoloso: a morte pode ser dolosa ou culposa e, em ambos os casos, há latrocínio."]},
   { h:"Tentativa no preterdolo", p:[
    "O crime preterdoloso não admite tentativa, porque não se tenta produzir um resultado que não se quer. Já nos qualificados pelo resultado em que o resultado agravador é doloso (dolo e dolo), a tentativa é possível — o latrocínio tentado, em que o agente quer matar para roubar e não consegue, é o exemplo frequente em prova."]}],
  pegadinhas:["Preterdoloso não admite tentativa; latrocínio (morte dolosa) admite.","Sem ao menos culpa quanto ao resultado agravador, o agente responde só pelo crime básico (art. 19)."]}
],
lei:[
{ art:"CP, arts. 18 e 19", nome:"Crime doloso, culposo e agravação pelo resultado", sec:"dolo", itens:[
  { id:"cp18", rot:"Art. 18", t:"Diz-se o crime: I - <b class='g1'>doloso</b>, quando o agente <b class='g1'>quis o resultado ou assumiu o risco de produzi-lo</b>; II - <b class='g1'>culposo</b>, quando o agente deu causa ao resultado por <b class='g1'>imprudência, negligência ou imperícia</b>.<br>Parágrafo único - <b class='g3'>Salvo os casos expressos em lei</b>, ninguém pode ser punido por fato previsto como crime, senão quando o pratica dolosamente.", c:["dc1","dc2","dc3","dc4"] },
  { id:"cp19", rot:"Art. 19", t:"Pelo resultado que agrava especialmente a pena, só responde o agente que o houver causado <b class='g3'>ao menos culposamente</b>.", c:["dc5"] }
]}
],
juris:[],
cards:[
{ id:"dc1", tipo:"distincao", sec:"dolo", f:"Dolo eventual × culpa consciente.", v:"Nos dois o agente prevê o resultado. No <b>dolo eventual</b> aceita sua ocorrência; na <b>culpa consciente</b> acredita sinceramente que não vai acontecer.", lei:["cp18"] },
{ id:"dc2", tipo:"caso", sec:"dolo", f:"Terrorista explode avião para matar um empresário; morrem 100 passageiros. Qual o dolo quanto aos demais?", v:"<b>Dolo direto de 2º grau</b> (consequências necessárias): as mortes eram certas, ainda que não desejadas.", lei:["cp18"] },
{ id:"dc3", tipo:"lacuna", sec:"culpa", f:"Modalidades de culpa: ______ (ação perigosa), ______ (falta de cuidado/omissão), ______ (falta de aptidão técnica).", v:"<b>imprudência</b> · <b>negligência</b> · <b>imperícia</b>", lei:["cp18"] },
{ id:"dc4", tipo:"ce", sec:"culpa", f:"Certo ou errado: todo crime doloso admite a forma culposa.", v:"<b>Errado.</b> O crime culposo é excepcional e depende de previsão expressa (art. 18, parágrafo único).", lei:["cp18"] },
{ id:"dc5", tipo:"caso", sec:"preterdolo", f:"Soco no rosto, a vítima cai, bate a cabeça e morre. O agente não queria matar. Qual o crime?", v:"<b>Lesão corporal seguida de morte</b> (preterdoloso, art. 129, §3º) — se a morte era previsível (art. 19).", lei:["cp19"] },
{ id:"dc6", tipo:"ce", sec:"preterdolo", f:"Certo ou errado: crime preterdoloso admite tentativa.", v:"<b>Errado.</b> O resultado agravador é culposo, não querido.", lei:["cp19"] },
{ id:"dc7", tipo:"caso", sec:"dolo", f:"Agente estrangula a vítima, pensa que ela morreu e a joga no rio; ela morre afogada. Qual o crime?", v:"<b>Homicídio doloso consumado</b> — dolo geral (<i>dolus generalis</i>), erro sucessivo sobre o nexo causal.", lei:["cp18"] },
{ id:"dc8", tipo:"ce", sec:"culpa", f:"Certo ou errado: a culpa exclusiva da vítima exclui o crime culposo do agente; a culpa concorrente se compensa.", v:"Culpa <b>exclusiva</b> da vítima: não há crime (falta violação do dever de cuidado do agente). Culpa <b>concorrente</b>: <b>não se compensa</b> — cada um responde.", lei:["cp18"] },
{ id:"dc9", tipo:"distincao", sec:"culpa", f:"O que é culpa imprópria?", v:"O agente <b>quer</b> o resultado, mas age por erro evitável sobre situação de fato que tornaria a ação legítima (descriminante putativa). Responde por crime <b>culposo</b> (art. 20, §1º, 2ª parte).", lei:["cp18"] },
{ id:"dc10", tipo:"ce", sec:"dolo", f:"Certo ou errado: a embriaguez ao volante presume, por si só, o dolo eventual no homicídio de trânsito.", v:"<b>Errado.</b> STF e STJ exigem análise das circunstâncias concretas; a embriaguez isolada não basta.", lei:["cp18"] },
{ id:"dc11", tipo:"distincao", sec:"dolo", f:"Dolo direto de 2º grau × dolo eventual.", v:"<b>2º grau</b>: o efeito colateral é <b>certo</b>. <b>Eventual</b>: o resultado é apenas <b>possível</b>, e o agente o aceita.", lei:["cp18"] },
{ id:"dc12", tipo:"lacuna", sec:"dolo", f:"O CP adotou a teoria da ______ para o dolo direto e a do ______ para o dolo eventual.", v:"<b>vontade</b> · <b>assentimento</b> (consentimento)", lei:["cp18"] },
{ id:"dc13", tipo:"ce", sec:"dolo", f:"Certo ou errado: no finalismo, a consciência da ilicitude integra o dolo.", v:"<b>Errado.</b> O dolo é <b>natural</b> (consciência + vontade). A potencial consciência da ilicitude está na culpabilidade.", lei:[] },
{ id:"dc14", tipo:"caso", sec:"dolo", f:"Agente atira querendo ferir ou matar, tanto faz. A vítima só se fere. Qual o dolo e por qual crime responde?", v:"<b>Dolo alternativo</b>. Pela doutrina majoritária, responde pela <b>tentativa do crime mais grave</b> (tentativa de homicídio).", lei:["cp18"] },
{ id:"dc15", tipo:"distincao", sec:"culpa", f:"Imprudência × negligência.", v:"<b>Imprudência</b>: agir sem cautela (culpa positiva, simultânea à ação). <b>Negligência</b>: deixar de tomar a precaução antes de agir (culpa negativa).", lei:["cp18"] },
{ id:"dc16", tipo:"ce", sec:"culpa", f:"Certo ou errado: crime culposo admite coautoria, mas não participação.", v:"<b>Certo</b> (posição majoritária).", lei:[] },
{ id:"dc17", tipo:"lacuna", sec:"culpa", f:"Se nem o homem médio poderia prever o resultado, falta a ______ objetiva e o fato é ______.", v:"<b>previsibilidade</b> · <b>caso fortuito</b> (atípico)", lei:["cp18"] },
{ id:"dc18", tipo:"caso", sec:"preterdolo", f:"No roubo, o agente atira para matar a vítima e ela sobrevive. Há tentativa?", v:"<b>Sim: latrocínio tentado.</b> O resultado agravador era doloso; o crime não é preterdoloso.", lei:["cp19"] },
{ id:"dc19", tipo:"distincao", sec:"preterdolo", f:"Crime preterdoloso × qualificado pelo resultado.", v:"Qualificado pelo resultado é o gênero (dolo/dolo, culpa/culpa, culpa/dolo, dolo/culpa). <b>Preterdoloso</b> é a espécie dolo no antecedente + culpa no consequente.", lei:["cp19"] }
],
questoes:[]
};

/* ====================== ILICITUDE E CULPABILIDADE ====================== */
T.penal_ilicitude = {
meta:{ tema:"Ilicitude e Culpabilidade", atualizado:"15/10/2026", foco:"Excludentes de ilicitude (estado de necessidade, legítima defesa, estrito cumprimento do dever legal, exercício regular de direito), excesso, imputabilidade, potencial consciência da ilicitude e exigibilidade de conduta diversa." },
secoes:[
{ id:"ilicitude", titulo:"Ilicitude: conceito e causas de exclusão", curto:"Ilicitude",
  rapido:["Ilicitude (antijuridicidade) é a contrariedade do fato típico ao ordenamento jurídico como um todo.",
    "O fato típico é <b>indício</b> de ilicitude (<i>ratio cognoscendi</i>): presume-se ilícito até que se demonstre uma excludente.",
    "Excludentes <b>legais</b> (art. 23): estado de necessidade, legítima defesa, estrito cumprimento de dever legal e exercício regular de direito. <b>Supralegal</b>: consentimento do ofendido.",
    "Toda excludente exige o <b>elemento subjetivo</b>: o agente precisa saber que age amparado por ela."],
  teoria:[
   { h:"O que a ilicitude acrescenta ao fato típico", p:[
    "Depois de confirmar que o fato é típico, pergunta-se se ele é permitido pelo Direito. Quase sempre a resposta é não, e por isso a tipicidade funciona como um <b>indício</b> da ilicitude: o fato típico se presume ilícito, e quem alega uma excludente precisa demonstrá-la — ou, pelo menos, gerar dúvida razoável no juiz.",
    "Quando há uma causa de justificação, o fato continua típico, mas deixa de ser ilícito: não há crime (art. 23, caput). A consequência prática é grande, porque a conduta justificada não gera sequer responsabilidade civil, em regra, e quem colabora com ela também é alcançado — a excludente se <b>comunica</b> aos demais participantes.",
    "A doutrina exige, em todas as excludentes, o <b>conhecimento da situação justificante</b>: quem atira no desafeto por vingança e, por acaso, impede que ele mate alguém não age em legítima defesa, porque não sabia da agressão que estava repelindo."]}],
  pegadinhas:["Excludente de ilicitude não torna o fato atípico: o fato é típico, mas lícito.","Sem conhecimento da situação justificante, não há excludente."]},

{ id:"necessidade", titulo:"Estado de necessidade", curto:"Necessidade",
  rapido:["Art. 24: salvar de <b>perigo atual</b>, que o agente <b>não provocou por sua vontade</b> nem podia evitar de outro modo, direito próprio ou alheio, cujo sacrifício não era razoável exigir.",
    "O CP adota a teoria <b>unitária</b>: o estado de necessidade é sempre justificante. Se o bem sacrificado valia mais, há crime, com redução de <b>1/3 a 2/3</b> (§2º).",
    "Não pode alegar quem tinha o <b>dever legal</b> de enfrentar o perigo (§1º)."],
  teoria:[
   { h:"Requisitos", p:[
    "Quanto à <b>situação de perigo</b>: ele deve ser <b>atual</b> (o perigo apenas futuro não autoriza); não pode ter sido criado <b>voluntariamente</b> pelo agente — quem provoca o naufrágio não pode matar outro náufrago para ficar com o último colete; deve ameaçar bem jurídico do agente ou de terceiro; e o agente não pode ter o dever legal de enfrentá-lo.",
    "Quanto à <b>conduta</b>: deve ser <b>inevitável</b> (não havia outro modo de salvar o bem) e <b>proporcional</b> (sacrificar bem de valor igual ou menor que o protegido). Na teoria unitária, adotada pelo CP, sacrificar uma vida para salvar outra é justificado: no avião que cai com um só paraquedas, quem o toma à força não comete crime.",
    "Quando o bem sacrificado vale mais que o protegido, o fato é ilícito, mas o juiz pode reduzir a pena de um a dois terços (§2º). O Código Penal Militar, ao contrário, adota a teoria <b>diferenciadora</b>, que admite um estado de necessidade exculpante."]},
   { h:"Espécies e pontos de prova", p:[
    "<b>Agressivo</b>: o agente sacrifica bem de terceiro que nada tem a ver com o perigo. <b>Defensivo</b>: sacrifica bem de quem causou o perigo. <b>Real</b>: a situação de perigo existe. <b>Putativo</b>: existe apenas na cabeça do agente — se o erro era inevitável, ele fica isento de pena; se evitável, responde por crime culposo, se houver (art. 20, §1º).",
    "É possível estado de necessidade <b>recíproco</b> (dois náufragos disputando a mesma tábua), desde que nenhum tenha provocado o perigo. A excludente se comunica aos coautores. E, se o agente erra na execução e atinge outra pessoa, continua amparado, porque se consideram as condições da vítima visada (art. 73).",
    "A simples alegação de dificuldade financeira não caracteriza estado de necessidade; em casos excepcionais, a miséria extrema pode afastar a culpabilidade por inexigibilidade de conduta diversa. O furto famélico — subtrair alimento para matar a fome imediata — é o exemplo clássico de estado de necessidade."]}],
  quadro:{ titulo:"Estado de necessidade × legítima defesa", head:["","Estado de necessidade","Legítima defesa"], rows:[["Situação","Perigo atual (de qualquer origem)","Injusta agressão humana, atual ou iminente"],["Conduta","Ataque a bem jurídico, muitas vezes de terceiro inocente","Reação contra o agressor"],["Perigo/agressão iminente","Não basta (exige atual)","Basta agressão iminente"],["Possibilidade de fuga","Se podia fugir, deve fugir (inevitabilidade)","Não precisa fugir (commodus discessus)"],["Dever legal de enfrentar","Afasta a excludente","Não se aplica"]]},
  pegadinhas:["Estado de necessidade exige perigo atual; legítima defesa admite agressão iminente.","Ataque de animal gera estado de necessidade, salvo se alguém açulou o animal — aí é legítima defesa contra o dono."]},

{ id:"legitima", titulo:"Legítima defesa", curto:"Legítima defesa",
  rapido:["Art. 25: repelir <b>injusta agressão, atual ou iminente</b>, a direito próprio ou alheio, usando <b>moderadamente os meios necessários</b>.",
    "O agredido não é obrigado a fugir, mesmo que pudesse.",
    "Não cabe legítima defesa real contra legítima defesa real; cabe contra a putativa e contra o excesso (legítima defesa <b>sucessiva</b>).",
    "Pacote Anticrime: também está em legítima defesa o agente de segurança pública que repele agressão a <b>vítima mantida refém</b> (parágrafo único)."],
  teoria:[
   { h:"Requisitos", p:[
    "<b>Agressão injusta</b>: contrária ao Direito. O preso que agride o carcereiro ao ser colocado na cela não se defende de agressão injusta, porque o carcereiro age licitamente. A agressão de um inimputável é injusta (é fato típico e ilícito, só não é culpável), por isso cabe legítima defesa contra o doente mental ou o menor.",
    "<b>Atual ou iminente</b>: em curso ou prestes a começar. Ninguém precisa esperar o primeiro tiro: se a ex-companheira que prometeu matá-lo saca a arma, a agressão é iminente. Agressão passada é vingança; agressão futura e incerta não autoriza reação.",
    "<b>Direito próprio ou alheio</b>: qualquer bem jurídico pode ser defendido, inclusive a honra. Na defesa de bem <b>disponível</b> de terceiro, exige-se a concordância dele; se o bem é <b>indisponível</b> (vida), pode-se defendê-lo mesmo contra a vontade do titular.",
    "<b>Meios necessários usados com moderação</b>: o meio deve ser suficiente para repelir a agressão e usado na medida necessária. Cinco tiros no peito de quem dá tapas, sem condições de causar lesão grave, não é legítima defesa. Diferentemente do estado de necessidade, o agredido não precisa fugir (a chamada saída cômoda, <i>commodus discessus</i>)."]},
   { h:"Espécies e situações de prova", p:[
    "<b>Agressiva</b> (a reação configura um fato típico, como lesão corporal) × <b>defensiva</b> (o agente só se protege); <b>própria</b> × <b>de terceiro</b>; <b>real</b> × <b>putativa</b> (a agressão existe só na imaginação do agente, com o mesmo tratamento do estado de necessidade putativo).",
    "<b>Legítima defesa sucessiva</b>: o agredido que se excede passa a ser agressor injusto, e o agressor inicial pode se defender do excesso. <b>Legítima defesa recíproca</b> (real contra real) é impossível, porque quem se defende legitimamente pratica agressão justa. Cabe, porém, legítima defesa real contra quem age em legítima defesa putativa ou amparado só por excludente de culpabilidade.",
    "Se, ao se defender, o agente erra o alvo e atinge um inocente (o policial que, em troca de tiros, atinge uma moradora), continua em legítima defesa, porque o fato é analisado como se tivesse atingido a vítima visada (art. 73). A legítima defesa não se presume: quem a alega deve demonstrá-la.",
    "Ataque de <b>animal</b> gera estado de necessidade; se alguém atiça o cão contra a vítima, o animal é instrumento e há legítima defesa contra o dono. <b>Ofendículos</b> (cerca elétrica, cacos de vidro no muro) são vistos como exercício regular de direito quando instalados e como legítima defesa preordenada quando atuam; o dono responde pelo excesso se o aparato for desproporcional."]},
   { h:"Legítima defesa da honra", p:[
    "O STF, na ADPF 779 (2023), declarou inconstitucional a tese da \"legítima defesa da honra\" em feminicídios e agressões contra mulheres, em qualquer fase da investigação ou do processo, inclusive no júri. A razão é que matar alguém por causa de traição não preenche nenhum requisito da legítima defesa: não há agressão injusta atual e a reação seria desproporcional.",
    "A decisão não diz que a honra não pode ser defendida. Quem arranca o megafone de alguém que, numa reunião de condomínio, o chama de ladrão diante de dezenas de pessoas usa meio moderado contra agressão atual à honra e pode estar em legítima defesa."]}],
  pegadinhas:["Cabe legítima defesa contra inimputável.","Legítima defesa recíproca (real × real) não existe; sucessiva existe.","O §único do art. 25 (refém) exige todos os requisitos do caput."]},

{ id:"outras", titulo:"Dever legal, exercício de direito e consentimento", curto:"Outras excludentes",
  rapido:["<b>Estrito cumprimento do dever legal</b>: o agente cumpre obrigação imposta por lei (oficial de justiça que arromba a porta por ordem judicial). Particulares também podem invocá-lo.",
    "<b>Exercício regular de direito</b>: quem exerce um direito previsto no ordenamento não comete crime (castigo moderado dos pais, intervenção médica consentida, esporte dentro das regras).",
    "<b>Consentimento do ofendido</b>: excludente supralegal — bem <b>disponível</b>, ofendido <b>capaz</b> e consentimento <b>prévio ou simultâneo</b>."],
  teoria:[
   { h:"Estrito cumprimento do dever legal", p:[
    "Age amparado quem pratica fato típico para cumprir dever imposto por lei: o policial que usa a força necessária para prender alguém em flagrante, o oficial de justiça que arromba a porta para cumprir mandado. O excesso, como sempre, é punido — socos no preso já algemado não são dever de ninguém.",
    "Atenção: o policial que fere ou mata alguém numa troca de tiros não age em estrito cumprimento do dever, mas em <b>legítima defesa</b>, porque nenhuma lei impõe o dever de matar. A excludente se comunica a quem colabora com o agente e não é exclusiva de servidores: o advogado que se recusa a depor sobre fato que soube no exercício da profissão cumpre o dever legal de sigilo."]},
   { h:"Exercício regular de direito", p:[
    "O ordenamento precisa ser coerente: o que é direito de alguém não pode ser crime. A mãe que deixa o filho de castigo no quarto não comete cárcere privado, porque exerce o poder familiar — desde que de forma moderada; a lei que proíbe castigos físicos e tratamentos cruéis (Lei Menino Bernardo) limita esse direito. Prevalece que o direito deve ter base no ordenamento; costumes locais não bastam.",
    "Também são exemplos as lesões nas lutas esportivas praticadas dentro das regras, as intervenções médicas consentidas e a prisão em flagrante feita por qualquer pessoa do povo."]},
   { h:"Consentimento do ofendido", p:[
    "Não está no CP, mas a doutrina o aceita como causa <b>supralegal</b> de exclusão da ilicitude. Requisitos: consentimento <b>válido</b> (pessoa capaz, sem coação ou fraude), bem jurídico <b>próprio e disponível</b> (não vale para a vida) e consentimento dado <b>antes ou durante</b> a conduta — o perdão posterior não exclui a ilicitude.",
    "Quando a discordância da vítima é elemento do tipo (\"contra a vontade de quem de direito\", na violação de domicílio), o consentimento afasta a própria tipicidade, e não a ilicitude."]}],
  pegadinhas:["Policial que mata em troca de tiros: legítima defesa, não estrito cumprimento do dever.","Consentimento posterior ao fato não exclui a ilicitude.","Vida é bem indisponível: o consentimento não exclui o homicídio."]},

{ id:"excesso", titulo:"Excesso punível", curto:"Excesso",
  rapido:["Art. 23, parágrafo único: em qualquer excludente, o agente responde pelo <b>excesso doloso ou culposo</b>.",
    "Excesso <b>intensivo</b>: meio desproporcional (metralhadora contra tapa). <b>Extensivo</b>: a reação continua depois que a situação justificante acabou.",
    "Excesso <b>exculpante</b> (medo, pânico) pode afastar a culpabilidade; o <b>acidental</b> é penalmente irrelevante."],
  teoria:[
   { h:"Espécies de excesso", p:[
    "Há excesso quando o agente usa irregularmente uma excludente: porque o meio foi desproporcional desde o início (<b>intensivo</b>) ou porque a reação seguiu depois de cessada a agressão ou o perigo (<b>extensivo</b>) — quem desarma e imobiliza o agressor e continua a espancá-lo.",
    "O <b>doloso</b> (o agente quis ou aceitou exceder-se) e o <b>culposo</b> (exceder-se por descuido) são puníveis. O <b>acidental</b> ou fortuito, imprevisível e inevitável, não gera responsabilidade. O <b>inconsciente</b> decorre de erro — o agente não percebe que a necessidade acabou: se o erro era inevitável, fica isento; se evitável, responde por culpa.",
    "O excesso <b>exculpante</b> nasce de uma perturbação emocional intensa, como medo ou pânico: a senhora idosa que, aterrorizada, continua golpeando o assaltante já desacordado pode ter a culpabilidade afastada por inexigibilidade de conduta diversa. Não está expresso no CP comum, mas é aceito pela doutrina."]}],
  pegadinhas:["O parágrafo único do art. 23 vale para todas as excludentes, não só para a legítima defesa.","Excesso exculpante afasta a culpabilidade, não a ilicitude."]},

{ id:"culpabilidade", titulo:"Culpabilidade: conceito e teorias", curto:"Culpabilidade",
  rapido:["Culpabilidade é o juízo de <b>reprovação</b> sobre o agente que praticou um fato típico e ilícito.",
    "Elementos, pela teoria <b>normativa pura</b> (finalista): <b>imputabilidade</b>, <b>potencial consciência da ilicitude</b> e <b>exigibilidade de conduta diversa</b>.",
    "O CP adota a teoria <b>limitada</b> da culpabilidade: o erro sobre a situação de fato de uma excludente é tratado como erro de tipo (art. 20, §1º)."],
  teoria:[
   { h:"Da teoria psicológica à normativa pura", p:[
    "Na ilicitude se analisa o fato; na culpabilidade, o <b>agente</b>: se ele, nas circunstâncias, podia ser censurado por ter agido como agiu. Por isso parte da doutrina a vê como pressuposto da pena, e não como elemento do crime.",
    "A teoria <b>psicológica</b>, dos causalistas, via a culpabilidade como o vínculo psíquico do agente com o fato: imputabilidade mais dolo ou culpa. A teoria <b>psicológico-normativa</b> acrescentou a exigibilidade de conduta diversa e manteve o dolo, carregado da consciência da ilicitude, na culpabilidade.",
    "A teoria <b>normativa pura</b>, ligada ao finalismo, levou dolo e culpa para a conduta e deixou na culpabilidade apenas elementos de valoração: imputabilidade, potencial consciência da ilicitude e exigibilidade de conduta diversa. Ela se divide em <b>extremada</b> (todo erro sobre causa de justificação é erro de proibição) e <b>limitada</b> (o erro sobre os fatos que a fundamentam é tratado como erro de tipo permissivo; o erro sobre a existência ou os limites dela é erro de proibição indireto). A Exposição de Motivos do CP indica a teoria limitada."]}],
  pegadinhas:["Teoria extremada × limitada: só divergem sobre as descriminantes putativas.","Para o finalismo, dolo e culpa não estão na culpabilidade."]},

{ id:"imputabilidade", titulo:"Imputabilidade e embriaguez", curto:"Imputabilidade",
  rapido:["Imputável é quem, ao tempo da conduta, consegue <b>entender</b> o caráter ilícito do fato e <b>determinar-se</b> conforme esse entendimento. É a regra; a inimputabilidade é que precisa ser provada.",
    "Critério <b>biopsicológico</b> para a doença mental (art. 26); critério <b>biológico</b> para os menores de 18 (art. 27).",
    "Embriaguez voluntária ou culposa <b>não</b> exclui a imputabilidade (<i>actio libera in causa</i>); só a <b>completa e acidental</b> isenta de pena."],
  teoria:[
   { h:"Doença mental e menoridade", p:[
    "O art. 26 exige uma causa biológica (doença mental ou desenvolvimento mental incompleto ou retardado) e uma consequência psicológica (incapacidade de entender ou de se determinar). Se a incapacidade é <b>total</b>, o agente é inimputável: é absolvido, mas recebe <b>medida de segurança</b> — a chamada <b>absolvição imprópria</b>. Se é <b>parcial</b>, é semi-imputável: tem culpabilidade, é condenado com redução de 1/3 a 2/3 e o juiz pode substituir a pena por medida de segurança se houver periculosidade concreta (sistema <b>vicariante</b>: pena <i>ou</i> medida, nunca as duas).",
    "Para o menor de 18 anos o critério é puramente <b>biológico</b>: não importa o grau de maturidade; ele responde perante o ECA. A idade se verifica no momento da <b>conduta</b> (art. 4º): quem atira aos 17 anos responde pelo ECA ainda que a vítima morra depois de ele completar 18. No crime <b>permanente</b>, porém, se a permanência continua após os 18 anos, ele responde como adulto. A menoridade se prova por documento hábil (Súmula 74 do STJ).",
    "O sonâmbulo não é tratado como doente mental: falta-lhe vontade e, portanto, conduta — o fato é atípico."]},
   { h:"Emoção, paixão e embriaguez", p:[
    "Emoção e paixão não excluem a imputabilidade (art. 28, I), embora possam reduzir a pena (homicídio privilegiado, atenuantes).",
    "A embriaguez <b>voluntária</b> (o agente quis se embriagar) ou <b>culposa</b> (bebeu sem querer se embriagar, mas se embriagou) não exclui a imputabilidade. A justificativa é a teoria da <b>actio libera in causa</b>: o agente era livre quando decidiu beber. A classificação depende da embriaguez, não do crime — é possível cometer crime doloso em embriaguez culposa.",
    "A embriaguez <b>preordenada</b> (beber para ter coragem de cometer o crime) não exclui a imputabilidade e ainda agrava a pena (art. 61, II, l). A embriaguez <b>acidental</b>, por caso fortuito ou força maior (alguém põe álcool no copo da vítima sem ela saber), isenta de pena se for <b>completa</b>; se incompleta, reduz de 1/3 a 2/3. Nesses casos não cabe medida de segurança, porque o agente é sadio. A embriaguez <b>patológica</b> (doentia) pode ser tratada como doença mental, nos termos do art. 26."]}],
  quadro:{ titulo:"Embriaguez", head:["Espécie","Efeito"], rows:[["Voluntária ou culposa (completa ou não)","Não exclui a imputabilidade"],["Preordenada","Agravante (art. 61, II, l)"],["Acidental completa (caso fortuito/força maior)","Isenta de pena (art. 28, §1º)"],["Acidental incompleta","Redução de 1/3 a 2/3 (art. 28, §2º)"],["Patológica","Pode ser tratada como doença mental (art. 26)"]]},
  pegadinhas:["Inimputável por doença mental: absolvição imprópria, com medida de segurança.","Semi-imputável é culpável: é condenado.","Embriaguez acidental não gera medida de segurança."]},

{ id:"exigibilidade", titulo:"Consciência da ilicitude e exigibilidade de conduta diversa", curto:"Exigibilidade",
  rapido:["<b>Potencial consciência da ilicitude</b>: basta que o agente <b>pudesse</b> saber que a conduta é contrária ao Direito. Faltando, há erro de proibição (art. 21).",
    "<b>Inexigibilidade de conduta diversa</b>: <b>coação moral irresistível</b> e <b>obediência hierárquica</b> a ordem não manifestamente ilegal — só responde o coator ou quem deu a ordem (art. 22).",
    "Coação <b>física</b> irresistível exclui a conduta; coação <b>moral</b> irresistível exclui a culpabilidade."],
  teoria:[
   { h:"Potencial consciência da ilicitude", p:[
    "Não se exige que o agente saiba qual artigo violou, nem que conheça a lei: basta que tivesse a possibilidade de perceber que a conduta é reprovada pelo Direito. A análise leva em conta a pessoa concreta, e não o homem médio — o bacharel em Direito e o morador de uma comunidade isolada não estão na mesma posição. Para o STJ, ser indígena não significa, por si só, falta de consciência da ilicitude: isso deve ser verificado caso a caso."]},
   { h:"Coação moral e obediência hierárquica", p:[
    "Na <b>coação moral irresistível</b> (<i>vis compulsiva</i>), o coagido age com vontade, mas viciada por ameaça grave: a mãe que furta um carro porque ameaçaram matar seu filho. O fato é típico e ilícito, mas não culpável; responde o coator, inclusive com a agravante do art. 62, II. Se a coação era <b>resistível</b>, o coagido responde, com atenuante (art. 65, III, c).",
    "Na <b>obediência hierárquica</b>, o subordinado cumpre ordem <b>não manifestamente ilegal</b> de superior. Prevalece que a relação deve ser de <b>direito público</b> — não se aplica entre patrão e empregado. Se a ordem era claramente ilegal, os dois respondem, com atenuante para o subordinado.",
    "Na coação <b>física</b> irresistível (<i>vis absoluta</i>) não há vontade: quem tem o dedo forçado contra o gatilho não age. Exclui-se o fato típico, não a culpabilidade. A doutrina admite ainda a inexigibilidade de conduta diversa como causa <b>supralegal</b>, em situações excepcionais."]}],
  pegadinhas:["Obediência hierárquica não vale nas relações privadas.","Coação moral resistível: atenuante, não isenção."]}
],
lei:[
{ art:"CP, arts. 23 a 25", nome:"Exclusão de ilicitude", sec:"ilicitude", itens:[
  { id:"cp23", rot:"Art. 23", t:"<b class='g1'>Não há crime</b> quando o agente pratica o fato: I - em <b class='g1'>estado de necessidade</b>; II - em <b class='g1'>legítima defesa</b>; III - em <b class='g1'>estrito cumprimento de dever legal</b> ou no <b class='g1'>exercício regular de direito</b>.<br>Parágrafo único - O agente, em qualquer das hipóteses deste artigo, responderá pelo <b class='g3'>excesso doloso ou culposo</b>.", c:["il1","il7"] },
  { id:"cp24", rot:"Art. 24", t:"Considera-se em estado de necessidade quem pratica o fato para salvar de <b class='g1'>perigo atual</b>, que <b class='g3'>não provocou por sua vontade</b>, nem podia de outro modo evitar, direito próprio ou alheio, cujo sacrifício, nas circunstâncias, não era razoável exigir-se.<br>§ 1º - <b class='g3'>Não pode alegar estado de necessidade quem tinha o dever legal de enfrentar o perigo</b>.<br>§ 2º - Embora seja razoável exigir-se o sacrifício do direito ameaçado, a pena poderá ser reduzida de <b class='g2'>um a dois terços</b>.", c:["il2","il3"] },
  { id:"cp25", rot:"Art. 25", t:"Entende-se em legítima defesa quem, usando <b class='g1'>moderadamente dos meios necessários</b>, repele <b class='g1'>injusta agressão, atual ou iminente</b>, a direito seu ou de outrem.<br>Parágrafo único. Observados os requisitos previstos no caput deste artigo, considera-se também em legítima defesa o <b class='g1'>agente de segurança pública</b> que repele agressão ou risco de agressão a <b class='g1'>vítima mantida refém</b> durante a prática de crimes.", nota:"Parágrafo único incluído pela Lei nº 13.964, de 2019", j:["stf-adpf779"], c:["il4","il5","il6"] }
]},
{ art:"CP, arts. 22 e 26 a 28", nome:"Culpabilidade", sec:"culpabilidade", itens:[
  { id:"cp22", rot:"Art. 22", t:"Se o fato é cometido sob <b class='g1'>coação irresistível</b> ou em <b class='g1'>estrita obediência a ordem, não manifestamente ilegal, de superior hierárquico</b>, só é punível o autor da coação ou da ordem.", c:["il8"] },
  { id:"cp26", rot:"Art. 26", t:"É <b class='g1'>isento de pena</b> o agente que, por <b class='g1'>doença mental ou desenvolvimento mental incompleto ou retardado</b>, era, ao tempo da ação ou da omissão, <b class='g3'>inteiramente incapaz</b> de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento.<br>Parágrafo único - A pena pode ser reduzida de <b class='g2'>um a dois terços</b>, se o agente, em virtude de perturbação de saúde mental ou por desenvolvimento mental incompleto ou retardado <b class='g3'>não era inteiramente capaz</b> de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento.", c:["il9"] },
  { id:"cp27", rot:"Art. 27", t:"Os <b class='g2'>menores de 18 (dezoito) anos</b> são penalmente inimputáveis, ficando sujeitos às normas estabelecidas na legislação especial.", j:["stj-s74"], c:["il10"] },
  { id:"cp28", rot:"Art. 28", t:"<b class='g3'>Não excluem</b> a imputabilidade penal: I - a <b class='g1'>emoção ou a paixão</b>; II - a <b class='g1'>embriaguez, voluntária ou culposa</b>, pelo álcool ou substância de efeitos análogos.<br>§ 1º - É isento de pena o agente que, por <b class='g1'>embriaguez completa, proveniente de caso fortuito ou força maior</b>, era, ao tempo da ação ou da omissão, inteiramente incapaz de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento.<br>§ 2º - A pena pode ser reduzida de <b class='g2'>um a dois terços</b>, se o agente, por embriaguez, proveniente de caso fortuito ou força maior, não possuía, ao tempo da ação ou da omissão, a plena capacidade de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento.", c:["il11","il12"] }
]}
],
juris:[
{ id:"stf-adpf779", trib:"STF", tipo:"ADPF", num:"779", sec:"legitima", status:"vigente", data:"Julgamento finalizado em 01/08/2023 (Inf. 1105)", titulo:"Legítima defesa da honra é inconstitucional",
  texto:"É inconstitucional o uso da tese da legítima defesa da honra em crimes de feminicídio ou de agressão contra mulheres, na fase pré-processual, processual ou no julgamento do júri.", sintese:true,
  explica:"Se a defesa usar a tese, o julgamento pode ser anulado.", lei:["cp25"], fonte:"https://portal.stf.jus.br/processos/detalhe.asp?incidente=6081690" },
{ id:"stj-s74", trib:"STJ", tipo:"Súmula", num:"74", sec:"imputabilidade", status:"vigente", data:"", titulo:"Prova da menoridade", texto:"Para efeitos penais, o reconhecimento da menoridade do réu requer prova por documento hábil.", explica:"", lei:["cp27"], fonte:STJS }
],
cards:[
{ id:"il1", tipo:"lacuna", sec:"ilicitude", f:"Art. 23: excludentes de ilicitude — estado de ______, legítima ______, estrito cumprimento de ______ e exercício regular de ______.", v:"<b>necessidade</b> · <b>defesa</b> · <b>dever legal</b> · <b>direito</b>", lei:["cp23"] },
{ id:"il2", tipo:"ce", sec:"necessidade", f:"Certo ou errado: o bombeiro pode alegar estado de necessidade para não entrar no prédio em chamas.", v:"<b>Errado.</b> Quem tem o dever legal de enfrentar o perigo não pode alegá-lo (art. 24, §1º) — dentro dos limites razoáveis do dever.", lei:["cp24"] },
{ id:"il3", tipo:"distincao", sec:"necessidade", f:"Teoria unitária × diferenciadora do estado de necessidade.", v:"<b>Unitária</b> (CP): só justificante; se o bem sacrificado vale mais, só reduz a pena (§2º). <b>Diferenciadora</b> (CPM): justificante (bem menor) e exculpante (bem igual ou maior).", lei:["cp24"] },
{ id:"il4", tipo:"distincao", sec:"legitima", f:"Perigo atual × agressão iminente.", v:"Estado de necessidade exige perigo <b>atual</b>. Legítima defesa admite agressão <b>atual ou iminente</b>.", lei:["cp24","cp25"] },
{ id:"il5", tipo:"ce", sec:"legitima", f:"Certo ou errado: cabe legítima defesa contra agressão de doente mental.", v:"<b>Certo.</b> A agressão é injusta mesmo que o agressor seja inimputável.", lei:["cp25"] },
{ id:"il6", tipo:"juris", sec:"legitima", f:"A defesa pode sustentar \"legítima defesa da honra\" no júri de um feminicídio?", v:"<b>Não.</b> O STF declarou a tese inconstitucional (ADPF 779).", lei:["cp25"], j:["stf-adpf779"] },
{ id:"il7", tipo:"caso", sec:"excesso", f:"Após desarmar e imobilizar o agressor, a vítima o espanca até a morte. Qual a consequência?", v:"<b>Excesso</b>: a agressão já cessou. Responde pelo excesso doloso ou culposo (art. 23, parágrafo único).", lei:["cp23"] },
{ id:"il8", tipo:"distincao", sec:"exigibilidade", f:"Coação física irresistível × coação moral irresistível.", v:"<b>Física</b>: não há conduta (exclui o fato típico). <b>Moral</b>: exclui a culpabilidade (inexigibilidade); só o coator responde (art. 22).", lei:["cp22"] },
{ id:"il9", tipo:"distincao", sec:"imputabilidade", f:"Inimputável × semi-imputável por doença mental.", v:"<b>Inimputável</b> (inteiramente incapaz): isento de pena, absolvição imprópria com medida de segurança. <b>Semi-imputável</b>: condenado com redução de 1/3 a 2/3 ou medida de segurança (vicariante).", lei:["cp26"] },
{ id:"il10", tipo:"caso", sec:"imputabilidade", f:"Jovem atira na véspera dos 18 anos; a vítima morre uma semana depois. Responde pelo CP?", v:"<b>Não.</b> Teoria da atividade (art. 4º): era menor no momento da conduta — responde pelo ECA.", lei:["cp27"] },
{ id:"il11", tipo:"caso", sec:"imputabilidade", f:"Agente bebe para ter coragem de matar o desafeto. Qual a consequência da embriaguez?", v:"Embriaguez <b>preordenada</b>: não exclui a imputabilidade e é <b>agravante</b> (art. 61, II, l).", lei:["cp28"] },
{ id:"il12", tipo:"caso", sec:"imputabilidade", f:"Vítima de \"boa noite, Cinderela\" fica completamente embriagada e, sem discernimento, agride alguém. Responde?", v:"<b>Isento de pena</b>: embriaguez completa por caso fortuito ou força maior (art. 28, §1º).", lei:["cp28"] },
{ id:"il13", tipo:"ce", sec:"imputabilidade", f:"Certo ou errado: a emoção e a paixão excluem a imputabilidade.", v:"<b>Errado</b> (art. 28, I). Podem, porém, atenuar a pena ou gerar privilégio (homicídio sob violenta emoção).", lei:["cp28"] },
{ id:"il14", tipo:"ce", sec:"ilicitude", f:"Certo ou errado: quem atira no desafeto por vingança e, sem saber, impede que ele mate alguém age em legítima defesa de terceiro.", v:"<b>Errado.</b> Falta o elemento subjetivo: o conhecimento da situação justificante.", lei:["cp23"] },
{ id:"il15", tipo:"caso", sec:"necessidade", f:"O agente provoca dolosamente um incêndio no barco e, para se salvar, toma à força o último colete de outro passageiro, que morre. Estado de necessidade?", v:"<b>Não.</b> Quem provocou o perigo por sua vontade não pode alegá-lo (art. 24).", lei:["cp24"] },
{ id:"il16", tipo:"distincao", sec:"necessidade", f:"Estado de necessidade agressivo × defensivo.", v:"<b>Agressivo</b>: sacrifica bem de terceiro alheio ao perigo. <b>Defensivo</b>: sacrifica bem de quem causou o perigo.", lei:["cp24"] },
{ id:"il17", tipo:"ce", sec:"legitima", f:"Certo ou errado: a legítima defesa exige que o agredido não tenha como fugir.", v:"<b>Errado.</b> Não se exige fuga (commodus discessus). A inevitabilidade é requisito do estado de necessidade.", lei:["cp25"] },
{ id:"il18", tipo:"distincao", sec:"legitima", f:"Legítima defesa recíproca × sucessiva.", v:"<b>Recíproca</b> (real contra real): impossível. <b>Sucessiva</b>: o agressor inicial se defende do <b>excesso</b> de quem se defendia — possível.", lei:["cp25"] },
{ id:"il19", tipo:"caso", sec:"legitima", f:"Policial, em troca de tiros com criminosos, erra o disparo e mata uma moradora. Qual a situação jurídica?", v:"Continua em <b>legítima defesa</b>: erro na execução (art. 73) — considera-se a vítima visada.", lei:["cp25"] },
{ id:"il20", tipo:"caso", sec:"outras", f:"Policial mata o suspeito que atirava contra a equipe. Estrito cumprimento do dever legal?", v:"<b>Não.</b> É <b>legítima defesa</b>: nenhuma lei impõe o dever de matar.", lei:["cp23"] },
{ id:"il21", tipo:"lacuna", sec:"outras", f:"Consentimento do ofendido (excludente supralegal): bem jurídico ______, ofendido ______ e consentimento ______ ou simultâneo.", v:"<b>disponível</b> · <b>capaz</b> · <b>prévio</b>", lei:[] },
{ id:"il22", tipo:"distincao", sec:"excesso", f:"Excesso intensivo × extensivo.", v:"<b>Intensivo</b>: meio desproporcional desde o início. <b>Extensivo</b>: a reação continua após cessar a situação justificante.", lei:["cp23"] },
{ id:"il23", tipo:"lacuna", sec:"culpabilidade", f:"Teoria normativa pura: culpabilidade = ______ + potencial consciência da ______ + exigibilidade de conduta ______.", v:"<b>imputabilidade</b> · <b>ilicitude</b> · <b>diversa</b>", lei:[] },
{ id:"il24", tipo:"distincao", sec:"culpabilidade", f:"Teoria extremada × limitada da culpabilidade.", v:"Divergem só nas descriminantes putativas. <b>Limitada</b> (CP): erro sobre a situação de fato = erro de tipo permissivo; erro sobre existência/limites = erro de proibição indireto. <b>Extremada</b>: tudo é erro de proibição.", lei:[] },
{ id:"il25", tipo:"caso", sec:"imputabilidade", f:"Aos 17 anos, o agente sequestra a vítima; o cativeiro dura seis meses e ele completa 18 durante esse período. Responde pelo CP?", v:"<b>Sim.</b> Crime permanente: a conduta continuou após a maioridade.", lei:["cp27"] },
{ id:"il26", tipo:"ce", sec:"exigibilidade", f:"Certo ou errado: o empregado que cumpre ordem não manifestamente ilegal do patrão é beneficiado pela obediência hierárquica.", v:"<b>Errado.</b> Prevalece que a obediência hierárquica exige relação de direito público.", lei:["cp22"] }
],
questoes:[]
};

/* ============================ ERRO ============================ */
T.penal_erros = {
meta:{ tema:"Erro de Tipo e Erro de Proibição", atualizado:"15/10/2026", foco:"Erro de tipo essencial e acidental, descriminantes putativas, erro determinado por terceiro, erro sobre a pessoa, na execução e no resultado, e erro de proibição." },
secoes:[
{ id:"erro-tipo", titulo:"Erro de tipo essencial", curto:"Erro de tipo",
  rapido:["Erro de tipo é a falsa percepção da realidade sobre um <b>elemento do tipo</b>: o agente não sabe que está realizando a conduta descrita na lei.",
    "Sempre <b>exclui o dolo</b>. Se <b>inevitável</b> (escusável), exclui também a culpa: o fato é atípico. Se <b>evitável</b> (inescusável), pune-se a forma culposa, se prevista (art. 20).",
    "Ex.: o caçador que atira num vulto achando ser um animal; quem desacata funcionário público sem saber que ele é funcionário."],
  teoria:[
   { h:"Como funciona", p:[
    "O dolo precisa abranger todos os elementos do tipo. Quem leva a bolsa alheia pensando que é a sua não sabe que a coisa é \"alheia\": falta-lhe o dolo de furtar. Por isso o art. 20 diz que o erro sobre elemento constitutivo do tipo exclui o dolo.",
    "Para medir se o erro era evitável, pergunta-se se uma pessoa prudente, com um esforço razoável de atenção, teria percebido a realidade. A cliente que volta à loja e encontra, no mesmo lugar, uma bolsa idêntica à que esqueceu ali instantes antes comete erro <b>inevitável</b>: não há crime. Quem, numa repartição, ofende alguém de crachá atrás do balcão sem perceber que é servidor comete erro <b>evitável</b> — mas, como não existe desacato culposo, também não responde por desacato.",
    "O erro de tipo também pode recair sobre a condição de <b>garantidor</b> nos crimes omissivos impróprios: a mãe que não socorre uma criança por não perceber que é o próprio filho erra sobre um elemento que fundamentaria seu dever de agir.",
    "Quando o erro recai sobre um <b>elemento normativo</b> (\"sem justa causa\", \"indevidamente\"), há divergência: prevalece que é erro de tipo, mas parte da doutrina vê erro de proibição, porque o agente erra sobre a licitude da conduta."]}],
  quadro:{ titulo:"Erro de tipo essencial", head:["","Inevitável (escusável)","Evitável (inescusável)"], rows:[["Dolo","Excluído","Excluído"],["Culpa","Excluída","Permanece, se houver forma culposa"],["Resultado","Fato atípico","Crime culposo ou fato atípico (se não há forma culposa)"]]},
  pegadinhas:["Erro de tipo evitável não gera punição se o crime não tiver forma culposa.","Erro de tipo sempre exclui o dolo, seja evitável ou inevitável."]},

{ id:"putativas", titulo:"Descriminantes putativas, erro provocado e delito putativo", curto:"Putativas",
  rapido:["Descriminante putativa: o agente imagina uma situação que, se existisse, tornaria a ação legítima (legítima defesa putativa, estado de necessidade putativo).",
    "Erro sobre a <b>situação de fato</b>: erro de tipo permissivo (art. 20, §1º) — inevitável isenta de pena; evitável gera punição por culpa (<b>culpa imprópria</b>).",
    "Erro <b>determinado por terceiro</b> (§2º): responde quem provocou o erro.",
    "<b>Delito putativo</b> é o inverso: o agente acha que comete crime, mas o fato é atípico."],
  teoria:[
   { h:"Erro de tipo permissivo × erro de proibição indireto", p:[
    "Nas descriminantes putativas o agente sabe o que faz, mas acredita estar amparado por uma excludente. O CP, seguindo a teoria <b>limitada</b> da culpabilidade, separa duas hipóteses.",
    "Se o erro está nos <b>fatos</b> — o pai ouve barulho de madrugada, vê um vulto e atira pensando ser um ladrão, mas era o filho —, há erro de tipo permissivo: erro plenamente justificado isenta de pena; erro que deriva de culpa gera punição por crime culposo.",
    "Se o erro está na <b>regra</b> — o agente sabe exatamente o que acontece, mas acha que a excludente permite mais do que permite —, há erro de proibição indireto, com as consequências do art. 21. Exemplo: no naufrágio, impedir à força que outro passageiro use o segundo bote para salvar a vida, porque se queria usá-lo para salvar bagagens. O estado de necessidade não autoriza sacrificar uma vida para salvar bens."]},
   { h:"Erro provocado e delito putativo", p:[
    "No erro <b>determinado por terceiro</b>, alguém induz o agente ao erro e o usa como instrumento: o médico que entrega veneno à enfermeira dizendo ser sedativo responde pelo homicídio doloso, como autor mediato. A enfermeira só responderia, por culpa, se tivesse como perceber o engano.",
    "No <b>delito putativo</b> ocorre o contrário: quem bate no carro alheio sem querer e foge achando que cometeu \"dano culposo\" não cometeu crime algum, porque o dano culposo não existe no CP. O delito putativo também aparece no erro sobre os fatos (transportar farinha achando que é cocaína) e no flagrante preparado (Súmula 145 do STF)."]}],
  quadro:{ titulo:"Descriminante putativa × delito putativo", head:["","Descriminante putativa","Delito putativo"], rows:[["O agente pensa","Que age licitamente","Que comete crime"],["Na realidade","Pratica fato típico e ilícito","Pratica fato atípico"],["Exemplo","Atira no filho pensando ser ladrão","Foge após \"dano culposo\""]]},
  pegadinhas:["Culpa imprópria: o agente quis o resultado, mas responde por culpa (art. 20, §1º, parte final).","No erro provocado, quem provoca responde; quem erra, só se o erro for culposo."]},

{ id:"erro-acidental", titulo:"Erros acidentais: pessoa, objeto e nexo causal", curto:"Acidental",
  rapido:["Erros acidentais não excluem dolo nem culpa: o agente responde pelo crime.",
    "Erro sobre a <b>pessoa</b> (art. 20, §3º): consideram-se as condições da vítima <b>visada</b>, não da atingida.",
    "Erro sobre o <b>nexo causal</b>: o resultado querido ocorre por caminho diferente do planejado — responde pelo crime consumado (inclui o dolo geral).",
    "Erro sobre o <b>objeto</b>: não está no CP; prevalece que o agente responde pelo que efetivamente fez."],
  teoria:[
   { h:"Erro sobre a pessoa e sobre o objeto", p:[
    "No erro sobre a pessoa (<i>error in persona</i>) não há falha de execução: o tiro acerta exatamente quem o agente mirou, mas ele <b>confundiu</b> a vítima. Quem quer matar o pai e mata o irmão, achando que era o pai, responde como se tivesse matado o pai, com a agravante de crime contra ascendente (teoria da equivalência).",
    "No erro sobre o objeto (<i>error in objecto</i>), o agente se engana sobre a coisa: entra na casa para furtar uma obra valiosa e leva um quadro barato, achando que era aquele. O erro é irrelevante para o dolo; prevalece que ele responde pelo furto do que efetivamente subtraiu."]},
   { h:"Erro sobre o nexo causal", p:[
    "O agente alcança o resultado que queria, mas por um curso causal diferente. No erro em sentido estrito, há um só ato: os tiros fazem a vítima cair na piscina, e ela morre afogada — homicídio consumado.",
    "No <b>dolo geral</b> (<i>aberratio causae</i>, erro sucessivo) há dois atos: o agente atira, pensa que matou, joga o \"corpo\" no rio para ocultá-lo, e a vítima morre afogada. Prevalece que responde por um só homicídio doloso consumado (princípio unitário), considerando-se o nexo causal que efetivamente ocorreu."]}],
  pegadinhas:["Erro sobre a pessoa: condições da vítima visada (inclusive para agravantes e qualificadoras).","Dolo geral: um só crime, homicídio doloso consumado."]},

{ id:"aberratio", titulo:"Erro na execução e resultado diverso do pretendido", curto:"Aberratio",
  rapido:["<b>Aberratio ictus</b> (art. 73): por erro ou acidente na execução, atinge <b>pessoa</b> diversa da visada — responde como se tivesse atingido a visada. Atingindo as duas: concurso formal (art. 70).",
    "<b>Aberratio criminis</b> (art. 74): atinge <b>bem jurídico de outra natureza</b> (coisa × pessoa) — responde pelo resultado produzido, a título de culpa, se previsto. Atingindo os dois: concurso formal.",
    "Ictus: pessoa × pessoa. Criminis: coisa × pessoa."],
  teoria:[
   { h:"Aberratio ictus", p:[
    "Aqui o agente não confunde a vítima: ele mira na pessoa certa, mas erra a pontaria ou um acidente desvia o resultado. Quem atira em Pedro e acerta Ricardo, que passava, responde como se tivesse acertado Pedro. O mesmo vale quando não há falha alguma, só acidente: a bomba posta no carro da vítima mata o marido dela, que usou o carro naquele dia.",
    "Como no erro sobre a pessoa, contam as condições da vítima <b>visada</b>: se o alvo era um menino de 13 anos e o tiro atingiu um rapaz de 19, incide o tratamento mais grave que o art. 121 reserva à vítima menor de 14 anos.",
    "Na <b>unidade simples</b> (só o terceiro é atingido), há um crime. Na <b>unidade complexa</b> (a vítima visada e o terceiro são atingidos), aplicam-se as regras do concurso formal: por exemplo, lesão dolosa contra a vítima visada e lesão culposa contra o terceiro."]},
   { h:"Aberratio criminis", p:[
    "O agente queria atingir uma coisa e atinge uma pessoa, ou o contrário. Quem atira uma pedra no carro para danificá-lo e acaba matando o dono responde só por homicídio culposo. Na situação inversa — atira na pessoa e acerta uma planta —, responde pela tentativa contra a pessoa, porque o dano culposo não é crime.",
    "Se atinge os dois (a pessoa visada e uma coisa), não há \"lesão dolosa + dano culposo\": como o dano culposo não existe, responde apenas pela lesão dolosa. Havendo dois crimes, aplica-se o concurso formal."]}],
  quadro:{ titulo:"Erros acidentais na execução", head:["","Erro sobre a pessoa","Aberratio ictus","Aberratio criminis"], rows:[["Base legal","Art. 20, §3º","Art. 73","Art. 74"],["O que ocorre","Confunde a vítima","Erra a execução e atinge outra pessoa","Atinge bem de natureza diversa"],["Consequência","Condições da vítima visada","Condições da vítima visada; se atinge ambas, concurso formal","Culpa pelo resultado produzido, se prevista; se atinge ambos, concurso formal"]]},
  pegadinhas:["Erro sobre a pessoa não tem falha de execução; aberratio ictus tem.","Pessoa visada, coisa atingida: tentativa contra a pessoa (dano culposo não é crime)."]},

{ id:"erro-proibicao", titulo:"Erro de proibição", curto:"Proibição",
  rapido:["O agente conhece a realidade, mas acredita que sua conduta é <b>permitida</b>.",
    "Inevitável: <b>isenta de pena</b> (exclui a culpabilidade). Evitável: reduz de <b>1/6 a 1/3</b> (art. 21).",
    "O <b>desconhecimento da lei</b> é inescusável — no máximo, atenuante (art. 65, II). O que isenta é o erro inevitável sobre a <b>ilicitude</b> do fato."],
  teoria:[
   { h:"Conceito e espécies", p:[
    "No erro de proibição o agente sabe exatamente o que faz; erra sobre a regra. O morador simples do interior que acha um relógio de ouro e fica com ele, sem saber que reter coisa achada é crime (art. 169, parágrafo único, II), sabe que o relógio não é seu e foi perdido por alguém — só não sabe que isso é proibido. Se ele pensasse que o relógio era o que <b>ele próprio</b> tinha perdido, o erro seria sobre a realidade: erro de tipo.",
    "O erro de proibição atinge a <b>potencial consciência da ilicitude</b>, elemento da culpabilidade; o dolo permanece. Por isso a consequência é isenção ou redução de pena, e não atipicidade.",
    "Espécies: <b>direto</b> (acha a conduta lícita), <b>indireto</b> (acha que uma excludente a autoriza ou erra sobre seus limites) e <b>mandamental</b> (nos crimes omissivos, erra sobre o dever de agir).",
    "O erro é <b>evitável</b> quando, nas circunstâncias, o agente podia atingir a consciência da ilicitude (art. 21, parágrafo único). A análise considera a pessoa concreta: escolaridade, meio social, acesso à informação."]}],
  quadro:{ titulo:"Erro de tipo × erro de proibição", head:["","Erro de tipo","Erro de proibição"], rows:[["Sobre o quê","Elementos do tipo (a realidade)","A ilicitude (a regra)"],["Fórmula","\"Não sei o que faço\"","\"Sei o que faço, acho que é permitido\""],["Elemento atingido","Dolo (fato típico)","Potencial consciência da ilicitude (culpabilidade)"],["Inevitável","Exclui dolo e culpa (atípico)","Isenta de pena"],["Evitável","Pune a culpa, se prevista","Reduz de 1/6 a 1/3"]]},
  pegadinhas:["Erro de proibição evitável: 1/6 a 1/3 (não confundir com 1/3 a 2/3).","Desconhecimento da lei ≠ erro sobre a ilicitude."]}
],
lei:[
{ art:"CP, arts. 20 e 21", nome:"Erro", sec:"erro-tipo", itens:[
  { id:"cp20", rot:"Art. 20", t:"O erro sobre <b class='g1'>elemento constitutivo do tipo legal</b> de crime <b class='g1'>exclui o dolo</b>, mas permite a punição por crime culposo, <b class='g3'>se previsto em lei</b>.<br>§ 1º - É isento de pena quem, por erro plenamente justificado pelas circunstâncias, <b class='g1'>supõe situação de fato que, se existisse, tornaria a ação legítima</b>. Não há isenção de pena quando o erro deriva de culpa e o fato é punível como crime culposo.<br>§ 2º - Responde pelo crime o <b class='g1'>terceiro que determina o erro</b>.<br>§ 3º - O erro quanto à pessoa contra a qual o crime é praticado não isenta de pena. Não se consideram, neste caso, as condições ou qualidades da vítima, <b class='g3'>senão as da pessoa contra quem o agente queria praticar o crime</b>.", c:["er1","er2","er3","er4"] },
  { id:"cp21", rot:"Art. 21", t:"O <b class='g1'>desconhecimento da lei é inescusável</b>. O erro sobre a ilicitude do fato, se <b class='g1'>inevitável, isenta de pena</b>; se evitável, poderá diminuí-la de <b class='g2'>um sexto a um terço</b>.<br>Parágrafo único - Considera-se evitável o erro se o agente atua ou se omite sem a consciência da ilicitude do fato, quando lhe era possível, nas circunstâncias, ter ou atingir essa consciência.", c:["er5","er6"] }
]},
{ art:"CP, arts. 73 e 74", nome:"Erro na execução e resultado diverso", sec:"aberratio", itens:[
  { id:"cp73", rot:"Art. 73", t:"Quando, por <b class='g1'>acidente ou erro no uso dos meios de execução</b>, o agente, ao invés de atingir a pessoa que pretendia ofender, atinge pessoa diversa, responde <b class='g3'>como se tivesse praticado o crime contra aquela</b>, atendendo-se ao disposto no § 3º do art. 20 deste Código. No caso de ser também atingida a pessoa que o agente pretendia ofender, aplica-se a regra do art. 70 deste Código.", c:["er7"] },
  { id:"cp74", rot:"Art. 74", t:"Fora dos casos do artigo anterior, quando, por acidente ou erro na execução do crime, sobrevém <b class='g1'>resultado diverso do pretendido</b>, o agente responde por culpa, se o fato é previsto como crime culposo; se ocorre também o resultado pretendido, aplica-se a regra do art. 70 deste Código.", c:["er8"] }
]}
],
juris:[],
cards:[
{ id:"er1", tipo:"caso", sec:"erro-tipo", f:"Caçador atira num vulto achando ser um javali; era uma pessoa. O erro era evitável. Qual o crime?", v:"<b>Homicídio culposo</b>: erro de tipo evitável exclui o dolo e permite a punição por culpa (art. 20).", lei:["cp20"] },
{ id:"er2", tipo:"caso", sec:"putativas", f:"À noite, alguém vê o vizinho com algo na mão vindo em sua direção, acha que é uma arma e atira. Era um celular. Erro plenamente justificado. Consequência?", v:"<b>Isento de pena</b> — legítima defesa putativa por erro de tipo permissivo (art. 20, §1º). Se o erro fosse evitável: homicídio culposo.", lei:["cp20"] },
{ id:"er3", tipo:"caso", sec:"putativas", f:"Médico entrega à enfermeira seringa com veneno dizendo ser remédio; ela aplica e o paciente morre. Quem responde?", v:"O <b>médico</b> (terceiro que determinou o erro — art. 20, §2º; autoria mediata). A enfermeira, se não havia como perceber, não responde.", lei:["cp20"] },
{ id:"er4", tipo:"caso", sec:"erro-acidental", f:"Quer matar o pai e mata, por engano, um desconhecido muito parecido com ele. Incide a agravante de crime contra ascendente?", v:"<b>Sim.</b> Erro sobre a pessoa: consideram-se as qualidades da vítima visada (art. 20, §3º).", lei:["cp20"] },
{ id:"er5", tipo:"numero", sec:"erro-proibicao", f:"Erro de proibição evitável: qual a redução?", v:"<b>1/6 a 1/3</b> (art. 21). Inevitável: isenta de pena.", lei:["cp21"] },
{ id:"er6", tipo:"distincao", sec:"erro-proibicao", f:"Erro de tipo × erro de proibição.", v:"<b>Tipo</b>: erro sobre a realidade (\"não sei o que faço\") — exclui o dolo. <b>Proibição</b>: erro sobre a ilicitude (\"sei o que faço, acho permitido\") — atinge a culpabilidade.", lei:["cp20","cp21"] },
{ id:"er7", tipo:"caso", sec:"aberratio", f:"Atira no desafeto, erra e mata quem estava ao lado. Qual o crime? E se atingir os dois?", v:"<b>Aberratio ictus</b>: responde como se tivesse atingido o desafeto (art. 73). Atingindo os dois: <b>concurso formal</b> (art. 70).", lei:["cp73"] },
{ id:"er8", tipo:"caso", sec:"aberratio", f:"Atira pedra para quebrar a vitrine e acerta um pedestre. Qual o crime?", v:"<b>Aberratio criminis</b>: lesão corporal <b>culposa</b> (art. 74). Se quebra a vitrine e fere a pessoa: concurso formal.", lei:["cp74"] },
{ id:"er9", tipo:"ce", sec:"erro-proibicao", f:"Certo ou errado: o desconhecimento da lei isenta de pena quando o agente é pessoa simples.", v:"<b>Errado.</b> O desconhecimento da lei é inescusável (art. 21); pode, no máximo, ser atenuante (art. 65, II). Isenta o erro inevitável sobre a <b>ilicitude</b>.", lei:["cp21"] },
{ id:"er10", tipo:"distincao", sec:"putativas", f:"Teoria limitada da culpabilidade (adotada pelo CP): como trata a descriminante putativa?", v:"Erro sobre os <b>pressupostos fáticos</b> da excludente = erro de tipo permissivo. Erro sobre a <b>existência ou limites</b> da excludente = erro de proibição indireto.", lei:["cp20","cp21"] },
{ id:"er11", tipo:"caso", sec:"erro-tipo", f:"Cidadão ofende, numa repartição, servidor uniformizado atrás do balcão sem perceber que ele é funcionário público. Erro evitável. Responde por desacato?", v:"<b>Não.</b> Erro de tipo evitável exclui o dolo e só permite punir a culpa — e não existe desacato culposo.", lei:["cp20"] },
{ id:"er12", tipo:"ce", sec:"erro-tipo", f:"Certo ou errado: o erro de tipo evitável mantém o dolo e reduz a pena.", v:"<b>Errado.</b> Todo erro de tipo essencial exclui o dolo; o evitável permite punição por culpa, se prevista. Redução de pena é do erro de proibição evitável.", lei:["cp20"] },
{ id:"er13", tipo:"distincao", sec:"putativas", f:"Descriminante putativa × delito putativo.", v:"<b>Descriminante putativa</b>: pensa agir licitamente, mas o fato é típico e ilícito. <b>Delito putativo</b>: pensa cometer crime, mas o fato é atípico.", lei:["cp20"] },
{ id:"er14", tipo:"caso", sec:"putativas", f:"No naufrágio, José sabe de tudo o que acontece, mas impede à força Marcelo de usar o segundo bote, porque quer salvar suas malas. Que erro há?", v:"<b>Erro de proibição indireto</b>: erro sobre os limites do estado de necessidade (não se sacrifica vida para salvar bens).", lei:["cp21"] },
{ id:"er15", tipo:"distincao", sec:"erro-acidental", f:"Erro sobre a pessoa × aberratio ictus.", v:"<b>Erro sobre a pessoa</b>: confunde a vítima, execução perfeita. <b>Aberratio ictus</b>: mira a pessoa certa, mas erra a execução ou um acidente desvia o golpe.", lei:["cp20","cp73"] },
{ id:"er16", tipo:"caso", sec:"erro-acidental", f:"O agente atira na vítima, pensa que ela morreu e joga o corpo no rio; ela morre afogada. Quantos crimes?", v:"<b>Um homicídio doloso consumado</b> (dolo geral, princípio unitário).", lei:["cp20"] },
{ id:"er17", tipo:"caso", sec:"aberratio", f:"Atira para matar um menino de 13 anos, erra e mata um rapaz de 19. Incide o tratamento mais grave do homicídio contra menor de 14 anos?", v:"<b>Sim.</b> Na aberratio ictus consideram-se as condições da vítima visada (art. 73 c/c art. 20, §3º).", lei:["cp73"] },
{ id:"er18", tipo:"caso", sec:"aberratio", f:"Atira na pessoa para matá-la, erra e acerta apenas uma vidraça. Por qual crime responde?", v:"<b>Tentativa de homicídio.</b> Dano culposo não é crime.", lei:["cp74"] },
{ id:"er19", tipo:"caso", sec:"erro-proibicao", f:"Homem simples acha um relógio de ouro na rua e fica com ele, sem saber que isso é crime. Que erro há?", v:"<b>Erro de proibição</b>: conhece a realidade (coisa alheia perdida), mas acha a conduta lícita. Se inevitável, isenta; se evitável, reduz de 1/6 a 1/3.", lei:["cp21"] }
],
questoes:[]
};

/* ============================ CONCURSO DE PESSOAS ============================ */
T.penal_concurso = {
meta:{ tema:"Concurso de Pessoas", atualizado:"15/10/2026", foco:"Conceito e teorias, espécies, requisitos, autoria (domínio do fato, coautoria, autoria colateral e incerta), autoria mediata, participação e acessoriedade, comunicabilidade das circunstâncias, cooperação dolosamente distinta, crimes culposos e multidão delinquente." },
secoes:[
{ id:"conceito", titulo:"Conceito, teorias e espécies", curto:"Conceito",
  rapido:["Concurso de pessoas é a <b>colaboração de duas ou mais pessoas</b> para a mesma infração penal (crime ou contravenção). Regras gerais: <b>arts. 29 a 31 do CP</b>.",
    "O CP adota a teoria <b>monista (unitária)</b>: há um só crime para todos, mas cada um responde <b>na medida de sua culpabilidade</b> — por isso se fala em monismo <b>temperado</b> (ou mitigado).",
    "A própria lei abre <b>exceções pluralistas</b>, criando crimes diferentes para quem participa do mesmo fato: aborto (gestante × terceiro), corrupção (passiva × ativa), falso testemunho (testemunha × quem dá ou promete vantagem)."],
  teoria:[
   { h:"Três maneiras de explicar o crime cometido por várias pessoas", p:[
    "A doutrina discutiu se, quando várias pessoas colaboram, existe um só crime ou vários. A teoria <b>pluralista</b> diz que cada participante comete o seu próprio crime, com conduta, dolo e resultado próprios. A teoria <b>dualista</b> separa dois crimes: um para quem executa (autores) e outro para quem colabora de forma secundária (partícipes).",
    "O Código Penal ficou com a teoria <b>monista</b>: o fato é um só e todos respondem pelo mesmo tipo penal. Isso não significa pena igual. O art. 29 manda punir cada um <b>na medida de sua culpabilidade</b>, e o próprio artigo traz duas válvulas de ajuste: a participação de menor importância (§1º) e a cooperação dolosamente distinta (§2º). Por isso a doutrina chama o sistema de monista <b>temperado</b>.",
    "Em alguns casos o legislador preferiu tipificar separadamente as condutas de quem participa do mesmo acontecimento — são as <b>exceções pluralistas</b>. Exemplos clássicos: a gestante que consente no aborto responde pelo art. 124, e quem o provoca com o consentimento dela, pelo art. 126; o funcionário que recebe vantagem indevida comete corrupção passiva (art. 317) e o particular que a oferece, corrupção ativa (art. 333); a testemunha que mente comete falso testemunho (art. 342) e quem lhe dá ou promete vantagem para isso, o crime do art. 343."]},
   { h:"Concurso eventual e concurso necessário", p:[
    "No concurso <b>eventual</b> o tipo penal pode ser cometido por uma só pessoa (crimes <b>monossubjetivos</b>), mas no caso concreto várias resolveram cometê-lo juntas — furto, roubo e homicídio são exemplos. É aqui que se aplicam as regras dos arts. 29 a 31.",
    "No concurso <b>necessário</b> o próprio tipo exige mais de um agente (crimes <b>plurissubjetivos</b>). As condutas podem ser <b>paralelas</b> (todos somam esforços para o mesmo fim, como na associação criminosa do art. 288), <b>convergentes</b> (as condutas se encontram e produzem juntas o resultado, como na bigamia) ou <b>contrapostas</b> (uns agem contra os outros, como na rixa)."]}],
  quadro:{ titulo:"Teorias sobre o concurso de pessoas", head:["Teoria","Ideia central","No Brasil"], rows:[["Pluralista","Cada participante comete um crime próprio","Só nas exceções previstas em lei"],["Dualista","Um crime para autores, outro para partícipes","Não adotada"],["Monista (unitária)","Crime único para todos, pena conforme a culpabilidade de cada um","Regra do art. 29 (monismo temperado)"]]},
  pegadinhas:["Monismo não significa pena igual: cada um responde na medida da sua culpabilidade.","Nas exceções pluralistas não se aplica o art. 29: cada um responde pelo tipo próprio (ex.: corruptor e corrompido)."]},

{ id:"requisitos", titulo:"Requisitos do concurso de pessoas", curto:"Requisitos",
  rapido:["São cinco: <b>pluralidade de agentes e de condutas</b>, <b>relevância causal</b> de cada contribuição, <b>liame subjetivo</b>, <b>identidade de infração</b> e <b>existência de fato punível</b> (ao menos tentado).",
    "O liame subjetivo dispensa acordo prévio: basta que um <b>adira conscientemente</b> à conduta do outro. Sem liame, não há concurso (pode haver autoria colateral).",
    "A colaboração tem de ocorrer <b>antes ou durante</b> a execução. Ajuda depois da consumação só é participação se foi <b>combinada antes</b>; do contrário, pode ser favorecimento (arts. 348 e 349) ou receptação."],
  teoria:[
   { h:"Pluralidade de agentes", p:[
    "É preciso que duas ou mais pessoas contribuam para o fato. Prevalece que, para haver concurso propriamente dito, os colaboradores devem ter algum discernimento: quem usa uma pessoa sem nenhuma capacidade de entender o que faz (um doente mental grave, uma criança pequena) não age em concurso com ela — é <b>autor mediato</b>, e o executor é mero instrumento.",
    "Situação diferente é a do adolescente que entende o que faz e decide participar do crime com um adulto. Ele não é instrumento: responde por ato infracional segundo o ECA, e o adulto responde pelo crime, inclusive com as majorantes ou qualificadoras de concurso de pessoas, quando a lei as prevê (roubo, furto qualificado). A doutrina chama esse caso de <b>concurso impróprio</b> ou aparente, porque só um dos envolvidos é culpável."]},
   { h:"Relevância causal", p:[
    "Cada contribuição precisa ter influído de alguma forma no resultado. A colaboração que em nada interfere no fato é penalmente irrelevante — é a chamada <b>participação inócua</b>: emprestar uma faca a quem acaba matando com um revólver, ou incentivar alguém que já estava firmemente decidido e agiria do mesmo modo.",
    "A contribuição também tem de ser <b>anterior à consumação</b>. Quem só aparece depois do crime pronto não concorre para ele. A exceção é a ajuda posterior <b>combinada antes</b>: quem promete esperar o comparsa na porta para a fuga reforça a decisão criminosa desde o início e é partícipe. Se a ajuda não foi combinada e surge só depois, o caso pode ser de favorecimento pessoal (art. 348), favorecimento real (art. 349) ou receptação, conforme o que se faz."]},
   { h:"Liame subjetivo, identidade de infração e fato punível", p:[
    "O <b>liame subjetivo</b> (ou concurso de vontades) é a consciência de que se está colaborando com a conduta de outra pessoa. Não exige combinação prévia nem que o autor saiba da ajuda: a empregada que, sabendo do plano de um ladrão, deixa a porta destrancada é partícipe do furto, ainda que ele nunca tenha falado com ela. Sem esse vínculo, condutas que simplesmente coincidem não formam concurso.",
    "A <b>identidade de infração</b> decorre da teoria monista: o fato, juridicamente, é um só e todos respondem por ele. Se vinte pessoas colaboram para um homicídio — uma consegue a arma, outra dirige o carro, outra atrai a vítima —, todas respondem por homicídio.",
    "Por fim, é preciso que exista <b>fato punível</b>. O art. 31 diz que o ajuste, a determinação, a instigação e o auxílio não são puníveis se o crime não chega, pelo menos, a ser <b>tentado</b>. A ressalva \"salvo disposição expressa em contrário\" lembra que alguns atos preparatórios são crimes autônomos, como a associação criminosa (art. 288)."]}],
  quadro:{ titulo:"Ajuda depois da consumação", head:["Situação","Consequência"], rows:[["Ajuda prometida antes do crime e prestada depois (ex.: carro para a fuga)","Participação no crime"],["Ajuda decidida só depois, para esconder o autor","Favorecimento pessoal (art. 348)"],["Ajuda decidida só depois, para assegurar o proveito do crime","Favorecimento real (art. 349)"],["Adquirir ou ocultar, depois, coisa que sabe ser produto de crime","Receptação (art. 180)"]]},
  pegadinhas:["Liame subjetivo não exige acordo prévio nem que o autor conheça a ajuda.","Ajuda após a consumação, sem ajuste anterior, não é participação.","Atos preparatórios só são punidos quando a lei os transforma em crime autônomo (ex.: art. 288)."]},

{ id:"autoria", titulo:"Autoria, coautoria e autoria colateral", curto:"Autoria",
  rapido:["O Brasil adota o conceito <b>restritivo</b> de autor: autor e partícipe são figuras diferentes. Pelo critério <b>objetivo-formal</b>, autor é quem realiza o verbo do tipo.",
    "A teoria do <b>domínio do fato</b> (Welzel, desenvolvida por Roxin) complementa: também é autor quem controla o crime sem executá-lo — o mandante, o autor mediato, quem tem função essencial no plano.",
    "<b>Coautoria</b> exige liame. Sem liame, há <b>autoria colateral</b>; se não se sabe qual dos dois causou o resultado, é <b>autoria incerta</b> e ambos respondem por <b>tentativa</b>."],
  teoria:[
   { h:"Quem é autor", p:[
    "O conceito <b>extensivo</b> de autor, ligado ao pensamento causal, tratava como autor qualquer um que desse causa ao crime, sem distinguir autor e partícipe. A teoria <b>subjetiva</b> tentou separá-los pela intenção: autor quer o fato como próprio (<i>animus auctoris</i>); partícipe quer o fato como alheio (<i>animus socii</i>).",
    "O conceito <b>restritivo</b>, adotado pelo CP, separa as duas figuras. Para dizer quem é autor, surgiram três critérios. Pelo <b>objetivo-formal</b>, autor é quem pratica o verbo do tipo (\"matar\", \"subtrair\"); os demais são partícipes. O problema é que o mandante — o chefe que organiza tudo — seria mero partícipe, e o critério não explica a autoria mediata. Pelo <b>objetivo-material</b>, autor é quem dá a contribuição mais importante, independentemente de praticar o verbo.",
    "Pela teoria do <b>domínio do fato</b>, autor é quem tem o controle sobre o se e o como do crime: pode decidir executá-lo, interrompê-lo ou mudar seu rumo. Esse domínio aparece de três formas: <b>domínio da ação</b> (quem executa pessoalmente), <b>domínio da vontade</b> (quem controla um executor que é mero instrumento — autoria mediata) e <b>domínio funcional</b> (quem cumpre uma tarefa essencial num plano dividido entre os comparsas). O partícipe, para essa teoria, colabora sem ter o controle do fato.",
    "Na doutrina predomina a leitura de que o CP adotou o critério objetivo-formal, completado pela teoria do domínio do fato para explicar a autoria intelectual e a autoria mediata. O domínio do fato <b>não se aplica aos crimes culposos</b>, porque neles ninguém controla finalisticamente um resultado que não queria."]},
   { h:"Coautoria", p:[
    "Há coautoria quando duas ou mais pessoas, ligadas pelo liame subjetivo, realizam o fato como autores. Ela pode ser <b>direta (material)</b>, quando todos praticam a mesma conduta — dois agressores que espancam a vítima —, ou <b>funcional (parcial)</b>, quando as tarefas são divididas e se somam — um segura a vítima enquanto o outro bate. No roubo a banco, todos que entram armados e anunciam o assalto são coautores; quem apenas empresta o carro da fuga é partícipe.",
    "Pontos que caem em prova: cabe coautoria nos <b>crimes próprios</b> se o outro também tem a qualidade exigida ou sabe que o comparsa a tem (art. 30); não cabe coautoria nos <b>crimes de mão própria</b> (como o falso testemunho), que só podem ser executados pessoalmente pelo sujeito indicado na lei, embora neles caiba participação; nos <b>crimes omissivos</b> a doutrina diverge — a posição ligeiramente majoritária admite participação (alguém instiga o outro a não socorrer), mas não coautoria."]},
   { h:"Autoria colateral e autoria incerta", p:[
    "Na <b>autoria colateral</b> duas pessoas querem o mesmo resultado e agem ao mesmo tempo, mas uma não sabe da outra — falta o liame. Exemplo: A e B, sem combinarem nada, esperam C escondidos e atiram ao mesmo tempo. Não há concurso de pessoas: cada um responde pelo que sua conduta causou. Se a perícia mostra que o tiro de A matou, A responde por homicídio consumado e B por tentativa.",
    "Se a perícia não consegue dizer de qual arma saiu o disparo fatal, fala-se em <b>autoria incerta</b>. Como não se pode atribuir a morte a nenhum dos dois, ambos respondem por <b>tentativa de homicídio</b>. Atenção à diferença: se A e B estivessem <b>combinados</b>, haveria coautoria, e os dois responderiam por homicídio consumado, pouco importando de quem foi a bala."]}],
  quadro:{ titulo:"Critérios para definir o autor", head:["Teoria","Quem é autor","Ponto fraco ou uso"],
    rows:[["Objetivo-formal","Quem pratica o verbo do tipo","Não explica o mandante nem a autoria mediata"],["Objetivo-material","Quem dá a contribuição mais relevante","Critério vago"],["Domínio do fato","Quem controla o crime (ação, vontade ou função)","Complementa o objetivo-formal; não vale para crime culposo"]]},
  pegadinhas:["Crime de mão própria: não admite coautoria, mas admite participação.","Autoria colateral com perícia inconclusiva (autoria incerta): todos respondem por tentativa.","Com liame subjetivo, não importa de quem partiu o golpe fatal: todos respondem pelo crime consumado."]},

{ id:"mediata", titulo:"Autoria mediata", curto:"Autoria mediata",
  rapido:["Autor mediato é quem usa outra pessoa como <b>instrumento</b> para cometer o crime; o executor (autor imediato) age sem culpabilidade ou sem dolo.",
    "Hipóteses principais: <b>erro</b> provocado no executor, <b>coação moral irresistível</b> e uso de <b>inimputável sem discernimento</b>.",
    "<b>Nunca</b> há concurso de pessoas entre autor mediato e autor imediato: só o mediato responde. Na coação <b>física</b> irresistível o coator é autor <b>direto</b>, porque o coagido nem chega a ter conduta."],
  teoria:[
   { h:"As três formas mais cobradas", p:[
    "<b>Erro do executor</b>: o mandante engana quem executa. O médico entrega à enfermeira uma injeção dizendo que é analgésico, mas o conteúdo é veneno. A enfermeira causa a morte, mas não dirige sua conduta a esse resultado; quem tem o domínio do fato é o médico. O art. 20, §2º, do CP manda responder pelo crime o terceiro que determina o erro.",
    "<b>Coação moral irresistível</b>: o executor sabe o que faz, mas é ameaçado de modo que não se pode exigir outra conduta — por exemplo, aplica o veneno sob a ameaça de que matarão sua filha. Ele age com dolo, mas sem culpabilidade (art. 22); responde só o coator.",
    "<b>Inimputabilidade do executor</b>: o agente se vale de quem não tem nenhum discernimento — um doente mental grave, uma criança muito pequena que acha que a arma é de brinquedo. Se o executor, embora inimputável, entende o que faz e decide participar (o adolescente de 17 anos que topa o plano), não há autoria mediata, mas o concurso impróprio visto em Requisitos."]},
   { h:"Crimes próprios, mão própria e autoria por determinação", p:[
    "Nos <b>crimes próprios</b>, a autoria mediata é possível desde que o <b>autor mediato</b> tenha a qualidade exigida pelo tipo. Um servidor público que coage um particular, de forma irresistível, a retirar computadores da repartição pode responder por peculato como autor mediato.",
    "Se a situação se inverte — o particular coage a servidora —, o particular não tem a qualidade de funcionário e não pode ser autor mediato de peculato. Para não deixá-lo impune, parte da doutrina construiu a figura da <b>autoria por determinação</b>: pune-se quem determina o fato e tem sobre ele domínio equivalente ao do autor, embora não seja autor nem partícipe em sentido técnico.",
    "Nos <b>crimes de mão própria</b> a regra é não admitir autoria mediata, porque a conduta só pode ser realizada pessoalmente (ninguém presta depoimento falso \"por meio\" de outro). Há quem a admita em casos excepcionais, e a autoria por determinação também é lembrada nesse ponto."]}],
  pegadinhas:["Não existe concurso de pessoas entre autor mediato e imediato.","Coação física irresistível: coator é autor direto, não mediato (o coagido não tem conduta).","Inimputável com discernimento que adere ao crime não é instrumento: não há autoria mediata."]},

{ id:"participacao", titulo:"Participação e acessoriedade", curto:"Participação",
  rapido:["Partícipe colabora <b>sem realizar o verbo do tipo</b> e sem dominar o fato. Pode ser <b>moral</b> (induzimento ou instigação) ou <b>material</b> (auxílio, também chamado cumplicidade).",
    "O partícipe é punido por <b>adequação típica mediata</b>: o art. 29 funciona como norma de extensão do tipo.",
    "Prevalece a <b>acessoriedade limitada</b>: basta que o fato principal seja <b>típico e ilícito</b>. Participação de menor importância reduz a pena de <b>1/6 a 1/3</b> (só para partícipe)."],
  teoria:[
   { h:"Formas de participação", p:[
    "Na participação <b>moral</b>, o partícipe atua sobre a mente do autor. <b>Induzir</b> é fazer nascer a ideia criminosa em quem não tinha pensado nela; <b>instigar</b> é reforçar uma ideia que já existia. Na participação <b>material</b>, o partícipe presta ajuda concreta: empresta a arma, fornece informações sobre a rotina da vítima, garante a fuga combinada.",
    "Como o partícipe não pratica a conduta descrita no tipo (quem empresta a arma não \"mata alguém\"), sua punição depende de uma norma que estenda o alcance do tipo penal. Essa norma é o art. 29 (\"quem, de qualquer modo, concorre para o crime\"). Diz-se que há <b>adequação típica mediata</b> ou por extensão, como ocorre também na tentativa (art. 14, II)."]},
   { h:"Teorias da acessoriedade", p:[
    "A participação é acessória: depende de um fato principal praticado pelo autor. O quanto esse fato precisa ter de \"crime\" é explicado por quatro teorias. Pela <b>mínima</b>, basta o fato típico — o partícipe seria punido mesmo que o autor agisse em legítima defesa, o que é absurdo. Pela <b>limitada</b>, o fato principal precisa ser <b>típico e ilícito</b>. Pela <b>máxima</b>, precisa ser típico, ilícito e praticado por autor culpável — o adulto que ajuda um adolescente a roubar ficaria impune. Pela <b>hiperacessoriedade</b>, exige-se ainda que o autor seja efetivamente punido — a morte do autor livraria o partícipe.",
    "O CP não escolheu expressamente nenhuma delas, mas a doutrina majoritária entende que o sistema brasileiro se ajusta à <b>acessoriedade limitada</b>. Consequência: se o autor agiu em legítima defesa (fato lícito), o partícipe também não responde; se o autor é inimputável, mas o fato é típico e ilícito, o partícipe responde normalmente."]},
   { h:"Situações especiais", p:[
    "<b>Menor importância</b> (art. 29, §1º): a pena do partícipe cuja contribuição foi pequena pode ser reduzida de um sexto a um terço. A redução não se aplica ao coautor.",
    "<b>Participação inócua</b>: a colaboração que não influiu no resultado não é punida.",
    "<b>Participação em cadeia</b>: A empresta a arma a B para que ele a repasse a C, que mata D. A e B são partícipes, por auxílio material sucessivo.",
    "<b>Participação em crime omissivo impróprio</b>: a doutrina admite a participação de quem devia e podia evitar o resultado (art. 13, §2º) em certos casos, e de quem instiga o garantidor a se omitir.",
    "<b>Participação em ação alheia</b>: o funcionário que, por descuido, deixa a repartição aberta e permite que um particular a furte não é partícipe do furto, porque falta liame. Cada um responde por seu crime: o particular por furto e o funcionário por <b>peculato culposo</b> (art. 312, §2º)."]}],
  quadro:{ titulo:"Teorias da acessoriedade", head:["Teoria","O fato principal precisa ser","Observação"], rows:[["Mínima","Típico","Puniria o partícipe mesmo com o autor em legítima defesa"],["Limitada","Típico e ilícito","Prevalece no Brasil"],["Máxima","Típico, ilícito e de autor culpável","Livraria quem ajuda um inimputável"],["Hiperacessoriedade","Típico, ilícito, culpável e punido","Livraria o partícipe se o autor morresse"]]},
  pegadinhas:["Induzir cria a ideia; instigar reforça a que já existia.","Redução de 1/6 a 1/3 por menor importância é só para o partícipe, nunca para o coautor.","Pela acessoriedade limitada, a inimputabilidade do autor não beneficia o partícipe."]},

{ id:"regras", titulo:"Comunicabilidade das circunstâncias", curto:"Comunicabilidade",
  rapido:["Art. 30: <b>não se comunicam</b> as circunstâncias e condições de caráter pessoal, <b>salvo quando elementares</b> do crime.",
    "<b>Elementares</b> (objetivas ou subjetivas) sempre se comunicam, desde que o comparsa as <b>conheça</b>. <b>Circunstâncias objetivas</b> se comunicam se conhecidas. <b>Circunstâncias e condições pessoais</b> não se comunicam.",
    "Particular que, sabendo, ajuda funcionário a se apropriar de bem da repartição responde por <b>peculato</b>; se não sabia da condição de funcionário, responde por <b>furto</b>."],
  teoria:[
   { h:"Elementar, circunstância e condição pessoal", p:[
    "<b>Elementar</b> é o dado sem o qual o crime deixa de existir ou se transforma em outro: \"alguém\" no homicídio, \"violência ou grave ameaça\" no roubo, \"funcionário público\" no peculato. <b>Circunstância</b> é o dado acessório que só aumenta ou diminui a pena: o motivo torpe qualifica o homicídio, mas sem ele o homicídio continua existindo.",
    "Tanto elementares quanto circunstâncias podem ser <b>objetivas</b> (ligadas ao fato: meio, modo, lugar, tempo — a emboscada, o emprego de violência) ou <b>subjetivas</b> (ligadas à pessoa do agente: motivo, relação com a vítima, a condição de funcionário). Já as <b>condições pessoais</b> são qualidades do agente que existem independentemente do crime, como ser menor de 21 anos ou reincidente."]},
   { h:"As três regras, com exemplos", p:[
    "<b>Circunstâncias e condições pessoais não se comunicam.</b> Se A contrata B para matar o homem que estuprou a filha de A, o relevante valor moral (art. 121, §1º) favorece só A. B, que mata por dinheiro, não recebe o privilégio.",
    "<b>Circunstâncias objetivas se comunicam</b> se tiverem entrado na esfera de conhecimento do comparsa. Se B avisa ao mandante A que vai agir de emboscada e A concorda, a qualificadora se estende a A. Se B usa a emboscada sem que A saiba, ela não alcança A.",
    "<b>Elementares sempre se comunicam</b>, sejam objetivas ou subjetivas, também com a condição de serem conhecidas. Júlio, servidor, chama o amigo Marcelo para retirarem computadores da repartição, aproveitando as facilidades do cargo. Se Marcelo sabe que Júlio é funcionário, ambos respondem por <b>peculato-furto</b> (art. 312, §1º); se não sabe, Marcelo responde por <b>furto</b>. No infanticídio, prevalece que o estado puerperal, elementar do tipo, comunica-se ao terceiro que ajuda a mãe."]}],
  quadro:{ titulo:"O que se comunica ao comparsa (art. 30)", head:["Dado","Comunica?","Condição"], rows:[["Elementar objetiva ou subjetiva","Sim","Que o comparsa conheça"],["Circunstância objetiva","Sim","Que o comparsa conheça"],["Circunstância subjetiva (pessoal)","Não","—"],["Condição pessoal (ex.: menoridade relativa, reincidência)","Não","—"]]},
  pegadinhas:["\"Funcionário público\" é elementar do peculato: comunica-se ao particular que sabe da condição.","Motivo do crime é circunstância pessoal: não se estende ao comparsa.","Mesmo a elementar só se comunica se o comparsa a conhecer."]},

{ id:"distinta", titulo:"Cooperação dolosamente distinta, culpa e multidão", curto:"Casos especiais",
  rapido:["<b>Cooperação dolosamente distinta</b> (art. 29, §2º): quem quis participar de crime menos grave responde por ele; a pena é aumentada <b>até a metade</b> se o resultado mais grave era <b>previsível</b>.",
    "Em crime <b>culposo</b>, a doutrina majoritária admite <b>coautoria</b>, mas diverge quanto à participação; não há concurso entre quem age com dolo e quem age com culpa.",
    "<b>Multidão delinquente</b>: há concurso de pessoas por adesão tácita. Quem age sob influência da multidão tem <b>atenuante</b> (art. 65, III, e); quem a lidera tem <b>agravante</b> (art. 62, I)."],
  teoria:[
   { h:"Cooperação dolosamente distinta", p:[
    "Também chamada de participação em crime menos grave ou desvio subjetivo de conduta. Dois combinam um crime, mas, durante a execução, um deles resolve cometer outro, mais grave, sem a adesão do comparsa. Exemplo: Camila e Herval combinam furtar uma casa que acreditam vazia. Camila espera no carro; lá dentro, Herval encontra seguranças, mata os dois e leva os bens. Houve latrocínio, mas Camila só quis o furto.",
    "Pela primeira parte do §2º, Camila responde pelo <b>furto</b>. Se o resultado mais grave era <b>previsível</b> para ela — sabia que Herval estava armado e que poderia haver seguranças —, a pena do furto (não a do latrocínio) é aumentada <b>até a metade</b>, conforme o grau de previsibilidade. Se ela tivesse <b>aceitado</b> o risco do resultado mais grave, já não seria cooperação distinta: haveria dolo eventual quanto ao crime mais grave."]},
   { h:"Concurso de pessoas em crimes culposos", p:[
    "Para a doutrina majoritária, é possível <b>coautoria</b> em crime culposo: duas pessoas, de comum acordo, praticam juntas uma conduta imprudente — por exemplo, atiram um móvel do décimo andar sem querer ferir ninguém e acabam ferindo um pedestre.",
    "A <b>participação</b> é mais controvertida. Não cabe participação <b>dolosa</b> em crime culposo, porque não há vontade comum: quem quer o resultado e o executor descuidado não estão ligados pelo mesmo elemento subjetivo — cada um responde por sua conduta. Quanto à participação <b>culposa</b> (alguém, por descuido, incentiva outro a agir sem cuidado), parte da doutrina admite e parte nega; há decisões do STJ no sentido de admitir a coautoria em crime culposo, mas não a participação. Na prova, siga o enunciado e a posição que ele cobra.",
    "Também por causa da teoria monista, se os réus agiram em concurso, não se admite condenar um por homicídio doloso e outro por homicídio culposo pelo mesmo fato: o elemento subjetivo precisa ser homogêneo."]},
   { h:"Multidão delinquente", p:[
    "Linchamentos, brigas de torcidas, saques de cargas tombadas: muitas pessoas praticam o mesmo crime, quase sempre sem acordo prévio, aderindo umas às condutas das outras. Prevalece que há <b>concurso de pessoas</b>, porque existe liame subjetivo, ainda que tácito.",
    "O CP leva em conta a pressão do grupo: quem comete o crime sob a influência de multidão em tumulto, se não o provocou, tem pena atenuada (art. 65, III, e). Em sentido oposto, quem promove ou organiza a cooperação no crime ou dirige a atividade dos demais tem pena agravada (art. 62, I)."]}],
  quadro:{ titulo:"Cooperação dolosamente distinta (art. 29, §2º)", head:["Situação do comparsa","Responde por","Pena"], rows:[["Não previa nem podia prever o crime mais grave","Crime menos grave","Pena do crime menos grave"],["Podia prever o crime mais grave","Crime menos grave","Aumentada até a metade"],["Aceitou o risco do crime mais grave","Crime mais grave","Pena do crime mais grave (dolo eventual)"]]},
  pegadinhas:["O aumento de até metade incide sobre a pena do crime menos grave, não sobre a do mais grave.","Não há concurso entre um agente doloso e outro culposo pelo mesmo fato.","Multidão: atenuante para quem foi influenciado (art. 65, III, e), agravante para quem lidera (art. 62, I)."]}
],
lei:[
{ art:"CP, arts. 29 a 31", nome:"Concurso de pessoas", sec:"requisitos", itens:[
  { id:"cp29", rot:"Art. 29", t:"Quem, <b class='g1'>de qualquer modo, concorre para o crime</b> incide nas penas a este cominadas, <b class='g3'>na medida de sua culpabilidade</b>.<br>§ 1º - Se a <b class='g1'>participação for de menor importância</b>, a pena pode ser diminuída de <b class='g2'>um sexto a um terço</b>.<br>§ 2º - Se algum dos concorrentes <b class='g1'>quis participar de crime menos grave</b>, ser-lhe-á aplicada a pena deste; essa pena será aumentada <b class='g2'>até metade</b>, na hipótese de ter sido <b class='g3'>previsível o resultado mais grave</b>.", c:["cp1c","cp2c","cp3c","cp4c","cp11c","cp15c"] },
  { id:"cp30", rot:"Art. 30", t:"<b class='g3'>Não se comunicam</b> as circunstâncias e as condições de caráter pessoal, <b class='g3'>salvo quando elementares do crime</b>.", c:["cp5c","cp6c","cp14c"] },
  { id:"cp31", rot:"Art. 31", t:"O ajuste, a determinação ou instigação e o auxílio, salvo disposição expressa em contrário, <b class='g3'>não são puníveis, se o crime não chega, pelo menos, a ser tentado</b>.", c:["cp7c"] }
]}
],
juris:[
{ id:"stj-resp1306731", trib:"STJ", tipo:"Recurso especial", num:"REsp 1.306.731/RJ", sec:"distinta", status:"atencao", data:"22/10/2013",
  titulo:"Concurso de pessoas exige o mesmo elemento subjetivo", texto:"Em crime praticado em concurso de pessoas, não se admite condenar um corréu por homicídio doloso e outro por homicídio culposo pelo mesmo fato, por força da teoria monista.",
  explica:"Síntese do julgado (Quinta Turma) conforme o material de estudo e notícias da época; confira o inteiro teor no site do STJ.", lei:["cp29"], fonte:"https://scon.stj.jus.br/SCON/pesquisar.jsp?b=ACOR&livre=REsp+1306731" },
{ id:"stj-hc235827", trib:"STJ", tipo:"Habeas corpus", num:"HC 235.827/SP", sec:"distinta", status:"atencao", data:"03/09/2013",
  titulo:"Coautoria em crime culposo exige os requisitos do concurso", texto:"A doutrina majoritária admite coautoria em crime culposo, desde que presentes pluralidade de agentes, relevância causal, liame subjetivo e identidade de infração; no caso, o pai que não teve relevância causal nem liame com a imprudência do filho ao volante foi absolvido.",
  explica:"Síntese do julgado (Quinta Turma) conforme o material de estudo e notícias da época; confira o inteiro teor no site do STJ.", lei:["cp29"], fonte:"https://scon.stj.jus.br/SCON/pesquisar.jsp?b=ACOR&livre=HC+235827" }
],
cards:[
{ id:"cp1c", tipo:"lacuna", sec:"requisitos", f:"Requisitos do concurso de pessoas: pluralidade de agentes, relevância causal, ______, identidade de infração e fato punível.", v:"<b>liame subjetivo</b> (vínculo psicológico — não exige acordo prévio)", lei:["cp29"] },
{ id:"cp2c", tipo:"numero", sec:"participacao", f:"Participação de menor importância: qual a redução e a quem se aplica?", v:"<b>1/6 a 1/3</b>, só ao <b>partícipe</b> (art. 29, §1º).", lei:["cp29"] },
{ id:"cp3c", tipo:"caso", sec:"distinta", f:"A e B combinam furtar uma casa. Lá dentro, B, sem A saber, estupra a moradora. Por qual crime A responde?", v:"Por <b>furto</b> (cooperação dolosamente distinta, art. 29, §2º), com aumento de até metade se o crime mais grave era previsível.", lei:["cp29"] },
{ id:"cp4c", tipo:"ce", sec:"conceito", f:"Certo ou errado: o CP adota a teoria monista, sem exceções.", v:"<b>Errado.</b> Adota a monista com exceções pluralistas (aborto, corrupção ativa e passiva, falso testemunho e o art. 343).", lei:["cp29"] },
{ id:"cp5c", tipo:"caso", sec:"regras", f:"Particular ajuda funcionário público a se apropriar de computador da repartição, sabendo da condição dele. Qual o crime do particular?", v:"<b>Peculato</b>: a condição de funcionário é elementar e se comunica (art. 30). Se não soubesse, responderia por furto.", lei:["cp30"] },
{ id:"cp6c", tipo:"ce", sec:"regras", f:"Certo ou errado: o motivo torpe de um coautor se estende automaticamente aos demais.", v:"<b>Errado.</b> Circunstância subjetiva/pessoal não se comunica (art. 30).", lei:["cp30"] },
{ id:"cp7c", tipo:"caso", sec:"requisitos", f:"A instiga B a matar C, mas B desiste antes de iniciar a execução. A responde?", v:"<b>Não.</b> A participação não é punível se o crime não chega a ser tentado (art. 31).", lei:["cp31"] },
{ id:"cp8c", tipo:"distincao", sec:"autoria", f:"Autoria colateral × coautoria.", v:"<b>Coautoria</b>: há liame subjetivo, todos respondem pelo resultado. <b>Colateral</b>: agem sem saber um do outro; cada um responde pelo que causou (se incerto, ambos por tentativa).", lei:["cp29"] },
{ id:"cp9c", tipo:"distincao", sec:"mediata", f:"Autoria mediata: o que é e quem responde?", v:"O autor usa outra pessoa como <b>instrumento</b> (em erro, coagida moralmente ou inimputável sem discernimento). Só o <b>autor mediato</b> responde; não há concurso com o executor.", lei:["cp29"] },
{ id:"cp10c", tipo:"ce", sec:"participacao", f:"Certo ou errado: pela acessoriedade limitada, o partícipe responde mesmo que o autor seja inimputável.", v:"<b>Certo.</b> Basta que o fato principal seja típico e ilícito.", lei:["cp29"] },
{ id:"cp11c", tipo:"caso", sec:"requisitos", f:"Poliana combina com o namorado que ele a esperará na porta, depois do crime, para ajudá-la a fugir. Ele cumpre o combinado. É partícipe?", v:"<b>Sim.</b> A ajuda é posterior à consumação, mas foi <b>combinada antes</b>. Sem o ajuste prévio, seria favorecimento pessoal (art. 348).", lei:["cp29"] },
{ id:"cp12c", tipo:"caso", sec:"autoria", f:"A e B, sem saber um do outro, atiram em C. Só um tiro acerta e a perícia não identifica de qual arma saiu. Como respondem?", v:"<b>Ambos por tentativa de homicídio</b> (autoria incerta). Se estivessem combinados, os dois responderiam por homicídio consumado.", lei:["cp29"] },
{ id:"cp13c", tipo:"distincao", sec:"mediata", f:"Coação moral irresistível × coação física irresistível: qual é a autoria do coator?", v:"<b>Moral</b>: autoria <b>mediata</b> (o coagido age com dolo, mas sem culpabilidade). <b>Física</b>: autoria <b>direta</b> (o coagido nem tem conduta).", lei:["cp29"] },
{ id:"cp14c", tipo:"caso", sec:"regras", f:"A contrata B para matar o homem que estuprou a filha de A. B mata por dinheiro. O privilégio do relevante valor moral alcança B?", v:"<b>Não.</b> O motivo é circunstância pessoal de A e não se comunica (art. 30).", lei:["cp30"] },
{ id:"cp15c", tipo:"ce", sec:"distinta", f:"Certo ou errado: na cooperação dolosamente distinta com resultado previsível, aplica-se a pena do crime mais grave reduzida até a metade.", v:"<b>Errado.</b> Aplica-se a pena do crime <b>menos grave</b>, <b>aumentada</b> até a metade (art. 29, §2º).", lei:["cp29"] },
{ id:"cp16c", tipo:"distincao", sec:"participacao", f:"Induzimento × instigação.", v:"<b>Induzir</b>: fazer nascer a ideia criminosa. <b>Instigar</b>: reforçar uma ideia que já existia. Ambas são participação moral.", lei:["cp29"] },
{ id:"cp17c", tipo:"ce", sec:"autoria", f:"Certo ou errado: crimes de mão própria não admitem coautoria nem participação.", v:"<b>Errado.</b> Não admitem coautoria (nem, em regra, autoria mediata), mas admitem <b>participação</b> (ex.: instigar a testemunha a mentir).", lei:["cp29"] },
{ id:"cp18c", tipo:"caso", sec:"participacao", f:"Funcionário esquece a repartição aberta e um particular a furta durante a noite. Há concurso de pessoas?", v:"<b>Não</b>, falta liame. O particular responde por <b>furto</b> e o funcionário por <b>peculato culposo</b> (art. 312, §2º).", lei:["cp29"] }
],
questoes:[]
};

/* ============================ DOSIMETRIA ============================ */
T.penal_dosimetria = {
meta:{ tema:"Aplicação e Dosimetria da Pena", atualizado:AT, foco:"Sistema trifásico, circunstâncias judiciais, agravantes e atenuantes, reincidência, causas de aumento e diminuição, regime inicial e súmulas." },
secoes:[
{ id:"trifasico", titulo:"Sistema trifásico", curto:"Trifásico",
  rapido:["1ª fase: pena-base pelas 8 circunstâncias judiciais do art. 59.","2ª fase: agravantes e atenuantes — não ultrapassam os limites da pena em abstrato (Súmula 231 do STJ, mantida em 2024).",
    "3ª fase: causas de aumento e diminuição (frações) — podem ir abaixo do mínimo ou acima do máximo.","Concurso de causas da parte especial: o juiz pode aplicar só a que mais aumente ou diminua (art. 68, parágrafo único)."],
  teoria:[
    { h:"Pena-base (art. 59)", p:[
      "Circunstâncias judiciais: <b>culpabilidade, antecedentes, conduta social, personalidade, motivos, circunstâncias, consequências do crime e comportamento da vítima</b>. Inquéritos e ações em curso não servem para agravá-la (Súmula 444).",
      "O comportamento da vítima só pode ser neutro ou favorável ao réu, nunca prejudicá-lo (jurisprudência do STJ)."]},
    { h:"Agravantes, atenuantes e reincidência", p:[
      "<b>Reincidência</b> (art. 63): novo crime após o trânsito em julgado de condenação anterior, no país ou no estrangeiro. Período depurador: 5 anos entre o cumprimento ou extinção da pena e o novo crime (art. 64, I). Crimes militares próprios e políticos não geram reincidência. Condenação anterior só por contravenção seguida de crime não gera reincidência.",
      "A reincidência não pode ser usada como agravante e, ao mesmo tempo, como circunstância judicial (Súmula 241).",
      "Atenuante da <b>confissão</b>: a Súmula 545 do STJ foi reescrita — a confissão atenua a pena independentemente de ter sido usada para formar o convencimento do juiz. A Súmula 630 (tráfico) também mudou: se o réu admite a posse para uso próprio e nega o tráfico, a atenuante incide em fração menor.",
      "Leis de 2025: a Lei 15.160/2025 afastou a atenuante da idade (menor de 21 ou maior de 70) e a redução do prazo prescricional (art. 115) nos crimes que envolvem violência sexual contra a mulher; a Lei 15.159/2025 incluiu agravante para crimes nas dependências de instituição de ensino (art. 61)."]},
    { h:"Regime inicial", p:[
      "Pena superior a 8 anos: fechado. Acima de 4 até 8, não reincidente: semiaberto. Até 4, não reincidente: aberto (art. 33, §2º). Reincidente com pena até 4 anos e circunstâncias favoráveis: pode iniciar no semiaberto (Súmula 269).",
      "Gravidade abstrata do crime não justifica regime mais severo que o permitido pela pena (Súmula 440 do STJ; Súmulas 718 e 719 do STF)."]}
  ],
  quadro:{ titulo:"As três fases", head:["Fase","O que entra","Pode sair dos limites da pena?"], rows:[["1ª — pena-base","Art. 59 (8 circunstâncias)","Não"],["2ª — intermediária","Agravantes e atenuantes","Não (Súm. 231)"],["3ª — definitiva","Causas de aumento e diminuição","Sim"]]},
  pegadinhas:["Súmula 231 continua valendo: atenuante não leva a pena abaixo do mínimo (STJ, 2024).","Qualificadora altera a pena em abstrato (mínimo e máximo); majorante é fração na 3ª fase."]}
],
lei:[
{ art:"CP, arts. 59, 63, 64 e 68", nome:"Fixação da pena", sec:"trifasico", itens:[
  { id:"cp59", rot:"Art. 59", t:"O juiz, atendendo à <b class='g1'>culpabilidade, aos antecedentes, à conduta social, à personalidade do agente, aos motivos, às circunstâncias e consequências do crime, bem como ao comportamento da vítima</b>, estabelecerá, conforme seja necessário e suficiente para reprovação e prevenção do crime: I - as penas aplicáveis dentre as cominadas; II - a quantidade de pena aplicável, dentro dos limites previstos; III - o regime inicial de cumprimento da pena privativa de liberdade; IV - a substituição da pena privativa da liberdade aplicada, por outra espécie de pena, se cabível.", j:["stj-s444d"], c:["ds1","ds2"] },
  { id:"cp63", rot:"Arts. 63 e 64", t:"Art. 63 - Verifica-se a reincidência quando o agente comete novo crime, <b class='g1'>depois de transitar em julgado</b> a sentença que, no País ou no estrangeiro, o tenha condenado por crime anterior.<br>Art. 64 - Para efeito de reincidência: I - não prevalece a condenação anterior, se entre a data do cumprimento ou extinção da pena e a infração posterior tiver decorrido período de tempo <b class='g2'>superior a 5 (cinco) anos</b>, computado o período de prova da suspensão ou do livramento condicional, se não ocorrer revogação; II - <b class='g3'>não se consideram os crimes militares próprios e políticos</b>.", j:["stj-s241"], c:["ds3","ds4"] },
  { id:"cp68", rot:"Art. 68", t:"A pena-base será fixada atendendo-se ao critério do art. 59 deste Código; em seguida serão consideradas as circunstâncias <b class='g1'>atenuantes e agravantes</b>; por último, as causas de <b class='g1'>diminuição e de aumento</b>.<br>Parágrafo único - No concurso de causas de aumento ou de diminuição previstas na parte especial, pode o juiz limitar-se a um só aumento ou a uma só diminuição, <b class='g3'>prevalecendo, todavia, a causa que mais aumente ou diminua</b>.", j:["stj-s231","stj-s545"], c:["ds5","ds6"] }
]}
],
juris:[
{ id:"stj-s231", trib:"STJ", tipo:"Súmula", num:"231", sec:"trifasico", status:"vigente", data:"Mantida pela 3ª Seção em 14/08/2024 (REsp 1.869.764-MS, Inf. 823)", titulo:"Atenuante não vai abaixo do mínimo",
  texto:"A incidência da circunstância atenuante não pode conduzir à redução da pena abaixo do mínimo legal.", explica:"O STJ rejeitou a revisão da súmula em 2024.", lei:["cp68"], fonte:"https://juris.damasio.com.br/jurisprudencia/julgado/823/sumula-231-do-stj-e-atenuantes-nao-reduzem-pena-abaixo-do-minimo-legal" },
{ id:"stj-s545", trib:"STJ", tipo:"Súmula", num:"545 (redação revista)", sec:"trifasico", status:"atencao", data:"Redação alterada em 2025", titulo:"Confissão atenua mesmo sem ser usada na sentença",
  texto:"A confissão do autor possibilita a atenuação da pena, independentemente de ter sido utilizada na formação do convencimento do julgador.", sintese:true,
  explica:"A redação anterior exigia que a confissão tivesse sido usada para fundamentar a condenação. Confira o texto oficial no site do STJ.", lei:["cp68"], fonte:"https://blog.grancursosonline.com.br/alteracoes-nas-sumulas-545-e-630-do-stj/" },
{ id:"stj-s241", trib:"STJ", tipo:"Súmula", num:"241", sec:"trifasico", status:"vigente", data:"", titulo:"Sem bis in idem na reincidência", texto:"A reincidência penal não pode ser considerada como circunstância agravante e, simultaneamente, como circunstância judicial.", explica:"", lei:["cp63"], fonte:STJS },
{ id:"stj-s444d", trib:"STJ", tipo:"Súmula", num:"444", sec:"trifasico", status:"vigente", data:"", titulo:"Inquéritos e ações em curso", texto:"É vedada a utilização de inquéritos policiais e ações penais em curso para agravar a pena-base.", explica:"", lei:["cp59"], fonte:STJS },
{ id:"stj-s440", trib:"STJ", tipo:"Súmula", num:"440", sec:"trifasico", status:"vigente", data:"", titulo:"Regime e gravidade abstrata", texto:"Fixada a pena-base no mínimo legal, é vedado o estabelecimento de regime prisional mais gravoso do que o cabível em razão da sanção imposta, com base apenas na gravidade abstrata do delito.", explica:"", lei:["cp59"], fonte:STJS },
{ id:"stj-s269", trib:"STJ", tipo:"Súmula", num:"269", sec:"trifasico", status:"vigente", data:"", titulo:"Reincidente com pena até 4 anos", texto:"É admissível a adoção do regime prisional semi-aberto aos reincidentes condenados a pena igual ou inferior a quatro anos se favoráveis as circunstâncias judiciais.", explica:"", lei:["cp59"], fonte:STJS }
],
cards:[
{ id:"ds1", tipo:"lacuna", sec:"trifasico", f:"Art. 59 — circunstâncias judiciais: culpabilidade, ______, conduta social, ______, motivos, circunstâncias, ______ do crime e comportamento da ______.", v:"<b>antecedentes</b> · <b>personalidade</b> · <b>consequências</b> · <b>vítima</b>", lei:["cp59"] },
{ id:"ds2", tipo:"juris", sec:"trifasico", f:"Réu responde a três ações penais em andamento. O juiz pode elevar a pena-base por \"maus antecedentes\"?", v:"<b>Não.</b> Súmula 444 do STJ.", lei:["cp59"], j:["stj-s444d"] },
{ id:"ds3", tipo:"numero", sec:"trifasico", f:"Período depurador da reincidência.", v:"<b>5 anos</b> entre o cumprimento ou extinção da pena e o novo crime (art. 64, I).", lei:["cp63"] },
{ id:"ds4", tipo:"ce", sec:"trifasico", f:"Certo ou errado: condenação anterior por crime militar próprio gera reincidência para crime comum.", v:"<b>Errado</b> (art. 64, II). O mesmo vale para crimes políticos.", lei:["cp63"] },
{ id:"ds5", tipo:"juris", sec:"trifasico", f:"Pena-base no mínimo e réu confesso. A atenuante pode levar a pena abaixo do mínimo?", v:"<b>Não.</b> Súmula 231 do STJ, mantida em 2024.", lei:["cp68"], j:["stj-s231"] },
{ id:"ds6", tipo:"juris", sec:"trifasico", f:"O réu confessou, mas o juiz condenou com base em outras provas. Cabe a atenuante da confissão?", v:"<b>Sim.</b> Súmula 545 do STJ (redação revista em 2025): independe de a confissão ter sido usada para o convencimento.", lei:["cp68"], j:["stj-s545"] },
{ id:"ds7", tipo:"numero", sec:"trifasico", f:"Regimes iniciais pela quantidade de pena (réu não reincidente).", v:"<b>> 8 anos</b>: fechado. <b>> 4 até 8</b>: semiaberto. <b>até 4</b>: aberto.", lei:["cp59"] },
{ id:"ds8", tipo:"distincao", sec:"trifasico", f:"Qualificadora × causa de aumento (majorante).", v:"<b>Qualificadora</b>: novos limites mínimo e máximo (ponto de partida da 1ª fase). <b>Majorante</b>: fração aplicada na 3ª fase.", lei:["cp68"] },
{ id:"ds9", tipo:"ce", sec:"trifasico", f:"Certo ou errado: a reincidência pode ser usada para agravar a pena-base e, de novo, como agravante.", v:"<b>Errado.</b> Súmula 241 do STJ.", lei:["cp63"], j:["stj-s241"] },
{ id:"ds10", tipo:"caso", sec:"trifasico", f:"Crime de violência sexual contra mulher praticado em 2026 por agente de 19 anos. Incide a atenuante da menoridade relativa?", v:"<b>Não</b>, para fatos após a Lei 15.160/2025, que excluiu a atenuante (art. 65, I) e a redução da prescrição (art. 115) nesses crimes.", lei:["cp68"] }
],
questoes:[]
};

})();
