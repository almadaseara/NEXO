/* Direito Administrativo (I): regime jurídico e princípios; organização administrativa; estatais e fundações; poderes administrativos.
   Conferido em 14/10/2026. Texto: CF/88 (art. 37), Lei 9.784/1999, Decreto-Lei 200/1967, Lei 13.303/2016, CTN (art. 78), LINDB. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var STFS = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp";
var STFSV = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26";
var STFRG = "https://portal.stf.jus.br/jurisprudenciaRepercussao/pesquisarProcesso.asp";
var STJJ = "https://scon.stj.jus.br/SCON/";

/* ======================= REGIME JURÍDICO E PRINCÍPIOS ======================= */
T.adm_regime_principios = {
meta:{ tema:"Regime jurídico-administrativo e princípios", atualizado:AT,
  foco:"Supremacia e indisponibilidade do interesse público; princípios expressos (LIMPE) e implícitos ou legais (Lei 9.784, art. 2º): razoabilidade, proporcionalidade, motivação, segurança jurídica, autotutela, continuidade; LINDB (arts. 20 a 30); Súmula 473 e SV 13." },
secoes:[
{ id:"regime", titulo:"Regime jurídico-administrativo", curto:"Regime",
  rapido:["Dois pilares (Celso Antônio): <b>supremacia do interesse público</b> sobre o privado (gera <b>prerrogativas</b>: autoexecutoriedade, cláusulas exorbitantes, desapropriação) e <b>indisponibilidade do interesse público</b> (gera <b>sujeições</b>: concurso, licitação, controle).",
    "Interesse público <b>primário</b> (o da coletividade) × <b>secundário</b> (o patrimonial do Estado como pessoa jurídica) — só o primário justifica a supremacia.",
    "<b>Legalidade administrativa</b>: o administrador só faz o que a lei <b>autoriza</b> (para o particular, pode tudo o que a lei não proíbe).",
    "LINDB (Lei 13.655/2018): não se decide com base em <b>valores jurídicos abstratos</b> sem considerar as <b>consequências práticas</b> (art. 20); o agente responde pessoalmente por decisões ou opiniões técnicas só em caso de <b>dolo ou erro grosseiro</b> (art. 28)."],
  teoria:[
    { h:"Juridicidade e reserva legal", p:[
      "A doutrina moderna fala em <b>juridicidade</b>: a Administração se vincula não só à lei, mas ao Direito como um todo (Constituição, princípios).",
      "Exceções à legalidade estrita: medidas provisórias, estado de defesa e de sítio, decreto autônomo (art. 84, VI)."]}],
  pegadinhas:["Supremacia gera prerrogativas; indisponibilidade gera sujeições.","Interesse secundário (arrecadar mais, pagar menos) não prevalece sobre o primário."]},
{ id:"principios", titulo:"Princípios expressos e implícitos", curto:"Princípios",
  rapido:["<b>Impessoalidade</b>: finalidade pública, isonomia e vedação de promoção pessoal (art. 37, §1º — publicidade sem nomes, símbolos ou imagens de autoridades); atos são imputados ao órgão (validade dos atos do funcionário de fato).",
    "<b>Moralidade</b>: probidade, boa-fé, lealdade — base da vedação ao <b>nepotismo</b> (SV 13), que independe de lei.",
    "<b>Publicidade</b>: transparência e condição de eficácia dos atos; exceções: segurança da sociedade e do Estado, intimidade (Lei 12.527/2011). Divulgação nominal da remuneração de servidores é legítima (Tema 483).",
    "<b>Eficiência</b> (EC 19/1998): resultados, economicidade, avaliação de desempenho. Implícitos/legais: razoabilidade, proporcionalidade, motivação, segurança jurídica, autotutela, continuidade do serviço público, especialidade, hierarquia."],
  teoria:[
    { h:"Autotutela, segurança jurídica e motivação", p:[
      "Autotutela (Súmula 473/STF e Lei 9.784, art. 53): <b>anular</b> atos ilegais (dever) e <b>revogar</b> atos inconvenientes (faculdade), respeitados os direitos adquiridos e ressalvada a apreciação judicial.",
      "Segurança jurídica: decadência de <b>5 anos</b> para anular atos favoráveis, salvo má-fé (Lei 9.784, art. 54); vedada aplicação retroativa de nova interpretação (art. 2º, parágrafo único, XIII).",
      "Motivação: regra para atos que neguem ou afetem direitos, imponham sanções, decidam concursos e recursos, dispensem licitação ou anulem/revoguem atos (art. 50). Pode ser <b>aliunde</b> (concordância com parecer anterior).",
      "Teoria dos <b>motivos determinantes</b>: motivo declarado vincula — se falso ou inexistente, o ato é nulo, mesmo que não precisasse ser motivado (ex.: exoneração ad nutum motivada por \"falta de verbas\" seguida de nova nomeação)."]}],
  pegadinhas:["Anular é <b>dever</b>; revogar é <b>faculdade</b>.","Publicidade é requisito de <b>eficácia</b>, não de existência.","A ausência de motivação em ato que a exige gera nulidade (vício de forma)."]}
],
lei:[
{ art:"CF, art. 37, caput e §1º", nome:"Princípios expressos", sec:"principios", itens:[
  { id:"cf37a", rot:"Art. 37, caput e §1º", t:"A administração pública direta e indireta de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios obedecerá aos princípios de <b class='g1'>legalidade, impessoalidade, moralidade, publicidade e eficiência</b> (...).<br>§ 1º A publicidade dos atos, programas, obras, serviços e campanhas dos órgãos públicos deverá ter caráter educativo, informativo ou de orientação social, dela <b class='g3'>não podendo constar nomes, símbolos ou imagens que caracterizem promoção pessoal</b> de autoridades ou servidores públicos.", c:["rp1","rp2"], j:["stf-sv13a"] }]},
{ art:"Lei 9.784/1999", nome:"Princípios legais, motivação e autotutela", sec:"principios", itens:[
  { id:"l9784a2", rot:"Art. 2º, caput", t:"A Administração Pública obedecerá, dentre outros, aos princípios da <b class='g1'>legalidade, finalidade, motivação, razoabilidade, proporcionalidade, moralidade, ampla defesa, contraditório, segurança jurídica, interesse público e eficiência</b>.", c:["rp3"] },
  { id:"l9784a50", rot:"Art. 50, I a VIII e §1º", t:"Os atos administrativos deverão ser <b class='g1'>motivados</b>, com indicação dos fatos e dos fundamentos jurídicos, quando: I - neguem, limitem ou afetem direitos ou interesses; II - imponham ou agravem deveres, encargos ou sanções; III - decidam processos administrativos de concurso ou seleção pública; IV - dispensem ou declarem a inexigibilidade de processo licitatório; V - decidam recursos administrativos; VI - decorram de reexame de ofício; VII - deixem de aplicar jurisprudência firmada sobre a questão ou discrepem de pareceres, laudos, propostas e relatórios oficiais; VIII - importem anulação, revogação, suspensão ou convalidação de ato administrativo.<br>§ 1º A motivação deve ser <b class='g1'>explícita, clara e congruente</b>, podendo consistir em <b class='g3'>declaração de concordância com fundamentos de anteriores pareceres</b>, informações, decisões ou propostas, que, neste caso, serão parte integrante do ato.", c:["rp4","rp5"] },
  { id:"l9784a53", rot:"Arts. 53 e 54", t:"Art. 53. A Administração <b class='g1'>deve anular</b> seus próprios atos, quando eivados de vício de legalidade, e <b class='g1'>pode revogá-los</b> por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos.<br>Art. 54. O direito da Administração de anular os atos administrativos de que decorram <b class='g1'>efeitos favoráveis</b> para os destinatários <b class='g1'>decai em cinco anos</b>, contados da data em que foram praticados, <b class='g3'>salvo comprovada má-fé</b>.", c:["rp6","rp7"], j:["stf-s473"] }]},
{ art:"LINDB, arts. 20 e 28", nome:"Segurança jurídica na aplicação do direito público", sec:"regime", itens:[
  { id:"lindb20", rot:"Arts. 20 e 28", t:"Art. 20. Nas esferas administrativa, controladora e judicial, <b class='g1'>não se decidirá com base em valores jurídicos abstratos</b> sem que sejam consideradas as <b class='g1'>consequências práticas</b> da decisão.<br>Art. 28. O agente público responderá pessoalmente por suas decisões ou opiniões técnicas em caso de <b class='g1'>dolo ou erro grosseiro</b>.", nota:"Incluídos pela Lei 13.655/2018.", c:["rp8"] }]}
],
juris:[
{ id:"stf-s473", trib:"STF", tipo:"Súmula", num:"Súmula 473", sec:"principios", status:"vigente", data:"1969",
  titulo:"Autotutela",
  texto:"A administração pode anular seus próprios atos, quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos; ou revogá-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos, e ressalvada, em todos os casos, a apreciação judicial.",
  explica:"Quando a anulação atinge interesses de terceiros com efeitos já produzidos, exige processo com contraditório (Tema 138).", lei:["l9784a53"], fonte:STFS },
{ id:"stf-sv13a", trib:"STF", tipo:"Súmula Vinculante", num:"SV 13", sec:"principios", status:"vigente", data:"21/08/2008",
  titulo:"Nepotismo",
  texto:"A nomeação de cônjuge, companheiro ou parente em linha reta, colateral ou por afinidade, até o terceiro grau, inclusive, da autoridade nomeante ou de servidor da mesma pessoa jurídica investido em cargo de direção, chefia ou assessoramento, para o exercício de cargo em comissão ou de confiança ou, ainda, de função gratificada na administração pública direta e indireta em qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios, compreendido o ajuste mediante designações recíprocas, viola a Constituição Federal.",
  explica:"Aplicação direta da moralidade e da impessoalidade — dispensa lei.", lei:["cf37a"], fonte:STFSV },
{ id:"stf-t483", trib:"STF", tipo:"Repercussão geral", num:"ARE 652.777 (Tema 483)", sec:"principios", status:"vigente", data:"23/04/2015",
  titulo:"Divulgação nominal da remuneração de servidores",
  texto:"É legítima a publicação, inclusive em sítio eletrônico mantido pela Administração Pública, dos nomes dos seus servidores e do valor dos correspondentes vencimentos e vantagens pecuniárias.",
  explica:"Prevalece a publicidade sobre a intimidade nesse caso: o servidor age em nome do Estado.", lei:["cf37a"], fonte:STFRG }
],
cards:[
{ id:"rp1", tipo:"caso", sec:"principios", f:"Prefeito coloca seu nome e foto em placas de obras públicas. Que princípio viola?", v:"<b>Impessoalidade</b> (art. 37, §1º — vedada promoção pessoal na publicidade oficial).", lei:["cf37a"] },
{ id:"rp2", tipo:"caso", sec:"principios", f:"Governador nomeia o próprio irmão como secretário de Estado (cargo político), com qualificação técnica. Nepotismo?", v:"Em regra, o STF <b>não</b> aplica a SV 13 a cargos <b>políticos</b>, salvo fraude ou inaptidão manifesta.", lei:["cf37a"], j:["stf-sv13a"] },
{ id:"rp3", tipo:"distincao", sec:"principios", f:"Razoabilidade × proporcionalidade.", v:"<b>Razoabilidade</b>: congruência lógica, bom senso. <b>Proporcionalidade</b>: adequação, necessidade e proporcionalidade estrita entre meio e fim (vedação de excesso).", lei:["l9784a2"] },
{ id:"rp4", tipo:"caso", sec:"principios", f:"Autoridade indefere pedido apenas dizendo \"acolho o parecer da procuradoria\". Motivação válida?", v:"<b>Sim</b> — motivação <b>aliunde</b> (art. 50, §1º); o parecer integra o ato.", lei:["l9784a50"] },
{ id:"rp5", tipo:"caso", sec:"principios", f:"Servidor comissionado é exonerado \"por falta de verbas\", e no dia seguinte outro é nomeado para o mesmo cargo. O ato é válido?", v:"<b>Não</b> — teoria dos <b>motivos determinantes</b>: o motivo declarado é falso.", lei:["l9784a50"] },
{ id:"rp6", tipo:"caso", sec:"principios", f:"Administração descobre, 6 anos depois, ilegalidade em ato que concedeu gratificação a servidor de boa-fé. Pode anular?", v:"<b>Não</b> — decadência de <b>5 anos</b> (art. 54), salvo comprovada má-fé.", lei:["l9784a53"] },
{ id:"rp7", tipo:"distincao", sec:"principios", f:"Anulação × revogação.", v:"<b>Anulação</b>: ilegalidade, dever, efeitos <b>ex tunc</b>, Administração ou Judiciário. <b>Revogação</b>: conveniência e oportunidade, faculdade, <b>ex nunc</b>, só a Administração.", lei:["l9784a53"], j:["stf-s473"] },
{ id:"rp8", tipo:"caso", sec:"regime", f:"Parecerista técnico errou ao interpretar norma controvertida, sem dolo nem erro grosseiro. Responde pessoalmente?", v:"<b>Não</b> (LINDB, art. 28): só dolo ou erro grosseiro.", lei:["lindb20"] }
],
importancia:{ nivel:5,
  texto:"Base de todo o Direito Administrativo e tema recorrente em provas policiais: a banca troca os efeitos de supremacia e indisponibilidade, mistura anulação com revogação e cobra prazos da Lei 9.784.",
  decore:[
    ["Princípios expressos (art. 37, caput)","<b>LIMPE</b>: legalidade, impessoalidade, moralidade, publicidade, eficiência"],
    ["Decadência para anular atos favoráveis (Lei 9.784, art. 54)","<b>5 anos</b>, salvo má-fé"],
    ["Anular (art. 53)","<b>dever</b> (ilegalidade)"],
    ["Revogar (art. 53)","<b>faculdade</b> (conveniência e oportunidade)"],
    ["Motivação (art. 50)","obrigatória em atos que <b>neguem ou afetem direitos</b>, sanções, concursos, recursos, dispensa de licitação"],
    ["Nepotismo","<b>SV 13</b>, vale sem lei"],
    ["Responsabilidade do agente (LINDB, art. 28)","só com <b>dolo ou erro grosseiro</b>"],
    ["Promoção pessoal (art. 37, § 1º)","vedada: sem nomes, símbolos ou imagens de autoridades"],
    ["Divulgação nominal da remuneração","legítima (<b>Tema 483</b>)"]],
  macetes:[
    ["Supremacia dá poder, indisponibilidade dá dever","Supremacia gera <b>prerrogativas</b>; indisponibilidade gera <b>sujeições</b> (concurso, licitação, controle)."],
    ["Anular é obrigação, revogar é escolha","Ilegal: a Administração <b>deve</b> anular. Inconveniente: ela <b>pode</b> revogar."],
    ["Motivo declarado vincula","Se o motivo apontado for falso, o ato cai, mesmo que a lei não exigisse motivação (motivos determinantes)."]] },
comparativo:{ titulo:"Anulação × revogação", head:["Anulação","Revogação"], rows:[
  ["<b>Fundamento:</b> ilegalidade (vício de legalidade)","<b>Fundamento:</b> conveniência e oportunidade (mérito)"],
  ["<b>Natureza:</b> dever da Administração","<b>Natureza:</b> faculdade da Administração"],
  ["<b>Quem faz:</b> a Administração ou o Judiciário","<b>Quem faz:</b> somente a Administração"],
  ["<b>Efeitos:</b> ex tunc (retroagem)","<b>Efeitos:</b> ex nunc (daqui para frente)"],
  ["<b>Limite de tempo:</b> decadência de 5 anos para atos favoráveis, salvo má-fé","<b>Limite:</b> respeitar os direitos adquiridos"]]},
prova:[
  { tipo:"ce", enun:"A supremacia do interesse público sobre o privado gera prerrogativas para a Administração, ao passo que a indisponibilidade do interesse público gera sujeições, como a exigência de concurso e de licitação.", gab:"Certo", com:"Os dois pilares do regime jurídico-administrativo têm efeitos distintos: supremacia, prerrogativas; indisponibilidade, sujeições." },
  { tipo:"ce", enun:"A publicidade é requisito de existência do ato administrativo, de modo que o ato não publicado não existe juridicamente.", gab:"Errado", com:"A publicidade é condição de eficácia, não de existência." },
  { tipo:"ce", enun:"O direito da Administração de anular atos de que decorram efeitos favoráveis aos destinatários decai em cinco anos, salvo comprovada má-fé.", gab:"Certo", com:"É a regra do art. 54 da Lei 9.784/1999." },
  { tipo:"ce", enun:"A motivação que apenas declara concordância com parecer anterior é nula, pois a lei exige que a autoridade reescreva os fundamentos no próprio ato.", gab:"Errado", com:"A motivação aliunde é válida: o parecer passa a integrar o ato (art. 50, § 1º)." },
  { tipo:"caso", enun:"Servidor comissionado é exonerado sob a justificativa de falta de verbas, e no dia seguinte outro é nomeado para o mesmo cargo. O ato de exoneração é válido?", com:"Não. Pela teoria dos motivos determinantes, o motivo declarado vincula a Administração; sendo falso, o ato é nulo." },
  { tipo:"caso", enun:"Prefeito mandou colocar seu nome e sua foto em placas de obras públicas. Qual princípio foi violado?", com:"Impessoalidade (art. 37, § 1º): a publicidade oficial não pode conter nomes, símbolos ou imagens que caracterizem promoção pessoal." }],
resumo:[
  "O regime jurídico-administrativo tem dois pilares: <b>supremacia</b> do interesse público (prerrogativas) e <b>indisponibilidade</b> (sujeições).",
  "Só o interesse público <b>primário</b> justifica a supremacia; o secundário (patrimonial do Estado) não.",
  "A Administração só faz o que a lei <b>autoriza</b>; o particular pode fazer o que a lei não proíbe.",
  "Princípios expressos: <b>LIMPE</b>. Entre os legais e implícitos estão razoabilidade, proporcionalidade, motivação, segurança jurídica, autotutela e continuidade.",
  "<b>Anular</b> é dever (ilegalidade, ex tunc); <b>revogar</b> é faculdade (mérito, ex nunc). Decadência de <b>5 anos</b> para atos favoráveis, salvo má-fé.",
  "A motivação é exigida nos casos do art. 50 e pode ser <b>aliunde</b>; o motivo declarado vincula (motivos determinantes).",
  "Nepotismo é vedado pela <b>SV 13</b> mesmo sem lei, mas, em regra, não alcança cargos políticos, salvo fraude ou inaptidão manifesta.",
  "A LINDB (arts. 20 e 28) exige considerar as consequências práticas e só responsabiliza o agente por <b>dolo ou erro grosseiro</b>."],
checklist:[
  "Distinguir supremacia de indisponibilidade e dizer o que cada uma gera.",
  "Diferenciar interesse público primário e secundário.",
  "Listar os princípios expressos do art. 37 (LIMPE).",
  "Explicar a vedação de promoção pessoal e a SV 13.",
  "Diferenciar anulação e revogação quanto a fundamento, efeitos e quem pode fazer.",
  "Lembrar a decadência de 5 anos e a exceção da má-fé.",
  "Citar os casos de motivação obrigatória e explicar a motivação aliunde.",
  "Explicar a teoria dos motivos determinantes.",
  "Dizer quando o agente responde pessoalmente (LINDB, art. 28)."],
questoes:[]
};

/* ======================= ORGANIZAÇÃO ADMINISTRATIVA ======================= */
T.adm_organizacao = {
meta:{ tema:"Organização administrativa", atualizado:AT,
  foco:"Centralização × descentralização (por outorga e por delegação) × desconcentração; órgãos públicos (teoria do órgão, classificação); administração indireta; autarquias (comuns, especiais, agências reguladoras, conselhos profissionais); consórcios públicos; terceiro setor." },
secoes:[
{ id:"tecnicas", titulo:"Centralização, descentralização e desconcentração", curto:"Técnicas",
  rapido:["<b>Desconcentração</b>: distribuição interna de competências <b>dentro da mesma pessoa jurídica</b>, criando <b>órgãos</b> — há <b>hierarquia</b>.",
    "<b>Descentralização</b>: transferência para <b>outra pessoa</b> — não há hierarquia, mas <b>controle finalístico</b> (tutela, supervisão ministerial).",
    "Descentralização por <b>outorga</b> (serviços/técnica): lei cria entidade e transfere a <b>titularidade</b> e a execução (indireta). Por <b>delegação</b> (colaboração): contrato ou ato transfere só a <b>execução</b> a particular (concessão, permissão).",
    "Administração indireta: <b>autarquias, fundações públicas, empresas públicas e sociedades de economia mista</b> (e consórcios públicos de direito público, como associações públicas)."],
  teoria:[
    { h:"Teoria do órgão", p:[
      "Teoria da <b>imputação volitiva</b> (Otto Gierke): a vontade do agente é imputada à pessoa jurídica a que pertence o órgão.",
      "Órgão <b>não tem personalidade jurídica</b>; alguns têm <b>capacidade processual</b> para defender prerrogativas (ex.: Câmara Municipal — Súmula 525/STJ).",
      "Classificação (Hely): <b>independentes</b> (cúpula dos Poderes), <b>autônomos</b> (Ministérios, Secretarias), <b>superiores</b> (diretorias, gabinetes) e <b>subalternos</b> (execução). Quanto à estrutura: simples × compostos; quanto à atuação: singulares × colegiados."]}],
  pegadinhas:["Desconcentração = mesma pessoa + hierarquia; descentralização = nova pessoa + controle finalístico.","Delegação transfere só a <b>execução</b>; outorga transfere a titularidade."]},
{ id:"autarquias", titulo:"Autarquias, agências e conselhos", curto:"Autarquias",
  rapido:["Autarquia: pessoa jurídica de <b>direito público</b>, <b>criada por lei específica</b>, para atividades <b>típicas de Estado</b>, com patrimônio e receita próprios.",
    "Regime: bens <b>públicos</b> (impenhoráveis, imprescritíveis), <b>imunidade</b> tributária recíproca nas finalidades essenciais, prerrogativas processuais (prazo em dobro, execução por precatório), responsabilidade <b>objetiva</b>, servidores estatutários (regime jurídico único), licitação.",
    "<b>Agências reguladoras</b>: autarquias em regime especial — dirigentes com <b>mandato fixo</b> (5 anos, vedada recondução — Lei 13.848/2019), autonomia decisória e quarentena.",
    "<b>Conselhos profissionais</b> (CREA, CRM...): natureza <b>autárquica</b> (ADI 1.717), podem contratar pelo regime celetista (ADC 36); a <b>OAB</b> é entidade <b>sui generis</b>, não integra a Administração (ADI 3.026)."],
  teoria:[
    { h:"Consórcios públicos e terceiro setor", p:[
      "Consórcio público (Lei 11.107/2005): reunião de entes por <b>contrato</b> precedido de protocolo de intenções ratificado por lei; se de direito público, forma <b>associação pública</b>, que integra a administração indireta de todos os consorciados.",
      "Terceiro setor (paraestatais, fora da Administração): Serviços Sociais Autônomos (Sistema S), Organizações Sociais (contrato de gestão), OSCIPs (termo de parceria), OSCs (Lei 13.019/2014). O Sistema S não precisa de concurso nem segue a Lei 14.133, mas presta contas ao TCU."]}],
  pegadinhas:["Autarquia é <b>criada</b> por lei; estatal tem criação <b>autorizada</b> por lei.","OAB não é autarquia (STF).","Agência executiva é qualificação de autarquia/fundação com contrato de gestão — não é nova entidade."]}
],
lei:[
{ art:"CF, art. 37, XIX e XX", nome:"Criação de entidades", sec:"autarquias", itens:[
  { id:"cf37xix", rot:"Art. 37, XIX e XX", t:"XIX - somente por <b class='g1'>lei específica</b> poderá ser <b class='g1'>criada autarquia</b> e <b class='g1'>autorizada a instituição</b> de empresa pública, de sociedade de economia mista e de fundação, cabendo à <b class='g3'>lei complementar</b>, neste último caso, definir as áreas de sua atuação;<br>XX - depende de <b class='g1'>autorização legislativa</b>, em cada caso, a criação de <b class='g1'>subsidiárias</b> das entidades mencionadas no inciso anterior, assim como a participação de qualquer delas em empresa privada;", c:["or1","or2"] }]},
{ art:"Decreto-Lei 200/1967, art. 5º, I", nome:"Conceito legal de autarquia", sec:"autarquias", itens:[
  { id:"dl200", rot:"DL 200/1967, art. 5º, I", t:"Autarquia - o serviço autônomo, <b class='g1'>criado por lei</b>, com <b class='g1'>personalidade jurídica, patrimônio e receita próprios</b>, para executar <b class='g1'>atividades típicas da Administração Pública</b>, que requeiram, para seu melhor funcionamento, gestão administrativa e financeira descentralizada.", c:["or3"], j:["stf-adi1717"] }]},
{ art:"Lei 9.784/1999, art. 1º, §2º", nome:"Órgão, entidade e autoridade", sec:"tecnicas", itens:[
  { id:"l9784a1", rot:"Art. 1º, §2º", t:"Para os fins desta Lei, consideram-se:<br>I - <b class='g1'>órgão</b> - a unidade de atuação integrante da estrutura da Administração direta e da estrutura da Administração indireta;<br>II - <b class='g1'>entidade</b> - a unidade de atuação dotada de <b class='g1'>personalidade jurídica</b>;<br>III - <b class='g1'>autoridade</b> - o servidor ou agente público dotado de poder de decisão.", c:["or4","or5"] }]}
],
juris:[
{ id:"stf-adi1717", trib:"STF", tipo:"ADI", num:"ADI 1.717", sec:"autarquias", status:"vigente", data:"07/11/2002",
  titulo:"Conselhos profissionais têm natureza autárquica",
  texto:"É inconstitucional a delegação, a entidade privada, de atividade típica de Estado que abrange poder de polícia, de tributar e de punir, no que concerne ao exercício de atividades profissionais regulamentadas.",
  explica:"Por isso os conselhos de fiscalização profissional são autarquias. ADC 36 (2020): podem contratar pela CLT. A OAB é exceção (ADI 3.026).", lei:["dl200"], fonte:STFJ }
],
cards:[
{ id:"or1", tipo:"distincao", sec:"autarquias", f:"Criação de autarquia × de empresa pública.", v:"<b>Autarquia</b>: <b>criada</b> por lei específica. <b>Empresa pública/SEM/fundação</b>: criação <b>autorizada</b> por lei, com registro dos atos constitutivos.", lei:["cf37xix"] },
{ id:"or2", tipo:"caso", sec:"autarquias", f:"Estatal quer criar uma subsidiária. Precisa de lei específica?", v:"Precisa de <b>autorização legislativa</b>, que pode ser genérica na própria lei instituidora (STF, ADI 1.649 e ADI 5.624).", lei:["cf37xix"] },
{ id:"or3", tipo:"caso", sec:"autarquias", f:"Credor de autarquia ganha ação. Pode penhorar bens dela?", v:"<b>Não</b>: bens públicos são impenhoráveis; execução por <b>precatório</b>.", lei:["dl200"] },
{ id:"or4", tipo:"caso", sec:"tecnicas", f:"Estado cria, por lei, a Secretaria de Segurança Pública. Descentralização ou desconcentração?", v:"<b>Desconcentração</b> — órgão dentro da mesma pessoa jurídica (o Estado).", lei:["l9784a1"] },
{ id:"or5", tipo:"caso", sec:"tecnicas", f:"Polícia Civil tem personalidade jurídica?", v:"<b>Não.</b> É <b>órgão</b> da administração direta do Estado.", lei:["l9784a1"] },
{ id:"or6", tipo:"distincao", sec:"tecnicas", f:"Descentralização por outorga × por delegação.", v:"<b>Outorga</b>: por lei, a entidade da indireta recebe titularidade e execução. <b>Delegação</b>: por contrato/ato, o particular recebe só a execução (concessão, permissão).", lei:[] },
{ id:"or7", tipo:"ce", sec:"autarquias", f:"Certo ou errado: a OAB é autarquia federal sujeita a concurso público e ao controle do TCU.", v:"<b>Errado.</b> Entidade <b>sui generis</b>, fora da Administração (ADI 3.026).", lei:[] }
],
importancia:{ nivel:4,
  texto:"A banca cobra a diferença entre desconcentração e descentralização, o modo de criação de cada entidade e a natureza de OAB, conselhos e Sistema S.",
  decore:[
    ["Criação de autarquia (art. 37, XIX)","<b>criada</b> por lei específica"],
    ["Criação de EP, SEM e fundação (art. 37, XIX)","<b>autorizada</b> por lei específica"],
    ["Subsidiárias (art. 37, XX)","exigem <b>autorização legislativa</b>"],
    ["Agência reguladora: mandato","<b>5 anos</b>, vedada recondução (Lei 13.848/2019)"],
    ["Conselhos profissionais","natureza <b>autárquica</b> (ADI 1.717)"],
    ["OAB","entidade <b>sui generis</b>, fora da Administração (ADI 3.026)"],
    ["Câmara Municipal em juízo","capacidade processual para defender prerrogativas (<b>Súmula 525/STJ</b>)"],
    ["Consórcio público","Lei <b>11.107/2005</b>; direito público = associação pública"],
    ["Conceito de autarquia","<b>DL 200/1967, art. 5º, I</b>"]],
  macetes:[
    ["Desconcentra por dentro, descentraliza por fora","Desconcentração cria <b>órgão</b> na mesma pessoa; descentralização cria ou usa <b>outra pessoa</b>."],
    ["Outorga leva o serviço, delegação leva a execução","Na outorga a lei transfere titularidade e execução; na delegação o contrato ou ato transfere só a execução."],
    ["Autarquia nasce da lei, estatal nasce autorizada","Autarquia é <b>criada</b>; EP, SEM e fundação têm criação <b>autorizada</b>."]] },
comparativo:{ titulo:"Desconcentração × descentralização", head:["Desconcentração","Descentralização"], rows:[
  ["<b>O que é:</b> distribuição interna de competências dentro da mesma pessoa jurídica","<b>O que é:</b> transferência de atividade para outra pessoa, jurídica ou particular"],
  ["<b>Resultado:</b> criação de órgãos, que não têm personalidade","<b>Resultado:</b> entidade da administração indireta ou particular delegatário"],
  ["<b>Relação:</b> há hierarquia","<b>Relação:</b> não há hierarquia, só controle finalístico (tutela)"],
  ["<b>Exemplo:</b> Secretaria de Segurança Pública criada pelo Estado","<b>Exemplo:</b> autarquia (por outorga); concessão ou permissão (por delegação)"],
  ["<b>Personalidade jurídica:</b> o órgão não tem","<b>Personalidade jurídica:</b> a entidade tem (a pessoa nova)"]]},
prova:[
  { tipo:"ce", enun:"A criação de uma secretaria de Estado por lei é exemplo de descentralização administrativa, pois transfere competências a uma nova entidade.", gab:"Errado", com:"É desconcentração: o órgão é criado dentro da mesma pessoa jurídica (o Estado), com hierarquia." },
  { tipo:"ce", enun:"A criação de autarquia depende de lei específica, enquanto a de empresa pública depende apenas de autorização legislativa, com registro posterior dos atos constitutivos.", gab:"Certo", com:"Art. 37, XIX: autarquia é criada por lei; EP, SEM e fundação têm a instituição autorizada por lei." },
  { tipo:"ce", enun:"A OAB é autarquia federal sujeita a concurso público e ao controle do TCU.", gab:"Errado", com:"O STF a considera entidade sui generis, fora da Administração (ADI 3.026)." },
  { tipo:"ce", enun:"O órgão público não possui personalidade jurídica, mas alguns têm capacidade processual para defender suas prerrogativas institucionais.", gab:"Certo", com:"É o caso da Câmara Municipal, conforme a Súmula 525/STJ." },
  { tipo:"caso", enun:"A Polícia Civil estadual pode ser demandada como pessoa jurídica, por ter personalidade própria?", com:"Não. É órgão da administração direta do Estado, sem personalidade jurídica." },
  { tipo:"caso", enun:"Os dirigentes de uma agência reguladora federal têm mandato de quantos anos, e podem ser reconduzidos?", com:"Mandato de 5 anos, vedada a recondução (Lei 13.848/2019, conforme o tema)." }],
resumo:[
  "<b>Desconcentração</b>: distribuição interna de competências, com órgãos e hierarquia, na mesma pessoa jurídica.",
  "<b>Descentralização</b>: transferência a outra pessoa; não há hierarquia, só <b>controle finalístico</b>.",
  "Por <b>outorga</b> (lei) transfere-se titularidade e execução; por <b>delegação</b> (contrato ou ato) só a execução.",
  "Órgão não tem personalidade jurídica (teoria da imputação), mas pode ter capacidade processual (Súmula 525/STJ).",
  "Autarquia é pessoa de direito público, <b>criada</b> por lei específica, com bens públicos e responsabilidade objetiva.",
  "Agências reguladoras são autarquias em regime especial, com mandato fixo de 5 anos.",
  "Conselhos profissionais são autárquicos (ADI 1.717); a OAB é <b>sui generis</b> (ADI 3.026).",
  "Consórcio público (Lei 11.107/2005) de direito público forma associação pública e integra a administração indireta.",
  "Terceiro setor (Sistema S, OS, OSCIP, OSC) fica fora da Administração, mas presta contas ao controle externo."],
checklist:[
  "Diferenciar desconcentração e descentralização.",
  "Diferenciar descentralização por outorga e por delegação.",
  "Dizer quais entidades integram a administração indireta.",
  "Explicar a teoria do órgão e a classificação dos órgãos.",
  "Dizer como se cria cada tipo de entidade (art. 37, XIX e XX).",
  "Listar o regime jurídico das autarquias.",
  "Explicar o regime especial das agências reguladoras.",
  "Saber a natureza dos conselhos profissionais e da OAB.",
  "Distinguir o consórcio público do terceiro setor."],
questoes:[]
};

/* ======================= ESTATAIS E FUNDAÇÕES ======================= */
T.adm_estatais_fundacoes = {
meta:{ tema:"Empresas estatais e fundações públicas", atualizado:AT,
  foco:"Empresa pública × sociedade de economia mista (Lei 13.303/2016); atuação econômica e prestação de serviço público; regime híbrido (concurso, licitação, teto, controle); imunidade e impenhorabilidade dos Correios; desestatização e subsidiárias (ADI 5.624); fundações públicas de direito público e privado." },
secoes:[
{ id:"estatais", titulo:"Empresa pública e sociedade de economia mista", curto:"Estatais",
  rapido:["Ambas: pessoas jurídicas de <b>direito privado</b>, criação <b>autorizada por lei</b>, para atividade econômica ou serviço público.",
    "<b>Empresa pública</b>: capital <b>integralmente público</b> (pode haver vários entes); <b>qualquer forma societária</b>; causas da União na <b>Justiça Federal</b>.",
    "<b>Sociedade de economia mista</b>: maioria das ações com direito a voto em mãos do poder público, capital também privado; forma de <b>sociedade anônima</b>; causas na <b>Justiça estadual</b> (mesmo as federais — Súmula 556/STF), salvo interesse da União.",
    "Regime híbrido: concurso público, teto (se recebem recursos públicos para custeio), licitação (Lei 13.303), controle do TCU, proibição de acumulação; empregados <b>celetistas</b>, sem estabilidade do art. 41 (mas a dispensa deve ser <b>motivada</b> — Tema 1.022)."],
  teoria:[
    { h:"Exploradoras de atividade econômica × prestadoras de serviço público", p:[
      "Exploradoras (art. 173): regime próprio das empresas privadas, sem privilégios fiscais não extensivos ao setor privado; bens penhoráveis.",
      "Prestadoras de serviço público em regime não concorrencial (ex.: <b>Correios</b>): o STF lhes reconhece <b>imunidade tributária recíproca</b>, impenhorabilidade de bens e execução por precatório.",
      "Falência: a Lei 11.101/2005 (art. 2º, I) exclui empresas públicas e sociedades de economia mista."]},
    { h:"Desestatização (ADI 5.624)", p:[
      "Alienação do <b>controle acionário</b> da empresa-matriz exige <b>autorização legislativa e licitação</b>.",
      "Alienação do controle de <b>subsidiárias e controladas</b> dispensa autorização legislativa específica e licitação, observados princípios e competitividade."]}],
  quadro:{ titulo:"Empresa pública × sociedade de economia mista", head:["","Empresa pública","Sociedade de economia mista"], rows:[
    ["Capital","100% público","Misto, controle público (maioria das ações com voto)"],
    ["Forma societária","Qualquer","Sociedade anônima"],
    ["Foro (federais)","Justiça Federal","Justiça Estadual (Súmula 556/STF)"],
    ["Exemplos","Caixa, Correios, BNDES","Banco do Brasil, Petrobras"]]},
  pegadinhas:["Crimes contra o Banco do Brasil: Justiça <b>estadual</b>; contra a Caixa: <b>federal</b>.","Empregado de estatal não tem estabilidade, mas a dispensa precisa de motivação (Tema 1.022)."]},
{ id:"fundacoes", titulo:"Fundações públicas", curto:"Fundações",
  rapido:["Patrimônio personalizado afetado a um fim social, sem fins lucrativos; área de atuação definida em <b>lei complementar</b> (art. 37, XIX).",
    "Podem ter personalidade de <b>direito público</b> (fundação autárquica — criada por lei, regime igual ao das autarquias, servidores estatutários) ou de <b>direito privado</b> (criação autorizada por lei).",
    "Se a fundação é de regime público ou privado depende do <b>estatuto</b> e das <b>atividades</b>: as de conteúdo econômico ou delegáveis admitem regime privado, inclusive trabalhista (Tema 545).",
    "Causas de fundação federal de direito público: Justiça Federal."],
  teoria:[
    { h:"Controle", p:[
      "Fundações públicas, mesmo as de direito privado, estão sujeitas a controle do Tribunal de Contas e ao controle finalístico do ente instituidor.",
      "Ao contrário das fundações privadas, não são veladas pelo Ministério Público nos termos do Código Civil."]}],
  pegadinhas:["Fundação de direito público = espécie de autarquia (\"fundação autárquica\").","Lei complementar define as <b>áreas</b> de atuação das fundações, não as cria."]}
],
lei:[
{ art:"Lei 13.303/2016, arts. 3º e 4º", nome:"Conceitos legais", sec:"estatais", itens:[
  { id:"l13303", rot:"Arts. 3º e 4º", t:"Art. 3º <b class='g1'>Empresa pública</b> é a entidade dotada de personalidade jurídica de <b class='g1'>direito privado</b>, com <b class='g1'>criação autorizada por lei</b> e com patrimônio próprio, cujo <b class='g1'>capital social é integralmente detido</b> pela União, pelos Estados, pelo Distrito Federal ou pelos Municípios.<br>Art. 4º <b class='g1'>Sociedade de economia mista</b> é a entidade dotada de personalidade jurídica de <b class='g1'>direito privado</b>, com criação autorizada por lei, sob a forma de <b class='g1'>sociedade anônima</b>, cujas <b class='g1'>ações com direito a voto pertençam em sua maioria</b> à União, aos Estados, ao Distrito Federal, aos Municípios ou a entidade da administração indireta.", c:["ef1","ef2"] }]},
{ art:"CF, art. 173, §§1º e 2º", nome:"Estado empresário", sec:"estatais", itens:[
  { id:"cf173", rot:"Art. 173, caput e §2º", t:"Ressalvados os casos previstos nesta Constituição, a exploração direta de atividade econômica pelo Estado só será permitida quando necessária aos <b class='g1'>imperativos da segurança nacional</b> ou a <b class='g1'>relevante interesse coletivo</b>, conforme definidos em lei.<br>(...)<br>§ 2º As empresas públicas e as sociedades de economia mista <b class='g3'>não poderão gozar de privilégios fiscais não extensivos às do setor privado</b>.", c:["ef3"], j:["stf-t1022","stf-adi5624"] }]}
],
juris:[
{ id:"stf-t1022", trib:"STF", tipo:"Repercussão geral", num:"RE 688.267 (Tema 1.022)", sec:"estatais", status:"vigente", data:"28/02/2024",
  titulo:"Dispensa de empregado de estatal exige motivação",
  texto:"As empresas públicas e as sociedades de economia mista, sejam elas prestadoras de serviço público ou exploradoras de atividade econômica, ainda que em regime concorrencial, têm o dever jurídico de motivar, em ato formal, a demissão de seus empregados concursados, não se exigindo processo administrativo. Tal motivação deve consistir em fundamento razoável, não se exigindo, porém, que se enquadre nas hipóteses de justa causa da legislação trabalhista.",
  explica:"Não há estabilidade, mas há dever de motivar (impessoalidade).", lei:["cf173"], fonte:STFRG },
{ id:"stf-adi5624", trib:"STF", tipo:"ADI", num:"ADI 5.624 (MC-Ref)", sec:"estatais", status:"vigente", data:"06/06/2019",
  titulo:"Venda de estatais e de subsidiárias",
  texto:"A alienação do controle acionário de empresas públicas e sociedades de economia mista exige autorização legislativa e licitação; a exigência de autorização legislativa não se aplica à alienação do controle de suas subsidiárias e controladas, cuja operação pode ser realizada sem licitação, desde que siga procedimentos que observem os princípios da administração pública, respeitada a competitividade.",
  explica:"Distinção matriz × subsidiária — muito cobrada.", lei:["cf173"], fonte:STFJ }
],
cards:[
{ id:"ef1", tipo:"distincao", sec:"estatais", f:"Empresa pública × sociedade de economia mista: capital e forma.", v:"<b>EP</b>: capital 100% público, qualquer forma. <b>SEM</b>: maioria do capital votante público, sociedade anônima.", lei:["l13303"] },
{ id:"ef2", tipo:"caso", sec:"estatais", f:"Assalto a agência do Banco do Brasil e a agência da Caixa. Que Justiça julga cada um?", v:"BB (SEM): <b>Justiça estadual</b>. Caixa (EP federal): <b>Justiça Federal</b>.", lei:["l13303"] },
{ id:"ef3", tipo:"caso", sec:"estatais", f:"Petrobras demite empregado concursado sem indicar motivo. Válido?", v:"<b>Não</b> — dever de motivação formal (Tema 1.022), sem exigência de processo administrativo nem de justa causa.", lei:["cf173"], j:["stf-t1022"] },
{ id:"ef4", tipo:"caso", sec:"estatais", f:"União quer vender o controle de uma subsidiária da Petrobras. Precisa de lei específica e licitação?", v:"<b>Não</b> (ADI 5.624) — basta procedimento competitivo. Para a empresa-matriz: lei e licitação.", lei:["cf173"], j:["stf-adi5624"] },
{ id:"ef5", tipo:"caso", sec:"fundacoes", f:"Fundação pública de direito público: regime dos bens e do pessoal?", v:"Igual ao das <b>autarquias</b>: bens públicos e servidores estatutários.", lei:[] }
],
importancia:{ nivel:4,
  texto:"Cai muito a comparação entre empresa pública e sociedade de economia mista, o foro competente, a dispensa de empregados (Tema 1.022) e a venda de estatais (ADI 5.624).",
  decore:[
    ["Empresa pública (Lei 13.303, art. 3º)","capital <b>100% público</b>; qualquer forma societária"],
    ["Sociedade de economia mista (art. 4º)","maioria das ações com voto pública; <b>S.A.</b>"],
    ["Foro de EP federal","<b>Justiça Federal</b>"],
    ["Foro de SEM (mesmo federal)","<b>Justiça Estadual</b> (Súmula 556/STF)"],
    ["Dispensa de empregado de estatal","exige <b>motivação formal</b> (Tema 1.022); sem processo nem justa causa"],
    ["Venda do controle da matriz","<b>lei autorizativa + licitação</b> (ADI 5.624)"],
    ["Venda do controle de subsidiária","sem lei específica e sem licitação, com procedimento competitivo"],
    ["Privilégios fiscais (art. 173, § 2º)","vedados se não extensivos ao setor privado"],
    ["Falência","EP e SEM excluídas (Lei 11.101, art. 2º, I)"]],
  macetes:[
    ["Banco do Brasil estadual, Caixa federal","BB é SEM (Justiça estadual); Caixa é EP (Justiça Federal)."],
    ["Sem estabilidade, mas com motivo","Empregado de estatal é celetista e não tem estabilidade, mas a dispensa precisa ser motivada."],
    ["Matriz precisa de lei, filha não","A venda do controle da matriz exige lei e licitação; a de subsidiárias, não."]] },
comparativo:{ titulo:"Empresa pública × sociedade de economia mista", head:["Empresa pública","Sociedade de economia mista"], rows:[
  ["<b>Capital:</b> integralmente público (pode haver vários entes)","<b>Capital:</b> misto, com maioria das ações com direito a voto em mãos do poder público"],
  ["<b>Forma societária:</b> qualquer uma","<b>Forma societária:</b> obrigatoriamente sociedade anônima"],
  ["<b>Foro das causas federais:</b> Justiça Federal","<b>Foro:</b> Justiça Estadual, mesmo se federal (Súmula 556/STF), salvo interesse da União"],
  ["<b>Exemplos:</b> Caixa, Correios, BNDES","<b>Exemplos:</b> Banco do Brasil, Petrobras"],
  ["<b>Personalidade:</b> direito privado, criação autorizada por lei","<b>Personalidade:</b> direito privado, criação autorizada por lei"]]},
prova:[
  { tipo:"ce", enun:"A sociedade de economia mista deve ser constituída sob a forma de sociedade anônima, e a maioria das ações com direito a voto pertence ao poder público.", gab:"Certo", com:"Art. 4º da Lei 13.303/2016." },
  { tipo:"ce", enun:"Por não terem estabilidade, os empregados concursados de empresas estatais podem ser dispensados sem qualquer motivação.", gab:"Errado", com:"Tema 1.022 do STF: a dispensa exige motivação formal, embora não se exija processo administrativo nem justa causa." },
  { tipo:"ce", enun:"A alienação do controle acionário de uma subsidiária de empresa estatal exige autorização legislativa específica e licitação.", gab:"Errado", com:"ADI 5.624: só a venda do controle da empresa-matriz exige lei e licitação; a de subsidiárias dispensa ambas, com procedimento competitivo." },
  { tipo:"ce", enun:"As empresas públicas e as sociedades de economia mista podem gozar de privilégios fiscais não extensivos às do setor privado.", gab:"Errado", com:"Art. 173, § 2º, da CF veda esses privilégios." },
  { tipo:"caso", enun:"Ocorreram assaltos a uma agência do Banco do Brasil e a uma agência da Caixa. Qual Justiça é competente em cada caso, quanto à natureza das entidades?", com:"BB é sociedade de economia mista (Justiça estadual); Caixa é empresa pública federal (Justiça Federal)." },
  { tipo:"caso", enun:"Uma fundação pública foi instituída com personalidade de direito público. Qual o regime de seus bens e de seu pessoal?", com:"Igual ao das autarquias (fundação autárquica): bens públicos e servidores estatutários." }],
resumo:[
  "EP e SEM são pessoas de <b>direito privado</b> com criação <b>autorizada</b> por lei, para atividade econômica ou serviço público.",
  "<b>EP</b>: capital 100% público, qualquer forma. <b>SEM</b>: maioria votante pública, S.A.",
  "Regime híbrido: concurso, teto (se houver recursos para custeio), licitação da Lei 13.303, controle do TCU; empregados celetistas.",
  "Não há estabilidade, mas a dispensa deve ser <b>motivada</b> (Tema 1.022).",
  "Exploradoras de atividade econômica seguem regime próprio das privadas; Correios, em serviço público não concorrencial, têm imunidade recíproca e execução por precatório.",
  "Venda do controle da <b>matriz</b>: lei e licitação. Das <b>subsidiárias</b>: sem lei específica nem licitação (ADI 5.624).",
  "Fundações públicas podem ser de direito público (regime de autarquia) ou privado; as áreas de atuação são definidas por lei complementar.",
  "Estatais não vão à falência (Lei 11.101, art. 2º, I)."],
checklist:[
  "Diferenciar empresa pública e sociedade de economia mista (capital, forma, foro).",
  "Citar a Súmula 556/STF e aplicá-la a casos.",
  "Explicar o regime híbrido de pessoal e de contratação.",
  "Aplicar o Tema 1.022 a um caso de dispensa.",
  "Distinguir exploradoras de atividade econômica de prestadoras de serviço público.",
  "Explicar o tratamento especial dos Correios.",
  "Diferenciar a venda da matriz e a de subsidiárias (ADI 5.624).",
  "Diferenciar fundação de direito público e de direito privado."],
questoes:[]
};

/* ======================= PODERES ADMINISTRATIVOS ======================= */
T.adm_poderes = {
meta:{ tema:"Poderes administrativos", atualizado:AT,
  foco:"Poder vinculado e discricionário; hierárquico (delegação e avocação — Lei 9.784); disciplinar; regulamentar (decreto executivo × autônomo); poder de polícia (conceito do CTN, ciclo, atributos, delegação — Tema 532, prescrição); abuso de poder (excesso e desvio)." },
secoes:[
{ id:"hierarquico", titulo:"Hierárquico, disciplinar e regulamentar", curto:"Hierárquico",
  rapido:["<b>Hierárquico</b>: ordenar, coordenar, controlar, corrigir, <b>delegar e avocar</b> dentro da mesma pessoa jurídica.",
    "<b>Delegação</b> (Lei 9.784): possível mesmo a órgão <b>não subordinado</b>; é revogável a qualquer tempo; o ato delegado considera-se editado pelo <b>delegado</b>. <b>Vedada</b> para: atos de caráter <b>normativo</b>, decisão de <b>recursos administrativos</b> e matérias de competência <b>exclusiva</b> (\"NoRE\").",
    "<b>Avocação</b>: excepcional, temporária, por motivos relevantes justificados, de órgão <b>hierarquicamente inferior</b>.",
    "<b>Disciplinar</b>: apurar infrações e punir servidores e particulares com <b>vínculo especial</b> (contratados, alunos de escola pública). Apurar é dever; a escolha da sanção tem margem limitada pela lei e pela proporcionalidade."],
  teoria:[
    { h:"Regulamentar (normativo)", p:[
      "Decreto <b>executivo</b> (art. 84, IV): fiel execução da lei, não inova. Decreto <b>autônomo</b> (art. 84, VI): organização da administração sem despesa nem criação/extinção de órgãos; extinção de cargos vagos.",
      "Regulamento que extrapola a lei pode ser <b>sustado</b> pelo Congresso (art. 49, V) — controle de legalidade, não de constitucionalidade.",
      "Agências reguladoras editam normas técnicas no espaço deixado pela lei (deslegalização limitada)."]}],
  pegadinhas:["Decisão de recurso administrativo é <b>indelegável</b>.","Delegação pode ser a órgão não subordinado; avocação só de inferior.","Poder disciplinar não alcança particular sem vínculo especial (aí é poder de polícia)."]},
{ id:"policia", titulo:"Poder de polícia", curto:"Polícia",
  rapido:["CTN, art. 78: atividade da Administração que, <b>limitando ou disciplinando direito, interesse ou liberdade</b>, regula a prática de ato ou abstenção de fato em razão de interesse público (segurança, higiene, ordem, costumes, mercado...).",
    "Atributos: <b>discricionariedade</b> (em regra), <b>autoexecutoriedade</b> (agir sem ordem judicial — não vale para multas, que se cobram em execução) e <b>coercibilidade</b> (imperatividade).",
    "Ciclo de polícia: <b>ordem</b> (lei) → <b>consentimento</b> (licença, autorização) → <b>fiscalização</b> → <b>sanção</b>.",
    "Delegação: a <b>estatais de direito privado</b> com capital majoritariamente público, prestadoras exclusivas de serviço público próprio do Estado em regime não concorrencial, por lei — inclusive <b>sanção</b> (Tema 532). A particulares, só atos materiais/instrumentais. A <b>ordem</b> (legislação) é indelegável."],
  teoria:[
    { h:"Polícia administrativa × judiciária", p:[
      "<b>Administrativa</b>: incide sobre bens, direitos e atividades; preventiva (em regra); difusa por vários órgãos; regida pelo direito administrativo.",
      "<b>Judiciária</b>: incide sobre pessoas, ligada ao ilícito penal; repressiva (em regra); exercida por corporações especializadas (Polícia Civil e Federal); regida pelo processo penal.",
      "A PM exerce polícia administrativa (ostensiva); a Polícia Civil, polícia judiciária — mas a distinção é de função, não de órgão."]},
    { h:"Licença × autorização e prescrição", p:[
      "<b>Licença</b>: ato <b>vinculado</b> e definitivo (ex.: alvará de construção, CNH). <b>Autorização</b>: ato <b>discricionário</b> e precário (ex.: porte de arma).",
      "Ação punitiva da Administração federal no exercício do poder de polícia prescreve em <b>5 anos</b> (Lei 9.873/1999), com prescrição intercorrente de 3 anos."]}],
  pegadinhas:["Multa não é autoexecutória: cobra-se por execução fiscal.","Licença é vinculada; autorização é discricionária.","Fase de <b>ordem</b> (legislar) nunca é delegada."]},
{ id:"abuso", titulo:"Vinculação, discricionariedade e abuso de poder", curto:"Abuso",
  rapido:["<b>Vinculado</b>: a lei define todos os elementos — não há escolha. <b>Discricionário</b>: margem de escolha quanto ao <b>motivo e ao objeto</b> (mérito), dentro da lei.",
    "Competência, finalidade e forma são, em regra, <b>vinculados</b> mesmo nos atos discricionários.",
    "<b>Abuso de poder</b>: <b>excesso de poder</b> (age além da competência) ou <b>desvio de poder/finalidade</b> (age com fim diverso do previsto em lei).",
    "O Judiciário controla a <b>legalidade</b> (inclusive razoabilidade e proporcionalidade) dos atos discricionários, mas não substitui o mérito administrativo."],
  teoria:[
    { h:"Exemplos", p:[
      "Remoção de servidor como punição: <b>desvio de finalidade</b> (remoção não é sanção).",
      "Delegado que decreta prisão temporária por conta própria: <b>excesso de poder</b> (a competência é do juiz).",
      "Conceitos jurídicos indeterminados (\"boa conduta\", \"notório saber\") podem gerar discricionariedade, mas com zona de certeza controlável."]}],
  pegadinhas:["Excesso = competência; desvio = finalidade.","Mérito = motivo + objeto nos atos discricionários."]}
],
lei:[
{ art:"Lei 9.784/1999, arts. 11 a 15", nome:"Competência, delegação e avocação", sec:"hierarquico", itens:[
  { id:"l9784a11", rot:"Arts. 11, 12 e 13", t:"Art. 11. A competência é <b class='g1'>irrenunciável</b> e se exerce pelos órgãos administrativos a que foi atribuída como própria, salvo os casos de delegação e avocação legalmente admitidos.<br>Art. 12. Um órgão administrativo e seu titular poderão, se não houver impedimento legal, <b class='g1'>delegar parte da sua competência</b> a outros órgãos ou titulares, <b class='g3'>ainda que estes não lhe sejam hierarquicamente subordinados</b>, quando for conveniente, em razão de circunstâncias de índole técnica, social, econômica, jurídica ou territorial. (...)<br>Art. 13. <b class='g3'>Não podem ser objeto de delegação</b>: I - a edição de <b class='g1'>atos de caráter normativo</b>; II - a decisão de <b class='g1'>recursos administrativos</b>; III - as matérias de <b class='g1'>competência exclusiva</b> do órgão ou autoridade.", c:["pd1","pd2"] },
  { id:"l9784a14", rot:"Arts. 14 e 15", t:"Art. 14. (...) § 2º O ato de delegação é <b class='g1'>revogável a qualquer tempo</b> pela autoridade delegante.<br>§ 3º As decisões adotadas por delegação devem mencionar explicitamente esta qualidade e <b class='g1'>considerar-se-ão editadas pelo delegado</b>.<br>Art. 15. Será permitida, em <b class='g3'>caráter excepcional e por motivos relevantes devidamente justificados</b>, a <b class='g1'>avocação temporária</b> de competência atribuída a <b class='g1'>órgão hierarquicamente inferior</b>.", c:["pd3"] }]},
{ art:"CTN, art. 78", nome:"Conceito de poder de polícia", sec:"policia", itens:[
  { id:"ctn78", rot:"Art. 78", t:"Considera-se poder de polícia atividade da administração pública que, <b class='g1'>limitando ou disciplinando direito, interêsse ou liberdade</b>, regula a prática de ato ou abstenção de fato, em razão de interêsse público concernente à segurança, à higiene, à ordem, aos costumes, à disciplina da produção e do mercado, ao exercício de atividades econômicas dependentes de concessão ou autorização do Poder Público, à tranqüilidade pública ou ao respeito à propriedade e aos direitos individuais ou coletivos.<br>Parágrafo único. Considera-se regular o exercício do poder de polícia quando desempenhado pelo órgão competente nos limites da lei aplicável, com observância do processo legal e, tratando-se de atividade que a lei tenha como discricionária, sem abuso ou desvio de poder.", nota:"O exercício do poder de polícia é fato gerador de <b>taxa</b> (CTN, art. 77).", c:["pd4","pd5","pd6"], j:["stf-t532"] }]}
],
juris:[
{ id:"stf-t532", trib:"STF", tipo:"Repercussão geral", num:"RE 633.782 (Tema 532)", sec:"policia", status:"vigente", data:"26/10/2020",
  titulo:"Delegação do poder de polícia a estatais",
  texto:"É constitucional a delegação do poder de polícia, por meio de lei, a pessoas jurídicas de direito privado integrantes da Administração Pública indireta de capital social majoritariamente público que prestem exclusivamente serviço público de atuação própria do Estado e em regime não concorrencial.",
  explica:"Caso da BHTrans (multas de trânsito): admitidas as fases de consentimento, fiscalização e sanção; a de ordem (legislação) não se delega.", lei:["ctn78"], fonte:STFRG }
],
cards:[
{ id:"pd1", tipo:"lacuna", sec:"hierarquico", f:"Indelegáveis (Lei 9.784, art. 13): atos ______; decisão de ______ administrativos; competência ______.", v:"<b>normativos</b>; <b>recursos</b>; <b>exclusiva</b>.", lei:["l9784a11"] },
{ id:"pd2", tipo:"caso", sec:"hierarquico", f:"Secretário delega a órgão de outra Secretaria (não subordinado) a emissão de certidões. Possível?", v:"<b>Sim</b> — a delegação pode ocorrer a órgão não subordinado (art. 12).", lei:["l9784a11"] },
{ id:"pd3", tipo:"caso", sec:"hierarquico", f:"Ato praticado por delegação causa lesão. Contra quem se impetra o mandado de segurança?", v:"Contra o <b>delegado</b>: o ato considera-se por ele editado (art. 14, §3º; Súmula 510/STF).", lei:["l9784a14"] },
{ id:"pd4", tipo:"caso", sec:"policia", f:"Vigilância sanitária interdita restaurante com alimentos estragados, sem ordem judicial. Válido?", v:"<b>Sim</b> — <b>autoexecutoriedade</b> do poder de polícia em situação de urgência.", lei:["ctn78"] },
{ id:"pd5", tipo:"caso", sec:"policia", f:"Empresa pública municipal de trânsito, com capital majoritariamente público e serviço exclusivo, aplica multas por delegação legal. Constitucional?", v:"<b>Sim</b> (Tema 532).", lei:["ctn78"], j:["stf-t532"] },
{ id:"pd6", tipo:"distincao", sec:"policia", f:"Polícia administrativa × polícia judiciária.", v:"<b>Administrativa</b>: bens e atividades, preventiva, direito administrativo. <b>Judiciária</b>: pessoas e ilícito penal, repressiva, processo penal.", lei:["ctn78"] },
{ id:"pd7", tipo:"distincao", sec:"policia", f:"Licença × autorização.", v:"<b>Licença</b>: vinculada e definitiva (CNH, alvará de construção). <b>Autorização</b>: discricionária e precária (porte de arma).", lei:[] },
{ id:"pd8", tipo:"distincao", sec:"abuso", f:"Excesso de poder × desvio de finalidade (exemplo).", v:"<b>Excesso</b>: além da competência (agente aplica sanção que só o superior pode). <b>Desvio</b>: fim diverso (remoção como castigo).", lei:[] }
],
importancia:{ nivel:5,
  texto:"Conceitos de delegação, avocação, poder de polícia e abuso de poder aparecem sempre; a banca troca licença e autorização, excesso e desvio, e confunde o que pode ser delegado.",
  decore:[
    ["Delegação indevida (Lei 9.784, art. 13)","não se delega: <b>ato normativo</b>, <b>recurso administrativo</b>, <b>competência exclusiva</b>"],
    ["Delegação (art. 12)","possível até a órgão <b>não subordinado</b>; revogável a qualquer tempo"],
    ["Ato delegado","considera-se editado pelo <b>delegado</b> (art. 14, § 3º)"],
    ["Avocação (art. 15)","temporária, excepcional, de órgão <b>inferior</b>, com justificativa"],
    ["Conceito de poder de polícia","<b>CTN, art. 78</b>"],
    ["Ciclo de polícia","ordem, consentimento, fiscalização, sanção"],
    ["Delegação de polícia a estatais","<b>Tema 532</b>: consentimento, fiscalização e sanção, não a ordem"],
    ["Decreto executivo × autônomo","art. <b>84, IV</b> × art. <b>84, VI</b>"],
    ["Prescrição da ação punitiva federal (Lei 9.873)","<b>5 anos</b>; intercorrente <b>3 anos</b>"]],
  macetes:[
    ["NoRE: o que não se delega","<b>No</b>rmativo, <b>R</b>ecurso, <b>E</b>xclusiva."],
    ["Excesso é quanto ao tamanho, desvio é quanto ao rumo","Excesso de poder = além da competência. Desvio = fim diverso do legal."],
    ["Licença é porta aberta, autorização é favor","Licença é vinculada e definitiva; autorização é discricionária e precária."]] },
comparativo:{ titulo:"Licença × autorização", head:["Licença","Autorização"], rows:[
  ["<b>Natureza:</b> ato vinculado","<b>Natureza:</b> ato discricionário"],
  ["<b>Estabilidade:</b> definitiva","<b>Estabilidade:</b> precária (pode ser desfeita)"],
  ["<b>Quem tem direito:</b> preenchidos os requisitos, o particular tem direito ao ato","<b>Quem tem direito:</b> o particular tem mera expectativa; a Administração avalia conveniência"],
  ["<b>Exemplos:</b> alvará de construção, CNH","<b>Exemplos:</b> porte de arma"],
  ["<b>Fase do ciclo de polícia:</b> consentimento","<b>Fase do ciclo de polícia:</b> consentimento"]]},
prova:[
  { tipo:"ce", enun:"A decisão de recursos administrativos e a edição de atos normativos não podem ser objeto de delegação, nos termos da Lei 9.784/1999.", gab:"Certo", com:"Art. 13: também não se delegam as matérias de competência exclusiva." },
  { tipo:"ce", enun:"A delegação de competência só é possível entre órgãos que mantenham relação de subordinação hierárquica.", gab:"Errado", com:"O art. 12 admite a delegação ainda que o destinatário não seja hierarquicamente subordinado." },
  { tipo:"ce", enun:"A autoexecutoriedade do poder de polícia permite à Administração cobrar diretamente a multa aplicada, sem necessidade de execução fiscal.", gab:"Errado", com:"Multa não é autoexecutória: a cobrança se faz por execução." },
  { tipo:"ce", enun:"A fase de ordem de polícia, que é a edição da legislação, pode ser delegada a empresa estatal de direito privado por lei.", gab:"Errado", com:"No Tema 532, admitem-se consentimento, fiscalização e sanção; a ordem é indelegável." },
  { tipo:"caso", enun:"Chefe remove servidor para cidade distante para puni-lo por críticas. Que vício ocorre?", com:"Desvio de finalidade: remoção não é sanção e foi usada com fim diverso do previsto em lei." },
  { tipo:"caso", enun:"Delegado de polícia decreta, por conta própria, a prisão temporária de um suspeito. Que forma de abuso de poder ocorre?", com:"Excesso de poder: a competência para decretar a prisão temporária é do juiz." }],
resumo:[
  "O poder <b>hierárquico</b> permite ordenar, coordenar, controlar, corrigir, delegar e avocar dentro da mesma pessoa jurídica.",
  "Delegação: pode ser a órgão não subordinado e é revogável; o ato considera-se editado pelo delegado. Não se delegam normativos, recursos e competência exclusiva.",
  "Avocação é excepcional, temporária e só de órgão hierarquicamente inferior.",
  "Poder disciplinar alcança servidores e particulares com <b>vínculo especial</b>; apurar a infração é dever.",
  "Decreto executivo regulamenta a lei (art. 84, IV); o autônomo trata de organização sem despesa (art. 84, VI).",
  "Poder de polícia (CTN, art. 78): atributos de discricionariedade, autoexecutoriedade (exceto multa) e coercibilidade; ciclo ordem, consentimento, fiscalização, sanção.",
  "Polícia administrativa é preventiva e incide sobre bens e atividades; a judiciária é repressiva e incide sobre pessoas.",
  "Abuso de poder: <b>excesso</b> (além da competência) ou <b>desvio de finalidade</b>. O Judiciário controla a legalidade, não o mérito."],
checklist:[
  "Listar o que não pode ser delegado (Lei 9.784, art. 13).",
  "Diferenciar delegação e avocação.",
  "Explicar o poder disciplinar e seus destinatários.",
  "Diferenciar decreto executivo e autônomo.",
  "Citar o conceito de poder de polícia e seus atributos.",
  "Dizer por que a multa não é autoexecutória.",
  "Explicar o que pode e o que não pode ser delegado no poder de polícia (Tema 532).",
  "Diferenciar polícia administrativa e judiciária.",
  "Diferenciar licença e autorização.",
  "Diferenciar excesso de poder e desvio de finalidade."],
questoes:[]
};

})();
