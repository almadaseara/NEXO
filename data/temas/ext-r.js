/* Legislação Extravagante (XVIII): Lei 12.037/2009 (Identificação Criminal), Lei 12.830/2013 (Investigação pelo Delegado)
   e Lei 9.807/1999 (Proteção a Vítimas e Testemunhas). Conferido em 25/10/2026.
   Texto do material de estudo e de memória (confira no Planalto); base didática reescrita com palavras próprias. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "25/10/2026";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

/* ============ LEI 12.037/2009 ============ */
T.ext_ident_criminal = {
meta:{ tema:"Lei 12.037/2009: Identificação Criminal", atualizado:AT,
  foco:"Regra constitucional (art. 5º, LVIII), documentos de identificação civil, hipóteses de identificação criminal, perfil genético, vedação de menção em atestados, retirada da foto, exclusão do perfil e Banco Nacional Multibiométrico.",
  aviso:"O inciso VII do art. 3º (recebimento da denúncia por crimes graves, com coleta de DNA) e a redação dos arts. 5º-A e 7º-A vêm do material de estudo e de alterações recentes; confira a redação vigente no Planalto." },
secoes:[
{ id:"regra", titulo:"Regra, documentos e hipóteses", curto:"Regra/hipóteses",
  rapido:["<b>CF, art. 5º, LVIII</b>: o civilmente identificado <b>não</b> é submetido à identificação criminal, salvo nas hipóteses previstas em lei. A Lei 12.037 regulamenta esse inciso e substituiu a Lei 10.054/2000.",
    "<b>Art. 2º</b>: identificação civil se atesta por <b>qualquer</b> de: carteira de identidade, carteira de trabalho, carteira profissional, passaporte, carteira de identificação funcional ou outro documento público que permita identificar. Documentos <b>militares são equiparados</b> aos civis. O rol é exemplificativo (inciso VI).",
    "<b>Art. 3º</b>: mesmo com documento, pode haver identificação criminal se: (I) rasura ou indício de falsificação; (II) documento insuficiente; (III) documentos distintos com dados conflitantes; (IV) essencial às investigações, por <b>despacho do juiz</b>; (V) registros policiais com outros nomes; (VI) estado de conservação, distância temporal ou de local de expedição impede a identificação; (VII) recebimento da denúncia por crimes graves.",
    "No inciso IV o juiz decide <b>de ofício</b> ou por representação da <b>autoridade policial, do MP ou da defesa</b> (a defesa também pode pedir, por exemplo para provar negativa de autoria). Quem decide é a <b>autoridade judiciária</b>, nunca o delegado.",
    "<b>Parágrafo único do art. 3º</b>: cópias dos documentos apresentados são juntadas aos autos do inquérito, <b>ainda que insuficientes</b> para identificar.",
    "<b>Art. 4º</b>: a autoridade deve evitar <b>constrangimento</b> ao identificado; se houver excesso, responde por ele. <b>Art. 5º</b>: a identificação criminal inclui o processo <b>datiloscópico e o fotográfico</b>, juntados ao auto de flagrante, inquérito ou outra investigação."],
  teoria:[
   {h:"Lógica da lei", p:["Não existe dever geral de se identificar, mas quem não se identifica adequadamente assume o risco de ser identificado criminalmente. A identificação criminal serve para determinar com certeza a autoria, não para humilhar o investigado.","Quase todas as hipóteses do art. 3º giram em torno de <b>dúvida sobre a identidade</b> (documento ruim, falso, conflitante, nomes diversos). As exceções são o inciso IV (necessidade da investigação, com ordem judicial) e o VII (gravidade do crime)."]},
   {h:"Inciso VII (crimes graves)", p:["Acrescentado por alteração recente: o <b>recebimento da denúncia</b> pelo juiz por (a) crime praticado com grave violência contra a pessoa; (b) crime contra a liberdade sexual ou crime sexual contra vulnerável; (c) crimes do ECA dos arts. 240, 241, 241-A, 241-B e 241-C; (d) crime do art. 2º da Lei 12.850 quando a organização usar ou tiver à disposição armas de fogo.","Nessas hipóteses a identificação criminal inclui <b>coleta de material biológico</b> para o perfil genético. Em <b>prisão em flagrante</b> por esses crimes a coleta também é feita (art. 5º, §2º)."]}],
  pegadinhas:["O despacho do inciso IV é do <b>juiz</b>; dizer que é do delegado ou do escrivão é erro clássico.","O rol de documentos do art. 2º <b>não</b> é só a carteira de identidade: passaporte, carteira de trabalho, funcional e outros públicos servem.","Ser estrangeiro ou gravidade abstrata do crime <b>não</b> autoriza, por si só, identificação criminal de quem tem documento válido (fora do inciso VII).","Documento molhado/rasurado: pode haver identificação criminal, mas somente nas hipóteses do art. 3º."] },
{ id:"genetico", titulo:"Perfil genético, sigilo e bancos de dados", curto:"DNA/sigilo",
  rapido:["<b>Art. 5º, §1º</b>: nos incisos <b>IV e VII</b> do art. 3º, a identificação criminal inclui coleta de material biológico para o <b>perfil genético</b>. Os dados ficam em banco de perfis genéticos gerido por unidade <b>oficial de perícia criminal</b>; são <b>sigilosos</b> e quem permitir uso indevido responde civil, penal e administrativamente.",
    "Informações genéticas <b>não podem revelar traços somáticos ou comportamentais</b> das pessoas, <b>exceto</b> a determinação genética de gênero (art. 5º-A, §1º, conforme o material de estudo).",
    "<b>Art. 6º</b>: é vedado mencionar a identificação criminal em atestados de antecedentes ou informações <b>não destinadas ao juízo criminal</b>, antes do <b>trânsito em julgado</b> da condenação.",
    "<b>Art. 7º</b>: no caso de não oferecimento ou rejeição da denúncia ou de absolvição, após arquivamento definitivo ou trânsito em julgado, o indiciado/réu pode requerer a <b>retirada da foto</b> do inquérito ou processo, apresentando prova da identificação civil. Só trata da <b>foto</b>, não da datiloscopia.",
    "<b>Art. 7º-A</b>: o perfil genético é excluído do banco (I) na <b>absolvição</b>; (II) na condenação, mediante requerimento, após <b>20 anos</b> do cumprimento da pena. <b>Art. 7º-B</b>: banco sigiloso, conforme regulamento do Executivo.",
    "<b>Art. 7º-C</b>: autoriza o <b>Banco Nacional Multibiométrico e de Impressões Digitais</b> no Ministério da Justiça e Segurança Pública (dados biométricos, digitais e, se possível, íris, face e voz). Para uso civil, administrativo ou eleitoral, a integração se limita a <b>digitais e dados de identificação</b>; interoperação com outros bancos exige <b>acordo ou convênio</b>; dados <b>sigilosos</b>; <b>vedada a comercialização</b> da base; coincidência de registros vira <b>laudo de perito oficial</b>; polícia e MP pedem acesso ao <b>juiz</b> em inquérito ou ação penal."],
  teoria:[
   {h:"O que mudou", p:["Antes da reforma de 2019, o perfil ficava armazenado até a prescrição do delito. Hoje a regra é de exclusão por absolvição ou, na condenação, por requerimento após 20 anos do cumprimento da pena.","O BNMID reúne registros coletados em investigações criminais ou na identificação criminal; presos provisórios e definitivos podem ter os dados colhidos se ainda não tiverem sido na identificação."]}],
  pegadinhas:["O art. 7º fala em retirar a <b>fotografia</b>; não menciona a datiloscopia.","Os <b>20 anos</b> contam do <b>cumprimento da pena</b> e dependem de <b>requerimento</b> (na absolvição, a exclusão é a regra).","O acesso da polícia/MP ao BNMID depende de pedido ao <b>juiz</b> em inquérito ou ação já instaurados.","Informações genéticas não revelam traços somáticos/comportamentais, <b>exceto</b> o gênero; a questão que inverte isso está errada."] }
],
lei:[
{ art:"Lei 12.037/2009, arts. 2º a 7º-C", nome:"Identificação criminal do civilmente identificado", sec:"regra", itens:[
  { id:"l12037a2", rot:"Art. 2º",
    t:"<b>Art. 2º</b> A identificação civil é atestada por <b class='g1'>qualquer</b> dos seguintes documentos: I – carteira de identidade; II – carteira de trabalho; III – carteira profissional; IV – passaporte; V – carteira de identificação funcional; VI – <b class='g1'>outro documento público</b> que permita a identificação do indiciado. Parágrafo único. Para as finalidades desta Lei, equiparam-se aos documentos de identificação civis os <b class='g1'>documentos de identificação militares</b>.", c:["ic1","ic2"] },
  { id:"l12037a3", rot:"Art. 3º",
    t:"<b>Art. 3º</b> Embora apresentado documento de identificação, poderá ocorrer identificação criminal quando: I – o documento apresentar <b class='g1'>rasura</b> ou tiver indício de <b class='g1'>falsificação</b>; II – o documento apresentado for <b class='g1'>insuficiente</b> para identificar cabalmente o indiciado; III – o indiciado portar documentos de identidade distintos, com informações <b class='g1'>conflitantes</b> entre si; IV – a identificação criminal for <b class='g1'>essencial às investigações policiais</b>, segundo despacho da <b class='g3'>autoridade judiciária competente</b>, que decidirá de ofício ou mediante representação da autoridade policial, do Ministério Público ou da defesa; V – constar de registros policiais o uso de <b class='g1'>outros nomes</b> ou diferentes qualificações; VI – o estado de conservação ou a distância temporal ou da localidade da expedição do documento impossibilite a completa identificação dos caracteres essenciais; VII – houver <b class='g1'>recebimento da denúncia</b> pelo juiz por: a) crime praticado com grave violência contra a pessoa; b) crime contra a liberdade sexual ou crime sexual contra vulnerável; c) crimes contra criança ou adolescente previstos nos arts. 240, 241, 241-A, 241-B e 241-C da Lei 8.069/1990; d) crime previsto no art. 2º da Lei 12.850/2013, quando a organização criminosa utilizar ou tiver à sua disposição armas de fogo. Parágrafo único. As cópias dos documentos apresentados deverão ser juntadas aos autos do inquérito, ou outra forma de investigação, ainda que consideradas insuficientes para identificar o indiciado.", c:["ic3","ic4","ic5","ic6"] },
  { id:"l12037a4", rot:"Arts. 4º e 5º",
    t:"<b>Art. 4º</b> Quando houver necessidade de identificação criminal, a autoridade encarregada tomará as providências necessárias para <b class='g1'>evitar o constrangimento</b> do identificado. <b>Art. 5º</b> A identificação criminal incluirá o processo <b class='g1'>datiloscópico e o fotográfico</b>, que serão juntados aos autos da comunicação da prisão em flagrante, ou do inquérito policial ou outra forma de investigação. § 1º Nas hipóteses dos incisos <b class='g2'>IV e VII</b> do caput do art. 3º, a identificação criminal incluirá a coleta de <b class='g1'>material biológico</b> para a obtenção do perfil genético. § 2º Nos casos de prisão em flagrante em decorrência do cometimento dos crimes referidos no inciso VII do caput do art. 3º, também será realizada a identificação criminal que incluirá a coleta de material biológico para a obtenção do perfil genético.", c:["ic7","ic8"] }
]},
{ art:"Lei 12.037/2009, arts. 6º a 7º-C", nome:"Sigilo, retirada da foto e bancos de dados", sec:"genetico", itens:[
  { id:"l12037a6", rot:"Arts. 6º e 7º",
    t:"<b>Art. 6º</b> É <b class='g1'>vedado mencionar</b> a identificação criminal do indiciado em atestados de antecedentes ou em informações <b class='g3'>não destinadas ao juízo criminal</b>, antes do <b class='g2'>trânsito em julgado</b> da sentença condenatória. <b>Art. 7º</b> No caso de não oferecimento da denúncia, ou sua rejeição, ou absolvição, é facultado ao indiciado ou ao réu, após o arquivamento definitivo do inquérito, ou trânsito em julgado da sentença, requerer a <b class='g1'>retirada da identificação fotográfica</b> do inquérito ou processo, desde que apresente provas de sua identificação civil.", c:["ic9","ic10"] },
  { id:"l12037a7a", rot:"Arts. 7º-A e 7º-B",
    t:"<b>Art. 7º-A</b> A exclusão dos perfis genéticos dos bancos de dados ocorrerá: I – no caso de <b class='g1'>absolvição</b> do acusado; ou II – no caso de condenação do acusado, mediante <b class='g1'>requerimento</b>, após decorridos <b class='g2'>20 (vinte) anos</b> do cumprimento da pena. <b>Art. 7º-B</b> A identificação do perfil genético será armazenada em banco de dados <b class='g1'>sigiloso</b>, conforme regulamento a ser expedido pelo Poder Executivo.", c:["ic11","ic12"] },
  { id:"l12037a7c", rot:"Art. 7º-C (síntese)",
    t:"<b>Art. 7º-C</b> Fica autorizada a criação, no Ministério da Justiça e Segurança Pública, do <b class='g1'>Banco Nacional Multibiométrico e de Impressões Digitais</b>, para armazenar registros biométricos, impressões digitais e, quando possível, íris, face e voz, a subsidiar investigações criminais federais, estaduais ou distritais (síntese; o artigo tem 11 parágrafos). Em bancos de natureza civil, administrativa ou eleitoral, a integração é <b class='g3'>limitada às impressões digitais</b> e às informações necessárias à identificação do titular. A interoperação depende de <b class='g1'>acordo ou convênio</b>. Os dados têm caráter <b class='g1'>sigiloso</b>; é <b class='g3'>vedada a comercialização</b> da base; coincidências de registros devem constar de <b class='g1'>laudo pericial</b> firmado por perito oficial habilitado; a autoridade policial e o MP podem requerer ao <b class='g1'>juiz</b> o acesso, em inquérito ou ação penal instaurados.", c:["ic13","ic14"] }
]}
],
juris:[],
cards:[
{ id:"ic1", tipo:"distincao", sec:"regra", f:"Qual a regra constitucional sobre identificação criminal e qual lei a regulamenta?", v:"CF art. 5º, LVIII: o civilmente identificado <b>não</b> será submetido à identificação criminal, <b>salvo nas hipóteses previstas em lei</b>. Regulamenta: Lei 12.037/2009.", lei:["l12037a2"] },
{ id:"ic2", tipo:"ce", sec:"regra", f:"(C/E) A identificação civil só se prova pela carteira de identidade (RG).", v:"<b>Errado.</b> Vale qualquer dos documentos do art. 2º (carteira de trabalho, profissional, passaporte, funcional, outro documento público); documentos <b>militares são equiparados</b>.", lei:["l12037a2"] },
{ id:"ic3", tipo:"distincao", sec:"regra", f:"Quais as hipóteses do art. 3º (incisos I a VI) em que mesmo com documento há identificação criminal?", v:"I rasura/falsificação; II documento insuficiente; III documentos distintos e conflitantes; IV essencial à investigação (juiz); V outros nomes em registros policiais; VI conservação/tempo/local de expedição impede identificar. Mais o <b>VII</b> (denúncia recebida por crimes graves).", lei:["l12037a3"] },
{ id:"ic4", tipo:"ce", sec:"regra", f:"(C/E) A identificação criminal do inciso IV depende de despacho fundamentado do delegado de polícia.", v:"<b>Errado.</b> O despacho é da <b>autoridade judiciária</b>, de ofício ou mediante representação da polícia, do MP ou da <b>defesa</b>.", lei:["l12037a3"] },
{ id:"ic5", tipo:"caso", sec:"regra", f:"Preso em flagrante por roubo apresenta RG molhado e rasurado, ilegível. Pode ser identificado criminalmente?", v:"Sim: rasura/documento insuficiente (art. 3º, I e II). A identificação criminal só é possível <b>dentro das hipóteses do art. 3º</b>, e a polícia deve juntar cópia do documento aos autos.", lei:["l12037a3"] },
{ id:"ic6", tipo:"distincao", sec:"regra", f:"Quais crimes do inciso VII exigem recebimento da denúncia para a identificação criminal?", v:"Grave violência contra a pessoa; crime contra a liberdade sexual ou sexual contra vulnerável; ECA arts. 240, 241, 241-A, 241-B, 241-C; art. 2º da Lei 12.850 com organização que usa ou tem à disposição <b>armas de fogo</b>.", lei:["l12037a3"] },
{ id:"ic7", tipo:"distincao", sec:"regra", f:"O que inclui a identificação criminal (art. 5º) e quando inclui DNA?", v:"Sempre o processo <b>datiloscópico e o fotográfico</b>. Inclui coleta de <b>material biológico</b> (perfil genético) nos incisos <b>IV e VII</b> do art. 3º, e no flagrante pelos crimes do VII.", lei:["l12037a4"] },
{ id:"ic8", tipo:"ce", sec:"regra", f:"(C/E) Se houver excesso na identificação criminal, responde a autoridade encarregada.", v:"<b>Certo.</b> O art. 4º manda evitar constrangimento; o excesso é de responsabilidade de quem conduziu o ato.", lei:["l12037a4"] },
{ id:"ic9", tipo:"ce", sec:"genetico", f:"(C/E) É vedado mencionar a identificação criminal em atestados de antecedentes antes do trânsito em julgado da condenação.", v:"<b>Certo</b> (art. 6º), quanto a atestados e informações <b>não destinadas ao juízo criminal</b>. Cuidado com a inversão: ao juízo criminal pode ser informada.", lei:["l12037a6"] },
{ id:"ic10", tipo:"caso", sec:"genetico", f:"Indiciado identificado criminalmente, denúncia não oferecida e inquérito arquivado. O que ele pode pedir?", v:"A <b>retirada da foto</b> dos autos (art. 7º), apresentando prova da identificação civil. A lei <b>não</b> cita a datiloscopia.", lei:["l12037a6"] },
{ id:"ic11", tipo:"numero", sec:"genetico", f:"Quando o perfil genético é excluído do banco?", v:"Na <b>absolvição</b>; na condenação, <b>a requerimento</b>, após <b>20 anos</b> do cumprimento da pena (art. 7º-A).", lei:["l12037a7a"] },
{ id:"ic12", tipo:"distincao", sec:"genetico", f:"Quem gere o banco de perfis genéticos e qual o caráter dos dados?", v:"Unidade <b>oficial de perícia criminal</b>; dados <b>sigilosos</b>; uso indevido gera responsabilização civil, penal e administrativa.", lei:["l12037a7a"] },
{ id:"ic13", tipo:"distincao", sec:"genetico", f:"O que é o BNMID (art. 7º-C) e onde fica?", v:"Banco Nacional Multibiométrico e de Impressões Digitais, no <b>Ministério da Justiça e Segurança Pública</b>: biometria, digitais e, se possível, íris, face e voz, para investigações criminais federais, estaduais e distritais.", lei:["l12037a7c"] },
{ id:"ic14", tipo:"distincao", sec:"genetico", f:"Quais as travas do BNMID?", v:"Sigilo; <b>proibida a venda</b> da base; uso civil/administrativo/eleitoral só de <b>digitais e dados de identificação</b>; interoperação por <b>acordo ou convênio</b>; coincidência vira <b>laudo de perito oficial</b>; acesso por <b>requerimento ao juiz</b>.", lei:["l12037a7c"] }
],
importancia:{ nivel:3,
  texto:"Lei curta e muito literal. A banca cobra a regra do art. 5º, LVIII da CF, o rol de documentos do art. 2º, as hipóteses do art. 3º e as regras de exclusão do perfil genético e da foto.",
  decore:[
    ["Regra constitucional","civilmente identificado <b>não</b> é identificado criminalmente (CF, art. 5º, LVIII)"],
    ["Art. 3º, IV","identificação essencial às investigações, por <b>despacho do juiz</b>"],
    ["Quem pode provocar o inciso IV","<b>autoridade policial, MP ou defesa</b> (ou juiz de ofício)"],
    ["Identificação criminal (art. 5º)","processo <b>datiloscópico</b> e <b>fotográfico</b>"],
    ["Perfil genético (art. 5º, §1º)","incisos <b>IV e VII</b> do art. 3º"],
    ["Exclusão do perfil (art. 7º-A)","absolvição; ou <b>20 anos</b> do cumprimento da pena, por requerimento"],
    ["Retirada da foto (art. 7º)","não oferecimento ou rejeição da denúncia, absolvição, arquivamento ou trânsito em julgado"],
    ["Atestados de antecedentes (art. 6º)","vedada a menção à identificação criminal antes do <b>trânsito em julgado</b>"],
    ["Banco Nacional Multibiométrico (art. 7º-C)","Ministério da Justiça; <b>vedada a comercialização</b>"]],
  macetes:[
    ["Rol aberto do art. 2º","Qualquer documento público que permita identificar vale, e os militares são equiparados aos civis."],
    ["Dúvida de identidade, quase sempre","Os incisos I, II, III, V e VI do art. 3º giram em torno de dúvida sobre quem é a pessoa. Só o IV (necessidade da investigação) e o VII (gravidade do crime) fogem disso."],
    ["Foto sim, digital não","O art. 7º trata só da retirada da <b>foto</b>, não da datiloscopia."]] },
comparativo:{ titulo:"Identificação civil × identificação criminal", head:["Identificação civil (art. 2º)","Identificação criminal (arts. 3º e 5º)"], rows:[
  ["<b>Natureza:</b> comprovada por documento público (identidade, carteira de trabalho, profissional, passaporte, funcional ou outro)","<b>Natureza:</b> processo datiloscópico e fotográfico e, nos incisos IV e VII, também material biológico"],
  ["<b>Regra:</b> quem a tem não é submetido à criminal (CF, art. 5º, LVIII)","<b>Regra:</b> só nas hipóteses do art. 3º, mesmo havendo documento"],
  ["<b>Quem decide:</b> não há decisão; basta o documento","<b>Quem decide (inciso IV):</b> o juiz, e nunca o delegado"],
  ["<b>Equiparação:</b> documentos militares valem como civis","<b>Cuidado:</b> a autoridade deve evitar constrangimento e responde por excesso (art. 4º)"],
  ["<b>Efeito no atestado:</b> sem restrição","<b>Efeito no atestado:</b> sua menção é vedada antes do trânsito em julgado (art. 6º)"]]},
prova:[
  { tipo:"ce", enun:"Quem apresenta carteira de trabalho ao ser preso em flagrante não pode ser submetido a identificação criminal em nenhuma hipótese.", gab:"Errado", com:"A regra admite exceções legais do art. 3º, como rasura ou indício de falsificação, documentos conflitantes ou ordem judicial." },
  { tipo:"ce", enun:"O despacho que determina a identificação criminal por ser essencial às investigações pode ser proferido pelo delegado de polícia.", gab:"Errado", com:"No inciso IV a decisão é do juiz, de ofício ou por representação da autoridade policial, do MP ou da defesa." },
  { tipo:"ce", enun:"O perfil genético do condenado é excluído do banco de dados, mediante requerimento, 20 anos após o cumprimento da pena.", gab:"Certo", com:"Art. 7º-A, II. Na absolvição, a exclusão é a regra." },
  { tipo:"ce", enun:"A informação genética armazenada no banco de perfis pode revelar traços somáticos e comportamentais do identificado, desde que sigilosa.", gab:"Errado", com:"Não pode revelar traços somáticos ou comportamentais, exceto a determinação genética de gênero." },
  { tipo:"caso", enun:"O investigado foi absolvido definitivamente e pede a retirada de sua foto do processo. O que ele deve apresentar?", com:"Apresentar prova da identificação civil (art. 7º). O artigo trata só da foto, não da datiloscopia." },
  { tipo:"caso", enun:"Acusado portava passaporte com sinais de rasura. Pode ser identificado criminalmente?", com:"Sim, pelo art. 3º, I (rasura ou indício de falsificação), que autoriza a identificação criminal mesmo com documento." }],
resumo:[
  "A <b>Lei 12.037/2009</b> regulamenta o art. 5º, LVIII da CF e substituiu a Lei 10.054/2000.",
  "O <b>art. 2º</b> traz rol aberto de documentos que comprovam a identificação civil; os militares são equiparados.",
  "O <b>art. 3º</b> lista sete hipóteses de identificação criminal mesmo com documento; o inciso IV exige despacho do <b>juiz</b>.",
  "O inciso VII (recebimento da denúncia por crimes graves) prevê coleta de DNA; confira a redação vigente.",
  "A identificação criminal inclui <b>datiloscopia e fotografia</b>; nos incisos IV e VII, também o <b>perfil genético</b>.",
  "O perfil genético é <b>sigiloso</b> e é excluído por absolvição ou, na condenação, por requerimento após 20 anos do cumprimento da pena.",
  "É vedada a menção à identificação criminal em atestados de antecedentes antes do <b>trânsito em julgado</b> (art. 6º).",
  "O <b>Banco Nacional Multibiométrico</b> (art. 7º-C) é sigiloso, não pode ser comercializado e o acesso de polícia e MP exige pedido ao juiz."],
checklist:[
  "Enunciar a regra do art. 5º, LVIII da CF e suas exceções legais.",
  "Listar os documentos do art. 2º e a equiparação dos militares.",
  "Citar as hipóteses do art. 3º e quem decide o inciso IV.",
  "Explicar o que compõe a identificação criminal e quando entra o perfil genético.",
  "Explicar quando e como se exclui o perfil genético e a foto.",
  "Dizer o que a lei veda em atestados de antecedentes.",
  "Descrever as regras do Banco Nacional Multibiométrico (sigilo, acesso, vedação de venda)."],
questoes:[]
};

/* ============ LEI 12.830/2013 ============ */
T.ext_investigacao_delegado = {
meta:{ tema:"Lei 12.830/2013: Investigação Criminal pelo Delegado", atualizado:AT,
  foco:"Natureza jurídica e exclusiva de Estado da função, condução do inquérito, requisição de perícias e dados, indiciamento privativo e fundamentado, avocação/redistribuição, remoção fundamentada e requisito de bacharel em Direito.",
  aviso:"Lei curta e muito literal. O requisito de 3 anos de atividade jurídica ou policial vem da Lei Orgânica das Polícias Civis (Lei 14.735/2023), citada no material de estudo; confira." },
secoes:[
{ id:"funcao", titulo:"Natureza da função e atribuições", curto:"Função/atribuições",
  rapido:["<b>Art. 2º, caput</b>: as funções de polícia judiciária e a apuração de infrações penais exercidas pelo delegado são de <b>natureza jurídica, essenciais e exclusivas de Estado</b>. Exclusivas de Estado: não podem ser delegadas a particulares.",
    "<b>Art. 2º, §1º</b>: ao delegado, como <b>autoridade policial</b>, cabe a condução da investigação criminal por <b>inquérito policial ou outro procedimento previsto em lei</b>, para apurar <b>circunstâncias, materialidade e autoria</b>.",
    "<b>Art. 2º, §2º</b>: durante a investigação, cabe ao delegado a <b>requisição</b> de perícia, informações, documentos e dados que interessem à apuração. É <b>requisição</b>, sem necessidade de pedir ao juiz.",
    "<b>Art. 2º, §6º</b>: o <b>indiciamento é privativo do delegado</b>, por <b>ato fundamentado</b>, mediante análise técnico-jurídica do fato, indicando <b>autoria, materialidade e circunstâncias</b>.",
    "<b>Art. 3º</b>: o cargo de delegado é <b>privativo de bacharel em Direito</b>, com o mesmo <b>tratamento protocolar</b> de magistrados, Defensoria, MP e advogados. Não precisa ser advogado nem ter inscrição na OAB."],
  teoria:[
   {h:"Polícia judiciária", p:["Polícias civis e Polícia Federal são chamadas de polícias judiciárias porque colhem elementos sobre o crime para subsidiar a ação penal do Ministério Público. A conclusão do inquérito, se houver indícios, vai ao MP.","A natureza jurídica da função explica por que só bacharel em Direito pode ocupar o cargo e por que a lei encerrou a discussão sobre delegados sem formação jurídica."]},
   {h:"Indiciamento", p:["Indiciar não é condenar nem declarar culpa: é apontar formalmente o investigado como provável autor, com base técnico-jurídica. É ato do delegado, e não de juiz, promotor ou CPI.","Segundo o material de estudo, nem as CPIs nem os procedimentos investigatórios do MP indiciam; e membros do MP e do Judiciário só são indiciados com autorização do tribunal competente."]}],
  pegadinhas:["Delegado precisa ser <b>bacharel em Direito</b>, não advogado/OAB.","A função <b>não é delegável</b> a outras autoridades por decreto ou secretário: a condução é do delegado.","Perícias, dados e documentos se <b>requisitam</b>; não depende de representação ao juiz.","Indiciamento é <b>privativo</b> e <b>fundamentado</b>, não depende de livre arbítrio sem motivação."] },
{ id:"garantias", titulo:"Garantias: avocação e remoção", curto:"Garantias",
  rapido:["<b>Art. 2º, §4º</b>: o inquérito (ou outro procedimento) <b>em curso</b> só pode ser <b>avocado ou redistribuído</b> por <b>superior hierárquico</b>, por <b>despacho fundamentado</b>, por (a) <b>motivo de interesse público</b> ou (b) <b>inobservância dos procedimentos regulamentares</b> que prejudique a eficácia da investigação.",
    "<b>Art. 2º, §5º</b>: a <b>remoção</b> do delegado só se dá por <b>ato fundamentado</b>. A lei não fala em inamovibilidade (como na magistratura), apenas exige motivação; também não diz quem é a autoridade competente.",
    "Essas garantias protegem a independência técnica do delegado: o inquérito instaurado deve ser concluído por ele, salvo as duas hipóteses legais."],
  teoria:[{h:"Como cobram", p:["As bancas copiam o §4º trocando 'e' por 'ou', ou excluindo a exigência de despacho fundamentado. Também inventam que o delegado-geral pode redistribuir ou remover 'sem justificativa' ou que a remoção é do Governador/Secretário.","A Lei Orgânica das Polícias Civis (Lei 14.735/2023), citada no material de estudo, exige três anos de atividade jurídica ou policial para o cargo (art. 20, §3º); a Lei 12.830 exige só o bacharelado. Confira."]}],
  pegadinhas:["Redistribuir ou avocar <b>sem justificativa</b>, por posição hierárquica, é errado.","Não existe 'salvo morte do delegado' como única hipótese de redistribuição.","Remoção é por ato <b>fundamentado</b>, mas a lei não diz que seja do Secretário ou do Governador.","Os motivos são <b>alternativos</b>: interesse público <b>ou</b> inobservância de procedimentos que prejudique a investigação."] }
],
lei:[
{ art:"Lei 12.830/2013, arts. 2º e 3º", nome:"Investigação criminal conduzida pelo delegado", sec:"funcao", itens:[
  { id:"l12830a2", rot:"Art. 2º, caput e §§1º e 2º",
    t:"<b>Art. 2º</b> As funções de polícia judiciária e a apuração de infrações penais exercidas pelo delegado de polícia são de natureza <b class='g1'>jurídica, essenciais e exclusivas de Estado</b>. § 1º Ao delegado de polícia, na qualidade de autoridade policial, cabe a condução da investigação criminal por meio de <b class='g1'>inquérito policial ou outro procedimento previsto em lei</b>, que tem como objetivo a apuração das <b class='g1'>circunstâncias, da materialidade e da autoria</b> das infrações penais. § 2º Durante a investigação criminal, cabe ao delegado de polícia a <b class='g1'>requisição de perícia, informações, documentos e dados</b> que interessem à apuração dos fatos.", c:["iv1","iv2","iv3"] },
  { id:"l12830a2p6", rot:"Art. 2º, §6º (indiciamento)",
    t:"<b>Art. 2º, § 6º</b> O <b class='g1'>indiciamento</b>, <b class='g3'>privativo do delegado de polícia</b>, dar-se-á por <b class='g1'>ato fundamentado</b>, mediante análise técnico-jurídica do fato, que deverá indicar a autoria, materialidade e suas circunstâncias.", c:["iv4","iv5"] },
  { id:"l12830a3", rot:"Art. 3º",
    t:"<b>Art. 3º</b> O cargo de delegado de polícia é privativo de <b class='g1'>bacharel em Direito</b>, devendo-lhe ser dispensado o mesmo <b class='g1'>tratamento protocolar</b> que recebem os magistrados, os membros da Defensoria Pública e do Ministério Público e os advogados.", c:["iv6"] }
]},
{ art:"Lei 12.830/2013, art. 2º, §§4º e 5º", nome:"Avocação, redistribuição e remoção", sec:"garantias", itens:[
  { id:"l12830a2p4", rot:"Art. 2º, §4º",
    t:"<b>Art. 2º, § 4º</b> O inquérito policial ou outro procedimento previsto em lei em curso somente poderá ser <b class='g1'>avocado ou redistribuído</b> por <b class='g3'>superior hierárquico</b>, mediante <b class='g1'>despacho fundamentado</b>, por motivo de <b class='g1'>interesse público</b> ou nas hipóteses de <b class='g1'>inobservância dos procedimentos</b> previstos em regulamento da corporação que prejudique a eficácia da investigação.", c:["iv7","iv8"] },
  { id:"l12830a2p5", rot:"Art. 2º, §5º",
    t:"<b>Art. 2º, § 5º</b> A <b class='g1'>remoção</b> do delegado de polícia dar-se-á somente por <b class='g1'>ato fundamentado</b>.", c:["iv9"] }
]}
],
juris:[],
cards:[
{ id:"iv1", tipo:"distincao", sec:"funcao", f:"Qual a natureza das funções de polícia judiciária do delegado (art. 2º)?", v:"<b>Jurídica</b>, <b>essenciais</b> e <b>exclusivas de Estado</b> (não delegáveis a particulares nem a outras autoridades).", lei:["l12830a2"] },
{ id:"iv2", tipo:"ce", sec:"funcao", f:"(C/E) O Secretário de Segurança pode, por decreto, delegar a condução do inquérito a outras autoridades.", v:"<b>Errado.</b> A condução da investigação por inquérito policial é do <b>delegado de polícia</b>, como autoridade policial; função exclusiva de Estado.", lei:["l12830a2"] },
{ id:"iv3", tipo:"ce", sec:"funcao", f:"(C/E) O delegado precisa representar ao juiz para obter perícias, informações, documentos e dados do inquérito.", v:"<b>Errado.</b> Ele <b>requisita</b> diretamente (art. 2º, §2º). Representa ao juiz apenas nas medidas sujeitas à reserva de jurisdição.", lei:["l12830a2"] },
{ id:"iv4", tipo:"distincao", sec:"funcao", f:"Como deve ser o indiciamento?", v:"<b>Privativo do delegado</b>, por <b>ato fundamentado</b>, com análise técnico-jurídica indicando autoria, materialidade e circunstâncias.", lei:["l12830a2p6"] },
{ id:"iv5", tipo:"ce", sec:"funcao", f:"(C/E) O indiciamento decorre do livre convencimento do delegado e dispensa fundamentação.", v:"<b>Errado.</b> Exige ato <b>fundamentado</b>, mediante análise técnico-jurídica.", lei:["l12830a2p6"] },
{ id:"iv6", tipo:"ce", sec:"funcao", f:"(C/E) Para ser delegado é preciso ser bacharel em Direito com inscrição na OAB.", v:"<b>Errado.</b> Basta o bacharelado em Direito (art. 3º). O tratamento protocolar é igual ao de magistrados, MP, Defensoria e advogados.", lei:["l12830a3"] },
{ id:"iv7", tipo:"distincao", sec:"garantias", f:"Quando o inquérito em curso pode ser avocado ou redistribuído?", v:"Só por <b>superior hierárquico</b>, com <b>despacho fundamentado</b>, por <b>interesse público</b> ou <b>inobservância de procedimentos regulamentares</b> que prejudique a eficácia da investigação.", lei:["l12830a2p4"] },
{ id:"iv8", tipo:"caso", sec:"garantias", f:"O delegado-geral redistribui um inquérito em andamento 'porque é o chefe', sem justificar. Está certo?", v:"Não. Exige-se <b>despacho fundamentado</b> e um dos dois motivos legais (interesse público ou inobservância de procedimentos que prejudique a investigação).", lei:["l12830a2p4"] },
{ id:"iv9", tipo:"ce", sec:"garantias", f:"(C/E) A remoção do delegado depende de ato fundamentado.", v:"<b>Certo</b> (art. 2º, §5º). A lei não diz quem é a autoridade competente nem garante inamovibilidade.", lei:["l12830a2p5"] },
{ id:"iv10", tipo:"distincao", sec:"funcao", f:"O que é o objeto da investigação criminal conduzida pelo delegado?", v:"Apurar <b>circunstâncias, materialidade e autoria</b> da infração, por inquérito ou outro procedimento previsto em lei.", lei:["l12830a2"] },
{ id:"iv11", tipo:"ce", sec:"funcao", f:"(C/E) As polícias militares exercem as funções de polícia judiciária descritas na Lei 12.830.", v:"<b>Errado.</b> Polícia judiciária é função das polícias civis e da Polícia Federal; a PM é ostensiva.", lei:["l12830a2"] }
],
importancia:{ nivel:4,
  texto:"A Lei 12.830/2013 é pequena, mas cai muito nas provas de delegado e de investigador: natureza da função, indiciamento privativo e fundamentado, avocação e redistribuição.",
  decore:[
    ["Natureza da função (art. 2º)","<b>jurídica</b>, essencial e <b>exclusiva de Estado</b>"],
    ["Condução da investigação (§1º)","inquérito policial <b>ou outro procedimento</b> previsto em lei"],
    ["Requisição (§2º)","perícia, informações, documentos e dados que interessem à apuração"],
    ["Indiciamento (§6º)","<b>privativo</b> do delegado, por ato <b>fundamentado</b>"],
    ["Avocação ou redistribuição (§4º)","só por <b>superior hierárquico</b>, despacho <b>fundamentado</b>"],
    ["Motivos do §4º","<b>interesse público</b> ou <b>inobservância de procedimentos</b> que prejudique a investigação"],
    ["Remoção (§5º)","somente por <b>ato fundamentado</b>"],
    ["Requisito do cargo (art. 3º)","<b>bacharel em Direito</b>"],
    ["Tratamento protocolar","o mesmo de magistrados, Defensoria, MP e advogados"]],
  macetes:[
    ["Motivos alternativos","No §4º os dois motivos são ligados por <b>ou</b>; a banca troca por “e”."],
    ["Requisitar, não pedir","Perícia, dados e documentos são requisitados pelo delegado; não dependem de ordem do juiz."],
    ["Bacharel, não advogado","O art. 3º exige bacharelado em Direito, e não inscrição na OAB."]] },
comparativo:{ titulo:"Avocação ou redistribuição (§4º) × remoção (§5º)", head:["Avocação ou redistribuição do inquérito (art. 2º, §4º)","Remoção do delegado (art. 2º, §5º)"], rows:[
  ["<b>Objeto:</b> o inquérito ou procedimento em curso","<b>Objeto:</b> a lotação do delegado"],
  ["<b>Quem faz:</b> superior hierárquico","<b>Quem faz:</b> a lei não diz qual autoridade"],
  ["<b>Forma:</b> despacho fundamentado","<b>Forma:</b> ato fundamentado"],
  ["<b>Motivos:</b> interesse público ou inobservância de procedimentos regulamentares que prejudique a investigação","<b>Motivos:</b> a lei exige apenas motivação, sem listar hipóteses"],
  ["<b>Garantia:</b> protege a condução do inquérito pelo delegado que o instaurou","<b>Garantia:</b> não equivale a inamovibilidade da magistratura"]]},
prova:[
  { tipo:"ce", enun:"O indiciamento é ato privativo do delegado de polícia, dispensada a fundamentação quando houver prova robusta da autoria.", gab:"Errado", com:"O art. 2º, §6º, exige ato fundamentado, mediante análise técnico-jurídica, indicando autoria, materialidade e circunstâncias." },
  { tipo:"ce", enun:"O inquérito policial em curso só pode ser avocado ou redistribuído por superior hierárquico, mediante despacho fundamentado, por motivo de interesse público ou inobservância de procedimentos regulamentares que prejudique a eficácia da investigação.", gab:"Certo", com:"É a redação do art. 2º, §4º." },
  { tipo:"ce", enun:"Para requisitar perícia e dados de interesse da investigação, o delegado deve obter autorização judicial prévia.", gab:"Errado", com:"O §2º confere ao delegado o poder de requisição, sem necessidade de pedir ao juiz." },
  { tipo:"ce", enun:"O cargo de delegado de polícia é privativo de advogado inscrito na OAB.", gab:"Errado", com:"O art. 3º exige bacharel em Direito, não inscrição na OAB." },
  { tipo:"caso", enun:"O delegado-geral retira um inquérito de um delegado, sem despacho, para entregá-lo a outro. É válido?", com:"Não: a avocação ou redistribuição exige despacho fundamentado de superior hierárquico, por interesse público ou inobservância de procedimentos que prejudique a eficácia da investigação." },
  { tipo:"caso", enun:"Uma CPI encaminha pedido para que o delegado indicie determinado investigado. Pode a CPI indiciar?", com:"O indiciamento é privativo do delegado de polícia, por ato fundamentado. Segundo o material, nem as CPIs nem os procedimentos investigatórios do MP indiciam." }],
resumo:[
  "A função de polícia judiciária e a apuração de infrações penais pelo delegado são de natureza <b>jurídica, essenciais e exclusivas de Estado</b>.",
  "O delegado conduz a investigação por <b>inquérito policial ou outro procedimento</b> previsto em lei, apurando circunstâncias, materialidade e autoria.",
  "A <b>requisição</b> de perícia, informações, documentos e dados é prerrogativa do delegado, sem intermediação judicial.",
  "O <b>indiciamento</b> é privativo e fundamentado: análise técnico-jurídica do fato.",
  "O inquérito em curso só é avocado ou redistribuído por superior hierárquico, por despacho fundamentado, por <b>interesse público</b> ou <b>inobservância de procedimentos</b>.",
  "A <b>remoção</b> exige ato fundamentado; a lei não equipara o delegado a magistrado.",
  "O cargo é privativo de <b>bacharel em Direito</b>; a Lei 14.735/2023 acrescenta a exigência de 3 anos de atividade jurídica ou policial (confira)."],
checklist:[
  "Explicar por que a função do delegado é jurídica e exclusiva de Estado.",
  "Diferenciar indiciamento de acusação e dizer quem pode indiciar.",
  "Citar o conteúdo mínimo do ato de indiciamento.",
  "Reproduzir as condições do §4º (superior, despacho fundamentado, dois motivos alternativos).",
  "Dizer que a remoção exige ato fundamentado.",
  "Explicar a requisição de perícia e dados, sem autorização judicial.",
  "Saber o requisito do cargo e o tratamento protocolar."],
questoes:[]
};

/* ============ LEI 9.807/1999 ============ */
T.ext_protecao_testemunha = {
meta:{ tema:"Lei 9.807/1999: Proteção a Vítimas e Testemunhas", atualizado:AT,
  foco:"Programas de proteção, quem pode ser protegido, conselho deliberativo, solicitação, medidas do art. 7º, mudança de nome, exclusão, prazo, programa federal e a proteção do réu colaborador (perdão judicial e redução de pena).",
  aviso:"Os arts. 14 e 15 (redução de pena e medidas ao colaborador) foram escritos com base no conhecimento do texto legal e na parte final do material; confira no Planalto. Hoje o programa federal é conduzido pelo órgão de direitos humanos, não mais pelo Ministério da Justiça." },
secoes:[
{ id:"programa", titulo:"Programa de proteção", curto:"Programa",
  rapido:["<b>Art. 1º</b>: proteção a <b>vítimas e testemunhas</b> coagidas ou expostas a <b>grave ameaça</b> por colaborarem com investigação ou processo criminal; prestada por <b>União, Estados e DF</b> em programas especiais. Pode alcançar <b>cônjuge/companheiro, ascendentes, descendentes e dependentes</b> com convivência habitual.",
    "<b>Excluídos</b> do programa: pessoas de personalidade/conduta incompatível com as restrições; <b>condenados cumprindo pena</b>; <b>indiciados ou acusados sob prisão cautelar</b>. Isso não impede a segurança pública de adotar medidas de preservação da integridade física.",
    "<b>Art. 2º</b>: a concessão leva em conta a <b>gravidade da coação/ameaça</b>, a <b>dificuldade de preveni-la</b> pelos meios convencionais e a <b>importância para a prova</b>. As medidas exigem <b>anuência</b> do protegido e são mantidas em <b>sigilo</b>. <b>Art. 3º</b>: ingresso/exclusão são precedidos de consulta ao <b>MP</b> e comunicados à autoridade policial ou ao juiz.",
    "<b>Art. 4º</b>: cada programa é dirigido por <b>conselho deliberativo</b> com representantes do <b>MP, Judiciário</b> e órgãos públicos e privados de segurança pública e direitos humanos. <b>Art. 6º</b>: o conselho decide ingresso/exclusão e as providências; decisão por <b>maioria absoluta</b>, sujeita à <b>disponibilidade orçamentária</b>.",
    "<b>Art. 5º</b>: a solicitação de ingresso pode vir do <b>interessado</b>, do <b>MP</b>, da <b>autoridade policial</b> que conduz a investigação, do <b>juiz</b> da instrução ou de <b>órgãos de defesa dos direitos humanos</b>. Em caso grave, a pessoa pode ficar <b>provisoriamente sob custódia policial</b> até a decisão.",
    "<b>Art. 7º</b>: medidas (9): segurança na residência (com controle de telecomunicações); escolta nos deslocamentos; transferência de residência ou acomodação provisória; preservação de identidade, imagem e dados pessoais; ajuda financeira mensal (teto fixado no início de cada ano); suspensão temporária das atividades funcionais sem prejuízo dos vencimentos; apoio e assistência social, médica e psicológica; sigilo dos atos; apoio para obrigações civis e administrativas que exijam comparecimento pessoal.",
    "<b>Art. 9º</b>: em <b>casos excepcionais</b>, o conselho encaminha ao juiz de registros públicos o pedido de <b>alteração de nome completo</b>; ouve-se o MP, corre em <b>segredo de justiça</b> e <b>rito sumaríssimo</b>; a sentença ordena averbação sigilosa (sem o novo nome no registro original), emissão de documentos e remessa ao órgão do registro único de identificação civil. Cessada a ameaça, o interessado pode pedir o <b>retorno ao nome anterior</b>.",
    "<b>Art. 10</b>: exclusão a qualquer tempo por <b>solicitação do interessado</b> ou por decisão do conselho (<b>cessação dos motivos</b> ou <b>conduta incompatível</b>). Duração de no máximo <b>2 anos</b>, prorrogável excepcionalmente. <b>Art. 12</b>: institui o <b>Programa Federal de Assistência a Vítimas e Testemunhas Ameaçadas</b> (regulamentado pelo Decreto 3.518/2000). <b>Art. 19-A</b>: prioridade na tramitação do inquérito e do processo que envolvam protegidos e colaboradores."],
  teoria:[
   {h:"Fluxo do programa", p:["Pedido (art. 5º) → instrução, com documentos e pareceres técnicos que o órgão executor pode solicitar → decisão do conselho deliberativo → medidas aceitas pelo protegido → sigilo → fim por exclusão ou prazo.","As medidas são ao mesmo tempo direitos e deveres: o protegido aceita restrições de comportamento. O ingresso é voluntário e depende da anuência do protegido ou de seu representante."]},
   {h:"Mudança de nome", p:["É medida excepcional e judicial. Pode alcançar o protegido e seus familiares, inclusive filhos menores. O sigilo é essencial: a averbação no registro original informa a alteração sem expor o novo nome.","O conselho mantém controle sobre a localização de quem teve o nome alterado."]}],
  pegadinhas:["Quem decide o ingresso é o <b>conselho deliberativo</b>, não o juiz nem o delegado; o MP é só consultado.","A solicitação pode partir de <b>autoridade policial e juiz</b>, não só da vítima ou testemunha.","Preso cautelar e condenado cumprindo pena <b>não</b> entram no programa (mas há proteção ao <b>colaborador</b> preso, em outro capítulo).","Suspensão de atividades funcionais é <b>temporária</b> e com vencimentos; 'definitiva' é erro.","O prazo é de <b>no máximo 2 anos</b>, não mínimo."] },
{ id:"colaborador", titulo:"Réu colaborador: perdão e redução", curto:"Colaborador",
  rapido:["<b>Art. 13</b>: o juiz, de ofício ou a requerimento, pode conceder <b>perdão judicial</b> e extinguir a punibilidade ao acusado <b>primário</b> que colaborou <b>efetiva e voluntariamente</b>, se da colaboração resultou: (I) <b>identificação dos demais coautores/partícipes</b>; (II) <b>localização da vítima com integridade física preservada</b>; (III) <b>recuperação total ou parcial do produto do crime</b>.",
    "A concessão considera a <b>personalidade</b> do beneficiado e a <b>natureza, circunstâncias, gravidade e repercussão social</b> do fato.",
    "<b>Art. 14</b> (confira): se não houver perdão, o indiciado/acusado que colaborou nesses resultados e for condenado tem a <b>pena reduzida de 1/3 a 2/3</b>.",
    "<b>Art. 15</b> (confira): podem ser aplicadas ao colaborador, ainda que preso, medidas especiais de segurança e proteção da integridade física, em geral as do art. 8º; se preso, pode ficar em <b>local separado</b> dos demais.",
    "<b>Art. 19-A</b>: <b>prioridade de tramitação</b> do inquérito e do processo em que figurem indiciado, acusado, vítima ou réu colaboradores, vítima ou testemunha protegidas.",
    "<b>STF (HC 129.877/RJ, 1ª Turma, 2017, Inf. 861)</b>: para o perdão por colaboração, basta que seja <b>voluntária</b> (livre de constrangimento); <b>não</b> precisa ser <b>espontânea</b>, isto é, a ideia de colaborar não precisa partir do agente."],
  teoria:[{h:"Voluntária × espontânea", p:["Espontânea é quando a iniciativa nasce do próprio agente; voluntária é quando a decisão é livre, mesmo que sugerida por terceiros ou negociada. A lei exige voluntariedade, e o STF confirmou que a negociação não afasta o benefício."]}],
  pegadinhas:["Perdão judicial exige <b>primariedade</b>; os resultados do art. 13 são cumulativos ou alternativos conforme o caso, mas a colaboração deve ser <b>efetiva</b>.","A localização da vítima só conta se ela estiver <b>com integridade física preservada</b>.","Voluntária ≠ espontânea.","Perdão judicial <b>extingue a punibilidade</b>; sem perdão, a consequência é a <b>redução</b> da pena."] }
],
lei:[
{ art:"Lei 9.807/1999, arts. 1º a 12 e 19-A", nome:"Programas de proteção a vítimas e testemunhas", sec:"programa", itens:[
  { id:"l9807a1", rot:"Arts. 1º e 2º",
    t:"<b>Art. 1º</b> As medidas de proteção requeridas por <b class='g1'>vítimas ou por testemunhas de crimes</b> que estejam <b class='g1'>coagidas ou expostas a grave ameaça</b> em razão de colaborarem com a investigação ou processo criminal serão prestadas pela <b class='g2'>União, pelos Estados e pelo Distrito Federal</b>, no âmbito das respectivas competências, na forma de programas especiais organizados com base nas disposições desta Lei. <b>Art. 2º</b> A proteção concedida pelos programas e as medidas dela decorrentes levarão em conta a <b class='g1'>gravidade da coação ou da ameaça</b> à integridade física ou psicológica, a <b class='g1'>dificuldade de preveni-las ou reprimi-las</b> pelos meios convencionais e a sua <b class='g1'>importância para a produção da prova</b>.", c:["pt1","pt2","pt3"] },
  { id:"l9807a4", rot:"Arts. 4º a 6º",
    t:"<b>Art. 4º</b> Cada programa será dirigido por um <b class='g1'>conselho deliberativo</b> em cuja composição haverá representantes do <b class='g1'>Ministério Público</b>, do <b class='g1'>Poder Judiciário</b> e de órgãos públicos e privados relacionados com a segurança pública e a defesa dos direitos humanos. <b>Art. 5º</b> A solicitação objetivando ingresso no programa poderá ser encaminhada ao órgão executor: I – pelo interessado; II – por representante do Ministério Público; III – pela autoridade policial que conduz a investigação criminal; IV – pelo juiz competente para a instrução do processo criminal; V – por órgãos públicos e entidades com atribuições de defesa dos direitos humanos. <b>Art. 6º</b> O conselho deliberativo decidirá sobre: I – o ingresso do protegido no programa ou a sua exclusão; II – as providências necessárias ao cumprimento do programa. Parágrafo único. As deliberações do conselho serão tomadas por <b class='g2'>maioria absoluta</b> de seus membros e sua execução ficará sujeita à disponibilidade orçamentária.", c:["pt4","pt5","pt6"] },
  { id:"l9807a7", rot:"Art. 7º (medidas)",
    t:"<b>Art. 7º</b> Os programas compreendem, dentre outras, as seguintes medidas, aplicáveis isolada ou cumulativamente em benefício da pessoa protegida, segundo a gravidade de cada caso: I – segurança na residência, incluindo o <b class='g1'>controle de telecomunicações</b>; II – <b class='g1'>escolta e segurança</b> nos deslocamentos da residência, inclusive para fins de trabalho ou para a prestação de depoimentos; III – <b class='g1'>transferência de residência</b> ou acomodação provisória em local compatível com a proteção; IV – <b class='g1'>preservação da identidade, imagem e dados pessoais</b>; V – <b class='g1'>ajuda financeira mensal</b> para prover as despesas necessárias à subsistência individual ou familiar, no caso de a pessoa protegida estar impossibilitada de desenvolver trabalho regular ou de inexistência de qualquer fonte de renda; VI – <b class='g1'>suspensão temporária das atividades funcionais</b>, sem prejuízo dos respectivos vencimentos ou vantagens, quando servidor público ou militar; VII – apoio e assistência social, médica e psicológica; VIII – <b class='g1'>sigilo</b> em relação aos atos praticados em virtude da proteção concedida; IX – apoio do órgão executor do programa para o cumprimento de obrigações civis e administrativas que exijam o comparecimento pessoal. Parágrafo único. A ajuda financeira terá um <b class='g2'>teto fixado pelo conselho deliberativo no início de cada exercício financeiro</b>.", c:["pt7","pt8"] },
  { id:"l9807a9", rot:"Art. 9º (mudança de nome)",
    t:"<b>Art. 9º</b> Em <b class='g3'>casos excepcionais</b> e considerando as características e gravidade da coação ou ameaça, poderá o conselho deliberativo encaminhar requerimento da pessoa protegida ao <b class='g1'>juiz competente para registros públicos</b> objetivando a <b class='g1'>alteração de nome completo</b>. (O processo corre em <b class='g1'>segredo de justiça</b>, observado o <b class='g1'>rito sumaríssimo</b>, ouvido o Ministério Público; a sentença determina a averbação sigilosa no registro original, sem o nome alterado, a emissão dos documentos e a remessa ao órgão do registro único de identificação civil.)", c:["pt9"] },
  { id:"l9807a10", rot:"Arts. 10 a 12 e 19-A",
    t:"<b>Art. 10</b> A <b class='g1'>exclusão</b> da pessoa protegida de programa de proteção a vítimas e a testemunhas poderá ocorrer a qualquer tempo: I – por solicitação do próprio interessado; II – por decisão do conselho deliberativo, em consequência de: a) <b class='g1'>cessação dos motivos</b> que ensejaram a proteção; b) <b class='g1'>conduta incompatível</b> do protegido. (A permanência é de, no máximo, <b class='g2'>2 anos</b>, excepcionalmente prorrogável.) <b>Art. 12</b> Fica instituído, no âmbito do órgão do Ministério da Justiça com atribuições para a execução da política de direitos humanos, o <b class='g1'>Programa Federal de Assistência a Vítimas e a Testemunhas Ameaçadas</b>, a ser regulamentado por decreto do Poder Executivo. <b>Art. 19-A</b> Terão <b class='g1'>prioridade na tramitação</b> o inquérito e o processo criminal em que figure indiciado, acusado, vítima ou réu colaboradores, vítima ou testemunha protegidas pelos programas de que trata esta Lei.", c:["pt10","pt11"] }
]},
{ art:"Lei 9.807/1999, arts. 13 a 15", nome:"Proteção ao acusado colaborador", sec:"colaborador", itens:[
  { id:"l9807a13", rot:"Art. 13",
    t:"<b>Art. 13</b> Poderá o juiz, de ofício ou a requerimento das partes, conceder o <b class='g1'>perdão judicial</b> e a consequente <b class='g1'>extinção da punibilidade</b> ao acusado que, sendo <b class='g3'>primário</b>, tenha colaborado <b class='g1'>efetiva e voluntariamente</b> com a investigação e o processo criminal, desde que dessa colaboração tenha resultado: I – a <b class='g1'>identificação dos demais coautores ou partícipes</b> da ação criminosa; II – a <b class='g1'>localização da vítima com a sua integridade física preservada</b>; III – a <b class='g1'>recuperação total ou parcial do produto do crime</b>. Parágrafo único. A concessão do perdão judicial levará em conta a personalidade do beneficiado e a natureza, circunstâncias, gravidade e repercussão social do fato criminoso.", c:["pt12","pt13","pt14"] },
  { id:"l9807a14", rot:"Arts. 14 e 15 (síntese, confira)",
    t:"<b>Art. 14</b> (síntese) O indiciado ou acusado que colaborar voluntariamente com a investigação policial e o processo criminal nos resultados acima, no caso de condenação, terá a <b class='g2'>pena reduzida de um a dois terços</b>. <b>Art. 15</b> (síntese) Serão aplicadas em benefício do colaborador, na prisão ou fora dela, medidas especiais de segurança e proteção a sua integridade física, considerando ameaça ou coação eventual ou efetiva; estando preso, poderá ficar em <b class='g1'>local separado</b> dos demais presos. <i>Redação conforme o material de estudo e o texto legal de memória; confira no Planalto.</i>", c:["pt15"] }
]}
],
juris:[
{ id:"stf-hc129877", trib:"STF", tipo:"HC", num:"HC 129.877/RJ", sec:"colaborador", status:"vigente", data:"18/04/2017",
  titulo:"Perdão judicial na colaboração: voluntariedade, sem exigir espontaneidade",
  texto:"A 1ª Turma indeferiu a ordem em habeas corpus que discutia se a colaboração premiada para fins de perdão judicial (art. 13 da Lei 9.807/1999) exige espontaneidade ou apenas voluntariedade. Informativo STF 861 (rel. Min. Marco Aurélio).",
  explica:"Basta que a colaboração seja de livre vontade, sem constrangimento; não é necessário que a ideia de colaborar parta do agente.", lei:["l9807a13"], fonte:STFJ }
],
cards:[
{ id:"pt1", tipo:"distincao", sec:"programa", f:"Quem pode ser protegido pela Lei 9.807 e quem presta a proteção?", v:"<b>Vítimas e testemunhas</b> coagidas ou sob grave ameaça por colaborarem com a persecução; também cônjuge/companheiro, ascendentes, descendentes e dependentes com convivência habitual. Prestada por <b>União, Estados e DF</b>.", lei:["l9807a1"] },
{ id:"pt2", tipo:"distincao", sec:"programa", f:"Quem fica fora do programa?", v:"Pessoas de personalidade/conduta incompatível; <b>condenados em cumprimento de pena</b>; <b>indiciados ou acusados sob prisão cautelar</b>.", lei:["l9807a1"] },
{ id:"pt3", tipo:"distincao", sec:"programa", f:"O que o art. 2º manda considerar para conceder a proteção?", v:"<b>Gravidade da coação/ameaça</b>, <b>dificuldade de preveni-la</b> pelos meios convencionais e <b>importância para a produção da prova</b>.", lei:["l9807a1"] },
{ id:"pt4", tipo:"distincao", sec:"programa", f:"Composição e função do conselho deliberativo?", v:"Representantes do <b>MP, Judiciário</b> e órgãos públicos e privados de segurança pública e direitos humanos. Decide <b>ingresso/exclusão</b> e as providências, por <b>maioria absoluta</b>, sujeitas à disponibilidade orçamentária.", lei:["l9807a4"] },
{ id:"pt5", tipo:"distincao", sec:"programa", f:"Quem pode solicitar o ingresso no programa (art. 5º)?", v:"O interessado; o MP; a <b>autoridade policial</b> que conduz a investigação; o <b>juiz</b> da instrução; órgãos e entidades de defesa dos direitos humanos.", lei:["l9807a4"] },
{ id:"pt6", tipo:"ce", sec:"programa", f:"(C/E) O juiz da causa decide o ingresso e a exclusão do protegido.", v:"<b>Errado.</b> Decide o <b>conselho deliberativo</b>; o MP é consultado e a decisão é comunicada à autoridade policial ou ao juiz.", lei:["l9807a4"] },
{ id:"pt7", tipo:"distincao", sec:"programa", f:"Cite as medidas do art. 7º.", v:"Segurança na residência/telecomunicações; escolta; transferência/acomodação; preservação de identidade; ajuda financeira; suspensão temporária das funções com vencimentos; apoio social/médico/psicológico; sigilo; apoio para obrigações civis e administrativas.", lei:["l9807a7"] },
{ id:"pt8", tipo:"ce", sec:"programa", f:"(C/E) O programa prevê a suspensão definitiva das atividades funcionais do servidor protegido.", v:"<b>Errado.</b> É suspensão <b>temporária</b>, sem prejuízo de vencimentos e vantagens.", lei:["l9807a7"] },
{ id:"pt9", tipo:"distincao", sec:"programa", f:"Como funciona a mudança de nome no programa?", v:"<b>Excepcional</b>; o conselho encaminha o pedido ao juiz de registros públicos; ouve-se o MP; <b>segredo de justiça</b> e rito sumaríssimo; averbação sigilosa; possível retorno ao nome anterior a pedido.", lei:["l9807a9"] },
{ id:"pt10", tipo:"distincao", sec:"programa", f:"Hipóteses de exclusão do programa?", v:"A qualquer tempo: por <b>solicitação do interessado</b> ou por decisão do conselho (<b>cessação dos motivos</b> ou <b>conduta incompatível</b>).", lei:["l9807a10"] },
{ id:"pt11", tipo:"numero", sec:"programa", f:"Duração do programa e órgão federal?", v:"No <b>máximo 2 anos</b>, prorrogável excepcionalmente. Programa Federal de Assistência a Vítimas e Testemunhas Ameaçadas (art. 12; Decreto 3.518/2000). Prioridade de tramitação: art. <b>19-A</b>.", lei:["l9807a10"] },
{ id:"pt12", tipo:"distincao", sec:"colaborador", f:"Requisitos do perdão judicial do art. 13?", v:"Acusado <b>primário</b>, colaboração <b>efetiva e voluntária</b>, com resultado: identificação de coautores/partícipes; localização da vítima com integridade física; recuperação total ou parcial do produto do crime.", lei:["l9807a13"] },
{ id:"pt13", tipo:"ce", sec:"colaborador", f:"(C/E) O perdão judicial do art. 13 exige que a colaboração seja espontânea.", v:"<b>Errado.</b> Basta ser <b>voluntária</b> (STF, HC 129.877/RJ).", lei:["l9807a13"], j:["stf-hc129877"] },
{ id:"pt14", tipo:"caso", sec:"colaborador", f:"Réu primário indica os comparsas, mas a vítima é encontrada morta. Cabe perdão do art. 13, II?", v:"Não pelo inciso II (exige integridade física preservada). Pode caber pelo inciso I (identificação dos coautores), se a colaboração foi efetiva e voluntária.", lei:["l9807a13"] },
{ id:"pt15", tipo:"numero", sec:"colaborador", f:"Sem perdão, qual o benefício do colaborador condenado?", v:"Redução de pena de <b>1/3 a 2/3</b> (art. 14, confira) e medidas de segurança, inclusive <b>local separado</b> se preso (art. 15).", lei:["l9807a14"] }
],
importancia:{ nivel:4,
  texto:"A Lei 9.807/1999 combina dois assuntos que a banca cobra com frequência: o programa de proteção a vítimas e testemunhas (quem decide, quem pede, prazo) e os benefícios do réu colaborador (perdão judicial e redução de pena).",
  decore:[
    ["Prazo máximo no programa (art. 10)","<b>2 anos</b>, prorrogável excepcionalmente"],
    ["Órgão que decide o ingresso","<b>conselho deliberativo</b>, por maioria absoluta"],
    ["Quem solicita o ingresso (art. 5º)","interessado, MP, autoridade policial, juiz ou órgãos de direitos humanos"],
    ["Medidas do art. 7º","<b>9</b> medidas, com sigilo e anuência do protegido"],
    ["Mudança de nome (art. 9º)","caso <b>excepcional</b>; juiz de registros públicos; segredo de justiça"],
    ["Não entram no programa","condenados cumprindo pena e presos cautelares"],
    ["Perdão judicial (art. 13)","acusado <b>primário</b> com colaboração <b>efetiva e voluntária</b>"],
    ["Redução de pena (art. 14)","<b>1/3 a 2/3</b> (confira)"],
    ["Prioridade de tramitação (art. 19-A)","inquérito e processo com protegidos e colaboradores"]],
  macetes:[
    ["Voluntária não é espontânea","Para o perdão basta que a colaboração seja livre de constrangimento; a ideia pode vir de terceiros (STF, HC 129.877)."],
    ["Conselho decide, MP opina","O ingresso é do conselho deliberativo; o MP é consultado."],
    ["Perdão extingue, redução reduz","Com perdão, extingue-se a punibilidade; sem perdão, o colaborador condenado tem a pena reduzida."]] },
comparativo:{ titulo:"Perdão judicial (art. 13) × redução de pena (art. 14)", head:["Perdão judicial (art. 13)","Redução de pena (art. 14, confira)"], rows:[
  ["<b>Efeito:</b> extingue a punibilidade","<b>Efeito:</b> reduz a pena de 1/3 a 2/3"],
  ["<b>Quando:</b> acusado primário com colaboração efetiva e voluntária","<b>Quando:</b> não houve perdão, mas houve colaboração com os mesmos resultados e o colaborador foi condenado"],
  ["<b>Resultado exigido:</b> identificação de coautores ou partícipes, localização da vítima com integridade física preservada ou recuperação total ou parcial do produto do crime","<b>Resultado exigido:</b> os mesmos resultados do art. 13"],
  ["<b>Critérios do juiz:</b> personalidade, natureza, circunstâncias, gravidade e repercussão social do fato","<b>Critérios do juiz:</b> aplica-se na condenação, após a decisão de não conceder o perdão"],
  ["<b>Primariedade:</b> exigida","<b>Primariedade:</b> não é pressuposto da redução"]]},
prova:[
  { tipo:"ce", enun:"O ingresso de uma testemunha no programa federal é decidido pelo conselho deliberativo, que consulta o Ministério Público.", gab:"Certo", com:"Os arts. 3º e 6º atribuem ao conselho a decisão, precedida de consulta ao MP." },
  { tipo:"ce", enun:"Acusado preso cautelarmente pode ser incluído no programa de proteção a vítimas e testemunhas.", gab:"Errado", com:"O art. 2º exclui os condenados cumprindo pena e os indiciados ou acusados sob prisão cautelar." },
  { tipo:"ce", enun:"A permanência no programa é de no mínimo 2 anos.", gab:"Errado", com:"O prazo é de no máximo 2 anos, prorrogável excepcionalmente (art. 10)." },
  { tipo:"ce", enun:"Para o perdão judicial ao réu colaborador, é necessário que a colaboração seja espontânea, isto é, que a iniciativa parta do próprio agente.", gab:"Errado", com:"Segundo o STF (HC 129.877), basta que seja voluntária, ainda que a ideia tenha sido sugerida por terceiros." },
  { tipo:"caso", enun:"Uma testemunha ameaçada precisa mudar de nome. Quem decide e como se processa o pedido?", com:"A mudança de nome é excepcional: o conselho deliberativo encaminha o pedido ao juiz de registros públicos, que ouve o MP, em segredo de justiça e rito sumaríssimo. A averbação é sigilosa." },
  { tipo:"caso", enun:"Réu primário, ao colaborar, indica o local onde a vítima do sequestro está viva e sem lesões. Qual o benefício possível?", com:"Perdão judicial do art. 13, II, que extingue a punibilidade, considerados personalidade e natureza e gravidade do fato." }],
resumo:[
  "O programa protege <b>vítimas e testemunhas</b> coagidas ou expostas a grave ameaça, podendo alcançar familiares e dependentes.",
  "Ficam fora: personalidade incompatível, <b>condenados cumprindo pena</b> e <b>presos cautelares</b>.",
  "Cada programa tem um <b>conselho deliberativo</b>, que decide ingresso e exclusão por maioria absoluta, após consultar o MP.",
  "A solicitação pode vir do interessado, MP, autoridade policial, juiz ou órgãos de direitos humanos.",
  "O <b>art. 7º</b> traz nove medidas, e a permanência é de no máximo <b>2 anos</b>.",
  "A <b>mudança de nome</b> é excepcional, judicial e sigilosa.",
  "<b>Réu colaborador</b>: perdão judicial (art. 13) ao primário e redução de 1/3 a 2/3 (art. 14, confira).",
  "Para o perdão, basta colaboração <b>voluntária</b>, não necessariamente espontânea (STF, HC 129.877).",
  "O art. 19-A dá <b>prioridade de tramitação</b> a inquéritos e processos com protegidos e colaboradores."],
checklist:[
  "Dizer quem é protegido e quem é excluído do programa.",
  "Explicar o papel do conselho deliberativo e do MP.",
  "Listar quem pode solicitar o ingresso.",
  "Citar as medidas do art. 7º e o prazo máximo de 2 anos.",
  "Explicar a mudança de nome (requisitos e rito).",
  "Descrever os requisitos do perdão judicial e seus três resultados.",
  "Diferenciar perdão judicial de redução de pena.",
  "Explicar a diferença entre colaboração voluntária e espontânea.",
  "Lembrar que o programa federal é conduzido pelo órgão de direitos humanos (confira)."],
questoes:[]
};
})();
