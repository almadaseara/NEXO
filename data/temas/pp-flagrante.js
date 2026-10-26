/* Direito Processual Penal (V): prisão em flagrante e audiência de custódia (CPP, arts. 301 a 310; CF, art. 5º, LXI a LXVI).
   Conferido em 24/10/2026. Texto legal transcrito de memória e marcado "confira" onde há dúvida; alterações de 2025/2026 ficam como "atenção".
   Base didática: material de estudo PC-BA (Processo Penal, prisão em flagrante), reescrito com estrutura e palavras próprias. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "24/10/2026";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var CNJ = "https://atos.cnj.jus.br/";

T.pp_flagrante = {
meta:{ tema:"Prisão em flagrante e audiência de custódia", atualizado:AT,
  foco:"Natureza e espécies de flagrante (próprio, impróprio, presumido); flagrante facultativo e obrigatório; situações especiais; etapas; flagrante esperado, preparado, forjado e diferido; lavratura do auto e prazos (art. 306); audiência de custódia e decisões do art. 310; limites do juiz (Súmula 676 do STJ).",
  aviso:"As mudanças de 2025/2026 no art. 310 (Leis 15.272/2025 e 15.358/2026) estão marcadas como «atenção»: vieram do material de estudo e não foram reconfirmadas no texto oficial." },
secoes:[
{ id:"natureza", titulo:"Natureza e espécies de flagrante (arts. 301 a 303)", curto:"Espécies",
  rapido:["Flagrante é medida <b>cautelar de natureza administrativa</b> e <b>precária</b>: dura só até a decisão do juiz (art. 310). Não exige ordem judicial.",
    "<b>Facultativo</b> para qualquer do povo; <b>obrigatório</b> para as autoridades policiais e seus agentes (art. 301).",
    "Art. 302: <b>próprio</b> (está cometendo ou acaba de cometer); <b>impróprio</b> ou quase flagrante (é perseguido logo após, em situação que faça presumir a autoria); <b>presumido</b> (encontrado logo depois com instrumentos, armas, objetos ou papéis que façam presumir a autoria).",
    "<b>Crime permanente</b>: há flagrante enquanto não cessar a permanência (art. 303)."],
  teoria:[
    { h:"Espécies do art. 302", p:[
      "<b>Próprio (real)</b>: incisos I e II — ninguém dúvida: o agente é visto praticando ou acabou de praticar. <b>Impróprio (quase flagrante)</b>: inciso III — há <b>perseguição</b> contínua, sem lapso; o STJ não fixa prazo em horas, exige que a perseguição não seja interrompida. <b>Presumido (ficto)</b>: inciso IV — não há perseguição, mas o encontro «logo depois» com os objetos; o «logo depois» é mais elástico que o «logo após».",
      "Em crime <b>permanente</b> (extorsão mediante sequestro, tráfico na modalidade «ter em depósito»), o flagrante dura enquanto durar a conduta, o que autoriza ingresso em domicílio nessas condições (ver tema de busca). Crime <b>habitual</b>: controvertido; exige prova de reiteração no momento da prisão. Crime <b>continuado</b>: cada ato é flagrante autônomo."]},
    { h:"Perseguição em outro território", p:[
      "O art. 290 permite que a autoridade persiga o suspeito em outra comarca (ou Estado) e o prenda, apresentando-se à autoridade local."]},
    { h:"Quatro etapas", p:[
      "<b>1) Captura</b>: quem prende (qualquer pessoa ou policial). <b>2) Condução coercitiva</b> até a autoridade. <b>3) Lavratura do auto</b> de prisão em flagrante (APF) pelo delegado. <b>4) Recolhimento</b> ao cárcere, se for o caso (ou liberação, nos casos de fiança ou ausência de motivo)."]},
    { h:"Situações especiais", p:[
      "<b>Menores de 18 anos</b>: sofrem apreensão (ECA), não prisão em flagrante. <b>Presidente da República</b>: não pode ser preso sem sentença condenatória (CF, art. 86, § 3º). <b>Parlamentares</b>, <b>magistrados</b> e <b>membros do MP</b>: só em flagrante de crime <b>inafiançável</b>. <b>Diplomatas</b>: imunidade. <b>Apresentação espontânea</b> não afasta a prisão em flagrante propriamente dita (a pessoa não é «presa em flagrante»; cabe preventiva). <b>JECRIM</b>: autor do fato que se compromete a comparecer não é preso (Lei 9.099, art. 69, parágrafo único). <b>Porte de drogas para uso</b>: sem prisão (Lei 11.343, art. 48, § 2º)."]}],
  pegadinhas:["Flagrante <b>impróprio</b> tem perseguição; o <b>presumido</b> não — apenas encontro com objetos.",
    "Facultativo (particular) × <b>obrigatório</b> (autoridade e agentes).",
    "Menor de 18: <b>apreensão</b>, não flagrante."] },

{ id:"modalidades", titulo:"Flagrante esperado, preparado, forjado e diferido", curto:"Modalidades",
  rapido:["<b>Esperado</b>: a polícia só aguarda a prática, sem induzir — flagrante <b>válido</b>.",
    "<b>Preparado ou provocado</b>: a polícia induz o agente e impede a consumação — <b>crime impossível</b> (Súmula 145 do STF). Exceção: crimes de ação múltipla ou permanentes em que a conduta de «ter em depósito» já existia (Lei 11.343, art. 33, § 1º, IV).",
    "<b>Forjado</b>: fabricação de provas contra inocente — flagrante <b>ilegal</b>, com responsabilidade penal do agente.",
    "<b>Diferido ou retardado (ação controlada)</b>: a polícia adia a prisão para colher mais provas (Lei 12.850, art. 8º; Lei 11.343, art. 53 — entrega vigiada)."],
  teoria:[
    { h:"Comparação", p:[
      "<b>Esperado</b>: o agente já tinha o propósito, a polícia só se posiciona para surpreendê-lo. <b>Preparado</b>: a polícia cria a ocasião, o agente age induzido, mas há <b>vigilância total</b> que impede a consumação: crime impossível por ineficácia absoluta do meio. <b>Forjado</b>: tudo é invenção, ou colocam-se objetos com a vítima do forjamento. <b>Diferido</b>: ocorre o crime e adia-se a intervenção para atingir os líderes ou apreender mais, com autorização judicial prévia, em regra.",
      "A <b>denúncia anônima</b> pode fundamentar um flagrante esperado, mas não sozinha a entrada em casa."]}],
  pegadinhas:["Súm. 145 STF: preparação policial que impede a consumação = <b>não há crime</b>.",
    "No tráfico, «ter em depósito» é crime <b>permanente</b>: o flagrante provocado pode não afastar o delito.",
    "Ação controlada: é <b>adiamento</b> da intervenção, não indução."] },

{ id:"procedimento", titulo:"Lavratura do auto e prazos (arts. 304 a 309)", curto:"Procedimento",
  rapido:["Apresentado o preso, a autoridade ouve, <b>nesta ordem</b>: o <b>condutor</b> (entrega-lhe cópia do termo e recibo), as <b>testemunhas</b> e, por último, o <b>conduzido</b> (art. 304).",
    "Art. 306: comunicação <b>imediata</b> ao juiz, ao MP e à família (ou pessoa indicada); em até <b>24 horas</b> o auto segue ao juiz e, se o preso não indicar advogado, cópia integral à <b>Defensoria Pública</b>; também em 24 horas entrega-se a <b>nota de culpa</b> ao preso, com o motivo da prisão e os nomes do condutor e das testemunhas.",
    "Sem testemunhas do fato, o auto pode ser assinado por <b>duas pessoas que presenciaram a apresentação</b> do preso (art. 304, § 2º). Recusa do preso em assinar não invalida o ato (§ 3º, assinatura por duas testemunhas).",
    "O art. 304, § 4º, manda registrar informações sobre os <b>filhos</b> do preso (idades, deficiência e responsável)."],
  teoria:[
    { h:"Ordem das oitivas", p:[
      "Primeiro o <b>condutor</b>, para que possa ser liberado rapidamente; depois as <b>testemunhas</b>; por fim o <b>interrogatório</b> do preso, que pode ficar calado e deve ser informado dos direitos constitucionais (CF, art. 5º, LXIII), inclusive o de assistência de advogado e família."]},
    { h:"Comunicações e prazos do art. 306", p:[
      "Comunicação <b>imediata</b> (juiz, MP e família). Em <b>24 horas</b> da prisão: encaminhamento do auto ao juiz, cópia à Defensoria (se o autuado não indicar advogado) e entrega da <b>nota de culpa</b>. A falta de comunicação pode tornar ilegal a prisão e ensejar seu relaxamento."]},
    { h:"Crimes de ação condicionada ou privada", p:[
      "Em crime de ação pública <b>condicionada</b>, a pessoa pode ser presa, mas o auto só segue com a representação da vítima; sem ela, é solta em 24 horas. Em ação <b>privada</b>, depende de requerimento do ofendido."]}],
  pegadinhas:["Ordem do art. 304: <b>condutor → testemunhas → conduzido</b>.",
    "Prazo de 24 horas vale para o envio do auto ao juiz <b>e</b> para a nota de culpa.",
    "A Defensoria recebe cópia <b>se</b> o preso não indicar advogado."] },

{ id:"custodia", titulo:"Audiência de custódia e decisão do art. 310", curto:"Custódia",
  rapido:["Em até <b>24 horas</b> da prisão, o juiz promove a <b>audiência de custódia</b>, com o preso, advogado ou Defensoria e MP, e decide <b>fundamentadamente</b>: (I) <b>relaxa</b> a prisão ilegal; (II) <b>converte em preventiva</b> se presentes os requisitos do art. 312 e inadequadas as cautelares diversas; ou (III) <b>concede liberdade provisória</b>, com ou sem fiança.",
    "A finalidade da audiência é verificar a <b>legalidade da prisão</b> e a ocorrência de <b>tortura ou maus-tratos</b> — o juiz <b>não</b> examina o mérito do crime (Resolução CNJ 213/2015; Pacto de São José, art. 7º, 5).",
    "<b>Súmula 676 do STJ</b>: o juiz <b>não pode converter de ofício</b> a prisão em flagrante em preventiva — precisa de requerimento do MP, da autoridade policial ou do querelante.",
    "Reincidente, integrante de organização criminosa armada ou milícia, ou portador de arma de uso restrito: o § 2º do art. 310 determina a <b>denegação da liberdade provisória</b> — dispositivo criticado como inconstitucional; o STF exige análise do caso concreto."],
  teoria:[
    { h:"Três respostas do juiz", p:[
      "<b>Relaxamento</b>: a prisão é <b>ilegal</b> (por exemplo, falta de situação flagrancial, ausência de comunicação, descumprimento de formalidades essenciais). <b>Conversão em preventiva</b>: exige requisitos do art. 312 (prova da existência do crime e indício suficiente de autoria + perigo gerado pela liberdade do imputado) e <b>insuficiência</b> das cautelares do art. 319. <b>Liberdade provisória</b>: caso contrário, com ou sem fiança, com ou sem cautelares diversas.",
      "Art. 310, § 1º: se o agente agiu em excludente de ilicitude (art. 23, I a III, do CP), concede-se liberdade provisória, mediante termo de comparecimento a todos os atos. Os §§ 3º e 4º tratam da audiência não realizada no prazo sem motivo idôneo (responsabilização de quem deu causa e possível ilegalidade da prisão); o STF orienta avaliar o caso concreto, sem relaxamento automático — confira."]},
    { h:"Mudanças recentes (atenção)", p:[
      "O material de estudo registra que a Lei 15.358/2026 permitiu a realização da audiência por <b>videoconferência</b> (antes, presencial; o STF já admitia a videoconferência em hipóteses excepcionais), acrescentou os §§ 7º a 13 ao art. 310 e que a Lei 15.272/2025 incluiu os §§ 5º e 6º. <b>Atenção</b>: não reconfirmei o texto dessas leis; confira antes de citar em prova.",
      "Há ainda previsão de coleta de <b>perfil genético</b> (art. 310-A, em 10 dias) citada no material — <b>atenção</b>, confira."]},
    { h:"Limites e relações", p:[
      "O art. 311 e a Súmula 676 do STJ vedam a decretação de ofício da preventiva. O juiz pode, porém, <b>relaxar</b> ou <b>conceder liberdade</b> de ofício. A Resolução CNJ 213 estende a audiência de custódia também às <b>prisões por mandado</b> (cumprimento de ordem judicial).",
      "Sobre a audiência não realizada no prazo, a leitura do STF é de avaliar o caso concreto (atenção, confira)."]}],
  pegadinhas:["O juiz <b>não pode</b> converter o flagrante em preventiva de ofício (Súm. 676/STJ).",
    "Na audiência de custódia <b>não se discute o mérito</b> da acusação.",
    "O § 2º do art. 310 (vedação de liberdade provisória) tem sido <b>mitigado</b> por exigência de análise concreta."] }
],
lei:[
{ art:"CPP, arts. 301 a 303", nome:"Flagrante: quem prende e espécies", sec:"natureza", itens:[
  { id:"cpp301", rot:"Art. 301",
    t:"Qualquer do povo <b class='g3'>poderá</b> e as autoridades policiais e seus agentes <b class='g3'>deverão</b> prender quem quer que seja encontrado em <b class='g1'>flagrante delito</b>.",
    c:["pf1"] },
  { id:"cpp302", rot:"Art. 302",
    t:"Considera-se em flagrante delito quem: I – está <b class='g1'>cometendo</b> a infração penal; II – <b class='g1'>acaba de cometê-la</b>; III – é <b class='g1'>perseguido</b>, logo após, pelo ofendido ou por qualquer pessoa, em situação que faça presumir ser autor da infração; IV – é encontrado, <b class='g1'>logo depois</b>, com instrumentos, armas, objetos ou papéis que façam presumir ser ele autor da infração.",
    c:["pf2","pf3"] },
  { id:"cpp303", rot:"Art. 303",
    t:"Nas infrações <b class='g1'>permanentes</b>, entende-se o agente em flagrante delito <b class='g3'>enquanto não cessar a permanência</b>.",
    c:["pf4"] }]},
{ art:"CPP, arts. 304 a 306", nome:"Auto e comunicações", sec:"procedimento", itens:[
  { id:"cpp304", rot:"Art. 304",
    t:"Apresentado o preso à autoridade competente, ouvirá esta o <b class='g1'>condutor</b> e colherá, desde logo, sua assinatura, entregando a este cópia do termo e recibo de entrega do preso. Em seguida, procederá à oitiva das <b class='g1'>testemunhas</b> que o acompanharem e ao <b class='g1'>interrogatório do acusado</b> sobre a imputação que lhe é feita, colhendo, após cada oitiva suas respectivas assinaturas, lavrando, a autoridade, afinal, o auto.",
    nota:"Os §§ 1º a 4º tratam de fundadas suspeitas, falta de testemunhas, recusa de assinatura e informações sobre filhos; confira.", c:["pf5"] },
  { id:"cpp306", rot:"Art. 306",
    t:"A prisão de qualquer pessoa e o local onde se encontre serão comunicados <b class='g1'>imediatamente</b> ao juiz competente, ao Ministério Público e à família do preso ou à pessoa por ele indicada. § 1º Em até <b class='g2'>24 horas</b> após a realização da prisão, será encaminhado ao juiz competente o <b class='g1'>auto de prisão em flagrante</b> e, caso o autuado não informe o nome de seu advogado, cópia integral para a <b class='g1'>Defensoria Pública</b>. § 2º No mesmo prazo, será entregue ao preso, mediante recibo, a <b class='g1'>nota de culpa</b>, assinada pela autoridade, com o motivo da prisão, o nome do condutor e os das testemunhas.",
    c:["pf6","pf7"] }]},
{ art:"CPP, arts. 310 e 311", nome:"Audiência de custódia", sec:"custodia", itens:[
  { id:"cpp310", rot:"Art. 310",
    t:"Após receber o auto de prisão em flagrante, no prazo máximo de até <b class='g2'>24 horas</b> após a realização da prisão, o juiz deverá promover <b class='g1'>audiência de custódia</b> com a presença do acusado, seu advogado constituído ou membro da Defensoria Pública e o membro do Ministério Público, e, nessa audiência, o juiz deverá, fundamentadamente: I – <b class='g1'>relaxar a prisão ilegal</b>; ou II – <b class='g1'>converter a prisão em flagrante em preventiva</b>, quando presentes os requisitos constantes do art. 312 deste Código, e se revelarem inadequadas ou insuficientes as medidas cautelares diversas da prisão; ou III – conceder <b class='g1'>liberdade provisória</b>, com ou sem fiança.",
    nota:"Os §§ 1º a 4º e os acréscimos recentes (§§ 5º a 13, Leis 15.272/2025 e 15.358/2026 — atenção) devem ser conferidos no texto oficial.", novo:true, c:["pf8","pf9","pf10"], j:["stj-s676"] },
  { id:"cpp311", rot:"Art. 311",
    t:"Em qualquer fase da investigação policial ou do processo penal, caberá a prisão preventiva decretada pelo juiz, a requerimento do Ministério Público, do querelante ou do assistente, ou por representação da autoridade policial.",
    nota:"Redação dada pela Lei 13.964/2019, que retirou a possibilidade de decretação de ofício; confira.", c:["pf10"], j:["stj-s676"] }]}
],
juris:[
{ id:"stf-s145", trib:"STF", tipo:"Súmula", num:"Súmula 145", sec:"modalidades", status:"vigente", data:"13/12/1963",
  titulo:"Flagrante preparado pela polícia",
  texto:"Não há crime, quando a preparação do flagrante pela polícia torna impossível a sua consumação.",
  explica:"Crime impossível por ineficácia absoluta do meio. Não alcança o flagrante esperado nem os crimes permanentes já em curso.", lei:["cpp302"], fonte:STFJ },
{ id:"stj-s676", trib:"STJ", tipo:"Súmula", num:"Súmula 676", sec:"custodia", status:"atencao", data:"2024 (confira)",
  titulo:"Vedada a conversão de ofício do flagrante em preventiva",
  texto:"Em razão da Lei n. 13.964/2019, não é mais possível a conversão da prisão em flagrante em preventiva sem prévio requerimento do Ministério Público, da autoridade policial, do querelante ou do assistente.",
  explica:"Redação conforme o material de estudo; confira o texto da súmula. Reflete o sistema acusatório (art. 3º-A).", lei:["cpp310","cpp311"], fonte:STJJ },
{ id:"cnj-res213", trib:"CNJ", tipo:"Resolução", num:"Resolução CNJ 213/2015", sec:"custodia", status:"vigente", data:"15/12/2015",
  titulo:"Audiência de custódia",
  texto:"Disciplina a apresentação de toda pessoa presa, em flagrante ou por mandado, à autoridade judicial em até 24 horas, para análise da legalidade da prisão e de eventuais maus-tratos.",
  explica:"O juiz não analisa o mérito do delito. Também se aplica às prisões por mandado. Confira o texto atual.", lei:["cpp310"], fonte:CNJ },
{ id:"stj-hc681625", trib:"STJ", tipo:"HC", num:"HC 681.625", sec:"natureza", status:"atencao", data:"confira",
  titulo:"Guardas municipais e prisão em flagrante",
  texto:"Segundo o material de estudo: a guarda municipal pode realizar a prisão em flagrante, como qualquer pessoa, nos termos do art. 301 do CPP.",
  explica:"Não é polícia investigativa; confira o julgado.", lei:["cpp301"], fonte:STJJ }
],
cards:[
{ id:"pf1", tipo:"ce", sec:"natureza", f:"(C/E) Qualquer pessoa tem a obrigação legal de prender quem for encontrado em flagrante delito.",
  v:"<b>Errado.</b> Para o particular é <b>faculdade</b>; para as autoridades policiais e seus agentes é <b>dever</b> (art. 301).", lei:["cpp301"] },
{ id:"pf2", tipo:"distincao", sec:"natureza", f:"Flagrante próprio × impróprio × presumido.",
  v:"<b>Próprio</b>: está cometendo ou acaba de cometer. <b>Impróprio</b>: é <b>perseguido</b> logo após. <b>Presumido</b>: é encontrado <b>logo depois</b> com objetos que indiquem a autoria (sem perseguição).", lei:["cpp302"] },
{ id:"pf3", tipo:"caso", sec:"natureza", f:"Duas horas depois do roubo, a polícia encontra o suspeito dentro de casa, com a arma e o celular da vítima. Que flagrante é?",
  v:"<b>Presumido</b> (art. 302, IV): encontrado logo depois com objetos que fazem presumir a autoria, sem perseguição contínua.", lei:["cpp302"] },
{ id:"pf4", tipo:"caso", sec:"natureza", f:"Há extorsão mediante sequestro em curso, com a vítima em cativeiro. Em que momento termina o estado de flagrância?",
  v:"Quando cessar a permanência — com a libertação da vítima (art. 303).", lei:["cpp303"] },
{ id:"pf5", tipo:"lacuna", sec:"procedimento", f:"Ordem das oitivas no auto de prisão em flagrante: ___ → testemunhas → conduzido.",
  v:"<b>condutor</b> (art. 304, caput).", lei:["cpp304"] },
{ id:"pf6", tipo:"numero", sec:"procedimento", f:"Em quanto tempo o auto de prisão em flagrante vai ao juiz e a nota de culpa é entregue?",
  v:"<b>24 horas</b> da prisão (art. 306, §§ 1º e 2º). Se o preso não indicar advogado, cópia integral à Defensoria.", lei:["cpp306"] },
{ id:"pf7", tipo:"caso", sec:"procedimento", f:"O preso, ao ser apresentado, não tem advogado. O que o delegado deve providenciar?",
  v:"Enviar cópia integral do auto à <b>Defensoria Pública</b> em 24 horas (art. 306, § 1º).", lei:["cpp306"] },
{ id:"pf8", tipo:"numero", sec:"custodia", f:"Prazo para a audiência de custódia.",
  v:"Até <b>24 horas</b> após a prisão (art. 310).", lei:["cpp310"] },
{ id:"pf9", tipo:"distincao", sec:"custodia", f:"Relaxamento × conversão em preventiva × liberdade provisória.",
  v:"<b>Relaxamento</b>: prisão ilegal. <b>Preventiva</b>: legal, mas há requisitos do art. 312 e cautelares insuficientes. <b>Liberdade provisória</b>: legal, sem necessidade de segregação.", lei:["cpp310"] },
{ id:"pf10", tipo:"ce", sec:"custodia", f:"(C/E) Na audiência de custódia, o juiz pode, de ofício, converter a prisão em flagrante em preventiva.",
  v:"<b>Errado.</b> Súmula 676 do STJ: só com requerimento do MP, da autoridade policial, do querelante ou do assistente (art. 311).", lei:["cpp310","cpp311"], j:["stj-s676"] },
{ id:"pf11", tipo:"juris", sec:"modalidades", f:"Súmula 145 do STF: quando a preparação do flagrante pela polícia afasta o crime?",
  v:"Quando <b>torna impossível a consumação</b> (flagrante preparado/provocado).", lei:["cpp302"], j:["stf-s145"] },
{ id:"pf12", tipo:"caso", sec:"modalidades", f:"Informante avisa que X vai vender droga no ponto Y. Policiais esperam e prendem X no momento da venda. Há ilegalidade?",
  v:"<b>Não.</b> É flagrante <b>esperado</b>: a polícia só aguardou, não induziu. Cuidado: a denúncia anônima isolada não autoriza entrar em casa.", lei:["cpp302"] },
{ id:"pf13", tipo:"distincao", sec:"modalidades", f:"Flagrante preparado × forjado × diferido.",
  v:"<b>Preparado</b>: polícia induz e impede a consumação (não há crime). <b>Forjado</b>: invenção de provas (ilegal). <b>Diferido</b>: adia-se a prisão para colher mais prova (válido).", lei:[] },
{ id:"pf14", tipo:"caso", sec:"natureza", f:"Um adolescente de 16 anos é pego em flagrante praticando roubo. O delegado lavra auto de prisão em flagrante?",
  v:"<b>Não.</b> Há <b>apreensão</b> por ato infracional (ECA), com procedimento próprio.", lei:[] },
{ id:"pf15", tipo:"ce", sec:"custodia", f:"(C/E) A audiência de custódia destina-se a examinar a legalidade da prisão e eventual ocorrência de maus-tratos, sem apreciar o mérito do crime.",
  v:"<b>Certo.</b> Resolução CNJ 213/2015 e Pacto de São José, art. 7º, 5.", lei:["cpp310"], j:["cnj-res213"] }
],
importancia:{ nivel:5,
  texto:"Flagrante e audiência de custódia são tema certo para delegado e investigador: a banca explora as espécies do art. 302, os flagrantes ilegais (preparado, forjado), os prazos de 24 horas e a Súmula 676 do STJ.",
  decore:[
    ["Espécies (art. 302)","<b>próprio</b>, <b>impróprio</b> (perseguição) e <b>presumido</b> (encontro com objetos)"],
    ["Flagrante do particular × autoridade","<b>facultativo</b> × <b>obrigatório</b> (art. 301)"],
    ["Ordem das oitivas (art. 304)","<b>condutor, testemunhas, conduzido</b>"],
    ["Prazo do auto ao juiz e da nota de culpa","<b>24 horas</b> (art. 306)"],
    ["Audiência de custódia","em até <b>24 horas</b> da prisão"],
    ["Decisões do juiz (art. 310)","<b>relaxar</b>, <b>converter em preventiva</b> ou <b>conceder liberdade provisória</b>"],
    ["Súmula 145 do STF","flagrante <b>preparado</b> que impede a consumação: crime impossível"],
    ["Súmula 676 do STJ","juiz <b>não converte de ofício</b> o flagrante em preventiva"],
    ["Menor de 18 anos","<b>apreensão</b> (ECA), não prisão em flagrante"]],
  macetes:[
    ["Perseguiu: impróprio","Se há perseguição, é impróprio; se só há encontro com os objetos, é presumido."],
    ["Esperar pode, induzir não","Flagrante esperado é válido; preparado, que impede a consumação, gera crime impossível."],
    ["Custódia não julga o mérito","A audiência verifica a legalidade da prisão e eventual tortura ou maus-tratos."]] },
comparativo:{ titulo:"Flagrante esperado × preparado × forjado × diferido", head:["Figura","Efeito"], rows:[
  ["<b>Esperado:</b> a polícia apenas aguarda a prática, sem induzir","<b>Válido</b>"],
  ["<b>Preparado ou provocado:</b> a polícia induz o agente e impede a consumação","<b>Crime impossível</b> (Súmula 145 do STF)"],
  ["<b>Forjado:</b> fabricação de provas contra inocente","<b>Ilegal</b>, com responsabilidade penal de quem forjou"],
  ["<b>Diferido (ação controlada):</b> adia a intervenção para colher mais provas","<b>Válido</b>, em regra com autorização judicial (Lei 12.850, art. 8º)"],
  ["<b>Exceção ao preparado:</b> crime permanente, como ter em depósito (tráfico)","O flagrante pode subsistir, pois a conduta já existia"]]},
prova:[
  { tipo:"ce", enun:"No flagrante impróprio, o agente é perseguido logo após o crime em situação que faça presumir a autoria.", gab:"Certo", com:"Art. 302, III: há perseguição contínua, sem lapso." },
  { tipo:"ce", enun:"O flagrante é facultativo para as autoridades policiais e obrigatório para qualquer do povo.", gab:"Errado", com:"É o contrário: facultativo para qualquer do povo e obrigatório para autoridades e agentes (art. 301)." },
  { tipo:"ce", enun:"Ao lavrar o auto, a autoridade ouve primeiro o preso, depois as testemunhas e, por último, o condutor.", gab:"Errado", com:"A ordem do art. 304 é condutor, testemunhas e conduzido." },
  { tipo:"ce", enun:"Na audiência de custódia, o juiz pode, de ofício, converter a prisão em flagrante em preventiva.", gab:"Errado", com:"Súmula 676 do STJ: exige requerimento do MP, da autoridade policial ou do querelante." },
  { tipo:"ce", enun:"A audiência de custódia examina o mérito da acusação e a prova da autoria.", gab:"Errado", com:"Verifica a legalidade da prisão e a ocorrência de tortura ou maus-tratos." },
  { tipo:"caso", enun:"A polícia induz alguém a vender droga e o prende de modo a impedir a consumação do crime. Que flagrante é este e qual o efeito?", com:"Flagrante preparado ou provocado, que gera crime impossível (Súmula 145 do STF). O flagrante é ilegal e deve ser relaxado." }],
resumo:[
  "Flagrante é medida cautelar administrativa e precária; dura até a decisão do juiz (art. 310).",
  "Facultativo para o particular e obrigatório para autoridades e agentes policiais (art. 301).",
  "Próprio: acaba de cometer. Impróprio: perseguição logo após. Presumido: encontro com instrumentos ou objetos.",
  "Em crime permanente, há flagrante enquanto não cessar a permanência (art. 303).",
  "Preparado gera crime impossível (Súmula 145 do STF); esperado e diferido são válidos; forjado é ilegal.",
  "Auto: oitivas na ordem condutor, testemunhas e conduzido; em 24 horas, envio ao juiz, cópia à Defensoria e nota de culpa.",
  "Audiência de custódia em 24 horas: o juiz relaxa, converte em preventiva ou concede liberdade provisória.",
  "O juiz não converte de ofício em preventiva (Súmula 676 do STJ); menor de 18 anos sofre apreensão."],
checklist:[
  "Distinguir flagrante próprio, impróprio e presumido",
  "Explicar o flagrante facultativo e o obrigatório",
  "Citar a ordem das oitivas do art. 304",
  "Saber os prazos de 24 horas do art. 306",
  "Diferenciar flagrante esperado, preparado, forjado e diferido",
  "Aplicar as Súmulas 145 do STF e 676 do STJ",
  "Listar as três decisões do juiz na custódia",
  "Identificar quem não pode ser preso em flagrante (menor, Presidente, imunidades)"],
questoes:[]
};
})();
