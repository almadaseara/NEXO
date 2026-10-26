/* Direito Penal — Crimes contra a Pessoa (II): art. 122, infanticídio e aborto.
   Conferido em 14/10/2026. Texto legal: Código Penal (Planalto), Leis 13.968/2019 e 14.811/2024. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

/* ======================= ART. 122 ======================= */
T.penal_pessoa_04 = {
meta:{ tema:"Induzimento, instigação ou auxílio a suicídio ou a automutilação (art. 122)", atualizado:AT,
  foco:"Condutas, crime formal desde 2019, formas qualificadas pelo resultado, vítima sem discernimento (§§6º e 7º), majorantes digitais e hediondez." },
secoes:[
{ id:"tipo", titulo:"Condutas e consumação", curto:"Tipo",
  rapido:["Induzir (fazer nascer a ideia), instigar (reforçar ideia existente) ou prestar <b>auxílio material</b> a alguém para se suicidar ou se automutilar: reclusão de <b>6 meses a 2 anos</b>.",
    "Desde a Lei 13.968/2019 é crime <b>formal</b>: consuma-se com o induzimento, a instigação ou o auxílio, ainda que a vítima nada faça. Lesão grave/gravíssima e morte viraram qualificadoras.",
    "Vítima deve ser <b>pessoa determinada</b> e ter alguma capacidade de resistência. Incentivo genérico (site que exalta o suicídio) não configura o crime."],
  teoria:[
    { h:"Natureza e sujeitos", p:[
      "Suicídio e automutilação não são crimes (alteridade). Por isso quem auxilia não é partícipe: é <b>autor</b> do art. 122.",
      "Crime comum, doloso (a doutrina discute o dolo eventual, ex.: expulsar de casa filha com histórico de ameaças de suicídio). Não há forma culposa.",
      "Auxílio material deve ser acessório: se o agente executa o ato que mata (ex.: aperta o gatilho a pedido da vítima), é homicídio, não art. 122."]},
    { h:"Júri só para o suicídio", p:[
      "A modalidade suicídio é crime doloso contra a vida (júri). A automutilação ofende a integridade física: juiz singular.",
      "Ação penal: pública incondicionada."]}
  ],
  pegadinhas:["Antes de 2019 o crime só existia se houvesse morte ou lesão grave. Hoje, consuma-se sem resultado.","Roleta-russa e pacto de morte: o sobrevivente que apenas instigou responde pelo 122; se praticou o ato executório contra o outro, homicídio."]},
{ id:"qualificadoras", titulo:"Resultados e vítima vulnerável (§§1º, 2º, 6º e 7º)", curto:"Qualificadoras",
  rapido:["Lesão grave ou gravíssima (§1º): <b>1 a 3 anos</b>. Morte (§2º): <b>2 a 6 anos</b>.",
    "Vítima <b>menor de 14</b> ou sem discernimento/sem capacidade de resistência: se resulta <b>lesão gravíssima</b>, responde por <b>lesão gravíssima</b> (129, §2º); se resulta <b>morte</b>, por <b>homicídio</b> (§§6º e 7º)."],
  teoria:[
    { h:"Escada de resultados", p:[
      "Vítima com capacidade de resistência: 122 simples (nada acontece ou lesão leve), §1º (grave/gravíssima) ou §2º (morte).",
      "Vítima menor de 14 ou sem discernimento: o legislador manda responder pelo crime de dano — lesão gravíssima (129, §2º) ou homicídio (121). Se resultar só lesão grave (não gravíssima), continua o 122, §1º, com a pena duplicada do §3º, II."]},
  ],
  quadro:{ titulo:"O que o agente responde", head:["Resultado","Vítima comum","Vítima menor de 14 ou sem discernimento"], rows:[
    ["Nenhum / lesão leve","122, caput (6m a 2a)","122, caput (pena duplicada — §3º, II)"],
    ["Lesão grave","122, §1º (1 a 3)","122, §1º com §3º, II"],
    ["Lesão gravíssima","122, §1º (1 a 3)","Lesão gravíssima — 129, §2º (§6º)"],
    ["Morte","122, §2º (2 a 6)","Homicídio — art. 121 (§7º)"]]},
  pegadinhas:["O §6º só fala em lesão <b>gravíssima</b>; lesão grave em vítima vulnerável continua no 122."]},
{ id:"majorantes", titulo:"Pena duplicada, ambiente digital e líder de grupo (§§3º a 5º)", curto:"Majorantes",
  rapido:["Pena <b>duplicada</b>: motivo egoístico, torpe ou fútil; vítima menor ou com resistência diminuída. <b>Até o dobro</b>: pela internet, rede social ou em tempo real. <b>Em dobro</b>: líder, coordenador ou administrador de grupo/comunidade/rede virtual."],
  teoria:[
    { h:"Pena duplicada (§3º)", p:[
      "§3º: a pena é <b>duplicada</b> se o crime é praticado por motivo egoístico, torpe ou fútil, ou se a vítima é <b>menor</b> ou tem diminuída, por qualquer causa, a capacidade de resistência.",
      "\"Menor\" no §3º, II: prevalece o menor de 18 (e maior de 14, porque abaixo disso aplicam-se os §§6º e 7º em caso de gravíssima ou morte)."]},
    { h:"Ambiente digital e hediondez", p:[
      "§4º (até o dobro): conduta pela rede de computadores, rede social ou transmitida em tempo real — desafios on-line como os do tipo \"baleia azul\".",
      "§5º (Lei 14.811/2024): pena <b>em dobro</b> para líder, coordenador, administrador de grupo, comunidade ou rede virtual, ou quem por eles é responsável. Antes, o aumento era de metade: a mudança é mais grave e não retroage.",
      "A forma do caput e do §4º (pela internet ou em tempo real) é <b>hedionda</b> (Lei 8.072, art. 1º, X)."]}
  ],
  pegadinhas:["§4º = aumento ATÉ o dobro (variável). §5º = pena EM dobro (fixa)."]}
],
lei:[
{ art:"CP, art. 122, caput", nome:"Induzimento, instigação ou auxílio a suicídio ou a automutilação", sec:"tipo", itens:[
  { id:"cp122", rot:"Art. 122, caput", t:"<b class='g1'>Induzir ou instigar</b> alguém a suicidar-se ou a praticar automutilação ou prestar-lhe <b class='g1'>auxílio material</b> para que o faça:<br>Pena - reclusão, de <b class='g2'>6 (seis) meses a 2 (dois) anos</b>.", c:["sa1","sa2","sa3","sa4"] }
]},
{ art:"CP, art. 122, §§1º, 2º, 6º e 7º", nome:"Resultados e vítima vulnerável", sec:"qualificadoras", itens:[
  { id:"cp122q", rot:"Art. 122, §§1º e 2º", t:"§ 1º Se da automutilação ou da tentativa de suicídio resulta <b class='g1'>lesão corporal de natureza grave ou gravíssima</b>, nos termos dos §§ 1º e 2º do art. 129 deste Código:<br>Pena - reclusão, de <b class='g2'>1 (um) a 3 (três) anos</b>.<br>§ 2º Se o suicídio se consuma ou se da automutilação resulta <b class='g1'>morte</b>:<br>Pena - reclusão, de <b class='g2'>2 (dois) a 6 (seis) anos</b>.", c:["sa10"] },
  { id:"cp122v", rot:"Art. 122, §§6º e 7º", t:"§ 6º Se o crime de que trata o § 1º deste artigo resulta em <b class='g1'>lesão corporal de natureza gravíssima</b> e é cometido contra <b class='g3'>menor de 14 (quatorze) anos</b> ou contra quem, por enfermidade ou deficiência mental, não tem o necessário discernimento para a prática do ato, ou que, por qualquer outra causa, não pode oferecer resistência, responde o agente pelo crime descrito no <b class='g2'>§ 2º do art. 129</b> deste Código.<br>§ 7º Se o crime de que trata o § 2º deste artigo é cometido contra <b class='g3'>menor de 14 (quatorze) anos</b> ou contra quem não tem o necessário discernimento para a prática do ato, ou que, por qualquer outra causa, não pode oferecer resistência, responde o agente pelo crime de <b class='g2'>homicídio</b>, nos termos do art. 121 deste Código.", c:["sa8","sa9"] }
]},
{ art:"CP, art. 122, §§3º a 5º", nome:"Pena duplicada e ambiente digital", sec:"majorantes", itens:[
  { id:"cp122m", rot:"Art. 122, §§3º a 5º", t:"§ 3º A pena é <b class='g2'>duplicada</b>:<br>I - se o crime é praticado por motivo <b class='g1'>egoístico, torpe ou fútil</b>;<br>II - se a vítima é <b class='g1'>menor</b> ou tem diminuída, por qualquer causa, a capacidade de resistência.<br>§ 4º A pena é aumentada <b class='g2'>até o dobro</b> se a conduta é realizada por meio da <b class='g1'>rede de computadores, de rede social ou transmitida em tempo real</b>.<br>§ 5º Aplica-se a pena <b class='g2'>em dobro</b> se o autor é <b class='g1'>líder, coordenador ou administrador de grupo, de comunidade ou de rede virtual</b>, ou por estes é responsável.", nota:"§5º com redação da Lei 14.811/2024 (antes: aumento de metade).", novo:true, c:["sa5","sa6","sa7"] }
]}
],
juris:[
{ id:"stf-adi-122-jur", trib:"Doutrina/Jurisprudência", tipo:"Entendimento consolidado", num:"Competência", sec:"tipo", status:"vigente", data:"",
  titulo:"Automutilação não é crime doloso contra a vida", texto:"Com a Lei 13.968/2019, o art. 122 passou a abranger condutas que atingem a integridade física (automutilação). Apenas a modalidade relacionada ao suicídio é crime doloso contra a vida, de competência do Tribunal do Júri (CF, art. 5º, XXXVIII, d).",
  explica:"Entendimento amplamente adotado pela doutrina. Para a prova, guarde: suicídio → júri; automutilação → juiz singular.", lei:["cp122"], fonte:STJJ }
],
cards:[
{ id:"sa1", tipo:"distincao", sec:"tipo", f:"Induzir × instigar × auxiliar.", v:"<b>Induzir</b>: criar a ideia. <b>Instigar</b>: reforçar ideia que já existe. <b>Auxiliar</b>: ajuda material (ex.: fornecer a arma), sem executar o ato.", lei:["cp122"] },
{ id:"sa2", tipo:"caso", sec:"tipo", f:"A convence B (adulto) a se matar. B desiste e não faz nada. Há crime?", v:"<b>Sim, consumado</b> (122, caput). Desde 2019 o crime é formal.", lei:["cp122"] },
{ id:"sa3", tipo:"caso", sec:"tipo", f:"Site exalta o suicídio e incita \"os jovens\" a se matarem, sem alvo definido. Há o art. 122?", v:"<b>Não.</b> Exige vítima <b>determinada</b>. Incentivo genérico não configura o tipo.", lei:["cp122"] },
{ id:"sa4", tipo:"caso", sec:"tipo", f:"A vítima pede e A dispara a arma contra a cabeça dela. Art. 122?", v:"<b>Não — homicídio.</b> Quem pratica o ato executório da morte mata; o 122 é só induzir, instigar ou auxiliar.", lei:["cp122"] },
{ id:"sa5", tipo:"distincao", sec:"majorantes", f:"§4º × §5º do art. 122.", v:"<b>§4º</b>: até o dobro se pela internet, rede social ou em tempo real. <b>§5º</b>: em dobro se o autor lidera, coordena ou administra grupo/comunidade/rede virtual.", lei:["cp122m"] },
{ id:"sa6", tipo:"ce", sec:"majorantes", f:"Certo ou errado: o art. 122 praticado em transmissão ao vivo é hediondo.", v:"<b>Certo.</b> Lei 8.072, art. 1º, X (caput e §4º do art. 122).", lei:["cp122m"] },
{ id:"sa7", tipo:"caso", sec:"majorantes", f:"Administrador de grupo de WhatsApp de \"desafios\" instiga um membro a se automutilar (2025). Pena?", v:"Art. 122 com pena <b>em dobro</b> (§5º, Lei 14.811/2024); se a instigação foi pela rede, também o §4º (até o dobro). Forma hedionda.", lei:["cp122m"] },
{ id:"sa8", tipo:"caso", sec:"qualificadoras", f:"A induz criança de 12 anos a pular do telhado; ela morre. Qual crime?", v:"<b>Homicídio</b> (art. 122, §7º): vítima menor de 14 e resultado morte.", lei:["cp122v"] },
{ id:"sa9", tipo:"caso", sec:"qualificadoras", f:"A induz adolescente de 13 anos a se automutilar; resulta lesão <b>grave</b> (não gravíssima). Qual crime?", v:"<b>Art. 122, §1º</b>, com a pena duplicada (§3º, II). O §6º só desloca para o 129 quando a lesão é <b>gravíssima</b>.", lei:["cp122v","cp122m"] },
{ id:"sa10", tipo:"numero", sec:"qualificadoras", f:"Penas do art. 122: simples, lesão grave/gravíssima e morte.", v:"<b>6m a 2a</b>; <b>1 a 3</b>; <b>2 a 6</b> (reclusão).", lei:["cp122","cp122q"] },
{ id:"sa11", tipo:"distincao", sec:"tipo", f:"Art. 122: quando vai ao júri?", v:"Só na modalidade <b>suicídio</b> (crime doloso contra a vida). Automutilação: juiz singular.", lei:["cp122"], j:["stf-adi-122-jur"] }
],
importancia:{ nivel:4,
  texto:"Tipo reformado em 2019 e em 2024. A banca cobra o crime formal, a escada de resultados, o deslocamento para os arts. 129 e 121 quando a vítima é vulnerável, as majorantes digitais e o júri apenas na modalidade suicídio.",
  decore:[
    ["Caput","reclusão de <b>6 meses a 2 anos</b>; crime <b>formal</b>"],
    ["Lesão grave ou gravíssima (§1º)","<b>1 a 3 anos</b>"],
    ["Morte (§2º)","<b>2 a 6 anos</b>"],
    ["§3º","pena <b>duplicada</b>: motivo egoístico, torpe ou fútil; vítima menor ou com resistência diminuída"],
    ["§4º","aumento <b>até o dobro</b>: rede de computadores, rede social ou tempo real"],
    ["§5º","pena <b>em dobro</b>: líder, coordenador ou administrador de grupo, comunidade ou rede virtual"],
    ["§6º","vítima menor de 14 ou sem discernimento e lesão <b>gravíssima</b>: art. 129, §2º"],
    ["§7º","vítima menor de 14 ou sem discernimento e morte: <b>homicídio</b> (art. 121)"],
    ["Competência","júri só na modalidade <b>suicídio</b>; automutilação, juiz singular"],
    ["Hediondez","caput e §4º por rede de computadores, rede social ou em tempo real (Lei 8.072, art. 1º, X)"]],
  macetes:[
    ["Escada de resultados","Nada ou lesão leve: caput. Grave ou gravíssima: §1º. Morte: §2º."],
    ["Menor de 14: some o 122 se gravíssima ou morte","Lesão gravíssima vira art. 129, §2º; morte vira homicídio. Lesão grave (não gravíssima) continua no 122, §1º, com a pena duplicada."],
    ["§4º varia, §5º dobra","§4º: aumento <b>até</b> o dobro. §5º: pena <b>em</b> dobro, para o líder ou administrador do grupo."],
    ["Quem executa mata","Quem aperta o gatilho a pedido da vítima pratica homicídio. O art. 122 só pune induzir, instigar ou auxiliar materialmente."]] },
comparativo:{ titulo:"Qualificado pelo resultado × majorado (art. 122)", head:["Qualificado pelo resultado (§§1º e 2º)","Majorado (§§3º a 5º)"], rows:[
  ["<b>O que faz:</b> novo patamar de pena conforme o que acontece com a vítima: 1 a 3 anos (lesão grave ou gravíssima) ou 2 a 6 anos (morte)","<b>O que faz:</b> multiplica a pena já fixada: duplicada (§3º), até o dobro (§4º) ou em dobro (§5º)"],
  ["<b>Natureza:</b> objetiva; depende do resultado","<b>Natureza:</b> o §3º, I é subjetivo (motivo egoístico, torpe ou fútil); o §3º, II, o §4º e o §5º são objetivos (vítima, meio digital, posição do autor)"],
  ["<b>Vítima menor de 14 ou sem discernimento:</b> os §§6º e 7º deslocam para o art. 129, §2º (lesão gravíssima) ou para o art. 121 (morte)","<b>Vítima menor ou sem resistência:</b> o §3º, II duplica a pena nos demais casos, inclusive na lesão grave, que continua no art. 122, §1º"],
  ["<b>Hediondez:</b> depende do meio, não do resultado","<b>Hediondez:</b> o caput e o §4º, quando por rede de computadores, rede social ou em tempo real, são hediondos"]]},
prova:[
  { tipo:"ce", enun:"Desde a Lei 13.968/2019, o crime do art. 122 é formal e se consuma com o induzimento, a instigação ou o auxílio, ainda que a vítima nada faça.", gab:"Certo", com:"Antes de 2019 era preciso morte ou lesão grave. Hoje lesão grave, gravíssima e morte são qualificadoras." },
  { tipo:"ce", enun:"Site que incita genericamente os jovens ao suicídio, sem pessoa determinada, configura o crime do art. 122.", gab:"Errado", com:"O tipo exige vítima determinada. Incentivo genérico não configura o crime." },
  { tipo:"ce", enun:"O agente que, a pedido da vítima, dispara a arma contra ela pratica induzimento ao suicídio.", gab:"Errado", com:"Quem pratica o ato executório da morte comete homicídio. O art. 122 só pune induzir, instigar ou auxiliar materialmente." },
  { tipo:"ce", enun:"Induzida por terceiro, criança de 12 anos pula do telhado e morre. O agente responde pelo art. 122, §2º.", gab:"Errado", com:"Vítima menor de 14 e resultado morte: responde por homicídio (art. 122, §7º)." },
  { tipo:"ce", enun:"O administrador de grupo virtual que instiga membro à automutilação tem a pena aumentada em metade, nos termos do art. 122, §5º.", gab:"Errado", com:"Desde a Lei 14.811/2024 a pena é aplicada em dobro (antes era aumento de metade). Mudança mais grave, não retroage." },
  { tipo:"caso", enun:"Um adolescente de 13 anos é induzido a se automutilar e sofre lesão corporal grave, não gravíssima. Qual o enquadramento?", com:"Art. 122, §1º, com pena duplicada pelo §3º, II. O §6º só desloca para o art. 129, §2º quando a lesão é gravíssima." }],
resumo:[
  "Induzir (fazer nascer a ideia), instigar (reforçar) ou auxiliar materialmente quem vai se suicidar ou se automutilar: 6 meses a 2 anos.",
  "Crime formal desde 2019. O auxílio material é acessório: quem executa o ato que mata responde por homicídio.",
  "Vítima precisa ser pessoa determinada e ter alguma capacidade de resistência.",
  "Qualificado pelo resultado: lesão grave ou gravíssima (1 a 3) e morte (2 a 6).",
  "Vítima menor de 14 ou sem discernimento: lesão gravíssima vira art. 129, §2º; morte vira homicídio.",
  "Pena duplicada (§3º); até o dobro pela internet ou em tempo real (§4º); em dobro para líder ou administrador de grupo (§5º, Lei 14.811/2024).",
  "Hediondo quando praticado por rede de computadores, rede social ou em tempo real.",
  "Júri: só o suicídio. Automutilação: juiz singular. Não existe forma culposa."],
checklist:[
  "Dizer as penas do caput, do §1º e do §2º",
  "Explicar por que o crime é formal desde 2019",
  "Distinguir induzir, instigar e auxiliar, e o auxílio do ato executório",
  "Aplicar os §§6º e 7º à vítima menor de 14 ou sem discernimento",
  "Diferenciar o §4º (até o dobro) do §5º (em dobro)",
  "Dizer quando o art. 122 é hediondo",
  "Dizer quando vai a júri"],
questoes:[]
};

/* ======================= INFANTICÍDIO ======================= */
T.penal_pessoa_05 = {
meta:{ tema:"Infanticídio (art. 123)", atualizado:AT,
  foco:"Elementares (mãe, estado puerperal, próprio filho, durante ou logo após o parto), concurso de pessoas, erro sobre a pessoa e distinções com homicídio e abandono de recém-nascido." },
secoes:[
{ id:"tipo", titulo:"Elementares e consumação", curto:"Tipo",
  rapido:["Matar, <b>sob a influência do estado puerperal</b>, o <b>próprio filho</b>, <b>durante o parto ou logo após</b>: detenção de <b>2 a 6 anos</b>.",
    "Crime <b>próprio</b> (só a mãe), mas o estado puerperal é <b>elementar</b> e se comunica a coautores e partícipes que o conheçam (art. 30).",
    "Só doloso. A mãe que, em estado puerperal, mata o filho por culpa responde por <b>homicídio culposo</b>."],
  teoria:[
    { h:"Estado puerperal e tempo", p:[
      "O estado puerperal precisa <b>influenciar</b> a conduta (nexo entre o estado e o crime). Não há prazo fixo para \"logo após\": a perícia avalia, no caso concreto, se a mãe ainda estava sob essa influência.",
      "O parto marca a fronteira: antes do seu início, a morte do feto é aborto; durante ou logo após o parto, sob influência do puerpério, infanticídio; fora disso, homicídio."]},
    { h:"Concurso de pessoas", p:[
      "Prevalece que o terceiro que ajuda a mãe, ciente de sua condição, responde por <b>infanticídio</b> (a condição de mãe e o estado puerperal são elementares). Crítica doutrinária: o benefício seria injusto ao terceiro, mas a letra do art. 30 conduz a essa solução.",
      "Se o terceiro executa sozinho a morte, a pedido da mãe puérpera: parte da doutrina mantém infanticídio para ambos; outra parte imputa homicídio ao terceiro e infanticídio à mãe (participação). Em prova objetiva, a regra geral cobrada é a comunicação da elementar."]},
    { h:"Erro sobre a pessoa", p:[
      "Mãe em estado puerperal que mata o bebê do berço ao lado, achando ser o seu: responde por <b>infanticídio</b> (art. 20, §3º — consideram-se as qualidades da vítima pretendida)."]}
  ],
  quadro:{ titulo:"Infanticídio × figuras próximas", head:["Situação","Crime"], rows:[
    ["Mãe mata o feto antes do início do parto","Aborto (art. 124)"],
    ["Mãe, sob influência do estado puerperal, mata o filho durante ou logo após o parto","Infanticídio (art. 123)"],
    ["Mãe mata o filho sem influência do puerpério","Homicídio (qualificado — vítima menor de 14)"],
    ["Mãe abandona o recém-nascido para ocultar desonra, sem dolo de matar","Exposição ou abandono de recém-nascido (art. 134)"],
    ["Mãe em estado puerperal causa a morte do filho por culpa","Homicídio culposo (art. 121, §3º)"]]},
  pegadinhas:["Pena de detenção (não reclusão), de 2 a 6 anos.","O infanticídio vai a júri (crime doloso contra a vida) e admite tentativa."]}
],
lei:[
{ art:"CP, art. 123", nome:"Infanticídio", sec:"tipo", itens:[
  { id:"cp123", rot:"Art. 123", t:"Matar, <b class='g1'>sob a influência do estado puerperal</b>, o <b class='g1'>próprio filho</b>, <b class='g3'>durante o parto ou logo após</b>:<br>Pena - detenção, de <b class='g2'>dois a seis anos</b>.", c:["if1","if2","if3","if4","if5","if6"] }
]},
{ art:"CP, art. 30 e art. 20, §3º", nome:"Regras de apoio", sec:"tipo", itens:[
  { id:"cp30-if", rot:"Art. 30", t:"<b class='g3'>Não se comunicam</b> as circunstâncias e as condições de caráter pessoal, <b class='g3'>salvo quando elementares do crime</b>.", c:["if2"] },
  { id:"cp20-if", rot:"Art. 20, §3º", t:"O <b class='g1'>erro quanto à pessoa</b> contra a qual o crime é praticado não isenta de pena. Não se consideram, neste caso, as condições ou qualidades da vítima, senão as <b class='g1'>da pessoa contra quem o agente queria praticar o crime</b>.", c:["if4"] }
]}
],
juris:[],
cards:[
{ id:"if1", tipo:"lacuna", sec:"tipo", f:"Infanticídio: matar, sob a influência do ______, o próprio filho, ______.", v:"<b>estado puerperal</b>; <b>durante o parto ou logo após</b>", lei:["cp123"] },
{ id:"if2", tipo:"caso", sec:"tipo", f:"O pai entrega a faca à mãe, que, sob o estado puerperal, mata o recém-nascido. Crime do pai?", v:"<b>Infanticídio</b> (partícipe): estado puerperal e condição de mãe são elementares e se comunicam (art. 30).", lei:["cp123","cp30-if"] },
{ id:"if3", tipo:"caso", sec:"tipo", f:"Mãe em estado puerperal, por descuido, deixa o bebê cair; ele morre. Qual crime?", v:"<b>Homicídio culposo.</b> Não existe infanticídio culposo.", lei:["cp123"] },
{ id:"if4", tipo:"caso", sec:"tipo", f:"Na maternidade, a puérpera mata, por engano, o bebê de outra mãe, achando ser o dela.", v:"<b>Infanticídio</b> — erro sobre a pessoa (art. 20, §3º).", lei:["cp123","cp20-if"] },
{ id:"if5", tipo:"distincao", sec:"tipo", f:"Infanticídio × aborto: qual é o marco?", v:"O <b>início do parto</b>. Antes: aborto. Durante ou logo após, sob o puerpério: infanticídio.", lei:["cp123"] },
{ id:"if6", tipo:"numero", sec:"tipo", f:"Pena do infanticídio.", v:"Detenção de <b>2 a 6 anos</b>.", lei:["cp123"] },
{ id:"if7", tipo:"ce", sec:"tipo", f:"Certo ou errado: o \"logo após\" do art. 123 tem prazo fixo de 48 horas.", v:"<b>Errado.</b> Não há prazo legal; depende de a mãe ainda estar sob influência do estado puerperal (perícia).", lei:["cp123"] }
],
importancia:{ nivel:4,
  texto:"Crime especial e privilegiado em relação ao homicídio. A banca cobra as elementares, a comunicação ao partícipe (art. 30), a ausência de forma culposa e o marco com o aborto.",
  decore:[
    ["Pena","detenção de <b>2 a 6 anos</b>"],
    ["Elementares","mãe, <b>estado puerperal</b>, próprio filho, durante o parto ou logo após"],
    ["Marco com o aborto","<b>início do parto</b>: antes, aborto; durante ou logo após, infanticídio"],
    ["Prazo do “logo após”","<b>não há prazo legal</b>; depende da influência do estado puerperal (perícia)"],
    ["Terceiro que ajuda a mãe","responde por <b>infanticídio</b> (elementares se comunicam, art. 30)"],
    ["Forma culposa","<b>não existe</b>: culpa da mãe em estado puerperal é homicídio culposo"],
    ["Erro sobre a pessoa","vale a vítima visada (art. 20, §3º)"],
    ["Competência","<b>júri</b>; admite tentativa"],
    ["Mãe sem influência do puerpério","<b>homicídio</b> (qualificado, se vítima menor de 14)"],
    ["Abandono de recém-nascido (art. 134)","para ocultar desonra própria; detenção de 6 meses a 2 anos"]],
  macetes:[
    ["Parto é a fronteira","Antes do parto: aborto. Durante ou logo após, sob o puerpério: infanticídio. Sem puerpério: homicídio."],
    ["Elementar comunica","O estado puerperal e a condição de mãe são elementares e passam ao terceiro que os conhece e colabora."],
    ["Não há qualificadora nem majorante","O art. 123 tem pena própria e não tem forma qualificada: é tipo especial em relação ao homicídio."]] },
comparativo:{ titulo:"Infanticídio × homicídio", head:["Infanticídio (art. 123)","Homicídio (art. 121)"], rows:[
  ["<b>Autora:</b> só a mãe (crime próprio)","<b>Autor:</b> qualquer pessoa"],
  ["<b>Condição:</b> sob a influência do estado puerperal, elementar do tipo","<b>Condição:</b> não exige estado especial"],
  ["<b>Tempo:</b> durante o parto ou logo após","<b>Tempo:</b> qualquer momento da vida extrauterina"],
  ["<b>Pena:</b> detenção de 2 a 6 anos","<b>Pena:</b> reclusão; simples de 6 a 20 anos; qualificado de 12 a 30 anos"],
  ["<b>Culposo:</b> não existe; a mãe em puerpério que mata por culpa responde por homicídio culposo","<b>Culposo:</b> existe (art. 121, §3º)"],
  ["<b>Qualificadoras e majorantes:</b> o tipo não as prevê","<b>Qualificadoras e majorantes:</b> as dos §§2º e 4º, conforme o caso"]]},
prova:[
  { tipo:"ce", enun:"O estado puerperal é elementar do infanticídio e se comunica ao terceiro que, sabendo dele, auxilia a mãe a matar o recém-nascido.", gab:"Certo", com:"Art. 30: as elementares se comunicam. Prevalece que o terceiro responde por infanticídio." },
  { tipo:"ce", enun:"A expressão “logo após o parto” do art. 123 corresponde a um prazo fixo de 48 horas.", gab:"Errado", com:"Não há prazo legal. A perícia verifica se a mãe ainda estava sob a influência do estado puerperal." },
  { tipo:"ce", enun:"A mãe que, em estado puerperal, deixa o bebê cair por descuido e provoca sua morte responde por infanticídio culposo.", gab:"Errado", com:"Não existe infanticídio culposo. A mãe responde por homicídio culposo." },
  { tipo:"ce", enun:"A pena do infanticídio é de reclusão de 2 a 6 anos.", gab:"Errado", com:"A pena é de detenção, de 2 a 6 anos." },
  { tipo:"caso", enun:"Na maternidade, a puérpera, sob influência do estado puerperal, mata por engano o bebê de outra mulher, achando que era o seu filho. Qual o crime?", com:"Infanticídio. No erro sobre a pessoa consideram-se as qualidades da vítima pretendida (art. 20, §3º)." },
  { tipo:"ce", enun:"A mãe que mata o filho recém-nascido por motivo alheio ao estado puerperal responde por infanticídio, por ser a autora e a vítima o próprio filho.", gab:"Errado", com:"Faltando a influência do estado puerperal, falta elementar do tipo: o crime é homicídio." }],
resumo:[
  "Infanticídio é matar, sob a influência do estado puerperal, o próprio filho, durante o parto ou logo após: detenção de 2 a 6 anos.",
  "Crime próprio, mas as elementares (mãe e estado puerperal) se comunicam a quem concorre e as conhece (art. 30).",
  "Só doloso. Culpa da mãe puérpera é homicídio culposo.",
  "O início do parto separa o aborto do infanticídio. Sem influência do puerpério, o crime é homicídio.",
  "Não há prazo fixo para o “logo após”: a análise é do caso concreto.",
  "Erro sobre a pessoa não afasta o infanticídio (art. 20, §3º).",
  "Crime doloso contra a vida: júri. Admite tentativa.",
  "Abandono de recém-nascido para ocultar desonra, sem dolo de matar: art. 134."],
checklist:[
  "Enumerar as elementares do infanticídio",
  "Explicar a comunicação ao partícipe pelo art. 30",
  "Diferenciar infanticídio, homicídio e aborto pelo momento e pelo puerpério",
  "Dizer a pena e a natureza da pena (detenção)",
  "Explicar por que não há infanticídio culposo",
  "Distinguir infanticídio de abandono de recém-nascido (art. 134)"],
questoes:[]
};

/* ======================= ABORTO ======================= */
T.penal_pessoa_06 = {
meta:{ tema:"Aborto (arts. 124 a 128)", atualizado:AT,
  foco:"Autoaborto e consentimento, aborto por terceiro com e sem consentimento, exceção pluralista, formas majoradas, aborto legal (necessário e sentimental), anencefalia (ADPF 54) e a ADPF 442." },
secoes:[
{ id:"tipos", titulo:"As figuras do aborto", curto:"Tipos",
  rapido:["Art. 124: a <b>gestante</b> provoca aborto em si ou <b>consente</b> que outro provoque — detenção de <b>1 a 3 anos</b>. Crime de <b>mão própria</b> (admite participação, não coautoria).",
    "Art. 125: terceiro provoca <b>sem consentimento</b> — reclusão de <b>3 a 10 anos</b>. Art. 126: terceiro provoca <b>com consentimento</b> — reclusão de <b>1 a 4 anos</b>.",
    "Consentimento inválido (gestante <b>não maior de 14</b>, alienada ou débil mental, ou consentimento obtido por <b>fraude, grave ameaça ou violência</b>): terceiro responde pelo <b>art. 125</b>.",
    "Exceção à teoria monista: a gestante que consente responde pelo 124; o terceiro que executa, pelo 126."],
  teoria:[
    { h:"Consumação e elemento subjetivo", p:[
      "Consuma-se com a interrupção da gravidez e a morte do produto da concepção (embrião ou feto). Admite tentativa. Exige prova da gravidez e da vida intrauterina.",
      "Só há aborto doloso. Gestante que, por imprudência, perde o bebê não comete crime. Terceiro que culposamente provoca aborto: pode responder por lesão corporal culposa contra a gestante (não por aborto culposo).",
      "Se o agente quer matar a gestante e sabe da gravidez, responde por homicídio (ou feminicídio) e aborto (art. 125), em concurso formal impróprio."]},
    { h:"Consentimento", p:[
      "Deve durar até o fim da manobra: se a gestante desiste no meio e o terceiro prossegue, ele responde pelo art. 125.",
      "É pessoal: o consentimento dado ao médico X não autoriza o médico Y.",
      "Sujeitos passivos: no 124 e no 126, o produto da concepção; no 125, também a gestante."]},
    { h:"Majorantes (art. 127)", p:[
      "Só para os arts. 125 e 126 (aborto por terceiro). Lesão grave na gestante: <b>+1/3</b>. Morte da gestante: pena <b>duplicada</b>.",
      "São resultados <b>culposos</b> (preterdolo). Se houver dolo quanto à lesão ou à morte da gestante, há concurso de crimes.",
      "Agressor que quer só lesionar e, por culpa, provoca o aborto: lesão corporal <b>gravíssima</b> (129, §2º, V). Agressor que quer o aborto e só acelera o parto: aborto tentado (125) + lesão leve."]}
  ],
  pegadinhas:["O art. 127 não se aplica ao art. 124 (autoaborto): ninguém é punido por se lesionar.","Gestante de exatamente 14 anos: o 126, parágrafo único fala em \"não é maior de quatorze anos\" — com 14 anos completos (sem ser maior), o consentimento é inválido e o terceiro responde pelo 125. Leia com atenção o enunciado."]},
{ id:"legal", titulo:"Aborto legal e a jurisprudência do STF", curto:"Aborto legal",
  rapido:["Art. 128 — não se pune o aborto <b>praticado por médico</b>: (I) <b>necessário</b>, se não há outro meio de salvar a vida da gestante; (II) <b>sentimental/humanitário</b>, gravidez resultante de <b>estupro</b>, com consentimento da gestante ou, se incapaz, do representante legal.",
    "STF, ADPF 54 (2012): interromper a gestação de <b>feto anencéfalo</b> não é crime.",
    "STF, ADPF 442 (interrupção até a 12ª semana): julgamento iniciado e <b>não concluído</b>. O HC 124.306 (2016) foi decisão isolada da 1ª Turma."],
  teoria:[
    { h:"Detalhes do art. 128", p:[
      "Natureza: causas especiais de exclusão da ilicitude (prevalece).",
      "No aborto necessário não se exige consentimento da gestante. Se quem pratica não é médico (ex.: enfermeira em local sem médico), pode haver estado de necessidade (art. 24).",
      "No aborto sentimental não se exige sentença nem inquérito: basta que o médico tenha elementos seguros da ocorrência do estupro (ex.: relato da vítima, boletim de ocorrência). A doutrina estende a hipótese ao <b>estupro de vulnerável</b> (art. 217-A)."]},
    { h:"Anencefalia", p:[
      "Na ADPF 54, o STF fixou que é inconstitucional interpretar a interrupção da gravidez de feto anencéfalo como conduta tipificada nos arts. 124, 126 e 128, I e II. Fundamentos: dignidade, autonomia reprodutiva, saúde da mulher e o critério da morte encefálica (sem atividade cerebral, não há vida a proteger no sentido jurídico-penal)."]}
  ],
  quadro:{ titulo:"Quem responde por quê", head:["Situação","Gestante","Terceiro"], rows:[
    ["Gestante provoca em si","Art. 124 (1ª parte)","Partícipe do 124 (se induziu/instigou/auxiliou)"],
    ["Gestante consente; terceiro executa","Art. 124 (2ª parte)","Art. 126"],
    ["Terceiro sem consentimento","Vítima","Art. 125"],
    ["Consentimento de gestante não maior de 14, alienada ou obtido com fraude/ameaça/violência","Não responde","Art. 125 (126, parágrafo único)"],
    ["Médico, para salvar a vida da gestante","—","Fato lícito (128, I)"],
    ["Médico, gravidez de estupro, com consentimento","Não responde","Fato lícito (128, II)"]]},
  pegadinhas:["O art. 128 exige que o aborto seja praticado <b>por médico</b>.","Ação penal em todos os crimes de aborto: pública incondicionada."]}
],
lei:[
{ art:"CP, arts. 124 a 126", nome:"Figuras do aborto", sec:"tipos", itens:[
  { id:"cp124", rot:"Art. 124", t:"Provocar aborto <b class='g1'>em si mesma</b> ou <b class='g1'>consentir</b> que outrem lho provoque:<br>Pena - detenção, de <b class='g2'>um a três anos</b>.", c:["ab1","ab2"] },
  { id:"cp125", rot:"Art. 125", t:"Provocar aborto, <b class='g1'>sem o consentimento</b> da gestante:<br>Pena - reclusão, de <b class='g2'>três a dez anos</b>.", c:["ab3","ab4"], j:["stj-fem-aborto-b"] },
  { id:"cp126", rot:"Art. 126", t:"Provocar aborto <b class='g1'>com o consentimento</b> da gestante:<br>Pena - reclusão, de <b class='g2'>um a quatro anos</b>.<br>Parágrafo único. Aplica-se a pena do artigo anterior, se a gestante <b class='g3'>não é maior de quatorze anos</b>, ou é <b class='g3'>alienada ou débil mental</b>, ou se o consentimento é obtido mediante <b class='g3'>fraude, grave ameaça ou violência</b>.", c:["ab2","ab5","ab6"] }
]},
{ art:"CP, arts. 127 e 128", nome:"Forma majorada e aborto legal", sec:"legal", itens:[
  { id:"cp127", rot:"Art. 127", t:"As penas cominadas <b class='g3'>nos dois artigos anteriores</b> são aumentadas de <b class='g2'>um terço</b>, se, em consequência do aborto ou dos meios empregados para provocá-lo, a gestante sofre <b class='g1'>lesão corporal de natureza grave</b>; e são <b class='g2'>duplicadas</b>, se, por qualquer dessas causas, lhe sobrevém a <b class='g1'>morte</b>.", c:["ab7","ab8"] },
  { id:"cp128", rot:"Art. 128", t:"Não se pune o aborto <b class='g1'>praticado por médico</b>:<br>Aborto necessário<br>I - se <b class='g1'>não há outro meio de salvar a vida da gestante</b>;<br>Aborto no caso de gravidez resultante de estupro<br>II - se a gravidez <b class='g1'>resulta de estupro</b> e o aborto é precedido de <b class='g3'>consentimento da gestante ou, quando incapaz, de seu representante legal</b>.", c:["ab9","ab10","ab11"], j:["stf-adpf54","stf-adpf442"] }
]}
],
juris:[
{ id:"stf-adpf54", trib:"STF", tipo:"ADPF", num:"54", sec:"legal", status:"vigente", data:"Plenário, 12/04/2012",
  titulo:"Anencefalia: interromper a gestação não é crime", texto:"Mostra-se inconstitucional interpretação de a interrupção da gravidez de feto anencéfalo ser conduta tipificada nos artigos 124, 126 e 128, incisos I e II, do Código Penal.",
  explica:"Criou, na prática, uma terceira hipótese de aborto não punível, além das do art. 128.", lei:["cp128","cp124","cp126"], fonte:STFJ },
{ id:"stf-adpf442", trib:"STF", tipo:"ADPF", num:"442", sec:"legal", status:"pendente", data:"Julgamento iniciado em 2023 (voto da relatora)",
  titulo:"Interrupção até a 12ª semana: julgamento não concluído", texto:"A relatora votou pela não recepção parcial dos arts. 124 e 126 do CP, para excluir de seu âmbito a interrupção voluntária da gestação nas primeiras 12 semanas. O processo foi destacado e o julgamento não foi concluído.",
  explica:"Até decisão final, os arts. 124 e 126 seguem plenamente aplicáveis. O HC 124.306 (1ª Turma, 2016) foi decisão isolada, sem efeito vinculante.", lei:["cp124","cp126"], fonte:STFJ },
{ id:"stj-fem-aborto-b", trib:"STJ", tipo:"Jurisprudência", num:"REsp 1.860.829/RJ", sec:"tipos", status:"vigente", data:"6ª Turma, 15/09/2020",
  titulo:"Matar gestante: homicídio/feminicídio + aborto", texto:"Enquanto o art. 125 do CP tutela o feto enquanto bem jurídico, o crime contra a vida da gestante, agravado pela gestação, protege a pessoa em maior grau de vulnerabilidade; é possível a imputação simultânea.",
  explica:"Não há bis in idem entre a majorante da gestação e o crime de aborto.", lei:["cp125"], fonte:STJJ }
],
cards:[
{ id:"ab1", tipo:"ce", sec:"tipos", f:"Certo ou errado: o autoaborto admite coautoria.", v:"<b>Errado.</b> É crime de mão própria: admite <b>participação</b> (induzir, instigar, auxiliar), não coautoria.", lei:["cp124"] },
{ id:"ab2", tipo:"caso", sec:"tipos", f:"Gestante maior de idade procura clínica e o médico faz o aborto a pedido dela. Por quais crimes respondem?", v:"Gestante: <b>art. 124</b> (consentir). Médico: <b>art. 126</b>. Exceção pluralista à teoria monista.", lei:["cp124","cp126"] },
{ id:"ab3", tipo:"caso", sec:"tipos", f:"Namorado coloca abortivo na bebida da namorada grávida, sem ela saber; ocorre o aborto.", v:"<b>Art. 125</b> (sem consentimento) — reclusão de 3 a 10 anos.", lei:["cp125"] },
{ id:"ab4", tipo:"caso", sec:"tipos", f:"A agride a gestante para lesioná-la, sem querer o aborto, mas por culpa ele ocorre. Crime?", v:"<b>Lesão corporal gravíssima</b> (129, §2º, V). Não há aborto culposo.", lei:["cp125"] },
{ id:"ab5", tipo:"caso", sec:"tipos", f:"Gestante de 13 anos pede e consente; o terceiro realiza o aborto. Crime do terceiro?", v:"<b>Art. 125</b> (pena do aborto sem consentimento): consentimento inválido (126, parágrafo único).", lei:["cp126"] },
{ id:"ab6", tipo:"caso", sec:"tipos", f:"A gestante consente, mas no meio do procedimento pede para parar; o terceiro continua.", v:"O terceiro responde pelo <b>art. 125</b>: o consentimento deve persistir até o fim.", lei:["cp126","cp125"] },
{ id:"ab7", tipo:"numero", sec:"legal", f:"Art. 127: aumento por lesão grave e por morte da gestante.", v:"Lesão grave: <b>+1/3</b>. Morte: pena <b>duplicada</b>. Só nos arts. 125 e 126.", lei:["cp127"] },
{ id:"ab8", tipo:"ce", sec:"legal", f:"Certo ou errado: se a gestante morre no autoaborto, aplica-se o art. 127 a quem a auxiliou.", v:"<b>Errado.</b> O 127 se refere aos \"dois artigos anteriores\" (125 e 126). O partícipe do 124 pode responder por homicídio culposo, conforme o caso.", lei:["cp127"] },
{ id:"ab9", tipo:"caso", sec:"legal", f:"Vítima de estupro grávida procura hospital sem boletim de ocorrência. O médico pode fazer o aborto?", v:"<b>Sim.</b> O art. 128, II não exige sentença nem BO; basta consentimento e elementos seguros da violência.", lei:["cp128"] },
{ id:"ab10", tipo:"distincao", sec:"legal", f:"Aborto necessário × sentimental: exige consentimento?", v:"<b>Necessário</b> (I): não exige — o objetivo é salvar a vida. <b>Sentimental</b> (II): exige consentimento da gestante ou do representante legal.", lei:["cp128"] },
{ id:"ab11", tipo:"juris", sec:"legal", f:"Interromper a gestação de feto anencéfalo é crime?", v:"<b>Não</b> (STF, ADPF 54, 2012).", lei:["cp128"], j:["stf-adpf54"] },
{ id:"ab12", tipo:"juris", sec:"legal", f:"O STF já descriminalizou o aborto até a 12ª semana?", v:"<b>Não.</b> A ADPF 442 teve julgamento iniciado e não concluído; os arts. 124 e 126 continuam em vigor.", lei:["cp124"], j:["stf-adpf442"] }
],
importancia:{ nivel:4,
  texto:"Aborto reúne penas, exceção pluralista, consentimento inválido, majorante do art. 127, aborto legal e a jurisprudência do STF (ADPF 54 e ADPF 442). A banca explora o que o STF decidiu e o que ainda está pendente.",
  decore:[
    ["Art. 124 (autoaborto ou consentimento)","detenção de <b>1 a 3 anos</b>; crime de mão própria"],
    ["Art. 125 (sem consentimento)","reclusão de <b>3 a 10 anos</b>"],
    ["Art. 126 (com consentimento)","reclusão de <b>1 a 4 anos</b>"],
    ["Consentimento inválido","gestante <b>não maior de 14</b>, alienada ou débil mental, ou fraude, grave ameaça ou violência: pena do art. 125"],
    ["Art. 127","<b>+1/3</b> se a gestante sofre lesão grave; pena <b>duplicada</b> se morre; só arts. 125 e 126"],
    ["Aborto necessário (128, I)","médico; <b>não há outro meio</b> de salvar a vida da gestante; sem consentimento"],
    ["Aborto sentimental (128, II)","médico; gravidez resultante de <b>estupro</b>; consentimento da gestante ou do representante legal"],
    ["ADPF 54 (2012)","interrupção de gestação de feto <b>anencéfalo</b> não é crime"],
    ["ADPF 442","interrupção até a 12ª semana: julgamento <b>não concluído</b>; arts. 124 e 126 em vigor"],
    ["Ação penal","pública <b>incondicionada</b>"]],
  macetes:[
    ["Gestante consente, terceiro executa","Cada um no seu tipo: gestante no art. 124; terceiro no art. 126. É exceção pluralista à teoria monista."],
    ["O art. 128 é para médico","O art. 128 exige que o aborto seja praticado por médico. Aborto necessário não exige consentimento; o sentimental exige."],
    ["Art. 127 olha para a gestante","A majorante só vale para o aborto feito por terceiro, não para o autoaborto. Os resultados são culposos (preterdolo)."]] },
comparativo:{ titulo:"Aborto sem consentimento × com consentimento (terceiro)", head:["Art. 125 (sem consentimento)","Art. 126 (com consentimento)"], rows:[
  ["<b>Pena:</b> reclusão de 3 a 10 anos","<b>Pena:</b> reclusão de 1 a 4 anos"],
  ["<b>Gestante:</b> é vítima, não responde","<b>Gestante:</b> responde pelo art. 124 (exceção à teoria monista)"],
  ["<b>Consentimento:</b> ausente, ou inválido (gestante não maior de 14, alienada ou débil mental, ou obtido por fraude, grave ameaça ou violência)","<b>Consentimento:</b> válido e mantido até o fim da manobra; se a gestante desiste e o terceiro continua, aplica-se o art. 125"],
  ["<b>Art. 127:</b> aplica-se (+1/3 na lesão grave; dobro na morte da gestante)","<b>Art. 127:</b> aplica-se nos mesmos termos"],
  ["<b>Sujeitos passivos:</b> o produto da concepção e a gestante","<b>Sujeito passivo:</b> o produto da concepção"]]},
prova:[
  { tipo:"ce", enun:"O autoaborto é crime de mão própria: admite participação, mas não coautoria.", gab:"Certo", com:"Quem induz, instiga ou auxilia a gestante é partícipe do art. 124." },
  { tipo:"ce", enun:"A gestante que consente que o médico provoque o aborto responde pelo art. 124, e o médico responde pelo art. 126.", gab:"Certo", com:"É a exceção pluralista à teoria monista adotada pelo CP." },
  { tipo:"ce", enun:"O terceiro que provoca aborto com o consentimento de gestante de 13 anos responde pelo art. 126.", gab:"Errado", com:"O consentimento é inválido. Aplica-se a pena do art. 125 (art. 126, parágrafo único)." },
  { tipo:"ce", enun:"O aumento do art. 127 aplica-se também ao autoaborto, quando a gestante sofre lesão grave.", gab:"Errado", com:"O art. 127 se refere aos “dois artigos anteriores” (125 e 126). Ninguém é punido por se lesionar." },
  { tipo:"caso", enun:"Mulher grávida em decorrência de estupro procura o hospital sem boletim de ocorrência e consente no aborto. O médico pode realizá-lo sem cometer crime?", com:"Sim. O art. 128, II exige o consentimento e a prática por médico, mas não exige sentença, inquérito ou BO; bastam elementos seguros da ocorrência do estupro." },
  { tipo:"ce", enun:"O STF já declarou, em decisão definitiva, a não punibilidade do aborto realizado até a 12ª semana de gestação.", gab:"Errado", com:"A ADPF 442 teve o julgamento iniciado e não concluído. A decisão definitiva do STF é sobre anencefalia (ADPF 54)." }],
resumo:[
  "Art. 124: a gestante provoca aborto em si ou consente (1 a 3 anos, detenção). Art. 125: sem consentimento (3 a 10). Art. 126: com consentimento (1 a 4).",
  "Consentimento inválido (gestante não maior de 14, alienada, débil mental ou obtido com fraude, ameaça ou violência): terceiro responde pelo art. 125.",
  "Só há aborto doloso. Aborto culposo não existe; a lesão culposa na gestante é outro crime.",
  "Art. 127: +1/3 (lesão grave) e dobro (morte da gestante), só para os arts. 125 e 126.",
  "Aborto legal (art. 128): necessário (sem outro meio de salvar a vida da gestante) e sentimental (estupro), ambos por médico.",
  "ADPF 54 (2012): interromper gravidez de feto anencéfalo não é crime. ADPF 442: pendente.",
  "Ação penal pública incondicionada. Admite tentativa. Crime doloso contra a vida: júri.",
  "Matar gestante e provocar o aborto pode ser imputado em conjunto, sem bis in idem (STJ)."],
checklist:[
  "Dizer as penas dos arts. 124, 125 e 126",
  "Explicar a exceção pluralista (gestante × terceiro)",
  "Identificar quando o consentimento é inválido",
  "Aplicar o art. 127 e dizer a quais crimes ele se refere",
  "Diferenciar aborto necessário de sentimental",
  "Citar o que o STF decidiu na ADPF 54 e o que está pendente na ADPF 442",
  "Resolver a agressão a gestante com aborto culposo (lesão gravíssima)"],
questoes:[]
};

})();
