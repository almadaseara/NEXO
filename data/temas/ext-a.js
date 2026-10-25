/* Legislação Extravagante (I): Lei 5.553/1968 (documentos de identificação), Lei 7.960/1989 (prisão temporária), Lei 9.296/1996 (interceptação).
   Conferido em 25/10/2026. Texto legal transcrito do material de estudo PC-BA (Legislação Penal e Processual Extravagante) e de memória;
   marcado "confira" onde há dúvida de redação ou vigência. Base didática reescrita com estrutura e palavras próprias. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "25/10/2026";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

/* ======================= LEI 5.553/1968 ======================= */
T.ext_identificacao = {
meta:{ tema:"Lei 5.553/1968: retenção de documento de identificação", atualizado:AT,
  foco:"Proibição de reter documento de identificação (inclusive cópia autenticada); prazo de 5 dias para extrair dados; entrada em prédios; única infração é a contravenção do art. 3º." },
secoes:[
{ id:"regra", titulo:"Proibição de reter e exceções", curto:"Regra e exceções",
  rapido:["Ninguém, pessoa física ou jurídica, de direito público ou privado, pode <b>reter</b> documento de identificação pessoal — nem mesmo <b>cópia autenticada</b> (art. 1º). A lei proíbe a <b>retenção</b>, não a <b>exigência de apresentação</b>.",
    "Para um ato que exija o documento, quem exige tem até <b>5 dias</b> para extrair os dados e devolver (art. 2º). Passado esse prazo, só <b>ordem judicial</b> permite continuar com o documento (§ 1º).",
    "Para <b>entrar</b> em órgão público ou particular, anotam-se os dados na hora e devolve-se <b>imediatamente</b> (§ 2º).",
    "A única infração da lei é a <b>contravenção penal</b> do art. 3º: prisão simples de 1 a 3 meses ou multa. Se um preposto retém, responde quem <b>mandou</b>, salvo se o executor desobedeceu a ordens expressas."],
  teoria:[
    { h:"Alcance do art. 1º", p:[
      "O rol de documentos é exemplificativo: quitação militar, título de eleitor, carteira profissional, certidões de nascimento e casamento, naturalização e identidade de estrangeiro. O material de estudo destaca que CNH e passaporte não aparecem na lista, mas a lógica da lei os alcança.",
      "Se o agente, além de reter, <b>se apropria</b> do documento, pode responder também por crime comum (apropriação indébita), pois a lei só define a contravenção."]},
    { h:"Retenção temporária", p:[
      "O prazo de 5 dias é máximo e inflexível; a retenção deve ser razoável e voltada a extrair dados necessários. Depois dele, só decisão judicial. Em portarias e recepções, o documento não fica retido: anota-se e devolve-se."]}],
  pegadinhas:["A infração é <b>contravenção</b> (prisão simples), não crime de detenção.",
    "Retenção por <b>requisição do MP</b> ou administrativa não vale: só <b>ordem judicial</b>.",
    "Cópia autenticada também não pode ser retida."] }
],
lei:[
{ art:"Lei 5.553/1968, arts. 1º a 3º", nome:"Retenção de documentos", sec:"regra", itens:[
  { id:"l5553a1", rot:"Art. 1º",
    t:"A nenhuma pessoa física, bem como a nenhuma pessoa jurídica, de direito público ou de direito privado, é lícito <b class='g1'>reter qualquer documento de identificação pessoal</b>, ainda que apresentado por <b class='g3'>fotocópia autenticada ou pública-forma</b>, inclusive comprovante de quitação com o serviço militar, título de eleitor, carteira profissional, certidão de registro de nascimento, certidão de casamento, comprovante de naturalização e carteira de identidade de estrangeiro.",
    c:["id1"] },
  { id:"l5553a2", rot:"Art. 2º",
    t:"Quando, para a realização de determinado ato, for exigida a apresentação de documento de identificação, a pessoa que fizer a exigência fará extrair, no prazo de até <b class='g2'>5 (cinco) dias</b>, os dados que interessarem devolvendo em seguida o documento ao seu exibidor. § 1º Além do prazo previsto neste artigo, <b class='g3'>somente por ordem judicial</b> poderá ser retirado qualquer documento de identificação pessoal. § 2º Quando o documento de identidade for indispensável para a <b class='g1'>entrada de pessoa em órgãos públicos ou particulares</b>, serão seus dados anotados no ato e <b class='g1'>devolvido o documento imediatamente</b> ao interessado.",
    c:["id2","id3"] },
  { id:"l5553a3", rot:"Art. 3º",
    t:"Constitui <b class='g1'>contravenção penal</b>, punível com pena de <b class='g2'>prisão simples de 1 (um) a 3 (três) meses</b> ou multa [...], a retenção de qualquer documento a que se refere esta Lei. Parágrafo único. Quando a infração for praticada por preposto ou agente de pessoa jurídica, considerar-se-á responsável <b class='g1'>quem houver ordenado</b> o ato que ensejou a retenção, a menos que haja, pelo executante, <b class='g3'>desobediência ou inobservância de ordens ou instruções expressas</b>, quando, então, será este o infrator.",
    nota:"A multa original é em «NCR$» (cruzeiros novos), valor histórico.", c:["id4"] }]}
],
juris:[],
cards:[
{ id:"id1", tipo:"caso", sec:"regra", f:"A empresa retém a cópia autenticada da identidade do candidato até o fim do processo seletivo. É lícito?",
  v:"<b>Não.</b> A proibição alcança também a fotocópia autenticada (art. 1º). Configura a contravenção do art. 3º.", lei:["l5553a1"] },
{ id:"id2", tipo:"numero", sec:"regra", f:"Prazo máximo para extrair os dados do documento exigido para um ato?",
  v:"<b>5 dias</b> (art. 2º, caput). Depois, só por <b>ordem judicial</b> (§ 1º).", lei:["l5553a2"] },
{ id:"id3", tipo:"caso", sec:"regra", f:"O condomínio pede a identidade na portaria e a guarda até o visitante sair. Está correto?",
  v:"<b>Não.</b> Para entrar em prédio, anotam-se os dados e o documento é devolvido <b>imediatamente</b> (art. 2º, § 2º).", lei:["l5553a2"] },
{ id:"id4", tipo:"ce", sec:"regra", f:"(C/E) A retenção de documento de identificação é crime punido com detenção de 1 a 3 meses.",
  v:"<b>Errado.</b> É <b>contravenção penal</b> (prisão simples de 1 a 3 meses ou multa), art. 3º.", lei:["l5553a3"] }
],
questoes:[]
};

/* ======================= LEI 7.960/1989 ======================= */
T.ext_temporaria = {
meta:{ tema:"Lei 7.960/1989: prisão temporária", atualizado:AT,
  foco:"Hipóteses de cabimento (art. 1º, I a III) e rol de crimes; legitimados; decisão em 24 horas; mandado; prazo de 5+5 dias e 30+30 nos hediondos.",
  aviso:"O rol do art. 1º, III, não foi atualizado pelo legislador (crimes revogados e nomes antigos); use o texto da lei com cuidado." },
secoes:[
{ id:"cabimento", titulo:"Cabimento e procedimento", curto:"Cabimento",
  rapido:["A prisão temporária é <b>cautelar</b>, só cabe na <b>investigação</b> (inquérito policial), nunca depois de iniciada a ação penal, e só o <b>juiz</b> a decreta, por <b>representação da autoridade policial</b> ou <b>requerimento do MP</b> — nunca de ofício.",
    "Hipóteses (art. 1º): I) imprescindível para o inquérito; II) investigado sem residência fixa ou que não esclarece sua identidade; III) fundadas razões de autoria em crimes do rol. A leitura majoritária exige <b>III combinado com I ou com II</b>.",
    "Prazo: <b>5 dias</b>, prorrogável por mais 5 em caso de extrema e comprovada necessidade. Em <b>crimes hediondos</b> e equiparados: <b>30 + 30 dias</b> (Lei 8.072, art. 2º, § 4º).",
    "Vencido o prazo, o preso é <b>solto imediatamente</b>, salvo se decretada a preventiva."],
  teoria:[
    { h:"Rol do inciso III", p:[
      "Homicídio doloso, sequestro e cárcere privado, roubo, extorsão, extorsão mediante sequestro, estupro, epidemia com resultado morte, envenenamento de água ou alimento com resultado morte, associação criminosa (antiga quadrilha), genocídio, tráfico de drogas, crimes contra o sistema financeiro e <b>crimes de terrorismo</b> (incluídos em 2016). Os delitos de atentado violento ao pudor e rapto, que a lei ainda cita, foram revogados do Código Penal.",
      "O <b>latrocínio</b> e outros hediondos entram pelo roubo qualificado (art. 157, § 3º) e pelas remissões às leis específicas. Como a lei não foi atualizada, cabe interpretar o rol conforme o tipo vigente."]},
    { h:"Decisão e execução", p:[
      "O juiz decide em até <b>24 horas</b> do recebimento da representação ou requerimento; quando é a polícia que representa, <b>ouve antes o Ministério Público</b>. Em toda comarca há plantão permanente do Judiciário e do MP.",
      "O juiz pode, de ofício ou a requerimento, determinar que o preso lhe seja apresentado, submetê-lo a exame de corpo de delito e pedir informações à autoridade policial. O mandado é expedido em <b>duas vias</b> (uma entregue ao preso), contém o <b>período</b> da prisão e a data da soltura, e o preso é informado de seus direitos constitucionais. O temporário fica <b>separado</b> dos demais presos."]}],
  pegadinhas:["Prisão temporária <b>não</b> serve para a fase de instrução processual.",
    "Juiz <b>não decreta de ofício</b> a temporária.",
    "Roubo simples: 5+5 dias. Latrocínio, estupro e outros hediondos: 30+30."] }
],
lei:[
{ art:"Lei 7.960/1989, arts. 1º e 2º", nome:"Cabimento, prazo e procedimento", sec:"cabimento", itens:[
  { id:"l7960a1", rot:"Art. 1º",
    t:"Caberá prisão temporária: I – quando <b class='g1'>imprescindível para as investigações do inquérito policial</b>; II – quando o indiciado <b class='g1'>não tiver residência fixa</b> ou não fornecer elementos necessários ao esclarecimento de sua identidade; III – quando houver <b class='g1'>fundadas razões</b>, de acordo com qualquer prova admitida na legislação penal, de autoria ou participação do indiciado nos seguintes crimes: a) homicídio doloso (art. 121, caput, e seu § 2º); b) sequestro ou cárcere privado (art. 148, caput, e seus §§ 1º e 2º); c) roubo (art. 157, caput, e seus §§ 1º, 2º e 3º); d) extorsão (art. 158, caput, e seus §§ 1º e 2º); e) extorsão mediante sequestro (art. 159, caput, e seus §§ 1º, 2º e 3º); f) estupro (art. 213, caput, e sua combinação com o art. 223) [...]; i) epidemia com resultado de morte (art. 267, § 1º); j) envenenamento de água potável ou substância alimentícia ou medicinal qualificado pela morte (art. 270, caput, combinado com art. 285); l) quadrilha ou bando (art. 288), todos do Código Penal; m) <b class='g3'>genocídio</b> (arts. 1º, 2º e 3º da Lei 2.889/1956); n) <b class='g3'>tráfico de drogas</b>; o) crimes contra o sistema financeiro (Lei 7.492/1986); p) crimes previstos na <b class='g3'>Lei de Terrorismo</b> (Lei 13.260/2016).",
    nota:"Alíneas g e h (atentado violento ao pudor e rapto violento) foram suprimidas aqui por tratarem de crimes revogados; confira o texto oficial.", c:["tp1","tp2"] },
  { id:"l7960a2", rot:"Art. 2º",
    t:"A prisão temporária será decretada pelo <b class='g1'>Juiz</b>, em face da <b class='g1'>representação da autoridade policial</b> ou de <b class='g1'>requerimento do Ministério Público</b>, e terá o prazo de <b class='g2'>5 (cinco) dias</b>, prorrogável por igual período em caso de <b class='g3'>extrema e comprovada necessidade</b>. [...] § 2º O despacho que decretar a prisão temporária deverá ser fundamentado e prolatado dentro do prazo de <b class='g2'>24 (vinte e quatro) horas</b>, contadas a partir do recebimento da representação ou do requerimento. [...] § 7º Decorrido o prazo de 5 dias de detenção, o preso deverá ser posto <b class='g1'>imediatamente em liberdade</b>, salvo se já tiver sido decretada sua <b class='g3'>prisão preventiva</b>.",
    nota:"Texto resumido; confira os §§ 1º, 3º a 6º (oitiva do MP, plantão, mandado em duas vias, direitos do preso e período de duração).", c:["tp3","tp4","tp5"] },
  { id:"l7960a3", rot:"Art. 3º",
    t:"Os presos temporários deverão permanecer, obrigatoriamente, <b class='g1'>separados dos demais detentos</b>.",
    c:["tp6"] }]}
],
juris:[
{ id:"stj-tp-hediondo", trib:"Lei 8.072/1990", tipo:"Lei", num:"Lei 8.072/1990, art. 2º, § 4º", sec:"cabimento", status:"vigente", data:"vigente",
  titulo:"Prazo da temporária nos hediondos",
  texto:"Nos crimes hediondos e equiparados, a prisão temporária terá o prazo de 30 dias, prorrogável por igual período em caso de extrema e comprovada necessidade.",
  explica:"Regra especial prevalece sobre os 5+5 dias da Lei 7.960. Conferir a redação atual da Lei 8.072.", lei:["l7960a2"], fonte:STJJ }
],
cards:[
{ id:"tp1", tipo:"distincao", sec:"cabimento", f:"Quais requisitos são combinados para a temporária segundo a posição majoritária?",
  v:"<b>Inciso III</b> (crime do rol) combinado com o <b>I</b> (imprescindível para a investigação) <b>ou</b> com o <b>II</b> (sem residência fixa/identidade).", lei:["l7960a1"] },
{ id:"tp2", tipo:"ce", sec:"cabimento", f:"(C/E) A prisão temporária pode ser decretada para garantir a instrução processual.",
  v:"<b>Errado.</b> Só cabe na fase de investigação (inquérito policial).", lei:["l7960a1"] },
{ id:"tp3", tipo:"numero", sec:"cabimento", f:"Prazo da temporária: crime comum × hediondo.",
  v:"Comum: <b>5 + 5 dias</b>. Hediondo e equiparados: <b>30 + 30 dias</b>.", lei:["l7960a2"], j:["stj-tp-hediondo"] },
{ id:"tp4", tipo:"caso", sec:"cabimento", f:"O delegado representa pela temporária de suspeito de roubo. Em quanto tempo o juiz decide e quem ele ouve antes?",
  v:"Em <b>24 horas</b>, depois de ouvir o <b>Ministério Público</b> (quando o pedido vem da polícia).", lei:["l7960a2"] },
{ id:"tp5", tipo:"caso", sec:"cabimento", f:"Vencidos os 5 dias da temporária, o que o delegado deve fazer?",
  v:"Soltar <b>imediatamente</b>, salvo se foi decretada a prisão preventiva (art. 2º, § 7º).", lei:["l7960a2"] },
{ id:"tp6", tipo:"ce", sec:"cabimento", f:"(C/E) O preso temporário pode ficar junto com presos definitivos, desde que em cela separada por gênero.",
  v:"<b>Errado.</b> Os presos temporários devem ficar <b>separados dos demais detentos</b> (art. 3º).", lei:["l7960a3"] }
],
questoes:[]
};

/* ======================= LEI 9.296/1996 ======================= */
T.ext_interceptacao = {
meta:{ tema:"Lei 9.296/1996: interceptação telefônica e captação ambiental", atualizado:AT,
  foco:"Requisitos e vedações (art. 2º); legitimados; procedimento, prazo de 15 dias e renovação; autos apartados; inutilização; crimes (arts. 10 e 10-A); conceitos de interceptação, escuta e gravação; captação ambiental (art. 8º-A).",
  aviso:"Alguns precedentes (ex.: STJ, Inf. 696) vieram do material de estudo e não foram reconfirmados na fonte oficial." },
secoes:[
{ id:"requisitos", titulo:"Requisitos, vedações e legitimados", curto:"Requisitos",
  rapido:["Base: CF, art. 5º, XII. A interceptação só ocorre na <b>investigação criminal</b> ou <b>instrução processual penal</b>, por ordem do <b>juiz competente da ação principal</b>, sob <b>segredo de justiça</b>. Vale também para <b>telemática</b> (informática).",
    "<b>Não é admitida</b> quando: I) faltam indícios razoáveis de autoria ou participação; II) a prova pode ser feita por outros meios; III) o fato é punido, no máximo, com <b>detenção</b>. Ou seja, exige <b>reclusão</b>, subsidiariedade e indícios.",
    "O juiz pode decretar <b>de ofício</b> ou a requerimento da <b>autoridade policial</b> (só na investigação) ou do <b>MP</b> (investigação e instrução).",
    "Provas obtidas podem servir a <b>crimes conexos punidos com detenção</b> (STF, HC 83.515) e como <b>prova emprestada</b> em outros processos, inclusive administrativos."],
  teoria:[
    { h:"Pedido e decisão", p:[
      "O pedido demonstra a necessidade da medida, indica os meios a empregar e descreve a situação investigada, em regra com <b>qualificação dos investigados</b> (salvo impossibilidade justificada) — interceptações genéricas ou abertas não são admitidas. Em caráter <b>excepcional</b>, pode ser verbal, mas a concessão é condicionada à sua redução a termo.",
      "O juiz decide em até <b>24 horas</b>, em decisão <b>fundamentada</b> sob pena de nulidade, indicando a forma de execução. Prazo da diligência: <b>15 dias, renovável</b> por igual tempo se comprovada a indispensabilidade. Os tribunais admitem renovações sucessivas, desde que haja fundamentação; o STJ conta os 15 dias do início da interceptação, não da decisão."]}],
  pegadinhas:["Detenção pura <b>veda</b> a interceptação — mas crime conexo de detenção pode ser aproveitado.",
    "A polícia só pede interceptação <b>durante o inquérito</b>.",
    "Renovação do prazo: a lei fala em renovar «por igual tempo»; a jurisprudência admite várias vezes."] },

{ id:"execucao", titulo:"Execução, sigilo e inutilização", curto:"Execução",
  rapido:["A autoridade policial <b>conduz</b> a interceptação e dá ciência ao MP, que pode acompanhar. Havendo gravação, determina-se a <b>transcrição</b>; ao final, a polícia envia o resultado ao juiz com <b>auto circunstanciado</b>.",
    "Corre em <b>autos apartados</b>, apensados ao inquérito ou processo, preservado o sigilo (art. 8º). Cessada a diligência, a defesa tem direito de acesso.",
    "Não é obrigatória a transcrição integral por peritos oficiais, desde que se dê à defesa acesso a todo o material (jurisprudência STF/STJ).",
    "Gravações que não interessam à prova são <b>inutilizadas</b> por decisão judicial, a requerimento do MP ou da parte, com acompanhamento do MP e faculdade de presença do acusado."],
  teoria:[
    { h:"Limites práticos", p:[
      "É ilegal habilitar chip da polícia no lugar do chip do investigado (STJ, Inf. 696 — confira), porque a lei não autoriza suspender o serviço ou substituir o titular da linha. As concessionárias são obrigadas a prestar apoio técnico (art. 7º).",
      "O investigado <b>não</b> é obrigado a fornecer padrões vocais para autenticar a gravação (nemo tenetur)."]}],
  pegadinhas:["Autos apartados são regra de sigilo, não de arquivamento.",
    "A <b>degravação</b> não precisa ser feita por perito oficial."] },

{ id:"conceitos", titulo:"Conceitos, crimes e captação ambiental", curto:"Conceitos e crimes",
  rapido:["<b>Interceptação</b> telefônica: terceiro capta a conversa sem conhecimento de ninguém. <b>Escuta</b>: terceiro capta com ciência de <b>um</b> dos interlocutores. <b>Gravação</b> (clandestina): feita por um dos interlocutores. Só a interceptação em sentido estrito depende da Lei 9.296.",
    "<b>Captação ambiental</b> (art. 8º-A, Pacote Anticrime): exige ordem judicial, subsidiariedade e infrações com pena máxima <b>superior a 4 anos</b> (ou conexas); até <b>15 dias</b>, renováveis se houver atividade criminosa permanente, habitual ou continuada; instalação pode ser noturna ou por operação disfarçada, <b>exceto na casa</b>.",
    "Crimes: art. 10 (interceptar, promover escuta ambiental ou quebrar segredo de Justiça sem autorização ou com fins não autorizados): <b>reclusão de 2 a 4 anos</b> e multa, igual pena ao <b>juiz</b> que determina com fim não autorizado. Art. 10-A (captação ambiental sem autorização): mesma pena; <b>não há crime</b> se feita por um dos interlocutores; <b>dobra</b> para o servidor que quebra o sigilo."],
  teoria:[
    { h:"Captação ambiental pelo interlocutor", p:[
      "A gravação ambiental feita por um dos interlocutores sem conhecimento da polícia pode ser usada em <b>matéria de defesa</b> quando demonstrada a integridade da gravação (art. 8º-A, § 4º). Aplicam-se subsidiariamente à captação ambiental as regras da interceptação (§ 5º)."]},
    { h:"Nulidade", p:[
      "Interceptação sem prévia autorização judicial é nula, mesmo que depois um interlocutor concorde em tratá-la como escuta (STJ, HC 161.053/SP)."]}],
  pegadinhas:["Autogravação de conversa por um dos interlocutores <b>não é crime</b> do art. 10-A (§ 1º).",
    "Captação ambiental: pena máxima <b>superior a 4 anos</b>, diferente da interceptação (reclusão)."] }
],
lei:[
{ art:"Lei 9.296/1996, arts. 1º a 4º", nome:"Cabimento e pedido", sec:"requisitos", itens:[
  { id:"l9296a1", rot:"Art. 1º",
    t:"A interceptação de comunicações telefônicas, de qualquer natureza, para prova em <b class='g1'>investigação criminal</b> e em <b class='g1'>instrução processual penal</b>, observará o disposto nesta Lei e dependerá de ordem do <b class='g1'>juiz competente da ação principal</b>, sob <b class='g1'>segredo de justiça</b>. Parágrafo único. O disposto nesta Lei aplica-se à interceptação do fluxo de comunicações em <b class='g3'>sistemas de informática e telemática</b>.",
    c:["it1"] },
  { id:"l9296a2", rot:"Art. 2º",
    t:"<b class='g3'>Não será admitida</b> a interceptação de comunicações telefônicas quando ocorrer qualquer das seguintes hipóteses: I – não houver <b class='g1'>indícios razoáveis da autoria ou participação</b> em infração penal; II – a prova puder ser feita por <b class='g1'>outros meios disponíveis</b>; III – o fato investigado constituir infração penal punida, no máximo, com pena de <b class='g2'>detenção</b>. Parágrafo único. Em qualquer hipótese deve ser descrita com clareza a situação objeto da investigação, inclusive com a indicação e qualificação dos investigados, salvo impossibilidade manifesta, devidamente justificada.",
    c:["it2","it3"], j:["stf-hc83515"] },
  { id:"l9296a3", rot:"Art. 3º",
    t:"A interceptação das comunicações telefônicas poderá ser determinada pelo juiz, <b class='g1'>de ofício</b> ou a requerimento: I – da <b class='g1'>autoridade policial</b>, na investigação criminal; II – do representante do <b class='g1'>Ministério Público</b>, na investigação criminal e na instrução processual penal.",
    nota:"A atuação de ofício é criticada à luz do sistema acusatório (CPP, art. 3º-A); o texto da lei ainda a prevê.", c:["it4"] },
  { id:"l9296a4", rot:"Art. 4º",
    t:"O pedido de interceptação de comunicação telefônica conterá a demonstração de que a sua realização é <b class='g1'>necessária à apuração de infração penal</b>, com indicação dos meios a serem empregados. § 1º Excepcionalmente, o juiz poderá admitir que o pedido seja formulado <b class='g3'>verbalmente</b>, desde que estejam presentes os pressupostos que autorizem a interceptação, caso em que a concessão será condicionada à sua <b class='g1'>redução a termo</b>. § 2º O juiz, no prazo máximo de <b class='g2'>vinte e quatro horas</b>, decidirá sobre o pedido.",
    c:["it5"] }]},
{ art:"Lei 9.296/1996, arts. 5º a 9º", nome:"Decisão, execução e sigilo", sec:"execucao", itens:[
  { id:"l9296a5", rot:"Art. 5º",
    t:"A decisão será <b class='g1'>fundamentada, sob pena de nulidade</b>, indicando também a forma de execução da diligência, que não poderá exceder o prazo de <b class='g2'>quinze dias</b>, renovável por igual tempo uma vez comprovada a <b class='g3'>indispensabilidade do meio de prova</b>.",
    c:["it6"] },
  { id:"l9296a6", rot:"Art. 6º",
    t:"Deferido o pedido, a <b class='g1'>autoridade policial</b> conduzirá os procedimentos de interceptação, dando ciência ao <b class='g1'>Ministério Público</b>, que poderá acompanhar a sua realização. § 1º No caso de a diligência possibilitar a gravação da comunicação interceptada, será determinada a sua <b class='g1'>transcrição</b>. § 2º Cumprida a diligência, a autoridade policial encaminhará o resultado da interceptação ao juiz, acompanhado de <b class='g1'>auto circunstanciado</b>, que deverá conter o resumo das operações realizadas.",
    c:["it7"] },
  { id:"l9296a8", rot:"Art. 8º",
    t:"A interceptação de comunicação telefônica, de qualquer natureza, ocorrerá em <b class='g1'>autos apartados</b>, apensados aos autos do inquérito policial ou do processo criminal, preservando-se o <b class='g1'>sigilo</b> das diligências, gravações e transcrições respectivas.",
    c:["it8"] },
  { id:"l9296a9", rot:"Art. 9º",
    t:"A gravação que <b class='g3'>não interessar à prova</b> será <b class='g1'>inutilizada</b> por decisão judicial, durante o inquérito, a instrução processual ou após esta, em virtude de requerimento do Ministério Público ou da parte interessada. Parágrafo único. O incidente de inutilização será assistido pelo Ministério Público, sendo facultada a presença do acusado ou de seu representante legal." }]},
{ art:"Lei 9.296/1996, arts. 8º-A, 10 e 10-A", nome:"Captação ambiental e crimes", sec:"conceitos", itens:[
  { id:"l9296a8a", rot:"Art. 8º-A",
    t:"Para investigação ou instrução criminal, poderá ser autorizada pelo juiz, a requerimento da autoridade policial ou do Ministério Público, a <b class='g1'>captação ambiental</b> de sinais eletromagnéticos, ópticos ou acústicos, quando: I – a prova não puder ser feita por outros meios disponíveis e igualmente eficazes; e II – houver elementos probatórios razoáveis de autoria e participação em infrações criminais cujas penas máximas sejam <b class='g2'>superiores a 4 (quatro) anos</b> ou em infrações penais conexas. [...] § 2º A instalação do dispositivo [...] poderá ser realizada, quando necessária, por meio de operação policial disfarçada ou no período noturno, <b class='g3'>exceto na casa</b>, nos termos do inciso XI do caput do art. 5º da Constituição Federal. § 3º A captação ambiental não poderá exceder o prazo de <b class='g2'>15 (quinze) dias</b>, renovável [...] se comprovada a indispensabilidade do meio de prova e quando presente atividade criminal <b class='g3'>permanente, habitual ou continuada</b>. § 4º A captação ambiental feita por um dos interlocutores sem o prévio conhecimento da autoridade policial ou do Ministério Público poderá ser utilizada, em <b class='g3'>matéria de defesa</b>, quando demonstrada a integridade da gravação.",
    nota:"Incluído pela Lei 13.964/2019 (Pacote Anticrime); §§ 2º e 4º tiveram vetos derrubados. Texto resumido.", c:["it9"] },
  { id:"l9296a10", rot:"Art. 10",
    t:"Constitui crime realizar <b class='g1'>interceptação de comunicações telefônicas, de informática ou telemática</b>, promover <b class='g1'>escuta ambiental</b> ou quebrar segredo da Justiça, sem autorização judicial ou com objetivos não autorizados em lei. Pena: <b class='g2'>reclusão, de dois a quatro anos, e multa</b>. Parágrafo único. Incorre na mesma pena a <b class='g3'>autoridade judicial</b> que determina a execução de conduta prevista no caput deste artigo com objetivo não autorizado em lei.",
    c:["it10"] },
  { id:"l9296a10a", rot:"Art. 10-A",
    t:"Realizar <b class='g1'>captação ambiental</b> de sinais eletromagnéticos, ópticos ou acústicos para investigação ou instrução criminal sem autorização judicial, quando esta for exigida: Pena – <b class='g2'>reclusão, de 2 (dois) a 4 (quatro) anos, e multa</b>. § 1º <b class='g3'>Não há crime</b> se a captação é realizada por um dos interlocutores. § 2º A pena será aplicada <b class='g2'>em dobro</b> ao funcionário público que descumprir determinação de sigilo das investigações que envolvam a captação ambiental ou revelar o conteúdo das gravações enquanto mantido o sigilo judicial.",
    c:["it11"] }]}
],
juris:[
{ id:"stf-hc83515", trib:"STF", tipo:"HC", num:"HC 83.515/RS", sec:"requisitos", status:"vigente", data:"16/09/2004",
  titulo:"Interceptação lícita e crimes conexos punidos com detenção",
  texto:"Uma vez realizada a interceptação telefônica de forma fundamentada, legal e legítima, as informações e provas colhidas podem subsidiar denúncia por crimes punidos com detenção, desde que conexos aos primeiros tipos penais que justificaram a interceptação.",
  explica:"Mitiga o art. 2º, III. Redação resumida do material de estudo; confira o acórdão.", lei:["l9296a2"], fonte:STFJ },
{ id:"stj-hc161053", trib:"STJ", tipo:"HC", num:"HC 161.053/SP", sec:"conceitos", status:"atencao", data:"27/11/2012 (confira)",
  titulo:"Interceptação sem autorização judicial não é convalidada pelo consentimento posterior",
  texto:"Segundo o material de estudo: é inválida a interceptação telefônica realizada sem prévia autorização judicial, ainda que haja consentimento posterior de um dos interlocutores para tratá-la como escuta.",
  explica:"Diferencia interceptação (depende da lei), escuta e gravação. Confira o acórdão.", lei:["l9296a10"], fonte:STJJ },
{ id:"stj-inf696", trib:"STJ", tipo:"Informativo", num:"Informativo 696", sec:"execucao", status:"atencao", data:"confira",
  titulo:"Chip da polícia no lugar do chip do investigado",
  texto:"Segundo o material de estudo: é ilegal a quebra do sigilo telefônico mediante habilitação de chip da autoridade policial em substituição ao do investigado titular da linha.",
  explica:"A Lei 9.296 não autoriza suspensão do serviço nem substituição do titular da linha.", lei:["l9296a6"], fonte:STJJ }
],
cards:[
{ id:"it1", tipo:"ce", sec:"requisitos", f:"(C/E) A Lei 9.296/96 aplica-se também à interceptação do fluxo de comunicações em sistemas de informática e telemática.",
  v:"<b>Certo.</b> Art. 1º, parágrafo único.", lei:["l9296a1"] },
{ id:"it2", tipo:"distincao", sec:"requisitos", f:"Quando a interceptação NÃO é admitida (art. 2º)?",
  v:"Sem indícios razoáveis de autoria; quando a prova pode ser feita por outros meios; e quando o crime é punido, no máximo, com <b>detenção</b>.", lei:["l9296a2"] },
{ id:"it3", tipo:"caso", sec:"requisitos", f:"A interceptação, autorizada para tráfico (reclusão), revela crime conexo punido com detenção. Pode-se denunciar por ele?",
  v:"<b>Sim.</b> Para o STF (HC 83.515), as provas colhidas em interceptação lícita podem subsidiar denúncia por crime conexo punido com detenção.", lei:["l9296a2"], j:["stf-hc83515"] },
{ id:"it4", tipo:"distincao", sec:"requisitos", f:"Quem pode requerer a interceptação?",
  v:"<b>Autoridade policial</b> (só na investigação) e <b>MP</b> (investigação e instrução). O juiz também pode determinar de ofício, segundo o texto legal.", lei:["l9296a3"] },
{ id:"it5", tipo:"numero", sec:"requisitos", f:"Prazo do juiz para decidir o pedido de interceptação e possibilidade de pedido verbal.",
  v:"<b>24 horas</b>. O pedido pode ser <b>verbal</b> excepcionalmente, com redução a termo.", lei:["l9296a4"] },
{ id:"it6", tipo:"numero", sec:"execucao", f:"Prazo da interceptação telefônica e renovação.",
  v:"<b>15 dias</b>, renovável por igual tempo se comprovada a indispensabilidade (tribunais admitem renovações sucessivas).", lei:["l9296a5"] },
{ id:"it7", tipo:"caso", sec:"execucao", f:"Encerrada a interceptação, o que a polícia entrega ao juiz?",
  v:"O resultado com <b>auto circunstanciado</b> que resume as operações (art. 6º, § 2º).", lei:["l9296a6"] },
{ id:"it8", tipo:"lacuna", sec:"execucao", f:"A interceptação corre em autos ___, apensados ao inquérito ou ao processo, preservando o sigilo.",
  v:"<b>apartados</b> (art. 8º).", lei:["l9296a8"] },
{ id:"it9", tipo:"numero", sec:"conceitos", f:"Captação ambiental: pena máxima mínima exigida e prazo.",
  v:"Infrações com pena máxima <b>superior a 4 anos</b> (ou conexas); até <b>15 dias</b>, renováveis.", lei:["l9296a8a"] },
{ id:"it10", tipo:"numero", sec:"conceitos", f:"Pena do art. 10 da Lei 9.296.",
  v:"<b>Reclusão de 2 a 4 anos</b> e multa; mesma pena para o juiz que determina com objetivo não autorizado.", lei:["l9296a10"] },
{ id:"it11", tipo:"ce", sec:"conceitos", f:"(C/E) A captação ambiental realizada por um dos interlocutores sem autorização judicial configura o crime do art. 10-A.",
  v:"<b>Errado.</b> Art. 10-A, § 1º: não há crime se a captação é feita por um dos interlocutores.", lei:["l9296a10a"] },
{ id:"it12", tipo:"distincao", sec:"conceitos", f:"Interceptação × escuta × gravação telefônica.",
  v:"<b>Interceptação</b>: terceiro, sem ciência dos dois. <b>Escuta</b>: terceiro, com ciência de um. <b>Gravação</b>: feita por um dos interlocutores.", lei:[] }
],
questoes:[]
};
})();
