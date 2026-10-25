/* Legislação Extravagante (VIII): Lei 9.613/1998 (lavagem de dinheiro).
   Conferido em 25/10/2026. Texto legal transcrito do material de estudo PC-BA e de memória (confira no Planalto);
   base didática reescrita com palavras próprias. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "25/10/2026";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

/* ======================= LEI 9.613/1998 ======================= */
T.ext_lavagem = {
meta:{ tema:"Lei 9.613/1998: lavagem de dinheiro", atualizado:AT,
  foco:"Tipo do art. 1º e equiparados (§§ 1º e 2º); fases; infração antecedente; majorante e delação; efeitos da condenação; pessoas obrigadas; Coaf; competência; medidas assecuratórias.",
  aviso:"O Coaf hoje integra a estrutura do Banco Central (MP 893/2019 revogou arts. 13, 16 e 17); o texto da lei ainda cita o antigo órgão. Confira numeração e redação vigentes no Planalto." },
secoes:[
{ id:"crime", titulo:"O crime e suas variantes", curto:"Crime",
  rapido:["Art. 1º, caput: <b>ocultar ou dissimular</b> natureza, origem, localização, disposição, movimentação ou propriedade de bens, direitos ou valores provenientes, direta ou indiretamente, de <b>infração penal</b> (qualquer crime ou contravenção, desde a Lei 12.683/2012: “terceira geração”). Pena: <b>reclusão de 3 a 10 anos e multa</b>.",
    "Fases (doutrina, não precisam ocorrer todas): <b>colocação</b> (inserção no sistema), <b>ocultação/dissimulação</b> (camadas para despistar) e <b>integração</b> (valores voltam à economia com aparência lícita).",
    "§ 1º (mesma pena), para ocultar ou dissimular a utilização: <b>converter em ativos lícitos</b>; <b>adquirir, receber, trocar, negociar, dar ou receber em garantia, guardar, ter em depósito, movimentar ou transferir</b>; <b>importar ou exportar bens com valores não correspondentes</b> aos verdadeiros.",
    "§ 2º (mesma pena): <b>utilizar</b>, na atividade econômica ou financeira, bens de infração penal; <b>participar de grupo, associação ou escritório</b> sabendo que sua atividade principal ou secundária visa à prática dos crimes da lei.",
    "Aumento de <b>1/3 a 2/3</b> (art. 1º, § 4º, segundo o material: um a dois terços) se cometido de forma <b>reiterada</b>, por <b>organização criminosa</b> ou por meio de <b>ativo virtual</b> (esta última, de 2022). <b>Tentativa</b> punível pelo art. 14, II, do CP (pena reduzida de 1 a 2/3). É <b>crime permanente</b> na modalidade ocultação (STF, AP 863).",
    "Delação (§ 5º): colaboração espontânea que leve à apuração das infrações, à identificação de autores ou à localização dos bens — pena <b>reduzida de 1 a 2/3</b>, regime <b>aberto ou semiaberto</b>, ou perdão/substituição por restritiva de direitos. § 6º: admitem-se <b>ação controlada</b> e <b>infiltração de agentes</b> (Pacote Anticrime)."],
  teoria:[
    { h:"Vínculo com a infração antecedente", p:[
      "Não há lista de crimes antecedentes, mas a denúncia deve trazer <b>indícios suficientes</b> da infração antecedente. O fato é punível ainda que o autor da antecedente seja desconhecido ou isento de pena, ou extinta a punibilidade da antecedente (art. 2º, § 1º).",
      "A troca do “que sabe serem provenientes” do § 2º não criou modalidade culposa: o crime exige <b>dolo</b>: o agente precisa saber da origem ilícita dos recursos."]},
    { h:"Bem jurídico", p:[
      "Para provas, usa-se: ordem socioeconômica e administração da justiça/bens atingidos pelo crime antecedente. Há quem aponte apenas a ordem econômico-financeira."]}],
  pegadinhas:["Hoje <b>qualquer infração penal</b> pode ser antecedente: não existe rol.",
    "Não existe lavagem <b>culposa</b>.",
    "Pena de 3 a 10 anos, <b>reclusão</b>; a delação do § 5º é mais ampla que em outras leis (inclui regime, perdão judicial).",
    "A lavagem é <b>crime permanente</b> quando se mantém oculto o valor."] },
{ id:"processo", titulo:"Efeitos, competência, obrigações e medidas assecuratórias", curto:"Processo e obrigações",
  rapido:["Efeitos da condenação (art. 7º): <b>perda em favor da União</b> (ou dos Estados, na Justiça estadual) de todos os bens, direitos e valores ligados ao crime, inclusive os usados na fiança, ressalvados lesado e terceiro de boa-fé; <b>interdição</b> de cargo ou função pública e de diretor/membro de conselho/gerência de pessoas obrigadas, pelo <b>dobro</b> da pena privativa de liberdade.",
    "Processo autônomo: o julgamento independe do crime antecedente; o juiz pode unir os processos. Rito: <b>procedimento comum</b> da reclusão (CPP). O antigo art. 3º (vedava fiança e liberdade provisória) foi <b>revogado</b>.",
    "Competência da <b>Justiça Federal</b> (art. 2º, III): crime contra o sistema financeiro e a ordem econômico-financeira, ou contra bens, serviços e interesses da União, autarquias e empresas públicas; ou quando a infração antecedente for federal. Fora disso, Justiça estadual.",
    "Pessoas obrigadas (arts. 9º a 11): instituições financeiras, bolsas, seguradoras, administradoras de cartões, factoring, leasing, imobiliárias, comércio de joias, bens de luxo e obras de arte, juntas comerciais, assessorias, atletas e artistas, transporte de valores, entre outras. Deveres do art. 10: <b>identificar clientes</b> e manter cadastro; <b>registrar transações</b> acima do limite; manter <b>controles internos</b>; cadastrar-se no regulador/Coaf; <b>atender às requisições do Coaf</b>.",
    "Coaf (hoje na estrutura do Banco Central): recebe, examina e identifica ocorrências suspeitas; pode requisitar informações cadastrais, mas <b>não quebra sigilo bancário</b> (exige ordem judicial; STF, RE 389.808). Art. 12-A: <b>Cadastro Nacional de Pessoas Expostas Politicamente</b> (Lei 14.478/2022), que as pessoas obrigadas devem consultar.",
    "Medidas assecuratórias (art. 4º): o juiz, de ofício, a requerimento do MP ou por representação do delegado, ouvido o MP em 24 horas, com indícios suficientes de infração penal, decreta medidas sobre bens do investigado ou em nome de <b>interpostas pessoas</b>, que sejam instrumento, produto ou proveito. § 1º: <b>alienação antecipada</b> de bens sujeitos a deterioração. § 2º: liberação se comprovada a licitude, mantendo o necessário para reparação e custas. § 3º: pedido de liberação exige <b>comparecimento pessoal</b>. Art. 4º-B: suspensão da prisão/medidas quando a execução imediata comprometer as investigações (ação controlada)."],
  teoria:[
    { h:"Afastamento do servidor indiciado", p:[
      "O art. 17-D previa o afastamento automático do servidor indiciado pelo delegado. O STF o declarou inconstitucional (ADI 4911, 20/11/2020): o afastamento exige demonstração, pela autoridade, do risco da permanência no cargo."]}],
  pegadinhas:["O Coaf <b>não</b> quebra sigilo bancário.",
    "Interdição pelo <b>dobro</b> da pena privativa de liberdade (art. 7º, II).",
    "Medidas assecuratórias alcançam bens em nome de <b>interpostas pessoas</b>.",
    "Pedido de liberação de bens: <b>comparecimento pessoal</b> do acusado ou da interposta pessoa."] }
],
lei:[
{ art:"Lei 9.613/1998, arts. 1º e 7º", nome:"Tipo penal e efeitos", sec:"crime", itens:[
  { id:"l9613a1", rot:"Art. 1º, caput",
    t:"<b class='g1'>Ocultar ou dissimular</b> a natureza, origem, localização, disposição, movimentação ou propriedade de bens, direitos ou valores provenientes, direta ou indiretamente, de <b class='g1'>infração penal</b>. Pena: reclusão, de <b class='g2'>3 (três) a 10 (dez) anos</b>, e multa.", c:["lv1","lv2"] },
  { id:"l9613a1p1", rot:"Art. 1º, §§ 1º e 2º",
    t:"§ 1º Incorre na mesma pena quem, para ocultar ou dissimular a utilização de bens, direitos ou valores provenientes de infração penal: I - os <b class='g1'>converte em ativos lícitos</b>; II - os <b class='g1'>adquire, recebe, troca, negocia, dá ou recebe em garantia, guarda, tem em depósito, movimenta ou transfere</b>; III - <b class='g1'>importa ou exporta bens com valores não correspondentes</b> aos verdadeiros. § 2º Incorre, ainda, na mesma pena quem: I - <b class='g1'>utiliza</b>, na atividade econômica ou financeira, bens, direitos ou valores provenientes de infração penal; II - <b class='g1'>participa de grupo, associação ou escritório</b> tendo conhecimento de que sua atividade principal ou secundária é dirigida à prática de crimes previstos nesta Lei.", c:["lv3","lv4"] },
  { id:"l9613a1p4", rot:"Art. 1º, §§ 4º a 6º",
    t:"§ 4º A pena será aumentada de <b class='g2'>um a dois terços</b>, se os crimes definidos nesta Lei forem cometidos de forma <b class='g1'>reiterada</b>, por intermédio de <b class='g1'>organização criminosa</b> ou por meio de utilização de <b class='g1'>ativo virtual</b>. § 5º A pena poderá ser <b class='g2'>reduzida de um a dois terços</b> e ser cumprida em regime <b class='g1'>aberto ou semiaberto</b>, facultando-se ao juiz deixar de aplicá-la ou substituí-la, a qualquer tempo, por pena restritiva de direitos, se o autor, coautor ou partícipe <b class='g1'>colaborar espontaneamente</b> com as autoridades, prestando esclarecimentos que conduzam à apuração das infrações penais, à identificação dos autores, coautores e partícipes, ou à localização dos bens, direitos ou valores objeto do crime. § 6º Para a apuração do crime de que trata este artigo, admite-se a utilização da <b class='g1'>ação controlada e da infiltração de agentes</b>.",
    nota:"O § 4º foi citado pelo material de estudo; a numeração/redação do § 4º e a inclusão de ativo virtual (2022) devem ser conferidas.", c:["lv5","lv6"] },
  { id:"l9613a7", rot:"Art. 7º",
    t:"São <b class='g1'>efeitos da condenação</b>, além dos previstos no Código Penal: I - a <b class='g1'>perda, em favor da União</b> - e dos Estados, nos casos de competência da Justiça Estadual -, de todos os bens, direitos e valores relacionados, direta ou indiretamente, à prática dos crimes previstos nesta Lei, inclusive aqueles utilizados para prestar a fiança, ressalvado o direito do lesado ou de terceiro de boa-fé; II - a <b class='g1'>interdição do exercício de cargo ou função pública</b> de qualquer natureza e de diretor, de membro de conselho de administração ou de gerência das pessoas jurídicas referidas no art. 9º, pelo <b class='g2'>dobro do tempo da pena privativa de liberdade</b> aplicada.", c:["lv7"] }]},
{ art:"Lei 9.613/1998, arts. 2º, 4º, 9º e 10", nome:"Competência, medidas e obrigações", sec:"processo", itens:[
  { id:"l9613a2", rot:"Art. 2º",
    t:"O processo e julgamento dos crimes previstos nesta Lei: [...] III - são da competência da <b class='g1'>Justiça Federal</b>: a) quando praticados contra o <b class='g1'>sistema financeiro e a ordem econômico-financeira</b>, ou em detrimento de bens, serviços ou interesses da União, ou de suas entidades autárquicas ou empresas públicas; b) quando a <b class='g1'>infração penal antecedente</b> for de competência da Justiça Federal. [...] § 1º A denúncia será instruída com <b class='g1'>indícios suficientes da existência da infração penal antecedente</b>, sendo puníveis os fatos previstos nesta Lei, ainda que desconhecido ou isento de pena o autor, ou extinta a punibilidade da infração penal antecedente.", c:["lv8","lv9"] },
  { id:"l9613a4", rot:"Art. 4º",
    t:"O juiz, de ofício, a requerimento do Ministério Público ou mediante representação do <b class='g1'>delegado de polícia</b>, ouvido o Ministério Público em <b class='g2'>24 (vinte e quatro) horas</b>, havendo indícios suficientes de infração penal, poderá decretar <b class='g1'>medidas assecuratórias</b> de bens, direitos ou valores do investigado ou acusado, ou existentes em nome de <b class='g1'>interpostas pessoas</b>, que sejam instrumento, produto ou proveito dos crimes previstos nesta Lei ou das infrações penais antecedentes. § 1º Proceder-se-á à <b class='g1'>alienação antecipada</b> para preservação do valor dos bens sempre que estiverem sujeitos a qualquer grau de deterioração ou depreciação, ou quando houver dificuldade para sua manutenção. § 2º O juiz determinará a <b class='g1'>liberação</b> total ou parcial dos bens, direitos e valores quando comprovada a licitude de sua origem, mantendo-se a constrição dos bens necessários e suficientes à reparação dos danos e ao pagamento de prestações pecuniárias, multas e custas. § 3º Nenhum pedido de liberação será conhecido sem o <b class='g3'>comparecimento pessoal</b> do acusado ou de interposta pessoa, podendo o juiz determinar a prática de atos necessários à conservação de bens, direitos ou valores, sem prejuízo do disposto no § 1º.", c:["lv10"] },
  { id:"l9613a4b", rot:"Art. 4º-B",
    t:"A ordem de prisão de pessoas ou as <b class='g1'>medidas assecuratórias</b> de bens, direitos ou valores poderão ser <b class='g1'>suspensas pelo juiz</b>, ouvido o Ministério Público, quando a sua execução imediata puder comprometer as investigações.", c:["lv11"] },
  { id:"l9613a10", rot:"Arts. 10 e 12-A",
    t:"<b>Art. 10.</b> As pessoas referidas no art. 9º: I - <b class='g1'>identificarão seus clientes</b> e manterão cadastro atualizado; II - manterão <b class='g1'>registro de toda transação</b> em moeda nacional ou estrangeira, títulos e valores mobiliários, títulos de crédito, metais, ou qualquer ativo passível de ser convertido em dinheiro, que ultrapassar limite fixado pela autoridade competente; III - deverão adotar <b class='g1'>políticas, procedimentos e controles internos</b>; IV - deverão cadastrar-se e manter seu cadastro atualizado no órgão regulador ou fiscalizador e, na falta deste, no Coaf; V - deverão <b class='g1'>atender às requisições formuladas pelo Coaf</b>, preservando o sigilo das informações prestadas. <b>Art. 12-A.</b> Ato do Poder Executivo federal regulamentará a disciplina e o funcionamento do <b class='g1'>Cadastro Nacional de Pessoas Expostas Politicamente (CNPEP)</b>, disponibilizado pelo Portal da Transparência. [...] § 2º As pessoas referidas no art. 9º incluirão <b class='g1'>consulta ao CNPEP</b> entre seus procedimentos para cumprimento das obrigações dos arts. 10 e 11.",
    nota:"Art. 12-A incluído pela Lei 14.478/2022.", c:["lv12","lv13"] }]}
],
juris:[
{ id:"stf-ap863", trib:"STF", tipo:"AP", num:"AP 863/SP", sec:"crime", status:"vigente", data:"23/05/2017",
  titulo:"Lavagem na modalidade ocultação é crime permanente",
  texto:"A Primeira Turma reafirmou o caráter permanente da lavagem de dinheiro na modalidade ocultação (Info 866) e determinou a perda do mandato do parlamentar condenado em regime inicial fechado, a ser declarada pela Mesa.",
  explica:"Resumo do material de estudo; confira o acórdão.", lei:["l9613a1"], fonte:STFJ },
{ id:"stf-re389808", trib:"STF", tipo:"RE", num:"RE 389.808/PR", sec:"processo", status:"atencao", data:"15/12/2010 (confira)",
  titulo:"Sigilo bancário e acesso direto da Receita",
  texto:"O material de estudo cita o RE 389.808 para afirmar que o Coaf não pode quebrar sigilo bancário, devendo requerer dados protegidos por ordem judicial.",
  explica:"O RE 389.808 trata do acesso da Receita Federal a dados bancários; o tema de compartilhamento de relatórios do Coaf é o Tema 990 (RE 1.055.941). Confira o entendimento atual.", lei:["l9613a10"], fonte:STFJ },
{ id:"stf-adi4911", trib:"STF", tipo:"ADI", num:"ADI 4.911", sec:"processo", status:"vigente", data:"20/11/2020",
  titulo:"Afastamento automático do servidor indiciado é inconstitucional",
  texto:"O art. 17-D da Lei 9.613 (afastamento do servidor público indiciado) foi declarado inconstitucional: o afastamento exige demonstração, pela autoridade administrativa ou judicial, do risco da continuidade no cargo.",
  explica:"Resumo do material de estudo; confira o acórdão.", lei:["l9613a4"], fonte:STFJ }
],
cards:[
{ id:"lv1", tipo:"numero", sec:"crime", f:"Pena do crime de lavagem de dinheiro (art. 1º, caput)?",
  v:"<b>Reclusão de 3 a 10 anos e multa.</b>", lei:["l9613a1"] },
{ id:"lv2", tipo:"distincao", sec:"crime", f:"Quais fases a doutrina distingue na lavagem?",
  v:"<b>Colocação</b> (inserção no sistema), <b>ocultação/dissimulação</b> (camadas) e <b>integração</b> (valores voltam à economia). Não precisam ocorrer todas.", lei:["l9613a1"] },
{ id:"lv3", tipo:"distincao", sec:"crime", f:"Quais condutas equiparadas há no § 1º do art. 1º?",
  v:"<b>Converter em ativos lícitos</b>; adquirir/receber/trocar/negociar/guardar/movimentar/transferir; <b>importar ou exportar bens com valores não correspondentes</b>.", lei:["l9613a1p1"] },
{ id:"lv4", tipo:"caso", sec:"crime", f:"Quem participa de escritório sabendo que sua atividade é lavar dinheiro: qual crime?",
  v:"Art. 1º, § 2º, II: <b>participar de grupo, associação ou escritório</b> dirigido à prática de crimes da lei, com conhecimento.", lei:["l9613a1p1"] },
{ id:"lv5", tipo:"numero", sec:"crime", f:"Aumento de pena do § 4º e suas hipóteses?",
  v:"De <b>1 a 2/3</b> se reiterado, por organização criminosa ou com ativo virtual (confira a redação).", lei:["l9613a1p4"] },
{ id:"lv6", tipo:"distincao", sec:"crime", f:"Benefícios da colaboração espontânea na lavagem (§ 5º)?",
  v:"Redução de <b>1 a 2/3</b>, regime <b>aberto/semiaberto</b>, ou deixar de aplicar a pena/substituir por restritiva de direitos. § 6º permite <b>ação controlada e infiltração</b>.", lei:["l9613a1p4"] },
{ id:"lv7", tipo:"caso", sec:"crime", f:"Condenado por lavagem era diretor de instituição financeira. Efeito sobre o cargo?",
  v:"<b>Interdição</b> do cargo de diretor/conselho/gerência pelo <b>dobro</b> da pena privativa aplicada (art. 7º, II), e perda dos bens em favor da União.", lei:["l9613a7"] },
{ id:"lv8", tipo:"ce", sec:"processo", f:"(C/E) Só se processa lavagem se o autor da infração antecedente for condenado.",
  v:"<b>Errado.</b> O processo independe do antecedente; basta <b>indício suficiente</b> da infração antecedente, mesmo se o autor é desconhecido, isento de pena ou extinta a punibilidade (art. 2º, § 1º).", lei:["l9613a2"] },
{ id:"lv9", tipo:"distincao", sec:"processo", f:"Quando a lavagem é de competência da Justiça Federal?",
  v:"Quando praticada contra o <b>sistema financeiro e a ordem econômico-financeira</b>, ou contra bens e interesses da União, autarquias e empresas públicas; ou se a <b>infração antecedente</b> for federal.", lei:["l9613a2"] },
{ id:"lv10", tipo:"caso", sec:"processo", f:"O acusado pede liberação de bens bloqueados enviando só advogado, comprovando a origem lícita. Será conhecido?",
  v:"<b>Não</b>: o pedido exige <b>comparecimento pessoal</b> do acusado ou da interposta pessoa (art. 4º, § 3º). Mesmo com licitude, mantém-se o necessário para reparar danos, multas e custas.", lei:["l9613a4"] },
{ id:"lv11", tipo:"distincao", sec:"processo", f:"O que permite o art. 4º-B?",
  v:"<b>Suspender</b> ordem de prisão ou medidas assecuratórias, ouvido o MP, quando a execução imediata puder comprometer as investigações (ação controlada).", lei:["l9613a4b"] },
{ id:"lv12", tipo:"lacuna", sec:"processo", f:"Pessoas obrigadas devem identificar ____, registrar ____ acima do limite, adotar ____ internos e atender às requisições do ____.",
  v:"<b>Clientes</b>; <b>transações</b>; <b>controles</b>; <b>Coaf</b> (art. 10).", lei:["l9613a10"] },
{ id:"lv13", tipo:"ce", sec:"processo", f:"(C/E) O Coaf pode quebrar o sigilo bancário dos investigados por conta própria.",
  v:"<b>Errado.</b> Não tem competência para quebra de sigilo; dados protegidos exigem ordem judicial.", lei:["l9613a10"], j:["stf-re389808"] }
],
questoes:[]
};
})();
