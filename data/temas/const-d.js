/* Direito Constitucional (IV): Poder Executivo; Poder Judiciário; funções essenciais à Justiça; defesa do Estado e segurança pública.
   Conferido em 14/10/2026. Texto: CF/88 (Planalto), com EC 104/2019 (polícias penais), EC 111/2021 (posse em 5/1),
   EC 122/2022 (idade STF), EC 125/2022 (relevância no REsp), EC 134/2024 (eleição nos TJs) e EC 136/2025 (precatórios). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var STFSV = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26";
var STFRG = "https://portal.stf.jus.br/jurisprudenciaRepercussao/pesquisarProcesso.asp";
var CAM = "https://www.camara.leg.br/busca-portal/proposicoes/pesquisa-simplificada";

/* ======================= PODER EXECUTIVO ======================= */
T.executivo = {
meta:{ tema:"Poder Executivo (arts. 76 a 91)", atualizado:AT,
  foco:"Eleição, posse (5 de janeiro, EC 111/2021), vacância e linha sucessória; atribuições e delegação; decreto autônomo; crimes de responsabilidade e impeachment (ADPF 378); imunidades do Presidente (art. 86) e sua não extensão aos Governadores; Ministros; Conselhos da República e de Defesa." },
secoes:[
{ id:"mandato", titulo:"Eleição, posse, vacância e sucessão", curto:"Mandato",
  rapido:["Eleição: <b>maioria absoluta dos votos válidos</b> (excluídos brancos e nulos); sem ela, <b>2º turno</b> entre os dois mais votados no <b>último domingo de outubro</b>.",
    "Mandato de <b>4 anos</b>, com início em <b>5 de janeiro</b> do ano seguinte à eleição (EC 111/2021 — vale a partir da posse de 2027). Se em <b>10 dias</b> da data fixada o eleito não assumir, salvo força maior, o cargo é declarado vago.",
    "Substituição (impedimento) e sucessão (vaga): <b>Vice</b> sucede. Na falta de ambos, assumem <b>temporariamente</b>: Presidente da <b>Câmara</b>, do <b>Senado</b> e do <b>STF</b>.",
    "Dupla vacância: nos <b>2 primeiros anos</b>, eleição <b>direta</b> em <b>90 dias</b>; nos <b>2 últimos</b>, eleição <b>indireta pelo Congresso</b> em <b>30 dias</b> — os eleitos só completam o período (mandato-tampão)."],
  teoria:[
    { h:"Outros pontos", p:[
      "Presidente e Vice não podem se ausentar do País por <b>mais de 15 dias</b> sem licença do Congresso, sob pena de perda do cargo (art. 83).",
      "Ministros de Estado: brasileiros (natos ou naturalizados, salvo o da Defesa) <b>maiores de 21 anos</b>, no exercício dos direitos políticos; referendam os atos do Presidente.",
      "Conselho da República (art. 89) e Conselho de Defesa Nacional (art. 91): órgãos <b>consultivos</b>, ouvidos na intervenção federal, no estado de defesa e no de sítio."]}],
  pegadinhas:["Presidente da Câmara, do Senado e do STF <b>não sucedem</b>: apenas substituem temporariamente.","Dupla vacância no último biênio: eleição <b>indireta</b> em 30 dias."]},
{ id:"atribuicoes", titulo:"Atribuições e decreto autônomo", curto:"Atribuições",
  rapido:["O Presidente acumula chefia de <b>Estado</b> (relações internacionais, tratados, declarar guerra) e de <b>Governo</b> (direção da administração, iniciativa de leis, sanção e veto, decretos).",
    "<b>Decreto autônomo</b> (art. 84, VI): dispor sobre organização e funcionamento da administração federal, <b>sem aumento de despesa nem criação ou extinção de órgãos</b>; e <b>extinguir funções ou cargos vagos</b>.",
    "<b>Delegáveis</b> a Ministros, ao PGR ou ao AGU (parágrafo único): VI (decreto autônomo), XII (<b>indulto e comutação</b> de penas) e XXV, primeira parte (<b>prover</b> cargos públicos federais).",
    "Indulto é ato discricionário do Presidente, mas sujeito a controle de constitucionalidade (ADI 5.874); não alcança crimes hediondos e equiparados (art. 5º, XLIII)."],
  teoria:[
    { h:"Provimento × extinção", p:[
      "Prover cargos (XXV, 1ª parte) é delegável; <b>extinguir</b> cargos <b>vagos</b> se faz por decreto autônomo (VI, b) — também delegável. Extinguir cargo <b>ocupado</b> exige lei.",
      "Desprover (exonerar/demitir) também pode ser delegado, segundo o STF, como corolário do poder de prover."]}],
  pegadinhas:["Decreto autônomo não pode <b>criar</b> órgão nem aumentar despesa.","Indulto é delegável; vetar não é."]},
{ id:"responsabilidade", titulo:"Crimes de responsabilidade e imunidades", curto:"Responsabilidade",
  rapido:["Admissão da acusação por <b>2/3 da Câmara</b>. Julgamento: crimes <b>comuns</b> → <b>STF</b>; crimes de <b>responsabilidade</b> → <b>Senado</b> (presidido pelo Presidente do STF; condenação por 2/3).",
    "Suspensão das funções: comuns → quando o STF <b>recebe a denúncia ou queixa</b>; responsabilidade → com a <b>instauração do processo pelo Senado</b>. Se o julgamento não acabar em <b>180 dias</b>, cessa o afastamento.",
    "Condenação no Senado: <b>perda do cargo</b> com <b>inabilitação por 8 anos</b> para função pública (no caso Dilma, as penas foram votadas separadamente).",
    "Imunidades do Presidente: <b>não pode ser preso</b> nas infrações comuns enquanto não houver sentença condenatória; e, na vigência do mandato, <b>não responde por atos estranhos às funções</b> (irresponsabilidade relativa — o processo fica para depois)."],
  teoria:[
    { h:"Governadores", p:[
      "As imunidades do art. 86, §§3º e 4º, são <b>exclusivas do Presidente</b>: não se estendem a Governadores e Prefeitos.",
      "É inconstitucional exigir autorização da Assembleia Legislativa para o STJ processar o Governador por crime comum (ADIs 4.764, 4.797 e 4.798, 2017); o afastamento não é automático.",
      "Crimes de responsabilidade de Governador: definidos por lei federal (SV 46); julgamento por tribunal misto (Lei 1.079/1950)."]}],
  pegadinhas:["Câmara: <b>autoriza</b> (2/3). Senado: <b>processa e julga</b> (2/3).","Imunidade temporária por atos estranhos às funções <b>não</b> se aplica a Governador."]}
],
lei:[
{ art:"CF, arts. 77 a 82", nome:"Eleição, posse e sucessão", sec:"mandato", itens:[
  { id:"cf80", rot:"Arts. 80 a 82", t:"Art. 80. Em caso de impedimento do Presidente e do Vice-Presidente, ou vacância dos respectivos cargos, serão sucessivamente chamados ao exercício da Presidência o <b class='g1'>Presidente da Câmara dos Deputados, o do Senado Federal e o do Supremo Tribunal Federal</b>.<br>Art. 81. Vagando os cargos de Presidente e Vice-Presidente da República, far-se-á eleição <b class='g2'>noventa dias</b> depois de aberta a última vaga.<br>§ 1º Ocorrendo a vacância nos <b class='g3'>últimos dois anos</b> do período presidencial, a eleição para ambos os cargos será feita <b class='g2'>trinta dias</b> depois da última vaga, <b class='g1'>pelo Congresso Nacional</b>, na forma da lei.<br>§ 2º Em qualquer dos casos, os eleitos deverão apenas completar o período de seus antecessores.<br>Art. 82. O mandato do Presidente da República é de <b class='g2'>4 (quatro) anos</b> e terá início em <b class='g1'>5 de janeiro</b> do ano seguinte ao de sua eleição.", nota:"Art. 82 com redação da EC 111/2021.", c:["ex1","ex2","ex3"] }]},
{ art:"CF, art. 84", nome:"Atribuições", sec:"atribuicoes", itens:[
  { id:"cf84", rot:"Art. 84, VI, XII, XXV e parágrafo único", t:"Compete privativamente ao Presidente da República: (...)<br>VI - dispor, mediante <b class='g1'>decreto</b>, sobre: a) organização e funcionamento da administração federal, <b class='g3'>quando não implicar aumento de despesa nem criação ou extinção de órgãos públicos</b>; b) <b class='g1'>extinção de funções ou cargos públicos, quando vagos</b>;<br>(...)<br>XII - conceder <b class='g1'>indulto e comutar penas</b>, com audiência, se necessário, dos órgãos instituídos em lei;<br>(...)<br>XXV - <b class='g1'>prover</b> e extinguir os cargos públicos federais, na forma da lei;<br>(...)<br>Parágrafo único. O Presidente da República poderá <b class='g1'>delegar</b> as atribuições mencionadas nos incisos <b class='g1'>VI, XII e XXV, primeira parte</b>, aos <b class='g1'>Ministros de Estado, ao Procurador-Geral da República ou ao Advogado-Geral da União</b>, que observarão os limites traçados nas respectivas delegações.", c:["ex4","ex5","ex6"] }]},
{ art:"CF, art. 86", nome:"Processo contra o Presidente", sec:"responsabilidade", itens:[
  { id:"cf86", rot:"Art. 86", t:"Admitida a acusação contra o Presidente da República, por <b class='g2'>dois terços da Câmara dos Deputados</b>, será ele submetido a julgamento perante o <b class='g1'>Supremo Tribunal Federal, nas infrações penais comuns</b>, ou perante o <b class='g1'>Senado Federal, nos crimes de responsabilidade</b>.<br>§ 1º O Presidente ficará suspenso de suas funções: I - nas infrações penais comuns, se <b class='g1'>recebida a denúncia ou queixa-crime</b> pelo Supremo Tribunal Federal; II - nos crimes de responsabilidade, após a <b class='g1'>instauração do processo pelo Senado</b> Federal.<br>§ 2º Se, decorrido o prazo de <b class='g2'>cento e oitenta dias</b>, o julgamento não estiver concluído, cessará o afastamento do Presidente, sem prejuízo do regular prosseguimento do processo.<br>§ 3º Enquanto não sobrevier sentença condenatória, nas infrações comuns, o Presidente da República <b class='g3'>não estará sujeito a prisão</b>.<br>§ 4º O Presidente da República, na vigência de seu mandato, <b class='g3'>não pode ser responsabilizado por atos estranhos ao exercício de suas funções</b>.", c:["ex7","ex8","ex9","ex10"], j:["stf-adpf378"] }]}
],
juris:[
{ id:"stf-adpf378", trib:"STF", tipo:"ADPF", num:"ADPF 378", sec:"responsabilidade", status:"vigente", data:"17/12/2015",
  titulo:"Rito do impeachment",
  texto:"A Câmara apenas autoriza a instauração do processo; cabe ao Senado decidir se instaura ou não o processo, por maioria simples, e só a partir daí o Presidente é afastado; a comissão especial da Câmara deve ser eleita por voto aberto e com chapas indicadas pelos líderes.",
  explica:"O Senado <b>não</b> está vinculado à autorização da Câmara: pode rejeitar a instauração.", lei:["cf86"], fonte:STFJ }
],
cards:[
{ id:"ex1", tipo:"caso", sec:"mandato", f:"Presidente e Vice morrem no 3º ano do mandato. Como se preenchem os cargos?", v:"Eleição <b>indireta pelo Congresso</b> em <b>30 dias</b>; os eleitos completam o período.", lei:["cf80"] },
{ id:"ex2", tipo:"caso", sec:"mandato", f:"Presidente e Vice ficam impedidos ao mesmo tempo. Quem assume e em que ordem?", v:"Presidente da <b>Câmara</b>, depois do <b>Senado</b>, depois do <b>STF</b> — temporariamente.", lei:["cf80"] },
{ id:"ex3", tipo:"numero", sec:"mandato", f:"Data de início do mandato presidencial (EC 111/2021).", v:"<b>5 de janeiro</b> do ano seguinte à eleição (antes: 1º de janeiro).", lei:["cf80"] },
{ id:"ex4", tipo:"caso", sec:"atribuicoes", f:"Presidente, por decreto, cria um novo Ministério. Válido?", v:"<b>Não.</b> Decreto autônomo não cria nem extingue órgãos; exige <b>lei</b>.", lei:["cf84"] },
{ id:"ex5", tipo:"lacuna", sec:"atribuicoes", f:"Atribuições delegáveis: incisos ______, ______ e XXV (primeira parte), a Ministros, ao ______ e ao ______.", v:"<b>VI</b>; <b>XII</b>; <b>PGR</b>; <b>AGU</b>.", lei:["cf84"] },
{ id:"ex6", tipo:"caso", sec:"atribuicoes", f:"Presidente delega ao Ministro da Justiça a concessão de indulto. Pode?", v:"<b>Sim</b> (art. 84, XII, c/c parágrafo único).", lei:["cf84"] },
{ id:"ex7", tipo:"caso", sec:"responsabilidade", f:"Quando o Presidente é afastado em processo por crime comum?", v:"Quando o <b>STF recebe a denúncia ou queixa</b> (após autorização de 2/3 da Câmara).", lei:["cf86"] },
{ id:"ex8", tipo:"caso", sec:"responsabilidade", f:"Presidente comete lesão corporal numa briga de trânsito, sem relação com a função. Pode ser processado durante o mandato?", v:"<b>Não</b> durante o mandato — ato estranho às funções (§4º); responderá depois.", lei:["cf86"] },
{ id:"ex9", tipo:"caso", sec:"responsabilidade", f:"Governador comete crime comum. Precisa de autorização da Assembleia para o STJ processá-lo?", v:"<b>Não</b> (STF, 2017); as imunidades do art. 86 não se estendem aos Governadores.", lei:["cf86"] },
{ id:"ex10", tipo:"numero", sec:"responsabilidade", f:"Prazo máximo de afastamento sem julgamento.", v:"<b>180 dias</b>; depois, o Presidente reassume e o processo continua.", lei:["cf86"], j:["stf-adpf378"] }
],
importancia:{ nivel:4,
  texto:"Sucessão, vacância e o rito do impeachment aparecem sempre em prova de Constitucional. A banca troca prazos (90 e 30 dias), quóruns (2/3) e o órgão que julga cada tipo de crime.",
  decore:[
    ["Mandato do Presidente","<b>4 anos</b>, início em <b>5 de janeiro</b> (EC 111/2021)"],
    ["Eleição","maioria absoluta dos votos válidos; 2º turno no <b>último domingo de outubro</b>"],
    ["Linha de substituição","Vice, depois Presidente da <b>Câmara</b>, do <b>Senado</b> e do <b>STF</b>"],
    ["Dupla vacância nos 2 primeiros anos","eleição <b>direta</b> em <b>90 dias</b>"],
    ["Dupla vacância nos 2 últimos anos","eleição <b>indireta</b> pelo Congresso em <b>30 dias</b>"],
    ["Admissão da acusação","<b>2/3</b> da Câmara dos Deputados"],
    ["Afastamento sem julgamento","cessa após <b>180 dias</b>"],
    ["Condenação por crime de responsabilidade","perda do cargo com inabilitação por <b>8 anos</b>"],
    ["Ausência do País","mais de <b>15 dias</b> exige licença do Congresso"],
    ["Delegáveis (art. 84, p. ú.)","incisos <b>VI, XII e XXV</b> (1ª parte)"]],
  macetes:[
    ["Substitui é temporário, sucede é definitivo","O Vice sucede. Os presidentes da Câmara, do Senado e do STF só substituem, de forma temporária, até a nova eleição."],
    ["Primeiro biênio é direta, segundo é indireta","Primeiros 2 anos: voto popular em 90 dias. Últimos 2 anos: Congresso em 30 dias. Em ambos os casos, mandato-tampão."],
    ["Câmara autoriza, Senado julga","Nos crimes de responsabilidade, a Câmara só admite a acusação (2/3). Quem instaura e julga é o Senado, presidido pelo Presidente do STF."],
    ["Delegáveis: VI, XII, XXV","Decreto autônomo, indulto e prover cargos. Vetar, sancionar e declarar guerra não se delegam."]] },
comparativo:{ titulo:"Crime comum × crime de responsabilidade (Presidente)", head:["Infração penal comum","Crime de responsabilidade"], rows:[
  ["<b>Quem julga:</b> o STF","<b>Quem julga:</b> o Senado Federal"],
  ["<b>Admissão da acusação:</b> 2/3 da Câmara","<b>Admissão da acusação:</b> 2/3 da Câmara"],
  ["<b>Afastamento:</b> quando o STF recebe a denúncia ou queixa","<b>Afastamento:</b> com a instauração do processo pelo Senado"],
  ["<b>Limite do afastamento:</b> 180 dias sem julgamento","<b>Limite do afastamento:</b> 180 dias sem julgamento"],
  ["<b>Consequência:</b> sanção penal, após sentença condenatória","<b>Consequência:</b> perda do cargo e inabilitação por 8 anos para função pública"],
  ["<b>Prisão:</b> não cabe enquanto não houver sentença condenatória (art. 86, § 3º)","<b>Prisão:</b> o § 3º só trata de infrações comuns; a sanção aqui é política"]]},
prova:[
  { tipo:"ce", enun:"Vagando os cargos de Presidente e Vice-Presidente no terceiro ano do mandato, a eleição será indireta, feita pelo Congresso Nacional em trinta dias, e os eleitos apenas completarão o período dos antecessores.", gab:"Certo", com:"Nos dois últimos anos do período a eleição é indireta, em 30 dias, e o mandato é de complementação (art. 81, §§ 1º e 2º)." },
  { tipo:"ce", enun:"O Presidente da Câmara dos Deputados, quando chamado ao exercício da Presidência por impedimento do Presidente e do Vice, sucede definitivamente o titular.", gab:"Errado", com:"Os presidentes da Câmara, do Senado e do STF apenas substituem, de forma temporária. Quem sucede é o Vice." },
  { tipo:"ce", enun:"Em crime de responsabilidade, a admissão da acusação contra o Presidente da República exige dois terços da Câmara dos Deputados e o julgamento cabe ao Senado Federal.", gab:"Certo", com:"Art. 86, caput. Nas infrações penais comuns o julgamento é do STF." },
  { tipo:"ce", enun:"Por decreto autônomo, o Presidente da República pode criar órgão público, desde que não haja aumento de despesa.", gab:"Errado", com:"O decreto autônomo não pode implicar aumento de despesa nem criação ou extinção de órgãos. Criar órgão exige lei." },
  { tipo:"caso", enun:"O Presidente da República, durante o mandato, é acusado de lesão corporal em uma briga de trânsito sem qualquer relação com o cargo. É possível processá-lo agora?", com:"Não durante o mandato. Pelo art. 86, § 4º, ele não pode ser responsabilizado por atos estranhos ao exercício das funções, e o processo fica para depois. Essa imunidade não se estende a Governadores." },
  { tipo:"caso", enun:"O Presidente delega ao Ministro da Justiça a concessão de indulto. A delegação é válida? E se delegasse o veto a um projeto de lei?", com:"O indulto (art. 84, XII) é delegável a Ministros, ao PGR ou ao AGU. O veto não consta do rol de delegáveis (VI, XII e XXV, 1ª parte), então não pode ser delegado." }],
resumo:[
  "O Presidente é eleito por <b>maioria absoluta dos votos válidos</b>, para mandato de <b>4 anos</b> iniciado em <b>5 de janeiro</b> (EC 111/2021).",
  "O <b>Vice sucede</b>. Na falta de ambos, <b>substituem temporariamente</b> os presidentes da Câmara, do Senado e do STF.",
  "Dupla vacância: nos <b>2 primeiros anos</b>, eleição direta em <b>90 dias</b>; nos <b>2 últimos</b>, eleição indireta pelo Congresso em <b>30 dias</b>. Os eleitos só completam o período.",
  "Decreto autônomo (art. 84, VI): organização da administração <b>sem aumento de despesa e sem criar ou extinguir órgãos</b>, e extinção de cargos ou funções <b>vagos</b>.",
  "São delegáveis a Ministros, ao PGR ou ao AGU os incisos <b>VI, XII (indulto) e XXV, 1ª parte (prover cargos)</b>.",
  "A Câmara admite a acusação por <b>2/3</b>. O STF julga os crimes comuns e o <b>Senado</b> julga os de responsabilidade. O Senado não está vinculado à Câmara (ADPF 378).",
  "O afastamento ocorre quando o STF recebe a denúncia ou quando o Senado instaura o processo, e cessa após <b>180 dias</b>.",
  "O Presidente não está sujeito a prisão sem sentença condenatória e não responde, no mandato, por atos estranhos às funções. Isso <b>não vale</b> para Governadores.",
  "Conselho da República e Conselho de Defesa Nacional são órgãos <b>consultivos</b>."],
checklist:[
  "Regras de eleição, início do mandato e prazo para tomar posse",
  "Diferença entre substituir e suceder, e a linha de substituição",
  "Vacância dupla: direta ou indireta, e em quantos dias",
  "O que o decreto autônomo pode e não pode fazer",
  "Quais atribuições do art. 84 são delegáveis e a quem",
  "Quórum e órgão de cada fase do impeachment",
  "Quando ocorre o afastamento e por quanto tempo",
  "Papel do Senado segundo a ADPF 378",
  "Imunidades do art. 86 e por que não valem para Governadores",
  "Função dos Conselhos da República e de Defesa Nacional"],
questoes:[]
};

/* ======================= PODER JUDICIÁRIO ======================= */
T.judiciario = {
meta:{ tema:"Poder Judiciário (arts. 92 a 126) e precatórios (art. 100)", atualizado:AT,
  foco:"Órgãos, garantias e vedações da magistratura; quinto constitucional; reserva de plenário (SV 10); STF, STJ e CNJ; competências penais originárias; súmula vinculante e reclamação; legitimados do controle concentrado; incidente de deslocamento de competência; Justiça Militar estadual; EC 134/2024 e EC 136/2025." },
secoes:[
{ id:"garantias", titulo:"Estatuto da magistratura e quinto constitucional", curto:"Garantias",
  rapido:["Garantias (art. 95): <b>vitaliciedade</b> (no 1º grau, após <b>2 anos</b> de exercício; antes, perda por deliberação do tribunal; depois, só por sentença transitada em julgado), <b>inamovibilidade</b> (salvo interesse público, por maioria absoluta do tribunal ou do CNJ) e <b>irredutibilidade de subsídio</b>.",
    "Vedações: exercer outro cargo ou função, <b>salvo uma de magistério</b>; receber custas ou participação em processo; atividade <b>político-partidária</b>; auxílios ou contribuições de particulares; advogar no juízo ou tribunal de que se afastou antes de <b>3 anos</b> (quarentena).",
    "Ingresso: juiz substituto por concurso com participação da OAB, exigidos <b>3 anos de atividade jurídica</b> do bacharel.",
    "<b>Quinto constitucional</b> (art. 94): 1/5 dos TRFs, TJs e TJDFT para membros do <b>MP</b> e <b>advogados</b> com mais de <b>10 anos</b> de carreira/atividade; órgãos de classe formam lista <b>sêxtupla</b>, o tribunal reduz a <b>tríplice</b> e o Executivo escolhe em 20 dias."],
  teoria:[
    { h:"Autonomia dos tribunais", p:[
      "Os tribunais elegem seus órgãos diretivos (art. 96, I, a). EC 134/2024: nos TJs com <b>mais de 170 desembargadores</b>, a eleição é entre os membros do pleno, por maioria absoluta, voto direto e secreto, mandato de 2 anos, <b>vedada mais de uma recondução sucessiva</b>.",
      "Decisões administrativas dos tribunais são motivadas e em sessão pública; decisões disciplinares por maioria absoluta."]}],
  pegadinhas:["Vitaliciedade ≠ estabilidade: o juiz vitalício só perde o cargo por sentença.","Magistrado pode ser professor (uma função de magistério).","Quinto: lista sêxtupla (classe) → tríplice (tribunal) → nomeação (Executivo)."]},
{ id:"tribunais", titulo:"STF, STJ, CNJ e competências penais", curto:"Tribunais",
  rapido:["<b>STF</b>: <b>11 Ministros</b>, mais de 35 e menos de <b>70</b> anos (EC 122/2022), notável saber jurídico e reputação ilibada; <b>natos</b>; nomeados pelo Presidente após aprovação por <b>maioria absoluta do Senado</b>.",
    "STF julga nos crimes comuns: Presidente, Vice, membros do Congresso, seus Ministros e o PGR; nos comuns e de responsabilidade: Ministros de Estado, Comandantes das Forças Armadas, membros dos Tribunais Superiores e do TCU, chefes de missão diplomática permanente.",
    "<b>STJ</b>: no mínimo <b>33 Ministros</b>; julga nos crimes comuns os <b>Governadores</b>; nos comuns e de responsabilidade, desembargadores dos TJs, membros dos TCEs, dos TRFs, TREs e TRTs, conselhos ou tribunais de contas municipais e do MPU que oficiem perante tribunais. Recurso especial exige <b>relevância</b> da questão federal (EC 125/2022).",
    "<b>CNJ</b>: 15 membros, presidido pelo Presidente do STF; controle <b>administrativo, financeiro e disciplinar</b> — <b>sem função jurisdicional</b> e sem poder sobre o STF (ADI 3.367)."],
  teoria:[
    { h:"Súmula vinculante e controle concentrado", p:[
      "SV: aprovada pelo STF por <b>2/3</b> (8 ministros), de ofício ou por provocação, após reiteradas decisões; vincula Judiciário e administração direta e indireta; descumprimento → <b>reclamação</b> ao STF.",
      "Legitimados da ADI/ADC/ADO/ADPF (art. 103): Presidente; Mesas do Senado, da Câmara, de Assembleia ou da Câmara Legislativa; Governador; PGR; Conselho Federal da OAB; partido com representação no Congresso; confederação sindical ou entidade de classe de âmbito nacional (os quatro de Mesa de Assembleia, Governador, confederação e entidade de classe precisam demonstrar <b>pertinência temática</b>).",
      "Reserva de plenário (art. 97): só por <b>maioria absoluta</b> do tribunal ou do órgão especial se declara inconstitucionalidade; afastar a lei sem declarar também viola (SV 10)."]},
    { h:"Deslocamento de competência e Justiça Militar", p:[
      "<b>IDC</b> (art. 109, §5º): em <b>grave violação de direitos humanos</b>, o <b>PGR</b> pode suscitar perante o <b>STJ</b>, em qualquer fase, o deslocamento para a <b>Justiça Federal</b> — usado em casos de chacinas e grupos de extermínio.",
      "Justiça Militar estadual julga militares dos Estados nos crimes militares, <b>ressalvada a competência do júri quando a vítima for civil</b> (crime doloso contra a vida).",
      "Precatórios (art. 100): pagamento em ordem cronológica, com preferência para alimentares e para idosos, doentes graves e pessoas com deficiência; a EC 136/2025 criou limites de pagamento para Estados, DF e Municípios — confira as regras de transição."]}],
  pegadinhas:["Governador: crimes comuns no <b>STJ</b>; Prefeito: no <b>TJ</b> (art. 29, X).","CNJ não julga processos nem controla atos do STF.","SV exige 2/3 dos ministros (8 votos)."]}
],
lei:[
{ art:"CF, arts. 94 e 95", nome:"Quinto e garantias", sec:"garantias", itens:[
  { id:"cf95", rot:"Art. 95", t:"Os juízes gozam das seguintes garantias:<br>I - <b class='g1'>vitaliciedade</b>, que, no primeiro grau, só será adquirida após <b class='g2'>dois anos de exercício</b>, dependendo a perda do cargo, nesse período, de deliberação do tribunal a que o juiz estiver vinculado, e, nos demais casos, de <b class='g1'>sentença judicial transitada em julgado</b>;<br>II - <b class='g1'>inamovibilidade</b>, salvo por motivo de interesse público, na forma do art. 93, VIII;<br>III - <b class='g1'>irredutibilidade de subsídio</b> (...).<br>Parágrafo único. Aos juízes é vedado: I - exercer, ainda que em disponibilidade, outro cargo ou função, <b class='g3'>salvo uma de magistério</b>; II - receber, a qualquer título ou pretexto, custas ou participação em processo; III - dedicar-se à <b class='g1'>atividade político-partidária</b>; IV - receber, a qualquer título ou pretexto, auxílios ou contribuições de pessoas físicas, entidades públicas ou privadas, ressalvadas as exceções previstas em lei; V - exercer a advocacia no juízo ou tribunal do qual se afastou, antes de decorridos <b class='g2'>três anos</b> do afastamento do cargo por aposentadoria ou exoneração.", c:["jd1","jd2"] },
  { id:"cf94", rot:"Art. 94", t:"Um quinto dos lugares dos Tribunais Regionais Federais, dos Tribunais dos Estados, e do Distrito Federal e Territórios será composto de membros, do <b class='g1'>Ministério Público</b>, com mais de <b class='g2'>dez anos de carreira</b>, e de <b class='g1'>advogados</b> de notório saber jurídico e de reputação ilibada, com mais de <b class='g2'>dez anos de efetiva atividade profissional</b>, indicados em <b class='g1'>lista sêxtupla</b> pelos órgãos de representação das respectivas classes.<br>Parágrafo único. Recebidas as indicações, o tribunal formará <b class='g1'>lista tríplice</b>, enviando-a ao Poder Executivo, que, nos <b class='g2'>vinte dias</b> subseqüentes, escolherá um de seus integrantes para nomeação.", c:["jd3"] }]},
{ art:"CF, arts. 97 e 101", nome:"Reserva de plenário e STF", sec:"tribunais", itens:[
  { id:"cf97", rot:"Art. 97", t:"Somente pelo voto da <b class='g1'>maioria absoluta</b> de seus membros ou dos membros do respectivo <b class='g1'>órgão especial</b> poderão os tribunais declarar a inconstitucionalidade de lei ou ato normativo do Poder Público.", c:["jd4"], j:["stf-sv10"] },
  { id:"cf101", rot:"Art. 101", t:"O Supremo Tribunal Federal compõe-se de <b class='g2'>onze Ministros</b>, escolhidos dentre cidadãos com <b class='g2'>mais de trinta e cinco e menos de setenta anos</b> de idade, de <b class='g1'>notável saber jurídico e reputação ilibada</b>.<br>Parágrafo único. Os Ministros do Supremo Tribunal Federal serão nomeados pelo Presidente da República, depois de aprovada a escolha pela <b class='g1'>maioria absoluta do Senado Federal</b>.", nota:"Limite de 70 anos pela EC 122/2022.", c:["jd5"] }]},
{ art:"CF, arts. 103, 105, 109 e 125", nome:"Controle, STJ, IDC e Justiça Militar", sec:"tribunais", itens:[
  { id:"cf105", rot:"Art. 105, I, a", t:"Compete ao Superior Tribunal de Justiça: I - processar e julgar, originariamente: a) nos crimes comuns, os <b class='g1'>Governadores dos Estados e do Distrito Federal</b>, e, nestes e nos de responsabilidade, os <b class='g1'>desembargadores dos Tribunais de Justiça</b> dos Estados e do Distrito Federal, os membros dos Tribunais de Contas dos Estados e do Distrito Federal, os dos Tribunais Regionais Federais, dos Tribunais Regionais Eleitorais e do Trabalho, os membros dos Conselhos ou Tribunais de Contas dos Municípios e os do Ministério Público da União que oficiem perante tribunais;", c:["jd6"] },
  { id:"cf109p5", rot:"Art. 109, §5º", t:"Nas hipóteses de <b class='g1'>grave violação de direitos humanos</b>, o <b class='g1'>Procurador-Geral da República</b>, com a finalidade de assegurar o cumprimento de obrigações decorrentes de tratados internacionais de direitos humanos dos quais o Brasil seja parte, poderá suscitar, perante o <b class='g1'>Superior Tribunal de Justiça</b>, em qualquer fase do inquérito ou processo, incidente de <b class='g1'>deslocamento de competência para a Justiça Federal</b>.", c:["jd7"] },
  { id:"cf125p4", rot:"Art. 125, §4º", t:"Compete à <b class='g1'>Justiça Militar estadual</b> processar e julgar os militares dos Estados, nos crimes militares definidos em lei e as ações judiciais contra atos disciplinares militares, <b class='g3'>ressalvada a competência do júri quando a vítima for civil</b>, cabendo ao tribunal competente decidir sobre a perda do posto e da patente dos oficiais e da graduação das praças.", c:["jd8"] },
  { id:"cf103", rot:"Art. 103", t:"Podem propor a ação direta de inconstitucionalidade e a ação declaratória de constitucionalidade: I - o <b class='g1'>Presidente da República</b>; II - a Mesa do Senado Federal; III - a Mesa da Câmara dos Deputados; IV - a Mesa de Assembléia Legislativa ou da Câmara Legislativa do Distrito Federal; V - o <b class='g1'>Governador</b> de Estado ou do Distrito Federal; VI - o <b class='g1'>Procurador-Geral da República</b>; VII - o <b class='g1'>Conselho Federal da Ordem dos Advogados do Brasil</b>; VIII - <b class='g1'>partido político com representação no Congresso Nacional</b>; IX - <b class='g1'>confederação sindical ou entidade de classe de âmbito nacional</b>.", c:["jd9"] }]}
],
juris:[
{ id:"stf-sv10", trib:"STF", tipo:"Súmula Vinculante", num:"SV 10", sec:"tribunais", status:"vigente", data:"18/06/2008",
  titulo:"Reserva de plenário",
  texto:"Viola a cláusula de reserva de plenário (CF, artigo 97) a decisão de órgão fracionário de tribunal que, embora não declare expressamente a inconstitucionalidade de lei ou ato normativo do Poder Público, afasta sua incidência, no todo ou em parte.",
  explica:"Dispensa-se o plenário se já houver pronunciamento do próprio tribunal ou do STF sobre a questão (CPC, art. 949, parágrafo único). Não se aplica a juiz singular nem às turmas recursais.", lei:["cf97"], fonte:STFSV },
{ id:"stf-adi3367", trib:"STF", tipo:"ADI", num:"ADI 3.367", sec:"tribunais", status:"vigente", data:"13/04/2005",
  titulo:"Constitucionalidade do CNJ",
  texto:"O CNJ é órgão interno do Judiciário, de natureza administrativa, sem competência jurisdicional e sem ascendência sobre o STF.",
  explica:"Não ofende a separação de Poderes nem o pacto federativo.", lei:["cf97"], fonte:STFJ }
],
cards:[
{ id:"jd1", tipo:"caso", sec:"garantias", f:"Juiz com 1 ano de exercício comete falta grave. Como perde o cargo?", v:"Por <b>deliberação do tribunal</b> a que está vinculado (ainda não é vitalício). Depois de 2 anos, só por sentença transitada em julgado.", lei:["cf95"] },
{ id:"jd2", tipo:"caso", sec:"garantias", f:"Juíza aposentada quer advogar no mesmo tribunal 1 ano depois. Pode?", v:"<b>Não</b> — quarentena de <b>3 anos</b> no juízo ou tribunal de que se afastou.", lei:["cf95"] },
{ id:"jd3", tipo:"lacuna", sec:"garantias", f:"Quinto constitucional: MP e advogados com mais de ______ anos; lista ______ da classe → lista ______ do tribunal → nomeação pelo ______ em 20 dias.", v:"<b>10</b>; <b>sêxtupla</b>; <b>tríplice</b>; <b>Executivo</b>.", lei:["cf94"] },
{ id:"jd4", tipo:"caso", sec:"tribunais", f:"Câmara do TJ deixa de aplicar uma lei estadual por considerá-la incompatível com a CF, sem dizer \"inconstitucional\". Válido?", v:"<b>Não</b> — viola a reserva de plenário (SV 10).", lei:["cf97"], j:["stf-sv10"] },
{ id:"jd5", tipo:"numero", sec:"tribunais", f:"STF: número de ministros, faixa etária e aprovação.", v:"<b>11</b>; mais de <b>35</b> e menos de <b>70</b>; maioria <b>absoluta</b> do Senado.", lei:["cf101"] },
{ id:"jd6", tipo:"caso", sec:"tribunais", f:"Governador da Bahia comete crime comum. E um desembargador do TJ-BA? Quem julga?", v:"Ambos o <b>STJ</b> (governador: crimes comuns; desembargador: comuns e de responsabilidade).", lei:["cf105"] },
{ id:"jd7", tipo:"caso", sec:"tribunais", f:"Chacina com indícios de omissão das autoridades locais. Como levar o caso à Justiça Federal?", v:"<b>IDC</b>: o <b>PGR</b> suscita perante o <b>STJ</b> (art. 109, §5º).", lei:["cf109p5"] },
{ id:"jd8", tipo:"caso", sec:"tribunais", f:"Policial militar em serviço mata civil dolosamente. Quem julga?", v:"O <b>Tribunal do Júri</b> (ressalva do art. 125, §4º).", lei:["cf125p4"] },
{ id:"jd9", tipo:"caso", sec:"tribunais", f:"Associação estadual de delegados propõe ADI no STF. É legitimada?", v:"<b>Não.</b> Entidade de classe precisa ter <b>âmbito nacional</b> (art. 103, IX).", lei:["cf103"] }
],
importancia:{ nivel:4,
  texto:"Garantias da magistratura, reserva de plenário, competências penais originárias (quem julga Governador, Prefeito e desembargador) e legitimados do controle concentrado são cobrados com frequência e cheios de pegadinhas.",
  decore:[
    ["Vitaliciedade (1º grau)","após <b>2 anos</b> de exercício"],
    ["Quarentena do magistrado aposentado","<b>3 anos</b> sem advogar no juízo ou tribunal de origem"],
    ["Quinto constitucional","MP e advogados com mais de <b>10 anos</b>; lista <b>sêxtupla</b>, depois <b>tríplice</b>, Executivo escolhe em <b>20 dias</b>"],
    ["STF","<b>11</b> Ministros, mais de <b>35</b> e menos de <b>70</b> anos; maioria absoluta do Senado"],
    ["STJ","mínimo de <b>33</b> Ministros; julga <b>Governadores</b> em crimes comuns"],
    ["Reserva de plenário (art. 97)","maioria <b>absoluta</b> do tribunal ou do órgão especial; <b>SV 10</b>"],
    ["Súmula vinculante","aprovação por <b>2/3</b> do STF (8 ministros)"],
    ["CNJ","<b>15</b> membros, presidido pelo Presidente do STF; sem função jurisdicional"],
    ["IDC (art. 109, § 5º)","PGR suscita ao <b>STJ</b>; desloca para a <b>Justiça Federal</b>"],
    ["Justiça Militar estadual","ressalva do <b>júri</b> quando a vítima for civil"]],
  macetes:[
    ["Vitalício só depois de 2 anos","Antes, o tribunal decide a perda do cargo. Depois, só sentença transitada em julgado."],
    ["Sêxtupla, tríplice, nomeação","Classe indica 6, o tribunal reduz a 3, o Executivo escolhe 1 em 20 dias."],
    ["Governador no STJ, Prefeito no TJ","Crime comum de Governador: STJ. Prefeito: Tribunal de Justiça (art. 29, X)."],
    ["Afastar a lei também é declarar","Órgão fracionário que afasta a lei sem dizer “inconstitucional” viola a reserva de plenário (SV 10)."]] },
comparativo:{ titulo:"STF × STJ: quem julga quem nos crimes comuns", head:["STF","STJ"], rows:[
  ["<b>Composição:</b> 11 Ministros, entre 35 e 70 anos","<b>Composição:</b> no mínimo 33 Ministros"],
  ["<b>Autoridades:</b> Presidente, Vice, membros do Congresso, seus próprios Ministros e o PGR","<b>Autoridades:</b> Governadores dos Estados e do DF"],
  ["<b>Crimes comuns e de responsabilidade:</b> Ministros de Estado, Comandantes das Forças, membros dos Tribunais Superiores e do TCU, chefes de missão diplomática permanente","<b>Crimes comuns e de responsabilidade:</b> desembargadores dos TJs, membros dos TCEs, TRFs, TREs e TRTs, conselhos ou tribunais de contas municipais e membros do MPU que oficiem perante tribunais"],
  ["<b>Recurso típico:</b> recurso extraordinário (repercussão geral)","<b>Recurso típico:</b> recurso especial (relevância da questão federal, EC 125/2022)"],
  ["<b>Nomeação:</b> Presidente da República, após aprovação por maioria absoluta do Senado","<b>Governador x Prefeito:</b> o Governador é julgado no STJ nos crimes comuns; o Prefeito, no Tribunal de Justiça"]]},
prova:[
  { tipo:"ce", enun:"O juiz de primeiro grau adquire vitaliciedade após dois anos de exercício; nesse período, a perda do cargo depende de deliberação do tribunal ao qual está vinculado.", gab:"Certo", com:"Art. 95, I: antes dos 2 anos decide o tribunal; depois, só sentença judicial transitada em julgado." },
  { tipo:"ce", enun:"Os Governadores dos Estados são processados e julgados pelo STF nos crimes comuns.", gab:"Errado", com:"A competência é do STJ (art. 105, I, a). O STF julga o Presidente, o Vice, membros do Congresso, seus Ministros e o PGR nos crimes comuns." },
  { tipo:"ce", enun:"O Conselho Nacional de Justiça possui função jurisdicional e pode rever atos do Supremo Tribunal Federal.", gab:"Errado", com:"O CNJ é órgão administrativo, sem função jurisdicional e sem ascendência sobre o STF (ADI 3.367)." },
  { tipo:"ce", enun:"A decisão de órgão fracionário de tribunal que afasta a incidência de lei sem declarar expressamente sua inconstitucionalidade respeita a cláusula de reserva de plenário.", gab:"Errado", com:"A SV 10 considera que isso viola o art. 97, pois afastar a aplicação da lei equivale a declarar sua inconstitucionalidade." },
  { tipo:"caso", enun:"Associação estadual de delegados propõe ADI no STF contra lei estadual. A entidade tem legitimidade?", com:"Não. Entidade de classe precisa ter âmbito nacional (art. 103, IX) e demonstrar pertinência temática." },
  { tipo:"caso", enun:"Policial militar, em serviço, mata dolosamente um civil. Qual o juízo competente?", com:"O Tribunal do Júri. O art. 125, § 4º, ressalva a competência do júri quando a vítima for civil." }],
resumo:[
  "Garantias dos juízes: <b>vitaliciedade</b> (2 anos no 1º grau), <b>inamovibilidade</b> e <b>irredutibilidade de subsídio</b>.",
  "Vedações: outro cargo, <b>salvo uma de magistério</b>; custas; atividade político-partidária; auxílios de particulares; quarentena de <b>3 anos</b> para advogar.",
  "Quinto constitucional: MP e advogados com mais de <b>10 anos</b>; lista sêxtupla, depois tríplice, e nomeação pelo Executivo em <b>20 dias</b>.",
  "STF: <b>11</b> Ministros, entre <b>35 e 70</b> anos, aprovados por maioria absoluta do Senado. STJ: no mínimo <b>33</b>; julga Governadores.",
  "Reserva de plenário: só <b>maioria absoluta</b> do tribunal ou do órgão especial declara a inconstitucionalidade. Afastar a lei também viola (SV 10).",
  "Súmula vinculante exige <b>2/3</b> do STF; o descumprimento autoriza <b>reclamação</b>.",
  "CNJ: controle administrativo, financeiro e disciplinar, <b>sem jurisdição</b> e sem poder sobre o STF.",
  "IDC: o <b>PGR</b> suscita ao <b>STJ</b>, em grave violação de direitos humanos, o deslocamento para a Justiça Federal.",
  "Justiça Militar estadual julga militares nos crimes militares, <b>ressalvado o júri</b> se a vítima for civil."],
checklist:[
  "Garantias e vedações da magistratura",
  "Como funciona o quinto constitucional",
  "Composição e requisitos de ingresso no STF",
  "Quem o STF e o STJ julgam originariamente nos crimes comuns",
  "O que é reserva de plenário e o conteúdo da SV 10",
  "Quórum e efeitos da súmula vinculante",
  "Natureza e limites do CNJ",
  "Legitimados do art. 103 e quem precisa de pertinência temática",
  "O que é o IDC e quem o suscita",
  "Competência da Justiça Militar estadual e a ressalva do júri"],
questoes:[]
};

/* ======================= FUNÇÕES ESSENCIAIS À JUSTIÇA ======================= */
T.funcoes_essenciais = {
meta:{ tema:"Funções essenciais à Justiça (arts. 127 a 135)", atualizado:AT,
  foco:"Ministério Público: princípios, estrutura, chefia (PGR e PGJ), garantias e vedações, funções institucionais (ação penal, controle externo da atividade policial, requisições, investigação própria — Tema 184); CNMP; Advocacia Pública; advocacia; Defensoria Pública (EC 80/2014)." },
secoes:[
{ id:"mp", titulo:"Ministério Público", curto:"MP",
  rapido:["Instituição <b>permanente, essencial à função jurisdicional</b>, que defende a <b>ordem jurídica, o regime democrático e os interesses sociais e individuais indisponíveis</b>. Princípios: <b>unidade, indivisibilidade e independência funcional</b>.",
    "MPU: <b>MPF, MPT, MPM e MPDFT</b>; e os MPs dos Estados. O MP junto ao Tribunal de Contas é órgão à parte (art. 130).",
    "<b>PGR</b>: integrante da carreira, <b>maior de 35</b>, nomeado pelo Presidente após aprovação por <b>maioria absoluta do Senado</b>; mandato de <b>2 anos</b>, recondução permitida (sem limite). <b>PGJ</b>: lista tríplice da carreira, nomeado pelo <b>Governador</b>, 2 anos, <b>uma</b> recondução; destituição por <b>maioria absoluta</b> da Assembleia.",
    "Funções-chave: promover <b>privativamente</b> a ação penal pública; exercer o <b>controle externo da atividade policial</b>; <b>requisitar</b> diligências e a instauração de inquérito; ação civil pública."],
  teoria:[
    { h:"Investigação pelo MP", p:[
      "Tema 184 (RE 593.727, 2015): o MP pode promover, <b>por autoridade própria e por prazo razoável</b>, investigações penais, respeitados os direitos do investigado, as prerrogativas dos advogados e a reserva de jurisdição, com controle judicial.",
      "Em 2024, ao julgar ADIs sobre o tema, o STF fixou parâmetros para os PICs (comunicação ao juiz competente, prazos e registro similares aos do inquérito) — confira a tese consolidada.",
      "Controle externo não é hierarquia: o MP fiscaliza a legalidade da atividade policial, mas não comanda a polícia (que é dirigida por delegados de carreira — art. 144, §4º)."]},
    { h:"Garantias e vedações", p:[
      "Garantias: vitaliciedade (após 2 anos), inamovibilidade, irredutibilidade de subsídio.",
      "Vedações: honorários e custas; advocacia; participação em sociedade comercial; outra função pública salvo uma de magistério; atividade político-partidária; auxílios de particulares; quarentena de 3 anos.",
      "CNMP: 14 membros, presidido pelo PGR; controle administrativo, financeiro e disciplinar."]}],
  pegadinhas:["PGR: reconduções ilimitadas; PGJ: <b>uma</b> recondução.","A ação penal pública é privativa do MP — a privada subsidiária é exceção constitucional.","Controle externo ≠ subordinação da polícia ao MP."]},
{ id:"advocacia", titulo:"Advocacia pública, advocacia e Defensoria", curto:"Advocacia e DP",
  rapido:["<b>AGU</b>: chefiada pelo Advogado-Geral, de <b>livre nomeação</b> pelo Presidente, maior de 35 anos, notável saber jurídico e reputação ilibada. Execução da dívida ativa tributária da União: <b>PGFN</b>.",
    "Procuradores dos Estados e do DF: <b>concurso com participação da OAB</b>; estabilidade após <b>3 anos</b>, com avaliação de desempenho.",
    "<b>Advogado</b>: indispensável à administração da justiça, <b>inviolável por seus atos e manifestações</b> no exercício da profissão, <b>nos limites da lei</b>.",
    "<b>Defensoria</b> (EC 80/2014): instituição permanente, essencial, expressão do regime democrático; orientação jurídica, <b>promoção dos direitos humanos</b> e defesa dos <b>necessitados</b>, judicial e extrajudicial, individual e coletiva. Autonomia <b>funcional e administrativa</b> e iniciativa de proposta orçamentária; princípios da unidade, indivisibilidade e independência funcional."],
  teoria:[
    { h:"Pontos de jurisprudência", p:[
      "A Defensoria tem legitimidade para propor <b>ação civil pública</b> (ADI 3.943).",
      "É vedado ao defensor exercer a advocacia fora das atribuições institucionais (art. 134, §1º).",
      "A ausência de defensoria em comarca não autoriza o juiz a deixar o réu sem defesa: nomeia-se advogado dativo."]}],
  pegadinhas:["AGU: livre nomeação (não precisa ser da carreira).","Inviolabilidade do advogado é \"nos limites da lei\" — não é absoluta.","Defensoria tem autonomia funcional <b>e</b> administrativa."]}
],
lei:[
{ art:"CF, arts. 127 a 129", nome:"Ministério Público", sec:"mp", itens:[
  { id:"cf127", rot:"Art. 127, caput e §1º", t:"O Ministério Público é instituição <b class='g1'>permanente, essencial à função jurisdicional do Estado</b>, incumbindo-lhe a defesa da <b class='g1'>ordem jurídica, do regime democrático e dos interesses sociais e individuais indisponíveis</b>.<br>§ 1º São princípios institucionais do Ministério Público a <b class='g1'>unidade, a indivisibilidade e a independência funcional</b>.", c:["fe1"] },
  { id:"cf128", rot:"Art. 128, §§1º a 4º (essência)", t:"§ 1º O Ministério Público da União tem por chefe o <b class='g1'>Procurador-Geral da República</b>, nomeado pelo Presidente da República dentre integrantes da carreira, <b class='g2'>maiores de trinta e cinco anos</b>, após a aprovação de seu nome pela <b class='g1'>maioria absoluta dos membros do Senado Federal</b>, para mandato de <b class='g2'>dois anos</b>, <b class='g3'>permitida a recondução</b>.<br>§ 2º A destituição do Procurador-Geral da República, por iniciativa do Presidente da República, deverá ser precedida de autorização da maioria absoluta do Senado Federal.<br>§ 3º Os Ministérios Públicos dos Estados e o do Distrito Federal e Territórios formarão <b class='g1'>lista tríplice</b> dentre integrantes da carreira, na forma da lei respectiva, para escolha de seu Procurador-Geral, que será nomeado pelo Chefe do Poder Executivo, para mandato de dois anos, <b class='g3'>permitida uma recondução</b>.<br>§ 4º Os Procuradores-Gerais nos Estados e no Distrito Federal e Territórios poderão ser destituídos por deliberação da maioria absoluta do Poder Legislativo, na forma da lei complementar respectiva.", c:["fe2","fe3"] },
  { id:"cf129", rot:"Art. 129, I, VII e VIII", t:"São funções institucionais do Ministério Público:<br>I - promover, <b class='g1'>privativamente, a ação penal pública</b>, na forma da lei;<br>(...)<br>VII - exercer o <b class='g1'>controle externo da atividade policial</b>, na forma da lei complementar mencionada no artigo anterior;<br>VIII - <b class='g1'>requisitar diligências investigatórias e a instauração de inquérito policial</b>, indicados os fundamentos jurídicos de suas manifestações processuais;", c:["fe4","fe5"], j:["stf-t184"] }]},
{ art:"CF, arts. 133 e 134", nome:"Advocacia e Defensoria", sec:"advocacia", itens:[
  { id:"cf133", rot:"Arts. 133 e 134, caput", t:"Art. 133. O advogado é <b class='g1'>indispensável à administração da justiça</b>, sendo <b class='g1'>inviolável por seus atos e manifestações</b> no exercício da profissão, <b class='g3'>nos limites da lei</b>.<br>Art. 134. A Defensoria Pública é instituição <b class='g1'>permanente, essencial à função jurisdicional do Estado</b>, incumbindo-lhe, como expressão e instrumento do regime democrático, fundamentalmente, a <b class='g1'>orientação jurídica, a promoção dos direitos humanos e a defesa</b>, em todos os graus, judicial e extrajudicial, dos direitos individuais e coletivos, de forma integral e gratuita, aos <b class='g1'>necessitados</b>, na forma do inciso LXXIV do art. 5º desta Constituição Federal.", nota:"Art. 134 com redação da EC 80/2014.", c:["fe6","fe7"] }]}
],
juris:[
{ id:"stf-t184", trib:"STF", tipo:"Repercussão geral", num:"RE 593.727 (Tema 184)", sec:"mp", status:"vigente", data:"14/05/2015",
  titulo:"Poder investigatório do Ministério Público",
  texto:"O Ministério Público dispõe de competência para promover, por autoridade própria, e por prazo razoável, investigações de natureza penal, desde que respeitados os direitos e garantias que assistem a qualquer indiciado ou a qualquer pessoa sob investigação do Estado, observadas, sempre, por seus agentes, as hipóteses de reserva constitucional de jurisdição e, também, as prerrogativas profissionais de que se acham investidos, em nosso País, os Advogados, sem prejuízo da possibilidade — sempre presente no Estado democrático de Direito — do permanente controle jurisdicional dos atos, necessariamente documentados (Súmula Vinculante 14), praticados pelos membros dessa instituição.",
  explica:"A investigação policial não é exclusiva; o MP pode investigar diretamente, com controle judicial. Parâmetros adicionais foram fixados em 2024 — confira.", lei:["cf129"], fonte:STFRG },
{ id:"stf-adi3943", trib:"STF", tipo:"ADI", num:"ADI 3.943", sec:"advocacia", status:"vigente", data:"07/05/2015",
  titulo:"Defensoria pode propor ação civil pública",
  texto:"É constitucional a atribuição à Defensoria Pública de legitimidade para propor ação civil pública.",
  explica:"Coerente com a defesa de direitos coletivos prevista no art. 134 após a EC 80/2014.", lei:["cf133"], fonte:STFJ }
],
cards:[
{ id:"fe1", tipo:"lacuna", sec:"mp", f:"Princípios institucionais do MP: ______, ______ e independência funcional.", v:"<b>unidade</b>; <b>indivisibilidade</b>.", lei:["cf127"] },
{ id:"fe2", tipo:"distincao", sec:"mp", f:"PGR × PGJ: nomeação e recondução.", v:"<b>PGR</b>: Presidente, após maioria absoluta do Senado; reconduções sem limite. <b>PGJ</b>: Governador, de lista tríplice; <b>uma</b> recondução.", lei:["cf128"] },
{ id:"fe3", tipo:"caso", sec:"mp", f:"Governador quer destituir o PGJ. Basta decreto?", v:"<b>Não.</b> Destituição por deliberação da <b>maioria absoluta da Assembleia</b> (art. 128, §4º).", lei:["cf128"] },
{ id:"fe4", tipo:"caso", sec:"mp", f:"Promotor requisita ao delegado a instauração de inquérito. O delegado é obrigado?", v:"<b>Sim</b>, em regra (art. 129, VIII; CPP, art. 5º, II), salvo requisição manifestamente ilegal.", lei:["cf129"] },
{ id:"fe5", tipo:"caso", sec:"mp", f:"O MP pode conduzir investigação criminal própria?", v:"<b>Sim</b> — Tema 184: por autoridade própria, prazo razoável, respeitadas garantias e reserva de jurisdição.", lei:["cf129"], j:["stf-t184"] },
{ id:"fe6", tipo:"caso", sec:"advocacia", f:"Defensoria ajuíza ação civil pública em favor de moradores de comunidade. Tem legitimidade?", v:"<b>Sim</b> (ADI 3.943).", lei:["cf133"], j:["stf-adi3943"] },
{ id:"fe7", tipo:"ce", sec:"advocacia", f:"Certo ou errado: a inviolabilidade do advogado por seus atos e manifestações é absoluta.", v:"<b>Errado.</b> Vale <b>nos limites da lei</b>.", lei:["cf133"] }
],
importancia:{ nivel:4,
  texto:"O Ministério Público é o ponto mais cobrado para carreiras policiais: ação penal, controle externo, requisição de inquérito e investigação própria. As regras do PGR e do PGJ também caem com frequência.",
  decore:[
    ["Princípios do MP","<b>unidade, indivisibilidade e independência funcional</b>"],
    ["PGR","maior de <b>35</b> anos, da carreira, maioria absoluta do Senado, mandato de <b>2 anos</b>, recondução permitida"],
    ["PGJ","lista <b>tríplice</b>, nomeado pelo Governador, <b>2 anos</b>, <b>uma</b> recondução"],
    ["Destituição do PGJ","maioria absoluta do Poder Legislativo estadual"],
    ["Ação penal pública","<b>privativa</b> do MP (art. 129, I)"],
    ["Controle externo da polícia","art. <b>129, VII</b>; não é subordinação"],
    ["Requisição ao delegado","art. <b>129, VIII</b>: diligências e instauração de inquérito"],
    ["Investigação pelo MP","<b>Tema 184</b> do STF: possível, com controle judicial"],
    ["Defensoria","autonomia <b>funcional e administrativa</b> (EC 80/2014)"],
    ["Advogado","inviolável <b>nos limites da lei</b>"]],
  macetes:[
    ["PGR sem limite, PGJ com uma","O PGR pode ser reconduzido sem limite. O PGJ, uma única vez."],
    ["Controle externo não manda na polícia","O MP fiscaliza a legalidade da atividade policial. A polícia civil é dirigida por delegado de carreira (art. 144, § 4º)."],
    ["Requisita, não ordena","O MP requisita diligências e a instauração de inquérito, com fundamentos jurídicos, mas não comanda o inquérito."],
    ["AGU é de livre nomeação","O Advogado-Geral não precisa ser da carreira, mas precisa ter mais de 35 anos e notável saber jurídico."]] },
comparativo:{ titulo:"PGR × PGJ", head:["Procurador-Geral da República (MPU)","Procurador-Geral de Justiça (MPs estaduais)"], rows:[
  ["<b>Chefia:</b> o Ministério Público da União","<b>Chefia:</b> o Ministério Público do Estado"],
  ["<b>Escolha:</b> Presidente da República, dentre integrantes da carreira maiores de 35 anos","<b>Escolha:</b> Chefe do Poder Executivo, a partir de lista tríplice formada na carreira"],
  ["<b>Controle:</b> aprovação por maioria absoluta do Senado","<b>Controle:</b> não há sabatina; a lista tríplice sai da própria carreira"],
  ["<b>Mandato:</b> 2 anos","<b>Mandato:</b> 2 anos"],
  ["<b>Recondução:</b> permitida, sem limite","<b>Recondução:</b> permitida uma vez"],
  ["<b>Destituição:</b> por iniciativa do Presidente, com autorização da maioria absoluta do Senado","<b>Destituição:</b> deliberação da maioria absoluta do Poder Legislativo, na forma da lei complementar"]]},
prova:[
  { tipo:"ce", enun:"O Ministério Público tem legitimidade para promover privativamente a ação penal pública, na forma da lei.", gab:"Certo", com:"Art. 129, I. A ação penal privada subsidiária é exceção prevista na própria Constituição, quando o MP não age no prazo." },
  { tipo:"ce", enun:"O controle externo da atividade policial exercido pelo Ministério Público implica subordinação hierárquica da polícia civil ao órgão ministerial.", gab:"Errado", com:"Controle externo não é hierarquia. A polícia civil é dirigida por delegado de carreira e se subordina ao Governador." },
  { tipo:"ce", enun:"Segundo o STF, o Ministério Público pode promover, por autoridade própria e por prazo razoável, investigações de natureza penal, respeitados os direitos do investigado e a reserva de jurisdição.", gab:"Certo", com:"Tese do Tema 184 (RE 593.727). O controle judicial permanece." },
  { tipo:"ce", enun:"O Procurador-Geral da República pode ser reconduzido apenas uma vez, tal como o Procurador-Geral de Justiça dos Estados.", gab:"Errado", com:"A Constituição permite a recondução do PGR sem limitar o número. A recondução única vale para o PGJ." },
  { tipo:"caso", enun:"O Governador, insatisfeito com a atuação do Procurador-Geral de Justiça, edita decreto o destituindo. O ato é válido?", com:"Não. A destituição depende de deliberação da maioria absoluta do Poder Legislativo estadual, na forma da lei complementar (art. 128, § 4º)." },
  { tipo:"caso", enun:"A Defensoria Pública propõe ação civil pública em favor de moradores de uma comunidade. Ela tem legitimidade?", com:"Sim. O STF reconheceu a legitimidade da Defensoria para ação civil pública (ADI 3.943), em coerência com o art. 134 após a EC 80/2014." }],
resumo:[
  "O MP é instituição <b>permanente</b> e essencial à função jurisdicional. Seus princípios são <b>unidade, indivisibilidade e independência funcional</b>.",
  "O PGR é nomeado pelo Presidente, entre integrantes da carreira com mais de 35 anos, após <b>maioria absoluta do Senado</b>, por 2 anos, com recondução permitida.",
  "O PGJ sai de <b>lista tríplice</b>, é nomeado pelo Governador por 2 anos, com <b>uma</b> recondução, e só é destituído por <b>maioria absoluta</b> da Assembleia.",
  "O MP promove <b>privativamente</b> a ação penal pública, exerce o <b>controle externo</b> da polícia e <b>requisita</b> diligências e inquérito.",
  "O MP pode investigar diretamente (<b>Tema 184</b>), com controle judicial. Controle externo não é subordinação.",
  "Garantias do MP: vitaliciedade, inamovibilidade e irredutibilidade de subsídio. Vedações incluem advocacia, atividade político-partidária e quarentena de 3 anos.",
  "O CNMP faz o controle administrativo, financeiro e disciplinar do MP.",
  "AGU: livre nomeação, maior de 35 anos. Procuradores estaduais: concurso com a OAB e estabilidade após 3 anos.",
  "Defensoria: autonomia funcional e administrativa, defesa dos necessitados e legitimidade para ação civil pública."],
checklist:[
  "Princípios institucionais do Ministério Público",
  "Diferenças de escolha, mandato e destituição entre PGR e PGJ",
  "Funções institucionais do art. 129 mais cobradas",
  "Alcance do controle externo da atividade policial",
  "Tese do Tema 184 sobre a investigação pelo MP",
  "Garantias e vedações dos membros do MP",
  "Composição e função do CNMP",
  "Como se escolhe o Advogado-Geral da União",
  "Alcance da inviolabilidade do advogado",
  "Atribuições e autonomia da Defensoria Pública"],
questoes:[]
};

/* ======================= DEFESA DO ESTADO E SEGURANÇA PÚBLICA ======================= */
T.defesa_estado = {
meta:{ tema:"Defesa do Estado e das instituições democráticas (arts. 136 a 144)", atualizado:AT,
  foco:"Estado de defesa e de sítio (pressupostos, prazos, controle, medidas); Forças Armadas, GLO e limites do art. 142 (ADI 6.457); segurança pública: órgãos do art. 144, polícia judiciária × ostensiva, polícias civis e penais, subordinação aos Governadores, guardas municipais (ADPF 995 e Tema 656), ADPF 635, greve vedada (Tema 541) e PEC 18/2025.",
  aviso:"A PEC da Segurança Pública (PEC 18/2025) foi aprovada na Câmara em março de 2026 e seguiu ao Senado. Confira se foi promulgada antes da prova." },
secoes:[
{ id:"excecao", titulo:"Estado de defesa e estado de sítio", curto:"Defesa e sítio",
  rapido:["<b>Estado de defesa</b>: decretado pelo <b>Presidente</b> (ouvidos os Conselhos), em <b>locais restritos e determinados</b>, contra grave e iminente instabilidade institucional ou calamidades de grandes proporções; até <b>30 dias</b>, prorrogável <b>uma vez</b>; Congresso aprecia <b>depois</b> (decreto enviado em 24 h; decide por maioria absoluta em 10 dias).",
    "<b>Estado de sítio</b>: Presidente <b>solicita autorização prévia</b> ao Congresso (maioria absoluta). Hipóteses: comoção grave de repercussão nacional ou ineficácia do estado de defesa (<b>30 dias</b> por vez, prorrogáveis) e guerra ou agressão armada estrangeira (pelo tempo necessário).",
    "No estado de defesa: restrições a <b>reunião</b>, ao sigilo de <b>correspondência e comunicações</b>; ocupação temporária de bens; prisão por crime contra o Estado pelo executor, comunicada ao juiz, por no máximo <b>10 dias</b> salvo autorização judicial; <b>vedada a incomunicabilidade</b> do preso.",
    "No sítio (comoção): obrigação de permanência em localidade, detenção em edifício não destinado a presos comuns, restrições à correspondência, comunicações e imprensa, suspensão da reunião, <b>busca e apreensão em domicílio</b>, intervenção em serviços públicos e requisição de bens."],
  teoria:[
    { h:"Controles", p:[
      "Político (Congresso: prévio no sítio, posterior no defesa; comissão de acompanhamento) e jurisdicional (legalidade dos atos e responsabilização dos executores).",
      "Na vigência de qualquer deles <b>não se emenda a CF</b>. Imunidades parlamentares subsistem no sítio (só suspensas por 2/3 da Casa)."]}],
  quadro:{ titulo:"Defesa × sítio", head:["","Estado de defesa","Estado de sítio"], rows:[
    ["Abrangência","Locais restritos e determinados","Nacional (ou área indicada no decreto)"],
    ["Congresso","Controle posterior (24 h para envio; 10 dias para decidir)","Autorização prévia, por maioria absoluta"],
    ["Prazo","Até 30 dias + 1 prorrogação","30 dias por vez (comoção); toda a guerra"],
    ["Prisão","Executor pode prender por crime contra o Estado (até 10 dias)","Detenção em edifício não destinado a presos comuns"]]},
  pegadinhas:["Defesa: o Presidente decreta e depois submete. Sítio: pede autorização antes.","Busca domiciliar sem ordem judicial só no <b>sítio</b> (comoção)."]},
{ id:"forcas", titulo:"Forças Armadas", curto:"Forças Armadas",
  rapido:["Marinha, Exército e Aeronáutica: instituições <b>nacionais permanentes e regulares</b>, baseadas na <b>hierarquia e disciplina</b>, sob a autoridade suprema do Presidente; destinam-se à defesa da Pátria, à garantia dos Poderes constitucionais e, por iniciativa de qualquer destes, da lei e da ordem (<b>GLO</b>).",
    "Não cabe <b>habeas corpus</b> em relação a punições disciplinares militares — quanto ao <b>mérito</b>; a legalidade (competência, previsão, pena) pode ser examinada.",
    "Militares: proibidas sindicalização e greve; enquanto em serviço ativo, não podem filiar-se a partidos.",
    "ADI 6.457 (2024): o art. 142 <b>não</b> autoriza intervenção militar nem confere às Forças Armadas papel de \"poder moderador\"."],
  teoria:[
    { h:"Serviço militar", p:[
      "Obrigatório nos termos da lei; mulheres e eclesiásticos ficam isentos em tempo de paz, sujeitos a outros encargos.",
      "Escusa de consciência → serviço alternativo (art. 143, §1º)."]}],
  pegadinhas:["HC contra punição disciplinar: cabe para examinar <b>legalidade</b>, não o mérito.","GLO depende de iniciativa de um dos Poderes."]},
{ id:"seguranca", titulo:"Segurança pública (art. 144)", curto:"Art. 144",
  rapido:["Segurança pública: <b>dever do Estado, direito e responsabilidade de todos</b>, para preservar a <b>ordem pública e a incolumidade das pessoas e do patrimônio</b>.",
    "Órgãos (rol taxativo): <b>PF, PRF, polícia ferroviária federal, polícias civis, polícias militares e corpos de bombeiros, polícias penais</b> (federal, estaduais e distrital — EC 104/2019). Estados não podem acrescentar novos órgãos de segurança pública a esse rol.",
    "<b>Polícias civis</b>: dirigidas por <b>delegados de carreira</b>; <b>polícia judiciária</b> e apuração de infrações penais, <b>exceto as militares</b> e ressalvada a competência da União. <b>PMs</b>: <b>polícia ostensiva</b> e preservação da ordem pública. <b>Polícias penais</b>: segurança dos estabelecimentos penais.",
    "PMs e bombeiros (forças auxiliares e reserva do Exército), polícias civis e penais estaduais <b>subordinam-se aos Governadores</b>. <b>Guardas municipais</b>: proteção de bens, serviços e instalações — integram o SUSP (ADPF 995) e podem fazer policiamento ostensivo e comunitário, sem polícia judiciária (Tema 656)."],
  teoria:[
    { h:"Polícia Federal", p:[
      "Apura infrações contra a ordem política e social ou em detrimento de bens, serviços e interesses da União, autarquias e empresas públicas federais, e infrações com repercussão interestadual ou internacional que exijam repressão uniforme (Lei 10.446/2002).",
      "Previne e reprime tráfico de drogas, contrabando e descaminho; polícia marítima, aeroportuária e de fronteiras; <b>exclusividade</b> da polícia judiciária da União.",
      "Sociedade de economia mista federal (ex.: Banco do Brasil) não está no rol: crimes contra ela são da Justiça <b>estadual</b> (Súmula 42/STJ)."]},
    { h:"Investigação e controle", p:[
      "Lei 12.830/2013: a investigação criminal conduzida pelo delegado tem natureza jurídica, essencial e exclusiva de Estado; o indiciamento é ato privativo do delegado, fundamentado.",
      "ADPF 635 (\"ADPF das Favelas\"): o STF fixou parâmetros para operações policiais no RJ (uso proporcional da força, câmeras corporais, ambulâncias, preservação de locais, investigação de mortes pelo MP), com julgamento de mérito em 2025.",
      "Greve: vedada aos policiais civis e a todos os servidores da segurança pública (Tema 541)."]},
    { h:"PEC 18/2025 (em tramitação)", p:[
      "Texto aprovado na Câmara (mar./2026): autoriza <b>polícias municipais</b> de carreira (ostensivo e comunitário), explicita atribuições da PF sobre organizações criminosas e milícias interestaduais e crimes ambientais, e amplia a PRF para ferrovias e hidrovias federais.",
      "<b>Não é texto constitucional vigente</b> enquanto não for aprovada pelo Senado e promulgada."]}],
  pegadinhas:["Polícia civil não apura crimes <b>militares</b>.","Polícia penal entrou no art. 144 pela EC 104/2019.","Guarda municipal pode policiamento ostensivo comunitário, mas não investiga (sem polícia judiciária)."]}
],
lei:[
{ art:"CF, arts. 136 a 139", nome:"Estados de exceção", sec:"excecao", itens:[
  { id:"cf136", rot:"Art. 136, caput e §§1º a 3º (essência)", t:"O Presidente da República pode, ouvidos o Conselho da República e o Conselho de Defesa Nacional, <b class='g1'>decretar estado de defesa</b> para preservar ou prontamente restabelecer, em <b class='g1'>locais restritos e determinados</b>, a ordem pública ou a paz social ameaçadas por grave e iminente instabilidade institucional ou atingidas por calamidades de grandes proporções na natureza.<br>§ 1º O decreto (...) indicará as medidas coercitivas a vigorarem, dentre as seguintes: I - restrições aos direitos de: a) <b class='g1'>reunião</b>, ainda que exercida no seio das associações; b) sigilo de <b class='g1'>correspondência</b>; c) sigilo de <b class='g1'>comunicação telegráfica e telefônica</b>; II - ocupação e uso temporário de bens e serviços públicos, na hipótese de calamidade pública (...).<br>§ 2º O tempo de duração do estado de defesa <b class='g2'>não será superior a trinta dias</b>, podendo ser <b class='g3'>prorrogado uma vez</b>, por igual período, se persistirem as razões que justificaram a sua decretação.<br>§ 3º Na vigência do estado de defesa: I - a prisão por crime contra o Estado, determinada pelo executor da medida, será por este comunicada imediatamente ao juiz competente (...); III - a prisão ou detenção de qualquer pessoa não poderá ser superior a <b class='g2'>dez dias</b>, salvo quando autorizada pelo Poder Judiciário; IV - é <b class='g3'>vedada a incomunicabilidade do preso</b>.", c:["de1","de2"] },
  { id:"cf137", rot:"Arts. 137 e 138 (essência)", t:"Art. 137. O Presidente da República pode, ouvidos o Conselho da República e o Conselho de Defesa Nacional, <b class='g1'>solicitar ao Congresso Nacional autorização</b> para decretar o estado de sítio nos casos de: I - <b class='g1'>comoção grave de repercussão nacional</b> ou ocorrência de fatos que comprovem a <b class='g1'>ineficácia de medida tomada durante o estado de defesa</b>; II - <b class='g1'>declaração de estado de guerra</b> ou resposta a agressão armada estrangeira.<br>Parágrafo único. (...) o Congresso Nacional decidir[á] por <b class='g1'>maioria absoluta</b>.<br>Art. 138, § 1º O estado de sítio, no caso do art. 137, I, não poderá ser decretado por mais de <b class='g2'>trinta dias</b>, nem prorrogado, de cada vez, por prazo superior; no do inciso II, poderá ser decretado por todo o tempo que perdurar a guerra ou a agressão armada estrangeira.", c:["de3","de4"] }]},
{ art:"CF, art. 142", nome:"Forças Armadas", sec:"forcas", itens:[
  { id:"cf142", rot:"Art. 142, caput e §2º", t:"As Forças Armadas, constituídas pela Marinha, pelo Exército e pela Aeronáutica, são instituições <b class='g1'>nacionais permanentes e regulares</b>, organizadas com base na <b class='g1'>hierarquia e na disciplina</b>, sob a autoridade suprema do Presidente da República, e destinam-se à defesa da Pátria, à garantia dos poderes constitucionais e, <b class='g3'>por iniciativa de qualquer destes</b>, da lei e da ordem.<br>(...)<br>§ 2º <b class='g3'>Não caberá habeas corpus em relação a punições disciplinares militares</b>.", c:["de5","de6"], j:["stf-adi6457"] }]},
{ art:"CF, art. 144", nome:"Segurança pública", sec:"seguranca", itens:[
  { id:"cf144c", rot:"Art. 144, caput", t:"A segurança pública, <b class='g1'>dever do Estado, direito e responsabilidade de todos</b>, é exercida para a preservação da <b class='g1'>ordem pública e da incolumidade das pessoas e do patrimônio</b>, através dos seguintes órgãos:<br>I - polícia federal;<br>II - polícia rodoviária federal;<br>III - polícia ferroviária federal;<br>IV - <b class='g1'>polícias civis</b>;<br>V - polícias militares e corpos de bombeiros militares;<br>VI - <b class='g1'>polícias penais federal, estaduais e distrital</b>.", nota:"Inciso VI incluído pela EC 104/2019.", c:["de7","de8"] },
  { id:"cf144p1", rot:"Art. 144, §1º", t:"A polícia federal, instituída por lei como órgão permanente, organizado e mantido pela União e estruturado em carreira, destina-se a:<br>I - apurar infrações penais contra a ordem política e social ou em detrimento de bens, serviços e interesses da União ou de suas entidades autárquicas e empresas públicas, assim como outras infrações cuja prática tenha <b class='g1'>repercussão interestadual ou internacional e exija repressão uniforme</b>, segundo se dispuser em lei;<br>II - prevenir e reprimir o <b class='g1'>tráfico ilícito de entorpecentes</b> e drogas afins, o <b class='g1'>contrabando e o descaminho</b>, sem prejuízo da ação fazendária e de outros órgãos públicos nas respectivas áreas de competência;<br>III - exercer as funções de polícia marítima, aeroportuária e de fronteiras;<br>IV - exercer, <b class='g3'>com exclusividade</b>, as funções de <b class='g1'>polícia judiciária da União</b>.", c:["de9"] },
  { id:"cf144p4", rot:"Art. 144, §§4º a 6º", t:"§ 4º Às <b class='g1'>polícias civis</b>, dirigidas por <b class='g1'>delegados de polícia de carreira</b>, incumbem, <b class='g3'>ressalvada a competência da União</b>, as funções de <b class='g1'>polícia judiciária e a apuração de infrações penais</b>, <b class='g3'>exceto as militares</b>.<br>§ 5º Às <b class='g1'>polícias militares</b> cabem a <b class='g1'>polícia ostensiva e a preservação da ordem pública</b>; aos corpos de bombeiros militares, além das atribuições definidas em lei, incumbe a execução de atividades de defesa civil.<br>§ 5º-A. Às <b class='g1'>polícias penais</b>, vinculadas ao órgão administrador do sistema penal da unidade federativa a que pertencem, cabe a <b class='g1'>segurança dos estabelecimentos penais</b>.<br>§ 6º As polícias militares e os corpos de bombeiros militares, forças auxiliares e reserva do Exército, subordinam-se, juntamente com as polícias civis e as polícias penais estaduais e distrital, aos <b class='g1'>Governadores</b> dos Estados, do Distrito Federal e dos Territórios.", c:["de10","de11","de12"], j:["stf-t541b"] },
  { id:"cf144p8", rot:"Art. 144, §§7º e 8º", t:"§ 7º A lei disciplinará a organização e o funcionamento dos órgãos responsáveis pela segurança pública, de maneira a garantir a eficiência de suas atividades.<br>§ 8º Os Municípios poderão constituir <b class='g1'>guardas municipais</b> destinadas à <b class='g1'>proteção de seus bens, serviços e instalações</b>, conforme dispuser a lei.", nota:"§7º regulamentado pela Lei 13.675/2018 (SUSP). Guardas: Lei 13.022/2014 (Estatuto Geral).", c:["de13"], j:["stf-adpf995","stf-t656"] }]}
],
juris:[
{ id:"stf-adi6457", trib:"STF", tipo:"ADI", num:"ADI 6.457", sec:"forcas", status:"vigente", data:"04/2024",
  titulo:"Art. 142 não autoriza intervenção militar",
  texto:"A missão institucional das Forças Armadas na defesa da Pátria, na garantia dos poderes constitucionais e na garantia da lei e da ordem não acomoda o exercício de poder moderador entre os Poderes Executivo, Legislativo e Judiciário.",
  explica:"A GLO é excepcional, temporária e depende de iniciativa de um dos Poderes, sempre sob a Constituição.", lei:["cf142"], fonte:STFJ },
{ id:"stf-adpf995", trib:"STF", tipo:"ADPF", num:"ADPF 995", sec:"seguranca", status:"vigente", data:"28/08/2023",
  titulo:"Guardas municipais integram o Sistema de Segurança Pública",
  texto:"São inconstitucionais todas as interpretações judiciais que excluam as Guardas Municipais, devidamente criadas e instituídas, como integrantes do Sistema de Segurança Pública.",
  explica:"Base para o Tema 656, que admitiu policiamento ostensivo e comunitário pelas guardas.", lei:["cf144p8"], fonte:STFJ },
{ id:"stf-t656", trib:"STF", tipo:"Repercussão geral", num:"RE 608.588 (Tema 656)", sec:"seguranca", status:"vigente", data:"20/02/2025",
  titulo:"Guardas municipais e policiamento ostensivo",
  texto:"É constitucional, no âmbito dos municípios, o exercício de ações de segurança urbana pelas guardas municipais, inclusive o policiamento ostensivo comunitário, respeitadas as atribuições dos demais órgãos de segurança pública previstas no artigo 144 da Constituição Federal e excluída qualquer atividade de polícia judiciária, sendo submetidas ao controle externo da atividade policial pelo Ministério Público, nos termos do artigo 129, VII, da Constituição Federal. Conforme o artigo 144, §8º, da Constituição Federal, as leis municipais devem observar normas gerais fixadas pelo Congresso Nacional.",
  explica:"Guarda não faz investigação criminal nem lavra inquérito; submete-se ao controle externo do MP.", lei:["cf144p8"], fonte:STFRG },
{ id:"stf-t541b", trib:"STF", tipo:"Repercussão geral", num:"ARE 654.432 (Tema 541)", sec:"seguranca", status:"vigente", data:"05/04/2017",
  titulo:"Policiais civis não podem fazer greve",
  texto:"O exercício do direito de greve, sob qualquer forma ou modalidade, é vedado aos policiais civis e a todos os servidores públicos que atuem diretamente na área de segurança pública.",
  explica:"Em contrapartida, o Poder Público deve participar de mediação instaurada pelas entidades da categoria.", lei:["cf144p4"], fonte:STFRG },
{ id:"pec18", trib:"Congresso", tipo:"PEC", num:"PEC 18/2025", sec:"seguranca", status:"pendente", data:"aprovada na Câmara em 04/03/2026",
  titulo:"PEC da Segurança Pública",
  texto:"Prevê polícias municipais de carreira, reforço das atribuições da PF contra organizações criminosas e milícias interestaduais e ampliação da PRF para ferrovias e hidrovias federais.",
  explica:"Pendente no Senado na última conferência. Não estude como texto vigente.", lei:["cf144c"], fonte:CAM }
],
cards:[
{ id:"de1", tipo:"caso", sec:"excecao", f:"Enchentes devastam três municípios. O Presidente pode decretar estado de defesa sem autorização prévia do Congresso?", v:"<b>Sim.</b> Decreta (ouvidos os Conselhos) e submete ao Congresso em 24 h, que decide por maioria absoluta em 10 dias.", lei:["cf136"] },
{ id:"de2", tipo:"caso", sec:"excecao", f:"Durante o estado de defesa, o executor prende alguém por crime contra o Estado e o mantém incomunicável por 15 dias. Erros?", v:"Prisão acima de <b>10 dias</b> só com autorização judicial; <b>incomunicabilidade vedada</b>.", lei:["cf136"] },
{ id:"de3", tipo:"distincao", sec:"excecao", f:"Controle do Congresso: defesa × sítio.", v:"<b>Defesa</b>: posterior. <b>Sítio</b>: autorização <b>prévia</b> por maioria absoluta.", lei:["cf137"] },
{ id:"de4", tipo:"numero", sec:"excecao", f:"Prazo do estado de sítio por comoção grave.", v:"Até <b>30 dias</b> por vez, prorrogável sucessivamente por até 30 dias cada.", lei:["cf137"] },
{ id:"de5", tipo:"caso", sec:"forcas", f:"Soldado punido com prisão disciplinar por autoridade incompetente impetra HC. Cabe?", v:"<b>Sim</b>, para exame da <b>legalidade</b> (competência); o mérito da punição não é revisto.", lei:["cf142"] },
{ id:"de6", tipo:"ce", sec:"forcas", f:"Certo ou errado: o art. 142 autoriza as Forças Armadas a atuar como poder moderador em conflito entre os Poderes.", v:"<b>Errado</b> (ADI 6.457).", lei:["cf142"], j:["stf-adi6457"] },
{ id:"de7", tipo:"caso", sec:"seguranca", f:"Estado cria, por emenda à sua Constituição, um novo órgão de segurança pública fora do art. 144. Válido?", v:"<b>Não.</b> O rol do art. 144 é <b>taxativo</b> para os entes.", lei:["cf144c"] },
{ id:"de8", tipo:"ce", sec:"seguranca", f:"Certo ou errado: as polícias penais estaduais integram o rol do art. 144.", v:"<b>Certo</b> (inciso VI, EC 104/2019).", lei:["cf144c"] },
{ id:"de9", tipo:"caso", sec:"seguranca", f:"Roubo a agência do Banco do Brasil (sociedade de economia mista). Polícia e Justiça competentes?", v:"<b>Polícia Civil</b> e <b>Justiça estadual</b> (Súmula 42/STJ) — SEM federal não está no art. 144, §1º, I.", lei:["cf144p1"] },
{ id:"de10", tipo:"caso", sec:"seguranca", f:"Policial militar comete crime militar em serviço. A Polícia Civil instaura inquérito?", v:"<b>Não</b>: as polícias civis apuram infrações penais <b>exceto as militares</b> (IPM pela própria corporação).", lei:["cf144p4"] },
{ id:"de11", tipo:"distincao", sec:"seguranca", f:"Polícia judiciária × polícia ostensiva.", v:"<b>Judiciária</b> (PC, PF): apura infrações e auxilia o Judiciário. <b>Ostensiva</b> (PM): prevenção, presença fardada, preservação da ordem pública.", lei:["cf144p4"] },
{ id:"de12", tipo:"caso", sec:"seguranca", f:"A quem se subordina a Polícia Civil da Bahia?", v:"Ao <b>Governador</b> do Estado (art. 144, §6º).", lei:["cf144p4"], j:["stf-t541b"] },
{ id:"de13", tipo:"caso", sec:"seguranca", f:"Guarda municipal faz patrulhamento ostensivo nas praças e prende em flagrante um assaltante. Pode? E pode instaurar investigação?", v:"Patrulhamento e flagrante: <b>sim</b> (Tema 656; qualquer do povo pode prender em flagrante). Investigação: <b>não</b> — sem polícia judiciária.", lei:["cf144p8"], j:["stf-t656","stf-adpf995"] }
],
importancia:{ nivel:5,
  texto:"O art. 144 é o coração das carreiras policiais e cai em quase toda prova. Estado de defesa e de sítio aparecem como comparação de prazos e controle do Congresso.",
  decore:[
    ["Estado de defesa","até <b>30 dias</b>, prorrogável <b>uma vez</b>; locais restritos e determinados"],
    ["Controle no estado de defesa","decreto ao Congresso em <b>24 h</b>; decisão em <b>10 dias</b>, maioria absoluta"],
    ["Prisão no estado de defesa","máximo de <b>10 dias</b>, salvo autorização judicial; <b>incomunicabilidade vedada</b>"],
    ["Estado de sítio","<b>autorização prévia</b> do Congresso, maioria absoluta"],
    ["Sítio por comoção grave","<b>30 dias</b> por vez, prorrogável de cada vez por prazo não superior"],
    ["Sítio por guerra ou agressão estrangeira","todo o tempo que durar"],
    ["Órgãos do art. 144","<b>6</b>: PF, PRF, polícia ferroviária federal, polícias civis, PMs e bombeiros, polícias penais"],
    ["Polícia penal","entrou pela <b>EC 104/2019</b> (inciso VI e § 5º-A)"],
    ["Subordinação","PMs, bombeiros, polícias civis e penais estaduais aos <b>Governadores</b>"],
    ["Greve","<b>vedada</b> aos policiais civis e à segurança pública (Tema 541)"]],
  macetes:[
    ["Defesa decreta e depois explica; sítio pede antes","No estado de defesa o Presidente decreta e submete ao Congresso. No de sítio, solicita autorização prévia."],
    ["Defesa é local, sítio é grave","Defesa: locais restritos e determinados. Sítio: comoção grave de repercussão nacional ou guerra."],
    ["Judiciária investiga, ostensiva previne","Polícia civil e PF: polícia judiciária. PM: polícia ostensiva e preservação da ordem pública."],
    ["Civil não apura crime militar","A competência da polícia civil exclui as infrações militares e ressalva a competência da União."]] },
comparativo:{ titulo:"Estado de defesa × estado de sítio", head:["Estado de defesa","Estado de sítio"], rows:[
  ["<b>Abrangência:</b> locais restritos e determinados","<b>Abrangência:</b> área indicada no decreto, com repercussão nacional ou guerra"],
  ["<b>Pressuposto:</b> grave e iminente instabilidade institucional ou calamidade de grandes proporções","<b>Pressuposto:</b> comoção grave de repercussão nacional, ineficácia do estado de defesa, guerra ou agressão armada estrangeira"],
  ["<b>Congresso:</b> controle posterior (24 h para enviar, 10 dias para decidir)","<b>Congresso:</b> autorização prévia, por maioria absoluta"],
  ["<b>Prazo:</b> até 30 dias, prorrogável uma vez","<b>Prazo:</b> 30 dias por vez na comoção; todo o tempo da guerra"],
  ["<b>Prisão:</b> pelo executor, por crime contra o Estado, até 10 dias sem ordem judicial","<b>Prisão:</b> detenção em edifício não destinado a presos comuns"],
  ["<b>Domicílio:</b> a busca depende de ordem judicial","<b>Domicílio:</b> a busca e apreensão sem ordem é possível no sítio por comoção"]]},
prova:[
  { tipo:"ce", enun:"O estado de defesa pode ser decretado pelo Presidente da República, ouvidos os Conselhos da República e de Defesa Nacional, em locais restritos e determinados, sem prévia autorização do Congresso Nacional.", gab:"Certo", com:"No estado de defesa o controle do Congresso é posterior. No estado de sítio a autorização é prévia." },
  { tipo:"ce", enun:"Durante o estado de defesa, a prisão determinada pelo executor da medida pode ultrapassar dez dias independentemente de autorização judicial.", gab:"Errado", com:"O limite de 10 dias só pode ser superado com autorização do Poder Judiciário, e a incomunicabilidade do preso é vedada." },
  { tipo:"ce", enun:"As polícias civis, dirigidas por delegados de carreira, exercem a função de polícia judiciária e apuram infrações penais, inclusive as militares.", gab:"Errado", com:"Art. 144, § 4º: as infrações militares são exceção, e também fica ressalvada a competência da União." },
  { tipo:"ce", enun:"As polícias penais, incluídas no art. 144 pela EC 104/2019, são responsáveis pela segurança dos estabelecimentos penais.", gab:"Certo", com:"Art. 144, § 5º-A: vinculadas ao órgão administrador do sistema penal do ente federativo." },
  { tipo:"caso", enun:"Um Estado-membro deseja criar, por emenda à sua Constituição, um novo órgão de segurança pública não previsto no art. 144. A medida é válida?", com:"Não. O rol do art. 144 é taxativo, e os entes federados não podem acrescentar outros órgãos de segurança pública." },
  { tipo:"caso", enun:"Uma guarda municipal faz patrulhamento ostensivo comunitário e prende em flagrante um assaltante. Pode também instaurar inquérito policial?", com:"O patrulhamento é admitido (Tema 656) e o flagrante pode ser feito por qualquer pessoa. Inquérito, não: a guarda está excluída de qualquer atividade de polícia judiciária e se sujeita ao controle externo do MP." }],
resumo:[
  "<b>Estado de defesa</b>: decretado pelo Presidente, em locais restritos, por até <b>30 dias</b> prorrogáveis <b>uma vez</b>. O Congresso controla depois.",
  "<b>Estado de sítio</b>: exige <b>autorização prévia</b> do Congresso por maioria absoluta. Hipóteses: comoção grave ou ineficácia do estado de defesa; guerra ou agressão armada estrangeira.",
  "Na vigência de ambos <b>não se emenda a Constituição</b>. No estado de defesa a prisão sem ordem judicial vai até 10 dias e a incomunicabilidade é vedada.",
  "As Forças Armadas são instituições nacionais permanentes e regulares, baseadas em hierarquia e disciplina. O art. 142 <b>não</b> autoriza intervenção militar (ADI 6.457).",
  "Não cabe <b>habeas corpus</b> contra punição disciplinar militar quanto ao mérito; a legalidade pode ser examinada.",
  "O art. 144 tem <b>seis</b> órgãos, em rol taxativo, incluindo as <b>polícias penais</b> (EC 104/2019).",
  "Polícia civil: polícia judiciária, dirigida por <b>delegado de carreira</b>, exceto infrações militares. PM: polícia <b>ostensiva</b> e ordem pública.",
  "PMs, bombeiros, polícias civis e polícias penais estaduais subordinam-se ao <b>Governador</b>. Guardas municipais não têm polícia judiciária.",
  "A greve é vedada aos policiais civis (Tema 541). A PEC 18/2025 ainda <b>não</b> é texto vigente."],
checklist:[
  "Pressupostos, prazos e controle do estado de defesa",
  "Pressupostos, prazos e controle do estado de sítio",
  "Medidas permitidas em cada estado de exceção",
  "O que o art. 142 autoriza e o que não autoriza (ADI 6.457)",
  "Quais são os seis órgãos do art. 144 e por que o rol é taxativo",
  "Diferença entre polícia judiciária e polícia ostensiva",
  "Atribuições da Polícia Federal e sua exclusividade",
  "Limites das guardas municipais (ADPF 995 e Tema 656)",
  "A quem se subordinam as polícias estaduais",
  "Por que a PEC 18/2025 não é texto vigente"],
questoes:[]
};

})();
