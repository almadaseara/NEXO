/* Direito Penal — Crimes contra a Fé Pública (arts. 289 a 311-A).
   Conferido em 14/10/2026. Texto legal: Código Penal (Planalto); Lei 14.562/2023 (art. 311). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STFS = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

T.penal_fe_publica = {
meta:{ tema:"Crimes contra a Fé Pública", atualizado:AT,
  foco:"Moeda falsa e figuras próximas; papéis públicos; falsidade documental (material × ideológica, documento público por equiparação, uso, supressão); falsa identidade e uso de documento alheio; adulteração de sinal identificador de veículo (Lei 14.562/2023); fraude em certames. Súmulas 17, 73, 522 e 546 do STJ." },
secoes:[
{ id:"moeda", titulo:"Moeda falsa e papéis públicos", curto:"Moeda",
  rapido:["Moeda falsa (289): falsificar, fabricando ou alterando, moeda metálica ou papel-moeda <b>de curso legal no país ou no estrangeiro</b> — reclusão de <b>3 a 12</b> e multa. §1º: importar, exportar, adquirir, vender, trocar, ceder, emprestar, guardar ou introduzir na circulação — mesma pena.",
    "§2º (privilegiada): recebeu <b>de boa-fé</b>, descobriu a falsidade e <b>restituiu à circulação</b> — detenção de 6 meses a 2 anos e multa.",
    "§3º: funcionário ou diretor/gerente/fiscal de banco de emissão que fabrica ou autoriza moeda com título ou peso inferior, ou papel-moeda além do autorizado — 3 a 15. §4º: desviar e fazer circular moeda ainda não autorizada — mesma pena.",
    "Falsificação <b>grosseira</b>: não há moeda falsa; se enganar alguém, é <b>estelionato</b>, da Justiça Estadual (Súmula 73 do STJ). Sem insignificância na moeda falsa."],
  teoria:[
    { h:"Moeda falsa", p:[
      "Bem jurídico: fé pública (confiança na autenticidade do dinheiro). Crime comum; consuma-se com a fabricação ou alteração, sem precisar circular. Admite tentativa.",
      "Moeda sem curso legal (cruzeiro, cruzado) não é objeto do crime.",
      "Quem fabricou e depois usa responde só pela falsificação: o uso é pós-fato impunível.",
      "Competência: Justiça Federal (interesse da União, emissão de moeda), salvo a falsificação grosseira usada como estelionato (estadual).",
      "Art. 290: formar cédula com fragmentos de cédulas verdadeiras, suprimir sinal de inutilização ou restituir à circulação cédula recolhida — 2 a 8 (até 12 se funcionário da repartição). Art. 291: petrechos para falsificação de moeda — 2 a 6 (ato preparatório punido como crime autônomo). Art. 292: emitir título ao portador sem permissão legal."]},
    { h:"Papéis públicos (293 a 295)", p:[
      "Art. 293: falsificar selo de controle tributário, papel de crédito público, vale postal, guias e documentos de arrecadação, bilhete de transporte público etc. — 2 a 8. §1º, III: comerciante (inclusive camelô — §5º) que vende produto com selo falso ou sem selo obrigatório.",
      "Art. 294: petrechos para falsificar esses papéis — 1 a 3. Art. 295: +1/6 se funcionário prevalecendo-se do cargo."]}
  ],
  pegadinhas:["Moeda estrangeira de curso legal também é objeto do crime.","Recebeu nota falsa de boa-fé e repassou depois de saber: §2º (privilegiada), não o caput."]},
{ id:"documental", titulo:"Falsidade documental (296 a 305)", curto:"Documentos",
  rapido:["Documento público (297): falsificar no todo ou em parte, ou alterar o verdadeiro — reclusão de <b>2 a 6</b> e multa. +1/6 se funcionário prevalecendo-se do cargo.",
    "Equiparados a público (§2º, rol taxativo): documento de <b>entidade paraestatal</b>, <b>título ao portador ou transmissível por endosso</b> (cheque, nota promissória), <b>ações</b> de sociedade comercial, <b>livros mercantis</b> e <b>testamento particular</b>.",
    "Documento particular (298): 1 a 5 e multa. <b>Cartão de crédito ou débito</b> equipara-se a documento particular.",
    "Falsidade ideológica (299): documento <b>verdadeiro na forma, falso no conteúdo</b> — omitir declaração ou inserir declaração falsa, <b>com o fim de</b> prejudicar direito, criar obrigação ou alterar a verdade sobre fato juridicamente relevante — 1 a 5 (público) ou 1 a 3 (particular). +1/6 se funcionário ou se for assentamento de registro civil.",
    "Uso de documento falso (304): pena da falsificação correspondente. Supressão de documento (305): destruir, suprimir ou ocultar documento verdadeiro de que não podia dispor."],
  teoria:[
    { h:"Falsidade material × ideológica", p:[
      "<b>Material</b>: a forma é falsa (fabricação ou adulteração). Ex.: funcionário da imobiliária muda \"R$ 8.000\" para \"R$ 800\" no formulário preenchido por outra pessoa.",
      "<b>Ideológica</b>: a forma é verdadeira e quem tem o poder de fazer o documento o faz com conteúdo falso. Ex.: o próprio declarante informa renda que não tem.",
      "Folha em branco assinada: preenchida de forma abusiva por quem a recebeu em confiança → ideológica; por quem se apoderou dela ilicitamente → material.",
      "Documento sujeito a verificação obrigatória pela autoridade (ex.: declaração que será conferida) pode não ter potencialidade lesiva: a jurisprudência afasta o 299 nesses casos.",
      "Art. 297, §§3º e 4º: inserir na folha de pagamento ou CTPS informação falsa ou omitir dados com efeito perante a previdência — é falsidade de documento público por equiparação legal (embora pareça ideológica)."]},
    { h:"Falso e estelionato; uso; competência", p:[
      "Súmula 17 do STJ: quando o falso se exaure no estelionato, sem mais potencialidade lesiva, é por este absorvido. Se o documento continua apto a enganar outras pessoas (ex.: RG falso usado para abrir conta e que permanece com o agente), há concurso.",
      "Falso usado só para sonegar tributo (recibos médicos para o IR) é absorvido pelo crime tributário (STJ).",
      "Quem falsifica e usa responde só pela falsificação (uso = pós-fato impunível), segundo a corrente prevalente no STJ. O uso é crime formal e unissubsistente: não admite tentativa.",
      "Súmula 546 do STJ: a competência pelo uso de documento falso depende do órgão <b>a quem o documento foi apresentado</b>, não do órgão expedidor. Ex.: CNH falsa (expedida pelo Detran) apresentada à PRF → Justiça Federal.",
      "Falsificação grosseira não tem <i>imitatio veri</i>: fato atípico quanto ao falso."]},
    { h:"Outros tipos do capítulo", p:[
      "296: falsificar selo ou sinal público; §1º, III — usar indevidamente marcas, logotipos ou siglas de órgãos públicos.",
      "300: funcionário que reconhece como verdadeira firma ou letra falsa (crime próprio).",
      "301: funcionário que atesta falsamente fato que habilite alguém a cargo público, isenção ou vantagem (caput, próprio) e falsidade material de atestado ou certidão (§1º, comum).",
      "302: médico que dá atestado falso — detenção de 1 mês a 1 ano (+ multa se com fim de lucro). Consuma-se com a entrega. Médico funcionário público que atesta falsamente em razão da função: 301.",
      "305: exige o fim de benefício próprio ou alheio, ou prejuízo alheio."]}
  ],
  quadro:{ titulo:"Penas da falsidade documental", head:["Crime","Documento público","Documento particular"], rows:[
    ["Falsificação (297/298)","Reclusão 2 a 6 e multa","Reclusão 1 a 5 e multa"],
    ["Falsidade ideológica (299)","Reclusão 1 a 5 e multa","Reclusão 1 a 3 e multa"],
    ["Falso reconhecimento de firma (300)","Reclusão 1 a 5 e multa","Reclusão 1 a 3 e multa"],
    ["Supressão de documento (305)","Reclusão 2 a 6 e multa","Reclusão 1 a 5 e multa"],
    ["Uso (304)","Pena da falsificação correspondente","Pena da falsificação correspondente"]]},
  pegadinhas:["Na falsificação de documento particular a pena (1 a 5) é maior que na falsidade ideológica de documento particular (1 a 3).","O rol do §2º do art. 297 é taxativo: ampliar seria analogia contra o réu. Telegrama comum dos Correios não é documento público."]},
{ id:"identidade", titulo:"Outras falsidades: identidade, estrangeiro e veículo", curto:"Identidade e veículo",
  rapido:["Falsa identidade (307): atribuir-se ou atribuir a terceiro falsa identidade <b>para obter vantagem ou causar dano</b> — detenção de 3 meses a 1 ano, ou multa, se não for elemento de crime mais grave. Típica <b>mesmo perante a polícia para fugir de mandado</b> (Súmula 522).",
    "Com documento falso, não é 307: é <b>uso de documento falso</b> (304).",
    "Uso de documento alheio como próprio (308): usar passaporte, título, reservista ou documento de identidade alheio, ou cedê-lo — detenção de 4 meses a 2 anos e multa.",
    "Adulteração de sinal identificador de veículo (311, Lei 14.562/2023): adulterar, remarcar ou <b>suprimir</b> número de chassi, monobloco, motor, <b>placa</b> ou qualquer sinal identificador, sem autorização — reclusão de <b>3 a 6</b> e multa. +1/3 se no exercício da função pública. Desmanche e comércio (§3º): <b>4 a 8</b>."],
  teoria:[
    { h:"Falsa identidade", p:[
      "Crime formal e subsidiário. A antiga tese da autodefesa foi rejeitada pelo STJ (Súmula 522) e pelo STF (repercussão geral, RE 640.139).",
      "Fazer-se passar por outra pessoa para obter vantagem patrimonial em prejuízo alheio é estelionato (crime mais grave).",
      "309: estrangeiro que usa nome falso para entrar ou permanecer no país (crime próprio); parágrafo único: atribuir falsa qualidade a estrangeiro para promover sua entrada. 310: \"testa de ferro\" de estrangeiro em bem vedado a ele (ex.: empresa jornalística)."]},
    { h:"Art. 311 (veículos)", p:[
      "Desde a Lei 14.562/2023, abrange veículo automotor, elétrico, híbrido, reboque e semirreboque, e seus componentes; o verbo <b>suprimir</b> passou a ser punido (ex.: retirar a placa da moto).",
      "STJ: colocar <b>fita adesiva</b> para alterar caracteres da placa configura o crime, ainda que sem fim específico de fraudar.",
      "§2º (mesma pena): funcionário que contribui para licenciar veículo adulterado; quem lida com petrechos de adulteração; quem adquire, transporta, conduz, oculta, desmonta, vende ou usa veículo ou parte com sinal que <b>devesse saber</b> estar adulterado.",
      "§3º: condutas dos incisos II e III no exercício de atividade comercial ou industrial — 4 a 8 (sem ANPP, pena mínima de 4). §4º: comércio irregular, inclusive em residência, equipara-se a atividade comercial."]},
    { h:"Fraude em certames (311-A)", p:[
      "Utilizar ou divulgar indevidamente, para beneficiar a si ou a outrem ou comprometer a credibilidade, conteúdo sigiloso de concurso público, exame público, vestibular ou processo seletivo previsto em lei (ENEM, OAB) — 1 a 4 e multa. §1º: permitir ou facilitar acesso de não autorizado. §2º: dano à administração — 2 a 6. §3º: +1/3 se funcionário público.",
      "Consuma-se com a utilização ou divulgação, ainda que o beneficiado não seja aprovado."]}
  ],
  pegadinhas:["\"Falsidade ideológica\" não é se passar por outra pessoa: isso é falsa identidade (307) ou uso de documento falso (304).","No art. 311, o crime é formal: consuma-se com a adulteração, sem exigir vantagem."]}
],
lei:[
{ art:"CP, arts. 289 a 291", nome:"Moeda falsa", sec:"moeda", itens:[
  { id:"cp289", rot:"Art. 289", t:"<b class='g1'>Falsificar, fabricando-a ou alterando-a</b>, moeda metálica ou papel-moeda de <b class='g1'>curso legal no país ou no estrangeiro</b>:<br>Pena - reclusão, de <b class='g2'>três a doze anos, e multa</b>.<br>§ 1º - Nas mesmas penas incorre quem, por conta própria ou alheia, <b class='g1'>importa ou exporta, adquire, vende, troca, cede, empresta, guarda ou introduz na circulação</b> moeda falsa.<br>§ 2º - Quem, tendo recebido <b class='g3'>de boa-fé</b>, como verdadeira, moeda falsa ou alterada, a <b class='g1'>restitui à circulação, depois de conhecer a falsidade</b>, é punido com detenção, de <b class='g2'>seis meses a dois anos, e multa</b>.<br>§ 3º - É punido com reclusão, de <b class='g2'>três a quinze anos, e multa</b>, o funcionário público ou diretor, gerente, ou fiscal de banco de emissão que fabrica, emite ou autoriza a fabricação ou emissão: I - de moeda com título ou peso inferior ao determinado em lei; II - de papel-moeda em quantidade superior à autorizada.<br>§ 4º - Nas mesmas penas incorre quem desvia e faz circular moeda, cuja circulação não estava ainda autorizada.", c:["fp1","fp2","fp3","fp4"], j:["stj-s73","stj-moeda-insig"] },
  { id:"cp290", rot:"Arts. 290 e 291", t:"Art. 290 - <b class='g1'>Formar</b> cédula, nota ou bilhete representativo de moeda <b class='g1'>com fragmentos</b> de cédulas, notas ou bilhetes verdadeiros; <b class='g1'>suprimir</b>, em nota, cédula ou bilhete recolhidos, para o fim de restituí-los à circulação, <b class='g1'>sinal indicativo de sua inutilização</b>; restituir à circulação cédula, nota ou bilhete em tais condições, ou já recolhidos para o fim de inutilização:<br>Pena - reclusão, de <b class='g2'>dois a oito anos, e multa</b>.<br>Parágrafo único - O máximo da reclusão é elevado a <b class='g2'>doze anos</b> e multa, se o crime é cometido por funcionário que trabalha na repartição onde o dinheiro se achava recolhido, ou nela tem fácil ingresso, em razão do cargo.<br>Art. 291 - Fabricar, adquirir, fornecer, a título oneroso ou gratuito, possuir ou guardar maquinismo, aparelho, instrumento ou qualquer objeto <b class='g3'>especialmente destinado à falsificação de moeda</b>:<br>Pena - reclusão, de <b class='g2'>dois a seis anos, e multa</b>.", c:["fp5"] }
]},
{ art:"CP, arts. 293 a 295", nome:"Falsidade de títulos e papéis públicos", sec:"moeda", itens:[
  { id:"cp293", rot:"Arts. 293 a 295", t:"Art. 293 - Falsificar, fabricando-os ou alterando-os: I - <b class='g1'>selo destinado a controle tributário</b>, papel selado ou qualquer papel de emissão legal destinado à arrecadação de tributo; II - papel de crédito público que não seja moeda de curso legal; III - vale postal; IV - cautela de penhor, caderneta de depósito de caixa econômica ou de outro estabelecimento mantido por entidade de direito público; V - talão, recibo, guia, alvará ou qualquer outro documento relativo a arrecadação de rendas públicas ou a depósito ou caução por que o poder público seja responsável; VI - bilhete, passe ou conhecimento de empresa de transporte administrada pela União, por Estado ou por Município:<br>Pena - reclusão, de <b class='g2'>dois a oito anos, e multa</b>.<br>§ 5º Equipara-se a atividade comercial, para os fins do inciso III do § 1º, qualquer forma de <b class='g1'>comércio irregular ou clandestino</b>, inclusive o exercido em vias, praças ou outros logradouros públicos e em residências.<br>Art. 294 - Fabricar, adquirir, fornecer, possuir ou guardar objeto especialmente destinado à falsificação de qualquer dos papéis referidos no artigo anterior: Pena - reclusão, de <b class='g2'>um a três anos, e multa</b>.<br>Art. 295 - Se o agente é funcionário público, e comete o crime prevalecendo-se do cargo, aumenta-se a pena de <b class='g2'>sexta parte</b>.", nota:"Parágrafos 1º a 4º do art. 293 resumidos na aba Resumo.", c:["fp6"] }
]},
{ art:"CP, arts. 296 a 305", nome:"Falsidade documental", sec:"documental", itens:[
  { id:"cp297", rot:"Arts. 297 e 298", t:"Art. 297 - <b class='g1'>Falsificar, no todo ou em parte, documento público, ou alterar documento público verdadeiro</b>:<br>Pena - reclusão, de <b class='g2'>dois a seis anos, e multa</b>.<br>§ 1º - Se o agente é funcionário público, e comete o crime prevalecendo-se do cargo, aumenta-se a pena de <b class='g2'>sexta parte</b>.<br>§ 2º - Para os efeitos penais, <b class='g3'>equiparam-se a documento público</b> o emanado de <b class='g1'>entidade paraestatal</b>, o <b class='g1'>título ao portador ou transmissível por endosso</b>, as <b class='g1'>ações de sociedade comercial</b>, os <b class='g1'>livros mercantis</b> e o <b class='g1'>testamento particular</b>.<br>§ 3º Nas mesmas penas incorre quem insere ou faz inserir: I – na folha de pagamento ou em documento de informações que seja destinado a fazer prova perante a previdência social, pessoa que não possua a qualidade de segurado obrigatório; II – na Carteira de Trabalho e Previdência Social do empregado ou em documento que deva produzir efeito perante a previdência social, declaração falsa ou diversa da que deveria ter sido escrita; III – em documento contábil ou em qualquer outro documento relacionado com as obrigações da empresa perante a previdência social, declaração falsa ou diversa da que deveria ter constado.<br>§ 4º Nas mesmas penas incorre quem omite, nos documentos mencionados no § 3º, nome do segurado e seus dados pessoais, a remuneração, a vigência do contrato de trabalho ou de prestação de serviços.<br>Art. 298 - Falsificar, no todo ou em parte, <b class='g1'>documento particular</b> ou alterar documento particular verdadeiro:<br>Pena - reclusão, de <b class='g2'>um a cinco anos, e multa</b>.<br>Parágrafo único. Para fins do disposto no caput, equipara-se a documento particular o <b class='g1'>cartão de crédito ou débito</b>.", c:["fp7","fp8","fp9"] },
  { id:"cp299", rot:"Art. 299", t:"<b class='g1'>Omitir</b>, em documento público ou particular, declaração que dele devia constar, ou nele <b class='g1'>inserir ou fazer inserir declaração falsa</b> ou diversa da que devia ser escrita, <b class='g3'>com o fim de prejudicar direito, criar obrigação ou alterar a verdade sobre fato juridicamente relevante</b>:<br>Pena - reclusão, de <b class='g2'>um a cinco anos, e multa</b>, se o documento é público, e reclusão de <b class='g2'>um a três anos, e multa</b>, se o documento é particular.<br>Parágrafo único - Se o agente é funcionário público, e comete o crime prevalecendo-se do cargo, ou se a falsificação ou alteração é de <b class='g1'>assentamento de registro civil</b>, aumenta-se a pena de <b class='g2'>sexta parte</b>.", c:["fp10","fp11"] },
  { id:"cp300", rot:"Arts. 300 a 302", t:"Art. 300 - Reconhecer, como verdadeira, <b class='g1'>no exercício de função pública</b>, firma ou letra que o não seja: Pena - reclusão, de <b class='g2'>um a cinco anos</b>, e multa, se o documento é público; e de <b class='g2'>um a três anos</b>, e multa, se o documento é particular.<br>Art. 301 - <b class='g1'>Atestar ou certificar falsamente, em razão de função pública</b>, fato ou circunstância que habilite alguém a obter cargo público, isenção de ônus ou de serviço de caráter público, ou qualquer outra vantagem: Pena - detenção, de <b class='g2'>dois meses a um ano</b>. § 1º - Falsificar, no todo ou em parte, atestado ou certidão, ou alterar o teor de certidão ou de atestado verdadeiro, para prova de fato ou circunstância que habilite alguém a obter cargo público, isenção de ônus ou de serviço de caráter público, ou qualquer outra vantagem: Pena - detenção, de <b class='g2'>três meses a dois anos</b>. § 2º - Se o crime é praticado com o fim de lucro, aplica-se, além da pena privativa de liberdade, a de multa.<br>Art. 302 - Dar o <b class='g1'>médico</b>, no exercício da sua profissão, <b class='g1'>atestado falso</b>: Pena - detenção, de <b class='g2'>um mês a um ano</b>. Parágrafo único - Se o crime é cometido com o fim de lucro, aplica-se também multa.", c:["fp12"] },
  { id:"cp304", rot:"Arts. 304 e 305", t:"Art. 304 - <b class='g1'>Fazer uso</b> de qualquer dos papéis falsificados ou alterados, a que se referem os <b class='g3'>arts. 297 a 302</b>:<br>Pena - <b class='g2'>a cominada à falsificação ou à alteração</b>.<br>Art. 305 - <b class='g1'>Destruir, suprimir ou ocultar</b>, <b class='g3'>em benefício próprio ou de outrem, ou em prejuízo alheio</b>, documento público ou particular <b class='g1'>verdadeiro</b>, de que não podia dispor:<br>Pena - reclusão, de <b class='g2'>dois a seis anos, e multa</b>, se o documento é público, e reclusão, de <b class='g2'>um a cinco anos, e multa</b>, se o documento é particular.", c:["fp13","fp14","fp15"], j:["stj-s17","stj-s546","stj-falso-uso"] }
]},
{ art:"CP, arts. 307 a 311-A", nome:"Outras falsidades e fraude em certames", sec:"identidade", itens:[
  { id:"cp307", rot:"Arts. 307 e 308", t:"Art. 307 - <b class='g1'>Atribuir-se ou atribuir a terceiro falsa identidade</b> <b class='g3'>para obter vantagem, em proveito próprio ou alheio, ou para causar dano a outrem</b>:<br>Pena - detenção, de <b class='g2'>três meses a um ano, ou multa</b>, se o fato não constitui elemento de crime mais grave.<br>Art. 308 - <b class='g1'>Usar, como próprio</b>, passaporte, título de eleitor, caderneta de reservista ou qualquer documento de identidade alheia ou <b class='g1'>ceder a outrem</b>, para que dele se utilize, documento dessa natureza, próprio ou de terceiro:<br>Pena - detenção, de <b class='g2'>quatro meses a dois anos, e multa</b>, se o fato não constitui elemento de crime mais grave.", c:["fp16","fp17","fp18"], j:["stj-s522","stf-rg640139"] },
  { id:"cp311", rot:"Art. 311", t:"<b class='g1'>Adulterar, remarcar ou suprimir</b> número de chassi, monobloco, motor, <b class='g1'>placa de identificação</b>, ou qualquer sinal identificador de veículo automotor, elétrico, híbrido, de reboque, de semirreboque ou de suas combinações, bem como de seus componentes ou equipamentos, <b class='g3'>sem autorização do órgão competente</b>:<br>Pena - reclusão, de <b class='g2'>três a seis anos, e multa</b>.<br>§ 1º - Se o agente comete o crime no exercício da função pública ou em razão dela, a pena é aumentada de <b class='g2'>um terço</b>.<br>§ 2º Incorrem nas mesmas penas do caput deste artigo:<br>I – o funcionário público que contribui para o licenciamento ou registro do veículo remarcado ou adulterado, fornecendo indevidamente material ou informação oficial;<br>II – aquele que adquire, recebe, transporta, oculta, mantém em depósito, fabrica, fornece, a título oneroso ou gratuito, possui ou guarda maquinismo, aparelho, instrumento ou objeto especialmente destinado à falsificação e/ou adulteração de que trata o caput deste artigo; ou<br>III – aquele que adquire, recebe, transporta, conduz, oculta, mantém em depósito, desmonta, monta, remonta, vende, expõe à venda, ou de qualquer forma utiliza, em proveito próprio ou alheio, veículo automotor, elétrico, híbrido, de reboque, semirreboque ou suas combinações ou partes, com número de chassi ou monobloco, placa de identificação ou qualquer sinal identificador veicular que <b class='g3'>devesse saber</b> estar adulterado ou remarcado.<br>§ 3º Praticar as condutas de que tratam os incisos II ou III do § 2º deste artigo <b class='g1'>no exercício de atividade comercial ou industrial</b>: Pena - reclusão, de <b class='g2'>4 (quatro) a 8 (oito) anos, e multa</b>.<br>§ 4º Equipara-se a atividade comercial, para efeito do disposto no § 3º deste artigo, qualquer forma de comércio irregular ou clandestino, inclusive aquele exercido em residência.", nota:"Redação da Lei 14.562/2023.", novo:true, c:["fp19","fp20","fp21"], j:["stj-fita-placa"] },
  { id:"cp311a", rot:"Art. 311-A", t:"<b class='g1'>Utilizar ou divulgar, indevidamente</b>, <b class='g3'>com o fim de beneficiar a si ou a outrem, ou de comprometer a credibilidade do certame</b>, conteúdo sigiloso de: I - concurso público; II - avaliação ou exame públicos; III - processo seletivo para ingresso no ensino superior; ou IV - exame ou processo seletivo previstos em lei:<br>Pena - reclusão, de <b class='g2'>1 (um) a 4 (quatro) anos, e multa</b>.<br>§ 1º Nas mesmas penas incorre quem <b class='g1'>permite ou facilita</b>, por qualquer meio, o acesso de pessoas não autorizadas às informações mencionadas no caput.<br>§ 2º Se da ação ou omissão resulta <b class='g1'>dano à administração pública</b>: Pena - reclusão, de <b class='g2'>2 (dois) a 6 (seis) anos, e multa</b>.<br>§ 3º Aumenta-se a pena de <b class='g2'>1/3</b> se o fato é cometido por <b class='g1'>funcionário público</b>.", c:["fp22"] }
]}
],
juris:[
{ id:"stj-s17", trib:"STJ", tipo:"Súmula", num:"17", sec:"documental", status:"vigente", data:"",
  titulo:"Falso que se exaure no estelionato", texto:"Quando o falso se exaure no estelionato, sem mais potencialidade lesiva, é por este absorvido.",
  explica:"Se o documento continuar apto a enganar (ex.: RG falso guardado para outros golpes), há concurso de crimes (STF, HC 116.979 AgR). O mesmo raciocínio vale para falso usado só para sonegar tributo (STJ, AgRg no AREsp 356.859/PE).", lei:["cp304","cp297"], fonte:STJS },
{ id:"stj-s73", trib:"STJ", tipo:"Súmula", num:"73", sec:"moeda", status:"vigente", data:"",
  titulo:"Moeda grosseiramente falsificada: estelionato", texto:"A utilização de papel moeda grosseiramente falsificado configura, em tese, o crime de estelionato, da competência da justiça estadual.",
  explica:"Sem aptidão para enganar o homem médio, não há moeda falsa; se mesmo assim alguém foi enganado e sofreu prejuízo, é estelionato.", lei:["cp289"], fonte:STJS },
{ id:"stj-moeda-insig", trib:"STJ/STF", tipo:"Jurisprudência", num:"HC 257.421/MG", sec:"moeda", status:"vigente", data:"STJ, 6ª Turma, 22/04/2014",
  titulo:"Sem insignificância na moeda falsa", texto:"Em se tratando do crime de falsificação de moeda, o STJ, acompanhando o STF, firmou entendimento no sentido de que não se aplica ao delito do art. 289 do Código Penal o princípio da insignificância.",
  explica:"O bem jurídico é a fé pública, não o valor da nota.", lei:["cp289"], fonte:STJJ },
{ id:"stj-s546", trib:"STJ", tipo:"Súmula", num:"546", sec:"documental", status:"vigente", data:"",
  titulo:"Competência no uso de documento falso", texto:"A competência para processar e julgar o crime de uso de documento falso é firmada em razão da entidade ou órgão ao qual foi apresentado o documento público, não importando a qualificação do órgão expedidor.",
  explica:"CNH falsa apresentada à PRF: Justiça Federal. Apresentada à PM: Justiça Estadual.", lei:["cp304"], fonte:STJS },
{ id:"stj-falso-uso", trib:"STJ", tipo:"Jurisprudência", num:"HC 228.280/BA", sec:"documental", status:"divergencia", data:"5ª Turma, 11/03/2014",
  titulo:"Quem falsifica e usa responde só pelo falso", texto:"Nos casos em que o uso do documento falso for cometido pelo próprio responsável pela falsificação, o uso é considerado mero exaurimento do crime de falsidade, motivo pelo qual a competência é a do local da falsificação, que, se desconhecido, impõe a adoção da regra do local do uso.",
  explica:"Prevalece o falso com uso como pós-fato impunível; há decisões e doutrina (Greco) em sentido contrário (responde só pelo uso).", lei:["cp304"], fonte:STJJ },
{ id:"stj-s522", trib:"STJ", tipo:"Súmula", num:"522", sec:"identidade", status:"vigente", data:"",
  titulo:"Falsa identidade perante a polícia é crime", texto:"A conduta de atribuir-se falsa identidade perante autoridade policial é típica, ainda que em situação de alegada autodefesa.",
  explica:"Mentir o nome para escapar de mandado de prisão: art. 307.", lei:["cp307"], fonte:STJS },
{ id:"stf-rg640139", trib:"STF", tipo:"Tema de repercussão geral", num:"478 (RE 640.139)", sec:"identidade", status:"vigente", data:"Plenário, 2011",
  titulo:"Autodefesa não justifica falsa identidade", texto:"O princípio constitucional da autodefesa (art. 5º, LXIII, da CF/88) não alcança aquele que atribui falsa identidade perante autoridade policial com o intento de ocultar maus antecedentes, sendo, portanto, típica a conduta praticada pelo agente (art. 307 do CP).",
  explica:"Base da Súmula 522 do STJ.", lei:["cp307"], fonte:STFJ },
{ id:"stj-fita-placa", trib:"STJ", tipo:"Jurisprudência", num:"AgRg no REsp 2.009.836/MG", sec:"identidade", status:"vigente", data:"5ª Turma, 14/02/2023",
  titulo:"Fita adesiva na placa configura o art. 311", texto:"A norma contida no art. 311 do Código Penal busca resguardar a autenticidade dos sinais identificadores dos veículos automotores, sendo típica a simples conduta de alterar, com fita adesiva, a placa do automóvel, ainda que não caracterizada a finalidade específica de fraudar a fé pública.",
  explica:"Desde 2023, também a supressão da placa é punida.", lei:["cp311"], fonte:STJJ }
],
cards:[
{ id:"fp1", tipo:"caso", sec:"moeda", f:"Agente imprime notas de R$ 100 em papel comum, cores borradas, e o caixa percebe na hora. Crime?", v:"Não há moeda falsa (falsificação grosseira, sem <i>imitatio veri</i>). Tentativa de estelionato, conforme o caso.", lei:["cp289"], j:["stj-s73"] },
{ id:"fp2", tipo:"caso", sec:"moeda", f:"A mesma nota grosseira engana ambulante à noite, que entrega mercadoria e troco. Crime e Justiça competente?", v:"<b>Estelionato</b>, da <b>Justiça Estadual</b> (Súmula 73).", lei:["cp289"], j:["stj-s73"] },
{ id:"fp3", tipo:"caso", sec:"moeda", f:"Recebeu R$ 50 falsos de troco sem perceber; ao notar, passou a nota adiante numa padaria.", v:"<b>Moeda falsa privilegiada</b> (289, §2º) — detenção de 6 meses a 2 anos e multa.", lei:["cp289"] },
{ id:"fp4", tipo:"ce", sec:"moeda", f:"Certo ou errado: cabe insignificância na introdução em circulação de uma única nota falsa de R$ 10.", v:"<b>Errado.</b> STF e STJ afastam a insignificância na moeda falsa.", lei:["cp289"], j:["stj-moeda-insig"] },
{ id:"fp5", tipo:"distincao", sec:"moeda", f:"Art. 289 × art. 290.", v:"<b>289</b>: fabricar ou alterar moeda. <b>290</b>: montar cédula com fragmentos de cédulas verdadeiras, suprimir sinal de inutilização ou recolocar em circulação cédula recolhida.", lei:["cp290"] },
{ id:"fp6", tipo:"caso", sec:"moeda", f:"Camelô vende cigarros sem o selo de controle tributário obrigatório. Crime?", v:"<b>Art. 293, §1º, III, b</b> — comércio irregular em via pública equipara-se a atividade comercial (§5º).", lei:["cp293"] },
{ id:"fp7", tipo:"lacuna", sec:"documental", f:"Equiparam-se a documento público: emanado de ______, título ao portador ou transmissível por ______, ações de sociedade comercial, livros ______ e testamento ______.", v:"<b>entidade paraestatal</b>; <b>endosso</b>; <b>mercantis</b>; <b>particular</b>", lei:["cp297"] },
{ id:"fp8", tipo:"caso", sec:"documental", f:"Agente falsifica um cheque. Documento público ou particular?", v:"<b>Público por equiparação</b> (297, §2º — título transmissível por endosso).", lei:["cp297"] },
{ id:"fp9", tipo:"caso", sec:"documental", f:"Agente clona cartão de crédito. Qual o enquadramento quanto ao falso?", v:"<b>Falsificação de documento particular</b> (298, parágrafo único — cartão equiparado).", lei:["cp297"] },
{ id:"fp10", tipo:"distincao", sec:"documental", f:"Falsidade material × ideológica.", v:"<b>Material</b>: o documento é forjado ou adulterado (a forma é falsa). <b>Ideológica</b>: o documento é autêntico, mas o conteúdo declarado é falso.", lei:["cp299"] },
{ id:"fp11", tipo:"caso", sec:"documental", f:"Candidato declara, em formulário de posse, não possuir bens, embora tenha imóveis. Crime?", v:"<b>Falsidade ideológica</b> (299): declaração falsa em documento verdadeiro, para alterar a verdade sobre fato juridicamente relevante.", lei:["cp299"] },
{ id:"fp12", tipo:"distincao", sec:"documental", f:"Médico particular × médico do serviço público que atesta falsamente.", v:"<b>Particular</b>, no exercício da profissão: <b>302</b>. <b>Funcionário público</b>, em razão da função, para habilitar a vantagem: <b>301</b>.", lei:["cp300"] },
{ id:"fp13", tipo:"juris", sec:"documental", f:"Golpista usa RG falso para abrir uma conta e o documento se esgota nesse golpe. Quantos crimes?", v:"Só <b>estelionato</b> (Súmula 17). Se o RG permanecesse apto a novos golpes, haveria concurso.", lei:["cp304"], j:["stj-s17"] },
{ id:"fp14", tipo:"juris", sec:"documental", f:"Motorista apresenta CNH falsa a policial rodoviário federal. Justiça competente?", v:"<b>Justiça Federal</b>: vale o órgão a quem o documento foi apresentado (Súmula 546).", lei:["cp304"], j:["stj-s546"] },
{ id:"fp15", tipo:"ce", sec:"documental", f:"Certo ou errado: o crime de uso de documento falso admite tentativa.", v:"<b>Errado</b> (prevalece): é unissubsistente — consuma-se com a apresentação.", lei:["cp304"] },
{ id:"fp16", tipo:"caso", sec:"identidade", f:"Abordado sem documento, o foragido diz à PM nome de outra pessoa para não ser preso. Crime?", v:"<b>Falsa identidade</b> (307). Autodefesa não afasta (Súmula 522; STF, Tema 478).", lei:["cp307"], j:["stj-s522"] },
{ id:"fp17", tipo:"distincao", sec:"identidade", f:"Falsa identidade × uso de documento falso × art. 308.", v:"Só afirma ser outra pessoa: <b>307</b>. Usa documento falsificado: <b>304</b>. Usa documento verdadeiro de outra pessoa como se fosse seu: <b>308</b>.", lei:["cp307"] },
{ id:"fp18", tipo:"caso", sec:"identidade", f:"Irmão empresta sua carteira de identidade para o outro entrar num show. Quem comete crime?", v:"Ambos: quem usa (<b>308, usar</b>) e quem empresta (<b>308, ceder</b>).", lei:["cp307"] },
{ id:"fp19", tipo:"caso", sec:"identidade", f:"Motoqueiro retira a placa para fugir de radares (2025). Crime?", v:"<b>Art. 311</b> — o verbo <b>suprimir</b> foi incluído pela Lei 14.562/2023.", lei:["cp311"] },
{ id:"fp20", tipo:"juris", sec:"identidade", f:"Fita isolante transforma o \"F\" da placa em \"E\". Crime?", v:"<b>Sim, art. 311</b> (STJ), mesmo sem fim específico de fraude.", lei:["cp311"], j:["stj-fita-placa"] },
{ id:"fp21", tipo:"numero", sec:"identidade", f:"Art. 311: pena do caput e do desmanche comercial (§3º).", v:"Caput: <b>3 a 6</b>. §3º: <b>4 a 8</b> (sem ANPP — mínimo de 4).", lei:["cp311"] },
{ id:"fp22", tipo:"caso", sec:"identidade", f:"Funcionário da banca vaza a prova uma semana antes; a candidata beneficiada é reprovada. Crime consumado?", v:"<b>Sim.</b> 311-A consuma-se com a divulgação; +1/3 se o autor for funcionário público.", lei:["cp311a"] }
],
importancia:{ nivel:5,
  texto:"Falsidade material × ideológica, documento público por equiparação, uso de documento falso e as Súmulas 17, 73, 522 e 546 do STJ são cobradas em quase toda prova; moeda falsa e o art. 311 completam o quadro.",
  decore:[
    ["Moeda falsa (289)","reclusão de <b>3 a 12 anos</b> e multa; privilegiada (§ 2º): detenção de 6 meses a 2 anos"],
    ["Falsificação de documento público (297)","reclusão de <b>2 a 6 anos</b>; +1/6 se funcionário"],
    ["Falsificação de documento particular (298)","reclusão de <b>1 a 5 anos</b>"],
    ["Falsidade ideológica (299)","<b>1 a 5</b> (público) ou <b>1 a 3</b> (particular)"],
    ["Falsa identidade (307)","detenção de <b>3 meses a 1 ano</b>; típica perante a polícia (<b>Súmula 522</b>)"],
    ["Adulteração de sinal de veículo (311)","reclusão de <b>3 a 6 anos</b>; desmanche e comércio: <b>4 a 8</b>"],
    ["Fraude em certames (311-A)","reclusão de <b>1 a 4 anos</b>; dano à administração: 2 a 6"],
    ["Súmula 17 do STJ","falso absorvido pelo estelionato quando nele se exaure"],
    ["Súmula 546 do STJ","competência pelo uso: órgão <b>a quem o documento foi apresentado</b>"],
    ["Súmula 73 do STJ","falsificação grosseira usada em estelionato: <b>Justiça Estadual</b>"]],
  macetes:[
    ["Forma × conteúdo","Material: a forma é falsa. Ideológica: a forma é verdadeira, o conteúdo é falso."],
    ["Particular pesa mais que ideológica","Falsificar documento particular (1 a 5) tem pena maior que a falsidade ideológica de documento particular (1 a 3)."],
    ["Quem apresenta, define","No uso de documento falso, a competência segue o órgão a quem se apresentou (Súmula 546)."]] },
comparativo:{ titulo:"Falsidade material × falsidade ideológica", head:["Falsidade material (297 e 298)","Falsidade ideológica (299)"], rows:[
  ["<b>O que é falso:</b> a forma do documento (fabricado ou adulterado)","<b>O que é falso:</b> o conteúdo; a forma é verdadeira"],
  ["<b>Conduta:</b> falsificar no todo ou em parte, ou alterar documento verdadeiro","<b>Conduta:</b> omitir declaração ou inserir declaração falsa ou diversa da que devia constar"],
  ["<b>Dolo:</b> consciência da falsificação","<b>Dolo específico:</b> prejudicar direito, criar obrigação ou alterar a verdade sobre fato juridicamente relevante"],
  ["<b>Exemplo:</b> funcionário da imobiliária muda o valor no formulário preenchido por outra pessoa","<b>Exemplo:</b> o próprio declarante informa renda que não tem"],
  ["<b>Pena:</b> público 2 a 6; particular 1 a 5","<b>Pena:</b> público 1 a 5; particular 1 a 3"],
  ["<b>Folha em branco:</b> material se foi obtida ilicitamente","<b>Folha em branco:</b> ideológica se preenchida de modo abusivo por quem a recebeu em confiança"]]},
prova:[
  { tipo:"ce", enun:"A falsificação grosseira, facilmente perceptível, não configura crime de moeda falsa, podendo configurar estelionato, de competência da Justiça Estadual.", gab:"Certo", com:"Súmula 73 do STJ: falta imitatio veri para o art. 289; o enganado responde por estelionato." },
  { tipo:"ce", enun:"Atribuir-se falsa identidade perante a autoridade policial, para ocultar maus antecedentes, é fato atípico por força da autodefesa.", gab:"Errado", com:"Súmula 522 do STJ: a conduta é típica mesmo em situação de alegada autodefesa." },
  { tipo:"ce", enun:"A competência para julgar o uso de documento falso é fixada pelo órgão que expediu o documento.", gab:"Errado", com:"Súmula 546 do STJ: depende da entidade ou órgão a quem o documento foi apresentado." },
  { tipo:"ce", enun:"Cheque e nota promissória equiparam-se a documento público para a falsificação do art. 297, por serem títulos transmissíveis por endosso.", gab:"Certo", com:"Art. 297, § 2º: título ao portador ou transmissível por endosso é equiparado a documento público." },
  { tipo:"ce", enun:"Quem falsifica um documento e depois o utiliza responde pelos crimes de falsificação e de uso, em concurso material.", gab:"Errado", com:"Prevalece que o uso pelo próprio falsário é pós-fato impunível, respondendo apenas pela falsificação." },
  { tipo:"caso", enun:"Uma pessoa retira a placa traseira da própria motocicleta para evitar fiscalização eletrônica. Há crime?", com:"Sim. Desde a Lei 14.562/2023, o art. 311 pune também suprimir sinal identificador do veículo (reclusão de 3 a 6 anos)." }],
resumo:[
  "Moeda falsa (289): 3 a 12 anos; exige imitatio veri. Privilegiada para quem recebeu de boa-fé e restitui à circulação após descobrir.",
  "Documento público (297) 2 a 6; particular (298) 1 a 5; cartão de crédito ou débito equipara-se a particular.",
  "Rol do art. 297, § 2º é taxativo: paraestatal, título ao portador ou endossável, ações, livros mercantis e testamento particular.",
  "Falsidade ideológica (299) exige fim de prejudicar direito, criar obrigação ou alterar a verdade juridicamente relevante.",
  "Súmula 17: falso exaurido no estelionato é absorvido. Súmula 546: competência pelo órgão a quem o documento foi apresentado.",
  "Falsa identidade (307) é típica perante a polícia (Súmula 522); com documento falso é o art. 304.",
  "Art. 311: adulterar, remarcar ou suprimir sinal identificador, 3 a 6 anos; desmanche e comércio, 4 a 8.",
  "Fraude em certames (311-A): 1 a 4 anos; consuma-se com a utilização ou divulgação indevida do conteúdo sigiloso."],
checklist:[
  "Diferenciar falsidade material e ideológica com exemplos",
  "Listar os documentos equiparados a público (§ 2º do art. 297)",
  "Aplicar as Súmulas 17, 73, 522 e 546 do STJ",
  "Saber as penas de 2 a 6, 1 a 5 e 1 a 3",
  "Explicar por que o uso pelo falsário é pós-fato impunível",
  "Diferenciar falsa identidade (307), uso de documento falso (304) e uso de documento alheio (308)",
  "Aplicar o art. 311 após a Lei 14.562/2023 (incluindo suprimir)",
  "Reconhecer a fraude em certames e sua consumação"],
questoes:[]
};

})();
