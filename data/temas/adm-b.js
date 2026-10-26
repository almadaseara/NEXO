/* Direito Administrativo (II): atos administrativos; controle da Administração; responsabilidade civil do Estado; agentes públicos.
   Conferido em 14/10/2026. Texto: Lei 4.717/1965 (art. 2º), Lei 9.784/1999, CF/88 (arts. 5º, LXXV; 37, §6º; 41), Lei 8.112/1990, LINDB. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var STFS = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp";
var STFSV = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26";
var STFRG = "https://portal.stf.jus.br/jurisprudenciaRepercussao/pesquisarProcesso.asp";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";

/* ======================= ATOS ADMINISTRATIVOS ======================= */
T.adm_atos = {
meta:{ tema:"Atos administrativos", atualizado:AT,
  foco:"Elementos (COFIFOMOB) e vícios (Lei 4.717, art. 2º); atributos (PATI); mérito; classificações e espécies; extinção (anulação, revogação, cassação, caducidade, contraposição); convalidação; decadência; Tema 138." },
secoes:[
{ id:"elementos", titulo:"Elementos, atributos e mérito", curto:"Elementos",
  rapido:["Elementos (requisitos): <b>COmpetência, FInalidade, FOrma, MOtivo, OBjeto</b> (\"COFIFOMOB\"). Competência, finalidade e forma são <b>vinculados</b>; motivo e objeto podem ser discricionários — o <b>mérito</b>.",
    "Vícios (Lei 4.717, art. 2º): <b>incompetência</b>, <b>vício de forma</b>, <b>ilegalidade do objeto</b>, <b>inexistência dos motivos</b>, <b>desvio de finalidade</b>.",
    "Atributos (\"PATI\"): <b>Presunção</b> de legitimidade e veracidade (relativa), <b>Autoexecutoriedade</b> (nem todos), <b>Tipicidade</b>, <b>Imperatividade</b> (nem todos — atos negociais e enunciativos não têm).",
    "Motivo ≠ motivação: <b>motivo</b> é o pressuposto de fato e de direito (elemento); <b>motivação</b> é a exposição dos motivos (integra a forma)."],
  teoria:[
    { h:"Classificações e espécies", p:[
      "Quanto à formação: <b>simples</b> (um órgão), <b>complexo</b> (vontades de órgãos diferentes formam um só ato — ex.: aposentadoria registrada pelo TC, para o STF) e <b>composto</b> (um ato principal e outro acessório — ex.: ato que depende de visto).",
      "Espécies (Hely): <b>normativos</b> (decretos, regulamentos, instruções), <b>ordinatórios</b> (portarias, circulares, ordens de serviço), <b>negociais</b> (licença, autorização, permissão, admissão), <b>enunciativos</b> (certidões, atestados, pareceres — declaram, não criam) e <b>punitivos</b> (multas, interdições).",
      "Perfeição, validade e eficácia: ato perfeito (concluiu o ciclo de formação), válido (conforme a lei) e eficaz (apto a produzir efeitos)."]}],
  pegadinhas:["Presunção de legitimidade é <b>relativa</b> (juris tantum).","Ato enunciativo (certidão) não tem imperatividade.","Motivação integra a forma; motivo é elemento autônomo."]},
{ id:"extincao", titulo:"Extinção, convalidação e decadência", curto:"Extinção",
  rapido:["<b>Anulação</b>: por ilegalidade; Administração (de ofício) ou Judiciário (provocado); efeitos <b>ex tunc</b> (ressalvados terceiros de boa-fé).",
    "<b>Revogação</b>: por conveniência e oportunidade; só a <b>Administração</b> (o Judiciário revoga apenas os próprios atos administrativos); efeitos <b>ex nunc</b>. Não podem ser revogados: atos vinculados, consumados, que geraram direitos adquiridos, enunciativos, e os que integram procedimento já superado.",
    "<b>Cassação</b>: o beneficiário descumpre condições (ex.: alvará de hotel usado como motel). <b>Caducidade</b>: lei nova torna o ato incompatível. <b>Contraposição</b>: ato posterior com efeitos opostos (exoneração × nomeação).",
    "<b>Convalidação</b> (Lei 9.784, art. 55): defeitos <b>sanáveis</b>, sem lesão ao interesse público nem prejuízo a terceiros. Sanáveis: vício de <b>competência</b> (salvo exclusiva) e de <b>forma</b> (salvo essencial). Insanáveis: motivo, objeto, finalidade."],
  teoria:[
    { h:"Decadência e processo para anular", p:[
      "Decadência de <b>5 anos</b> para anular atos com efeitos favoráveis, salvo má-fé; nos efeitos patrimoniais contínuos, conta-se da <b>percepção do primeiro pagamento</b> (art. 54, §1º).",
      "Tema 138: se o ato já produziu efeitos concretos, seu desfazimento deve ser precedido de <b>processo administrativo</b> com contraditório.",
      "Inconstitucionalidade flagrante não se convalida pelo tempo (ex.: provimento sem concurso), segundo o STF."]}],
  quadro:{ titulo:"Anulação × revogação", head:["","Anulação","Revogação"], rows:[
    ["Motivo","Ilegalidade","Conveniência e oportunidade"],
    ["Quem","Administração e Judiciário","Só a Administração (que editou o ato)"],
    ["Efeitos","Ex tunc","Ex nunc"],
    ["Natureza","Dever (sujeito a decadência de 5 anos)","Faculdade"]]},
  pegadinhas:["\"FOCO\" é sanável: FOrma e COmpetência.","Judiciário não revoga ato do Executivo.","Ato vinculado não se revoga."]}
],
lei:[
{ art:"Lei 4.717/1965, art. 2º", nome:"Vícios do ato (Lei da Ação Popular)", sec:"elementos", itens:[
  { id:"l4717a2", rot:"Art. 2º", t:"São nulos os atos lesivos ao patrimônio das entidades mencionadas no artigo anterior, nos casos de: a) <b class='g1'>incompetência</b>; b) <b class='g1'>vício de forma</b>; c) <b class='g1'>ilegalidade do objeto</b>; d) <b class='g1'>inexistência dos motivos</b>; e) <b class='g1'>desvio de finalidade</b>.<br>Parágrafo único. (...) e) o desvio de finalidade se verifica quando o agente pratica o ato visando a <b class='g1'>fim diverso daquele previsto</b>, explícita ou implicitamente, na regra de competência.", c:["at1","at2"] }]},
{ art:"Lei 9.784/1999, arts. 53 a 55", nome:"Anulação, revogação, decadência e convalidação", sec:"extincao", itens:[
  { id:"l9784a54", rot:"Arts. 53, 54 e 55", t:"Art. 53. A Administração <b class='g1'>deve anular</b> seus próprios atos, quando eivados de vício de legalidade, e <b class='g1'>pode revogá-los</b> por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos.<br>Art. 54. O direito da Administração de anular os atos administrativos de que decorram efeitos favoráveis para os destinatários <b class='g1'>decai em cinco anos</b>, contados da data em que foram praticados, <b class='g3'>salvo comprovada má-fé</b>.<br>§ 1º No caso de efeitos patrimoniais contínuos, o prazo de decadência contar-se-á da <b class='g1'>percepção do primeiro pagamento</b>.<br>(...)<br>Art. 55. Em decisão na qual se evidencie <b class='g3'>não acarretarem lesão ao interesse público nem prejuízo a terceiros</b>, os atos que apresentarem <b class='g1'>defeitos sanáveis</b> poderão ser <b class='g1'>convalidados</b> pela própria Administração.", c:["at3","at4","at5","at6"], j:["stf-t138","stf-s473b"] }]}
],
juris:[
{ id:"stf-t138", trib:"STF", tipo:"Repercussão geral", num:"RE 594.296 (Tema 138)", sec:"extincao", status:"vigente", data:"21/09/2011",
  titulo:"Anulação de ato com efeitos concretos exige processo",
  texto:"Ao Estado é facultada a revogação de atos que repute ilegalmente praticados; porém, se de tais atos já decorreram efeitos concretos, seu desfazimento deve ser precedido de regular processo administrativo.",
  explica:"A autotutela convive com o contraditório e a ampla defesa (art. 5º, LV).", lei:["l9784a54"], fonte:STFRG },
{ id:"stf-s473b", trib:"STF", tipo:"Súmula", num:"Súmulas 346 e 473", sec:"extincao", status:"vigente", data:"1963/1969",
  titulo:"Autotutela",
  texto:"Súmula 346: A administração pública pode declarar a nulidade dos seus próprios atos. Súmula 473: A administração pode anular seus próprios atos, quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos; ou revogá-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos, e ressalvada, em todos os casos, a apreciação judicial.",
  explica:"Base clássica da autotutela, hoje positivada no art. 53 da Lei 9.784.", lei:["l9784a54"], fonte:STFS }
],
cards:[
{ id:"at1", tipo:"lacuna", sec:"elementos", f:"Elementos do ato: co______, fi______, fo______, mo______ e ob______.", v:"<b>competência</b>, <b>finalidade</b>, <b>forma</b>, <b>motivo</b>, <b>objeto</b>.", lei:["l4717a2"] },
{ id:"at2", tipo:"caso", sec:"elementos", f:"Chefe remove servidor para cidade distante para puni-lo por críticas. Qual elemento está viciado?", v:"<b>Finalidade</b> — desvio de finalidade (remoção não é sanção).", lei:["l4717a2"] },
{ id:"at3", tipo:"caso", sec:"extincao", f:"Ato assinado por autoridade incompetente (competência não exclusiva) e sem prejuízo a terceiros. Pode ser salvo?", v:"<b>Sim</b> — convalidação por ratificação da autoridade competente (vício de competência sanável).", lei:["l9784a54"] },
{ id:"at4", tipo:"caso", sec:"extincao", f:"Ato com objeto ilícito pode ser convalidado?", v:"<b>Não.</b> Vícios de objeto, motivo e finalidade são insanáveis.", lei:["l9784a54"] },
{ id:"at5", tipo:"caso", sec:"extincao", f:"Gratificação paga mensalmente desde março de 2020, por ato ilegal, ao servidor de boa-fé. Até quando a Administração pode anular?", v:"Até março de <b>2025</b> — 5 anos da <b>percepção do primeiro pagamento</b> (art. 54, §1º).", lei:["l9784a54"] },
{ id:"at6", tipo:"caso", sec:"extincao", f:"Administração descobre que um servidor recebe adicional indevido há 2 anos e o corta sem ouvi-lo. Válido?", v:"<b>Não</b> — efeitos concretos já produzidos exigem <b>processo</b> com contraditório (Tema 138).", lei:["l9784a54"], j:["stf-t138"] },
{ id:"at7", tipo:"distincao", sec:"extincao", f:"Cassação × caducidade × contraposição.", v:"<b>Cassação</b>: beneficiário descumpre condições. <b>Caducidade</b>: lei nova torna o ato incompatível. <b>Contraposição</b>: ato novo com efeito oposto.", lei:[] },
{ id:"at8", tipo:"distincao", sec:"elementos", f:"Ato complexo × ato composto.", v:"<b>Complexo</b>: vontades de órgãos diversos fundem-se num só ato. <b>Composto</b>: um ato principal + um acessório (visto, aprovação) de outro órgão.", lei:[] }
],
importancia:{ nivel:5,
  texto:"Elementos, vícios, atributos e formas de extinção são cobrados em quase toda prova. A banca troca anulação por revogação, vício sanável por insanável e confunde motivo com motivação.",
  decore:[
    ["Elementos do ato","<b>COFIFOMOB</b>: competência, finalidade, forma, motivo, objeto"],
    ["Elementos sempre vinculados","competência, finalidade e forma"],
    ["Mérito administrativo","<b>motivo e objeto</b> nos atos discricionários"],
    ["Vícios (Lei 4.717, art. 2º)","incompetência, forma, objeto, motivos, desvio de finalidade"],
    ["Atributos","<b>PATI</b>: presunção, autoexecutoriedade, tipicidade, imperatividade"],
    ["Decadência para anular (Lei 9.784, art. 54)","<b>5 anos</b>, salvo má-fé"],
    ["Efeitos patrimoniais contínuos","prazo conta do <b>primeiro pagamento</b> (art. 54, § 1º)"],
    ["Convalidação (art. 55)","só defeitos <b>sanáveis</b>, sem lesão ao interesse público nem a terceiros"],
    ["Ato com efeitos concretos","desfazimento exige <b>processo</b> com contraditório (Tema 138)"]],
  macetes:[
    ["FOCO é sanável","<b>FO</b>rma e <b>CO</b>mpetência podem ser convalidadas; motivo, objeto e finalidade, não."],
    ["Motivo é o porquê, motivação é a explicação","<b>Motivo</b> é elemento do ato; <b>motivação</b> é a exposição dos motivos e integra a forma."],
    ["Cassação, caducidade e contraposição","Cassação: descumpriu condições. Caducidade: lei nova. Contraposição: ato novo de efeito oposto."]] },
comparativo:{ titulo:"Ato complexo × ato composto", head:["Ato complexo","Ato composto"], rows:[
  ["<b>Formação:</b> vontades de órgãos diferentes se fundem em um só ato","<b>Formação:</b> um ato principal e outro acessório"],
  ["<b>Quantidade:</b> um único ato, que só se aperfeiçoa com todas as vontades","<b>Quantidade:</b> dois atos, o principal já existe e o acessório o complementa"],
  ["<b>Papel do segundo órgão:</b> participa da formação do ato","<b>Papel do segundo órgão:</b> confirma ou verifica (visto, aprovação)"],
  ["<b>Exemplo:</b> aposentadoria registrada pelo Tribunal de Contas (entendimento do STF)","<b>Exemplo:</b> ato que depende de visto"]]},
prova:[
  { tipo:"ce", enun:"Competência, finalidade e forma são elementos sempre vinculados do ato administrativo, mesmo nos atos discricionários.", gab:"Certo", com:"A discricionariedade, o mérito, está em motivo e objeto." },
  { tipo:"ce", enun:"A presunção de legitimidade dos atos administrativos é absoluta, não admitindo prova em contrário.", gab:"Errado", com:"A presunção é relativa (juris tantum)." },
  { tipo:"ce", enun:"A Administração pode convalidar ato com vício de objeto, desde que não haja prejuízo a terceiros.", gab:"Errado", com:"Vícios de objeto, motivo e finalidade são insanáveis; só competência (não exclusiva) e forma (não essencial) são sanáveis." },
  { tipo:"ce", enun:"O Poder Judiciário pode revogar ato administrativo do Poder Executivo que considere inconveniente.", gab:"Errado", com:"A revogação é da própria Administração; o Judiciário só anula por ilegalidade." },
  { tipo:"caso", enun:"Servidor recebe gratificação paga mensalmente desde março de 2020, por ato ilegal, e é de boa-fé. Até quando a Administração pode anulá-la?", com:"Até março de 2025: cinco anos contados do primeiro pagamento (art. 54, § 1º)." },
  { tipo:"caso", enun:"A Administração corta, sem ouvi-lo, um adicional pago há dois anos a um servidor, por reconhecer ilegalidade. O ato é válido?", com:"Não. Como já produziu efeitos concretos, o desfazimento exige processo com contraditório e ampla defesa (Tema 138)." }],
resumo:[
  "Elementos do ato: <b>competência, finalidade, forma, motivo e objeto</b>. Os três primeiros são vinculados.",
  "Vícios da Lei 4.717: incompetência, forma, objeto, motivos e desvio de finalidade.",
  "Atributos (PATI): presunção relativa, autoexecutoriedade e imperatividade (nem todos os atos), tipicidade.",
  "<b>Motivo</b> é pressuposto de fato e de direito; <b>motivação</b> integra a forma.",
  "Anulação: ilegalidade, ex tunc, Administração ou Judiciário. Revogação: mérito, ex nunc, só a Administração.",
  "Não se revogam atos vinculados, consumados, que geraram direito adquirido, enunciativos ou de procedimento superado.",
  "Convalidação: só vícios de competência e forma, sem lesão ao interesse público ou a terceiros.",
  "Decadência de 5 anos, salvo má-fé; Tema 138 exige processo quando há efeitos concretos."],
checklist:[
  "Listar os elementos do ato e dizer quais são vinculados.",
  "Explicar o que é mérito administrativo.",
  "Citar os cinco vícios do art. 2º da Lei 4.717.",
  "Explicar os atributos do ato e os que nem todos possuem.",
  "Diferenciar motivo e motivação.",
  "Diferenciar ato simples, complexo e composto.",
  "Diferenciar anulação, revogação, cassação, caducidade e contraposição.",
  "Dizer quais vícios são sanáveis e quais não são.",
  "Aplicar a decadência de 5 anos e o primeiro pagamento.",
  "Explicar o Tema 138."],
questoes:[]
};

/* ======================= CONTROLE ======================= */
T.adm_controle = {
meta:{ tema:"Controle da Administração Pública", atualizado:AT,
  foco:"Classificações (interno/externo; prévio, concomitante, posterior; legalidade × mérito); controle administrativo (autotutela, recursos — Lei 9.784, SV 21); controle legislativo (CPIs, sustação, TCU — SV 3); controle judicial (limites, Súmula 665/STJ, SV 5); LINDB." },
secoes:[
{ id:"especies", titulo:"Espécies de controle", curto:"Espécies",
  rapido:["Quanto ao órgão: <b>administrativo</b>, <b>legislativo</b> (com auxílio do Tribunal de Contas) e <b>judicial</b>. Quanto à posição: <b>interno</b> (dentro do próprio Poder) e <b>externo</b>.",
    "Quanto ao momento: <b>prévio</b> (ex.: aprovação do Senado para nomear Ministro do STF), <b>concomitante</b> (fiscalização de contrato) e <b>posterior</b> (anulação, julgamento de contas).",
    "Quanto ao aspecto: <b>legalidade</b> (todos os Poderes) e <b>mérito</b> (só a própria Administração).",
    "Controle <b>finalístico</b> (tutela): da Administração direta sobre a indireta, sem hierarquia, nos limites da lei."],
  teoria:[
    { h:"Controle legislativo", p:[
      "Congresso: sustar atos normativos do Executivo que exorbitem do poder regulamentar (art. 49, V); convocar Ministros; CPIs; julgar as contas do Presidente.",
      "Tribunais de Contas: julgam contas de administradores, aplicam sanções, sustam atos (contratos: a sustação é do Congresso, e o TC decide se este não agir em 90 dias — art. 71, §§1º e 2º).",
      "SV 3: contraditório perante o TCU, salvo na apreciação inicial de aposentadoria, reforma e pensão."]}],
  pegadinhas:["Judiciário não controla mérito, mas controla razoabilidade e proporcionalidade (que são legalidade em sentido amplo).","Sustar contrato: Congresso (TCU só se o Congresso ficar inerte por 90 dias)."]},
{ id:"administrativo", titulo:"Controle administrativo e recursos", curto:"Recursos",
  rapido:["Recurso administrativo (Lei 9.784): por razões de <b>legalidade e de mérito</b>; prazo de <b>10 dias</b>; dirigido à autoridade que decidiu, que pode reconsiderar em 5 dias; tramita por no máximo <b>3 instâncias</b>.",
    "Em regra, <b>sem efeito suspensivo</b> (salvo justo receio de prejuízo de difícil reparação). Decisão em até <b>30 dias</b>, prorrogáveis por igual período.",
    "No recurso pode haver <b>reformatio in pejus</b>, desde que o recorrente seja cientificado para alegar antes da decisão. Na <b>revisão</b> (fatos novos), <b>não</b> pode haver agravamento.",
    "É inconstitucional exigir <b>depósito ou arrolamento prévio</b> de bens para recorrer administrativamente (SV 21)."],
  teoria:[
    { h:"Processo disciplinar e controle judicial", p:[
      "SV 5: a falta de defesa técnica por advogado no PAD <b>não ofende</b> a Constituição.",
      "Súmula 665/STJ: o controle judicial do PAD se restringe à regularidade do procedimento e à legalidade do ato, sem incursão no mérito, salvo flagrante ilegalidade, teratologia ou manifesta desproporcionalidade da sanção.",
      "Independência das instâncias: absolvição penal por <b>inexistência do fato</b> ou <b>negativa de autoria</b> repercute na esfera administrativa; por falta de provas, não."]}],
  pegadinhas:["Prazo de recurso: 10 dias; decisão: 30 dias.","Reformatio in pejus: cabe no recurso (com ciência), não na revisão.","Depósito prévio para recorrer: inconstitucional (SV 21)."]}
],
lei:[
{ art:"Lei 9.784/1999, arts. 56 a 65", nome:"Recursos administrativos", sec:"administrativo", itens:[
  { id:"l9784a56", rot:"Arts. 56, 57, 59 e 61", t:"Art. 56. Das decisões administrativas cabe recurso, em face de razões de <b class='g1'>legalidade e de mérito</b>.<br>§ 1º O recurso será dirigido à autoridade que proferiu a decisão, a qual, se não a reconsiderar no prazo de <b class='g2'>cinco dias</b>, o encaminhará à autoridade superior.<br>Art. 57. O recurso administrativo tramitará no máximo por <b class='g2'>três instâncias</b> administrativas, salvo disposição legal diversa.<br>(...)<br>Art. 59. Salvo disposição legal específica, é de <b class='g2'>dez dias</b> o prazo para interposição de recurso administrativo, contado a partir da ciência ou divulgação oficial da decisão recorrida.<br>§ 1º Quando a lei não fixar prazo diferente, o recurso administrativo deverá ser decidido no prazo máximo de <b class='g2'>trinta dias</b>, a partir do recebimento dos autos pelo órgão competente.<br>(...)<br>Art. 61. Salvo disposição legal em contrário, o recurso <b class='g3'>não tem efeito suspensivo</b>.", c:["ct1","ct2"], j:["stf-sv21"] },
  { id:"l9784a64", rot:"Arts. 64 e 65", t:"Art. 64. O órgão competente para decidir o recurso poderá confirmar, modificar, anular ou revogar, total ou parcialmente, a decisão recorrida, se a matéria for de sua competência.<br>Parágrafo único. Se da aplicação do disposto neste artigo puder decorrer <b class='g1'>gravame à situação do recorrente</b>, este deverá ser <b class='g3'>cientificado para que formule suas alegações</b> antes da decisão.<br>Art. 65. Os processos administrativos de que resultem sanções poderão ser <b class='g1'>revistos</b>, a qualquer tempo, a pedido ou de ofício, quando surgirem fatos novos ou circunstâncias relevantes suscetíveis de justificar a inadequação da sanção aplicada.<br>Parágrafo único. Da revisão do processo <b class='g3'>não poderá resultar agravamento</b> da sanção.", c:["ct3"] }]}
],
juris:[
{ id:"stf-sv21", trib:"STF", tipo:"Súmula Vinculante", num:"SV 21", sec:"administrativo", status:"vigente", data:"29/10/2009",
  titulo:"Depósito prévio para recurso administrativo",
  texto:"É inconstitucional a exigência de depósito ou arrolamento prévios de dinheiro ou bens para admissibilidade de recurso administrativo.",
  explica:"Viola o direito de petição e a ampla defesa.", lei:["l9784a56"], fonte:STFSV },
{ id:"stf-sv5", trib:"STF", tipo:"Súmula Vinculante", num:"SV 5", sec:"administrativo", status:"vigente", data:"07/05/2008",
  titulo:"PAD sem advogado",
  texto:"A falta de defesa técnica por advogado no processo administrativo disciplinar não ofende a Constituição.",
  explica:"Superou a Súmula 343/STJ. O servidor pode constituir advogado, mas sua ausência não gera nulidade por si.", lei:["l9784a56"], fonte:STFSV },
{ id:"stj-s665", trib:"STJ", tipo:"Súmula", num:"Súmula 665", sec:"administrativo", status:"vigente", data:"13/12/2023",
  titulo:"Limites do controle judicial do PAD",
  texto:"O controle jurisdicional do processo administrativo disciplinar restringe-se ao exame da regularidade do procedimento e da legalidade do ato, à luz dos princípios do contraditório, da ampla defesa e do devido processo legal, não sendo possível incursão no mérito administrativo, ressalvadas as hipóteses de flagrante ilegalidade, teratologia ou manifesta desproporcionalidade da sanção aplicada.",
  explica:"Muito cobrada em carreiras policiais (PADs de servidores da segurança).", lei:["l9784a64"], fonte:STJS }
],
cards:[
{ id:"ct1", tipo:"numero", sec:"administrativo", f:"Lei 9.784: prazo do recurso, de reconsideração, de decisão e número de instâncias.", v:"Recurso <b>10 dias</b>; reconsideração <b>5 dias</b>; decisão <b>30 dias</b> (prorrogáveis); até <b>3 instâncias</b>.", lei:["l9784a56"] },
{ id:"ct2", tipo:"caso", sec:"administrativo", f:"Lei municipal exige depósito de 30% da multa para recorrer administrativamente. Constitucional?", v:"<b>Não</b> — SV 21.", lei:["l9784a56"], j:["stf-sv21"] },
{ id:"ct3", tipo:"distincao", sec:"administrativo", f:"Agravamento: recurso × revisão.", v:"<b>Recurso</b>: pode agravar, com prévia ciência do recorrente. <b>Revisão</b> (fatos novos): nunca agrava.", lei:["l9784a64"] },
{ id:"ct4", tipo:"caso", sec:"administrativo", f:"Policial demitido em PAD conduzido sem advogado, mas com defesa própria e contraditório. Nulidade?", v:"<b>Não</b> — SV 5.", lei:[], j:["stf-sv5"] },
{ id:"ct5", tipo:"caso", sec:"administrativo", f:"Servidor quer que o juiz reavalie as provas do PAD e troque a demissão por suspensão por achá-la excessiva. Pode?", v:"Só se a sanção for <b>manifestamente desproporcional</b>, flagrantemente ilegal ou teratológica (Súmula 665/STJ).", lei:["l9784a64"], j:["stj-s665"] },
{ id:"ct6", tipo:"caso", sec:"especies", f:"Juiz anula, por ilegalidade, ato de concessão de licença. E se achasse a licença apenas inconveniente?", v:"Ilegalidade: <b>pode anular</b>. Inconveniência (mérito): <b>não</b> pode revogar ato do Executivo.", lei:[] }
],
importancia:{ nivel:4,
  texto:"Cai a classificação do controle, o prazo dos recursos da Lei 9.784, as súmulas vinculantes 3, 5 e 21 e os limites do controle judicial do PAD (Súmula 665/STJ), muito relevantes para carreiras policiais.",
  decore:[
    ["Prazo do recurso administrativo (art. 59)","<b>10 dias</b>"],
    ["Reconsideração (art. 56, § 1º)","<b>5 dias</b>"],
    ["Decisão do recurso (art. 59, § 1º)","<b>30 dias</b>"],
    ["Instâncias (art. 57)","no máximo <b>3</b>"],
    ["Efeito suspensivo (art. 61)","em regra, <b>não tem</b>"],
    ["Depósito prévio para recorrer","inconstitucional (<b>SV 21</b>)"],
    ["PAD sem advogado","não ofende a Constituição (<b>SV 5</b>)"],
    ["Contraditório perante o TCU","<b>SV 3</b>, salvo apreciação inicial de aposentadoria, reforma e pensão"],
    ["Controle judicial do PAD","regularidade e legalidade (<b>Súmula 665/STJ</b>)"],
    ["Sustação de ato normativo do Executivo","Congresso, art. <b>49, V</b>"]],
  macetes:[
    ["10, 5, 30, 3","Recurso 10 dias; reconsideração 5; decisão 30; três instâncias."],
    ["Recurso agrava, revisão não","No recurso pode haver reformatio in pejus (com ciência). Na revisão, nunca."],
    ["Mérito só a Administração controla","O Judiciário controla legalidade, inclusive razoabilidade e proporcionalidade, mas não o mérito."]] },
comparativo:{ titulo:"Recurso × revisão", head:["Recurso administrativo (arts. 56 a 64)","Revisão do processo sancionador (art. 65)"], rows:[
  ["<b>Quando cabe:</b> contra decisão administrativa, por razões de legalidade e de mérito","<b>Quando cabe:</b> quando surgirem fatos novos ou circunstâncias relevantes que justifiquem a inadequação da sanção"],
  ["<b>Prazo:</b> 10 dias da ciência ou divulgação oficial","<b>Prazo:</b> a qualquer tempo"],
  ["<b>Iniciativa:</b> do interessado","<b>Iniciativa:</b> a pedido ou de ofício"],
  ["<b>Agravamento:</b> possível, desde que o recorrente seja cientificado para alegar","<b>Agravamento:</b> não pode resultar agravamento da sanção"],
  ["<b>Efeito suspensivo:</b> em regra, não tem (art. 61)","<b>Objeto:</b> apenas processos de que resultem sanções"]]},
prova:[
  { tipo:"ce", enun:"Segundo a Lei 9.784/1999, o prazo para interpor recurso administrativo é de dez dias, contado da ciência ou divulgação oficial da decisão.", gab:"Certo", com:"Art. 59, caput." },
  { tipo:"ce", enun:"É constitucional lei que exija depósito prévio de parte da multa para a admissibilidade de recurso administrativo.", gab:"Errado", com:"SV 21: é inconstitucional exigir depósito ou arrolamento prévios." },
  { tipo:"ce", enun:"A ausência de advogado no processo administrativo disciplinar, por si só, gera nulidade por ofensa à ampla defesa.", gab:"Errado", com:"SV 5: a falta de defesa técnica por advogado no PAD não ofende a Constituição." },
  { tipo:"ce", enun:"Na revisão de processo administrativo de que resultou sanção, é permitido agravar a penalidade quando surgirem fatos novos.", gab:"Errado", com:"Art. 65, parágrafo único: da revisão não pode resultar agravamento." },
  { tipo:"caso", enun:"Servidor pede que o juiz reavalie as provas do PAD e troque a demissão por suspensão por achá-la excessiva. O Judiciário pode atender?", com:"Em regra não: o controle se limita à regularidade do procedimento e à legalidade. Só em caso de flagrante ilegalidade, teratologia ou manifesta desproporcionalidade da sanção (Súmula 665/STJ)." },
  { tipo:"caso", enun:"O Congresso Nacional pode sustar decreto do Executivo que exorbite do poder regulamentar?", com:"Sim, nos termos do art. 49, V, da CF; trata-se de controle de legalidade." }],
resumo:[
  "O controle pode ser <b>administrativo, legislativo (com o Tribunal de Contas) e judicial</b>; interno ou externo; prévio, concomitante ou posterior.",
  "Controle de <b>legalidade</b> cabe a todos os Poderes; o de <b>mérito</b>, só à própria Administração.",
  "Controle finalístico (tutela) incide sobre a administração indireta, sem hierarquia.",
  "Recurso administrativo: legalidade e mérito, <b>10 dias</b>, até 3 instâncias, sem efeito suspensivo em regra; decisão em <b>30 dias</b>.",
  "No recurso pode haver reformatio in pejus (com ciência prévia); na revisão, não.",
  "SV 21 veda depósito prévio; SV 5 dispensa advogado no PAD; SV 3 trata do contraditório no TCU.",
  "Súmula 665/STJ limita o controle judicial do PAD à legalidade e à regularidade, salvo desproporção manifesta.",
  "Absolvição penal por inexistência do fato ou negativa de autoria repercute na esfera administrativa; falta de provas, não."],
checklist:[
  "Classificar o controle quanto ao órgão, à posição, ao momento e ao aspecto.",
  "Explicar o controle legislativo e o papel do Tribunal de Contas.",
  "Citar os prazos do recurso (10, 5 e 30 dias) e o número de instâncias.",
  "Dizer quando o recurso tem efeito suspensivo.",
  "Diferenciar recurso e revisão quanto ao agravamento.",
  "Aplicar as súmulas vinculantes 3, 5 e 21.",
  "Explicar os limites do controle judicial do PAD (Súmula 665/STJ).",
  "Explicar a independência das instâncias."],
questoes:[]
};

/* ======================= RESPONSABILIDADE CIVIL DO ESTADO ======================= */
T.adm_responsabilidade_estado = {
meta:{ tema:"Responsabilidade civil do Estado", atualizado:AT,
  foco:"Evolução das teorias; risco administrativo × risco integral; condutas comissivas e omissivas (omissão específica); excludentes; dupla garantia e regresso (Tema 940); presos e foragidos (Temas 592, 365, 362); operações policiais (Tema 1.237); cartórios (Tema 777); atos legislativos e judiciais; prescrição." },
secoes:[
{ id:"teorias", titulo:"Teorias e fundamentos", curto:"Teorias",
  rapido:["Evolução: <b>irresponsabilidade</b> → <b>culpa civil</b> (atos de gestão) → <b>culpa administrativa</b> (faute du service: o serviço não funcionou, funcionou mal ou atrasou) → <b>risco administrativo</b> (objetiva, com excludentes) → <b>risco integral</b> (objetiva, sem excludentes).",
    "Regra no Brasil (art. 37, §6º): <b>responsabilidade objetiva</b>, teoria do <b>risco administrativo</b> — basta conduta, dano e nexo causal.",
    "Alcança pessoas de direito público e <b>pessoas de direito privado prestadoras de serviço público</b> (inclusive perante <b>não usuários</b>). Estatais exploradoras de atividade econômica respondem como empresas privadas.",
    "Risco integral (sem excludentes): <b>dano nuclear</b>, <b>dano ambiental</b>, atentados terroristas e atos de guerra contra aeronaves brasileiras (Leis 10.309 e 10.744)."],
  teoria:[
    { h:"Excludentes e atenuante", p:[
      "Excluem o nexo: <b>culpa exclusiva da vítima</b>, <b>caso fortuito ou força maior</b>, <b>fato exclusivo de terceiro</b>.",
      "Culpa <b>concorrente</b> da vítima não exclui: <b>reduz</b> a indenização.",
      "Atos lícitos também podem gerar dever de indenizar quando causam dano anormal e específico (ex.: obra que inviabiliza comércio)."]}],
  pegadinhas:["Risco administrativo admite excludentes; risco integral não.","Concessionária responde objetivamente também ao terceiro não usuário."]},
{ id:"omissao", titulo:"Omissão, custódia e segurança pública", curto:"Omissão",
  rapido:["Omissão: a doutrina clássica aplica responsabilidade <b>subjetiva</b> (culpa do serviço); o STF tem aplicado a <b>objetiva</b> quando há <b>omissão específica</b> — dever individualizado de agir que o Estado descumpre.",
    "<b>Morte de detento</b>: o Estado responde quando descumpre o dever específico de proteção do art. 5º, XLIX (Tema 592). Condições degradantes de encarceramento geram dano moral (Tema 365).",
    "<b>Crime de foragido</b>: só há responsabilidade com <b>nexo causal direto</b> entre a fuga e o crime (Tema 362).",
    "<b>Operações policiais</b>: o Estado responde por morte ou ferimento (risco administrativo); ônus das excludentes é do Estado; perícia inconclusiva não afasta (Tema 1.237)."],
  teoria:[
    { h:"Outros casos que caem", p:[
      "Fiscalização de comércio de fogos: o Estado responde se tinha conhecimento da irregularidade (Tema 366).",
      "Cartórios: o <b>Estado</b> responde objetivamente pelos atos de tabeliães e registradores, com regresso obrigatório em caso de dolo ou culpa (Tema 777).",
      "Erro judiciário e preso além do tempo da sentença: dever de indenizar (art. 5º, LXXV). Atos legislativos: em regra, não geram indenização, salvo lei declarada inconstitucional ou lei de efeitos concretos."]}],
  pegadinhas:["Foragido que comete crime anos depois, longe do presídio: em regra, Estado <b>não</b> responde.","Detento morto na cela: Estado responde, salvo prova de que não podia evitar."]},
{ id:"acao", titulo:"Ação, regresso e prescrição", curto:"Ação",
  rapido:["<b>Dupla garantia</b> (Tema 940): a vítima aciona o <b>Estado</b> (ou a prestadora); o agente é parte ilegítima. O Estado tem <b>regresso</b> contra o agente em caso de <b>dolo ou culpa</b> (responsabilidade subjetiva do agente).",
    "Denunciação da lide ao agente: não é obrigatória; o STJ a admite em certos casos, mas a tendência é rejeitá-la quando introduz fundamento novo (culpa).",
    "Prescrição da pretensão contra a Fazenda: <b>5 anos</b> (Decreto 20.910/1932), segundo o STJ. A ação de regresso por ilícito comum prescreve; por ato doloso de improbidade, é imprescritível (Tema 897).",
    "Agente \"nessa qualidade\": o dano precisa ocorrer no exercício ou em razão da função (policial de folga que usa arma da corporação: o Estado pode responder)."],
  teoria:[
    { h:"Responsabilidade do agente nas três esferas", p:[
      "Civil, penal e administrativa são independentes; a absolvição penal por inexistência do fato ou negativa de autoria afasta a responsabilidade administrativa e civil (Lei 8.112, art. 126).",
      "LINDB, art. 28: o agente responde pessoalmente por decisões ou opiniões técnicas só com dolo ou erro grosseiro."]}],
  pegadinhas:["Vítima não pode escolher processar só o policial (Tema 940).","Regresso exige dolo ou culpa."]}
],
lei:[
{ art:"CF, art. 37, §6º; art. 5º, LXXV", nome:"Fundamento constitucional", sec:"teorias", itens:[
  { id:"cf37p6r", rot:"Art. 37, §6º", t:"As <b class='g1'>pessoas jurídicas de direito público</b> e as de <b class='g1'>direito privado prestadoras de serviços públicos</b> responderão pelos danos que seus agentes, <b class='g1'>nessa qualidade</b>, causarem a terceiros, assegurado o <b class='g1'>direito de regresso</b> contra o responsável nos casos de <b class='g3'>dolo ou culpa</b>.", c:["rc1","rc2","rc3"], j:["stf-t940r","stf-t1237r"] },
  { id:"cf5lxxv", rot:"Art. 5º, LXXV", t:"o Estado indenizará o condenado por <b class='g1'>erro judiciário</b>, assim como o que ficar <b class='g1'>preso além do tempo fixado na sentença</b>;", c:["rc4"] }]},
{ art:"CF, art. 5º, XLIX", nome:"Dever de custódia", sec:"omissao", itens:[
  { id:"cf5xlix", rot:"Art. 5º, XLIX", t:"é assegurado aos presos o <b class='g1'>respeito à integridade física e moral</b>;", c:["rc5","rc6"], j:["stf-t592","stf-t362"] }]}
],
juris:[
{ id:"stf-t940r", trib:"STF", tipo:"Repercussão geral", num:"RE 1.027.633 (Tema 940)", sec:"acao", status:"vigente", data:"14/08/2019",
  titulo:"Dupla garantia",
  texto:"A teor do disposto no art. 37, § 6º, da Constituição Federal, a ação por danos causados por agente público deve ser ajuizada contra o Estado ou a pessoa jurídica de direito privado prestadora de serviço público, sendo parte ilegítima para a ação o autor do ato, assegurado o direito de regresso contra o responsável nos casos de dolo ou culpa.",
  explica:"Protege a vítima e o agente ao mesmo tempo.", lei:["cf37p6r"], fonte:STFRG },
{ id:"stf-t1237r", trib:"STF", tipo:"Repercussão geral", num:"ARE 1.385.315 (Tema 1.237)", sec:"omissao", status:"vigente", data:"11/04/2024",
  titulo:"Operações de segurança pública",
  texto:"(i) O Estado é responsável, na esfera cível, por morte ou ferimento decorrente de operações de segurança pública, nos termos da Teoria do Risco Administrativo; (ii) É ônus probatório do ente federativo demonstrar eventuais excludentes de responsabilidade civil; (iii) A perícia inconclusiva sobre a origem de disparo fatal durante operações policiais e militares não é suficiente, por si só, para afastar a responsabilidade civil do Estado, por constituir elemento indiciário.",
  explica:"Inverte, na prática, o ônus: é o Estado quem prova que o tiro não partiu de seus agentes ou que há excludente.", lei:["cf37p6r"], fonte:STFRG },
{ id:"stf-t592", trib:"STF", tipo:"Repercussão geral", num:"RE 841.526 (Tema 592)", sec:"omissao", status:"vigente", data:"30/03/2016",
  titulo:"Morte de detento",
  texto:"Em caso de inobservância do seu dever específico de proteção previsto no artigo 5º, inciso XLIX, da Constituição Federal, o Estado é responsável pela morte de detento.",
  explica:"O Estado se exime se provar que a morte não podia ser evitada (ex.: morte natural súbita), rompendo o nexo.", lei:["cf5xlix"], fonte:STFRG },
{ id:"stf-t362", trib:"STF", tipo:"Repercussão geral", num:"RE 608.880 (Tema 362)", sec:"omissao", status:"vigente", data:"08/09/2020",
  titulo:"Crime cometido por foragido",
  texto:"Nos termos do artigo 37, § 6º, da Constituição Federal, não se caracteriza a responsabilidade civil objetiva do Estado por danos decorrentes de crime praticado por pessoa foragida do sistema prisional, quando não demonstrado o nexo causal direto entre o momento da fuga e a conduta praticada.",
  explica:"Fuga recente + crime em seguida (nexo direto) → responde; crime meses depois → em regra, não.", lei:["cf5xlix"], fonte:STFRG },
{ id:"stf-t777", trib:"STF", tipo:"Repercussão geral", num:"RE 842.846 (Tema 777)", sec:"omissao", status:"vigente", data:"27/02/2019",
  titulo:"Responsabilidade por atos de cartórios",
  texto:"O Estado responde, objetivamente, pelos atos dos tabeliães e registradores oficiais que, no exercício de suas funções, causem dano a terceiros, assegurado o direito de regresso contra o responsável, nos casos de dolo ou culpa, sob pena de improbidade administrativa.",
  explica:"O regresso é <b>obrigatório</b>: deixar de cobrar o notário culpado configura improbidade.", lei:["cf37p6r"], fonte:STFRG }
],
cards:[
{ id:"rc1", tipo:"distincao", sec:"teorias", f:"Risco administrativo × risco integral.", v:"<b>Administrativo</b>: objetiva, <b>admite excludentes</b> (regra). <b>Integral</b>: objetiva, <b>sem excludentes</b> (nuclear, ambiental, terrorismo contra aeronaves).", lei:["cf37p6r"] },
{ id:"rc2", tipo:"caso", sec:"teorias", f:"Viatura em perseguição colide com carro que avançou o sinal vermelho, e a culpa foi só do motorista particular. O Estado indeniza?", v:"<b>Não</b> — culpa <b>exclusiva</b> da vítima rompe o nexo. Se concorrente, a indenização é reduzida.", lei:["cf37p6r"] },
{ id:"rc3", tipo:"caso", sec:"acao", f:"Vítima de agressão por policial em serviço ajuíza ação só contra o policial. O juiz deve...?", v:"Reconhecer a <b>ilegitimidade passiva</b> do policial (Tema 940): a ação é contra o Estado.", lei:["cf37p6r"], j:["stf-t940r"] },
{ id:"rc4", tipo:"caso", sec:"omissao", f:"Preso cumpre 2 meses além da pena fixada por falha da vara de execução. Direito?", v:"<b>Indenização</b> — art. 5º, LXXV.", lei:["cf5lxxv"] },
{ id:"rc5", tipo:"caso", sec:"omissao", f:"Detento é morto por outro preso na cela. O Estado responde?", v:"<b>Sim</b> — descumprimento do dever específico de proteção (Tema 592).", lei:["cf5xlix"], j:["stf-t592"] },
{ id:"rc6", tipo:"caso", sec:"omissao", f:"Preso foge e, 8 meses depois, comete latrocínio em outra cidade. O Estado indeniza a família da vítima?", v:"Em regra, <b>não</b>: falta nexo causal direto entre a fuga e o crime (Tema 362).", lei:["cf5xlix"], j:["stf-t362"] },
{ id:"rc7", tipo:"caso", sec:"omissao", f:"Bala perdida em operação policial mata morador; a perícia não identifica a arma. O Estado responde?", v:"<b>Sim</b> (Tema 1.237): perícia inconclusiva não afasta; o Estado é que deve provar excludente.", lei:[], j:["stf-t1237r"] },
{ id:"rc8", tipo:"numero", sec:"acao", f:"Prazo para a vítima processar a Fazenda Pública.", v:"<b>5 anos</b> (Decreto 20.910/1932, segundo o STJ).", lei:[] }
],
importancia:{ nivel:5,
  texto:"Um dos temas mais cobrados da disciplina: a banca mistura risco administrativo e integral, omissão específica, presos e foragidos e a dupla garantia. Os temas do STF são muito recorrentes em segurança pública.",
  decore:[
    ["Regra (art. 37, § 6º)","responsabilidade <b>objetiva</b>, risco administrativo"],
    ["Sem excludentes","risco <b>integral</b>: dano nuclear e ambiental, terrorismo contra aeronaves"],
    ["Excludentes","culpa exclusiva da vítima, caso fortuito ou força maior, fato de terceiro"],
    ["Culpa concorrente da vítima","<b>reduz</b> a indenização"],
    ["Dupla garantia (Tema 940)","a vítima processa o <b>Estado</b>; regresso contra o agente com dolo ou culpa"],
    ["Morte de detento (Tema 592)","Estado responde se descumpre o dever específico de proteção"],
    ["Foragido (Tema 362)","só com <b>nexo causal direto</b> entre a fuga e o crime"],
    ["Operações policiais (Tema 1.237)","risco administrativo; <b>ônus das excludentes é do Estado</b>"],
    ["Cartórios (Tema 777)","Estado responde objetivamente, com regresso <b>obrigatório</b>"],
    ["Prescrição contra a Fazenda","<b>5 anos</b> (Decreto 20.910/1932)"]],
  macetes:[
    ["Duas portas, uma entrada","A vítima entra pelo Estado (Tema 940); o Estado depois cobra do agente, se houve dolo ou culpa."],
    ["Fuga recente liga, fuga antiga desliga","Crime logo após a fuga: há nexo. Meses depois, em outra cidade: em regra, não."],
    ["Omissão que a lei específica","Se o dever de agir era individualizado, a omissão é específica e o STF tem aplicado a responsabilidade objetiva."]] },
comparativo:{ titulo:"Risco administrativo × risco integral", head:["Risco administrativo","Risco integral"], rows:[
  ["<b>Natureza:</b> responsabilidade objetiva, regra do art. 37, § 6º","<b>Natureza:</b> responsabilidade objetiva, em casos excepcionais"],
  ["<b>Excludentes:</b> admite culpa exclusiva da vítima, fortuito ou força maior e fato de terceiro","<b>Excludentes:</b> não admite"],
  ["<b>Posição:</b> é a regra geral no Brasil","<b>Posição:</b> é exceção, para hipóteses específicas (Leis 10.309 e 10.744, dano nuclear e ambiental)"],
  ["<b>Exemplos:</b> operações policiais, morte de detento","<b>Exemplos:</b> dano nuclear, dano ambiental, atentados terroristas e atos de guerra contra aeronaves brasileiras"],
  ["<b>Elementos:</b> conduta, dano e nexo causal","<b>Elementos:</b> conduta, dano e nexo causal, sem as excludentes"]]},
prova:[
  { tipo:"ce", enun:"O art. 37, § 6º, da CF alcança também as pessoas jurídicas de direito privado prestadoras de serviço público, inclusive quanto a danos causados a terceiros não usuários.", gab:"Certo", com:"A responsabilidade objetiva abrange concessionárias e permissionárias, inclusive perante não usuários." },
  { tipo:"ce", enun:"Segundo o STF, a vítima de dano causado por agente público no exercício da função pode ajuizar ação diretamente contra o agente, por ele ser o autor do ato.", gab:"Errado", com:"Tema 940: a ação é contra o Estado ou a prestadora; o agente é parte ilegítima." },
  { tipo:"ce", enun:"O Estado responde objetivamente pela morte de detento, em caso de descumprimento do dever específico de proteção do art. 5º, XLIX.", gab:"Certo", com:"Tema 592 do STF." },
  { tipo:"ce", enun:"Em operações de segurança pública, a perícia inconclusiva sobre a origem do disparo fatal basta para afastar a responsabilidade civil do Estado.", gab:"Errado", com:"Tema 1.237: a perícia inconclusiva não afasta, por si só, a responsabilidade; o ônus de provar excludentes é do Estado." },
  { tipo:"caso", enun:"Preso foge e, oito meses depois, em outra cidade, comete latrocínio. O Estado indeniza a família da vítima?", com:"Em regra não: falta nexo causal direto entre a fuga e o crime (Tema 362)." },
  { tipo:"caso", enun:"Preso cumpre dois meses além da pena fixada por falha da vara de execução. Qual o direito?", com:"Indenização, com base no art. 5º, LXXV, da CF." }],
resumo:[
  "Evolução: irresponsabilidade, culpa civil, culpa administrativa (<i>faute du service</i>), risco administrativo e risco integral.",
  "No Brasil, a regra é a responsabilidade <b>objetiva</b> pelo <b>risco administrativo</b>: conduta, dano e nexo causal.",
  "Alcança pessoas de direito público e privadas prestadoras de serviço público; exploradoras de atividade econômica respondem como empresas privadas.",
  "Excludentes: culpa exclusiva da vítima, fortuito ou força maior, fato de terceiro. Culpa concorrente apenas reduz.",
  "Risco integral, sem excludentes: dano nuclear, ambiental e terrorismo ou guerra contra aeronaves.",
  "Omissão específica: o STF tem aplicado a responsabilidade objetiva; presos, foragidos e operações policiais seguem os Temas 592, 362 e 1.237.",
  "<b>Dupla garantia</b> (Tema 940): ação contra o Estado e regresso contra o agente com dolo ou culpa.",
  "Cartórios (Tema 777): Estado responde, regresso obrigatório. Prescrição contra a Fazenda: 5 anos."],
checklist:[
  "Explicar as teorias da responsabilidade do Estado.",
  "Diferenciar risco administrativo e risco integral, com exemplos.",
  "Listar as excludentes e dizer o efeito da culpa concorrente.",
  "Explicar a omissão específica.",
  "Aplicar os Temas 592, 362 e 1.237.",
  "Explicar a dupla garantia e o direito de regresso.",
  "Explicar a responsabilidade por atos de cartórios (Tema 777).",
  "Citar o prazo prescricional contra a Fazenda.",
  "Explicar o erro judiciário e a prisão além do tempo (art. 5º, LXXV)."],
questoes:[]
};

/* ======================= AGENTES PÚBLICOS ======================= */
T.adm_agentes = {
meta:{ tema:"Agentes públicos", atualizado:AT,
  foco:"Classificação dos agentes; cargo, emprego e função; formas de provimento e vacância (Lei 8.112 como modelo); concurso e direitos do candidato; estabilidade e estágio probatório; acumulação (EC 138/2025); PAD e prescrição disciplinar; regime dos servidores policiais estaduais.",
  aviso:"Na PC-BA e na PC-PE valem os estatutos estaduais (servidores civis e da Polícia Civil de cada Estado). A Lei 8.112/1990 é usada aqui como modelo didático — confira as diferenças no estatuto do seu concurso." },
secoes:[
{ id:"especies", titulo:"Espécies de agentes, cargo, emprego e função", curto:"Espécies",
  rapido:["<b>Agentes políticos</b> (chefes do Executivo, parlamentares, ministros e secretários; para parte da doutrina, magistrados e membros do MP); <b>agentes administrativos</b> (servidores estatutários, empregados públicos, temporários); <b>particulares em colaboração</b> (jurados, mesários, concessionários, notários); <b>militares</b>.",
    "<b>Cargo</b>: conjunto de atribuições criado por lei, regime estatutário. <b>Emprego</b>: vínculo celetista. <b>Função</b>: atribuição sem cargo (função de confiança, temporários).",
    "Temporários (art. 37, IX): contratação por tempo determinado para necessidade temporária de <b>excepcional interesse público</b>, com processo seletivo simplificado — não para atividades permanentes ordinárias.",
    "Para fins penais, \"funcionário público\" é conceito amplo (CP, art. 327) — inclui quem exerce função pública, ainda que transitoriamente e sem remuneração."],
  teoria:[
    { h:"Regime jurídico", p:[
      "A EC 19/1998 tentou acabar com o regime jurídico único, mas o STF suspendeu a mudança (ADI 2.135, cautelar 2007); em 2024, o STF julgou o mérito e validou a EC 19 nesse ponto, com efeitos prospectivos — entes podem adotar regime celetista para novos servidores de atividades não exclusivas de Estado (confira a lei de cada ente).",
      "Carreiras típicas de Estado (polícia, fisco, diplomacia) permanecem estatutárias."]}],
  pegadinhas:["Jurado e mesário são agentes públicos (particulares em colaboração).","Temporário não ocupa cargo nem emprego: exerce função."]},
{ id:"provimento", titulo:"Provimento, vacância, estabilidade e estágio", curto:"Provimento",
  rapido:["Formas de provimento (Lei 8.112, art. 8º): <b>nomeação</b> (originário), <b>promoção, readaptação, reversão, aproveitamento, reintegração e recondução</b> (derivados). Ascensão e transferência foram extintas (SV 43).",
    "<b>Reintegração</b>: volta do estável demitido cuja demissão foi invalidada. <b>Recondução</b>: volta do estável ao cargo anterior por inabilitação em estágio de outro cargo ou reintegração do anterior ocupante. <b>Reversão</b>: retorno do aposentado. <b>Aproveitamento</b>: retorno do posto em disponibilidade.",
    "Nomeação → <b>posse</b> em até <b>30 dias</b> (sem posse, a nomeação fica sem efeito) → <b>exercício</b> em até <b>15 dias</b> (sem exercício, exoneração).",
    "Estabilidade: <b>3 anos</b> de efetivo exercício + avaliação especial de desempenho (CF, art. 41). O estágio probatório acompanha esse prazo segundo STF e STJ."],
  teoria:[
    { h:"Vacância e disciplina", p:[
      "Vacância: exoneração, demissão, promoção, readaptação, aposentadoria, posse em outro cargo inacumulável, falecimento.",
      "<b>Exoneração</b> não é punição (a pedido, ou de ofício por não aprovação no estágio ou não entrar em exercício); <b>demissão</b> é sanção.",
      "PAD (Lei 8.112): prazo de <b>60 dias</b>, prorrogável por igual período; sindicância: 30 dias, prorrogável por igual período. Prescrição: <b>5 anos</b> (demissão, cassação), <b>2 anos</b> (suspensão), <b>180 dias</b> (advertência), contados do conhecimento do fato; se a infração também for crime, aplica-se o prazo penal.",
      "Acumulação (CF, art. 37, XVI): dois de professor; professor + cargo de qualquer natureza (EC 138/2025); dois de saúde — sempre com compatibilidade de horários e teto."]}],
  pegadinhas:["Posse: 30 dias; exercício: 15 dias (Lei 8.112).","Reintegração ≠ recondução.","Exoneração não é sanção; demissão é."]}
],
lei:[
{ art:"CF, art. 37, II e IX; art. 41", nome:"Acesso, temporários e estabilidade", sec:"provimento", itens:[
  { id:"cf37ix", rot:"Art. 37, IX", t:"a lei estabelecerá os casos de <b class='g1'>contratação por tempo determinado</b> para atender a <b class='g1'>necessidade temporária de excepcional interesse público</b>;", c:["ag1"] },
  { id:"cf41a", rot:"Art. 41, caput e §§2º e 3º", t:"São estáveis após <b class='g2'>três anos</b> de efetivo exercício os servidores nomeados para cargo de provimento efetivo em virtude de concurso público.<br>(...)<br>§ 2º Invalidada por sentença judicial a demissão do servidor estável, será ele <b class='g1'>reintegrado</b>, e o eventual ocupante da vaga, se estável, <b class='g1'>reconduzido</b> ao cargo de origem, sem direito a indenização, aproveitado em outro cargo ou posto em disponibilidade com remuneração proporcional ao tempo de serviço.<br>§ 3º Extinto o cargo ou declarada a sua desnecessidade, o servidor estável ficará em <b class='g1'>disponibilidade</b>, com remuneração proporcional ao tempo de serviço, até seu adequado aproveitamento em outro cargo.", c:["ag2","ag3"] }]},
{ art:"Lei 8.112/1990 (modelo federal)", nome:"Provimento, posse, PAD e prescrição", sec:"provimento", itens:[
  { id:"l8112a8", rot:"Arts. 8º, 13 e 15", t:"Art. 8º São formas de provimento de cargo público: I - <b class='g1'>nomeação</b>; II - <b class='g1'>promoção</b>; (...) V - <b class='g1'>readaptação</b>; VI - <b class='g1'>reversão</b>; VII - <b class='g1'>aproveitamento</b>; VIII - <b class='g1'>reintegração</b>; IX - <b class='g1'>recondução</b>.<br>Art. 13, § 1º A posse ocorrerá no prazo de <b class='g2'>trinta dias</b> contados da publicação do ato de provimento. (...) § 6º Será tornado sem efeito o ato de provimento se a posse não ocorrer no prazo previsto no § 1º deste artigo.<br>Art. 15, § 1º É de <b class='g2'>quinze dias</b> o prazo para o servidor empossado em cargo público entrar em exercício, contados da data da posse.", c:["ag4","ag5"] },
  { id:"l8112a142", rot:"Arts. 142 e 152", t:"Art. 142. A ação disciplinar prescreverá: I - em <b class='g2'>5 (cinco) anos</b>, quanto às infrações puníveis com demissão, cassação de aposentadoria ou disponibilidade e destituição de cargo em comissão; II - em <b class='g2'>2 (dois) anos</b>, quanto à suspensão; III - em <b class='g2'>180 (cento e oitenta) dias</b>, quanto à advertência.<br>§ 1º O prazo de prescrição começa a correr da data em que o fato se tornou <b class='g1'>conhecido</b>.<br>§ 2º Os prazos de prescrição previstos na lei penal aplicam-se às infrações disciplinares <b class='g3'>capituladas também como crime</b>.<br>Art. 152. O prazo para a conclusão do processo disciplinar não excederá <b class='g2'>60 (sessenta) dias</b>, contados da data de publicação do ato que constituir a comissão, admitida a sua prorrogação por igual prazo, quando as circunstâncias o exigirem.", c:["ag6","ag7"] }]}
],
juris:[
{ id:"stf-sv43a", trib:"STF", tipo:"Súmula Vinculante", num:"SV 43", sec:"provimento", status:"vigente", data:"08/04/2015",
  titulo:"Vedação de provimento em outra carreira sem concurso",
  texto:"É inconstitucional toda modalidade de provimento que propicie ao servidor investir-se, sem prévia aprovação em concurso público destinado ao seu provimento, em cargo que não integra a carreira na qual anteriormente investido.",
  explica:"Por isso ascensão e transferência deixaram de existir.", lei:["l8112a8"], fonte:STFSV }
],
cards:[
{ id:"ag1", tipo:"caso", sec:"especies", f:"Município contrata temporários, sucessivamente por 10 anos, para funções permanentes de escola. Válido?", v:"<b>Não</b> — o art. 37, IX, exige necessidade <b>temporária</b> e <b>excepcional</b>.", lei:["cf37ix"] },
{ id:"ag2", tipo:"distincao", sec:"provimento", f:"Reintegração × recondução.", v:"<b>Reintegração</b>: estável demitido volta porque a demissão foi anulada. <b>Recondução</b>: estável volta ao cargo anterior (o ocupante da vaga do reintegrado, ou quem foi inabilitado no estágio de outro cargo).", lei:["cf41a"] },
{ id:"ag3", tipo:"caso", sec:"provimento", f:"Cargo de servidor estável é extinto. O que acontece com ele?", v:"<b>Disponibilidade</b> com remuneração proporcional ao tempo de serviço, até aproveitamento.", lei:["cf41a"] },
{ id:"ag4", tipo:"numero", sec:"provimento", f:"Lei 8.112: prazos de posse e de exercício.", v:"Posse: <b>30 dias</b> da publicação (sem posse, o ato fica sem efeito). Exercício: <b>15 dias</b> da posse (sem exercício, exoneração).", lei:["l8112a8"] },
{ id:"ag5", tipo:"caso", sec:"provimento", f:"Servidor aposentado por invalidez recupera a capacidade. Como volta?", v:"Por <b>reversão</b>.", lei:["l8112a8"] },
{ id:"ag6", tipo:"numero", sec:"provimento", f:"Prescrição disciplinar (Lei 8.112).", v:"Demissão: <b>5 anos</b>; suspensão: <b>2 anos</b>; advertência: <b>180 dias</b> — do conhecimento do fato. Se também for crime: prazo penal.", lei:["l8112a142"] },
{ id:"ag7", tipo:"numero", sec:"provimento", f:"Prazo de conclusão do PAD (Lei 8.112).", v:"<b>60 dias</b>, prorrogáveis por igual período.", lei:["l8112a142"] }
],
importancia:{ nivel:5,
  texto:"Tema essencial para carreiras policiais: provimento e vacância, estabilidade, prazos de posse e exercício, PAD e prescrição disciplinar são cobrados com números exatos.",
  decore:[
    ["Posse (Lei 8.112, art. 13, § 1º)","<b>30 dias</b> da publicação do ato"],
    ["Exercício (art. 15, § 1º)","<b>15 dias</b> da posse"],
    ["Estabilidade (CF, art. 41)","<b>3 anos</b> de efetivo exercício + avaliação"],
    ["Prescrição disciplinar: demissão","<b>5 anos</b>"],
    ["Prescrição disciplinar: suspensão","<b>2 anos</b>"],
    ["Prescrição disciplinar: advertência","<b>180 dias</b>"],
    ["PAD (art. 152)","<b>60 dias</b>, prorrogáveis por igual prazo"],
    ["Reintegração (CF, art. 41, § 2º)","demissão do estável invalidada por sentença"],
    ["Ascensão e transferência","extintas (<b>SV 43</b>)"]],
  macetes:[
    ["30 e 15","Posse em 30 dias; exercício em 15 dias."],
    ["Cinco, dois e meio ano","Prescrição: demissão 5 anos, suspensão 2 anos, advertência 180 dias (meio ano)."],
    ["Reintegra quem foi demitido, reconduz quem perdeu a vaga","Reintegração: volta o demitido. Recondução: volta ao cargo de origem o ocupante da vaga ou o inabilitado em estágio."]] },
comparativo:{ titulo:"Reintegração × recondução", head:["Reintegração","Recondução"], rows:[
  ["<b>Quem volta:</b> o servidor estável demitido","<b>Quem volta:</b> o estável que ocupava o cargo, ou que foi inabilitado em estágio de outro cargo"],
  ["<b>Causa:</b> demissão invalidada por sentença judicial (CF, art. 41, § 2º)","<b>Causa:</b> reintegração do anterior ocupante da vaga ou inabilitação no estágio probatório de outro cargo"],
  ["<b>Destino:</b> o cargo de que foi demitido","<b>Destino:</b> o cargo de origem, anteriormente ocupado"],
  ["<b>Ocupante da vaga:</b> sai, sem indenização, sendo reconduzido, aproveitado ou posto em disponibilidade","<b>Natureza:</b> forma derivada de provimento, assim como a reintegração"]]},
prova:[
  { tipo:"ce", enun:"Segundo a Lei 8.112/1990, a posse deve ocorrer em até trinta dias da publicação do ato de provimento, e o exercício, em até quinze dias contados da posse.", gab:"Certo", com:"Arts. 13, § 1º, e 15, § 1º." },
  { tipo:"ce", enun:"Ascensão e transferência continuam sendo formas válidas de provimento derivado, desde que previstas em lei.", gab:"Errado", com:"SV 43: é inconstitucional o provimento em cargo de outra carreira sem concurso; essas formas deixaram de existir." },
  { tipo:"ce", enun:"A ação disciplinar prescreve em cinco anos para infrações puníveis com demissão, contados da data em que o fato se tornou conhecido.", gab:"Certo", com:"Art. 142, I e § 1º. Se também for crime, vale o prazo penal." },
  { tipo:"ce", enun:"A exoneração, por ser forma de vacância, tem sempre caráter punitivo.", gab:"Errado", com:"Exoneração não é sanção; demissão é." },
  { tipo:"caso", enun:"Município contrata temporários, sucessivamente por dez anos, para funções permanentes de escola. A contratação é válida?", com:"Não. O art. 37, IX, exige necessidade temporária de excepcional interesse público." },
  { tipo:"caso", enun:"Cargo de servidor estável é extinto. O que ocorre com ele?", com:"Fica em disponibilidade, com remuneração proporcional ao tempo de serviço, até seu aproveitamento (CF, art. 41, § 3º)." }],
resumo:[
  "Agentes públicos: políticos, administrativos (servidores, empregados, temporários), particulares em colaboração e militares.",
  "<b>Cargo</b> é estatutário e criado por lei; <b>emprego</b> é celetista; <b>função</b> é atribuição sem cargo.",
  "Temporários (art. 37, IX): necessidade temporária de excepcional interesse público, nunca para atividade permanente.",
  "Provimento originário: nomeação. Derivados: promoção, readaptação, reversão, aproveitamento, reintegração e recondução.",
  "Posse em <b>30 dias</b>; exercício em <b>15 dias</b>; estabilidade após <b>3 anos</b> de efetivo exercício.",
  "Exoneração não é pena; demissão é sanção.",
  "PAD: 60 dias, prorrogáveis. Prescrição: 5 anos, 2 anos e 180 dias, contada do conhecimento do fato; se também for crime, prazo penal.",
  "Na PC-BA e na PC-PE valem os estatutos estaduais; a Lei 8.112 é modelo didático."],
checklist:[
  "Classificar os agentes públicos.",
  "Diferenciar cargo, emprego e função.",
  "Explicar o regime dos temporários.",
  "Listar as formas de provimento originário e derivado.",
  "Diferenciar reintegração, recondução, reversão e aproveitamento.",
  "Citar os prazos de posse e de exercício.",
  "Explicar estabilidade e estágio probatório.",
  "Citar os prazos prescricionais disciplinares.",
  "Dizer o prazo do PAD e da sindicância.",
  "Lembrar que os estatutos estaduais prevalecem para PC-BA e PC-PE."],
questoes:[]
};

})();
