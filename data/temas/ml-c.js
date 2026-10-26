/* Medicina Legal (III): sexologia forense; asfixiologia; psicopatologia forense (imputabilidade e capacidade civil).
   Conferido em 14/10/2026. Texto legal: CP (arts. 26 a 28, 97, 123, 128, 213, 217-A), CPP (arts. 149 a 152), CC (arts. 3º e 4º,
   redação da Lei 13.146/2015), Lei 12.845/2013. Base didática: material de estudo PC-BA (Medicina Legal, aulas 7, 8 e 9). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var CNJ = "https://atos.cnj.jus.br/";

/* ======================= SEXOLOGIA ======================= */
T.ml_sexologia = {
meta:{ tema:"Sexologia forense: crimes sexuais, gravidez, parto, aborto e infanticídio", atualizado:AT,
  foco:"Hímen (tipos, complacente, entalhe × rotura, carúnculas mirtiformes); prova da conjunção carnal e de atos libidinosos (esperma, PSA/P30, DNA); atendimento à vítima (Lei 12.845/2013); sinais de gravidez; parto recente e antigo; estado puerperal e docimásias (Galeno, Balthazard, Breslau, Wreden-Wendt-Gelé); aborto legal e criminoso; parafilias." },
secoes:[
{ id:"himen", titulo:"Hímen e prova da conjunção carnal", curto:"Hímen",
  rapido:["<b>Conjunção carnal</b> = introdução do pênis na vagina, completa ou não. Os demais atos sexuais são <b>atos libidinosos</b> — ambos configuram estupro (CP, art. 213).",
    "<b>Rotura</b> himenal: irregular, assimétrica, atinge ou chega perto da <b>borda de inserção</b>; recente = bordas avermelhadas, edemaciadas, sangrantes. <b>Entalhe</b>: congênito, simétrico, bordas lisas e regulares, <b>não atinge</b> a inserção.",
    "<b>Hímen complacente</b>: elástico ou de óstio amplo, permite a cópula <b>sem se romper</b> — hímen íntegro <b>não exclui</b> conjunção carnal.",
    "Prova laboratorial: <b>espermatozoides</b>; <b>PSA (P30)</b> e fosfatase ácida — úteis mesmo sem espermatozoides (vasectomizado, azoospérmico); <b>DNA</b> para autoria; gravidez e infecção sexualmente transmissível."],
  teoria:[
    { h:"Tipos de hímen", p:[
      "Formas mais citadas: <b>anular</b> (circular), <b>semilunar</b> (falciforme), <b>labiado</b>, <b>septado</b> (dois óstios), <b>cribriforme</b> (vários orifícios) e <b>imperfurado</b> (sem óstio — retém a menstruação).",
      "<b>Carúnculas mirtiformes</b>: restos do hímen após o <b>parto vaginal</b> — sinal de alta probabilidade de parto anterior, não de simples conjunção carnal."]},
    { h:"Atos libidinosos e ausência de vestígios", p:[
      "Coito anal: pregas desfeitas, fissuras, equimoses, perda de tônus do esfíncter (em atos recentes e violentos). Sexo oral e toques costumam <b>não deixar vestígios</b>.",
      "Lesões de violência (equimoses em coxas, punhos, pescoço; marcas de mordida) reforçam a prova, mas sua ausência não exclui o crime: a palavra da vítima tem especial relevância (ver jurisprudência).",
      "O exame deve ser feito o quanto antes: a sobrevivência de espermatozoides na cavidade vaginal é de poucos dias (em geral se fala em até cerca de 72 horas); coleta e guarda seguem a cadeia de custódia."]},
    { h:"Atendimento à vítima", p:[
      "Lei 12.845/2013: hospitais devem oferecer atendimento <b>emergencial, integral e multidisciplinar</b>; violência sexual é <b>qualquer forma de atividade sexual não consentida</b>.",
      "O atendimento inclui profilaxia da gravidez e de IST, amparo psicológico e <b>coleta de material</b> para exame (inclusive de DNA), com preservação para a perícia. Exame de corpo de delito tem <b>prioridade</b> em violência contra mulher, criança, adolescente, idoso e pessoa com deficiência (CPP, art. 158, parágrafo único)."]}],
  pegadinhas:["Hímen íntegro não exclui conjunção carnal (complacente).","Entalhe não é rotura: é anatômico, congênito.","Carúnculas mirtiformes indicam <b>parto</b>, não simples cópula.","PSA positivo sem espermatozoides é compatível com vasectomia."]},
{ id:"gravidez", titulo:"Gravidez, parto e puerpério", curto:"Gravidez e parto",
  rapido:["Sinais de <b>presunção</b>: amenorreia, náuseas, alterações mamárias, <b>sinal de Halban</b> (lanugem na face).",
    "Sinais de <b>probabilidade</b>: <b>Hegar</b> (amolecimento do istmo), <b>Piskacek</b> (assimetria uterina), <b>Jacquemier/Chadwick</b> (coloração violácea da vulva e vagina), <b>Osiander</b> (pulsação vaginal), <b>Puzos</b> (rechaço fetal), aumento do útero; testes hormonais.",
    "Sinais de <b>certeza</b>: batimentos cardíacos fetais, movimentos fetais percebidos pelo examinador, imagem do feto (ultrassonografia).",
    "Parto <b>recente</b>: lóquios, colostro, útero palpável acima da sínfise, lacerações. Parto <b>antigo</b>: carúnculas mirtiformes, estrias, linha nigra, cicatrizes."],
  teoria:[
    { h:"Puerpério e estado puerperal", p:[
      "<b>Puerpério</b>: período do parto até a volta do organismo ao estado anterior (cerca de 6 a 8 semanas).",
      "<b>Estado puerperal</b>: perturbação psíquica transitória ligada ao parto, que pode reduzir a capacidade de autodeterminação; é elemento do <b>infanticídio</b> (CP, art. 123), exigindo nexo entre essa influência e a conduta.",
      "Psicose puerperal grave pode levar à inimputabilidade (art. 26) — aí não se fala em infanticídio punível, mas em isenção de pena com medida de segurança."]}],
  pegadinhas:["Sinal de Halban é de <b>presunção</b>; Hegar e Jacquemier, de <b>probabilidade</b>.","Certeza = BCF, movimento fetal sentido pelo examinador, imagem do feto."]},
{ id:"infanticidio", titulo:"Infanticídio e docimásias", curto:"Docimásias",
  rapido:["A perícia do infanticídio precisa provar: que houve <b>parto</b>, que o filho <b>nasceu vivo</b> (ou estava vivo durante o parto), a <b>causa da morte</b> e o <b>estado puerperal</b>.",
    "<b>Docimásia hidrostática pulmonar de Galeno</b>: pulmões que respiraram <b>flutuam</b> na água (4 fases). Falso positivo: putrefação (gases); falso negativo: atelectasia, pneumonia.",
    "<b>Docimásia histológica de Balthazard</b>: alvéolos expandidos ao microscópio — a <b>mais fidedigna</b>, útil inclusive com putrefação inicial.",
    "Outras: <b>gastrintestinal de Breslau</b> (ar no tubo digestivo) e <b>auricular de Wreden-Wendt-Gelé</b> (ar no ouvido médio)."],
  teoria:[
    { h:"Feto nascente × recém-nascido", p:[
      "<b>Feto nascente</b>: o que está nascendo, ainda não respirou; tem <b>bossa serossanguínea</b> (tumor de parto) por vir em trabalho de parto ativo. Matá-lo <b>durante o parto</b> pela mãe sob estado puerperal é <b>infanticídio</b>, não aborto.",
      "<b>Recém-nascido</b>: já respirou, ainda com cordão, induto sebáceo (vérnix) e sinais do parto recente.",
      "Natimorto: morreu antes do parto — não há infanticídio (pode haver aborto, se provocado)."]}],
  pegadinhas:["Galeno positivo = <b>respirou</b> (flutua).","Balthazard é a mais segura das docimásias.","Matar o filho durante o parto, sob estado puerperal, é infanticídio — o \"durante\" está no tipo."]},
{ id:"aborto", titulo:"Aborto e parafilias", curto:"Aborto",
  rapido:["Aborto: interrupção da gravidez com <b>morte do concepto</b>, em qualquer fase. Perícia: prova da gravidez, da interrupção provocada, dos meios usados e do nexo.",
    "Aborto <b>legal</b> (CP, art. 128): <b>necessário</b> (não há outro meio de salvar a vida da gestante) e <b>sentimental</b> (gravidez resultante de estupro, com consentimento da gestante ou do representante). Anencefalia: ADPF 54.",
    "Meios: químicos (ex.: misoprostol), mecânicos (sondas, curetagem), físicos.",
    "Parafilias que caem: <b>frotteurismo</b> (esfregar-se em desconhecidos em aglomerações), <b>necrofilia</b>, <b>riparofilia</b> (atração por pessoas sujas/desasseadas), voyeurismo, exibicionismo, fetichismo, sadismo, masoquismo, pedofilia, gerontofilia, zoofilia."],
  teoria:[
    { h:"Pontos de prova", p:[
      "Aborto legal por estupro não exige boletim de ocorrência nem autorização judicial; o médico deve ter cautela quanto à veracidade, mas não é exigida prova do crime.",
      "Frotteurismo em transporte público costuma configurar <b>importunação sexual</b> (CP, art. 215-A)."]}],
  pegadinhas:["Aborto legal: só o <b>médico</b> pode praticá-lo (art. 128).","Riparofilia ≠ necrofilia."]}
],
lei:[
{ art:"CP, arts. 213 e 217-A", nome:"Tipos que a perícia sustenta", sec:"himen", itens:[
  { id:"cp213m", rot:"Art. 213", t:"<b class='g1'>Constranger alguém, mediante violência ou grave ameaça, a ter conjunção carnal ou a praticar ou permitir que com ele se pratique outro ato libidinoso</b>:<br>Pena - reclusão, de <b class='g2'>6 (seis) a 10 (dez) anos</b>.", nota:"Qualificadoras e penas do estupro de vulnerável (Lei 15.280/2025) — ver o tema Penal \"Dignidade sexual\".", c:["sx1","sx2"], j:["stj-palavra-vitima"] },
  { id:"cp217am", rot:"Art. 217-A, caput", t:"Ter <b class='g1'>conjunção carnal ou praticar outro ato libidinoso com menor de 14 (catorze) anos</b>:<br>Pena - reclusão, de <b class='g2'>10 (dez) a 18 (dezoito) anos, e multa</b>.", nota:"Pena com redação da Lei 15.280/2025.", novo:true, c:["sx3"], j:["stj-palavra-vitima"] }]},
{ art:"Lei 12.845/2013", nome:"Atendimento à vítima de violência sexual", sec:"himen", itens:[
  { id:"l12845", rot:"Arts. 1º e 2º", t:"Art. 1º Os hospitais devem oferecer às vítimas de violência sexual <b class='g1'>atendimento emergencial, integral e multidisciplinar</b>, visando ao controle e ao tratamento dos agravos físicos e psíquicos decorrentes de violência sexual, e encaminhamento, se for o caso, aos serviços de assistência social.<br>Art. 2º Considera-se violência sexual, para os efeitos desta Lei, <b class='g1'>qualquer forma de atividade sexual não consentida</b>.", c:["sx4"] }]},
{ art:"CP, arts. 123 e 128", nome:"Infanticídio e aborto legal", sec:"infanticidio", itens:[
  { id:"cp123m", rot:"Art. 123", t:"Matar, <b class='g1'>sob a influência do estado puerperal</b>, o próprio filho, <b class='g3'>durante o parto ou logo após</b>:<br>Pena - detenção, de <b class='g2'>dois a seis anos</b>.", c:["sx7","sx8","sx9"] },
  { id:"cp128m", rot:"Art. 128", t:"Não se pune o aborto praticado <b class='g1'>por médico</b>:<br>Aborto necessário<br>I - se <b class='g3'>não há outro meio de salvar a vida da gestante</b>;<br>Aborto no caso de gravidez resultante de estupro<br>II - se a gravidez resulta de <b class='g1'>estupro</b> e o aborto é precedido de <b class='g3'>consentimento da gestante</b> ou, quando incapaz, de seu representante legal.", c:["sx10","sx11"], j:["stf-adpf54-sx"] }]}
],
juris:[
{ id:"stj-palavra-vitima", trib:"STJ", tipo:"Jurisprudência em Teses", num:"Crimes contra a dignidade sexual", sec:"himen", status:"vigente", data:"reiterada",
  titulo:"Palavra da vítima e laudo negativo",
  texto:"Nos crimes contra a dignidade sexual, geralmente praticados às escondidas, a palavra da vítima tem especial relevância, desde que coerente com os demais elementos; a ausência de laudo ou o laudo sem vestígios não impede a condenação, sobretudo quando o ato libidinoso não deixa marcas.",
  explica:"O art. 158 do CPP exige perícia quando há vestígio. Atos que não deixam vestígio (ou vestígios desaparecidos) não tornam a perícia indispensável.", lei:["cp213m","cp217am"], fonte:STJJ },
{ id:"stf-adpf54-sx", trib:"STF", tipo:"ADPF", num:"ADPF 54", sec:"aborto", status:"vigente", data:"12/04/2012",
  titulo:"Interrupção da gestação de feto anencéfalo",
  texto:"Declarada a inconstitucionalidade da interpretação segundo a qual a interrupção da gravidez de feto anencéfalo é conduta tipificada nos arts. 124, 126 e 128, I e II, do Código Penal.",
  explica:"Não é uma terceira hipótese do art. 128: o STF entendeu que o fato é <b>atípico</b> (não há vida potencial). Diagnóstico por médico, com exame de imagem.", lei:["cp128m"], fonte:STFJ }
],
cards:[
{ id:"sx1", tipo:"caso", sec:"himen", f:"Laudo: hímen íntegro, de óstio amplo e borda elástica. A defesa diz que não houve conjunção carnal. Procede?", v:"<b>Não necessariamente</b>: hímen <b>complacente</b> permite a cópula sem romper. Outras provas (sêmen, PSA, DNA) decidem.", lei:["cp213m"] },
{ id:"sx2", tipo:"distincao", sec:"himen", f:"Rotura × entalhe himenal.", v:"<b>Rotura</b>: irregular, assimétrica, chega à borda de inserção (recente: sangrante). <b>Entalhe</b>: congênito, simétrico, bordas lisas, <b>não</b> atinge a inserção.", lei:["cp213m"] },
{ id:"sx3", tipo:"caso", sec:"himen", f:"Estupro de vulnerável por toques, sem vestígio físico. Laudo negativo impede a condenação?", v:"<b>Não.</b> Ato que não deixa vestígio não exige laudo; a palavra da vítima, coerente com as demais provas, tem especial relevância.", lei:["cp217am"], j:["stj-palavra-vitima"] },
{ id:"sx4", tipo:"lacuna", sec:"himen", f:"Lei 12.845/2013: violência sexual é qualquer forma de atividade sexual ______; o atendimento hospitalar é emergencial, ______ e multidisciplinar.", v:"<b>não consentida</b>; <b>integral</b>.", lei:["l12845"] },
{ id:"sx5", tipo:"caso", sec:"himen", f:"Suspeito vasectomizado: no material vaginal não há espermatozoides. Que exame comprova a presença de sêmen?", v:"<b>PSA (P30)</b> ou fosfatase ácida, e DNA de células epiteliais.", lei:[] },
{ id:"sx6", tipo:"distincao", sec:"gravidez", f:"Sinais de presunção × probabilidade × certeza de gravidez (um exemplo de cada).", v:"<b>Presunção</b>: amenorreia, Halban. <b>Probabilidade</b>: Hegar, Jacquemier, Puzos. <b>Certeza</b>: batimentos cardíacos fetais, movimentos sentidos pelo examinador, imagem do feto.", lei:[] },
{ id:"sx7", tipo:"caso", sec:"infanticidio", f:"Pulmões do recém-nascido afundam na água, sem putrefação. O que indica?", v:"<b>Galeno negativa</b>: provavelmente <b>não respirou</b> (natimorto ou morto antes de respirar). Confirmar com Balthazard; atelectasia pode dar falso negativo.", lei:["cp123m"] },
{ id:"sx8", tipo:"caso", sec:"infanticidio", f:"Pulmões de feto em putrefação flutuam. Prova vida extrauterina?", v:"<b>Não com segurança</b>: gases de putrefação dão <b>falso positivo</b> na Galeno. Use a histológica de <b>Balthazard</b>.", lei:["cp123m"] },
{ id:"sx9", tipo:"caso", sec:"infanticidio", f:"Mãe, sob estado puerperal, mata o filho enquanto ele ainda está nascendo (feto nascente, com bossa serossanguínea). Aborto ou infanticídio?", v:"<b>Infanticídio</b>: o tipo abrange a morte <b>durante o parto</b>.", lei:["cp123m"] },
{ id:"sx10", tipo:"caso", sec:"aborto", f:"Enfermeira, sem médico, interrompe gravidez resultante de estupro, com consentimento. Está amparada pelo art. 128?", v:"<b>Não.</b> A excludente exige que o aborto seja praticado <b>por médico</b>.", lei:["cp128m"] },
{ id:"sx11", tipo:"caso", sec:"aborto", f:"Gestante de feto anencéfalo interrompe a gravidez com médico. Crime?", v:"<b>Não.</b> Fato atípico conforme a <b>ADPF 54</b>.", lei:["cp128m"], j:["stf-adpf54-sx"] },
{ id:"sx12", tipo:"caso", sec:"aborto", f:"Homem se esfrega em passageiras no metrô lotado para obter prazer. Parafilia e enquadramento penal provável?", v:"<b>Frotteurismo</b>; penalmente, em regra, <b>importunação sexual</b> (CP, art. 215-A).", lei:[] }
],
importancia:{ nivel:4,
  texto:"Combina Medicina Legal e Direito Penal: a banca cobra o hímen, as provas do estupro, os sinais de gravidez em três níveis, as docimásias do infanticídio e o aborto legal.",
  decore:[
    ["Conjunção carnal","introdução do pênis na vagina, <b>completa ou não</b>; demais atos são libidinosos"],
    ["Hímen complacente","permite a cópula <b>sem romper</b>; íntegro não exclui conjunção"],
    ["Rotura × entalhe","rotura atinge a <b>inserção</b>; entalhe é congênito, simétrico e não atinge"],
    ["Carúnculas mirtiformes","sinal de <b>parto vaginal</b> anterior"],
    ["Sinais de gravidez","<b>presunção</b> (Halban), <b>probabilidade</b> (Hegar, Piskacek, Jacquemier), <b>certeza</b> (BCF, imagem)"],
    ["Galeno","docimásia hidrostática: pulmão que respirou <b>flutua</b>"],
    ["Balthazard","docimásia histológica: a <b>mais fidedigna</b>"],
    ["Breslau / Wreden-Wendt-Gelé","gastrintestinal / auricular"],
    ["Aborto legal (CP, art. 128)","<b>necessário</b> e <b>sentimental</b> (estupro); só o <b>médico</b>"],
    ["Atendimento à vítima (Lei 12.845/2013)","emergencial, integral e multidisciplinar"]],
  macetes:[
    ["Galeno flutua","Se o pulmão boia, a criança respirou. Mas putrefação dá falso positivo."],
    ["Presunção, probabilidade, certeza","Halban é presunção; Hegar e Jacquemier são probabilidade; batimentos e imagem fetal são certeza."],
    ["Hímen íntegro não é álibi","Complacente: a cópula ocorre sem rotura."],
    ["\"Durante o parto\" está no tipo","Infanticídio: mãe, sob estado puerperal, durante ou logo após o parto."]] },
comparativo:{ titulo:"Rotura do hímen × entalhe himenal", head:["Rotura himenal","Entalhe (chanfradura) congênito"], rows:[
  ["<b>Origem:</b> adquirida, por distensão violenta, geralmente cópula ou outro ato","<b>Origem:</b> congênita, anatômica"],
  ["<b>Forma:</b> irregular e assimétrica","<b>Forma:</b> simétrica, bordas lisas e regulares"],
  ["<b>Inserção:</b> atinge ou chega perto da borda de inserção","<b>Inserção:</b> não atinge a inserção"],
  ["<b>Quando recente:</b> bordas avermelhadas, edemaciadas e sangrantes","<b>Sinais de reação:</b> não há"],
  ["<b>Valor pericial:</b> compatível com conjunção carnal ou outro ato","<b>Valor pericial:</b> não indica violência nem cópula"]]},
prova:[
  { tipo:"ce", enun:"A integridade do hímen exclui a ocorrência de conjunção carnal.", gab:"Errado", com:"O hímen complacente, elástico ou de óstio amplo, permite a cópula sem se romper." },
  { tipo:"ce", enun:"A dosagem de PSA (P30) no material vaginal pode comprovar contato com sêmen mesmo quando o autor é vasectomizado e não há espermatozoides.", gab:"Certo", com:"O PSA é útil quando não há espermatozoides, como em vasectomizados e azoospérmicos." },
  { tipo:"ce", enun:"A docimásia hidrostática de Galeno é a mais fidedigna das docimásias, sendo a de Balthazard apenas complementar.", gab:"Errado", com:"A mais fidedigna é a docimásia histológica de Balthazard. A de Galeno pode ter falso positivo (putrefação) e falso negativo (atelectasia, pneumonia)." },
  { tipo:"ce", enun:"O sinal de Halban, caracterizado por lanugem na face, é sinal de probabilidade de gravidez.", gab:"Errado", com:"É sinal de presunção. Hegar, Piskacek, Jacquemier e Osiander são de probabilidade." },
  { tipo:"caso", enun:"Gestante vítima de estupro deseja interromper a gravidez. Há aborto legal? Quem pode praticá-lo?", com:"Sim, é o aborto sentimental do art. 128 do CP, com consentimento da gestante ou do representante, praticado por médico. O tema registra que não se exige boletim de ocorrência nem autorização judicial." },
  { tipo:"caso", enun:"Mãe, sob influência do estado puerperal, mata o próprio filho durante o parto. Aborto ou infanticídio?", com:"Infanticídio (CP, art. 123): o \"durante o parto\" está no tipo. A perícia deve provar o parto, que o filho estava vivo, a causa da morte e o estado puerperal." }],
resumo:[
  "<b>Conjunção carnal</b> é a introdução do pênis na vagina, completa ou não; os demais atos são libidinosos, e ambos configuram estupro (CP, art. 213).",
  "A <b>rotura</b> himenal é irregular e atinge a inserção; o <b>entalhe</b> é congênito, simétrico e não atinge a inserção; hímen complacente não exclui cópula.",
  "Provas laboratoriais: espermatozoides, PSA (P30), fosfatase ácida e DNA; o exame deve ser feito o quanto antes.",
  "Lei 12.845/2013: atendimento emergencial, integral e multidisciplinar à vítima de violência sexual.",
  "Gravidez: sinais de <b>presunção</b>, <b>probabilidade</b> e <b>certeza</b> (BCF, movimentos fetais percebidos pelo examinador, imagem).",
  "Parto recente: lóquios, colostro, lacerações; parto antigo: carúnculas mirtiformes, estrias.",
  "Docimásias: Galeno (hidrostática pulmonar), Balthazard (histológica, a mais fidedigna), Breslau (gastrintestinal) e Wreden-Wendt-Gelé (auricular).",
  "Aborto legal (CP, art. 128): necessário e sentimental, feito por médico; parafilias frequentes: frotteurismo, necrofilia, riparofilia."],
checklist:[
  "Diferenciar conjunção carnal de ato libidinoso.",
  "Distinguir rotura de entalhe e explicar o hímen complacente.",
  "Citar as provas laboratoriais da conjunção carnal e seus limites.",
  "Descrever o atendimento à vítima segundo a Lei 12.845/2013.",
  "Classificar os sinais de gravidez em presunção, probabilidade e certeza.",
  "Distinguir parto recente e antigo e o que são as carúnculas mirtiformes.",
  "Listar o que a perícia deve provar no infanticídio.",
  "Explicar as quatro docimásias e os falsos resultados da de Galeno.",
  "Diferenciar feto nascente, recém-nascido e natimorto.",
  "Aplicar o art. 128 do CP e reconhecer as parafilias mais cobradas."],
questoes:[]
};

/* ======================= ASFIXIOLOGIA ======================= */
T.ml_asfixiologia = {
meta:{ tema:"Asfixiologia forense", atualizado:AT,
  foco:"Sinais gerais das asfixias e seus limites; constrição do pescoço (enforcamento, estrangulamento, esganadura) e sinais do sulco e das carótidas; sufocação direta e indireta; afogamento, soterramento, confinamento e gases irrespiráveis; asfixia como qualificadora do homicídio." },
secoes:[
{ id:"geral", titulo:"Conceito, classificação e sinais gerais", curto:"Geral",
  rapido:["Asfixia mecânica: impedimento, por meio físico, da passagem do ar ou da oxigenação do sangue — energia de ordem <b>físico-química</b>.",
    "Classificação: <b>constrição do pescoço</b> (enforcamento, estrangulamento, esganadura); <b>obstrução das vias aéreas ou compressão do tórax</b> (sufocação direta e indireta); <b>meio líquido</b> (afogamento) ou <b>sólido</b> (soterramento); <b>ambiente</b> (confinamento, gases irrespiráveis).",
    "Sinais gerais (inespecíficos): cianose, <b>petéquias</b> (manchas de <b>Tardieu</b>, subpleurais e subepicárdicas), sangue escuro e fluido, congestão visceral, livores intensos.",
    "Nenhum sinal geral, sozinho, prova asfixia: o diagnóstico depende dos sinais <b>específicos</b> de cada tipo."],
  teoria:[
    { h:"Fases da asfixia", p:[
      "Fase cerebral (vertigem, perda de consciência), fase de excitação (convulsões) e fase de morte aparente/parada respiratória e cardíaca.",
      "Asfixia é qualificadora do homicídio (CP, art. 121, §2º, III) e circunstância do laudo (\"meio insidioso ou cruel\")."]}],
  pegadinhas:["Petéquias não são exclusivas de asfixia.","Asfixia = energia <b>físico-química</b> na classificação das energias."]},
{ id:"pescoco", titulo:"Enforcamento, estrangulamento e esganadura", curto:"Pescoço",
  rapido:["<b>Enforcamento</b>: laço fixo acionado pelo <b>peso do próprio corpo</b>. Sulco <b>oblíquo ascendente</b>, <b>descontínuo</b> (interrompido no nó), acima da cartilagem tireoide, profundo e apergaminhado. Em regra, <b>suicida</b>.",
    "<b>Estrangulamento</b>: laço acionado por <b>força externa</b> que não o peso da vítima. Sulco <b>horizontal</b>, <b>contínuo</b>, de profundidade uniforme, na altura ou abaixo da tireoide. Em regra, <b>homicida</b>.",
    "<b>Esganadura</b>: constrição pelas <b>mãos</b>. Marcas de unhas (estigmas ungueais) e equimoses no pescoço, fratura do hioide e da laringe. É <b>sempre homicida</b> — ninguém se esgana sozinho.",
    "Enforcamento <b>incompleto</b>: o corpo toca o chão (ajoelhado, sentado) — basta pequena pressão sobre os vasos do pescoço."],
  teoria:[
    { h:"Sinais no sulco do enforcado (França)", p:[
      "<b>Ponsold</b>: livores em placas acima e abaixo das bordas do sulco. <b>Thoinot</b>: zona violácea nas bordas. <b>Azevedo-Neves</b>: livores punctiformes acima e abaixo das bordas.",
      "<b>Neyding</b>: hemorragias punctiformes no fundo do sulco. <b>Ambroise Paré</b>: pele enrugada e escoriada no fundo. <b>Lesser</b>: vesículas sanguinolentas no fundo. <b>Bonnet</b>: marcas da trama do laço e ruptura de ligamentos laríngeos. <b>Schulz</b>: borda superior saliente e violácea."]},
    { h:"Sinais nas carótidas", p:[
      "<b>Amussat</b>: secção <b>transversal</b> da túnica <b>interna</b> (íntima) perto da bifurcação.",
      "<b>Friedberg</b>: sufusão hemorrágica na túnica <b>externa</b> (adventícia).",
      "Marcas de França: rupturas longitudinais em meia-lua. Ocorrem nas constrições violentas do pescoço (enforcamento, estrangulamento, esganadura)."]}],
  quadro:{ titulo:"Enforcamento × estrangulamento × esganadura", head:["","Enforcamento","Estrangulamento","Esganadura"], rows:[
    ["Agente constritor","Laço + peso do corpo","Laço + força externa","Mãos"],
    ["Sulco","Oblíquo ascendente, descontínuo no nó","Horizontal, contínuo, uniforme","Não há sulco: equimoses e marcas de unhas"],
    ["Altura","Acima da tireoide","Na altura ou abaixo da tireoide","Variável"],
    ["Causa jurídica típica","Suicídio (homicídio raro)","Homicídio (suicídio raro)","Sempre homicídio"]]},
  pegadinhas:["Sulco <b>descontínuo</b> = enforcamento; <b>contínuo</b> = estrangulamento.","Esganadura não tem laço.","Amussat = íntima (interna); Friedberg = adventícia (externa)."]},
{ id:"outras", titulo:"Sufocação, afogamento, soterramento e gases", curto:"Outras",
  rapido:["<b>Sufocação direta</b>: oclusão da boca e do nariz (travesseiro, mão) ou corpo estranho nas vias aéreas (engasgo). <b>Indireta</b>: compressão do tórax e abdome (multidão, soterramento parcial), com a <b>máscara equimótica</b> (cianose e petéquias de face e pescoço).",
    "<b>Afogamento</b>: meio líquido. Sinais: <b>cogumelo de espuma</b> na boca e no nariz, <b>manchas de Paltauf</b> (hemorragias subpleurais claras), pele anserina (<b>sinal de Bernt</b>), maceração das mãos e pés (\"mãos de lavadeira\"), pulmões volumosos (enfisema aquoso), diatomáceas/plâncton nos tecidos.",
    "<b>Soterramento</b>: meio sólido pulverulento (terra, areia) nas vias aéreas.",
    "<b>Confinamento</b>: espaço fechado sem renovação do ar. <b>Monóxido de carbono</b>: livores e vísceras de cor <b>rosa-carminada</b> (carboxiemoglobina)."],
  teoria:[
    { h:"Afogamento: tipos e putrefação", p:[
      "Afogado <b>azul</b> (asfíxico verdadeiro, com luta e aspiração de água) × afogado <b>branco</b> (morte rápida por inibição reflexa, hidrocussão — pouca água nos pulmões).",
      "No afogado, a putrefação começa pela <b>cabeça e parte superior do tórax</b>; a maceração da pele e a perda das unhas ajudam a estimar o tempo de submersão.",
      "Cadáver jogado na água já morto: <b>sem</b> cogumelo de espuma nem diatomáceas na medula óssea e órgãos distantes."]}],
  pegadinhas:["Cogumelo de espuma é sinal de afogamento em vida (também aparece em edema pulmonar).","Manchas de Paltauf (afogamento) ≠ manchas de Tardieu (petéquias gerais).","Cor carminada = monóxido de carbono."]}
],
lei:[
{ art:"CP, art. 121, §2º, III", nome:"Asfixia como qualificadora", sec:"geral", itens:[
  { id:"cp121asf", rot:"Art. 121, §2º, III", t:"Se o homicídio é cometido: (...) III - com emprego de veneno, fogo, explosivo, <b class='g1'>asfixia</b>, tortura ou outro meio insidioso ou cruel, ou de que possa resultar perigo comum:<br>Pena - reclusão, de <b class='g2'>doze a trinta anos</b>.", c:["as1","as6"] }]}
],
juris:[],
cards:[
{ id:"as1", tipo:"caso", sec:"pescoco", f:"Cadáver com marcas de unhas e equimoses arredondadas no pescoço e fratura do hioide; não há laço nem sulco. Mecanismo e causa jurídica?", v:"<b>Esganadura</b> — sempre <b>homicida</b>. Qualifica o homicídio (asfixia).", lei:["cp121asf"] },
{ id:"as2", tipo:"caso", sec:"pescoco", f:"Sulco horizontal, contínuo, de profundidade uniforme, abaixo da tireoide, encontrado em corpo \"enforcado\". Interpretação?", v:"Sulco típico de <b>estrangulamento</b>: sugere homicídio com <b>simulação</b> de enforcamento.", lei:[] },
{ id:"as3", tipo:"caso", sec:"pescoco", f:"Corpo encontrado ajoelhado, com laço amarrado à maçaneta da porta. É possível enforcamento?", v:"<b>Sim</b>: enforcamento <b>incompleto</b> — o peso parcial do corpo basta para comprimir os vasos do pescoço.", lei:[] },
{ id:"as4", tipo:"distincao", sec:"pescoco", f:"Sinal de Amussat × sinal de Friedberg.", v:"<b>Amussat</b>: secção transversal da <b>íntima</b> da carótida, perto da bifurcação. <b>Friedberg</b>: sufusão hemorrágica na <b>adventícia</b>.", lei:[] },
{ id:"as5", tipo:"lacuna", sec:"pescoco", f:"No sulco do enforcado: vesículas sanguinolentas no fundo = sinal de ______; pele enrugada e escoriada no fundo = sinal de ______.", v:"<b>Lesser</b>; <b>Ambroise Paré</b>.", lei:[] },
{ id:"as6", tipo:"caso", sec:"outras", f:"Afogado com cogumelo de espuma, manchas de Paltauf e diatomáceas na medula óssea. Estava vivo ao cair na água?", v:"<b>Sim</b>: são sinais de afogamento <b>em vida</b> (aspirou água).", lei:["cp121asf"] },
{ id:"as7", tipo:"caso", sec:"outras", f:"Corpo com livores rosa-cereja dentro de garagem fechada com o carro ligado. Causa provável?", v:"Intoxicação por <b>monóxido de carbono</b> (carboxiemoglobina).", lei:[] },
{ id:"as8", tipo:"caso", sec:"outras", f:"Vítima esmagada por multidão em estádio: face e pescoço arroxeados, com petéquias. Tipo de asfixia?", v:"<b>Sufocação indireta</b> (compressão do tórax), com máscara equimótica.", lei:[] },
{ id:"as9", tipo:"distincao", sec:"outras", f:"Manchas de Tardieu × manchas de Paltauf.", v:"<b>Tardieu</b>: petéquias subpleurais/subepicárdicas, sinal geral de asfixia. <b>Paltauf</b>: hemorragias subpleurais maiores e claras, típicas do <b>afogamento</b>.", lei:[] },
{ id:"as10", tipo:"distincao", sec:"outras", f:"Afogado azul × afogado branco.", v:"<b>Azul</b>: asfixia verdadeira, com luta e aspiração de água. <b>Branco</b>: morte rápida por inibição reflexa, pouca água nos pulmões.", lei:[] }
],
importancia:{ nivel:5,
  texto:"Muito cobrado: a banca pede a diferença entre enforcamento, estrangulamento e esganadura, os sinais do sulco e das carótidas e os sinais de afogamento.",
  decore:[
    ["Enforcamento","laço + <b>peso do corpo</b>; sulco <b>oblíquo ascendente</b>, <b>descontínuo</b>; em regra suicídio"],
    ["Estrangulamento","laço + <b>força externa</b>; sulco <b>horizontal</b>, <b>contínuo</b>; em regra homicídio"],
    ["Esganadura","<b>mãos</b>; marcas de unhas, fratura do hioide; <b>sempre homicida</b>"],
    ["Petéquias de Tardieu","sinal geral de asfixia, <b>não exclusivo</b>"],
    ["Amussat","secção da túnica <b>interna</b> da carótida"],
    ["Friedberg","sufusão na túnica <b>externa</b> (adventícia)"],
    ["Sufocação indireta","compressão do tórax; <b>máscara equimótica</b>"],
    ["Afogamento","cogumelo de espuma, <b>Paltauf</b>, pele anserina (<b>Bernt</b>)"],
    ["Monóxido de carbono","vísceras e livores <b>rosa-carminados</b>"],
    ["Asfixia como qualificadora","CP, art. 121, § 2º, III"]],
  macetes:[
    ["Contínuo estrangula, descontínuo enforca","O nó interrompe o sulco no enforcamento."],
    ["Amussat Interna, Friedberg Externa","Amussat: túnica interna (íntima). Friedberg: túnica externa."],
    ["Esganadura não tem laço","Ninguém se esgana sozinho: é sempre homicídio."],
    ["Paltauf no afogado, Tardieu em qualquer asfixia","Paltauf = hemorragias subpleurais claras do afogamento."]] },
comparativo:{ titulo:"Enforcamento × estrangulamento", head:["Enforcamento","Estrangulamento"], rows:[
  ["<b>Força que aperta o laço:</b> peso do próprio corpo","<b>Força que aperta o laço:</b> externa, que não o peso da vítima"],
  ["<b>Sulco:</b> oblíquo ascendente e descontínuo (interrompido no nó)","<b>Sulco:</b> horizontal, contínuo e de profundidade uniforme"],
  ["<b>Altura:</b> acima da cartilagem tireoide","<b>Altura:</b> na altura ou abaixo da tireoide"],
  ["<b>Causa jurídica típica:</b> suicídio (homicídio é raro)","<b>Causa jurídica típica:</b> homicídio (suicídio é raro)"],
  ["<b>Variante:</b> enforcamento incompleto, com o corpo tocando o chão","<b>Parente próximo:</b> esganadura, com as mãos e sempre homicida"]]},
prova:[
  { tipo:"ce", enun:"No enforcamento, o sulco é oblíquo ascendente e descontínuo, enquanto no estrangulamento é horizontal e contínuo.", gab:"Certo", com:"O nó interrompe o sulco do enforcado; no estrangulamento o laço é uniforme em todo o pescoço." },
  { tipo:"ce", enun:"A esganadura pode ser suicida, desde que o agente utilize as próprias mãos.", gab:"Errado", com:"A esganadura é sempre homicida: a perda de consciência faz as mãos soltarem o pescoço." },
  { tipo:"ce", enun:"O sinal de Amussat consiste em sufusão hemorrágica na túnica externa da carótida, e o de Friedberg, em secção transversal da túnica interna.", gab:"Errado", com:"Estão trocados. Amussat: secção transversal da túnica interna. Friedberg: sufusão hemorrágica na túnica externa (adventícia)." },
  { tipo:"ce", enun:"A presença de petéquias subpleurais permite, por si só, afirmar que a morte foi por asfixia.", gab:"Errado", com:"Os sinais gerais de asfixia são inespecíficos. O diagnóstico depende dos sinais específicos de cada tipo." },
  { tipo:"caso", enun:"Cadáver encontrado com vísceras e livores de cor rosa-carminada em ambiente fechado. Qual a hipótese pericial?", com:"Intoxicação por monóxido de carbono, cuja carboxiemoglobina dá cor rosa-carminada." },
  { tipo:"caso", enun:"Corpo retirado de um rio, sem cogumelo de espuma e sem diatomáceas em órgãos distantes. O que isso sugere?", com:"Sugere que a vítima foi jogada já morta na água, pois o afogado em vida apresenta cogumelo de espuma e diatomáceas nos tecidos." }],
resumo:[
  "Asfixia mecânica é o impedimento físico da passagem do ar ou da oxigenação do sangue, energia físico-química.",
  "Classificação: constrição do pescoço, sufocação (direta e indireta), meio líquido ou sólido e ambiente (confinamento, gases).",
  "Sinais gerais (cianose, petéquias de Tardieu, sangue fluido) são inespecíficos; vale o sinal específico de cada tipo.",
  "Enforcamento: laço + peso do corpo, sulco oblíquo ascendente e descontínuo; estrangulamento: força externa, sulco horizontal e contínuo.",
  "Esganadura: mãos, estigmas ungueais, fratura do hioide e da laringe; é sempre homicida.",
  "Carótidas: Amussat (túnica interna, secção transversal) e Friedberg (túnica externa, sufusão).",
  "Sufocação indireta tem máscara equimótica; afogamento tem cogumelo de espuma, manchas de Paltauf e sinal de Bernt.",
  "Monóxido de carbono dá livores e vísceras rosa-carminados."],
checklist:[
  "Classificar as asfixias mecânicas.",
  "Distinguir enforcamento, estrangulamento e esganadura pelo agente constritor e pelo sulco.",
  "Explicar enforcamento incompleto.",
  "Associar cada autor (Ponsold, Thoinot, Azevedo-Neves, Neyding, Lesser, Schulz) ao sinal do sulco.",
  "Diferenciar Amussat de Friedberg.",
  "Distinguir sufocação direta e indireta e dizer o que é a máscara equimótica.",
  "Listar os sinais de afogamento e diferenciar afogado azul e branco.",
  "Reconhecer a intoxicação por monóxido de carbono."],
questoes:[]
};

/* ======================= PSICOPATOLOGIA ======================= */
T.ml_psicopatologia = {
meta:{ tema:"Psicopatologia forense: imputabilidade e capacidade civil", atualizado:AT,
  foco:"Imputabilidade × responsabilidade; critério biopsicológico (CP, art. 26); menoridade; emoção, paixão e embriaguez (art. 28); incidente de insanidade (CPP, arts. 149 a 152); medidas de segurança e Súmula 527/STJ; transtornos de personalidade, oligofrenias, psicoses, epilepsia, sono e hipnose; capacidade civil após o Estatuto da Pessoa com Deficiência." },
secoes:[
{ id:"imputabilidade", titulo:"Imputabilidade e critério biopsicológico", curto:"Imputabilidade",
  rapido:["<b>Imputabilidade</b>: capacidade de entender o caráter ilícito do fato e de se determinar conforme esse entendimento. <b>Responsabilidade</b>: consequência jurídica, declarada pelo <b>juiz</b>.",
    "CP adota o critério <b>biopsicológico</b>: não basta a doença mental (biológico); é preciso que, <b>ao tempo da conduta</b>, o agente fosse inteiramente incapaz de entender ou de se determinar (psicológico).",
    "<b>Inimputável</b> (art. 26, caput): isento de pena → absolvição imprópria com <b>medida de segurança</b>. <b>Semi-imputável</b> (parágrafo único): pena reduzida de <b>1/3 a 2/3</b> ou substituída por medida de segurança (sistema vicariante).",
    "Menores de <b>18 anos</b>: inimputáveis por critério <b>biológico</b> puro (CP, art. 27; CF, art. 228) — sujeitos ao ECA."],
  teoria:[
    { h:"O papel do perito", p:[
      "O perito diagnostica e descreve a capacidade de entendimento e de autodeterminação; quem decide a imputabilidade é o juiz, que não fica adstrito ao laudo.",
      "A inimputabilidade <b>não se presume</b>: precisa ser provada. Diagnóstico psiquiátrico não implica automaticamente inimputabilidade.",
      "Psicopatia (transtorno de personalidade antissocial): em regra, o agente <b>entende</b> o ilícito; a doutrina tende a situá-lo, quando muito, na semi-imputabilidade (perturbação da saúde mental)."]}],
  pegadinhas:["Critério do CP para doença mental = <b>biopsicológico</b>; para menoridade = <b>biológico</b>.","Semi-imputável recebe pena reduzida <b>ou</b> medida de segurança — nunca as duas (vicariante)."]},
{ id:"modificadores", titulo:"Emoção, paixão, embriaguez, sono e outros modificadores", curto:"Modificadores",
  rapido:["<b>Emoção e paixão não excluem</b> a imputabilidade (art. 28, I); podem atenuar a pena ou privilegiar o crime (ex.: violenta emoção logo após injusta provocação).",
    "Embriaguez <b>voluntária ou culposa</b>: não exclui (art. 28, II — actio libera in causa). <b>Acidental completa</b> (caso fortuito ou força maior): <b>isenta</b> (§1º). <b>Acidental incompleta</b>: reduz <b>1/3 a 2/3</b> (§2º). <b>Preordenada</b>: agravante (art. 61, II, l). <b>Patológica</b>: tratada como doença mental (art. 26).",
    "Fases clínicas da embriaguez (didáticas): <b>excitação</b> (\"macaco\"), <b>confusão</b> (\"leão\") e <b>sono/coma</b> (\"porco\").",
    "Sexo não é modificador da imputabilidade; idade avançada (70 anos) só atenua a pena. Sono patológico (sonambulismo) e hipnose podem afastar a conduta voluntária ou a imputabilidade, conforme o caso."],
  teoria:[
    { h:"Epilepsia", p:[
      "Crise com convulsões tônico-clônicas, perda súbita da consciência e amnésia; sintomas acessórios: mordedura da língua, liberação de esfíncteres, sialorreia.",
      "Crime do epiléptico (Legrand du Saulle): <b>ausência de motivo, de premeditação e de remorso</b>, instantaneidade, ferocidade, multiplicidade de golpes e <b>amnésia</b>.",
      "Durante a crise ou o estado crepuscular, pode haver inimputabilidade; nos intervalos, o epiléptico em regra é imputável."]}],
  pegadinhas:["Embriaguez voluntária completa <b>não</b> isenta de pena.","Só a embriaguez <b>acidental</b> (fortuito ou força maior) exclui ou reduz.","Emoção e paixão: nunca excluem a imputabilidade."]},
{ id:"transtornos", titulo:"Transtornos mentais de interesse pericial", curto:"Transtornos",
  rapido:["<b>Psicoses</b> (esquizofrenia, transtorno bipolar grave, psicoses orgânicas e tóxicas): perda do juízo de realidade, delírios e alucinações — podem gerar inimputabilidade.",
    "<b>Oligofrenias</b> (classificação clássica): <b>idiotia</b> (QI abaixo de 25, idade mental até 3 anos), <b>imbecilidade</b> (QI 25-50, 3 a 7 anos) e <b>debilidade mental</b> (QI 50 a cerca de 70-90, 7 a 12 anos). Hoje se fala em deficiência intelectual profunda, grave, moderada e leve.",
    "Idiotas e imbecis tendem à <b>inimputabilidade</b>; débeis mentais, à <b>semi-imputabilidade</b>. Débeis mentais são o grupo mais numeroso.",
    "<b>Oligofrênico × demente</b>: o oligofrênico nunca desenvolveu a inteligência (\"o pobre que sempre o foi\"); o demente a perdeu (\"o rico empobrecido\", Esquirol)."],
  teoria:[
    { h:"Transtornos de personalidade e dos impulsos", p:[
      "Padrões duradouros e inflexíveis, iniciados na adolescência ou juventude: paranoide, esquizoide, esquizotípica, <b>antissocial</b> (desprezo por normas, mentira, agressividade, ausência de remorso), <b>borderline</b> (instabilidade afetiva, impulsividade), histriônica, narcisista, evitativa (ansiosa), dependente, obsessivo-compulsiva (anancástica).",
      "Não há perda do juízo de realidade, ao contrário das psicoses.",
      "Transtornos dos impulsos: <b>cleptomania</b>, <b>piromania</b>, jogo patológico, <b>oniomania</b> (compras compulsivas) — tensão antes, alívio durante e depois, às vezes remorso."]}],
  pegadinhas:["Psicopata não perde o juízo de realidade; psicótico sim.","Oniomania = compras compulsivas.","A classificação brasileira de 1946 (citada nas apostilas) usa termos hoje superados; a banca ainda cobra idiotia, imbecilidade e debilidade."]},
{ id:"processo", titulo:"Incidente de insanidade, medida de segurança e capacidade civil", curto:"Insanidade",
  rapido:["Dúvida sobre a integridade mental → o <b>juiz</b> ordena o exame, de ofício ou a pedido do <b>MP</b>, defensor, curador, ascendente, descendente, irmão ou cônjuge (CPP, art. 149). No inquérito, por <b>representação do delegado</b>.",
    "Ao determinar o exame, o juiz nomeia <b>curador</b> e suspende o processo (salvo diligências urgentes). O exame dura até <b>45 dias</b>, prorrogáveis se os peritos demonstrarem necessidade.",
    "Medida de segurança: internação ou tratamento ambulatorial por prazo indeterminado, com mínimo de <b>1 a 3 anos</b>; duração máxima = limite máximo da pena em abstrato (<b>Súmula 527/STJ</b>).",
    "Capacidade civil (CC após a Lei 13.146/2015): <b>absolutamente incapazes</b> só os <b>menores de 16 anos</b>; relativamente: 16 a 18 anos, ébrios habituais e viciados em tóxico, quem não puder exprimir sua vontade, pródigos. Deficiência, por si só, <b>não</b> gera incapacidade."],
  teoria:[
    { h:"Doença mental superveniente", p:[
      "Se a doença surge <b>depois</b> do crime, o processo fica suspenso até o restabelecimento (CPP, art. 152) — é questão de capacidade processual, não de imputabilidade.",
      "Se surge durante a execução da pena, a pena pode ser convertida em medida de segurança (LEP, art. 183)."]},
    { h:"Política antimanicomial", p:[
      "Lei 10.216/2001: internação como último recurso, tratamento preferencialmente em serviços comunitários.",
      "Resolução CNJ 487/2023: institui a Política Antimanicomial do Poder Judiciário e prevê a desativação progressiva dos hospitais de custódia — tema em disputa no STF; confira a situação atual."]}],
  pegadinhas:["O delegado <b>não</b> ordena o exame de insanidade: representa ao juiz.","O MP também pode requerer o exame (o rol do art. 149 o inclui).","Ébrio habitual é <b>relativamente</b> incapaz no cível — nada a ver com a imputabilidade penal."]}
],
lei:[
{ art:"CP, arts. 26 a 28", nome:"Imputabilidade", sec:"imputabilidade", itens:[
  { id:"cp26", rot:"Art. 26", t:"É <b class='g1'>isento de pena</b> o agente que, por <b class='g1'>doença mental ou desenvolvimento mental incompleto ou retardado</b>, era, <b class='g3'>ao tempo da ação ou da omissão</b>, <b class='g1'>inteiramente incapaz</b> de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento.<br>Parágrafo único - A pena pode ser <b class='g2'>reduzida de um a dois terços</b>, se o agente, em virtude de <b class='g1'>perturbação de saúde mental</b> ou por desenvolvimento mental incompleto ou retardado <b class='g3'>não era inteiramente capaz</b> de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento.", c:["ps1","ps2","ps3"], j:["stj-s527","stj-eresp998128"] },
  { id:"cp27", rot:"Art. 27", t:"Os <b class='g1'>menores de 18 (dezoito) anos</b> são penalmente inimputáveis, ficando sujeitos às normas estabelecidas na legislação especial.", c:["ps4"] },
  { id:"cp28", rot:"Art. 28", t:"<b class='g3'>Não excluem a imputabilidade penal</b>:<br>I - a <b class='g1'>emoção ou a paixão</b>;<br>II - a <b class='g1'>embriaguez, voluntária ou culposa</b>, pelo álcool ou substância de efeitos análogos.<br>§ 1º - É <b class='g1'>isento de pena</b> o agente que, por <b class='g1'>embriaguez completa, proveniente de caso fortuito ou força maior</b>, era, ao tempo da ação ou da omissão, inteiramente incapaz de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento.<br>§ 2º - A pena pode ser <b class='g2'>reduzida de um a dois terços</b>, se o agente, por embriaguez, proveniente de caso fortuito ou força maior, <b class='g3'>não possuía</b>, ao tempo da ação ou da omissão, a <b class='g3'>plena capacidade</b> de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento.", c:["ps5","ps6","ps7"] }]},
{ art:"CP, art. 97", nome:"Medida de segurança", sec:"processo", itens:[
  { id:"cp97", rot:"Art. 97", t:"Se o agente for inimputável, o juiz determinará sua <b class='g1'>internação</b> (art. 26). Se, todavia, o fato previsto como crime for punível com <b class='g3'>detenção</b>, poderá o juiz submetê-lo a <b class='g1'>tratamento ambulatorial</b>.<br>§ 1º - A internação, ou tratamento ambulatorial, será por <b class='g1'>tempo indeterminado</b>, perdurando enquanto não for averiguada, mediante perícia médica, a <b class='g1'>cessação de periculosidade</b>. O prazo mínimo deverá ser de <b class='g2'>1 (um) a 3 (três) anos</b>.", c:["ps10","ps11"], j:["stj-s527","stj-eresp998128"] }]},
{ art:"CPP, arts. 149 a 152", nome:"Incidente de insanidade mental", sec:"processo", itens:[
  { id:"cpp149", rot:"Arts. 149 e 150", t:"Art. 149. Quando houver <b class='g1'>dúvida sobre a integridade mental do acusado</b>, o <b class='g1'>juiz ordenará</b>, de ofício ou a requerimento do <b class='g1'>Ministério Público, do defensor, do curador, do ascendente, descendente, irmão ou cônjuge</b> do acusado, seja este submetido a exame médico-legal.<br>§ 1º O exame poderá ser ordenado ainda na <b class='g1'>fase do inquérito</b>, mediante <b class='g3'>representação da autoridade policial</b> ao juiz competente.<br>§ 2º O juiz nomeará <b class='g1'>curador</b> ao acusado, quando determinar o exame, ficando <b class='g1'>suspenso o processo</b>, se já iniciada a ação penal, <b class='g3'>salvo quanto às diligências que possam ser prejudicadas pelo adiamento</b>.<br>Art. 150. Para o efeito do exame, o acusado, se estiver preso, será internado em manicômio judiciário, onde houver, ou, se estiver solto, e o requererem os peritos, em estabelecimento adequado que o juiz designar.<br>§ 1º O exame <b class='g2'>não durará mais de quarenta e cinco dias</b>, salvo se os peritos demonstrarem a necessidade de maior prazo.", c:["ps8","ps9"] },
  { id:"cpp152", rot:"Art. 152", t:"Se se verificar que a <b class='g1'>doença mental sobreveio à infração</b> o processo continuará <b class='g1'>suspenso</b> até que o acusado se restabeleça, observado o § 2º do art. 149.", c:["ps12"] }]},
{ art:"CC, arts. 3º e 4º", nome:"Capacidade civil (Lei 13.146/2015)", sec:"processo", itens:[
  { id:"cc3", rot:"Arts. 3º e 4º", t:"Art. 3º São <b class='g1'>absolutamente incapazes</b> de exercer pessoalmente os atos da vida civil os <b class='g1'>menores de 16 (dezesseis) anos</b>.<br>Art. 4º São incapazes, <b class='g1'>relativamente</b> a certos atos ou à maneira de os exercer:<br>I - os maiores de dezesseis e menores de dezoito anos;<br>II - os <b class='g1'>ébrios habituais e os viciados em tóxico</b>;<br>III - aqueles que, por causa transitória ou permanente, <b class='g1'>não puderem exprimir sua vontade</b>;<br>IV - os <b class='g1'>pródigos</b>.", nota:"Redação da Lei 13.146/2015 (Estatuto da Pessoa com Deficiência): enfermidade ou deficiência mental deixou de gerar incapacidade absoluta.", c:["ps13"] }]}
],
juris:[
{ id:"stj-s527", trib:"STJ", tipo:"Súmula", num:"Súmula 527", sec:"processo", status:"vigente", data:"2015",
  titulo:"Limite máximo da medida de segurança",
  texto:"O tempo de duração da medida de segurança não deve ultrapassar o limite máximo da pena abstratamente cominada ao delito praticado.",
  explica:"Evita a \"prisão perpétua\" manicomial. O mínimo continua sendo de 1 a 3 anos (CP, art. 97, §1º); cessada a periculosidade antes do máximo, extingue-se a medida.", lei:["cp97","cp26"], fonte:STJS },
{ id:"stj-eresp998128", trib:"STJ", tipo:"Precedente (3ª Seção)", num:"EREsp 998.128/MG", sec:"processo", status:"vigente", data:"2019",
  titulo:"Tratamento ambulatorial também para crime punido com reclusão",
  texto:"Na fixação da medida de segurança, deve-se considerar a periculosidade do agente, e não apenas a natureza da pena; é possível o tratamento ambulatorial ao inimputável que pratica fato punido com reclusão.",
  explica:"Superou a leitura literal do art. 97 (\"reclusão = internação\"), em harmonia com a Lei 10.216/2001.", lei:["cp97","cp26"], fonte:STJJ },
{ id:"cnj-487", trib:"CNJ", tipo:"Resolução", num:"Resolução CNJ 487/2023", sec:"processo", status:"atencao", data:"15/02/2023",
  titulo:"Política Antimanicomial do Poder Judiciário",
  texto:"Institui a política antimanicomial no âmbito do Judiciário, priorizando o tratamento em rede de saúde mental e prevendo a desativação dos hospitais de custódia e tratamento psiquiátrico.",
  explica:"Há ações no STF questionando a resolução e prazos foram prorrogados — confira a situação atual antes da prova.", lei:["cp97"], fonte:CNJ }
],
cards:[
{ id:"ps1", tipo:"distincao", sec:"imputabilidade", f:"Imputabilidade × responsabilidade.", v:"<b>Imputabilidade</b>: capacidade psíquica de entender e de se determinar (avaliada pelo perito). <b>Responsabilidade</b>: consequência jurídica declarada pelo <b>juiz</b>.", lei:["cp26"] },
{ id:"ps2", tipo:"caso", sec:"imputabilidade", f:"Réu com esquizofrenia diagnosticada pratica furto planejado em período de remissão, entendendo o caráter ilícito. É inimputável?", v:"<b>Não necessariamente</b>: o critério é <b>biopsicológico</b> — exige incapacidade <b>ao tempo da conduta</b>. Diagnóstico não basta.", lei:["cp26"] },
{ id:"ps3", tipo:"caso", sec:"imputabilidade", f:"Semi-imputável: o juiz pode aplicar pena reduzida e também medida de segurança?", v:"<b>Não.</b> Sistema <b>vicariante</b>: ou pena reduzida (1/3 a 2/3), ou substituição por medida de segurança (CP, art. 98).", lei:["cp26"] },
{ id:"ps4", tipo:"distincao", sec:"imputabilidade", f:"Critério da inimputabilidade por doença mental × por menoridade.", v:"<b>Doença mental</b>: biopsicológico (art. 26). <b>Menoridade</b>: biológico puro (art. 27) — basta ter menos de 18.", lei:["cp27"] },
{ id:"ps5", tipo:"caso", sec:"modificadores", f:"Agente bebe por vontade própria até a embriaguez completa e agride alguém. Isento de pena?", v:"<b>Não.</b> Embriaguez voluntária não exclui a imputabilidade (art. 28, II — actio libera in causa).", lei:["cp28"] },
{ id:"ps6", tipo:"caso", sec:"modificadores", f:"Vítima de \"Boa noite, Cinderela\" fica completamente embriagada sem saber e, nesse estado, comete crime. Consequência?", v:"Embriaguez <b>acidental completa</b> (caso fortuito): <b>isenção de pena</b> (art. 28, §1º). Se incompleta: redução de 1/3 a 2/3 (§2º).", lei:["cp28"] },
{ id:"ps7", tipo:"caso", sec:"modificadores", f:"Agente bebe para criar coragem e matar o desafeto. Efeito?", v:"Embriaguez <b>preordenada</b>: não exclui e é <b>agravante</b> (art. 61, II, l).", lei:["cp28"] },
{ id:"ps8", tipo:"caso", sec:"processo", f:"Delegado suspeita de doença mental do indiciado. Pode determinar o exame de insanidade?", v:"<b>Não.</b> Representa ao <b>juiz</b>, que ordena o exame (CPP, art. 149, §1º).", lei:["cpp149"] },
{ id:"ps9", tipo:"numero", sec:"processo", f:"Prazo do exame de insanidade e efeito no processo.", v:"Até <b>45 dias</b>, prorrogável se os peritos demonstrarem necessidade; processo <b>suspenso</b>, com nomeação de <b>curador</b>.", lei:["cpp149"] },
{ id:"ps10", tipo:"numero", sec:"processo", f:"Medida de segurança: prazo mínimo e máximo.", v:"Mínimo de <b>1 a 3 anos</b> (art. 97, §1º); máximo = limite máximo da pena em abstrato (<b>Súmula 527/STJ</b>).", lei:["cp97"], j:["stj-s527"] },
{ id:"ps11", tipo:"caso", sec:"processo", f:"Inimputável pratica fato punido com reclusão, mas o laudo indica baixa periculosidade. Cabe tratamento ambulatorial?", v:"<b>Sim</b>, para o STJ (EREsp 998.128): conta a periculosidade, não só a espécie de pena.", lei:["cp97"], j:["stj-eresp998128"] },
{ id:"ps12", tipo:"caso", sec:"processo", f:"O réu adoece mentalmente depois do crime, durante o processo. O que acontece?", v:"Processo <b>suspenso</b> até o restabelecimento (CPP, art. 152) — é questão processual, não de imputabilidade.", lei:["cpp152"] },
{ id:"ps13", tipo:"ce", sec:"processo", f:"Certo ou errado: após o Estatuto da Pessoa com Deficiência, quem tem deficiência mental grave é absolutamente incapaz.", v:"<b>Errado.</b> Só os <b>menores de 16 anos</b> são absolutamente incapazes; quem não pode exprimir vontade é <b>relativamente</b> incapaz.", lei:["cc3"] },
{ id:"ps14", tipo:"distincao", sec:"transtornos", f:"Oligofrênico × demente (Esquirol).", v:"<b>Oligofrênico</b>: \"o pobre que sempre o foi\" — nunca desenvolveu a inteligência. <b>Demente</b>: \"o rico empobrecido\" — perdeu o que tinha.", lei:[] },
{ id:"ps15", tipo:"numero", sec:"transtornos", f:"Idiotia, imbecilidade, debilidade: idade mental (classificação clássica).", v:"Idiotia: até <b>3 anos</b>; imbecilidade: <b>3 a 7</b>; debilidade: <b>7 a 12</b>.", lei:[] },
{ id:"ps16", tipo:"caso", sec:"modificadores", f:"Crime sem motivo, sem premeditação, com ferocidade, múltiplos golpes e amnésia posterior. Que quadro a doutrina associa?", v:"Crime do <b>epiléptico</b> (Legrand du Saulle).", lei:[] }
],
importancia:{ nivel:5,
  texto:"Alta incidência: critério biopsicológico do art. 26, embriaguez do art. 28, incidente de insanidade, medida de segurança e capacidade civil pós Lei 13.146/2015.",
  decore:[
    ["Critério do art. 26","<b>biopsicológico</b>; menoridade é <b>biológico</b> (18 anos)"],
    ["Semi-imputabilidade (art. 26, par. único)","redução de <b>1/3 a 2/3</b> ou medida de segurança"],
    ["Emoção e paixão","<b>não excluem</b> a imputabilidade (art. 28, I)"],
    ["Embriaguez voluntária ou culposa","<b>não exclui</b>"],
    ["Embriaguez acidental completa","<b>isenta</b>; incompleta reduz <b>1/3 a 2/3</b>"],
    ["Exame de insanidade","até <b>45 dias</b>, prorrogáveis; juiz nomeia <b>curador</b>"],
    ["Quem ordena o exame","o <b>juiz</b>; delegado apenas representa"],
    ["Medida de segurança","mínimo de <b>1 a 3 anos</b>; limite máximo da pena (<b>Súmula 527/STJ</b>)"],
    ["Absolutamente incapaz (CC)","somente <b>menores de 16 anos</b>"],
    ["Doença superveniente ao crime","processo <b>suspenso</b> (CPP, art. 152)"]],
  macetes:[
    ["Biopsicológico = doença + incapacidade ao tempo do fato","Os dois requisitos juntos, no momento da conduta."],
    ["Vicariante: pena ou medida, nunca as duas","O semi-imputável recebe pena reduzida ou medida de segurança."],
    ["Só a embriaguez acidental alivia","Fortuito ou força maior. Voluntária e culposa não isentam."],
    ["Idiota, imbecil, débil: 25, 50, 70","Quanto maior o QI, mais próxima a imputabilidade (débil tende à semi-imputabilidade)."]] },
comparativo:{ titulo:"Inimputável × semi-imputável", head:["Inimputável (art. 26, caput)","Semi-imputável (art. 26, parágrafo único)"], rows:[
  ["<b>Requisito:</b> inteiramente incapaz de entender o ilícito ou de se determinar, ao tempo da conduta","<b>Requisito:</b> não era inteiramente capaz, por perturbação de saúde mental ou desenvolvimento incompleto ou retardado"],
  ["<b>Consequência:</b> isenção de pena","<b>Consequência:</b> pena reduzida de 1/3 a 2/3 ou medida de segurança"],
  ["<b>Sentença:</b> absolvição imprópria com medida de segurança","<b>Sentença:</b> condenação, com redução ou substituição (sistema vicariante)"],
  ["<b>Exemplos:</b> psicoses, idiotia e imbecilidade, embriaguez patológica","<b>Exemplos:</b> débil mental, transtornos de personalidade, embriaguez acidental incompleta"],
  ["<b>Culpabilidade:</b> excluída","<b>Culpabilidade:</b> mantida, porém diminuída"]]},
prova:[
  { tipo:"ce", enun:"O Código Penal adota o critério biopsicológico para a inimputabilidade por doença mental, exigindo que o agente, ao tempo da conduta, fosse inteiramente incapaz de entender o caráter ilícito do fato ou de se determinar de acordo com esse entendimento.", gab:"Certo", com:"É o art. 26, caput. Já a menoridade segue o critério biológico." },
  { tipo:"ce", enun:"A paixão e a emoção excluem a imputabilidade penal quando intensas.", gab:"Errado", com:"O art. 28, I, do CP dispõe que a emoção e a paixão não excluem a imputabilidade. Podem atenuar a pena ou privilegiar o crime." },
  { tipo:"ce", enun:"A embriaguez voluntária completa isenta de pena o agente que, ao tempo da ação, era inteiramente incapaz de entender o caráter ilícito do fato.", gab:"Errado", com:"Só a embriaguez acidental completa (caso fortuito ou força maior) isenta. A voluntária ou culposa não exclui a imputabilidade." },
  { tipo:"ce", enun:"O delegado de polícia pode ordenar, no inquérito, a realização de exame de insanidade mental do indiciado.", gab:"Errado", com:"Somente o juiz ordena o exame, na fase de inquérito mediante representação do delegado (CPP, art. 149)." },
  { tipo:"ce", enun:"Segundo a Súmula 527 do STJ, a medida de segurança não pode ultrapassar o limite máximo da pena abstratamente cominada ao delito.", gab:"Certo", com:"Súmula 527/STJ." },
  { tipo:"caso", enun:"Réu portador de esquizofrenia comete um crime em surto. Qual o resultado esperado se for comprovada a incapacidade ao tempo da conduta?", com:"Inimputabilidade (art. 26, caput): absolvição imprópria com aplicação de medida de segurança, e não pena." }],
resumo:[
  "<b>Imputabilidade</b> é a capacidade de entender o ilícito e de se determinar; a responsabilidade é declarada pelo juiz.",
  "Doença mental: critério <b>biopsicológico</b>, aferido ao tempo da conduta; menoridade (18 anos): critério <b>biológico</b>.",
  "Inimputável: medida de segurança; semi-imputável: pena reduzida de 1/3 a 2/3 <b>ou</b> medida de segurança (vicariante).",
  "Emoção e paixão <b>não excluem</b> a imputabilidade; embriaguez voluntária ou culposa não exclui; acidental completa isenta e incompleta reduz.",
  "Epiléptico: crime sem motivo, sem premeditação e sem remorso, com amnésia (Legrand du Saulle).",
  "Oligofrenias clássicas: idiotia, imbecilidade e debilidade mental; psicopata não perde o juízo de realidade.",
  "Incidente de insanidade: ordenado pelo juiz, com curador, até 45 dias; doença superveniente suspende o processo.",
  "Medida de segurança limitada pela pena máxima em abstrato (Súmula 527/STJ); absolutamente incapaz no CC é só o menor de 16 anos."],
checklist:[
  "Explicar o critério biopsicológico e diferenciá-lo do biológico.",
  "Distinguir inimputável de semi-imputável e as consequências de cada um.",
  "Aplicar o art. 28 do CP aos tipos de embriaguez, emoção e paixão.",
  "Descrever o crime do epiléptico segundo Legrand du Saulle.",
  "Classificar idiotia, imbecilidade e debilidade e distinguir oligofrênico de demente.",
  "Diferenciar psicose de transtorno de personalidade.",
  "Dizer quem pede e quem ordena o exame de insanidade, o prazo e o papel do curador.",
  "Citar a Súmula 527/STJ.",
  "Explicar a capacidade civil após a Lei 13.146/2015."],
questoes:[]
};

})();
