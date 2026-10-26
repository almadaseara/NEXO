/* Medicina Legal (I): conceito e divisões; perícias e peritos; documentos médico-legais; identidade e identificação.
   Conferido em 14/10/2026. Texto legal: CPP (arts. 6º, 149, 158 a 184, 564), Lei 12.030/2009, Lei 12.037/2009,
   Lei 12.842/2013, CP (arts. 154, 269, 302), Lei 15.295/2025 (DOU 22/12/2025: perfil genético na LEP e na Lei 12.037).
   Base didática: material de estudo PC-BA (Medicina Legal, aulas 1 a 4). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var STFS = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp";
var CPP = "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm";
var L15295 = "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15295.htm";

/* ======================= INTRODUÇÃO ======================= */
T.ml_introducao = {
meta:{ tema:"Medicina Legal: conceito, história e divisões", atualizado:AT,
  foco:"Conceitos clássicos (Hélio Gomes, Fávero, França, Afrânio Peixoto, Lacassagne, Paré), linha do tempo mundial e brasileira, as três fases de Oscar Freire, divisões histórica, profissional, doutrinária e didática, e relações com os ramos do Direito." },
secoes:[
{ id:"conceito", titulo:"Conceito e natureza", curto:"Conceito",
  rapido:["Medicina Legal = <b>medicina a serviço das ciências jurídicas e sociais</b> (França). Não é \"a ciência\" a serviço do Direito: é a <b>medicina</b>.",
    "Hélio Gomes (o mais cobrado): conjunto de conhecimentos <b>médicos e paramédicos</b> destinados a servir ao Direito, <b>cooperando na elaboração, auxiliando na interpretação e colaborando na execução</b> dos dispositivos legais.",
    "Para França, é <b>ciência e arte</b> ao mesmo tempo: ciência porque sistematiza métodos próprios; arte porque exige qualidades instintivas para demonstrar a verdade.",
    "Perícia médica e exames médico-legais são <b>atividades privativas de médico</b> (Lei 12.842/2013, art. 4º, XII), exceto os exames laboratoriais de análises clínicas, toxicológicas, genéticas e de biologia molecular."],
  teoria:[
    { h:"Definições que caem", p:[
      "<b>Hélio Gomes</b>: conhecimentos médicos e paramédicos que servem ao Direito na elaboração, interpretação e execução das leis.",
      "<b>Flamínio Fávero</b>: aplicação dos conhecimentos médico-biológicos na <b>elaboração e execução das leis que deles carecem</b>.",
      "<b>Genival Veloso de França</b>: a medicina a serviço das ciências jurídicas e sociais (prefere o nome \"Medicina Política e Social\").",
      "<b>Afrânio Peixoto</b>: aplicação de conhecimentos científicos aos misteres da Justiça. <b>Lacassagne</b>: a arte de pôr os conceitos médicos a serviço da administração da Justiça. <b>Ambroise Paré</b>: a arte de fazer relatórios em juízo. <b>Buchner</b>: a ciência do médico aplicada aos fins da ciência do Direito.",
      "Outras denominações: Medicina Judiciária (Lacassagne), Medicina Forense (Sydney Smith), Medicina Política (Marc), Jurisprudência Médica (Alberti)."]},
    { h:"Natureza e especialidade", p:[
      "Não dispõe de método, objeto ou objetivo exclusivamente seus no sentido de ciência autônoma: soma conhecimentos de várias especialidades médicas e biológicas e os aplica ao Direito.",
      "É especialidade médica reconhecida pelo CFM com o nome <b>Medicina Legal e Perícia Médica</b> (a junção das denominações não extinguiu a especialidade).",
      "Serve mais ao Direito do que à Medicina: o destinatário do trabalho pericial é a autoridade (delegado, juiz, MP)."]}],
  pegadinhas:["\"A Medicina Legal é a <b>ciência</b> a serviço das ciências jurídicas\" — a banca considerou errado: é a <b>medicina</b> (França).","A Medicina Legal não se restringe à área criminal: atua no cível, trabalhista, previdenciário, administrativo, securitário e desportivo.","Exames laboratoriais de análises clínicas, toxicológicas e genéticas <b>não</b> são privativos de médico."]},
{ id:"historia", titulo:"História mundial e no Brasil", curto:"História",
  rapido:["<b>Ambroise Paré</b> (França, 1575) é chamado de <b>pai da Medicina Legal</b>; para muitos, o verdadeiro pai é <b>Paolo Zacchias</b> (Questões Médico-Legais, 1621-1651).",
    "Primeiro exame em vítima de homicídio: <b>Antistius</b>, nas lesões de <b>Júlio César</b> (44 a.C.) — só uma das 23 facadas era mortal.",
    "Marco legislativo: <b>Constitutio Criminalis Carolina</b> (Carlos V, 1532) — perícia médica em homicídio, aborto, infanticídio e lesões.",
    "Brasil (Oscar Freire): fases <b>estrangeira</b> (até 1877), <b>de transição</b> (Souza Lima, RJ, 1877) e <b>de nacionalização</b> (Nina Rodrigues, BA, 1895)."],
  teoria:[
    { h:"Linha do tempo mundial", p:[
      "Antiguidade: Código de Hamurabi (séc. XVIII a.C.) já tratava da responsabilidade do médico; os persas classificavam lesões (Zend-Avesta).",
      "Roma: Antistius examina o corpo de Júlio César (44 a.C.), como cidadão, não como perito.",
      "1209: Inocêncio III manda os médicos examinarem feridos à disposição dos tribunais. 1234: Gregório IX (decretais) exige parecer médico sobre lesões mortais.",
      "1374: Montpellier autoriza necropsia. 1507: <b>Código Bambergense</b> (Alemanha) exige perícia médica nas mortes violentas.",
      "1532: <b>Constitutio Criminalis Carolina</b>, de Carlos V — primeiro passo para a autonomia da disciplina.",
      "1575: Ambroise Paré, <i>Des Rapports et des moyens d'embaumer les corps morts</i>. 1602: Fortunato Fidelis (Palermo), primeiro tratado amplo. Zacchias (Roma), <i>Quaestiones Medico-Legales</i>.",
      "1650: primeiro curso de Medicina Legal na <b>Universidade de Leipzig</b> (Michaelis); Johannes Bohn (<i>De Renunciatione Vulnerum</i>, 1689). 1782: primeiro periódico (Berlim).",
      "Século XIX, maturidade: Orfila cria a Toxicologia Forense; Pinel e Esquirol estruturam a Psiquiatria Forense; Tardieu, Lacassagne, Brouardel, Thoinot, Balthazard (França), Hofmann (Áustria), Casper e Strassmann (Alemanha)."]},
    { h:"Brasil", p:[
      "<b>1814</b>: Antônio Gonçalves Gomide publica a impugnação ao exame que dera por \"santa\" uma moça de Sabará — primeira publicação médico-legal brasileira.",
      "<b>1830</b>: o Código Criminal do Império torna obrigatória a oitiva de peritos pelos juízes; <b>1832</b>: o Código de Processo Criminal regula o corpo de delito e as faculdades de medicina do RJ e da BA criam a cadeira de Medicina Legal.",
      "<b>1835</b>: Hércules Octávio Muzzi publica a necropsia do regente Bráulio Muniz — primeira necropsia médico-legal publicada no país.",
      "<b>1877</b>: Agostinho José de <b>Souza Lima</b> assume a cátedra no Rio — o ensino torna-se prático (fase de transição). <b>1891</b>: por iniciativa de Rui Barbosa, cria-se a cátedra nas faculdades de Direito.",
      "<b>1895</b>: <b>Raimundo Nina Rodrigues</b> assume a cátedra na Bahia e <b>nacionaliza</b> a Medicina Legal; para muitos, é o pai da Medicina Legal brasileira (e da antropologia criminal no país). Discípulos: Afrânio Peixoto e Oscar Freire.",
      "<b>Oscar Freire</b> leva a disciplina a São Paulo (1918); o instituto paulista criado em 1922 hoje leva seu nome. Obras de referência: Flamínio Fávero (Tratado, 1938), Hélio Gomes (1942), Almeida Júnior, Genival Veloso de França."]}],
  quadro:{ titulo:"As três fases da Medicina Legal brasileira (Oscar Freire)", head:["Fase","Período","Nome-chave","Marca"], rows:[
    ["Estrangeira","Colônia até 1877","Gonçalves Gomide (1814)","Influência francesa; 1830/1832: perícia obrigatória e cadeiras no RJ e na BA"],
    ["Transição","1877 a 1895","Souza Lima (RJ)","Ensino prático; curso de tanatologia no necrotério oficial"],
    ["Nacionalização","1895 em diante","Nina Rodrigues (BA); Oscar Freire (SP)","Pesquisa baseada na realidade brasileira"]]},
  pegadinhas:["O <i>Traité des Relatoires</i> de Paré é de <b>1575</b>, não 1275.","Influência decisiva no Brasil foi a <b>francesa</b> (com contribuições alemã e italiana), não a portuguesa.","Fases segundo Oscar Freire são <b>três</b>, não quatro.","Atenção a datas trocadas em apostilas: confira sempre 1814 (Gomide), 1832 (cadeiras), 1877 (Souza Lima), 1895 (Nina Rodrigues)."]},
{ id:"divisoes", titulo:"Divisões e relações com o Direito", curto:"Divisões",
  rapido:["<b>Histórica</b> (França): pericial (forense/judiciária, a mais antiga), legislativa, doutrinária e <b>filosófica</b> (ética, moral, bioética).",
    "<b>Profissional</b>: pericial, criminalística e antropologia médico-legal — exercidas pelo IML, pelo Instituto de Criminalística e pelo Instituto de Identificação.",
    "<b>Doutrinária</b> (pelo ramo do Direito): penal, civil, canônica, trabalhista e administrativa.",
    "<b>Didática</b>: <b>geral</b> (deontologia = deveres; <b>diceologia</b> = direitos do médico) e <b>especial</b> (antropologia, traumatologia, sexologia, tanatologia, toxicologia, asfixiologia, psicologia e psiquiatria forenses, criminalística, criminologia, infortunística, genética, vitimologia)."],
  teoria:[
    { h:"Medicina Legal especial — o que cada capítulo estuda", p:[
      "<b>Antropologia</b>: identidade e identificação. <b>Traumatologia</b>: lesões e energias vulnerantes. <b>Sexologia</b>: sexualidade normal, anormal e criminosa; gravidez, parto, aborto, infanticídio.",
      "<b>Tanatologia</b>: morte e morto — diagnóstico, cronotanatognose, lesões intra vitam e post mortem, necropsia, exumação, direitos sobre o cadáver.",
      "<b>Toxicologia</b>: cáusticos e venenos. <b>Asfixiologia</b>: asfixias de origem violenta. <b>Psicologia forense</b>: psiquismo normal (testemunha, confissão, vítima). <b>Psiquiatria forense</b>: transtornos mentais, capacidade civil e imputabilidade.",
      "<b>Criminalística</b>: vestígios materiais e criminodinâmica. <b>Criminologia</b>: crime, criminoso, vítima e ambiente (criminogênese). <b>Infortunística</b>: acidentes e doenças do trabalho. <b>Vitimologia</b>: participação da vítima.",
      "Pesquisa de <b>reação vital</b> em lesões é estudada na <b>tanatologia</b>, não na vitimologia nem na traumatologia."]},
    { h:"Relações com os ramos do Direito", p:[
      "<b>Penal</b>: lesões, homicídio, infanticídio, aborto, crimes sexuais, embriaguez, emoção e paixão.",
      "<b>Civil</b>: paternidade, comoriência, capacidade civil, erro essencial sobre a pessoa, direitos do nascituro.",
      "<b>Processual civil e penal</b>: psicologia da testemunha, da confissão, da vítima e do acusado. <b>Penitenciário</b>: exame criminológico, psicologia do preso.",
      "<b>Trabalho e previdenciário</b>: infortunística, insalubridade, incapacidade. <b>Administrativo</b>: ingresso, licenças e aposentadoria de servidores. Também desportivo, internacional e canônico."]}],
  pegadinhas:["<b>Diceologia</b> = direitos do médico (ex.: honorários). Deontologia = deveres. A troca é clássica (Cebraspe, PC-AL 2022).","Entomologia forense é ciência auxiliar, não subdivisão clássica da Medicina Legal (FUNDATEC).","Medicina Legal Filosófica é a fase mais recente e trata de ética e bioética."]}
],
lei:[
{ art:"Lei 12.842/2013, art. 4º, XII", nome:"Ato médico — perícia", sec:"conceito", itens:[
  { id:"l12842", rot:"Art. 4º, XII", t:"São atividades privativas do médico: (...) XII - realização de <b class='g1'>perícia médica e exames médico-legais</b>, <b class='g3'>excetuados os exames laboratoriais de análises clínicas, toxicológicas, genéticas e de biologia molecular</b>;", c:["in3"] }]},
{ art:"Lei 12.030/2009, art. 5º", nome:"Quem é perito oficial de natureza criminal", sec:"divisoes", itens:[
  { id:"l12030a5", rot:"Art. 5º", t:"Observado o disposto na legislação específica de cada ente a que o perito se encontra vinculado, são peritos de natureza criminal os <b class='g1'>peritos criminais, peritos médico-legistas e peritos odontolegistas</b> com formação superior específica detalhada em regulamento, de acordo com a necessidade de cada órgão e por área de atuação profissional.", nota:"A divisão profissional (IML, IC, II) corresponde a essa estrutura.", c:["in10"] }]}
],
juris:[],
cards:[
{ id:"in1", tipo:"distincao", sec:"conceito", f:"Conceito de Hélio Gomes × de Flamínio Fávero.", v:"<b>Hélio Gomes</b>: conhecimentos médicos <b>e paramédicos</b> para cooperar na elaboração, interpretação e execução das leis. <b>Fávero</b>: conhecimentos médico-biológicos na <b>elaboração e execução</b> das leis que deles carecem.", lei:[] },
{ id:"in2", tipo:"ce", sec:"conceito", f:"Certo ou errado: \"A Medicina Legal é a ciência a serviço das ciências jurídicas e sociais.\"", v:"<b>Errado</b> para a banca (IBFC, PCie-PR): é a <b>medicina</b> a serviço das ciências jurídicas e sociais (França).", lei:[] },
{ id:"in3", tipo:"caso", sec:"conceito", f:"Biomédico do laboratório do IML assina laudo toxicológico. Viola o ato médico?", v:"<b>Não.</b> Exames toxicológicos, genéticos e de análises clínicas estão <b>excetuados</b> da exclusividade médica (Lei 12.842, art. 4º, XII).", lei:["l12842"] },
{ id:"in4", tipo:"distincao", sec:"conceito", f:"Por que a Medicina Legal é \"ciência e arte\" para França?", v:"<b>Ciência</b>: sistematiza técnicas e métodos para fim próprio. <b>Arte</b>: exige qualidades instintivas para demonstrar a verdade (ex.: a sequência lógica de uma lesão violenta).", lei:[] },
{ id:"in5", tipo:"numero", sec:"historia", f:"Datas-chave: Paré, Carolina, Leipzig, Gomide, cadeiras no Brasil.", v:"Carolina <b>1532</b>; Paré <b>1575</b>; Leipzig <b>1650</b>; Gomide <b>1814</b>; cadeiras RJ/BA <b>1832</b>; Souza Lima <b>1877</b>; Nina Rodrigues <b>1895</b>.", lei:[] },
{ id:"in6", tipo:"caso", sec:"historia", f:"Professor de Medicina na Bahia, estudioso da antropologia criminal, considerado pai da Medicina Legal brasileira. Quem?", v:"<b>Raimundo Nina Rodrigues</b> — nacionalizou a especialidade criando a escola baiana (Lombroso o chamou de apóstolo da antropologia criminal no Novo Mundo).", lei:[] },
{ id:"in7", tipo:"distincao", sec:"historia", f:"Paré × Zacchias × Fidelis.", v:"<b>Paré</b> (1575): pai da Medicina Legal. <b>Fidelis</b> (1602): primeiro tratado amplo. <b>Zacchias</b>: <i>Quaestiones Medico-Legales</i>, para muitos o verdadeiro pai.", lei:[] },
{ id:"in8", tipo:"caso", sec:"historia", f:"Qual foi o primeiro exame médico registrado em vítima de homicídio?", v:"O de <b>Antistius</b> no corpo de <b>Júlio César</b> (44 a.C.): só uma das lesões era mortal.", lei:[] },
{ id:"in9", tipo:"ce", sec:"divisoes", f:"Certo ou errado: a diceologia estuda os deveres do médico.", v:"<b>Errado.</b> Diceologia = <b>direitos</b>; deontologia = deveres.", lei:[] },
{ id:"in10", tipo:"distincao", sec:"divisoes", f:"Divisão profissional × divisão doutrinária.", v:"<b>Profissional</b>: pericial, criminalística e antropologia médico-legal (IML, IC, Identificação). <b>Doutrinária</b>: penal, civil, canônica, trabalhista e administrativa.", lei:["l12030a5"] },
{ id:"in11", tipo:"caso", sec:"divisoes", f:"Ramo que discute ética, moral e bioética no exercício da medicina.", v:"<b>Medicina Legal Filosófica</b> (divisão histórica). A <b>doutrinária</b> fundamenta institutos jurídicos com conhecimento biológico.", lei:[] },
{ id:"in12", tipo:"caso", sec:"divisoes", f:"Em qual capítulo se estuda a pesquisa de reação vital nas lesões?", v:"<b>Tanatologia</b> (lesões intra vitam × post mortem).", lei:[] }
],
importancia:{ nivel:3,
  texto:"Abre a disciplina e rende questões de memória: quem disse o quê, datas e nomes da história e a classificação das divisões. É cobrança literal, a banca troca o autor, a data ou o termo.",
  decore:[
    ["Conceito de França","<b>medicina</b> a serviço das ciências jurídicas e sociais"],
    ["Hélio Gomes","conhecimentos médicos <b>e paramédicos</b>: elaboração, interpretação e execução das leis"],
    ["Pai da Medicina Legal","<b>Ambroise Paré</b> (1575); para muitos, <b>Zacchias</b>"],
    ["Marco legislativo","<b>Carolina</b> (Carlos V), <b>1532</b>"],
    ["Cadeiras no Brasil","RJ e BA, <b>1832</b>"],
    ["Fase de transição","<b>Souza Lima</b>, RJ, <b>1877</b>"],
    ["Fase de nacionalização","<b>Nina Rodrigues</b>, BA, <b>1895</b>"],
    ["Fases de Oscar Freire","<b>três</b>: estrangeira, transição e nacionalização"],
    ["Diceologia","<b>direitos</b> do médico (deontologia = deveres)"],
    ["Perícia médica e exames médico-legais","privativos do médico (Lei 12.842/2013, art. 4º, XII)"]],
  macetes:[
    ["Diceologia tem \"D\" de direitos","Diceologia = direitos; deontologia = deveres. A banca troca os dois."],
    ["Três fases, três lugares","Estrangeira (até 1877), transição (Rio, Souza Lima), nacionalização (Bahia, Nina Rodrigues)."],
    ["Ciência x medicina","Para França, é a <b>medicina</b> a serviço do Direito. Se a assertiva disser \"ciência\", desconfie."]] },
comparativo:{ titulo:"Divisão profissional × divisão doutrinária", head:["Divisão profissional","Divisão doutrinária"], rows:[
  ["<b>Critério:</b> quem exerce a atividade","<b>Critério:</b> ramo do Direito a que serve"],
  ["<b>Partes:</b> pericial, criminalística e antropologia médico-legal","<b>Partes:</b> penal, civil, canônica, trabalhista e administrativa"],
  ["<b>Órgãos:</b> IML, Instituto de Criminalística e Instituto de Identificação","<b>Exemplos:</b> lesões e homicídio (penal); paternidade e capacidade (civil); infortunística (trabalho)"],
  ["<b>Base legal:</b> peritos criminais, médico-legistas e odontolegistas (Lei 12.030/2009, art. 5º)","<b>Função:</b> fundamentar institutos jurídicos com conhecimento biológico"]]},
prova:[
  { tipo:"ce", enun:"Segundo França, a Medicina Legal é a ciência a serviço das ciências jurídicas e sociais.", gab:"Errado", com:"Para França é a medicina a serviço das ciências jurídicas e sociais. A troca de \"medicina\" por \"ciência\" é a pegadinha." },
  { tipo:"ce", enun:"A diceologia médica estuda os deveres do médico, enquanto a deontologia trata dos seus direitos.", gab:"Errado", com:"É o inverso: deontologia estuda os deveres e diceologia os direitos do médico." },
  { tipo:"ce", enun:"Na classificação de Oscar Freire, a fase de nacionalização da Medicina Legal brasileira tem como marco a atuação de Nina Rodrigues na Bahia.", gab:"Certo", com:"Nina Rodrigues assumiu a cátedra na Bahia em 1895 e nacionalizou a disciplina." },
  { tipo:"ce", enun:"A realização de exames laboratoriais toxicológicos e genéticos é atividade privativa de médico.", gab:"Errado", com:"A Lei 12.842/2013, art. 4º, XII, reserva ao médico a perícia e os exames médico-legais, mas exceta os exames laboratoriais de análises clínicas, toxicológicas, genéticas e de biologia molecular." },
  { tipo:"caso", enun:"Em qual capítulo da Medicina Legal especial se estuda a pesquisa de reação vital em lesões, para distinguir lesão em vida de lesão após a morte?", com:"Na tanatologia (lesões intra vitam e post mortem), e não na traumatologia nem na vitimologia." }],
resumo:[
  "A Medicina Legal é a <b>medicina</b> a serviço das ciências jurídicas e sociais (França); é ciência e arte.",
  "Hélio Gomes: conhecimentos <b>médicos e paramédicos</b> que cooperam na elaboração, auxiliam na interpretação e colaboram na execução das leis.",
  "Perícia médica e exames médico-legais são privativos de médico, exceto os exames laboratoriais de análises clínicas, toxicológicas, genéticas e de biologia molecular.",
  "Marcos: Carolina (1532), Paré (1575), Leipzig (1650), Gomide (1814), cadeiras no RJ e na BA (1832), Souza Lima (1877), Nina Rodrigues (1895).",
  "Oscar Freire divide a história brasileira em três fases: estrangeira, de transição e de nacionalização.",
  "Divisão histórica: pericial, legislativa, doutrinária e filosófica. Profissional: pericial, criminalística e antropologia. Doutrinária: penal, civil, canônica, trabalhista e administrativa.",
  "Didática: geral (deontologia e diceologia) e especial (antropologia, traumatologia, sexologia, tanatologia, toxicologia, asfixiologia, psiquiatria forense e outras).",
  "Os peritos criminais são peritos criminais, médico-legistas e odontolegistas (Lei 12.030/2009, art. 5º)."],
checklist:[
  "Dizer o conceito de França e o de Hélio Gomes sem trocar \"medicina\" por \"ciência\".",
  "Diferenciar deontologia (deveres) de diceologia (direitos).",
  "Ordenar os marcos históricos mundiais e brasileiros.",
  "Citar as três fases de Oscar Freire e o nome-chave de cada uma.",
  "Explicar as divisões histórica, profissional, doutrinária e didática.",
  "Dizer o que cada capítulo da Medicina Legal especial estuda.",
  "Aplicar a exceção do ato médico para exames laboratoriais.",
  "Relacionar a Medicina Legal aos ramos do Direito (penal, civil, trabalho, administrativo)."],
questoes:[]
};

/* ======================= PERÍCIAS E PERITOS ======================= */
T.ml_pericias = {
meta:{ tema:"Perícias e peritos (CPP, arts. 158 a 184)", atualizado:AT,
  foco:"Exame de corpo de delito direto e indireto e suprimento testemunhal; cadeia de custódia (158-A a 158-F); perito oficial e não oficial; assistente técnico; prazos; necropsia e exumação; exame complementar; perícias de documentos (grafotécnica e documentoscopia); perfil genético (Lei 15.295/2025).",
  aviso:"A Lei 15.295/2025 (vigente desde jan./2026) é posterior a muitas apostilas: confira a redação nova da LEP, art. 9º-A, e da Lei 12.037/2009." },
secoes:[
{ id:"corpo", titulo:"Corpo de delito: vestígio, exame direto e indireto", curto:"Corpo de delito",
  rapido:["Infração que deixa vestígios exige <b>exame de corpo de delito, direto ou indireto</b>; a <b>confissão não o supre</b> (CPP, art. 158).",
    "<b>Direto</b>: perito examina o próprio vestígio. <b>Indireto</b>: perito elabora laudo a partir de dados verossímeis (prontuário, atestado, fotos) — <b>há laudo</b>.",
    "Desaparecidos os vestígios, a <b>prova testemunhal</b> pode suprir a falta (art. 167) — aqui <b>não há laudo</b>: é prova testemunhal, não perícia indireta.",
    "Falta do exame onde havia vestígio = <b>nulidade</b> (art. 564, III, b), ressalvado o art. 167. Prioridade para violência doméstica contra a mulher e contra criança, adolescente, idoso ou pessoa com deficiência (art. 158, parágrafo único)."],
  teoria:[
    { h:"Conceitos de base", p:[
      "<b>Perícia</b>: exame técnico para estabelecer a verdade sobre fatos de interesse da Justiça. <b>Corpo de delito</b>: o conjunto de vestígios materiais deixados pela infração.",
      "<b>Vestígio</b> (CPP, 158-A, §3º): todo objeto ou material bruto, visível ou latente, constatado ou recolhido, que se relaciona à infração penal. <b>Indício</b> (art. 239): circunstância conhecida e provada que, por indução, autoriza concluir pela existência de outra. Vestígio ≠ indício: o vestígio só vira indício depois de analisado e relacionado ao fato.",
      "Grupos de perícia: no vivo (exame clínico-pericial), no cadáver (necropsia), no cadáver sepultado (<b>exumação</b>) e exames de laboratório."]},
    { h:"Percipiendi × deducendi", p:[
      "<b>Perícia percipiendi</b>: o perito percebe e registra o fato atual (a perícia típica: o legista examina a lesão).",
      "<b>Perícia deducendi</b>: o perito interpreta fato passado ou perícia já feita — muitas vezes resulta em <b>parecer</b>.",
      "<b>Perícia contraditória</b>: os peritos divergem; cada um redige seu laudo e a autoridade nomeia um <b>terceiro</b>; se este divergir de ambos, pode mandar fazer novo exame (art. 180)."]},
    { h:"Exame indireto × suprimento testemunhal", p:[
      "No <b>indireto</b>, o perito afirma, por exemplo, que o atestado do médico particular é compatível com a lesão narrada: é laudo pericial, ainda que de juízo de compatibilidade.",
      "No <b>suprimento</b> (art. 167), testemunhas que viram o vestígio depõem em juízo. Ex.: corpo nunca encontrado — a materialidade do homicídio pode ser provada por testemunhas e outros elementos.",
      "Em <b>lesão grave por incapacidade por mais de 30 dias</b>, a falta do exame complementar pode ser suprida pela prova testemunhal (art. 168, §3º)."]}],
  pegadinhas:["Exame indireto <b>não</b> é sinônimo de prova testemunhal supletiva.","A confissão não supre o exame, nem quando o réu é colaborador.","O art. 158, parágrafo único, dá <b>prioridade</b>, não exclusividade."]},
{ id:"custodia", titulo:"Cadeia de custódia (arts. 158-A a 158-F)", curto:"Custódia",
  rapido:["Conjunto de procedimentos para manter e documentar a <b>história cronológica do vestígio</b>, do <b>reconhecimento até o descarte</b> (158-A).",
    "Início: com a <b>preservação do local</b> ou com procedimento policial/pericial em que se detecte vestígio. Quem reconhece o elemento fica <b>responsável por sua preservação</b>.",
    "<b>10 etapas</b> (158-B): reconhecimento, isolamento, fixação, coleta, acondicionamento, transporte, recebimento, processamento, armazenamento, descarte.",
    "Entrar em local isolado ou remover vestígio antes da liberação pelo perito é <b>fraude processual</b> (158-C, §2º). Coleta <b>preferencialmente</b> por perito oficial."],
  teoria:[
    { h:"As etapas — como a banca troca", p:[
      "Fases externas (no local): <b>reconhecimento</b> (distinguir o elemento de interesse), <b>isolamento</b> (evitar alteração do ambiente imediato, mediato e relacionado), <b>fixação</b> (descrição detalhada, com fotos, filmagens ou croqui — a descrição no laudo é indispensável), <b>coleta</b>, <b>acondicionamento</b> (embalagem individualizada, com data, hora e nome de quem coletou) e <b>transporte</b>.",
      "Fases internas (no órgão pericial): <b>recebimento</b> (transferência formal da posse, com dados mínimos), <b>processamento</b> (o exame em si, formalizado em laudo), <b>armazenamento</b> (guarda vinculada ao número do laudo) e <b>descarte</b> (respeitada a lei e, quando pertinente, com autorização judicial).",
      "Mnemônico da ordem: <b>R-I-F-C-A-T-R-P-A-D</b>."]},
    { h:"Recipientes, lacres e central de custódia", p:[
      "O recipiente é definido pela natureza do material; todos são selados com <b>lacres numerados individualmente</b>; só o perito que fará a análise (ou pessoa autorizada, motivadamente) pode abri-lo; o lacre rompido vai para dentro do novo recipiente (158-D).",
      "Todo Instituto de Criminalística deve ter <b>central de custódia</b>, vinculada ao órgão central de perícia; entradas, saídas e acessos são registrados (158-E). Após a perícia, o material volta à central (158-F).",
      "Quebra da cadeia: para o STJ, não gera nulidade automática — o juiz avalia a confiabilidade da prova à luz dos demais elementos (ver jurisprudência)."]}],
  pegadinhas:["A cadeia termina no <b>descarte</b>, não no laudo.","<b>Fixação</b> é descrever/fotografar; <b>coleta</b> é recolher. A banca inverte as definições.","A coleta é feita <b>preferencialmente</b> (não exclusivamente) por perito oficial."]},
{ id:"peritos", titulo:"Peritos, assistentes, quesitos e prazos", curto:"Peritos",
  rapido:["Regra: <b>um perito oficial</b> com diploma de curso superior (art. 159). Na falta: <b>duas pessoas idôneas</b> com curso superior, preferencialmente na área, que prestam <b>compromisso</b>.",
    "MP, assistente de acusação, ofendido, querelante e acusado podem formular <b>quesitos</b> e indicar <b>assistente técnico</b>, que atua <b>após a admissão pelo juiz e depois do laudo oficial</b>.",
    "Laudo em até <b>10 dias</b>, prorrogável excepcionalmente a pedido dos peritos (art. 160, parágrafo único). Oitiva do perito em juízo: pedido com <b>10 dias</b> de antecedência (art. 159, §5º, I).",
    "Perícia complexa: <b>mais de um perito oficial</b> e mais de um assistente técnico (§7º). O juiz <b>não fica adstrito ao laudo</b> (art. 182)."],
  teoria:[
    { h:"Autonomia e regime do perito", p:[
      "Lei 12.030/2009: ao perito oficial de natureza criminal é assegurada <b>autonomia técnica, científica e funcional</b>; exige-se <b>concurso público</b> com formação acadêmica específica.",
      "Peritos de natureza criminal: <b>peritos criminais, médico-legistas e odontolegistas</b>.",
      "O perito é <b>auxiliar da Justiça</b>, sujeito à disciplina judiciária, às causas de suspeição dos juízes (CPP, arts. 275 a 280) e responde criminalmente (falsa perícia: CP, art. 342).",
      "Súmula 361 do STF (nulidade do exame por um só perito) ficou <b>superada</b> quanto ao perito oficial desde a Lei 11.690/2008; para peritos não oficiais continuam exigidos dois."]},
    { h:"Quem determina a perícia", p:[
      "Delegado (CPP, art. 6º, VII), juiz e MP podem requisitar; as partes podem requerer.",
      "Art. 184: a autoridade <b>negará</b> perícia requerida pelas partes quando desnecessária — <b>salvo o exame de corpo de delito</b>, que não pode ser negado.",
      "Incidente de insanidade mental: só o <b>juiz</b> ordena (art. 149); na fase de inquérito, mediante representação do delegado."]}],
  pegadinhas:["Assistente técnico não acompanha o exame oficial: entra <b>depois</b> do laudo.","Peritos não oficiais = <b>dois</b>; oficial = <b>um</b>.","O delegado pode negar perícia desnecessária, <b>exceto</b> o exame de corpo de delito."]},
{ id:"exames", titulo:"Exames em espécie: necropsia, exumação, lesões e coisas", curto:"Exames",
  rapido:["Exame de corpo de delito em <b>qualquer dia e hora</b> (art. 161).",
    "<b>Autópsia</b>: pelo menos <b>6 horas</b> após o óbito, salvo evidência dos sinais de morte (art. 162). Morte violenta sem infração a apurar, ou com lesões externas que bastem: <b>só exame externo</b>.",
    "Cadáveres <b>sempre fotografados</b> na posição em que encontrados (art. 164). Exumação: dia e hora marcados, auto circunstanciado; o administrador do cemitério indica a sepultura sob pena de <b>desobediência</b> (art. 163).",
    "Exame complementar de lesão para o §1º, I, do art. 129: <b>logo que decorram 30 dias</b> da data do crime (art. 168, §2º)."],
  teoria:[
    { h:"Laboratório, local e instrumentos", p:[
      "Perícias de laboratório: guardar <b>material suficiente</b> para eventual nova perícia (art. 170).",
      "Local do crime: a autoridade providencia para que não se altere o estado das coisas; os peritos registram as alterações e discutem suas consequências na dinâmica (art. 169).",
      "Rompimento de obstáculo e escalada: os peritos indicam <b>instrumentos, meios e época</b> provável (art. 171). Para o STJ, a qualificadora exige laudo, salvo vestígios desaparecidos.",
      "Incêndio: causa, lugar de início, perigo, extensão e valor do dano (art. 173). Instrumentos do crime: natureza e eficiência (art. 175)."]},
    { h:"Documentoscopia e grafotécnica", p:[
      "Reconhecimento de escritos por comparação de letra (art. 174): a pessoa é intimada; servem documentos que ela reconheça, já reconhecidos judicialmente ou de autenticidade indiscutível; podem ser requisitados de arquivos públicos; na falta, ela escreve <b>o que lhe for ditado</b> (inclusive por precatória). Ninguém é obrigado a fornecer padrões contra si (não autoincriminação).",
      "Subáreas da documentoscopia: <b>grafoscopia</b> (escrita manual: autenticidade e autoria gráfica), <b>mecanografia</b> (impressoras, carimbos) e <b>exames de autenticidade documental</b> (contrafação = falso total; alteração = falso parcial).",
      "Padrões de confronto: <b>autenticidade, adequabilidade, contemporaneidade e quantidade</b>. Elementos subjetivos do gesto gráfico (dinamismo, ritmo, velocidade) × objetivos (pressão, momentos gráficos, comportamento de pauta e de base, ataques e remates, inclinação axial).",
      "Elementos de segurança: <b>1º nível</b> (leigo, sem equipamento: marca-d'água, registro coincidente, fio de segurança); <b>2º nível</b> (equipamento simples: fibras luminescentes, microtextos); <b>3º nível</b> (perito com microscópio: nanotextos, tintas só visíveis no infravermelho)."]},
    { h:"Perfil genético (Lei 15.295/2025)", p:[
      "Alterou a LEP (art. 9º-A) e a Lei 12.037/2009: condenado à pena de reclusão em <b>regime inicial fechado</b> é submetido <b>obrigatoriamente</b> à identificação do perfil genético ao ingressar no estabelecimento prisional.",
      "A amostra serve apenas à identificação, sendo <b>vedada a fenotipagem genética</b>; após a obtenção do perfil, descarta-se a amostra, preservando material para eventual contraperícia; coleta por agente público treinado, com respeito à cadeia de custódia, e laudo por perito oficial.",
      "Na Lei 12.037/2009, novo art. 3º, VII: identificação criminal quando houver <b>recebimento da denúncia</b> por crime com grave violência contra a pessoa, crime contra a liberdade sexual ou sexual contra vulnerável, crimes dos arts. 240 a 241-C do ECA ou organização criminosa armada; nesses casos e no do inciso IV, a identificação inclui <b>coleta de material biológico</b> — também na <b>prisão em flagrante</b> por esses crimes (art. 5º, §§1º e 2º)."]}],
  pegadinhas:["6 horas é o <b>mínimo</b> para a autópsia, não o máximo.","A falta do exame complementar <b>pode</b> ser suprida por testemunhas.","Microtexto é elemento de <b>2º</b> nível; marca-d'água, de <b>1º</b>."]}
],
lei:[
{ art:"CPP, arts. 158 e 167", nome:"Exame de corpo de delito e suprimento", sec:"corpo", itens:[
  { id:"cpp158", rot:"Art. 158", t:"Quando a infração deixar <b class='g1'>vestígios</b>, será <b class='g1'>indispensável o exame de corpo de delito, direto ou indireto</b>, <b class='g3'>não podendo supri-lo a confissão do acusado</b>.<br>Parágrafo único. Dar-se-á <b class='g3'>prioridade</b> à realização do exame de corpo de delito quando se tratar de crime que envolva: I - violência doméstica e familiar contra mulher; II - violência contra criança, adolescente, idoso ou pessoa com deficiência.", nota:"Parágrafo único incluído pela Lei 13.721/2018.", c:["pe1","pe2"], j:["stj-materialidade-sem-cadaver"] },
  { id:"cpp167", rot:"Art. 167", t:"Não sendo possível o exame de corpo de delito, por haverem <b class='g3'>desaparecido os vestígios</b>, a <b class='g1'>prova testemunhal poderá suprir-lhe a falta</b>.", c:["pe3"], j:["stj-materialidade-sem-cadaver","stj-rompimento"] },
  { id:"cpp564", rot:"Art. 564, III, b", t:"A nulidade ocorrerá nos seguintes casos: (...) III - por falta das fórmulas ou dos termos seguintes: (...) b) o <b class='g1'>exame do corpo de delito</b> nos crimes que deixam vestígios, <b class='g3'>ressalvado o disposto no Art. 167</b>;", c:["pe3"] }]},
{ art:"CPP, arts. 158-A a 158-F", nome:"Cadeia de custódia", sec:"custodia", itens:[
  { id:"cpp158a", rot:"Art. 158-A", t:"Considera-se cadeia de custódia o conjunto de todos os procedimentos utilizados para manter e documentar a <b class='g1'>história cronológica do vestígio</b> coletado em locais ou em vítimas de crimes, para rastrear sua posse e manuseio a partir de seu <b class='g1'>reconhecimento até o descarte</b>.<br>§ 1º O início da cadeia de custódia dá-se com a <b class='g1'>preservação do local de crime</b> ou com procedimentos policiais ou periciais nos quais seja detectada a existência de vestígio.<br>§ 2º O agente público que reconhecer um elemento como de potencial interesse para a produção da prova pericial fica <b class='g1'>responsável por sua preservação</b>.<br>§ 3º Vestígio é todo objeto ou material bruto, <b class='g1'>visível ou latente, constatado ou recolhido</b>, que se relaciona à infração penal.", nota:"Arts. 158-A a 158-F incluídos pela Lei 13.964/2019 (Pacote Anticrime).", c:["pe4","pe6"], j:["stj-hc653515"] },
  { id:"cpp158b", rot:"Art. 158-B", t:"A cadeia de custódia compreende o rastreamento do vestígio nas seguintes etapas:<br>I - <b class='g1'>reconhecimento</b>: ato de distinguir um elemento como de potencial interesse para a produção da prova pericial;<br>II - <b class='g1'>isolamento</b>: ato de evitar que se altere o estado das coisas, devendo isolar e preservar o ambiente imediato, mediato e relacionado aos vestígios e local de crime;<br>III - <b class='g1'>fixação</b>: descrição detalhada do vestígio conforme se encontra no local de crime ou no corpo de delito, e a sua posição na área de exames, podendo ser ilustrada por fotografias, filmagens ou croqui, sendo <b class='g3'>indispensável a sua descrição no laudo pericial</b> produzido pelo perito responsável pelo atendimento;<br>IV - <b class='g1'>coleta</b>: ato de recolher o vestígio que será submetido à análise pericial, respeitando suas características e natureza;<br>V - <b class='g1'>acondicionamento</b>: procedimento por meio do qual cada vestígio coletado é embalado de forma individualizada, de acordo com suas características físicas, químicas e biológicas, para posterior análise, com anotação da data, hora e nome de quem realizou a coleta e o acondicionamento;<br>VI - <b class='g1'>transporte</b>: ato de transferir o vestígio de um local para o outro, utilizando as condições adequadas (embalagens, veículos, temperatura, entre outras), de modo a garantir a manutenção de suas características originais, bem como o controle de sua posse;<br>VII - <b class='g1'>recebimento</b>: ato formal de transferência da posse do vestígio, que deve ser documentado com, no mínimo, informações referentes ao número de procedimento e unidade de polícia judiciária relacionada, local de origem, nome de quem transportou o vestígio, código de rastreamento, natureza do exame, tipo do vestígio, protocolo, assinatura e identificação de quem o recebeu;<br>VIII - <b class='g1'>processamento</b>: exame pericial em si, manipulação do vestígio de acordo com a metodologia adequada às suas características biológicas, físicas e químicas, a fim de se obter o resultado desejado, que deverá ser formalizado em laudo produzido por perito;<br>IX - <b class='g1'>armazenamento</b>: procedimento referente à guarda, em condições adequadas, do material a ser processado, guardado para realização de contraperícia, descartado ou transportado, com vinculação ao número do laudo correspondente;<br>X - <b class='g1'>descarte</b>: procedimento referente à liberação do vestígio, respeitando a legislação vigente e, quando pertinente, <b class='g3'>mediante autorização judicial</b>.", c:["pe5","pe6"] },
  { id:"cpp158c", rot:"Arts. 158-C a 158-F", t:"Art. 158-C. A coleta dos vestígios deverá ser realizada <b class='g3'>preferencialmente</b> por <b class='g1'>perito oficial</b>, que dará o encaminhamento necessário para a central de custódia, mesmo quando for necessária a realização de exames complementares. (...)<br>§ 2º É proibida a entrada em locais isolados bem como a remoção de quaisquer vestígios de locais de crime <b class='g3'>antes da liberação por parte do perito responsável</b>, sendo tipificada como <b class='g1'>fraude processual</b> a sua realização.<br>Art. 158-D. (...) § 1º Todos os recipientes deverão ser selados com <b class='g1'>lacres, com numeração individualizada</b> (...). § 3º O recipiente só poderá ser aberto pelo <b class='g1'>perito que vai proceder à análise</b> e, motivadamente, por pessoa autorizada. (...) § 5º O lacre rompido deverá ser acondicionado no interior do novo recipiente.<br>Art. 158-E. Todos os Institutos de Criminalística deverão ter uma <b class='g1'>central de custódia</b> destinada à guarda e controle dos vestígios (...).<br>Art. 158-F. Após a realização da perícia, o material deverá ser <b class='g1'>devolvido à central de custódia</b>, devendo nela permanecer.", c:["pe7"] }]},
{ art:"CPP, arts. 159, 160, 180 a 184", nome:"Peritos, laudo e valoração", sec:"peritos", itens:[
  { id:"cpp159", rot:"Art. 159", t:"O exame de corpo de delito e outras perícias serão realizados por <b class='g1'>perito oficial, portador de diploma de curso superior</b>.<br>§ 1º Na falta de perito oficial, o exame será realizado por <b class='g2'>2 (duas) pessoas idôneas</b>, portadoras de diploma de curso superior <b class='g3'>preferencialmente na área específica</b>, dentre as que tiverem habilitação técnica relacionada com a natureza do exame.<br>§ 2º Os peritos não oficiais prestarão o <b class='g1'>compromisso</b> de bem e fielmente desempenhar o encargo.<br>§ 3º Serão facultadas ao Ministério Público, ao assistente de acusação, ao ofendido, ao querelante e ao acusado a formulação de <b class='g1'>quesitos e indicação de assistente técnico</b>.<br>§ 4º O assistente técnico atuará a partir de sua <b class='g3'>admissão pelo juiz e após a conclusão dos exames e elaboração do laudo</b> pelos peritos oficiais, sendo as partes intimadas desta decisão.<br>§ 5º Durante o curso do processo judicial, é permitido às partes, quanto à perícia: I - requerer a <b class='g1'>oitiva dos peritos</b> para esclarecerem a prova ou para responderem a quesitos, desde que o mandado de intimação e os quesitos ou questões a serem esclarecidas sejam encaminhados com antecedência mínima de <b class='g2'>10 (dez) dias</b>, podendo apresentar as respostas em laudo complementar; II - indicar assistentes técnicos que poderão apresentar pareceres em prazo a ser fixado pelo juiz ou ser inquiridos em audiência.<br>(...) § 7º Tratando-se de <b class='g1'>perícia complexa</b> que abranja mais de uma área de conhecimento especializado, poder-se-á designar a atuação de <b class='g1'>mais de um perito oficial</b>, e a parte indicar mais de um assistente técnico.", nota:"Redação da Lei 11.690/2008.", c:["pe8","pe9","pe10"], j:["stf-s361"] },
  { id:"cpp160", rot:"Arts. 160 e 161", t:"Art. 160. Os peritos elaborarão o laudo pericial, onde <b class='g1'>descreverão minuciosamente</b> o que examinarem, e responderão aos quesitos formulados.<br>Parágrafo único. O laudo pericial será elaborado no prazo máximo de <b class='g2'>10 dias</b>, podendo este prazo ser prorrogado, <b class='g3'>em casos excepcionais, a requerimento dos peritos</b>.<br>Art. 161. O exame de corpo de delito poderá ser feito em <b class='g1'>qualquer dia e a qualquer hora</b>.", c:["pe11"] },
  { id:"cpp180", rot:"Arts. 180 a 182 e 184", t:"Art. 180. Se houver <b class='g1'>divergência entre os peritos</b>, serão consignadas no auto do exame as declarações e respostas de um e de outro, ou cada um redigirá separadamente o seu laudo, e a autoridade nomeará um <b class='g1'>terceiro</b>; se este divergir de ambos, a autoridade poderá mandar proceder a novo exame por outros peritos.<br>Art. 181. No caso de inobservância de formalidades, ou no caso de omissões, obscuridades ou contradições, a autoridade judiciária mandará suprir a formalidade, complementar ou esclarecer o laudo. (...)<br>Art. 182. O juiz <b class='g1'>não ficará adstrito ao laudo</b>, podendo aceitá-lo ou rejeitá-lo, no todo ou em parte.<br>Art. 184. <b class='g3'>Salvo o caso de exame de corpo de delito</b>, o juiz ou a autoridade policial <b class='g1'>negará a perícia</b> requerida pelas partes, quando não for necessária ao esclarecimento da verdade.", c:["pe12","pe13"] }]},
{ art:"CPP, arts. 162 a 175", nome:"Exames em espécie", sec:"exames", itens:[
  { id:"cpp162", rot:"Arts. 162 a 164", t:"Art. 162. A autópsia será feita <b class='g2'>pelo menos seis horas depois do óbito</b>, <b class='g3'>salvo se os peritos, pela evidência dos sinais de morte, julgarem que possa ser feita antes daquele prazo</b>, o que declararão no auto.<br>Parágrafo único. Nos casos de morte violenta, bastará o <b class='g1'>simples exame externo</b> do cadáver, quando <b class='g3'>não houver infração penal que apurar</b>, ou quando as <b class='g3'>lesões externas permitirem precisar a causa da morte</b> e não houver necessidade de exame interno para a verificação de alguma circunstância relevante.<br>Art. 163. Em caso de <b class='g1'>exumação</b> para exame cadavérico, a autoridade providenciará para que, em dia e hora previamente marcados, se realize a diligência, da qual se lavrará auto circunstanciado.<br>Parágrafo único. O administrador de cemitério público ou particular indicará o lugar da sepultura, <b class='g3'>sob pena de desobediência</b>. (...)<br>Art. 164. Os cadáveres serão <b class='g1'>sempre fotografados na posição em que forem encontrados</b>, bem como, na medida do possível, todas as lesões externas e vestígios deixados no local do crime.", c:["pe14","pe15"] },
  { id:"cpp168", rot:"Art. 168", t:"Em caso de lesões corporais, se o primeiro exame pericial tiver sido incompleto, proceder-se-á a <b class='g1'>exame complementar</b> por determinação da autoridade policial ou judiciária, de ofício, ou a requerimento do Ministério Público, do ofendido ou do acusado, ou de seu defensor.<br>§ 1º No exame complementar, os peritos terão presente o auto de corpo de delito, a fim de suprir-lhe a deficiência ou retificá-lo.<br>§ 2º Se o exame tiver por fim precisar a classificação do delito no art. 129, § 1º, I, do Código Penal, deverá ser feito <b class='g2'>logo que decorra o prazo de 30 dias</b>, contado da data do crime.<br>§ 3º A falta de exame complementar poderá ser <b class='g3'>suprida pela prova testemunhal</b>.", c:["pe16"] },
  { id:"cpp170", rot:"Arts. 169 a 175", t:"Art. 169. Para o efeito de exame do local onde houver sido praticada a infração, a autoridade providenciará imediatamente para que <b class='g1'>não se altere o estado das coisas</b> até a chegada dos peritos (...).<br>Art. 170. Nas perícias de laboratório, os peritos guardarão <b class='g1'>material suficiente para a eventualidade de nova perícia</b>. (...)<br>Art. 171. Nos crimes cometidos com destruição ou <b class='g1'>rompimento de obstáculo</b> a subtração da coisa, ou por meio de <b class='g1'>escalada</b>, os peritos, além de descrever os vestígios, indicarão com que <b class='g1'>instrumentos, por que meios e em que época</b> presumem ter sido o fato praticado.<br>(...) Art. 175. Serão sujeitos a exame os <b class='g1'>instrumentos empregados</b> para a prática da infração, a fim de se lhes verificar a natureza e a eficiência.", c:["pe17"], j:["stj-rompimento"] },
  { id:"cpp174", rot:"Art. 174", t:"No exame para o reconhecimento de escritos, por <b class='g1'>comparação de letra</b>, observar-se-á o seguinte:<br>I - a pessoa a quem se atribua ou se possa atribuir o escrito será <b class='g1'>intimada para o ato</b>, se for encontrada;<br>II - para a comparação, poderão servir quaisquer documentos que a dita pessoa reconhecer ou já tiverem sido judicialmente reconhecidos como de seu punho, ou sobre cuja autenticidade não houver dúvida;<br>III - a autoridade, quando necessário, requisitará, para o exame, os documentos que existirem em arquivos ou estabelecimentos públicos, ou nestes realizará a diligência, se daí não puderem ser retirados;<br>IV - quando não houver escritos para a comparação ou forem insuficientes os exibidos, a autoridade mandará que a pessoa <b class='g1'>escreva o que lhe for ditado</b>. Se estiver ausente a pessoa, mas em lugar certo, esta última diligência poderá ser feita por <b class='g3'>precatória</b>, em que se consignarão as palavras que a pessoa será intimada a escrever.", c:["pe18","pe19"] }]},
{ art:"Lei 15.295/2025", nome:"Perfil genético na execução penal", sec:"exames", itens:[
  { id:"l15295", rot:"LEP, art. 9º-A (Lei 15.295/2025)", t:"Caput: O condenado à pena de <b class='g1'>reclusão em regime inicial fechado</b> será submetido <b class='g1'>obrigatoriamente</b> à identificação do perfil genético, mediante extração de DNA (ácido desoxirribonucleico), por técnica adequada e indolor, por ocasião do <b class='g1'>ingresso no estabelecimento prisional</b>.<br>Parágrafos (resumo, não transcrição): a amostra destina-se exclusivamente à identificação, <b class='g3'>vedada a fenotipagem genética</b>; obtido o perfil, a amostra é descartada, <b class='g3'>preservado material para eventual nova perícia</b>; coleta por agente público treinado, observada a <b class='g1'>cadeia de custódia</b>, e laudo por perito oficial.", nota:"Lei 15.295, de 19/12/2025 (DOU 22/12/2025), vigência 30 dias após a publicação. Também alterou os arts. 3º e 5º da Lei 12.037/2009. Confira o texto integral no Planalto.", novo:true, c:["pe20"], j:["stj-hc879757","stf-t905"] }]}
],
juris:[
{ id:"stj-hc653515", trib:"STJ", tipo:"Precedente", num:"HC 653.515/RJ (6ª Turma)", sec:"custodia", status:"vigente", data:"2021",
  titulo:"Quebra da cadeia de custódia não gera nulidade automática",
  texto:"A inobservância dos arts. 158-A a 158-F não acarreta, por si só, a nulidade da prova: cabe ao juiz, diante dos demais elementos, aferir se a prova é confiável.",
  explica:"A falha na custódia afeta o <b>peso</b> da prova (valoração), não sua validade automática. Se a irregularidade comprometer a confiabilidade, a prova pode ser descartada.", lei:["cpp158a"], fonte:STJJ },
{ id:"stj-materialidade-sem-cadaver", trib:"STJ", tipo:"Jurisprudência reiterada", num:"CPP, arts. 158 e 167", sec:"corpo", status:"vigente", data:"reiterada",
  titulo:"Homicídio sem cadáver: materialidade por outros meios",
  texto:"Desaparecido o corpo, a materialidade pode ser demonstrada por prova testemunhal e outros elementos idôneos, nos termos do art. 167 do CPP.",
  explica:"O art. 158 cede quando o vestígio <b>desapareceu</b>. O que não se admite é deixar de fazer o exame quando o vestígio existia.", lei:["cpp158","cpp167"], fonte:STJJ },
{ id:"stj-rompimento", trib:"STJ", tipo:"Jurisprudência reiterada", num:"CP, art. 155, §4º, I; CPP, arts. 158, 167 e 171", sec:"exames", status:"vigente", data:"reiterada",
  titulo:"Qualificadora do rompimento de obstáculo exige laudo, salvo vestígios desaparecidos",
  texto:"Para reconhecer a qualificadora do rompimento de obstáculo é necessário o exame pericial; a prova testemunhal ou outros meios só a suprem quando os vestígios tiverem desaparecido ou houver justificativa idônea para a não realização da perícia.",
  explica:"Aplica-se a regra geral: havendo vestígio, laudo. Fotografias e testemunhas não substituem a perícia que podia ter sido feita.", lei:["cpp167","cpp170"], fonte:STJJ },
{ id:"stf-s361", trib:"STF", tipo:"Súmula", num:"Súmula 361", sec:"peritos", status:"atencao", data:"1963",
  titulo:"Exame por um só perito (superada em parte)",
  texto:"No processo penal, é nulo o exame realizado por um só perito, considerando-se impedido o que tiver funcionado, anteriormente, na diligência de apreensão.",
  explica:"Desde a Lei 11.690/2008, basta <b>um perito oficial</b>; a súmula só mantém sentido para os <b>peritos não oficiais</b> (dois). A parte final (impedimento de quem funcionou na apreensão) é a que ainda aparece em prova.", lei:["cpp159"], fonte:STFS },
{ id:"stj-hc879757", trib:"STJ", tipo:"Informativo", num:"HC 879.757 (Informativo 822)", sec:"exames", status:"atencao", data:"2024",
  titulo:"Fornecimento obrigatório de perfil genético por condenados",
  texto:"Segundo a divulgação do Informativo 822, o STJ considerou válida a exigência de fornecimento de material genético pelo condenado prevista na LEP.",
  explica:"Conforme o material de estudo e a divulgação do informativo — confira o inteiro teor. A Lei 15.295/2025 reformulou o art. 9º-A depois desse julgado.", lei:["l15295"], fonte:STJJ },
{ id:"stf-t905", trib:"STF", tipo:"Repercussão geral", num:"Tema 905", sec:"exames", status:"pendente", data:"pendente",
  titulo:"Constitucionalidade da coleta de perfil genético de condenados (LEP, art. 9º-A)",
  texto:"Discute-se se a coleta compulsória de material genético de condenados viola a garantia contra a autoincriminação, a intimidade e a dignidade.",
  explica:"Até a última conferência, não havia tese fixada. Acompanhe: o resultado pode afetar a nova redação dada pela Lei 15.295/2025.", lei:["l15295"], fonte:STFJ }
],
cards:[
{ id:"pe1", tipo:"caso", sec:"corpo", f:"Réu confessa ter quebrado a vitrine para furtar. Não houve perícia, mas o vidro quebrado continua lá. Basta a confissão?", v:"<b>Não.</b> Havia vestígio: o exame é indispensável e a confissão não o supre (art. 158). A falta gera nulidade (art. 564, III, b).", lei:["cpp158"] },
{ id:"pe2", tipo:"lacuna", sec:"corpo", f:"Art. 158, parágrafo único: dá-se ______ ao exame quando o crime envolver violência doméstica contra mulher ou violência contra criança, adolescente, idoso ou ______.", v:"<b>prioridade</b>; <b>pessoa com deficiência</b>.", lei:["cpp158"] },
{ id:"pe3", tipo:"distincao", sec:"corpo", f:"Exame de corpo de delito indireto × suprimento testemunhal.", v:"<b>Indireto</b>: há <b>laudo</b>, feito por perito a partir de dados verossímeis (atestado, prontuário). <b>Suprimento</b> (art. 167): vestígio desapareceu e <b>testemunhas</b> o substituem — é prova testemunhal.", lei:["cpp167","cpp564"] },
{ id:"pe4", tipo:"lacuna", sec:"custodia", f:"Cadeia de custódia: vai do ______ até o ______ do vestígio.", v:"<b>reconhecimento</b>; <b>descarte</b>.", lei:["cpp158a"] },
{ id:"pe5", tipo:"caso", sec:"custodia", f:"Perito descreve e fotografa a faca junto ao corpo, registrando a posição. Que etapa é essa?", v:"<b>Fixação</b> (158-B, III). Recolher a faca seria <b>coleta</b>; embalá-la, <b>acondicionamento</b>.", lei:["cpp158b"] },
{ id:"pe6", tipo:"caso", sec:"custodia", f:"Policial militar que chega primeiro ao local e identifica um estojo de munição. Qual é o seu dever?", v:"Ele <b>reconheceu</b> o vestígio e fica <b>responsável por sua preservação</b> (158-A, §2º). A cadeia já começou (§1º).", lei:["cpp158a","cpp158b"] },
{ id:"pe7", tipo:"caso", sec:"custodia", f:"Parente da vítima entra no local isolado e recolhe o celular dela antes da liberação pelo perito. Consequência?", v:"<b>Fraude processual</b> (158-C, §2º, c/c CP, art. 347).", lei:["cpp158c"] },
{ id:"pe8", tipo:"numero", sec:"peritos", f:"Quantos peritos: oficial × não oficial?", v:"<b>Um</b> perito oficial; na falta, <b>dois</b> não oficiais com curso superior, que prestam compromisso.", lei:["cpp159"], j:["stf-s361"] },
{ id:"pe9", tipo:"ce", sec:"peritos", f:"Certo ou errado: o assistente técnico pode acompanhar a necropsia ao lado do legista.", v:"<b>Errado.</b> Atua após a <b>admissão pelo juiz</b> e <b>depois</b> da conclusão do laudo oficial (art. 159, §4º).", lei:["cpp159"] },
{ id:"pe10", tipo:"numero", sec:"peritos", f:"Oitiva do perito em juízo: antecedência mínima do pedido?", v:"<b>10 dias</b>, com os quesitos ou questões a esclarecer (art. 159, §5º, I).", lei:["cpp159"] },
{ id:"pe11", tipo:"numero", sec:"peritos", f:"Prazo do laudo e prorrogação.", v:"<b>10 dias</b>; prorrogável <b>excepcionalmente</b>, a <b>requerimento dos peritos</b> (art. 160, parágrafo único).", lei:["cpp160"] },
{ id:"pe12", tipo:"caso", sec:"peritos", f:"Dois peritos não oficiais divergem. O que a autoridade faz?", v:"Consigna as duas versões (ou laudos separados) e nomeia um <b>terceiro</b>; se ele divergir de ambos, pode determinar novo exame (art. 180).", lei:["cpp180"] },
{ id:"pe13", tipo:"caso", sec:"peritos", f:"Defesa pede exame de corpo de delito no inquérito; o delegado acha desnecessário. Pode negar?", v:"<b>Não.</b> O art. 184 permite negar perícias desnecessárias, <b>salvo o exame de corpo de delito</b>.", lei:["cpp180"] },
{ id:"pe14", tipo:"caso", sec:"exames", f:"Vítima com decapitação evidente. O legista quer fazer a necropsia 2 horas após a morte. Pode?", v:"<b>Sim.</b> As 6 horas cedem quando os sinais de morte são evidentes; o perito declara isso no auto (art. 162).", lei:["cpp162"] },
{ id:"pe15", tipo:"caso", sec:"exames", f:"Morte por atropelamento em que o motorista não teve culpa (sem infração a apurar). Precisa de exame interno?", v:"<b>Não necessariamente</b>: basta o <b>exame externo</b> (art. 162, parágrafo único).", lei:["cpp162"] },
{ id:"pe16", tipo:"numero", sec:"exames", f:"Exame complementar para lesão grave por incapacidade das ocupações habituais: quando?", v:"<b>Logo que decorram 30 dias</b> da data do crime (art. 168, §2º); sua falta pode ser suprida por testemunhas (§3º).", lei:["cpp168"] },
{ id:"pe17", tipo:"caso", sec:"exames", f:"Furto com arrombamento de porta: o que o laudo deve indicar além dos vestígios?", v:"<b>Instrumentos, meios e época</b> provável (art. 171).", lei:["cpp170"], j:["stj-rompimento"] },
{ id:"pe18", tipo:"caso", sec:"exames", f:"Não há escritos do investigado para comparação. Como obter padrões?", v:"A autoridade manda que ele <b>escreva o que lhe for ditado</b> (por precatória, se ausente em lugar certo) — art. 174, IV. Ele pode se recusar (não autoincriminação).", lei:["cpp174"] },
{ id:"pe19", tipo:"distincao", sec:"exames", f:"Elementos de segurança de 1º, 2º e 3º nível.", v:"<b>1º</b>: leigo, sem equipamento (marca-d'água, fio, registro coincidente). <b>2º</b>: equipamento simples (fibras luminescentes, microtexto). <b>3º</b>: perito e microscópio (nanotexto, tinta no infravermelho).", lei:["cpp174"] },
{ id:"pe20", tipo:"caso", sec:"exames", f:"Lei 15.295/2025: o perfil genético colhido do preso pode ser usado para estimar cor dos olhos e ancestralidade?", v:"<b>Não.</b> Uso exclusivo para identificação; <b>vedada a fenotipagem genética</b>.", lei:["l15295"] }
],
importancia:{ nivel:5,
  texto:"Núcleo de Medicina Legal e de Processo Penal em provas policiais: a banca cobra a letra do CPP (arts. 158 a 184), a cadeia de custódia e a distinção entre exame indireto e prova testemunhal.",
  decore:[
    ["Exame de corpo de delito","indispensável se há vestígio; <b>confissão não supre</b> (art. 158)"],
    ["Perito oficial × não oficial","<b>1</b> oficial; na falta, <b>2</b> idôneos com curso superior (art. 159)"],
    ["Laudo","prazo de <b>10 dias</b>, prorrogável a pedido dos peritos (art. 160)"],
    ["Oitiva do perito em juízo","pedido com <b>10 dias</b> de antecedência (art. 159, § 5º)"],
    ["Autópsia","pelo menos <b>6 horas</b> após o óbito (art. 162)"],
    ["Exame complementar (art. 129, § 1º, I, CP)","logo que decorram <b>30 dias</b> do crime (art. 168, § 2º)"],
    ["Cadeia de custódia","<b>10 etapas</b>, do reconhecimento ao descarte (arts. 158-A e 158-B)"],
    ["Assistente técnico","atua após a admissão pelo juiz e <b>depois do laudo oficial</b>"],
    ["Perícia que não pode ser negada","<b>exame de corpo de delito</b> (art. 184)"],
    ["Perfil genético (Lei 15.295/2025)","reclusão em <b>regime inicial fechado</b>; vedada a fenotipagem"]],
  macetes:[
    ["R-I-F-C-A-T-R-P-A-D","Reconhecimento, Isolamento, Fixação, Coleta, Acondicionamento, Transporte, Recebimento, Processamento, Armazenamento, Descarte."],
    ["Fixar é descrever, coletar é recolher","Fixação = descrição, foto, croqui. Coleta = recolher o vestígio. A banca inverte."],
    ["Indireto tem laudo, suprimento tem testemunha","Se o perito escreveu laudo com dados verossímeis, é indireto. Se só depuseram testemunhas, é suprimento (art. 167)."],
    ["6 horas é piso","A autópsia só antes das 6 horas se os sinais de morte forem evidentes e o perito declarar no auto."]] },
comparativo:{ titulo:"Exame indireto × suprimento testemunhal", head:["Exame de corpo de delito indireto","Suprimento pela prova testemunhal (art. 167)"], rows:[
  ["<b>Há laudo?</b> Sim, feito por perito","<b>Há laudo?</b> Não: é prova testemunhal, não perícia"],
  ["<b>Base:</b> dados verossímeis (prontuário, atestado, fotos)","<b>Base:</b> depoimento de quem viu o vestígio"],
  ["<b>Quando:</b> não é possível o exame direto, mas há registros do vestígio","<b>Quando:</b> desapareceram os vestígios"],
  ["<b>Exemplo:</b> perito afirma que o atestado do médico particular é compatível com a lesão narrada","<b>Exemplo:</b> corpo nunca encontrado: materialidade do homicídio por testemunhas e outros elementos"],
  ["<b>Falta do exame:</b> nulidade (art. 564, III, b)","<b>Falta do exame:</b> o art. 564, III, b ressalva o art. 167, logo não há nulidade"]]},
prova:[
  { tipo:"ce", enun:"Havendo vestígios da infração, a confissão do acusado pode suprir o exame de corpo de delito quando for corroborada em juízo.", gab:"Errado", com:"O art. 158 do CPP veda que a confissão supra o exame, sem exceção para confissão corroborada." },
  { tipo:"ce", enun:"Na falta de perito oficial, o exame será realizado por duas pessoas idôneas, portadoras de diploma de curso superior, preferencialmente na área específica, que prestarão compromisso.", gab:"Certo", com:"É a redação do art. 159, §§ 1º e 2º, do CPP." },
  { tipo:"ce", enun:"O assistente técnico acompanha a realização do exame pelo perito oficial e pode intervir durante a necropsia.", gab:"Errado", com:"O assistente técnico atua a partir da admissão pelo juiz e após a conclusão dos exames e a elaboração do laudo oficial (art. 159, § 4º)." },
  { tipo:"ce", enun:"A quebra da cadeia de custódia gera, automaticamente, nulidade da prova, segundo a jurisprudência do STJ.", gab:"Errado", com:"Segundo a jurisprudência indicada no tema (HC 653.515/RJ), a inobservância dos arts. 158-A a 158-F não gera nulidade automática: o juiz afere a confiabilidade da prova pelos demais elementos." },
  { tipo:"caso", enun:"Um parente da vítima entra em local de crime isolado e recolhe o celular dela antes da liberação pelo perito responsável. Qual a consequência?", com:"Fraude processual (CPP, art. 158-C, § 2º): é proibida a entrada em local isolado e a remoção de vestígios antes da liberação pelo perito." },
  { tipo:"caso", enun:"O delegado entende desnecessário o exame de corpo de delito requerido pela defesa no inquérito. Pode negá-lo?", com:"Não. O art. 184 permite negar perícias desnecessárias, salvo o exame de corpo de delito." }],
resumo:[
  "Infração que deixa vestígios exige <b>exame de corpo de delito, direto ou indireto</b>; a confissão não o supre (art. 158).",
  "Desaparecidos os vestígios, a <b>prova testemunhal</b> pode suprir a falta (art. 167); a falta do exame onde havia vestígio é <b>nulidade</b> (art. 564, III, b).",
  "A cadeia de custódia vai do <b>reconhecimento ao descarte</b>, em <b>10 etapas</b>, e começa com a preservação do local.",
  "Quem reconhece o vestígio fica responsável por sua preservação; entrar em local isolado ou remover vestígio antes da liberação pelo perito é <b>fraude processual</b>.",
  "Perito oficial é <b>um</b>; peritos não oficiais são <b>dois</b>, com compromisso. O assistente técnico atua <b>depois do laudo oficial</b>.",
  "Laudo em <b>10 dias</b>; o juiz <b>não fica adstrito ao laudo</b> (art. 182); divergência entre peritos leva a um terceiro (art. 180).",
  "Autópsia pelo menos <b>6 horas</b> após o óbito, salvo sinais evidentes de morte; cadáveres são sempre fotografados na posição em que foram encontrados.",
  "Exame complementar de lesão para o art. 129, § 1º, I, do CP: logo que decorram <b>30 dias</b>; sua falta pode ser suprida por testemunhas.",
  "Perfil genético: reclusão em regime inicial fechado, coleta obrigatória, amostra só para identificação (vedada a fenotipagem)."],
checklist:[
  "Diferenciar exame direto, indireto e suprimento testemunhal.",
  "Citar as 10 etapas da cadeia de custódia na ordem e definir fixação e coleta.",
  "Dizer quantos peritos são necessários (oficial e não oficial) e quando atuam o assistente técnico e os quesitos.",
  "Lembrar os prazos: laudo (10 dias), oitiva do perito (10 dias de antecedência), autópsia (6 horas) e exame complementar (30 dias).",
  "Explicar por que o delegado não pode negar o exame de corpo de delito (art. 184).",
  "Reconhecer a fraude processual do art. 158-C, § 2º.",
  "Explicar o que fazer na divergência entre peritos (art. 180).",
  "Apontar os elementos de segurança de 1º, 2º e 3º nível de um documento.",
  "Descrever o perfil genético da Lei 15.295/2025 e a vedação à fenotipagem."],
questoes:[]
};

/* ======================= DOCUMENTOS MÉDICO-LEGAIS ======================= */
T.ml_documentos = {
meta:{ tema:"Documentos médico-legais", atualizado:AT,
  foco:"Notificações compulsórias, atestados (espécies e falsidade), relatório médico-legal (auto × laudo e suas 7 partes), parecer (4 partes), depoimento oral, prontuário e declaração de óbito; sigilo médico." },
secoes:[
{ id:"especies", titulo:"Espécies de documentos", curto:"Espécies",
  rapido:["Documentos médico-legais: <b>notificações, atestados, relatórios (auto e laudo), pareceres, depoimentos orais</b> e prontuários.",
    "<b>Atestado</b>: declaração simples e objetiva de um fato médico e suas consequências. Pode ser <b>oficioso</b> (particular), <b>administrativo</b> (repartição pública) ou <b>judicial</b> (requisitado pelo juiz).",
    "<b>Notificação compulsória</b>: comunicação obrigatória à autoridade por razões sanitárias ou sociais (doenças de notificação, acidente de trabalho via CAT, violência contra a mulher).",
    "<b>Parecer</b>: opinião fundamentada de especialista sobre fato já periciado (perícia <b>deducendi</b>) — não tem descrição."],
  teoria:[
    { h:"Atestados: qualidade e falsidade", p:[
      "Quanto ao conteúdo, a doutrina fala em atestado <b>idôneo</b>, <b>gracioso</b> (de complacência, sem exame ou para agradar), <b>imprudente</b> (sem cautela, a pedido de terceiro) e <b>falso</b>.",
      "Médico que dá atestado falso no exercício da profissão comete o crime do <b>art. 302 do CP</b> (detenção de 1 mês a 1 ano; com fim de lucro, aplica-se também multa). O Código de Ética veda atestar sem ter praticado o ato que o justifique.",
      "Quem <b>usa</b> o atestado falso responde pelo art. 304; o particular que falsifica atestado médico responde por falsidade documental."]},
    { h:"Notificação compulsória", p:[
      "Médico que deixa de denunciar à autoridade pública doença cuja notificação é compulsória comete o crime do <b>art. 269 do CP</b> (detenção de 6 meses a 2 anos e multa).",
      "Violência contra a mulher atendida em serviço de saúde é de notificação compulsória (Lei 10.778/2003); casos com indícios ou confirmação devem ser comunicados à autoridade policial em até <b>24 horas</b> (redação da Lei 13.931/2019 — confira).",
      "A notificação é exceção legal ao sigilo: o dever de comunicar é <b>justa causa</b> para revelar."]},
    { h:"Depoimento oral e prontuário", p:[
      "<b>Depoimento oral</b>: esclarecimentos do perito perante a autoridade, reduzidos a termo (CPP, art. 159, §5º, I: pedido com 10 dias de antecedência).",
      "<b>Prontuário</b>: todo o acervo documental do atendimento (anamnese, evolução, exames). Pertence ao <b>paciente</b>, sob guarda da instituição; a Lei 13.787/2018 autoriza a digitalização e fixa guarda mínima de <b>20 anos</b> a partir do último registro."]}],
  pegadinhas:["Atestado oficioso é o do médico em atividade <b>privada</b>; judicial é o requisitado pelo juiz.","Parecer <b>não</b> tem descrição: são 4 partes.","A notificação compulsória não viola o sigilo: há dever legal."]},
{ id:"relatorio", titulo:"Relatório médico-legal: auto, laudo e suas partes", curto:"Relatório",
  rapido:["Relatório = a descrição <b>mais minuciosa</b> de uma perícia, para responder à requisição da autoridade (perícia <b>percipiendi</b>).",
    "<b>Auto</b>: <b>ditado ao escrivão</b> na presença da autoridade (típico de peritos nomeados <i>ad hoc</i>). <b>Laudo</b>: <b>redigido pelos próprios peritos</b> — o mais comum.",
    "7 partes: <b>preâmbulo, quesitos, histórico (comemorativo), descrição, discussão, conclusão e respostas aos quesitos</b>.",
    "<b>Descrição</b> = parte <b>mais importante</b> (\"visum et repertum\"): tudo o que foi visto, de forma objetiva, sem hipóteses."],
  teoria:[
    { h:"As partes, uma a uma", p:[
      "<b>Preâmbulo</b>: identifica peritos, autoridade requisitante, examinado, local, data, hora e finalidade.",
      "<b>Quesitos</b>: na área criminal, oficiais e padronizados (ex.: os quesitos de lesão corporal acompanham o art. 129).",
      "<b>Histórico ou comemorativo</b>: equivale à anamnese — informações do examinado ou de terceiros, sob responsabilidade de quem as presta.",
      "<b>Descrição</b>: registro fiel, metódico e completo de forma, número, sede, dimensões e relação das lesões com pontos fixos, ilustrado quando possível; permite que outro perito reavalie depois.",
      "<b>Discussão</b>: confronto de hipóteses diagnósticas e justificativas. <b>Conclusão</b>: síntese diagnóstica. <b>Respostas aos quesitos</b>: todas devem ser respondidas, ainda que \"prejudicado\" ou \"sem elementos\"."]},
    { h:"Parecer", p:[
      "4 partes: <b>preâmbulo</b> (qualificação do parecerista), <b>exposição</b> (quesitos e objeto da consulta), <b>discussão</b> (a parte mais importante) e <b>conclusões</b>.",
      "Costuma ser encomendado pelas partes; deve ser lido com cautela e raramente prevalece sobre o exame oficial."]}],
  quadro:{ titulo:"Relatório × parecer", head:["Documento","Partes","Parte mais importante","Tipo de perícia"], rows:[
    ["Relatório (auto ou laudo)","7: preâmbulo, quesitos, histórico, descrição, discussão, conclusão, respostas","Descrição","Percipiendi"],
    ["Parecer","4: preâmbulo, exposição, discussão, conclusões","Discussão","Deducendi"]]},
  pegadinhas:["Auto é <b>ditado</b>; laudo é <b>redigido</b> pelo perito.","No relatório, a mais importante é a <b>descrição</b>; no parecer, a <b>discussão</b>.","Histórico = comemorativo = anamnese."]},
{ id:"obito", titulo:"Declaração de óbito e sigilo", curto:"Óbito e sigilo",
  rapido:["Sem atestado (declaração) de óbito não há registro nem sepultamento (Lei 6.015/1973, art. 77).",
    "Morte <b>violenta ou suspeita</b>: declaração pelo <b>legista do IML</b>. Morte natural <b>sem assistência médica</b> ou sem causa definida: <b>Serviço de Verificação de Óbito</b> (onde houver).",
    "<b>Cremação</b>: exige vontade manifestada em vida ou interesse de saúde pública, atestado por dois médicos ou por um legista; em <b>morte violenta</b>, depende de <b>autorização judicial</b> (art. 77, §2º).",
    "Revelar segredo profissional sem justa causa, podendo causar dano: <b>CP, art. 154</b> (ação pública condicionada à representação)."],
  teoria:[
    { h:"Sigilo médico e suas exceções", p:[
      "Justa causa: dever legal (notificação compulsória, comunicação de violência), consentimento do paciente, defesa de interesse legítimo e proteção de terceiro em perigo.",
      "O perito <b>não</b> está preso ao sigilo perante a autoridade que o nomeou quanto ao objeto da perícia — o laudo é feito para ela; mas deve guardar o que extrapola o objeto do exame.",
      "O médico assistente não pode ser obrigado a depor sobre fato sigiloso: a testemunha que deve guardar segredo em razão de profissão é proibida de depor, salvo se desobrigada pela parte interessada e quiser dar o testemunho (CPP, art. 207)."]}],
  pegadinhas:["Cremação de vítima de homicídio exige autorização <b>judicial</b>.","Morte natural sem assistência vai ao <b>SVO</b>, não ao IML."]}
],
lei:[
{ art:"Código Penal", nome:"Crimes ligados aos documentos médicos", sec:"especies", itens:[
  { id:"cp302", rot:"Art. 302", t:"<b class='g1'>Dar o médico</b>, no exercício da sua profissão, <b class='g1'>atestado falso</b>:<br>Pena - detenção, de <b class='g2'>um mês a um ano</b>.<br>Parágrafo único - Se o crime é cometido com o fim de lucro, aplica-se também multa.", c:["dc1","dc2"] },
  { id:"cp269", rot:"Art. 269", t:"<b class='g1'>Deixar o médico de denunciar à autoridade pública doença cuja notificação é compulsória</b>:<br>Pena - detenção, de <b class='g2'>seis meses a dois anos, e multa</b>.", c:["dc3"] }]},
{ art:"CP, art. 154; CPP, art. 207", nome:"Sigilo profissional", sec:"obito", itens:[
  { id:"cp154", rot:"CP, art. 154; CPP, art. 207", t:"CP, art. 154. <b class='g1'>Revelar alguém, sem justa causa, segredo</b>, de que tem ciência em razão de função, ministério, ofício ou profissão, e cuja revelação possa produzir dano a outrem:<br>Pena - detenção, de <b class='g2'>três meses a um ano, ou multa</b>.<br>Parágrafo único - Somente se procede mediante <b class='g3'>representação</b>.<br>CPP, art. 207. São <b class='g1'>proibidas de depor</b> as pessoas que, em razão de função, ministério, ofício ou profissão, devam guardar segredo, <b class='g3'>salvo se, desobrigadas pela parte interessada, quiserem dar o seu testemunho</b>.", c:["dc10","dc11"] }]},
{ art:"Lei 6.015/1973, art. 77", nome:"Óbito, sepultamento e cremação", sec:"obito", itens:[
  { id:"lrp77", rot:"Art. 77, caput e §2º", t:"Nenhum sepultamento será feito sem certidão do oficial de registro do lugar do falecimento ou do lugar de residência do de cujus, quando o falecimento ocorrer em local diverso do seu domicílio, extraída após a lavratura do assento de óbito, em vista do <b class='g1'>atestado de médico, se houver no lugar</b>, ou em caso contrário, de duas pessoas qualificadas que tiverem presenciado ou verificado a morte. (...)<br>§ 2º A <b class='g1'>cremação</b> de cadáver somente será feita daquele que houver manifestado a vontade de ser incinerado ou no interesse da saúde pública e se o atestado de óbito houver sido firmado por <b class='g2'>2 (dois) médicos ou por 1 (um) médico legista</b> e, no caso de <b class='g3'>morte violenta, depois de autorizada pela autoridade judiciária</b>.", c:["dc8","dc9"] }]},
{ art:"CPP, art. 160", nome:"Laudo", sec:"relatorio", itens:[
  { id:"cpp160d", rot:"Art. 160", t:"Os peritos elaborarão o laudo pericial, onde <b class='g1'>descreverão minuciosamente o que examinarem</b>, e <b class='g1'>responderão aos quesitos formulados</b>.", c:["dc5"] }]}
],
juris:[],
cards:[
{ id:"dc1", tipo:"caso", sec:"especies", f:"Médico emite atestado de 15 dias de repouso a amigo que não examinou, sem cobrar. Crime?", v:"<b>Art. 302 do CP</b> (detenção de 1 mês a 1 ano). Com fim de lucro, soma-se multa.", lei:["cp302"] },
{ id:"dc2", tipo:"distincao", sec:"especies", f:"Atestado gracioso × imprudente × falso.", v:"<b>Gracioso</b>: de complacência, sem base. <b>Imprudente</b>: dado sem cautela, a pedido de terceiro. <b>Falso</b>: afirma o que não corresponde à verdade (art. 302).", lei:["cp302"] },
{ id:"dc3", tipo:"caso", sec:"especies", f:"Médico atende caso de doença de notificação compulsória e não comunica. Crime?", v:"<b>Art. 269 do CP</b> — omissão de notificação de doença (detenção de 6 meses a 2 anos e multa).", lei:["cp269"] },
{ id:"dc4", tipo:"distincao", sec:"especies", f:"Atestado oficioso × administrativo × judicial.", v:"<b>Oficioso</b>: médico em atividade privada, uso particular. <b>Administrativo</b>: perante repartição pública. <b>Judicial</b>: requisitado pelo juiz, integra o processo.", lei:[] },
{ id:"dc5", tipo:"lacuna", sec:"relatorio", f:"As 7 partes do relatório médico-legal: preâmbulo, ______, histórico, ______, discussão, conclusão e ______.", v:"<b>quesitos</b>; <b>descrição</b>; <b>respostas aos quesitos</b>.", lei:["cpp160d"] },
{ id:"dc6", tipo:"distincao", sec:"relatorio", f:"Auto × laudo.", v:"<b>Auto</b>: ditado ao escrivão diante da autoridade. <b>Laudo</b>: redigido pelos próprios peritos, depois do exame.", lei:[] },
{ id:"dc7", tipo:"distincao", sec:"relatorio", f:"Parte mais importante do relatório × do parecer.", v:"Relatório: <b>descrição</b> (visum et repertum). Parecer: <b>discussão</b>.", lei:[] },
{ id:"dc8", tipo:"caso", sec:"obito", f:"Família de vítima de homicídio quer cremar o corpo. Requisitos?", v:"Vontade manifestada em vida (ou saúde pública), atestado por <b>2 médicos ou 1 legista</b> e <b>autorização judicial</b> por ser morte violenta (Lei 6.015, art. 77, §2º).", lei:["lrp77"] },
{ id:"dc9", tipo:"distincao", sec:"obito", f:"Quem declara o óbito: morte violenta × morte natural sem assistência médica.", v:"<b>Violenta ou suspeita</b>: legista do IML. <b>Natural sem assistência</b>: Serviço de Verificação de Óbito (onde houver) ou médico disponível.", lei:["lrp77"] },
{ id:"dc10", tipo:"caso", sec:"obito", f:"Psiquiatra do réu é arrolado como testemunha sobre o que ouviu na terapia. Deve depor?", v:"<b>É proibido de depor</b>, salvo se desobrigado pelo paciente <b>e</b> se quiser depor (CPP, art. 207).", lei:["cp154"] },
{ id:"dc11", tipo:"ce", sec:"obito", f:"Certo ou errado: a violação de segredo profissional (CP, 154) é de ação penal pública incondicionada.", v:"<b>Errado.</b> Somente se procede mediante <b>representação</b>.", lei:["cp154"] }
],
importancia:{ nivel:4,
  texto:"Cobrança frequente e literal: as partes do relatório e do parecer, a diferença entre auto e laudo, os crimes dos arts. 302 e 269 do CP e as regras de sigilo e de cremação.",
  decore:[
    ["Relatório médico-legal","<b>7 partes</b>; a mais importante é a <b>descrição</b>"],
    ["Parecer","<b>4 partes</b>; a mais importante é a <b>discussão</b>"],
    ["Auto × laudo","auto é <b>ditado</b> ao escrivão; laudo é <b>redigido</b> pelo perito"],
    ["Atestado médico falso (CP, art. 302)","detenção de <b>1 mês a 1 ano</b>; com fim de lucro, também multa"],
    ["Omissão de notificação compulsória (CP, art. 269)","detenção de <b>6 meses a 2 anos</b> e multa"],
    ["Violação de segredo (CP, art. 154)","detenção de <b>3 meses a 1 ano</b> ou multa; ação por <b>representação</b>"],
    ["Cremação (Lei 6.015, art. 77, § 2º)","atestado de <b>2 médicos ou 1 legista</b>; morte violenta exige <b>autorização judicial</b>"],
    ["Morte violenta ou suspeita","declaração de óbito pelo <b>legista do IML</b>"],
    ["Morte natural sem assistência","<b>Serviço de Verificação de Óbito</b>, onde houver"],
    ["Guarda do prontuário (Lei 13.787/2018)","mínimo de <b>20 anos</b> a partir do último registro"]],
  macetes:[
    ["Auto é Ditado, Laudo é Livre","No auto o perito dita ao escrivão diante da autoridade; no laudo ele mesmo redige."],
    ["Relatório descreve, parecer discute","Parte mais importante: descrição (relatório) e discussão (parecer)."],
    ["Histórico = comemorativo = anamnese","Três nomes para a mesma parte do relatório."]] },
comparativo:{ titulo:"Relatório (auto e laudo) × parecer", head:["Relatório médico-legal","Parecer"], rows:[
  ["<b>Função:</b> responde à requisição da autoridade, descrevendo o que o perito viu","<b>Função:</b> opinião fundamentada de especialista sobre fato já periciado"],
  ["<b>Tipo de perícia:</b> percipiendi","<b>Tipo de perícia:</b> deducendi"],
  ["<b>Partes:</b> 7 (preâmbulo, quesitos, histórico, descrição, discussão, conclusão, respostas aos quesitos)","<b>Partes:</b> 4 (preâmbulo, exposição, discussão, conclusões)"],
  ["<b>Parte mais importante:</b> descrição (visum et repertum)","<b>Parte mais importante:</b> discussão"],
  ["<b>Formas:</b> auto (ditado ao escrivão) ou laudo (redigido pelos peritos)","<b>Quem costuma pedir:</b> as partes; raramente prevalece sobre o exame oficial"]]},
prova:[
  { tipo:"ce", enun:"O relatório médico-legal compõe-se de sete partes, sendo a descrição a mais importante, e o parecer, de quatro partes, sendo a discussão a mais importante.", gab:"Certo", com:"Relatório: preâmbulo, quesitos, histórico, descrição, discussão, conclusão e respostas aos quesitos. Parecer: preâmbulo, exposição, discussão e conclusões." },
  { tipo:"ce", enun:"No auto, o perito redige pessoalmente o documento depois do exame; no laudo, o texto é ditado ao escrivão na presença da autoridade.", gab:"Errado", com:"Está invertido: o auto é ditado ao escrivão na presença da autoridade; o laudo é redigido pelos próprios peritos." },
  { tipo:"ce", enun:"A notificação compulsória de doença pelo médico constitui violação do sigilo profissional, punível nos termos do art. 154 do Código Penal.", gab:"Errado", com:"A notificação compulsória é dever legal e, portanto, justa causa para revelar. Quem omite a notificação é que responde pelo art. 269 do CP." },
  { tipo:"ce", enun:"A cremação de cadáver de vítima de morte violenta depende de autorização da autoridade judiciária, além do atestado de óbito firmado por dois médicos ou por um médico legista.", gab:"Certo", com:"Lei 6.015/1973, art. 77, § 2º." },
  { tipo:"caso", enun:"Um médico entrega a um amigo atestado de 15 dias de repouso sem tê-lo examinado e sem cobrar. Há crime?", com:"Sim, o do art. 302 do CP (atestado falso por médico no exercício da profissão), com detenção de 1 mês a 1 ano. Se houvesse fim de lucro, aplicar-se-ia também multa." },
  { tipo:"caso", enun:"O psiquiatra do réu é arrolado como testemunha para relatar o que ouviu em consultas. Deve depor?", com:"É proibido de depor, salvo se desobrigado pela parte interessada e quiser dar o testemunho (CPP, art. 207)." }],
resumo:[
  "Documentos médico-legais: notificações, atestados, relatórios (auto e laudo), pareceres, depoimentos orais e prontuários.",
  "Atestado pode ser <b>oficioso</b> (particular), <b>administrativo</b> ou <b>judicial</b>; quanto ao conteúdo, idôneo, gracioso, imprudente ou falso.",
  "Atestado falso por médico: <b>CP, art. 302</b>. Omitir notificação compulsória: <b>CP, art. 269</b>.",
  "Relatório tem <b>7 partes</b> e a descrição é a mais importante; parecer tem <b>4 partes</b> e a discussão é a mais importante.",
  "<b>Auto</b> é ditado ao escrivão; <b>laudo</b> é redigido pelo perito; relatório é perícia percipiendi e parecer é deducendi.",
  "Sem declaração de óbito não há registro nem sepultamento; morte violenta ou suspeita vai ao IML e morte natural sem assistência, ao SVO.",
  "Cremação: vontade em vida ou saúde pública, atestado de 2 médicos ou 1 legista e, em morte violenta, autorização judicial.",
  "Segredo profissional: CP, art. 154 (ação por representação) e CPP, art. 207; o dever legal de notificar é justa causa."],
checklist:[
  "Listar as 7 partes do relatório e as 4 do parecer, com a parte mais importante de cada um.",
  "Diferenciar auto de laudo e perícia percipiendi de deducendi.",
  "Classificar atestados (oficioso, administrativo, judicial; idôneo, gracioso, imprudente, falso).",
  "Aplicar os arts. 302 e 269 do CP com as respectivas penas.",
  "Explicar por que a notificação compulsória não viola o sigilo.",
  "Dizer quem declara o óbito em morte violenta e em morte natural sem assistência.",
  "Citar os requisitos da cremação e a regra para morte violenta.",
  "Explicar o art. 154 do CP e o art. 207 do CPP."],
questoes:[]
};

/* ======================= IDENTIDADE E IDENTIFICAÇÃO ======================= */
T.ml_identificacao = {
meta:{ tema:"Identidade e identificação humana", atualizado:AT,
  foco:"Identidade × identificação × reconhecimento; requisitos técnicos dos métodos; história (Bertillon, Galton, Vucetich); papiloscopia e sistema de Vucetich; identificação médico-legal (espécie, sexo, idade, estatura, odontologia, DNA); identificação criminal (CF, art. 5º, LVIII; Lei 12.037/2009, com a Lei 15.295/2025)." },
secoes:[
{ id:"conceitos", titulo:"Conceitos, requisitos e história", curto:"Conceitos",
  rapido:["<b>Identidade</b>: conjunto de caracteres que torna a pessoa <b>igual apenas a si mesma</b>. <b>Identificação</b>: o processo técnico que estabelece essa identidade. <b>Reconhecimento</b>: ato de certificar, por memória, que alguém é quem se supõe (pode falhar).",
    "Identificação <b>médico-legal</b> (exige conhecimento médico: idade, sexo, estatura, lesões) × <b>policial ou judiciária</b> (não exige: papiloscopia, fotografia, assinalamento).",
    "Requisitos técnicos de um bom método: <b>unicidade</b> (unidade), <b>imutabilidade</b>, <b>perenidade</b>, <b>praticabilidade</b> e <b>classificabilidade</b>.",
    "Sistema adotado no Brasil: <b>datiloscópico de Vucetich</b> (desde 1903)."],
  teoria:[
    { h:"Evolução dos métodos", p:[
      "Métodos antigos e abandonados: ferrete, mutilação, tatuagem, fotografia simples.",
      "<b>Bertillonagem</b> (Alphonse Bertillon, 1879-1882): antropometria (medidas ósseas), retrato falado e assinalamento de sinais particulares. Caiu com o caso <b>Will West × William West</b> (EUA, 1903): homens quase idênticos nas medidas, distinguidos pelas digitais.",
      "Marcello Malpighi descreve as papilas (1686); Purkinje classifica desenhos (1823); Henry Faulds e William Herschel usam digitais na Ásia; <b>Francis Galton</b> estuda cientificamente as impressões (pontos de Galton).",
      "<b>Juan Vucetich</b> (Argentina, 1891) cria o sistema datiloscópico; caso <b>Francisca Rojas</b> (1892), primeira identificação criminal por digital.",
      "Locard: <b>poroscopia</b> (poros) e o princípio da troca (\"todo contato deixa uma marca\")."]}],
  pegadinhas:["Reconhecimento ≠ identificação: o reconhecimento é subjetivo (memória).","Perenidade = existe do nascimento à decomposição; imutabilidade = não muda ao longo da vida.","Bertillon = antropometria; Vucetich = datiloscopia."]},
{ id:"papiloscopia", titulo:"Papiloscopia e o sistema de Vucetich", curto:"Papiloscopia",
  rapido:["Papiloscopia: <b>datiloscopia</b> (dedos), <b>quiroscopia</b> (palmas), <b>podoscopia</b> (pés) e <b>poroscopia</b> (poros).",
    "As papilas surgem por volta do <b>6º mês de vida intrauterina</b> e só desaparecem com a putrefação; lesões superficiais regeneram o desenho; só as que atingem a derme deixam cicatriz.",
    "4 tipos fundamentais: <b>Arco</b> (sem delta), <b>Presilha interna</b> (delta à <b>direita</b> do observador), <b>Presilha externa</b> (delta à <b>esquerda</b> do observador), <b>Verticilo</b> (dois deltas).",
    "Polegares em letras (<b>A, I, E, V</b>); demais dedos em números (<b>1, 2, 3, 4</b>). Mão direita = <b>série</b> (numerador); mão esquerda = <b>seção</b> (denominador). Dedo amputado = 0; cicatriz que impede leitura = X."],
  teoria:[
    { h:"Elementos do datilograma", p:[
      "Sistemas de linhas: <b>basal</b>, <b>marginal</b> e <b>nuclear</b>. O <b>delta</b> é o ângulo ou triângulo formado pelo encontro dos três sistemas.",
      "Pontos característicos (minúcias): ilhota, cortada, bifurcação, forquilha, encerro, anastomose etc. No Brasil, a prática pericial e a doutrina exigem em regra <b>12 pontos coincidentes</b> e nenhuma divergência para afirmar identidade (não há número fixado em lei).",
      "Impressão <b>latente</b> (invisível, revelada por pós ou reagentes), <b>visível</b> (com sangue, tinta) e <b>moldada</b> (em superfície plástica: massa, cera)."]}],
  quadro:{ titulo:"Tipos fundamentais de Vucetich", head:["Tipo","Delta","Polegar","Outros dedos"], rows:[
    ["Arco","Nenhum","A","1"],
    ["Presilha interna","Um, à direita do observador","I","2"],
    ["Presilha externa","Um, à esquerda do observador","E","3"],
    ["Verticilo","Dois","V","4"]]},
  pegadinhas:["Na presilha <b>interna</b> o delta fica à <b>direita</b> do observador (o núcleo se volta para a esquerda).","Arco não tem delta; verticilo tem dois.","Mão direita é a <b>série</b> (em cima); esquerda, a <b>seção</b>."]},
{ id:"medicolegal", titulo:"Identificação médico-legal: espécie, sexo, idade, estatura, dentes e DNA", curto:"Médico-legal",
  rapido:["Primeiro: o material é <b>humano</b>? (reações de precipitina, histologia óssea). Depois: sexo, idade, estatura, ancestralidade e sinais individuais.",
    "<b>Sexo</b> no esqueleto: a <b>pelve</b> é a peça mais confiável (na mulher, mais larga, ângulo subpúbico obtuso, incisura isquiática larga); depois o <b>crânio</b>.",
    "<b>Idade</b>: erupção dentária e pontos de ossificação (mais precisos na infância e adolescência); no adulto, fechamento de suturas, sínfise púbica e alterações degenerativas.",
    "<b>Odontologia legal</b> (arcada dentária) e <b>DNA</b> são decisivos em cadáveres carbonizados, putrefeitos ou fragmentados."],
  teoria:[
    { h:"Estatura, raça e outros dados", p:[
      "Estatura estimada pelo comprimento dos <b>ossos longos</b> (fêmur é o mais usado) com tabelas de correlação (ex.: Étienne-Rollet, Trotter e Gleser).",
      "Índice cefálico (largura × 100 / comprimento do crânio): <b>dolicocéfalo</b> (até cerca de 75), <b>mesaticéfalo</b> e <b>braquicéfalo</b> (acima de cerca de 80). Ancestralidade estimada por crânio e dentes tem limites científicos e éticos.",
      "Sinais individuais: cicatrizes, tatuagens, malformações, próteses com número de série, calos ósseos de fraturas."]},
    { h:"Genética forense", p:[
      "DNA nuclear (STRs) individualiza com probabilidade altíssima; o <b>DNA mitocondrial</b> é herdado da <b>mãe</b> e serve para restos degradados (ossos, dentes, cabelo sem bulbo); o <b>cromossomo Y</b>, para linhagem paterna.",
      "Gêmeos univitelinos têm o mesmo DNA nuclear, mas <b>digitais diferentes</b>.",
      "Banco Nacional de Perfis Genéticos (Decreto 7.950/2013); coleta em condenados regulada na LEP, art. 9º-A, com a reformulação da Lei 15.295/2025."]}],
  pegadinhas:["Gêmeos idênticos: DNA nuclear igual, digitais diferentes.","DNA mitocondrial = linhagem <b>materna</b>.","A pelve supera o crânio para determinar o sexo."]},
{ id:"criminal", titulo:"Identificação criminal", curto:"Criminal",
  rapido:["CF, art. 5º, LVIII: o <b>civilmente identificado não será submetido a identificação criminal</b>, salvo nas hipóteses previstas em lei.",
    "Lei 12.037/2009, art. 3º: mesmo com documento, cabe identificação criminal se o documento tiver rasura ou indício de falsificação, for insuficiente, houver documentos conflitantes, a identificação for essencial às investigações por despacho judicial, constar uso de outros nomes, o estado do documento impedir a identificação — e, desde a Lei 15.295/2025, com o <b>recebimento da denúncia</b> por crimes graves listados no novo inciso VII.",
    "Identificação criminal = <b>datiloscópica e fotográfica</b>; pode incluir <b>coleta de material biológico</b> para perfil genético nas hipóteses legais (ampliadas pela Lei 15.295/2025).",
    "Para efeitos penais, a <b>menoridade</b> se prova por <b>documento hábil</b> (Súmula 74 do STJ)."],
  teoria:[
    { h:"Garantias", p:[
      "É vedado mencionar a identificação criminal em atestados de antecedentes ou em informações não destinadas ao juízo antes do trânsito em julgado (Lei 12.037, art. 6º).",
      "Absolvição, arquivamento ou rejeição da denúncia permitem pedir a <b>retirada da fotografia</b> do processo (art. 7º).",
      "A coleta de material genético deve respeitar a cadeia de custódia e a vedação de fenotipagem (Lei 15.295/2025)."]}],
  pegadinhas:["Quem tem RG válido e sem rasura, em regra, não é identificado criminalmente.","A identificação para fins de investigação depende de <b>despacho judicial</b> (de ofício ou a pedido)."]}
],
lei:[
{ art:"CF, art. 5º, LVIII; Lei 12.037/2009", nome:"Identificação criminal", sec:"criminal", itens:[
  { id:"cf5lviii", rot:"CF, art. 5º, LVIII", t:"o <b class='g1'>civilmente identificado não será submetido a identificação criminal</b>, <b class='g3'>salvo nas hipóteses previstas em lei</b>;", c:["id9"] },
  { id:"l12037a3", rot:"Lei 12.037/2009, art. 3º", t:"Embora apresentado documento de identificação, poderá ocorrer identificação criminal quando:<br>I - o documento apresentar <b class='g1'>rasura ou tiver indício de falsificação</b>;<br>II - o documento apresentado for <b class='g1'>insuficiente</b> para identificar cabalmente o indiciado;<br>III - o indiciado portar <b class='g1'>documentos de identidade distintos</b>, com informações conflitantes entre si;<br>IV - a identificação criminal for <b class='g1'>essencial às investigações policiais</b>, segundo <b class='g3'>despacho da autoridade judiciária competente</b>, que decidirá de ofício ou mediante representação da autoridade policial, do Ministério Público ou da defesa;<br>V - constar de registros policiais o <b class='g1'>uso de outros nomes</b> ou diferentes qualificações;<br>VI - o <b class='g1'>estado de conservação</b> ou a distância temporal ou da localidade da expedição do documento apresentado impossibilite a completa identificação dos caracteres essenciais;<br>VII - houver <b class='g1'>recebimento da denúncia</b> pelo juiz por: a) crime praticado com <b class='g1'>grave violência contra a pessoa</b>; b) crime contra a <b class='g1'>liberdade sexual</b> ou crime sexual contra vulnerável; c) crimes contra criança ou adolescente previstos nos arts. 240, 241, 241-A, 241-B e 241-C do ECA; d) crime previsto no art. 2º da Lei 12.850/2013, quando a organização criminosa <b class='g3'>utilizar ou tiver à sua disposição armas de fogo</b>.", nota:"Inciso VII incluído pela Lei 15.295/2025 (DOU 22/12/2025).", novo:true, c:["id9","id10"] },
  { id:"l12037a5", rot:"Lei 12.037/2009, art. 5º", t:"A identificação criminal incluirá o processo <b class='g1'>datiloscópico e o fotográfico</b>, que serão juntados aos autos da comunicação da prisão em flagrante, ou do inquérito policial ou outra forma de investigação.<br>§ 1º Nas hipóteses dos <b class='g3'>incisos IV e VII</b> do caput do art. 3º, a identificação criminal <b class='g1'>incluirá a coleta de material biológico</b> para a obtenção do perfil genético.<br>§ 2º Nos casos de <b class='g1'>prisão em flagrante</b> em decorrência do cometimento dos crimes referidos no inciso VII do caput do art. 3º desta Lei, também será realizada a identificação criminal que incluirá a coleta de material biológico para a obtenção do perfil genético.", nota:"§§ 1º e 2º com redação da Lei 15.295/2025 (antes havia só parágrafo único, ligado ao inciso IV).", novo:true, c:["id11","id13"] }]},
{ art:"Súmula 74 do STJ", nome:"Prova da idade", sec:"criminal", itens:[
  { id:"s74", rot:"Súmula 74/STJ", t:"Para efeitos penais, o <b class='g1'>reconhecimento da menoridade do réu requer prova por documento hábil</b>.", c:["id12"], j:["stj-s74"] }]}
],
juris:[
{ id:"stj-s74", trib:"STJ", tipo:"Súmula", num:"Súmula 74", sec:"criminal", status:"vigente", data:"1993",
  titulo:"Menoridade se prova por documento hábil",
  texto:"Para efeitos penais, o reconhecimento da menoridade do réu requer prova por documento hábil.",
  explica:"A estimativa médico-legal da idade (exame de ossificação) é subsidiária: vale quando falta documento. \"Documento hábil\" não é só certidão de nascimento — qualquer documento oficial idôneo serve.", lei:["s74"], fonte:STJS }
],
cards:[
{ id:"id1", tipo:"distincao", sec:"conceitos", f:"Identidade × identificação × reconhecimento.", v:"<b>Identidade</b>: caracteres que tornam a pessoa igual só a si. <b>Identificação</b>: processo técnico. <b>Reconhecimento</b>: certificação subjetiva, pela memória.", lei:[] },
{ id:"id2", tipo:"lacuna", sec:"conceitos", f:"Requisitos técnicos de um método de identificação: unicidade, ______, ______, praticabilidade e ______.", v:"<b>imutabilidade</b>; <b>perenidade</b>; <b>classificabilidade</b>.", lei:[] },
{ id:"id3", tipo:"caso", sec:"conceitos", f:"Dois presos com medidas corporais quase idênticas foram distinguidos pelas digitais. Que caso é e o que derrubou?", v:"Caso <b>Will West × William West</b> (1903): marcou o fim da <b>bertillonagem</b> (antropometria).", lei:[] },
{ id:"id4", tipo:"distincao", sec:"conceitos", f:"Bertillon × Galton × Vucetich × Locard.", v:"<b>Bertillon</b>: antropometria. <b>Galton</b>: estudo científico das digitais. <b>Vucetich</b>: sistema datiloscópico (adotado no Brasil). <b>Locard</b>: poroscopia e princípio da troca.", lei:[] },
{ id:"id5", tipo:"caso", sec:"papiloscopia", f:"Datilograma com um delta à esquerda do observador. Tipo e símbolo no polegar e nos demais dedos?", v:"<b>Presilha externa</b>: <b>E</b> no polegar; <b>3</b> nos demais.", lei:[] },
{ id:"id6", tipo:"numero", sec:"papiloscopia", f:"Símbolos de Vucetich para arco, presilha interna, presilha externa e verticilo.", v:"Polegares <b>A, I, E, V</b>; demais dedos <b>1, 2, 3, 4</b>. Amputação <b>0</b>; cicatriz <b>X</b>.", lei:[] },
{ id:"id7", tipo:"ce", sec:"papiloscopia", f:"Certo ou errado: a legislação brasileira exige 12 pontos característicos coincidentes para a identificação papiloscópica.", v:"<b>Errado</b> quanto à \"lei\": 12 pontos é critério da doutrina e da prática pericial, não número fixado em lei.", lei:[] },
{ id:"id8", tipo:"caso", sec:"medicolegal", f:"Gêmeos univitelinos: DNA e digitais.", v:"<b>DNA nuclear idêntico</b>; <b>digitais diferentes</b> — a papiloscopia distingue o que o DNA não distingue.", lei:[] },
{ id:"id9", tipo:"caso", sec:"criminal", f:"Preso em flagrante apresenta RG íntegro e legível; nada indica falsidade. Pode ser identificado criminalmente?", v:"Em regra, <b>não</b> (CF, art. 5º, LVIII). Só nas hipóteses do art. 3º da Lei 12.037 (ex.: despacho judicial por ser essencial à investigação).", lei:["cf5lviii","l12037a3"] },
{ id:"id10", tipo:"caso", sec:"criminal", f:"Quem decide que a identificação criminal é essencial às investigações?", v:"A <b>autoridade judiciária</b>, de ofício ou por representação do delegado, do MP ou da defesa (art. 3º, IV).", lei:["l12037a3"] },
{ id:"id11", tipo:"distincao", sec:"criminal", f:"O que compõe a identificação criminal?", v:"Processo <b>datiloscópico e fotográfico</b>; e, nas hipóteses legais, <b>coleta de material biológico</b> para perfil genético.", lei:["l12037a5"] },
{ id:"id13", tipo:"caso", sec:"criminal", f:"Preso em flagrante por estupro, com RG válido. Haverá identificação criminal com coleta de DNA?", v:"<b>Sim.</b> Crime contra a liberdade sexual está no art. 3º, VII; o art. 5º, §2º (Lei 15.295/2025), manda fazer a identificação com coleta de material biológico já no <b>flagrante</b>.", lei:["l12037a5","l12037a3"] },
{ id:"id12", tipo:"caso", sec:"criminal", f:"Defesa alega que o réu tinha 17 anos na data do fato, sem nenhum documento. Basta a palavra dele?", v:"<b>Não.</b> A menoridade exige <b>documento hábil</b> (Súmula 74/STJ); na falta, exame médico-legal de idade.", lei:["s74"], j:["stj-s74"] }
],
importancia:{ nivel:4,
  texto:"Tema de alta incidência em provas de perícia e de polícia judiciária: tipos fundamentais de Vucetich, requisitos dos métodos e hipóteses de identificação criminal, agora com a Lei 15.295/2025.",
  decore:[
    ["Requisitos do método","<b>unicidade, imutabilidade, perenidade, praticabilidade e classificabilidade</b>"],
    ["Sistema adotado no Brasil","<b>datiloscópico de Vucetich</b> (desde 1903)"],
    ["Papilas","surgem por volta do <b>6º mês</b> intrauterino"],
    ["Arco","sem delta; polegar <b>A</b>, demais <b>1</b>"],
    ["Presilha interna","delta à <b>direita</b>; polegar <b>I</b>, demais <b>2</b>"],
    ["Presilha externa","delta à <b>esquerda</b>; polegar <b>E</b>, demais <b>3</b>"],
    ["Verticilo","<b>dois</b> deltas; polegar <b>V</b>, demais <b>4</b>"],
    ["Fórmula datiloscópica","mão direita = <b>série</b>; mão esquerda = <b>seção</b>; amputado = <b>0</b>; cicatriz = <b>X</b>"],
    ["Identificação criminal","CF, art. 5º, LVIII; <b>Lei 12.037/2009, art. 3º</b>; novo inciso VII (Lei 15.295/2025)"],
    ["Menoridade","prova por <b>documento hábil</b> (Súmula 74/STJ)"]],
  macetes:[
    ["Polegar em letra, resto em número","A, I, E, V para o polegar; 1, 2, 3, 4 para os outros dedos, na mesma ordem."],
    ["Interna: delta à direita","Presilha interna tem o delta à direita do observador; externa, à esquerda."],
    ["Direita em cima","Série (mão direita) é o numerador; seção (mão esquerda) é o denominador."],
    ["Gêmeos idênticos","DNA nuclear igual, digitais diferentes."]] },
comparativo:{ titulo:"Identificação médico-legal × policial ou judiciária", head:["Identificação médico-legal","Identificação policial ou judiciária"], rows:[
  ["<b>Exige médico?</b> Sim, depende de conhecimento médico","<b>Exige médico?</b> Não"],
  ["<b>Dados:</b> espécie, sexo, idade, estatura, ancestralidade, lesões e sinais individuais","<b>Dados:</b> papiloscopia, fotografia e assinalamento"],
  ["<b>Aplicação típica:</b> cadáveres putrefeitos, carbonizados, ossadas e fragmentos","<b>Aplicação típica:</b> identificação civil e criminal de pessoas vivas"],
  ["<b>Recursos decisivos:</b> odontologia legal e DNA","<b>Método central:</b> datiloscopia de Vucetich"],
  ["<b>Sexo no esqueleto:</b> pelve (mais confiável), depois crânio","<b>Garantia:</b> civilmente identificado não é submetido à identificação criminal, salvo hipóteses legais"]]},
prova:[
  { tipo:"ce", enun:"A bertillonagem, baseada em antropometria, foi abandonada depois do caso Will West e William West, em que duas pessoas de medidas quase idênticas foram distinguidas pelas impressões digitais.", gab:"Certo", com:"O caso (EUA, 1903) marcou o fim da antropometria como método de identificação." },
  { tipo:"ce", enun:"No sistema de Vucetich, a presilha interna caracteriza-se por um delta à esquerda do observador e é simbolizada pela letra I no polegar.", gab:"Errado", com:"Na presilha interna o delta fica à direita do observador. O delta à esquerda caracteriza a presilha externa (E no polegar, 3 nos demais dedos)." },
  { tipo:"ce", enun:"Gêmeos univitelinos possuem o mesmo DNA nuclear, mas impressões digitais diferentes.", gab:"Certo", com:"O DNA nuclear é igual; o desenho papilar se forma de modo individual." },
  { tipo:"ce", enun:"Quem apresenta documento de identificação civil válido e sem rasura jamais pode ser submetido à identificação criminal.", gab:"Errado", com:"A CF, art. 5º, LVIII, ressalva as hipóteses legais, e o art. 3º da Lei 12.037/2009 prevê casos em que cabe identificação criminal mesmo com documento." },
  { tipo:"ce", enun:"Para efeitos penais, a menoridade do réu pode ser provada por exame médico-legal de ossificação, independentemente da existência de documento.", gab:"Errado", com:"A Súmula 74/STJ exige prova por documento hábil. A estimativa médico-legal da idade é subsidiária, para quando falta documento." },
  { tipo:"caso", enun:"Datilograma com um delta à esquerda do observador. Qual o tipo fundamental e qual o símbolo no polegar e nos demais dedos?", com:"Presilha externa: E no polegar e 3 nos demais dedos." }],
resumo:[
  "<b>Identidade</b> é o conjunto de caracteres que torna a pessoa igual só a si; <b>identificação</b> é o processo técnico; <b>reconhecimento</b> é subjetivo, feito pela memória.",
  "Um bom método tem <b>unicidade, imutabilidade, perenidade, praticabilidade e classificabilidade</b>.",
  "Bertillon: antropometria (abandonada após Will West). Galton: estudo científico das digitais. Vucetich: sistema datiloscópico adotado no Brasil. Locard: poroscopia e princípio da troca.",
  "Papiloscopia: datiloscopia (dedos), quiroscopia (palmas), podoscopia (pés) e poroscopia (poros).",
  "Tipos de Vucetich: arco (sem delta), presilha interna (delta à direita), presilha externa (delta à esquerda) e verticilo (dois deltas).",
  "Na identificação médico-legal, o sexo no esqueleto se determina melhor pela pelve; DNA mitocondrial é de linhagem materna.",
  "Identificação criminal: CF, art. 5º, LVIII, e Lei 12.037/2009, art. 3º; a Lei 15.295/2025 acrescentou o inciso VII e a coleta de material biológico.",
  "Menoridade, para efeitos penais, prova-se por documento hábil (Súmula 74/STJ)."],
checklist:[
  "Diferenciar identidade, identificação e reconhecimento.",
  "Citar os cinco requisitos técnicos de um método de identificação.",
  "Distinguir Bertillon, Galton, Vucetich e Locard.",
  "Classificar os quatro tipos fundamentais e dizer onde fica o delta.",
  "Montar a lógica da fórmula datiloscópica: letras no polegar, números nos demais, série e seção.",
  "Dizer como se determina sexo, idade e estatura em ossadas.",
  "Explicar o papel do DNA nuclear, mitocondrial e do cromossomo Y.",
  "Enumerar as hipóteses de identificação criminal mesmo com documento (Lei 12.037, art. 3º).",
  "Aplicar a Súmula 74 do STJ."],
questoes:[]
};

})();
