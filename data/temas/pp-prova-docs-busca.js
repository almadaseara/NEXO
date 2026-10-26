/* Direito Processual Penal (IV): prova documental, indícios e busca e apreensão (CPP, arts. 231 a 250; CF, art. 5º, XI).
   Conferido em 24/10/2026. Texto legal transcrito de memória e marcado "confira" onde há dúvida; itens recentes ficam como "atenção".
   Base didática: material de estudo PC-BA (Processo Penal, provas), reescrito com estrutura e palavras próprias. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "24/10/2026";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

T.pp_prova_docs_busca = {
meta:{ tema:"Prova documental, indícios e busca e apreensão", atualizado:AT,
  foco:"Documentos (conceito, momento de juntada, cartas, falsidade); indícios (art. 239); busca domiciliar e pessoal (fundadas razões, mandado, horário, conceito de casa, escritório de advogado, consentimento, fuga para dentro de casa); acesso a celular e demais pontos de jurisprudência.",
  aviso:"Julgados de 2025/2026 (celular, horário de busca, Informativo 884/2026) estão marcados como «atenção»: vieram do material de estudo e não foram reconfirmados na fonte oficial." },
secoes:[
{ id:"documentos", titulo:"Prova documental e indícios (arts. 231 a 239)", curto:"Documentos e indícios",
  rapido:["<b>Documento</b> é todo suporte que registra fato ou ideia (escrito, foto, gravação). Em sentido estrito, só o escrito; os demais, como <b>instrumentos</b> ou meios materiais, também valem como prova.",
    "As partes podem juntar documentos <b>em qualquer fase</b> (art. 231), salvo as exceções legais — por exemplo, no júri, a juntada exige ciência à parte contrária com antecedência mínima de 3 dias úteis (art. 479).",
    "<b>Cartas particulares</b> interceptadas ou obtidas por meios criminosos <b>não são admitidas</b> (art. 233); se obtidas licitamente, o destinatário ou o remetente pode exibi-las em sua defesa.",
    "<b>Indício</b> (art. 239): circunstância conhecida e provada que, por <b>indução</b>, leva a concluir outra circunstância. É prova <b>indireta</b>, não plena, mas pode fundamentar condenação se forem vários, graves e concordantes."],
  teoria:[
    { h:"Falsidade e vícios", p:[
      "Documento <b>falso</b> (material ou ideologicamente) é tratado no incidente de falsidade (art. 145). Documento com <b>vício de formalidade</b> não é, por isso, falso — o vício afeta a eficácia, não a autenticidade.",
      "Documentos em língua estrangeira devem ser traduzidos (art. 236), e os públicos fazem prova da formalidade do ato. Fotografias e gravações exigem verificação de autenticidade e licitude da obtenção.",
      "Há provas <b>tarifadas</b> por documento: certidão de óbito (extinção da punibilidade) e documento hábil para a menoridade (Súmula 74 do STJ)."]},
    { h:"Indícios e presunções", p:[
      "Não confundir <b>indício</b> (art. 239) — raciocínio lógico a partir de fato provado — com <b>mero indício de autoria</b> para fins de pronúncia, prisão preventiva ou denúncia (justa causa). Nesses casos, usa-se a palavra no sentido de <b>prova semiplena</b>.",
      "Presunções <b>legais</b> podem ser consideradas, mas o ônus da prova continua com a acusação."]}],
  pegadinhas:["Carta particular obtida por meio criminoso: <b>inadmissível</b> (art. 233).",
    "Indício <b>não é</b> prova inferior à direta por natureza: depende de pluralidade e coerência.",
    "Documento de <b>menoridade</b>: exige prova documental (Súm. 74/STJ)."] },

{ id:"busca-dom", titulo:"Busca e apreensão domiciliar", curto:"Busca domiciliar",
  rapido:["A casa é <b>asilo inviolável</b> (CF, art. 5º, XI): entra-se com <b>consentimento</b> do morador, em <b>flagrante delito</b>, <b>desastre</b> ou para <b>prestar socorro</b> (a qualquer hora) ou, <b>durante o dia</b>, com <b>ordem judicial</b>.",
    "Só <b>juiz</b> expede o mandado de busca domiciliar. O CPP, em seu art. 241, que permitia à autoridade policial fazê-lo, não foi recepcionado.",
    "<b>Fundadas razões</b> (art. 240, § 1º, a-h): prender criminoso; apreender coisas obtidas por meio criminoso; instrumentos de falsificação; armas, munições e instrumentos do crime; descobrir objetos necessários à prova ou à defesa; cartas; vítimas; qualquer elemento de convicção. O rol é <b>taxativo</b>.",
    "Mandado (art. 243): indica a casa e o morador, o <b>motivo e os fins</b> da diligência, e é assinado pelo juiz. Não se apreende documento em poder do <b>defensor</b>, salvo se integrar o corpo de delito (§ 2º)."],
  teoria:[
    { h:"Conceito de «casa»", p:[
      "O art. 150, § 4º, do Código Penal e o art. 246 do CPP ampliam o conceito: <b>moradia</b> (inclusive quarto de hotel), <b>compartimento habitado</b> de habitação coletiva e <b>local não aberto ao público</b> onde alguém exerce profissão ou atividade (escritório, consultório). Veículos usados como moradia (cabine de caminhão com leito) e <b>galpões fechados</b> também podem receber a proteção."]},
    { h:"Horário e execução", p:[
      "A diligência é <b>diurna</b>, salvo consentimento (art. 245). O executor mostra e <b>lê</b> o mandado ao morador, intima-o a abrir a porta e, se houver desobediência, a porta é arrombada e a entrada forçada (art. 245, § 2º). Se o morador resistir, admite-se força contra as coisas e, se necessário, contra a pessoa (§ 3º). Estando ausentes os moradores, intima-se um vizinho para assistir (§ 4º), e ao final lavra-se <b>auto circunstanciado</b> assinado por <b>duas testemunhas</b> presenciais (§ 7º). A busca em casa habitada deve molestar os moradores o mínimo indispensável (art. 248).",
      "Conceito de «dia»: a Constituição não define. Há corrente pelo critério cronológico (das 6h às 18h), outra pelo físico-astronômico e uma terceira, defendida pelo STJ no RHC 196.481/RN (10/12/2025 — <b>atenção</b>), que adotou a janela das 5h às 21h por analogia com a Lei de Abuso de Autoridade (Lei 13.869/2019). Não é entendimento consolidado."]},
    { h:"Escritório de advogado", p:[
      "A inviolabilidade do local de trabalho do advogado (Estatuto da OAB, art. 7º, II e § 6º) exige <b>decisão judicial motivada</b>, em caso de indício de autoria e materialidade de crime praticado pelo próprio advogado, com <b>representante da OAB</b> presente e restrição ao que é objeto da investigação."]},
    { h:"Entrada sem mandado: tema 280 do STF", p:[
      "A entrada forçada sem mandado só é lícita, inclusive à noite, quando amparada em <b>fundadas razões</b>, justificadas <b>depois</b> (a posteriori), de que há <b>flagrante delito</b> em curso no interior. A mera denúncia anônima ou o nervosismo do suspeito não bastam isoladamente. O consentimento do morador precisa ser <b>livre</b> e, segundo o STJ (HC 598.051), de preferência <b>registrado em vídeo</b> e de forma que prove a voluntariedade (Informativo 807 — confira).",
      "<b>Fuga para dentro de casa</b>: a perseguição que ingressa na residência pode ser válida se havia fundada suspeita do flagrante (STF, HC 169.788); o STJ tratou do tema no Informativo 884/2026 (<b>atenção</b>). Cão farejador, imóvel abandonado e <b>teoria da aparência</b> (policial acreditou razoavelmente que a casa não era residência) têm tratamento casuístico."]},
    { h:"Outras regras de execução", p:[
      "O art. 250 trata da perseguição que atravessa jurisdição alheia: o agente pode entrar no território de outra comarca ou Estado e deve apresentar-se à autoridade local antes ou depois da diligência, conforme a urgência.",
      "A defesa tem acesso à <b>íntegra</b> da representação e da decisão que deferiu a medida (SV 14; RHC 114.683). O mandado com <b>descrição vaga</b> do objeto procurado pode ser nulo quando permite apreensão genérica."]}],
  pegadinhas:["Dia: CF fala de <b>determinação judicial durante o dia</b>; flagrante, desastre e socorro valem a qualquer hora.",
    "Quem expede o mandado: <b>somente o juiz</b> — o delegado não.",
    "Nervosismo isolado do suspeito <b>não autoriza</b> a entrada em casa."] },

{ id:"busca-pessoal", titulo:"Busca pessoal e demais pontos", curto:"Busca pessoal",
  rapido:["<b>Busca pessoal</b> independe de mandado em três hipóteses (art. 244): no caso de <b>prisão</b>; quando há <b>fundada suspeita</b> de que a pessoa esconda arma proibida ou objetos que constituam corpo de delito; ou no curso de <b>busca domiciliar</b>.",
    "Fundada suspeita exige <b>elementos objetivos e concretos</b>, não mera intuição, aparência ou nervosismo. <b>Filtragem racial</b> é ilegal (STF, HC 208.240).",
    "<b>Fishing expedition</b> (busca especulativa sem indício prévio) é proibida.",
    "<b>Celular apreendido</b>: acesso aos dados depende de ordem judicial, salvo exceções definidas pelo STF (Tema 977, 2025 — <b>atenção</b>)."],
  teoria:[
    { h:"Fundada suspeita", p:[
      "É o critério do art. 244: elemento <b>concreto</b> que conecte a pessoa a um delito — denúncia específica, comportamento objetivamente anômalo, flagrante visual de volume suspeito. O STJ afasta a busca fundada apenas em «atitude suspeita» ou nervosismo. A busca veicular segue a mesma lógica que a pessoal."]},
    { h:"Acesso a dados de celular", p:[
      "O STF (Tema 977, jun/2025 — <b>atenção</b>) definiu limites para o acesso ao aparelho apreendido; em regra, <b>autorização judicial</b> ou consentimento válido. Desbloqueio forçado e leitura de mensagens sem ordem são nulos. Em dispositivos descartados (chip abandonado), a jurisprudência é mais permissiva."]},
    { h:"Guarda municipal e outras forças", p:[
      "A guarda municipal pode realizar prisão em flagrante e busca pessoal nos limites do art. 301 do CPP e da fundada suspeita (STJ, HC 681.625 — confira); não pode atuar como polícia investigativa."]}],
  pegadinhas:["Busca pessoal sem mandado é <b>exceção</b>: prisão, fundada suspeita ou durante busca domiciliar.",
    "Cor da pele ou aparência <b>não</b> constitui fundada suspeita.",
    "Busca com «cão farejador» sozinha não basta para entrar em casa (casuístico)."] }
],
lei:[
{ art:"CPP, arts. 231, 233 e 239", nome:"Documentos e indícios", sec:"documentos", itens:[
  { id:"cpp231", rot:"Art. 231",
    t:"Salvo os casos expressos em lei, as partes poderão apresentar <b class='g1'>documentos em qualquer fase do processo</b>.",
    c:["pb1"] },
  { id:"cpp233", rot:"Art. 233",
    t:"As <b class='g1'>cartas particulares</b>, interceptadas ou obtidas por meios criminosos, <b class='g3'>não serão admitidas em juízo</b>.",
    c:["pb2"] },
  { id:"cpp239", rot:"Art. 239",
    t:"Considera-se <b class='g1'>indício</b> a circunstância <b class='g1'>conhecida e provada</b>, que, tendo relação com o fato, autorize, por <b class='g1'>indução</b>, concluir-se a existência de outra ou outras circunstâncias.",
    c:["pb3"] }]},
{ art:"CPP, arts. 240 a 250; CF, art. 5º, XI", nome:"Busca e apreensão", sec:"busca-dom", itens:[
  { id:"cf5xi", rot:"CF, art. 5º, XI",
    t:"A casa é <b class='g1'>asilo inviolável</b> do indivíduo, ninguém nela podendo penetrar sem <b class='g1'>consentimento do morador</b>, salvo em caso de <b class='g3'>flagrante delito ou desastre</b>, ou para prestar socorro, ou, <b class='g3'>durante o dia</b>, por <b class='g1'>determinação judicial</b>.",
    c:["pb4","pb5"], j:["stf-t280"] },
  { id:"cpp240", rot:"Art. 240",
    t:"A busca será <b class='g1'>domiciliar ou pessoal</b>. § 1º Proceder-se-á à busca domiciliar, quando <b class='g1'>fundadas razões</b> a autorizarem, para: a) prender criminosos; b) apreender coisas achadas ou obtidas por meios criminosos; c) apreender instrumentos de falsificação ou de contrafação e objetos falsificados ou contrafeitos; d) apreender armas e munições, instrumentos utilizados na prática de crime ou destinados a fim delituoso; e) descobrir objetos necessários à prova de infração ou à defesa do réu; f) apreender cartas, abertas ou não, destinadas ao acusado ou em seu poder [...]; g) apreender pessoas vítimas de crimes; h) colher qualquer elemento de convicção. § 2º Proceder-se-á à busca pessoal quando houver <b class='g3'>fundada suspeita</b> de que alguém oculte consigo arma proibida ou objetos mencionados nas letras b a f e h do parágrafo anterior.",
    c:["pb6"] },
  { id:"cpp243", rot:"Art. 243",
    t:"O mandado de busca deverá: I – indicar, o mais precisamente possível, a <b class='g1'>casa</b> em que será realizada a diligência e o nome do respectivo proprietário ou morador [...]; II – mencionar o <b class='g1'>motivo e os fins</b> da diligência; III – ser subscrito pelo escrivão e assinado pela autoridade que o fizer expedir. [...] § 2º <b class='g3'>Não será permitida a apreensão de documento em poder do defensor do acusado</b>, salvo quando constituir elemento do corpo de delito.",
    c:["pb7"] },
  { id:"cpp244", rot:"Art. 244",
    t:"A <b class='g1'>busca pessoal</b> independerá de mandado, no caso de <b class='g3'>prisão</b> ou quando houver <b class='g3'>fundada suspeita</b> de que a pessoa esteja na posse de arma proibida ou de objetos ou papéis que constituam corpo de delito, ou quando a medida for determinada no curso de busca domiciliar.",
    c:["pb8"], j:["stf-hc208240"] },
  { id:"cpp245", rot:"Art. 245",
    t:"As buscas domiciliares serão executadas de <b class='g1'>dia</b> e, salvo se o morador consentir que se realizem à noite, antes de se proceder à busca, o executor <b class='g1'>mostrará e lerá o mandado</b> ao morador, ou a quem o represente, intimando-o, em seguida, a abrir a porta.",
    nota:"Os parágrafos tratam de arrombamento, resistência e testemunhas; confira.", c:["pb9"] },
  { id:"cpp246", rot:"Art. 246",
    t:"Aplicar-se-á também o disposto no artigo anterior, quando se tiver de proceder a busca em <b class='g1'>compartimento habitado</b>, ou em aposento ocupado de habitação coletiva ou em <b class='g1'>compartimento não aberto ao público</b>, onde alguém exercer profissão ou atividade.",
    c:["pb10"] },
  { id:"cpp250", rot:"Art. 250",
    t:"A autoridade ou seus agentes poderão <b class='g1'>penetrar no território de jurisdição alheia</b>, ainda que de outro Estado, quando, para o fim de apreensão, forem no <b class='g1'>seguimento de pessoa ou coisa</b>, devendo apresentar-se à competente autoridade local, antes da diligência ou após, conforme a urgência." }]}
],
juris:[
{ id:"stf-t280", trib:"STF", tipo:"Repercussão geral", num:"RE 603.616 (Tema 280)", sec:"busca-dom", status:"vigente", data:"05/11/2015",
  titulo:"Entrada forçada em domicílio sem mandado",
  texto:"A entrada forçada em domicílio sem mandado judicial só é lícita, mesmo em período noturno, quando amparada em fundadas razões, devidamente justificadas a posteriori, que indiquem que dentro da casa ocorre situação de flagrante delito, sob pena de responsabilidade disciplinar, civil e penal do agente ou da autoridade e de nulidade dos atos praticados.",
  explica:"Exige justificativa concreta e posterior. Complementada por HC 598.051 (STJ) sobre consentimento do morador. Confira o texto exato no acórdão.", lei:["cf5xi"], fonte:STFJ },
{ id:"stj-hc598051", trib:"STJ", tipo:"HC", num:"HC 598.051/SP", sec:"busca-dom", status:"atencao", data:"02/03/2021 (confira)",
  titulo:"Consentimento para a entrada em domicílio",
  texto:"Segundo o material de estudo: o consentimento do morador deve ser livre, voluntário e, de preferência, documentado (inclusive em vídeo); o ônus de provar a voluntariedade é do Estado.",
  explica:"Reforça o Tema 280. Dados do julgado a confirmar.", lei:["cf5xi"], fonte:STJJ },
{ id:"stf-hc208240", trib:"STF", tipo:"HC", num:"HC 208.240", sec:"busca-pessoal", status:"atencao", data:"2024 (confira)",
  titulo:"Filtragem racial em abordagem policial",
  texto:"Segundo o material de estudo: a busca pessoal motivada por perfil racial não satisfaz a exigência de fundada suspeita e é ilegal.",
  explica:"Ligado ao art. 244. Confira a tese fixada pelo STF.", lei:["cpp244"], fonte:STFJ },
{ id:"stf-t977", trib:"STF", tipo:"Repercussão geral", num:"Tema 977 (2025)", sec:"busca-pessoal", status:"atencao", data:"06/2025 (confira)",
  titulo:"Acesso a dados de celular apreendido",
  texto:"Segundo o material de estudo: o acesso a dados do aparelho apreendido exige, em regra, autorização judicial ou consentimento válido.",
  explica:"Tese trazida do material de estudo, sem reconfirmação oficial. Cuidado ao citar em prova.", lei:[], fonte:STFJ },
{ id:"stj-rhc196481", trib:"STJ", tipo:"RHC", num:"RHC 196.481/RN", sec:"busca-dom", status:"atencao", data:"10/12/2025 (confira)",
  titulo:"Conceito de «dia» para busca domiciliar",
  texto:"Segundo o material de estudo: adotou-se o intervalo das 5h às 21h, por analogia à Lei 13.869/2019.",
  explica:"Não é entendimento consolidado; há três critérios na doutrina (cronológico, físico-astronômico e misto).", lei:["cf5xi","cpp245"], fonte:STJJ }
],
cards:[
{ id:"pb1", tipo:"ce", sec:"documentos", f:"(C/E) As partes só podem juntar documentos na fase de instrução.",
  v:"<b>Errado.</b> Art. 231: em qualquer fase do processo, ressalvadas as exceções legais (ex.: três dias úteis no júri).", lei:["cpp231"] },
{ id:"pb2", tipo:"caso", sec:"documentos", f:"Uma carta íntima do acusado é furtada pela vítima e juntada aos autos. É admissível?",
  v:"<b>Não.</b> Cartas particulares obtidas por meios criminosos não são admitidas (art. 233).", lei:["cpp233"] },
{ id:"pb3", tipo:"lacuna", sec:"documentos", f:"Indício é a circunstância ___ e provada que, por indução, leva a concluir outra circunstância.",
  v:"<b>conhecida</b> (art. 239).", lei:["cpp239"] },
{ id:"pb4", tipo:"distincao", sec:"busca-dom", f:"Entrar em casa: o que vale de dia × de noite?",
  v:"<b>Dia</b>: com consentimento, flagrante, desastre, socorro ou ordem judicial. <b>Noite</b>: consentimento, flagrante, desastre ou socorro (não a ordem judicial).", lei:["cf5xi"] },
{ id:"pb5", tipo:"caso", sec:"busca-dom", f:"Policiais ouvem de um vizinho que há drogas na casa de X e arrombam a porta sem mandado, sem ver nada. O que o STF exige?",
  v:"<b>Fundadas razões</b>, justificadas a posteriori, de que há flagrante no interior (Tema 280). Denúncia vaga e isolada não basta.", lei:["cf5xi"], j:["stf-t280"] },
{ id:"pb6", tipo:"ce", sec:"busca-dom", f:"(C/E) O rol de hipóteses de busca domiciliar do art. 240, § 1º, é exemplificativo.",
  v:"<b>Errado.</b> É <b>taxativo</b> (alíneas a a h).", lei:["cpp240"] },
{ id:"pb7", tipo:"caso", sec:"busca-dom", f:"Em busca no escritório, a polícia apreende documentos que o advogado guardava sobre cliente. Pode?",
  v:"Em regra <b>não</b> (art. 243, § 2º), salvo se o documento integra o corpo de delito; a busca em escritório exige decisão fundada e presença da OAB.", lei:["cpp243"] },
{ id:"pb8", tipo:"caso", sec:"busca-pessoal", f:"Um jovem é abordado apenas por parecer nervoso ao ver a viatura. A busca pessoal é legal?",
  v:"<b>Não.</b> Nervosismo isolado não é fundada suspeita; deve haver elementos concretos (art. 244).", lei:["cpp244"] },
{ id:"pb9", tipo:"distincao", sec:"busca-dom", f:"Quando a busca domiciliar pode ser feita à noite?",
  v:"Com <b>consentimento</b> do morador; e, sem mandado, em flagrante, desastre ou para prestar socorro.", lei:["cpp245"] },
{ id:"pb10", tipo:"caso", sec:"busca-dom", f:"O consultório do médico está fechado ao público. Pode ser invadido sem mandado?",
  v:"<b>Não.</b> É «casa» para fins constitucionais e do art. 246: compartimento não aberto ao público onde se exerce profissão.", lei:["cpp246"] },
{ id:"pb11", tipo:"distincao", sec:"busca-pessoal", f:"Busca pessoal sem mandado: quando é lícita?",
  v:"Prisão; fundada suspeita de arma proibida ou objetos de corpo de delito; ou no curso de busca domiciliar (art. 244).", lei:["cpp244"] },
{ id:"pb12", tipo:"juris", sec:"busca-dom", f:"Tema 280 do STF: o que justifica a entrada forçada sem mandado?",
  v:"Fundadas razões, justificadas depois, de que há flagrante no interior da casa.", lei:["cf5xi"], j:["stf-t280"] },
{ id:"pb13", tipo:"juris", sec:"busca-pessoal", f:"Tema 977 do STF (2025): acesso a celular apreendido.",
  v:"Em regra, depende de <b>ordem judicial</b> ou consentimento válido (atenção: tese trazida do material, a confirmar).", lei:[], j:["stf-t977"] }
],
importancia:{ nivel:5,
  texto:"Busca domiciliar e pessoal são campo de nulidade clássico: a banca cobra as hipóteses de entrada em casa, a exigência de ordem judicial, a fundada suspeita e a diferença entre documento, indício e prova ilícita.",
  decore:[
    ["Entrada em casa (CF, art. 5º, XI)","consentimento, flagrante, desastre ou socorro (<b>a qualquer hora</b>); ordem judicial (<b>só de dia</b>)"],
    ["Quem expede mandado de busca domiciliar","<b>somente o juiz</b>"],
    ["Fundadas razões (art. 240, § 1º)","rol <b>taxativo</b>"],
    ["Busca pessoal sem mandado (art. 244)","<b>prisão</b>, <b>fundada suspeita</b> ou durante <b>busca domiciliar</b>"],
    ["Fundada suspeita","elementos <b>objetivos e concretos</b>; nervosismo ou aparência não bastam"],
    ["Auto da busca","assinado por <b>duas testemunhas</b> presenciais (art. 245, § 7º)"],
    ["Carta particular obtida por meio criminoso (art. 233)","<b>inadmissível</b>"],
    ["Indício (art. 239)","circunstância provada que, por <b>indução</b>, leva a outra"],
    ["Súmula 74 do STJ","menoridade exige <b>prova documental</b>"]],
  macetes:[
    ["Dia ou noite","Flagrante, desastre e socorro valem a qualquer hora; a ordem judicial, só de dia."],
    ["Só o juiz","O art. 241 do CPP, que permitia à autoridade policial expedir mandado, não foi recepcionado."],
    ["Pescaria é proibida","Fishing expedition: busca especulativa, sem indício prévio, é ilícita."]] },
comparativo:{ titulo:"Busca domiciliar × busca pessoal", head:["Busca domiciliar","Busca pessoal"], rows:[
  ["<b>Regra:</b> exige ordem judicial, de dia","<b>Regra:</b> independe de mandado nas hipóteses do art. 244"],
  ["<b>Exceções:</b> consentimento, flagrante, desastre e socorro","<b>Hipóteses:</b> prisão, fundada suspeita ou busca domiciliar em curso"],
  ["<b>Quem determina:</b> juiz, nunca o delegado","<b>Quem faz:</b> a autoridade ou seus agentes, com fundada suspeita concreta"],
  ["<b>Conceito de casa:</b> moradia, quarto de hotel, compartimento habitado e local de trabalho não aberto ao público","<b>Limite:</b> elementos concretos; vedada a filtragem racial"],
  ["<b>Execução:</b> ler o mandado, intimar a abrir a porta, auto com duas testemunhas","<b>Vedação:</b> fishing expedition"]]},
prova:[
  { tipo:"ce", enun:"A autoridade policial pode expedir mandado de busca domiciliar, nos termos do art. 241 do CPP.", gab:"Errado", com:"Só o juiz expede o mandado de busca domiciliar; o art. 241 não foi recepcionado." },
  { tipo:"ce", enun:"Em caso de flagrante delito, a entrada na casa sem mandado é permitida a qualquer hora do dia ou da noite.", gab:"Certo", com:"CF, art. 5º, XI: flagrante, desastre e socorro valem a qualquer hora." },
  { tipo:"ce", enun:"O nervosismo do suspeito, isoladamente, autoriza a busca pessoal e a entrada em domicílio.", gab:"Errado", com:"A fundada suspeita exige elementos objetivos e concretos." },
  { tipo:"ce", enun:"Cartas particulares obtidas por meio criminoso não são admitidas como prova.", gab:"Certo", com:"Art. 233 do CPP." },
  { tipo:"ce", enun:"Os indícios, por serem prova indireta, nunca podem fundamentar condenação.", gab:"Errado", com:"Podem, desde que numerosos, graves e concordantes (art. 239)." },
  { tipo:"caso", enun:"Policiais abordam um homem apenas porque ele aparentou nervosismo ao ver a viatura, e o revistam. Há fundada suspeita?", com:"Não. Nervosismo e aparência não são elementos objetivos e concretos; a busca é ilegal e a prova dela decorrente é contaminada." }],
resumo:[
  "Documento é todo suporte que registra fato ou ideia; as partes podem juntá-lo em qualquer fase (art. 231), com exceções.",
  "Carta particular obtida por meio criminoso é inadmissível (art. 233).",
  "Indício (art. 239) é prova indireta; vale se houver pluralidade, gravidade e concordância.",
  "Casa é asilo inviolável: consentimento, flagrante, desastre e socorro a qualquer hora; ordem judicial só de dia.",
  "Só o juiz expede mandado de busca domiciliar; o mandado indica casa, motivo e fins.",
  "Conceito de casa inclui moradia, quarto de hotel, compartimento habitado e local de trabalho fechado ao público.",
  "Busca pessoal sem mandado: prisão, fundada suspeita ou durante busca domiciliar.",
  "Fundada suspeita exige elementos concretos; filtragem racial e fishing expedition são ilegais."],
checklist:[
  "Listar as hipóteses de entrada em casa sem ordem judicial",
  "Explicar quem expede o mandado e o que ele deve conter",
  "Aplicar o conceito de casa do art. 246",
  "Saber como se executa a busca (leitura do mandado, auto, testemunhas)",
  "Distinguir fundada suspeita de intuição ou nervosismo",
  "Reconhecer a vedação à fishing expedition e à filtragem racial",
  "Aplicar o art. 233 e a Súmula 74 do STJ",
  "Diferenciar indício, prova indireta e prova ilícita"],
questoes:[]
};
})();
