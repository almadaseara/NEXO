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
  foco:"Legalidade, anterioridade, culpabilidade, intervenção mínima, lesividade, insignificância, presunção de inocência e fontes do Direito Penal." },
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
    "Velocidades do Direito Penal (Silva Sánchez): 1ª — pena de prisão com todas as garantias; 2ª — penas alternativas com flexibilização de garantias; 3ª — prisão com garantias reduzidas (Direito Penal do inimigo, de Jakobs)."]}]}
],
lei:[
{ art:"CF, art. 5º", nome:"Garantias penais", sec:"legalidade", itens:[
  { id:"cf5-39", rot:"inc. XXXIX e XL", t:"XXXIX - <b class='g1'>não há crime sem lei anterior que o defina</b>, nem pena sem <b class='g1'>prévia cominação legal</b>;<br>XL - a lei penal <b class='g3'>não retroagirá, salvo para beneficiar o réu</b>;", c:["pp1","pp2"] },
  { id:"cf5-45", rot:"inc. XLV a XLVII", t:"XLV - <b class='g1'>nenhuma pena passará da pessoa do condenado</b>, podendo a obrigação de reparar o dano e a decretação do perdimento de bens ser, nos termos da lei, estendidas aos sucessores e contra eles executadas, <b class='g3'>até o limite do valor do patrimônio transferido</b>;<br>XLVI - a lei regulará a <b class='g1'>individualização da pena</b> (...);<br>XLVII - não haverá penas: a) de <b class='g1'>morte</b>, <b class='g3'>salvo em caso de guerra declarada</b>, nos termos do art. 84, XIX; b) de caráter <b class='g1'>perpétuo</b>; c) de <b class='g1'>trabalhos forçados</b>; d) de <b class='g1'>banimento</b>; e) <b class='g1'>cruéis</b>;", c:["pp5","pp6"] },
  { id:"cf5-57", rot:"inc. LVII", t:"LVII - ninguém será considerado culpado até o <b class='g1'>trânsito em julgado</b> de sentença penal condenatória;", j:["stf-t1068"], c:["pp11"] }
]},
{ art:"CP, art. 1º", nome:"Anterioridade da lei", sec:"legalidade", itens:[
  { id:"cp1", rot:"Art. 1º", t:"<b class='g1'>Não há crime sem lei anterior</b> que o defina. <b class='g1'>Não há pena sem prévia cominação legal</b>.", c:["pp1","pp3"] }
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
  titulo:"Inquéritos em curso não agravam a pena-base", texto:"É vedada a utilização de inquéritos policiais e ações penais em curso para agravar a pena-base.", explica:"Decorre da presunção de inocência.", lei:["cf5-57"], fonte:STJS }
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
{ id:"pp14", tipo:"ce", sec:"limitadores", f:"Certo ou errado: a autolesão é punida, em regra, por violar a integridade física.", v:"<b>Errado.</b> Pelo princípio da alteridade, a autolesão não é crime — salvo quando atinge bem de terceiro (ex.: fraude contra seguro, art. 171, §2º, V).", lei:[] }
],
questoes:[]
};

/* ====================== APLICAÇÃO DA LEI PENAL ====================== */
T.penal_aplicacao = {
meta:{ tema:"Aplicação da Lei Penal", atualizado:AT, foco:"Lei penal no tempo, no espaço e em relação às pessoas; tempo e lugar do crime; contagem de prazo." },
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
    "Deputados estaduais têm as mesmas imunidades (art. 27, §1º). Vereadores: só a material, nos limites do Município (art. 29, VIII)."]}]}
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
  { id:"cp8", rot:"Art. 8º", t:"A pena cumprida no estrangeiro <b class='g1'>atenua</b> a pena imposta no Brasil pelo mesmo crime, quando diversas, ou nela é <b class='g1'>computada</b>, quando idênticas.", c:["ap11"] }
]},
{ art:"CP, art. 10", nome:"Contagem de prazo", sec:"momento-lugar", itens:[
  { id:"cp10", rot:"Art. 10", t:"O dia do começo <b class='g1'>inclui-se no cômputo do prazo</b>. Contam-se os dias, os meses e os anos pelo <b class='g1'>calendário comum</b>.", c:["ap12"] }
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
  texto:"Nos limites da circunscrição do Município e havendo pertinência com o exercício do mandato, garante-se a imunidade prevista no art. 29, VIII, da Constituição aos vereadores.", explica:"Vereador não tem imunidade formal.", lei:["cf53"], fonte:STFRG }
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
{ id:"ap15", tipo:"juris", sec:"tempo", f:"Extorsão mediante sequestro começou antes e terminou depois de lei mais grave. Qual se aplica?", v:"A <b>mais grave</b>, porque vigente antes de cessar a permanência (Súmula 711 do STF).", lei:["cp2"], j:["stf-s711"] }
],
questoes:[]
};

/* ============================ FATO TÍPICO ============================ */
T.penal_fato_tipico = {
meta:{ tema:"Fato Típico", atualizado:AT, foco:"Conceito de crime, conduta, resultado, nexo causal, tipicidade, iter criminis, tentativa, desistência, arrependimentos e crime impossível." },
secoes:[
{ id:"conceito", titulo:"Conceito de crime e elementos do fato típico", curto:"Conceito",
  rapido:["Conceito analítico tripartido: fato <b>típico</b>, <b>ilícito</b> e <b>culpável</b>.","Fato típico: conduta + resultado + nexo causal + tipicidade.",
    "Crime × contravenção: crime tem reclusão ou detenção; contravenção, prisão simples ou multa (LICP, art. 1º).","Contravenção: não se pune a tentativa; só se aplica a lei brasileira à contravenção praticada no Brasil."],
  teoria:[
    { h:"Conduta", p:[
      "Conduta é a ação ou omissão humana, voluntária e consciente, dirigida a um fim (teoria finalista, de Welzel, adotada pelo CP). Não há conduta em atos reflexos, coação física irresistível, sonambulismo e hipnose.",
      "Omissão <b>própria</b>: o tipo descreve um não fazer (ex.: omissão de socorro). Omissão <b>imprópria</b> (comissivo por omissão): o garante deixa de evitar o resultado que devia e podia evitar (art. 13, §2º) — responde pelo resultado, como se o tivesse causado."]},
    { h:"Resultado, nexo causal e tipicidade", p:[
      "Resultado <b>naturalístico</b>: modificação no mundo exterior (só nos crimes materiais). Resultado <b>jurídico</b>: lesão ou perigo ao bem jurídico (existe em todo crime). Crimes formais e de mera conduta dispensam o resultado naturalístico para a consumação.",
      "Nexo causal: o CP adota a <b>equivalência dos antecedentes</b> (<i>conditio sine qua non</i>), limitada pelo dolo ou culpa. Exceção: <b>causa superveniente relativamente independente que por si só produz o resultado</b> rompe o nexo (art. 13, §1º — teoria da causalidade adequada); o agente responde só pelos atos já praticados. Ex. clássico: vítima ferida morre no incêndio do hospital. Já o erro médico ou a infecção hospitalar não rompem o nexo, segundo a jurisprudência.",
      "Causas <b>absolutamente</b> independentes (preexistentes, concomitantes ou supervenientes) sempre rompem o nexo: o agente responde por tentativa.",
      "Tipicidade <b>formal</b> (adequação da conduta ao tipo) + <b>material</b> (lesão relevante ao bem jurídico). Tipicidade conglobante (Zaffaroni): exclui condutas fomentadas ou impostas pelo ordenamento."]}
  ],
  quadro:{ titulo:"Concausas", head:["Tipo","Rompe o nexo?","Agente responde por"], rows:[
    ["Absolutamente independente (qualquer momento)","Sim","Tentativa (atos praticados)"],["Relativamente independente preexistente (ex.: hemofilia)","Não","Resultado"],
    ["Relativamente independente concomitante","Não","Resultado"],["Relativamente independente superveniente que por si só produziu o resultado (ex.: incêndio no hospital)","Sim (art. 13, §1º)","Atos praticados"],
    ["Superveniente que não produz o resultado por si só (ex.: infecção hospitalar)","Não","Resultado"]]},
  pegadinhas:["Hemofilia da vítima, ainda que desconhecida, não rompe o nexo — o agente responde pelo resultado se houver dolo ou culpa quanto a ele.","Omissão imprópria exige poder agir: o salva-vidas que não sabe nadar no momento não responde."]},
{ id:"itercriminis", titulo:"Iter criminis, consumação e tentativa", curto:"Tentativa",
  rapido:["Etapas: cogitação → preparação → execução → consumação (→ exaurimento).","Cogitação e preparação, em regra, não são puníveis (salvo quando a preparação é crime autônomo, como associação criminosa).",
    "Tentativa: iniciada a execução, o crime não se consuma por circunstâncias alheias à vontade do agente. Pena do consumado reduzida de <b>1/3 a 2/3</b>.",
    "Não admitem tentativa: culposos, preterdolosos, contravenções, omissivos próprios, unissubsistentes, habituais, crimes de atentado."],
  teoria:[
    { h:"Início da execução e tentativa", p:[
      "Prevalece a teoria <b>objetivo-formal</b>: a execução começa quando o agente inicia a realização do verbo do tipo. O STJ tem admitido a teoria objetivo-material para atos imediatamente anteriores que já atacam o bem jurídico (ex.: começar a romper o obstáculo no furto — Informativo 887/2026).",
      "Quanto mais o agente se aproxima da consumação, menor a redução (critério do iter percorrido). Tentativa branca (incruenta): o objeto não é atingido; cruenta: é atingido.",
      "CP adota a teoria <b>objetiva</b> (temperada) da punibilidade da tentativa: pune-se menos porque o resultado não ocorreu. Exceção: crimes de atentado (ex.: art. 352, evasão mediante violência) punem igual."]},
    { h:"Desistência voluntária, arrependimento eficaz e posterior", p:[
      "<b>Desistência voluntária</b> (art. 15, 1ª parte): o agente, podendo prosseguir, interrompe a execução. <b>Arrependimento eficaz</b> (2ª parte): já esgotou a execução, mas age e impede o resultado. Nos dois, responde só pelos atos já praticados (\"ponte de ouro\"). Fórmula de Frank: \"posso, mas não quero\" (desistência) × \"quero, mas não posso\" (tentativa).",
      "<b>Arrependimento posterior</b> (art. 16): crime sem violência ou grave ameaça à pessoa, já consumado; o agente repara o dano ou restitui a coisa voluntariamente até o recebimento da denúncia ou queixa → redução de 1/3 a 2/3. É causa de diminuição, não exclui o crime. Se a reparação vier depois, é só atenuante (art. 65, III, b).",
      "<b>Crime impossível</b> (art. 17): ineficácia absoluta do meio (arma de brinquedo para matar) ou impropriedade absoluta do objeto (atirar em cadáver). Teoria objetiva temperada. Se a ineficácia for relativa, há tentativa punível. Flagrante preparado também gera crime impossível (Súmula 145 do STF); o flagrante esperado, não."]}
  ],
  quadro:{ titulo:"Desistência, arrependimentos e tentativa", head:["Instituto","Momento","Efeito"], rows:[
    ["Tentativa","Execução interrompida por fator externo","Pena do consumado − 1/3 a 2/3"],["Desistência voluntária","Durante a execução, por vontade própria","Responde só pelos atos praticados"],
    ["Arrependimento eficaz","Execução encerrada; agente impede o resultado","Responde só pelos atos praticados"],["Arrependimento posterior","Após a consumação, até o recebimento da denúncia","Redução de 1/3 a 2/3 (sem violência/grave ameaça)"],
    ["Crime impossível","Meio ou objeto absolutamente inidôneos","Fato atípico"]]},
  pegadinhas:["Desistência voluntária não precisa ser espontânea: basta ser voluntária (pode ser sugerida por outra pessoa).","Arrependimento posterior exige ato voluntário e reparação integral, mas não espontaneidade.","Câmeras na loja não tornam o furto impossível (Súmula 567 do STJ)."]},
{ id:"classificacao", titulo:"Classificação dos crimes", curto:"Classificação",
  rapido:["Material (exige resultado), formal (resultado dispensável) e de mera conduta (sem resultado).","Instantâneo, permanente (consumação se prolonga — flagrante a qualquer tempo) e instantâneo de efeitos permanentes.",
    "Comum, próprio (exige qualidade do agente, admite participação) e de mão própria (só o agente pessoalmente — ex.: falso testemunho)."],
  teoria:[{ h:"Classificações mais cobradas", p:[
    "<b>Crime de dano</b> × <b>de perigo</b> (concreto, que precisa ser demonstrado; abstrato, presumido pela lei). <b>Unissubsistente</b> (ato único, não admite tentativa) × <b>plurissubsistente</b>.",
    "<b>Crime habitual</b>: exige reiteração (ex.: curandeirismo); não admite tentativa. <b>Crime vago</b>: sujeito passivo indeterminado (ex.: tráfico de drogas). <b>Crime de atentado</b>: pune a tentativa como consumado.",
    "<b>Crime exaurido</b>: o agente obtém o proveito depois da consumação (ex.: receber o resgate na extorsão mediante sequestro) — o exaurimento pode influir na pena, mas não muda a consumação."]}]}
],
lei:[
{ art:"CP, art. 13", nome:"Relação de causalidade", sec:"conceito", itens:[
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
{ id:"ft1", tipo:"caso", sec:"conceito", f:"A atira em B, que é levado ao hospital e morre no incêndio do prédio. Por qual crime A responde?", v:"<b>Tentativa de homicídio.</b> O incêndio é causa superveniente relativamente independente que, por si só, produziu o resultado (art. 13, §1º).", lei:["cp13"] },
{ id:"ft2", tipo:"caso", sec:"conceito", f:"A golpeia B levemente; B, hemofílico, morre. A sabia da doença. Responde pelo resultado?", v:"<b>Sim.</b> Concausa preexistente relativamente independente não rompe o nexo. Como A sabia, responde por homicídio (doloso ou culposo, conforme o caso).", lei:["cp13"] },
{ id:"ft3", tipo:"ce", sec:"conceito", f:"Certo ou errado: o CP adota, como regra, a teoria da causalidade adequada.", v:"<b>Errado.</b> Regra: equivalência dos antecedentes (<i>conditio sine qua non</i>). A causalidade adequada aparece na exceção do §1º.", lei:["cp13"] },
{ id:"ft4", tipo:"lacuna", sec:"conceito", f:"Art. 13, §2º: a omissão é relevante quando o omitente ______ e ______ agir para evitar o resultado.", v:"<b>devia</b> · <b>podia</b>", lei:["cp13-2"] },
{ id:"ft5", tipo:"caso", sec:"conceito", f:"Babá contratada vê a criança cair na piscina e nada faz; a criança morre. Qual o crime?", v:"<b>Homicídio</b> (comissivo por omissão): ela assumiu a responsabilidade de impedir o resultado (art. 13, §2º, b). Dolo ou culpa conforme o caso.", lei:["cp13-2"] },
{ id:"ft6", tipo:"numero", sec:"itercriminis", f:"Fração de redução da tentativa e critério para escolhê-la.", v:"<b>1/3 a 2/3</b>; quanto mais perto da consumação, menor a redução (iter percorrido).", lei:["cp14"] },
{ id:"ft7", tipo:"ce", sec:"itercriminis", f:"Certo ou errado: crimes culposos admitem tentativa.", v:"<b>Errado.</b> Na tentativa o agente quer o resultado; no culposo não. (Exceção doutrinária: culpa imprópria.)", lei:["cp14"] },
{ id:"ft8", tipo:"distincao", sec:"itercriminis", f:"Desistência voluntária × arrependimento eficaz.", v:"<b>Desistência</b>: interrompe a execução antes de terminá-la. <b>Arrependimento eficaz</b>: termina a execução, mas age para impedir o resultado. Ambos: responde só pelos atos praticados.", lei:["cp15"] },
{ id:"ft9", tipo:"caso", sec:"itercriminis", f:"Agente envenena a vítima e, arrependido, leva-a ao hospital, onde ela é salva com lesão grave. Qual o crime?", v:"<b>Lesão corporal grave</b> — arrependimento eficaz: responde só pelos atos praticados (art. 15). Se a vítima morresse, responderia pelo homicídio.", lei:["cp15"] },
{ id:"ft10", tipo:"caso", sec:"itercriminis", f:"Furtou o celular e devolveu voluntariamente antes do recebimento da denúncia. Efeito?", v:"<b>Arrependimento posterior</b>: redução de 1/3 a 2/3 (art. 16). O crime continua consumado.", lei:["cp16"] },
{ id:"ft11", tipo:"caso", sec:"itercriminis", f:"Atirar com arma sem munição contra a vítima. Crime impossível?", v:"Se a arma estava absolutamente inapta: <b>crime impossível</b> (ineficácia absoluta do meio). Se falhou por acaso (munição \"picotou\"), é <b>tentativa</b>.", lei:["cp17"] },
{ id:"ft12", tipo:"juris", sec:"itercriminis", f:"Flagrante preparado × esperado.", v:"<b>Preparado</b> (a polícia induz o crime e impede a consumação): crime impossível (Súmula 145 do STF). <b>Esperado</b> (a polícia só aguarda): flagrante válido.", lei:["cp17"], j:["stf-s145"] },
{ id:"ft13", tipo:"ce", sec:"classificacao", f:"Certo ou errado: crime de mão própria admite coautoria.", v:"<b>Errado</b>, em regra: só admite participação (ex.: falso testemunho). Crime próprio é que admite coautoria e participação.", lei:[] },
{ id:"ft14", tipo:"distincao", sec:"classificacao", f:"Crime material × formal × de mera conduta.", v:"<b>Material</b>: exige resultado naturalístico (homicídio). <b>Formal</b>: o resultado pode ocorrer, mas é dispensável (extorsão). <b>Mera conduta</b>: não há resultado naturalístico (violação de domicílio).", lei:[] },
{ id:"ft15", tipo:"distincao", sec:"conceito", f:"Crime × contravenção penal: diferenças em pena e tentativa.", v:"Crime: <b>reclusão ou detenção</b>; contravenção: <b>prisão simples ou multa</b>. Tentativa de contravenção <b>não é punível</b> (LCP, art. 4º).", lei:[] }
],
questoes:[]
};

/* ============================ DOLO E CULPA ============================ */
T.penal_dolo_culpa = {
meta:{ tema:"Dolo e Culpa", atualizado:AT, foco:"Dolo direto e eventual, culpa consciente e inconsciente, modalidades de culpa, crime preterdoloso e excepcionalidade do crime culposo." },
secoes:[
{ id:"dolo", titulo:"Dolo", curto:"Dolo",
  rapido:["Doloso: o agente quis o resultado (dolo direto) ou assumiu o risco de produzi-lo (dolo eventual) — art. 18, I.","CP adota a teoria da <b>vontade</b> (dolo direto) e do <b>assentimento</b> (dolo eventual).",
    "Dolo direto de 2º grau: efeitos colaterais necessários (bomba no avião para matar um passageiro mata todos)."],
  teoria:[{ h:"Espécies de dolo", p:[
    "<b>Dolo direto de 1º grau</b>: o resultado é o fim visado. <b>De 2º grau</b> (consequências necessárias): o agente não quer o efeito colateral, mas sabe que ele é certo. <b>Eventual</b>: prevê o resultado como possível e o aceita (\"seja como for, dou continuidade\").",
    "Dolo <b>genérico</b> × <b>específico</b> (especial fim de agir, ex.: \"para si ou para outrem\"). Dolo <b>geral</b> (<i>dolus generalis</i>): o agente pensa ter consumado e, em segundo ato, causa o resultado (estrangula, acha que matou, joga no rio e a vítima morre afogada) — responde por homicídio consumado.",
    "Embriaguez ao volante e racha: o STF e o STJ exigem análise do caso concreto; a embriaguez, sozinha, não presume dolo eventual."]}],
  pegadinhas:["Dolo eventual × culpa consciente: em ambos o agente prevê o resultado; no dolo eventual ele aceita, na culpa consciente confia sinceramente que não ocorrerá."]},
{ id:"culpa", titulo:"Culpa", curto:"Culpa",
  rapido:["Culposo: o agente deu causa ao resultado por <b>imprudência, negligência ou imperícia</b> (art. 18, II).","Excepcionalidade: só há crime culposo se a lei previr expressamente (art. 18, parágrafo único).",
    "Elementos: conduta voluntária, violação do dever de cuidado, resultado involuntário, nexo, previsibilidade objetiva e tipicidade.","Não há compensação de culpas; há concorrência de culpas."],
  teoria:[{ h:"Modalidades e espécies", p:[
    "<b>Imprudência</b>: fazer algo perigoso (ação). <b>Negligência</b>: deixar de tomar o cuidado devido (omissão). <b>Imperícia</b>: falta de aptidão técnica no exercício de arte, profissão ou ofício.",
    "<b>Culpa consciente</b> (com previsão): prevê e confia que evitará. <b>Inconsciente</b>: não prevê o previsível. <b>Culpa imprópria</b> (por extensão ou equiparação): o agente quer o resultado, mas por erro evitável numa descriminante putativa (art. 20, §1º, 2ª parte) — responde por crime culposo; admite tentativa, segundo a doutrina.",
    "Crimes culposos não admitem tentativa nem participação (prevalece). Há coautoria em crime culposo (duas pessoas agindo com descuido conjunto)."]},
  { h:"Crime preterdoloso", p:[
    "Dolo no antecedente e culpa no consequente (ex.: lesão corporal seguida de morte, art. 129, §3º). Pelo art. 19, o agente só responde pelo resultado agravador se o causou ao menos culposamente — vedada a responsabilidade objetiva.",
    "Não admite tentativa (o resultado mais grave não é querido). Latrocínio não é necessariamente preterdoloso: a morte pode ser dolosa ou culposa."]}],
  quadro:{ titulo:"Dolo eventual × culpa consciente", head:["","Dolo eventual","Culpa consciente"], rows:[["Previsão do resultado","Sim","Sim"],["Atitude","Aceita, é indiferente","Confia que não ocorrerá"],["Fórmula","\"Dane-se\"","\"Não vai acontecer\""],["Exemplo","Atirar na multidão para assustar","Atirador de facas do circo que confia na própria habilidade"]]},
  pegadinhas:["Compensação de culpas não existe no Direito Penal: a culpa da vítima pode influir na pena (art. 59), mas não exclui a do agente.","Crime culposo exige previsão expressa: dano culposo não é crime no CP."]}
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
{ id:"dc5", tipo:"caso", sec:"culpa", f:"Soco no rosto, a vítima cai, bate a cabeça e morre. O agente não queria matar. Qual o crime?", v:"<b>Lesão corporal seguida de morte</b> (preterdoloso, art. 129, §3º) — se a morte era previsível (art. 19).", lei:["cp19"] },
{ id:"dc6", tipo:"ce", sec:"culpa", f:"Certo ou errado: crime preterdoloso admite tentativa.", v:"<b>Errado.</b> O resultado agravador é culposo, não querido.", lei:["cp19"] },
{ id:"dc7", tipo:"caso", sec:"dolo", f:"Agente estrangula a vítima, pensa que ela morreu e a joga no rio; ela morre afogada. Qual o crime?", v:"<b>Homicídio doloso consumado</b> — dolo geral (<i>dolus generalis</i>), erro sucessivo sobre o nexo causal.", lei:["cp18"] },
{ id:"dc8", tipo:"ce", sec:"culpa", f:"Certo ou errado: a culpa exclusiva da vítima exclui o crime culposo do agente; a culpa concorrente se compensa.", v:"Culpa <b>exclusiva</b> da vítima: não há crime (falta violação do dever de cuidado do agente). Culpa <b>concorrente</b>: <b>não se compensa</b> — cada um responde.", lei:["cp18"] },
{ id:"dc9", tipo:"distincao", sec:"culpa", f:"O que é culpa imprópria?", v:"O agente <b>quer</b> o resultado, mas age por erro evitável sobre situação de fato que tornaria a ação legítima (descriminante putativa). Responde por crime <b>culposo</b> (art. 20, §1º, 2ª parte).", lei:["cp18"] },
{ id:"dc10", tipo:"ce", sec:"dolo", f:"Certo ou errado: a embriaguez ao volante presume, por si só, o dolo eventual no homicídio de trânsito.", v:"<b>Errado.</b> STF e STJ exigem análise das circunstâncias concretas; a embriaguez isolada não basta.", lei:["cp18"] }
],
questoes:[]
};

/* ====================== ILICITUDE E CULPABILIDADE ====================== */
T.penal_ilicitude = {
meta:{ tema:"Ilicitude e Culpabilidade", atualizado:AT, foco:"Excludentes de ilicitude (estado de necessidade, legítima defesa, estrito cumprimento do dever legal, exercício regular de direito), excesso, imputabilidade, potencial consciência da ilicitude e exigibilidade de conduta diversa." },
secoes:[
{ id:"ilicitude", titulo:"Excludentes de ilicitude", curto:"Ilicitude",
  rapido:["Não há crime quando o fato é praticado em estado de necessidade, legítima defesa, estrito cumprimento de dever legal ou exercício regular de direito (art. 23).",
    "Em todas, o agente responde pelo <b>excesso</b> doloso ou culposo (parágrafo único).","Consentimento do ofendido: excludente <b>supralegal</b> quando o bem é disponível e o ofendido é capaz.",
    "Pacote Anticrime: legítima defesa do agente de segurança pública que repele agressão a refém (art. 25, parágrafo único)."],
  teoria:[
    { h:"Estado de necessidade (art. 24)", p:[
      "Requisitos: <b>perigo atual</b>; não provocado <b>voluntariamente</b> pelo agente; inevitável de outro modo; para salvar direito próprio ou alheio; sacrifício do outro bem razoável. Não pode alegar quem tem o <b>dever legal de enfrentar o perigo</b> (bombeiro, policial).",
      "O CP adota a teoria <b>unitária</b>: só há estado de necessidade justificante (bem sacrificado de valor igual ou menor). Se o bem sacrificado vale mais, o juiz pode reduzir a pena de 1/3 a 2/3 (§2º). O CPM adota a teoria diferenciadora.",
      "Ex.: furto famélico; náufragos que disputam a tábua."]},
    { h:"Legítima defesa (art. 25)", p:[
      "Requisitos: <b>injusta agressão</b> (humana), <b>atual ou iminente</b>, a direito próprio ou de terceiro, repelida com <b>uso moderado dos meios necessários</b>. Não há legítima defesa contra agressão futura ou passada (vingança).",
      "Cabe legítima defesa contra inimputável (agressão injusta não exige culpabilidade), mas não contra quem age em legítima defesa real (não cabe legítima defesa recíproca). Cabe legítima defesa real contra legítima defesa putativa.",
      "O STF (ADPF 779, 2023) declarou inconstitucional a tese da \"legítima defesa da honra\" em feminicídio e agressões contra mulheres, inclusive no júri.",
      "Ofendículos (cerca elétrica, cacos de vidro): prevalece que são exercício regular de direito quando instalados e legítima defesa preordenada quando atuam."]},
    { h:"Estrito cumprimento do dever legal e exercício regular de direito", p:[
      "<b>Dever legal</b>: imposto por lei em sentido amplo (ex.: policial que prende em flagrante com uso da força necessária; oficial de justiça que arromba porta por ordem judicial). Não abrange matar para cumprir dever, salvo em legítima defesa.",
      "<b>Exercício regular de direito</b>: lutas esportivas dentro das regras, intervenções médicas consentidas, correção moderada (hoje limitada pela Lei Menino Bernardo), prisão em flagrante por qualquer do povo."]}
  ],
  quadro:{ titulo:"Estado de necessidade × legítima defesa", head:["","Estado de necessidade","Legítima defesa"], rows:[["Situação","Perigo atual (de qualquer origem)","Injusta agressão humana, atual ou iminente"],["Conduta","Ataque a bem jurídico de terceiro inocente","Reação contra o agressor"],["Perigo iminente","Não basta (exige atual)","Basta agressão iminente"],["Dever legal de enfrentar","Afasta a excludente","Não se aplica"]]},
  pegadinhas:["Estado de necessidade exige perigo <b>atual</b>; legítima defesa admite agressão <b>iminente</b>.","Não cabe legítima defesa contra ataque de animal (salvo se açulado por alguém) — é estado de necessidade."]},
{ id:"culpabilidade", titulo:"Culpabilidade", curto:"Culpabilidade",
  rapido:["Elementos (teoria normativa pura): <b>imputabilidade</b>, <b>potencial consciência da ilicitude</b> e <b>exigibilidade de conduta diversa</b>.",
    "Inimputáveis: doença mental ou desenvolvimento incompleto que retire inteiramente a capacidade (art. 26) → absolvição imprópria com medida de segurança; menores de 18 anos (art. 27).",
    "Emoção e paixão não excluem a imputabilidade; embriaguez voluntária ou culposa também não (<i>actio libera in causa</i>).","Só a embriaguez completa por caso fortuito ou força maior isenta de pena."],
  teoria:[
    { h:"Imputabilidade", p:[
      "O CP adota o critério <b>biopsicológico</b> para a doença mental (art. 26): exige a causa biológica e a incapacidade de entender ou de se determinar. Para menores de 18, critério <b>biológico</b> puro.",
      "Semi-imputável (parágrafo único do art. 26): pena reduzida de 1/3 a 2/3, ou substituída por medida de segurança se precisar de tratamento (sistema vicariante).",
      "Embriaguez: <b>voluntária ou culposa</b> não exclui (art. 28, II); <b>preordenada</b> é agravante (art. 61, II, l); <b>patológica</b> pode equivaler a doença mental (art. 26); <b>acidental completa</b> (caso fortuito ou força maior) isenta; incompleta reduz de 1/3 a 2/3."]},
    { h:"Inexigibilidade de conduta diversa", p:[
      "<b>Coação moral irresistível</b>: só o coator responde (art. 22). Se a coação é física, não há sequer conduta. Coação resistível: atenuante (art. 65, III, c).",
      "<b>Obediência hierárquica</b>: ordem não manifestamente ilegal de superior, em relação de direito público — só o superior responde. Ordem manifestamente ilegal: ambos respondem (subordinado com atenuante).",
      "A inexigibilidade de conduta diversa pode ser aplicada como causa <b>supralegal</b> em casos excepcionais."]}
  ],
  quadro:{ titulo:"Embriaguez", head:["Espécie","Efeito"], rows:[["Voluntária ou culposa (completa ou não)","Não exclui a imputabilidade"],["Preordenada","Agravante (art. 61, II, l)"],["Acidental completa (caso fortuito/força maior)","Isenta de pena (art. 28, §1º)"],["Acidental incompleta","Redução de 1/3 a 2/3 (art. 28, §2º)"],["Patológica","Pode ser tratada como doença mental (art. 26)"]]},
  pegadinhas:["Inimputável por doença mental: absolvição <b>imprópria</b>, com medida de segurança.","A prova do menor de 18 anos para fins penais exige documento hábil (Súmula 74 do STJ)."]}
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
{ id:"stf-adpf779", trib:"STF", tipo:"ADPF", num:"779", sec:"ilicitude", status:"vigente", data:"Julgamento finalizado em 01/08/2023 (Inf. 1105)", titulo:"Legítima defesa da honra é inconstitucional",
  texto:"É inconstitucional o uso da tese da legítima defesa da honra em crimes de feminicídio ou de agressão contra mulheres, na fase pré-processual, processual ou no julgamento do júri.", sintese:true,
  explica:"Se a defesa usar a tese, o julgamento pode ser anulado.", lei:["cp25"], fonte:"https://portal.stf.jus.br/processos/detalhe.asp?incidente=6081690" },
{ id:"stj-s74", trib:"STJ", tipo:"Súmula", num:"74", sec:"culpabilidade", status:"vigente", data:"", titulo:"Prova da menoridade", texto:"Para efeitos penais, o reconhecimento da menoridade do réu requer prova por documento hábil.", explica:"", lei:["cp27"], fonte:STJS }
],
cards:[
{ id:"il1", tipo:"lacuna", sec:"ilicitude", f:"Art. 23: excludentes de ilicitude — estado de ______, legítima ______, estrito cumprimento de ______ e exercício regular de ______.", v:"<b>necessidade</b> · <b>defesa</b> · <b>dever legal</b> · <b>direito</b>", lei:["cp23"] },
{ id:"il2", tipo:"ce", sec:"ilicitude", f:"Certo ou errado: o bombeiro pode alegar estado de necessidade para não entrar no prédio em chamas.", v:"<b>Errado.</b> Quem tem o dever legal de enfrentar o perigo não pode alegá-lo (art. 24, §1º) — dentro dos limites razoáveis do dever.", lei:["cp24"] },
{ id:"il3", tipo:"distincao", sec:"ilicitude", f:"Teoria unitária × diferenciadora do estado de necessidade.", v:"<b>Unitária</b> (CP): só justificante; se o bem sacrificado vale mais, só reduz a pena (§2º). <b>Diferenciadora</b> (CPM): justificante (bem menor) e exculpante (bem igual ou maior).", lei:["cp24"] },
{ id:"il4", tipo:"distincao", sec:"ilicitude", f:"Perigo atual × agressão iminente.", v:"Estado de necessidade exige perigo <b>atual</b>. Legítima defesa admite agressão <b>atual ou iminente</b>.", lei:["cp24","cp25"] },
{ id:"il5", tipo:"ce", sec:"ilicitude", f:"Certo ou errado: cabe legítima defesa contra agressão de doente mental.", v:"<b>Certo.</b> A agressão é injusta mesmo que o agressor seja inimputável.", lei:["cp25"] },
{ id:"il6", tipo:"juris", sec:"ilicitude", f:"A defesa pode sustentar \"legítima defesa da honra\" no júri de um feminicídio?", v:"<b>Não.</b> O STF declarou a tese inconstitucional (ADPF 779).", lei:["cp25"], j:["stf-adpf779"] },
{ id:"il7", tipo:"caso", sec:"ilicitude", f:"Após desarmar e imobilizar o agressor, a vítima o espanca até a morte. Qual a consequência?", v:"<b>Excesso</b>: a agressão já cessou. Responde pelo excesso doloso ou culposo (art. 23, parágrafo único).", lei:["cp23"] },
{ id:"il8", tipo:"distincao", sec:"culpabilidade", f:"Coação física irresistível × coação moral irresistível.", v:"<b>Física</b>: não há conduta (exclui o fato típico). <b>Moral</b>: exclui a culpabilidade (inexigibilidade); só o coator responde (art. 22).", lei:["cp22"] },
{ id:"il9", tipo:"distincao", sec:"culpabilidade", f:"Inimputável × semi-imputável por doença mental.", v:"<b>Inimputável</b> (inteiramente incapaz): isento de pena, absolvição imprópria com medida de segurança. <b>Semi-imputável</b>: condenado com redução de 1/3 a 2/3 ou medida de segurança (vicariante).", lei:["cp26"] },
{ id:"il10", tipo:"caso", sec:"culpabilidade", f:"Jovem atira na véspera dos 18 anos; a vítima morre uma semana depois. Responde pelo CP?", v:"<b>Não.</b> Teoria da atividade (art. 4º): era menor no momento da conduta — responde pelo ECA.", lei:["cp27"] },
{ id:"il11", tipo:"caso", sec:"culpabilidade", f:"Agente bebe para ter coragem de matar o desafeto. Qual a consequência da embriaguez?", v:"Embriaguez <b>preordenada</b>: não exclui a imputabilidade e é <b>agravante</b> (art. 61, II, l).", lei:["cp28"] },
{ id:"il12", tipo:"caso", sec:"culpabilidade", f:"Vítima de \"boa noite, Cinderela\" fica completamente embriagada e, sem discernimento, agride alguém. Responde?", v:"<b>Isento de pena</b>: embriaguez completa por caso fortuito ou força maior (art. 28, §1º).", lei:["cp28"] },
{ id:"il13", tipo:"ce", sec:"culpabilidade", f:"Certo ou errado: a emoção e a paixão excluem a imputabilidade.", v:"<b>Errado</b> (art. 28, I). Podem, porém, atenuar a pena ou gerar privilégio (homicídio sob violenta emoção).", lei:["cp28"] }
],
questoes:[]
};

/* ============================ ERRO ============================ */
T.penal_erros = {
meta:{ tema:"Erro de Tipo e Erro de Proibição", atualizado:AT, foco:"Erro de tipo essencial e acidental, descriminantes putativas, erro determinado por terceiro, erro sobre a pessoa, na execução e no resultado, e erro de proibição." },
secoes:[
{ id:"erro-tipo", titulo:"Erro de tipo", curto:"Erro de tipo",
  rapido:["Erro sobre elemento do tipo <b>exclui o dolo</b>; se evitável, permite punição por culpa, se prevista (art. 20).",
    "Escusável (inevitável): exclui dolo e culpa → fato atípico. Inescusável (evitável): exclui o dolo, pune a culpa.","Ex.: caçador atira em pessoa pensando ser animal."],
  teoria:[{ h:"Descriminantes putativas e erro provocado", p:[
    "Art. 20, §1º: quem, por erro plenamente justificado, supõe situação de fato que tornaria a ação legítima (ex.: pensa que vai ser atacado) é <b>isento de pena</b>; se o erro deriva de culpa, responde por crime culposo (culpa imprópria). O CP adota a teoria <b>limitada</b> da culpabilidade: erro sobre os pressupostos fáticos da excludente é tratado como erro de tipo; erro sobre a existência ou limites da excludente, como erro de proibição.",
    "Erro determinado por terceiro (§2º): responde pelo crime o terceiro que provocou o erro (autoria mediata)."]}],
  pegadinhas:["Erro de tipo essencial inevitável: fato atípico (sem dolo e sem culpa).","Teoria limitada da culpabilidade: erro de fato na excludente = erro de tipo permissivo."]},
{ id:"erro-acidental", titulo:"Erros acidentais", curto:"Acidental",
  rapido:["Erro sobre a pessoa (art. 20, §3º): consideram-se as qualidades da vítima <b>visada</b>.","Erro na execução — <i>aberratio ictus</i> (art. 73): atinge pessoa diversa por acidente ou erro no uso dos meios; responde como se tivesse atingido a visada.",
    "Resultado diverso — <i>aberratio criminis</i> (art. 74): atinge bem jurídico diverso; responde por culpa, se prevista.","Erro sobre o objeto e sobre o nexo causal não afastam o crime."],
  teoria:[{ h:"Diferenças práticas", p:[
    "No <b>erro sobre a pessoa</b> não há falha na execução: o agente confunde a vítima (mata o sósia do pai pensando ser o pai → responde como parricida, com a agravante do art. 61, II, e). Na <b>aberratio ictus</b>, a pontaria falha e outra pessoa é atingida; se atinge as duas, aplica-se o concurso formal (art. 70).",
    "<b>Aberratio criminis</b>: queria quebrar a vitrine e atinge uma pessoa → lesão culposa. Se atinge a coisa e a pessoa, concurso formal. Se queria atingir a pessoa e atinge a coisa, responde por tentativa contra a pessoa (dano culposo não é crime)."]}],
  pegadinhas:["Erro sobre a pessoa e aberratio ictus: consideram-se as condições da vítima <b>pretendida</b>, não da efetiva."]},
{ id:"erro-proibicao", titulo:"Erro de proibição", curto:"Proibição",
  rapido:["Desconhecer a lei é inescusável; o erro sobre a <b>ilicitude</b> do fato, se inevitável, isenta de pena; se evitável, reduz de <b>1/6 a 1/3</b> (art. 21).",
    "Exclui a <b>potencial consciência da ilicitude</b> (culpabilidade), não o dolo.","Ex.: estrangeiro que, por costume do seu país, acredita ser lícita determinada conduta."],
  teoria:[{ h:"Erro de proibição direto e indireto", p:[
    "<b>Direto</b>: o agente acha a conduta lícita. <b>Indireto</b> (descriminante putativa por erro de proibição): sabe que é ilícita em geral, mas acha que existe uma excludente ou erra sobre seus limites (ex.: pensa que pode matar o ladrão que já fugiu). <b>Mandamental</b>: erro nos crimes omissivos sobre o dever de agir.",
    "Evitável é o erro de quem, nas circunstâncias, podia atingir a consciência da ilicitude (art. 21, parágrafo único)."]}],
  quadro:{ titulo:"Erro de tipo × erro de proibição", head:["","Erro de tipo","Erro de proibição"], rows:[["Sobre o quê","Elementos do tipo (a realidade)","A ilicitude (a regra)"],["Fórmula","\"Não sei o que faço\"","\"Sei o que faço, acho que é permitido\""],["Inevitável","Exclui dolo e culpa (atípico)","Isenta de pena"],["Evitável","Pune a culpa, se prevista","Reduz de 1/6 a 1/3"]]}}
],
lei:[
{ art:"CP, arts. 20 e 21", nome:"Erro", sec:"erro-tipo", itens:[
  { id:"cp20", rot:"Art. 20", t:"O erro sobre <b class='g1'>elemento constitutivo do tipo legal</b> de crime <b class='g1'>exclui o dolo</b>, mas permite a punição por crime culposo, <b class='g3'>se previsto em lei</b>.<br>§ 1º - É isento de pena quem, por erro plenamente justificado pelas circunstâncias, <b class='g1'>supõe situação de fato que, se existisse, tornaria a ação legítima</b>. Não há isenção de pena quando o erro deriva de culpa e o fato é punível como crime culposo.<br>§ 2º - Responde pelo crime o <b class='g1'>terceiro que determina o erro</b>.<br>§ 3º - O erro quanto à pessoa contra a qual o crime é praticado não isenta de pena. Não se consideram, neste caso, as condições ou qualidades da vítima, <b class='g3'>senão as da pessoa contra quem o agente queria praticar o crime</b>.", c:["er1","er2","er3","er4"] },
  { id:"cp21", rot:"Art. 21", t:"O <b class='g1'>desconhecimento da lei é inescusável</b>. O erro sobre a ilicitude do fato, se <b class='g1'>inevitável, isenta de pena</b>; se evitável, poderá diminuí-la de <b class='g2'>um sexto a um terço</b>.<br>Parágrafo único - Considera-se evitável o erro se o agente atua ou se omite sem a consciência da ilicitude do fato, quando lhe era possível, nas circunstâncias, ter ou atingir essa consciência.", c:["er5","er6"] }
]},
{ art:"CP, arts. 73 e 74", nome:"Erro na execução e resultado diverso", sec:"erro-acidental", itens:[
  { id:"cp73", rot:"Art. 73", t:"Quando, por <b class='g1'>acidente ou erro no uso dos meios de execução</b>, o agente, ao invés de atingir a pessoa que pretendia ofender, atinge pessoa diversa, responde <b class='g3'>como se tivesse praticado o crime contra aquela</b>, atendendo-se ao disposto no § 3º do art. 20 deste Código. No caso de ser também atingida a pessoa que o agente pretendia ofender, aplica-se a regra do art. 70 deste Código.", c:["er7"] },
  { id:"cp74", rot:"Art. 74", t:"Fora dos casos do artigo anterior, quando, por acidente ou erro na execução do crime, sobrevém <b class='g1'>resultado diverso do pretendido</b>, o agente responde por culpa, se o fato é previsto como crime culposo; se ocorre também o resultado pretendido, aplica-se a regra do art. 70 deste Código.", c:["er8"] }
]}
],
juris:[],
cards:[
{ id:"er1", tipo:"caso", sec:"erro-tipo", f:"Caçador atira num vulto achando ser um javali; era uma pessoa. O erro era evitável. Qual o crime?", v:"<b>Homicídio culposo</b>: erro de tipo evitável exclui o dolo e permite a punição por culpa (art. 20).", lei:["cp20"] },
{ id:"er2", tipo:"caso", sec:"erro-tipo", f:"À noite, alguém vê o vizinho com algo na mão vindo em sua direção, acha que é uma arma e atira. Era um celular. Erro plenamente justificado. Consequência?", v:"<b>Isento de pena</b> — legítima defesa putativa por erro de tipo permissivo (art. 20, §1º). Se o erro fosse evitável: homicídio culposo.", lei:["cp20"] },
{ id:"er3", tipo:"caso", sec:"erro-tipo", f:"Médico entrega à enfermeira seringa com veneno dizendo ser remédio; ela aplica e o paciente morre. Quem responde?", v:"O <b>médico</b> (terceiro que determinou o erro — art. 20, §2º; autoria mediata). A enfermeira, se não havia como perceber, não responde.", lei:["cp20"] },
{ id:"er4", tipo:"caso", sec:"erro-acidental", f:"Quer matar o pai e mata, por engano, um desconhecido muito parecido com ele. Incide a agravante de crime contra ascendente?", v:"<b>Sim.</b> Erro sobre a pessoa: consideram-se as qualidades da vítima visada (art. 20, §3º).", lei:["cp20"] },
{ id:"er5", tipo:"numero", sec:"erro-proibicao", f:"Erro de proibição evitável: qual a redução?", v:"<b>1/6 a 1/3</b> (art. 21). Inevitável: isenta de pena.", lei:["cp21"] },
{ id:"er6", tipo:"distincao", sec:"erro-proibicao", f:"Erro de tipo × erro de proibição.", v:"<b>Tipo</b>: erro sobre a realidade (\"não sei o que faço\") — exclui o dolo. <b>Proibição</b>: erro sobre a ilicitude (\"sei o que faço, acho permitido\") — atinge a culpabilidade.", lei:["cp20","cp21"] },
{ id:"er7", tipo:"caso", sec:"erro-acidental", f:"Atira no desafeto, erra e mata quem estava ao lado. Qual o crime? E se atingir os dois?", v:"<b>Aberratio ictus</b>: responde como se tivesse atingido o desafeto (art. 73). Atingindo os dois: <b>concurso formal</b> (art. 70).", lei:["cp73"] },
{ id:"er8", tipo:"caso", sec:"erro-acidental", f:"Atira pedra para quebrar a vitrine e acerta um pedestre. Qual o crime?", v:"<b>Aberratio criminis</b>: lesão corporal <b>culposa</b> (art. 74). Se quebra a vitrine e fere a pessoa: concurso formal.", lei:["cp74"] },
{ id:"er9", tipo:"ce", sec:"erro-proibicao", f:"Certo ou errado: o desconhecimento da lei isenta de pena quando o agente é pessoa simples.", v:"<b>Errado.</b> O desconhecimento da lei é inescusável (art. 21); pode, no máximo, ser atenuante (art. 65, II). Isenta o erro inevitável sobre a <b>ilicitude</b>.", lei:["cp21"] },
{ id:"er10", tipo:"distincao", sec:"erro-tipo", f:"Teoria limitada da culpabilidade (adotada pelo CP): como trata a descriminante putativa?", v:"Erro sobre os <b>pressupostos fáticos</b> da excludente = erro de tipo permissivo. Erro sobre a <b>existência ou limites</b> da excludente = erro de proibição indireto.", lei:["cp20","cp21"] }
],
questoes:[]
};

/* ============================ CONCURSO DE PESSOAS ============================ */
T.penal_concurso = {
meta:{ tema:"Concurso de Pessoas", atualizado:AT, foco:"Requisitos, teoria monista, autoria e participação, domínio do fato, participação de menor importância, cooperação dolosamente distinta e comunicabilidade de circunstâncias." },
secoes:[
{ id:"requisitos", titulo:"Requisitos e teorias", curto:"Requisitos",
  rapido:["Requisitos: pluralidade de agentes e condutas, relevância causal, <b>liame subjetivo</b> (não precisa de acordo prévio) e identidade de infração.",
    "CP adota a teoria <b>monista</b> (unitária): todos respondem pelo mesmo crime, na medida da culpabilidade (art. 29).","Exceções pluralistas: aborto (gestante × terceiro), corrupção ativa × passiva, falso testemunho × suborno."],
  teoria:[{ h:"Autoria e participação", p:[
    "<b>Autor</b> (teoria restritiva/objetivo-formal): quem realiza o verbo do tipo. A <b>teoria do domínio do fato</b> amplia: é autor quem controla a realização do crime (autor intelectual, autor mediato). Autoria mediata: usa inimputável ou pessoa em erro como instrumento.",
    "<b>Partícipe</b>: concorre sem realizar o verbo nem dominar o fato, por <b>induzimento</b>, <b>instigação</b> ou <b>auxílio</b> material. A participação é acessória: prevalece a teoria da acessoriedade <b>limitada</b> (basta que o fato principal seja típico e ilícito).",
    "<b>Autoria colateral</b>: dois agem sem saber um do outro (não há concurso); cada um responde pelo que causou. Se não se sabe quem causou o resultado (incerta), ambos respondem por tentativa.",
    "Art. 31: ajuste, determinação, instigação e auxílio não são puníveis se o crime não chega a ser tentado."]}],
  pegadinhas:["Liame subjetivo não exige acordo prévio: basta aderir à conduta alheia (ex.: empregada que deixa a porta aberta sabendo do furto).","Não existe participação após a consumação, salvo se combinada antes (ajuda posterior combinada = participação; não combinada = favorecimento)."]},
{ id:"regras", titulo:"Regras especiais", curto:"Regras",
  rapido:["Participação de menor importância: redução de <b>1/6 a 1/3</b> (art. 29, §1º) — só para partícipe.",
    "Cooperação dolosamente distinta: quem quis crime menos grave responde por este; pena aumentada até metade se o mais grave era previsível (§2º).",
    "Circunstâncias pessoais não se comunicam, salvo quando elementares do crime (art. 30)."],
  teoria:[{ h:"Comunicabilidade", p:[
    "Elementares (dados que compõem o tipo) se comunicam ao coautor ou partícipe que delas tenha conhecimento: o particular que ajuda o funcionário público a se apropriar de bem da repartição responde por <b>peculato</b>.",
    "Circunstâncias <b>objetivas</b> (modo, meio, lugar) se comunicam se conhecidas. Circunstâncias <b>subjetivas</b> (motivo, relação com a vítima, reincidência) não se comunicam. Ex.: no infanticídio, o estado puerperal é elementar e se comunica ao terceiro que ajuda a mãe (prevalece).",
    "Cooperação dolosamente distinta: dois combinam um furto; um deles, sem o outro saber, mata o morador. Quem só quis o furto responde por furto, com aumento de até metade se a morte era previsível."]}],
  quadro:{ titulo:"Autor × partícipe", head:["","Autor","Partícipe"], rows:[["Conduta","Realiza o verbo ou domina o fato","Induz, instiga ou auxilia"],["Menor importância (§1º)","Não se aplica","Redução de 1/6 a 1/3"],["Punição","Sempre que houver tentativa","Depende de o crime ser ao menos tentado (art. 31)"]]}}
],
lei:[
{ art:"CP, arts. 29 a 31", nome:"Concurso de pessoas", sec:"requisitos", itens:[
  { id:"cp29", rot:"Art. 29", t:"Quem, <b class='g1'>de qualquer modo, concorre para o crime</b> incide nas penas a este cominadas, <b class='g3'>na medida de sua culpabilidade</b>.<br>§ 1º - Se a <b class='g1'>participação for de menor importância</b>, a pena pode ser diminuída de <b class='g2'>um sexto a um terço</b>.<br>§ 2º - Se algum dos concorrentes <b class='g1'>quis participar de crime menos grave</b>, ser-lhe-á aplicada a pena deste; essa pena será aumentada <b class='g2'>até metade</b>, na hipótese de ter sido <b class='g3'>previsível o resultado mais grave</b>.", c:["cp1c","cp2c","cp3c","cp4c"] },
  { id:"cp30", rot:"Art. 30", t:"<b class='g3'>Não se comunicam</b> as circunstâncias e as condições de caráter pessoal, <b class='g3'>salvo quando elementares do crime</b>.", c:["cp5c","cp6c"] },
  { id:"cp31", rot:"Art. 31", t:"O ajuste, a determinação ou instigação e o auxílio, salvo disposição expressa em contrário, <b class='g3'>não são puníveis, se o crime não chega, pelo menos, a ser tentado</b>.", c:["cp7c"] }
]}
],
juris:[],
cards:[
{ id:"cp1c", tipo:"lacuna", sec:"requisitos", f:"Requisitos do concurso de pessoas: pluralidade de agentes, relevância causal, ______ e identidade de infração.", v:"<b>liame subjetivo</b> (vínculo psicológico — não exige acordo prévio)", lei:["cp29"] },
{ id:"cp2c", tipo:"numero", sec:"regras", f:"Participação de menor importância: qual a redução e a quem se aplica?", v:"<b>1/6 a 1/3</b>, só ao <b>partícipe</b> (art. 29, §1º).", lei:["cp29"] },
{ id:"cp3c", tipo:"caso", sec:"regras", f:"A e B combinam furtar uma casa. Lá dentro, B, sem A saber, estupra a moradora. Por qual crime A responde?", v:"Por <b>furto</b> (cooperação dolosamente distinta, art. 29, §2º), com aumento de até metade se o crime mais grave era previsível.", lei:["cp29"] },
{ id:"cp4c", tipo:"ce", sec:"requisitos", f:"Certo ou errado: o CP adota a teoria monista, sem exceções.", v:"<b>Errado.</b> Adota a monista com exceções pluralistas (aborto, corrupção ativa e passiva, falso testemunho e suborno).", lei:["cp29"] },
{ id:"cp5c", tipo:"caso", sec:"regras", f:"Particular ajuda funcionário público a se apropriar de computador da repartição, sabendo da condição dele. Qual o crime do particular?", v:"<b>Peculato</b>: a condição de funcionário é elementar e se comunica (art. 30).", lei:["cp30"] },
{ id:"cp6c", tipo:"ce", sec:"regras", f:"Certo ou errado: o motivo torpe de um coautor se estende automaticamente aos demais.", v:"<b>Errado.</b> Circunstância subjetiva/pessoal não se comunica (art. 30).", lei:["cp30"] },
{ id:"cp7c", tipo:"caso", sec:"requisitos", f:"A instiga B a matar C, mas B desiste antes de iniciar a execução. A responde?", v:"<b>Não.</b> A participação não é punível se o crime não chega a ser tentado (art. 31).", lei:["cp31"] },
{ id:"cp8c", tipo:"distincao", sec:"requisitos", f:"Autoria colateral × coautoria.", v:"<b>Coautoria</b>: há liame subjetivo, todos respondem pelo resultado. <b>Colateral</b>: agem sem saber um do outro; cada um responde pelo que causou (se incerto, ambos por tentativa).", lei:["cp29"] },
{ id:"cp9c", tipo:"distincao", sec:"requisitos", f:"Autoria mediata: o que é?", v:"O autor usa outra pessoa como <b>instrumento</b> (inimputável, alguém em erro ou coagido). Só o autor mediato responde (ex.: art. 20, §2º).", lei:["cp29"] },
{ id:"cp10c", tipo:"ce", sec:"requisitos", f:"Certo ou errado: pela acessoriedade limitada, o partícipe responde mesmo que o autor seja inimputável.", v:"<b>Certo.</b> Basta que o fato principal seja típico e ilícito.", lei:["cp29"] }
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
