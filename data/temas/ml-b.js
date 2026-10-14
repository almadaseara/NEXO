/* Medicina Legal (II): traumatologia forense; tanatologia; lesões corporais (perícia do art. 129).
   Conferido em 14/10/2026. Texto legal: CP (arts. 121, §2º, III; 129; 209 a 212), CPP (arts. 162 a 168), CC (arts. 6º a 8º),
   Lei 9.434/1997 (art. 3º). Base didática: material de estudo PC-BA (Medicina Legal, aulas 5, 6 e 11). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

/* ======================= TRAUMATOLOGIA ======================= */
T.ml_traumatologia = {
meta:{ tema:"Traumatologia forense: energias, instrumentos e lesões", atualizado:AT,
  foco:"Classificação das energias vulnerantes; instrumentos mecânicos simples e compostos e suas feridas (leis de Filhós e Langer, cauda de escoriação, sinal de Chavigny, espectro equimótico); fraturas cranianas; projéteis de arma de fogo (orlas, zonas, distância do disparo, sinais de Hoffmann, Puppe-Werkgartner, Benassi, Bonnet, Romanese); energias físicas (calor, frio, eletricidade, pressão) e químicas (cáusticos e venenos)." },
secoes:[
{ id:"energias", titulo:"Energias vulnerantes e classificação dos instrumentos", curto:"Energias",
  rapido:["Energias: <b>mecânicas</b>, <b>físicas</b> (temperatura, eletricidade, pressão, radiação, luz, som), <b>químicas</b> (cáusticos, venenos), <b>físico-químicas</b> (asfixias), <b>bioquímicas</b> (perturbações alimentares, infecções), <b>biodinâmicas</b> (choque) e <b>mistas</b> (fadiga, sevícias).",
    "Instrumentos mecânicos <b>simples</b>: perfurante (ponta) → ferida <b>punctória</b>; cortante (gume) → <b>incisa</b>; contundente (superfície) → <b>contusa</b>.",
    "Instrumentos <b>compostos</b>: perfurocortante (ponta + gume) → <b>perfuroincisa</b>; cortocontundente (gume + peso) → <b>cortocontusa</b>; perfurocontundente (ponta romba + força, como o projétil) → <b>perfurocontusa</b>.",
    "Regra de prova: o nome da ferida termina em <b>-ória, -isa, -usa</b>; o do instrumento, em <b>-ante</b>."],
  teoria:[
    { h:"Mecanismos de ação", p:[
      "Ação <b>por pressão</b> (perfurantes), <b>por deslizamento</b> (cortantes), <b>por pressão e deslizamento</b> (perfurocortantes), <b>por pressão, deslizamento e percussão</b> (cortocontundentes) e <b>por compressão, tração, torção, explosão</b> (contundentes).",
      "Meio ativo (o instrumento atinge o corpo parado), passivo (o corpo vai de encontro ao instrumento, como na queda) ou misto."]}],
  quadro:{ titulo:"Instrumento → ferida", head:["Instrumento","Ação","Ferida","Exemplos"], rows:[
    ["Perfurante","Ponta (pressão)","Punctória ou puntiforme","Agulha, prego, furador de gelo"],
    ["Cortante","Gume (deslizamento)","Incisa","Navalha, bisturi, lâmina de barbear"],
    ["Contundente","Superfície","Contusa","Pau, pedra, soco, queda"],
    ["Perfurocortante","Ponta + gume","Perfuroincisa","Faca, punhal, peixeira"],
    ["Cortocontundente","Gume + peso","Cortocontusa","Machado, foice, facão, dentes"],
    ["Perfurocontundente","Ponta romba + energia","Perfurocontusa","Projétil de arma de fogo, ponteira de guarda-chuva"]]},
  pegadinhas:["Mordida é lesão <b>cortocontusa</b>.","Projétil de arma de fogo é <b>perfurocontundente</b>, não perfurante.","Faca de cozinha cravada = perfuroincisa; usada de raspão = incisa."]},
{ id:"simples", titulo:"Feridas punctórias, incisas e contusas", curto:"Simples",
  rapido:["<b>Punctórias</b> por instrumento de médio calibre seguem as <b>leis de Filhós</b> (forma de \"casa de botão\"; mesma direção onde as linhas de força têm um só sentido) e de <b>Langer</b> (na confluência de linhas de força, forma de ponta de seta ou triângulo).",
    "<b>Incisas</b>: comprimento <b>maior que a profundidade</b>, bordas regulares e afastadas, centro mais fundo, <b>cauda de escoriação</b> voltada para onde o golpe <b>terminou</b>, hemorragia abundante.",
    "<b>Contusas</b>: escoriação, equimose, hematoma, bossa, fraturas, luxações, rupturas; a ferida contusa tem bordas irregulares e <b>pontes de tecido</b> no fundo.",
    "Espectro equimótico de <b>Legrand du Saulle</b>: vermelho → violáceo → azul → esverdeado → amarelado → desaparece (por volta de 15 a 20 dias). A equimose <b>subconjuntival</b> permanece vermelha."],
  teoria:[
    { h:"Incisas especiais", p:[
      "<b>Esgorjamento</b>: ferida incisa na face <b>anterior</b> do pescoço; <b>degolamento</b>: na face <b>posterior</b>; <b>decapitação</b>: separação da cabeça.",
      "Suicídio por instrumento cortante: <b>lesões de hesitação</b> (várias incisões paralelas e superficiais) em regiões acessíveis (punhos, pescoço). Homicídio: <b>lesões de defesa</b> em mãos e antebraços.",
      "<b>Sinal de Chavigny</b>: quando duas feridas se cruzam, a segunda tem o trajeto interrompido, permitindo saber a ordem dos golpes."]},
    { h:"Contusões: o que diferencia cada uma", p:[
      "<b>Escoriação</b>: arrancamento da epiderme expondo a derme; cicatriza <b>sem deixar marca</b>; crosta serosa ou sero-hemática. É lesão <b>só de vida</b> quando há reação (crosta); post mortem fica apergaminhada.",
      "<b>Equimose</b>: sangue infiltrado nas malhas dos tecidos, sem formar cavidade; pode reproduzir a forma do instrumento (equimose figurada, estrias pneumáticas de Simonin). <b>Hematoma</b>: coleção de sangue em cavidade neoformada. <b>Bossa</b>: hematoma sobre plano ósseo (couro cabeludo).",
      "Fraturas cranianas: <b>em saca-bocado</b> de Strassmann (ação perpendicular de instrumento pequeno), <b>mapa-múndi</b> de Carrara (afundamento com fissuras em arcos e meridianos), <b>em terraço</b> de Hoffmann (ação tangencial)."]}],
  pegadinhas:["Cauda de escoriação aponta o <b>fim</b> do golpe (e o início é mais profundo).","Escoriação não deixa cicatriz; equimose não é coleção (isso é hematoma).","Esgorjamento = anterior; degolamento = posterior."]},
{ id:"paf", titulo:"Projéteis de arma de fogo", curto:"Arma de fogo",
  rapido:["Entrada: em regra <b>arredondada</b> (oval se oblíqua), bordas <b>invertidas</b>, com <b>orla de escoriação</b> (contusão), <b>orla de enxugo</b> (impurezas do projétil) e aréola equimótica — efeitos do <b>projétil</b>.",
    "Efeitos dos <b>resíduos do disparo</b> (só a curta distância): <b>zona de chamuscamento</b> (chama), <b>zona de esfumaçamento</b> (fuligem, <b>sai com lavagem</b> — \"falsa tatuagem\") e <b>zona de tatuagem</b> (grãos de pólvora incrustados, <b>não sai</b> com lavagem).",
    "Tiro <b>encostado</b>: <b>câmara de mina de Hoffmann</b> (sobre osso, gases descolam e explodem a pele, ferida estrelada), <b>sinal de Puppe-Werkgartner</b> (marca da boca do cano) e <b>sinal de Benassi</b> (fuligem na lâmina externa do osso).",
    "Saída: <b>irregular</b>, bordas <b>evertidas</b>, sem orlas nem zonas — exceto quando a pele está apoiada em anteparo (<b>sinal de Romanese</b>, que produz orla na saída)."],
  teoria:[
    { h:"Distância do disparo", p:[
      "<b>Encostado</b> (à queima-roupa no sentido técnico): os gases entram no trajeto — câmara de mina, Puppe-Werkgartner, Benassi; zonas pouco evidentes na pele porque tudo entra.",
      "<b>Curta distância</b>: dentro do alcance dos resíduos — chamuscamento, esfumaçamento e tatuagem ao redor da entrada. A <b>zona de tatuagem</b> é a melhor marcadora do limite dessa distância.",
      "<b>Longa distância</b> (ou à distância): só os efeitos do projétil (orla de escoriação, enxugo, aréola). Roupas podem <b>filtrar</b> os resíduos — por isso o exame das vestes é obrigatório (sinal de Lates e Toyo: fragmentos de pele levados pela bala às vestes)."]},
    { h:"Ossos e trajetos", p:[
      "<b>Sinal do funil de Bonnet</b> (cone truncado): no crânio, a entrada tem orifício menor na tábua externa e maior na interna (o cone se abre no sentido do disparo); na saída, ocorre o inverso.",
      "<b>Trajeto</b>: o caminho dentro do corpo. <b>Trajetória</b>: o caminho do projétil fora do corpo (da arma ao alvo).",
      "Um projétil pode entrar e sair de vários segmentos (ex.: coxa-escroto-coxa): várias entradas e saídas para uma só bala.",
      "Carga múltipla (chumbo): \"rosa de tiro\" — quanto mais distante, maior a dispersão."]}],
  quadro:{ titulo:"Entrada × saída", head:["Característica","Entrada","Saída"], rows:[
    ["Forma","Regular, arredondada ou oval","Irregular, estrelada, em fenda"],
    ["Bordas","Invertidas (para dentro)","Evertidas (para fora)"],
    ["Orla de escoriação e de enxugo","Presentes","Ausentes (exceto anteparo — Romanese)"],
    ["Zonas de tatuagem e esfumaçamento","Presentes a curta distância","Ausentes"],
    ["Crânio (funil de Bonnet)","Abre para a tábua interna","Abre para a tábua externa"]]},
  pegadinhas:["Esfumaçamento sai com água; tatuagem não.","Câmara de mina de Hoffmann exige plano ósseo próximo (crânio, esterno).","Ferida de saída costuma ser maior, mas a regra tem exceções — o critério seguro são as orlas e as bordas."]},
{ id:"fisicas", titulo:"Energias físicas e químicas", curto:"Físicas e químicas",
  rapido:["Queimaduras (classificação de Hofmann): <b>1º</b> eritema; <b>2º</b> flictena (bolha); <b>3º</b> escara; <b>4º</b> carbonização. Extensão: <b>regra dos nove</b> (Wallace).",
    "Eletricidade <b>industrial</b> → <b>eletroplessão</b>, com a <b>marca elétrica de Jellinek</b> (endurecida, branco-amarelada, indolor, não sangra). Eletricidade <b>cósmica</b> (raio) → <b>fulguração</b> (sobrevive) ou <b>fulminação</b> (morre), com o <b>sinal de Lichtenberg</b> (arborescências na pele).",
    "Frio: geladuras (eritema, flictenas, necrose); na morte por hipotermia, <b>manchas de Wischnewski</b> (erosões hemorrágicas na mucosa gástrica).",
    "Cáusticos <b>coagulantes</b> (ácidos: escara seca, endurecida) × <b>liquefacientes</b> (bases, como a soda: escara úmida, mole). <b>Vitriolagem</b>: lançar cáustico no rosto da vítima."],
  teoria:[
    { h:"Calor e pressão", p:[
      "Calor difuso: <b>insolação</b> (sol) e <b>intermação</b> (ambiente fechado e quente), as termonoses.",
      "No cadáver carbonizado, a <b>posição de boxeador</b> (de esgrimista) resulta da retração muscular pelo calor — não indica luta. Fuligem nas vias aéreas abaixo das cordas vocais e carboxiemoglobina elevada indicam que a vítima <b>respirava</b> durante o incêndio.",
      "<b>Sinal de Chambert</b>: a flictena produzida em vida tem líquido rico em albumina e leucócitos; a post mortem, pobre.",
      "Pressão atmosférica: mal das montanhas (baixa pressão) e doença descompressiva ou dos caixões (retorno rápido de alta pressão)."]},
    { h:"Venenos", p:[
      "Veneno: substância que, em pequena dose, altera a saúde ou mata. Envenenamento por meio <b>insidioso</b> qualifica o homicídio (CP, art. 121, §2º, III).",
      "Perícia toxicológica: coleta de vísceras, sangue, urina, humor vítreo; guardar material para contraprova (CPP, art. 170)."]}],
  pegadinhas:["Marca de Jellinek = eletricidade industrial; Lichtenberg = raio.","Posição de boxeador no carbonizado não prova briga.","Ácido coagula (escara seca); base liquefaz (escara mole)."]}
],
lei:[
{ art:"CP, art. 121, §2º, III", nome:"Meios que qualificam o homicídio", sec:"fisicas", itens:[
  { id:"cp121iii", rot:"Art. 121, §2º, III", t:"Se o homicídio é cometido: (...) III - com emprego de <b class='g1'>veneno, fogo, explosivo, asfixia, tortura ou outro meio insidioso ou cruel</b>, ou de que possa resultar perigo comum;", nota:"O laudo responde a quesito específico sobre o meio empregado.", c:["tr12","tr13"] }]},
{ art:"CPP, arts. 164, 165 e 175", nome:"Registro de lesões e exame dos instrumentos", sec:"energias", itens:[
  { id:"cpp165", rot:"Arts. 164, 165 e 175", t:"Art. 164. Os cadáveres serão <b class='g1'>sempre fotografados na posição em que forem encontrados</b>, bem como, na medida do possível, todas as lesões externas e vestígios deixados no local do crime.<br>Art. 165. Para representar as lesões encontradas no cadáver, os peritos, quando possível, juntarão ao laudo do exame <b class='g1'>provas fotográficas, esquemas ou desenhos</b>, devidamente rubricados.<br>Art. 175. Serão sujeitos a exame os <b class='g1'>instrumentos empregados</b> para a prática da infração, a fim de se lhes verificar a <b class='g1'>natureza e a eficiência</b>.", c:["tr1","tr14"], j:["stj-arma-pericia"] }]}
],
juris:[
{ id:"stj-arma-pericia", trib:"STJ", tipo:"Precedente (3ª Seção)", num:"EREsp 961.863/RS", sec:"paf", status:"vigente", data:"2010",
  titulo:"Majorante da arma no roubo dispensa apreensão e perícia",
  texto:"É prescindível a apreensão e a perícia da arma para a incidência da majorante do roubo, quando comprovado o seu emprego por outros meios de prova, como a palavra da vítima e de testemunhas.",
  explica:"O art. 175 do CPP não condiciona a majorante à perícia. Se a defesa alegar arma ineficaz ou de brinquedo, o ônus de provar é dela. O raciocínio não se aplica aos crimes de porte, em que a potencialidade lesiva integra o tipo.", lei:["cpp165"], fonte:STJJ }
],
cards:[
{ id:"tr1", tipo:"caso", sec:"energias", f:"Ferida produzida por machado. Classifique o instrumento e a ferida.", v:"Instrumento <b>cortocontundente</b>; ferida <b>cortocontusa</b>.", lei:["cpp165"] },
{ id:"tr2", tipo:"caso", sec:"energias", f:"Mordedura humana: que tipo de lesão?", v:"<b>Cortocontusa</b> (dentes atuam por gume e pressão).", lei:[] },
{ id:"tr3", tipo:"distincao", sec:"simples", f:"Leis de Filhós × lei de Langer.", v:"<b>Filhós</b>: perfurante de médio calibre faz ferida em <b>casa de botão</b>, com o maior eixo na direção das linhas de força. <b>Langer</b>: na <b>confluência</b> de linhas de força diferentes, a ferida toma forma de <b>ponta de seta</b> ou triângulo.", lei:[] },
{ id:"tr4", tipo:"caso", sec:"simples", f:"Ferida incisa no antebraço com cauda de escoriação voltada para o punho. Onde o golpe terminou?", v:"No <b>punho</b>: a cauda aponta o fim do movimento; o início é a parte mais profunda.", lei:[] },
{ id:"tr5", tipo:"numero", sec:"simples", f:"Espectro equimótico de Legrand du Saulle (ordem das cores).", v:"<b>Vermelho → violáceo → azul → esverdeado → amarelado</b>; desaparece em cerca de <b>15 a 20 dias</b>. Subconjuntival: fica vermelha.", lei:[] },
{ id:"tr6", tipo:"caso", sec:"simples", f:"Vítima com várias incisões paralelas e superficiais no punho esquerdo e uma profunda. Sugere o quê?", v:"<b>Lesões de hesitação</b>, típicas de <b>suicídio</b> (destro, punho esquerdo).", lei:[] },
{ id:"tr7", tipo:"caso", sec:"simples", f:"Crânio com fratura tangencial em degraus, com o fragmento solto para dentro. Nome?", v:"Fratura <b>em terraço de Hoffmann</b> (ação oblíqua). Perpendicular com orifício = saca-bocado de Strassmann; afundamento com fissuras radiadas = mapa-múndi de Carrara.", lei:[] },
{ id:"tr8", tipo:"distincao", sec:"paf", f:"Zona de tatuagem × zona de esfumaçamento.", v:"<b>Tatuagem</b>: grãos de pólvora incrustados — <b>não sai</b> com lavagem. <b>Esfumaçamento</b>: fuligem depositada — <b>sai</b> (\"falsa tatuagem\").", lei:[] },
{ id:"tr9", tipo:"caso", sec:"paf", f:"Ferida de entrada no crânio estrelada, com bordas descoladas e a marca do cano impressa na pele. Distância?", v:"Tiro <b>encostado</b>: câmara de mina de <b>Hoffmann</b> + sinal de <b>Puppe-Werkgartner</b>. Fuligem na lâmina externa do osso = sinal de <b>Benassi</b>.", lei:[] },
{ id:"tr10", tipo:"caso", sec:"paf", f:"Entrada só com orla de escoriação, orla de enxugo e aréola equimótica, sem tatuagem nem esfumaçamento, e a vítima estava de camiseta fina. Conclusão?", v:"Indica tiro a <b>distância</b> — mas cuidado: as <b>vestes podem filtrar</b> os resíduos; examine a roupa antes de concluir.", lei:[] },
{ id:"tr11", tipo:"caso", sec:"paf", f:"Orifício de saída com orla de escoriação: a vítima estava encostada na parede. Nome do sinal?", v:"<b>Sinal de Romanese</b> (anteparo na saída).", lei:[] },
{ id:"tr12", tipo:"distincao", sec:"fisicas", f:"Fulguração × fulminação × eletroplessão.", v:"<b>Fulguração</b>: raio, vítima sobrevive. <b>Fulminação</b>: raio, morte. <b>Eletroplessão</b>: eletricidade industrial (marca de Jellinek).", lei:["cp121iii"] },
{ id:"tr13", tipo:"caso", sec:"fisicas", f:"Cadáver carbonizado com fuligem na traqueia e brônquios e carboxiemoglobina alta. Estava vivo no incêndio?", v:"<b>Sim</b>: são sinais de <b>reação vital</b> (respirava). Se o fogo foi meio do homicídio, qualifica (art. 121, §2º, III).", lei:["cp121iii"] },
{ id:"tr14", tipo:"caso", sec:"paf", f:"No crânio, o orifício é menor na tábua externa e maior na interna. Entrada ou saída?", v:"<b>Entrada</b> (funil de Bonnet abrindo no sentido do disparo).", lei:["cpp165"] }
],
questoes:[]
};

/* ======================= TANATOLOGIA ======================= */
T.ml_tanatologia = {
meta:{ tema:"Tanatologia: morte, fenômenos cadavéricos e cronotanatognose", atualizado:AT,
  foco:"Conceitos e espécies de morte; morte encefálica (Lei 9.434/1997 e Resolução CFM 2.173/2017); sinais abióticos imediatos e consecutivos; fenômenos transformativos destrutivos e conservadores; cronotanatognose; lesões intra vitam × post mortem; comoriência e premoriência; causa jurídica da morte; necropsia, exumação e crimes contra o respeito aos mortos." },
secoes:[
{ id:"morte", titulo:"Conceito, espécies e diagnóstico da morte", curto:"Morte",
  rapido:["Hoje o critério legal é a <b>morte encefálica</b>: parada total e irreversível das funções do encéfalo, constatada por <b>dois médicos</b> não ligados às equipes de transplante, com critérios do CFM (Lei 9.434, art. 3º).",
    "Resolução CFM 2.173/2017: dois exames clínicos por médicos diferentes, <b>teste de apneia</b> e exame complementar; intervalo mínimo entre os exames de <b>1 hora</b> acima de 2 anos (12 h de 2 a 24 meses; 24 h de 7 dias a 2 meses).",
    "<b>Morte aparente</b>: funções vitais mínimas, reversível (asfixia, choque elétrico, hipotermia). <b>Morte real</b>: irreversível.",
    "Morte <b>súbita</b> (inesperada, em quem parecia sadio), <b>agônica</b> (precedida de agonia), <b>natural</b>, <b>violenta</b> (homicídio, suicídio, acidente) e <b>suspeita</b>."],
  teoria:[
    { h:"Sinais de morte", p:[
      "<b>Abióticos imediatos</b> (só de probabilidade): perda da consciência, insensibilidade, imobilidade e atonia, parada respiratória e circulatória. Provas antigas: espelho, vela, <b>Bouchut</b> (ausculta cardíaca prolongada), <b>Magnus</b> (ligadura do dedo não produz cianose no morto), <b>Icard</b> (fluoresceína injetada não se difunde).",
      "<b>Abióticos consecutivos</b> (tardios): desidratação (perda de peso, pergaminhamento da pele, dessecamento de mucosas, <b>mancha da esclerótica de Sommer-Larcher</b>, turvação da córnea), resfriamento, livores e rigidez.",
      "<b>Transformativos</b>: só eles dão <b>certeza</b> — autólise, putrefação, maceração (destrutivos); mumificação, saponificação, calcificação, corificação, congelação (conservadores)."]}],
  pegadinhas:["Sinais imediatos são de <b>probabilidade</b>; a certeza vem com os consecutivos e transformativos.","Morte encefálica: dois médicos <b>fora</b> da equipe de transplante.","Morte aparente pode reverter; por isso a autópsia espera 6 horas, salvo evidência."]},
{ id:"fenomenos", titulo:"Fenômenos cadavéricos e cronotanatognose", curto:"Fenômenos",
  rapido:["<b>Resfriamento</b> (algor mortis): cerca de <b>0,5 °C/h nas 3 primeiras horas</b> e depois cerca de <b>1 °C/h</b> até o equilíbrio com o ambiente. Obesos e vestidos esfriam mais devagar; crianças e magros, mais rápido.",
    "<b>Livores</b> (hipóstases): surgem entre <b>30 min e 2-3 h</b> nas partes declives; <b>fixam-se entre 8 e 12 h</b> — antes disso, mudam de lugar se o corpo for movido. Poupam as áreas de compressão.",
    "<b>Rigidez</b> (rigor mortis) — <b>lei de Nysten</b>: face, mandíbula e nuca (1-2 h) → membros superiores (2-4 h) → tórax e abdome (4-6 h) → membros inferiores (6-8 h); desfaz-se na mesma ordem, a partir de cerca de 24-36 h.",
    "<b>Mancha verde abdominal</b>: primeiro sinal da putrefação, <b>18 a 24 h</b>, na <b>fossa ilíaca direita</b> (ceco); no afogado, começa na cabeça e parte superior do tórax."],
  teoria:[
    { h:"Espasmo cadavérico", p:[
      "Rigidez <b>instantânea</b>, sem o relaxamento que precede a rigidez comum: fixa a última atitude em vida (a arma na mão do suicida, soldados mortos em posição de tiro).",
      "Associado a morte súbita com grande descarga nervosa (lesões do sistema nervoso, emoção violenta). Diferente da rigidez comum, que é progressiva."]},
    { h:"Putrefação: as quatro fases", p:[
      "<b>Cromática</b>: mancha verde abdominal (sulfometa-hemoglobina) que se espalha.",
      "<b>Gasosa</b>: enfisema putrefativo, inchaço (aspecto gigantesco), língua e olhos protrusos, flictenas, <b>circulação póstuma de Brouardel</b> (desenho venoso arborescente), posição de lutador.",
      "<b>Coliquativa</b>: dissolução pútrida das partes moles, com a fauna cadavérica (legiões de Mégnin).",
      "<b>Esqueletização</b>: em média alguns anos, conforme solo e clima.",
      "<b>Cristais de Westenhöffer-Rocha-Valverde</b> (fosfato amoníaco-magnesiano) no sangue putrefeito: aparecem em torno do 3º dia."]},
    { h:"Conservadores e maceração", p:[
      "<b>Mumificação</b>: desidratação rápida — clima quente, seco e ventilado; pele de pergaminho.",
      "<b>Saponificação</b> (adipocera): ambiente úmido, argiloso, pouco ventilado; gordura vira substância de cera ou sabão.",
      "<b>Calcificação</b>: feto morto retido que se calcifica (litopédio). <b>Corificação</b>: pele com aspecto de couro em caixões metálicos fechados.",
      "<b>Maceração</b>: em meio líquido — <b>asséptica</b> (feto morto retido no útero) ou <b>séptica</b> (afogados)."]},
    { h:"Outros meios de estimar o tempo de morte", p:[
      "Conteúdo gástrico (estado da digestão), potássio no humor vítreo, entomologia forense (sucessão de insetos), estado da córnea.",
      "Nenhum método isolado é exato: a estimativa é sempre um intervalo, combinando vários fenômenos e as condições do ambiente."]}],
  quadro:{ titulo:"Cronotanatognose — valores didáticos médios", head:["Fenômeno","Início","Marco","Observação"], rows:[
    ["Resfriamento","Logo após a morte","≈0,5 °C/h (3 h) e ≈1 °C/h depois","Depende do ambiente, roupas e massa corporal"],
    ["Livores","30 min a 2-3 h","Fixação: 8 a 12 h","Mudam de lugar se o corpo é movido antes de fixar"],
    ["Rigidez","1-2 h (mandíbula)","Generalizada ≈8 h","Desfaz-se a partir de ≈24-36 h, na mesma ordem (Nysten)"],
    ["Mancha verde","18-24 h","Fossa ilíaca direita","Afogado: cabeça e tórax"],
    ["Circulação póstuma","Fase gasosa","Desenho venoso de Brouardel","Após o 2º-3º dia"]]},
  pegadinhas:["Livor que <b>não muda</b> com a mudança de posição = já fixado (mais de 8-12 h).","Livor em local não declive indica que o corpo foi <b>movido</b> depois da fixação.","Os números variam entre autores: a banca costuma usar França."]},
{ id:"vital", titulo:"Lesões intra vitam × post mortem; comoriência", curto:"Reação vital",
  rapido:["Lesão <b>em vida</b> mostra <b>reação vital</b>: infiltração hemorrágica, coagulação, retração das bordas, crosta, equimose, inflamação, embolia.",
    "<b>Prova de Verderau</b>: relação entre <b>leucócitos e hemácias</b> no sangue da lesão (maior em vida). <b>Sinal de Donné</b>: incoagulabilidade do sangue como sinal de morte (não absoluto).",
    "<b>Comoriência</b> (CC, art. 8º): mortos na mesma ocasião sem se saber quem morreu antes → <b>presunção de morte simultânea</b> (não herdam entre si). <b>Premoriência</b>: provado quem morreu primeiro.",
    "Causa <b>jurídica</b> da morte: natural, homicídio, suicídio, acidente ou indeterminada. Esganadura é sempre <b>homicida</b>."],
  teoria:[
    { h:"Por que a comoriência importa", p:[
      "Sem prova de quem morreu primeiro, os comorientes não herdam um do outro: cada patrimônio vai para os próprios herdeiros.",
      "O perito tenta estabelecer a ordem pelas lesões e pelos fenômenos cadavéricos; não conseguindo, aplica-se a presunção legal."]}],
  pegadinhas:["Comoriência é presunção de morte <b>simultânea</b>, não de ordem de idade.","Fuligem nas vias aéreas = respirava = vivo no incêndio."]},
{ id:"cadaver", titulo:"Necropsia, exumação e direitos sobre o cadáver", curto:"Cadáver",
  rapido:["Necropsia: <b>no mínimo 6 h</b> após o óbito, salvo evidência dos sinais de morte (CPP, art. 162). Basta exame externo em morte violenta sem infração a apurar.",
    "Exumação: dia e hora marcados, auto circunstanciado; administrador do cemitério que se recusa a indicar a sepultura comete <b>desobediência</b> (CPP, art. 163).",
    "Crimes contra o respeito aos mortos: impedir cerimônia funerária (209), <b>violar sepultura</b> (210), <b>destruir, subtrair ou ocultar cadáver</b> (211), <b>vilipendiar cadáver</b> ou cinzas (212).",
    "Cremação de vítima de morte violenta exige <b>autorização judicial</b> (Lei 6.015, art. 77, §2º)."],
  teoria:[
    { h:"Morte presumida", p:[
      "CC, art. 6º: a existência termina com a morte; presume-se a dos ausentes quando a lei autoriza a sucessão definitiva.",
      "CC, art. 7º: morte presumida <b>sem decretação de ausência</b> se for extremamente provável a morte de quem estava em perigo de vida, ou de desaparecido em campanha ou prisioneiro não encontrado até 2 anos após o fim da guerra — a sentença fixa a data provável do falecimento, depois de esgotadas as buscas."]}],
  pegadinhas:["Ocultação de cadáver (211) é crime permanente enquanto o corpo estiver escondido (efeito na prescrição).","Vilipêndio (212) alcança também as <b>cinzas</b>."]}
],
lei:[
{ art:"Lei 9.434/1997, art. 3º", nome:"Morte encefálica", sec:"morte", itens:[
  { id:"l9434a3", rot:"Art. 3º, caput", t:"A retirada post mortem de tecidos, órgãos ou partes do corpo humano destinados a transplante ou tratamento deverá ser precedida de diagnóstico de <b class='g1'>morte encefálica</b>, constatada e registrada por <b class='g2'>dois médicos</b> <b class='g3'>não participantes das equipes de remoção e transplante</b>, mediante a utilização de critérios clínicos e tecnológicos definidos por resolução do Conselho Federal de Medicina.", nota:"Critérios atuais: Resolução CFM 2.173/2017.", c:["tn1"] }]},
{ art:"CC, arts. 6º a 8º", nome:"Fim da personalidade e comoriência", sec:"vital", itens:[
  { id:"cc8", rot:"Art. 8º", t:"Se dois ou mais indivíduos falecerem <b class='g1'>na mesma ocasião</b>, <b class='g3'>não se podendo averiguar se algum dos comorientes precedeu aos outros</b>, presumir-se-ão <b class='g1'>simultaneamente mortos</b>.", c:["tn9"] },
  { id:"cc7", rot:"Arts. 6º e 7º", t:"Art. 6º A existência da pessoa natural <b class='g1'>termina com a morte</b>; presume-se esta, quanto aos ausentes, nos casos em que a lei autoriza a abertura de sucessão definitiva.<br>Art. 7º Pode ser declarada a <b class='g1'>morte presumida, sem decretação de ausência</b>: I - se for <b class='g1'>extremamente provável</b> a morte de quem estava em perigo de vida; II - se alguém, desaparecido em campanha ou feito prisioneiro, não for encontrado até <b class='g2'>dois anos</b> após o término da guerra.<br>Parágrafo único. A declaração da morte presumida, nesses casos, somente poderá ser requerida <b class='g3'>depois de esgotadas as buscas e averiguações</b>, devendo a sentença fixar a data provável do falecimento.", c:["tn10"] }]},
{ art:"CP, arts. 209 a 212", nome:"Crimes contra o respeito aos mortos", sec:"cadaver", itens:[
  { id:"cp211", rot:"Arts. 210 a 212", t:"Art. 210 - <b class='g1'>Violar ou profanar sepultura</b> ou urna funerária:<br>Pena - reclusão, de <b class='g2'>um a três anos, e multa</b>.<br>Art. 211 - <b class='g1'>Destruir, subtrair ou ocultar cadáver</b> ou parte dele:<br>Pena - reclusão, de <b class='g2'>um a três anos, e multa</b>.<br>Art. 212 - <b class='g1'>Vilipendiar cadáver ou suas cinzas</b>:<br>Pena - detenção, de <b class='g2'>um a três anos, e multa</b>.", c:["tn11","tn12"], j:["stj-ocultacao"] }]}
],
juris:[
{ id:"stj-ocultacao", trib:"STJ/STF", tipo:"Jurisprudência", num:"CP, art. 211", sec:"cadaver", status:"atencao", data:"reiterada",
  titulo:"Ocultação de cadáver é crime permanente",
  texto:"Na modalidade ocultar, a consumação se prolonga enquanto o cadáver permanece escondido; a prescrição só corre a partir do momento em que cessa a permanência (CP, art. 111, III).",
  explica:"Entendimento predominante na doutrina e nos tribunais superiores; o tema voltou ao debate no STF em casos da ditadura militar (relação com a Lei de Anistia). Confira o estado atual.", lei:["cp211"], fonte:STFJ },
{ id:"stf-adpf54", trib:"STF", tipo:"ADPF", num:"ADPF 54", sec:"morte", status:"vigente", data:"12/04/2012",
  titulo:"Anencefalia: interrupção da gestação não é aborto",
  texto:"É inconstitucional interpretação segundo a qual a interrupção da gravidez de feto anencéfalo é conduta tipificada nos arts. 124, 126 e 128, I e II, do Código Penal.",
  explica:"Um dos fundamentos foi o paralelo com o critério de <b>morte encefálica</b> da Lei 9.434: o anencéfalo não tem potencialidade de vida extrauterina.", lei:["l9434a3"], fonte:STFJ }
],
cards:[
{ id:"tn1", tipo:"caso", sec:"morte", f:"Morte encefálica de doador: quem atesta?", v:"<b>Dois médicos</b>, <b>não participantes</b> das equipes de remoção e transplante, com os critérios do CFM (Lei 9.434, art. 3º; Res. CFM 2.173/2017).", lei:["l9434a3"], j:["stf-adpf54"] },
{ id:"tn2", tipo:"distincao", sec:"morte", f:"Sinais abióticos imediatos × consecutivos × transformativos.", v:"<b>Imediatos</b>: probabilidade (inconsciência, parada cardiorrespiratória). <b>Consecutivos</b>: desidratação, resfriamento, livores, rigidez. <b>Transformativos</b>: certeza (putrefação, mumificação etc.).", lei:[] },
{ id:"tn3", tipo:"numero", sec:"fenomenos", f:"Lei de Nysten: ordem e tempos da rigidez.", v:"Mandíbula, face e nuca <b>1-2 h</b> → membros superiores <b>2-4 h</b> → tórax/abdome <b>4-6 h</b> → membros inferiores <b>6-8 h</b>. Desfaz-se na mesma ordem.", lei:[] },
{ id:"tn4", tipo:"caso", sec:"fenomenos", f:"Corpo encontrado de bruços, mas com livores fixos nas costas. O que se conclui?", v:"O corpo foi <b>movido</b> depois da fixação dos livores (mais de 8-12 h após a morte).", lei:[] },
{ id:"tn5", tipo:"caso", sec:"fenomenos", f:"Mancha verde abdominal na fossa ilíaca direita, sem gases. Tempo provável?", v:"Cerca de <b>18 a 24 h</b> (fase cromática). No afogado, a mancha começa na cabeça e tórax.", lei:[] },
{ id:"tn6", tipo:"distincao", sec:"fenomenos", f:"Espasmo cadavérico × rigidez cadavérica.", v:"<b>Espasmo</b>: instantâneo, sem relaxamento prévio, fixa a última atitude (arma na mão). <b>Rigidez</b>: progressiva, após relaxamento, segue Nysten.", lei:[] },
{ id:"tn7", tipo:"distincao", sec:"fenomenos", f:"Mumificação × saponificação.", v:"<b>Mumificação</b>: ambiente quente, seco e ventilado (desidratação). <b>Saponificação</b>: ambiente úmido, argiloso, pouco ventilado (adipocera).", lei:[] },
{ id:"tn8", tipo:"caso", sec:"fenomenos", f:"Desenhos venosos arborescentes na pele de cadáver inchado. Nome e fase?", v:"<b>Circulação póstuma de Brouardel</b> — fase <b>gasosa</b> da putrefação.", lei:[] },
{ id:"tn9", tipo:"caso", sec:"vital", f:"Pai e filho morrem no mesmo acidente e não se sabe quem morreu primeiro. Um herda do outro?", v:"<b>Não.</b> Presumem-se <b>simultaneamente mortos</b> (comoriência, CC art. 8º).", lei:["cc8"] },
{ id:"tn10", tipo:"caso", sec:"vital", f:"Passageiro de avião que caiu no mar; corpo não encontrado. É preciso decretar ausência?", v:"<b>Não.</b> Morte presumida sem ausência (CC, art. 7º, I), depois de esgotadas as buscas; a sentença fixa a data provável.", lei:["cc7"] },
{ id:"tn11", tipo:"caso", sec:"cadaver", f:"Homicida enterra a vítima em local ermo. Além do homicídio, que crime?", v:"<b>Ocultação de cadáver</b> (art. 211), crime permanente enquanto oculto.", lei:["cp211"], j:["stj-ocultacao"] },
{ id:"tn12", tipo:"caso", sec:"cadaver", f:"Pessoa espalha as cinzas de um morto em local imundo para humilhar a família. Crime?", v:"<b>Vilipêndio a cadáver</b> (art. 212), que alcança também as <b>cinzas</b>.", lei:["cp211"] },
{ id:"tn13", tipo:"caso", sec:"vital", f:"Qual prova compara leucócitos e hemácias no sangue da lesão para saber se ela foi produzida em vida?", v:"<b>Prova de Verderau</b> (a proporção de leucócitos é maior na lesão vital).", lei:[] }
],
questoes:[]
};

/* ======================= LESÕES CORPORAIS (PERÍCIA) ======================= */
T.ml_lesoes_corporais = {
meta:{ tema:"Lesões corporais: a perícia do art. 129", atualizado:AT,
  foco:"Leitura médico-legal de cada resultado do art. 129: leve, grave (incapacidade por mais de 30 dias, perigo de vida, debilidade, aceleração de parto), gravíssima (incapacidade permanente para o trabalho, enfermidade incurável, perda ou inutilização, deformidade permanente, aborto) e seguida de morte; quesitos oficiais e exame complementar.",
  aviso:"As penas e os parágrafos de violência doméstica, gênero e facção estão no tema Penal \"Lesão corporal\" — aqui o foco é a perícia." },
secoes:[
{ id:"leves", titulo:"Ofensa à integridade e à saúde; lesão leve", curto:"Leve",
  rapido:["Lesão corporal = <b>dano anatômico</b> (integridade) ou <b>funcional</b> (saúde física ou mental). Dor sem lesão = <b>vias de fato</b>.",
    "Lesão <b>leve</b> é residual: não produz nenhum resultado dos §§1º a 3º (ex.: escoriações, equimoses, pequenas feridas).",
    "Os <b>quesitos oficiais</b> acompanham o texto do art. 129: há ofensa? qual o instrumento? houve meio insidioso ou cruel? incapacidade por mais de 30 dias? perigo de vida? debilidade? aceleração de parto? incapacidade permanente, enfermidade incurável, perda ou inutilização? deformidade? aborto?",
    "Equimose isolada e eritema transitório são achados de lesão leve; eritema sem lesão pode ser só vias de fato."],
  teoria:[
    { h:"Saúde mental", p:[
      "Também é lesão a ofensa à saúde <b>psíquica</b> (ex.: transtorno de estresse pós-traumático provocado), desde que comprovada pericialmente.",
      "Contaminação dolosa com doença pode ser lesão (inclusive gravíssima, se incurável)."]}],
  pegadinhas:["Lesão leve é infração de menor potencial ofensivo (salvo violência doméstica: Lei 9.099 afastada pela Lei Maria da Penha).","A dor sozinha não é lesão."]},
{ id:"graves", titulo:"Lesão grave (§1º)", curto:"Grave",
  rapido:["<b>Incapacidade para as ocupações habituais por mais de 30 dias</b>: qualquer atividade habitual lícita (não só trabalho). Exige <b>exame complementar logo após o 30º dia</b> (CPP, art. 168, §2º).",
    "<b>Perigo de vida</b>: probabilidade <b>concreta e imediata</b> de morte, demonstrada por dados objetivos (choque hemorrágico, lesão de órgão vital) — não basta a sede da lesão nem a mera possibilidade.",
    "<b>Debilidade permanente</b>: enfraquecimento duradouro de <b>membro, sentido ou função</b> (ex.: perda de um olho ou de um rim — órgãos duplos —, perda parcial de movimento).",
    "<b>Aceleração de parto</b>: nascimento <b>com vida</b> antes do termo, por causa da lesão; o agente precisa conhecer a gravidez."],
  teoria:[
    { h:"Pontos de perícia", p:[
      "O exame complementar feito <b>antes</b> do 30º dia não comprova incapacidade superior a 30 dias; sua falta pode ser suprida por testemunhas (art. 168, §3º).",
      "\"Permanente\" não é perpétuo: basta duração longa e incerta, sem previsão de recuperação.",
      "<b>Membro</b>: braços e pernas. <b>Sentido</b>: visão, audição, olfato, paladar, tato. <b>Função</b>: atividade de um órgão ou aparelho (mastigatória, respiratória, reprodutora).",
      "Perda de dentes: a doutrina e parte da jurisprudência tratam como possível <b>debilidade da função mastigatória</b>, conforme o número e a função afetada — avalia-se no caso concreto."]}],
  pegadinhas:["\"Ocupações habituais\" ≠ trabalho: criança e aposentado também podem ter incapacidade.","Perder um olho = <b>debilidade</b> (sobra o outro); ficar cego dos dois = <b>perda</b> da função (gravíssima).","Perigo de vida exige risco <b>concreto</b>, demonstrado."]},
{ id:"gravissimas", titulo:"Lesão gravíssima (§2º) e seguida de morte (§3º)", curto:"Gravíssima",
  rapido:["<b>Incapacidade permanente para o trabalho</b>: para o trabalho em geral, segundo a corrente majoritária.",
    "<b>Enfermidade incurável</b>: doença sem cura pelos recursos médicos atuais (ou cura só por meio de procedimento arriscado que a vítima não é obrigada a aceitar).",
    "<b>Perda ou inutilização</b> de membro, sentido ou função: perda = mutilação ou amputação; inutilização = o membro fica, mas não funciona. Ex.: castração, cegueira bilateral, surdez total.",
    "<b>Deformidade permanente</b>: dano <b>estético</b> visível, relevante e duradouro, capaz de causar má impressão; <b>aborto</b> como resultado <b>culposo</b> da lesão."],
  teoria:[
    { h:"Deformidade permanente", p:[
      "Leva em conta a vítima concreta (sexo, idade, profissão) e o grau de visibilidade; prevalece que pode estar em parte não exposta do corpo.",
      "Cirurgia reparadora posterior: a vítima não é obrigada a se submeter; prevalece que não afasta a qualificadora já configurada — tema discutido, confira a posição da banca.",
      "Cicatrizes extensas no rosto, perda de orelha ou de nariz são exemplos clássicos."]},
    { h:"Seguida de morte", p:[
      "Preterdolo: dolo na lesão e culpa na morte. Se o agente quis ou assumiu o risco da morte, é homicídio.",
      "A perícia estabelece o <b>nexo causal</b> entre a lesão e o óbito (inclusive concausas)."]}],
  quadro:{ titulo:"Grave × gravíssima — os pares que a banca troca", head:["Bem afetado","§1º — grave","§2º — gravíssima"], rows:[
    ["Capacidade","Incapacidade para ocupações habituais por mais de 30 dias","Incapacidade permanente para o trabalho"],
    ["Membro, sentido ou função","Debilidade permanente","Perda ou inutilização"],
    ["Gestação","Aceleração de parto (nasce vivo)","Aborto"],
    ["Saúde","Perigo de vida","Enfermidade incurável"],
    ["Estética","—","Deformidade permanente"]]},
  pegadinhas:["Aceleração de parto: nasce <b>vivo</b>; aborto: morre o feto.","Inutilização parcial = debilidade (grave), não gravíssima.","Deformidade é critério <b>estético</b>, não funcional."]}
],
lei:[
{ art:"CP, art. 129", nome:"Resultados da lesão corporal", sec:"graves", itens:[
  { id:"cp129c", rot:"Art. 129, caput", t:"<b class='g1'>Ofender a integridade corporal ou a saúde de outrem</b>:<br>Pena - detenção, de <b class='g2'>três meses a um ano</b>.", c:["lc1","lc2"] },
  { id:"cp129p1", rot:"Art. 129, §1º", t:"Lesão corporal de natureza grave<br>§ 1º Se resulta:<br>I - <b class='g1'>Incapacidade para as ocupações habituais, por mais de trinta dias</b>;<br>II - <b class='g1'>perigo de vida</b>;<br>III - <b class='g1'>debilidade permanente</b> de membro, sentido ou função;<br>IV - <b class='g1'>aceleração de parto</b>:<br>Pena - reclusão, de <b class='g2'>um a cinco anos</b>.", c:["lc3","lc4","lc5","lc6","lc7"] },
  { id:"cp129p2", rot:"Art. 129, §2º", t:"§ 2º Se resulta:<br>I - <b class='g1'>Incapacidade permanente para o trabalho</b>;<br>II - <b class='g1'>enfermidade incurável</b>;<br>III - <b class='g1'>perda ou inutilização</b> do membro, sentido ou função;<br>IV - <b class='g1'>deformidade permanente</b>;<br>V - <b class='g1'>aborto</b>:<br>Pena - reclusão, de <b class='g2'>dois a oito anos</b>.", c:["lc5","lc8","lc9","lc10"] },
  { id:"cp129p3", rot:"Art. 129, §3º", t:"Lesão corporal seguida de morte<br>§ 3º Se resulta morte e as circunstâncias evidenciam que o agente <b class='g3'>não quis o resultado, nem assumiu o risco de produzi-lo</b>:<br>Pena - reclusão, de <b class='g2'>quatro a doze anos</b>.", nota:"Há forma especial (§3º-A) para facção, milícia ou grupo paramilitar — ver o tema Penal.", c:["lc11"] }]},
{ art:"CPP, art. 168", nome:"Exame complementar", sec:"graves", itens:[
  { id:"cpp168l", rot:"Art. 168, §§2º e 3º", t:"§ 2º Se o exame tiver por fim precisar a classificação do delito no art. 129, § 1º, I, do Código Penal, deverá ser feito <b class='g2'>logo que decorra o prazo de 30 dias</b>, contado da data do crime.<br>§ 3º A falta de exame complementar poderá ser <b class='g3'>suprida pela prova testemunhal</b>.", c:["lc3"] }]}
],
juris:[],
cards:[
{ id:"lc1", tipo:"caso", sec:"leves", f:"Tapa no rosto que só causou dor, sem vermelhidão duradoura. Lesão?", v:"<b>Não</b>: sem dano anatômico ou funcional, é <b>vias de fato</b> (LCP, art. 21).", lei:["cp129c"] },
{ id:"lc2", tipo:"caso", sec:"leves", f:"Vítima com escoriações no braço que sararam em uma semana. Classificação?", v:"<b>Lesão leve</b> (art. 129, caput): nenhum resultado dos §§1º a 3º.", lei:["cp129c"] },
{ id:"lc3", tipo:"caso", sec:"graves", f:"Exame complementar feito no 20º dia afirma que a vítima ficará afastada por 40 dias. Comprova a lesão grave?", v:"<b>Não</b> como prova da incapacidade: o exame deve ser feito <b>após</b> o 30º dia (CPP, art. 168, §2º). A falta pode ser suprida por testemunhas (§3º).", lei:["cp129p1","cpp168l"] },
{ id:"lc4", tipo:"caso", sec:"graves", f:"Aposentado fica 45 dias sem conseguir andar após agressão. Há incapacidade para ocupações habituais?", v:"<b>Sim.</b> Ocupações habituais são quaisquer atividades lícitas do dia a dia, não só o trabalho.", lei:["cp129p1"] },
{ id:"lc5", tipo:"distincao", sec:"graves", f:"Perda de um olho × cegueira dos dois olhos.", v:"Um olho: <b>debilidade</b> permanente da visão (§1º, III — grave). Os dois: <b>perda</b> do sentido (§2º, III — gravíssima).", lei:["cp129p1","cp129p2"] },
{ id:"lc6", tipo:"caso", sec:"graves", f:"Facada no tórax, atendida a tempo, sem lesão de órgãos nem choque. O laudo pode afirmar perigo de vida só pela região atingida?", v:"<b>Não.</b> Perigo de vida exige risco <b>concreto</b> demonstrado por dados clínicos, não só a sede da lesão.", lei:["cp129p1"] },
{ id:"lc7", tipo:"caso", sec:"graves", f:"Agressor sabe da gravidez; a vítima dá à luz um bebê vivo com 34 semanas por causa da agressão. Resultado?", v:"<b>Aceleração de parto</b> (§1º, IV — grave). Se o feto morresse, seria aborto (§2º, V).", lei:["cp129p1"] },
{ id:"lc8", tipo:"caso", sec:"gravissimas", f:"Vítima fica com cicatriz extensa e visível no rosto. Resultado?", v:"<b>Deformidade permanente</b> (§2º, IV — gravíssima): dano estético relevante e duradouro.", lei:["cp129p2"] },
{ id:"lc9", tipo:"distincao", sec:"gravissimas", f:"Perda × inutilização × debilidade.", v:"<b>Perda</b>: o membro/sentido/função deixa de existir (amputação). <b>Inutilização</b>: existe, mas não funciona. <b>Debilidade</b>: funciona, mas enfraquecido.", lei:["cp129p2"] },
{ id:"lc10", tipo:"caso", sec:"gravissimas", f:"Agressão dolosa contamina a vítima com doença sem cura conhecida. Resultado?", v:"<b>Enfermidade incurável</b> (§2º, II — gravíssima).", lei:["cp129p2"] },
{ id:"lc11", tipo:"caso", sec:"gravissimas", f:"Soco que derruba a vítima, que bate a cabeça e morre. O agente não quis nem aceitou a morte. Crime e papel da perícia?", v:"<b>Lesão seguida de morte</b> (§3º — preterdolo). O laudo demonstra o <b>nexo causal</b> entre a lesão e a morte.", lei:["cp129p3"] }
],
questoes:[]
};

})();
