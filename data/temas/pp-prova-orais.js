/* Direito Processual Penal (III): provas orais e pessoais — interrogatório, confissão, ofendido, testemunhas, reconhecimento e acareação (CPP, arts. 185 a 230).
   Conferido em 24/10/2026. Texto legal transcrito de memória e marcado "confira" onde há dúvida; itens recentes ficam como "atenção".
   Base didática: material de estudo PC-BA (Processo Penal, provas), reescrito com estrutura e palavras próprias. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "24/10/2026";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

T.pp_prova_orais = {
meta:{ tema:"Provas orais: interrogatório, confissão, ofendido, testemunha, reconhecimento e acareação", atualizado:AT,
  foco:"Interrogatório (natureza de defesa, silêncio, partes, videoconferência, condução coercitiva); confissão e sua valoração; declarações do ofendido; testemunhas (limites, recusa, proibição, compromisso, ordem de perguntas, prerrogativas); reconhecimento de pessoas e coisas (art. 226 e Tema 1.258 do STJ); acareação.",
  aviso:"O Tema 1.258 do STJ e outros julgados de 2025/2026 estão marcados como «atenção»: vieram do material de estudo e não foram reconfirmados na fonte oficial." },
secoes:[
{ id:"interrogatorio", titulo:"Interrogatório do acusado (arts. 185 a 196)", curto:"Interrogatório",
  rapido:["Natureza <b>mista</b>, com <b>predomínio de meio de defesa</b>: é a oportunidade de o réu apresentar sua versão e, se quiser, calar-se.",
    "É feito <b>ao final da instrução</b> (STF; no STJ, a inversão gera <b>nulidade relativa</b> — Tema 1.114, <b>atenção</b>). Com <b>defensor presente</b>; antes do ato, o réu tem direito a <b>entrevista reservada</b> com ele.",
    "<b>Direito ao silêncio</b> (art. 186): o juiz deve informar o acusado; o silêncio <b>não importa confissão</b> e não pode ser interpretado em prejuízo da defesa. O silêncio <b>não abrange a qualificação</b>.",
    "Duas partes (art. 187): sobre a <b>pessoa</b> do acusado e sobre os <b>fatos</b>. Perguntas feitas <b>pelas partes</b> diretamente (sistema presidencialista no interrogatório comum; cross-examination no júri)."],
  teoria:[
    { h:"Características", p:[
      "<b>Obrigatório</b> (o juiz deve oportunizar), mas <b>facultativo</b> para o réu responder. <b>Personalíssimo</b>, <b>oral</b>, <b>público</b> e <b>individual</b> (cada corréu separado, sem presença dos demais).",
      "O defensor presente é indispensável; a falta de <b>entrevista prévia</b> com o defensor gera <b>nulidade relativa</b> (precisa de prejuízo). Reinterrogatório: o juiz pode, a qualquer tempo, de ofício ou a pedido, proceder a novo interrogatório (art. 196)."]},
    { h:"Videoconferência", p:[
      "Em caráter <b>excepcional</b>, por decisão fundamentada, para prevenir risco à segurança pública, viabilizar a participação do réu quando há dificuldade de comparecimento por enfermidade, evitar influência sobre testemunha ou vítima, ou responder à gravíssima questão de ordem pública (art. 185, §§ 2º a 9º). As partes têm acesso à sala do réu e comunicação reservada com o defensor."]},
    { h:"Condução coercitiva", p:[
      "O STF (ADPF 395 e 444) declarou <b>não recepcionada</b> a condução coercitiva do investigado ou réu para interrogatório. Pode haver condução para outros fins legais (identificação, reconhecimento), mas não para obrigar a prestar declarações."]},
    { h:"Valor probatório", p:[
      "Por se tratar de meio de defesa, o interrogatório não gera presunção de culpa pela recusa em responder. Admite-se, porém, usar as respostas do réu como elemento de convicção quando convergentes com as demais provas."]}],
  pegadinhas:["Silêncio <b>não</b> cobre a qualificação (nome, endereço, etc.).",
    "Condução coercitiva para interrogatório: <b>inconstitucional</b> (ADPF 395 e 444).",
    "O corréu <b>não</b> participa do interrogatório do outro: cada um é ouvido separadamente."] },

{ id:"confissao", titulo:"Confissão e declarações do ofendido", curto:"Confissão e ofendido",
  rapido:["<b>Confissão</b> tem valor <b>relativo</b>: o juiz a confronta com as demais provas (art. 197). É <b>divisível</b> e <b>retratável</b> (art. 200).",
    "Confissão <b>extrajudicial</b> (feita ao delegado) só vale se produzida em <b>estabelecimento oficial</b> e <b>documentada</b>, e serve apenas para <b>orientar a obtenção de outras provas</b>.",
    "Confissão espontânea é <b>atenuante</b> (CP, art. 65, III, d) mesmo quando <b>qualificada</b> (o réu admite o fato e alega excludente), em fração menor.",
    "<b>Ofendido</b> não é testemunha: <b>não presta compromisso</b>, não comete falso testemunho (pode haver <b>denunciação caluniosa</b>) e suas declarações têm <b>especial relevância</b> nos crimes clandestinos."],
  teoria:[
    { h:"Classificação da confissão", p:[
      "<b>Judicial</b> × <b>extrajudicial</b>; <b>simples</b> (reconhece o fato sem ressalvas) × <b>qualificada</b> (admite com ressalva que favorece o réu) × <b>complexa</b> (vários fatos). <b>Real</b> (sobre coisa) e <b>ficta</b> (o silêncio não vale). Requisitos <b>intrínsecos</b>: verossimilhança, clareza, persistência e coincidência com as demais provas; <b>extrínsecos</b>: capacidade do confitente, liberdade, procedimento adequado."]},
    { h:"Delação premiada", p:[
      "A confissão do colaborador não se confunde com a colaboração premiada (Lei 12.850/2013), que exige acordo, homologação judicial e <b>corroboração</b> por outros elementos. Declarações do delator <b>sozinhas</b> não bastam para condenar o delatado."]},
    { h:"Ofendido (art. 201)", p:[
      "O ofendido é <b>qualificado</b>, perguntado sobre as circunstâncias da infração, o autor e as provas que possa indicar. <b>Sem compromisso</b> de dizer a verdade; sem tipicidade de falso testemunho. Se estiver acompanhado de assistente de acusação, este não se confunde com ele.",
      "Direitos (art. 201, §§ 2º a 6º): ser comunicado dos atos processuais (ingresso e saída do acusado da prisão, designação de audiência, sentença e acórdãos), espaço separado antes do início da audiência, encaminhamento a atendimento multidisciplinar, preservação da intimidade e da vida privada. Nos crimes contra a dignidade sexual, a Lei 14.245/2021 (arts. 400-A e 474-A) veda perguntas ofensivas e a utilização de material estranho aos fatos. O depoimento de criança ou adolescente observa a <b>Lei 13.431/2017</b> (depoimento especial, para evitar revitimização).",
      "Silêncio do ofendido: controvertido — como não é testemunha, não há dever de depor, mas pode ser conduzido para esclarecimento (art. 201, § 1º)."]}],
  pegadinhas:["Confissão <b>não</b> é rainha das provas: vale conforme o confronto com as demais.",
    "Ofendido <b>não presta compromisso</b>; mentira dele pode ser denunciação caluniosa, não falso testemunho.",
    "A confissão extrajudicial <b>sem</b> documentação oficial não é prova direta."] },

{ id:"testemunha", titulo:"Prova testemunhal (arts. 202 a 225)", curto:"Testemunha",
  rapido:["<b>Toda pessoa pode ser testemunha</b> (art. 202). Quem depõe presta compromisso de dizer a verdade, sob pena de <b>falso testemunho</b> (CP, art. 342).",
    "Limite de testemunhas: <b>8</b> no rito ordinário e <b>5</b> no sumário, <b>por fato</b> e <b>por réu</b>; no sumaríssimo, 3. Testemunhas que <b>nada acrescentam</b> (meramente abonatórias, por exemplo) e as <b>referidas</b> não entram no número em certas hipóteses.",
    "Recusa permitida (art. 206): ascendente, descendente, afim em linha reta, cônjuge, irmão, pai, mãe e filho adotivo do acusado, <b>salvo</b> se for impossível obter a prova de outro modo. <b>Proibidos de depor</b> (art. 207): quem deve guardar segredo por função, ministério, ofício ou profissão — salvo desobrigação pela parte interessada.",
    "Sem compromisso (art. 208): doentes e deficientes mentais, menores de 14 anos e as pessoas do art. 206 — são <b>informantes</b>."],
  teoria:[
    { h:"Classificações", p:[
      "<b>Direta</b> (viu ou ouviu) × <b>indireta</b> (soube por terceiro, «de ouvir dizer»). <b>Própria</b> (depõe sobre o fato) × <b>imprópria</b> (instrumentária: presenciou a lavratura de um ato). <b>Referida</b>: mencionada em outro depoimento, ouvida por iniciativa do juiz. <b>Judicial</b> × <b>extrajudicial</b>. <b>Compromissada</b> × <b>informante</b>."]},
    { h:"Procedimento da inquirição", p:[
      "As testemunhas são ouvidas <b>separadamente</b> e uma não pode ouvir a outra (art. 210). Respondem <b>oralmente</b>, sem ler (podem consultar apontamentos breves). O juiz impede que opine pessoalmente, salvo quando inseparável da narrativa (art. 213).",
      "<b>Sistema direto (cross-examination)</b> (art. 212): as partes perguntam diretamente, sem intermédio do juiz, que só <b>complementa</b> os pontos não esclarecidos. Perguntas indutivas, estranhas à causa ou repetidas são indeferidas. A inversão da ordem (juiz pergunta primeiro) gera nulidade <b>relativa</b>.",
      "Contradita: a parte pode impugnar a testemunha antes do compromisso (art. 214) se houver causa de suspeição ou impedimento."]},
    { h:"Pontos especiais", p:[
      "<b>Falso testemunho</b>: se o juiz percebe, remete cópia ao MP; a condução do crime pode aguardar o fim do processo principal (art. 211).",
      "<b>Retirada do réu</b> (art. 217): se a presença causar humilhação, temor ou constrangimento à testemunha ou ao ofendido, o depoimento é por <b>videoconferência</b>; só na impossibilidade o réu é retirado, com defensor presente.",
      "<b>Condução coercitiva</b> da testemunha faltosa e multa (arts. 218 e 219). <b>Prerrogativa de data e local</b> (arts. 220 e 221): chefes de poderes etc. são ouvidos em dia, hora e local ajustados; o STF decidiu que essa prerrogativa se perde após 30 dias sem acordo (Questão de Ordem na AP 421 — <b>atenção</b>, confira).",
      "<b>Precatória</b> (art. 222): a intimação da expedição é exigida, mas a falta de intimação do ato deprecado é nulidade <b>relativa</b> (Súmula 155 do STF). Rogatória no exterior: art. 222-A. <b>Antecipação</b> de testemunha em risco: art. 225.",
      "Policiais podem depor, e seu depoimento é válido quando coerente com os demais elementos."]}],
  pegadinhas:["Testemunha <b>indireta</b> (de ouvir dizer) tem valor reduzido, e não serve para pronúncia sozinha.",
    "Cônjuge, ascendente etc. <b>podem recusar-se</b> a depor, mas <b>não</b> se sujeitam a compromisso.",
    "Número de testemunhas: <b>8</b> (ordinário), <b>5</b> (sumário), por fato e por réu."] },

{ id:"reconhecimento", titulo:"Reconhecimento e acareação (arts. 226 a 230)", curto:"Reconhecimento",
  rapido:["O rito do <b>art. 226</b> é obrigatório e protege contra falso reconhecimento. Passos: <b>descrição</b> prévia, colocação do suspeito entre pessoas <b>semelhantes</b>, possibilidade de proteção da testemunha e <b>auto pormenorizado</b> com duas testemunhas.",
    "O STJ firmou (Tema 1.258, 2025 — <b>atenção</b>) que o rito é <b>exigência</b>, que o reconhecimento por fotografia é só etapa <b>antecedente</b>, que o ato é <b>irrepetível</b>, e que o reconhecimento não pode ser a <b>única prova</b>.",
    "<b>Acareação</b> (art. 229): colocar frente a frente pessoas que divergiram sobre fato relevante — acusados, testemunhas, ofendidos, entre si; peritos não, em regra."],
  teoria:[
    { h:"Reconhecimento de pessoas", p:[
      "<b>1) Descrição</b>: quem vai reconhecer descreve a pessoa. <b>2) Alinhamento</b>: ela é colocada ao lado de outras, com semelhança, para ser apontada. <b>3) Proteção</b>: se houver risco de intimidação, a autoridade providencia para que o reconhecedor não veja o reconhecido (esta etapa não se aplica na instrução nem no plenário). <b>4) Auto</b>: pormenorizado, assinado pela autoridade, pelo reconhecedor e por duas testemunhas presenciais.",
      "Reconhecimento de <b>coisas</b> segue as mesmas regras, com as adaptações cabíveis (art. 227). Há ainda reconhecimento <b>fonográfico</b> (por voz), submetido a critérios técnicos."]},
    { h:"Vícios mais cobrados", p:[
      "Reconhecimento feito <b>só por fotografia</b> ou por mostra individual («show-up») é frágil. Descumprido o art. 226, a prova é tida como inválida e não pode fundamentar condenação sozinha. Quando o reconhecido já é <b>conhecido</b> da vítima, o rito pode ser dispensado (Tema 1.258 — <b>atenção</b>)."]},
    { h:"Acareação", p:[
      "Cabe entre <b>acusados</b>, entre <b>acusado e testemunha</b>, entre <b>testemunhas</b>, entre acusado/testemunha e <b>ofendido</b> e entre <b>ofendidos</b> (art. 229). Se uma das pessoas estiver em outra comarca, expede-se precatória (art. 230). Na prática é pouco usada, sem direito subjetivo a ela quando já há contradição dissipada por outros meios."]}],
  pegadinhas:["O art. 226 não é «mera recomendação» para o STJ: <b>é obrigatório</b>.",
    "Proteção do reconhecedor (III do art. 226) <b>não vale</b> na instrução e no plenário.",
    "Reconhecimento fotográfico é <b>etapa preliminar</b>, nunca a prova isolada."] }
],
lei:[
{ art:"CPP, arts. 185 a 187", nome:"Interrogatório", sec:"interrogatorio", itens:[
  { id:"cpp185", rot:"Art. 185",
    t:"O acusado que comparecer perante a autoridade judiciária, no curso do processo penal, será <b class='g1'>qualificado e interrogado na presença de seu defensor</b>, constituído ou nomeado.",
    nota:"Ver §§ 1º a 10 sobre videoconferência e sala reservada; confira a redação.", c:["po1","po2"] },
  { id:"cpp186", rot:"Art. 186",
    t:"Depois de devidamente qualificado e cientificado do inteiro teor da acusação, o acusado será informado pelo juiz, antes de iniciar o interrogatório, do seu <b class='g1'>direito de permanecer calado</b> e de não responder perguntas que lhe forem formuladas. Parágrafo único. O silêncio, que <b class='g3'>não importará em confissão</b>, não poderá ser interpretado em prejuízo da defesa.",
    c:["po3"] },
  { id:"cpp187", rot:"Art. 187",
    t:"O interrogatório será constituído de <b class='g2'>duas partes</b>: sobre a <b class='g1'>pessoa do acusado</b> e sobre os <b class='g1'>fatos</b>." }]},
{ art:"CPP, arts. 197 a 201", nome:"Confissão e ofendido", sec:"confissao", itens:[
  { id:"cpp197", rot:"Art. 197",
    t:"O valor da confissão se aferirá pelos critérios adotados para os outros elementos de prova, e para a sua apreciação o juiz deverá <b class='g1'>confrontá-la com as demais provas</b> do processo, verificando se entre ela e estas existe <b class='g1'>compatibilidade ou concordância</b>.",
    c:["po4"] },
  { id:"cpp200", rot:"Art. 200",
    t:"A confissão será <b class='g1'>divisível e retratável</b>, sem prejuízo do livre convencimento do juiz, fundado no exame das provas em conjunto." },
  { id:"cpp201", rot:"Art. 201",
    t:"Sempre que possível, o <b class='g1'>ofendido</b> será qualificado e perguntado sobre as circunstâncias da infração, quem seja ou presuma ser o seu autor, as provas que possa indicar, tomando-se por termo as suas declarações.",
    nota:"Os §§ 1º a 6º tratam de condução, comunicação dos atos, espaço separado e atendimento; confira.", c:["po5"] }]},
{ art:"CPP, arts. 202 a 214", nome:"Testemunhas", sec:"testemunha", itens:[
  { id:"cpp202", rot:"Art. 202",
    t:"<b class='g1'>Toda pessoa</b> poderá ser testemunha." },
  { id:"cpp206", rot:"Art. 206",
    t:"A testemunha não poderá eximir-se da obrigação de depor. Poderão, entretanto, <b class='g1'>recusar-se</b> a fazê-lo o ascendente ou descendente, o afim em linha reta, o cônjuge, ainda que desquitado, o irmão e o pai, a mãe, ou o filho adotivo do acusado, <b class='g3'>salvo quando não for possível, por outro modo, obter-se ou integrar-se a prova</b> do fato e de suas circunstâncias.",
    c:["po6"] },
  { id:"cpp207", rot:"Art. 207",
    t:"São <b class='g1'>proibidas de depor</b> as pessoas que, em razão de função, ministério, ofício ou profissão, devam guardar segredo, <b class='g3'>salvo se, desobrigadas pela parte interessada</b>, quiserem dar o seu testemunho.",
    c:["po7"] },
  { id:"cpp208", rot:"Art. 208",
    t:"Não se deferirá o <b class='g1'>compromisso</b> a que alude o art. 203 aos <b class='g3'>doentes e deficientes mentais e aos menores de 14 anos</b>, nem às pessoas a que se refere o art. 206." },
  { id:"cpp212", rot:"Art. 212",
    t:"As perguntas serão formuladas <b class='g1'>pelas partes diretamente à testemunha</b>, não admitindo o juiz aquelas que puderem <b class='g3'>induzir a resposta</b>, não tiverem relação com a causa ou importarem na repetição de outra já respondida. Parágrafo único. Sobre os pontos não esclarecidos, o juiz poderá <b class='g1'>complementar</b> a inquirição.",
    c:["po8"] }]},
{ art:"CPP, arts. 226 e 229", nome:"Reconhecimento e acareação", sec:"reconhecimento", itens:[
  { id:"cpp226", rot:"Art. 226",
    t:"Quando houver necessidade de fazer-se o reconhecimento de pessoa, proceder-se-á pela seguinte forma: I – a pessoa que tiver de fazer o reconhecimento será convidada a <b class='g1'>descrever</b> a pessoa que deva ser reconhecida; II – a pessoa, cuja identificação se quer, será colocada, se possível, <b class='g1'>ao lado de outras que com ela tiverem qualquer semelhança</b>, convidando-se quem tiver de fazer a identificação a apontá-la; III – se houver razão para recear [...] intimidação ou outra influência, a autoridade providenciará para que esta <b class='g3'>não veja aquela</b>; IV – do ato de reconhecimento lavrar-se-á <b class='g1'>auto pormenorizado</b>, subscrito pela autoridade, pela pessoa chamada para proceder ao reconhecimento e por <b class='g2'>duas testemunhas</b> presenciais. Parágrafo único. O disposto no nº III <b class='g3'>não terá aplicação na fase da instrução criminal ou em plenário</b> de julgamento.",
    c:["po9","po10"], j:["stj-t1258"] },
  { id:"cpp229", rot:"Art. 229",
    t:"A <b class='g1'>acareação</b> será admitida entre acusados, entre acusado e testemunha, entre testemunhas, entre acusado ou testemunha e a pessoa ofendida, e entre as pessoas ofendidas, sempre que <b class='g3'>divergirem, em suas declarações, sobre fatos ou circunstâncias relevantes</b>.",
    c:["po11"] }]}
],
juris:[
{ id:"stf-adpf395", trib:"STF", tipo:"ADPF", num:"ADPF 395 e 444", sec:"interrogatorio", status:"vigente", data:"14/06/2018",
  titulo:"Condução coercitiva para interrogatório",
  texto:"A condução coercitiva de investigado ou de réu para interrogatório viola a presunção de inocência e o direito à não autoincriminação; a expressão «para o interrogatório» do art. 260 do CPP não foi recepcionada.",
  explica:"Redação resumida, confira o acórdão. A condução de testemunha (art. 218) é outra coisa e permanece válida.", lei:["cpp185"], fonte:STFJ },
{ id:"stj-t1114", trib:"STJ", tipo:"Tema repetitivo", num:"Tema 1.114 (confira)", sec:"interrogatorio", status:"atencao", data:"confira",
  titulo:"Interrogatório como último ato da instrução",
  texto:"Segundo o material de estudo: a inversão da ordem (interrogatório antes das testemunhas) gera nulidade relativa, com demonstração de prejuízo.",
  explica:"O STF fixou que o interrogatório é o último ato; o STJ trata o desrespeito como nulidade relativa. Número do tema a confirmar.", lei:["cpp185"], fonte:STJJ },
{ id:"stj-t1258", trib:"STJ", tipo:"Tema repetitivo", num:"Tema 1.258 (jun/2025)", sec:"reconhecimento", status:"atencao", data:"06/2025 (confira)",
  titulo:"Reconhecimento de pessoas: rito do art. 226",
  texto:"Segundo o material de estudo: o rito do art. 226 é obrigatório; o reconhecimento fotográfico só vale como etapa antecedente; o ato é irrepetível; o reconhecimento deve ser corroborado por outros elementos; é dispensável quando o reconhecido já era conhecido.",
  explica:"Tese trazida do material de estudo, não reconferida na fonte oficial. Antes dela, as decisões do STJ já exigiam o art. 226 (HC 598.886).", lei:["cpp226"], fonte:STJJ },
{ id:"stf-s155", trib:"STF", tipo:"Súmula", num:"Súmula 155", sec:"testemunha", status:"vigente", data:"13/12/1963",
  titulo:"Carta precatória: falta de intimação",
  texto:"É relativa a nulidade do processo criminal por falta de intimação da expedição de precatória para inquirição de testemunha.",
  explica:"A parte tem de ser intimada da expedição, não da data da audiência no juízo deprecado (Súmula 273 do STJ); a falta gera nulidade relativa.", lei:[], fonte:STFJ }
],
cards:[
{ id:"po1", tipo:"ce", sec:"interrogatorio", f:"(C/E) O réu que exerce o direito ao silêncio pode recusar-se também a prestar sua qualificação.",
  v:"<b>Errado.</b> O silêncio abrange as perguntas sobre os fatos; a <b>qualificação</b> deve ser prestada com verdade.", lei:["cpp185","cpp186"] },
{ id:"po2", tipo:"caso", sec:"interrogatorio", f:"Réu preso é interrogado sem ter conversado antes, em particular, com o defensor dativo. Há nulidade?",
  v:"Em regra, <b>nulidade relativa</b>: depende de prejuízo demonstrado. O direito à entrevista reservada é garantia da ampla defesa.", lei:["cpp185"] },
{ id:"po3", tipo:"lacuna", sec:"interrogatorio", f:"O silêncio, que não importará em ___, não poderá ser interpretado em prejuízo da defesa.",
  v:"<b>confissão</b> (art. 186, parágrafo único).", lei:["cpp186"] },
{ id:"po4", tipo:"ce", sec:"confissao", f:"(C/E) A confissão do réu, por ser a rainha das provas, dispensa confronto com os demais elementos.",
  v:"<b>Errado.</b> Art. 197: a confissão é valorada como as demais provas e confrontada com elas.", lei:["cpp197"] },
{ id:"po5", tipo:"distincao", sec:"confissao", f:"Ofendido × testemunha: compromisso e falso testemunho.",
  v:"Ofendido <b>não presta compromisso</b> e não responde por falso testemunho (cabe denunciação caluniosa). Testemunha presta compromisso e responde pelo art. 342 do CP.", lei:["cpp201"] },
{ id:"po6", tipo:"caso", sec:"testemunha", f:"O irmão do acusado é a única pessoa que presenciou o crime. Pode recusar-se a depor?",
  v:"A regra é que <b>pode recusar-se</b> (art. 206), <b>salvo</b> quando não for possível obter ou integrar a prova de outro modo — nesse caso depõe, sem compromisso (art. 208).", lei:["cpp206","cpp208"] },
{ id:"po7", tipo:"caso", sec:"testemunha", f:"O advogado do acusado é intimado como testemunha sobre o que ouviu do cliente. Deve depor?",
  v:"<b>Não.</b> É proibido de depor sobre segredo profissional (art. 207), salvo se desobrigado pela parte interessada e quiser depor.", lei:["cpp207"] },
{ id:"po8", tipo:"distincao", sec:"testemunha", f:"Sistema presidencialista × sistema direto (cross-examination).",
  v:"<b>Presidencialista</b>: perguntas passam pelo juiz. <b>Direto</b> (art. 212): partes perguntam diretamente à testemunha; o juiz apenas complementa.", lei:["cpp212"] },
{ id:"po9", tipo:"caso", sec:"reconhecimento", f:"A vítima, na delegacia, é exposta a uma única fotografia e aponta o suspeito. A prova é suficiente para condenar?",
  v:"<b>Não.</b> Violação do art. 226. Fotografia só serve como etapa antecedente, e o reconhecimento exige corroboração (Tema 1.258 do STJ — atenção).", lei:["cpp226"], j:["stj-t1258"] },
{ id:"po10", tipo:"numero", sec:"reconhecimento", f:"Quantas testemunhas assinam o auto de reconhecimento de pessoa?",
  v:"<b>Duas</b> testemunhas presenciais, além da autoridade e de quem reconheceu (art. 226, IV).", lei:["cpp226"] },
{ id:"po11", tipo:"distincao", sec:"reconhecimento", f:"Quando cabe acareação?",
  v:"Entre acusados, testemunhas, ofendidos (e combinações entre eles) quando <b>divergirem sobre fatos relevantes</b> (art. 229).", lei:["cpp229"] },
{ id:"po12", tipo:"numero", sec:"testemunha", f:"Limite de testemunhas no rito ordinário e sumário.",
  v:"<b>8</b> no ordinário e <b>5</b> no sumário, por fato e por réu.", lei:[] },
{ id:"po13", tipo:"juris", sec:"interrogatorio", f:"ADPF 395 e 444: o que o STF decidiu sobre condução coercitiva?",
  v:"Não foi recepcionada a condução coercitiva do investigado/réu para interrogatório.", lei:["cpp185"], j:["stf-adpf395"] },
{ id:"po14", tipo:"juris", sec:"testemunha", f:"Súmula 155 do STF: nulidade por falta de intimação da expedição da precatória?",
  v:"É <b>relativa</b>: depende de prejuízo e de arguição oportuna.", lei:[], j:["stf-s155"] },
{ id:"po15", tipo:"caso", sec:"confissao", f:"O réu confessa o fato mas alega legítima defesa. Aplica-se a atenuante da confissão?",
  v:"Sim, a jurisprudência admite a atenuante mesmo na confissão <b>qualificada</b>, geralmente em fração menor, desde que a confissão tenha servido de base para a condenação.", lei:["cpp200"] }
],
importancia:{ nivel:5,
  texto:"Interrogatório, confissão, ofendido, testemunha e reconhecimento são cobrados em detalhes: direito ao silêncio, limites do número de testemunhas, ordem das perguntas (art. 212) e o rito obrigatório do art. 226.",
  decore:[
    ["Interrogatório","natureza <b>mista</b>, com predomínio de <b>meio de defesa</b>; silêncio não abrange a <b>qualificação</b>"],
    ["Condução coercitiva para interrogatório","<b>não recepcionada</b> (ADPF 395 e 444)"],
    ["Valor da confissão (art. 197)","<b>relativo</b>; divisível e retratável"],
    ["Confissão espontânea","<b>atenuante</b> (CP, art. 65, III, d), mesmo a qualificada"],
    ["Ofendido","<b>sem compromisso</b>; mentira dele pode ser denunciação caluniosa, não falso testemunho"],
    ["Número de testemunhas","<b>8</b> (ordinário), <b>5</b> (sumário), <b>3</b> (sumaríssimo), por fato"],
    ["Recusa de depor (art. 206)","ascendente, descendente, cônjuge, irmão, etc.; ouvidos, não prestam compromisso (art. 208)"],
    ["Inquirição (art. 212)","<b>sistema direto</b>: as partes perguntam; o juiz complementa"],
    ["Reconhecimento (art. 226)","rito <b>obrigatório</b>: descrição, alinhamento, auto com duas testemunhas"],
    ["Súmula 155 do STF","falta de intimação do ato deprecado: nulidade <b>relativa</b>"]],
  macetes:[
    ["Silêncio não cobre qualificação","O réu pode calar quanto aos fatos, mas deve se identificar."],
    ["Ofendido não jura","Sem compromisso: não responde por falso testemunho."],
    ["Fotografia é só o começo","Reconhecimento fotográfico é etapa preliminar, nunca a prova isolada."]] },
comparativo:{ titulo:"Confissão × declarações do ofendido × testemunha", head:["Confissão e ofendido","Testemunha"], rows:[
  ["<b>Compromisso:</b> o acusado e o ofendido não prestam compromisso de dizer a verdade","<b>Compromisso:</b> presta, sob pena de falso testemunho (CP, art. 342)"],
  ["<b>Valor:</b> confissão é relativa, confrontada com as demais provas","<b>Valor:</b> depende da coerência com as demais provas; a indireta (de ouvir dizer) vale menos"],
  ["<b>Crime em caso de mentira:</b> do ofendido, denunciação caluniosa; o acusado não responde","<b>Crime em caso de mentira:</b> falso testemunho"],
  ["<b>Confissão extrajudicial:</b> só orienta outras provas, se documentada em estabelecimento oficial","<b>Recusa:</b> parentes próximos podem recusar-se (art. 206); informantes não juram (art. 208)"],
  ["<b>Delação:</b> exige acordo, homologação e corroboração; sozinha não condena o delatado","<b>Perguntas:</b> sistema direto (art. 212), as partes perguntam e o juiz complementa"]]},
prova:[
  { tipo:"ce", enun:"O silêncio do acusado no interrogatório não importa confissão e não pode ser interpretado em prejuízo da defesa, mas não alcança a qualificação.", gab:"Certo", com:"Art. 186: o silêncio não abrange a qualificação, e não é confissão." },
  { tipo:"ce", enun:"A condução coercitiva do investigado para interrogatório foi considerada não recepcionada pelo STF.", gab:"Certo", com:"ADPF 395 e 444." },
  { tipo:"ce", enun:"A confissão é a rainha das provas e dispensa confronto com os demais elementos dos autos.", gab:"Errado", com:"Art. 197: a confissão tem valor relativo e é confrontada com as demais provas." },
  { tipo:"ce", enun:"O ofendido que mente em juízo comete falso testemunho, pois presta compromisso como as testemunhas.", gab:"Errado", com:"O ofendido não presta compromisso e não responde por falso testemunho; pode haver denunciação caluniosa." },
  { tipo:"ce", enun:"O rito de reconhecimento previsto no art. 226 do CPP é mera recomendação, de observância facultativa.", gab:"Errado", com:"O rito é obrigatório; o reconhecimento por fotografia é apenas etapa preliminar." },
  { tipo:"caso", enun:"No rito ordinário, a defesa arrola 10 testemunhas para um único fato. Qual o limite?", com:"O limite é de 8 testemunhas por fato e por réu no rito ordinário (5 no sumário), observadas as hipóteses em que certas testemunhas não entram na conta." }],
resumo:[
  "Interrogatório é meio de defesa de natureza mista; o réu tem direito ao silêncio, que não abrange a qualificação.",
  "Condução coercitiva para interrogatório foi considerada não recepcionada (ADPF 395 e 444).",
  "Confissão tem valor relativo, é divisível e retratável; a espontânea é atenuante, mesmo a qualificada.",
  "Confissão extrajudicial só vale se documentada em estabelecimento oficial e orienta a busca de outras provas.",
  "O ofendido não presta compromisso e suas declarações têm especial relevância nos crimes clandestinos.",
  "Testemunhas: 8 no ordinário, 5 no sumário, por fato; parentes podem recusar-se; informantes não prestam compromisso.",
  "Inquirição no sistema direto (art. 212): as partes perguntam; o juiz apenas complementa.",
  "Reconhecimento exige o rito do art. 226; acareação coloca frente a frente quem divergiu sobre fato relevante."],
checklist:[
  "Explicar a natureza do interrogatório e o direito ao silêncio",
  "Citar a ADPF 395 e 444 sobre condução coercitiva",
  "Distinguir confissão simples, qualificada e extrajudicial",
  "Explicar o valor das declarações do ofendido",
  "Dizer o limite de testemunhas por rito",
  "Aplicar as hipóteses de recusa e de informante (arts. 206 a 208)",
  "Descrever o sistema direto de perguntas (art. 212)",
  "Descrever o rito do reconhecimento (art. 226) e a acareação"],
questoes:[]
};
})();
