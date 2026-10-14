/* Direito Constitucional (II): direitos sociais; nacionalidade; direitos políticos; partidos políticos.
   Conferido em 14/10/2026. Texto: CF/88 (Planalto), com EC 90/2015, EC 97/2017, EC 111/2021, EC 114/2021, EC 117/2022,
   EC 131/2023 (perda da nacionalidade) e EC 133/2024 (recursos para candidaturas de pessoas pretas e pardas). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var STFSV = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26";
var STFRG = "https://portal.stf.jus.br/jurisprudenciaRepercussao/pesquisarProcesso.asp";
var EC131 = "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc131.htm";
var EC133 = "https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc133.htm";
var LC219 = "https://www.planalto.gov.br/ccivil_03/leis/lcp/";

/* ======================= DIREITOS SOCIAIS ======================= */
T.direitos_sociais = {
meta:{ tema:"Direitos sociais (arts. 6º a 11)", atualizado:AT,
  foco:"Rol do art. 6º e renda básica familiar (EC 114/2021); mínimo existencial × reserva do possível; principais incisos do art. 7º; domésticos; liberdade e unicidade sindical; greve no setor privado, no serviço público (Tema 531) e vedação às carreiras policiais (Tema 541)." },
secoes:[
{ id:"rol", titulo:"Rol do art. 6º e efetivação", curto:"Art. 6º",
  rapido:["Direitos sociais: <b>educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e à infância, assistência aos desamparados</b>.",
    "Inclusões por emenda: <b>moradia</b> (EC 26/2000), <b>alimentação</b> (EC 64/2010), <b>transporte</b> (EC 90/2015). Parágrafo único (EC 114/2021): <b>renda básica familiar</b> a todo brasileiro em situação de vulnerabilidade, em programa permanente de transferência de renda.",
    "São direitos de <b>2ª dimensão</b> (prestações positivas). Limites: <b>reserva do possível</b> (recursos finitos) × <b>mínimo existencial</b> (núcleo que o Estado não pode negar).",
    "Vedação do <b>retrocesso social</b>: conquistas já concretizadas não podem ser simplesmente suprimidas sem compensação."],
  teoria:[
    { h:"Controle judicial de políticas públicas", p:[
      "O Judiciário pode determinar a implementação de políticas públicas essenciais quando a omissão estatal compromete o mínimo existencial, sem violar a separação de Poderes (ex.: vagas em creche — RE 1.008.166, Tema 548).",
      "A reserva do possível só afasta o dever estatal se o Poder Público <b>comprovar</b> a impossibilidade financeira, não bastando alegá-la."]}],
  pegadinhas:["\"Segurança\" do art. 6º é direito social; segurança pública está no art. 144.","Renda básica familiar está no parágrafo único do art. 6º (EC 114), não no art. 203."]},
{ id:"trabalho", titulo:"Direitos dos trabalhadores (art. 7º)", curto:"Art. 7º",
  rapido:["Jornada: até <b>8 h diárias e 44 semanais</b>, com compensação e redução por acordo ou convenção coletiva; <b>turnos ininterruptos de revezamento: 6 h</b>, salvo negociação coletiva.",
    "Hora extra: no mínimo <b>50%</b> acima da normal. Férias anuais com, pelo menos, <b>1/3</b> a mais. Licença à gestante: <b>120 dias</b>.",
    "Salário mínimo: fixado em lei, nacionalmente unificado, <b>vedada a vinculação para qualquer fim</b> (SV 4). Irredutibilidade do salário, <b>salvo convenção ou acordo coletivo</b>.",
    "Menores: proibido trabalho <b>noturno, perigoso ou insalubre</b> a menores de 18 e <b>qualquer trabalho</b> a menores de 16, <b>salvo aprendiz a partir de 14</b>. Prescrição: <b>5 anos</b>, até o limite de <b>2 anos</b> após a extinção do contrato."],
  teoria:[
    { h:"Domésticos e servidores", p:[
      "Domésticos: a EC 72/2013 estendeu grande parte dos direitos do art. 7º (parágrafo único), alguns dependentes de regulamentação (LC 150/2015).",
      "Servidores públicos: o art. 39, §3º, manda aplicar alguns incisos do art. 7º (salário mínimo, 13º, férias com 1/3, licença à gestante e paternidade, entre outros)."]}],
  pegadinhas:["Irredutibilidade salarial admite redução por <b>negociação coletiva</b>.","Aprendiz: a partir de <b>14</b>; qualquer outro trabalho: a partir de 16; noturno/perigoso/insalubre: só após 18."]},
{ id:"sindical", titulo:"Liberdade sindical e greve (arts. 8º e 9º)", curto:"Sindicato e greve",
  rapido:["Fundar sindicato <b>não depende de autorização</b> do Estado, ressalvado o <b>registro</b> no órgão competente; vedadas a interferência e a intervenção.",
    "<b>Unicidade sindical</b>: uma só organização por categoria na mesma base territorial, <b>não inferior a um Município</b>.",
    "Ninguém é obrigado a filiar-se ou manter-se filiado. Contribuição <b>confederativa</b>: só dos <b>filiados</b> (SV 40). <b>Estabilidade</b> do dirigente: do registro da candidatura até <b>1 ano após o mandato</b>, inclusive suplente, salvo falta grave.",
    "Greve: assegurada aos trabalhadores (art. 9º). Servidor civil: nos termos de <b>lei específica</b> (art. 37, VII) — até hoje aplicada a Lei 7.783/1989 por força dos mandados de injunção. <b>Militares: vedadas greve e sindicalização</b> (art. 142, §3º, IV). Policiais civis e demais servidores da <b>segurança pública: vedada</b> (Tema 541)."],
  teoria:[
    { h:"Greve no serviço público", p:[
      "Tema 531: a Administração <b>deve descontar</b> os dias parados, permitida a compensação por acordo; não desconta se a greve foi provocada por conduta ilícita do Poder Público.",
      "Tema 541: proibição absoluta de greve aos policiais civis e servidores que atuam diretamente na segurança pública; em contrapartida, é obrigatória a participação do Poder Público em mediação instaurada pelas entidades de classe.",
      "Competência: a abusividade de greve de servidores da administração direta, autarquias e fundações públicas — <b>inclusive celetistas</b> — é julgada pela <b>Justiça comum</b> (Tema 544)."]}],
  pegadinhas:["Sindicato precisa de <b>registro</b>, não de autorização.","Unicidade: base mínima = <b>um Município</b>.","Polícia civil <b>não</b> pode fazer greve (Tema 541)."]}
],
lei:[
{ art:"CF, art. 6º", nome:"Direitos sociais", sec:"rol", itens:[
  { id:"cf6", rot:"Art. 6º", t:"São direitos sociais a <b class='g1'>educação, a saúde, a alimentação, o trabalho, a moradia, o transporte, o lazer, a segurança, a previdência social, a proteção à maternidade e à infância, a assistência aos desamparados</b>, na forma desta Constituição.<br>Parágrafo único. Todo brasileiro em <b class='g3'>situação de vulnerabilidade social</b> terá direito a uma <b class='g1'>renda básica familiar</b>, garantida pelo poder público em programa permanente de transferência de renda, cujas normas e requisitos de acesso serão determinados em lei, observada a legislação fiscal e orçamentária.", nota:"Parágrafo único incluído pela EC 114/2021.", c:["ds1","ds2"] }]},
{ art:"CF, art. 7º", nome:"Direitos dos trabalhadores (seleção)", sec:"trabalho", itens:[
  { id:"cf7", rot:"Art. 7º, IV, VI, XIII, XIV, XVI, XVII, XVIII, XXIX e XXXIII", t:"IV - <b class='g1'>salário mínimo</b>, fixado em lei, nacionalmente unificado, capaz de atender a suas necessidades vitais básicas e às de sua família (...), sendo <b class='g3'>vedada sua vinculação para qualquer fim</b>;<br>VI - <b class='g1'>irredutibilidade do salário</b>, <b class='g3'>salvo o disposto em convenção ou acordo coletivo</b>;<br>XIII - duração do trabalho normal não superior a <b class='g2'>oito horas diárias e quarenta e quatro semanais</b>, facultada a compensação de horários e a redução da jornada, mediante acordo ou convenção coletiva de trabalho;<br>XIV - jornada de <b class='g2'>seis horas</b> para o trabalho realizado em <b class='g1'>turnos ininterruptos de revezamento</b>, salvo negociação coletiva;<br>XVI - remuneração do serviço extraordinário superior, no mínimo, em <b class='g2'>cinqüenta por cento</b> à do normal;<br>XVII - gozo de férias anuais remuneradas com, pelo menos, <b class='g2'>um terço</b> a mais do que o salário normal;<br>XVIII - licença à gestante, sem prejuízo do emprego e do salário, com a duração de <b class='g2'>cento e vinte dias</b>;<br>XXIX - ação, quanto aos créditos resultantes das relações de trabalho, com prazo prescricional de <b class='g2'>cinco anos</b> para os trabalhadores urbanos e rurais, até o limite de <b class='g2'>dois anos após a extinção do contrato</b> de trabalho;<br>XXXIII - proibição de trabalho <b class='g1'>noturno, perigoso ou insalubre a menores de dezoito</b> e de qualquer trabalho a <b class='g1'>menores de dezesseis anos</b>, <b class='g3'>salvo na condição de aprendiz, a partir de quatorze anos</b>;", c:["ds3","ds4","ds5"] }]},
{ art:"CF, arts. 8º e 9º; 37, VII; 142, §3º, IV", nome:"Sindicato e greve", sec:"sindical", itens:[
  { id:"cf8", rot:"Art. 8º, I, II, IV, V e VIII", t:"I - a lei não poderá exigir autorização do Estado para a fundação de sindicato, <b class='g3'>ressalvado o registro no órgão competente</b>, vedadas ao Poder Público a interferência e a intervenção na organização sindical;<br>II - é vedada a criação de <b class='g1'>mais de uma organização sindical</b>, em qualquer grau, representativa de categoria profissional ou econômica, <b class='g1'>na mesma base territorial</b>, que será definida pelos trabalhadores ou empregadores interessados, <b class='g3'>não podendo ser inferior à área de um Município</b>;<br>(...)<br>V - ninguém será obrigado a filiar-se ou a manter-se filiado a sindicato;<br>(...)<br>VIII - é vedada a dispensa do empregado sindicalizado a partir do <b class='g1'>registro da candidatura</b> a cargo de direção ou representação sindical e, se eleito, <b class='g3'>ainda que suplente</b>, até <b class='g2'>um ano após o final do mandato</b>, salvo se cometer falta grave nos termos da lei.", c:["ds6","ds7"], j:["stf-sv40"] },
  { id:"cf9", rot:"Art. 9º; art. 37, VII; art. 142, §3º, IV", t:"Art. 9º É assegurado o <b class='g1'>direito de greve</b>, competindo aos trabalhadores decidir sobre a oportunidade de exercê-lo e sobre os interesses que devam por meio dele defender.<br>§ 1º A lei definirá os <b class='g1'>serviços ou atividades essenciais</b> e disporá sobre o atendimento das necessidades inadiáveis da comunidade.<br>§ 2º Os abusos cometidos sujeitam os responsáveis às penas da lei.<br>Art. 37, VII - o direito de greve [do servidor público] será exercido <b class='g1'>nos termos e nos limites definidos em lei específica</b>;<br>Art. 142, §3º, IV - ao militar são <b class='g3'>proibidas a sindicalização e a greve</b>;", c:["ds8","ds9","ds10"], j:["stf-t531","stf-t541"] }]}
],
juris:[
{ id:"stf-t541", trib:"STF", tipo:"Repercussão geral", num:"ARE 654.432 (Tema 541)", sec:"sindical", status:"vigente", data:"05/04/2017",
  titulo:"Vedação de greve aos policiais civis",
  texto:"1 - O exercício do direito de greve, sob qualquer forma ou modalidade, é vedado aos policiais civis e a todos os servidores públicos que atuem diretamente na área de segurança pública. 2 - É obrigatória a participação do Poder Público em mediação instaurada pelos órgãos classistas das carreiras de segurança pública, nos termos do art. 165 do CPC, para vocalização dos interesses da categoria.",
  explica:"Tema central para PC-BA e PC-PE: a vedação vale para a polícia civil, embora a CF só a escreva para os militares.", lei:["cf9"], fonte:STFRG },
{ id:"stf-t531", trib:"STF", tipo:"Repercussão geral", num:"RE 693.456 (Tema 531)", sec:"sindical", status:"vigente", data:"27/10/2016",
  titulo:"Desconto dos dias parados na greve de servidores",
  texto:"A administração pública deve proceder ao desconto dos dias de paralisação decorrentes do exercício do direito de greve pelos servidores públicos, em virtude da suspensão do vínculo funcional que dela decorre, permitida a compensação em caso de acordo. O desconto será, contudo, incabível se ficar demonstrado que a greve foi provocada por conduta ilícita do Poder Público.",
  explica:"Regra: desconta. Exceções: acordo de compensação ou greve causada por ilicitude da Administração (ex.: atraso salarial).", lei:["cf9"], fonte:STFRG },
{ id:"stf-sv40", trib:"STF", tipo:"Súmula Vinculante", num:"SV 40", sec:"sindical", status:"vigente", data:"11/03/2015",
  titulo:"Contribuição confederativa só dos filiados",
  texto:"A contribuição confederativa de que trata o art. 8º, IV, da Constituição Federal, só é exigível dos filiados ao sindicato respectivo.",
  explica:"Não tem natureza tributária. A contribuição sindical (\"imposto sindical\") deixou de ser obrigatória com a Reforma Trabalhista (ADI 5.794).", lei:["cf8"], fonte:STFSV }
],
cards:[
{ id:"ds1", tipo:"caso", sec:"rol", f:"Transporte é direito social expresso na CF?", v:"<b>Sim</b>, desde a EC 90/2015 (art. 6º).", lei:["cf6"] },
{ id:"ds2", tipo:"distincao", sec:"rol", f:"Reserva do possível × mínimo existencial.", v:"<b>Reserva do possível</b>: limite financeiro real, que o Estado deve <b>provar</b>. <b>Mínimo existencial</b>: núcleo de prestações que não pode ser negado.", lei:["cf6"] },
{ id:"ds3", tipo:"numero", sec:"trabalho", f:"Jornada normal, turnos ininterruptos, hora extra e férias.", v:"<b>8 h/44 h</b>; turnos ininterruptos <b>6 h</b>; hora extra <b>+50%</b>; férias <b>+1/3</b>.", lei:["cf7"] },
{ id:"ds4", tipo:"caso", sec:"trabalho", f:"Adolescente de 15 anos pode trabalhar?", v:"Só como <b>aprendiz</b> (a partir de 14). Fora disso, só a partir de 16; noturno, perigoso ou insalubre, só com 18.", lei:["cf7"] },
{ id:"ds5", tipo:"numero", sec:"trabalho", f:"Prescrição trabalhista.", v:"<b>5 anos</b>, até o limite de <b>2 anos após a extinção</b> do contrato.", lei:["cf7"] },
{ id:"ds6", tipo:"caso", sec:"sindical", f:"Já existe sindicato de bancários no Município X. Pode-se criar outro, da mesma categoria, no mesmo Município?", v:"<b>Não</b> — unicidade sindical; base territorial mínima de um Município.", lei:["cf8"] },
{ id:"ds7", tipo:"caso", sec:"sindical", f:"Suplente eleito para a direção do sindicato tem estabilidade?", v:"<b>Sim</b>: do registro da candidatura até <b>1 ano após o fim do mandato</b>, salvo falta grave.", lei:["cf8"] },
{ id:"ds8", tipo:"caso", sec:"sindical", f:"Delegados e agentes da Polícia Civil decidem cruzar os braços por reajuste. Podem?", v:"<b>Não.</b> Greve vedada aos policiais civis e servidores da segurança pública (Tema 541). Cabe mediação obrigatória.", lei:["cf9"], j:["stf-t541"] },
{ id:"ds9", tipo:"caso", sec:"sindical", f:"Servidores fazem greve legítima por reajuste. A Administração pode descontar os dias?", v:"<b>Deve descontar</b>, salvo acordo de compensação ou greve causada por conduta ilícita do Poder Público (Tema 531).", lei:["cf9"], j:["stf-t531"] },
{ id:"ds10", tipo:"ce", sec:"sindical", f:"Certo ou errado: ao militar é assegurada a sindicalização, vedada apenas a greve.", v:"<b>Errado.</b> São proibidas a <b>sindicalização e a greve</b> (art. 142, §3º, IV).", lei:["cf9"] }
],
questoes:[]
};

/* ======================= NACIONALIDADE ======================= */
T.nacionalidade = {
meta:{ tema:"Nacionalidade (arts. 12 e 13)", atualizado:AT,
  foco:"Natos (ius soli, ius sanguinis + serviço, registro ou opção); adoção no exterior (Tema 1.253, 2026); naturalização ordinária e extraordinária; quase-nacionalidade dos portugueses; distinções entre natos e naturalizados (cargos, extradição, Conselho da República, empresas jornalísticas); perda após a EC 131/2023." },
secoes:[
{ id:"natos", titulo:"Brasileiros natos", curto:"Natos",
  rapido:["<b>a) Ius soli</b>: nascidos no Brasil, ainda que de pais estrangeiros, <b>desde que estes não estejam a serviço de seu país</b>.",
    "<b>b) Ius sanguinis + serviço</b>: nascidos no estrangeiro de pai ou mãe brasileiros, desde que <b>qualquer deles esteja a serviço do Brasil</b>.",
    "<b>c) Ius sanguinis + registro ou opção</b>: nascidos no estrangeiro de pai ou mãe brasileiros, <b>registrados em repartição brasileira competente</b> ou que venham a <b>residir no Brasil e optem</b>, em qualquer tempo, depois da maioridade.",
    "STF, Tema 1.253 (2026): é brasileiro <b>nato</b> o nascido no exterior <b>adotado por brasileiro</b> e registrado em órgão consular (art. 12, I, c, com a igualdade entre filhos do art. 227, §6º)."],
  teoria:[
    { h:"Detalhes", p:[
      "A exceção exige que o pai ou a mãe estrangeiro esteja a serviço do <b>seu próprio país</b> — filho de diplomata estrangeiro nascido aqui não é brasileiro; se estiver a serviço de um terceiro país, prevalece o ius soli.",
      "\"A serviço do Brasil\" abrange administração direta e indireta de qualquer ente federativo.",
      "Opção: é ato personalíssimo, só após os 18 anos, perante a Justiça Federal; antes disso, a criança residente aqui é brasileira nata sob condição suspensiva."]}],
  pegadinhas:["Filho de diplomata estrangeiro nascido no Brasil: <b>não</b> é brasileiro nato.","A opção só pode ser feita depois da maioridade, mas \"em qualquer tempo\"."]},
{ id:"naturalizados", titulo:"Naturalização e quase-nacionalidade", curto:"Naturalizados",
  rapido:["<b>Ordinária</b>: na forma da lei (Lei de Migração); originários de países de <b>língua portuguesa</b>: só <b>1 ano ininterrupto</b> de residência e <b>idoneidade moral</b>.",
    "<b>Extraordinária</b> (quinzenária): estrangeiro residente há <b>mais de 15 anos ininterruptos</b> e <b>sem condenação penal</b>, desde que requeira — direito subjetivo.",
    "<b>Quase-nacionalidade</b> (§1º): portugueses com <b>residência permanente</b>, havendo <b>reciprocidade</b>, recebem os direitos de brasileiro, <b>salvo</b> os casos da CF — continuam portugueses.",
    "A lei <b>não pode</b> criar distinções entre natos e naturalizados: só a CF pode."],
  teoria:[
    { h:"Distinções feitas pela própria CF", p:[
      "<b>Cargos privativos de nato</b> (§3º): Presidente e Vice, Presidente da Câmara, Presidente do Senado, Ministro do STF, carreira diplomática, oficial das Forças Armadas, Ministro de Estado da Defesa — <b>linha sucessória + segurança nacional</b>.",
      "<b>Extradição</b>: só o naturalizado (art. 5º, LI). <b>Conselho da República</b>: 6 cidadãos <b>natos</b> (art. 89, VII). <b>Empresa jornalística e de radiodifusão</b>: brasileiros natos ou naturalizados <b>há mais de 10 anos</b> (art. 222).",
      "Ministro do STJ, Senador, Deputado e Governador podem ser naturalizados; nas Casas legislativas, só as <b>presidências</b> exigem nato."]}],
  pegadinhas:["Senador naturalizado pode; Presidente do Senado não.","Ministro da Justiça pode ser naturalizado; Ministro da Defesa, não.","Português equiparado não é brasileiro: é estrangeiro com direitos de brasileiro."]},
{ id:"perda", titulo:"Perda e reaquisição (EC 131/2023)", curto:"Perda",
  rapido:["Hoje há duas hipóteses de perda: <b>I</b> — cancelamento da naturalização por <b>sentença judicial</b>, por <b>fraude</b> no processo de naturalização ou <b>atentado contra a ordem constitucional e o Estado Democrático</b>; <b>II</b> — <b>pedido expresso</b> de perda perante autoridade brasileira competente, <b>ressalvadas situações que acarretem apatridia</b>.",
    "A EC 131/2023 <b>acabou</b> com a perda automática por aquisição voluntária de outra nacionalidade.",
    "Quem renuncia (inciso II) pode <b>readquirir</b> a nacionalidade brasileira originária, nos termos da lei.",
    "Antes da EC 131, o cancelamento era por \"atividade nociva ao interesse nacional\" — expressão que saiu do texto."],
  teoria:[
    { h:"Por que importa", p:[
      "Caso Cláudia Hoffmann (MS 33.864, 2016): brasileira nata que se naturalizou norte-americana perdeu a nacionalidade e foi extraditada — esse desfecho não ocorreria hoje pela simples naturalização estrangeira.",
      "A perda do inciso I atinge só naturalizados; a do inciso II, natos ou naturalizados."]}],
  pegadinhas:["Adquirir outra nacionalidade, por si, <b>não</b> faz mais perder a brasileira.","Renúncia que gere apatridia não é aceita."]}
],
lei:[
{ art:"CF, art. 12", nome:"Nacionalidade", sec:"natos", itens:[
  { id:"cf12i", rot:"Art. 12, I", t:"São brasileiros: I - <b class='g1'>natos</b>:<br>a) os <b class='g1'>nascidos na República Federativa do Brasil</b>, ainda que de pais estrangeiros, <b class='g3'>desde que estes não estejam a serviço de seu país</b>;<br>b) os nascidos no estrangeiro, de pai brasileiro ou mãe brasileira, desde que <b class='g1'>qualquer deles esteja a serviço da República Federativa do Brasil</b>;<br>c) os nascidos no estrangeiro de pai brasileiro ou de mãe brasileira, desde que sejam <b class='g1'>registrados em repartição brasileira competente</b> ou venham a <b class='g1'>residir na República Federativa do Brasil e optem</b>, em qualquer tempo, <b class='g3'>depois de atingida a maioridade</b>, pela nacionalidade brasileira;", nota:"Alínea c com redação da EC 54/2007.", c:["na1","na2","na3"], j:["stf-t1253"] },
  { id:"cf12ii", rot:"Art. 12, II e §§1º e 2º", t:"II - <b class='g1'>naturalizados</b>:<br>a) os que, na forma da lei, adquiram a nacionalidade brasileira, exigidas aos originários de <b class='g1'>países de língua portuguesa</b> apenas <b class='g2'>residência por um ano ininterrupto</b> e <b class='g1'>idoneidade moral</b>;<br>b) os estrangeiros de qualquer nacionalidade, residentes na República Federativa do Brasil <b class='g2'>há mais de quinze anos ininterruptos</b> e <b class='g1'>sem condenação penal</b>, desde que requeiram a nacionalidade brasileira.<br>§ 1º Aos <b class='g1'>portugueses com residência permanente</b> no País, <b class='g3'>se houver reciprocidade</b> em favor de brasileiros, serão atribuídos os direitos inerentes ao brasileiro, salvo os casos previstos nesta Constituição.<br>§ 2º A lei <b class='g3'>não poderá estabelecer distinção</b> entre brasileiros natos e naturalizados, salvo nos casos previstos nesta Constituição.", c:["na4","na5"] },
  { id:"cf12p3", rot:"Art. 12, §3º", t:"São <b class='g1'>privativos de brasileiro nato</b> os cargos:<br>I - de Presidente e Vice-Presidente da República;<br>II - de Presidente da Câmara dos Deputados;<br>III - de Presidente do Senado Federal;<br>IV - de Ministro do Supremo Tribunal Federal;<br>V - da carreira diplomática;<br>VI - de oficial das Forças Armadas;<br>VII - de Ministro de Estado da Defesa.", c:["na6","na7"] },
  { id:"cf12p4", rot:"Art. 12, §4º", t:"Será declarada a <b class='g1'>perda da nacionalidade</b> do brasileiro que:<br>I - tiver <b class='g1'>cancelada sua naturalização, por sentença judicial</b>, em virtude de <b class='g1'>fraude relacionada ao processo de naturalização</b> ou de <b class='g1'>atentado contra a ordem constitucional e o Estado Democrático</b>;<br>II - fizer <b class='g1'>pedido expresso de perda</b> da nacionalidade brasileira perante autoridade brasileira competente, <b class='g3'>ressalvadas situações que acarretem apatridia</b>.", nota:"Redação da EC 131, de 03/10/2023. A mesma emenda prevê que a renúncia do inciso II não impede a reaquisição da nacionalidade originária, nos termos da lei (§5º) — confira o texto no Planalto.", novo:true, c:["na8","na9"] }]},
{ art:"CF, art. 13", nome:"Idioma e símbolos", sec:"naturalizados", itens:[
  { id:"cf13", rot:"Art. 13", t:"A <b class='g1'>língua portuguesa</b> é o idioma oficial da República Federativa do Brasil.<br>§ 1º São símbolos da República Federativa do Brasil a <b class='g1'>bandeira, o hino, as armas e o selo nacionais</b>.<br>§ 2º Os Estados, o Distrito Federal e os Municípios poderão ter símbolos próprios.", c:["na10"] }]}
],
juris:[
{ id:"stf-t1253", trib:"STF", tipo:"Repercussão geral", num:"RE 1.163.774 (Tema 1.253)", sec:"natos", status:"vigente", data:"12/03/2026",
  titulo:"Adotado no exterior por brasileiro é brasileiro nato",
  texto:"É assegurado o direito à nacionalidade brasileira originária à pessoa nascida no exterior, adotada por pessoa brasileira e registrada em órgão consular competente, nos termos da al. c do inc. I do art. 12 c/c o § 6º do art. 227 da Constituição da República.",
  explica:"A igualdade entre filhos biológicos e adotivos (art. 227, §6º) impede tratar o adotado como estrangeiro a ser naturalizado. Precedente novo — forte candidato a prova.", lei:["cf12i"], fonte:STFRG }
],
cards:[
{ id:"na1", tipo:"caso", sec:"natos", f:"Filho de casal de turistas franceses nasce em Salvador. É brasileiro?", v:"<b>Sim, nato</b> (ius soli): os pais não estavam a serviço da França.", lei:["cf12i"] },
{ id:"na2", tipo:"caso", sec:"natos", f:"Filho do cônsul da Itália nasce em Recife. É brasileiro?", v:"<b>Não</b>: o pai estava a serviço do seu país.", lei:["cf12i"] },
{ id:"na3", tipo:"caso", sec:"natos", f:"Criança nascida na Alemanha, adotada por casal brasileiro e registrada no consulado. Nato ou naturalizado?", v:"<b>Nato</b> — STF, Tema 1.253 (2026).", lei:["cf12i"], j:["stf-t1253"] },
{ id:"na4", tipo:"distincao", sec:"naturalizados", f:"Naturalização ordinária (lusófono) × extraordinária.", v:"<b>Lusófono</b>: 1 ano ininterrupto + idoneidade moral. <b>Extraordinária</b>: mais de 15 anos ininterruptos + sem condenação penal + requerimento.", lei:["cf12ii"] },
{ id:"na5", tipo:"caso", sec:"naturalizados", f:"Lei federal proíbe naturalizados de exercer o cargo de delegado de polícia. Constitucional?", v:"<b>Não.</b> Só a CF pode distinguir natos e naturalizados (art. 12, §2º).", lei:["cf12ii"] },
{ id:"na6", tipo:"lacuna", sec:"naturalizados", f:"Cargos privativos de nato: Presidente e Vice, Presidentes da ______ e do ______, Ministro do ______, carreira ______, oficial das Forças Armadas e Ministro da ______.", v:"<b>Câmara</b>; <b>Senado</b>; <b>STF</b>; <b>diplomática</b>; <b>Defesa</b>.", lei:["cf12p3"] },
{ id:"na7", tipo:"caso", sec:"naturalizados", f:"Naturalizado pode ser Senador? E Presidente do Senado?", v:"Senador: <b>sim</b>. Presidente do Senado: <b>não</b> (linha sucessória).", lei:["cf12p3"] },
{ id:"na8", tipo:"caso", sec:"perda", f:"Brasileira nata obtém cidadania norte-americana em 2025. Perde a brasileira?", v:"<b>Não.</b> Após a EC 131/2023, a perda só ocorre por cancelamento judicial da naturalização ou por <b>pedido expresso</b>.", lei:["cf12p4"] },
{ id:"na9", tipo:"caso", sec:"perda", f:"Brasileiro sem outra nacionalidade pede a perda da brasileira. Será declarada?", v:"<b>Não</b>: ressalvam-se situações que acarretem <b>apatridia</b>.", lei:["cf12p4"] },
{ id:"na10", tipo:"lacuna", sec:"naturalizados", f:"Símbolos da República: a ______, o hino, as ______ e o ______ nacionais.", v:"<b>bandeira</b>; <b>armas</b>; <b>selo</b>.", lei:["cf13"] }
],
questoes:[]
};

/* ======================= DIREITOS POLÍTICOS ======================= */
T.direitos_politicos = {
meta:{ tema:"Direitos políticos (arts. 14 a 16)", atualizado:AT,
  foco:"Sufrágio, voto, plebiscito, referendo e iniciativa popular; alistamento obrigatório e facultativo; inalistáveis; condições de elegibilidade e idades; inelegibilidades absolutas e relativas (reeleição, desincompatibilização, reflexa — SV 18 e Tema 678 — e militares); AIME; perda e suspensão (art. 15); anterioridade eleitoral; Ficha Limpa e LC 219/2025." },
secoes:[
{ id:"ativos", titulo:"Soberania popular, voto e alistamento", curto:"Alistamento",
  rapido:["Soberania popular: <b>sufrágio universal</b> e <b>voto direto e secreto</b>, com valor igual para todos; e <b>plebiscito</b> (consulta prévia), <b>referendo</b> (consulta posterior) e <b>iniciativa popular</b>.",
    "Alistamento e voto <b>obrigatórios</b>: maiores de 18. <b>Facultativos</b>: <b>analfabetos</b>, <b>maiores de 70</b> e <b>entre 16 e 18</b>.",
    "<b>Inalistáveis</b>: estrangeiros e, durante o serviço militar obrigatório, os <b>conscritos</b>.",
    "Sufrágio = direito; voto = exercício; escrutínio = modo (secreto)."],
  teoria:[
    { h:"Iniciativa popular", p:[
      "Federal: projeto subscrito por no mínimo <b>1% do eleitorado nacional</b>, distribuído por pelo menos <b>5 Estados</b>, com não menos de <b>0,3%</b> dos eleitores de cada um (art. 61, §2º).",
      "Não há iniciativa popular de emenda à CF federal (art. 60 não a prevê)."]}],
  pegadinhas:["Analfabeto pode votar, mas é <b>inelegível</b>.","Conscrito não se alista; militar de carreira se alista e pode ser eleito."]},
{ id:"elegibilidade", titulo:"Elegibilidade e inelegibilidades", curto:"Elegibilidade",
  rapido:["Condições: nacionalidade brasileira, pleno exercício dos direitos políticos, alistamento, <b>domicílio eleitoral</b> na circunscrição, <b>filiação partidária</b> e idade mínima.",
    "Idades: <b>35</b> — Presidente, Vice e <b>Senador</b>; <b>30</b> — Governador e Vice; <b>21</b> — Deputado (federal, estadual, distrital), Prefeito, Vice-Prefeito e juiz de paz; <b>18</b> — Vereador.",
    "<b>Inelegíveis absolutos</b>: inalistáveis e analfabetos. <b>Relativos</b>: reeleição (um único período subsequente para o Executivo), desincompatibilização (<b>renunciar 6 meses antes</b> para concorrer a outro cargo), parentes (reflexa) e militares.",
    "Inelegibilidade <b>reflexa</b> (§7º): cônjuge e parentes até o <b>2º grau</b> (consanguíneos, afins ou por adoção) do chefe do Executivo, no território de sua jurisdição — <b>salvo se já titular de mandato e candidato à reeleição</b>."],
  teoria:[
    { h:"Militares e LC das inelegibilidades", p:[
      "Militar alistável é elegível: com <b>menos de 10 anos</b> de serviço, <b>afasta-se</b> da atividade; com <b>mais de 10</b>, é <b>agregado</b> e, se eleito, passa à inatividade na diplomação.",
      "Lei complementar estabelece outras inelegibilidades e prazos (§9º) — LC 64/1990 com a Lei da Ficha Limpa (LC 135/2010), constitucional (ADCs 29 e 30).",
      "LC 219/2025: unificou em <b>8 anos</b> o prazo das inelegibilidades e fixou teto de <b>12 anos</b> para condenações sucessivas ou conexas; houve vetos e ações no STF — confira o estado atual."]},
    { h:"Reflexa: viuvez × divórcio", p:[
      "SV 18: a dissolução do vínculo conjugal <b>no curso do mandato</b> não afasta a inelegibilidade (evita divórcio de fachada).",
      "Tema 678: a SV 18 <b>não</b> se aplica quando o vínculo termina pela <b>morte</b> de um dos cônjuges.",
      "Prefeito itinerante: quem exerceu dois mandatos consecutivos não pode concorrer a prefeito em outro Município no período seguinte (Tema 564)."]}],
  quadro:{ titulo:"Idade mínima (aferida, em regra, na data da posse)", head:["Idade","Cargos"], rows:[
    ["35","Presidente, Vice-Presidente e Senador"],
    ["30","Governador e Vice-Governador"],
    ["21","Deputado Federal, Estadual ou Distrital, Prefeito, Vice-Prefeito, juiz de paz"],
    ["18","Vereador (aferida na data-limite do registro)"]]},
  pegadinhas:["Senador: <b>35</b> anos (não 30).","Desincompatibilização é para concorrer a <b>outros</b> cargos; para reeleição não precisa renunciar.","Reflexa vai até o <b>2º grau</b> (primo é 4º grau — não atinge)."]},
{ id:"perda", titulo:"Perda e suspensão; anterioridade eleitoral", curto:"Art. 15",
  rapido:["É <b>vedada a cassação</b> de direitos políticos. Perda ou suspensão só: cancelamento da naturalização (transitado em julgado); incapacidade civil absoluta; <b>condenação criminal transitada em julgado, enquanto durarem seus efeitos</b>; recusa de obrigação a todos imposta ou prestação alternativa; <b>improbidade</b> administrativa.",
    "A suspensão por condenação criminal vale para <b>qualquer pena</b>, inclusive restritiva de direitos (Tema 370) e independe de reabilitação (cessa com o cumprimento ou extinção da pena).",
    "AIME: impugnação do mandato na Justiça Eleitoral em <b>15 dias</b> da diplomação, por abuso do poder econômico, corrupção ou fraude; tramita em <b>segredo de justiça</b>.",
    "<b>Anterioridade eleitoral</b> (art. 16): lei que altera o processo eleitoral entra em vigor na publicação, mas <b>não se aplica à eleição que ocorra até 1 ano</b> de sua vigência."],
  teoria:[
    { h:"Classificação doutrinária", p:[
      "<b>Perda</b> (definitiva): cancelamento da naturalização; escusa de consciência (para parte da doutrina, suspensão).",
      "<b>Suspensão</b> (temporária): incapacidade civil absoluta, condenação criminal, improbidade.",
      "Parlamentar condenado criminalmente: a perda do mandato é decidida pela Casa (art. 55, VI e §2º), com debate no STF sobre penas em regime fechado longo."]}],
  pegadinhas:["Não existe \"cassação de direitos políticos\" na CF/88.","Anterioridade eleitoral: a lei <b>vigora</b> desde a publicação; só não se <b>aplica</b> à eleição dentro de 1 ano."]}
],
lei:[
{ art:"CF, art. 14", nome:"Direitos políticos", sec:"ativos", itens:[
  { id:"cf14c", rot:"Art. 14, caput e §§1º e 2º", t:"A soberania popular será exercida pelo <b class='g1'>sufrágio universal e pelo voto direto e secreto</b>, com valor igual para todos, e, nos termos da lei, mediante: I - <b class='g1'>plebiscito</b>; II - <b class='g1'>referendo</b>; III - <b class='g1'>iniciativa popular</b>.<br>§ 1º O alistamento eleitoral e o voto são: I - <b class='g1'>obrigatórios para os maiores de dezoito anos</b>; II - <b class='g1'>facultativos</b> para: a) os <b class='g1'>analfabetos</b>; b) os <b class='g1'>maiores de setenta anos</b>; c) os <b class='g1'>maiores de dezesseis e menores de dezoito anos</b>.<br>§ 2º Não podem alistar-se como eleitores os <b class='g1'>estrangeiros</b> e, durante o período do serviço militar obrigatório, os <b class='g1'>conscritos</b>.", c:["dp1","dp2"] },
  { id:"cf14p3", rot:"Art. 14, §§3º e 4º", t:"§ 3º São condições de elegibilidade, na forma da lei: I - a nacionalidade brasileira; II - o pleno exercício dos direitos políticos; III - o alistamento eleitoral; IV - o <b class='g1'>domicílio eleitoral na circunscrição</b>; V - a <b class='g1'>filiação partidária</b>; VI - a idade mínima de: a) <b class='g2'>trinta e cinco anos</b> para Presidente e Vice-Presidente da República e <b class='g1'>Senador</b>; b) <b class='g2'>trinta anos</b> para Governador e Vice-Governador de Estado e do Distrito Federal; c) <b class='g2'>vinte e um anos</b> para Deputado Federal, Deputado Estadual ou Distrital, Prefeito, Vice-Prefeito e juiz de paz; d) <b class='g2'>dezoito anos</b> para Vereador.<br>§ 4º São <b class='g1'>inelegíveis os inalistáveis e os analfabetos</b>.", c:["dp3","dp4"] },
  { id:"cf14p5", rot:"Art. 14, §§5º a 8º", t:"§ 5º O Presidente da República, os Governadores de Estado e do Distrito Federal, os Prefeitos e quem os houver sucedido, ou substituído no curso dos mandatos poderão ser reeleitos para <b class='g1'>um único período subseqüente</b>.<br>§ 6º Para concorrerem a <b class='g1'>outros cargos</b>, o Presidente da República, os Governadores de Estado e do Distrito Federal e os Prefeitos devem <b class='g1'>renunciar</b> aos respectivos mandatos <b class='g2'>até seis meses antes do pleito</b>.<br>§ 7º São inelegíveis, <b class='g1'>no território de jurisdição do titular</b>, o cônjuge e os parentes consangüíneos ou afins, <b class='g2'>até o segundo grau</b> ou por adoção, do Presidente da República, de Governador de Estado ou Território, do Distrito Federal, de Prefeito ou de quem os haja substituído dentro dos seis meses anteriores ao pleito, <b class='g3'>salvo se já titular de mandato eletivo e candidato à reeleição</b>.<br>§ 8º O militar alistável é elegível, atendidas as seguintes condições: I - se contar <b class='g2'>menos de dez anos</b> de serviço, deverá <b class='g1'>afastar-se da atividade</b>; II - se contar <b class='g2'>mais de dez anos</b> de serviço, será <b class='g1'>agregado</b> pela autoridade superior e, se eleito, passará automaticamente, no ato da diplomação, para a inatividade.", c:["dp5","dp6","dp7","dp8"], j:["stf-sv18","stf-t678"] },
  { id:"cf14p9", rot:"Art. 14, §§9º a 11", t:"§ 9º <b class='g1'>Lei complementar</b> estabelecerá outros casos de inelegibilidade e os prazos de sua cessação, a fim de proteger a probidade administrativa, a moralidade para exercício de mandato considerada vida pregressa do candidato, e a normalidade e legitimidade das eleições contra a influência do poder econômico ou o abuso do exercício de função, cargo ou emprego na administração direta ou indireta.<br>§ 10 - O mandato eletivo poderá ser impugnado ante a Justiça Eleitoral no prazo de <b class='g2'>quinze dias contados da diplomação</b>, instruída a ação com provas de <b class='g1'>abuso do poder econômico, corrupção ou fraude</b>.<br>§ 11 - A ação de impugnação de mandato tramitará em <b class='g3'>segredo de justiça</b>, respondendo o autor, na forma da lei, se temerária ou de manifesta má-fé.", c:["dp9"], j:["stf-adc29","lc219"] }]},
{ art:"CF, arts. 15 e 16", nome:"Perda, suspensão e anterioridade", sec:"perda", itens:[
  { id:"cf15", rot:"Art. 15", t:"É <b class='g3'>vedada a cassação</b> de direitos políticos, cuja <b class='g1'>perda ou suspensão</b> só se dará nos casos de:<br>I - cancelamento da naturalização por sentença transitada em julgado;<br>II - incapacidade civil absoluta;<br>III - <b class='g1'>condenação criminal transitada em julgado, enquanto durarem seus efeitos</b>;<br>IV - recusa de cumprir obrigação a todos imposta ou prestação alternativa, nos termos do art. 5º, VIII;<br>V - <b class='g1'>improbidade administrativa</b>, nos termos do art. 37, § 4º.", c:["dp10","dp11"], j:["stf-t370"] },
  { id:"cf16", rot:"Art. 16", t:"A lei que alterar o processo eleitoral <b class='g1'>entrará em vigor na data de sua publicação</b>, <b class='g3'>não se aplicando à eleição que ocorra até um ano da data de sua vigência</b>.", c:["dp12"] }]}
],
juris:[
{ id:"stf-sv18", trib:"STF", tipo:"Súmula Vinculante", num:"SV 18", sec:"elegibilidade", status:"vigente", data:"29/10/2009",
  titulo:"Divórcio no curso do mandato não afasta a inelegibilidade reflexa",
  texto:"A dissolução da sociedade ou do vínculo conjugal, no curso do mandato, não afasta a inelegibilidade prevista no § 7º do artigo 14 da Constituição Federal.",
  explica:"Impede o \"divórcio de fachada\" para perpetuar a família no poder.", lei:["cf14p5"], fonte:STFSV },
{ id:"stf-t678", trib:"STF", tipo:"Repercussão geral", num:"RE 758.461 (Tema 678)", sec:"elegibilidade", status:"vigente", data:"22/05/2014",
  titulo:"Morte do cônjuge afasta a SV 18",
  texto:"A Súmula Vinculante 18 do STF não se aplica aos casos de extinção do vínculo conjugal pela morte de um dos cônjuges.",
  explica:"Morte não é manobra; não há risco de fraude.", lei:["cf14p5"], fonte:STFRG },
{ id:"stf-t370", trib:"STF", tipo:"Repercussão geral", num:"RE 601.182 (Tema 370)", sec:"perda", status:"vigente", data:"08/05/2019",
  titulo:"Suspensão dos direitos políticos também com pena restritiva de direitos",
  texto:"A suspensão de direitos políticos prevista no art. 15, inciso III, da Constituição Federal aplica-se no caso de substituição da pena privativa de liberdade pela restritiva de direitos.",
  explica:"A suspensão é efeito automático de <b>qualquer</b> condenação criminal transitada em julgado, enquanto durarem seus efeitos.", lei:["cf15"], fonte:STFRG },
{ id:"stf-adc29", trib:"STF", tipo:"ADC", num:"ADCs 29 e 30 e ADI 4.578", sec:"elegibilidade", status:"vigente", data:"16/02/2012",
  titulo:"Constitucionalidade da Lei da Ficha Limpa",
  texto:"A LC 135/2010 é constitucional e aplica-se a fatos anteriores à sua vigência; a inelegibilidade não é pena, e sim requisito de elegibilidade, o que afasta a ofensa à presunção de inocência.",
  explica:"Condenação por órgão colegiado já gera inelegibilidade, ainda sem trânsito em julgado.", lei:["cf14p9"], fonte:STFJ },
{ id:"lc219", trib:"Congresso", tipo:"Lei Complementar", num:"LC 219/2025", sec:"elegibilidade", status:"atencao", data:"30/09/2025",
  titulo:"Mudanças na Lei da Ficha Limpa",
  texto:"Unificou em 8 anos os prazos de inelegibilidade e limitou a 12 anos o total em condenações sucessivas ou conexas; foram vetadas a mudança do termo inicial e a aplicação retroativa.",
  explica:"Há ações no STF e vetos pendentes de análise — confira o estado atual antes da prova.", lei:["cf14p9"], fonte:LC219 }
],
cards:[
{ id:"dp1", tipo:"caso", sec:"ativos", f:"Jovem de 17 anos e idoso de 72: voto obrigatório ou facultativo?", v:"<b>Facultativo</b> para ambos (16-18 e maiores de 70).", lei:["cf14c"] },
{ id:"dp2", tipo:"distincao", sec:"ativos", f:"Plebiscito × referendo.", v:"<b>Plebiscito</b>: consulta <b>prévia</b> ao ato. <b>Referendo</b>: consulta <b>posterior</b>, para ratificar ou rejeitar.", lei:["cf14c"] },
{ id:"dp3", tipo:"numero", sec:"elegibilidade", f:"Idades mínimas: Senador, Governador, Deputado Federal, Prefeito, Vereador.", v:"Senador <b>35</b>; Governador <b>30</b>; Deputado e Prefeito <b>21</b>; Vereador <b>18</b>.", lei:["cf14p3"] },
{ id:"dp4", tipo:"caso", sec:"elegibilidade", f:"Analfabeto pode votar? Pode ser candidato?", v:"Votar: <b>sim</b> (facultativo). Candidatar-se: <b>não</b> (inelegível — §4º).", lei:["cf14p3"] },
{ id:"dp5", tipo:"caso", sec:"elegibilidade", f:"Governador em 1º mandato quer concorrer à reeleição. Precisa renunciar 6 meses antes?", v:"<b>Não.</b> A desincompatibilização (§6º) é para concorrer a <b>outros cargos</b>.", lei:["cf14p5"] },
{ id:"dp6", tipo:"caso", sec:"elegibilidade", f:"Irmã do Prefeito de Salvador quer ser vereadora em Salvador, sem mandato anterior. Pode?", v:"<b>Não</b> — inelegibilidade reflexa (parente de 2º grau, mesmo território). Poderia em outro Município.", lei:["cf14p5"] },
{ id:"dp7", tipo:"caso", sec:"elegibilidade", f:"Prefeito morre no curso do mandato. A viúva pode concorrer a prefeita no mesmo Município?", v:"<b>Sim</b> — a SV 18 não se aplica à extinção do vínculo por morte (Tema 678).", lei:["cf14p5"], j:["stf-t678","stf-sv18"] },
{ id:"dp8", tipo:"caso", sec:"elegibilidade", f:"Policial militar com 6 anos de serviço quer ser candidato. Condição?", v:"Deve <b>afastar-se da atividade</b> (menos de 10 anos). Com mais de 10: agregado; se eleito, inatividade na diplomação.", lei:["cf14p5"] },
{ id:"dp9", tipo:"numero", sec:"perda", f:"AIME: prazo e fundamentos.", v:"<b>15 dias</b> da diplomação; abuso do poder econômico, corrupção ou fraude; segredo de justiça.", lei:["cf14p9"] },
{ id:"dp10", tipo:"caso", sec:"perda", f:"Condenado a pena restritiva de direitos, com trânsito em julgado. Seus direitos políticos ficam suspensos?", v:"<b>Sim</b> (Tema 370), enquanto durarem os efeitos da condenação.", lei:["cf15"], j:["stf-t370"] },
{ id:"dp11", tipo:"ce", sec:"perda", f:"Certo ou errado: a CF admite a cassação de direitos políticos por improbidade.", v:"<b>Errado</b>: é vedada a <b>cassação</b>; improbidade gera <b>suspensão</b>.", lei:["cf15"] },
{ id:"dp12", tipo:"caso", sec:"perda", f:"Lei que muda regras de propaganda eleitoral é publicada 8 meses antes da eleição. Vale para essa eleição?", v:"<b>Não.</b> Vigora desde a publicação, mas não se aplica à eleição que ocorra até 1 ano (art. 16).", lei:["cf16"] }
],
questoes:[]
};

/* ======================= PARTIDOS POLÍTICOS ======================= */
T.partidos = {
meta:{ tema:"Partidos políticos (art. 17)", atualizado:AT,
  foco:"Liberdade de criação e preceitos; personalidade jurídica civil e registro no TSE; autonomia e vedação de coligações proporcionais (EC 97); cláusula de desempenho e transição; fidelidade partidária (EC 111); cotas de gênero (EC 117) e de raça (EC 133/2024); federações; financiamento (ADI 4.650)." },
secoes:[
{ id:"criacao", titulo:"Criação, natureza e autonomia", curto:"Criação",
  rapido:["Livre a <b>criação, fusão, incorporação e extinção</b>, resguardados soberania nacional, regime democrático, pluripartidarismo e direitos fundamentais.",
    "Preceitos: <b>caráter nacional</b>; proibição de receber recursos de entidade ou governo <b>estrangeiros</b> (ou subordinar-se a eles); <b>prestação de contas</b> à Justiça Eleitoral; funcionamento parlamentar de acordo com a lei.",
    "Natureza: <b>pessoa jurídica de direito privado</b> — adquire personalidade na forma da <b>lei civil</b> e depois registra o estatuto no <b>TSE</b>.",
    "Autonomia interna + <b>vedação de coligações nas eleições proporcionais</b> (EC 97/2017); vedada organização <b>paramilitar</b>."],
  teoria:[
    { h:"Federações partidárias", p:[
      "Lei 14.208/2021: partidos podem se unir em federação, que atua como um só partido por no mínimo <b>4 anos</b>, com abrangência nacional. O STF validou o modelo (ADI 7.021), por não se confundir com a coligação proporcional vedada.",
      "Coligação: aliança só para a eleição; federação: união estável e duradoura."]}],
  pegadinhas:["Partido é pessoa jurídica de direito <b>privado</b>.","Coligação é permitida nas eleições <b>majoritárias</b>.","Registro do estatuto: no <b>TSE</b> (personalidade jurídica: cartório civil)."]},
{ id:"desempenho", titulo:"Cláusula de desempenho e fidelidade", curto:"Desempenho",
  rapido:["Regra permanente (§3º): fundo partidário e tempo de rádio e TV só para quem obtiver <b>3% dos votos válidos</b> para a Câmara, em pelo menos <b>1/3 das UFs</b>, com <b>2% em cada</b>, <b>ou</b> eleger <b>15 deputados federais</b> em pelo menos 1/3 das UFs.",
    "Transição (EC 97): <b>2026</b> — 2,5% dos votos (1,5% em 1/3 das UFs) ou 13 deputados; a regra plena de 3% vale a partir de <b>2030</b>.",
    "Eleito por partido que não atingiu a cláusula: mandato assegurado e pode filiar-se a outro que a atingiu <b>sem perder o mandato</b> (§5º).",
    "Fidelidade (§6º, EC 111/2021): deputados e vereadores que se <b>desligarem</b> do partido pelo qual foram eleitos <b>perdem o mandato</b>, salvo <b>anuência do partido</b> ou justa causa legal. Não vale para cargos majoritários (ADI 5.081)."],
  teoria:[
    { h:"Por que majoritários ficam fora", p:[
      "No sistema proporcional, o voto pertence ao partido (quociente); no majoritário, ao candidato — por isso a infidelidade não gera perda de mandato de senador, prefeito, governador ou presidente."]}],
  pegadinhas:["Fidelidade com perda de mandato: só cargos <b>proporcionais</b>.","Anuência do partido afasta a perda (EC 111)."]},
{ id:"recursos", titulo:"Recursos, cotas e financiamento", curto:"Recursos",
  rapido:["<b>5%</b> do fundo partidário em programas de promoção da participação política das <b>mulheres</b> (§7º).",
    "<b>30%</b>, no mínimo, do FEFC, da parcela de campanha do fundo partidário e do tempo de propaganda para <b>candidatas</b>, proporcional ao número delas (§8º).",
    "<b>30%</b> dos recursos do FEFC e do fundo partidário em candidaturas de <b>pessoas pretas e pardas</b> (§9º, EC 133/2024), nas circunscrições que melhor atendam aos interesses partidários.",
    "Doação de <b>pessoa jurídica</b> a campanhas e partidos é <b>inconstitucional</b> (ADI 4.650)."],
  teoria:[
    { h:"EC 133/2024", p:[
      "Além do §9º, a emenda considerou cumpridas as cotas raciais de eleições passadas sob condição de compensação nas 4 eleições seguintes (a partir de 2026), reforçou a <b>imunidade tributária</b> dos partidos e criou um Refis específico para eles — pontos que geraram críticas de \"autoanistia\"."]}],
  pegadinhas:["5% (programas para mulheres) ≠ 30% (candidatas).","Cota racial de 30% é de <b>recursos</b>, não de candidaturas."]}
],
lei:[
{ art:"CF, art. 17", nome:"Partidos políticos", sec:"criacao", itens:[
  { id:"cf17c", rot:"Art. 17, caput e §§1º, 2º e 4º", t:"É livre a <b class='g1'>criação, fusão, incorporação e extinção</b> de partidos políticos, resguardados a soberania nacional, o regime democrático, o pluripartidarismo, os direitos fundamentais da pessoa humana e observados os seguintes preceitos: I - <b class='g1'>caráter nacional</b>; II - proibição de recebimento de recursos financeiros de <b class='g1'>entidade ou governo estrangeiros</b> ou de subordinação a estes; III - <b class='g1'>prestação de contas</b> à Justiça Eleitoral; IV - funcionamento parlamentar de acordo com a lei.<br>§ 1º É assegurada aos partidos políticos <b class='g1'>autonomia</b> para definir sua estrutura interna (...) e para adotar os critérios de escolha e o regime de suas coligações nas eleições majoritárias, <b class='g3'>vedada a sua celebração nas eleições proporcionais</b>, sem obrigatoriedade de vinculação entre as candidaturas em âmbito nacional, estadual, distrital ou municipal, devendo seus estatutos estabelecer normas de disciplina e fidelidade partidária.<br>§ 2º Os partidos políticos, após adquirirem <b class='g1'>personalidade jurídica, na forma da lei civil</b>, registrarão seus estatutos no <b class='g1'>Tribunal Superior Eleitoral</b>.<br>(...)<br>§ 4º É vedada a utilização pelos partidos políticos de <b class='g3'>organização paramilitar</b>.", nota:"§1º com redação da EC 97/2017.", c:["pp1","pp2"] },
  { id:"cf17p3", rot:"Art. 17, §§3º e 5º", t:"§ 3º Somente terão direito a recursos do fundo partidário e acesso gratuito ao rádio e à televisão, na forma da lei, os partidos políticos que alternativamente: I - obtiverem, nas eleições para a Câmara dos Deputados, no mínimo, <b class='g2'>3% (três por cento) dos votos válidos</b>, distribuídos em pelo menos <b class='g2'>um terço das unidades da Federação</b>, com um mínimo de <b class='g2'>2% (dois por cento)</b> dos votos válidos em cada uma delas; ou II - tiverem elegido pelo menos <b class='g2'>quinze Deputados Federais</b> distribuídos em pelo menos um terço das unidades da Federação.<br>(...)<br>§ 5º Ao eleito por partido que não preencher os requisitos previstos no § 3º deste artigo é <b class='g1'>assegurado o mandato</b> e facultada a filiação, <b class='g3'>sem perda do mandato</b>, a outro partido que os tenha atingido, não sendo essa filiação considerada para fins de distribuição dos recursos do fundo partidário e de acesso gratuito ao tempo de rádio e de televisão.", nota:"EC 97/2017; regra plena a partir das eleições de 2030 (transição no art. 3º da emenda).", c:["pp3","pp4"] },
  { id:"cf17p6", rot:"Art. 17, §6º", t:"Os <b class='g1'>Deputados Federais, os Deputados Estaduais, os Deputados Distritais e os Vereadores</b> que se desligarem do partido pelo qual tenham sido eleitos <b class='g1'>perderão o mandato</b>, <b class='g3'>salvo nos casos de anuência do partido ou de outras hipóteses de justa causa estabelecidas em lei</b>, não computada, em qualquer caso, a migração de partido para fins de distribuição de recursos do fundo partidário ou de outros fundos públicos e de acesso gratuito ao rádio e à televisão.", nota:"Incluído pela EC 111/2021.", c:["pp5","pp6"] },
  { id:"cf17p7", rot:"Art. 17, §§7º a 9º", t:"§ 7º Os partidos políticos devem aplicar no mínimo <b class='g2'>5% (cinco por cento)</b> dos recursos do fundo partidário na criação e na manutenção de programas de promoção e difusão da <b class='g1'>participação política das mulheres</b>, de acordo com os interesses intrapartidários.<br>§ 8º O montante do Fundo Especial de Financiamento de Campanha e da parcela do fundo partidário destinada a campanhas eleitorais, bem como o tempo de propaganda gratuita no rádio e na televisão a ser distribuído pelos partidos às respectivas <b class='g1'>candidatas</b>, deverão ser de no mínimo <b class='g2'>30% (trinta por cento)</b>, proporcional ao número de candidatas (...).<br>§ 9º Dos recursos oriundos do Fundo Especial de Financiamento de Campanha e do fundo partidário (...), os partidos políticos devem, obrigatoriamente, aplicar <b class='g2'>30% (trinta por cento)</b> em candidaturas de <b class='g1'>pessoas pretas e pardas</b>, nas circunscrições que melhor atendam aos interesses e às estratégias partidárias.", nota:"§§7º e 8º: EC 117/2022. §9º: EC 133, de 22/08/2024.", novo:true, c:["pp7","pp8"] }]}
],
juris:[
{ id:"stf-adi4650", trib:"STF", tipo:"ADI", num:"ADI 4.650", sec:"recursos", status:"vigente", data:"17/09/2015",
  titulo:"Proibição de doações de pessoas jurídicas",
  texto:"São inconstitucionais os dispositivos legais que autorizavam contribuições de pessoas jurídicas às campanhas eleitorais e aos partidos políticos.",
  explica:"Fundamentos: igualdade política, princípio democrático e combate à influência do poder econômico. Pessoas físicas podem doar, nos limites da lei.", lei:["cf17p7"], fonte:STFJ },
{ id:"stf-adi5081", trib:"STF", tipo:"ADI", num:"ADI 5.081", sec:"desempenho", status:"vigente", data:"27/05/2015",
  titulo:"Fidelidade partidária não alcança cargos majoritários",
  texto:"A perda do mandato em razão de mudança de partido não se aplica aos candidatos eleitos pelo sistema majoritário, sob pena de violação da soberania popular e das escolhas feitas pelo eleitor.",
  explica:"A EC 111/2021 seguiu essa linha ao listar só deputados e vereadores no §6º.", lei:["cf17p6"], fonte:STFJ }
],
cards:[
{ id:"pp1", tipo:"caso", sec:"criacao", f:"Partido recebe doação de fundação mantida por governo estrangeiro. Viola a CF?", v:"<b>Sim</b> — vedado receber recursos de entidade ou governo estrangeiros (art. 17, II).", lei:["cf17c"] },
{ id:"pp2", tipo:"caso", sec:"criacao", f:"Dois partidos querem se coligar para a eleição de vereadores. Podem?", v:"<b>Não</b>: coligações são vedadas nas eleições <b>proporcionais</b> (EC 97). Podem formar <b>federação</b> (mínimo 4 anos, nacional).", lei:["cf17c"] },
{ id:"pp3", tipo:"numero", sec:"desempenho", f:"Cláusula de desempenho na regra plena (a partir de 2030).", v:"<b>3%</b> dos votos válidos em 1/3 das UFs com <b>2%</b> em cada, <b>ou</b> <b>15 deputados</b> em 1/3 das UFs.", lei:["cf17p3"] },
{ id:"pp4", tipo:"caso", sec:"desempenho", f:"Deputada eleita por partido que não atingiu a cláusula muda para partido que atingiu. Perde o mandato?", v:"<b>Não</b> (§5º) — mas a migração não conta para a divisão do fundo e do tempo de TV.", lei:["cf17p3"] },
{ id:"pp5", tipo:"caso", sec:"desempenho", f:"Vereador sai do partido com carta de anuência da legenda. Perde o mandato?", v:"<b>Não</b> — a anuência do partido é exceção expressa (§6º, EC 111).", lei:["cf17p6"] },
{ id:"pp6", tipo:"caso", sec:"desempenho", f:"Senador troca de partido sem justa causa. Perde o mandato?", v:"<b>Não.</b> Fidelidade com perda de mandato só para cargos proporcionais (ADI 5.081).", lei:["cf17p6"], j:["stf-adi5081"] },
{ id:"pp7", tipo:"distincao", sec:"recursos", f:"5% × 30% × 30% (art. 17, §§7º a 9º).", v:"<b>5%</b> do fundo partidário: programas de participação das mulheres. <b>30%</b> do FEFC/fundo de campanha e do tempo de TV: candidatas. <b>30%</b> do FEFC e do fundo partidário: candidaturas de pessoas pretas e pardas (EC 133).", lei:["cf17p7"] },
{ id:"pp8", tipo:"caso", sec:"recursos", f:"Empresa quer doar a candidato a governador. Pode?", v:"<b>Não</b> — ADI 4.650 vedou doações de pessoas jurídicas.", lei:["cf17p7"], j:["stf-adi4650"] }
],
questoes:[]
};

})();
