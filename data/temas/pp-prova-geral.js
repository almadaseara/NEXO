/* Direito Processual Penal (II): teoria geral da prova; provas ilícitas; exame de corpo de delito e perícia; cadeia de custódia (CPP, arts. 155 a 184).
   Conferido em 24/10/2026. Texto legal transcrito de memória e marcado "confira" onde há dúvida; itens de 2025/2026 ficam como "atenção".
   Base didática: material de estudo PC-BA (Processo Penal, provas), reescrito com estrutura e palavras próprias. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "24/10/2026";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

T.pp_prova_geral = {
meta:{ tema:"Prova penal: teoria geral, ilicitude, perícia e cadeia de custódia", atualizado:AT,
  foco:"Sistemas de valoração; objeto, ônus e iniciativa probatória; standards de prova; provas ilícitas, derivadas e ilegítimas (art. 157); exame de corpo de delito e perícia (arts. 158 a 184); cadeia de custódia (arts. 158-A a 158-F) e prova digital.",
  aviso:"Julgados de 2025/2026 (Informativos do STJ e decisões recentes) estão marcados como «atenção»: foram trazidos do material de estudo, sem reconfirmação na fonte oficial." },
secoes:[
{ id:"teoria", titulo:"Teoria geral da prova", curto:"Teoria geral",
  rapido:["Sistema adotado: <b>livre convencimento motivado</b> (art. 155) — o juiz valora livremente, mas <b>fundamenta</b>. No júri, vale a <b>íntima convicção</b> dos jurados. Prova tarifada é exceção (ex.: estado das pessoas segue a lei civil).",
    "<b>Não precisa de prova</b>: fato notório, evidente, presumido por lei e inútil. Direito municipal, estadual ou estrangeiro pode exigir prova, a critério do juiz.",
    "Ônus: quem alega prova (art. 156), mas o <b>ônus da acusação</b> abrange autoria, materialidade e dolo. A defesa tem ônus de provar excludentes que alega, sem inverter a presunção de inocência.",
    "Standards: para <b>investigar</b>, basta possibilidade; para <b>denunciar</b>, probabilidade (justa causa); para <b>condenar</b>, prova <b>além de dúvida razoável</b> (art. 386, VII)."],
  teoria:[
    { h:"Sistemas de apreciação", p:[
      "<b>Livre convencimento motivado</b> (persuasão racional): é a regra do art. 155 e do art. 93, IX, da Constituição. <b>Prova tarifada</b>: valor fixo pela lei — resíduo no CPP, como a exigência de certidão de óbito para extinguir a punibilidade (art. 62) e de documento hábil para prova de menoridade (Súmula 74 do STJ). <b>Íntima convicção</b>: sem motivação, só no Tribunal do Júri.",
      "<b>Provas atípicas</b> (sem previsão em lei) são admitidas, desde que lícitas e com contraditório; o rol do CPP não é taxativo."]},
    { h:"Classificações úteis", p:[
      "<b>Direta</b> (prova o próprio fato) × <b>indireta</b> (por inferência, como o indício). <b>Real</b> (coisa) × <b>pessoal</b> (declaração de alguém). <b>Emprestada</b>: vinda de outro processo, admitida se houve contraditório entre as mesmas partes. <b>Típica</b> × <b>atípica</b>; <b>irritual</b> (nomeada, mas produzida fora do modelo legal); <b>fora da terra</b> (colhida em outra comarca ou país)."]},
    { h:"Princípios que aparecem nos enunciados", p:[
      "Contraditório; <b>comunhão da prova</b> (a prova, depois de produzida, pertence ao processo e não à parte); <b>oralidade</b> (concentração, publicidade e imediação); <b>autorresponsabilidade das partes</b>; <b>nemo tenetur se detegere</b> (ninguém é obrigado a produzir prova contra si)."]},
    { h:"Etapas e iniciativa judicial", p:[
      "Proposição → admissão → produção → valoração. O juiz admite as provas pertinentes e relevantes e pode indeferir as inúteis.",
      "O art. 156 permite que o juiz, de ofício, determine diligências para <b>dirimir dúvida</b> sobre ponto relevante (inciso II). O inciso I (produção antecipada de ofício antes da ação) conflita com o art. 3º-A (estrutura acusatória) e com o art. 3º-B, VII, que exige <b>requerimento</b> para a produção antecipada. O STF admite diligências suplementares de ofício e dispensa de audiência em risco concreto — <b>atenção</b>, tema em evolução."]},
    { h:"Standards de prova", p:[
      "Os estágios da persecução exigem graus crescentes: <b>possibilidade</b> (investigar), <b>probabilidade</b> (denúncia, prisão preventiva — fumus), <b>certeza além da dúvida razoável</b> (condenação). Na dúvida, absolve-se (<i>in dubio pro reo</i>, art. 386, VII)."]}],
  pegadinhas:["«O juiz está vinculado ao laudo pericial»: <b>errado</b> (art. 182).",
    "«O ônus da prova é sempre da defesa quanto às excludentes»: a defesa só <b>alega</b> e traz elementos; a dúvida sobre a excludente favorece o réu.",
    "No júri, a íntima convicção <b>não</b> exige motivação — mas a pronúncia sim."] },

{ id:"ilicitas", titulo:"Provas ilícitas, derivadas e ilegítimas", curto:"Ilicitude",
  rapido:["<b>Prova ilícita</b> = obtida violando norma <b>material</b> (constitucional ou legal) — art. 5º, LVI, CF e art. 157, CPP. É inadmissível e deve ser <b>desentranhada</b>.",
    "<b>Prova ilegítima</b> = viola norma <b>processual</b> (ex.: ouvir pessoa proibida de depor). Sofre as consequências do regime de nulidades, não o desentranhamento automático.",
    "<b>Derivada</b> da ilícita: contaminada (teoria dos frutos da árvore envenenada), salvo se (1) sem <b>nexo causal</b>, (2) <b>fonte independente</b> (art. 157, § 2º) ou (3) <b>descoberta inevitável</b>.",
    "A ilícita <b>pro reo</b> é aceita (legítima defesa/estado de necessidade do inocente)."],
  teoria:[
    { h:"Consequências", p:[
      "Reconhecida a ilicitude, a prova é <b>desentranhada</b> dos autos e, depois da preclusão, <b>inutilizada</b> por decisão judicial, com direito das partes de acompanhar o incidente (art. 157, § 3º). O § 5º do art. 157 (impedimento do juiz que conhecesse da prova ilícita) foi declarado inconstitucional pelo STF (ADI 6.298) — <b>atenção</b>, confira o julgado.",
      "Instrumentos de impugnação: <b>recurso em sentido estrito</b> (art. 581, XIII) quando a decisão determina o desentranhamento; apelação, habeas corpus (se há ilegalidade na coleta) e mandado de segurança em hipóteses específicas."]},
    { h:"Contaminação e exceções", p:[
      "A regra é a <b>contaminação</b> do que derivou do ilícito. Afasta-se quando o vínculo é tênue (<b>sem nexo causal</b>), quando outra fonte, trilhando o caminho normal da investigação, chegaria ao mesmo fato (<b>fonte independente</b>) ou quando a descoberta era inevitável. A existência de outras provas <b>lícitas</b> independentes impede o trancamento da ação (STF, HC 116.931 — <b>atenção</b>, confira)."]},
    { h:"Jurisprudência recorrente", p:[
      "Congelamento de dados por provedor sem ordem judicial (STF, Informativo 1.123 — <b>atenção</b>); sigilo médico em atendimento de aborto, HC 1.000.918-SP (Informativo 887/2026 — <b>atenção</b>); cooperação internacional sem trâmite oficial, HC 209.854 (2025 — <b>atenção</b>); <b>perda de uma chance probatória</b> (STJ, HC 829.723) quando a falha do Estado impede a produção de prova defensiva."]}],
  pegadinhas:["Ilícita × ilegítima: a primeira viola <b>norma material</b>; a segunda, <b>processual</b>.",
    "A ilicitude de <b>uma</b> prova não tranca a ação se existirem outras independentes.",
    "A prova ilícita <b>em favor do réu</b> pode ser usada."] },

{ id:"pericia", titulo:"Exame de corpo de delito e perícia (arts. 158 a 184)", curto:"Perícia",
  rapido:["Infração que <b>deixa vestígios</b>: exame de corpo de delito é <b>indispensável</b>, direto ou indireto; <b>não pode ser suprido pela confissão</b> (art. 158). Desaparecidos os vestígios, a <b>prova testemunhal</b> pode suprir (art. 167).",
    "Perito: <b>oficial</b> com curso superior; na falta, <b>duas pessoas idôneas</b> com diploma superior (art. 159), com compromisso. As partes não interferem na nomeação do oficial; podem apresentar <b>quesitos e assistente técnico</b>.",
    "Laudo em <b>10 dias</b>, prorrogável em casos excepcionais (art. 160). O juiz <b>não fica adstrito</b> ao laudo (art. 182).",
    "<b>Autópsia</b>: após 6 horas do óbito, salvo evidência de morte (art. 162). A perícia pode ser <b>negada</b> se desnecessária, <b>exceto</b> o exame de corpo de delito (art. 184)."],
  teoria:[
    { h:"Corpo de delito direto e indireto", p:[
      "<b>Direto</b>: perito examina o vestígio material. <b>Indireto</b>: perícia sobre prontuários, fotografias, relatos — usada quando o vestígio desaparece. A doutrina trata a testemunha como forma de <b>suprimento</b> (art. 167), residual.",
      "Prioridade (art. 158, parágrafo único): crimes que envolvem violência doméstica e familiar contra mulher, criança, adolescente, idoso ou pessoa com deficiência; e os demais que a lei indicar. No JECRIM, o termo circunstanciado pode ser instruído com boletim médico (Lei 9.099, art. 77, § 1º)."]},
    { h:"Peritos e partes", p:[
      "Perito <b>oficial único</b> basta; os <b>não oficiais</b> são dois, com compromisso. O acusado e o ofendido <b>não intervêm na escolha</b> do perito oficial (art. 276 trata de impedimentos). Podem formular <b>quesitos</b> e indicar <b>assistente técnico</b>, que atua depois da elaboração do laudo oficial e tem acesso ao material (art. 159, §§ 3º a 7º). Esclarecimentos devem ser pedidos com antecedência mínima de dez dias da audiência."]},
    { h:"Laudo e valoração", p:[
      "Sistema <b>liberatório</b> (art. 182): o juiz aceita ou rejeita o laudo, no todo ou em parte, motivadamente. Se peritos divergirem, lavra-se auto ou laudo em separado, ou nomeia-se terceiro (art. 180).",
      "Lesão corporal: se o primeiro laudo foi incompleto, procede-se a exame <b>complementar</b>, a partir de 30 dias do crime (art. 168). Crime com rompimento de obstáculo (art. 171), incêndio (art. 173) e escritos (art. 174) têm regras próprias de verificação."]},
    { h:"Quadro de jurisprudência pericial (resumo)", p:[
      "Furto qualificado por rompimento de obstáculo: a perícia é necessária, salvo desaparecimento dos vestígios. Roubo com arma: a apreensão e perícia da arma <b>não são indispensáveis</b> para a majorante, provado o uso por outros meios. Tráfico de drogas: o <b>laudo definitivo</b> é imprescindível para condenar (o laudo de constatação provisório não basta). Violência doméstica, estupro de vulnerável e outros delitos praticados na clandestinidade: a <b>palavra da vítima</b> tem especial relevância, mesmo sem perícia. Perícia de <b>voz</b> em interceptação e <b>autópsia psicológica</b> têm tratamento próprio — consulte as Súmulas do STF e STJ."]}],
  pegadinhas:["«A confissão supre o exame de corpo de delito»: <b>errado</b> (art. 158, parte final).",
    "Súmula 361 do STF (dois peritos para laudo) foi <b>superada</b> pela Lei 8.862/1994 — hoje basta perito oficial único.",
    "Exame de corpo de delito não pode ser indeferido pelo juiz ou delegado (art. 184, ressalva)."] },

{ id:"custodia", titulo:"Cadeia de custódia (arts. 158-A a 158-F)", curto:"Cadeia de custódia",
  rapido:["<b>Cadeia de custódia</b>: o conjunto de procedimentos para manter e documentar a história cronológica do <b>vestígio</b>, do reconhecimento ao descarte (art. 158-A).",
    "Começa com a <b>preservação do local</b> ou com procedimento em que se detecta o vestígio; o agente que o reconhece é <b>responsável por preservá-lo</b>.",
    "Dez etapas (art. 158-B): reconhecimento, isolamento, fixação, coleta, acondicionamento, transporte, recebimento, processamento, armazenamento, descarte.",
    "A <b>quebra</b> da cadeia, por si, <b>não anula</b> o processo: o juiz avalia se a prova ainda é confiável (STJ, AgRg no HC 818.830)."],
  teoria:[
    { h:"Conceitos básicos", p:[
      "<b>Vestígio</b>: todo objeto ou material bruto, visível ou latente, constatado ou recolhido, que se relacione à infração (art. 158-A, § 3º). Vira <b>evidência</b> quando analisado e relacionado ao fato.",
      "A coleta é feita <b>preferencialmente por perito oficial</b>, com encaminhamento à <b>central de custódia</b>. É proibida a entrada em local isolado e a remoção de vestígios sem liberação do perito (art. 158-C, § 2º) — a conduta configura <b>fraude processual</b>. Os vestígios são acondicionados em recipiente próprio, com <b>lacre</b> e registro de quem manuseou."]},
    { h:"Etapas em uma frase", p:[
      "<b>Reconhecimento</b>: distinguir o que interessa. <b>Isolamento</b>: impedir alterações. <b>Fixação</b>: descrever e registrar (fotos, croqui). <b>Coleta</b>: recolher. <b>Acondicionamento</b>: embalar individualizado. <b>Transporte</b>: com cuidado para manter a integridade. <b>Recebimento</b>: protocolo. <b>Processamento</b>: o exame pericial em si. <b>Armazenamento</b>: guarda do vestígio e do material de contraprova. <b>Descarte</b>: liberação mediante autorização judicial."]},
    { h:"Consequência da quebra", p:[
      "A violação das regras não gera nulidade automática. O juiz examina se houve <b>prejuízo à confiabilidade</b> da prova; em casos graves, a prova pode ser considerada <b>imprestável</b> ou ter valor reduzido. A defesa tem ônus de apontar a falha concreta."]},
    { h:"Prova digital", p:[
      "Para dispositivos eletrônicos, recomenda-se o <b>espelhamento</b> com cálculo de <b>hash</b> (verificação de integridade). O STJ (Inq 1.674 — Informativo 891/2026, <b>atenção</b>) tratou da exigência do hash; sem ele, admite-se perícia complementar (Informativo 878/2026, <b>atenção</b>). O registro documental da apreensão (RHC 143.169) reforça a confiabilidade. Há ainda julgado sobre <b>mitigação do laudo</b> (Informativo 896/2026, <b>atenção</b>). Confira todos antes de citar em prova."]}],
  pegadinhas:["Cadeia de custódia quebrada <b>não</b> equivale a nulidade automática.",
    "Quem entra em local isolado e remove vestígio comete <b>fraude processual</b>.",
    "A coleta é <b>preferencialmente</b> por perito oficial — não exclusivamente."] }
],
lei:[
{ art:"CPP, arts. 155 a 157", nome:"Valoração, ônus e provas ilícitas", sec:"ilicitas", itens:[
  { id:"cpp155", rot:"Art. 155",
    t:"O juiz formará sua convicção pela <b class='g1'>livre apreciação da prova produzida em contraditório judicial</b>, não podendo fundamentar sua decisão <b class='g3'>exclusivamente nos elementos informativos colhidos na investigação</b>, ressalvadas as provas <b class='g3'>cautelares, não repetíveis e antecipadas</b>.",
    nota:"Parágrafo único: quanto ao estado das pessoas, observam-se as restrições da lei civil.", c:["pg1"] },
  { id:"cpp156", rot:"Art. 156",
    t:"A prova da alegação incumbirá a <b class='g1'>quem a fizer</b>, sendo, porém, facultado ao juiz de ofício: I – ordenar, mesmo antes de iniciada a ação penal, a produção antecipada de provas consideradas urgentes e relevantes [...]; II – determinar, no curso da instrução, ou antes de proferir sentença, a realização de <b class='g1'>diligências para dirimir dúvida sobre ponto relevante</b>.",
    nota:"O inciso I deve ser lido com o art. 3º-A e o art. 3º-B, VII (confira a redação vigente).", c:["pg2"] },
  { id:"cpp157", rot:"Art. 157",
    t:"São <b class='g1'>inadmissíveis</b>, devendo ser <b class='g1'>desentranhadas</b> do processo, as provas ilícitas, assim entendidas as obtidas em violação a normas constitucionais ou legais. § 1º São também inadmissíveis as provas derivadas das ilícitas, <b class='g3'>salvo quando não evidenciado o nexo de causalidade</b> entre umas e outras, ou quando as derivadas puderem ser obtidas por uma <b class='g3'>fonte independente</b> das primeiras. § 2º Considera-se fonte independente aquela que por si só, seguindo os trâmites típicos e de praxe, próprios da investigação ou instrução criminal, seria capaz de conduzir ao fato objeto da prova. § 3º Preclusa a decisão de desentranhamento [...], esta será <b class='g1'>inutilizada</b> por decisão judicial, facultado às partes acompanhar o incidente.",
    nota:"O § 5º (impedimento do juiz que conheceu da prova) foi declarado inconstitucional pelo STF (ADI 6.298); confira.", c:["pg3","pg4"], j:["stf-adi6298"] }]},
{ art:"CPP, arts. 158 a 184", nome:"Exame de corpo de delito e perícia", sec:"pericia", itens:[
  { id:"cpp158", rot:"Art. 158",
    t:"Quando a infração deixar <b class='g1'>vestígios</b>, será <b class='g1'>indispensável o exame de corpo de delito</b>, direto ou indireto, <b class='g3'>não podendo supri-lo a confissão do acusado</b>.",
    c:["pg5"] },
  { id:"cpp159", rot:"Art. 159",
    t:"O exame de corpo de delito e outras perícias serão realizados por <b class='g1'>perito oficial</b>, portador de diploma de curso superior. § 1º Na falta de perito oficial, o exame será realizado por <b class='g2'>2 pessoas idôneas</b>, portadoras de diploma de curso superior preferencialmente na área específica [...].",
    nota:"Confira §§ 3º a 7º (quesitos, assistente técnico e material).", c:["pg6"] },
  { id:"cpp160", rot:"Art. 160",
    t:"Os peritos elaborarão o <b class='g1'>laudo pericial</b>, onde descreverão minuciosamente o que examinarem, e responderão aos quesitos formulados. Parágrafo único. O laudo pericial será elaborado no prazo máximo de <b class='g2'>10 dias</b>, podendo este prazo ser <b class='g3'>prorrogado, em casos excepcionais</b>, a requerimento dos peritos.",
    c:["pg7"] },
  { id:"cpp162", rot:"Art. 162",
    t:"A autópsia será feita pelo menos <b class='g2'>seis horas depois do óbito</b>, <b class='g3'>salvo se</b> os peritos, pela evidência dos sinais de morte, julgarem que possa ser feita antes daquele prazo, o que declararão no auto." },
  { id:"cpp167", rot:"Art. 167",
    t:"Não sendo possível o exame de corpo de delito, por haverem <b class='g1'>desaparecido os vestígios</b>, a <b class='g1'>prova testemunhal</b> poderá suprir-lhe a falta.",
    c:["pg5"] },
  { id:"cpp182", rot:"Art. 182",
    t:"O <b class='g1'>juiz não ficará adstrito ao laudo</b>, podendo aceitá-lo ou rejeitá-lo, no todo ou em parte.",
    c:["pg8"] },
  { id:"cpp184", rot:"Art. 184",
    t:"<b class='g3'>Salvo o caso de exame de corpo de delito</b>, o juiz ou a autoridade policial negará a perícia requerida pelas partes, quando <b class='g1'>não for necessária ao esclarecimento da causa</b>." }]},
{ art:"CPP, arts. 158-A a 158-C", nome:"Cadeia de custódia", sec:"custodia", itens:[
  { id:"cpp158a", rot:"Art. 158-A",
    t:"Considera-se <b class='g1'>cadeia de custódia</b> o conjunto de todos os procedimentos utilizados para manter e documentar a história cronológica do vestígio coletado em locais ou em vítimas de crimes, para rastrear sua posse e manuseio a partir de seu <b class='g1'>reconhecimento até o descarte</b>. § 1º O início da cadeia de custódia dá-se com a <b class='g1'>preservação do local de crime</b> ou com procedimentos policiais ou periciais nos quais seja detectada a existência de vestígio. § 2º O agente público que reconhecer um elemento como de potencial interesse [...] fica <b class='g1'>responsável por sua preservação</b>. § 3º Vestígio é todo objeto ou material bruto, visível ou latente, constatado ou recolhido, que se relaciona à infração penal.",
    c:["pg9","pg10"] },
  { id:"cpp158c", rot:"Art. 158-C",
    t:"A coleta dos vestígios deverá ser realizada <b class='g1'>preferencialmente por perito oficial</b>, que dará o encaminhamento necessário para a <b class='g1'>central de custódia</b>, mesmo quando for necessária a realização de exames complementares. [...] § 2º É <b class='g3'>proibida a entrada em locais isolados</b> bem como a remoção de quaisquer vestígios de locais de crime antes da liberação por parte do perito responsável, sendo tipificada como <b class='g3'>fraude processual</b> a sua realização.",
    nota:"Texto resumido; confira o § 1º.", c:["pg11"] }]}
],
juris:[
{ id:"stj-s74", trib:"STJ", tipo:"Súmula", num:"Súmula 74", sec:"teoria", status:"vigente", data:"20/03/1993",
  titulo:"Prova da menoridade do réu",
  texto:"Para efeitos penais, o reconhecimento da menoridade do réu requer prova por documento hábil.",
  explica:"Exemplo de prova tarifada. O documento é, em regra, a certidão de nascimento ou documento oficial.", lei:[], fonte:STJJ },
{ id:"stj-s455", trib:"STJ", tipo:"Súmula", num:"Súmula 455", sec:"teoria", status:"vigente", data:"25/08/2010",
  titulo:"Produção antecipada de provas (art. 366)",
  texto:"A decisão que determina a produção antecipada de provas com base no art. 366 do CPP deve ser concretamente fundamentada, não a justificando unicamente o mero decurso do tempo.",
  explica:"Réu citado por edital que não comparece: o processo fica suspenso; a antecipação exige fundamento concreto (risco ao perecimento da prova).", lei:[], fonte:STJJ },
{ id:"stf-adi6298", trib:"STF", tipo:"ADI", num:"ADI 6.298 e outras", sec:"ilicitas", status:"atencao", data:"2023 (confira)",
  titulo:"Pacote Anticrime: pontos declarados inconstitucionais",
  texto:"Entendimento conforme o material de estudo: o § 5º do art. 157 do CPP (afastamento do juiz que teve contato com prova ilícita) foi declarado inconstitucional; a eficácia do juiz das garantias teve interpretação conforme.",
  explica:"Marcado como atenção porque a eficácia dos dispositivos do Pacote Anticrime foi ajustada por vários julgados. Confira o acórdão.", lei:["cpp157"], fonte:STFJ },
{ id:"stf-s361", trib:"STF", tipo:"Súmula", num:"Súmula 361 (superada)", sec:"pericia", status:"divergencia", data:"13/12/1963",
  titulo:"Nulidade do exame por um só perito",
  texto:"No processo penal, é nulo o exame realizado por um só perito, considerando-se impedido o que tiver funcionado, anteriormente, na diligência de apreensão.",
  explica:"Superada pela Lei 8.862/1994 (nova redação do art. 159): hoje basta um perito oficial. Aparece em prova como pegadinha de desatualização.", lei:["cpp159"], fonte:STFJ },
{ id:"stj-hc818830", trib:"STJ", tipo:"AgRg no HC", num:"AgRg no HC 818.830", sec:"custodia", status:"atencao", data:"2023/2024 (confira)",
  titulo:"Quebra da cadeia de custódia não gera nulidade automática",
  texto:"Segundo o material de estudo: a irregularidade na cadeia de custódia não leva, por si, à nulidade; cabe ao juiz verificar se a confiabilidade da prova foi comprometida.",
  explica:"Tese corrente no STJ. Confira o número e a data no acórdão antes de citar.", lei:["cpp158a"], fonte:STJJ },
{ id:"stj-inq1674", trib:"STJ", tipo:"Inquérito", num:"Inq 1.674 (Inf. 891/2026)", sec:"custodia", status:"atencao", data:"2026 (confira)",
  titulo:"Espelhamento e hash em prova digital",
  texto:"Segundo o material de estudo: a integridade do dado digital é aferida pelo espelhamento e cálculo do hash; a ausência do hash enseja perícia complementar, não nulidade automática.",
  explica:"Informativo de 2026 trazido do material, não reconferido. Use com cautela.", lei:["cpp158a"], fonte:STJJ }
],
cards:[
{ id:"pg1", tipo:"ce", sec:"teoria", f:"(C/E) A condenação pode ser fundamentada exclusivamente em depoimentos colhidos na fase do inquérito, desde que sejam harmônicos.",
  v:"<b>Errado.</b> Art. 155: só provas <b>cautelares, não repetíveis e antecipadas</b> escapam da vedação.", lei:["cpp155"] },
{ id:"pg2", tipo:"distincao", sec:"teoria", f:"Livre convencimento motivado × íntima convicção × prova tarifada.",
  v:"<b>Motivado</b>: regra, juiz fundamenta. <b>Íntima</b>: jurados, sem motivar. <b>Tarifada</b>: lei fixa o valor (certidão de óbito, documento para menoridade).", lei:["cpp156"] },
{ id:"pg3", tipo:"caso", sec:"ilicitas", f:"Polícia entra em casa sem mandado nem flagrante, apreende droga e, com base em depoimento do usuário, chega a um depósito, onde acha mais drogas. A segunda apreensão é válida?",
  v:"Em regra <b>contaminada</b> (derivada da ilícita). Só se salva se houve <b>fonte independente</b> ou descoberta inevitável — situações a demonstrar no caso concreto.", lei:["cpp157"] },
{ id:"pg4", tipo:"distincao", sec:"ilicitas", f:"Prova ilícita × prova ilegítima.",
  v:"<b>Ilícita</b>: viola norma <b>material</b> (CF/lei) na obtenção; desentranha-se. <b>Ilegítima</b>: viola norma <b>processual</b> na produção; regime das nulidades.", lei:["cpp157"] },
{ id:"pg5", tipo:"caso", sec:"pericia", f:"O réu confessa o furto qualificado por rompimento de obstáculo, mas não houve perícia e os vestígios ainda existiam. É possível condenar?",
  v:"<b>Não.</b> A confissão não supre o exame de corpo de delito (art. 158). Só a prova testemunhal supre quando os vestígios <b>desaparecem</b> (art. 167).", lei:["cpp158","cpp167"] },
{ id:"pg6", tipo:"numero", sec:"pericia", f:"Quantas pessoas realizam o exame quando não há perito oficial?",
  v:"<b>Duas</b> pessoas idôneas, com diploma superior, preferencialmente na área específica (art. 159, § 1º), mediante compromisso.", lei:["cpp159"] },
{ id:"pg7", tipo:"numero", sec:"pericia", f:"Prazo máximo para o laudo pericial e possibilidade de prorrogação.",
  v:"<b>10 dias</b>, prorrogável em casos excepcionais a requerimento dos peritos (art. 160, parágrafo único).", lei:["cpp160"] },
{ id:"pg8", tipo:"ce", sec:"pericia", f:"(C/E) O juiz está obrigado a acolher o laudo pericial quando elaborado por perito oficial.",
  v:"<b>Errado.</b> Art. 182: o juiz não fica adstrito ao laudo (sistema liberatório).", lei:["cpp182"] },
{ id:"pg9", tipo:"lacuna", sec:"custodia", f:"Cadeia de custódia é o conjunto de procedimentos para manter e documentar a história cronológica do ___, do reconhecimento ao descarte.",
  v:"<b>vestígio</b> (art. 158-A).", lei:["cpp158a"] },
{ id:"pg10", tipo:"caso", sec:"custodia", f:"Policial militar chega primeiro, nota um objeto e o guarda no bolso sem registro. Quem responde pela preservação?",
  v:"O agente que <b>reconheceu</b> o elemento como de potencial interesse fica <b>responsável por sua preservação</b> (art. 158-A, § 2º). A falta de registro enfraquece a prova, mas não a anula automaticamente.", lei:["cpp158a"] },
{ id:"pg11", tipo:"caso", sec:"custodia", f:"Em local de crime já isolado, um agente da polícia entra sem autorização do perito e move um objeto. Que consequência a lei prevê?",
  v:"É vedado entrar em local isolado e remover vestígios antes da liberação do perito; a lei qualifica a conduta como <b>fraude processual</b> (art. 158-C, § 2º).", lei:["cpp158c"] },
{ id:"pg12", tipo:"distincao", sec:"custodia", f:"A quebra da cadeia de custódia anula a prova?",
  v:"<b>Não automaticamente.</b> O juiz avalia a confiabilidade; pode considerar a prova imprestável ou reduzir seu peso.", lei:["cpp158a"], j:["stj-hc818830"] },
{ id:"pg13", tipo:"juris", sec:"teoria", f:"Súmula 74 do STJ: como se prova a menoridade do réu para fins penais?",
  v:"Por <b>documento hábil</b> — exemplo de prova tarifada.", lei:[], j:["stj-s74"] },
{ id:"pg14", tipo:"juris", sec:"pericia", f:"Súmula 361 do STF exige dois peritos. Ainda vale?",
  v:"<b>Superada.</b> Desde a Lei 8.862/1994 basta um perito oficial; só na falta dele exigem-se duas pessoas idôneas.", lei:["cpp159"], j:["stf-s361"] },
{ id:"pg15", tipo:"numero", sec:"pericia", f:"Quando se pode fazer a autópsia?",
  v:"<b>Pelo menos 6 horas</b> depois do óbito, salvo evidência de sinais de morte que permita antecipar, o que consta do auto (art. 162).", lei:["cpp162"] }
],
importancia:{ nivel:5,
  texto:"Teoria geral da prova, provas ilícitas e derivadas, perícia e cadeia de custódia são cobradas em todas as provas de Processo Penal: sistemas de valoração, ônus, frutos da árvore envenenada e dez etapas da cadeia de custódia.",
  decore:[
    ["Sistema de valoração","<b>livre convencimento motivado</b> (art. 155); íntima convicção só no júri"],
    ["Standards de prova","investigar: <b>possibilidade</b>; denunciar: <b>probabilidade</b>; condenar: <b>além da dúvida razoável</b>"],
    ["Prova ilícita × ilegítima","ilícita viola norma <b>material</b>; ilegítima, norma <b>processual</b>"],
    ["Exceções à contaminação","<b>sem nexo causal</b>, <b>fonte independente</b> e <b>descoberta inevitável</b>"],
    ["Exame de corpo de delito","<b>indispensável</b> se há vestígios; <b>não é suprido pela confissão</b> (art. 158)"],
    ["Laudo pericial","<b>10 dias</b> (art. 160); juiz não é adstrito (art. 182)"],
    ["Peritos","<b>oficial</b> com curso superior ou <b>dois</b> peritos não oficiais com diploma"],
    ["Cadeia de custódia","<b>10 etapas</b> (art. 158-B), do reconhecimento ao descarte"],
    ["Quebra da cadeia de custódia","<b>não anula</b> automaticamente; avalia-se a confiabilidade"]],
  macetes:[
    ["Ilícita = material, ilegítima = processual","Ilícita é desentranhada; ilegítima segue o regime de nulidades."],
    ["Confissão não supre perícia","Se o crime deixa vestígios, o exame é indispensável; sumindo os vestígios, a prova testemunhal pode suprir."],
    ["Local isolado","Entrar em local isolado e remover vestígio sem liberação do perito é fraude processual."]] },
comparativo:{ titulo:"Prova ilícita × prova ilegítima", head:["Prova ilícita","Prova ilegítima"], rows:[
  ["<b>Norma violada:</b> material (constitucional ou legal)","<b>Norma violada:</b> processual"],
  ["<b>Exemplo:</b> prova obtida por violação de domicílio","<b>Exemplo:</b> ouvir pessoa proibida de depor"],
  ["<b>Consequência:</b> inadmissível e desentranhada (art. 157)","<b>Consequência:</b> regime das nulidades, sem desentranhamento automático"],
  ["<b>Provas derivadas:</b> contaminadas, salvo nexo tênue, fonte independente ou descoberta inevitável","<b>Provas derivadas:</b> seguem a sorte do ato nulo, conforme o prejuízo"],
  ["<b>Em favor do réu:</b> admitida (proporcionalidade pro reo)","<b>Fundamento:</b> art. 5º, LVI, da CF e art. 157 do CPP"]]},
prova:[
  { tipo:"ce", enun:"No sistema do livre convencimento motivado, o juiz valora a prova livremente, mas deve fundamentar sua decisão.", gab:"Certo", com:"Art. 155 do CPP e art. 93, IX, da CF." },
  { tipo:"ce", enun:"A confissão do acusado supre a falta do exame de corpo de delito em crime que deixa vestígios.", gab:"Errado", com:"Art. 158: o exame é indispensável e não pode ser suprido pela confissão." },
  { tipo:"ce", enun:"Prova obtida por violação de norma processual é prova ilícita e deve ser desentranhada.", gab:"Errado", com:"Violação de norma processual gera prova ilegítima; ilícita é a que viola norma material." },
  { tipo:"ce", enun:"O juiz fica vinculado ao laudo pericial e não pode rejeitá-lo.", gab:"Errado", com:"Art. 182: sistema liberatório; o juiz aceita ou rejeita o laudo, no todo ou em parte, motivadamente." },
  { tipo:"ce", enun:"A quebra da cadeia de custódia acarreta, por si só, a nulidade automática do processo.", gab:"Errado", com:"O juiz examina se houve prejuízo à confiabilidade da prova; não há nulidade automática." },
  { tipo:"caso", enun:"A polícia obtém uma prova por meio ilícito e, a partir dela, chega a outra prova. Esta última é válida?", com:"Em regra, é contaminada (frutos da árvore envenenada), salvo se não houver nexo causal, se existir fonte independente ou se a descoberta fosse inevitável (art. 157, § 2º)." }],
resumo:[
  "O sistema é o do livre convencimento motivado; íntima convicção só no júri; prova tarifada é exceção.",
  "Não precisam de prova fatos notórios, evidentes, presumidos por lei e inúteis.",
  "Quem alega prova; o ônus da acusação abrange autoria, materialidade e dolo.",
  "Standards crescentes: possibilidade, probabilidade e certeza além da dúvida razoável.",
  "Prova ilícita viola norma material e é inadmissível; ilegítima viola norma processual.",
  "A prova derivada da ilícita é contaminada, salvo nexo tênue, fonte independente ou descoberta inevitável.",
  "Crime com vestígios exige exame de corpo de delito; laudo em 10 dias; juiz não é adstrito ao laudo.",
  "A cadeia de custódia tem dez etapas (art. 158-B); a quebra não gera nulidade automática."],
checklist:[
  "Distinguir livre convencimento, íntima convicção e prova tarifada",
  "Explicar o ônus da prova e os standards",
  "Diferenciar prova ilícita, ilegítima e derivada",
  "Citar as exceções à contaminação",
  "Aplicar o art. 158 e o art. 167",
  "Dizer quem pode ser perito e os direitos das partes",
  "Listar as etapas da cadeia de custódia",
  "Explicar a consequência da quebra da cadeia"],
questoes:[]
};
})();
