/* Direito Constitucional (V): sistema tributário e finanças públicas; ordem econômica e social.
   Conferido em 14/10/2026. Texto: CF/88 (Planalto), com EC 132/2023 (Reforma Tributária) e EC 96/2017. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var STFSV = "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=26";
var STFRG = "https://portal.stf.jus.br/jurisprudenciaRepercussao/pesquisarProcesso.asp";

/* ======================= SISTEMA TRIBUTÁRIO E ORÇAMENTO ======================= */
T.sistema_tributario_orcamento = {
meta:{ tema:"Sistema tributário e finanças públicas (arts. 145 a 169)", atualizado:AT,
  foco:"Espécies tributárias; limitações ao poder de tributar (legalidade, isonomia, irretroatividade, anterioridades e exceções, não confisco) e imunidades (SV 52 e 57); Reforma Tributária (EC 132/2023: IBS, CBS, Imposto Seletivo e transição); PPA, LDO e LOA, prazos, exclusividade, créditos e vedações orçamentárias.",
  aviso:"A transição da Reforma Tributária vai de 2026 a 2033 e está regulamentada pela LC 214/2025. Para carreiras policiais, a cobrança costuma ser conceitual — confira detalhes de alíquotas na legislação." },
secoes:[
{ id:"limitacoes", titulo:"Espécies e limitações ao poder de tributar", curto:"Limitações",
  rapido:["Espécies (teoria pentapartida): <b>impostos, taxas, contribuições de melhoria, empréstimos compulsórios e contribuições especiais</b>. Empréstimo compulsório: só a <b>União</b>, por <b>lei complementar</b> (calamidade, guerra ou investimento urgente e relevante).",
    "<b>Legalidade</b>: tributo só se cria ou aumenta por lei. <b>Irretroatividade</b>: não alcança fatos geradores anteriores. <b>Anterioridade anual</b>: não cobra no mesmo exercício da lei. <b>Noventena</b>: só após 90 dias da publicação. <b>Não confisco</b>.",
    "Fora das duas anterioridades: <b>II, IE, IOF</b>, empréstimo compulsório de guerra/calamidade e imposto extraordinário de guerra. Só fora da anual: <b>IPI</b>. Só fora da noventena: <b>IR</b> e fixação da <b>base de cálculo de IPVA e IPTU</b>.",
    "Contribuições para a seguridade social: só <b>noventena</b> (art. 195, §6º). Mudar o prazo de recolhimento não se sujeita à anterioridade (SV 50)."],
  teoria:[
    { h:"Imunidades (art. 150, VI)", p:[
      "<b>Recíproca</b>: entes não cobram impostos uns dos outros sobre patrimônio, renda ou serviços (estende-se a autarquias e fundações; empresas públicas prestadoras de serviço público exclusivo, como os Correios, também).",
      "<b>Religiosa</b>: entidades religiosas e templos de qualquer culto, <b>inclusive suas organizações assistenciais e beneficentes</b> (EC 132/2023).",
      "<b>Subjetivas</b>: partidos e fundações, sindicatos de <b>trabalhadores</b>, instituições de educação e de assistência social sem fins lucrativos. Imóvel delas alugado a terceiros continua imune ao IPTU se a renda for aplicada nas finalidades (SV 52).",
      "<b>Objetivas</b>: livros, jornais, periódicos e o papel destinado à impressão — inclusive <b>livro eletrônico e e-readers</b> (SV 57); fonogramas e videofonogramas musicais brasileiros.",
      "Imunidade afasta <b>impostos</b>, não taxas nem contribuições (salvo previsão específica)."]}],
  quadro:{ titulo:"Exceções às anterioridades (as clássicas)", head:["Tributo","Anual","Noventena"], rows:[
    ["II, IE, IOF","Não se aplica","Não se aplica"],
    ["Empréstimo compulsório (guerra/calamidade) e imposto extraordinário de guerra","Não se aplica","Não se aplica"],
    ["IPI","Não se aplica","Aplica-se"],
    ["IR","Aplica-se","Não se aplica"],
    ["Base de cálculo de IPVA e IPTU","Aplica-se","Não se aplica"],
    ["Contribuições da seguridade social","Não se aplica","Aplica-se"]]},
  pegadinhas:["Sindicato <b>patronal</b> não tem imunidade (só o de trabalhadores).","Imunidade é para <b>impostos</b>.","IR respeita a anterioridade anual, mas não a noventena."]},
{ id:"reforma", titulo:"Reforma Tributária (EC 132/2023)", curto:"Reforma",
  rapido:["Cria o <b>IVA dual</b>: <b>CBS</b> (Contribuição sobre Bens e Serviços — União) e <b>IBS</b> (Imposto sobre Bens e Serviços — Estados, DF e Municípios, gerido por um <b>Comitê Gestor</b>), com a mesma base, não cumulatividade ampla e cobrança no <b>destino</b>.",
    "Substituem <b>PIS, Cofins e IPI</b> (CBS; IPI mantido só para proteger a Zona Franca de Manaus) e <b>ICMS e ISS</b> (IBS).",
    "<b>Imposto Seletivo</b> (art. 153, VIII): sobre bens e serviços <b>prejudiciais à saúde ou ao meio ambiente</b>.",
    "Transição: testes a partir de <b>2026</b>; CBS plena e fim de PIS/Cofins em <b>2027</b>; redução gradual de ICMS e ISS de <b>2029 a 2032</b>; sistema novo pleno em <b>2033</b> (LC 214/2025)."],
  teoria:[
    { h:"Outras mudanças", p:[
      "Cashback (devolução de tributo a famílias de baixa renda), cesta básica nacional com alíquota zero, regimes diferenciados (saúde, educação, transporte coletivo etc.).",
      "IPVA passa a poder incidir sobre veículos aquáticos e aéreos (com exceções) e ter alíquotas diferenciadas por impacto ambiental; ITCMD progressivo e devido ao Estado do domicílio do falecido.",
      "Imunidade religiosa ampliada às organizações assistenciais e beneficentes das entidades religiosas."]}],
  pegadinhas:["CBS é federal; IBS é subnacional (compartilhado).","Imposto Seletivo não é o \"IVA\": é um imposto extrafiscal sobre produtos nocivos."]},
{ id:"orcamento", titulo:"Orçamento público", curto:"Orçamento",
  rapido:["Leis de iniciativa do <b>Executivo</b>: <b>PPA</b> (diretrizes, objetivos e metas para 4 anos), <b>LDO</b> (metas e prioridades do exercício seguinte, orienta a LOA) e <b>LOA</b> (orçamentos <b>fiscal, de investimento das estatais e da seguridade social</b>).",
    "Prazos federais (ADCT, art. 35, §2º): PPA — envio até 4 meses antes do fim do 1º exercício do mandato (31/8) e devolução até o fim da sessão legislativa; <b>LDO</b> — envio até 8 meses e meio antes do fim do exercício (<b>15/4</b>) e devolução até o fim do 1º período (<b>17/7</b>); <b>LOA</b> — envio até 4 meses antes (<b>31/8</b>) e devolução até o fim da sessão legislativa (<b>22/12</b>).",
    "<b>Princípio da exclusividade</b>: a LOA só trata de receita e despesa, admitidas autorização de créditos suplementares e de operações de crédito, inclusive por ARO.",
    "<b>Crédito extraordinário</b>: só para despesas <b>imprevisíveis e urgentes</b> (guerra, comoção interna, calamidade), por <b>medida provisória</b> na União."],
  teoria:[
    { h:"Vedações e despesa com pessoal", p:[
      "Vedada a vinculação de receita de <b>impostos</b> a órgão, fundo ou despesa, salvo as exceções constitucionais (saúde, educação, repartições, garantias etc.).",
      "Regra de ouro: operações de crédito não podem exceder as despesas de capital, salvo autorização por maioria absoluta do Legislativo.",
      "Despesa com pessoal limitada por LC (LRF). Excedido o limite: corta-se ao menos 20% dos comissionados e funções de confiança, depois os não estáveis e, por fim, servidores estáveis (art. 169, §§3º e 4º), com indenização.",
      "Emendas parlamentares individuais são de execução obrigatória até o limite constitucional (impositivas), metade em saúde."]}],
  pegadinhas:["Crédito extraordinário é por MP; suplementar e especial dependem de lei.","Mnemônico das datas federais: LDO 15/4 → 17/7; LOA 31/8 → 22/12."]}
],
lei:[
{ art:"CF, art. 150", nome:"Limitações ao poder de tributar", sec:"limitacoes", itens:[
  { id:"cf150", rot:"Art. 150, I a IV", t:"Sem prejuízo de outras garantias asseguradas ao contribuinte, é vedado à União, aos Estados, ao Distrito Federal e aos Municípios:<br>I - exigir ou aumentar tributo <b class='g1'>sem lei que o estabeleça</b>;<br>II - instituir <b class='g1'>tratamento desigual</b> entre contribuintes que se encontrem em situação equivalente (...);<br>III - cobrar tributos: a) em relação a fatos geradores ocorridos <b class='g1'>antes do início da vigência da lei</b> que os houver instituído ou aumentado; b) <b class='g1'>no mesmo exercício financeiro</b> em que haja sido publicada a lei que os instituiu ou aumentou; c) antes de decorridos <b class='g2'>noventa dias</b> da data em que haja sido publicada a lei que os instituiu ou aumentou, observado o disposto na alínea b;<br>IV - utilizar tributo com <b class='g1'>efeito de confisco</b>;", c:["tb1","tb2"], j:["stf-sv50"] },
  { id:"cf150vi", rot:"Art. 150, VI", t:"VI - instituir <b class='g1'>impostos</b> sobre:<br>a) patrimônio, renda ou serviços, <b class='g1'>uns dos outros</b>;<br>b) <b class='g1'>entidades religiosas e templos de qualquer culto, inclusive suas organizações assistenciais e beneficentes</b>;<br>c) patrimônio, renda ou serviços dos <b class='g1'>partidos políticos</b>, inclusive suas fundações, das <b class='g1'>entidades sindicais dos trabalhadores</b>, das <b class='g1'>instituições de educação e de assistência social, sem fins lucrativos</b>, atendidos os requisitos da lei;<br>d) <b class='g1'>livros, jornais, periódicos e o papel</b> destinado a sua impressão;<br>e) <b class='g1'>fonogramas e videofonogramas musicais produzidos no Brasil</b> (...).", nota:"Alínea b com redação da EC 132/2023.", novo:true, c:["tb3","tb4","tb5"], j:["stf-sv52","stf-sv57"] }]},
{ art:"CF, arts. 165 e 167", nome:"Orçamento", sec:"orcamento", itens:[
  { id:"cf165", rot:"Art. 165, caput e §8º", t:"Leis de <b class='g1'>iniciativa do Poder Executivo</b> estabelecerão: I - o <b class='g1'>plano plurianual</b>; II - as <b class='g1'>diretrizes orçamentárias</b>; III - os <b class='g1'>orçamentos anuais</b>.<br>(...)<br>§ 8º A lei orçamentária anual <b class='g3'>não conterá dispositivo estranho à previsão da receita e à fixação da despesa</b>, não se incluindo na proibição a autorização para abertura de créditos suplementares e contratação de operações de crédito, ainda que por antecipação de receita, nos termos da lei.", c:["tb6","tb7"] },
  { id:"cf167p3", rot:"Art. 167, §3º", t:"A abertura de <b class='g1'>crédito extraordinário</b> somente será admitida para atender a despesas <b class='g1'>imprevisíveis e urgentes</b>, como as decorrentes de <b class='g1'>guerra, comoção interna ou calamidade pública</b>, observado o disposto no art. 62.", c:["tb8"] }]}
],
juris:[
{ id:"stf-sv50", trib:"STF", tipo:"Súmula Vinculante", num:"SV 50", sec:"limitacoes", status:"vigente", data:"17/06/2015",
  titulo:"Prazo de recolhimento e anterioridade",
  texto:"Norma legal que altera o prazo de recolhimento de obrigação tributária não se sujeita ao princípio da anterioridade.",
  explica:"Antecipar o vencimento não é instituir nem aumentar tributo.", lei:["cf150"], fonte:STFSV },
{ id:"stf-sv52", trib:"STF", tipo:"Súmula Vinculante", num:"SV 52", sec:"limitacoes", status:"vigente", data:"18/06/2015",
  titulo:"Imóvel de entidade imune alugado a terceiros",
  texto:"Ainda quando alugado a terceiros, permanece imune ao IPTU o imóvel pertencente a qualquer das entidades referidas pelo art. 150, VI, c, da Constituição Federal, desde que o valor dos aluguéis seja aplicado nas atividades para as quais tais entidades foram constituídas.",
  explica:"O que importa é a destinação da renda às finalidades essenciais.", lei:["cf150vi"], fonte:STFSV },
{ id:"stf-sv57", trib:"STF", tipo:"Súmula Vinculante", num:"SV 57", sec:"limitacoes", status:"vigente", data:"15/04/2020",
  titulo:"Livro eletrônico é imune",
  texto:"A imunidade tributária constante do art. 150, VI, d, da CF/88 aplica-se à importação e comercialização, no mercado interno, do livro eletrônico (e-book) e dos suportes exclusivamente utilizados para fixá-los, como leitores de livros eletrônicos (e-readers), ainda que possuam funcionalidades acessórias.",
  explica:"Interpretação evolutiva da imunidade cultural; tablets de uso geral não estão incluídos.", lei:["cf150vi"], fonte:STFSV }
],
cards:[
{ id:"tb1", tipo:"caso", sec:"limitacoes", f:"Lei publicada em 10/12 aumenta o IPTU. Quando pode ser cobrado o aumento?", v:"Precisa respeitar a anual <b>e</b> a noventena: só a partir de <b>10/03</b> do ano seguinte (90 dias). Se a lei só alterasse a <b>base de cálculo</b> do IPTU, bastaria o 1º de janeiro.", lei:["cf150"] },
{ id:"tb2", tipo:"caso", sec:"limitacoes", f:"Decreto antecipa o vencimento de um tributo para o mês seguinte. Viola a anterioridade?", v:"<b>Não</b> — SV 50.", lei:["cf150"], j:["stf-sv50"] },
{ id:"tb3", tipo:"caso", sec:"limitacoes", f:"Igreja aluga um imóvel e usa o aluguel em suas atividades. Paga IPTU?", v:"<b>Não</b> — a imunidade alcança a renda aplicada nas finalidades essenciais (raciocínio da SV 52; templos têm imunidade própria).", lei:["cf150vi"], j:["stf-sv52"] },
{ id:"tb4", tipo:"caso", sec:"limitacoes", f:"Kindle (leitor de e-book) é imune a impostos?", v:"<b>Sim</b> — SV 57.", lei:["cf150vi"], j:["stf-sv57"] },
{ id:"tb5", tipo:"ce", sec:"limitacoes", f:"Certo ou errado: sindicatos patronais têm imunidade de impostos.", v:"<b>Errado.</b> Só as entidades sindicais <b>dos trabalhadores</b>.", lei:["cf150vi"] },
{ id:"tb6", tipo:"numero", sec:"orcamento", f:"Prazos federais de envio e devolução da LDO e da LOA.", v:"<b>LDO</b>: envio 15/4, devolução 17/7. <b>LOA</b>: envio 31/8, devolução 22/12.", lei:["cf165"] },
{ id:"tb7", tipo:"caso", sec:"orcamento", f:"LOA traz artigo que altera regras de licenciamento ambiental. Válido?", v:"<b>Não</b> — princípio da <b>exclusividade</b> (art. 165, §8º).", lei:["cf165"] },
{ id:"tb8", tipo:"caso", sec:"orcamento", f:"Calamidade pública exige gasto imediato não previsto. Instrumento federal?", v:"<b>Crédito extraordinário</b>, aberto por <b>medida provisória</b> (art. 167, §3º).", lei:["cf167p3"] },
{ id:"tb9", tipo:"distincao", sec:"reforma", f:"CBS × IBS × Imposto Seletivo.", v:"<b>CBS</b>: federal, substitui PIS/Cofins. <b>IBS</b>: estadual/municipal, substitui ICMS e ISS. <b>IS</b>: federal, extrafiscal, sobre bens nocivos à saúde ou ao meio ambiente.", lei:[] }
],
importancia:{ nivel:3,
  texto:"Para carreiras policiais a cobrança é mais conceitual: limitações ao poder de tributar, imunidades (com as súmulas vinculantes), as novidades da Reforma Tributária e os prazos e vedações do orçamento.",
  decore:[
    ["Espécies tributárias (pentapartida)","impostos, taxas, contribuição de melhoria, empréstimo compulsório e contribuições especiais"],
    ["Empréstimo compulsório","só a <b>União</b>, por <b>lei complementar</b>"],
    ["Noventena","<b>90 dias</b> após a publicação da lei"],
    ["Fora das duas anterioridades","<b>II, IE, IOF</b>, compulsório de guerra ou calamidade e imposto extraordinário de guerra"],
    ["IPI","respeita a noventena, mas não a anterioridade anual"],
    ["IR","respeita a anual, mas não a noventena"],
    ["SV 52","imóvel de entidade imune, alugado, continua imune ao IPTU se a renda for aplicada nas finalidades"],
    ["SV 57","imunidade cultural alcança o <b>e-book</b> e o e-reader"],
    ["Reforma: IVA dual","<b>CBS</b> (federal) e <b>IBS</b> (Estados, DF e Municípios); Imposto Seletivo"],
    ["Prazos federais","LDO: <b>15/4</b> e <b>17/7</b>; LOA: <b>31/8</b> e <b>22/12</b>"]],
  macetes:[
    ["IPI e IR trocam de lugar","IPI: só a noventena. IR: só a anual. Os dois quase sempre aparecem juntos na pegadinha."],
    ["Imunidade é para imposto","Taxas e contribuições não são afastadas pela imunidade do art. 150, VI, salvo previsão específica."],
    ["Sindicato: só o de trabalhadores","A imunidade das entidades sindicais não vale para sindicato patronal."],
    ["Crédito extraordinário é por MP","Despesa imprevisível e urgente (guerra, comoção, calamidade) usa medida provisória. Suplementar e especial dependem de lei."]] },
comparativo:{ titulo:"Anterioridade anual × noventena", head:["Anterioridade anual","Noventena (anterioridade nonagesimal)"], rows:[
  ["<b>Regra:</b> o tributo não pode ser cobrado no mesmo exercício financeiro da lei que o instituiu ou aumentou","<b>Regra:</b> o tributo não pode ser cobrado antes de 90 dias da publicação da lei"],
  ["<b>Base:</b> art. 150, III, b","<b>Base:</b> art. 150, III, c"],
  ["<b>Não se aplica a:</b> II, IE, IOF, compulsório de guerra ou calamidade, extraordinário de guerra e IPI","<b>Não se aplica a:</b> II, IE, IOF, compulsório de guerra ou calamidade, extraordinário de guerra, IR e base de cálculo de IPVA e IPTU"],
  ["<b>IPI:</b> exceção à anual","<b>IPI:</b> sujeito à noventena"],
  ["<b>IR:</b> sujeito à anual","<b>IR:</b> exceção à noventena"],
  ["<b>Contribuições da seguridade:</b> não se aplica","<b>Contribuições da seguridade:</b> aplica-se (art. 195, § 6º)"]]},
prova:[
  { tipo:"ce", enun:"O empréstimo compulsório só pode ser instituído pela União, por meio de lei complementar.", gab:"Certo", com:"É a regra para o empréstimo compulsório: competência da União e lei complementar, nas hipóteses constitucionais." },
  { tipo:"ce", enun:"Lei que antecipa o prazo de recolhimento de um tributo submete-se ao princípio da anterioridade.", gab:"Errado", com:"SV 50: alterar o prazo de recolhimento da obrigação tributária não se sujeita à anterioridade." },
  { tipo:"ce", enun:"A imunidade tributária referente a livros, jornais e periódicos alcança o livro eletrônico e os suportes exclusivamente utilizados para fixá-lo.", gab:"Certo", com:"SV 57. Tablets de uso geral, porém, não foram incluídos." },
  { tipo:"ce", enun:"A lei orçamentária anual pode conter dispositivos estranhos à previsão da receita e à fixação da despesa, desde que aprovados por maioria absoluta.", gab:"Errado", com:"Princípio da exclusividade (art. 165, § 8º). Admitem-se apenas a autorização para créditos suplementares e para operações de crédito, inclusive por antecipação de receita." },
  { tipo:"caso", enun:"Uma lei publicada em 10 de dezembro aumenta a alíquota do IPI. A partir de quando a cobrança é possível?", com:"O IPI não respeita a anterioridade anual, mas respeita a noventena. Logo, só após 90 dias da publicação, já no ano seguinte." },
  { tipo:"caso", enun:"Uma calamidade pública exige despesa imediata e imprevisível da União. Qual instrumento orçamentário é adequado?", com:"Crédito extraordinário, aberto por medida provisória (art. 167, § 3º, c/c art. 62)." }],
resumo:[
  "As espécies tributárias são <b>cinco</b>: impostos, taxas, contribuição de melhoria, empréstimo compulsório e contribuições especiais.",
  "Princípios: <b>legalidade</b>, <b>isonomia</b>, <b>irretroatividade</b>, <b>anterioridade anual</b>, <b>noventena</b> e <b>não confisco</b>.",
  "II, IE e IOF escapam das duas anterioridades. O <b>IPI</b> só da anual. O <b>IR</b> e a base de cálculo de IPVA e IPTU só da noventena.",
  "Imunidades (art. 150, VI) alcançam <b>impostos</b>: recíproca, religiosa, partidos, sindicatos de trabalhadores, educação e assistência sem fins lucrativos, livros e fonogramas brasileiros.",
  "SV 52: aluguel aplicado nas finalidades preserva a imunidade ao IPTU. SV 57: e-book é imune. SV 50: prazo de recolhimento não exige anterioridade.",
  "Reforma Tributária: <b>CBS</b> (federal) e <b>IBS</b> (subnacional) substituem PIS, Cofins, ICMS e ISS; <b>Imposto Seletivo</b> incide sobre bens nocivos à saúde ou ao meio ambiente.",
  "A transição vai de <b>2026 a 2033</b> (LC 214/2025).",
  "PPA, LDO e LOA são de iniciativa do <b>Executivo</b>. A LOA obedece à <b>exclusividade</b>.",
  "Crédito extraordinário atende a despesas <b>imprevisíveis e urgentes</b> e, na União, vem por medida provisória."],
checklist:[
  "As cinco espécies tributárias e quem institui o empréstimo compulsório",
  "Diferença entre anterioridade anual e noventena",
  "Tributos que escapam de cada anterioridade (II, IE, IOF, IPI, IR)",
  "Quais imunidades existem e a quem se aplicam",
  "Conteúdo das SV 50, SV 52 e SV 57",
  "O que a Reforma Tributária criou e o que substituiu",
  "Função do Imposto Seletivo",
  "Diferença entre PPA, LDO e LOA",
  "Prazos federais da LDO e da LOA",
  "Princípio da exclusividade e crédito extraordinário"],
questoes:[]
};

/* ======================= ORDEM ECONÔMICA E SOCIAL ======================= */
T.ordem_economica_social = {
meta:{ tema:"Ordem econômica e ordem social (arts. 170 a 232)", atualizado:AT,
  foco:"Princípios da ordem econômica; Estado empresário; política urbana e usucapião constitucional; seguridade social (saúde, previdência, assistência — BPC); educação; comunicação social; meio ambiente e responsabilidade penal da pessoa jurídica; família, criança, adolescente, jovem e idoso; indígenas e marco temporal." },
secoes:[
{ id:"economica", titulo:"Ordem econômica e política urbana", curto:"Econômica",
  rapido:["Fundamentos: <b>valorização do trabalho humano e livre iniciativa</b>; fim: existência digna conforme a justiça social.",
    "Princípios (art. 170): soberania nacional, propriedade privada, função social da propriedade, <b>livre concorrência</b>, defesa do consumidor, defesa do meio ambiente, redução das desigualdades, busca do pleno emprego, tratamento favorecido às empresas de pequeno porte. Livre exercício de atividade econômica <b>independentemente de autorização</b>, salvo casos em lei.",
    "Exploração direta de atividade econômica pelo Estado: só por <b>imperativos da segurança nacional</b> ou <b>relevante interesse coletivo</b> (art. 173), com regime de empresa privada.",
    "Usucapião <b>urbana</b> (art. 183): até <b>250 m²</b>, <b>5 anos</b>, ininterrupta e sem oposição, para moradia, sem ser dono de outro imóvel, <b>uma única vez</b>. <b>Rural</b> (art. 191): até <b>50 hectares</b>, 5 anos, tornada produtiva. <b>Imóveis públicos não são usucapidos</b>."],
  teoria:[
    { h:"Desapropriações especiais", p:[
      "Urbana sancionatória (art. 182, §4º): solo não edificado ou subutilizado — parcelamento compulsório, IPTU progressivo no tempo e, por fim, desapropriação paga com <b>títulos da dívida pública</b>.",
      "Reforma agrária (art. 184): imóvel rural que não cumpre a função social, pago em <b>títulos da dívida agrária</b> (benfeitorias úteis e necessárias em dinheiro); pequena e média propriedade (se o dono não tiver outra) e propriedade produtiva são insuscetíveis.",
      "Expropriação <b>sem indenização</b> (art. 243): culturas ilegais de psicotrópicos e exploração de <b>trabalho escravo</b>."]}],
  pegadinhas:["Usucapião urbana: <b>250 m²</b>; rural: <b>50 ha</b> — ambas com 5 anos.","Monopólio do petróleo é da União, que pode contratar empresas estatais ou privadas (art. 177, §1º)."]},
{ id:"social", titulo:"Seguridade, educação e comunicação", curto:"Seguridade",
  rapido:["Seguridade social = <b>saúde + previdência + assistência</b>. <b>Saúde</b>: direito de todos e dever do Estado, acesso universal e igualitário (SUS). <b>Previdência</b>: contributiva e de filiação obrigatória. <b>Assistência</b>: a quem dela necessitar, <b>independentemente de contribuição</b>.",
    "<b>BPC</b> (art. 203, V): <b>um salário mínimo</b> mensal à <b>pessoa com deficiência</b> e ao <b>idoso</b> que comprovem não ter meios de se manter ou de ser mantidos pela família.",
    "Educação básica obrigatória e gratuita dos <b>4 aos 17 anos</b> (art. 208, I); acesso ao ensino obrigatório é direito público subjetivo.",
    "Comunicação: vedada toda censura de natureza <b>política, ideológica e artística</b> (art. 220, §2º); empresa jornalística e de radiodifusão: brasileiros natos ou naturalizados há mais de <b>10 anos</b>."],
  teoria:[
    { h:"Saúde e Judiciário", p:[
      "O STF fixou critérios para o fornecimento judicial de medicamentos (incorporados ou não ao SUS, registro na Anvisa, competência e custeio entre os entes) — a solidariedade dos entes convive com o direcionamento do cumprimento.",
      "A saúde é livre à iniciativa privada, que participa do SUS de forma complementar (preferência às entidades filantrópicas e sem fins lucrativos)."]}],
  pegadinhas:["Assistência social não exige contribuição; previdência exige.","Censura política, ideológica e artística é vedada; classificação indicativa é permitida."]},
{ id:"grupos", titulo:"Meio ambiente, família, criança, idoso e indígenas", curto:"Proteções",
  rapido:["Meio ambiente ecologicamente equilibrado: <b>bem de uso comum do povo</b>; dever do Poder Público <b>e da coletividade</b>, para as presentes e futuras gerações. Infratores, <b>pessoas físicas ou jurídicas</b>, respondem penal e administrativamente, além de reparar o dano.",
    "Patrimônio nacional (art. 225, §4º): <b>Floresta Amazônica, Mata Atlântica, Serra do Mar, Pantanal Mato-Grossense e Zona Costeira</b> (Cerrado e Caatinga não constam).",
    "Criança, adolescente e jovem: <b>absoluta prioridade</b> (art. 227); a lei punirá severamente o abuso, a violência e a exploração sexual; filhos de qualquer origem têm <b>os mesmos direitos</b>. Menores de 18: <b>inimputáveis</b> (art. 228). Maiores de <b>65</b>: gratuidade no transporte coletivo urbano.",
    "Indígenas: reconhecidos sua organização social, costumes, línguas e os <b>direitos originários</b> sobre as terras que tradicionalmente ocupam, bens da <b>União</b>, de posse permanente e usufruto exclusivo das riquezas do solo, rios e lagos."],
  teoria:[
    { h:"Temas de jurisprudência", p:[
      "Responsabilidade penal da pessoa jurídica por crime ambiental <b>independe</b> da responsabilização simultânea de pessoa física (RE 548.181 — fim da \"dupla imputação\").",
      "Vaquejada: o STF a julgou inconstitucional (ADI 4.983); a EC 96/2017 passou a não considerar cruéis as práticas desportivas com animais que sejam manifestações culturais registradas, regulamentadas por lei (art. 225, §7º).",
      "Marco temporal indígena: o STF rejeitou a tese (RE 1.017.365, Tema 1.031, 2023); o Congresso aprovou a Lei 14.701/2023 adotando-a, e a matéria voltou ao STF — confira o estado atual."]}],
  pegadinhas:["Cerrado não é patrimônio nacional no art. 225, §4º.","Terras indígenas são bens da <b>União</b>, com posse permanente dos índios.","PJ pode ser punida por crime ambiental mesmo sem pessoa física denunciada."]}
],
lei:[
{ art:"CF, arts. 170, 173 e 183", nome:"Ordem econômica", sec:"economica", itens:[
  { id:"cf170", rot:"Art. 170", t:"A ordem econômica, fundada na <b class='g1'>valorização do trabalho humano e na livre iniciativa</b>, tem por fim assegurar a todos existência digna, conforme os ditames da justiça social, observados os seguintes princípios: I - soberania nacional; II - propriedade privada; III - função social da propriedade; IV - <b class='g1'>livre concorrência</b>; V - <b class='g1'>defesa do consumidor</b>; VI - defesa do meio ambiente (...); VII - redução das desigualdades regionais e sociais; VIII - busca do pleno emprego; IX - tratamento favorecido para as empresas de pequeno porte constituídas sob as leis brasileiras e que tenham sua sede e administração no País.<br>Parágrafo único. É assegurado a todos o livre exercício de qualquer atividade econômica, <b class='g1'>independentemente de autorização</b> de órgãos públicos, <b class='g3'>salvo nos casos previstos em lei</b>.", c:["oe_1"] },
  { id:"cf183", rot:"Art. 183", t:"Aquele que possuir como sua área urbana de até <b class='g2'>duzentos e cinqüenta metros quadrados</b>, por <b class='g2'>cinco anos</b>, ininterruptamente e sem oposição, utilizando-a para sua <b class='g1'>moradia</b> ou de sua família, adquirir-lhe-á o domínio, desde que <b class='g3'>não seja proprietário de outro imóvel urbano ou rural</b>.<br>(...)<br>§ 2º Esse direito não será reconhecido ao mesmo possuidor <b class='g3'>mais de uma vez</b>.<br>§ 3º Os <b class='g1'>imóveis públicos não serão adquiridos por usucapião</b>.", c:["oe_2","oe_3"] }]},
{ art:"CF, arts. 196 e 203", nome:"Saúde e assistência", sec:"social", itens:[
  { id:"cf196", rot:"Art. 196; art. 203, V", t:"Art. 196. A saúde é <b class='g1'>direito de todos e dever do Estado</b>, garantido mediante políticas sociais e econômicas que visem à redução do risco de doença e de outros agravos e ao <b class='g1'>acesso universal e igualitário</b> às ações e serviços para sua promoção, proteção e recuperação.<br>Art. 203. A assistência social será prestada a quem dela necessitar, <b class='g1'>independentemente de contribuição</b> à seguridade social, e tem por objetivos: (...) V - a garantia de <b class='g2'>um salário mínimo</b> de benefício mensal à <b class='g1'>pessoa portadora de deficiência e ao idoso</b> que comprovem não possuir meios de prover à própria manutenção ou de tê-la provida por sua família, conforme dispuser a lei.", c:["oe_4"] }]},
{ art:"CF, arts. 225, 227 e 228", nome:"Meio ambiente, criança e adolescente", sec:"grupos", itens:[
  { id:"cf225", rot:"Art. 225, caput e §§3º e 4º", t:"Todos têm direito ao <b class='g1'>meio ambiente ecologicamente equilibrado</b>, bem de uso comum do povo e essencial à sadia qualidade de vida, impondo-se ao Poder Público e à coletividade o dever de defendê-lo e preservá-lo para as <b class='g1'>presentes e futuras gerações</b>.<br>(...)<br>§ 3º As condutas e atividades consideradas lesivas ao meio ambiente sujeitarão os infratores, <b class='g1'>pessoas físicas ou jurídicas, a sanções penais e administrativas</b>, independentemente da obrigação de reparar os danos causados.<br>§ 4º A <b class='g1'>Floresta Amazônica brasileira, a Mata Atlântica, a Serra do Mar, o Pantanal Mato-Grossense e a Zona Costeira</b> são patrimônio nacional, e sua utilização far-se-á, na forma da lei, dentro de condições que assegurem a preservação do meio ambiente, inclusive quanto ao uso dos recursos naturais.", c:["oe_5","oe_6"], j:["stf-re548181"] },
  { id:"cf227", rot:"Art. 227, caput e §§4º e 6º; art. 228", t:"Art. 227. É dever da família, da sociedade e do Estado assegurar à criança, ao adolescente e ao jovem, com <b class='g1'>absoluta prioridade</b>, o direito à vida, à saúde, à alimentação, à educação, ao lazer, à profissionalização, à cultura, à dignidade, ao respeito, à liberdade e à convivência familiar e comunitária, além de colocá-los a salvo de toda forma de negligência, discriminação, exploração, violência, crueldade e opressão.<br>(...)<br>§ 4º A lei punirá severamente o <b class='g1'>abuso, a violência e a exploração sexual</b> da criança e do adolescente.<br>(...)<br>§ 6º Os filhos, havidos ou não da relação do casamento, ou por adoção, terão os <b class='g1'>mesmos direitos e qualificações</b>, proibidas quaisquer designações discriminatórias relativas à filiação.<br>Art. 228. São <b class='g1'>penalmente inimputáveis os menores de dezoito anos</b>, sujeitos às normas da legislação especial.", c:["oe_7","oe_8"] }]}
],
juris:[
{ id:"stf-re548181", trib:"STF", tipo:"Precedente (1ª Turma)", num:"RE 548.181", sec:"grupos", status:"vigente", data:"06/08/2013",
  titulo:"Responsabilidade penal da pessoa jurídica sem dupla imputação",
  texto:"O art. 225, §3º, da Constituição não condiciona a responsabilização penal da pessoa jurídica por crimes ambientais à simultânea persecução penal da pessoa física em tese responsável no âmbito da empresa.",
  explica:"O STJ, que exigia a dupla imputação, alinhou-se ao STF.", lei:["cf225"], fonte:STFJ },
{ id:"stf-t1031", trib:"STF", tipo:"Repercussão geral", num:"RE 1.017.365 (Tema 1.031)", sec:"grupos", status:"atencao", data:"27/09/2023",
  titulo:"Marco temporal das terras indígenas",
  texto:"A proteção constitucional aos direitos originários sobre as terras que tradicionalmente ocupam independe da existência de um marco temporal em 5 de outubro de 1988 ou da configuração do renitente esbulho.",
  explica:"Após a decisão, a Lei 14.701/2023 adotou o marco temporal e voltou a ser questionada no STF. Confira o desfecho antes da prova.", lei:["cf227"], fonte:STFRG }
],
cards:[
{ id:"oe_1", tipo:"ce", sec:"economica", f:"Certo ou errado: o livre exercício de atividade econômica depende sempre de autorização de órgãos públicos.", v:"<b>Errado.</b> Independe de autorização, salvo nos casos previstos em lei.", lei:["cf170"] },
{ id:"oe_2", tipo:"caso", sec:"economica", f:"Família mora há 6 anos, sem oposição, em terreno urbano de 300 m² e não tem outro imóvel. Usucapião constitucional?", v:"<b>Não</b> pela via do art. 183: limite de <b>250 m²</b> (pode haver outras modalidades do Código Civil).", lei:["cf183"] },
{ id:"oe_3", tipo:"caso", sec:"economica", f:"Ocupante de terreno público há 20 anos pode usucapir?", v:"<b>Não</b> — imóveis públicos não são adquiridos por usucapião.", lei:["cf183"] },
{ id:"oe_4", tipo:"caso", sec:"social", f:"Idoso de baixa renda que nunca contribuiu ao INSS tem direito a algum benefício?", v:"<b>BPC</b> de 1 salário mínimo (assistência social, independe de contribuição), se comprovar não ter meios de se manter.", lei:["cf196"] },
{ id:"oe_5", tipo:"caso", sec:"grupos", f:"Empresa é denunciada por crime ambiental sem que nenhum diretor seja denunciado. Pode prosseguir?", v:"<b>Sim</b> (RE 548.181): não se exige dupla imputação.", lei:["cf225"], j:["stf-re548181"] },
{ id:"oe_6", tipo:"lacuna", sec:"grupos", f:"Patrimônio nacional (art. 225, §4º): Floresta Amazônica, Mata ______, Serra do ______, ______ Mato-Grossense e Zona ______.", v:"<b>Atlântica</b>; <b>Mar</b>; <b>Pantanal</b>; <b>Costeira</b>.", lei:["cf225"] },
{ id:"oe_7", tipo:"caso", sec:"grupos", f:"Lei estadual trata o filho adotivo com direitos sucessórios menores que os do biológico. Constitucional?", v:"<b>Não</b> — igualdade entre filhos (art. 227, §6º).", lei:["cf227"] },
{ id:"oe_8", tipo:"ce", sec:"grupos", f:"Certo ou errado: a inimputabilidade penal dos menores de 18 está prevista na Constituição.", v:"<b>Certo</b> (art. 228), além do CP, art. 27.", lei:["cf227"] }
],
importancia:{ nivel:4,
  texto:"Meio ambiente (responsabilidade penal da pessoa jurídica), criança e adolescente (absoluta prioridade, inimputabilidade), usucapião constitucional e seguridade social são os trechos mais cobrados desta parte da Constituição.",
  decore:[
    ["Fundamentos da ordem econômica","<b>valorização do trabalho humano</b> e <b>livre iniciativa</b>"],
    ["Usucapião urbana (art. 183)","até <b>250 m²</b>, <b>5 anos</b>, moradia, uma única vez"],
    ["Usucapião rural (art. 191)","até <b>50 hectares</b>, <b>5 anos</b>, tornada produtiva"],
    ["Imóveis públicos","<b>não</b> se adquirem por usucapião"],
    ["BPC","<b>1 salário mínimo</b> ao idoso e à pessoa com deficiência, sem contribuição"],
    ["Educação básica obrigatória","dos <b>4 aos 17 anos</b>"],
    ["Patrimônio nacional (art. 225, § 4º)","Amazônia, Mata Atlântica, Serra do Mar, Pantanal e Zona Costeira"],
    ["Pessoa jurídica","responde penalmente por crime ambiental, <b>sem dupla imputação</b> (RE 548.181)"],
    ["Inimputabilidade","menores de <b>18 anos</b> (art. 228)"],
    ["Terras indígenas","bens da <b>União</b>; posse permanente e usufruto exclusivo dos índios"]],
  macetes:[
    ["250 urbano, 50 rural, 5 anos nos dois","Mesmo prazo e tetos diferentes: 250 m² na cidade e 50 hectares no campo."],
    ["Assistência não cobra, previdência cobra","Assistência social independe de contribuição. Previdência é contributiva e de filiação obrigatória."],
    ["Cerrado e Caatinga ficam de fora","O art. 225, § 4º não lista esses biomas, embora sejam protegidos pela legislação."],
    ["Prioridade é absoluta","Criança, adolescente e jovem têm absoluta prioridade, dever compartilhado entre família, sociedade e Estado."]] },
comparativo:{ titulo:"Usucapião urbana × usucapião rural", head:["Usucapião urbana (art. 183)","Usucapião rural (art. 191)"], rows:[
  ["<b>Área:</b> até 250 m²","<b>Área:</b> até 50 hectares"],
  ["<b>Prazo:</b> 5 anos, ininterruptos e sem oposição","<b>Prazo:</b> 5 anos, ininterruptos e sem oposição"],
  ["<b>Finalidade:</b> moradia própria ou da família","<b>Finalidade:</b> tornar a terra produtiva pelo trabalho e ter nela sua moradia"],
  ["<b>Restrição:</b> não ser proprietário de outro imóvel urbano ou rural; direito não reconhecido mais de uma vez ao mesmo possuidor","<b>Restrição:</b> não ser proprietário de imóvel rural ou urbano"],
  ["<b>Imóveis públicos:</b> não se adquirem por usucapião (§ 3º)","<b>Imóveis públicos:</b> não se adquirem por usucapião (parágrafo único)"]]},
prova:[
  { tipo:"ce", enun:"O livre exercício de qualquer atividade econômica é assegurado independentemente de autorização de órgãos públicos, salvo nos casos previstos em lei.", gab:"Certo", com:"Parágrafo único do art. 170." },
  { tipo:"ce", enun:"Os imóveis públicos podem ser adquiridos por usucapião quando a posse for mansa e pacífica por mais de vinte anos.", gab:"Errado", com:"Art. 183, § 3º: imóveis públicos não serão adquiridos por usucapião." },
  { tipo:"ce", enun:"A responsabilização penal da pessoa jurídica por crime ambiental depende da simultânea persecução penal de uma pessoa física responsável.", gab:"Errado", com:"No RE 548.181 o STF afastou a exigência de dupla imputação, e o STJ se alinhou." },
  { tipo:"ce", enun:"O Cerrado e a Caatinga integram o rol de patrimônio nacional do art. 225, § 4º, da Constituição Federal.", gab:"Errado", com:"O rol é: Floresta Amazônica, Mata Atlântica, Serra do Mar, Pantanal Mato-Grossense e Zona Costeira." },
  { tipo:"caso", enun:"Idoso de baixa renda, que nunca contribuiu para a previdência, comprova não ter meios de se manter nem de ser mantido pela família. Que benefício pode pleitear?", com:"O BPC, de um salário mínimo mensal (art. 203, V). Assistência social independe de contribuição." },
  { tipo:"caso", enun:"Adolescente de 17 anos pratica fato descrito como crime. Ele responde pelas penas do Código Penal?", com:"Não. Os menores de 18 anos são penalmente inimputáveis (art. 228) e ficam sujeitos à legislação especial." }],
resumo:[
  "A ordem econômica funda-se na <b>valorização do trabalho humano</b> e na <b>livre iniciativa</b>, para assegurar existência digna e justiça social.",
  "A exploração direta de atividade econômica pelo Estado é excepcional: <b>segurança nacional</b> ou <b>relevante interesse coletivo</b>.",
  "Usucapião urbana: <b>250 m²</b>; rural: <b>50 hectares</b>; ambas com <b>5 anos</b>. Imóvel público nunca é usucapido.",
  "Seguridade social = <b>saúde, previdência e assistência</b>. A saúde é universal; a previdência é contributiva; a assistência independe de contribuição.",
  "O <b>BPC</b> garante 1 salário mínimo ao idoso e à pessoa com deficiência sem meios de subsistência.",
  "Educação básica obrigatória dos <b>4 aos 17 anos</b>. Censura política, ideológica e artística é vedada.",
  "Meio ambiente: bem de uso comum do povo; pessoas <b>físicas ou jurídicas</b> respondem penal e administrativamente, e a dupla imputação não é exigida.",
  "Crianças, adolescentes e jovens têm <b>absoluta prioridade</b>; os filhos têm os mesmos direitos; menores de 18 anos são <b>inimputáveis</b>.",
  "Terras indígenas são bens da <b>União</b>. O marco temporal (Tema 1.031 e Lei 14.701/2023) exige conferência do estado atual."],
checklist:[
  "Fundamentos e princípios da ordem econômica",
  "Quando o Estado pode explorar atividade econômica",
  "Requisitos e limites das usucapiões constitucionais",
  "Diferença entre saúde, previdência e assistência social",
  "Requisitos do BPC",
  "Faixa etária da educação básica obrigatória",
  "Responsabilidade ambiental da pessoa jurídica e a dupla imputação",
  "Rol do art. 225, § 4º",
  "Absoluta prioridade e inimputabilidade do menor de 18 anos",
  "Situação das terras indígenas e o ponto pendente do marco temporal"],
questoes:[]
};

})();
