/* Direito Penal — Crimes contra a Administração Pública I: praticados por funcionário público (arts. 312 a 327).
   Conferido em 14/10/2026. Texto legal: Código Penal (Planalto). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STJT = "https://scon.stj.jus.br/SCON/jt/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

T.penal_adm_func = {
meta:{ tema:"Crimes contra a Administração I — Funcionário Público", atualizado:AT,
  foco:"Conceito penal de funcionário público (art. 327) e majorante do §2º; peculatos; inserção de dados falsos; concussão × corrupção passiva × prevaricação; facilitação de contrabando; condescendência, advocacia administrativa, violência arbitrária, abandono e sigilo funcional; insignificância (Súmula 599)." },
secoes:[
{ id:"conceito", titulo:"Funcionário público e regras gerais", curto:"Art. 327",
  rapido:["Funcionário público para o CP (327): quem exerce <b>cargo, emprego ou função pública</b>, ainda que <b>transitoriamente ou sem remuneração</b> (inclui estagiário, mesário, jurado).",
    "Equiparado (§1º): quem atua em <b>entidade paraestatal</b> ou em empresa <b>contratada ou conveniada para atividade típica</b> da Administração.",
    "§2º: <b>+1/3</b> para ocupantes de cargo em comissão ou função de direção/assessoramento de órgão da administração direta, sociedade de economia mista, empresa pública ou fundação pública — <b>não</b> inclui autarquias (STJ, APn 746).",
    "Crimes funcionais <b>próprios</b> (sem a qualidade de funcionário, o fato é atípico — ex.: prevaricação) × <b>impróprios</b> (vira outro crime — ex.: peculato-furto vira furto). O particular que concorre, sabendo da condição, responde pelo crime funcional (art. 30)."],
  teoria:[
    { h:"Quem é e quem não é", p:[
      "Múnus público (tutor, curador dativo, inventariante judicial) não é função pública: não são funcionários para fins penais (doutrina majoritária).",
      "O STJ considera funcionário público, para fins penais, o <b>advogado dativo</b> nomeado por convênio OAB/Defensoria.",
      "Dirigentes de Organizações Sociais/OSCIPs que gerem serviço público: equiparados (STJ, REsp 1.519.662/DF).",
      "Empresa contratada para atividade <b>atípica</b> (ex.: bufê de uma solenidade) não gera equiparação."]},
    { h:"Majorante do §2º e mandato eletivo", p:[
      "Mero mandato parlamentar não atrai o +1/3: exige-se função de direção ou imposição hierárquica (STF, Inq 3.997 e Inq 3.983). Presidente da Assembleia, Governador e Prefeito, por exercerem gestão, podem ter a majorante.",
      "Efeito da condenação (art. 92, I, a): perda do cargo quando a pena for igual ou superior a 1 ano em crime com abuso de poder ou violação de dever para com a Administração — não é automática, deve ser motivada."]},
    { h:"Insignificância", p:[
      "Súmula 599 do STJ: inaplicável aos crimes contra a administração pública. O próprio STJ admite afastá-la excepcionalmente quando a lesão for ínfima (Jurisprudência em Teses, ed. 220). Exceção consolidada: descaminho até R$ 20 mil (crime tributário, art. 334)."]}
  ],
  pegadinhas:["O §2º do art. 327 não menciona autarquia: dirigente de autarquia não recebe o +1/3 (legalidade estrita).","Estagiário de órgão público é funcionário público para fins penais."]},
{ id:"peculato", titulo:"Peculatos e crimes de sistema", curto:"Peculato",
  rapido:["Peculato-apropriação e peculato-desvio (312, caput): apropriar-se ou desviar bem móvel, <b>público ou particular</b>, de que tem a <b>posse em razão do cargo</b> — reclusão de <b>2 a 12</b> e multa.",
    "Peculato-furto (§1º): <b>não tem a posse</b>, mas subtrai ou concorre para a subtração, <b>valendo-se da facilidade</b> do cargo — mesma pena.",
    "Peculato culposo (§2º): concorrer culposamente para o crime de outrem — detenção de 3 meses a 1 ano. Reparação do dano <b>antes do trânsito em julgado extingue a punibilidade</b>; depois, <b>reduz de metade</b> (§3º).",
    "Peculato mediante erro de outrem (313): apropriar-se do que recebeu por erro alheio — 1 a 4. Inserção de dados falsos (313-A, funcionário <b>autorizado</b>, com fim de vantagem ou dano) — <b>2 a 12</b>. Alteração não autorizada de sistema (313-B) — detenção de 3 meses a 2 anos."],
  teoria:[
    { h:"Pontos de prova", p:[
      "Peculato de uso (usar viatura para levar a esposa ao cinema e devolvê-la): para o STJ e a doutrina majoritária, fato atípico (falta <i>animus rem sibi habendi</i>), salvo para prefeitos (DL 201/67, art. 1º, II). O STF já decidiu em sentido contrário (RHC 103.559). Não existe peculato de uso de bem fungível ou consumível (dinheiro).",
      "Servidor que recebe salário sem trabalhar não comete peculato (STJ). A \"rachadinha\" (devolução de salários a quem nomeou) é outra situação: desvio em favor do nomeante.",
      "Peculato culposo: reparação só aproveita a forma culposa. Há divergência se cabe quando o crime de outrem é furto comum de particular; as bancas costumam aceitar.",
      "313: se o próprio funcionário provocou o erro, é estelionato. O dolo surge depois do recebimento.",
      "313-A é crime próprio de funcionário <b>autorizado</b> a operar o sistema; formal. 313-B: qualquer funcionário; pena aumenta de 1/3 até a metade se houver dano.",
      "314 (extravio, sonegação ou inutilização de livro ou documento): só doloso. 315 (emprego irregular de verbas): aplicação diversa da prevista em lei, ainda que no interesse público; prefeito responde pelo DL 201/67."]}
  ],
  quadro:{ titulo:"Peculatos", head:["Figura","Núcleo","Pena"], rows:[
    ["Apropriação / desvio (312, caput)","Tem a posse em razão do cargo","Reclusão 2 a 12 e multa"],
    ["Furto (312, §1º)","Não tem a posse; usa a facilidade do cargo","Reclusão 2 a 12 e multa"],
    ["Culposo (312, §2º)","Concorre culposamente para crime de outrem","Detenção 3 meses a 1 ano"],
    ["Mediante erro de outrem (313)","Apropria-se do que recebeu por erro alheio","Reclusão 1 a 4 e multa"],
    ["Inserção de dados falsos (313-A)","Funcionário autorizado; fim de vantagem ou dano","Reclusão 2 a 12 e multa"]]},
  pegadinhas:["Reparar o dano no peculato doloso não extingue a punibilidade (pode, no máximo, ser arrependimento posterior, art. 16).","No peculato culposo a redução após o trânsito é de metade (fixa), não \"até\" metade."]},
{ id:"concussao", titulo:"Concussão, corrupção passiva e prevaricação", curto:"Concussão × corrupção",
  rapido:["Concussão (316): <b>exigir</b> vantagem indevida em razão da função, ainda que fora dela ou antes de assumi-la — reclusão de <b>2 a 12</b> e multa (Lei 13.964/2019). Formal.",
    "Excesso de exação (316, §1º): exigir tributo ou contribuição que sabe ou deveria saber indevido, ou cobrar o devido por meio vexatório ou gravoso — 3 a 8. Desviar o que recebeu indevidamente (§2º) — 2 a 12.",
    "Corrupção passiva (317): <b>solicitar ou receber</b> vantagem indevida, ou <b>aceitar promessa</b> — reclusão de <b>2 a 12</b> e multa. +1/3 se, em consequência, retarda, deixa de praticar ou pratica ato com infração do dever (§1º). Privilegiada (§2º): cede a <b>pedido ou influência</b> de outrem, sem vantagem — detenção de 3 meses a 1 ano, ou multa.",
    "Prevaricação (319): retardar ou deixar de praticar ato de ofício, ou praticá-lo contra lei, <b>para satisfazer interesse ou sentimento pessoal</b> — detenção de 3 meses a 1 ano e multa. 319-A: diretor de penitenciária ou agente que não veda o acesso do preso a celular — 3 meses a 1 ano (sem dolo específico)."],
  teoria:[
    { h:"Distinções decisivas", p:[
      "<b>Exigir</b> = concussão. <b>Solicitar, receber, aceitar promessa</b> = corrupção passiva. Se a intimidação usa violência ou grave ameaça estranha aos poderes do cargo (\"pago ou mato seu filho\"), é <b>extorsão</b>.",
      "Concussão é formal: o recebimento é exaurimento. A vítima que paga não comete crime.",
      "Corrupção passiva: o particular que oferece ou promete comete corrupção ativa (333) — exceção pluralista. Na modalidade solicitar, só o funcionário responde (o particular que paga após solicitação não comete 333).",
      "Para STF e STJ, a corrupção passiva <b>não exige ato de ofício</b> determinado dentro das atribuições formais do agente: basta a vantagem ligada à função (STJ, REsp 1.745.410/SP; STF, AP 470). A corrupção ativa, ao contrário, menciona ato de ofício.",
      "Corrupção própria (ato ilícito) × imprópria (ato lícito, ex.: agilizar certidão devida): ambas são crime.",
      "Fiscal tributário que exige vantagem: Lei 8.137/90, art. 3º, II (especialidade)."]},
    { h:"Favor × interesse pessoal", p:[
      "\"Favorzinho\" gratuito por pedido ou influência de alguém = <b>corrupção passiva privilegiada</b> (317, §2º).",
      "Ato por conta própria, para satisfazer interesse ou sentimento pessoal (vingança, amizade, paixão) = <b>prevaricação</b> (319), que exige esse dolo específico.",
      "Chefe que deixa de punir subordinado <b>por indulgência</b> = condescendência criminosa (320). Se deixar por medo ou interesse próprio = prevaricação."]},
    { h:"Facilitação de contrabando ou descaminho (318)", p:[
      "Funcionário com o <b>dever funcional</b> de reprimir (ex.: auditor da Receita) que facilita: 318 (3 a 8). O particular responde por contrabando ou descaminho — exceção pluralista.",
      "Funcionário sem esse dever que ajuda: partícipe do contrabando ou descaminho. Consuma-se com a facilitação, ainda que o contrabando não se consume. Competência federal."]}
  ],
  quadro:{ titulo:"Verbos que decidem a questão", head:["Conduta do funcionário","Crime","Pena"], rows:[
    ["Exige vantagem indevida","Concussão (316)","Reclusão 2 a 12 e multa"],
    ["Solicita, recebe ou aceita promessa","Corrupção passiva (317)","Reclusão 2 a 12 e multa"],
    ["Cede a pedido ou influência, sem vantagem","Corrupção passiva privilegiada (317, §2º)","Detenção 3 meses a 1 ano, ou multa"],
    ["Retarda/omite/pratica contra lei por interesse ou sentimento pessoal","Prevaricação (319)","Detenção 3 meses a 1 ano e multa"],
    ["Por indulgência, não responsabiliza subordinado","Condescendência criminosa (320)","Detenção 15 dias a 1 mês, ou multa"]]},
  pegadinhas:["Concussão e corrupção passiva têm hoje a mesma pena (2 a 12) desde a Lei 13.964/2019.","Policial que exige dinheiro para não lavrar multa: concussão. Que pede: corrupção passiva."]},
{ id:"outros", titulo:"Demais crimes funcionais", curto:"Outros",
  rapido:["Advocacia administrativa (321): patrocinar interesse privado perante a administração, <b>valendo-se da qualidade de funcionário</b> — detenção de 1 a 3 meses, ou multa; interesse <b>ilegítimo</b>: 3 meses a 1 ano e multa.",
    "Violência arbitrária (322): praticar violência no exercício da função ou a pretexto de exercê-la — 6 meses a 3 anos, <b>além da pena da violência</b> (cúmulo material). Há quem a considere revogada pela Lei de Abuso de Autoridade; STF e STJ já reconheceram sua vigência.",
    "Abandono de função (323): abandonar <b>cargo</b> público — 15 dias a 1 mês, ou multa; com prejuízo público, 3 meses a 1 ano e multa; em <b>faixa de fronteira</b> (150 km), 1 a 3 anos e multa.",
    "Violação de sigilo funcional (325): revelar fato que sabe em razão do cargo e deve permanecer em segredo — 6 meses a 2 anos, ou multa (subsidiário). §1º: emprestar senha ou usar indevidamente acesso restrito. §2º: com dano — reclusão de 2 a 6 e multa."],
  teoria:[
    { h:"Detalhes", p:[
      "Abandono de função exige ocupante de <b>cargo</b> (conceito restrito); greve não configura. Não admite tentativa.",
      "Art. 324: entrar em exercício antes das exigências legais ou continuar depois de saber oficialmente da exoneração, remoção, substituição ou suspensão.",
      "Art. 326 (sigilo de proposta de concorrência) foi tacitamente revogado pelo art. 337-J (Lei 14.133/2021), com pena maior.",
      "Revelar segredo de operação de instituição financeira: Lei 7.492/86, art. 18."]}
  ],
  pegadinhas:["Condescendência criminosa e prevaricação omissiva não admitem tentativa (omissivos próprios).","Na violação de sigilo funcional, a forma qualificada (com dano) passa a reclusão e multa cumulativa."]}
],
lei:[
{ art:"CP, art. 327", nome:"Funcionário público", sec:"conceito", itens:[
  { id:"cp327", rot:"Art. 327", t:"Considera-se funcionário público, para os efeitos penais, quem, <b class='g1'>embora transitoriamente ou sem remuneração</b>, exerce <b class='g1'>cargo, emprego ou função pública</b>.<br>§ 1º - <b class='g3'>Equipara-se</b> a funcionário público quem exerce cargo, emprego ou função em <b class='g1'>entidade paraestatal</b>, e quem trabalha para <b class='g1'>empresa prestadora de serviço contratada ou conveniada para a execução de atividade típica</b> da Administração Pública.<br>§ 2º - A pena será aumentada da <b class='g2'>terça parte</b> quando os autores dos crimes previstos neste Capítulo forem ocupantes de <b class='g1'>cargos em comissão ou de função de direção ou assessoramento</b> de órgão da administração direta, sociedade de economia mista, empresa pública ou fundação instituída pelo poder público.", c:["af1","af2","af3"], j:["stj-autarquia327","stf-mandato327","stj-s599"] }
]},
{ art:"CP, arts. 312 a 315", nome:"Peculatos e crimes correlatos", sec:"peculato", itens:[
  { id:"cp312", rot:"Art. 312", t:"<b class='g1'>Apropriar-se</b> o funcionário público de dinheiro, valor ou qualquer outro bem móvel, <b class='g1'>público ou particular</b>, de que tem a <b class='g3'>posse em razão do cargo</b>, ou <b class='g1'>desviá-lo</b>, em proveito próprio ou alheio:<br>Pena - reclusão, de <b class='g2'>dois a doze anos, e multa</b>.<br>§ 1º - Aplica-se a mesma pena, se o funcionário público, <b class='g3'>embora não tendo a posse</b> do dinheiro, valor ou bem, o <b class='g1'>subtrai, ou concorre para que seja subtraído</b>, em proveito próprio ou alheio, <b class='g3'>valendo-se de facilidade que lhe proporciona a qualidade de funcionário</b>.<br>§ 2º - Se o funcionário <b class='g1'>concorre culposamente</b> para o crime de outrem:<br>Pena - detenção, de <b class='g2'>três meses a um ano</b>.<br>§ 3º - No caso do parágrafo anterior, a <b class='g1'>reparação do dano</b>, se precede à sentença irrecorrível, <b class='g3'>extingue a punibilidade</b>; se lhe é posterior, <b class='g2'>reduz de metade</b> a pena imposta.", c:["af4","af5","af6","af7"], j:["stj-peculatouso","stj-salario"] },
  { id:"cp313", rot:"Arts. 313 a 315", t:"Art. 313 - Apropriar-se de dinheiro ou qualquer utilidade que, no exercício do cargo, <b class='g1'>recebeu por erro de outrem</b>: Pena - reclusão, de <b class='g2'>um a quatro anos, e multa</b>.<br>Art. 313-A. Inserir ou facilitar, o <b class='g1'>funcionário autorizado</b>, a inserção de dados falsos, alterar ou excluir indevidamente dados corretos nos sistemas informatizados ou bancos de dados da Administração Pública <b class='g3'>com o fim de obter vantagem indevida para si ou para outrem ou para causar dano</b>: Pena – reclusão, de <b class='g2'>2 (dois) a 12 (doze) anos, e multa</b>.<br>Art. 313-B. Modificar ou alterar, o funcionário, sistema de informações ou programa de informática <b class='g3'>sem autorização ou solicitação de autoridade competente</b>: Pena – detenção, de <b class='g2'>3 (três) meses a 2 (dois) anos, e multa</b>. Parágrafo único. As penas são aumentadas de um terço até a metade se da modificação ou alteração resulta dano para a Administração Pública ou para o administrado.<br>Art. 314 - <b class='g1'>Extraviar</b> livro oficial ou qualquer documento, de que tem a guarda em razão do cargo; <b class='g1'>sonegá-lo ou inutilizá-lo</b>, total ou parcialmente: Pena - reclusão, de <b class='g2'>um a quatro anos</b>, se o fato não constitui crime mais grave.<br>Art. 315 - Dar às verbas ou rendas públicas <b class='g1'>aplicação diversa da estabelecida em lei</b>: Pena - detenção, de <b class='g2'>um a três meses, ou multa</b>.", c:["af8","af9","af10"] }
]},
{ art:"CP, arts. 316 a 320", nome:"Concussão, corrupção passiva, prevaricação", sec:"concussao", itens:[
  { id:"cp316", rot:"Art. 316", t:"<b class='g1'>Exigir</b>, para si ou para outrem, direta ou indiretamente, <b class='g3'>ainda que fora da função ou antes de assumi-la, mas em razão dela</b>, vantagem indevida:<br>Pena - reclusão, de <b class='g2'>2 (dois) a 12 (doze) anos, e multa</b>.<br>§ 1º - Se o funcionário exige <b class='g1'>tributo ou contribuição social que sabe ou deveria saber indevido</b>, ou, quando devido, emprega na cobrança <b class='g1'>meio vexatório ou gravoso</b>, que a lei não autoriza: Pena - reclusão, de <b class='g2'>3 (três) a 8 (oito) anos, e multa</b>.<br>§ 2º - Se o funcionário desvia, em proveito próprio ou de outrem, o que recebeu indevidamente para recolher aos cofres públicos: Pena - reclusão, de <b class='g2'>dois a doze anos, e multa</b>.", nota:"Pena do caput pela Lei 13.964/2019 (antes, 2 a 8).", c:["af11","af12"] },
  { id:"cp317", rot:"Arts. 317 e 318", t:"Art. 317 - <b class='g1'>Solicitar ou receber</b>, para si ou para outrem, direta ou indiretamente, ainda que fora da função ou antes de assumi-la, mas em razão dela, vantagem indevida, ou <b class='g1'>aceitar promessa</b> de tal vantagem:<br>Pena – reclusão, de <b class='g2'>2 (dois) a 12 (doze) anos, e multa</b>.<br>§ 1º - A pena é aumentada de <b class='g2'>um terço</b>, se, em consequência da vantagem ou promessa, o funcionário <b class='g1'>retarda ou deixa de praticar qualquer ato de ofício ou o pratica infringindo dever funcional</b>.<br>§ 2º - Se o funcionário pratica, deixa de praticar ou retarda ato de ofício, com infração de dever funcional, <b class='g3'>cedendo a pedido ou influência de outrem</b>: Pena - detenção, de <b class='g2'>três meses a um ano, ou multa</b>.<br>Art. 318 - <b class='g1'>Facilitar, com infração de dever funcional</b>, a prática de contrabando ou descaminho: Pena - reclusão, de <b class='g2'>3 (três) a 8 (oito) anos, e multa</b>.", c:["af13","af14","af15","af16"], j:["stj-atooficio"] },
  { id:"cp319", rot:"Arts. 319 a 320", t:"Art. 319 - <b class='g1'>Retardar ou deixar de praticar, indevidamente, ato de ofício, ou praticá-lo contra disposição expressa de lei</b>, <b class='g3'>para satisfazer interesse ou sentimento pessoal</b>: Pena - detenção, de <b class='g2'>três meses a um ano, e multa</b>.<br>Art. 319-A. Deixar o <b class='g1'>Diretor de Penitenciária e/ou agente público</b>, de cumprir seu dever de <b class='g1'>vedar ao preso o acesso a aparelho telefônico, de rádio ou similar</b>, que permita a comunicação com outros presos ou com o ambiente externo: Pena: detenção, de <b class='g2'>3 (três) meses a 1 (um) ano</b>.<br>Art. 320 - Deixar o funcionário, <b class='g3'>por indulgência</b>, de responsabilizar <b class='g1'>subordinado</b> que cometeu infração no exercício do cargo ou, quando lhe falte competência, não levar o fato ao conhecimento da autoridade competente: Pena - detenção, de <b class='g2'>quinze dias a um mês, ou multa</b>.", c:["af17","af18"] }
]},
{ art:"CP, arts. 321 a 326", nome:"Demais crimes funcionais", sec:"outros", itens:[
  { id:"cp321", rot:"Arts. 321 a 324", t:"Art. 321 - <b class='g1'>Patrocinar</b>, direta ou indiretamente, <b class='g1'>interesse privado perante a administração pública</b>, <b class='g3'>valendo-se da qualidade de funcionário</b>: Pena - detenção, de <b class='g2'>um a três meses, ou multa</b>. Parágrafo único - Se o interesse é <b class='g1'>ilegítimo</b>: Pena - detenção, de <b class='g2'>três meses a um ano, além da multa</b>.<br>Art. 322 - <b class='g1'>Praticar violência</b>, no exercício de função ou a pretexto de exercê-la: Pena - detenção, de <b class='g2'>seis meses a três anos</b>, <b class='g3'>além da pena correspondente à violência</b>.<br>Art. 323 - <b class='g1'>Abandonar cargo público</b>, fora dos casos permitidos em lei: Pena - detenção, de <b class='g2'>quinze dias a um mês, ou multa</b>. § 1º - Se do fato resulta prejuízo público: Pena - detenção, de <b class='g2'>três meses a um ano, e multa</b>. § 2º - Se o fato ocorre em lugar compreendido na <b class='g1'>faixa de fronteira</b>: Pena - detenção, de <b class='g2'>um a três anos, e multa</b>.<br>Art. 324 - Entrar no exercício de função pública antes de satisfeitas as exigências legais, ou continuar a exercê-la, sem autorização, depois de saber oficialmente que foi exonerado, removido, substituído ou suspenso: Pena - detenção, de <b class='g2'>quinze dias a um mês, ou multa</b>.", c:["af19","af20"] },
  { id:"cp325", rot:"Art. 325", t:"<b class='g1'>Revelar fato de que tem ciência em razão do cargo e que deva permanecer em segredo</b>, ou facilitar-lhe a revelação: Pena - detenção, de <b class='g2'>seis meses a dois anos, ou multa</b>, se o fato não constitui crime mais grave.<br>§ 1º Nas mesmas penas deste artigo incorre quem: I – permite ou facilita, mediante <b class='g1'>atribuição, fornecimento e empréstimo de senha</b> ou qualquer outra forma, o acesso de pessoas não autorizadas a sistemas de informações ou banco de dados da Administração Pública; II – se utiliza, indevidamente, do acesso restrito.<br>§ 2º Se da ação ou omissão resulta <b class='g1'>dano</b> à Administração Pública ou a outrem: Pena – reclusão, de <b class='g2'>2 (dois) a 6 (seis) anos, e multa</b>.", c:["af21"] }
]}
],
juris:[
{ id:"stj-s599", trib:"STJ", tipo:"Súmula", num:"599", sec:"conceito", status:"atencao", data:"",
  titulo:"Sem insignificância contra a Administração", texto:"O princípio da insignificância é inaplicável aos crimes contra a administração pública.",
  explica:"O próprio STJ admite afastar a súmula em casos excepcionais de lesão ínfima (Jurisprudência em Teses, ed. 220, tese 2), e o STF já reconheceu a insignificância em peculato de valor irrisório. Em prova, siga a súmula, salvo se a questão citar a exceção.", lei:["cp327"], fonte:STJS },
{ id:"stj-autarquia327", trib:"STJ", tipo:"Jurisprudência", num:"APn 746/MT", sec:"conceito", status:"vigente", data:"Corte Especial, 19/12/2016",
  titulo:"Majorante do §2º não alcança dirigente de autarquia", texto:"A legalidade estrita é regra fundante do estado de direito e constitui o mais importante freio à atuação do poder público em matéria penal; não havendo previsão legal com relação aos dirigentes de autarquias, é inaplicável a majorante do § 2º do art. 327.",
  explica:"O texto cita administração direta, sociedade de economia mista, empresa pública e fundação pública — não autarquia.", lei:["cp327"], fonte:STJJ },
{ id:"stf-mandato327", trib:"STF", tipo:"Jurisprudência", num:"Inq 3.997 (e Inq 3.983)", sec:"conceito", status:"vigente", data:"2ª Turma, 21/06/2016",
  titulo:"Mandato parlamentar, por si, não atrai o +1/3", texto:"A causa de aumento do art. 327, § 2º, do Código Penal é incabível pelo mero exercício do mandato parlamentar; exige-se imposição hierárquica ou de direção.",
  explica:"Presidente de casa legislativa, Governador ou Prefeito (gestão) podem ter a majorante.", lei:["cp327"], fonte:STFJ },
{ id:"stj-dativo", trib:"STJ", tipo:"Jurisprudência", num:"EDcl no RHC 126.207/SP", sec:"conceito", status:"vigente", data:"6ª Turma, 02/06/2020",
  titulo:"Advogado dativo é funcionário público para fins penais", texto:"É possível considerar o defensor dativo, cujas atividades derivam de convênio entre a OAB e a Defensoria Pública para realização de defesa em local não provido por essa instituição, como funcionário público para fins penais, nos termos do art. 327 do CP.",
  explica:"Pode responder, por exemplo, por concussão ao exigir dinheiro do assistido.", lei:["cp327"], fonte:STJJ },
{ id:"stj-peculatouso", trib:"STJ", tipo:"Jurisprudência", num:"HC 94.168/MG", sec:"peculato", status:"divergencia", data:"6ª Turma, 01/04/2008",
  titulo:"Peculato de uso é atípico (salvo prefeito)", texto:"Analogamente ao furto de uso, o peculato de uso também não configura ilícito penal, tão somente administrativo. Todavia, o peculato-desvio é modalidade típica.",
  explica:"O STF, no RHC 103.559 (1ª Turma, 2014), entendeu que desviar é dar destinação diversa, ainda que por uso. Para prefeitos, o uso indevido é crime (DL 201/67, art. 1º, II).", lei:["cp312"], fonte:STJJ },
{ id:"stj-salario", trib:"STJ", tipo:"Jurisprudência", num:"AgRg no AREsp 2.073.825/RS", sec:"peculato", status:"vigente", data:"5ª Turma, 16/08/2022",
  titulo:"Receber salário sem trabalhar não é peculato", texto:"Não é típico o ato do servidor que se apropria de valores que já lhe pertenceriam, em razão do cargo por ele ocupado.",
  explica:"Pode haver ilícito administrativo ou improbidade. A \"rachadinha\" é diferente: desvio em favor de quem nomeou.", lei:["cp312"], fonte:STJJ },
{ id:"stj-atooficio", trib:"STJ", tipo:"Jurisprudência", num:"REsp 1.745.410/SP", sec:"concussao", status:"vigente", data:"6ª Turma, 02/10/2018",
  titulo:"Corrupção passiva não exige ato de ofício", texto:"O crime de corrupção passiva não exige nexo causal entre a oferta ou promessa de vantagem indevida e eventual ato de ofício praticável pelo funcionário público. O nexo a ser reconhecido é entre a vantagem e eventual facilidade ou suscetibilidade usufruível em razão da função pública exercida pelo agente.",
  explica:"\"Ato de ofício\" está no caput da corrupção ativa (333), não no da passiva (317), onde aparece só na majorante e na forma privilegiada.", lei:["cp317"], fonte:STJJ }
],
cards:[
{ id:"af1", tipo:"ce", sec:"conceito", f:"Certo ou errado: estagiário não remunerado de um tribunal pode cometer peculato.", v:"<b>Certo.</b> Art. 327: ainda que transitoriamente ou sem remuneração.", lei:["cp327"] },
{ id:"af2", tipo:"caso", sec:"conceito", f:"Presidente de autarquia estadual comete peculato. Incide o +1/3 do art. 327, §2º?", v:"<b>Não.</b> O §2º não lista autarquias (STJ, APn 746).", lei:["cp327"], j:["stj-autarquia327"] },
{ id:"af3", tipo:"distincao", sec:"conceito", f:"Crime funcional próprio × impróprio.", v:"<b>Próprio</b>: sem a qualidade de funcionário, fato atípico (prevaricação). <b>Impróprio</b>: vira outro crime (peculato-furto → furto; peculato-apropriação → apropriação indébita).", lei:["cp327"] },
{ id:"af4", tipo:"caso", sec:"peculato", f:"Servidor sem acesso ao almoxarifado usa o crachá para entrar à noite e levar notebooks do órgão.", v:"<b>Peculato-furto</b> (312, §1º): não tinha a posse, valeu-se da facilidade do cargo.", lei:["cp312"] },
{ id:"af5", tipo:"caso", sec:"peculato", f:"Servidor esquece a porta aberta; colega furta o notebook do órgão. O primeiro repara o dano antes da sentença definitiva.", v:"Colega: peculato-furto. Descuidado: <b>peculato culposo</b>, com <b>extinção da punibilidade</b> pela reparação antes do trânsito (§3º).", lei:["cp312"] },
{ id:"af6", tipo:"juris", sec:"peculato", f:"Servidor usa a viatura para um passeio pessoal e a devolve intacta. Para o STJ, há peculato?", v:"<b>Não</b> (peculato de uso, atípico). Se fosse prefeito: crime do DL 201/67. O STF já decidiu de outra forma.", lei:["cp312"], j:["stj-peculatouso"] },
{ id:"af7", tipo:"ce", sec:"peculato", f:"Certo ou errado: o peculato só incide sobre bens públicos.", v:"<b>Errado.</b> Abrange bem particular sob a posse do funcionário em razão do cargo (ex.: veículo apreendido no pátio).", lei:["cp312"] },
{ id:"af8", tipo:"caso", sec:"peculato", f:"Contribuinte paga duas vezes a mesma taxa no guichê; o servidor percebe e embolsa a diferença.", v:"<b>Peculato mediante erro de outrem</b> (313). Se tivesse provocado o erro, seria estelionato.", lei:["cp313"] },
{ id:"af9", tipo:"caso", sec:"peculato", f:"Servidor do INSS com senha de acesso insere vínculos falsos para conceder aposentadoria a um parente.", v:"<b>313-A</b> (inserção de dados falsos) — reclusão de 2 a 12 e multa.", lei:["cp313"] },
{ id:"af10", tipo:"ce", sec:"peculato", f:"Certo ou errado: o extravio culposo de documento público por servidor configura o art. 314.", v:"<b>Errado.</b> O 314 só é punido a título de dolo.", lei:["cp313"] },
{ id:"af11", tipo:"distincao", sec:"concussao", f:"Concussão × extorsão.", v:"<b>Concussão</b>: ameaça ligada aos poderes do cargo (\"vou interditar seu bar\"). <b>Extorsão</b>: violência ou grave ameaça estranha ao cargo (\"mato seu filho\").", lei:["cp316"] },
{ id:"af12", tipo:"caso", sec:"concussao", f:"Fiscal municipal exige R$ 5 mil para não interditar a loja; o dono não paga. Crime consumado?", v:"<b>Sim.</b> Concussão é formal — consuma-se com a exigência.", lei:["cp316"] },
{ id:"af13", tipo:"caso", sec:"concussao", f:"Guarda de trânsito pede R$ 200 para não multar; o motorista paga e ele não multa.", v:"<b>Corrupção passiva</b> (solicitar) com aumento de <b>1/3</b> (§1º — deixou de praticar ato de ofício).", lei:["cp317"] },
{ id:"af14", tipo:"caso", sec:"concussao", f:"Servidor atrasa um mandado a pedido de um amigo, sem receber nada.", v:"<b>Corrupção passiva privilegiada</b> (317, §2º).", lei:["cp317"] },
{ id:"af15", tipo:"juris", sec:"concussao", f:"Corrupção passiva exige que o ato pretendido esteja nas atribuições formais do agente?", v:"<b>Não</b> (STJ, REsp 1.745.410; STF). Basta a vantagem relacionada à função.", lei:["cp317"], j:["stj-atooficio"] },
{ id:"af16", tipo:"caso", sec:"concussao", f:"Auditor da Receita libera bagagem com mercadoria proibida em troca de nada, por conluio. E o viajante?", v:"Auditor: <b>318</b> (facilitação, 3 a 8). Viajante: <b>contrabando</b> (334-A). Exceção pluralista.", lei:["cp317"] },
{ id:"af17", tipo:"caso", sec:"concussao", f:"Servidor retarda a certidão do vizinho, seu desafeto, por vingança.", v:"<b>Prevaricação</b> (319): sentimento pessoal.", lei:["cp319"] },
{ id:"af18", tipo:"caso", sec:"concussao", f:"Diretor de presídio sabe que presos usam celulares e nada faz.", v:"<b>319-A</b> (prevaricação imprópria) — sem exigência de dolo específico.", lei:["cp319"] },
{ id:"af19", tipo:"numero", sec:"outros", f:"Abandono de função: penas simples, com prejuízo e em faixa de fronteira.", v:"<b>15 dias a 1 mês, ou multa</b>; prejuízo: <b>3 meses a 1 ano e multa</b>; fronteira: <b>1 a 3 anos e multa</b>.", lei:["cp321"] },
{ id:"af20", tipo:"caso", sec:"outros", f:"Servidor do MP usa seu prestígio para convencer o chefe a mudar norma de estágio e favorecer a irmã.", v:"<b>Advocacia administrativa</b> (321).", lei:["cp321"] },
{ id:"af21", tipo:"caso", sec:"outros", f:"Policial empresta sua senha do sistema de antecedentes a um amigo detetive particular.", v:"<b>325, §1º, I</b> (violação de sigilo funcional por empréstimo de senha). Com dano: §2º (reclusão de 2 a 6).", lei:["cp325"] }
],
questoes:[]
};

})();
