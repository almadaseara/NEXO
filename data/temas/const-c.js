/* Direito Constitucional (III): organização do Estado; administração pública; Poder Legislativo; processo legislativo.
   Conferido em 14/10/2026. Texto: CF/88 (Planalto), com EC 135/2024 (art. 37, §11), EC 138/2025 (art. 37, XVI, b)
   e EC 139/2026 (arts. 31, §1º, e 75 — Tribunais de Contas). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var STFSV = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26";
var STFRG = "https://portal.stf.jus.br/jurisprudenciaRepercussao/pesquisarProcesso.asp";
var EC138 = "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc138.htm";
var EC139 = "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc139.htm";

/* ======================= ORGANIZAÇÃO DO ESTADO ======================= */
T.organizacao_estado = {
meta:{ tema:"Organização político-administrativa (arts. 18 a 36)", atualizado:AT,
  foco:"Entes autônomos, criação de Estados e Municípios, vedações federativas; repartição de competências (exclusiva, privativa, comum, concorrente, remanescente e local) com ênfase em segurança pública e polícias (art. 22, XXI; art. 24, XVI; Lei 14.735/2023); súmulas vinculantes de competência; intervenção federal e estadual." },
secoes:[
{ id:"entes", titulo:"Entes federativos, criação e vedações", curto:"Entes",
  rapido:["União, Estados, DF e Municípios: <b>todos autônomos</b> (auto-organização, autogoverno, autoadministração, autolegislação). Soberana é a <b>República</b>, não a União. Territórios <b>integram a União</b> (autarquias territoriais, não são entes).",
    "Novos <b>Estados</b>: <b>plebiscito</b> da população diretamente interessada + <b>lei complementar</b> do Congresso.",
    "Novos <b>Municípios</b>: <b>lei estadual</b>, no período fixado por <b>LC federal</b>, após <b>estudos de viabilidade</b> e <b>plebiscito</b> nos Municípios envolvidos (a LC federal nunca veio — EC 57/2008 convalidou os criados até 2006).",
    "Vedações (art. 19): estabelecer cultos ou igrejas, recusar fé aos documentos públicos, criar distinções entre brasileiros ou preferências entre si."],
  teoria:[
    { h:"Distrito Federal", p:[
      "Acumula competências <b>estaduais e municipais</b>; não pode ser dividido em Municípios (art. 32).",
      "A <b>União</b> organiza e mantém a polícia civil, a polícia penal, a polícia militar e o corpo de bombeiros do DF (art. 21, XIV) e legisla sobre seus vencimentos (SV 39); o Governador do DF as utiliza."]}],
  pegadinhas:["Território federal não é ente federado.","Plebiscito para Estado: população <b>diretamente interessada</b>; Município: populações dos Municípios <b>envolvidos</b>."]},
{ id:"competencias", titulo:"Repartição de competências", curto:"Competências",
  rapido:["<b>Art. 21</b> — exclusiva da União (administrativa, indelegável). <b>Art. 22</b> — privativa da União (legislativa), <b>delegável</b> aos Estados por <b>lei complementar</b> sobre questões específicas.",
    "<b>Art. 23</b> — comum (administrativa) de todos os entes. <b>Art. 24</b> — concorrente (legislativa) de União, Estados e DF: União edita <b>normas gerais</b>; Estados <b>suplementam</b>; sem lei federal, Estados têm competência <b>plena</b>; lei federal superveniente <b>suspende a eficácia</b> (não revoga) da estadual no que for contrária.",
    "Art. 22, I — privativa: direito <b>civil, comercial, penal, processual, eleitoral, agrário, marítimo, aeronáutico, espacial e do trabalho</b> (\"CAPACETE PM\"). Art. 24, I — concorrente: <b>tributário, financeiro, penitenciário, econômico e urbanístico</b>.",
    "Polícias: normas gerais de organização, efetivos e garantias das <b>PMs e bombeiros</b> — <b>privativa</b> da União (art. 22, XXI); <b>organização, garantias, direitos e deveres das polícias civis</b> — <b>concorrente</b> (art. 24, XVI), base da <b>Lei 14.735/2023</b> (Lei Orgânica Nacional das Polícias Civis)."],
  teoria:[
    { h:"Estados e Municípios", p:[
      "Estados: competência <b>remanescente</b> (reservada) — tudo que não lhes for vedado (art. 25, §1º); exploração do gás canalizado (§2º); regiões metropolitanas por LC estadual (§3º).",
      "Municípios: legislar sobre <b>interesse local</b> e <b>suplementar</b> a legislação federal e estadual no que couber (art. 30). Ex.: horário do comércio (SV 38) — mas horário bancário é da União.",
      "Na pandemia (ADI 6.341), o STF afirmou que a competência comum em saúde permite a Estados e Municípios adotar medidas próprias — federalismo cooperativo."]}],
  quadro:{ titulo:"Competências — natureza e titulares", head:["Artigo","Natureza","Titular","Delegável?"], rows:[
    ["21","Exclusiva (material)","União","Não"],
    ["22","Privativa (legislativa)","União","Sim, por LC, questões específicas"],
    ["23","Comum (material)","Todos os entes","—"],
    ["24","Concorrente (legislativa)","União, Estados e DF (Municípios suplementam)","—"],
    ["25, §1º","Remanescente","Estados","—"],
    ["30, I e II","Interesse local e suplementar","Municípios","—"]]},
  pegadinhas:["Município <b>não</b> está no caput do art. 24, mas suplementa pelo art. 30, II.","Lei federal superveniente <b>suspende</b> a lei estadual, não a revoga.","Direito <b>penitenciário</b> é concorrente; direito <b>penal</b> é privativo."]},
{ id:"intervencao", titulo:"Intervenção federal e estadual", curto:"Intervenção",
  rapido:["Regra: <b>não intervenção</b>. A União só intervém nos <b>Estados e no DF</b> (e nos Municípios de Territórios); nos Municípios, intervém o <b>Estado</b> (art. 35).",
    "<b>Espontânea</b> (o Presidente age de ofício): integridade nacional, invasão, grave comprometimento da ordem pública, reorganizar finanças.",
    "<b>Provocada</b>: livre exercício dos Poderes (solicitação do Poder coacto, ou requisição do STF se for o Judiciário); ordem ou decisão judicial (requisição do STF, STJ ou TSE); <b>princípios sensíveis</b> e execução de lei federal (provimento do STF a <b>representação do PGR</b>).",
    "Decreto do Presidente, ouvidos os Conselhos da República e de Defesa (opinativos), com apreciação pelo <b>Congresso em 24 horas</b> — dispensada nos casos do art. 34, VI e VII, quando o decreto se limitar a suspender o ato impugnado."],
  teoria:[
    { h:"Princípios sensíveis (art. 34, VII)", p:[
      "Forma republicana, sistema representativo e regime democrático; direitos da pessoa humana; autonomia municipal; prestação de contas da administração; aplicação do mínimo em ensino e saúde.",
      "Sua violação permite a <b>ADI interventiva</b>, proposta só pelo <b>PGR</b> perante o STF.",
      "Durante a intervenção federal não se pode emendar a CF (limitação circunstancial, art. 60, §1º). Ex.: intervenção na segurança pública do RJ (2018) e no DF (2023)."]}],
  pegadinhas:["União não intervém diretamente em Município de Estado.","Conselhos da República e de Defesa: parecer <b>não vinculante</b>.","ADI interventiva: legitimado exclusivo = PGR."]}
],
lei:[
{ art:"CF, art. 18", nome:"Entes e criação", sec:"entes", itens:[
  { id:"cf18", rot:"Art. 18, caput e §§3º e 4º", t:"A organização político-administrativa da República Federativa do Brasil compreende a União, os Estados, o Distrito Federal e os Municípios, <b class='g1'>todos autônomos</b>, nos termos desta Constituição.<br>(...)<br>§ 3º Os Estados podem incorporar-se entre si, subdividir-se ou desmembrar-se para se anexarem a outros, ou formarem novos Estados ou Territórios Federais, mediante aprovação da população diretamente interessada, através de <b class='g1'>plebiscito</b>, e do Congresso Nacional, por <b class='g1'>lei complementar</b>.<br>§ 4º A criação, a incorporação, a fusão e o desmembramento de Municípios, far-se-ão por <b class='g1'>lei estadual</b>, dentro do período determinado por <b class='g1'>Lei Complementar Federal</b>, e dependerão de <b class='g1'>consulta prévia, mediante plebiscito</b>, às populações dos Municípios envolvidos, após divulgação dos <b class='g1'>Estudos de Viabilidade Municipal</b>, apresentados e publicados na forma da lei.", c:["oe1","oe2"] }]},
{ art:"CF, arts. 22 e 24", nome:"Competências legislativas", sec:"competencias", itens:[
  { id:"cf22", rot:"Art. 22, I e XXI, e parágrafo único", t:"Compete <b class='g1'>privativamente à União</b> legislar sobre:<br>I - direito <b class='g1'>civil, comercial, penal, processual, eleitoral, agrário, marítimo, aeronáutico, espacial e do trabalho</b>;<br>(...)<br>XXI - normas gerais de organização, efetivos, material bélico, garantias, convocação, mobilização, inatividades e pensões das <b class='g1'>polícias militares e dos corpos de bombeiros militares</b>;<br>(...)<br>Parágrafo único. <b class='g3'>Lei complementar poderá autorizar os Estados</b> a legislar sobre questões específicas das matérias relacionadas neste artigo.", c:["oe3","oe4"], j:["stf-sv46","stf-sv39"] },
  { id:"cf24", rot:"Art. 24, I e XVI, e §§1º a 4º", t:"Compete à União, aos Estados e ao Distrito Federal legislar <b class='g1'>concorrentemente</b> sobre:<br>I - direito <b class='g1'>tributário, financeiro, penitenciário, econômico e urbanístico</b>;<br>(...)<br>XVI - <b class='g1'>organização, garantias, direitos e deveres das polícias civis</b>.<br>§ 1º No âmbito da legislação concorrente, a competência da União limitar-se-á a estabelecer <b class='g1'>normas gerais</b>.<br>§ 2º A competência da União para legislar sobre normas gerais não exclui a competência <b class='g1'>suplementar</b> dos Estados.<br>§ 3º Inexistindo lei federal sobre normas gerais, os Estados exercerão a competência legislativa <b class='g1'>plena</b>, para atender a suas peculiaridades.<br>§ 4º A superveniência de lei federal sobre normas gerais <b class='g3'>suspende a eficácia</b> da lei estadual, no que lhe for contrário.", nota:"Com base no inciso XVI, a União editou a Lei 14.735/2023 (Lei Orgânica Nacional das Polícias Civis).", c:["oe5","oe6","oe7"] },
  { id:"cf30", rot:"Art. 30, I e II", t:"Compete aos Municípios:<br>I - legislar sobre assuntos de <b class='g1'>interesse local</b>;<br>II - <b class='g1'>suplementar</b> a legislação federal e a estadual no que couber;", c:["oe8"], j:["stf-sv38"] }]},
{ art:"CF, arts. 34 e 36", nome:"Intervenção federal", sec:"intervencao", itens:[
  { id:"cf34", rot:"Art. 34", t:"A União <b class='g3'>não intervirá</b> nos Estados nem no Distrito Federal, exceto para:<br>I - manter a integridade nacional;<br>II - repelir invasão estrangeira ou de uma unidade da Federação em outra;<br>III - pôr termo a <b class='g1'>grave comprometimento da ordem pública</b>;<br>IV - garantir o livre exercício de qualquer dos Poderes nas unidades da Federação;<br>V - reorganizar as finanças da unidade da Federação que: a) suspender o pagamento da dívida fundada por <b class='g2'>mais de dois anos consecutivos</b>, salvo motivo de força maior; b) deixar de entregar aos Municípios receitas tributárias fixadas nesta Constituição, dentro dos prazos estabelecidos em lei;<br>VI - prover a execução de lei federal, ordem ou decisão judicial;<br>VII - assegurar a observância dos seguintes <b class='g1'>princípios constitucionais</b>: a) forma republicana, sistema representativo e regime democrático; b) direitos da pessoa humana; c) autonomia municipal; d) prestação de contas da administração pública, direta e indireta; e) aplicação do mínimo exigido da receita resultante de impostos estaduais, compreendida a proveniente de transferências, na manutenção e desenvolvimento do ensino e nas ações e serviços públicos de saúde.", c:["oe9","oe10"] },
  { id:"cf36", rot:"Art. 36, §§1º e 3º", t:"§ 1º O decreto de intervenção, que especificará a amplitude, o prazo e as condições de execução e que, se couber, nomeará o interventor, será submetido à apreciação do Congresso Nacional ou da Assembléia Legislativa do Estado, no prazo de <b class='g2'>vinte e quatro horas</b>.<br>(...)<br>§ 3º Nos casos do art. 34, VI e VII, ou do art. 35, IV, <b class='g3'>dispensada a apreciação</b> pelo Congresso Nacional ou pela Assembléia Legislativa, o decreto limitar-se-á a suspender a execução do ato impugnado, se essa medida bastar ao restabelecimento da normalidade.", c:["oe11"] }]}
],
juris:[
{ id:"stf-sv39", trib:"STF", tipo:"Súmula Vinculante", num:"SV 39", sec:"competencias", status:"vigente", data:"11/03/2015",
  titulo:"Vencimentos das polícias do DF",
  texto:"Compete privativamente à União legislar sobre vencimentos dos membros das polícias civil e militar e do corpo de bombeiros militar do Distrito Federal.",
  explica:"Decorre do art. 21, XIV: a União organiza e mantém essas corporações.", lei:["cf22"], fonte:STFSV },
{ id:"stf-sv46", trib:"STF", tipo:"Súmula Vinculante", num:"SV 46", sec:"competencias", status:"vigente", data:"09/04/2015",
  titulo:"Crimes de responsabilidade: competência da União",
  texto:"A definição dos crimes de responsabilidade e o estabelecimento das respectivas normas de processo e julgamento são da competência legislativa privativa da União.",
  explica:"Constituição estadual não pode criar crime de responsabilidade nem mudar o rito da Lei 1.079/1950.", lei:["cf22"], fonte:STFSV },
{ id:"stf-sv38", trib:"STF", tipo:"Súmula Vinculante", num:"SV 38", sec:"competencias", status:"vigente", data:"11/03/2015",
  titulo:"Horário do comércio é do Município",
  texto:"É competente o Município para fixar o horário de funcionamento de estabelecimento comercial.",
  explica:"Interesse local (art. 30, I). Atenção: horário de <b>bancos</b> é matéria da União (Súmula 19/STJ).", lei:["cf30"], fonte:STFSV },
{ id:"stf-adi6341", trib:"STF", tipo:"ADI", num:"ADI 6.341", sec:"competencias", status:"vigente", data:"15/04/2020",
  titulo:"Competência comum em saúde na pandemia",
  texto:"As medidas federais de enfrentamento da Covid-19 não afastam a competência concorrente nem a tomada de providências normativas e administrativas pelos Estados, pelo DF e pelos Municípios.",
  explica:"Federalismo cooperativo: a competência comum do art. 23, II, não é hierarquizada.", lei:["cf24"], fonte:STFJ }
],
cards:[
{ id:"oe1", tipo:"caso", sec:"entes", f:"Território federal é ente federativo?", v:"<b>Não.</b> Integra a União (autarquia territorial).", lei:["cf18"] },
{ id:"oe2", tipo:"distincao", sec:"entes", f:"Criação de Estado × de Município.", v:"<b>Estado</b>: plebiscito + <b>LC federal</b>. <b>Município</b>: <b>lei estadual</b> + período por LC federal + estudos de viabilidade + plebiscito.", lei:["cf18"] },
{ id:"oe3", tipo:"caso", sec:"competencias", f:"Lei estadual cria novo tipo penal. Constitucional?", v:"<b>Não</b> — direito penal é privativo da União (art. 22, I), salvo LC delegando questão específica.", lei:["cf22"] },
{ id:"oe4", tipo:"caso", sec:"competencias", f:"Constituição estadual define crimes de responsabilidade do governador. Válido?", v:"<b>Não</b> — SV 46: competência privativa da União.", lei:["cf22"], j:["stf-sv46"] },
{ id:"oe5", tipo:"caso", sec:"competencias", f:"A Bahia pode legislar sobre direitos e deveres dos seus policiais civis?", v:"<b>Sim</b>, de forma <b>suplementar</b> às normas gerais da União (art. 24, XVI; Lei 14.735/2023).", lei:["cf24"] },
{ id:"oe6", tipo:"caso", sec:"competencias", f:"Sem lei federal de normas gerais, Estado edita lei completa sobre a matéria concorrente. Depois sobrevém lei federal contrária. O que acontece com a estadual?", v:"Fica com a <b>eficácia suspensa</b> no que for contrária (não é revogada).", lei:["cf24"] },
{ id:"oe7", tipo:"distincao", sec:"competencias", f:"Direito penal × penitenciário: que competência?", v:"<b>Penal</b>: privativa da União (art. 22, I). <b>Penitenciário</b>: concorrente (art. 24, I).", lei:["cf24"] },
{ id:"oe8", tipo:"caso", sec:"competencias", f:"Lei municipal fixa horário de funcionamento de farmácias. E de agências bancárias?", v:"Farmácias: <b>válida</b> (SV 38). Bancos: competência da <b>União</b>.", lei:["cf30"], j:["stf-sv38"] },
{ id:"oe9", tipo:"distincao", sec:"intervencao", f:"Intervenção espontânea × provocada (exemplos).", v:"<b>Espontânea</b>: grave comprometimento da ordem pública, invasão. <b>Provocada</b>: coação a Poder estadual; descumprimento de ordem judicial; violação de princípio sensível (representação do PGR).", lei:["cf34"] },
{ id:"oe10", tipo:"caso", sec:"intervencao", f:"Estado deixa de aplicar o mínimo constitucional em saúde. Como pode haver intervenção?", v:"Violação de <b>princípio sensível</b> (art. 34, VII, e): <b>ADI interventiva</b> do PGR, provida pelo STF.", lei:["cf34"] },
{ id:"oe11", tipo:"numero", sec:"intervencao", f:"Prazo para o Congresso apreciar o decreto de intervenção.", v:"<b>24 horas</b> — dispensado nos casos do art. 34, VI e VII, se o decreto só suspender o ato.", lei:["cf36"] }
],
importancia:{ nivel:5,
  texto:"A repartição de competências é cobrada em todas as provas, e a segurança pública (arts. 22, XXI e 24, XVI) é ponto certo para carreiras policiais. A intervenção aparece como pegadinha de quem pode intervir onde.",
  decore:[
    ["Entes federativos","União, Estados, DF e Municípios, <b>todos autônomos</b>; Território não é ente"],
    ["Criação de Estado","<b>plebiscito</b> + <b>lei complementar</b> federal"],
    ["Criação de Município","<b>lei estadual</b>, período fixado por LC federal, estudos de viabilidade e plebiscito"],
    ["Competência privativa da União (art. 22)","legislativa, <b>delegável</b> aos Estados por <b>LC</b>, em questões específicas"],
    ["Competência concorrente (art. 24)","União: <b>normas gerais</b>; Estados: suplementar; sem lei federal, competência <b>plena</b>"],
    ["Lei federal superveniente","<b>suspende a eficácia</b> da estadual contrária, não a revoga"],
    ["Polícias militares e bombeiros","normas gerais: <b>privativa</b> da União (art. 22, XXI)"],
    ["Polícias civis","organização, garantias, direitos e deveres: <b>concorrente</b> (art. 24, XVI; Lei 14.735/2023)"],
    ["Prazo para o Congresso apreciar o decreto de intervenção","<b>24 horas</b>"],
    ["ADI interventiva","legitimado exclusivo: <b>PGR</b>"]],
  macetes:[
    ["21 e 22 são da União; 23 e 24 são de todos","Art. 21 exclusiva (administrativa, indelegável); 22 privativa (legislativa, delegável); 23 comum (administrativa); 24 concorrente (legislativa)."],
    ["Penal é privativo, penitenciário é concorrente","Quem esquece a diferença erra a questão: direito penal é do art. 22; direito penitenciário é do art. 24."],
    ["PM é da União, polícia civil é concorrente","Normas gerais das PMs e bombeiros: art. 22, XXI. Polícias civis: art. 24, XVI."],
    ["União só intervém em Estado; Estado intervém em Município","Em Município de Estado, quem intervém é o Estado (art. 35)."]] },
comparativo:{ titulo:"Competência privativa (art. 22) × concorrente (art. 24)", head:["Privativa da União (art. 22)","Concorrente (art. 24)"], rows:[
  ["<b>Natureza:</b> legislativa, só da União","<b>Natureza:</b> legislativa, de União, Estados e DF"],
  ["<b>Delegação:</b> LC pode autorizar os Estados a legislar sobre questões específicas","<b>Divisão:</b> a União edita normas gerais e os Estados suplementam"],
  ["<b>Falta de lei federal:</b> o Estado, em regra, não legisla, salvo delegação","<b>Falta de lei federal:</b> o Estado exerce competência plena para suas peculiaridades"],
  ["<b>Exemplos:</b> direito civil, penal, processual, eleitoral e do trabalho","<b>Exemplos:</b> direito tributário, financeiro, penitenciário, econômico e urbanístico"],
  ["<b>Polícias:</b> normas gerais das PMs e dos corpos de bombeiros militares (XXI)","<b>Polícias:</b> organização, garantias, direitos e deveres das polícias civis (XVI)"],
  ["<b>Conflito:</b> lei estadual sobre a matéria é inconstitucional, sem delegação","<b>Conflito:</b> lei federal superveniente de normas gerais suspende a eficácia da estadual contrária"]]},
prova:[
  { tipo:"ce", enun:"Os Territórios federais, quando existirem, são entes da Federação dotados de autonomia política.", gab:"Errado", com:"O Território integra a União e não é ente federativo. Os entes autônomos são União, Estados, DF e Municípios." },
  { tipo:"ce", enun:"A criação de Município far-se-á por lei estadual, dentro do período determinado por lei complementar federal, e depende de estudos de viabilidade e de plebiscito.", gab:"Certo", com:"Art. 18, § 4º." },
  { tipo:"ce", enun:"Lei estadual pode criar novo tipo penal, por se tratar de competência legislativa concorrente.", gab:"Errado", com:"Direito penal é matéria de competência privativa da União (art. 22, I). Só lei complementar poderia autorizar o Estado a legislar sobre questão específica." },
  { tipo:"ce", enun:"A superveniência de lei federal sobre normas gerais revoga a lei estadual anterior que lhe seja contrária.", gab:"Errado", com:"A lei federal suspende a eficácia da lei estadual no que lhe for contrário (art. 24, § 4º), sem revogá-la." },
  { tipo:"ce", enun:"A competência para legislar sobre a organização, as garantias, os direitos e os deveres das polícias civis é concorrente entre União, Estados e DF.", gab:"Certo", com:"Art. 24, XVI. É a base da Lei 14.735/2023." },
  { tipo:"caso", enun:"A União pode decretar intervenção diretamente em um Município localizado em Estado da Federação por violação do mínimo constitucional em saúde?", com:"Não. A União intervém nos Estados e no DF; nos Municípios situados em Estado, quem intervém é o Estado (art. 35). A União só atua contra o Estado que descumpre o mínimo em saúde, por violação de princípio sensível (art. 34, VII, e), mediante ADI interventiva do PGR." }],
resumo:[
  "União, Estados, DF e Municípios são entes <b>autônomos</b>; o Território integra a União e não é ente federativo.",
  "Novo Estado exige <b>plebiscito</b> e <b>lei complementar</b>; novo Município exige <b>lei estadual</b>, estudos de viabilidade e plebiscito.",
  "O art. 21 traz competências materiais exclusivas da União; o art. 22, legislativas privativas, delegáveis aos Estados por LC.",
  "O art. 23 é a competência material comum, e o art. 24, a legislativa concorrente: União faz normas gerais, Estados suplementam.",
  "Lei federal superveniente de normas gerais <b>suspende a eficácia</b> da lei estadual contrária.",
  "Normas gerais das PMs e dos bombeiros são <b>privativas</b> da União; as das polícias civis são <b>concorrentes</b>, com a Lei 14.735/2023.",
  "Os Municípios legislam sobre interesse local e suplementam a legislação federal e estadual no que couber.",
  "A intervenção federal é exceção; o decreto é apreciado pelo Congresso em <b>24 horas</b>, e a violação de princípio sensível exige ADI interventiva do PGR."],
checklist:[
  "Explicar a autonomia dos entes e por que o Território não é ente.",
  "Distinguir a criação de Estado da de Município.",
  "Classificar as competências dos arts. 21 a 24.",
  "Dizer o que é delegável e o que não é.",
  "Diferenciar direito penal (privativo) de penitenciário (concorrente).",
  "Explicar a suspensão da eficácia da lei estadual pela lei federal superveniente.",
  "Distinguir as competências sobre PMs e bombeiros e sobre polícias civis.",
  "Aplicar as SV 38, 39 e 46.",
  "Diferenciar intervenção espontânea e provocada e listar os princípios sensíveis.",
  "Dizer quem intervém em quem e quem aprecia o decreto."],
questoes:[]
};

/* ======================= ADMINISTRAÇÃO PÚBLICA ======================= */
T.adm_publica = {
meta:{ tema:"Administração pública na Constituição (arts. 37 a 43)", atualizado:AT,
  foco:"Princípios (LIMPE); acesso, concurso, validade e direito à nomeação; funções de confiança e cargos em comissão; nepotismo (SV 13); greve; remuneração, teto e parcelas indenizatórias (EC 135/2024); acumulação (EC 138/2025); improbidade e prescrição; responsabilidade objetiva (Temas 940 e 1.237); estabilidade e perda do cargo." },
secoes:[
{ id:"principios", titulo:"Princípios e acesso aos cargos", curto:"Princípios e concurso",
  rapido:["Princípios expressos (caput): <b>Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência</b> (LIMPE) — para a administração <b>direta e indireta de todos os Poderes e entes</b>.",
    "Cargos acessíveis a brasileiros que preencham requisitos de lei, e a <b>estrangeiros na forma da lei</b>. Investidura depende de <b>concurso de provas ou de provas e títulos</b>, ressalvados os cargos em comissão de livre nomeação e exoneração.",
    "Validade do concurso: <b>até 2 anos, prorrogável uma vez por igual período</b>. Aprovado tem prioridade sobre novos concursados durante o prazo improrrogável.",
    "Aprovado <b>dentro do número de vagas</b> tem <b>direito subjetivo à nomeação</b> (Tema 161); fora das vagas, só em situações como preterição arbitrária (Tema 784)."],
  teoria:[
    { h:"Requisitos de edital que o STF controla", p:[
      "Exame psicotécnico só se <b>previsto em lei</b> (SV 44), com critérios objetivos e recurso.",
      "Tatuagem não elimina candidato, salvo conteúdo que viole valores constitucionais (Tema 838).",
      "Limite de idade e altura só com previsão em lei e justificados pela natureza do cargo (Súmula 683/STF).",
      "Provimento derivado em cargo de outra carreira sem concurso (ascensão, transposição) é inconstitucional (SV 43)."]}],
  pegadinhas:["Validade: \"<b>até</b> 2 anos\" — pode ser menos; a prorrogação é por <b>igual</b> período.","Moralidade e impessoalidade levam à vedação do nepotismo independentemente de lei (SV 13)."]},
{ id:"servidores", titulo:"Funções, cargos em comissão, remuneração e acumulação", curto:"Servidores",
  rapido:["<b>Funções de confiança</b>: <b>exclusivamente</b> por servidores efetivos. <b>Cargos em comissão</b>: por servidores de carreira nos casos e percentuais mínimos de lei — ambos só para <b>direção, chefia e assessoramento</b>.",
    "Teto (XI): subsídio dos <b>Ministros do STF</b>; nos Estados, subtetos (Governador no Executivo; deputados estaduais no Legislativo; desembargadores do TJ — limitados a 90,25% do STF — no Judiciário, MP, Procuradoria e Defensoria). EC 135/2024: <b>parcelas indenizatórias</b> previstas em lei ordinária nacional <b>não</b> entram no teto (§11).",
    "Acumulação remunerada é vedada, exceto com <b>compatibilidade de horários</b> e respeito ao teto: <b>dois cargos de professor</b>; <b>um de professor com outro de qualquer natureza</b> (EC 138/2025); <b>dois de profissionais de saúde</b> com profissão regulamentada.",
    "Servidor em mandato eletivo (art. 38): federal/estadual/distrital → afasta-se; <b>prefeito</b> → afasta-se e opta pela remuneração; <b>vereador</b> → acumula se houver compatibilidade de horários."],
  teoria:[
    { h:"Nepotismo e remuneração", p:[
      "SV 13: nomeação de cônjuge, companheiro ou parente até o <b>3º grau</b>, inclusive, para cargo em comissão, de confiança ou função gratificada, viola a CF — inclusive o <b>nepotismo cruzado</b> (designações recíprocas). O STF tende a excluir os cargos <b>políticos</b> (secretários, ministros), salvo fraude ou falta de qualificação.",
      "Remuneração e subsídio só por <b>lei específica</b>, com <b>revisão geral anual</b> na mesma data e sem distinção de índices. O Judiciário não aumenta vencimentos por isonomia (SV 37).",
      "Vencimentos do Legislativo e do Judiciário não podem superar os do Executivo; é vedada a vinculação ou equiparação remuneratória."]},
    { h:"EC 138/2025 — o que mudou", p:[
      "Antes: professor + cargo <b>técnico ou científico</b>. Agora: professor + cargo <b>de qualquer natureza</b> (ex.: professor e agente de polícia, desde que haja compatibilidade de horários e respeitado o teto).",
      "Continua valendo o regime próprio de dedicação de cada carreira prevista em lei (ex.: dedicação exclusiva) — confira o estatuto do cargo."]}],
  pegadinhas:["Função de confiança: <b>só efetivos</b>. Cargo em comissão: pode ser ocupado por não efetivo (respeitado o percentual mínimo de carreira).","Teto não alcança parcelas indenizatórias previstas em lei (EC 135).","Vereador pode acumular; prefeito não."]},
{ id:"responsabilidade", titulo:"Improbidade, prescrição e responsabilidade do Estado", curto:"Responsabilidade",
  rapido:["Improbidade (§4º): <b>suspensão dos direitos políticos, perda da função pública, indisponibilidade dos bens e ressarcimento ao erário</b>, sem prejuízo da ação penal (\"SuPeR IN\").",
    "Prescrição (§5º): a lei fixa prazos para ilícitos que causem prejuízo ao erário, <b>ressalvadas as ações de ressarcimento</b> — imprescritível só o ressarcimento por <b>ato doloso de improbidade</b> (Tema 897).",
    "<b>Responsabilidade objetiva</b> (§6º): pessoas jurídicas de direito público e de direito privado <b>prestadoras de serviço público</b> respondem pelos danos que seus agentes, nessa qualidade, causarem a terceiros — teoria do <b>risco administrativo</b>; regresso contra o agente só com <b>dolo ou culpa</b>.",
    "A vítima processa o <b>Estado</b>, não o agente (dupla garantia — Tema 940)."],
  teoria:[
    { h:"Segurança pública e responsabilidade", p:[
      "Tema 1.237 (2024): o Estado responde civilmente por <b>morte ou ferimento decorrente de operações de segurança pública</b> (risco administrativo); cabe ao ente <b>provar</b> as excludentes; <b>perícia inconclusiva</b> sobre a origem do disparo <b>não</b> afasta, por si, a responsabilidade.",
      "Morte de detento: o Estado responde quando descumpre o dever de proteção (Tema 592).",
      "Danos por foragido: só há responsabilidade se houver <b>nexo causal direto</b> entre a fuga e o crime (Tema 362)."]},
    { h:"Estabilidade (art. 41)", p:[
      "Estável após <b>3 anos</b> de efetivo exercício, nomeado para cargo efetivo por concurso, com <b>avaliação especial de desempenho</b> por comissão.",
      "Perde o cargo: <b>sentença transitada em julgado</b>; <b>processo administrativo</b> com ampla defesa; <b>avaliação periódica de desempenho</b> (LC, ampla defesa); e excesso de despesa com pessoal (art. 169, §4º).",
      "Extinto o cargo ou declarada sua desnecessidade: o estável fica em <b>disponibilidade</b> com remuneração proporcional ao tempo de serviço."]}],
  pegadinhas:["Concessionária responde objetivamente também perante <b>não usuário</b> do serviço (RE 591.874).","Regresso exige dolo ou culpa do agente (responsabilidade subjetiva).","Estabilidade é no <b>serviço público</b>; vitaliciedade, no cargo."]}
],
lei:[
{ art:"CF, art. 37, caput e I a V", nome:"Princípios e acesso", sec:"principios", itens:[
  { id:"cf37c", rot:"Art. 37, caput, I a IV", t:"A administração pública direta e indireta de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios obedecerá aos princípios de <b class='g1'>legalidade, impessoalidade, moralidade, publicidade e eficiência</b> e, também, ao seguinte:<br>I - os cargos, empregos e funções públicas são acessíveis aos brasileiros que preencham os requisitos estabelecidos em lei, assim como aos <b class='g3'>estrangeiros, na forma da lei</b>;<br>II - a investidura em cargo ou emprego público depende de aprovação prévia em <b class='g1'>concurso público de provas ou de provas e títulos</b>, de acordo com a natureza e a complexidade do cargo ou emprego, na forma prevista em lei, <b class='g3'>ressalvadas as nomeações para cargo em comissão</b> declarado em lei de livre nomeação e exoneração;<br>III - o prazo de validade do concurso público será de <b class='g2'>até dois anos, prorrogável uma vez, por igual período</b>;<br>IV - durante o prazo improrrogável previsto no edital de convocação, aquele aprovado em concurso público de provas ou de provas e títulos será convocado com <b class='g1'>prioridade sobre novos concursados</b> para assumir cargo ou emprego, na carreira;", c:["ap1","ap2","ap3"], j:["stf-t161","stf-sv44","stf-sv43"] },
  { id:"cf37v", rot:"Art. 37, V", t:"as <b class='g1'>funções de confiança</b>, exercidas <b class='g1'>exclusivamente por servidores ocupantes de cargo efetivo</b>, e os <b class='g1'>cargos em comissão</b>, a serem preenchidos por servidores de carreira nos casos, condições e percentuais mínimos previstos em lei, destinam-se apenas às atribuições de <b class='g3'>direção, chefia e assessoramento</b>;", c:["ap4","ap5"], j:["stf-sv13"] }]},
{ art:"CF, art. 37, XI e XVI; §11", nome:"Teto e acumulação", sec:"servidores", itens:[
  { id:"cf37xvi", rot:"Art. 37, XVI", t:"é <b class='g3'>vedada a acumulação remunerada</b> de cargos públicos, exceto, quando houver <b class='g1'>compatibilidade de horários</b>, observado em qualquer caso o disposto no inciso XI:<br>a) a de <b class='g1'>dois cargos de professor</b>;<br>b) a de <b class='g1'>um cargo de professor com outro de qualquer natureza</b>;<br>c) a de <b class='g1'>dois cargos ou empregos privativos de profissionais de saúde</b>, com profissões regulamentadas;", nota:"Alínea b com redação da EC 138, de 19/12/2025 (antes: \"com outro técnico ou científico\").", novo:true, c:["ap6","ap7"] },
  { id:"cf37xi", rot:"Art. 37, XI e §11", t:"XI - a remuneração e o subsídio dos ocupantes de cargos, funções e empregos públicos (...) não poderão exceder o <b class='g1'>subsídio mensal, em espécie, dos Ministros do Supremo Tribunal Federal</b>, aplicando-se como limite, nos Municípios, o subsídio do <b class='g1'>Prefeito</b>, e nos Estados e no Distrito Federal, o subsídio mensal do <b class='g1'>Governador</b> no âmbito do Poder Executivo, o subsídio dos <b class='g1'>Deputados Estaduais e Distritais</b> no âmbito do Poder Legislativo e o subsídio dos <b class='g1'>Desembargadores do Tribunal de Justiça</b>, limitado a <b class='g2'>noventa inteiros e vinte e cinco centésimos por cento</b> do subsídio mensal, em espécie, dos Ministros do Supremo Tribunal Federal, no âmbito do Poder Judiciário, aplicável este limite aos membros do Ministério Público, aos Procuradores e aos Defensores Públicos;<br>§ 11. <b class='g3'>Não serão computadas</b>, para efeito dos limites remuneratórios de que trata o inciso XI do caput deste artigo, as <b class='g1'>parcelas de caráter indenizatório</b> expressamente previstas em lei ordinária, aprovada pelo Congresso Nacional, de caráter nacional, aplicada a todos os Poderes e órgãos constitucionalmente autônomos.", nota:"§11 com redação da EC 135/2024; até a lei nacional, o art. 3º da emenda exclui do teto as indenizatórias previstas na legislação vigente — confira.", novo:true, c:["ap8"] }]},
{ art:"CF, art. 37, §§4º a 6º", nome:"Improbidade, prescrição e responsabilidade", sec:"responsabilidade", itens:[
  { id:"cf37p4", rot:"Art. 37, §§4º e 5º", t:"§ 4º Os atos de improbidade administrativa importarão a <b class='g1'>suspensão dos direitos políticos, a perda da função pública, a indisponibilidade dos bens e o ressarcimento ao erário</b>, na forma e gradação previstas em lei, <b class='g3'>sem prejuízo da ação penal cabível</b>.<br>§ 5º A lei estabelecerá os prazos de prescrição para ilícitos praticados por qualquer agente, servidor ou não, que causem prejuízos ao erário, <b class='g3'>ressalvadas as respectivas ações de ressarcimento</b>.", c:["ap9"], j:["stf-t897"] },
  { id:"cf37p6", rot:"Art. 37, §6º", t:"As <b class='g1'>pessoas jurídicas de direito público</b> e as de <b class='g1'>direito privado prestadoras de serviços públicos</b> responderão pelos danos que seus agentes, <b class='g1'>nessa qualidade</b>, causarem a terceiros, assegurado o <b class='g1'>direito de regresso</b> contra o responsável nos casos de <b class='g3'>dolo ou culpa</b>.", c:["ap10","ap11","ap12"], j:["stf-t940","stf-t1237"] }]},
{ art:"CF, art. 41", nome:"Estabilidade", sec:"responsabilidade", itens:[
  { id:"cf41", rot:"Art. 41, caput e §§1º e 4º", t:"São estáveis após <b class='g2'>três anos</b> de efetivo exercício os servidores nomeados para cargo de provimento efetivo em virtude de concurso público.<br>§ 1º O servidor público estável só perderá o cargo: I - em virtude de <b class='g1'>sentença judicial transitada em julgado</b>; II - mediante <b class='g1'>processo administrativo</b> em que lhe seja assegurada ampla defesa; III - mediante procedimento de <b class='g1'>avaliação periódica de desempenho</b>, na forma de lei complementar, assegurada ampla defesa.<br>(...)<br>§ 4º Como condição para a aquisição da estabilidade, é obrigatória a <b class='g1'>avaliação especial de desempenho</b> por comissão instituída para essa finalidade.", c:["ap13"] }]}
],
juris:[
{ id:"stf-sv13", trib:"STF", tipo:"Súmula Vinculante", num:"SV 13", sec:"principios", status:"vigente", data:"21/08/2008",
  titulo:"Nepotismo",
  texto:"A nomeação de cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau, inclusive, da autoridade nomeante ou de servidor da mesma pessoa jurídica investido em cargo de direção, chefia ou assessoramento, para o exercício de cargo em comissão ou de confiança ou, ainda, de função gratificada na administração pública direta e indireta em qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios, compreendido o ajuste mediante designações recíprocas, viola a Constituição Federal.",
  explica:"Decorre direto do caput do art. 37 — não depende de lei. Cargos de natureza política costumam ficar fora, salvo fraude ou inaptidão evidente.", lei:["cf37v"], fonte:STFSV },
{ id:"stf-sv43", trib:"STF", tipo:"Súmula Vinculante", num:"SV 43", sec:"principios", status:"vigente", data:"08/04/2015",
  titulo:"Provimento sem concurso em outra carreira",
  texto:"É inconstitucional toda modalidade de provimento que propicie ao servidor investir-se, sem prévia aprovação em concurso público destinado ao seu provimento, em cargo que não integra a carreira na qual anteriormente investido.",
  explica:"Veda ascensão e transposição. Promoção <b>dentro</b> da mesma carreira é válida.", lei:["cf37c"], fonte:STFSV },
{ id:"stf-sv44", trib:"STF", tipo:"Súmula Vinculante", num:"SV 44", sec:"principios", status:"vigente", data:"08/04/2015",
  titulo:"Psicotécnico depende de lei",
  texto:"Só por lei se pode sujeitar a exame psicotécnico a habilitação de candidato a cargo público.",
  explica:"Além da lei, o exame precisa de critérios objetivos e possibilidade de recurso.", lei:["cf37c"], fonte:STFSV },
{ id:"stf-t161", trib:"STF", tipo:"Repercussão geral", num:"RE 598.099 (Tema 161)", sec:"principios", status:"vigente", data:"10/08/2011",
  titulo:"Direito à nomeação dentro das vagas",
  texto:"O candidato aprovado dentro do número de vagas previsto no edital tem direito subjetivo à nomeação, salvo situações excepcionais, supervenientes, imprevisíveis, graves e necessárias, devidamente motivadas.",
  explica:"A Administração escolhe o <b>momento</b> da nomeação dentro da validade, mas não pode deixar de nomear.", lei:["cf37c"], fonte:STFRG },
{ id:"stf-t897", trib:"STF", tipo:"Repercussão geral", num:"RE 852.475 (Tema 897)", sec:"responsabilidade", status:"vigente", data:"08/08/2018",
  titulo:"Ressarcimento imprescritível só por improbidade dolosa",
  texto:"São imprescritíveis as ações de ressarcimento ao erário fundadas na prática de ato doloso tipificado na Lei de Improbidade Administrativa.",
  explica:"Ressarcimento por ilícito civil comum ou culposo prescreve (Tema 666).", lei:["cf37p4"], fonte:STFRG },
{ id:"stf-t940", trib:"STF", tipo:"Repercussão geral", num:"RE 1.027.633 (Tema 940)", sec:"responsabilidade", status:"vigente", data:"14/08/2019",
  titulo:"Dupla garantia: a vítima aciona o Estado",
  texto:"A teor do disposto no art. 37, § 6º, da Constituição Federal, a ação por danos causados por agente público deve ser ajuizada contra o Estado ou a pessoa jurídica de direito privado prestadora de serviço público, sendo parte ilegítima para a ação o autor do ato, assegurado o direito de regresso contra o responsável nos casos de dolo ou culpa.",
  explica:"Protege a vítima (Estado solvente) e o agente (só responde em regresso).", lei:["cf37p6"], fonte:STFRG },
{ id:"stf-t1237", trib:"STF", tipo:"Repercussão geral", num:"ARE 1.385.315 (Tema 1.237)", sec:"responsabilidade", status:"vigente", data:"11/04/2024",
  titulo:"Responsabilidade por mortes e ferimentos em operações policiais",
  texto:"(i) O Estado é responsável, na esfera cível, por morte ou ferimento decorrente de operações de segurança pública, nos termos da Teoria do Risco Administrativo; (ii) É ônus probatório do ente federativo demonstrar eventuais excludentes de responsabilidade civil; (iii) A perícia inconclusiva sobre a origem de disparo fatal durante operações policiais e militares não é suficiente, por si só, para afastar a responsabilidade civil do Estado, por constituir elemento indiciário.",
  explica:"Tema diretamente ligado à atividade policial — muito provável em prova de PC.", lei:["cf37p6"], fonte:STFRG }
],
cards:[
{ id:"ap1", tipo:"lacuna", sec:"principios", f:"Princípios expressos do art. 37: legalidade, ______, moralidade, ______ e eficiência.", v:"<b>impessoalidade</b>; <b>publicidade</b>.", lei:["cf37c"] },
{ id:"ap2", tipo:"caso", sec:"principios", f:"Edital prevê validade de 1 ano. Pode ser prorrogado por 2 anos?", v:"<b>Não.</b> Prorroga-se <b>uma vez, por igual período</b> (1 ano).", lei:["cf37c"] },
{ id:"ap3", tipo:"caso", sec:"principios", f:"Candidato aprovado em 3º lugar para 5 vagas; o concurso expira sem nomeação e sem justificativa. Direito?", v:"<b>Direito subjetivo à nomeação</b> (Tema 161).", lei:["cf37c"], j:["stf-t161"] },
{ id:"ap4", tipo:"caso", sec:"servidores", f:"Prefeito nomeia o sobrinho da esposa (parente por afinidade de 3º grau) para cargo em comissão. Válido?", v:"<b>Não</b> — nepotismo (SV 13 alcança até o 3º grau, inclusive afins).", lei:["cf37v"], j:["stf-sv13"] },
{ id:"ap5", tipo:"distincao", sec:"servidores", f:"Função de confiança × cargo em comissão.", v:"<b>Função</b>: só servidores <b>efetivos</b>. <b>Cargo em comissão</b>: livre nomeação, respeitado o percentual mínimo de servidores de carreira. Ambos: direção, chefia e assessoramento.", lei:["cf37v"] },
{ id:"ap6", tipo:"caso", sec:"servidores", f:"Investigador de polícia quer acumular com cargo de professor da rede estadual, com horários compatíveis. Depois da EC 138/2025, a CF permite?", v:"<b>Sim, em tese</b>: professor + cargo <b>de qualquer natureza</b>, com compatibilidade de horários e respeito ao teto (observado o regime do estatuto).", lei:["cf37xvi"] },
{ id:"ap7", tipo:"ce", sec:"servidores", f:"Certo ou errado: é permitida a acumulação de dois cargos técnicos com compatibilidade de horários.", v:"<b>Errado.</b> Hipóteses: 2 de professor; professor + qualquer natureza; 2 de saúde regulamentados.", lei:["cf37xvi"] },
{ id:"ap8", tipo:"caso", sec:"servidores", f:"Diárias e ajuda de custo previstas em lei entram no teto?", v:"<b>Não</b> — parcelas <b>indenizatórias</b> ficam fora do teto (art. 37, §11, EC 135/2024).", lei:["cf37xi"] },
{ id:"ap9", tipo:"caso", sec:"responsabilidade", f:"Ação de ressarcimento por dano ao erário decorrente de acidente culposo com viatura. É imprescritível?", v:"<b>Não.</b> Só é imprescritível o ressarcimento por <b>ato doloso de improbidade</b> (Tema 897).", lei:["cf37p4"], j:["stf-t897"] },
{ id:"ap10", tipo:"caso", sec:"responsabilidade", f:"Vítima de abuso policial quer processar diretamente o policial. Pode?", v:"<b>Não</b> — deve acionar o <b>Estado</b> (Tema 940); este tem regresso contra o agente em caso de dolo ou culpa.", lei:["cf37p6"], j:["stf-t940"] },
{ id:"ap11", tipo:"caso", sec:"responsabilidade", f:"Morador é atingido por bala em operação policial; a perícia não conclui de que arma partiu o tiro. O Estado responde?", v:"<b>Sim</b> (Tema 1.237): risco administrativo; perícia inconclusiva não afasta a responsabilidade; o ônus das excludentes é do Estado.", lei:["cf37p6"], j:["stf-t1237"] },
{ id:"ap12", tipo:"caso", sec:"responsabilidade", f:"Ônibus de concessionária atropela pedestre que não era passageiro. Responsabilidade objetiva?", v:"<b>Sim</b> — alcança também o terceiro <b>não usuário</b> (RE 591.874).", lei:["cf37p6"] },
{ id:"ap13", tipo:"lacuna", sec:"responsabilidade", f:"Estável perde o cargo por: sentença ______; processo ______ com ampla defesa; avaliação ______ de desempenho (LC).", v:"<b>transitada em julgado</b>; <b>administrativo</b>; <b>periódica</b>.", lei:["cf41"] }
],
importancia:{ nivel:5,
  texto:"O art. 37 é o artigo mais cobrado da administração pública. Concurso, nepotismo, acumulação e responsabilidade civil do Estado (inclusive em operações policiais) aparecem em quase toda prova.",
  decore:[
    ["Princípios expressos (LIMPE)","<b>L</b>egalidade, <b>I</b>mpessoalidade, <b>M</b>oralidade, <b>P</b>ublicidade, <b>E</b>ficiência"],
    ["Validade do concurso","<b>até 2 anos</b>, prorrogável <b>uma vez</b> por igual período"],
    ["Aprovado dentro das vagas","<b>direito subjetivo à nomeação</b> (Tema 161)"],
    ["Nepotismo (SV 13)","cônjuge, companheiro ou parente até o <b>3º grau</b>, inclusive afins"],
    ["Função de confiança","<b>exclusivamente</b> servidores efetivos"],
    ["Teto remuneratório","subsídio dos <b>Ministros do STF</b>; parcelas indenizatórias de lei nacional ficam fora (EC 135/2024)"],
    ["Acumulação permitida","<b>2 de professor</b>; <b>professor + qualquer natureza</b> (EC 138/2025); <b>2 de saúde</b> regulamentados"],
    ["Improbidade (§ 4º)","suspensão dos direitos políticos, perda da função, indisponibilidade dos bens e ressarcimento"],
    ["Responsabilidade (§ 6º)","<b>objetiva</b> do Estado; regresso contra o agente com <b>dolo ou culpa</b>"],
    ["Estabilidade (art. 41)","<b>3 anos</b> de efetivo exercício + avaliação especial de desempenho"]],
  macetes:[
    ["LIMPE","Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência: os cinco princípios do caput."],
    ["SuPeR IN","<b>Su</b>spensão dos direitos políticos, <b>Pe</b>rda da função, indisponibilidade dos bens e ressarcimento: as sanções do § 4º."],
    ["Função é de efetivo, comissão é livre","Função de confiança é só para efetivo; o cargo em comissão pode ser de livre nomeação, respeitado o percentual mínimo de servidores de carreira."],
    ["Quem paga é o Estado, quem responde depois é o agente","A vítima processa o Estado; o agente só responde em regresso, se houve dolo ou culpa."]] },
comparativo:{ titulo:"Função de confiança × cargo em comissão", head:["Função de confiança","Cargo em comissão"], rows:[
  ["<b>Quem ocupa:</b> exclusivamente servidores ocupantes de cargo efetivo","<b>Quem ocupa:</b> servidores de carreira nos casos, condições e percentuais mínimos de lei, e também pessoas de fora"],
  ["<b>Investidura:</b> reservada a quem já é servidor efetivo","<b>Concurso:</b> ressalvado da exigência, é de livre nomeação e exoneração"],
  ["<b>Atribuições:</b> direção, chefia e assessoramento","<b>Atribuições:</b> direção, chefia e assessoramento"],
  ["<b>Nepotismo:</b> a SV 13 alcança a nomeação para função gratificada","<b>Nepotismo:</b> a SV 13 alcança a nomeação para cargo em comissão ou de confiança, inclusive por designações recíprocas"],
  ["<b>Pegadinha:</b> não se pode entregar função de confiança a quem não tem cargo efetivo","<b>Pegadinha:</b> cargos de natureza política (secretários, ministros) costumam ficar fora da SV 13, salvo fraude ou inaptidão evidente"]]},
prova:[
  { tipo:"ce", enun:"O prazo de validade do concurso público é de até dois anos, prorrogável uma vez, por igual período.", gab:"Certo", com:"Art. 37, III." },
  { tipo:"ce", enun:"As funções de confiança podem ser exercidas por pessoas sem vínculo efetivo com a administração, desde que haja livre nomeação.", gab:"Errado", com:"As funções de confiança são exercidas exclusivamente por servidores ocupantes de cargo efetivo (art. 37, V)." },
  { tipo:"ce", enun:"A vedação ao nepotismo, na forma da Súmula Vinculante 13, depende de lei formal que a discipline em cada ente federativo.", gab:"Errado", com:"A vedação decorre direta dos princípios do art. 37, caput, e independe de lei." },
  { tipo:"ce", enun:"O candidato aprovado dentro do número de vagas previsto no edital tem direito subjetivo à nomeação.", gab:"Certo", com:"Tema 161/STF, salvo situações excepcionais, supervenientes, imprevisíveis, graves e necessárias, devidamente motivadas." },
  { tipo:"ce", enun:"A vítima de dano causado por agente público no exercício da função pode ajuizar a ação de reparação diretamente contra o agente, que é parte legítima.", gab:"Errado", com:"Tema 940/STF: a ação deve ser proposta contra o Estado ou a prestadora de serviço público. O agente só responde em regresso, por dolo ou culpa." },
  { tipo:"caso", enun:"Em operação policial, morador é ferido por disparo de arma de fogo, e a perícia não consegue concluir de qual arma partiu o tiro. O Estado responde civilmente?", com:"Sim. O Tema 1.237/STF aplica a teoria do risco administrativo, cabe ao Estado provar as excludentes e a perícia inconclusiva não afasta, por si só, a responsabilidade." }],
resumo:[
  "O caput do art. 37 impõe a todos os Poderes e entes os princípios de <b>legalidade, impessoalidade, moralidade, publicidade e eficiência</b>.",
  "A investidura exige <b>concurso</b>, com validade de até 2 anos prorrogável uma vez; o aprovado dentro das vagas tem <b>direito à nomeação</b>.",
  "Exame psicotécnico depende de lei (SV 44) e o provimento em cargo de outra carreira sem concurso é inconstitucional (SV 43).",
  "Funções de confiança são só de efetivos; cargos em comissão respeitam o percentual mínimo de servidores de carreira; ambos são para direção, chefia e assessoramento.",
  "O teto é o subsídio dos Ministros do STF; as parcelas indenizatórias de lei nacional ficam fora (EC 135/2024).",
  "A acumulação remunerada é vedada, salvo as três hipóteses do inciso XVI, com compatibilidade de horários e respeito ao teto.",
  "Improbidade gera suspensão dos direitos políticos, perda da função, indisponibilidade e ressarcimento; o ressarcimento é imprescritível se o ato for doloso.",
  "A responsabilidade do Estado é <b>objetiva</b> (art. 37, § 6º); a vítima aciona o Estado, que tem regresso contra o agente em caso de dolo ou culpa."],
checklist:[
  "Recitar os cinco princípios do caput e dar exemplo de cada.",
  "Aplicar a validade do concurso e a prorrogação.",
  "Explicar o direito à nomeação dos aprovados dentro das vagas.",
  "Aplicar as SV 13, 43 e 44.",
  "Diferenciar função de confiança e cargo em comissão.",
  "Descrever o teto e os subtetos, e o que fica fora (EC 135/2024).",
  "Listar as acumulações permitidas e a mudança da EC 138/2025.",
  "Citar as sanções de improbidade e o alcance da imprescritibilidade do ressarcimento.",
  "Explicar a responsabilidade objetiva, o regresso e os Temas 940 e 1.237.",
  "Resumir estabilidade e hipóteses de perda do cargo."],
questoes:[]
};

/* ======================= PODER LEGISLATIVO ======================= */
T.legislativo = {
meta:{ tema:"Poder Legislativo (arts. 44 a 75)", atualizado:AT,
  foco:"Composição do Congresso, Câmara e Senado; competências exclusivas e privativas; imunidades material e formal, foro e sua extensão (STF, 2025); incompatibilidades e perda do mandato; CPIs; fiscalização e Tribunais de Contas (SV 3; EC 139/2026)." },
secoes:[
{ id:"estrutura", titulo:"Estrutura e competências", curto:"Estrutura",
  rapido:["Bicameralismo federativo: <b>Câmara</b> (representantes do povo, sistema <b>proporcional</b>, mandato de 4 anos, de <b>8 a 70</b> deputados por Estado; Território: 4) e <b>Senado</b> (representantes dos Estados e do DF, <b>majoritário</b>, <b>3 senadores</b> por ente, mandato de <b>8 anos</b>, renovação alternada de 1/3 e 2/3, 2 suplentes).",
    "Deliberações: <b>maioria dos votos, presente a maioria absoluta</b> dos membros, salvo disposição em contrário (art. 47).",
    "<b>Câmara</b> (art. 51): autorizar, por <b>2/3</b>, a instauração de processo contra o Presidente, o Vice e Ministros. <b>Senado</b> (art. 52): <b>processar e julgar</b> Presidente e Vice nos crimes de responsabilidade, Ministros do STF, membros do CNJ e do CNMP, PGR e AGU; aprovar autoridades; suspender lei declarada inconstitucional pelo STF em controle difuso (X).",
    "Congresso — competência exclusiva (art. 49) por <b>decreto legislativo</b>, sem sanção; matérias do art. 48 por lei, com sanção."],
  teoria:[
    { h:"Sessões", p:[
      "Sessão legislativa: <b>2 de fevereiro a 17 de julho</b> e <b>1º de agosto a 22 de dezembro</b> (art. 57).",
      "Sessão conjunta: inaugurar a sessão legislativa, elaborar o regimento comum, receber o compromisso do Presidente e do Vice, conhecer do veto e sobre ele deliberar.",
      "Convocação extraordinária não admite pagamento de parcela indenizatória."]}],
  pegadinhas:["Câmara <b>autoriza</b>; Senado <b>processa e julga</b> o Presidente por crime de responsabilidade.","Mandato de senador: 8 anos; legislatura: 4 anos."]},
{ id:"estatuto", titulo:"Imunidades, foro e perda do mandato", curto:"Imunidades",
  rapido:["<b>Imunidade material</b>: invioláveis, civil e penalmente, por <b>opiniões, palavras e votos</b> ligados ao mandato (dentro do Congresso, presume-se; fora, exige nexo com a função).",
    "<b>Imunidade formal (prisão)</b>: desde a <b>diplomação</b>, só podem ser presos em <b>flagrante de crime inafiançável</b>; autos à Casa em <b>24 h</b>, que resolve sobre a prisão por <b>maioria absoluta</b>.",
    "<b>Imunidade formal (processo)</b>: recebida denúncia por crime <b>após a diplomação</b>, o STF dá ciência à Casa, que, por iniciativa de partido e <b>maioria absoluta</b>, pode <b>sustar</b> a ação (prazo de 45 dias); a sustação suspende a prescrição.",
    "Foro no STF desde a diplomação (art. 53, §1º). STF (2018): só para crimes cometidos <b>no cargo e em razão dele</b>; STF (2025): o foro <b>subsiste após o afastamento</b> do cargo para esses crimes."],
  teoria:[
    { h:"Extensões e limites", p:[
      "Deputados estaduais têm as mesmas imunidades (art. 27, §1º); a Assembleia pode rever a prisão (ADIs 5.823, 5.824 e 5.825).",
      "<b>Vereadores</b>: só imunidade <b>material</b>, na <b>circunscrição do Município</b> (art. 29, VIII) — sem imunidade formal nem foro especial na CF.",
      "Imunidades subsistem no <b>estado de sítio</b>; só podem ser suspensas por <b>2/3</b> da Casa, para atos fora do recinto incompatíveis com a medida (art. 53, §8º).",
      "Parlamentar não é obrigado a testemunhar sobre informações recebidas em razão do mandato (§6º)."]},
    { h:"Perda do mandato (art. 55)", p:[
      "<b>Decidida pela Casa</b> (maioria absoluta): infringir incompatibilidades, quebra de decoro, condenação criminal transitada em julgado.",
      "<b>Declarada pela Mesa</b>: faltar a 1/3 das sessões ordinárias, perda ou suspensão dos direitos políticos, decretação pela Justiça Eleitoral.",
      "Renúncia após aberto processo que vise à perda do mandato fica <b>suspensa</b> até a decisão final (§4º)."]}],
  pegadinhas:["Prisão de parlamentar: só flagrante de crime <b>inafiançável</b> — e a Casa decide por maioria <b>absoluta</b> (voto aberto).","Sustação só para crime <b>posterior</b> à diplomação.","Vereador não tem imunidade formal."]},
{ id:"cpi", titulo:"CPIs e fiscalização", curto:"CPI e TCU",
  rapido:["CPI: requerimento de <b>1/3</b> dos membros, <b>fato determinado</b> e <b>prazo certo</b>; poderes de investigação <b>próprios das autoridades judiciais</b>; conclusões ao <b>MP</b>.",
    "Pode: quebrar sigilo <b>bancário, fiscal e de dados</b> (inclusive registros telefônicos), convocar testemunhas e investigados, requisitar documentos, determinar perícias — sempre fundamentadamente.",
    "Não pode (reserva de jurisdição): <b>interceptação telefônica</b>, <b>busca domiciliar</b>, <b>prisão</b> (salvo flagrante), medidas cautelares patrimoniais, nem proibir a saída do país. Investigado tem direito ao silêncio e a não comparecer (HC 174.326).",
    "Tribunais de Contas: <b>instituições permanentes, essenciais ao controle externo</b>; vedada sua <b>extinção, criação ou instalação</b> (EC 139/2026)."],
  teoria:[
    { h:"TCU", p:[
      "Auxilia o Congresso no controle externo: <b>aprecia</b> as contas do Presidente por <b>parecer prévio</b> em 60 dias (quem julga é o Congresso); <b>julga</b> as contas dos demais administradores.",
      "Composição: <b>9 ministros</b>. Decisões que imputem débito ou multa têm <b>eficácia de título executivo</b>.",
      "SV 3: contraditório nos processos do TCU quando puder resultar anulação de ato que beneficie o interessado, <b>exceto</b> na apreciação inicial de aposentadoria, reforma e pensão (prazo de 5 anos para o TCU apreciar — Tema 445).",
      "Municípios: continuam vedados novos Tribunais ou Conselhos de Contas municipais (art. 31, §4º); a EC 139 também impede extinguir os existentes."]}],
  pegadinhas:["CPI pode quebrar sigilo telefônico (registros), não interceptar.","TCU <b>aprecia</b> as contas do Presidente e <b>julga</b> as dos administradores.","CPI não julga nem pune: encaminha ao MP."]}
],
lei:[
{ art:"CF, arts. 45 a 47", nome:"Composição", sec:"estrutura", itens:[
  { id:"cf45", rot:"Arts. 45, 46 e 47", t:"Art. 45. A Câmara dos Deputados compõe-se de representantes do povo, eleitos, pelo <b class='g1'>sistema proporcional</b>, em cada Estado, em cada Território e no Distrito Federal. (...) § 1º (...) para que nenhuma daquelas unidades da Federação tenha <b class='g2'>menos de oito ou mais de setenta Deputados</b>. § 2º Cada Território elegerá <b class='g2'>quatro Deputados</b>.<br>Art. 46. O Senado Federal compõe-se de representantes dos Estados e do Distrito Federal, eleitos segundo o <b class='g1'>princípio majoritário</b>. § 1º Cada Estado e o Distrito Federal elegerão <b class='g2'>três Senadores</b>, com mandato de <b class='g2'>oito anos</b>. § 2º A representação de cada Estado e do Distrito Federal será renovada de quatro em quatro anos, alternadamente, por <b class='g2'>um e dois terços</b>. § 3º Cada Senador será eleito com <b class='g2'>dois suplentes</b>.<br>Art. 47. Salvo disposição constitucional em contrário, as deliberações de cada Casa e de suas Comissões serão tomadas por <b class='g1'>maioria dos votos, presente a maioria absoluta</b> de seus membros.", c:["lg1","lg2"] }]},
{ art:"CF, art. 53", nome:"Imunidades", sec:"estatuto", itens:[
  { id:"cf53", rot:"Art. 53, caput e §§1º a 5º", t:"Os Deputados e Senadores são <b class='g1'>invioláveis, civil e penalmente, por quaisquer de suas opiniões, palavras e votos</b>.<br>§ 1º Os Deputados e Senadores, <b class='g1'>desde a expedição do diploma</b>, serão submetidos a julgamento perante o <b class='g1'>Supremo Tribunal Federal</b>.<br>§ 2º Desde a expedição do diploma, os membros do Congresso Nacional <b class='g3'>não poderão ser presos, salvo em flagrante de crime inafiançável</b>. Nesse caso, os autos serão remetidos dentro de <b class='g2'>vinte e quatro horas</b> à Casa respectiva, para que, pelo voto da <b class='g1'>maioria de seus membros</b>, resolva sobre a prisão.<br>§ 3º Recebida a denúncia contra o Senador ou Deputado, por crime ocorrido <b class='g3'>após a diplomação</b>, o Supremo Tribunal Federal dará ciência à Casa respectiva, que, por iniciativa de partido político nela representado e pelo voto da maioria de seus membros, poderá, até a decisão final, <b class='g1'>sustar o andamento da ação</b>.<br>§ 4º O pedido de sustação será apreciado pela Casa respectiva no prazo improrrogável de <b class='g2'>quarenta e cinco dias</b> do seu recebimento pela Mesa Diretora.<br>§ 5º A sustação do processo <b class='g1'>suspende a prescrição</b>, enquanto durar o mandato.", c:["lg3","lg4","lg5"], j:["stf-foro2025"] },
  { id:"cf53p8", rot:"Art. 53, §§6º e 8º", t:"§ 6º Os Deputados e Senadores <b class='g1'>não serão obrigados a testemunhar</b> sobre informações recebidas ou prestadas em razão do exercício do mandato, nem sobre as pessoas que lhes confiaram ou deles receberam informações.<br>(...)<br>§ 8º As imunidades de Deputados ou Senadores <b class='g1'>subsistirão durante o estado de sítio</b>, só podendo ser suspensas mediante o voto de <b class='g2'>dois terços</b> dos membros da Casa respectiva, nos casos de atos praticados <b class='g3'>fora do recinto do Congresso Nacional</b>, que sejam incompatíveis com a execução da medida.", c:["lg6"] }]},
{ art:"CF, art. 58, §3º", nome:"CPI", sec:"cpi", itens:[
  { id:"cf58p3", rot:"Art. 58, §3º", t:"As comissões parlamentares de inquérito, que terão <b class='g1'>poderes de investigação próprios das autoridades judiciais</b>, além de outros previstos nos regimentos das respectivas Casas, serão criadas pela Câmara dos Deputados e pelo Senado Federal, em conjunto ou separadamente, mediante requerimento de <b class='g2'>um terço</b> de seus membros, para a apuração de <b class='g1'>fato determinado</b> e por <b class='g1'>prazo certo</b>, sendo suas conclusões, se for o caso, encaminhadas ao <b class='g1'>Ministério Público</b>, para que promova a responsabilidade civil ou criminal dos infratores.", c:["lg7","lg8"] }]},
{ art:"CF, arts. 71 e 75", nome:"Tribunais de Contas", sec:"cpi", itens:[
  { id:"cf75", rot:"Art. 71, I e II; art. 75", t:"Art. 71. O controle externo, a cargo do Congresso Nacional, será exercido com o auxílio do Tribunal de Contas da União, ao qual compete: I - <b class='g1'>apreciar</b> as contas prestadas anualmente pelo Presidente da República, mediante <b class='g1'>parecer prévio</b> que deverá ser elaborado em <b class='g2'>sessenta dias</b> a contar de seu recebimento; II - <b class='g1'>julgar</b> as contas dos administradores e demais responsáveis por dinheiros, bens e valores públicos (...).<br>Art. 75. Os Tribunais de Contas são <b class='g1'>instituições permanentes, essenciais ao exercício do controle externo</b>, e as normas estabelecidas nesta Seção aplicam-se, no que couber, à organização, composição e fiscalização dos Tribunais de Contas dos Estados e do Distrito Federal, bem como dos Tribunais e Conselhos de Contas dos Municípios, <b class='g3'>vedada sua extinção, criação ou instalação</b>.", nota:"Art. 75 com redação da EC 139, de 05/05/2026 (DOU 06/05/2026).", novo:true, c:["lg9","lg10"], j:["stf-sv3"] }]}
],
juris:[
{ id:"stf-foro2025", trib:"STF", tipo:"Precedente (Plenário)", num:"HC 232.627 e Inq 4.787", sec:"estatuto", status:"atencao", data:"03/2025",
  titulo:"Foro por prerrogativa subsiste após a saída do cargo",
  texto:"A prerrogativa de foro para julgamento de crimes praticados no cargo e em razão das funções subsiste mesmo após o afastamento do cargo, ainda que o inquérito ou a ação penal sejam iniciados depois de cessado seu exercício.",
  explica:"Mantém o critério da AP 937 (crime no cargo e em razão dele), mas acaba com o \"elevador processual\" na saída do mandato. Confira a redação final da tese.", lei:["cf53"], fonte:STFJ },
{ id:"stf-hc174326", trib:"STF", tipo:"Precedente", num:"HC 174.326", sec:"cpi", status:"vigente", data:"2019",
  titulo:"Investigado convocado por CPI",
  texto:"O investigado convocado por CPI tem o direito de não comparecer compulsoriamente e, comparecendo, de permanecer em silêncio e ser assistido por advogado.",
  explica:"Testemunha, ao contrário, é obrigada a comparecer e a dizer a verdade (com direito de não se autoincriminar).", lei:["cf58p3"], fonte:STFJ },
{ id:"stf-sv3", trib:"STF", tipo:"Súmula Vinculante", num:"SV 3", sec:"cpi", status:"vigente", data:"30/05/2007",
  titulo:"Contraditório perante o TCU",
  texto:"Nos processos perante o Tribunal de Contas da União asseguram-se o contraditório e a ampla defesa quando da decisão puder resultar anulação ou revogação de ato administrativo que beneficie o interessado, excetuada a apreciação da legalidade do ato de concessão inicial de aposentadoria, reforma e pensão.",
  explica:"A concessão inicial é ato complexo que só se aperfeiçoa com o registro; o TCU tem 5 anos para apreciá-la (Tema 445), após o que deve assegurar contraditório.", lei:["cf75"], fonte:STFSV }
],
cards:[
{ id:"lg1", tipo:"numero", sec:"estrutura", f:"Deputados por Estado (mín./máx.), por Território, senadores por Estado e mandato.", v:"Deputados: <b>8 a 70</b>; Território: <b>4</b>; Senadores: <b>3</b>, mandato de <b>8 anos</b>, 2 suplentes.", lei:["cf45"] },
{ id:"lg2", tipo:"distincao", sec:"estrutura", f:"Câmara × Senado no impeachment do Presidente.", v:"<b>Câmara</b>: autoriza por <b>2/3</b>. <b>Senado</b>: processa e julga (condenação por 2/3, presidido pelo Presidente do STF).", lei:["cf45"] },
{ id:"lg3", tipo:"caso", sec:"estatuto", f:"Deputado federal é flagrado cometendo furto simples (afiançável). Pode ser preso?", v:"<b>Não.</b> Só flagrante de crime <b>inafiançável</b>.", lei:["cf53"] },
{ id:"lg4", tipo:"caso", sec:"estatuto", f:"Senador é denunciado por crime cometido antes da diplomação. A Casa pode sustar a ação?", v:"<b>Não.</b> A sustação só vale para crimes <b>após a diplomação</b>.", lei:["cf53"] },
{ id:"lg5", tipo:"caso", sec:"estatuto", f:"Ex-deputado é investigado, após o fim do mandato, por corrupção praticada no cargo e em razão dele. Quem julga?", v:"O <b>STF</b>: o foro subsiste após o afastamento para crimes no cargo e em razão dele (entendimento de 2025).", lei:["cf53"], j:["stf-foro2025"] },
{ id:"lg6", tipo:"caso", sec:"estatuto", f:"Vereador ofende adversário em discurso na Câmara Municipal. Tem imunidade? E se for preso em flagrante por crime afiançável?", v:"Ofensa: imunidade <b>material</b> na circunscrição do Município. Prisão: vereador <b>não tem imunidade formal</b>.", lei:["cf53p8"] },
{ id:"lg7", tipo:"lacuna", sec:"cpi", f:"CPI: requerimento de ______ dos membros, fato ______ e prazo ______; conclusões ao ______.", v:"<b>1/3</b>; <b>determinado</b>; <b>certo</b>; <b>Ministério Público</b>.", lei:["cf58p3"] },
{ id:"lg8", tipo:"caso", sec:"cpi", f:"CPI determina busca e apreensão na casa do investigado. Válido?", v:"<b>Não</b> — reserva de jurisdição (inviolabilidade de domicílio).", lei:["cf58p3"], j:["stf-hc174326"] },
{ id:"lg9", tipo:"distincao", sec:"cpi", f:"Contas do Presidente × contas dos administradores.", v:"Presidente: TCU <b>aprecia</b> (parecer prévio em 60 dias); <b>Congresso julga</b>. Administradores: TCU <b>julga</b>.", lei:["cf75"] },
{ id:"lg10", tipo:"caso", sec:"cpi", f:"Assembleia Legislativa aprova emenda à Constituição estadual extinguindo o Tribunal de Contas dos Municípios. Válido após a EC 139/2026?", v:"<b>Não</b> — vedada a <b>extinção, criação ou instalação</b> de Tribunais de Contas (art. 75, EC 139).", lei:["cf75"] }
],
importancia:{ nivel:5,
  texto:"Imunidades parlamentares e CPI estão entre os temas mais recorrentes de Constitucional. A banca troca a Casa que autoriza pela que julga e confunde a imunidade formal com a material.",
  decore:[
    ["Câmara","sistema <b>proporcional</b>; mínimo 8 e máximo <b>70</b> deputados por Estado; Território: 4"],
    ["Senado","sistema <b>majoritário</b>; <b>3</b> senadores por Estado e pelo DF; mandato de <b>8 anos</b>; 2 suplentes"],
    ["Quórum geral (art. 47)","maioria dos votos, presente a <b>maioria absoluta</b>"],
    ["Impeachment do Presidente","Câmara <b>autoriza</b> por <b>2/3</b>; Senado <b>processa e julga</b>"],
    ["Imunidade material","opiniões, palavras e votos; civil e penal"],
    ["Prisão de parlamentar","só flagrante de crime <b>inafiançável</b>; autos à Casa em <b>24 h</b>"],
    ["Sustação da ação penal","crime após a diplomação; <b>45 dias</b>; suspende a prescrição"],
    ["Vereador","só imunidade <b>material</b>, na circunscrição do Município"],
    ["CPI","requerimento de <b>1/3</b>, fato determinado, prazo certo; conclusões ao MP"],
    ["Contas do Presidente","TCU emite <b>parecer prévio</b> em <b>60 dias</b>; o Congresso julga"]],
  macetes:[
    ["Câmara autoriza, Senado julga","No impeachment do Presidente, a Câmara dá a licença por 2/3; o Senado processa e julga."],
    ["Material protege palavra, formal protege pessoa","A imunidade material impede responsabilizar pelas opiniões; a formal trata de prisão e processo."],
    ["CPI quebra registro, não grampeia","Pode quebrar sigilo bancário, fiscal e de registros telefônicos; não pode interceptar nem fazer busca domiciliar."],
    ["Vereador só tem a boca protegida","Imunidade material no Município; nada de imunidade formal nem foro especial na CF."]] },
comparativo:{ titulo:"Imunidade material × imunidade formal", head:["Imunidade material (art. 53, caput)","Imunidade formal (art. 53, §§ 2º a 5º)"], rows:[
  ["<b>O que protege:</b> opiniões, palavras e votos; torna o parlamentar inviolável civil e penalmente","<b>O que protege:</b> contra a prisão e contra o processamento penal"],
  ["<b>Alcance:</b> dentro do Congresso, presume-se ligada ao mandato; fora, exige nexo com a função","<b>Alcance:</b> desde a diplomação"],
  ["<b>Prisão:</b> não se aplica","<b>Prisão:</b> só em flagrante de crime inafiançável, com autos à Casa em 24 horas e decisão por maioria absoluta"],
  ["<b>Processo:</b> a conduta coberta não é crime nem ilícito civil","<b>Processo:</b> sustação da ação pela Casa, em 45 dias, para crime após a diplomação; suspende a prescrição"],
  ["<b>Vereador:</b> tem, na circunscrição do Município","<b>Vereador:</b> não tem imunidade formal"]]},
prova:[
  { tipo:"ce", enun:"No processo por crime de responsabilidade do Presidente da República, a Câmara dos Deputados processa e julga e o Senado Federal autoriza a instauração.", gab:"Errado", com:"A Câmara autoriza por dois terços; o Senado processa e julga (arts. 51, I e 52, I)." },
  { tipo:"ce", enun:"Desde a diplomação, deputados e senadores só podem ser presos em flagrante de crime inafiançável.", gab:"Certo", com:"Art. 53, § 2º. Os autos são remetidos à Casa em 24 horas, que decide sobre a prisão pela maioria de seus membros." },
  { tipo:"ce", enun:"A Casa legislativa pode sustar o andamento de ação penal contra parlamentar por crime cometido antes da diplomação.", gab:"Errado", com:"A sustação só vale para crime ocorrido após a diplomação (art. 53, § 3º)." },
  { tipo:"ce", enun:"O vereador goza de imunidade formal, não podendo ser preso senão em flagrante de crime inafiançável.", gab:"Errado", com:"O vereador tem apenas imunidade material, na circunscrição do Município (art. 29, VIII)." },
  { tipo:"ce", enun:"A comissão parlamentar de inquérito pode determinar, por decisão fundamentada, a interceptação telefônica do investigado.", gab:"Errado", com:"Interceptação telefônica, busca domiciliar e prisão estão sob reserva de jurisdição. A CPI pode quebrar sigilos bancário, fiscal e de registros telefônicos." },
  { tipo:"caso", enun:"Quem julga as contas anuais do Presidente da República e qual a função do Tribunal de Contas da União nesse processo?", com:"O Congresso Nacional julga. O TCU apenas aprecia as contas, mediante parecer prévio elaborado em sessenta dias do recebimento (art. 71, I)." }],
resumo:[
  "A <b>Câmara</b> representa o povo pelo sistema proporcional; o <b>Senado</b> representa os Estados e o DF pelo majoritário, com 3 senadores por ente e mandato de 8 anos.",
  "As deliberações exigem maioria dos votos, presente a <b>maioria absoluta</b> dos membros.",
  "A Câmara autoriza, por 2/3, o processo contra o Presidente, o Vice e os Ministros; o Senado <b>processa e julga</b> os crimes de responsabilidade.",
  "A imunidade <b>material</b> protege opiniões, palavras e votos; a <b>formal</b> limita a prisão e permite a sustação do processo.",
  "A prisão de parlamentar só ocorre em flagrante de crime <b>inafiançável</b>, decidida pela Casa em 24 horas.",
  "O foro no STF vale para crimes no cargo e em razão dele, e subsiste após o afastamento (entendimento de 2025, a conferir).",
  "A perda do mandato é decidida pela Casa em alguns casos (decoro, incompatibilidade, condenação criminal) e declarada pela Mesa em outros (faltas, perda de direitos políticos).",
  "A CPI tem poderes de investigação de autoridade judicial, mas não pode interceptar telefone, fazer busca domiciliar nem prender, salvo flagrante."],
checklist:[
  "Dizer composição, sistema eleitoral e mandato da Câmara e do Senado.",
  "Diferenciar a atuação da Câmara e do Senado no impeachment.",
  "Explicar as imunidades material e formal e o que cada uma protege.",
  "Descrever o procedimento da prisão em flagrante de parlamentar.",
  "Explicar a sustação da ação penal e seus requisitos.",
  "Resumir o foro do parlamentar e a posição do STF em 2025.",
  "Distinguir perda do mandato decidida pela Casa e declarada pela Mesa.",
  "Listar o que a CPI pode e não pode fazer.",
  "Diferenciar a apreciação das contas do Presidente do julgamento das contas dos administradores.",
  "Explicar a SV 3 e a EC 139/2026 sobre os Tribunais de Contas."],
questoes:[]
};

/* ======================= PROCESSO LEGISLATIVO ======================= */
T.processo_legislativo = {
meta:{ tema:"Processo legislativo (arts. 59 a 69)", atualizado:AT,
  foco:"Espécies normativas; emendas constitucionais (iniciativa, quórum, limites); iniciativa reservada e popular; urgência constitucional; sanção, veto e promulgação; medidas provisórias (vedações, prazos, trancamento, reedição, jabutis); leis delegadas; lei complementar × ordinária." },
secoes:[
{ id:"emendas", titulo:"Espécies e emendas constitucionais", curto:"Emendas",
  rapido:["Espécies (art. 59): <b>emendas à Constituição, leis complementares, leis ordinárias, leis delegadas, medidas provisórias, decretos legislativos e resoluções</b>.",
    "PEC — iniciativa: <b>1/3</b> da Câmara ou do Senado; <b>Presidente da República</b>; <b>mais da metade das Assembleias</b>, cada uma por maioria relativa. <b>Não</b> há iniciativa popular federal.",
    "Aprovação: <b>cada Casa, 2 turnos, 3/5</b> dos votos; promulgação pelas <b>Mesas</b> da Câmara e do Senado — <b>sem sanção ou veto</b>.",
    "Limites <b>circunstanciais</b>: não se emenda na vigência de <b>intervenção federal, estado de defesa ou estado de sítio</b>. Matéria rejeitada ou prejudicada não pode ser reapresentada na <b>mesma sessão legislativa</b>."],
  teoria:[
    { h:"LC × lei ordinária", p:[
      "Lei complementar: <b>maioria absoluta</b> (art. 69) e matéria <b>expressamente</b> reservada pela CF. Lei ordinária: maioria simples, matéria residual.",
      "Não há hierarquia entre elas, mas campos próprios: LC que trata de matéria de lei ordinária pode ser alterada por lei ordinária (é materialmente ordinária)."]}],
  pegadinhas:["PEC não passa pelo Presidente (nem sanção, nem veto).","\"Mais da metade das Assembleias\" + maioria <b>relativa</b> em cada.","Rejeição de PEC: só na mesma <b>sessão legislativa</b> (não legislatura)."]},
{ id:"tramite", titulo:"Iniciativa, deliberação, sanção e veto", curto:"Trâmite",
  rapido:["Iniciativa <b>privativa do Presidente</b> (art. 61, §1º): efetivo das Forças Armadas; criação de cargos na administração direta e autárquica e sua remuneração; servidores da União e Territórios; criação e extinção de Ministérios; organização do MP e da DPU da União e normas gerais para os dos Estados; militares. Vício de iniciativa <b>não é sanado pela sanção</b>.",
    "Iniciativa popular: <b>1%</b> do eleitorado nacional, em pelo menos <b>5 Estados</b>, com no mínimo <b>0,3%</b> em cada.",
    "Urgência constitucional (art. 64): projeto do Presidente — <b>45 dias</b> em cada Casa, senão tranca a pauta; não corre no recesso nem se aplica a projeto de código.",
    "Sanção ou veto em <b>15 dias úteis</b>; silêncio = <b>sanção tácita</b>. Veto (inconstitucionalidade = jurídico; contrariedade ao interesse público = político) <b>total ou parcial</b> — parcial só de texto <b>integral</b> de artigo, parágrafo, inciso ou alínea. Apreciação em <b>sessão conjunta</b>, em 30 dias; derrubada por <b>maioria absoluta</b>."],
  teoria:[
    { h:"Promulgação e publicação", p:[
      "Sancionado ou derrubado o veto, o Presidente promulga em <b>48 h</b>; se não o fizer, o Presidente do Senado; se este não o fizer em igual prazo, o Vice-Presidente do Senado.",
      "Casa iniciadora × revisora: emenda da revisora volta à iniciadora; projeto rejeitado só pode ser reapresentado na mesma sessão legislativa por proposta da <b>maioria absoluta</b> de qualquer das Casas (art. 67)."]}],
  pegadinhas:["Veto parcial não pode atingir palavras ou expressões isoladas.","O veto é sempre <b>expresso e motivado</b>; não existe veto tácito.","Derrubada do veto: maioria <b>absoluta</b>, em sessão <b>conjunta</b>."]},
{ id:"mp", titulo:"Medidas provisórias e leis delegadas", curto:"MP",
  rapido:["Requisitos: <b>relevância e urgência</b>. Prazo: <b>60 dias, prorrogável uma vez por mais 60</b>; o prazo <b>não corre no recesso</b>. Após <b>45 dias</b>, entra em <b>regime de urgência</b> e tranca as deliberações da Casa em que estiver (só as matérias que podem ser objeto de MP).",
    "Vedadas: <b>nacionalidade, cidadania, direitos políticos, partidos e direito eleitoral; direito penal, processual penal e processual civil</b>; organização do Judiciário e do MP; orçamento (salvo créditos extraordinários); sequestro de poupança; matéria reservada a LC; matéria já aprovada pendente de sanção.",
    "MP rejeitada ou que perdeu eficácia por decurso de prazo <b>não pode ser reeditada na mesma sessão legislativa</b>. As relações jurídicas do período são reguladas por <b>decreto legislativo</b> (60 dias; sem ele, ficam conservadas).",
    "\"Jabuti\" (emenda sem pertinência temática na conversão) é inconstitucional (ADI 5.127). A comissão mista é <b>obrigatória</b> (ADI 4.029)."],
  teoria:[
    { h:"Leis delegadas", p:[
      "O Presidente solicita; o Congresso delega por <b>resolução</b>, que especifica conteúdo e termos. Se a resolução exigir apreciação, é votação única, <b>vedada emenda</b>.",
      "Não podem ser delegados: atos de competência exclusiva do Congresso, privativa de cada Casa, matéria de <b>LC</b>, organização do Judiciário e do MP, nacionalidade, cidadania, direitos individuais, políticos e eleitorais, e orçamentos.",
      "O Congresso pode sustar a lei delegada que exorbite a delegação (art. 49, V)."]},
    { h:"MP e direito penal", p:[
      "A vedação de MP sobre direito penal é expressa (EC 32/2001); o STF admitiu, antes e excepcionalmente, MP <b>benéfica</b> ao réu (RE 254.818) — em prova objetiva, prevalece a vedação literal."]}],
  pegadinhas:["Prazo da MP: 60 + 60, suspenso no recesso; trancamento começa no <b>45º</b> dia.","MP rejeitada: reedição vedada na mesma <b>sessão legislativa</b>.","Estados podem adotar MP se a Constituição estadual previr (simetria)."]}
],
lei:[
{ art:"CF, arts. 59 e 60", nome:"Espécies e emendas", sec:"emendas", itens:[
  { id:"cf60", rot:"Art. 60, I a III e §§1º a 3º e 5º", t:"A Constituição poderá ser emendada mediante proposta:<br>I - de <b class='g2'>um terço, no mínimo</b>, dos membros da Câmara dos Deputados ou do Senado Federal;<br>II - do <b class='g1'>Presidente da República</b>;<br>III - de <b class='g2'>mais da metade das Assembléias Legislativas</b> das unidades da Federação, manifestando-se, cada uma delas, pela <b class='g1'>maioria relativa</b> de seus membros.<br>§ 1º A Constituição <b class='g3'>não poderá ser emendada na vigência de intervenção federal, de estado de defesa ou de estado de sítio</b>.<br>§ 2º A proposta será discutida e votada em cada Casa do Congresso Nacional, em <b class='g2'>dois turnos</b>, considerando-se aprovada se obtiver, em ambos, <b class='g2'>três quintos</b> dos votos dos respectivos membros.<br>§ 3º A emenda à Constituição será <b class='g1'>promulgada pelas Mesas</b> da Câmara dos Deputados e do Senado Federal, com o respectivo número de ordem.<br>(...)<br>§ 5º A matéria constante de proposta de emenda rejeitada ou havida por prejudicada <b class='g3'>não pode ser objeto de nova proposta na mesma sessão legislativa</b>.", c:["pl1","pl2","pl3"] }]},
{ art:"CF, arts. 61, 64, 66 e 69", nome:"Iniciativa, urgência, sanção e veto", sec:"tramite", itens:[
  { id:"cf61p2", rot:"Art. 61, §2º", t:"A iniciativa popular pode ser exercida pela apresentação à Câmara dos Deputados de projeto de lei subscrito por, no mínimo, <b class='g2'>um por cento do eleitorado nacional</b>, distribuído pelo menos por <b class='g2'>cinco Estados</b>, com não menos de <b class='g2'>três décimos por cento</b> dos eleitores de cada um deles.", c:["pl4"] },
  { id:"cf66", rot:"Art. 66, §§1º a 4º", t:"§ 1º Se o Presidente da República considerar o projeto, no todo ou em parte, <b class='g1'>inconstitucional ou contrário ao interesse público</b>, vetá-lo-á total ou parcialmente, no prazo de <b class='g2'>quinze dias úteis</b>, contados da data do recebimento, e comunicará, dentro de quarenta e oito horas, ao Presidente do Senado Federal os motivos do veto.<br>§ 2º O veto parcial somente abrangerá <b class='g3'>texto integral de artigo, de parágrafo, de inciso ou de alínea</b>.<br>§ 3º Decorrido o prazo de quinze dias, o <b class='g1'>silêncio</b> do Presidente da República importará <b class='g1'>sanção</b>.<br>§ 4º O veto será apreciado em <b class='g1'>sessão conjunta</b>, dentro de <b class='g2'>trinta dias</b> a contar de seu recebimento, só podendo ser rejeitado pelo voto da <b class='g1'>maioria absoluta</b> dos Deputados e Senadores.", c:["pl5","pl6","pl7"] },
  { id:"cf69", rot:"Art. 69", t:"As leis complementares serão aprovadas por <b class='g1'>maioria absoluta</b>.", c:["pl8"] }]},
{ art:"CF, art. 62", nome:"Medidas provisórias", sec:"mp", itens:[
  { id:"cf62p1", rot:"Art. 62, caput e §1º", t:"Em caso de <b class='g1'>relevância e urgência</b>, o Presidente da República poderá adotar medidas provisórias, com força de lei, devendo submetê-las de imediato ao Congresso Nacional.<br>§ 1º É vedada a edição de medidas provisórias sobre matéria:<br>I - relativa a: a) <b class='g1'>nacionalidade, cidadania, direitos políticos, partidos políticos e direito eleitoral</b>; b) <b class='g1'>direito penal, processual penal e processual civil</b>; c) organização do Poder Judiciário e do Ministério Público, a carreira e a garantia de seus membros; d) planos plurianuais, diretrizes orçamentárias, orçamento e créditos adicionais e suplementares, ressalvado o previsto no art. 167, § 3º;<br>II - que vise a detenção ou seqüestro de bens, de poupança popular ou qualquer outro ativo financeiro;<br>III - reservada a lei complementar;<br>IV - já disciplinada em projeto de lei aprovado pelo Congresso Nacional e pendente de sanção ou veto do Presidente da República.", c:["pl9","pl10"] },
  { id:"cf62p3", rot:"Art. 62, §§3º, 4º, 6º e 10", t:"§ 3º As medidas provisórias (...) perderão eficácia, desde a edição, se não forem convertidas em lei no prazo de <b class='g2'>sessenta dias</b>, prorrogável, nos termos do § 7º, uma vez por igual período, devendo o Congresso Nacional disciplinar, por <b class='g1'>decreto legislativo</b>, as relações jurídicas delas decorrentes.<br>§ 4º O prazo a que se refere o § 3º contar-se-á da publicação da medida provisória, <b class='g3'>suspendendo-se durante os períodos de recesso</b> do Congresso Nacional.<br>(...)<br>§ 6º Se a medida provisória não for apreciada em até <b class='g2'>quarenta e cinco dias</b> contados de sua publicação, entrará em <b class='g1'>regime de urgência</b>, subseqüentemente, em cada uma das Casas do Congresso Nacional, ficando sobrestadas, até que se ultime a votação, todas as demais deliberações legislativas da Casa em que estiver tramitando.<br>(...)<br>§ 10. É vedada a <b class='g1'>reedição, na mesma sessão legislativa</b>, de medida provisória que tenha sido rejeitada ou que tenha perdido sua eficácia por decurso de prazo.", c:["pl11","pl12"], j:["stf-adi5127"] }]}
],
juris:[
{ id:"stf-adi5127", trib:"STF", tipo:"ADI", num:"ADI 5.127", sec:"mp", status:"vigente", data:"15/10/2015",
  titulo:"\"Jabutis\" na conversão de MP",
  texto:"É incompatível com a Constituição a apresentação de emendas sem relação de pertinência temática com a medida provisória submetida à apreciação do Congresso.",
  explica:"A decisão teve efeitos prospectivos (leis anteriores com jabutis foram preservadas).", lei:["cf62p3"], fonte:STFJ },
{ id:"stf-adi4029", trib:"STF", tipo:"ADI", num:"ADI 4.029", sec:"mp", status:"vigente", data:"08/03/2012",
  titulo:"Parecer da comissão mista é obrigatório",
  texto:"A emissão de parecer pela comissão mista de Deputados e Senadores (art. 62, §9º) é fase obrigatória do processo de conversão da MP, não podendo ser substituída por parecer de relator.",
  explica:"Também com efeitos prospectivos. O Judiciário pode controlar, excepcionalmente, os pressupostos de relevância e urgência.", lei:["cf62p3"], fonte:STFJ }
],
cards:[
{ id:"pl1", tipo:"lacuna", sec:"emendas", f:"Iniciativa de PEC: ______ da Câmara ou do Senado; Presidente; mais da ______ das Assembleias, cada uma por maioria ______.", v:"<b>1/3</b>; <b>metade</b>; <b>relativa</b>.", lei:["cf60"] },
{ id:"pl2", tipo:"caso", sec:"emendas", f:"Durante intervenção federal no RJ, o Congresso vota PEC. É possível?", v:"<b>Não</b> — limite circunstancial (art. 60, §1º).", lei:["cf60"] },
{ id:"pl3", tipo:"caso", sec:"emendas", f:"PEC aprovada pelo Congresso vai à sanção do Presidente?", v:"<b>Não.</b> É promulgada pelas <b>Mesas</b> da Câmara e do Senado.", lei:["cf60"] },
{ id:"pl4", tipo:"numero", sec:"tramite", f:"Iniciativa popular de lei federal: requisitos.", v:"<b>1%</b> do eleitorado nacional, em pelo menos <b>5 Estados</b>, com <b>0,3%</b> em cada; apresentado à <b>Câmara</b>.", lei:["cf61p2"] },
{ id:"pl5", tipo:"caso", sec:"tramite", f:"Presidente recebe o projeto e não se manifesta em 15 dias úteis. Efeito?", v:"<b>Sanção tácita</b> (art. 66, §3º).", lei:["cf66"] },
{ id:"pl6", tipo:"caso", sec:"tramite", f:"Presidente veta apenas a palavra \"não\" de um inciso. Válido?", v:"<b>Não.</b> Veto parcial só alcança texto <b>integral</b> de artigo, parágrafo, inciso ou alínea.", lei:["cf66"] },
{ id:"pl7", tipo:"numero", sec:"tramite", f:"Veto: onde, em quanto tempo e por qual quórum é derrubado?", v:"<b>Sessão conjunta</b>, em <b>30 dias</b>, por <b>maioria absoluta</b> de deputados e senadores.", lei:["cf66"] },
{ id:"pl8", tipo:"caso", sec:"tramite", f:"Lei de iniciativa parlamentar cria cargos no Poder Executivo federal e é sancionada pelo Presidente. A sanção cura o vício?", v:"<b>Não.</b> Vício de iniciativa privativa é insanável (a Súmula 5/STF está superada).", lei:["cf69"] },
{ id:"pl9", tipo:"caso", sec:"mp", f:"Presidente edita MP aumentando a pena do roubo. Constitucional?", v:"<b>Não</b> — vedada MP sobre <b>direito penal</b> (art. 62, §1º, I, b).", lei:["cf62p1"] },
{ id:"pl10", tipo:"caso", sec:"mp", f:"MP sobre matéria de lei complementar. Possível?", v:"<b>Não</b> (art. 62, §1º, III).", lei:["cf62p1"] },
{ id:"pl11", tipo:"numero", sec:"mp", f:"MP: vigência e trancamento de pauta.", v:"<b>60 + 60</b> dias (suspensos no recesso); regime de urgência e trancamento a partir do <b>45º dia</b>.", lei:["cf62p3"] },
{ id:"pl12", tipo:"caso", sec:"mp", f:"MP perde eficácia por decurso de prazo em maio. O Presidente pode reeditá-la em setembro do mesmo ano?", v:"<b>Não</b> — vedada a reedição na <b>mesma sessão legislativa</b>.", lei:["cf62p3"] }
],
importancia:{ nivel:5,
  texto:"Os números do processo legislativo (quóruns, prazos, medidas provisórias) são cobrados com troca de algarismos. Medida provisória e emenda constitucional rendem questão em quase toda prova.",
  decore:[
    ["Iniciativa de PEC","<b>1/3</b> de uma Casa; Presidente; <b>mais da metade</b> das Assembleias (maioria relativa em cada)"],
    ["Aprovação de PEC","cada Casa, <b>2 turnos</b>, <b>3/5</b>; promulgação pelas Mesas, sem sanção"],
    ["Lei complementar","<b>maioria absoluta</b> (art. 69)"],
    ["Iniciativa popular","<b>1%</b> do eleitorado, em <b>5</b> Estados, com <b>0,3%</b> em cada"],
    ["Urgência constitucional","<b>45 dias</b> em cada Casa, depois tranca a pauta"],
    ["Sanção ou veto","<b>15 dias úteis</b>; silêncio = sanção tácita"],
    ["Apreciação do veto","sessão conjunta, em <b>30 dias</b>; derrubada por <b>maioria absoluta</b>"],
    ["Medida provisória","<b>60 + 60 dias</b>, suspensa no recesso; regime de urgência no <b>45º dia</b>"],
    ["Reedição de MP","vedada na <b>mesma sessão legislativa</b> se rejeitada ou se perdeu eficácia"],
    ["MP não pode tratar de","nacionalidade, direitos políticos, <b>direito penal</b>, processual penal e processual civil"]],
  macetes:[
    ["PEC não passa pelo Presidente","Sem sanção nem veto: quem promulga são as Mesas da Câmara e do Senado."],
    ["60 + 60, trava no 45º","A MP vale 60 dias, prorrogável uma vez, mas já tranca a pauta a partir do 45º dia."],
    ["Veto não pega palavra solta","O veto parcial só alcança texto integral de artigo, parágrafo, inciso ou alínea."],
    ["Penal e processual: nem pensar em MP","A vedação inclui direito penal, processual penal e processual civil."]] },
comparativo:{ titulo:"Emenda constitucional × medida provisória", head:["Emenda à Constituição","Medida provisória"], rows:[
  ["<b>Quem propõe:</b> 1/3 de uma Casa, o Presidente ou mais da metade das Assembleias","<b>Quem edita:</b> o Presidente da República, em caso de relevância e urgência"],
  ["<b>Entrada em vigor:</b> depois de aprovada em cada Casa, em 2 turnos, por 3/5","<b>Entrada em vigor:</b> imediata, com força de lei, e o Congresso a aprecia depois"],
  ["<b>Participação do Presidente:</b> nenhuma; é promulgada pelas Mesas","<b>Participação do Presidente:</b> é ele quem a edita, sem sanção posterior"],
  ["<b>Prazo:</b> sem prazo de eficácia; limites circunstanciais (intervenção, estado de defesa e de sítio)","<b>Prazo:</b> 60 dias, prorrogável uma vez por igual período; perde eficácia se não convertida"],
  ["<b>Limite de matéria:</b> as cláusulas pétreas","<b>Limite de matéria:</b> as vedações do art. 62, § 1º (penal, processual, nacionalidade, matéria de LC etc.)"],
  ["<b>Reapresentação:</b> proposta rejeitada ou prejudicada só volta na sessão legislativa seguinte","<b>Reapresentação:</b> MP rejeitada ou sem eficácia por decurso de prazo só pode ser reeditada em outra sessão legislativa"]]},
prova:[
  { tipo:"ce", enun:"A proposta de emenda à Constituição aprovada pelo Congresso Nacional é submetida à sanção ou ao veto do Presidente da República.", gab:"Errado", com:"A emenda é promulgada pelas Mesas da Câmara e do Senado, sem sanção nem veto (art. 60, § 3º)." },
  { tipo:"ce", enun:"A medida provisória tem prazo de sessenta dias, prorrogável uma única vez por igual período, suspendendo-se a contagem durante o recesso do Congresso Nacional.", gab:"Certo", com:"Art. 62, §§ 3º e 4º." },
  { tipo:"ce", enun:"É possível a edição de medida provisória em matéria de direito penal, desde que haja urgência.", gab:"Errado", com:"É vedada a edição de MP sobre direito penal, processual penal e processual civil (art. 62, § 1º, I, b)." },
  { tipo:"ce", enun:"O veto parcial pode alcançar palavras ou expressões isoladas de um dispositivo.", gab:"Errado", com:"O veto parcial somente abrange o texto integral de artigo, parágrafo, inciso ou alínea (art. 66, § 2º)." },
  { tipo:"ce", enun:"Decorrido o prazo de quinze dias úteis sem manifestação do Presidente da República, o projeto de lei considera-se sancionado.", gab:"Certo", com:"O silêncio importa sanção tácita (art. 66, § 3º)." },
  { tipo:"caso", enun:"Uma medida provisória perde a eficácia por decurso de prazo em maio. Em setembro do mesmo ano, o Presidente edita outra, com idêntico conteúdo. O ato é válido?", com:"Não. É vedada a reedição, na mesma sessão legislativa, de MP rejeitada ou que perdeu eficácia por decurso de prazo (art. 62, § 10)." }],
resumo:[
  "As espécies do art. 59 são emendas, leis complementares, ordinárias, delegadas, medidas provisórias, decretos legislativos e resoluções.",
  "A PEC pode ser proposta por <b>1/3</b> de uma Casa, pelo Presidente ou por mais da metade das Assembleias; não há iniciativa popular federal.",
  "A PEC exige <b>3/5 em cada Casa, em dois turnos</b>, e é promulgada pelas Mesas; não se emenda a CF na vigência de intervenção, estado de defesa ou estado de sítio.",
  "A lei complementar exige <b>maioria absoluta</b> e matéria reservada pela CF.",
  "O projeto é sancionado ou vetado em <b>15 dias úteis</b>; o silêncio é sanção tácita, e o veto é derrubado por <b>maioria absoluta</b> em sessão conjunta.",
  "A MP vale <b>60 dias, prorrogáveis por mais 60</b>; tranca a pauta a partir do 45º dia; não corre no recesso.",
  "A MP não pode tratar de direito penal, processual, nacionalidade, direitos políticos, organização do Judiciário e do MP, orçamento e matéria de LC.",
  "A MP rejeitada ou perdida não pode ser reeditada na mesma sessão legislativa; o Congresso regula as relações do período por decreto legislativo."],
checklist:[
  "Listar as espécies normativas do art. 59.",
  "Dizer quem tem iniciativa de PEC e como ela é aprovada e promulgada.",
  "Citar os limites circunstanciais ao poder de emenda.",
  "Distinguir lei complementar de lei ordinária quanto a quórum e matéria.",
  "Explicar iniciativa privativa do Presidente e por que a sanção não cura o vício.",
  "Descrever os requisitos da iniciativa popular.",
  "Aplicar os prazos da urgência, da sanção, do veto e da promulgação.",
  "Dominar prazo, trancamento e reedição da MP.",
  "Listar as vedações materiais à MP.",
  "Explicar as leis delegadas e o que não pode ser delegado."],
questoes:[]
};

})();
