/* Legislação Extravagante (X): Lei 8.137/1990 (ordem tributária, econômica e relações de consumo).
   Conferido em 25/10/2026. Texto legal do material de estudo PC-BA e de memória (confira no Planalto);
   base didática reescrita com palavras próprias. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "25/10/2026";
var STJJ = "https://scon.stj.jus.br/SCON/";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";

T.ext_tributario = {
meta:{ tema:"Lei 8.137/1990: crimes contra a ordem tributária, econômica e as relações de consumo", atualizado:AT,
  foco:"Arts. 1º e 2º (material × formal), SV 24, crimes funcionais (art. 3º), cartel (art. 4º), consumo (art. 7º), extinção da punibilidade pelo pagamento, delação e ação penal.",
  aviso:"Os efeitos de Refis/parcelamento (Leis 9.964/2000 e 10.684/2003) e o agravamento por imunidades constitucionais seguem o material de estudo; confira a redação vigente." },
secoes:[
{ id:"tributaria", titulo:"Ordem tributária (arts. 1º a 3º, 8º, 10, 11, 14 e 16)", curto:"Tributária",
  rapido:["<b>Art. 1º</b>: suprimir ou reduzir tributo ou contribuição social e acessórios por: omitir informação ou prestar declaração falsa ao Fisco; fraudar a fiscalização com elementos inexatos em livro/documento fiscal; falsificar nota fiscal e afins; elaborar, distribuir ou usar documento que sabe ou deve saber falso; negar/deixar de fornecer nota obrigatória ou fornecê-la irregular. <b>Reclusão de 2 a 5 anos</b> e multa.",
    "Incisos <b>I a IV</b> do art. 1º são <b>crimes materiais</b>: só se consumam com o <b>lançamento definitivo</b> (<b>SV 24</b>). O inciso <b>V</b> e todo o <b>art. 2º</b> são <b>formais</b>: dispensam o lançamento definitivo.",
    "<b>Art. 2º</b> (mesma natureza, porém <b>detenção de 6 meses a 2 anos</b> e multa): declaração falsa ou omissa de rendas, bens ou fatos para eximir-se de tributo; <b>deixar de recolher tributo descontado ou cobrado</b> (apropriação indébita tributária); exigir/pagar/receber percentagem sobre parcela dedutível de incentivo fiscal; não aplicar ou aplicar mal incentivo fiscal; usar ou divulgar programa de processamento de dados que permita contabilidade diversa da fornecida ao Fisco (“caixa dois” informatizado).",
    "Agravantes (<b>1/3 até 1/2</b>), só para particulares: grave dano à coletividade; crime cometido por servidor público no exercício da função; relação com prestação de serviços ou comércio de bens essenciais à vida ou à saúde; (segundo o material) bens ligados às imunidades do art. 150, VI, da CF.",
    "<b>Crimes funcionais (art. 3º)</b>, além dos do CP: (I) extraviar, sonegar ou inutilizar livro, processo ou documento fiscal que guarda, <b>acarretando pagamento indevido ou inexato</b> (reclusão 3 a 8 anos); (II) exigir, solicitar ou receber vantagem indevida, ou aceitar promessa, <b>para deixar de lançar ou cobrar tributo</b>, ou cobrar parcialmente (3 a 8); (III) <b>patrocinar interesse privado perante a administração fazendária</b> (1 a 4 anos).",
    "Multa (art. 8º): <b>10 a 360 dias-multa</b>; o juiz pode reduzir até a décima parte ou aumentar ao décuplo (art. 10) conforme ganho ilícito e situação econômica. Art. 11: responde quem concorre para o crime, <b>inclusive por meio de pessoa jurídica</b>, na medida da culpabilidade (dolo exigido).",
    "<b>Ação penal pública incondicionada</b>; qualquer pessoa pode provocar o MP por escrito (art. 16). Delação (parágrafo único do art. 16): confissão espontânea que revele <b>toda a trama</b>, redução de <b>1 a 2/3</b>. A representação fiscal só vai ao MP após <b>constituição definitiva do crédito</b> nos crimes materiais."],
  teoria:[
    { h:"Extinção da punibilidade e parcelamento", p:[
      "Segundo o material, o art. 14 (extinção pelo pagamento antes da denúncia) foi revogado em 1991, restabelecido em 1995 e, com a Lei 10.684/2003, o <b>pagamento integral</b> extingue a punibilidade <b>mesmo após o trânsito em julgado</b> (STJ, HC 362.478).",
      "Pelo Refis (Lei 9.964/2000), a pretensão punitiva fica <b>suspensa</b> se a empresa aderiu <b>antes do recebimento da denúncia</b>; leis posteriores admitem parcelamento a qualquer tempo. Pagamento integral do parcelado extingue a punibilidade. Confira a lei vigente.",
      "A apropriação indébita tributária (ICMS próprio ou por substituição declarado e não recolhido) é crime se comprovado o <b>dolo</b> (STJ, HC 399.109/SC); o STF também enfrenta o tema, exigindo contumácia e dolo (confira o RHC 163.334)."]}],
  pegadinhas:["Art. 1º, I a IV: <b>materiais</b> (SV 24). Art. 1º, V e art. 2º: <b>formais</b>.",
    "Art. 1º é <b>reclusão</b>; art. 2º é <b>detenção</b>.",
    "Agravante de servidor público vale para particulares; no art. 3º a condição já é elementar.",
    "Art. 3º tem só <b>três</b> incisos e sempre menciona tributo ou administração fazendária.",
    "Quem age sem dolo (mero executor sem ciência da fraude) não responde."] },
{ id:"economica", titulo:"Ordem econômica e relações de consumo (arts. 4º, 7º)", curto:"Econômica/consumo",
  rapido:["<b>Art. 4º</b> (reclusão <b>2 a 5 anos</b> e multa): abusar do poder econômico dominando o mercado ou eliminando a concorrência por ajuste de empresas; formar <b>acordo, convênio, ajuste ou aliança entre ofertantes</b> para fixar preços ou quantidades, controlar regionalmente o mercado ou controlar rede de distribuição/fornecedores em detrimento da concorrência (<b>cartel</b>).",
    "Cartel é crime de <b>mera conduta</b>: basta o ajuste. <b>Dumping</b>: não tem tipo específico hoje (o inciso I pode alcançar em casos concretos). <b>Monopólio</b> em si não é crime.",
    "<b>Art. 7º</b> (detenção <b>2 a 5 anos</b>, <b>ou multa</b>): favorecer comprador sem justa causa; vender mercadoria fora das prescrições legais; misturar gêneros; fraudar preços; elevar valor nas vendas a prazo por juros ilegais; sonegar insumos ou retê-los para especular; <b>induzir consumidor a erro</b> (inclusive por publicidade); destruir matéria-prima para provocar alta de preço; vender ou expor mercadoria <b>imprópria para consumo</b>.",
    "Admitem <b>modalidade culposa</b> apenas os incisos <b>II, III e IX</b> do art. 7º (detenção reduzida de 1/3 ou multa à quinta parte). Art. 7º, IX: crime formal, de perigo abstrato, mas exige <b>perícia</b> (STJ), pois deixa vestígios.",
    "Art. 11, parágrafo único: quando o preço é <b>estabelecido ou sugerido pelo fabricante</b>, o ato dele não alcança o distribuidor ou revendedor."],
  teoria:[
    { h:"Bens jurídicos", p:[
      "A ordem econômica busca assegurar existência digna e justiça social (CF, art. 173, §4º: repressão ao abuso do poder econômico). Nas relações de consumo o bem protegido é supraindividual e difuso (CF, art. 5º, XXXII)."]}],
  pegadinhas:["Cartel não exige que o grupo alcance o objetivo.",
    "Culposo só nos incisos <b>II, III e IX</b> do art. 7º.",
    "Art. 7º prevê pena de detenção <b>ou</b> multa (alternativa)."] }
],
lei:[
{ art:"Lei 8.137/1990, arts. 1º e 2º", nome:"Crimes de particulares contra a ordem tributária", sec:"tributaria", itens:[
  { id:"l8137a1", rot:"Art. 1º",
    t:"Constitui crime contra a ordem tributária <b class='g1'>suprimir ou reduzir tributo, ou contribuição social e qualquer acessório</b>, mediante as seguintes condutas: I - <b class='g1'>omitir informação, ou prestar declaração falsa</b> às autoridades fazendárias; II - <b class='g1'>fraudar a fiscalização</b> tributária, inserindo elementos inexatos, ou omitindo operação de qualquer natureza, em documento ou livro exigido pela lei fiscal; III - <b class='g1'>falsificar ou alterar</b> nota fiscal, fatura, duplicata, nota de venda, ou qualquer outro documento relativo à operação tributável; IV - <b class='g1'>elaborar, distribuir, fornecer, emitir ou utilizar</b> documento que saiba ou deva saber falso ou inexato; V - <b class='g1'>negar ou deixar de fornecer</b>, quando obrigatório, nota fiscal ou documento equivalente, relativa a venda de mercadoria ou prestação de serviço, efetivamente realizada, ou fornecê-la em desacordo com a legislação. Pena - reclusão de <b class='g2'>2 a 5 anos</b>, e multa.", c:["tb1","tb2"], j:["stf-sv24"] },
  { id:"l8137a2", rot:"Art. 2º",
    t:"Constitui crime da mesma natureza: I - fazer <b class='g1'>declaração falsa ou omitir declaração sobre rendas, bens ou fatos</b>, ou empregar outra fraude, para eximir-se, total ou parcialmente, de pagamento de tributo; II - <b class='g1'>deixar de recolher, no prazo legal, valor de tributo ou de contribuição social, descontado ou cobrado</b>, na qualidade de sujeito passivo de obrigação e que deveria recolher aos cofres públicos; III - exigir, pagar ou receber, para si ou para o contribuinte beneficiário, qualquer <b class='g1'>percentagem sobre a parcela dedutível</b> ou deduzida de imposto ou de contribuição como incentivo fiscal; IV - deixar de aplicar, ou aplicar em desacordo com o estatuído, <b class='g1'>incentivo fiscal</b> ou parcelas de imposto liberadas por órgão ou entidade de desenvolvimento; V - utilizar ou divulgar <b class='g1'>programa de processamento de dados</b> que permita ao sujeito passivo da obrigação tributária possuir informação contábil diversa daquela que é, por lei, fornecida à Fazenda Pública. Pena - <b class='g1'>detenção</b>, de <b class='g2'>6 meses a 2 anos</b>, e multa.", c:["tb3","tb4"], j:["stj-hc399109"] }]},
{ art:"Lei 8.137/1990, arts. 3º, 8º, 10, 11, 16", nome:"Crimes funcionais, multa, concurso e delação", sec:"tributaria", itens:[
  { id:"l8137a3", rot:"Art. 3º",
    t:"Constitui <b class='g1'>crime funcional</b> contra a ordem tributária, além dos previstos no Código Penal (Título XI, Capítulo I): I - <b class='g1'>extraviar</b> livro oficial, processo fiscal ou qualquer documento, de que tenha a guarda em razão da função; sonegá-lo, ou inutilizá-lo, total ou parcialmente, <b class='g1'>acarretando pagamento indevido ou inexato</b> de tributo ou contribuição social (pena de <b class='g2'>3 a 8 anos</b>, e multa); II - <b class='g1'>exigir, solicitar ou receber</b>, para si ou para outrem, direta ou indiretamente, ainda que fora da função ou antes de iniciar seu exercício, mas em razão dela, vantagem indevida; ou aceitar promessa de tal vantagem, <b class='g1'>para deixar de lançar ou cobrar tributo</b> ou contribuição social, ou cobrá-los parcialmente. Pena - reclusão, de <b class='g2'>3 a 8 anos</b>, e multa; III - <b class='g1'>patrocinar</b>, direta ou indiretamente, interesse privado perante a administração fazendária, valendo-se da qualidade de funcionário público. Pena - reclusão, de <b class='g2'>1 a 4 anos</b>, e multa.", c:["tb5","tb6"] },
  { id:"l8137a8", rot:"Arts. 8º e 10",
    t:"<b>Art. 8º</b> Nos crimes definidos nos arts. 1º a 3º, a pena de <b class='g1'>multa</b> será fixada entre <b class='g2'>10 e 360 dias-multa</b>, conforme seja necessário e suficiente para reprovação e prevenção do crime. Parágrafo único. O dia-multa será fixado pelo juiz em valor não inferior a 14 nem superior a 200 Bônus do Tesouro Nacional (BTN). <b>Art. 10</b> Caso o juiz, considerado o ganho ilícito e a situação econômica do réu, verifique a <b class='g1'>insuficiência ou excessiva onerosidade</b> das penas pecuniárias previstas nesta lei, poderá <b class='g1'>diminuí-las até a décima parte ou elevá-las ao décuplo</b>.", c:["tb7"] },
  { id:"l8137a11", rot:"Art. 11",
    t:"Quem, de qualquer modo, <b class='g1'>inclusive por meio de pessoa jurídica</b>, concorre para os crimes definidos nesta lei, incide nas penas a estes cominadas, <b class='g1'>na medida de sua culpabilidade</b>. Parágrafo único. Quando a venda ao consumidor for efetuada por sistema de entrega ao consumo ou por intermédio de outro em que o preço ao consumidor é estabelecido ou sugerido pelo fabricante ou concedente, o ato por este praticado <b class='g1'>não alcança o distribuidor ou revendedor</b>.", c:["tb8","tb16"] },
  { id:"l8137a16", rot:"Art. 16",
    t:"<b class='g1'>Qualquer pessoa</b> poderá provocar a iniciativa do Ministério Público nos crimes descritos nesta lei, fornecendo-lhe por escrito informações sobre o fato e a autoria, bem como indicando o tempo, o lugar e os elementos de convicção. Parágrafo único. Nos crimes previstos nesta Lei, cometidos em quadrilha ou coautoria, o coautor ou partícipe que através de <b class='g1'>confissão espontânea revelar à autoridade policial ou judicial toda a trama delituosa</b> terá a sua pena <b class='g2'>reduzida de um a dois terços</b>.", c:["tb9"] }]},
{ art:"Lei 8.137/1990, arts. 4º e 7º", nome:"Ordem econômica e relações de consumo", sec:"economica", itens:[
  { id:"l8137a4", rot:"Art. 4º",
    t:"Constitui crime contra a <b class='g1'>ordem econômica</b>: I - <b class='g1'>abusar do poder econômico</b>, dominando o mercado ou eliminando, total ou parcialmente, a concorrência mediante qualquer forma de ajuste ou acordo de empresas; II - formar <b class='g1'>acordo, convênio, ajuste ou aliança entre ofertantes</b>, visando: a) à fixação artificial de preços ou quantidades vendidas ou produzidas; b) ao controle regionalizado do mercado por empresa ou grupo de empresas; c) ao controle, em detrimento da concorrência, de rede de distribuição ou de fornecedores. Pena - reclusão, de <b class='g2'>2 a 5 anos</b> e multa.", c:["tb10","tb11"] },
  { id:"l8137a7", rot:"Art. 7º",
    t:"Constitui crime contra as <b class='g1'>relações de consumo</b>: I - favorecer ou preferir, sem justa causa, comprador ou freguês; II - vender ou expor à venda mercadoria cuja embalagem, tipo, especificação, peso ou composição esteja em desacordo com as prescrições legais; III - misturar gêneros e mercadorias de espécies diferentes, para vendê-los como puros; IV - fraudar preços (alteração sem modificação essencial, divisão ou junção de bens, aviso de insumo não empregado); V - elevar o valor cobrado nas vendas a prazo mediante comissão ou juros ilegais; VI - sonegar insumos ou bens, ou retê-los para especulação; VII - <b class='g1'>induzir o consumidor a erro</b> por indicação ou afirmação falsa ou enganosa, inclusive publicitária; VIII - destruir ou danificar matéria-prima ou mercadoria para provocar alta de preço; IX - vender, ter em depósito para vender ou expor à venda mercadoria em <b class='g1'>condições impróprias ao consumo</b>. Pena - <b class='g1'>detenção</b>, de <b class='g2'>2 a 5 anos</b>, <b class='g1'>ou multa</b>. Parágrafo único. Nas hipóteses dos incisos <b class='g2'>II, III e IX</b> pune-se a <b class='g1'>modalidade culposa</b>, reduzindo-se a pena de detenção de <b class='g2'>1/3</b> ou a de multa à <b class='g2'>quinta parte</b>.", c:["tb12","tb13","tb14","tb15"], j:["stj-hc412118"] }]}
],
juris:[
{ id:"stf-sv24", trib:"STF", tipo:"Súmula Vinculante", num:"SV 24", sec:"tributaria", status:"vigente", data:"02/12/2009",
  titulo:"Lançamento definitivo e crime material tributário",
  texto:"Não se tipifica crime material contra a ordem tributária, previsto no art. 1º, incisos I a IV, da Lei 8.137/90, antes do lançamento definitivo do tributo.",
  explica:"Não alcança o art. 1º, V, nem o art. 2º (crimes formais).", lei:["l8137a1"], fonte:STFJ },
{ id:"stj-hc399109", trib:"STJ", tipo:"HC", num:"HC 399.109/SC", sec:"tributaria", status:"atencao", data:"22/08/2018",
  titulo:"ICMS declarado e não recolhido (apropriação indébita tributária)",
  texto:"Não recolher ICMS em operações próprias ou em substituição tributária se enquadra no art. 2º, II, da Lei 8.137/90, desde que comprovado o dolo.",
  explica:"Resumo do material de estudo; o STF também julgou o tema (confira RHC 163.334).", lei:["l8137a2"], fonte:STJJ },
{ id:"stj-hc412118", trib:"STJ", tipo:"HC", num:"HC 412.118/SC", sec:"economica", status:"vigente", data:"19/12/2017",
  titulo:"Perícia na venda de mercadoria imprópria",
  texto:"O crime do art. 7º, IX, deixa vestígios materiais: é indispensável perícia para atestar a impropriedade do produto (CPP, art. 158); prazo de validade vencido ou falta de rótulo, sozinhos, não bastam.",
  explica:"Número transcrito do material de estudo (ali grafado “HC 4121180/SC”); confira o acórdão.", lei:["l8137a7"], fonte:STJJ }
],
cards:[
{ id:"tb1", tipo:"numero", sec:"tributaria", f:"Pena do art. 1º da Lei 8.137?", v:"Reclusão de <b>2 a 5 anos</b> e multa.", lei:["l8137a1"] },
{ id:"tb2", tipo:"distincao", sec:"tributaria", f:"Quais incisos do art. 1º são materiais e qual é formal?",
  v:"<b>I a IV</b>: materiais (exigem lançamento definitivo, SV 24). <b>V</b> (não fornecer nota): formal.", lei:["l8137a1"], j:["stf-sv24"] },
{ id:"tb3", tipo:"numero", sec:"tributaria", f:"Pena do art. 2º e natureza dos crimes?",
  v:"<b>Detenção</b> de 6 meses a 2 anos e multa; crimes <b>formais</b>.", lei:["l8137a2"] },
{ id:"tb4", tipo:"caso", sec:"tributaria", f:"Empresário cobra ICMS dos clientes e não repassa ao Estado. Crime?",
  v:"Art. 2º, II (apropriação indébita tributária), se comprovado o <b>dolo</b>.", lei:["l8137a2"], j:["stj-hc399109"] },
{ id:"tb5", tipo:"distincao", sec:"tributaria", f:"Quais crimes funcionais tem o art. 3º?",
  v:"Só três: extravio/sonegação/inutilização com pagamento indevido (3–8); vantagem indevida para deixar de lançar ou cobrar tributo (3–8); patrocínio de interesse privado perante a administração fazendária (1–4).", lei:["l8137a3"] },
{ id:"tb6", tipo:"distincao", sec:"tributaria", f:"Correspondência dos crimes do art. 3º com o CP?",
  v:"I ≈ art. 314 (com resultado); II ≈ concussão/corrupção passiva (finalidade de não lançar ou cobrar); III ≈ advocacia administrativa.", lei:["l8137a3"] },
{ id:"tb7", tipo:"numero", sec:"tributaria", f:"Faixa de multa e margem do juiz?",
  v:"<b>10 a 360 dias-multa</b>; pode reduzir até 1/10 ou aumentar ao <b>décuplo</b> (art. 10).", lei:["l8137a8"] },
{ id:"tb8", tipo:"caso", sec:"tributaria", f:"Assistente administrativo guarda pastas sem saber da fraude. Responde?",
  v:"<b>Não</b>: falta dolo. Respondem o diretor (autor), o contador ciente (coautor) e o consultor que ajuda dolosamente (partícipe).", lei:["l8137a11"] },
{ id:"tb9", tipo:"ce", sec:"tributaria", f:"(C/E) A ação penal nos crimes tributários depende de representação do Fisco.",
  v:"<b>Errado.</b> É pública incondicionada; qualquer pessoa pode provocar o MP. A representação fiscal só é enviada após o crédito definitivo (nos crimes materiais).", lei:["l8137a16"] },
{ id:"tb10", tipo:"numero", sec:"economica", f:"Pena do art. 4º (ordem econômica)?", v:"Reclusão de <b>2 a 5 anos</b> e multa.", lei:["l8137a4"] },
{ id:"tb11", tipo:"distincao", sec:"economica", f:"Cartel, dumping e monopólio: quais são crime?",
  v:"<b>Cartel</b>: sim (art. 4º, II; mera conduta). <b>Dumping</b>: sem tipo específico hoje. <b>Monopólio</b>: não é crime por si só.", lei:["l8137a4"] },
{ id:"tb12", tipo:"numero", sec:"economica", f:"Pena do art. 7º?", v:"Detenção de <b>2 a 5 anos</b>, <b>ou</b> multa.", lei:["l8137a7"] },
{ id:"tb13", tipo:"ce", sec:"economica", f:"(C/E) Todos os incisos do art. 7º admitem forma culposa.",
  v:"<b>Errado.</b> Só <b>II, III e IX</b>.", lei:["l8137a7"] },
{ id:"tb14", tipo:"caso", sec:"economica", f:"Mercadoria com validade vencida em depósito para venda. O que provar?",
  v:"Art. 7º, IX é crime formal de perigo abstrato, mas exige <b>perícia</b> sobre os produtos.", lei:["l8137a7"], j:["stj-hc412118"] },
{ id:"tb15", tipo:"numero", sec:"economica", f:"Redução da pena na forma culposa do art. 7º?", v:"Detenção reduzida de <b>1/3</b>; multa, à <b>quinta parte</b>.", lei:["l8137a7"] },
{ id:"tb16", tipo:"caso", sec:"economica", f:"Fabricante sugere o preço e pratica crime de consumo. O revendedor responde?",
  v:"<b>Não</b>: o ato do fabricante não alcança distribuidor ou revendedor (art. 11, parágrafo único).", lei:["l8137a11"] }
],
importancia:{ nivel:5,
  texto:"Cai muito pela distinção entre crimes materiais e formais (SV 24), pela diferença de pena entre os arts. 1º e 2º e pelo art. 7º, que admite culpa só em três incisos.",
  decore:[
    ["Art. 1º","<b>reclusão de 2 a 5 anos</b> e multa"],
    ["Art. 1º, I a IV","crimes <b>materiais</b>: exigem lançamento definitivo (<b>SV 24</b>)"],
    ["Art. 1º, V e art. 2º","crimes <b>formais</b>"],
    ["Art. 2º","<b>detenção de 6 meses a 2 anos</b> e multa"],
    ["Agravantes do art. 12","<b>1/3 até a metade</b>"],
    ["Crimes funcionais (art. 3º)","I e II: <b>3 a 8 anos</b>; III: <b>1 a 4 anos</b>"],
    ["Multa (art. 8º)","<b>10 a 360 dias-multa</b>; ao décuplo no art. 10"],
    ["Ordem econômica (art. 4º)","<b>reclusão de 2 a 5 anos</b> e multa"],
    ["Consumo (art. 7º)","<b>detenção de 2 a 5 anos ou multa</b>"],
    ["Culposo no art. 7º","só os incisos <b>II, III e IX</b>"],
    ["Delação (art. 16, parágrafo único)","redução de <b>1 a 2/3</b>"]],
  macetes:[
    ["Um é reclusão, dois é detenção","Art. 1º: reclusão (2 a 5). Art. 2º: detenção (6 meses a 2 anos)."],
    ["I a IV precisam do lançamento","Só o inciso V do art. 1º e o art. 2º dispensam o lançamento definitivo."],
    ["Culposo: dois, três e nove","Art. 7º, incisos II, III e IX."]] },
comparativo:{ titulo:"Art. 1º × art. 2º", head:["Art. 1º (supressão ou redução de tributo)","Art. 2º (condutas formais)"], rows:[
  ["<b>Pena:</b> reclusão de 2 a 5 anos e multa","<b>Pena:</b> detenção de 6 meses a 2 anos e multa"],
  ["<b>Natureza:</b> incisos I a IV materiais; inciso V formal","<b>Natureza:</b> formais, em regra"],
  ["<b>Lançamento definitivo:</b> exigido nos incisos I a IV (SV 24)","<b>Lançamento definitivo:</b> dispensado"],
  ["<b>Condutas:</b> omitir informação, declaração falsa, fraudar a fiscalização, falsificar nota, usar documento falso, negar nota","<b>Condutas:</b> declaração falsa para eximir-se, não recolher tributo descontado ou cobrado, desvio de incentivo fiscal, programa de contabilidade paralela"],
  ["<b>Resultado:</b> exige supressão ou redução do tributo (nos materiais)","<b>Resultado:</b> basta a conduta, sem exigência de dano"]]},
prova:[
  { tipo:"ce", enun:"Os crimes do art. 1º, incisos I a IV, da Lei 8.137/1990 são materiais e só se consumam com o lançamento definitivo do tributo, conforme a Súmula Vinculante 24.", gab:"Certo", com:"O inciso V (não fornecer nota) e o art. 2º são formais." },
  { tipo:"ce", enun:"O crime do art. 2º, II, da Lei 8.137/1990, deixar de recolher tributo descontado ou cobrado, é punido com reclusão de 2 a 5 anos.", gab:"Errado", com:"O art. 2º prevê detenção de 6 meses a 2 anos e multa." },
  { tipo:"ce", enun:"A ação penal nos crimes da Lei 8.137/1990 é pública incondicionada, podendo qualquer pessoa provocar o Ministério Público por escrito.", gab:"Certo", com:"Art. 16 da lei." },
  { tipo:"ce", enun:"Todos os incisos do art. 7º da Lei 8.137/1990 admitem forma culposa.", gab:"Errado", com:"Somente os incisos II, III e IX." },
  { tipo:"ce", enun:"O cartel previsto no art. 4º da Lei 8.137/1990 é crime de mera conduta, bastando o ajuste, sem necessidade de que o grupo alcance o objetivo.", gab:"Certo", com:"Basta o acordo entre ofertantes para fixar preços, quantidades ou controlar mercado." },
  { tipo:"caso", enun:"Um assistente administrativo, sem saber da fraude, apenas guardava documentos fiscais falsos da empresa. Responde pelo crime contra a ordem tributária?", com:"Não. Falta dolo, que é exigido no art. 11. Respondem os que concorreram dolosamente, como diretor, contador ciente e consultor." }],
resumo:[
  "<b>Art. 1º</b>: suprimir ou reduzir tributo por meios fraudulentos. Reclusão de 2 a 5 anos e multa.",
  "Incisos I a IV são <b>materiais</b> e exigem lançamento definitivo (SV 24). O inciso V e o art. 2º são <b>formais</b>.",
  "<b>Art. 2º</b>: detenção de 6 meses a 2 anos, com declaração falsa, apropriação indébita tributária e uso de contabilidade paralela.",
  "Agravantes de 1/3 até a metade (dano à coletividade, servidor, bens essenciais) para particulares.",
  "<b>Art. 3º</b>: três crimes funcionais ligados à administração fazendária; dois com reclusão de 3 a 8 anos e um com 1 a 4 anos.",
  "Ação penal pública incondicionada; delação reduz a pena de 1 a 2/3 se revelar toda a trama.",
  "<b>Art. 4º</b>: abuso de poder econômico e cartel, reclusão de 2 a 5 anos. Cartel é de mera conduta.",
  "<b>Art. 7º</b>: crimes contra as relações de consumo, detenção de 2 a 5 anos ou multa. Culposo só nos incisos II, III e IX."],
checklist:[
  "Pena e condutas do art. 1º",
  "Diferença entre crime material e formal e a SV 24",
  "Pena e condutas do art. 2º",
  "Agravantes e seus limites",
  "Os três crimes funcionais do art. 3º",
  "Multa e margem de ajuste do juiz",
  "Ação penal e delação",
  "Elementos do cartel e sua natureza de mera conduta",
  "Condutas do art. 7º e pena alternativa",
  "Incisos do art. 7º que admitem culpa",
  "A exigência de dolo para quem concorre (art. 11)"],
questoes:[]
};
})();
