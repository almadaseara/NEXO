(function(){
"use strict";
/* ---------- CONTEÚDO DO NEXO (módulo ext_mariapenha, data/temas/ext-n.js) ---------- */
var NEXO = (function(){
  var t = (window.NEXO_TEMAS||{}).ext_mariapenha; if(!t) return null;
  var sec={}; t.secoes.forEach(function(s){ sec[s.id]={titulo:s.titulo,rapido:s.rapido,pegadinhas:s.pegadinhas||[],teoria:s.teoria||[]}; });
  var lei={}; t.lei.forEach(function(g){ g.itens.forEach(function(i){ lei[i.id]={rot:i.rot,t:i.t,art:g.art}; }); });
  var juris={},jurisSec={}; t.juris.forEach(function(j){ juris[j.id]=j; (jurisSec[j.sec]=jurisSec[j.sec]||[]).push(j); });
  var cardsSec={}; t.cards.forEach(function(c){ (cardsSec[c.sec]=cardsSec[c.sec]||[]).push({f:c.f,v:c.v,tipo:c.tipo}); });
  var macetes=(t.importancia.macetes||[]).map(function(m){ return Array.isArray(m)?[m[0],m[1]]:[String(m),'']; });
  return {sec:sec,lei:lei,juris:juris,jurisSec:jurisSec,cardsSec:cardsSec,decore:t.importancia.decore,macetes:macetes,resumo:t.resumo,checklist:t.checklist,importancia:{texto:t.importancia.texto},comp:{head:t.comparativo.head,rows:t.comparativo.rows}};
})();
function R(sec,i){ return NEXO.sec[sec].rapido[i]; }
var CE = ["Certo","Errado"];
var NV = {critico:"Crítico", alto:"Alto", medio:"Médio"};
var COR = {r:"c-r", y:"c-y", g:"c-g", b:"c-b", p:"c-p"};

/* Capítulos = seções do NEXO, mesma ordem e mesmos títulos. */
var CAPS = [
 {id:"conceito", decore:[9,6], tipoDec:{9:"s",6:"p"}, nexoResumo:[0,1], macetes:[], check:[0,1,9],
  resumo:["A violência doméstica é a ação ou omissão baseada no gênero, em três âmbitos: unidade doméstica, família e relação íntima de afeto (art. 5º). Coabitação não é exigida (Súmula 600) e a orientação sexual é irrelevante.",
          "As formas do art. 7º são física, psicológica, sexual, patrimonial e moral, em rol exemplificativo. Documento retido ou destruído é patrimonial; impedir contracepção é sexual.",
          "Na assistência (art. 9º), quem determina a inclusão em programas e a manutenção do vínculo trabalhista (até 6 meses) é o juiz, não o delegado nem o MP.",
          "O art. 8º é programático: ações articuladas de todos os entes e das entidades não governamentais, com integração entre Judiciário, MP e Defensoria, atendimento especializado (Deams), estatísticas com perspectiva de gênero e raça, campanhas e capacitação."]},
 {id:"policia", decore:[0,2], tipoDec:{0:"p",2:"p"}, nexoResumo:[3], macetes:[0,1], check:[2,3],
  resumo:["Art. 10 e 10-A: a autoridade policial adota de imediato as providências legais, inclusive no descumprimento de medida protetiva, e a mulher tem direito a atendimento especializado, ininterrupto, por servidores capacitados e, de preferência, do sexo feminino, sem revitimização.",
          "Art. 11: proteção policial com comunicação ao MP e ao Judiciário; hospital e IML; transporte para abrigo quando houver risco de vida; acompanhar a retirada de pertences; informar direitos.",
          "Art. 12: ouvir a ofendida, lavrar o B.O., colher provas, remeter o pedido de protetiva ao juiz em 48 horas, exame de corpo de delito, antecedentes, verificar arma do agressor, remeter o inquérito.",
          "Art. 12-C: afasta o agressor o juiz; o delegado, se o município não for sede de comarca; o policial, se também não houver delegado. Juiz comunicado em 24 horas e decide em igual prazo. O delegado não concede medida protetiva."]},
 {id:"processo", decore:[1,3,4,5,7,8], tipoDec:{1:"p",3:"pe",4:"p",5:"r",7:"r",8:"s"}, nexoResumo:[2,4,5,6,7,8], macetes:[2,3], check:[4,5,6,7,8],
  resumo:["Os juizados de violência doméstica são varas especializadas da Justiça comum, com competência cível e criminal. Não são Juizados Especiais, e a Lei 9.099 não se aplica (art. 41), qualquer que seja a pena.",
          "Súmulas do STJ: 536 (sem transação penal nem suspensão condicional), 542 (lesão corporal: ação pública incondicionada), 588 (sem restritiva de direitos), 589 (sem insignificância), 600 (sem coabitação).",
          "Representação: retratação só perante o juiz, em audiência, antes do recebimento da denúncia (art. 16); decadência em 12 meses (art. 16-A); vedadas cesta básica, prestação pecuniária e multa isolada (art. 17); sigilo do nome da ofendida, não do autor (art. 17-A).",
          "Medidas protetivas: juiz decide em 48 horas, sem exigir B.O., inquérito ou ação; vigoram enquanto persistir o risco. Art. 22 contra o agressor; art. 23 em favor da ofendida; art. 24 patrimônio.",
          "Art. 24-A: descumprir medida protetiva é crime, com reclusão de 2 a 5 anos e multa; independe da vara; fiança só pelo juiz; pena aumenta de 1/3 até a metade em caso de violação da área monitorada ou do dispositivo."]}
];
var TIPODEC = {p:["Prazo","c-y"], pe:["Pena","c-r"], r:["Regra","c-g"], s:["Súmula","c-b"]};
var TIPOCARD = {distincao:["Distinção","c-b"], caso:["Caso","c-g"], numero:["Número","c-y"], ce:["Certo ou errado","c-r"]};

/* ---------- ROTEIRO ---------- */
var PASSOS = [
/* ===== CAPÍTULO 1: Conceito, formas de violência e assistência ===== */
{
  cap:0, titulo:"Quem é protegido", base:"Art. 5º",
  alvos:[
   {id:"A1",nv:"critico",rot:"Coabitação não é exigida (Súmula 600 do STJ)",banca:"Afirma que a lei só vale se agressor e vítima moram juntos, ou que o namoro está fora."},
   {id:"A2",nv:"alto",rot:"Só existem três âmbitos: unidade doméstica, família e relação íntima de afeto",banca:"Inventa um âmbito (do trabalho, da escola) ou exige parentesco para a unidade doméstica."},
   {id:"A3",nv:"alto",rot:"Orientação sexual é irrelevante; o agressor pode ser homem ou mulher",banca:"Restringe a lei a mulheres heterossexuais ou a agressor homem."}
  ],
  nexo:[["conceito",0],["conceito",1]], lei:["l11340a5"], juris:["stj-sum600"], teoria:[],
  tab:{head:["Âmbito (art. 5º)","O que é","Exemplo"],rows:[
    ["Unidade doméstica (I)","Espaço de convívio permanente, com ou sem vínculo familiar, inclusive pessoas esporadicamente agregadas","Doméstica que mora na casa e é agredida pela patroa","g"],
    ["Família (II)","Comunidade de pessoas que são ou se consideram aparentadas, por laços naturais, afinidade ou vontade expressa","Filho que agride a mãe","b"],
    ["Relação íntima de afeto (III)","O agressor convive ou conviveu com a ofendida, independentemente de coabitação","Namorado ou ex-companheiro","p"]]},
  quiz:[
   {a:"A1",o:"NEXO (questão de prova)",p:"A incidência da Lei Maria da Penha às relações íntimas de afeto exige que agressor e vítima convivam sob o mesmo teto.",op:CE,c:1,e:"O art. 5º, III, dispensa a coabitação, e a Súmula 600 do STJ confirma essa orientação."},
   {a:"A2",o:"criada, com base no NEXO",p:"Assinale a alternativa que NÃO é âmbito de incidência da lei (art. 5º):",op:["Unidade doméstica","Família","Relação íntima de afeto","Ambiente de trabalho"],c:3,e:"Os três âmbitos são unidade doméstica, família e relação íntima de afeto. Ambiente de trabalho não é âmbito da lei."},
   {a:"A3",o:"criada, com base no NEXO",p:"Sobre os sujeitos da Lei Maria da Penha, é correto afirmar:",op:["Só protege mulheres heterossexuais","O sujeito ativo é sempre homem","O sujeito passivo é a mulher e o ativo pode ser homem ou mulher, independentemente de orientação sexual","Exige parentesco entre agressor e vítima"],c:2,e:"O NEXO traz que a orientação sexual é irrelevante e que o ativo pode ser homem ou mulher (ex.: mãe e filha). O STJ aplica a lei a mulher trans."}
  ],
  reforco:[
   {a:"A1",o:"NEXO (card mp2, adaptado)",p:"Ex-namorado ameaça a ex-namorada por causa do término. Aplica-se a Lei Maria da Penha?",op:["Não, porque não há coabitação","Sim: há relação íntima de afeto e nexo com ela, sem exigir coabitação","Só se tiveram filhos","Só se houve agressão física"],c:1,e:"Basta a relação íntima de afeto e o nexo com ela (Súmula 600)."},
   {a:"A2",o:"criada, com base no NEXO",p:"A empregada que mora na casa dos patrões e é agredida pela patroa está protegida em qual âmbito?",op:["Unidade doméstica","Relação íntima de afeto","Família por afinidade","Nenhum, pois o vínculo é de trabalho"],c:0,e:"Há convívio permanente, com ou sem vínculo familiar: é unidade doméstica."}
  ],
  resumo:["Ação ou omissão baseada no gênero, em três âmbitos: unidade doméstica, família, relação íntima de afeto.","Coabitação não é exigida (Súmula 600). Namoro e ex-namoro entram se a agressão decorre da relação.","Orientação sexual é irrelevante; mulher trans é protegida pelo STJ; o agressor pode ser homem ou mulher."],
  alt:`<p>Troque a pergunta “onde moram?” por três perguntas. Se as três forem “sim”, a lei se aplica:</p>
  <ol><li>A vítima é mulher?</li><li>Existe ou existiu convivência, família ou afeto entre os dois?</li><li>A agressão decorre dessa relação e da condição de gênero?</li></ol>
  <ul><li>Namorada que não mora com ele: entra.</li><li>Ex-marido que persegue a ex: entra.</li><li>Doméstica que mora na casa dos patrões: entra, como unidade doméstica.</li><li>Desconhecido que assalta uma mulher na rua: não há convivência nem afeto, então não entra.</li></ul>`
},
{
  cap:0, titulo:"As cinco formas de violência", base:"Art. 7º",
  alvos:[
   {id:"B1",nv:"critico",rot:"Reter ou destruir documentos, bens e dinheiro é violência patrimonial",banca:"Chama de violência física ou psicológica um caso de retenção ou destruição de objetos e documentos."},
   {id:"B2",nv:"alto",rot:"Impedir contracepção, forçar gravidez ou aborto é violência sexual",banca:"Classifica como psicológica ou moral algo que atinge direitos sexuais e reprodutivos."},
   {id:"B3",nv:"alto",rot:"O rol do art. 7º é exemplificativo (“entre outras”)",banca:"Diz que as formas de violência são taxativas."}
  ],
  nexo:[["conceito",2]], lei:["l11340a7"], juris:[], teoria:[],
  tab:{head:["Forma","O que atinge","Exemplos do NEXO"],rows:[
    ["Física","Integridade ou saúde corporal","Qualquer conduta que ofenda a integridade ou saúde corporal","r"],
    ["Psicológica","Emoções e autoestima","Humilhação, isolamento, vigilância constante, perseguição contumaz, chantagem, controle de ações e crenças","y"],
    ["Sexual","Liberdade sexual e reprodutiva","Constranger a relação, impedir contracepção, forçar gravidez, aborto ou prostituição","p"],
    ["Patrimonial","Bens e recursos","Retenção, subtração ou destruição de objetos, documentos, bens, valores e recursos","b"],
    ["Moral","Honra","Calúnia, difamação e injúria","g"]]},
  quiz:[
   {a:"B1",o:"NEXO (card mp4, adaptado)",p:"Companheiro retém os documentos e cartões da mulher. Que forma de violência?",op:["Física","Psicológica","Patrimonial","Moral"],c:2,e:"Retenção, subtração ou destruição de objetos, documentos, bens, valores e recursos é violência patrimonial."},
   {a:"B2",o:"criada, com base no NEXO",p:"Impedir a mulher de usar método contraceptivo configura violência:",op:["Psicológica","Patrimonial","Sexual","Moral"],c:2,e:"O NEXO inclui na violência sexual impedir o uso de contracepção, forçar gravidez, aborto ou prostituição."},
   {a:"B3",o:"criada, com base no NEXO",p:"Sobre o rol de formas de violência do art. 7º, é correto afirmar:",op:["É taxativo","É exemplificativo, pois o texto usa “entre outras”","Só inclui a violência física e a sexual","Exige lesão corporal"],c:1,e:"O NEXO registra que o rol é exemplificativo: física, psicológica, sexual, patrimonial e moral são as previstas, entre outras."}
  ],
  reforco:[
   {a:"B1",o:"criada, com base no NEXO",p:"O ex-companheiro destrói o celular e os documentos da vítima. Qual forma de violência?",op:["Patrimonial","Física","Sexual","Moral"],c:0,e:"Destruir objetos e documentos atinge o patrimônio da vítima."},
   {a:"B3",o:"criada, com base no NEXO",p:"Calúnia, difamação e injúria contra a mulher no contexto doméstico configuram violência:",op:["Física","Moral","Patrimonial","Sexual"],c:1,e:"Calúnia, difamação e injúria são a violência moral do art. 7º."}
  ],
  resumo:["Cinco formas: física, psicológica, sexual, patrimonial e moral; o rol é exemplificativo.","Patrimonial: retenção, subtração ou destruição de objetos, documentos, bens e recursos.","Sexual: constranger a relação, impedir contracepção, forçar gravidez, aborto ou prostituição.","Moral: calúnia, difamação, injúria. Psicológica: humilhação, isolamento, vigilância, perseguição, chantagem."],
  alt:`<p>Pergunte sempre o que foi atingido:</p>
  <ul><li><b>Corpo ou saúde</b> → física.</li><li><b>Emoção e autoestima</b> → psicológica.</li><li><b>Liberdade sexual e reprodutiva</b> → sexual.</li><li><b>Coisas, documentos e dinheiro</b> → patrimonial.</li><li><b>Reputação</b> → moral.</li></ul>
  <p>A banca troca a “gaveta”. Documento retido ou rasgado nunca é violência física.</p>`
},
{
  cap:0, titulo:"Assistência à mulher: quem decide", base:"Art. 9º",
  alvos:[
   {id:"C1",nv:"critico",rot:"Inclusão em programas assistenciais e manutenção do vínculo: ordem do JUIZ",banca:"Atribui essa decisão ao delegado ou ao Ministério Público."},
   {id:"C2",nv:"alto",rot:"Manutenção do vínculo trabalhista: até 6 meses",banca:"Troca o prazo por 3 meses, 12 meses ou “enquanto durar o processo”."}
  ],
  nexo:[["conceito",3]], lei:["l11340a9"], juris:[], teoria:[],
  tab:{head:["Medida de assistência","Quem determina","Detalhe"],rows:[
    ["Inclusão no cadastro de programas assistenciais","Juiz","Por prazo certo (§ 1º)","r"],
    ["Acesso prioritário à remoção","Juiz","Quando servidora pública (§ 2º, I)","r"],
    ["Manutenção do vínculo trabalhista","Juiz","Por até 6 meses (§ 2º, II)","y"],
    ["Encaminhamento à assistência judiciária","Juiz","Divórcio, dissolução de união estável etc. (§ 2º, III)","r"],
    ["Matrícula dos dependentes","Prioridade da mulher","Escola mais próxima, com sigilo dos dados (§§ 7º e 8º)","g"]]},
  quiz:[
   {a:"C1",o:"NEXO (card mp5)",p:"O delegado pode determinar a inclusão da mulher em programas assistenciais e a manutenção de vínculo trabalhista por seis meses.",op:CE,c:1,e:"Errado. Quem determina é o juiz (art. 9º, §§ 1º e 2º); a manutenção do vínculo é por até 6 meses."},
   {a:"C2",o:"criada, com base no NEXO",p:"A manutenção do vínculo trabalhista da vítima, quando necessário o afastamento do local de trabalho, é assegurada por até:",op:["3 meses","6 meses","12 meses","Enquanto durar o processo"],c:1,e:"O art. 9º assegura a manutenção do vínculo por até 6 meses."},
   {a:"C1",o:"criada, com base no NEXO",p:"Quem determina, por prazo certo, a inclusão da mulher em situação de violência em programas assistenciais?",op:["O delegado de polícia","O Ministério Público","O juiz","O Conselho Tutelar"],c:2,e:"É o juiz, não o delegado nem o Ministério Público."}
  ],
  reforco:[
   {a:"C1",o:"criada, com base no NEXO",p:"A remoção prioritária da servidora pública vítima de violência é assegurada por determinação de:",op:["Delegado","Juiz","Corregedoria","Defensoria"],c:1,e:"O art. 9º, § 2º, reúne as medidas que o juiz assegura, entre elas o acesso prioritário à remoção."},
   {a:"C2",o:"criada, com base no NEXO",p:"Qual é o prazo máximo de manutenção do vínculo trabalhista previsto no art. 9º?",op:["30 dias","60 dias","6 meses","1 ano"],c:2,e:"Até 6 meses."}
  ],
  resumo:["Assistência prioritária no SUS e no Susp, articulada com a LOAS.","Quem determina inclusão em programas e manutenção do vínculo: o juiz.","Manutenção do vínculo trabalhista: até 6 meses."],
  alt:`<p>Guarde uma regra: <b>o que muda a vida da vítima por ordem, com prazo, vem do juiz</b>. Delegado e policial atendem, protegem e encaminham, mas não determinam programa assistencial nem vínculo de trabalho.</p>
  <p>E um número: <b>6 meses</b> (vínculo trabalhista; o auxílio-aluguel do art. 23 também é de até 6 meses).</p>`
},
{
  cap:0, titulo:"Política pública programática", base:"Art. 8º",
  alvos:[
   {id:"H1",nv:"medio",rot:"A lei é programática: ações articuladas de União, estados, DF, municípios e entidades não governamentais",banca:"Atribui a política só ao Judiciário ou só às delegacias."},
   {id:"H2",nv:"medio",rot:"Diretrizes: integração (Judiciário, MP, Defensoria), Deams, estatísticas com perspectiva de gênero e raça, campanhas, capacitação das polícias e da guarda municipal",banca:"Troca uma diretriz por uma contrária (sigilo das estatísticas, retirada do tema das escolas)."}
  ],
  nexo:[], lei:[], juris:[], teoria:[["conceito",0]],
  tab:{head:["Eixo","O que a lei prevê"],rows:[
    ["Integração","Judiciário, MP e Defensoria com as áreas de segurança, assistência, saúde, educação, trabalho e habitação","b"],
    ["Atendimento","Atendimento policial especializado (Deams)","g"],
    ["Dados","Estatísticas com perspectiva de gênero e raça","y"],
    ["Prevenção","Campanhas educativas e conteúdo escolar sobre direitos humanos e violência doméstica","p"],
    ["Capacitação","Formação permanente das polícias e da guarda municipal","r"]]},
  quiz:[
   {a:"H1",o:"criada, com base no NEXO",p:"Segundo o art. 8º, a política pública para coibir a violência doméstica se dá por meio de:",op:["Ações isoladas da União","Conjunto articulado de ações da União, dos estados, do DF, dos municípios e de ações não governamentais","Exclusivamente o Poder Judiciário","Somente delegacias especializadas"],c:1,e:"O NEXO registra que a lei também é programática: ações articuladas dos entes federados e de entidades não governamentais."},
   {a:"H2",o:"criada, com base no NEXO",p:"É diretriz da política de coibir a violência doméstica:",op:["Sigilo das estatísticas sobre violência","Promoção de estatísticas com perspectiva de gênero e raça","Exclusão do tema dos currículos escolares","Restrição do atendimento especializado às capitais"],c:1,e:"A lei prevê estatísticas com perspectiva de gênero e raça, campanhas educativas, conteúdo escolar e capacitação das polícias."}
  ],
  reforco:[
   {a:"H1",o:"criada, com base no NEXO",p:"A integração operacional prevista no art. 8º envolve:",op:["Apenas polícia e Judiciário","Judiciário, MP e Defensoria com as áreas de segurança, assistência, saúde, educação, trabalho e habitação","Somente MP e Defensoria","Apenas os municípios"],c:1,e:"É a integração do Judiciário, MP e Defensoria com as áreas de segurança, assistência social, saúde, educação, trabalho e habitação."},
   {a:"H2",o:"criada, com base no NEXO",p:"Deams são:",op:["Delegacias especializadas de atendimento à mulher","Defensorias de apoio à mulher","Departamentos de assistência municipal","Varas especializadas em violência doméstica"],c:0,e:"Deams são as delegacias especializadas de atendimento à mulher."}
  ],
  resumo:["O art. 8º dá caráter programático à lei: ações articuladas dos entes e de entidades não governamentais.","Diretrizes: integração, Deams, estatísticas com perspectiva de gênero e raça, campanhas, conteúdo escolar, capacitação das polícias e da guarda municipal."],
  alt:`<p>Pense em cinco palavras: <b>integrar, atender, medir, prevenir, capacitar</b>.</p>
  <ul><li>Integrar: Judiciário, MP e Defensoria com as demais áreas.</li><li>Atender: Deams.</li><li>Medir: estatísticas com perspectiva de gênero e raça.</li><li>Prevenir: campanhas e escola.</li><li>Capacitar: polícias e guarda municipal.</li></ul>
  <p>Se a alternativa restringe a política a um só órgão ou a um só município, está errada.</p>`
},

/* ===== CAPÍTULO 2: Atendimento policial e afastamento do agressor ===== */
{
  cap:1, titulo:"Atendimento especializado", base:"Arts. 10 e 10-A",
  alvos:[
   {id:"I1",nv:"alto",rot:"Art. 10 também se aplica ao descumprimento de medida protetiva deferida",banca:"Diz que o art. 10 vale só para a violência já consumada."},
   {id:"I2",nv:"alto",rot:"Atendimento policial e pericial especializado, ininterrupto, por servidores capacitados, preferencialmente do sexo feminino",banca:"Troca “preferencialmente” por “obrigatoriamente” ou tira o caráter ininterrupto."},
   {id:"I3",nv:"alto",rot:"Inquirição sem contato com o agressor, em recinto adequado, para evitar a revitimização",banca:"Admite acareação ou repetição do relato por várias autoridades."}
  ],
  nexo:[["policia",0]], lei:["l11340a10"], juris:[], teoria:[],
  tab:{head:["Dispositivo","Regra","Ponto de prova"],rows:[
    ["Art. 10","Na iminência ou na prática da violência, a autoridade policial adota de imediato as providências legais","Vale também para o descumprimento de medida protetiva","y"],
    ["Art. 10-A, caput","Atendimento policial e pericial especializado e ininterrupto","Servidores capacitados, preferencialmente do sexo feminino","g"],
    ["Art. 10-A, § 2º","Inquirição evita a revitimização","Sem contato com o agressor, preferencialmente em recinto adequado e com gravação","b"]]},
  quiz:[
   {a:"I2",o:"criada, com base no NEXO",p:"O art. 10-A assegura à mulher em situação de violência atendimento policial e pericial:",op:["Eventual, nos dias úteis","Especializado e ininterrupto, por servidores capacitados, preferencialmente do sexo feminino","Exclusivamente por servidoras do sexo feminino","Apenas nas capitais"],c:1,e:"Atendimento especializado, ininterrupto, por servidores previamente capacitados e, de preferência, do sexo feminino."},
   {a:"I3",o:"NEXO (card mp6, adaptado)",p:"O que é revitimização, que o art. 10-A busca evitar?",op:["Nova agressão pelo mesmo agressor","O sofrimento de ter de repetir o relato, evitado com atendimento especializado e sem contato com o agressor","A reincidência do agressor","A retratação da vítima"],c:1,e:"Revitimização é o sofrimento de repetir o relato. A lei exige atendimento especializado, sem contato com o agressor e em recinto adequado."},
   {a:"I1",o:"criada, com base no NEXO",p:"O art. 10 (providências imediatas da autoridade policial) aplica-se também:",op:["Ao descumprimento de medida protetiva deferida","Apenas a crimes de lesão corporal","Somente a feminicídio","Somente após a denúncia"],c:0,e:"O parágrafo único do art. 10 estende a regra ao descumprimento de medida protetiva de urgência deferida."}
  ],
  reforco:[
   {a:"I3",o:"criada, com base no NEXO",p:"Na inquirição da mulher, a lei exige, entre outras cautelas:",op:["Acareação imediata com o agressor","Que não haja contato direto com o agressor, preferencialmente em recinto adequado e com gravação","Que seja feita em local público","Que seja repetida por cada autoridade"],c:1,e:"Sem contato com o agressor, em recinto adequado e, preferencialmente, com gravação (art. 10-A, § 2º)."},
   {a:"I2",o:"criada, com base no NEXO",p:"O atendimento do art. 10-A deve ser prestado por servidores:",op:["Do sexo feminino, obrigatoriamente","Previamente capacitados, preferencialmente do sexo feminino","Sem necessidade de capacitação","Somente delegados"],c:1,e:"A lei diz “preferencialmente do sexo feminino”, e exige capacitação prévia."}
  ],
  resumo:["Art. 10: providências imediatas da autoridade policial, inclusive no descumprimento de medida protetiva.","Art. 10-A: atendimento policial e pericial especializado e ininterrupto, por servidores capacitados e, preferencialmente, do sexo feminino.","Inquirição sem contato com o agressor, em recinto adequado e gravada, para evitar a revitimização."],
  alt:`<p>Imagine a mulher chegando à delegacia. A lei garante: <b>quem atende</b> (capacitado, de preferência mulher), <b>quando</b> (sem horário, ininterrupto) e <b>como</b> (sem encontrar o agressor, num lugar adequado, com o relato gravado para não repetir).</p>
  <p>A palavra para fixar é <b>“preferencialmente”</b>: a banca troca por “obrigatoriamente”.</p>`
},
{
  cap:1, titulo:"Providências do art. 11", base:"Art. 11",
  alvos:[
   {id:"J1",nv:"alto",rot:"Encaminhar a ofendida ao hospital ou posto de saúde e ao IML; comunicar de imediato ao MP e ao Judiciário",banca:"Troca IML por “delegacia” ou tira a comunicação ao MP e ao Judiciário."},
   {id:"J2",nv:"alto",rot:"Transporte da ofendida e dependentes para abrigo ou local seguro quando houver risco de vida",banca:"Condiciona o transporte à ordem judicial ou o estende a qualquer caso."},
   {id:"J3",nv:"alto",rot:"Acompanhar a retirada de pertences e informar os direitos e os serviços de assistência judiciária",banca:"Diz que a polícia não pode acompanhar a retirada de pertences."}
  ],
  nexo:[["policia",1]], lei:["l11340a11"], juris:[], teoria:[],
  tab:{head:["Inciso","Providência da autoridade policial"],rows:[
    ["I","Garantir proteção policial, quando necessário, comunicando de imediato ao MP e ao Judiciário","b"],
    ["II","Encaminhar a ofendida ao hospital ou posto de saúde e ao IML","g"],
    ["III","Fornecer transporte à ofendida e seus dependentes para abrigo ou local seguro, se houver risco de vida","y"],
    ["IV","Acompanhar a ofendida, se necessário, para retirar seus pertences do local da ocorrência ou do domicílio familiar","p"],
    ["V","Informar os direitos conferidos pela lei e os serviços de assistência judiciária","r"]]},
  quiz:[
   {a:"J1",o:"NEXO (card mp7, adaptado)",p:"O art. 11 impõe à autoridade policial, entre outras providências:",op:["Decretar a prisão preventiva","Encaminhar a ofendida ao hospital ou posto de saúde e ao IML","Conceder medida protetiva","Arbitrar fiança"],c:1,e:"Hospital ou posto de saúde e IML estão no art. 11, II. Prisão preventiva, medida protetiva e fiança não são providências policiais desse artigo."},
   {a:"J2",o:"criada, com base no NEXO",p:"O transporte da ofendida e dos dependentes para abrigo ou local seguro deve ser fornecido quando:",op:["A ofendida pedir","Houver risco de vida","O agressor for preso","O juiz determinar"],c:1,e:"Art. 11, III: quando houver risco de vida."},
   {a:"J3",o:"criada, com base no NEXO",p:"Acompanhar a ofendida para a retirada de seus pertences do local da ocorrência ou do domicílio familiar é providência:",op:["Vedada à polícia","Que a autoridade policial deve adotar, se necessário","Exclusiva do juiz","Condicionada a ordem judicial prévia"],c:1,e:"Art. 11, IV: a autoridade policial acompanha, se necessário."}
  ],
  reforco:[
   {a:"J3",o:"criada, com base no NEXO",p:"Entre as providências do art. 11 está informar à ofendida:",op:["Somente os prazos do inquérito","Os direitos que a lei lhe confere e os serviços disponíveis, inclusive de assistência judiciária","Os dados pessoais do agressor","O resultado da perícia"],c:1,e:"Art. 11, V: direitos conferidos pela lei e serviços de assistência judiciária."},
   {a:"J1",o:"criada, com base no NEXO",p:"Ao garantir proteção policial, quando necessário, a autoridade comunica de imediato:",op:["Somente a imprensa","Ao Ministério Público e ao Poder Judiciário","Apenas à família","Ao Conselho Tutelar"],c:1,e:"Art. 11, I: comunicação imediata ao MP e ao Judiciário."}
  ],
  resumo:["Cinco providências: proteção policial (comunicar MP e Judiciário), hospital e IML, transporte a abrigo se houver risco de vida, acompanhar a retirada de pertences, informar direitos e assistência judiciária.","O rol é exemplificativo (“entre outras providências”)."],
  alt:`<p>Siga a vítima do momento do socorro até a saída de casa: <b>protege</b> (e avisa MP e juiz), <b>leva ao hospital e ao IML</b>, <b>leva a abrigo se há risco de vida</b>, <b>acompanha a retirada dos pertences</b> e <b>informa os direitos</b>.</p>
  <p>Nenhuma dessas providências é decisão judicial: são medidas práticas da polícia.</p>`
},
{
  cap:1, titulo:"Procedimentos do art. 12", base:"Art. 12",
  alvos:[
   {id:"D1",nv:"critico",rot:"Remessa do pedido de protetiva ao juiz: 48 horas (art. 12, III)",banca:"Troca por 24 horas, 72 horas ou 5 dias."},
   {id:"D4",nv:"alto",rot:"Verificar porte ou posse de arma do agressor e notificar o órgão emissor",banca:"Esconde esse item no meio da lista de providências."},
   {id:"D5",nv:"medio",rot:"Informar ao juiz se a vítima é pessoa com deficiência; art. 12-A dá prioridade às Deams e núcleos de feminicídio",banca:"Troca o destinatário da informação ou o órgão prioritário."}
  ],
  nexo:[["policia",2]], lei:["l11340a12"], juris:[], teoria:[],
  tab:{head:["Procedimento","O que fazer","Ponto de prova"],rows:[
    ["Ouvir e registrar","Ouvir a ofendida, lavrar o B.O. e tomar a representação a termo","Representação é tomada a termo, se apresentada","b"],
    ["Pedido de protetiva","Remeter ao juiz, em expediente apartado, o pedido da ofendida","48 horas","r"],
    ["Prova","Colher provas; exame de corpo de delito; ouvir agressor e testemunhas","Sem prejuízo do CPP","g"],
    ["Antecedentes e arma","Juntar a folha de antecedentes; verificar registro de porte ou posse de arma e notificar o órgão emissor","Arma do agressor","y"],
    ["Encerramento","Remeter o inquérito ao juiz e ao MP","","p"]]},
  quiz:[
   {a:"D1",o:"NEXO (questão de prova)",p:"A autoridade policial deve remeter ao juiz, no prazo de 48 horas, o pedido de medidas protetivas formulado pela ofendida.",op:CE,c:0,e:"Certo. É o procedimento do art. 12, em que o juiz também decide em 48 horas."},
   {a:"D4",o:"criada, com base no NEXO",p:"Entre os procedimentos do art. 12, a autoridade policial deve:",op:["Verificar o registro de porte ou posse de arma do agressor e notificar o órgão emissor","Aplicar a medida protetiva de urgência","Conceder fiança","Decidir sobre a guarda dos filhos"],c:0,e:"Verificar a arma do agressor e notificar o órgão emissor está entre as providências do art. 12."},
   {a:"D1",o:"criada, com base no NEXO",p:"O art. 12 manda remeter o expediente com o pedido de medidas protetivas:",op:["Ao Ministério Público, em 24 horas","Ao juiz, em 48 horas","À Defensoria, em 72 horas","Ao juiz, em 5 dias"],c:1,e:"Art. 12, III: ao juiz, em 48 horas."}
  ],
  reforco:[
   {a:"D5",o:"criada, com base no NEXO",p:"O art. 12 manda a autoridade policial informar ao juiz quando a ofendida:",op:["For pessoa com deficiência","For servidora pública","Tiver filhos","For estrangeira"],c:0,e:"O NEXO registra a obrigação de informar ao juiz se a vítima é pessoa com deficiência."},
   {a:"D1",o:"NEXO (card mp8)",p:"Qual o prazo para remeter ao juiz o pedido de medidas protetivas (art. 12, III)?",op:["24 horas","48 horas","72 horas","5 dias"],c:1,e:"48 horas, em expediente apartado."}
  ],
  resumo:["Art. 12: ouvir a ofendida, lavrar B.O., tomar a representação, colher provas, remeter em 48 horas o pedido de protetiva ao juiz, corpo de delito, ouvir agressor e testemunhas, antecedentes, verificar arma do agressor, remeter o inquérito ao juiz e ao MP.","A polícia remete o pedido; quem concede a medida é o juiz."],
  alt:`<p>Pense no art. 12 como um <b>roteiro de delegacia</b>: ouvir → registrar → provar (perícia, testemunhas, antecedentes, <b>arma</b>) → <b>remeter ao juiz em 48 horas</b> o pedido de medida protetiva → encaminhar o inquérito.</p>
  <p>O número que a banca troca é o <b>48</b>. E a ordem é lógica: a polícia só remete; a decisão é do juiz.</p>`
},
{
  cap:1, titulo:"Afastamento imediato do agressor", base:"Arts. 12-C e 12-D",
  alvos:[
   {id:"D2",nv:"critico",rot:"Afastamento imediato (art. 12-C): juiz; delegado só se o município não for sede de comarca; policial se não houver delegado; juiz comunicado em 24 horas",banca:"Diz que o delegado afasta em qualquer município, ou troca 24 horas por 48."},
   {id:"D3",nv:"alto",rot:"O delegado não aplica medida protetiva: quem concede é o juiz",banca:"Escreve que a autoridade policial defere a medida de imediato."},
   {id:"L1",nv:"alto",rot:"Sem liberdade provisória nos casos de risco à integridade física da vítima ou à efetividade da medida (§ 2º)",banca:"Permite fiança ou liberdade provisória nesses casos."},
   {id:"L2",nv:"medio",rot:"Art. 12-D (2026, segundo o NEXO): monitoração eletrônica imediata pelo juiz ou, sem comarca, pelo delegado, com controle judicial em 24 horas",banca:"Atribui a monitoração ao policial sem controle judicial."}
  ],
  nexo:[["policia",3]], lei:["l11340a12c"], juris:[], teoria:[],
  tab:{head:["Quem afasta o agressor","Quando","Depois"],rows:[
    ["Juiz","Sempre que verificado o risco atual ou iminente à vida ou à integridade da mulher ou dos dependentes","Regra geral","g"],
    ["Delegado de polícia","O município não é sede de comarca","Comunica o juiz em 24 horas; o juiz decide em igual prazo","y"],
    ["Policial","O município não é sede de comarca e não há delegado disponível","Comunica o juiz em 24 horas; o juiz decide em igual prazo","r"]]},
  quiz:[
   {a:"D2",o:"NEXO (questão de prova)",p:"Em município que não é sede de comarca, o delegado pode afastar imediatamente o agressor do lar em caso de risco atual ou iminente, comunicando o juiz em 24 horas.",op:CE,c:0,e:"Certo. Art. 12-C: o juiz afasta; o delegado, se o município não for sede de comarca; o policial, se não houver delegado disponível."},
   {a:"D3",o:"criada, com base no NEXO",p:"Quem concede as medidas protetivas de urgência da Lei Maria da Penha?",op:["O delegado, de imediato","O policial que atende a ocorrência","O juiz","O Ministério Público"],c:2,e:"O delegado não aplica medidas protetivas (veto): quem concede é o juiz. O delegado remete o pedido e, nos casos do art. 12-C, afasta o agressor com controle judicial em 24 horas."},
   {a:"L1",o:"criada, com base no NEXO",p:"Nos casos de risco à integridade física da ofendida ou à efetividade da medida protetiva, o art. 12-C, § 2º:",op:["Veda a liberdade provisória do preso","Veda a prisão em flagrante","Veda o afastamento do lar","Veda a comunicação ao juiz"],c:0,e:"Nesses casos não será concedida liberdade provisória ao preso."}
  ],
  reforco:[
   {a:"D2",o:"NEXO (card mp9, adaptado)",p:"Município sem comarca, risco iminente à vida da mulher, sem juiz presente. Quem afasta o agressor e em quanto tempo o juiz é comunicado?",op:["O delegado (ou o policial, se não houver delegado), com comunicação ao juiz em 24 horas","Somente o juiz, em qualquer caso","O delegado, com comunicação em 48 horas","O Ministério Público, em 24 horas"],c:0,e:"Art. 12-C: delegado, ou policial se não houver delegado; juiz comunicado em 24 horas, que decide em igual prazo."},
   {a:"L2",o:"criada, com base no NEXO",p:"Segundo o NEXO, a monitoração eletrônica imediata do art. 12-D, em município que não é sede de comarca, pode ser determinada por:",op:["Delegado de polícia, com o mesmo controle judicial em 24 horas","Policial militar, sem controle judicial","O Ministério Público","O prefeito"],c:0,e:"Pelo juiz ou, em município que não é sede de comarca, pelo delegado, com controle judicial em 24 horas (alteração de 2026, conforme o material; confira no Planalto)."}
  ],
  resumo:["Art. 12-C: afasta o juiz; o delegado, se o município não for sede de comarca; o policial, se também não houver delegado disponível.","Juiz comunicado em 24 horas e decide em igual prazo sobre manter ou revogar.","Sem liberdade provisória em risco à integridade da vítima ou à efetividade da medida.","O delegado não concede medida protetiva."],
  alt:`<p>Pense numa escada de quem pode afastar o agressor quando há risco atual ou iminente:</p>
  <ol><li><b>Juiz</b>: sempre que está disponível.</li><li><b>Delegado</b>: se o município não for sede de comarca.</li><li><b>Policial</b>: se também não houver delegado disponível.</li></ol>
  <p>Quem desce a escada comunica o juiz em <b>24 horas</b>. Dois números neste capítulo: <b>48</b> (remeter o pedido, art. 12) e <b>24</b> (comunicar o afastamento, art. 12-C).</p>`
},

/* ===== CAPÍTULO 3: Processo, medidas protetivas e crime do art. 24-A ===== */
{
  cap:2, titulo:"Juizados e competência", base:"Arts. 14, 14-A e 15",
  alvos:[
   {id:"M1",nv:"alto",rot:"O juizado é vara especializada da Justiça comum, com competência cível e criminal; não é Juizado Especial",banca:"Chama de Juizado Especial da Lei 9.099 ou diz que só tem competência criminal."},
   {id:"M2",nv:"alto",rot:"Competência cível por opção da ofendida: domicílio ou residência, local do fato ou domicílio do agressor",banca:"Fixa um único foro obrigatório."},
   {id:"M3",nv:"alto",rot:"Divórcio ou dissolução de união estável no juizado: exclui a partilha de bens",banca:"Inclui a partilha ou veda o divórcio no juizado."},
   {id:"M4",nv:"medio",rot:"Atos processuais podem ser noturnos; a mulher é acompanhada por advogado, exceto ao pedir medidas protetivas",banca:"Exige advogado até para o pedido de medida protetiva."}
  ],
  nexo:[["processo",0]], lei:["l11340a14"], juris:[], teoria:[],
  tab:{head:["Tema","Regra","Fundamento"],rows:[
    ["Natureza","Vara especializada da Justiça ordinária, com competência cível e criminal","Art. 14","b"],
    ["Competência cível","Opção da ofendida: seu domicílio ou residência; o lugar do fato; o domicílio do agressor","Art. 15","g"],
    ["Divórcio e união estável","A ofendida pode propor no juizado; fica de fora a partilha de bens","Art. 14-A","y"],
    ["Horário","Os atos processuais podem ser noturnos","Art. 14, parágrafo único","p"]]},
  quiz:[
   {a:"M1",o:"NEXO (card mp10, adaptado)",p:"O Juizado de Violência Doméstica e Familiar contra a Mulher é um Juizado Especial da Lei 9.099?",op:["Sim","Não: é vara especializada da Justiça comum, com competência cível e criminal","Sim, mas só para crimes graves","Não: tem competência apenas criminal"],c:1,e:"É vara especializada da Justiça ordinária com competência cível e criminal; a Lei 9.099 não se aplica."},
   {a:"M2",o:"criada, com base no NEXO",p:"A competência para os processos cíveis é, por opção da ofendida, do juizado:",op:["Somente do domicílio do agressor","Do seu domicílio ou residência, do lugar do fato ou do domicílio do agressor","Apenas do lugar do fato","Do foro da capital"],c:1,e:"Art. 15: por opção da ofendida, os três foros."},
   {a:"M3",o:"criada, com base no NEXO",p:"Quanto à ação de divórcio ou de dissolução de união estável proposta no juizado (art. 14-A):",op:["Inclui a partilha de bens","Exclui a pretensão relacionada à partilha de bens","É vedada","Só o Ministério Público pode propor"],c:1,e:"A ofendida pode propor, mas fica excluída a partilha de bens."}
  ],
  reforco:[
   {a:"M4",o:"criada, com base no NEXO",p:"Sobre o horário dos atos processuais nos juizados da Lei 11.340:",op:["Só em horário comercial","Podem ser realizados em horário noturno","Só aos finais de semana","Só com autorização do CNJ"],c:1,e:"Art. 14, parágrafo único: podem ser noturnos."},
   {a:"M4",o:"criada, com base no NEXO",p:"A mulher deve ser acompanhada por advogado nos atos processuais, exceto:",op:["Ao prestar depoimento","Ao pedir medidas protetivas ao juiz","Na audiência do art. 16","Em nenhum caso"],c:1,e:"O NEXO registra a exceção: ao pedir medidas protetivas ao juiz."}
  ],
  resumo:["Juizado de violência doméstica: vara especializada da Justiça ordinária, com competência cível e criminal.","Competência cível por opção da ofendida: domicílio ou residência, local do fato ou domicílio do agressor.","Divórcio ou dissolução de união estável no juizado, sem a partilha de bens.","Atos podem ser noturnos; advogado nos atos, exceto no pedido de medidas protetivas."],
  alt:`<p>O juizado é uma <b>vara</b> (cível e criminal juntas), não um “Juizado Especial”. Ele serve para resolver tudo de uma vez: o crime, as medidas protetivas e, se a mulher quiser, o divórcio (sem a partilha).</p>
  <p>E quem escolhe o foro cível é a <b>ofendida</b>: onde ela mora, onde o fato ocorreu ou onde mora o agressor.</p>`
},
{
  cap:2, titulo:"Art. 41 e as súmulas do STJ", base:"Art. 41 e súmulas",
  alvos:[
   {id:"G1",nv:"critico",rot:"Lei 9.099/95 não se aplica, qualquer que seja a pena (art. 41; Súmula 536)",banca:"Diz que crime de menor potencial ofensivo admite transação penal ou suspensão do processo."},
   {id:"G4",nv:"critico",rot:"Lesão corporal leve ou culposa: ação pública incondicionada (Súmula 542)",banca:"Condiciona a ação à representação, como na Lei 9.099."},
   {id:"G5",nv:"alto",rot:"Súmula 588: sem substituição por restritiva de direitos; Súmula 589: sem insignificância",banca:"Admite pena restritiva de direitos ou aplica a insignificância."},
   {id:"G6",nv:"alto",rot:"Ameaça por razões da condição do sexo feminino: pena em dobro e ação incondicionada (CP, art. 147, §§ 1º e 2º)",banca:"Trata a ameaça como de ação condicionada e de menor potencial."}
  ],
  nexo:[["processo",1]], lei:["l11340a41"], juris:["stj-sum536","stj-sum588"], teoria:[["processo",0]], comp:[0,1,3,4],
  tab:{head:["Súmula do STJ","Diz que","Em uma palavra"],rows:[
    ["536","Não se aplicam a suspensão condicional do processo nem a transação penal","Sem acordo","b"],
    ["542","A ação penal da lesão corporal na violência doméstica é pública incondicionada","A vítima não retira a ação","g"],
    ["588","Não cabe substituir a pena privativa de liberdade por restritiva de direitos (violência ou grave ameaça, ambiente doméstico)","Sem restritiva","y"],
    ["589","É inaplicável o princípio da insignificância","Nunca é bagatela","r"],
    ["600","Não se exige coabitação para a violência doméstica e familiar","Namoro entra","p"]]},
  quiz:[
   {a:"G1",o:"NEXO (card mp20)",p:"A ameaça contra a mulher no âmbito doméstico é de menor potencial ofensivo e admite transação penal.",op:CE,c:1,e:"Errado. O art. 41 afasta a Lei 9.099 independentemente da pena (Súmula 536)."},
   {a:"G4",o:"NEXO (card mp21, adaptado)",p:"Qual a ação penal da lesão corporal leve na violência doméstica contra a mulher?",op:["Privada","Pública condicionada à representação","Pública incondicionada","Subsidiária da pública"],c:2,e:"Pública incondicionada (Súmula 542)."},
   {a:"G5",o:"criada, com base no NEXO",p:"A Súmula 589 do STJ estabelece que:",op:["Aplica-se a insignificância às lesões leves","É inaplicável o princípio da insignificância nos crimes e contravenções contra a mulher em relações domésticas","Admite-se transação penal","Fixa a competência do Juizado Especial"],c:1,e:"É inaplicável o princípio da insignificância nesses casos."},
   {a:"G6",o:"criada, com base no NEXO",p:"A ameaça contra a mulher por razões da condição do sexo feminino (CP, art. 147, §§ 1º e 2º):",op:["Tem pena em dobro e ação penal pública incondicionada","É de ação penal privada","Depende de representação","Admite transação penal"],c:0,e:"O NEXO registra pena em dobro e ação incondicionada."}
  ],
  reforco:[
   {a:"G1",o:"criada, com base no NEXO",p:"A Súmula 536 do STJ estabelece que:",op:["Suspensão condicional do processo e transação penal não se aplicam","A transação penal é cabível com anuência da vítima","Só a suspensão condicional do processo é aplicável","Ambas se aplicam se a pena for baixa"],c:0,e:"Nos delitos sujeitos ao rito da Lei Maria da Penha, não cabem a suspensão condicional nem a transação penal."},
   {a:"G5",o:"criada, com base no NEXO",p:"Pela Súmula 588 do STJ, nos crimes ou contravenções com violência ou grave ameaça contra a mulher no ambiente doméstico:",op:["Admite-se substituição por restritiva de direitos","Impossibilita-se a substituição da pena privativa de liberdade por restritiva de direitos","Aplica-se sempre o sursis processual","Cabe transação penal"],c:1,e:"Súmula 588: não cabe a substituição por restritiva de direitos."}
  ],
  resumo:["Art. 41: Lei 9.099/95 não se aplica, independentemente da pena. Súmula 536: sem transação penal e sem suspensão condicional do processo.","Súmula 542: lesão leve ou culposa é ação pública incondicionada.","Súmulas 588 (sem restritiva de direitos) e 589 (sem insignificância); 600 (sem coabitação).","Ameaça por razões da condição do sexo feminino: pena em dobro e ação incondicionada."],
  alt:`<p>A ideia por trás de tudo: a lei tira esses crimes do “balcão de acordos” dos Juizados.</p>
  <ul><li>Sem Lei 9.099 (art. 41) → sem <b>transação penal</b> e sem <b>sursis processual</b> (<b>536</b>).</li><li>A vítima não “perdoa” sozinha: lesão leve é <b>incondicionada</b> (<b>542</b>).</li><li>Pena nunca “leve”: sem restritiva de direitos (<b>588</b>) e sem insignificância (<b>589</b>).</li><li>Ameaça por razões do sexo feminino: pena em dobro e incondicionada.</li></ul>`
},
{
  cap:2, titulo:"Representação, decadência e vedações", base:"Arts. 16, 16-A, 17 e 17-A",
  alvos:[
   {id:"G2",nv:"critico",rot:"Retratação: só perante o juiz, em audiência, antes do RECEBIMENTO da denúncia",banca:"Fala em delegacia, em qualquer momento, ou “até o oferecimento” da denúncia."},
   {id:"G3",nv:"critico",rot:"Prazo decadencial para representação: 12 meses (art. 16-A), e não os 6 meses do CPP",banca:"Cobra os 6 meses do CPP."},
   {id:"G7",nv:"alto",rot:"Art. 17 veda cesta básica, prestação pecuniária e multa isolada",banca:"Admite pena de cesta básica ou substituição por multa isolada."},
   {id:"G8",nv:"alto",rot:"Art. 17-A: sigilo do nome da ofendida, não do autor",banca:"Estende o sigilo ao nome do agressor."}
  ],
  nexo:[["processo",2]], lei:["l11340a16"], juris:[], teoria:[], comp:[2,3,5],
  tab:{head:["Artigo","Regra","Número ou ponto de prova"],rows:[
    ["Art. 16","Renúncia à representação perante o juiz, em audiência especialmente designada, ouvido o MP","Antes do recebimento da denúncia","r"],
    ["Art. 16-A","Decadência do direito de queixa ou representação","12 meses, do conhecimento da autoria","y"],
    ["Art. 17","Vedadas cesta básica, outras prestações pecuniárias e substituição por multa isolada","Sem penas “brandas”","b"],
    ["Art. 17-A","Sigilo do nome da ofendida nos processos","O nome do autor não fica sob sigilo","g"]]},
  quiz:[
   {a:"G2",o:"NEXO (questão de prova)",p:"A renúncia à representação da ofendida pode ser feita em qualquer momento do inquérito, perante a autoridade policial.",op:CE,c:1,e:"Errado. Segundo o art. 16, só perante o juiz, em audiência especialmente designada, antes do recebimento da denúncia e ouvido o MP."},
   {a:"G3",o:"NEXO (card mp12, adaptado)",p:"Qual o prazo decadencial para queixa ou representação previsto no art. 16-A?",op:["6 meses","12 meses","30 dias","5 anos"],c:1,e:"12 meses, contados do dia em que a ofendida soube quem é o autor do crime. O CPP prevê 6 meses."},
   {a:"G8",o:"NEXO (card mp13, adaptado)",p:"O sigilo do art. 17-A protege:",op:["O nome do agressor","O nome da ofendida, e não o do autor","Ambos os nomes","Nenhum dos dois"],c:1,e:"Só o nome da ofendida fica sob sigilo; o nome do autor e os demais dados não."},
   {a:"G7",o:"criada, com base no NEXO",p:"O art. 17 da Lei 11.340 veda a aplicação de:",op:["Cesta básica, prestação pecuniária e multa isolada","Prisão preventiva","Medidas protetivas de urgência","Fiança em qualquer hipótese"],c:0,e:"Art. 17: vedadas penas de cesta básica ou prestação pecuniária e substituição por multa isolada."}
  ],
  reforco:[
   {a:"G2",o:"NEXO (card mp11)",p:"A retratação da representação pode ser feita na delegacia até o oferecimento da denúncia.",op:CE,c:1,e:"Errado. Só perante o juiz, em audiência especial, antes do recebimento da denúncia, ouvido o MP (art. 16)."},
   {a:"G3",o:"criada, com base no NEXO",p:"O prazo decadencial geral do CPP para a representação é de 6 meses. Na Lei 11.340 (art. 16-A), o prazo é de:",op:["3 meses","6 meses","12 meses","24 meses"],c:2,e:"12 meses (art. 16-A)."}
  ],
  resumo:["Art. 16: renúncia à representação só perante o juiz, em audiência especialmente designada, antes do recebimento da denúncia, ouvido o MP.","Art. 16-A: decadência em 12 meses, contados do conhecimento da autoria.","Art. 17: vedadas cesta básica, prestação pecuniária e multa isolada.","Art. 17-A: sigilo só do nome da ofendida."],
  alt:`<p>Três números/regras para fixar: <b>juiz</b> (quem ouve a retratação), <b>antes do recebimento</b> (até quando) e <b>12 meses</b> (decadência).</p>
  <p>A pegadinha é o momento: o CPP fala em oferecimento da denúncia; aqui o marco é o <b>recebimento</b>. E o prazo de 6 meses do CPP vira <b>12</b> na Lei Maria da Penha.</p>`
},
{
  cap:2, titulo:"Medidas protetivas de urgência", base:"Arts. 18 a 24",
  alvos:[
   {id:"E1",nv:"critico",rot:"O juiz decide em 48 horas",banca:"Troca por 24 horas ou 5 dias."},
   {id:"E2",nv:"critico",rot:"Concessão sem exigir tipificação penal, ação, inquérito ou B.O.; vigora enquanto persistir o risco",banca:"Condiciona a medida a inquérito ou ação penal em curso."},
   {id:"E3",nv:"alto",rot:"Art. 22 (contra o agressor) é diferente do art. 23 (em favor da ofendida): separação de corpos e auxílio-aluguel por até 6 meses são do art. 23",banca:"Coloca uma medida do art. 23 como se fosse imposta ao agressor."},
   {id:"E4",nv:"alto",rot:"No prazo de 48 horas o juiz também determina a apreensão imediata de arma de fogo sob a posse do agressor (art. 18, IV)",banca:"Atribui a apreensão da arma ao delegado ou a um momento posterior."}
  ],
  nexo:[["processo",3]], lei:["l11340a18","l11340a22"], juris:[], teoria:[], comp:[],
  tab:{head:["Artigo","Medida","Dirigida a"],rows:[
    ["Art. 22, I","Suspensão da posse ou restrição do porte de armas","Agressor","r"],
    ["Art. 22, II","Afastamento do lar, domicílio ou local de convivência","Agressor","r"],
    ["Art. 22, III","Proibição de aproximação, contato e frequentação de lugares","Agressor","r"],
    ["Art. 22, IV e V","Restrição de visitas a menores; alimentos provisionais","Agressor","r"],
    ["Art. 22 (demais)","Programas de recuperação, acompanhamento psicossocial, monitoração eletrônica","Agressor","r"],
    ["Art. 23","Programa de proteção, recondução ao domicílio, afastamento do lar sem perder direitos, separação de corpos, matrícula dos dependentes, auxílio-aluguel até 6 meses","Ofendida","g"],
    ["Art. 24","Proteção patrimonial: restituição de bens, proibição de venda de bens comuns, suspensão de procurações, caução","Patrimônio","y"]]},
  quiz:[
   {a:"E1",o:"NEXO (card mp14, adaptado)",p:"Qual o prazo do juiz para decidir sobre as medidas protetivas, contado do recebimento do expediente?",op:["24 horas","48 horas","5 dias","10 dias"],c:1,e:"Art. 18: 48 horas."},
   {a:"E2",o:"NEXO (card mp15)",p:"A concessão de medida protetiva depende de inquérito ou de ação penal em curso.",op:CE,c:1,e:"Errado. É concedida independentemente de tipificação penal, ação, inquérito ou B.O."},
   {a:"E3",o:"criada, com base no NEXO",p:"Qual das medidas abaixo é em favor da ofendida (art. 23)?",op:["Proibição de contato","Auxílio-aluguel por até 6 meses","Suspensão do porte de armas","Restrição de visitas aos filhos menores"],c:1,e:"O auxílio-aluguel, por período não superior a 6 meses, está no art. 23. As demais são medidas contra o agressor (art. 22)."},
   {a:"E4",o:"criada, com base no NEXO",p:"No prazo de 48 horas, caberá ao juiz, entre outras providências:",op:["Determinar a apreensão imediata de arma de fogo sob a posse do agressor","Receber a denúncia","Conceder fiança","Decretar o divórcio"],c:0,e:"Art. 18, IV: determinar a apreensão imediata de arma de fogo sob a posse do agressor."}
  ],
  reforco:[
   {a:"E2",o:"criada, com base no NEXO",p:"As medidas protetivas de urgência vigoram:",op:["Por 30 dias, prorrogáveis","Enquanto persistir o risco","Até o oferecimento da denúncia","Até a sentença"],c:1,e:"O NEXO registra que as medidas vigoram enquanto persistir o risco."},
   {a:"E3",o:"criada, com base no NEXO",p:"A separação de corpos é medida:",op:["Do art. 22, contra o agressor","Do art. 23, em favor da ofendida","Do art. 24-A, penal","Do art. 41, processual"],c:1,e:"Art. 23: programa de proteção, recondução ao domicílio, afastamento do lar sem perder direitos, separação de corpos, matrícula dos dependentes, auxílio-aluguel."}
  ],
  resumo:["Juiz decide em 48 horas, a pedido da ofendida ou requerimento do MP, sem exigir tipificação penal, ação, inquérito ou B.O.; as medidas vigoram enquanto persistir o risco.","Art. 22 (contra o agressor): armas, afastamento do lar, aproximação/contato/lugares, visitas a menores, alimentos, programas de recuperação, acompanhamento psicossocial, monitoração eletrônica.","Art. 23 (à ofendida): proteção, recondução, afastamento do lar sem perder direitos, separação de corpos, matrícula, auxílio-aluguel até 6 meses. Art. 24: proteção patrimonial."],
  alt:`<p>Separe em colunas e decore o “para quem”:</p>
  <ul><li><b>Art. 22: contra o agressor</b> → tira arma, tira de casa, afasta, limita visitas, alimentos, reeducação, monitoração.</li><li><b>Art. 23: em favor da vítima</b> → proteção, volta para casa, sai do lar sem perder direitos, separação de corpos, matrícula dos filhos, aluguel por até 6 meses.</li><li><b>Art. 24: patrimônio</b> → bens e procurações.</li></ul>
  <p>A medida é de urgência: não depende de inquérito nem de B.O.</p>`
},
{
  cap:2, titulo:"Crime de descumprimento (art. 24-A) e prisão preventiva", base:"Arts. 20 e 24-A",
  alvos:[
   {id:"F1",nv:"critico",rot:"Pena: reclusão de 2 a 5 anos e multa",banca:"Cobra a redação anterior (detenção de 3 meses a 2 anos) ou mistura reclusão com detenção. Fixe a redação atual."},
   {id:"F2",nv:"critico",rot:"Em flagrante, só o juiz concede fiança; o delegado não",banca:"Diz que o delegado arbitra fiança por ser pena baixa."},
   {id:"F3",nv:"alto",rot:"Aumento de 1/3 até a metade se violar a área de exclusão monitorada ou mexer no dispositivo",banca:"Troca a fração ou o motivo do aumento."},
   {id:"F4",nv:"alto",rot:"Configura-se independentemente de o juiz ser cível ou criminal",banca:"Exige que a medida tenha sido deferida por juízo criminal."},
   {id:"E5",nv:"medio",rot:"Prisão preventiva (art. 20): em qualquer fase do inquérito ou da instrução",banca:"Limita a preventiva a uma fase do processo."}
  ],
  nexo:[["processo",4]], lei:["l11340a24a"], juris:[], teoria:[], comp:[],
  tab:{head:["Item","Regra do art. 24-A","Ponto de prova"],rows:[
    ["Pena","Reclusão de 2 a 5 anos e multa","Redação atual segundo o NEXO","g"],
    ["Redação anterior","Detenção de 3 meses a 2 anos","Não use mais: é a armadilha","r"],
    ["Competência do juiz","Independe de ser cível ou criminal (§ 1º)","","b"],
    ["Fiança","Em flagrante, apenas a autoridade judicial (§ 2º)","O delegado não arbitra","y"],
    ["Aumento","De 1/3 até a metade: violação da área de exclusão monitorada ou do dispositivo (§ 4º)","","p"]]},
  quiz:[
   {a:"F1",o:"NEXO (card mp18, adaptado)",p:"Qual a pena do crime de descumprimento de medida protetiva (art. 24-A)?",op:["Detenção de 3 meses a 2 anos","Reclusão de 2 a 5 anos e multa","Reclusão de 1 a 4 anos","Detenção de 6 meses a 1 ano"],c:1,e:"Reclusão de 2 a 5 anos e multa, segundo o NEXO. A detenção de 3 meses a 2 anos é a redação anterior."},
   {a:"F2",o:"NEXO (card mp19, adaptado)",p:"Agressor preso em flagrante por descumprir medida protetiva. Quem pode arbitrar a fiança?",op:["O delegado de polícia","O policial que efetuou a prisão","Apenas o juiz","O Ministério Público"],c:2,e:"Apenas o juiz (art. 24-A, § 2º). O delegado não."},
   {a:"F3",o:"criada, com base no NEXO",p:"A pena do art. 24-A aumenta de 1/3 até a metade quando:",op:["O agressor é reincidente","O agressor viola a área de exclusão monitorada ou mexe no dispositivo","Há filhos menores","O fato ocorre à noite"],c:1,e:"O aumento é de 1/3 até a metade se violar a área de exclusão monitorada ou mexer no dispositivo."},
   {a:"E5",o:"criada, com base no NEXO",p:"Nos casos da Lei 11.340, a prisão preventiva pode ser decretada:",op:["Somente na execução da pena","Em qualquer fase do inquérito policial ou da instrução criminal","Apenas após a sentença","Somente com a denúncia"],c:1,e:"Art. 20: em qualquer fase do inquérito policial ou da instrução criminal."}
  ],
  reforco:[
   {a:"F4",o:"criada, com base no NEXO",p:"O crime do art. 24-A se configura:",op:["Só se a medida foi deferida por juiz criminal","Independentemente de a competência do juiz que deferiu ser cível ou criminal","Só depois de condenação anterior","Só se houver B.O."],c:1,e:"O NEXO registra que o crime independe de a competência do juiz ser cível ou criminal."},
   {a:"F1",o:"NEXO (questão de prova, adaptada)",p:"Agressor, intimado de medida protetiva, procura a vítima em casa. Qual o crime e quem arbitra a fiança em flagrante?",op:["Art. 24-A, detenção; o delegado arbitra a fiança","Art. 24-A, reclusão de 2 a 5 anos e multa; só o juiz concede fiança","Desobediência; o delegado arbitra a fiança","Art. 24-A; ninguém pode arbitrar fiança"],c:1,e:"Art. 24-A, reclusão de 2 a 5 anos e multa. Em flagrante, apenas o juiz concede fiança."}
  ],
  resumo:["Descumprir decisão judicial que defere medida protetiva: reclusão de 2 a 5 anos e multa.","Independe de a competência do juiz ser cível ou criminal.","Fiança em flagrante: só o juiz.","Aumento de 1/3 até a metade se violar a área de exclusão monitorada ou mexer no dispositivo.","Prisão preventiva (art. 20): em qualquer fase do inquérito ou da instrução."],
  alt:`<p>Quatro fatos: <b>reclusão</b>, <b>2 a 5 anos e multa</b>, <b>só o juiz dá fiança</b>, <b>independe da vara</b>.</p>
  <p>Raciocínio: a medida foi dada por um juiz. Quem a descumpre desafia a ordem judicial; por isso a fiança fica com o juiz e não importa se ele era cível ou criminal. Material mais antigo ainda traz detenção de 3 meses a 2 anos; para a prova, use a redação atual do NEXO.</p>`
}
];

/* ---------- ESTADO ---------- */
var S = {tela:"inicio", i:0, cap:0, fase:"aula", set:"quiz", qi:0, esc:null, acertos:0, total:0, tent:0, marks:[], erros:[], pontos:0, perguntas:0, res:{}, setNo:{}, pend:null, blk:0, rev:{}};
var LET = ["A","B","C","D","E"];
var $root=null,$main=null,$seg=null,$where=null;

function capTitulo(c){ return NEXO.sec[CAPS[c].id].titulo; }
function passosDoCap(c){ var o=[]; PASSOS.forEach(function(p,k){ if(p.cap===c) o.push(k); }); return o; }
function alvoDe(p,id){ for (var k=0;k<p.alvos.length;k++) if (p.alvos[k].id===id) return p.alvos[k]; return null; }
function resetPasso(){ S.fase="aula"; S.set="quiz"; S.qi=0; S.esc=null; S.acertos=0; S.total=0; S.tent=0; S.setNo={}; S.blk=0; S.rev={}; }
function irPasso(k){ S.i=k; S.cap=PASSOS[k].cap; S.tela="aula"; resetPasso(); }
function proximo(marca){
  S.marks[S.i]=marca;
  var ult = passosDoCap(S.cap).slice(-1)[0];
  if (S.i < ult){ irPasso(S.i+1); }
  else { S.tela="cap"; }
  render();
}
function fmtLei(s){
  return String(s)
    .replace(/ (?=(Art\. \d+(?:-[A-Z])?[.º]|Parágrafo único\.))/g,"<br><br>")
    .replace(/ (?=§ \d+º)/g,"<br>")
    .replace(/; (?=[IVX]+ - )/g,";<br>")
    .replace(/: (?=I - )/g,":<br>");
}
function seg(){
  var nomes=["Conceito e assistência","Atendimento policial","Processo e medidas"];
  $seg.innerHTML=CAPS.map(function(c,ci){
    var ps=passosDoCap(ci), done=ps.every(function(k){return S.marks[k];}), now=S.tela!=="inicio"&&S.tela!=="fim"&&S.cap===ci;
    return '<div class="mp'+(now?' now':'')+(done?' done':'')+'"><b>'+(ci+1)+'. '+nomes[ci]+'</b><span class="dots">'+ps.map(function(k){var m=S.marks[k]||(S.tela==="aula"&&k===S.i?"now":"");return '<i class="'+m+'"></i>';}).join("")+'</span></div>';
  }).join("");
  var w="";
  if (S.tela==="aula"){ var ps2=passosDoCap(S.cap); w="Passo "+(ps2.indexOf(S.i)+1)+" de "+ps2.length+" · "+PASSOS[S.i].titulo+" · "+PASSOS[S.i].base; }
  else if (S.tela==="cap") w="Capítulo "+(S.cap+1)+" · resumo";
  else if (S.tela==="fim") w="Resultado";
  $where.textContent=w;
}

function tabela(t){
  return '<div class="tw"><table><tr>'+t.head.map(function(x){return '<th>'+x+'</th>';}).join("")+'</tr>'+
   t.rows.map(function(r){ var cor=COR[r[r.length-1]]||""; var cells=r.slice(0,t.head.length);
     return '<tr class="'+cor+'">'+cells.map(function(x,j){return '<td>'+(j===0?'<b>'+x+'</b>':x)+'</td>';}).join("")+'</tr>'; }).join("")+'</table></div>';
}
function tabelaComp(idx){
  var C=NEXO.comp;
  return '<div class="tw"><table><tr><th>'+C.head[0]+'</th><th>'+C.head[1]+'</th></tr>'+idx.map(function(i){return '<tr><td>'+C.rows[i][0]+'</td><td class="c-p">'+C.rows[i][1]+'</td></tr>';}).join("")+'</table></div>';
}
function blocoNexo(par){ return '<div class="nexo"><span class="src">NEXO · '+capTitulo(par[0]==="conceito"?0:par[0]==="policia"?1:2)+'</span>'+R(par[0],par[1])+'</div>'; }
function blocoTeoria(par){
  var t=NEXO.sec[par[0]].teoria[par[1]];
  return '<div class="nexo"><span class="src">NEXO · Teoria · '+t.h+'</span>'+t.p.map(function(x){return '<p>'+x+'</p>';}).join("")+'</div>';
}
function blocoLei(id){
  var l=NEXO.lei[id];
  return '<div class="lei"><span class="src">Texto da lei no NEXO · '+l.art+'</span><b>'+l.rot+'</b><p>'+fmtLei(l.t)+'</p></div>';
}
function blocoJuris(id){
  var j=NEXO.juris[id];
  return '<div class="juris"><span class="src">'+j.trib+' · '+j.num+' ('+j.status+') · '+j.titulo+'</span><p>'+j.texto+'</p><p class="ref">'+j.explica+'</p></div>';
}
function listaAlvos(p, comStatus){
  return '<ol>'+p.alvos.map(function(a){
    var st="";
    if (comStatus){ var r=S.res[a.id]; st=' <span class="st '+(r==="ok"?"ok":r==="no"?"no":"nt")+'">'+(r==="ok"?"Acertou":r==="no"?"Errou":"Não testado")+'</span>'; }
    return '<li><span class="nv '+a.nv+'">'+NV[a.nv]+'</span><b>'+a.rot+'</b>'+st+'<br><span class="ref">Como a banca pega: '+a.banca+'</span></li>';
  }).join("")+'</ol>';
}

function telaInicio(){
  var caps=CAPS.map(function(c,ci){
    var ps=passosDoCap(ci);
    return '<div class="capcard"><p class="kicker">Capítulo '+(ci+1)+' · '+ps.length+' passos</p><h3>'+capTitulo(ci)+'</h3>'+
    '<ul>'+ps.map(function(k){return '<li>'+PASSOS[k].titulo+' <span class="ref">('+PASSOS[k].base+')</span></li>';}).join("")+'</ul>'+
    '<button class="btn primary" data-al="comecar" data-cap="'+ci+'">'+(ci===0?"Começar pelo capítulo 1":"Ir direto ao capítulo "+(ci+1))+'</button></div>';
  }).join("");
  return '<section class="card"><p class="kicker">Lei 11.340/2006 · conteúdo do NEXO</p><h1 id="foco" tabindex="-1">Lei Maria da Penha</h1>'+
  '<p class="lead">Mesmas '+CAPS.length+' divisões do módulo no NEXO. Em cada passo: pontos de atenção, texto, quadro, lei, questões e autoavaliação.</p>'+
  '<div class="chips3"><span class="chip a"><b>Entendi</b> próximo assunto</span><span class="chip b"><b>Tive dúvidas</b> resumo objetivo</span><span class="chip c"><b>Não entendi</b> outra explicação</span></div>'+
  '<div class="caps">'+caps+'</div></section>';
}
function cartoesQuadro(t){
  return '<div class="vcards">'+t.rows.map(function(r){var cor=COR[r[r.length-1]]||"";
    return '<div class="vc '+cor+'"><b>'+r[0]+'</b><p>'+r[1]+'</p>'+(r[2]?'<span class="ex"><i>Exemplo</i> '+r[2]+'</span>':'')+'</div>';}).join("")+'</div>';
}
function blocosAula(p){
  var a0=p.alvos[0], b=[];
  var prof=p.alvos.map(function(a,k){
    return '<div class="fala"><span class="av">Prof.</span><div class="bal"><span class="nv '+a.nv+'">'+NV[a.nv]+'</span> <b>'+a.rot+'</b><br><span class="ref">'+(k===0?'Cuidado: ':'A banca ')+(k===0?'a banca ':'')+a.banca.charAt(0).toLowerCase()+a.banca.slice(1)+'</span></div></div>';}).join("");
  b.push({n:"Regra de ouro",h:'<div class="ouro"><span class="rot">Regra de ouro</span><p>'+a0.rot+'</p></div><p class="vlabel">O que o professor quer que você leve deste assunto</p>'+prof});
  var ent=p.nexo.map(blocoNexo).join("")+p.teoria.map(blocoTeoria).join("");
  if (p.tab) ent+='<h3>Em resumo</h3>'+(p.tab.rows.length<=4?cartoesQuadro(p.tab):tabela(p.tab));
  if (p.comp && p.comp.length) ent+='<h3>Regra geral × violência doméstica</h3>'+tabelaComp(p.comp);
  b.push({n:"Entenda",h:ent});
  b.push({n:"Memorize",h:'<p class="vlabel">Toque no cartão para revelar a resposta certa</p><div class="rev">'+p.alvos.map(function(a,k){var on=S.rev&&S.rev[p.titulo+k];
    return '<button type="button" class="rv'+(on?' on':'')+'" data-al="rev" data-k="'+k+'"><span class="q">A banca diz: '+a.banca+'</span><span class="r">'+(on?'<i>Certo:</i> '+a.rot:'Toque para revelar')+'</span></button>';}).join("")+'</div>'});
  var l=""; if (p.lei.length) l+='<h3>Texto da lei</h3>'+p.lei.map(blocoLei).join("");
  if (p.juris.length) l+='<h3>Jurisprudência</h3>'+p.juris.map(blocoJuris).join("");
  if (l) b.push({n:"Lei e súmulas",h:l});
  return b;
}
function telaAula(){
  var p=PASSOS[S.i], bl=blocosAula(p); if (S.blk>=bl.length) S.blk=bl.length-1;
  var h='<section class="card"><p class="kicker">Capítulo '+(S.cap+1)+' · '+capTitulo(S.cap)+'</p><h2 id="foco" tabindex="-1">'+p.titulo+' <span class="ref">'+p.base+'</span></h2>';
  h+='<div class="blks" role="tablist">'+bl.map(function(x,k){return '<button type="button" class="blk'+(k===S.blk?' on':'')+'" data-al="bloco" data-k="'+k+'"><i>'+(k+1)+'</i>'+x.n+'</button>';}).join("")+'</div>';
  h+=bl[S.blk].h;
  var ult=S.blk===bl.length-1;
  h+='<div class="actions bar">'+(S.blk>0?'<button class="btn" data-al="bloco" data-k="'+(S.blk-1)+'">Voltar</button>':'')+
    (ult?'<button class="btn primary" data-al="questoes">Ir para as questões</button>':'<button class="btn primary" data-al="bloco" data-k="'+(S.blk+1)+'">Continuar</button>')+'</div></section>';
  return h;
}
function telaAlt(){
  var p=PASSOS[S.i], falhos=p.alvos.filter(function(a){return S.res[a.id]==="no";});
  var foco=falhos.length?'<div class="miss"><b>Você errou:</b><ul>'+falhos.map(function(a){return '<li><span class="nv '+a.nv+'">'+NV[a.nv]+'</span>'+a.rot+'</li>';}).join("")+'</ul>Preste atenção especial nesses pontos.</div>':'';
  return '<section class="card"><p class="kicker">Explicando de outro jeito</p><h2 id="foco" tabindex="-1">'+p.titulo+'</h2>'+foco+p.alt+
  '<div class="actions"><button class="btn primary" data-al="reforco">Refazer com questões novas</button></div></section>';
}
function telaResumo(){
  var p=PASSOS[S.i];
  var falhos=p.alvos.filter(function(a){return S.res[a.id]==="no";});
  var ordem=falhos.concat(p.alvos.filter(function(a){return S.res[a.id]!=="no";}));
  var primeiro=falhos.length?'<p><b>Comece por estes pontos, em que você errou:</b></p>':'<p><b>Pontos de atenção do assunto:</b></p>';
  var lista='<ol>'+ordem.map(function(a){return '<li><span class="nv '+a.nv+'">'+NV[a.nv]+'</span><b>'+a.rot+'</b>'+(S.res[a.id]==="no"?' <span class="st no">Errou</span>':'')+'</li>';}).join("")+'</ol>';
  return '<section class="card"><p class="kicker">Resumo objetivo</p><h2 id="foco" tabindex="-1">'+p.titulo+'</h2>'+primeiro+lista+
  '<h3>O que foi explicado</h3><ul>'+p.resumo.map(function(t){return "<li>"+t+"</li>";}).join("")+'</ul>'+
  '<div class="actions"><button class="btn primary" data-al="seguir">Continuar</button></div></section>';
}
function telaQuiz(){
  var p=PASSOS[S.i], qs=p[S.set], q=qs[S.qi];
  var ops=q.op.map(function(o,k){
    var cls="opt", dis="";
    if (S.esc!==null){ dis=" disabled"; if(k===q.c) cls+=" right"; else if(k===S.esc) cls+=" wrong"; }
    return '<button class="'+cls+'" data-al="marcar" data-k="'+k+'"'+dis+'><span class="l">'+(q.op===CE?"":LET[k])+'</span><span>'+o+'</span></button>';
  }).join("");
  var fb="";
  if (S.esc!==null){
    var ok=S.esc===q.c, a=alvoDe(p,q.a);
    fb='<div class="fb '+(ok?"ok":"no")+'" role="status"><b class="t">'+(ok?"Correto.":"Incorreto. A resposta é "+(q.op===CE?q.op[q.c]:LET[q.c])+".")+'</b>'+q.e+'</div>';
    if (!ok && a) fb+='<div class="miss"><span class="nv '+a.nv+'">Ponto '+NV[a.nv]+'</span><b>'+a.rot+'</b><br><span class="ref">Como a banca pega: '+a.banca+'</span></div>';
    fb+='<div class="actions"><button class="btn primary" data-al="proxq">'+(S.qi<qs.length-1?"Próxima questão":"Terminar questões")+'</button></div>';
  }
  return '<section class="card"><p class="kicker">'+p.titulo+' · '+(S.set==="reforco"?"questões novas ":"questão ")+(S.qi+1)+' de '+qs.length+'</p>'+
  '<p class="q" id="foco" tabindex="-1">'+q.p+'</p><p class="orig">Origem: '+q.o+'</p><div class="opts">'+ops+'</div>'+fb+'</section>';
}
function telaAuto(){
  var p=PASSOS[S.i];
  return '<section class="card"><p class="kicker">Autoavaliação · '+p.titulo+'</p>'+
  '<p class="score" id="foco" tabindex="-1">'+S.acertos+' de '+S.total+' questões certas</p>'+
  '<div class="alvos"><h3>Seus pontos de atenção neste assunto</h3>'+listaAlvos(p,true)+'</div>'+
  '<p>Como foi este assunto?</p><div class="triple">'+
  '<button class="tri a" data-al="entendi"><b>Entendi</b><span>Passa para o próximo assunto.</span></button>'+
  '<button class="tri b" data-al="duvida"><b>Tive dúvidas</b><span>Resumo objetivo, começando pelos pontos em que você errou.</span></button>'+
  '<button class="tri c" data-al="naoentendi"><b>Não entendi</b><span>'+(S.tent<1?"Explica de outra maneira e refaz questões novas.":"Marca para revisão e mostra o resumo.")+'</span></button></div></section>';
}
function stTag(r){ return '<span class="st '+(r==="ok"?"ok":r==="no"?"no":"nt")+'">'+(r==="ok"?"Acertou":r==="no"?"Errou":"Não testado")+'</span>'; }
function telaCap(){
  var c=CAPS[S.cap], sec=NEXO.sec[c.id], last=S.cap===CAPS.length-1;
  var h='<section class="card"><p class="kicker">Resumo do capítulo '+(S.cap+1)+'</p><h2 id="foco" tabindex="-1">'+sec.titulo+'</h2>';
  h+='<h3>Em poucas linhas</h3><ul>'+c.resumo.map(function(t){return '<li>'+t+'</li>';}).join("")+'</ul>';
  h+='<h3>Decore (tabela do NEXO)</h3><div class="tw"><table><tr><th>Assunto</th><th>O que decorar</th><th>Tipo</th></tr>'+c.decore.map(function(i){
    var d=NEXO.decore[i], t=TIPODEC[c.tipoDec[i]];
    return '<tr class="'+t[1]+'"><td><b>'+d[0]+'</b></td><td>'+d[1]+'</td><td>'+t[0]+'</td></tr>'; }).join("")+'</table></div>';
  if (c.macetes.length) h+='<h3>Macetes do NEXO</h3>'+c.macetes.map(function(i){var m=NEXO.macetes[i];return '<div class="macete"><b>'+m[0]+'.</b> '+m[1]+'</div>';}).join("");
  h+='<h3>Pegadinhas do capítulo</h3><div class="pegadinha"><ul>'+sec.pegadinhas.map(function(t){return '<li>'+t+'</li>';}).join("")+'</ul></div>';
  var js=NEXO.jurisSec[c.id]||[];
  if (js.length) h+='<h3>Jurisprudência do capítulo</h3><div class="tw"><table><tr><th>Súmula</th><th>Texto</th></tr>'+js.map(function(j){return '<tr class="c-b"><td><b>'+j.trib+' · '+j.num+'</b></td><td>'+j.texto+'</td></tr>';}).join("")+'</table></div>';
  var cards=NEXO.cardsSec[c.id]||[];
  h+='<h3>Cards de revisão (NEXO)</h3><div class="tw"><table><tr><th>Pergunta</th><th>Resposta</th><th>Tipo</th></tr>'+cards.map(function(cd){var t=TIPOCARD[cd.tipo]||["Card","c-p"];return '<tr class="'+t[1]+'"><td>'+cd.f+'</td><td>'+cd.v+'</td><td>'+t[0]+'</td></tr>';}).join("")+'</table></div>';
  var linhas=[];
  passosDoCap(S.cap).forEach(function(k){ var p=PASSOS[k]; var m=S.marks[k]; p.alvos.forEach(function(a){ linhas.push({a:a,p:p,r:S.res[a.id]||"nt"}); }); });
  var peso={no:0,nt:1,ok:2}, nvp={critico:0,alto:1,medio:2};
  linhas.sort(function(x,y){return (peso[x.r]-peso[y.r])||(nvp[x.a.nv]-nvp[y.a.nv]);});
  h+='<h3>Seu desempenho no capítulo</h3><div class="tw"><table><tr><th>Ponto de atenção</th><th>Nível</th><th>Status</th></tr>'+linhas.map(function(t){return '<tr><td>'+t.a.rot+'<br><span class="ref">'+t.p.titulo+' · '+t.p.base+'</span></td><td><span class="nv '+t.a.nv+'">'+NV[t.a.nv]+'</span></td><td>'+stTag(t.r)+'</td></tr>';}).join("")+'</table></div>';
  h+='<h3>Você deve saber (checklist do NEXO)</h3><ul>'+c.check.map(function(i){return '<li>'+NEXO.checklist[i]+'</li>';}).join("")+'</ul>';
  h+='<div class="actions"><button class="btn primary" data-al="proxcap">'+(last?"Ver resultado final":"Ir para o capítulo "+(S.cap+2))+'</button></div></section>';
  return h;
}
function telaFim(){
  var nomes={entendi:"Entendi",duvida:"Dúvidas",revisar:"Revisar"};
  var linhas=PASSOS.map(function(p,k){var m=S.marks[k]; return '<tr><td>'+(p.cap+1)+'.'+(passosDoCap(p.cap).indexOf(k)+1)+' '+p.titulo+'<br><span class="ref">'+p.base+'</span></td><td style="text-align:right">'+(m?'<span class="badge '+m+'">'+nomes[m]+'</span>':'<span class="st nt">Não feito</span>')+'</td></tr>';}).join("");
  var todos=[]; PASSOS.forEach(function(p,k){ p.alvos.forEach(function(a){ todos.push({a:a,p:p,k:k,r:S.res[a.id]||"nt"}); }); });
  var peso={no:0,nt:1,ok:2}, nvp={critico:0,alto:1,medio:2};
  todos.sort(function(x,y){return (peso[x.r]-peso[y.r])||(nvp[x.a.nv]-nvp[y.a.nv])||(x.k-y.k);});
  var fracos=todos.filter(function(t){return t.r==="no"&&t.a.nv==="critico";}).length;
  var mapa='<h3>Mapa de pontos de atenção</h3><div class="tw"><table><tr><th>Ponto</th><th>Nível</th><th>Status</th></tr>'+todos.map(function(t){return '<tr><td>'+t.a.rot+'<br><span class="ref">Capítulo '+(t.p.cap+1)+' · '+t.p.base+'</span></td><td><span class="nv '+t.a.nv+'">'+NV[t.a.nv]+'</span></td><td>'+stTag(t.r)+'</td></tr>';}).join("")+'</table></div>';
  var pct=S.perguntas?Math.round(100*S.pontos/S.perguntas):0;
  var erros=S.erros.length?'<h3>Caderno de erros</h3>'+S.erros.map(function(e){return '<div class="fb no" style="margin-bottom:10px"><b class="t">'+e.passo+'</b>'+e.p+'<br><b>Resposta:</b> '+e.certa+'<br><span class="ref">'+e.e+'</span></div>';}).join(""):'<p>Nenhum erro registrado.</p>';
  return '<section class="card"><p class="kicker">Fim da aula</p><h2 id="foco" tabindex="-1">Resultado</h2>'+
  '<p class="score">'+S.pontos+' de '+S.perguntas+' questões certas ('+pct+'%)</p>'+
  (fracos?'<div class="pegadinha"><b>Atenção:</b> '+fracos+' ponto(s) crítico(s) com erro. Estão no topo do mapa abaixo; revise estes primeiro.</div>':'<div class="macete"><b>Nenhum ponto crítico com erro.</b> Bom momento para um simulado misto.</div>')+
  '<table class="rep"><tbody>'+linhas+'</tbody></table>'+mapa+erros+
  '<div class="actions"><button class="btn primary" data-al="refazer">Refazer a aula</button></div></section>';
}
function render(){
  var h=S.tela==="inicio"?telaInicio():S.tela==="fim"?telaFim():S.tela==="cap"?telaCap():
    S.fase==="aula"?telaAula():S.fase==="quiz"?telaQuiz():S.fase==="auto"?telaAuto():S.fase==="alt"?telaAlt():telaResumo();
  $main.innerHTML=h; seg(); salvar();
  var f=$root.querySelector("#foco"); if (f){ try{ f.focus({preventScroll:true}); }catch(e){} }
  var v=document.getElementById("view"); if(v) v.scrollTop=0; window.scrollTo(0,0);
}
document.addEventListener("click",function(ev){
  if(!$root||!document.body.contains($root)) return;
  var b=ev.target.closest("#al-root [data-al]"); if(!b||b.disabled) return;
  var a=b.getAttribute("data-al"), p=PASSOS[S.i];
  if(a==="comecar"){ S.marks=[]; S.erros=[]; S.pontos=0; S.perguntas=0; S.res={}; irPasso(passosDoCap(+b.getAttribute("data-cap"))[0]); }
  else if(a==="questoes"||a==="reforco"){ S.fase="quiz"; S.set=(a==="questoes"?"quiz":"reforco"); S.qi=0; S.esc=null; S.acertos=0; S.total=0; S.setNo={}; }
  else if(a==="marcar"){
    if(S.esc!==null) return;
    var q=p[S.set][S.qi]; S.esc=+b.getAttribute("data-k"); S.total++; S.perguntas++;
    if(S.esc===q.c){ S.acertos++; S.pontos++; } else { S.setNo[q.a]=true; S.erros.push({passo:p.titulo+" · "+(alvoDe(p,q.a)||{rot:""}).rot,p:q.p,certa:(q.op===CE?q.op[q.c]:LET[q.c]+") "+q.op[q.c]),e:q.e}); }
    S.res[q.a]=S.setNo[q.a]?"no":"ok";
  }
  else if(a==="proxq"){ if(S.qi<p[S.set].length-1){ S.qi++; S.esc=null; } else { S.fase="auto"; } }
  else if(a==="rev"){ var kk=PASSOS[S.i].titulo+b.getAttribute("data-k"); S.rev[kk]=!S.rev[kk]; }
  else if(a==="bloco"){ S.blk=+b.getAttribute("data-k"); }
  else if(a==="entendi"){ proximo("entendi"); return; }
  else if(a==="duvida"){ S.pend="duvida"; S.fase="resumo"; }
  else if(a==="naoentendi"){ if(S.tent<1){ S.tent++; S.fase="alt"; } else { S.pend="revisar"; S.fase="resumo"; } }
  else if(a==="seguir"){ var m=S.pend||"duvida"; S.pend=null; proximo(m); return; }
  else if(a==="proxcap"){ if(S.cap<CAPS.length-1){ irPasso(passosDoCap(S.cap+1)[0]); } else { S.tela="fim"; } }
  else if(a==="refazer"){ S.tela="inicio"; }
  render();
});


/* ---------- progresso (neste navegador) ---------- */
var KEY="nexo_aulas_v1";
function carregar(){ try{ return JSON.parse(localStorage.getItem(KEY)||"{}").ext_mariapenha||null; }catch(e){ return null; } }
function salvar(){ try{ if(S.tela==="inicio") return; var o=JSON.parse(localStorage.getItem(KEY)||"{}"); o.ext_mariapenha={marks:S.marks,i:S.i,cap:S.cap,pontos:S.pontos,perguntas:S.perguntas,t:Date.now()}; localStorage.setItem(KEY,JSON.stringify(o)); }catch(e){} }
function feitos(sv){ return sv&&sv.marks?sv.marks.filter(Boolean).length:0; }

/* ---------- página "Aulas guiadas" (item próprio do menu) ---------- */
function setCurAulas(){ try{ current='aulas'; }catch(e){} try{ renderNav(); }catch(e){} var h=document.getElementById('head'); if(h) h.textContent='Aulas guiadas'; try{ if(typeof closeMobileNav==='function') closeMobileNav(); }catch(e){} document.body.classList.remove('lv-on'); var lat=document.querySelector('.lv-lateral'); if(lat) lat.hidden=true; document.body.classList.remove('al-on'); }
window.nexoAulas=function(){
  if(!NEXO) return; setCurAulas(); $root=null;
  var sv=carregar(), n=feitos(sv), tot=PASSOS.length, pct=Math.round(n/tot*100);
  var ca=CAPS.map(function(c,ci){ var ps=passosDoCap(ci), f=ps.filter(function(k){return sv&&sv.marks&&sv.marks[k];}).length; return '<li><span>Capítulo '+(ci+1)+' · '+capTitulo(ci)+'</span><small>'+f+'/'+ps.length+'</small></li>'; }).join("");
  var breve=[["Contabilidade","Prioridade alta no edital"],["Estatística","Prioridade alta no edital"],["Medicina Legal","Prioridade alta no edital"]].map(function(x){ return '<div class="al-card dis"><span class="al-tag">Em preparo</span><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div>'; }).join("");
  document.getElementById('view').innerHTML='<div class="nx-page al-page"><div class="nx-head"><div><h1>Aulas guiadas</h1><p>O professor conduz o assunto passo a passo: mostra onde a banca pega, você responde questões de marcar e diz se entendeu. Os capítulos seguem as mesmas divisões dos livros digitais.</p></div></div>'
   +'<div class="al-grid"><div class="al-card"><span class="al-tag ok">Disponível</span><h3>Lei 11.340/2006: Lei Maria da Penha</h3><p>Legislação Extravagante · '+CAPS.length+' capítulos · '+tot+' passos · 44 questões</p>'
   +'<div class="al-bar"><i style="width:'+pct+'%"></i></div><small>'+(n?pct+'% concluído · '+n+' de '+tot+' passos':'Ainda não iniciada')+'</small>'
   +'<ul class="al-caps">'+ca+'</ul>'
   +'<div class="al-acts"><button type="button" class="nx-btn primary" data-aula-abrir="'+(n?'continuar':'novo')+'">'+(n?'Continuar de onde parei':'Começar aula')+'</button>'+(n?'<button type="button" class="nx-btn" data-aula-abrir="novo">Recomeçar</button>':'')+'</div></div>'+breve+'</div></div>';
};
function abrirAula(modo){
  if(!NEXO) return; setCurAulas(); document.body.classList.add('al-on');
  var v=document.getElementById('view');
  v.innerHTML='<div class="al" id="al-root"><div class="al-top"><div class="al-row"><button type="button" class="al-back" data-al-sair>← Aulas guiadas</button><span class="al-brand">Lei Maria da Penha</span><button type="button" class="btn" data-al-livro>Ver no livro</button></div><div class="al-where" id="where"></div><div class="al-seg" id="seg" aria-hidden="true"></div></div><div id="main"></div></div>';
  $root=document.getElementById('al-root'); $main=$root.querySelector('#main'); $seg=$root.querySelector('#seg'); $where=$root.querySelector('#where');
  var sv=modo==='continuar'?carregar():null;
  S.marks=sv&&sv.marks||[]; S.erros=[]; S.pontos=sv?sv.pontos||0:0; S.perguntas=sv?sv.perguntas||0:0; S.res={};
  if(sv){ irPasso(sv.i||0); } else { S.tela="inicio"; }
  render();
}
document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest.bind(e.target); if(!t) return;
  var b=t('[data-aula-abrir]'); if(b){ e.preventDefault(); abrirAula(b.getAttribute('data-aula-abrir')); return; }
  if(t('[data-al-sair]')){ document.body.classList.remove('al-on'); window.nexoAulas(); return; }
  if(t('[data-al-livro]')){ document.body.classList.remove('al-on'); $root=null; if(window.nexoLivro) window.nexoLivro.abrir('ext_mariapenha','resumo#'+(CAPS[S.cap]||CAPS[0]).id); }
});
/* entrada no menu lateral, logo depois de "Livros digitais" */
var rn=window.renderNav;
if(typeof rn==='function'){
  window.renderNav=function(){
    var r=rn.apply(this,arguments);
    try{
      var nav=document.getElementById('nav'); if(!nav||nav.querySelector('.al-nav')) return r;
      var ref=nav.querySelector('.lv-nav')||nav.querySelector('.primary-nav');
      var on=(typeof current!=='undefined'&&current==='aulas');
      var html='<button type="button" class="primary-nav nx-nav-extra al-nav'+(on?' active':'')+'" onclick="nexoAulas()"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="M6 10.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/></svg> Aulas guiadas</button>';
      if(ref) ref.insertAdjacentHTML('afterend',html);
      if(on) Array.prototype.forEach.call(nav.querySelectorAll('.primary-nav.active:not(.al-nav)'),function(x){x.classList.remove('active');});
    }catch(e){}
    return r;
  };
}
window.nexoAula={abrir:abrirAula,lista:window.nexoAulas};
})();
