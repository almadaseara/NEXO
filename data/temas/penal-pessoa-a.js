/* Direito Penal — Crimes contra a Pessoa (I): visão geral, homicídio, feminicídio e vicaricídio.
   Conferido em 14/10/2026. Texto legal: Código Penal (Planalto), Leis 14.994/2024, 15.134/2025,
   15.159/2025, 15.358/2026 e 15.384/2026 (publicada no DOU de 10/04/2026, vigência imediata). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var CP = "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STFS = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var STFRG = "https://portal.stf.jus.br/jurisprudenciaRepercussao/pagina.asp";
var L15384 = "https://planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15384.htm";

/* ======================= VISÃO GERAL (HUB) ======================= */
T.penal_pessoa = {
meta:{ tema:"Crimes contra a Pessoa — visão geral", atualizado:AT,
  foco:"Mapa do Título I do CP, as leis que reescreveram o tema entre 2024 e 2026, os conceitos que se repetem em vários tipos (violência de gênero, antifacção, homicídio funcional, instituição de ensino) e as regras de ação penal e hediondez.",
  aviso:"Os subtemas (homicídio, feminicídio, vicaricídio, art. 122, infanticídio, aborto, lesão, periclitação/rixa, honra e liberdade individual) têm páginas próprias, com lei seca grifada, jurisprudência e flashcards." },
secoes:[
{ id:"mapa", titulo:"Mapa do Título I", curto:"Mapa",
  rapido:["Título I da Parte Especial (arts. 121 a 154-B): vida, integridade física, periclitação, rixa, honra e liberdade individual.",
    "Crimes <b>dolosos contra a vida</b> (júri — CF, art. 5º, XXXVIII, d): homicídio, feminicídio, vicaricídio, induzimento/instigação/auxílio ao <b>suicídio</b>, infanticídio e aborto. Automutilação (art. 122) e lesão seguida de morte <b>não</b> vão a júri.",
    "Desde 2024 o legislador prefere <b>tipos autônomos</b> a qualificadoras: feminicídio (121-A, Lei 14.994/2024), vicaricídio (121-B, Lei 15.384/2026) e ameaça de facção (147-C, Lei 15.358/2026)."],
  teoria:[
    { h:"Como o título se organiza", p:[
      "Capítulo I — crimes contra a vida (121 a 128). Capítulo II — lesões corporais (129). Capítulo III — periclitação da vida e da saúde (130 a 136). Capítulo IV — rixa (137). Capítulo V — honra (138 a 145). Capítulo VI — liberdade individual, dividido em quatro seções: liberdade pessoal (146 a 149-A), domicílio (150), correspondência (151 e 152) e segredos (153 a 154-B).",
      "O bem jurídico define o enquadramento. Homicídio protege a vida extrauterina; aborto, a vida intrauterina; lesão, a integridade corporal e a saúde; periclitação, a vida e a saúde expostas a perigo (crimes de perigo); honra, a reputação (objetiva) ou a autoestima (subjetiva); liberdade individual, a autodeterminação.",
      "O marco entre aborto e homicídio/infanticídio é o <b>início do parto</b>: a partir dele a vítima já é \"alguém\" (o art. 123 fala em \"durante o parto ou logo após\")."]},
    { h:"Júri e o art. 122", p:[
      "O art. 122 está no capítulo dos crimes contra a vida, mas desde a Lei 13.968/2019 também pune o induzimento à <b>automutilação</b>, que ofende a integridade física. Por isso só a forma ligada ao suicídio é crime doloso contra a vida (júri); a de automutilação vai ao juiz singular.",
      "Lesão corporal seguida de morte (129, §3º) é preterdolosa: o dolo é de lesionar. Não é crime doloso contra a vida e não vai ao júri."]}
  ],
  pegadinhas:["Feminicídio deixou de ser qualificadora do homicídio (inciso VI revogado). Para fatos a partir de 10/10/2024, é crime autônomo (art. 121-A, pena de 20 a 40 anos).","Art. 122 na forma de automutilação não é julgado pelo júri."]},
{ id:"leis", titulo:"Leis recentes (2024–2026)", curto:"Leis novas",
  rapido:["<b>Lei 14.994/2024</b> (10/10/2024): feminicídio autônomo; penas maiores na lesão doméstica e de gênero; ameaça e crimes contra a honra com pena em dobro contra a mulher por razões de gênero.",
    "<b>Lei 15.134/2025</b> (07/05/2025): homicídio e lesão \"funcionais\" passam a proteger membros do Judiciário, MP, Defensoria, Advocacia Pública e oficiais de justiça — e seus parentes <b>inclusive por afinidade</b>.",
    "<b>Lei 15.159/2025</b>: homicídio nas dependências de instituição de ensino vira qualificadora (121, §2º, X), com majorantes no §2º-C; lesão em instituição de ensino ganha aumento no §12 do art. 129.",
    "<b>Lei 15.163/2025</b>: abandono de incapaz e maus-tratos passam a reclusão de 2 a 5 anos (3 a 7 se lesão grave; 8 a 14 se morte).",
    "<b>Lei 15.358/2026</b> (Antifacção): homicídio (121, §2º-D) e lesão seguida de morte (129, §3º-A) com pena de 20 a 40 anos quando ligados à atuação de facção, milícia ou grupo paramilitar; lesão com aumento de 2/3 (§8º-A); ameaça autônoma (147-C); sequestro qualificado (148, §3º).",
    "<b>Lei 15.384/2026</b> (10/04/2026): vicaricídio (121-B), hediondo. <b>Lei 15.455/2026</b> (02/07/2026): trabalho doméstico entra expressamente no §9º do art. 129."],
  teoria:[
    { h:"Direito intertemporal", p:[
      "Todas essas alterações são, em regra, <b>novatio legis in pejus</b>: só alcançam fatos posteriores à vigência (CF, art. 5º, XL). Fato anterior segue a lei antiga. Ex.: feminicídio cometido em setembro de 2024 continua sendo homicídio qualificado (12 a 30 anos).",
      "Nos crimes permanentes (sequestro, art. 148) aplica-se a lei mais grave que entrar em vigor antes de cessar a permanência (Súmula 711 do STF)."]},
    { h:"Edital e data de corte", p:[
      "Leis publicadas depois do edital (PCBA: 29/07/2026) só costumam ser cobradas se o edital disser que vale a legislação vigente na data da prova. Todas as leis deste tema são anteriores ao edital da PCBA; a mais nova é a 15.455, de julho de 2026. Para a PCPE (prova em 03/2027), confira a cláusula de legislação quando o edital sair."]}
  ],
  quadro:{ titulo:"Linha do tempo das mudanças", head:["Lei","Vigência","O que mudou no Título I"], rows:[
    ["14.811/2024","15/01/2024","Bullying (146-A); hediondez do 122 pela internet, do sequestro de menor e do tráfico de pessoas contra criança/adolescente; §5º do 122 em dobro"],
    ["14.994/2024","10/10/2024","Feminicídio autônomo (121-A); 129, §§9º e 13 (2 a 5 anos); 141, §3º e 147, §§1º-2º (pena em dobro; ameaça de gênero com ação incondicionada)"],
    ["15.123/2025","2025","147-B, parágrafo único: violência psicológica com IA ou recurso que altere imagem/som — aumento de metade"],
    ["15.134/2025","07/05/2025","Homicídio e lesão funcionais: Judiciário, MP, Defensoria, Advocacia Pública e oficial de justiça"],
    ["15.159/2025","2025","121, §2º, X e §2º-C; 129, §12 (instituição de ensino)"],
    ["15.163/2025","2025","Arts. 133 e 136: novas penas (2 a 5 / 3 a 7 / 8 a 14)"],
    ["15.358/2026","2026","Antifacção: 121, §2º-D; 129, §§3º-A e 8º-A; 147-C; 148, §3º"],
    ["15.384/2026","10/04/2026","Vicaricídio (121-B), hediondo"],
    ["15.455/2026","02/07/2026","129, §9º: relação de trabalho doméstico"]]}},
{ id:"transversais", titulo:"Conceitos que se repetem", curto:"Transversais",
  rapido:["\"Razões da condição do sexo feminino\" (121-A, §1º): <b>violência doméstica e familiar</b> ou <b>menosprezo/discriminação</b> à condição de mulher. A definição é usada também nos arts. 129, §13; 141, §3º; 147, §1º.",
    "Antifacção: não basta ser integrante — o crime precisa ocorrer <b>no contexto da atuação</b> ou para a consecução das condutas do grupo.",
    "Facção (organização criminosa ultraviolenta): <b>3 ou mais pessoas</b> que empregam violência, grave ameaça ou coação para impor controle territorial ou social, intimidar populações ou autoridades ou atacar serviços e infraestrutura essenciais."],
  teoria:[
    { h:"Homicídio × lesão: a mesma circunstância com pesos diferentes", p:[
      "Ser praticado contra agente de segurança (no exercício ou em razão da função) é <b>qualificadora</b> no homicídio (121, §2º, VII) e <b>majorante</b> de 1/3 a 2/3 na lesão (129, §12, I).",
      "Instituição de ensino: <b>qualificadora</b> no homicídio (121, §2º, X), <b>majorante</b> na lesão (129, §12, I, c e II).",
      "Facção: <b>qualificadora</b> no homicídio (§2º-D) e na lesão seguida de morte (§3º-A); <b>majorante</b> de 2/3 nas demais lesões (§8º-A).",
      "Gênero: <b>tipo autônomo</b> no homicídio (121-A); <b>qualificadora</b> na lesão leve (129, §13); <b>pena em dobro</b> na honra (141, §3º) e na ameaça (147, §1º); <b>majorante de metade</b> na perseguição (147-A, §1º, II)."]},
    { h:"Ação penal no Título I", p:[
      "Regra: pública incondicionada. Exceções frequentes em prova: lesão leve e culposa (representação — Lei 9.099/95, art. 88), salvo violência doméstica contra a mulher (incondicionada — Súmula 542 do STJ); perigo de contágio venéreo (130, §2º); crimes contra a honra (queixa, com exceções do art. 145); ameaça (representação, salvo a de gênero); perseguição (representação); correspondência e segredos (em regra, representação); invasão de dispositivo informático (representação, salvo contra a administração ou concessionária)."]}
  ],
  quadro:{ titulo:"Hediondos no Título I (Lei 8.072/90, art. 1º)", head:["Crime","Observação"], rows:[
    ["Homicídio por grupo de extermínio e homicídio qualificado","Qualificado-privilegiado não é hediondo"],
    ["Feminicídio (121-A) e vicaricídio (121-B)","Incisos I-B e I-C"],
    ["Lesão gravíssima e lesão seguida de morte contra agentes do art. 142/144, membros do Judiciário/MP/DP/AP, oficial de justiça e familiares, ou em instituição de ensino","Inciso I-A (redação da Lei 15.159/2025)"],
    ["Art. 122 pela internet, rede social ou em tempo real","Inciso X (Lei 14.811/2024)"],
    ["Sequestro contra menor de 18 anos (148, §1º, IV)","Inciso XI"],
    ["Tráfico de pessoas contra criança ou adolescente","Inciso XII"]]},
  pegadinhas:["A majorante do art. 121, §6º (milícia/grupo de extermínio) não se soma à qualificadora do §2º-D quando o fato for de milícia: seria bis in idem.","Súmula 542 do STJ: lesão em violência doméstica contra a mulher é de ação pública incondicionada — mesmo sendo leve."]}
],
lei:[
{ art:"CP, art. 121-A, §1º", nome:"Razões da condição do sexo feminino", sec:"transversais", itens:[
  { id:"pp-121a1", rot:"Art. 121-A, §1º", t:"Considera-se que há <b class='g1'>razões da condição do sexo feminino</b> quando o crime envolve:<br>I – <b class='g1'>violência doméstica e familiar</b>;<br>II – <b class='g1'>menosprezo ou discriminação à condição de mulher</b>.", nota:"Referência usada nos arts. 129, §13; 141, §3º; 147, §1º.", c:["pp3","pp4"] }
]},
{ art:"Lei 8.072/1990, art. 1º", nome:"Hediondos ligados ao Título I", sec:"transversais", itens:[
  { id:"pp-hed", rot:"Art. 1º (trechos)", t:"I – homicídio (art. 121), quando praticado em <b class='g1'>atividade típica de grupo de extermínio</b>, ainda que cometido por 1 (um) só agente, e <b class='g1'>homicídio qualificado</b> (art. 121, § 2º);<br>I-A – <b class='g1'>lesão corporal dolosa de natureza gravíssima</b> (art. 129, § 2º) e <b class='g1'>lesão corporal seguida de morte</b> (art. 129, § 3º), quando praticadas: a) contra agentes dos arts. 142 e 144 da CF, do sistema prisional ou da Força Nacional, ou parente consanguíneo até o 3º grau, em razão dessa condição; b) contra membros do Judiciário, MP, Defensoria, Advocacia Pública ou oficial de justiça, ou seus familiares, em razão dessa condição; c) <b class='g3'>nas dependências de instituição de ensino</b>;<br>I-B – <b class='g1'>feminicídio</b> (art. 121-A);<br>I-C – <b class='g1'>vicaricídio</b> (art. 121-B);<br>X – induzimento, instigação ou auxílio a suicídio ou a automutilação realizados <b class='g3'>por meio da rede de computadores, de rede social ou transmitidos em tempo real</b>;<br>XI – sequestro e cárcere privado cometido <b class='g3'>contra menor de 18 anos</b>;<br>XII – tráfico de pessoas cometido <b class='g3'>contra criança ou adolescente</b>.", nota:"Redação dada pela Lei 15.159/2025 aos incisos I e I-A (o inciso I passou a remeter ao §2º inteiro, sem listar incisos); I-B pela Lei 14.994/2024; I-C pela Lei 15.384/2026; X a XII pela Lei 14.811/2024. Alíneas do I-A resumidas. Se o §2º-D (facção) entra no inciso I é ponto ainda não definido pelos tribunais.", novo:true, c:["pp5","pp6"] }
]}
],
juris:[
{ id:"stf-adpf779", trib:"STF", tipo:"ADPF", num:"779", sec:"transversais", status:"vigente", data:"Julgada em 01/08/2023",
  titulo:"\"Legítima defesa da honra\" é inconstitucional", texto:"A tese da legítima defesa da honra é inconstitucional, por contrariar os princípios da dignidade da pessoa humana, da proteção à vida e da igualdade de gênero. Defesa, acusação, autoridade policial e juízo não podem utilizá-la, direta ou indiretamente, nas fases pré-processual ou processual e perante o júri, sob pena de nulidade.",
  sintese:"Ninguém pode invocar a honra para justificar matar mulher — nem no júri.",
  explica:"Vale para homicídio e feminicídio. Se a defesa usar a tese em plenário, o ato e o julgamento podem ser anulados. A absolvição por quesito genérico também não pode se apoiar nela.", lei:["pp-121a1"], fonte:STFJ },
{ id:"stf-s711-pp", trib:"STF", tipo:"Súmula", num:"711", sec:"leis", status:"vigente", data:"",
  titulo:"Crime permanente e lei mais grave", texto:"A lei penal mais grave aplica-se ao crime continuado ou ao crime permanente, se a sua vigência é anterior à cessação da continuidade ou da permanência.",
  explica:"Sequestro iniciado antes da Lei 15.358/2026 e ainda em curso quando ela entrou em vigor responde pela redação nova.", lei:[], fonte:STFS },
{ id:"stj-s542-pp", trib:"STJ", tipo:"Súmula", num:"542", sec:"transversais", status:"vigente", data:"",
  titulo:"Lesão em violência doméstica contra a mulher: ação incondicionada", texto:"A ação penal relativa ao crime de lesão corporal resultante de violência doméstica contra a mulher é pública incondicionada.",
  explica:"Afasta o art. 88 da Lei 9.099/95 nesses casos (Lei Maria da Penha, art. 41; STF, ADI 4424).", lei:["pp-121a1"], fonte:STJS }
],
cards:[
{ id:"pp1", tipo:"distincao", sec:"mapa", f:"Quais crimes do Título I vão a júri?", v:"Homicídio, feminicídio, vicaricídio, art. 122 <b>na forma de suicídio</b>, infanticídio e aborto. <b>Não</b>: automutilação (122) e lesão seguida de morte (129, §3º).", lei:[] },
{ id:"pp2", tipo:"caso", sec:"leis", f:"Marido mata a esposa por ciúmes em 20/09/2024. Qual o enquadramento?", v:"<b>Homicídio qualificado pelo feminicídio</b> (antigo 121, §2º, VI — 12 a 30 anos). O art. 121-A (20 a 40) só vale a partir de 10/10/2024 e não retroage.", lei:[] },
{ id:"pp3", tipo:"lacuna", sec:"transversais", f:"Há razões da condição do sexo feminino quando o crime envolve ______ ou ______.", v:"<b>violência doméstica e familiar</b>; <b>menosprezo ou discriminação à condição de mulher</b> (121-A, §1º).", lei:["pp-121a1"] },
{ id:"pp4", tipo:"distincao", sec:"transversais", f:"Gênero como circunstância: homicídio × lesão leve × honra × ameaça × perseguição.", v:"Homicídio: <b>tipo autônomo</b> (121-A). Lesão leve: <b>qualificadora</b> (129, §13). Honra e ameaça: <b>pena em dobro</b>. Perseguição: <b>aumento de metade</b>.", lei:["pp-121a1"] },
{ id:"pp5", tipo:"ce", sec:"transversais", f:"Certo ou errado: o homicídio qualificado-privilegiado é hediondo.", v:"<b>Errado.</b> O privilégio (motivo) prepondera e afasta a hediondez.", lei:["pp-hed"] },
{ id:"pp6", tipo:"caso", sec:"transversais", f:"Agente induz pela internet, em live, uma pessoa a se matar. O crime é hediondo?", v:"<b>Sim.</b> Lei 8.072, art. 1º, X (art. 122, caput e §4º), incluído pela Lei 14.811/2024.", lei:["pp-hed"] },
{ id:"pp7", tipo:"distincao", sec:"transversais", f:"Facção: homicídio × lesão seguida de morte × lesão grave.", v:"Homicídio: qualificadora (§2º-D, 20 a 40). Lesão seguida de morte: qualificadora (§3º-A, 20 a 40). Lesão leve ou grave: <b>majorante de 2/3</b> (§8º-A).", lei:[] },
{ id:"pp8", tipo:"ce", sec:"transversais", f:"Certo ou errado: basta o agente ser integrante de milícia para incidir a qualificadora do art. 121, §2º-D.", v:"<b>Errado.</b> O homicídio precisa ocorrer no contexto da atuação do grupo ou para a consecução de suas condutas.", lei:[] },
{ id:"pp9", tipo:"numero", sec:"leis", f:"Penas do abandono de incapaz e dos maus-tratos após a Lei 15.163/2025.", v:"Simples: <b>2 a 5</b>. Lesão grave: <b>3 a 7</b>. Morte: <b>8 a 14</b> (todas de reclusão).", lei:[] },
{ id:"pp10", tipo:"juris", sec:"transversais", f:"O advogado do réu alega, no júri, que ele matou a companheira para defender a honra. Consequência?", v:"Tese inconstitucional (STF, ADPF 779). Seu uso pode gerar <b>nulidade</b> do ato e do julgamento.", lei:["pp-121a1"], j:["stf-adpf779"] }
],
questoes:[]
};

/* ======================= HOMICÍDIO ======================= */
T.penal_pessoa_01 = {
meta:{ tema:"Homicídio simples, privilegiado, qualificado e culposo", atualizado:AT,
  foco:"Tipo do art. 121, privilégio, as dez qualificadoras (incluindo as novas de 2025–2026), majorantes, homicídio culposo e perdão judicial, com a jurisprudência do STJ e do STF." },
secoes:[
{ id:"simples", titulo:"Homicídio simples e privilegiado", curto:"Simples",
  rapido:["\"Matar alguém\": reclusão de <b>6 a 20 anos</b>. Bem jurídico: vida extrauterina (a partir do início do parto).",
    "Privilégio (§1º): <b>relevante valor social ou moral</b> ou <b>domínio de violenta emoção logo em seguida a injusta provocação</b> da vítima — redução de <b>1/6 a 1/3</b>.",
    "Crime comum, de forma livre, material; admite tentativa (inclusive com dolo eventual)."],
  teoria:[
    { h:"Privilégio", p:[
      "<b>Valor social</b>: interesse da coletividade (ex.: matar o traidor da pátria). <b>Valor moral</b>: interesse particular nobre (ex.: eutanásia a pedido do doente terminal; pai que mata o estuprador da filha).",
      "<b>Violenta emoção</b>: exige domínio (não mera influência — esta é atenuante do art. 65, III, c), provocação injusta da vítima e reação <b>logo em seguida</b>. Se houver intervalo que permita esfriar o ânimo, não há privilégio.",
      "Embora a lei diga \"pode\", presentes os requisitos (reconhecidos pelos jurados), a redução é direito subjetivo do réu."]},
    { h:"Homicídio híbrido (qualificado-privilegiado)", p:[
      "Só é possível com qualificadora <b>objetiva</b> (meio ou modo: incisos III, IV e VIII), porque o privilégio é sempre subjetivo. Qualificadoras subjetivas (motivo torpe, fútil, conexão) são incompatíveis com o privilégio.",
      "O homicídio qualificado-privilegiado <b>não é hediondo</b>: o motivo prepondera (aplicação analógica do art. 67)."]}
  ],
  pegadinhas:["\"Sob influência\" de violenta emoção = atenuante. \"Sob domínio\" + logo após + injusta provocação = privilégio.","Eutanásia não tem tipo próprio no Brasil: é homicídio privilegiado por relevante valor moral."]},
{ id:"qualificadoras", titulo:"Qualificadoras (§2º e §2º-D)", curto:"Qualificadoras",
  rapido:["§2º: pena de <b>12 a 30 anos</b>. Incisos I, II e V (motivos e conexão) são <b>subjetivos</b>; III, IV e VIII (meio e modo) são <b>objetivos</b>.",
    "VII — homicídio funcional (Lei 15.134/2025): alínea <b>a</b> (Forças Armadas, segurança pública, sistema prisional, Força Nacional — parente <b>consanguíneo</b>) × alínea <b>b</b> (Judiciário, MP, Defensoria, Advocacia Pública, oficial de justiça — parente <b>inclusive por afinidade</b>).",
    "IX — contra <b>menor de 14 anos</b> (idade na data da conduta). X — <b>nas dependências de instituição de ensino</b> (Lei 15.159/2025).",
    "§2º-D (Lei 15.358/2026): integrante de facção, grupo paramilitar ou milícia, no contexto da atuação do grupo — <b>20 a 40 anos</b>."],
  teoria:[
    { h:"Motivos (I, II, V)", p:[
      "<b>Paga ou promessa de recompensa</b> é exemplo de motivo torpe, seguido de fórmula genérica (interpretação analógica). Na promessa, basta a expectativa; o pagamento efetivo é irrelevante. Para a 5ª Turma do STJ, a qualificadora não se comunica automaticamente ao mandante (o motivo dele deve ser examinado separadamente) — tema com decisões nos dois sentidos.",
      "<b>Fútil</b>: motivo ínfimo, desproporcional. Para o STJ, <b>ausência de motivo não é motivo fútil</b> (analogia contra o réu); parte da doutrina pensa o contrário. Ciúme, em regra, não é fútil por si só.",
      "<b>Conexão (V)</b>: teleológica (assegurar a execução de crime futuro) ou consequencial (ocultação, impunidade ou vantagem de crime já praticado). O outro crime pode ser de terceiro."]},
    { h:"Meios e modos (III, IV, VIII)", p:[
      "Meio insidioso (veneno às escondidas), cruel (sofrimento desnecessário) ou de perigo comum (disparos em rua movimentada). Se a vítima sabe que ingere o veneno, a doutrina fala em meio cruel, não em veneno.",
      "Tortura como <b>meio</b> de matar qualifica o homicídio; tortura com morte <b>culposa</b> é tortura qualificada (Lei 9.455/97, art. 1º, §3º).",
      "Recurso que dificulta a defesa: surpresa, vítima dormindo, pelas costas. A idade da vítima ou a premeditação, sozinhas, não configuram o inciso IV.",
      "Arma de fogo de uso restrito ou proibido (VIII): prevalece que exige o uso como arma de fogo (disparo), não a coronhada."]},
    { h:"Funcional, menor de 14 e instituição de ensino", p:[
      "Funcional: o crime precisa ocorrer <b>no exercício da função ou em decorrência dela</b>. Matar policial de folga por briga de trânsito sem relação com a função não qualifica. Guardas municipais: a doutrina inclui (atuam na segurança pública, CF, art. 144, §8º).",
      "Assimetria da Lei 15.134/2025: o enteado do policial (afinidade) não está na alínea a; o sogro do juiz (afinidade) está na alínea b. Estender a alínea a por analogia seria analogia <i>in malam partem</i>.",
      "Menor de 14: a idade se afere no momento da conduta (teoria da atividade, art. 4º).",
      "Instituição de ensino (X): abrange educação infantil, fundamental, médio e superior, públicas e privadas."]},
    { h:"Pluralidade de qualificadoras", p:[
      "Não existe homicídio \"duplamente qualificado\" para fins de pena: uma qualificadora qualifica; as demais vão para a 2ª fase (se forem agravantes) ou, residualmente, para a 1ª fase (circunstâncias judiciais).",
      "A idade (menor de 14) não pode qualificar e também majorar (§4º): bis in idem. Se outra qualificadora já qualificou, a idade pode funcionar como majorante do §4º."]}
  ],
  quadro:{ titulo:"Natureza das qualificadoras do art. 121, §2º", head:["Inciso","Conteúdo","Natureza","Admite privilégio?"], rows:[
    ["I","Paga, promessa, motivo torpe","Subjetiva","Não"],["II","Motivo fútil","Subjetiva","Não"],
    ["III","Veneno, fogo, explosivo, asfixia, tortura, meio insidioso/cruel ou de perigo comum","Objetiva","Sim"],
    ["IV","Traição, emboscada, dissimulação, recurso que dificulte a defesa","Objetiva","Sim"],
    ["V","Conexão com outro crime","Subjetiva","Não"],
    ["VII","Funcional","Prevalece: subjetiva (ligada à função da vítima)","Controvertido"],
    ["VIII","Arma de fogo de uso restrito ou proibido","Objetiva","Sim"],
    ["IX / X","Menor de 14 / instituição de ensino","Objetiva","Sim"]]},
  pegadinhas:["Feminicídio não é mais o inciso VI (revogado). Em questão de fato posterior a 10/10/2024, procure o art. 121-A.","No §2º-D a pena (20 a 40) é maior que a do §2º (12 a 30)."]},
{ id:"majorantes", titulo:"Majorantes e homicídio culposo", curto:"Culposo",
  rapido:["Doloso: +1/3 se a vítima é <b>menor de 14 ou maior de 60</b> (§4º, parte final); +1/3 a 1/2 se praticado por <b>milícia privada</b> (pretexto de segurança) ou <b>grupo de extermínio</b> (§6º).",
    "Culposo (§3º): detenção de <b>1 a 3 anos</b>. +1/3 (§4º): inobservância de regra técnica, deixar de socorrer, não diminuir as consequências, fugir do flagrante.",
    "Perdão judicial (§5º): consequências tão graves para o próprio agente que a pena se torna desnecessária. Sentença <b>declaratória</b> da extinção da punibilidade (Súmula 18 do STJ)."],
  teoria:[
    { h:"Majorantes do homicídio qualificado (§2º-B e §2º-C)", p:[
      "Não são qualificadoras: não criam nova pena. Incidem na 3ª fase, como fração, sobre a pena do homicídio já qualificado pelo inciso IX (menor de 14) ou X (instituição de ensino).",
      "§2º-B (vítima menor de 14 — inciso IX): +1/3 a 1/2 (deficiência/doença que aumente a vulnerabilidade); +2/3 (autor ascendente, padrasto, tio, irmão, tutor, preceptor, empregador etc.); +2/3 (em instituição de <b>educação básica</b>, que não inclui a superior).",
      "§2º-C (instituição de ensino — inciso X): +1/3 a 1/2 (vítima com deficiência ou doença limitante); +2/3 (autor com autoridade sobre a vítima <b>ou professor/funcionário da instituição</b>)."]},
    { h:"Homicídio culposo", p:[
      "Imprudência (ação afoita), negligência (omissão de cautela) e imperícia (falta de aptidão técnica). Cirurgião experiente que esquece a pinça: negligência, não imperícia.",
      "Não há compensação de culpas: a culpa concorrente da vítima não exclui a do agente, só influi na pena (art. 59).",
      "No trânsito, o homicídio culposo na direção de veículo automotor é o art. 302 do CTB (especialidade), que também admite perdão judicial."]},
    { h:"Perdão judicial", p:[
      "Não depende de aceitação (diferente do perdão do ofendido). Não gera reincidência (art. 120).",
      "O STJ admite o perdão quando o agente sofre sequelas gravíssimas (tetraplegia, estado vegetativo) ou quando mata, culposamente, pessoa com quem tinha vínculo afetivo (ex.: irmão). A doutrina majoritária exige laço prévio quando o fundamento é o sofrimento psicológico."]}
  ],
  pegadinhas:["As majorantes do §4º, primeira parte (deixar de socorrer, fugir), são só do homicídio culposo.","Milícia: com a Lei 15.358/2026 o homicídio de milícia no contexto da atuação do grupo é qualificado (§2º-D); a majorante do §6º não pode incidir junto."]}
],
lei:[
{ art:"CP, art. 121", nome:"Homicídio", sec:"simples", itens:[
  { id:"cp121", rot:"Art. 121, caput e §1º", t:"<b class='g1'>Matar alguém</b>:<br>Pena - reclusão, de <b class='g2'>seis a vinte anos</b>.<br>§ 1º Se o agente comete o crime impelido por motivo de <b class='g1'>relevante valor social ou moral</b>, ou <b class='g1'>sob o domínio de violenta emoção, logo em seguida a injusta provocação da vítima</b>, o juiz pode reduzir a pena de <b class='g2'>um sexto a um terço</b>.", c:["hm1","hm2","hm3"] }
]},
{ art:"CP, art. 121, §§2º a 2º-D", nome:"Homicídio qualificado", sec:"qualificadoras", itens:[
  { id:"cp121q", rot:"§2º, I a V", t:"§ 2° Se o homicídio é cometido:<br>I - mediante <b class='g1'>paga ou promessa de recompensa</b>, ou por outro <b class='g1'>motivo torpe</b>;<br>II - por <b class='g1'>motivo fútil</b>;<br>III - com emprego de <b class='g1'>veneno, fogo, explosivo, asfixia, tortura</b> ou outro meio insidioso ou cruel, ou de que possa resultar <b class='g1'>perigo comum</b>;<br>IV - à <b class='g1'>traição, de emboscada, ou mediante dissimulação</b> ou outro recurso que dificulte ou torne impossível a defesa do ofendido;<br>V - para assegurar a <b class='g1'>execução, a ocultação, a impunidade ou vantagem de outro crime</b>;<br>VI - (Revogado pela Lei nº 14.994, de 2024)", c:["hm4","hm5","hm6","hm7"], j:["stj-pagamandante","stj-semmotivo"] },
  { id:"cp121f", rot:"§2º, VII", t:"VII – contra:<br>a) autoridade ou agente descrito nos arts. 142 e 144 da Constituição Federal, integrantes do sistema prisional e da Força Nacional de Segurança Pública, <b class='g3'>no exercício da função ou em decorrência dela</b>, ou contra seu cônjuge, companheiro ou <b class='g3'>parente consanguíneo até o terceiro grau</b>, em razão dessa condição;<br>b) <b class='g1'>membro do Poder Judiciário, do Ministério Público, da Defensoria Pública ou da Advocacia Pública</b>, de que tratam os arts. 131 e 132 da Constituição Federal, ou <b class='g1'>oficial de justiça</b>, no exercício da função ou em decorrência dela, ou contra seu cônjuge, companheiro ou parente, <b class='g3'>inclusive por afinidade</b>, até o terceiro grau, em razão dessa condição;", nota:"Redação da Lei 15.134/2025 (vigência em 07/05/2025).", novo:true, c:["hm8","hm9"] },
  { id:"cp121q2", rot:"§2º, VIII a X", t:"VIII - com emprego de <b class='g1'>arma de fogo de uso restrito ou proibido</b>;<br>IX - contra <b class='g1'>menor de 14 (quatorze) anos</b>;<br>X - <b class='g1'>nas dependências de instituição de ensino</b>:<br>Pena - reclusão, de <b class='g2'>doze a trinta anos</b>.", nota:"Inciso X incluído pela Lei 15.159/2025.", novo:true, c:["hm10","hm11"] },
  { id:"cp121m14", rot:"§2º-B e §2º-C", t:"§ 2º-B. A pena do homicídio contra <b class='g1'>menor de 14 anos</b> é aumentada de:<br>I - <b class='g2'>1/3 até a metade</b> se a vítima é pessoa com deficiência ou com doença que implique o aumento de sua vulnerabilidade;<br>II - <b class='g2'>2/3</b> se o autor é ascendente, padrasto ou madrasta, tio, irmão, cônjuge, companheiro, tutor, curador, preceptor ou empregador da vítima ou por qualquer outro título tiver autoridade sobre ela;<br>III - <b class='g2'>2/3</b> se o crime for praticado em <b class='g3'>instituição de educação básica</b> pública ou privada.<br>§ 2º-C. A pena do homicídio cometido <b class='g1'>nas dependências de instituição de ensino</b> é aumentada de:<br>I - <b class='g2'>1/3 até a metade</b> se a vítima é pessoa com deficiência ou com doença que acarrete condição limitante ou de vulnerabilidade física ou mental;<br>II - <b class='g2'>2/3</b> se o autor é ascendente, padrasto ou madrasta, tio, irmão, cônjuge, companheiro, tutor, curador, preceptor ou empregador da vítima ou por qualquer outro título tem autoridade sobre ela <b class='g3'>ou, ainda, se é professor ou funcionário da instituição de ensino</b>.", novo:true, c:["hm11","hm12"] },
  { id:"cp121d", rot:"§2º-D", t:"§ 2º-D. Se o homicídio doloso é cometido por <b class='g1'>integrante de organização criminosa ultraviolenta, grupo paramilitar ou milícia privada</b>, <b class='g3'>no contexto da atuação ou para a consecução das condutas</b> previstas no art. 2º da lei que institui o marco legal do combate ao crime organizado no Brasil:<br>Pena - reclusão, de <b class='g2'>20 (vinte) a 40 (quarenta) anos</b>.", nota:"Incluído pela Lei 15.358/2026 (Antifacção).", novo:true, c:["hm13"] }
]},
{ art:"CP, art. 121, §§3º a 6º", nome:"Culposo, majorantes e perdão judicial", sec:"majorantes", itens:[
  { id:"cp121c", rot:"§§3º e 4º", t:"§ 3º Se o homicídio é <b class='g1'>culposo</b>:<br>Pena - detenção, de <b class='g2'>um a três anos</b>.<br>§ 4º No homicídio culposo, a pena é aumentada de <b class='g2'>1/3</b>, se o crime resulta de <b class='g1'>inobservância de regra técnica</b> de profissão, arte ou ofício, ou se o agente <b class='g1'>deixa de prestar imediato socorro</b> à vítima, não procura diminuir as consequências do seu ato, ou <b class='g1'>foge para evitar prisão em flagrante</b>. Sendo <b class='g3'>doloso</b> o homicídio, a pena é aumentada de <b class='g2'>1/3</b> se o crime é praticado contra pessoa <b class='g3'>menor de 14 ou maior de 60 anos</b>.", c:["hm14","hm15"] },
  { id:"cp121p", rot:"§§5º e 6º", t:"§ 5º - Na hipótese de homicídio culposo, o juiz <b class='g1'>poderá deixar de aplicar a pena</b>, se as consequências da infração atingirem o próprio agente de forma tão grave que a sanção penal se torne desnecessária.<br>§ 6º A pena é aumentada de <b class='g2'>1/3 até a metade</b> se o crime for praticado por <b class='g1'>milícia privada</b>, sob o pretexto de prestação de serviço de segurança, ou por <b class='g1'>grupo de extermínio</b>.", c:["hm16"], j:["stj-s18","stj-perdao-irmao"] }
]}
],
juris:[
{ id:"stj-multiqual", trib:"STJ", tipo:"Jurisprudência", num:"AgRg no REsp 2.025.633/TO", sec:"qualificadoras", status:"vigente", data:"5ª Turma, 28/11/2022",
  titulo:"Várias qualificadoras: uma qualifica, as outras vão à dosimetria", texto:"Na existência de múltiplas qualificadoras, uma delas é empregada para qualificar o crime, enquanto as remanescentes podem ser utilizadas na segunda fase da dosimetria da pena, caso correspondam a agravantes legalmente previstas, ou residualmente como circunstâncias judiciais, na primeira etapa.",
  explica:"Não há \"crime duplamente qualificado\" com nova pena-base: há um só tipo qualificado.", lei:["cp121q"], fonte:STJJ },
{ id:"stj-hibrido", trib:"STJ", tipo:"Jurisprudência", num:"AgRg no AREsp 1.787.454/RJ", sec:"simples", status:"vigente", data:"6ª Turma, 14/02/2023",
  titulo:"Privilégio só convive com qualificadora objetiva", texto:"A qualificadora de caráter objetivo pode coexistir com o privilégio, haja vista que ambas as hipóteses previstas no § 1º do art. 121 do CP são de natureza subjetiva.",
  explica:"Torpe + relevante valor moral é contradição lógica. Veneno + relevante valor moral é possível.", lei:["cp121","cp121q"], fonte:STJJ },
{ id:"stj-pagamandante", trib:"STJ", tipo:"Jurisprudência", num:"AgRg no HC 829.071/SC", sec:"qualificadoras", status:"divergencia", data:"5ª Turma, 08/08/2023",
  titulo:"Paga ou promessa: não se comunica automaticamente ao mandante", texto:"A qualificadora da paga ou promessa de recompensa não é elementar do crime de homicídio e, em consequência, possuindo caráter pessoal, não se comunica aos mandantes (com base no REsp 1.415.502/MG).",
  explica:"Há decisões do próprio STJ em sentido contrário (comunicação ao mandante). Em prova objetiva, leia o comando: se citar a 5ª Turma ou o REsp 1.415.502, marque a incomunicabilidade.", lei:["cp121q"], fonte:STJJ },
{ id:"stj-semmotivo", trib:"STJ", tipo:"Jurisprudência", num:"AgRg no HC 756.852/SP", sec:"qualificadoras", status:"divergencia", data:"6ª Turma, 02/10/2023",
  titulo:"Ausência de motivo não equivale a motivo fútil", texto:"Embora o homicídio sem qualquer motivo pareça tão ou mais reprovável do que a ação movida por motivo fútil, o legislador apenas previu este último como circunstância qualificadora, não sendo possível, ao julgador, aplicar, analogicamente, a norma incriminadora em prejuízo do réu.",
  explica:"Doutrina majoritária defende o contrário (se o motivo pequeno qualifica, a falta de motivo também deveria). Para o STJ: homicídio simples.", lei:["cp121q"], fonte:STJJ },
{ id:"stj-dolotent", trib:"STJ", tipo:"Jurisprudência", num:"AgRg no HC 730.158/CE", sec:"simples", status:"vigente", data:"6ª Turma, 12/09/2023",
  titulo:"Dolo eventual é compatível com tentativa", texto:"Não há incompatibilidade entre o dolo eventual e a figura da tentativa, visto que independentemente de o agente querer o resultado morte (dolo direto) ou assumir o risco de produzi-lo (dolo eventual), o crime poderá ou não se consumar por circunstâncias alheias à sua vontade.",
  explica:"Ex.: disparos contra grupo de pessoas sem atingir ninguém, assumindo o risco de matar: tentativa de homicídio.", lei:["cp121"], fonte:STJJ },
{ id:"stj-cruelde", trib:"STJ", tipo:"Jurisprudência", num:"REsp 1.829.601/PR", sec:"qualificadoras", status:"vigente", data:"6ª Turma, 04/02/2020",
  titulo:"Dolo eventual e meio cruel podem coexistir", texto:"Inexiste incompatibilidade entre o dolo eventual e o reconhecimento do meio cruel para a consecução da ação, na medida em que o dolo do agente, direto ou indireto, não exclui a possibilidade de a prática delitiva envolver o emprego de meio mais reprovável.",
  explica:"Caso de vítima arrastada por cerca de 500 metros presa às ferragens do veículo.", lei:["cp121q"], fonte:STJJ },
{ id:"stj-s18", trib:"STJ", tipo:"Súmula", num:"18", sec:"majorantes", status:"vigente", data:"",
  titulo:"Natureza da sentença que concede perdão judicial", texto:"A sentença concessiva do perdão judicial é declaratória da extinção da punibilidade, não subsistindo qualquer efeito condenatório.",
  explica:"Não gera reincidência, nem efeitos secundários da condenação (art. 120 do CP).", lei:["cp121p"], fonte:STJS },
{ id:"stj-perdao-irmao", trib:"STJ", tipo:"Jurisprudência", num:"REsp 1.871.697/MA", sec:"majorantes", status:"vigente", data:"6ª Turma, 25/08/2020",
  titulo:"Perdão judicial: sequelas gravíssimas ou vínculo afetivo", texto:"Não há empecilho a que se aplique o perdão judicial nos casos em que o agente do homicídio culposo — mais especificamente nas hipóteses de crime de trânsito — sofra sequelas físicas gravíssimas e permanentes, como ficar tetraplégico, em estado vegetativo ou incapacitado para o trabalho. Quanto ao sofrimento psicológico, exige-se em regra laço prévio de afeto com a vítima.",
  explica:"No caso, o réu era irmão da vítima. Perdão concedido.", lei:["cp121p"], fonte:STJJ },
{ id:"stf-t1068-pp", trib:"STF", tipo:"Tema de repercussão geral", num:"1068", sec:"simples", status:"vigente", data:"Julgado em 12/09/2024",
  titulo:"Júri: execução imediata da condenação", texto:"A soberania dos veredictos do Tribunal do Júri autoriza a imediata execução de condenação imposta pelo corpo de jurados, independentemente do total da pena aplicada.",
  explica:"Vale para os crimes dolosos contra a vida, inclusive homicídio e feminicídio.", lei:["cp121"], fonte:STFRG },
{ id:"stf-adpf779-hm", trib:"STF", tipo:"ADPF", num:"779", sec:"simples", status:"vigente", data:"01/08/2023",
  titulo:"Legítima defesa da honra: inconstitucional", texto:"A tese da legítima defesa da honra é inconstitucional e não pode ser usada, direta ou indiretamente, em nenhuma fase do processo nem perante o júri, sob pena de nulidade.",
  explica:"Também não serve para sustentar o privilégio da violenta emoção por \"traição\".", lei:["cp121"], fonte:STFJ }
],
cards:[
{ id:"hm1", tipo:"distincao", sec:"simples", f:"Violenta emoção: privilégio × atenuante.", v:"<b>Privilégio</b>: <b>domínio</b> + logo em seguida + injusta provocação (1/6 a 1/3, 3ª fase). <b>Atenuante</b> (65, III, c): mera <b>influência</b>, sem exigir imediatidade.", lei:["cp121"] },
{ id:"hm2", tipo:"caso", sec:"simples", f:"Pai encontra o estuprador da filha três dias depois do crime e o mata a tiros. Há privilégio?", v:"Pode haver <b>relevante valor moral</b> (não depende de imediatidade). A violenta emoção, não: faltou o \"logo em seguida\".", lei:["cp121"] },
{ id:"hm3", tipo:"ce", sec:"simples", f:"Certo ou errado: homicídio por motivo torpe pode ser também privilegiado.", v:"<b>Errado.</b> Só qualificadora objetiva convive com o privilégio.", lei:["cp121"], j:["stj-hibrido"] },
{ id:"hm4", tipo:"juris", sec:"qualificadoras", f:"Homicídio praticado sem motivo algum. Para o STJ, é fútil?", v:"<b>Não.</b> Ausência de motivo ≠ motivo fútil (vedada analogia contra o réu). Doutrina majoritária diverge.", lei:["cp121q"], j:["stj-semmotivo"] },
{ id:"hm5", tipo:"caso", sec:"qualificadoras", f:"A tortura a vítima para obter senha bancária e, sem querer, ela morre. Qual crime?", v:"<b>Tortura qualificada pela morte</b> (Lei 9.455, art. 1º, §3º). Homicídio qualificado pela tortura exige dolo de matar usando a tortura como meio.", lei:["cp121q"] },
{ id:"hm6", tipo:"distincao", sec:"qualificadoras", f:"Conexão teleológica × consequencial (inciso V).", v:"<b>Teleológica</b>: mata para assegurar a <b>execução</b> de outro crime (futuro). <b>Consequencial</b>: para garantir <b>ocultação, impunidade ou vantagem</b> de crime já cometido.", lei:["cp121q"] },
{ id:"hm7", tipo:"ce", sec:"qualificadoras", f:"Certo ou errado: a premeditação, por si só, qualifica o homicídio pelo inciso IV.", v:"<b>Errado.</b> Só qualifica se dela resultar meio que dificulte a defesa (surpresa, emboscada).", lei:["cp121q"] },
{ id:"hm8", tipo:"caso", sec:"qualificadoras", f:"Traficante mata o <b>enteado</b> do PM que o prendeu, por vingança. Há homicídio funcional?", v:"<b>Não.</b> Na alínea a só há parente <b>consanguíneo</b>. Enteado é afinidade. (Pode haver motivo torpe.)", lei:["cp121f"] },
{ id:"hm9", tipo:"caso", sec:"qualificadoras", f:"Condenado mata o <b>sogro</b> do juiz que o sentenciou, por vingança (fato de 2026).", v:"<b>Homicídio funcional</b> (121, §2º, VII, b): para membros do Judiciário, MP, Defensoria, Advocacia Pública e oficiais de justiça, vale o parente <b>inclusive por afinidade</b> (Lei 15.134/2025).", lei:["cp121f"] },
{ id:"hm10", tipo:"caso", sec:"qualificadoras", f:"A dá golpes na cabeça de vítima de 13 anos; ela morre três meses depois, já com 14. Incide o inciso IX?", v:"<b>Sim.</b> A idade se apura na data da conduta (art. 4º, teoria da atividade).", lei:["cp121q2"] },
{ id:"hm11", tipo:"caso", sec:"qualificadoras", f:"Professor mata aluno de 16 anos dentro da escola. Enquadramento?", v:"Homicídio <b>qualificado</b> (121, §2º, X) com aumento de <b>2/3</b> (§2º-C, II — autor professor da instituição).", lei:["cp121q2","cp121m14"] },
{ id:"hm12", tipo:"distincao", sec:"qualificadoras", f:"Majorante do §2º-B, III × qualificadora do §2º, X.", v:"<b>§2º-B, III</b>: vítima menor de 14 morta em instituição de <b>educação básica</b> (+2/3). <b>§2º, X</b>: qualquer vítima, em instituição de ensino de <b>qualquer nível</b>, inclusive superior.", lei:["cp121m14","cp121q2"] },
{ id:"hm13", tipo:"numero", sec:"qualificadoras", f:"Pena do homicídio do §2º-D (facção, milícia ou grupo paramilitar).", v:"Reclusão de <b>20 a 40 anos</b> (Lei 15.358/2026).", lei:["cp121d"] },
{ id:"hm14", tipo:"ce", sec:"majorantes", f:"Certo ou errado: no homicídio doloso, fugir para evitar o flagrante aumenta a pena em 1/3.", v:"<b>Errado.</b> Essa majorante é só do homicídio <b>culposo</b>.", lei:["cp121c"] },
{ id:"hm15", tipo:"caso", sec:"majorantes", f:"Motorista atropela pedestre culposamente e foge. Qual dispositivo?", v:"<b>CTB, art. 302</b> (especialidade), com o aumento do §1º, III do próprio CTB — não o art. 121, §3º do CP.", lei:["cp121c"] },
{ id:"hm16", tipo:"juris", sec:"majorantes", f:"Sentença que concede perdão judicial gera reincidência?", v:"<b>Não.</b> É declaratória da extinção da punibilidade (Súmula 18 do STJ; art. 120).", lei:["cp121p"], j:["stj-s18"] }
],
questoes:[]
};

/* ======================= FEMINICÍDIO ======================= */
T.penal_pessoa_02 = {
meta:{ tema:"Feminicídio (art. 121-A)", atualizado:AT,
  foco:"Tipo autônomo criado pela Lei 14.994/2024: elementares, majorantes do §2º, comunicação ao coautor, efeitos da Lei Maria da Penha e direito intertemporal." },
secoes:[
{ id:"tipo", titulo:"Tipo autônomo e elementares", curto:"Tipo",
  rapido:["\"Matar mulher por razões da condição do sexo feminino\": reclusão de <b>20 a 40 anos</b>. Hediondo (Lei 8.072, art. 1º, I-B).",
    "Razões de gênero (§1º): <b>violência doméstica e familiar</b> ou <b>menosprezo/discriminação</b> à condição de mulher. Vítima mulher, sozinha, não basta.",
    "Vigência: <b>10/10/2024</b>. Antes disso, o fato é homicídio qualificado (antigo 121, §2º, VI, 12 a 30 anos) — a lei nova não retroage."],
  teoria:[
    { h:"Do qualificador ao tipo próprio", p:[
      "A Lei 13.104/2015 criou o feminicídio como qualificadora. A Lei 14.994/2024 (\"pacote antifeminicídio\") revogou o inciso VI e o §2º-A do art. 121 e criou o art. 121-A, com pena mínima maior que a de qualquer homicídio qualificado comum.",
      "Por ser crime doloso contra a vida, vai a júri. Os quesitos passam a tratar do tipo do 121-A, não mais de qualificadora."]},
    { h:"Quando há (e quando não há) razões de gênero", p:[
      "Violência doméstica e familiar segue o conceito do art. 5º da Lei 11.340/2006 (unidade doméstica, família, relação íntima de afeto, independentemente de coabitação — Súmula 600 do STJ).",
      "Menosprezo ou discriminação: o crime decorre do desprezo pela condição de mulher (ex.: matar uma gestora por não aceitar mulher no cargo).",
      "Briga de trânsito em que o agente mata a motorista que o xingou, sem vínculo nem motivação de gênero: homicídio, não feminicídio.",
      "Mulher trans: doutrina e jurisprudência majoritárias admitem como vítima, pois o tipo usa \"mulher\" sem restrição biológica (o STJ aplica a Lei Maria da Penha à mulher trans — REsp 1.977.124/SP)."]},
    { h:"Coautoria (§3º)", p:[
      "Comunicam-se ao coautor ou partícipe as circunstâncias pessoais elementares do §1º. O amigo que ajuda o marido a matar a esposa responde por feminicídio, desde que conheça o contexto (art. 30).",
      "Motivo torpe e feminicídio: antes da Lei 14.994, o STJ admitia as duas qualificadoras juntas (torpe é subjetiva; feminicídio, objetiva). Hoje, o torpe pode atuar como agravante genérica (art. 61, II, a) no 121-A."]}
  ],
  pegadinhas:["O §2º do 121-A transforma em <b>majorantes</b> (1/3 até metade) circunstâncias que no homicídio são qualificadoras (incisos III, IV e VIII do art. 121, §2º).","As majorantes do art. 121 (ex.: §4º, maior de 60) não se aplicam ao 121-A por analogia — ele tem as próprias."]},
{ id:"majorantes", titulo:"Majorantes do §2º", curto:"Majorantes",
  rapido:["Aumento de <b>1/3 até a metade</b>: gestação ou 3 meses após o parto; vítima mãe ou responsável por criança, adolescente ou pessoa com deficiência.",
    "Vítima menor de 14, maior de 60, com deficiência ou doença degenerativa limitante.",
    "Na <b>presença física ou virtual</b> de descendente ou ascendente da vítima.",
    "Em <b>descumprimento de medida protetiva</b> dos incisos I, II e III do art. 22 da Lei Maria da Penha.",
    "Com meio cruel/insidioso, recurso que dificulte a defesa ou arma de uso restrito/proibido (121, §2º, III, IV e VIII)."],
  teoria:[
    { h:"Pontos sensíveis", p:[
      "Presença virtual: o filho que vê a mãe ser morta por videochamada atrai a majorante.",
      "Medidas protetivas que geram a majorante: suspensão da posse ou restrição do porte de armas (I), afastamento do lar (II) e proibições de aproximação, contato e frequência a lugares (III). Descumprir outras medidas não atrai o §2º, IV.",
      "Feminicídio contra gestante + aborto sem consentimento (art. 125): o STJ admite a imputação conjunta, pois os bens jurídicos são diversos (vida da mulher × vida do feto). Não há bis in idem com a majorante da gestação."]}
  ],
  quadro:{ titulo:"Homicídio × feminicídio", head:["","Homicídio qualificado","Feminicídio (121-A)"], rows:[
    ["Pena","12 a 30 anos (ou 20 a 40 no §2º-D)","20 a 40 anos"],
    ["Meio cruel, emboscada, arma restrita","Qualificadoras","Majorantes (1/3 até metade)"],
    ["Vítima menor de 14","Qualificadora (IX)","Majorante (§2º, II)"],
    ["Coautor","Circunstância pessoal não se comunica (art. 30)","Elementares do §1º se comunicam (§3º)"]]},
  pegadinhas:["Descumprimento de medida protetiva do art. 22, IV ou V (visitas aos dependentes, alimentos) não gera a majorante — o inciso IV só cita I, II e III.","A majorante é de 1/3 até a metade (não \"1/3 a 2/3\")."]}
],
lei:[
{ art:"CP, art. 121-A", nome:"Feminicídio", sec:"tipo", itens:[
  { id:"cp121a", rot:"Art. 121-A, caput e §1º", t:"<b class='g1'>Matar mulher por razões da condição do sexo feminino</b>:<br>Pena – reclusão, de <b class='g2'>20 (vinte) a 40 (quarenta) anos</b>.<br>§ 1º Considera-se que há razões da condição do sexo feminino quando o crime envolve:<br>I – <b class='g1'>violência doméstica e familiar</b>;<br>II – <b class='g1'>menosprezo ou discriminação à condição de mulher</b>.", nota:"Incluído pela Lei 14.994/2024, em vigor desde 10/10/2024.", novo:true, c:["fm1","fm2","fm3","fm4"] },
  { id:"cp121a3", rot:"Art. 121-A, §3º", t:"§ 3º <b class='g1'>Comunicam-se ao coautor ou partícipe</b> as circunstâncias pessoais elementares do crime previstas no § 1º deste artigo.", novo:true, c:["fm5"] }
]},
{ art:"CP, art. 121-A, §2º", nome:"Causas de aumento", sec:"majorantes", itens:[
  { id:"cp121a2", rot:"Art. 121-A, §2º", t:"§ 2º A pena do feminicídio é aumentada de <b class='g2'>1/3 (um terço) até a metade</b> se o crime é praticado:<br>I – <b class='g1'>durante a gestação, nos 3 (três) meses posteriores ao parto</b> ou se a vítima é a mãe ou a responsável por criança, adolescente ou pessoa com deficiência de qualquer idade;<br>II – contra pessoa <b class='g1'>menor de 14 (catorze) anos, maior de 60 (sessenta) anos</b>, com deficiência ou portadora de doenças degenerativas que acarretem condição limitante ou de vulnerabilidade física ou mental;<br>III – na <b class='g1'>presença física ou virtual</b> de descendente ou de ascendente da vítima;<br>IV – em <b class='g1'>descumprimento das medidas protetivas de urgência</b> previstas nos <b class='g3'>incisos I, II e III</b> do caput do art. 22 da Lei nº 11.340, de 7 de agosto de 2006 (Lei Maria da Penha);<br>V – nas circunstâncias previstas nos <b class='g3'>incisos III, IV e VIII do § 2º do art. 121</b> deste Código.", novo:true, c:["fm6","fm7","fm8","fm9"], j:["stj-fem-aborto"] }
]}
],
juris:[
{ id:"stj-fem-aborto", trib:"STJ", tipo:"Jurisprudência", num:"REsp 1.860.829/RJ", sec:"majorantes", status:"vigente", data:"6ª Turma, 15/09/2020",
  titulo:"Feminicídio contra gestante + aborto: sem bis in idem", texto:"Enquanto o art. 125 do CP tutela o feto enquanto bem jurídico, o crime de homicídio praticado contra gestante, agravado (ou majorado) pela gestação, protege a pessoa em maior grau de vulnerabilidade; é possível a imputação simultânea.",
  sintese:"Matar a gestante sabendo da gravidez: feminicídio majorado + aborto do art. 125.",
  explica:"Julgado anterior à Lei 14.994 (referia-se ao antigo §7º, I do art. 121), mas o raciocínio vale para o art. 121-A, §2º, I.", lei:["cp121a2"], fonte:STJJ },
{ id:"stj-torpe-fem", trib:"STJ", tipo:"Jurisprudência", num:"AgRg no HC 822.149/SC", sec:"tipo", status:"atencao", data:"5ª Turma, 25/09/2023",
  titulo:"Torpe e feminicídio: naturezas distintas", texto:"As qualificadoras do motivo torpe e do feminicídio não possuem a mesma natureza, sendo certo que a primeira tem caráter subjetivo, ao passo que a segunda é objetiva, não havendo, assim, qualquer óbice à sua imputação simultânea.",
  explica:"Vale para fatos anteriores a 10/10/2024. Depois da Lei 14.994, o motivo torpe funciona como agravante genérica no art. 121-A.", lei:["cp121a"], fonte:STJJ },
{ id:"stj-s600-fm", trib:"STJ", tipo:"Súmula", num:"600", sec:"tipo", status:"vigente", data:"",
  titulo:"Violência doméstica não exige coabitação", texto:"Para configuração da violência doméstica e familiar prevista no artigo 5º da Lei 11.340/2006, Lei Maria da Penha, não se exige a coabitação entre autor e vítima.",
  explica:"Ex-namorado que mata a ex-namorada por não aceitar o término: há violência doméstica (relação íntima de afeto).", lei:["cp121a"], fonte:STJS },
{ id:"stj-trans-lmp", trib:"STJ", tipo:"Jurisprudência", num:"REsp 1.977.124/SP", sec:"tipo", status:"vigente", data:"6ª Turma, 05/04/2022",
  titulo:"Lei Maria da Penha protege a mulher trans", texto:"A aplicação da Lei Maria da Penha não reclama considerações sobre a motivação da conduta do agressor, mas tão somente que a vítima seja mulher e que a violência seja cometida em ambiente doméstico, familiar ou em relação de intimidade ou afeto entre agressor e agredida. A mulher trans está incluída.",
  explica:"Base usada pela doutrina para admitir a mulher trans como vítima de feminicídio.", lei:["cp121a"], fonte:STJJ },
{ id:"stf-adpf779-fm", trib:"STF", tipo:"ADPF", num:"779", sec:"tipo", status:"vigente", data:"01/08/2023",
  titulo:"Legítima defesa da honra: proibida", texto:"A tese da legítima defesa da honra é inconstitucional e não pode ser usada, direta ou indiretamente, em nenhuma fase do processo nem perante o júri, sob pena de nulidade.",
  explica:"Principal precedente de plenário ligado ao feminicídio.", lei:["cp121a"], fonte:STFJ }
],
cards:[
{ id:"fm1", tipo:"numero", sec:"tipo", f:"Pena do feminicídio e desde quando vale.", v:"Reclusão de <b>20 a 40 anos</b>, para fatos a partir de <b>10/10/2024</b> (Lei 14.994/2024).", lei:["cp121a"] },
{ id:"fm2", tipo:"caso", sec:"tipo", f:"Motorista mata a motorista que o xingou numa discussão de trânsito; não se conheciam. Feminicídio?", v:"<b>Não.</b> Não há violência doméstica nem menosprezo à condição de mulher. Homicídio (simples ou qualificado conforme o caso).", lei:["cp121a"] },
{ id:"fm3", tipo:"caso", sec:"tipo", f:"Ex-namorado, que nunca morou com a vítima, a mata por não aceitar o fim do namoro.", v:"<b>Feminicídio.</b> Relação íntima de afeto configura violência doméstica sem coabitação (Súmula 600 do STJ).", lei:["cp121a"], j:["stj-s600-fm"] },
{ id:"fm4", tipo:"ce", sec:"tipo", f:"Certo ou errado: feminicídio praticado em 2023 deve ser julgado pelo art. 121-A se o júri ocorrer em 2026.", v:"<b>Errado.</b> Vale a lei do tempo do fato (homicídio qualificado, 12 a 30). Lei mais grave não retroage.", lei:["cp121a"] },
{ id:"fm5", tipo:"caso", sec:"tipo", f:"Amigo ajuda o marido a matar a esposa, sabendo que o motivo é o ciúme do casal. Por qual crime responde?", v:"<b>Feminicídio.</b> As elementares do §1º se comunicam ao coautor ou partícipe (§3º).", lei:["cp121a3"] },
{ id:"fm6", tipo:"numero", sec:"majorantes", f:"Quanto aumentam as majorantes do feminicídio?", v:"De <b>1/3 até a metade</b> (§2º).", lei:["cp121a2"] },
{ id:"fm7", tipo:"caso", sec:"majorantes", f:"Filho de 10 anos assiste, por videochamada, ao pai matar a mãe. Há majorante?", v:"<b>Sim.</b> Presença <b>virtual</b> de descendente (§2º, III).", lei:["cp121a2"] },
{ id:"fm8", tipo:"distincao", sec:"majorantes", f:"Feminicídio com veneno: qualificadora ou majorante?", v:"<b>Majorante</b> (§2º, V remete ao 121, §2º, III). No homicídio, o veneno é qualificadora.", lei:["cp121a2"] },
{ id:"fm9", tipo:"caso", sec:"majorantes", f:"Agente mata a ex-companheira grávida, sabendo da gestação. Quais crimes?", v:"<b>Feminicídio majorado</b> (§2º, I) <b>+ aborto sem consentimento</b> (art. 125), em concurso. Sem bis in idem (STJ).", lei:["cp121a2"], j:["stj-fem-aborto"] },
{ id:"fm10", tipo:"juris", sec:"tipo", f:"No feminicídio, o motivo torpe ainda pode ser considerado?", v:"Sim, como <b>agravante genérica</b> (art. 61, II, a). A dupla qualificadora torpe + feminicídio era aceita pelo STJ antes da Lei 14.994.", lei:["cp121a"], j:["stj-torpe-fem"] }
],
questoes:[]
};

/* ======================= VICARICÍDIO ======================= */
T.penal_pessoa_03 = {
meta:{ tema:"Vicaricídio (art. 121-B)", atualizado:AT,
  foco:"Novo tipo da Lei 15.384/2026: vítimas possíveis, fim específico, contexto de violência doméstica, majorantes, hediondez e a violência vicária na Lei Maria da Penha." },
secoes:[
{ id:"tipo", titulo:"Tipo penal", curto:"Tipo",
  rapido:["Matar <b>descendente, ascendente, dependente, enteado</b> ou pessoa sob guarda ou responsabilidade direta da mulher, com o <b>fim específico</b> de causar-lhe <b>sofrimento, punição ou controle</b>, no contexto de <b>violência doméstica e familiar</b>.",
    "Pena: reclusão de <b>20 a 40 anos</b>. Hediondo (Lei 8.072, art. 1º, I-C). Vigência: <b>10/04/2026</b>.",
    "Sem contexto de violência doméstica contra a mulher, não há vicaricídio: há homicídio (em regra qualificado)."],
  teoria:[
    { h:"Estrutura", p:[
      "O nome vem de <i>vicarius</i> (substituto): o agente mata um terceiro no lugar da mulher, para atingi-la. Vítima direta: o descendente, ascendente etc.; a mulher também é sujeito passivo.",
      "Crime comum (qualquer pessoa pode praticar), doloso, com <b>elemento subjetivo específico</b>: causar sofrimento, punir ou controlar a mulher. Não é preciso que o objetivo seja atingido; é preciso que a morte ocorra para a consumação. Admite tentativa.",
      "Exemplo: ex-marido mata o sogro para punir a ex-mulher pelo fim do casamento. Contraexemplo: agiota mata o pai da devedora para cobrar a dívida — sem violência doméstica, é homicídio qualificado."]},
    { h:"Lei Maria da Penha e intertemporal", p:[
      "A mesma lei incluiu no art. 7º da Lei 11.340/2006 a <b>violência vicária</b> como forma de violência doméstica: a praticada contra familiares ou pessoas da rede de apoio da mulher, com vistas a atingi-la.",
      "Fatos anteriores a 10/04/2026 continuam como homicídio qualificado (pena menor): a lei nova é mais grave e não retroage."]}
  ],
  pegadinhas:["As majorantes do art. 121 não se aplicam ao 121-B (legalidade estrita): use só as do parágrafo único.","Vicaricídio exige a finalidade de atingir a mulher. Matar o enteado por raiva dele próprio, sem esse fim, não é 121-B."]},
{ id:"majorantes", titulo:"Majorantes", curto:"Majorantes",
  rapido:["Aumento de <b>1/3 até a metade</b>: na <b>presença da mulher</b> que se quer atingir; contra <b>criança, adolescente, idoso ou pessoa com deficiência</b>; em <b>descumprimento de medida protetiva</b> de urgência."],
  teoria:[
    { h:"Leitura das majorantes", p:[
      "Diferente do feminicídio, a majorante da medida protetiva no vicaricídio não limita os incisos do art. 22 da Lei Maria da Penha: fala em \"medida protetiva de urgência\" em geral.",
      "A presença exigida é a da mulher (não de descendente). A lei não falou em presença virtual, ao contrário do art. 121-A, §2º, III — há debate se a videochamada basta; na dúvida, prevalece a leitura estrita."]}
  ],
  quadro:{ titulo:"Feminicídio × vicaricídio", head:["","Feminicídio (121-A)","Vicaricídio (121-B)"], rows:[
    ["Quem morre","A mulher","Descendente, ascendente, dependente, enteado ou pessoa sob guarda/responsabilidade da mulher"],
    ["Contexto","Violência doméstica OU menosprezo/discriminação","Somente violência doméstica e familiar"],
    ["Elemento subjetivo","Dolo","Dolo + fim de causar sofrimento, punição ou controle à mulher"],
    ["Pena","20 a 40","20 a 40"],["Vigência","10/10/2024","10/04/2026"],
    ["Presença como majorante","Física ou virtual de descendente/ascendente","Da mulher que se pretende atingir"]]}}
],
lei:[
{ art:"CP, art. 121-B", nome:"Vicaricídio", sec:"tipo", itens:[
  { id:"cp121b", rot:"Art. 121-B, caput", t:"Matar <b class='g1'>descendente, ascendente, dependente, enteado ou pessoa sob guarda ou responsabilidade direta da mulher</b>, com o <b class='g3'>fim específico de causar-lhe sofrimento, punição ou controle</b>, no contexto de <b class='g3'>violência doméstica e familiar</b>.<br>Pena – reclusão, de <b class='g2'>20 (vinte) a 40 (quarenta) anos</b>.", nota:"Incluído pela Lei 15.384/2026 (DOU de 10/04/2026; texto retificado em 15/04/2026).", novo:true, c:["vc1","vc2","vc3","vc4"] },
  { id:"cp121bpu", rot:"Art. 121-B, parágrafo único", t:"A pena do vicaricídio é aumentada de <b class='g2'>1/3 (um terço) até a metade</b> se o crime for praticado:<br>I – <b class='g1'>na presença da mulher</b> a quem se pretende causar sofrimento, punição ou controle;<br>II – contra <b class='g1'>criança ou adolescente ou pessoa idosa ou com deficiência</b>;<br>III – em <b class='g1'>descumprimento de medida protetiva de urgência</b>.", novo:true, c:["vc5","vc6"] }
]}
],
juris:[
{ id:"lei15384", trib:"Legislação", tipo:"Lei", num:"15.384/2026", sec:"tipo", status:"vigente", data:"DOU 10/04/2026",
  titulo:"Lei do vicaricídio", texto:"Inclui o art. 121-B no Código Penal, o inciso I-C no art. 1º da Lei 8.072/1990 (hediondez) e a violência vicária no art. 7º da Lei 11.340/2006.",
  sintese:"Ainda não há jurisprudência consolidada dos tribunais superiores sobre o 121-B.",
  explica:"Tema novo: em prova, a cobrança tende a ser de letra da lei (vítimas, fim específico, contexto, pena e majorantes).", lei:["cp121b","cp121bpu"], fonte:L15384 }
],
cards:[
{ id:"vc1", tipo:"lacuna", sec:"tipo", f:"Vicaricídio: matar descendente, ascendente, dependente, enteado ou pessoa sob guarda da mulher, com o fim de causar-lhe ______, ______ ou ______.", v:"<b>sofrimento, punição ou controle</b>", lei:["cp121b"] },
{ id:"vc2", tipo:"caso", sec:"tipo", f:"Agiota mata o pai da devedora para \"cobrar\" a dívida e envia mensagem à filha. Vicaricídio?", v:"<b>Não.</b> Falta o contexto de violência doméstica e familiar contra a mulher. Homicídio qualificado (ex.: motivo torpe).", lei:["cp121b"] },
{ id:"vc3", tipo:"caso", sec:"tipo", f:"Após a separação, o ex-marido mata o filho do casal para \"fazer a ex-mulher sofrer\". Fato de maio de 2026.", v:"<b>Vicaricídio</b> (121-B), com aumento de 1/3 até a metade por ser a vítima criança/adolescente (parágrafo único, II). Hediondo.", lei:["cp121b","cp121bpu"] },
{ id:"vc4", tipo:"ce", sec:"tipo", f:"Certo ou errado: o vicaricídio só se consuma se a mulher efetivamente sofrer.", v:"<b>Errado.</b> O fim específico precisa existir, mas não precisa ser alcançado. Consuma-se com a morte da vítima direta.", lei:["cp121b"] },
{ id:"vc5", tipo:"distincao", sec:"majorantes", f:"Presença como majorante: feminicídio × vicaricídio.", v:"<b>Feminicídio</b>: presença física ou virtual de <b>descendente ou ascendente</b> da vítima. <b>Vicaricídio</b>: presença <b>da mulher</b> que se quer atingir.", lei:["cp121bpu"] },
{ id:"vc6", tipo:"ce", sec:"majorantes", f:"Certo ou errado: aplica-se ao vicaricídio o aumento de 1/3 do art. 121, §4º, se a vítima tem mais de 60 anos.", v:"<b>Errado.</b> O 121-B tem majorantes próprias (inclui pessoa idosa no inciso II, de 1/3 até a metade).", lei:["cp121bpu"] },
{ id:"vc7", tipo:"numero", sec:"tipo", f:"Vicaricídio: pena, data de vigência e natureza.", v:"<b>20 a 40 anos</b>; vigência em <b>10/04/2026</b>; <b>hediondo</b> (Lei 8.072, art. 1º, I-C).", lei:["cp121b"] }
],
questoes:[]
};

})();
