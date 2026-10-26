/* Direito Penal — Crimes contra a Administração Pública II: praticados por particular (arts. 328 a 337-A)
   e contra a administração pública estrangeira (337-B a 337-D).
   Conferido em 14/10/2026. Texto legal: Código Penal (Planalto); LC 225/2026 (devedor contumaz). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STJT = "https://scon.stj.jus.br/SCON/jt/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var TEMA = function(n){ return "https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp?novaConsulta=true&tipo_pesquisa=T&cod_tema_inicial="+n+"&cod_tema_final="+n; };

T.penal_adm_particular = {
meta:{ tema:"Crimes contra a Administração II — Particular", atualizado:AT,
  foco:"Usurpação, resistência, desobediência (Tema 1060), desacato (ADPF 496), tráfico de influência, corrupção ativa, descaminho e contrabando (insignificância: Temas 157, 1143 e 1218), sonegação previdenciária com a LC 225/2026 (devedor contumaz) e corrupção em transação comercial internacional." },
secoes:[
{ id:"autoridade", titulo:"Usurpação, resistência, desobediência e desacato", curto:"Autoridade",
  rapido:["Usurpação de função (328): <b>praticar atos</b> da função pública sem ser titular — detenção de 3 meses a 2 anos e multa; com <b>vantagem</b>: reclusão de 2 a 5. Só fingir-se funcionário, sem praticar ato: contravenção (LCP, art. 45).",
    "Resistência (329): opor-se a <b>ato legal</b> mediante <b>violência ou ameaça</b> ao funcionário competente ou a quem o auxilia — detenção de 2 meses a 2 anos; se o ato não se executa, reclusão de 1 a 3; <b>soma-se a pena da violência</b>.",
    "Desobediência (330): desobedecer a <b>ordem legal</b> de funcionário público — detenção de 15 dias a 6 meses e multa.",
    "Desacato (331): desacatar funcionário <b>no exercício da função ou em razão dela</b> — detenção de 6 meses a 2 anos, ou multa. Recepcionado pela CF (STF, ADPF 496)."],
  teoria:[
    { h:"Resistência", p:[
      "O ato deve ser legal (ainda que se discorde da decisão, ex.: preventiva questionável). Ato ilegal (mandado cumprido à noite sem flagrante) não gera resistência.",
      "Violência contra pessoa; violência só contra coisa (chutar a viatura) não basta. A ameaça não precisa ser grave. Resistência passiva (deitar no chão) não é resistência — pode ser desobediência.",
      "Resistir à prisão em flagrante feita por particular (CPP, art. 301): não é resistência (o particular não é funcionário).",
      "Xingamentos no mesmo contexto da resistência podem ser absorvidos; ofensas posteriores, já contido o agente, geram concurso com desacato (STJ)."]},
    { h:"Desobediência", p:[
      "Recusar o bafômetro não é desobediência (ninguém é obrigado a produzir prova contra si).",
      "Fugir de blitz <b>de trânsito</b>: infração administrativa (CTB, art. 195), não crime. Fugir de ordem de parada em <b>policiamento ostensivo</b> para prevenir e reprimir crimes: desobediência (STJ, Tema 1060).",
      "Descumprir medida protetiva da Lei Maria da Penha: crime próprio (art. 24-A, reclusão de 2 a 5). Descumprir medida protetiva dos crimes sexuais/vulneráveis: art. 338-A do CP (Lei 15.280/2025). Exercer função de que foi suspenso por decisão judicial: art. 359."]},
    { h:"Desacato", p:[
      "Exige a presença do funcionário e o nexo com a função. Ofensa por motivo particular (venda de carro), ainda que na repartição: injúria. Funcionário aposentado ou exonerado não pode ser vítima.",
      "Prevalece que funcionário público também pode desacatar outro funcionário.",
      "O STJ chegou a afastar o desacato pelo Pacto de San José, mas a 3ª Seção uniformizou: continua crime (HC 379.269). O STF fixou: \"Foi recepcionada pela Constituição de 1988 a norma do art. 331 do Código Penal\" (ADPF 496).",
      "Vários funcionários ofendidos no mesmo contexto: há decisões pelo crime único (6ª Turma) e pelo concurso (5ª Turma)."]}
  ],
  pegadinhas:["Resistência exige violência ou ameaça; desobediência é a oposição sem esses meios.","Embriaguez ou exaltação não afastam o desacato (posição majoritária)."]},
{ id:"corrupcao", titulo:"Tráfico de influência e corrupção ativa", curto:"Corrupção ativa",
  rapido:["Tráfico de influência (332): solicitar, exigir, cobrar ou obter vantagem <b>a pretexto de influir</b> em ato de funcionário — reclusão de 2 a 5 e multa; <b>+metade</b> se alega que a vantagem também vai para o funcionário. \"Venda de fumaça\".",
    "Exploração de prestígio (357): o mesmo, mas a pretexto de influir em <b>juiz, jurado, MP, funcionário de justiça, perito, tradutor, intérprete ou testemunha</b> — 1 a 5.",
    "Corrupção ativa (333): <b>oferecer ou prometer</b> vantagem indevida a funcionário para determiná-lo a praticar, omitir ou retardar <b>ato de ofício</b> — reclusão de <b>2 a 12</b> e multa; +1/3 se o funcionário de fato infringe o dever.",
    "Corrupção ativa em transação comercial internacional (337-B): prometer, oferecer ou <b>dar</b> vantagem a funcionário público estrangeiro — reclusão de 1 a 8 e multa. Tráfico de influência internacional (337-C): 2 a 5."],
  teoria:[
    { h:"Pontos de prova", p:[
      "No tráfico de influência, quem paga é vítima (\"corruptor putativo\"), não autor. Se a influência é real e o intermediário tenta corromper o funcionário, ele e quem pagou respondem por corrupção ativa.",
      "Corrupção ativa não tem o verbo \"dar\": quem só paga após exigência do funcionário não comete crime (o funcionário comete concussão). Quem paga após solicitação também não comete o 333.",
      "Não há corrupção ativa subsequente: \"agrado\" dado depois do ato, sem promessa prévia, não é crime para o particular.",
      "Pedido de \"jeitinho\" sem oferta de vantagem não é corrupção ativa.",
      "Oferta a vários funcionários no mesmo contexto: crime único (STJ). Formal: consuma-se com a oferta, ainda que recusada.",
      "Corrupção de testemunha, perito, contador, tradutor ou intérprete: art. 343 (dar, oferecer ou prometer; 3 a 4)."]}
  ],
  quadro:{ titulo:"Corrupção ativa × passiva", head:["","Passiva (317)","Ativa (333)"], rows:[
    ["Autor","Funcionário","Qualquer pessoa"],["Verbos","Solicitar, receber, aceitar promessa","Oferecer, prometer (não \"dar\")"],
    ["Ato de ofício","Não exigido no caput","Exigido (para determinar ato de ofício)"],["Pena","2 a 12 e multa","2 a 12 e multa"],
    ["Aumento de 1/3","Se infringe o dever em consequência","Se o funcionário infringe o dever em razão da vantagem"]]},
  pegadinhas:["Corrupção ativa e passiva não são necessariamente bilaterais: uma pode existir sem a outra.","Tráfico de influência tem aumento de METADE (não 1/3) quando se insinua que o funcionário também recebe."]},
{ id:"descaminho", titulo:"Descaminho e contrabando", curto:"Descaminho",
  rapido:["Descaminho (334): <b>iludir</b> o pagamento de imposto devido pela entrada, saída ou consumo de mercadoria <b>permitida</b> — reclusão de <b>1 a 4</b>. Contrabando (334-A): importar ou exportar mercadoria <b>proibida</b> — reclusão de <b>2 a 5</b>.",
    "Pena em <b>dobro</b> se em <b>transporte aéreo, marítimo ou fluvial</b> — inclusive voo regular (STJ). Comércio irregular, inclusive em residência, equipara-se a atividade comercial.",
    "Insignificância no descaminho: débito até <b>R$ 20 mil</b> (Tema 157), salvo <b>reiteração</b> (Tema 1218). Contrabando de cigarros: até <b>1.000 maços</b>, sem reiteração (Tema 1143). Medicamento para uso próprio em pequena quantidade: excepcionalmente. Arma de pressão: nunca.",
    "Competência: Justiça Federal do lugar da apreensão (Súmula 151 do STJ). Descaminho é formal: dispensa constituição definitiva do crédito, e pagamento ou parcelamento não extinguem a punibilidade."],
  teoria:[
    { h:"Detalhes", p:[
      "Lei 13.008/2014 separou os tipos: houve continuidade típico-normativa do contrabando no 334-A.",
      "Cigarro e gasolina importados sem autorização: contrabando (mercadoria de proibição relativa). Máquinas caça-níqueis: exige prova da origem estrangeira.",
      "Falso que se exaure no descaminho é absorvido, mesmo tendo pena maior (Tema 933).",
      "Insignificância em tributos estaduais exige lei local com o mesmo parâmetro (Jurisprudência em Teses, ed. 219).",
      "Tema 1218: contumácia pode ser aferida por procedimentos penais e fiscais pendentes; não se aplica o período depurador de 5 anos (art. 64, I)."]}
  ],
  quadro:{ titulo:"Descaminho × contrabando", head:["","Descaminho (334)","Contrabando (334-A)"], rows:[
    ["Mercadoria","Permitida, com tributo iludido","Proibida (absoluta ou relativa)"],["Pena","Reclusão 1 a 4","Reclusão 2 a 5"],
    ["Insignificância","Até R$ 20 mil (tributos federais), sem reiteração","Regra: não. Exceções: cigarros até 1.000 maços; medicamento para uso próprio"],
    ["Natureza","Crime tributário formal","Crime contra a Administração (saúde, segurança)"]]},
  pegadinhas:["Voo comercial regular também dobra a pena do descaminho (STJ).","Pagamento do tributo não extingue a punibilidade do descaminho (diferente dos crimes tributários materiais da Lei 8.137/90)."]},
{ id:"previdencia", titulo:"Sonegação previdenciária e outros crimes de particular", curto:"337-A e outros",
  rapido:["Sonegação de contribuição previdenciária (337-A): suprimir ou reduzir contribuição, omitindo segurados da folha, deixando de lançar descontos na contabilidade ou omitindo receitas e fatos geradores — reclusão de 2 a 5 e multa. Crime <b>material</b> (Súmula Vinculante 24).",
    "§1º: extingue-se a punibilidade se o agente, espontaneamente, declara, confessa e presta informações <b>antes do início da ação fiscal</b> (sem precisar pagar). Pagamento integral a qualquer tempo antes do trânsito: extinção (Lei 10.684/2003, art. 9º).",
    "<b>LC 225/2026</b>: nenhuma dessas extinções vale para o <b>devedor contumaz</b> declarado em decisão administrativa definitiva e inscrito no Cadin — mesmo que depois deixe de sê-lo, para os fatos do período (337-A, §§5º e 6º; Lei 10.684, art. 9º, §§3º e 4º).",
    "Sem insignificância em crimes previdenciários (168-A e 337-A), segundo STF e STJ."],
  teoria:[
    { h:"Outros crimes de particular", p:[
      "Impedimento, perturbação ou fraude de concorrência (335): tacitamente revogado em relação a licitações (hoje 337-I e 337-K); subsiste para hasta pública (há quem diga revogação integral).",
      "Inutilização de edital ou de sinal (336): rasgar edital afixado por ordem de funcionário ou violar lacre de interdição — detenção de 1 mês a 1 ano, ou multa.",
      "Subtração ou inutilização de livro ou documento confiado à custódia de funcionário (337) — reclusão de 2 a 5, se não for crime mais grave. Só doloso. Se o agente é advogado que recebeu os autos: art. 356.",
      "Devedor contumaz (LC 225/2026, art. 11): contribuinte cuja inadimplência é substancial, reiterada e injustificada."]}
  ],
  pegadinhas:["A extinção do §1º do 337-A exige espontaneidade antes do início da ação fiscal, mas dispensa pagamento.","Rasgar edital vencido, já sem utilidade jurídica, não é o art. 336 (doutrina)."]}
],
lei:[
{ art:"CP, arts. 328 a 331", nome:"Usurpação, resistência, desobediência, desacato", sec:"autoridade", itens:[
  { id:"cp328", rot:"Arts. 328 e 329", t:"Art. 328 - <b class='g1'>Usurpar o exercício de função pública</b>: Pena - detenção, de <b class='g2'>três meses a dois anos, e multa</b>. Parágrafo único - Se do fato o agente <b class='g1'>aufere vantagem</b>: Pena - reclusão, de <b class='g2'>dois a cinco anos, e multa</b>.<br>Art. 329 - <b class='g1'>Opor-se à execução de ato legal</b>, mediante <b class='g1'>violência ou ameaça</b> a funcionário competente para executá-lo ou a quem lhe esteja prestando auxílio: Pena - detenção, de <b class='g2'>dois meses a dois anos</b>. § 1º - Se o ato, em razão da resistência, <b class='g1'>não se executa</b>: Pena - reclusão, de <b class='g2'>um a três anos</b>. § 2º - As penas deste artigo são aplicáveis <b class='g3'>sem prejuízo das correspondentes à violência</b>.", c:["ap1","ap2","ap3"] },
  { id:"cp330", rot:"Arts. 330 e 331", t:"Art. 330 - <b class='g1'>Desobedecer a ordem legal</b> de funcionário público: Pena - detenção, de <b class='g2'>quinze dias a seis meses, e multa</b>.<br>Art. 331 - <b class='g1'>Desacatar</b> funcionário público <b class='g3'>no exercício da função ou em razão dela</b>: Pena - detenção, de <b class='g2'>seis meses a dois anos, ou multa</b>.", c:["ap4","ap5","ap6","ap7"], j:["stj-t1060","stf-adpf496"] }
]},
{ art:"CP, arts. 332, 333 e 337-B a 337-D", nome:"Tráfico de influência e corrupção ativa", sec:"corrupcao", itens:[
  { id:"cp332", rot:"Arts. 332 e 333", t:"Art. 332 - <b class='g1'>Solicitar, exigir, cobrar ou obter</b>, para si ou para outrem, vantagem ou promessa de vantagem, <b class='g3'>a pretexto de influir</b> em ato praticado por funcionário público no exercício da função: Pena - reclusão, de <b class='g2'>2 (dois) a 5 (cinco) anos, e multa</b>. Parágrafo único - A pena é aumentada da <b class='g2'>metade</b>, se o agente alega ou insinua que a vantagem é também destinada ao funcionário.<br>Art. 333 - <b class='g1'>Oferecer ou prometer</b> vantagem indevida a funcionário público, <b class='g3'>para determiná-lo a praticar, omitir ou retardar ato de ofício</b>: Pena - reclusão, de <b class='g2'>2 (dois) a 12 (doze) anos, e multa</b>. Parágrafo único - A pena é aumentada de <b class='g2'>um terço</b>, se, em razão da vantagem ou promessa, o funcionário retarda ou omite ato de ofício, ou o pratica infringindo dever funcional.", c:["ap8","ap9","ap10","ap11"] },
  { id:"cp337b", rot:"Arts. 337-B a 337-D", t:"Art. 337-B. <b class='g1'>Prometer, oferecer ou dar</b>, direta ou indiretamente, vantagem indevida a <b class='g1'>funcionário público estrangeiro</b>, ou a terceira pessoa, para determiná-lo a praticar, omitir ou retardar ato de ofício relacionado à <b class='g1'>transação comercial internacional</b>: Pena - reclusão, de <b class='g2'>1 (um) a 8 (oito) anos, e multa</b>. Parágrafo único. A pena é aumentada de 1/3 (um terço), se, em razão da vantagem ou promessa, o funcionário público estrangeiro retarda ou omite o ato de ofício, ou o pratica infringindo dever funcional.<br>Art. 337-C. Solicitar, exigir, cobrar ou obter, para si ou para outrem, direta ou indiretamente, vantagem ou promessa de vantagem a pretexto de influir em ato praticado por funcionário público estrangeiro no exercício de suas funções, relacionado a transação comercial internacional: Pena - reclusão, de <b class='g2'>2 (dois) a 5 (cinco) anos, e multa</b> (aumento de metade se alegar que a vantagem também vai ao funcionário estrangeiro).<br>Art. 337-D. Considera-se funcionário público estrangeiro, para os efeitos penais, quem, ainda que transitoriamente ou sem remuneração, exerce cargo, emprego ou função pública em entidades estatais ou em representações diplomáticas de país estrangeiro (equipara-se quem atua em empresas controladas pelo Poder Público de país estrangeiro ou em organizações públicas internacionais).", c:["ap12"] }
]},
{ art:"CP, arts. 334 e 334-A", nome:"Descaminho e contrabando", sec:"descaminho", itens:[
  { id:"cp334", rot:"Arts. 334 e 334-A", t:"Art. 334. <b class='g1'>Iludir</b>, no todo ou em parte, o <b class='g1'>pagamento de direito ou imposto devido</b> pela entrada, pela saída ou pelo consumo de mercadoria: Pena - reclusão, de <b class='g2'>1 (um) a 4 (quatro) anos</b>. (...) § 3º A pena aplica-se <b class='g2'>em dobro</b> se o crime de descaminho é praticado em <b class='g1'>transporte aéreo, marítimo ou fluvial</b>.<br>Art. 334-A. <b class='g1'>Importar ou exportar mercadoria proibida</b>: Pena - reclusão, de <b class='g2'>2 (dois) a 5 (cinco) anos</b>. (...) § 3º A pena aplica-se <b class='g2'>em dobro</b> se o crime de contrabando é praticado em transporte aéreo, marítimo ou fluvial.", nota:"Figuras equiparadas (§1º de cada artigo) e equiparação do comércio irregular, inclusive em residência (§2º), resumidas na aba Resumo.", c:["ap13","ap14","ap15","ap16"], j:["stj-t157","stj-t1218","stj-t1143","stj-s151"] }
]},
{ art:"CP, arts. 335 a 337-A", nome:"Outros crimes de particular", sec:"previdencia", itens:[
  { id:"cp337a", rot:"Art. 337-A", t:"<b class='g1'>Suprimir ou reduzir contribuição social previdenciária</b> e qualquer acessório, mediante as seguintes condutas: I - omitir de folha de pagamento da empresa ou de documento de informações previsto pela legislação previdenciária segurados empregado, empresário, trabalhador avulso ou trabalhador autônomo ou a este equiparado que lhe prestem serviços; II - deixar de lançar mensalmente nos títulos próprios da contabilidade da empresa as quantias descontadas dos segurados ou as devidas pelo empregador ou pelo tomador de serviços; III - omitir, total ou parcialmente, receitas ou lucros auferidos, remunerações pagas ou creditadas e demais fatos geradores de contribuições sociais previdenciárias: Pena - reclusão, de <b class='g2'>2 (dois) a 5 (cinco) anos, e multa</b>.<br>§ 1º É <b class='g3'>extinta a punibilidade</b> se o agente, <b class='g1'>espontaneamente, declara e confessa</b> as contribuições, importâncias ou valores e presta as informações devidas à previdência social, na forma definida em lei ou regulamento, <b class='g3'>antes do início da ação fiscal</b>.<br>§ 5º A extinção de punibilidade de que trata o § 1º deste artigo <b class='g3'>não se aplica ao agente declarado devedor contumaz</b> em decisão administrativa definitiva e inscrito no Cadastro Informativo dos créditos não quitados do setor público federal (Cadin), previsto na Lei nº 10.522, de 19 de julho de 2002.<br>§ 6º O fato de o agente deixar de ser considerado devedor contumaz não afasta o disposto no § 5º deste artigo em relação aos atos praticados no período em que era assim considerado.", nota:"§§5º e 6º incluídos pela LC 225/2026. §§2º a 4º (perdão judicial ou só multa para primário de bons antecedentes, em hipóteses de valor reduzido) não reproduzidos.", novo:true, c:["ap17","ap18"], j:["stj-jt220-5"] },
  { id:"cp336", rot:"Arts. 336 e 337", t:"Art. 336 - <b class='g1'>Rasgar ou, de qualquer forma, inutilizar ou conspurcar edital</b> afixado por ordem de funcionário público; <b class='g1'>violar ou inutilizar selo ou sinal</b> empregado, por determinação legal ou por ordem de funcionário público, para identificar ou cerrar qualquer objeto: Pena - detenção, de <b class='g2'>um mês a um ano, ou multa</b>.<br>Art. 337 - <b class='g1'>Subtrair, ou inutilizar</b>, total ou parcialmente, livro oficial, processo ou documento <b class='g1'>confiado à custódia de funcionário</b>, em razão de ofício, ou de particular em serviço público: Pena - reclusão, de <b class='g2'>dois a cinco anos</b>, se o fato não constitui crime mais grave.", c:["ap19"] }
]}
],
juris:[
{ id:"stj-t1060", trib:"STJ", tipo:"Tema repetitivo", num:"1060", sec:"autoridade", status:"vigente", data:"3ª Seção, 09/03/2022",
  titulo:"Fuga de ordem de parada em policiamento ostensivo", texto:"A desobediência à ordem legal de parada, emanada por agentes públicos em contexto de policiamento ostensivo, para a prevenção e repressão de crimes, constitui conduta penalmente típica, prevista no art. 330 do Código Penal Brasileiro.",
  explica:"Em blitz meramente de trânsito, vale a sanção administrativa do CTB, art. 195 (não há crime).", lei:["cp330"], fonte:TEMA(1060) },
{ id:"stf-adpf496", trib:"STF", tipo:"ADPF", num:"496", sec:"autoridade", status:"vigente", data:"Plenário, 22/06/2020",
  titulo:"Desacato foi recepcionado", texto:"Foi recepcionada pela Constituição de 1988 a norma do art. 331 do Código Penal, que tipifica o crime de desacato.",
  sintese:"Protege a função pública, não o servidor como pessoa; limita-se a casos graves de menosprezo.",
  explica:"Os agentes públicos devem tolerar mais críticas; o crime se restringe a menosprezo evidente.", lei:["cp330"], fonte:STFJ },
{ id:"stj-t157", trib:"STJ", tipo:"Tema repetitivo", num:"157", sec:"descaminho", status:"vigente", data:"Revisado em 28/02/2018",
  titulo:"Descaminho: insignificância até R$ 20 mil", texto:"Incide o princípio da insignificância aos crimes tributários federais e de descaminho quando o débito tributário verificado não ultrapassar o limite de R$ 20.000,00, a teor do disposto no art. 20 da Lei n. 10.522/2002, com as atualizações efetivadas pelas Portarias 75 e 130, ambas do Ministério da Fazenda.",
  explica:"Para tributos estaduais, só com lei local no mesmo sentido.", lei:["cp334"], fonte:TEMA(157) },
{ id:"stj-t1218", trib:"STJ", tipo:"Tema repetitivo", num:"1218", sec:"descaminho", status:"vigente", data:"3ª Seção, 28/02/2024",
  titulo:"Reiteração afasta a insignificância no descaminho", texto:"A reiteração da conduta delitiva obsta a aplicação do princípio da insignificância ao crime de descaminho, independentemente do valor do tributo não recolhido, ressalvada a possibilidade de, no caso concreto, se concluir que a medida é socialmente recomendável. A contumácia pode ser aferida a partir de procedimentos penais e fiscais pendentes de definitividade, sendo inaplicável o prazo previsto no art. 64, I, do CP.",
  explica:"REsp 2.083.701/SP (Informativo 802).", lei:["cp334"], fonte:TEMA(1218) },
{ id:"stj-t1143", trib:"STJ", tipo:"Tema repetitivo", num:"1143", sec:"descaminho", status:"vigente", data:"Acórdão publicado em 19/09/2023",
  titulo:"Contrabando de até 1.000 maços de cigarro", texto:"O princípio da insignificância é aplicável ao crime de contrabando de cigarros quando a quantidade apreendida não ultrapassar 1.000 (mil) maços, seja pela diminuta reprovabilidade da conduta, seja pela necessidade de se dar efetividade à repressão ao contrabando de vulto, excetuada a hipótese de reiteração da conduta.",
  explica:"Com modulação: aplica-se aos processos em curso na data do julgamento.", lei:["cp334"], fonte:TEMA(1143) },
{ id:"stj-s151", trib:"STJ", tipo:"Súmula", num:"151", sec:"descaminho", status:"vigente", data:"",
  titulo:"Competência no contrabando e descaminho", texto:"A competência para o processo e julgamento por crime de contrabando ou descaminho define-se pela prevenção do juízo federal do lugar da apreensão dos bens.",
  explica:"Justiça Federal, pelo lugar da apreensão.", lei:["cp334"], fonte:STJS },
{ id:"stj-jt220-5", trib:"STJ", tipo:"Jurisprudência em Teses", num:"Ed. 220, tese 5", sec:"previdencia", status:"vigente", data:"",
  titulo:"Sem insignificância nos crimes previdenciários", texto:"O princípio da insignificância não se aplica aos crimes de apropriação indébita previdenciária e de sonegação de contribuição previdenciária, pois esses tipos penais protegem a própria subsistência da Previdência Social.",
  explica:"Mudança alinhada ao STF (RvCr 4.881/RJ no STJ).", lei:["cp337a"], fonte:STJT }
],
cards:[
{ id:"ap1", tipo:"distincao", sec:"autoridade", f:"Fingir-se policial × usurpar a função de policial.", v:"Só se dizer policial: <b>contravenção</b> (LCP, art. 45). Praticar atos da função (abordar, revistar): <b>328</b>; com vantagem, reclusão de 2 a 5.", lei:["cp328"] },
{ id:"ap2", tipo:"caso", sec:"autoridade", f:"Comerciante ameaça fiscais com arma e eles desistem da interdição. Crime?", v:"<b>Resistência qualificada</b> (329, §1º — o ato não se executou): reclusão de 1 a 3.", lei:["cp328"] },
{ id:"ap3", tipo:"caso", sec:"autoridade", f:"Preso dá um soco no policial durante prisão legal e lhe causa lesão grave. Quais crimes?", v:"<b>Resistência + lesão corporal grave</b> (cúmulo material obrigatório, 329, §2º).", lei:["cp328"] },
{ id:"ap4", tipo:"juris", sec:"autoridade", f:"Motorista foge de blitz da PM montada para coibir roubos de carga. E se fosse blitz do Detran?", v:"PM em policiamento ostensivo: <b>desobediência</b> (Tema 1060). Blitz de trânsito: só infração do CTB, art. 195.", lei:["cp330"], j:["stj-t1060"] },
{ id:"ap5", tipo:"ce", sec:"autoridade", f:"Certo ou errado: recusar o teste do bafômetro é crime de desobediência.", v:"<b>Errado.</b> Ninguém é obrigado a produzir prova contra si.", lei:["cp330"] },
{ id:"ap6", tipo:"caso", sec:"autoridade", f:"Ex-preso xinga o delegado que o prendeu, encontrando-o na praia num domingo.", v:"<b>Desacato</b>: basta o nexo com a função, ainda que fora do expediente.", lei:["cp330"] },
{ id:"ap7", tipo:"juris", sec:"autoridade", f:"O desacato é incompatível com a CF e o Pacto de San José?", v:"<b>Não.</b> STF, ADPF 496 (recepcionado); STJ, 3ª Seção, HC 379.269.", lei:["cp330"], j:["stf-adpf496"] },
{ id:"ap8", tipo:"caso", sec:"corrupcao", f:"A cobra R$ 2 mil de B dizendo que conhece um servidor do Detran e vai \"apagar\" as multas; não tem essa intenção.", v:"<b>Tráfico de influência</b> (332). B é vítima, não coautor.", lei:["cp332"] },
{ id:"ap9", tipo:"caso", sec:"corrupcao", f:"Policial exige R$ 1 mil; o motorista paga. O motorista comete corrupção ativa?", v:"<b>Não.</b> Só \"oferecer ou prometer\" configuram o 333. O policial comete concussão.", lei:["cp332"] },
{ id:"ap10", tipo:"ce", sec:"corrupcao", f:"Certo ou errado: dar presente ao fiscal depois da vistoria, sem promessa prévia, é corrupção ativa.", v:"<b>Errado.</b> Não se pune a corrupção ativa subsequente.", lei:["cp332"] },
{ id:"ap11", tipo:"caso", sec:"corrupcao", f:"Empresário oferece propina ao fiscal, que recusa e o prende. Crime consumado?", v:"<b>Sim, corrupção ativa consumada</b> (formal). O fiscal não comete crime.", lei:["cp332"] },
{ id:"ap12", tipo:"distincao", sec:"corrupcao", f:"Art. 333 × art. 337-B.", v:"<b>333</b>: funcionário brasileiro; oferecer/prometer; 2 a 12. <b>337-B</b>: funcionário público estrangeiro em transação comercial internacional; prometer, oferecer <b>ou dar</b>; 1 a 8.", lei:["cp337b"] },
{ id:"ap13", tipo:"distincao", sec:"descaminho", f:"Descaminho × contrabando.", v:"<b>Descaminho</b>: mercadoria permitida, tributo iludido (1 a 4). <b>Contrabando</b>: mercadoria proibida (2 a 5).", lei:["cp334"] },
{ id:"ap14", tipo:"juris", sec:"descaminho", f:"Viajante traz eletrônicos com R$ 15 mil de tributos iludidos; é a terceira vez em dois anos (processos fiscais pendentes). Insignificância?", v:"<b>Não.</b> A reiteração afasta, ainda que abaixo de R$ 20 mil (Tema 1218).", lei:["cp334"], j:["stj-t1218","stj-t157"] },
{ id:"ap15", tipo:"juris", sec:"descaminho", f:"Primário é flagrado com 800 maços de cigarro paraguaio. Insignificância?", v:"<b>Sim</b> (Tema 1143: até 1.000 maços, sem reiteração).", lei:["cp334"], j:["stj-t1143"] },
{ id:"ap16", tipo:"ce", sec:"descaminho", f:"Certo ou errado: o aumento em dobro do descaminho só incide em voos clandestinos.", v:"<b>Errado.</b> O STJ aplica também a voos regulares.", lei:["cp334"] },
{ id:"ap17", tipo:"caso", sec:"previdencia", f:"Empresário omite empregados da folha; antes de qualquer fiscalização, declara e confessa tudo, sem pagar. E se ele for devedor contumaz inscrito no Cadin?", v:"Regra: <b>extinção da punibilidade</b> (337-A, §1º). Devedor contumaz: <b>não</b> (§5º, LC 225/2026).", lei:["cp337a"] },
{ id:"ap18", tipo:"ce", sec:"previdencia", f:"Certo ou errado: cabe insignificância na sonegação previdenciária de R$ 5 mil.", v:"<b>Errado</b> (STF e STJ).", lei:["cp337a"], j:["stj-jt220-5"] },
{ id:"ap19", tipo:"caso", sec:"previdencia", f:"Dono de bar interditado rompe os lacres colocados pela Vigilância Sanitária. Crime?", v:"<b>Art. 336</b> (violar selo ou sinal empregado por ordem de funcionário).", lei:["cp336"] }
],
importancia:{ nivel:5,
  texto:"Desacato, resistência, desobediência, corrupção ativa e descaminho × contrabando são campeões de prova; a banca explora o verbo do tipo, a insignificância e a diferença entre crime e infração administrativa.",
  decore:[
    ["Resistência (329)","detenção de <b>2 meses a 2 anos</b>; ato não executado: reclusão de 1 a 3; soma a pena da violência"],
    ["Desobediência (330)","detenção de <b>15 dias a 6 meses</b> e multa"],
    ["Desacato (331)","detenção de <b>6 meses a 2 anos</b>, ou multa; recepcionado (ADPF 496)"],
    ["Corrupção ativa (333)","reclusão de <b>2 a 12 anos</b>; verbos <b>oferecer ou prometer</b>"],
    ["Tráfico de influência (332)","reclusão de <b>2 a 5 anos</b>; <b>+metade</b> se alega que o funcionário recebe"],
    ["Descaminho (334) × contrabando (334-A)","<b>1 a 4</b> (mercadoria permitida) × <b>2 a 5</b> (proibida); dobro em transporte aéreo, marítimo ou fluvial"],
    ["Insignificância no descaminho","até <b>R$ 20 mil</b>, sem reiteração (Temas 157 e 1218)"],
    ["Cigarros e insignificância","até <b>1.000 maços</b>, sem reiteração (Tema 1143)"],
    ["Sonegação previdenciária (337-A)","reclusão de <b>2 a 5 anos</b>; crime material (SV 24)"]],
  macetes:[
    ["Violência ou não","Com violência ou ameaça ao funcionário: resistência. Sem: desobediência. Ofensa: desacato."],
    ["Corrupção ativa não tem \"dar\"","Quem só paga depois de exigência ou solicitação não comete o art. 333."],
    ["Permitida ou proibida","Descaminho ilude tributo de mercadoria permitida; contrabando é mercadoria proibida."]] },
comparativo:{ titulo:"Majorado × privilegiado × qualificado nos crimes de particular", head:["Forma ou circunstância","Onde aparece"], rows:[
  ["<b>Qualificada pelo resultado frustrado:</b> o ato visado não se executa em razão da resistência (reclusão de 1 a 3)","Resistência, art. 329, § 1º"],
  ["<b>Qualificada pela vantagem:</b> usurpação com vantagem (reclusão de 2 a 5)","Usurpação de função, art. 328, parágrafo único"],
  ["<b>Majorada em metade:</b> insinua que a vantagem vai ao funcionário","Tráfico de influência, art. 332, parágrafo único"],
  ["<b>Majorada em 1/3:</b> o funcionário retarda, omite ou infringe dever em razão da vantagem","Corrupção ativa, art. 333, parágrafo único"],
  ["<b>Dobro:</b> transporte aéreo, marítimo ou fluvial","Descaminho e contrabando, arts. 334 e 334-A"],
  ["<b>Cúmulo material:</b> pena do crime mais a da violência empregada","Resistência (329, § 2º)"]]},
prova:[
  { tipo:"ce", enun:"A resistência pressupõe ato legal, praticado por funcionário competente ou por quem lhe preste auxílio, e violência ou ameaça para impedi-lo.", gab:"Certo", com:"São os elementos do art. 329. Ato ilegal não gera resistência." },
  { tipo:"ce", enun:"Quem paga propina ao policial depois de este exigi-la pratica corrupção ativa.", gab:"Errado", com:"O art. 333 pune oferecer ou prometer. Quem apenas cede à exigência não o pratica; o funcionário responde por concussão." },
  { tipo:"ce", enun:"Para o STF (ADPF 496), o crime de desacato foi recepcionado pela Constituição de 1988.", gab:"Certo", com:"O STF fixou que o art. 331 do CP foi recepcionado." },
  { tipo:"ce", enun:"O pagamento do tributo extingue a punibilidade do descaminho, como nos crimes tributários materiais.", gab:"Errado", com:"No descaminho, pagamento ou parcelamento não extinguem a punibilidade." },
  { tipo:"ce", enun:"Quem é pego com 800 maços de cigarros estrangeiros, sem reiteração, pode ter reconhecida a insignificância no contrabando, segundo o Tema 1143 do STJ.", gab:"Certo", com:"O limite é de 1.000 maços, desde que não haja reiteração." },
  { tipo:"caso", enun:"A cobra R$ 2 mil de B dizendo conhecer um servidor do Detran capaz de apagar multas, mas não tem tal intenção. Qual o crime de A e a situação de B?", com:"A pratica tráfico de influência (332). B é vítima do pretexto de influir, e não comete corrupção ativa." }],
resumo:[
  "Resistência exige violência ou ameaça contra ato legal; soma-se a pena da violência. Sem esses meios, é desobediência.",
  "Desobediência (330) exige ordem legal; recusar o bafômetro não a configura. Fugir de blitz de trânsito é infração do CTB; fugir de policiamento ostensivo é desobediência (Tema 1060).",
  "Desacato (331) exige nexo com a função e foi considerado recepcionado pelo STF (ADPF 496).",
  "Tráfico de influência vende fumaça; a vítima não é coautora. A pena aumenta em metade se se insinua que o funcionário recebe.",
  "Corrupção ativa (333): oferecer ou prometer, 2 a 12 anos, formal; não existe corrupção ativa subsequente nem pelo verbo dar.",
  "Descaminho: mercadoria permitida (1 a 4). Contrabando: proibida (2 a 5). Pena em dobro nos transportes aéreo, marítimo ou fluvial.",
  "Insignificância: R$ 20 mil no descaminho (sem reiteração); até 1.000 maços de cigarro; não vale nos crimes previdenciários.",
  "Sonegação previdenciária (337-A) é material; a LC 225/2026 afasta benefícios de extinção para o devedor contumaz."],
checklist:[
  "Distinguir resistência, desobediência e desacato pelos meios e pelo bem atingido",
  "Saber que o ato deve ser legal na resistência",
  "Explicar a recepção do desacato (ADPF 496)",
  "Diferenciar corrupção ativa, passiva, concussão e tráfico de influência",
  "Explicar por que quem cede à exigência não comete o art. 333",
  "Diferenciar descaminho e contrabando e citar suas penas",
  "Aplicar os limites de insignificância (R$ 20 mil e 1.000 maços)",
  "Identificar a natureza material do 337-A e a regra do devedor contumaz"],
questoes:[]
};

})();
