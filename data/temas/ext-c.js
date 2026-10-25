/* Legislação Extravagante (III): Leis 9.099/1995 e 10.259/2001 (Juizados Especiais Criminais).
   Conferido em 25/10/2026. Texto legal transcrito do material de estudo PC-BA (Legislação Penal e Processual Extravagante) e de memória; marcado "confira" onde há dúvida.
   Base didática reescrita com estrutura e palavras próprias. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "25/10/2026";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

T.ext_jecrim = {
meta:{ tema:"Leis 9.099/1995 e 10.259/2001: Juizados Especiais Criminais", atualizado:AT,
  foco:"Infração de menor potencial ofensivo (conceito); princípios; competência; termo circunstanciado; composição dos danos; transação penal; denúncia oral e audiência; recursos; suspensão condicional do processo; diferenças em relação ao ANPP; Juizado Federal.",
  aviso:"Teoria extraída do material de estudo; a violência doméstica contra a mulher afasta a Lei 9.099 (Lei 11.340, art. 41), regra que o material não detalha." },
secoes:[
{ id:"conceito", titulo:"Conceito, princípios e competência", curto:"Conceito",
  rapido:["<b>Infração de menor potencial ofensivo</b>: contravenções penais e crimes com <b>pena máxima não superior a 2 anos</b>, cumulada ou não com multa (Lei 9.099, art. 61; mesma regra para o JECRIM Federal, Lei 10.259, art. 2º). Contravenção penal <b>não</b> vai ao Juizado Federal.",
    "Princípios (art. 62): <b>oralidade, simplicidade, informalidade, economia processual e celeridade</b>, buscando a <b>reparação dos danos</b> e a pena <b>não privativa de liberdade</b>.",
    "Atos são válidos se atingem a finalidade; <b>não há nulidade sem prejuízo</b> (art. 65). Atos em outras comarcas podem ser solicitados por qualquer meio hábil (sem carta precatória).",
    "<b>Citação sempre pessoal</b> (no Juizado ou por mandado), <b>sem edital</b>: não encontrado o acusado, os autos vão ao juízo comum (art. 66)."],
  teoria:[
    { h:"Juizado e conciliação", p:[
      "Previsto no art. 98, I, da Constituição, o Juizado tem competência para conciliar, julgar e executar infrações de menor potencial ofensivo, respeitadas conexão e continência. Conciliadores são auxiliares recrutados preferencialmente entre bacharéis em Direito; juiz leigo auxilia, mas o poder decisório é do juiz togado.",
      "Reunido o processo no juízo comum ou no júri por conexão ou continência, devem ser observadas a transação penal e a composição dos danos (Lei 10.259, art. 2º, parágrafo único)."]},
    { h:"Intimações e prazos", p:[
      "Intimação por correspondência com aviso de recebimento pessoal, entrega ao encarregado da recepção (pessoa jurídica) ou por oficial de justiça, independentemente de mandado ou precatória, ou ainda por qualquer meio idôneo. Dos atos praticados em audiência, as partes consideram-se cientes de imediato (art. 67)."]}],
  pegadinhas:["Infração de menor potencial: pena máxima <b>até 2 anos</b>, não mínima.",
    "No Juizado <b>não há citação por edital</b>.",
    "O Juizado Federal Criminal <b>não julga contravenções</b>, mesmo contra a União."] },

{ id:"fase-preliminar", titulo:"Fase preliminar: TCO, composição e transação penal", curto:"Fase preliminar",
  rapido:["A autoridade policial lavra o <b>termo circunstanciado de ocorrência (TCO)</b>, em vez de inquérito, e o encaminha ao Juizado com autor e vítima, requisitando exames periciais (art. 69). Quem se compromete a comparecer ou é encaminhado ao Juizado <b>não é preso em flagrante</b> nem paga fiança.",
    "Na <b>audiência preliminar</b>, o juiz esclarece a composição dos danos e a proposta de pena não privativa. A <b>composição</b> homologada tem eficácia de título executivo civil e, em crime de ação <b>privada</b> ou <b>pública condicionada</b>, importa <b>renúncia</b> ao direito de queixa ou representação.",
    "<b>Transação penal</b> (art. 76): proposta pelo <b>MP</b> (não pelo juiz), de pena restritiva de direitos ou multa, em ação pública incondicionada ou com representação. <b>Não cabe</b> se o autor foi condenado a pena privativa de liberdade por sentença definitiva, se foi beneficiado por transação nos <b>últimos 5 anos</b> ou se os antecedentes, a conduta social e a personalidade indicarem que não é necessária e suficiente.",
    "Em ação pública <b>condicionada</b>, não havendo composição, a vítima é intimada para representar em <b>30 dias</b> (sob pena de decadência), segundo o material de estudo."],
  teoria:[
    { h:"TCO e quem o lavra", p:[
      "Não há inquérito no rito do Juizado. A doutrina admite que o TCO seja lavrado por outras forças de segurança (PM, PRF), e não apenas pela polícia judiciária."]},
    { h:"Transação penal em ação privada", p:[
      "A jurisprudência e a doutrina majoritárias entendem que na ação privada a proposta cabe ao <b>ofendido</b> (querelante), não ao MP nem ao juiz."]}],
  pegadinhas:["Transação penal é <b>proposta do MP</b>, não do juiz.",
    "Composição homologada em ação <b>pública incondicionada</b> não impede a ação penal.",
    "Prazo de reincidência da transação: <b>5 anos</b>."] },

{ id:"procedimento", titulo:"Procedimento sumaríssimo, recursos e sursis processual", curto:"Procedimento",
  rapido:["Frustradas a composição e a transação, o MP oferece <b>denúncia oral</b> (art. 77) imediatamente, salvo se houver diligências imprescindíveis ou causa complexa (nesse caso os autos vão ao juízo comum).",
    "Na <b>audiência de instrução e julgamento</b>: nova tentativa de conciliação; ouve-se a defesa sobre o recebimento; depois vítima, testemunhas, <b>interrogatório</b>, debates e sentença, <b>tudo no mesmo ato</b>.",
    "Cabe <b>apelação</b> (não RESE) contra a rejeição da denúncia e a sentença, julgada por <b>turma recursal</b> de três juízes (art. 82).",
    "<b>Suspensão condicional do processo</b> (art. 89): crimes com <b>pena mínima igual ou inferior a 1 ano</b>, proposta pelo MP ao oferecer a denúncia; período de prova de <b>2 a 4 anos</b>; o acusado não pode estar sendo processado nem ter condenação por outro crime. Condições: reparar o dano, não frequentar certos lugares, não se ausentar da comarca sem autorização e comparecer mensalmente em juízo."],
  teoria:[
    { h:"Revogação da suspensão", p:[
      "Revoga-se se, no prazo, o beneficiário é processado por <b>outro crime</b> ou não repara o dano sem motivo justificado (obrigatória). Pode ser revogada se for processado por <b>contravenção</b> ou descumprir outra condição (facultativa)."]},
    { h:"Comparação com o ANPP", p:[
      "O material compara casos: pena mínima de até 1 ano admite <b>sursis processual</b> (inclusive em crimes com violência, como lesão corporal grave de pena mínima de 1 ano); o <b>ANPP</b> (CPP, art. 28-A) exige pena máxima não superior a 4 anos e crime sem violência ou grave ameaça. Crime de pena mínima acima de 1 ano e máxima acima de 2 é de <b>médio potencial</b> e fica fora do Juizado."]},
    { h:"Condução coercitiva", p:[
      "O art. 80 da Lei 9.099 prevê condução coercitiva de quem deva comparecer, mas o STF considerou inconstitucional a condução do investigado ou réu para interrogatório (ADPF 395 e 444); testemunhas e vítimas continuam sujeitas."]}],
  pegadinhas:["Sursis processual: pena <b>mínima</b> de até 1 ano; Juizado: pena <b>máxima</b> de até 2 anos.",
    "Rejeição da denúncia no Juizado: <b>apelação</b>, não RESE.",
    "A turma recursal reúne <b>três juízes</b> do primeiro grau."] }
],
lei:[
{ art:"Lei 9.099/1995, arts. 60 a 69", nome:"Competência, princípios e termo circunstanciado", sec:"conceito", itens:[
  { id:"l9099a60", rot:"Art. 60",
    t:"O Juizado Especial Criminal, provido por juízes togados ou togados e leigos, tem competência para a <b class='g1'>conciliação, o julgamento e a execução</b> das infrações penais de menor potencial ofensivo, respeitadas as regras de <b class='g3'>conexão e continência</b>.",
    c:["jc1"] },
  { id:"l9099a62", rot:"Art. 62",
    t:"O processo perante o Juizado Especial orientar-se-á pelos critérios da <b class='g1'>oralidade, simplicidade, informalidade, economia processual e celeridade</b>, objetivando, sempre que possível, a <b class='g1'>reparação dos danos</b> sofridos pela vítima e a aplicação de <b class='g1'>pena não privativa de liberdade</b>.",
    c:["jc2"] },
  { id:"l9099a65", rot:"Art. 65",
    t:"Os atos processuais serão válidos sempre que preencherem as finalidades para as quais foram realizados, atendidos os critérios indicados no art. 62 desta Lei. § 1º <b class='g3'>Não se pronunciará qualquer nulidade sem que tenha havido prejuízo</b>. § 2º A prática de atos processuais em outras comarcas poderá ser solicitada por qualquer meio hábil de comunicação." },
  { id:"l9099a66", rot:"Art. 66",
    t:"A citação será <b class='g1'>pessoal</b> e far-se-á no próprio Juizado, sempre que possível, ou por mandado. Parágrafo único. Não encontrado o acusado para ser citado, o Juiz encaminhará as peças existentes ao <b class='g3'>Juízo comum</b> para adoção do procedimento previsto em lei.",
    c:["jc3"] },
  { id:"l9099a69", rot:"Art. 69",
    t:"A autoridade policial que tomar conhecimento da ocorrência lavrará <b class='g1'>termo circunstanciado</b> e o encaminhará imediatamente ao Juizado, com o autor do fato e a vítima, providenciando-se as requisições dos exames periciais necessários. Parágrafo único. Ao autor do fato que, após a lavratura do termo, for imediatamente encaminhado ao juizado ou assumir o compromisso de a ele comparecer, <b class='g3'>não se imporá prisão em flagrante, nem se exigirá fiança</b>. Em caso de violência doméstica, o juiz poderá determinar, como medida de cautela, seu afastamento do lar, domicílio ou local de convivência com a vítima.",
    c:["jc4"] }]},
{ art:"Lei 9.099/1995, arts. 72 a 82", nome:"Composição, transação penal e procedimento", sec:"fase-preliminar", itens:[
  { id:"l9099a72", rot:"Art. 72",
    t:"Na <b class='g1'>audiência preliminar</b>, presente o representante do Ministério Público, o autor do fato e a vítima e, se possível, o responsável civil, acompanhados por seus advogados, o Juiz esclarecerá sobre a possibilidade da <b class='g1'>composição dos danos</b> e da aceitação da proposta de aplicação imediata de <b class='g1'>pena não privativa de liberdade</b>.",
    nota:"Art. 74, parágrafo único: a homologação da composição, em ação privada ou pública condicionada, importa renúncia ao direito de queixa ou representação.", c:["jc5"] },
  { id:"l9099a76", rot:"Art. 76",
    t:"Havendo representação ou tratando-se de crime de ação penal pública incondicionada, não sendo caso de arquivamento, o <b class='g1'>Ministério Público</b> poderá propor a aplicação imediata de pena <b class='g1'>restritiva de direitos ou multas</b>, a ser especificada na proposta. [...] § 2º <b class='g3'>Não se admitirá a proposta</b> se ficar comprovado: I – ter sido o autor da infração condenado, pela prática de crime, à pena privativa de liberdade, por sentença definitiva; II – ter sido o agente beneficiado anteriormente, no prazo de <b class='g2'>cinco anos</b>, pela aplicação de pena restritiva ou multa, nos termos deste artigo; III – não indicarem os antecedentes, a conduta social e a personalidade do agente, bem como os motivos e as circunstâncias, ser necessária e suficiente a adoção da medida.",
    nota:"Texto resumido.", c:["jc6","jc7"] },
  { id:"l9099a77", rot:"Art. 77",
    t:"Na ação penal de iniciativa pública, quando não houver aplicação de pena, pela ausência do autor do fato, ou pela não ocorrência da hipótese prevista no art. 76 desta Lei, o Ministério Público oferecerá ao Juiz, de imediato, <b class='g1'>denúncia oral</b>, se não houver necessidade de diligências imprescindíveis.",
    c:["jc8"] },
  { id:"l9099a82", rot:"Art. 82",
    t:"Da decisão de <b class='g1'>rejeição da denúncia ou queixa</b> e da sentença caberá <b class='g1'>apelação</b>, que poderá ser julgada por <b class='g2'>turma composta de três Juízes</b> em exercício no primeiro grau de jurisdição, reunidos na sede do Juizado.",
    c:["jc9"] }]},
{ art:"Lei 9.099/1995, art. 89", nome:"Suspensão condicional do processo", sec:"procedimento", itens:[
  { id:"l9099a89", rot:"Art. 89",
    t:"Nos crimes em que a <b class='g2'>pena mínima cominada for igual ou inferior a um ano</b>, abrangidas ou não por esta Lei, o Ministério Público, ao oferecer a denúncia, poderá propor a <b class='g1'>suspensão do processo</b>, por <b class='g2'>dois a quatro anos</b>, desde que o acusado <b class='g3'>não esteja sendo processado ou não tenha sido condenado por outro crime</b>, presentes os demais requisitos que autorizariam a suspensão condicional da pena. § 1º [...] I – reparação do dano, salvo impossibilidade de fazê-lo; II – proibição de frequentar determinados lugares; III – proibição de ausentar-se da comarca onde reside, sem autorização do Juiz; IV – comparecimento pessoal e obrigatório a juízo, mensalmente. § 3º A suspensão será <b class='g1'>revogada</b> se, no curso do prazo, o beneficiário vier a ser processado por outro crime ou não efetuar, sem motivo justificado, a reparação do dano. § 4º A suspensão <b class='g3'>poderá ser revogada</b> se o acusado vier a ser processado, no curso do prazo, por contravenção, ou descumprir qualquer outra condição imposta.",
    nota:"Texto resumido.", c:["jc10","jc11"] }]},
{ art:"Lei 10.259/2001, art. 2º", nome:"Juizado Especial Federal Criminal", sec:"conceito", itens:[
  { id:"l10259a2", rot:"Art. 2º",
    t:"Compete ao <b class='g1'>Juizado Especial Federal Criminal</b> processar e julgar os feitos de competência da Justiça Federal relativos às <b class='g1'>infrações de menor potencial ofensivo</b>, respeitadas as regras de conexão e continência. Parágrafo único. Na reunião de processos, perante o juízo comum ou o tribunal do júri, decorrente da aplicação das regras de conexão e continência, observar-se-ão os institutos da <b class='g3'>transação penal e da composição dos danos civis</b>.",
    nota:"O conceito de menor potencial ofensivo na esfera federal acompanha o do art. 61 da Lei 9.099 (pena máxima até 2 anos).", c:["jc12"] }]}
],
juris:[
{ id:"stf-adpf395-jec", trib:"STF", tipo:"ADPF", num:"ADPF 395 e 444", sec:"procedimento", status:"vigente", data:"14/06/2018",
  titulo:"Condução coercitiva para interrogatório",
  texto:"Segundo o material de estudo, o STF declarou inconstitucional a condução coercitiva de investigado ou réu para interrogatório; a vedação não alcança testemunhas ou vítimas.",
  explica:"Atinge o art. 80 da Lei 9.099 quanto ao acusado.", lei:["l9099a77"], fonte:STFJ }
],
cards:[
{ id:"jc1", tipo:"numero", sec:"conceito", f:"O que é infração de menor potencial ofensivo?",
  v:"<b>Contravenções</b> e crimes com <b>pena máxima não superior a 2 anos</b>, com ou sem multa.", lei:["l9099a60"] },
{ id:"jc2", tipo:"lacuna", sec:"conceito", f:"Princípios do Juizado: oralidade, simplicidade, ___, economia processual e celeridade.",
  v:"<b>informalidade</b> (art. 62).", lei:["l9099a62"] },
{ id:"jc3", tipo:"ce", sec:"conceito", f:"(C/E) No Juizado Especial Criminal admite-se a citação por edital quando o acusado não é encontrado.",
  v:"<b>Errado.</b> A citação é pessoal; não encontrado o acusado, as peças vão ao juízo comum (art. 66).", lei:["l9099a66"] },
{ id:"jc4", tipo:"caso", sec:"fase-preliminar", f:"Em briga de bar com lesão leve, o autor assume o compromisso de comparecer ao Juizado. Pode ser preso em flagrante?",
  v:"<b>Não.</b> Lavra-se o TCO e, assumido o compromisso, não há prisão em flagrante nem fiança (art. 69, parágrafo único).", lei:["l9099a69"] },
{ id:"jc5", tipo:"caso", sec:"fase-preliminar", f:"Em crime de ação pública condicionada, a composição dos danos é homologada. O que acontece com o direito de representar?",
  v:"A homologação importa <b>renúncia</b> ao direito de representação; se o autor não pagar, a vítima só executa o título cível.", lei:["l9099a72"] },
{ id:"jc6", tipo:"ce", sec:"fase-preliminar", f:"(C/E) O juiz pode propor a transação penal de ofício quando o MP não o faz.",
  v:"<b>Errado.</b> A transação penal é proposta pelo Ministério Público (art. 76).", lei:["l9099a76"] },
{ id:"jc7", tipo:"numero", sec:"fase-preliminar", f:"Em quanto tempo uma nova transação penal fica vedada após a anterior?",
  v:"<b>5 anos</b> (art. 76, § 2º, II).", lei:["l9099a76"] },
{ id:"jc8", tipo:"distincao", sec:"procedimento", f:"Não havendo conciliação nem transação, o que faz o MP?",
  v:"Oferece <b>denúncia oral</b> (art. 77), se não houver necessidade de diligências imprescindíveis.", lei:["l9099a77"] },
{ id:"jc9", tipo:"ce", sec:"procedimento", f:"(C/E) Da rejeição da denúncia no Juizado cabe recurso em sentido estrito.",
  v:"<b>Errado.</b> Cabe <b>apelação</b>, julgada por turma de três juízes (art. 82).", lei:["l9099a82"] },
{ id:"jc10", tipo:"numero", sec:"procedimento", f:"Requisito de pena e prazo da suspensão condicional do processo.",
  v:"Pena <b>mínima</b> igual ou inferior a <b>1 ano</b>; período de prova de <b>2 a 4 anos</b> (art. 89).", lei:["l9099a89"] },
{ id:"jc11", tipo:"distincao", sec:"procedimento", f:"Revogação obrigatória × facultativa da suspensão condicional do processo.",
  v:"<b>Obrigatória</b>: processado por outro crime ou não repara o dano sem motivo. <b>Facultativa</b>: processado por contravenção ou descumpre outra condição.", lei:["l9099a89"] },
{ id:"jc12", tipo:"ce", sec:"conceito", f:"(C/E) O Juizado Especial Federal Criminal julga contravenções penais que atinjam bens da União.",
  v:"<b>Errado.</b> Contravenção não é da competência da Justiça Federal; o JEF Criminal julga infrações de menor potencial ofensivo federais.", lei:["l10259a2"] },
{ id:"jc13", tipo:"distincao", sec:"procedimento", f:"Sursis processual × ANPP: critério de pena.",
  v:"<b>Sursis</b>: pena <b>mínima</b> ≤ 1 ano (pode haver violência). <b>ANPP</b>: pena <b>máxima</b> ≤ 4 anos e sem violência ou grave ameaça.", lei:[] }
],
questoes:[]
};
})();
