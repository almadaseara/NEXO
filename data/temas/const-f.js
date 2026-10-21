/* Direito Constitucional (VI): normas constitucionais — aplicabilidade e eficácia (plena, contida, limitada).
   Conferido em 20/10/2026. Texto: CF/88 e Lei 13.300/2016 (Planalto). Classificação: José Afonso da Silva,
   com as de Maria Helena Diniz e Meirelles Teixeira em comparação. Prosa própria; dispositivos literais. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "20/10/2026";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var STFSV = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26";

T.normas_constitucionais = {
meta:{ tema:"Normas constitucionais: aplicabilidade e eficácia", atualizado:AT,
  foco:"Eficácia jurídica, aplicabilidade e efetividade; normas de eficácia plena, contida e limitada (institutiva e programática); como saber a qual grupo o dispositivo pertence; mandado de injunção e ADO contra a omissão; outras classificações (Diniz, Teixeira) e pegadinhas. Conferido em " + AT + "." },
secoes:[
{ id:"conceito", titulo:"Conceitos: eficácia, aplicabilidade e efetividade", curto:"Conceitos",
  rapido:["<b>Eficácia jurídica</b> é a aptidão da norma para produzir efeitos; <b>aplicabilidade</b> é a possibilidade de aplicá-la ao caso concreto; <b>efetividade</b> (eficácia social) é a norma ser cumprida na prática.",
    "<b>Toda</b> norma constitucional tem <b>alguma</b> eficácia: nenhuma é mero conselho. A diferença entre elas está no <b>grau</b> de aplicabilidade.",
    "A classificação mais cobrada é a de <b>José Afonso da Silva</b>: eficácia <b>plena</b>, <b>contida</b> e <b>limitada</b>.",
    "<b>Art. 5º, §1º</b>: os direitos e garantias fundamentais têm <b>aplicação imediata</b>. Isso <b>não</b> significa que todos sejam de eficácia plena."],
  teoria:[
    { h:"Eficácia, vigência e efetividade", p:[
      "<b>Vigência</b> diz respeito à existência da norma no tempo (ela já entrou em vigor e obriga). <b>Eficácia jurídica</b> diz respeito ao que ela é capaz de produzir no mundo jurídico. <b>Efetividade</b> é o cumprimento real da norma pela sociedade e pelo Estado.",
      "Uma norma pode estar <b>em vigor</b> e ter <b>eficácia reduzida</b> (porque depende de lei) e, ainda assim, nunca sair do papel, o que é falta de <b>efetividade</b>. A banca troca esses três conceitos entre si."]},
    { h:"Aplicabilidade imediata dos direitos fundamentais", p:[
      "O art. 5º, §1º impõe que os direitos fundamentais sejam aplicados já, sem esperar o legislador, <b>na maior medida possível</b>. É um comando de <b>otimização</b>, não uma promessa de que todo direito fundamental seja de eficácia plena.",
      "Por isso há, entre os direitos fundamentais, normas de eficácia <b>plena</b>, <b>contida</b> e <b>limitada</b> (exemplos no próximo item). Dizer que \"todos os direitos fundamentais são de eficácia plena\" é <b>errado</b>."]},
    { h:"Efeitos mínimos de qualquer norma constitucional", p:[
      "Mesmo a norma que depende de lei: <b>revoga</b> (não recepciona) o que for incompatível com ela; <b>impede</b> que se edite lei contrária (efeito paralisante); e <b>orienta a interpretação</b> das demais normas.",
      "É isso que permite afirmar que não existe norma constitucional sem eficácia alguma."]}],
  pegadinhas:["Vigência, eficácia e efetividade <b>não são</b> sinônimos.","\"Aplicação imediata\" do art. 5º, §1º não transforma tudo em eficácia plena."]},

{ id:"classif", titulo:"Eficácia plena, contida e limitada (José Afonso da Silva)", curto:"Plena × contida × limitada",
  rapido:["<b>Plena</b>: aplicabilidade <b>direta, imediata e integral</b>; não depende de lei e <b>não pode ser restringida</b> pela lei. Ex.: art. 2º; art. 5º, III e XXXVII.",
    "<b>Contida</b>: aplicabilidade <b>direta e imediata</b>, porém <b>não integral</b>, pois a norma admite que a lei (ou outra norma, ou um conceito aberto) <b>restrinja</b> seu alcance. Ex.: art. 5º, XIII, XV e LVIII. Enquanto não há lei, vale <b>plenamente</b>.",
    "<b>Limitada</b>: aplicabilidade <b>indireta, mediata e reduzida</b>; depende de lei para produzir os efeitos essenciais. Ex.: art. 7º, I, XI e XXVII; art. 37, VII.",
    "<b>Macete</b>: contida = \"<b>já vale</b>, mas <b>pode apertar</b>\"; limitada = \"<b>só vale</b> depois da lei\"."],
  teoria:[
    { h:"Eficácia plena", p:[
      "Produz <b>todos</b> os efeitos desde a entrada em vigor e <b>não precisa</b> de lei para funcionar. O legislador infraconstitucional <b>não pode</b> reduzir seu alcance.",
      "Exemplos clássicos: os remédios constitucionais; a separação e independência dos Poderes (art. 2º); a proibição de tortura e de tratamento desumano ou degradante (art. 5º, III); a vedação de juízo ou tribunal de exceção (art. 5º, XXXVII)."]},
    { h:"Eficácia contida (ou restringível)", p:[
      "Nasce <b>plena</b>: pode ser aplicada logo, sem lei. A diferença é que o próprio texto deixa <b>aberta</b> a possibilidade de o legislador (ou outra fonte) <b>restringir</b> o direito depois. Se a restrição vier, o direito encolhe; se não vier, vale por inteiro.",
      "Para Silva, a restrição pode vir de <b>três</b> formas: por <b>lei</b> (\"atendidas as qualificações que a lei estabelecer\", \"salvo nas hipóteses previstas em lei\"); por <b>conceitos genéricos</b> como ordem pública e bons costumes; e por <b>outras normas constitucionais</b> (por exemplo, as medidas do estado de defesa e do estado de sítio).",
      "Exemplos: a liberdade profissional; art. 5º, XIII (qualificações profissionais que a lei estabelecer); art. 5º, XV (\"nos termos da lei\"); art. 5º, LVIII (identificação criminal só nas hipóteses legais); art. 37, I, na parte dos <b>brasileiros</b> (\"requisitos estabelecidos em lei\")."]},
    { h:"Eficácia limitada", p:[
      "Sem a lei (ou outra norma integradora) a norma <b>não produz</b> seus efeitos essenciais. Sua aplicabilidade é <b>indireta</b> (depende de outra norma), <b>mediata</b> (só depois dela) e <b>reduzida</b> (efeitos mínimos até lá).",
      "Exemplos: art. 7º, I (proteção contra despedida arbitrária, \"nos termos de lei complementar\"); art. 7º, XI (participação nos lucros, \"conforme definido em lei\"); art. 7º, XXVII (proteção em face da automação, \"na forma da lei\"); art. 37, VII (greve do servidor, em lei específica); art. 37, I, na parte dos <b>estrangeiros</b> (\"na forma da lei\")."]},
    { h:"Eficácia negativa das programáticas", p:[
      "Para Marcelo Alexandrino e Vicente Paulo, as normas programáticas têm <b>eficácia negativa</b>: <b>revogam</b> o que for contrário ao programa e <b>impedem</b> a edição de normas posteriores que o contrariem.",
      "Para Alexandre de Moraes, nelas a <b>oportunidade</b> e a <b>extensão</b> do programa cabem ao <b>Legislativo</b>; por isso a eficácia técnica é <b>limitada</b>. Os <b>mandados de criminalização</b> (ordens para que a lei puna certas condutas) são citados como exemplos de eficácia limitada."]},
    { h:"Como decidir na prova", p:[
      "Procure a expressão que liga o direito à lei e pergunte: <b>sem a lei o direito já funciona?</b> Se sim e a lei só pode <b>restringir</b> (\"atendidas as qualificações\", \"salvo\"), é <b>contida</b>. Se não funciona sem a lei (\"na forma da lei\", \"conforme definido em lei\", \"lei disporá\"), é <b>limitada</b>.",
      "Se o texto não remete à lei e não admite restrição, é <b>plena</b>.",
      "Cuidado: \"nos termos da lei\" aparece nos <b>dois</b> grupos. O que decide é a lógica acima, não a expressão sozinha."]}],
  quadro:{ titulo:"Plena × contida × limitada", head:["Critério","Plena","Contida","Limitada"], rows:[
    ["Aplicabilidade","Direta, imediata e integral","Direta e imediata, mas não integral","Indireta, mediata e reduzida"],
    ["Precisa de lei para valer?","Não","Não","Sim"],
    ["A lei pode reduzir o alcance?","Não","Sim (restringe)","Não restringe: completa (regulamenta)"],
    ["Sem a lei, o que acontece?","Vale por inteiro","Vale por inteiro","Efeitos mínimos; direito não é exercido"],
    ["Exemplos","Art. 2º; art. 5º, III e XXXVII","Art. 5º, XIII, XV e LVIII; art. 37, I (brasileiros)","Art. 7º, I, XI e XXVII; art. 37, VII; art. 88"]] },
  pegadinhas:["Art. 5º, XIII é <b>contida</b>, não limitada: a profissão é livre desde já; só se admite lei exigindo qualificações.","\"Nos termos da lei\" não basta para dizer que é limitada: veja se o direito vale sem a lei.","O art. 37, I tem <b>duas</b> partes: brasileiros (contida) e estrangeiros (limitada)."]},

{ id:"limitada", titulo:"Normas de eficácia limitada: institutivas, programáticas e omissão", curto:"Limitada e omissão",
  rapido:["Duas espécies (Silva): <b>de princípio institutivo</b> (criam ou estruturam órgãos e institutos, e dependem de lei) e <b>de princípio programático</b> (traçam fins e programas sociais a realizar).",
    "<b>Institutivas</b>: art. 88 (lei dispõe sobre criação e extinção de Ministérios); art. 25, §3º (regiões metropolitanas por lei complementar estadual, de caráter <b>facultativo</b>: \"poderão\"). <b>Programáticas</b>: art. 196 (saúde) e art. 205 (educação).",
    "Contra a <b>omissão</b> que impede o exercício do direito: <b>mandado de injunção</b> (art. 5º, LXXI; Lei 13.300/2016), caso concreto; e <b>ADO</b> (art. 103, §2º), controle abstrato.",
    "No MI, a regra é decisão com <b>eficácia subjetiva limitada às partes</b>, mas o §1º do art. 9º admite efeito <b>ultra partes ou erga omnes</b> quando indispensável ao direito."],
  teoria:[
    { h:"Institutivas × programáticas", p:[
      "As <b>institutivas</b> (organizatórias) dependem de lei para <b>estruturar</b> algo: criar órgão, instituir região metropolitana, organizar territórios. Silva as divide em <b>impositivas</b> (a lei <b>deve</b> ser feita) e <b>facultativas</b> (a lei <b>pode</b> ser feita, como no art. 25, §3º).",
      "As <b>programáticas</b> definem <b>objetivos e metas</b> para o Estado (saúde, educação, cultura, ciência). Têm eficácia reduzida, mas <b>vinculam</b> o legislador e o administrador, impedem retrocesso e orientam a interpretação.",
      "O STF recusa a ideia de que programática seja promessa vazia: o Poder Público não pode se omitir por conveniência, mas pode alegar a <b>reserva do possível</b> diante da falta real de recursos, sempre respeitado o <b>mínimo existencial</b> (ADPF 45)."]},
    { h:"Mandado de injunção (art. 5º, LXXI; Lei 13.300/2016)", p:[
      "Cabe quando a <b>falta total ou parcial</b> de norma regulamentadora torna inviável o exercício de direitos e liberdades constitucionais e das prerrogativas ligadas à <b>nacionalidade, soberania e cidadania</b>. Considera-se <b>parcial</b> a regulamentação quando as normas editadas são <b>insuficientes</b> (art. 2º).",
      "Reconhecida a <b>mora legislativa</b>, o juiz <b>fixa prazo razoável</b> para o legislador agir e, se a mora persistir, <b>estabelece as condições</b> para o exercício do direito (art. 8º). Esse modelo é chamado de posição <b>concretista</b>: a Justiça garante o direito ao caso, em vez de apenas avisar o Legislativo.",
      "A regra é <b>eficácia subjetiva limitada às partes</b>, com efeitos até a edição da norma; mas o §1º do art. 9º permite <b>ultra partes ou erga omnes</b> quando isso for inerente ou indispensável ao exercício do direito."]},
    { h:"Ação direta de inconstitucionalidade por omissão — ADO (art. 103, §2º)", p:[
      "É <b>controle abstrato</b> (sem caso concreto), para tornar efetiva norma constitucional que depende de providência. Na decisão, o STF dá <b>ciência</b> ao Poder competente para agir; se o omisso for <b>órgão administrativo</b>, a CF fala em <b>trinta dias</b>.",
      "Regulamentação: Lei 9.868/1999, arts. 12-A a 12-H. Diferença-chave de prova: <b>MI</b> protege um <b>direito concreto</b> do impetrante; <b>ADO</b> combate a omissão em tese, de forma geral."]}],
  quadro:{ titulo:"Mandado de injunção × ADO", head:["Ponto","Mandado de injunção","ADO"], rows:[
    ["Natureza","Controle concreto (remédio constitucional)","Controle abstrato"],
    ["Objetivo","Viabilizar o exercício de um direito, liberdade ou prerrogativa","Tornar efetiva norma constitucional pela providência omitida"],
    ["Regra da decisão","Eficácia subjetiva limitada às partes (pode ser ultra partes ou erga omnes, art. 9º, §1º)","Ciência ao Poder omisso; 30 dias se for órgão administrativo"],
    ["Base","Art. 5º, LXXI; Lei 13.300/2016","Art. 103, §2º; Lei 9.868/1999, arts. 12-A a 12-H"]] },
  pegadinhas:["MI e ADO <b>não</b> são a mesma coisa: um é remédio individual/coletivo de caso concreto, o outro é controle abstrato.","No MI a lei diz que a eficácia é, <b>em regra</b>, limitada às partes; o efeito erga omnes é <b>exceção</b>."]},

{ id:"outras", titulo:"Outras classificações e armadilhas", curto:"Outras classificações",
  rapido:["<b>Maria Helena Diniz</b>: eficácia <b>absoluta</b> (nem emenda pode suprimir: cláusulas pétreas), <b>plena</b> (emendável, aplicação imediata), <b>relativa restringível</b> (= contida) e <b>relativa complementável</b> (= limitada).",
    "<b>Meirelles Teixeira</b>: normas de eficácia <b>plena</b> e de eficácia <b>limitada ou reduzida</b> (programáticas e de legislação).",
    "<b>Eficácia exaurida</b>: a norma já cumpriu seu fim e perdeu a utilidade prática (ex.: art. 3º do ADCT, a revisão constitucional de 1993).",
    "Para a maioria das provas de polícia, a base é <b>Silva</b>. Quando a questão trouxer outro autor, confira os nomes dos grupos."],
  teoria:[
    { h:"Diniz: absoluta, plena, restringível e complementável", p:[
      "Diniz separa as normas pelo <b>grau de proteção</b> contra mudança. A <b>absoluta</b> é a protegida até contra emenda (as cláusulas pétreas do art. 60, §4º); a <b>plena</b> pode ser alterada por emenda e é de aplicação imediata.",
      "A <b>relativa restringível</b> corresponde à contida de Silva; a <b>relativa complementável</b>, à limitada de Silva. Assim, quando a banca fala em \"complementável\", pense em lei que <b>completa</b>; em \"restringível\", pense em lei que <b>reduz</b>."]},
    { h:"Eficácia exaurida e outras categorias", p:[
      "Normas de <b>eficácia exaurida</b> (ou esgotada) são as que já produziram todos os efeitos previstos, em geral transitórias (ADCT). Continuam no texto, mas sem aplicação futura.",
      "Para Barroso, há ainda a divisão por <b>conteúdo</b>: normas constitucionais de <b>organização</b>, <b>definidoras de direitos</b> e <b>programáticas</b>. Não confunda esse critério (conteúdo) com o de Silva (grau de eficácia)."]},
    { h:"Pegadinhas frequentes", p:[
      "\"Norma de eficácia contida depende de lei para ser aplicada\": <b>errado</b>; é aplicada logo, e a lei pode restringir.",
      "\"Norma limitada não produz nenhum efeito\": <b>errado</b>; produz efeitos mínimos (revoga o incompatível, impede lei contrária e orienta a interpretação).",
      "\"O STF considera o art. 5º, XIII de eficácia limitada\": <b>errado</b>; o STF o trata como norma de eficácia <b>contida</b> (ex.: Exame da OAB; diploma de jornalista)."]}],
  pegadinhas:["Troca de autores: \"relativa complementável\" é de <b>Diniz</b>, não de Silva.","\"Exaurida\" não é \"revogada\": a norma segue no texto, sem efeito prático futuro."]}
],

lei:[
{ art:"CF, art. 5º, §1º", nome:"Aplicação imediata dos direitos fundamentais", sec:"conceito", itens:[
  { id:"cf5p1", rot:"Art. 5º, §1º", t:"As normas definidoras dos direitos e garantias fundamentais têm <b class='g1'>aplicação imediata</b>.", c:["nc1","nc2","nc12"], j:["stf-adpf45"] }]},
{ art:"CF, arts. 2º e 5º (eficácia plena)", nome:"Exemplos de normas de eficácia plena", sec:"classif", itens:[
  { id:"cf2", rot:"Art. 2º", t:"São Poderes da União, <b class='g1'>independentes e harmônicos</b> entre si, o Legislativo, o Executivo e o Judiciário.", c:["nc3"] },
  { id:"cf5iii", rot:"Art. 5º, III", t:"ninguém será submetido a <b class='g1'>tortura</b> nem a tratamento desumano ou degradante;", c:["nc3"] },
  { id:"cf5xxxvii", rot:"Art. 5º, XXXVII", t:"<b class='g1'>não haverá juízo ou tribunal de exceção</b>;", c:["nc3"] }]},
{ art:"CF, arts. 5º e 37, I (eficácia contida)", nome:"Exemplos de normas de eficácia contida", sec:"classif", itens:[
  { id:"cf5xiii", rot:"Art. 5º, XIII", t:"é <b class='g1'>livre o exercício de qualquer trabalho, ofício ou profissão</b>, <b class='g3'>atendidas as qualificações profissionais que a lei estabelecer</b>;", c:["nc4","nc5","nc11"], j:["stf-re603583","stf-re511961"] },
  { id:"cf5xv", rot:"Art. 5º, XV", t:"é <b class='g1'>livre a locomoção no território nacional</b> em tempo de paz, podendo qualquer pessoa, <b class='g3'>nos termos da lei</b>, nele entrar, permanecer ou dele sair com seus bens;", c:["nc6"] },
  { id:"cf5lviii", rot:"Art. 5º, LVIII", t:"o civilmente identificado <b class='g1'>não será submetido a identificação criminal</b>, <b class='g3'>salvo nas hipóteses previstas em lei</b>;", c:["nc6"] },
  { id:"cf37i", rot:"Art. 37, I", t:"os cargos, empregos e funções públicas são acessíveis aos brasileiros que preencham os <b class='g3'>requisitos estabelecidos em lei</b>, assim como aos estrangeiros, <b class='g3'>na forma da lei</b>;", nota:"Redação da EC 19/1998. Primeira parte (brasileiros): contida; segunda (estrangeiros): limitada.", c:["nc7"] }]},
{ art:"CF, arts. 7º, 25, 37 e 88 (eficácia limitada)", nome:"Exemplos de normas de eficácia limitada", sec:"limitada", itens:[
  { id:"cf7i", rot:"Art. 7º, I", t:"relação de emprego protegida contra despedida arbitrária ou sem justa causa, <b class='g3'>nos termos de lei complementar</b>, que preverá indenização compensatória, dentre outros direitos;", c:["nc8"] },
  { id:"cf7xi", rot:"Art. 7º, XI", t:"participação nos lucros, ou resultados, desvinculada da remuneração, e, excepcionalmente, participação na gestão da empresa, <b class='g3'>conforme definido em lei</b>;", c:["nc8"] },
  { id:"cf7xxvii", rot:"Art. 7º, XXVII", t:"proteção em face da automação, <b class='g3'>na forma da lei</b>;", c:["nc8"] },
  { id:"cf25p3", rot:"Art. 25, §3º", t:"Os Estados <b class='g1'>poderão</b>, mediante <b class='g3'>lei complementar</b>, instituir regiões metropolitanas, aglomerações urbanas e microrregiões, constituídas por agrupamentos de Municípios limítrofes, para integrar a organização, o planejamento e a execução de funções públicas de interesse comum.", nota:"Institutiva facultativa (\"poderão\").", c:["nc9"] },
  { id:"cf37vii", rot:"Art. 37, VII", t:"o direito de greve será exercido <b class='g3'>nos termos e nos limites definidos em lei específica</b>;", nota:"Redação da EC 19/1998.", c:["nc10"], j:["stf-mi708"] },
  { id:"cf88", rot:"Art. 88", t:"A <b class='g1'>lei disporá</b> sobre a criação e extinção de Ministérios e órgãos da administração pública.", nota:"Redação da EC 32/2001. Institutiva impositiva.", c:["nc9"] }]},
{ art:"CF, arts. 196 e 205 (programáticas)", nome:"Exemplos de normas programáticas", sec:"limitada", itens:[
  { id:"cf196", rot:"Art. 196", t:"A saúde é <b class='g1'>direito de todos e dever do Estado</b>, garantida mediante políticas sociais e econômicas que visem à redução do risco de doença e de outros agravos e ao acesso universal e igualitário às ações e serviços para sua promoção, proteção e recuperação.", c:["nc13"], j:["stf-adpf45"] },
  { id:"cf205", rot:"Art. 205", t:"A educação, <b class='g1'>direito de todos e dever do Estado e da família</b>, será promovida e incentivada com a colaboração da sociedade, visando ao pleno desenvolvimento da pessoa, seu preparo para o exercício da cidadania e sua qualificação para o trabalho.", c:["nc13"] }]},
{ art:"CF, arts. 5º, LXXI e 103, §2º; Leis 13.300/2016 e 9.868/1999", nome:"Omissão: mandado de injunção e ADO", sec:"limitada", itens:[
  { id:"cf5lxxi", rot:"Art. 5º, LXXI", t:"conceder-se-á <b class='g1'>mandado de injunção</b> sempre que a <b class='g1'>falta de norma regulamentadora</b> torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à <b class='g2'>nacionalidade, à soberania e à cidadania</b>;", c:["nc14","nc15"] },
  { id:"cf103p2", rot:"Art. 103, §2º", t:"Declarada a inconstitucionalidade por omissão de medida para tornar efetiva norma constitucional, será dada <b class='g1'>ciência ao Poder competente</b> para a adoção das providências necessárias e, em se tratando de órgão administrativo, para fazê-lo em <b class='g2'>trinta dias</b>.", c:["nc16"] },
  { id:"l13300a8", rot:"Lei 13.300/2016, art. 8º", t:"Reconhecido o estado de mora legislativa, será deferida a injunção para: I - <b class='g1'>determinar prazo razoável</b> para que o impetrado promova a edição da norma regulamentadora; II - <b class='g1'>estabelecer as condições</b> em que se dará o exercício dos direitos, das liberdades ou das prerrogativas reclamados ou, se for o caso, as condições em que poderá o interessado promover ação própria visando a exercê-los, caso não seja suprida a mora legislativa no prazo determinado.", c:["nc15"] },
  { id:"l13300a9", rot:"Lei 13.300/2016, art. 9º, caput e §1º", t:"A decisão terá <b class='g1'>eficácia subjetiva limitada às partes</b> e produzirá efeitos até o advento da norma regulamentadora. §1º Poderá ser conferida eficácia <b class='g3'>ultra partes ou erga omnes</b> à decisão, quando isso for inerente ou indispensável ao exercício do direito, da liberdade ou da prerrogativa objeto da impetração.", nota:"Transcrição do caput e do §1º.", c:["nc15"] }]}
],

juris:[
{ id:"stf-sv7", trib:"STF", tipo:"Súmula Vinculante", num:"SV 7", sec:"limitada", status:"vigente", data:"11/06/2008",
  titulo:"Art. 192, §3º, da CF (juros de 12% ao ano): eficácia limitada",
  texto:"A norma do § 3º do artigo 192 da Constituição, revogada pela Emenda Constitucional nº 40/2003, que limitava a taxa de juros reais a 12% ao ano, tinha sua aplicabilidade condicionada à edição de lei complementar.",
  explica:"Exemplo clássico de norma de eficácia limitada: sem a lei complementar, o limite de juros não era aplicável. Data conforme o material de estudo; confira na fonte.", lei:[], fonte:STFSV },
{ id:"stf-sv33", trib:"STF", tipo:"Súmula Vinculante", num:"SV 33", sec:"limitada", status:"vigente", data:"09/04/2014",
  titulo:"Aposentadoria especial do servidor: regras do RGPS até a lei",
  texto:"Aplicam-se ao servidor público, no que couber, as regras do regime geral da previdência social sobre aposentadoria especial de que trata o artigo 40, § 4º, inciso III da Constituição Federal, até a edição de lei complementar específica.",
  explica:"Surgiu de mandados de injunção: diante da mora legislativa, o STF mandou aplicar regras do RGPS enquanto a lei não vem. O art. 40 foi alterado depois (EC 103/2019); confira a redação atual na fonte.", lei:["cf5lxxi"], fonte:STFSV },
{ id:"stf-mi708", trib:"STF", tipo:"Mandado de injunção", num:"MI 708", sec:"limitada", status:"vigente", data:"25/10/2007",
  titulo:"Greve do servidor (art. 37, VII): mora legislativa",
  texto:"Reconhecida a mora legislativa na regulamentação do direito de greve dos servidores públicos, o STF determinou a aplicação, no que couber, da lei de greve do setor privado (Lei 7.783/1989) até a edição de lei específica.",
  explica:"Mostra a posição concretista do STF e que o art. 37, VII é de eficácia limitada. Resumo do entendimento; data e termos conforme o material de estudo, confira o acórdão na fonte.", lei:["cf37vii"], fonte:STFJ },
{ id:"stf-re603583", trib:"STF", tipo:"Recurso Extraordinário", num:"RE 603.583", sec:"classif", status:"vigente", data:"26/10/2011",
  titulo:"Exame de Ordem é constitucional (art. 5º, XIII)",
  texto:"O STF considerou constitucional a exigência de aprovação no Exame da OAB para o exercício da advocacia.",
  explica:"A lei pode estabelecer qualificações profissionais: por isso o art. 5º, XIII é de eficácia contida. Resumo da decisão; confira a tese na fonte.", lei:["cf5xiii"], fonte:STFJ },
{ id:"stf-re511961", trib:"STF", tipo:"Recurso Extraordinário", num:"RE 511.961", sec:"classif", status:"vigente", data:"17/06/2009",
  titulo:"Diploma de jornalismo não é exigível",
  texto:"O STF entendeu que a exigência de diploma de curso superior de jornalismo para o exercício da profissão de jornalista não foi recebida pela Constituição.",
  explica:"A restrição legal tem de ser <b>proporcional</b> e relacionada a qualificações realmente necessárias; aqui o STF a considerou excessiva. Resumo; confira na fonte.", lei:["cf5xiii"], fonte:STFJ },
{ id:"stf-adpf45", trib:"STF", tipo:"ADPF", num:"ADPF 45", sec:"limitada", status:"vigente", data:"29/04/2004",
  titulo:"Programáticas, reserva do possível e mínimo existencial",
  texto:"Em decisão monocrática, o Min. Celso de Mello reconheceu que o Judiciário pode, excepcionalmente, intervir em políticas públicas para preservar o mínimo existencial, e que a reserva do possível não pode ser usada para fraudar direitos fundamentais.",
  explica:"Base para dizer que norma programática não é promessa vazia. Decisão monocrática (a ação foi declarada prejudicada); data e resumo conforme o material de estudo, confira na fonte.", lei:["cf196"], fonte:STFJ },
{ id:"stf-ado26", trib:"STF", tipo:"ADO", num:"ADO 26", sec:"limitada", status:"atencao", data:"13/06/2019",
  titulo:"Mora legislativa na criminalização da homotransfobia",
  texto:"O STF reconheceu a mora do Congresso e, até a edição de lei, enquadrou a homofobia e a transfobia nos tipos penais da Lei 7.716/1989 (racismo).",
  explica:"Exemplo de ADO com solução provisória. Resumo conforme o material de estudo; confira os termos exatos da tese no acórdão antes de decorar.", lei:["cf103p2"], fonte:STFJ }
],

cards:[
{ id:"nc1", tipo:"ce", sec:"conceito", f:"Certo ou errado: como os direitos fundamentais têm aplicação imediata (art. 5º, §1º), todos são normas de eficácia plena.", v:"<b>Errado.</b> A aplicação imediata é comando de otimização. Há direitos fundamentais de eficácia contida (art. 5º, XIII) e limitada (art. 7º, XI).", lei:["cf5p1"] },
{ id:"nc2", tipo:"distincao", sec:"conceito", f:"Diferencie vigência, eficácia jurídica e efetividade.", v:"<b>Vigência</b>: a norma existe e obriga no tempo. <b>Eficácia</b>: aptidão para produzir efeitos jurídicos. <b>Efetividade</b>: cumprimento real da norma.", lei:["cf5p1"] },
{ id:"nc3", tipo:"caso", sec:"classif", f:"Uma lei cria um tribunal de exceção para julgar um crime específico. Que tipo de eficácia tem o dispositivo que veda isso?", v:"<b>Plena</b> (art. 5º, XXXVII): vale integralmente, sem lei, e a lei não pode reduzi-lo.", lei:["cf5xxxvii"] },
{ id:"nc4", tipo:"caso", sec:"classif", f:"Uma lei exige aprovação em exame para exercer certa profissão. Isso viola o art. 5º, XIII?", v:"<b>Em regra, não</b>: o dispositivo é de eficácia <b>contida</b> e a lei pode exigir qualificações profissionais, se razoáveis (ex.: Exame da OAB, RE 603.583).", lei:["cf5xiii"], j:["stf-re603583"] },
{ id:"nc5", tipo:"lacuna", sec:"classif", f:"Art. 5º, XIII: é livre o exercício de qualquer trabalho, ofício ou profissão, atendidas as ______ que a lei estabelecer.", v:"<b>qualificações profissionais</b>.", lei:["cf5xiii"] },
{ id:"nc6", tipo:"distincao", sec:"classif", f:"Art. 5º, XV (locomoção) e LVIII (identificação criminal): contida ou limitada?", v:"<b>Contidas</b>: valem desde já; a lei só pode <b>restringir</b> (\"nos termos da lei\"; \"salvo nas hipóteses previstas em lei\").", lei:["cf5xv","cf5lviii"] },
{ id:"nc7", tipo:"distincao", sec:"classif", f:"Art. 37, I: o acesso a cargos públicos por brasileiros e por estrangeiros tem a mesma eficácia?", v:"<b>Não.</b> Brasileiros: <b>contida</b> (\"requisitos estabelecidos em lei\"). Estrangeiros: <b>limitada</b> (\"na forma da lei\").", lei:["cf37i"] },
{ id:"nc8", tipo:"distincao", sec:"limitada", f:"Art. 7º, I, XI e XXVII: qual a eficácia e o que têm em comum?", v:"<b>Limitada</b>: todos remetem à lei (\"lei complementar\", \"conforme definido em lei\", \"na forma da lei\") para produzir os efeitos essenciais.", lei:["cf7i","cf7xi","cf7xxvii"] },
{ id:"nc9", tipo:"distincao", sec:"limitada", f:"Art. 88 (Ministérios) e art. 25, §3º (regiões metropolitanas): que espécie de eficácia limitada?", v:"<b>Institutivas</b>. O art. 88 é <b>impositivo</b> (\"a lei disporá\"); o art. 25, §3º é <b>facultativo</b> (\"poderão\").", lei:["cf88","cf25p3"] },
{ id:"nc10", tipo:"caso", sec:"limitada", f:"Servidores entram em greve, mas ainda não há lei específica prevista no art. 37, VII. O direito de greve está bloqueado?", v:"<b>Não.</b> A norma é de eficácia <b>limitada</b>, mas o STF (MI 708) determinou aplicar, no que couber, a Lei 7.783/1989 até haver lei específica.", lei:["cf37vii"], j:["stf-mi708"] },
{ id:"nc11", tipo:"ce", sec:"classif", f:"Certo ou errado: a norma de eficácia contida depende de lei para ser aplicada.", v:"<b>Errado.</b> Ela é aplicável desde logo; a lei só pode <b>restringir</b> seu alcance. Dependem de lei as de eficácia <b>limitada</b>.", lei:["cf5xiii"] },
{ id:"nc12", tipo:"ce", sec:"conceito", f:"Certo ou errado: norma de eficácia limitada não produz nenhum efeito jurídico enquanto não for editada a lei.", v:"<b>Errado.</b> Produz efeitos mínimos: revoga o incompatível, impede lei contrária e orienta a interpretação.", lei:["cf5p1"] },
{ id:"nc13", tipo:"distincao", sec:"limitada", f:"Os arts. 196 (saúde) e 205 (educação) são de eficácia plena, contida ou limitada?", v:"<b>Limitada de princípio programático</b>: fixam fins e metas; o STF não as trata como promessa vazia (ADPF 45).", lei:["cf196","cf205"], j:["stf-adpf45"] },
{ id:"nc14", tipo:"lacuna", sec:"limitada", f:"Cabe mandado de injunção quando a falta de norma ______ torne inviável o exercício de direitos e liberdades constitucionais e de prerrogativas ligadas à nacionalidade, soberania e cidadania.", v:"<b>regulamentadora</b> (art. 5º, LXXI).", lei:["cf5lxxi"] },
{ id:"nc15", tipo:"numero", sec:"limitada", f:"Qual é a regra de eficácia da decisão no mandado de injunção e qual a exceção?", v:"Regra: eficácia subjetiva <b>limitada às partes</b> (Lei 13.300, art. 9º). Exceção: <b>ultra partes ou erga omnes</b> se inerente ou indispensável ao direito (§1º).", lei:["l13300a9","l13300a8"] },
{ id:"nc16", tipo:"numero", sec:"limitada", f:"Qual o prazo para o órgão administrativo agir após a ADO que reconhece a omissão?", v:"<b>Trinta dias</b> (art. 103, §2º); pode ser prazo razoável estipulado excepcionalmente pelo Tribunal, conforme a Lei 9.868/1999.", lei:["cf103p2"] },
{ id:"nc17", tipo:"distincao", sec:"outras", f:"Na classificação de Maria Helena Diniz, o que são normas de eficácia relativa restringível e relativa complementável?", v:"<b>Restringível</b> = contida de Silva (a lei pode reduzir). <b>Complementável</b> = limitada de Silva (a lei completa). <b>Absoluta</b> = cláusulas pétreas.", lei:[] },
{ id:"nc19", tipo:"ce", sec:"classif", f:"Certo ou errado: a norma de eficácia contida produz ou pode produzir todos os efeitos e tem aplicabilidade direta, imediata e integral.", v:"<b>Errado.</b> Isso descreve a <b>plena</b>. A contida tem aplicabilidade direta e imediata, mas <b>não integral</b>, porque a lei ainda pode restringi-la.", lei:["cf5xiii"] },
{ id:"nc18", tipo:"caso", sec:"outras", f:"O art. 3º do ADCT previa revisão constitucional após cinco anos da promulgação. Que eficácia ele tem hoje?", v:"<b>Exaurida</b> (esgotada): cumpriu o fim e não produz mais efeitos práticos futuros, embora siga no texto.", lei:[] }
],
questoes:[]
};

})();
