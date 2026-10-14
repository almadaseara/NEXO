/* Direito Administrativo (III): licitações (Lei 14.133/2021); contratação direta; contratos administrativos; improbidade (Lei 8.429/1992).
   Conferido em 14/10/2026. Valores da Lei 14.133 atualizados pelo Decreto 12.807/2025 (vigência em 1º/01/2026).
   Improbidade: redação da Lei 14.230/2021, com o julgamento das ADIs 7.156 e 7.236 (concluído em 01/07/2026, acórdão pendente). */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "14/10/2026";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var STFRG = "https://portal.stf.jus.br/jurisprudenciaRepercussao/pesquisarProcesso.asp";
var DEC = "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/";

/* ======================= LICITAÇÃO — PRINCÍPIOS, MODALIDADES E PROCEDIMENTO ======================= */
T.adm_licitacao_principios = {
meta:{ tema:"Licitação: princípios, modalidades e procedimento (Lei 14.133/2021)", atualizado:AT,
  foco:"Princípios do art. 5º; agente de contratação e comissão; as cinco modalidades (pregão, concorrência, concurso, leilão, diálogo competitivo) e os critérios de julgamento; fases (art. 17) e inversão; forma eletrônica; fim da Lei 8.666." },
secoes:[
{ id:"principios", titulo:"Princípios e agentes", curto:"Princípios",
  rapido:["Princípios novos ou explícitos na Lei 14.133 (art. 5º): <b>planejamento, transparência, eficácia, segregação de funções, motivação, vinculação ao edital, julgamento objetivo, segurança jurídica, razoabilidade, competitividade, proporcionalidade, celeridade, economicidade e desenvolvimento nacional sustentável</b> — além do LIMPE, interesse público, probidade e igualdade, e da LINDB.",
    "<b>Segregação de funções</b>: vedado designar o mesmo agente para funções suscetíveis a riscos (ex.: quem conduz a licitação não fiscaliza o contrato).",
    "<b>Agente de contratação</b>: servidor <b>efetivo ou empregado público</b> dos quadros permanentes, designado para conduzir a licitação até a homologação. No pregão, chama-se <b>pregoeiro</b>. Para bens e serviços especiais, pode haver <b>comissão de contratação</b> de no mínimo <b>3 membros</b>.",
    "A Lei 8.666/1993, a Lei do Pregão e o RDC foram revogados em <b>30/12/2023</b>; a Lei 14.133 é o regime único (contratos antigos seguem pela lei sob a qual foram firmados)."],
  teoria:[
    { h:"Objetivos (art. 11)", p:[
      "Selecionar a proposta mais vantajosa (considerando o <b>ciclo de vida</b> do objeto), assegurar tratamento isonômico e justa competição, evitar sobrepreço, preços inexequíveis e superfaturamento, incentivar a inovação e o desenvolvimento nacional sustentável."]}],
  pegadinhas:["Agente de contratação deve ser <b>efetivo ou empregado permanente</b> (não comissionado puro).","Convite e tomada de preços não existem mais."]},
{ id:"modalidades", titulo:"Modalidades e critérios de julgamento", curto:"Modalidades",
  rapido:["<b>Pregão</b>: <b>obrigatório</b> para bens e serviços <b>comuns</b> (inclusive serviços comuns de engenharia); critério: <b>menor preço ou maior desconto</b>. Não serve para serviços técnicos especializados intelectuais nem obras.",
    "<b>Concorrência</b>: bens e serviços <b>especiais</b> e <b>obras e serviços de engenharia</b> (comuns ou especiais); critérios: menor preço, maior desconto, melhor técnica ou conteúdo artístico, técnica e preço, maior retorno econômico.",
    "<b>Concurso</b>: trabalho técnico, científico ou artístico, critério <b>melhor técnica ou conteúdo artístico</b>, com prêmio ou remuneração. <b>Leilão</b>: alienação de imóveis e de móveis inservíveis ou legalmente apreendidos, a quem oferecer o <b>maior lance</b>.",
    "<b>Diálogo competitivo</b>: objetos inovadores ou complexos; a Administração dialoga com licitantes <b>previamente selecionados</b> para desenvolver alternativas; depois, propostas finais. Vedada a criação de outras modalidades ou a <b>combinação</b> delas."],
  teoria:[
    { h:"Critérios de julgamento (art. 33)", p:[
      "Menor preço; maior desconto; melhor técnica ou conteúdo artístico; técnica e preço; <b>maior lance</b> (leilão); <b>maior retorno econômico</b> (contratos de eficiência).",
      "Não existem mais \"tipos\" como na Lei 8.666; o critério é escolhido conforme o objeto e a modalidade."]}],
  quadro:{ titulo:"Modalidades da Lei 14.133", head:["Modalidade","Objeto","Critério"], rows:[
    ["Pregão","Bens e serviços comuns (obrigatório)","Menor preço ou maior desconto"],
    ["Concorrência","Bens e serviços especiais; obras e serviços de engenharia","Vários (menor preço, técnica e preço, maior retorno...)"],
    ["Concurso","Trabalho técnico, científico ou artístico","Melhor técnica ou conteúdo artístico"],
    ["Leilão","Alienação de imóveis e móveis inservíveis ou apreendidos","Maior lance"],
    ["Diálogo competitivo","Inovação ou soluções complexas","Proposta final após os diálogos"]]},
  pegadinhas:["Pregão é <b>obrigatório</b> para bens e serviços comuns.","Leilão alienando imóvel: cabe; concorrência para alienar imóvel não está mais no texto como regra.","Não se combinam modalidades."]},
{ id:"fases", titulo:"Fases do procedimento", curto:"Fases",
  rapido:["Ordem (art. 17): <b>preparatória → divulgação do edital → propostas e lances → julgamento → habilitação → recursal → homologação</b>.",
    "Regra: <b>julgamento antes da habilitação</b> (só se examinam os documentos de quem venceu). A habilitação pode <b>anteceder</b> propostas e julgamento por ato motivado, se previsto no edital.",
    "Preferência pela forma <b>eletrônica</b>; presencial só motivada, com sessão gravada em áudio e vídeo.",
    "Fase recursal <b>única</b>, após a habilitação (em regra): intenção de recorrer manifestada de imediato e razões em <b>3 dias úteis</b>."],
  teoria:[
    { h:"Fase preparatória", p:[
      "Estudo técnico preliminar, termo de referência/projeto básico, orçamento estimado, análise de riscos, matriz de riscos (obrigatória em obras de grande vulto), parecer jurídico.",
      "Contratos de grande vulto: acima de cerca de <b>R$ 262 milhões</b> em 2026 (Decreto 12.807/2025) — exigem programa de integridade do vencedor em até 6 meses."]}],
  pegadinhas:["Habilitação vem <b>depois</b> do julgamento (regra).","Sessão presencial precisa ser gravada."]}
],
lei:[
{ art:"Lei 14.133/2021, arts. 5º, 8º, 17 e 28", nome:"Princípios, agente, fases e modalidades", sec:"principios", itens:[
  { id:"l14133a5", rot:"Art. 5º", t:"Na aplicação desta Lei, serão observados os princípios da legalidade, da impessoalidade, da moralidade, da publicidade, da eficiência, do interesse público, da probidade administrativa, da igualdade, do <b class='g1'>planejamento</b>, da <b class='g1'>transparência</b>, da eficácia, da <b class='g1'>segregação de funções</b>, da motivação, da <b class='g1'>vinculação ao edital</b>, do <b class='g1'>julgamento objetivo</b>, da segurança jurídica, da razoabilidade, da competitividade, da proporcionalidade, da celeridade, da economicidade e do <b class='g1'>desenvolvimento nacional sustentável</b>, assim como as disposições do Decreto-Lei nº 4.657, de 4 de setembro de 1942 (Lei de Introdução às Normas do Direito Brasileiro).", c:["lc1"] },
  { id:"l14133a8", rot:"Art. 8º, caput", t:"A licitação será conduzida por <b class='g1'>agente de contratação</b>, pessoa designada pela autoridade competente, entre <b class='g1'>servidores efetivos ou empregados públicos dos quadros permanentes</b> da Administração Pública, para tomar decisões, acompanhar o trâmite da licitação, dar impulso ao procedimento licitatório e executar quaisquer outras atividades necessárias ao bom andamento do certame <b class='g3'>até a homologação</b>.", c:["lc2"] },
  { id:"l14133a17", rot:"Art. 17, I a VII e §§1º e 2º", t:"O processo de licitação observará as seguintes fases, em sequência: I - preparatória; II - de divulgação do edital de licitação; III - de apresentação de propostas e lances, quando for o caso; IV - de <b class='g1'>julgamento</b>; V - de <b class='g1'>habilitação</b>; VI - recursal; VII - de homologação.<br>§ 1º A fase referida no inciso V do caput deste artigo poderá, mediante <b class='g3'>ato motivado</b> com explicitação dos benefícios decorrentes, <b class='g1'>anteceder</b> as fases referidas nos incisos III e IV do caput deste artigo, desde que expressamente previsto no edital de licitação.<br>§ 2º As licitações serão realizadas <b class='g1'>preferencialmente sob a forma eletrônica</b>, admitida a utilização da forma presencial, desde que motivada, devendo a sessão pública ser registrada em ata e <b class='g3'>gravada em áudio e vídeo</b>.", c:["lc3","lc4"] },
  { id:"l14133a28", rot:"Arts. 28 e 33", t:"Art. 28. São modalidades de licitação: I - <b class='g1'>pregão</b>; II - <b class='g1'>concorrência</b>; III - <b class='g1'>concurso</b>; IV - <b class='g1'>leilão</b>; V - <b class='g1'>diálogo competitivo</b>. (...) § 2º É <b class='g3'>vedada a criação de outras modalidades</b> de licitação ou, ainda, a <b class='g3'>combinação</b> daquelas referidas no caput deste artigo.<br>Art. 33. O julgamento das propostas será realizado de acordo com os seguintes critérios: I - menor preço; II - maior desconto; III - melhor técnica ou conteúdo artístico; IV - técnica e preço; V - maior lance, no caso de leilão; VI - maior retorno econômico.", c:["lc5","lc6","lc7"] }]},
{ art:"Lei 14.133/2021, art. 6º", nome:"Definições das modalidades", sec:"modalidades", itens:[
  { id:"l14133a6", rot:"Art. 6º, XXXVIII a XLII", t:"XXXVIII - <b class='g1'>concorrência</b>: modalidade de licitação para contratação de <b class='g1'>bens e serviços especiais e de obras e serviços comuns e especiais de engenharia</b> (...);<br>XXXIX - <b class='g1'>concurso</b>: modalidade de licitação para escolha de <b class='g1'>trabalho técnico, científico ou artístico</b>, cujo critério de julgamento será o de melhor técnica ou conteúdo artístico, e para concessão de prêmio ou remuneração ao vencedor;<br>XL - <b class='g1'>leilão</b>: modalidade de licitação para <b class='g1'>alienação de bens imóveis ou de bens móveis inservíveis ou legalmente apreendidos</b> a quem oferecer o maior lance;<br>XLI - <b class='g1'>pregão</b>: modalidade de licitação <b class='g3'>obrigatória</b> para aquisição de <b class='g1'>bens e serviços comuns</b>, cujo critério de julgamento poderá ser o de menor preço ou o de maior desconto;<br>XLII - <b class='g1'>diálogo competitivo</b>: modalidade de licitação para contratação de obras, serviços e compras em que a Administração Pública realiza diálogos com <b class='g1'>licitantes previamente selecionados</b> mediante critérios objetivos, com o intuito de desenvolver uma ou mais alternativas capazes de atender às suas necessidades, devendo os licitantes apresentar proposta final após o encerramento dos diálogos;", c:["lc5","lc6","lc8"] }]}
],
juris:[],
cards:[
{ id:"lc1", tipo:"caso", sec:"principios", f:"O mesmo servidor elabora o termo de referência, conduz a licitação e fiscaliza o contrato. Que princípio é violado?", v:"<b>Segregação de funções</b> (art. 5º e art. 7º, §1º).", lei:["l14133a5"] },
{ id:"lc2", tipo:"caso", sec:"principios", f:"Prefeito designa ocupante exclusivamente de cargo em comissão como agente de contratação. Válido?", v:"<b>Não</b> — deve ser servidor <b>efetivo</b> ou empregado dos quadros permanentes (art. 8º).", lei:["l14133a8"] },
{ id:"lc3", tipo:"lacuna", sec:"fases", f:"Fases: preparatória → divulgação → propostas e lances → ______ → ______ → recursal → homologação.", v:"<b>julgamento</b>; <b>habilitação</b>.", lei:["l14133a17"] },
{ id:"lc4", tipo:"caso", sec:"fases", f:"Edital prevê habilitação antes do julgamento, com justificativa. Possível?", v:"<b>Sim</b> — inversão por ato motivado e prevista no edital (art. 17, §1º).", lei:["l14133a17"] },
{ id:"lc5", tipo:"caso", sec:"modalidades", f:"Órgão vai comprar papel A4 e cartuchos. Modalidade?", v:"<b>Pregão</b> — obrigatório para bens comuns.", lei:["l14133a28","l14133a6"] },
{ id:"lc6", tipo:"caso", sec:"modalidades", f:"Estado quer vender veículos apreendidos e inservíveis. Modalidade e critério?", v:"<b>Leilão</b>, critério <b>maior lance</b>.", lei:["l14133a28","l14133a6"] },
{ id:"lc7", tipo:"ce", sec:"modalidades", f:"Certo ou errado: a Lei 14.133 admite convite para contratações de pequeno valor.", v:"<b>Errado.</b> Modalidades: pregão, concorrência, concurso, leilão e diálogo competitivo; vedadas outras e a combinação.", lei:["l14133a28"] },
{ id:"lc8", tipo:"caso", sec:"modalidades", f:"Polícia quer contratar solução tecnológica inovadora que o mercado ainda não oferece pronta. Modalidade adequada?", v:"<b>Diálogo competitivo</b>.", lei:["l14133a6"] }
],
questoes:[]
};

/* ======================= CONTRATAÇÃO DIRETA ======================= */
T.adm_contratacao_direta = {
meta:{ tema:"Contratação direta: dispensa e inexigibilidade", atualizado:AT,
  foco:"Licitação dispensada (art. 76), dispensável (art. 75) e inexigível (art. 74); valores de 2026 (Decreto 12.807/2025); emergência e calamidade; processo de contratação direta (art. 72); alienação de bens; instrumentos auxiliares (credenciamento, pré-qualificação, PMI, SRP, registro cadastral).",
  aviso:"Valores da dispensa por valor são atualizados todo ano por decreto. Os de 2026 vêm do Decreto 12.807/2025 — confira no Diário Oficial." },
secoes:[
{ id:"inexigibilidade", titulo:"Inexigibilidade (art. 74)", curto:"Inexigível",
  rapido:["Inexigível quando <b>inviável a competição</b> — rol <b>exemplificativo</b> (\"em especial\").",
    "Casos: <b>fornecedor exclusivo</b>; <b>artista consagrado</b> pela crítica ou pela opinião pública (diretamente ou por empresário exclusivo); <b>serviços técnicos especializados de natureza predominantemente intelectual</b> com <b>notória especialização</b> (vedada para <b>publicidade e divulgação</b>); <b>credenciamento</b>; <b>imóvel</b> cujas instalações e localização tornem necessária sua escolha.",
    "Diferença-chave: na <b>inexigibilidade</b> a competição é <b>impossível</b>; na <b>dispensa</b>, é possível, mas a lei autoriza não licitar.",
    "Contratação direta indevida pode configurar o crime do <b>art. 337-E do CP</b> (admitir, possibilitar ou dar causa à contratação direta fora das hipóteses legais — reclusão de 4 a 8 anos e multa)."],
  teoria:[
    { h:"Pontos finos", p:[
      "Fornecedor exclusivo: comprovado por atestado, contrato de exclusividade ou declaração do fabricante; vedada a preferência por marca.",
      "Artista: empresário exclusivo é o que tem contrato de exclusividade permanente, não o que tem carta de exclusividade só para aquele evento.",
      "Serviços técnicos: estudos, pareceres, assessorias, patrocínio de causas, treinamento, restauração de obras de arte etc."]}],
  pegadinhas:["Rol do art. 74 é exemplificativo; o do art. 75 é taxativo.","Publicidade nunca é contratada por inexigibilidade."]},
{ id:"dispensa", titulo:"Dispensa (art. 75) e licitação dispensada (art. 76)", curto:"Dispensa",
  rapido:["Por <b>valor</b> (2026): obras, serviços de engenharia e manutenção de veículos — abaixo de <b>R$ 130.984,20</b>; outros serviços e compras — abaixo de <b>R$ 65.492,11</b> (valores originais da lei: R$ 100 mil e R$ 50 mil).",
    "Licitação <b>deserta ou fracassada</b> há menos de <b>1 ano</b>, mantidas as condições do edital.",
    "<b>Emergência ou calamidade</b>: só para o necessário e para parcelas concluídas em até <b>1 ano</b> da ocorrência, <b>vedadas a prorrogação</b> e a <b>recontratação</b> da mesma empresa com base nesse inciso.",
    "<b>Licitação dispensada</b> (art. 76): alienações em que a própria lei afasta a licitação (doação, permuta, dação em pagamento, venda a outro órgão etc.) — rol fechado, sem discricionariedade."],
  teoria:[
    { h:"Processo de contratação direta (art. 72)", p:[
      "Instruído com documento de formalização da demanda, estimativa de despesa, parecer jurídico e técnico, demonstração de compatibilidade orçamentária, comprovação dos requisitos de habilitação, razão da escolha do contratado, justificativa de preço e autorização da autoridade competente.",
      "O ato que autoriza a contratação direta deve ser divulgado em sítio eletrônico oficial.",
      "Para aferir o valor, somam-se as despesas com objetos da <b>mesma natureza</b> no exercício e na mesma unidade gestora (combate ao fracionamento)."]},
    { h:"Alienação de bens (art. 76)", p:[
      "<b>Imóveis</b>: interesse público justificado, <b>avaliação prévia</b>, <b>autorização legislativa</b> (para órgãos da administração direta, autarquias e fundações) e <b>leilão</b>, salvo hipóteses de licitação dispensada.",
      "<b>Móveis</b>: interesse público, avaliação prévia e leilão, salvo dispensas."]},
    { h:"Instrumentos auxiliares (art. 78)", p:[
      "<b>Credenciamento</b> (chamamento de todos os interessados que preencham requisitos — base para inexigibilidade), <b>pré-qualificação</b>, <b>procedimento de manifestação de interesse</b> (PMI), <b>sistema de registro de preços</b> (SRP) e <b>registro cadastral</b>."]}],
  quadro:{ titulo:"Dispensada × dispensável × inexigível", head:["","Dispensada","Dispensável","Inexigível"], rows:[
    ["Base","Art. 76","Art. 75","Art. 74"],
    ["Competição","Possível, mas a lei afasta","Possível; a Administração pode não licitar","Inviável"],
    ["Rol","Taxativo","Taxativo","Exemplificativo"],
    ["Ex.","Doação de bem a outro órgão","Compra de pequeno valor; emergência","Fornecedor exclusivo; artista consagrado"]]},
  pegadinhas:["Emergência: até 1 ano, sem prorrogação e sem recontratar a mesma empresa por esse fundamento.","Fracionar para caber no limite de dispensa é ilegal (e pode ser crime)."]}
],
lei:[
{ art:"Lei 14.133/2021, art. 74", nome:"Inexigibilidade", sec:"inexigibilidade", itens:[
  { id:"l14133a74", rot:"Art. 74, I a V", t:"É inexigível a licitação quando <b class='g1'>inviável a competição</b>, <b class='g3'>em especial</b> nos casos de:<br>I - aquisição de materiais, de equipamentos ou de gêneros ou contratação de serviços que só possam ser fornecidos por produtor, empresa ou representante comercial <b class='g1'>exclusivos</b>;<br>II - contratação de <b class='g1'>profissional do setor artístico</b>, diretamente ou por meio de empresário exclusivo, desde que <b class='g1'>consagrado pela crítica especializada ou pela opinião pública</b>;<br>III - contratação dos seguintes <b class='g1'>serviços técnicos especializados de natureza predominantemente intelectual</b> com profissionais ou empresas de <b class='g1'>notória especialização</b>, <b class='g3'>vedada a inexigibilidade para serviços de publicidade e divulgação</b>: (...);<br>IV - objetos que devam ou possam ser contratados por meio de <b class='g1'>credenciamento</b>;<br>V - aquisição ou locação de <b class='g1'>imóvel</b> cujas características de instalações e de localização tornem necessária sua escolha.", c:["cd1","cd2","cd3"] }]},
{ art:"Lei 14.133/2021, art. 75", nome:"Dispensa", sec:"dispensa", itens:[
  { id:"l14133a75", rot:"Art. 75, I, II, III e VIII", t:"É dispensável a licitação:<br>I - para contratação que envolva valores inferiores a <b class='g2'>R$ 100.000,00 (cem mil reais)</b>, no caso de <b class='g1'>obras e serviços de engenharia ou de serviços de manutenção de veículos automotores</b>;<br>II - para contratação que envolva valores inferiores a <b class='g2'>R$ 50.000,00 (cinquenta mil reais)</b>, no caso de <b class='g1'>outros serviços e compras</b>;<br>III - para contratação que mantenha todas as condições definidas em edital de licitação realizada <b class='g2'>há menos de 1 (um) ano</b>, quando se verificar que naquela licitação: a) <b class='g1'>não surgiram licitantes interessados ou não foram apresentadas propostas válidas</b>; b) as propostas apresentadas consignaram preços manifestamente superiores aos praticados no mercado ou incompatíveis com os fixados pelos órgãos oficiais competentes;<br>(...)<br>VIII - nos casos de <b class='g1'>emergência ou de calamidade pública</b>, quando caracterizada urgência de atendimento de situação que possa ocasionar prejuízo ou comprometer a continuidade dos serviços públicos ou a segurança de pessoas, obras, serviços, equipamentos e outros bens, públicos ou particulares, e somente para aquisição dos bens necessários ao atendimento da situação emergencial ou calamitosa e para as parcelas de obras e serviços que possam ser concluídas no prazo máximo de <b class='g2'>1 (um) ano</b>, contado da data de ocorrência da emergência ou da calamidade, <b class='g3'>vedadas a prorrogação dos respectivos contratos e a recontratação de empresa já contratada</b> com base no disposto neste inciso;", nota:"Valores dos incisos I e II atualizados para 2026 pelo Decreto 12.807/2025: R$ 130.984,20 e R$ 65.492,11.", novo:true, c:["cd4","cd5","cd6"], j:["dec12807"] }]}
],
juris:[
{ id:"dec12807", trib:"Executivo", tipo:"Decreto", num:"Decreto 12.807/2025", sec:"dispensa", status:"atencao", data:"vigente desde 01/01/2026",
  titulo:"Atualização dos valores da Lei 14.133 para 2026",
  texto:"Atualiza os valores da Lei 14.133/2021: dispensa por valor abaixo de R$ 130.984,20 (obras, engenharia, manutenção de veículos) e de R$ 65.492,11 (demais); grande vulto acima de R$ 261.968.421,04; contrato verbal até R$ 13.098,41.",
  explica:"Em prova, a banca pode cobrar o valor original da lei (R$ 100 mil / R$ 50 mil) ou o atualizado — leia o enunciado. Valores conforme divulgação oficial; confira no DOU.", lei:["l14133a75"], fonte:DEC }
],
cards:[
{ id:"cd1", tipo:"distincao", sec:"inexigibilidade", f:"Dispensa × inexigibilidade (critério).", v:"<b>Inexigibilidade</b>: competição <b>inviável</b> (rol exemplificativo). <b>Dispensa</b>: competição possível, mas a lei permite não licitar (rol taxativo).", lei:["l14133a74"] },
{ id:"cd2", tipo:"caso", sec:"inexigibilidade", f:"Prefeitura contrata cantor famoso para festa de São João por intermédio de empresário com carta de exclusividade só para aquela data. Inexigibilidade válida?", v:"<b>Não</b> por esse empresário: exige-se empresário <b>exclusivo</b> (contrato permanente), não exclusividade restrita ao evento.", lei:["l14133a74"] },
{ id:"cd3", tipo:"caso", sec:"inexigibilidade", f:"Órgão contrata agência de publicidade de notória especialização sem licitação. Válido?", v:"<b>Não</b> — vedada inexigibilidade para <b>publicidade e divulgação</b>.", lei:["l14133a74"] },
{ id:"cd4", tipo:"numero", sec:"dispensa", f:"Dispensa por valor em 2026.", v:"Obras, engenharia e manutenção de veículos: abaixo de <b>R$ 130.984,20</b>. Demais serviços e compras: abaixo de <b>R$ 65.492,11</b> (Decreto 12.807/2025).", lei:["l14133a75"], j:["dec12807"] },
{ id:"cd5", tipo:"caso", sec:"dispensa", f:"Enchente: Município contrata emergencialmente reconstrução de ponte por 1 ano e quer prorrogar mais 6 meses com a mesma empresa. Pode?", v:"<b>Não</b> — vedadas a prorrogação e a recontratação com base na emergência (art. 75, VIII).", lei:["l14133a75"] },
{ id:"cd6", tipo:"caso", sec:"dispensa", f:"Licitação de 3 meses atrás foi deserta. Pode contratar diretamente?", v:"<b>Sim</b>, mantidas todas as condições do edital (art. 75, III, a).", lei:["l14133a75"] },
{ id:"cd7", tipo:"distincao", sec:"dispensa", f:"Licitação dispensada × dispensável.", v:"<b>Dispensada</b> (art. 76): a lei afasta, sem margem (alienações específicas). <b>Dispensável</b> (art. 75): a Administração <b>pode</b> licitar ou não.", lei:[] }
],
questoes:[]
};

/* ======================= CONTRATOS ADMINISTRATIVOS ======================= */
T.adm_contratos = {
meta:{ tema:"Contratos administrativos (Lei 14.133/2021)", atualizado:AT,
  foco:"Características e cláusulas exorbitantes (art. 104); garantias; duração e prorrogação; alterações unilaterais e consensuais (limites de 25% e 50%); equilíbrio econômico-financeiro (álea ordinária e extraordinária, fato do príncipe, fato da administração, teoria da imprevisão); extinção; sanções; nulidades." },
secoes:[
{ id:"clausulas", titulo:"Características e cláusulas exorbitantes", curto:"Cláusulas",
  rapido:["Contrato administrativo: Administração em posição de <b>supremacia</b>, com <b>cláusulas exorbitantes</b> (que seriam ilícitas em contrato privado), finalidade pública, formalismo, <b>intuitu personae</b> (subcontratação só nos limites autorizados).",
    "Prerrogativas (art. 104): <b>modificar unilateralmente</b>; <b>extinguir unilateralmente</b>; <b>fiscalizar</b>; <b>aplicar sanções</b>; <b>ocupar provisoriamente</b> bens e pessoal (serviços essenciais ou apuração de faltas).",
    "Cláusulas <b>econômico-financeiras</b> não podem ser alteradas sem concordância do contratado; alteração unilateral obriga revisar o equilíbrio.",
    "Garantia: a critério da Administração — caução em dinheiro ou títulos, <b>seguro-garantia</b>, fiança bancária ou título de capitalização; até <b>5%</b> do valor (até <b>10%</b> se complexo); em obras de <b>grande vulto</b>, seguro-garantia com cláusula de retomada de até <b>30%</b>."],
  teoria:[
    { h:"Duração", p:[
      "Serviços e fornecimentos <b>contínuos</b>: até <b>5 anos</b>, prorrogáveis até <b>10 anos</b> no total, atestada a vantajosidade.",
      "Contratos com receita ou de eficiência que geram economia: até 10 anos (sem investimento) ou até 35 anos (com investimento).",
      "Contrato por escopo: o prazo é prorrogado automaticamente se o objeto não for concluído no período previsto."]}],
  pegadinhas:["Cláusula econômico-financeira não se altera unilateralmente.","Contínuos: 5 + até 10 anos no total (não mais os 60 meses da Lei 8.666)."]},
{ id:"alteracoes", titulo:"Alterações e equilíbrio econômico-financeiro", curto:"Alterações",
  rapido:["Alteração <b>unilateral</b>: o contratado é obrigado a aceitar acréscimos ou supressões de até <b>25%</b> do valor inicial atualizado; em <b>reforma de edifício ou equipamento</b>, acréscimos até <b>50%</b>.",
    "Supressões acima de 25% só por <b>acordo</b>.",
    "<b>Álea extraordinária</b> gera reequilíbrio: <b>fato do príncipe</b> (ato geral do Estado que onera o contrato, ex.: novo tributo), <b>fato da administração</b> (ação ou omissão da própria contratante que atinge o contrato, ex.: não liberar a área), <b>caso fortuito/força maior</b> e <b>teoria da imprevisão</b> (fato imprevisível ou de consequências incalculáveis).",
    "Reajuste (índice, periodicidade anual) e repactuação (serviços contínuos com dedicação de mão de obra) recompõem a álea ordinária/inflação."],
  teoria:[
    { h:"Matriz de riscos", p:[
      "Cláusula que distribui os riscos entre as partes; quando prevista, o reequilíbrio só cabe para riscos atribuídos à Administração.",
      "Obrigatória em obras e serviços de grande vulto e nos regimes de contratação integrada e semi-integrada."]}],
  pegadinhas:["25% é a regra; 50% só para <b>acréscimos</b> em reforma.","Fato do príncipe = ato geral; fato da administração = ato específico da contratante."]},
{ id:"extincao", titulo:"Extinção, sanções e nulidades", curto:"Extinção",
  rapido:["O contratado pode pedir a extinção se: <b>supressão</b> acima do limite; <b>suspensão</b> por ordem da Administração por mais de <b>3 meses</b>; <b>atraso de pagamento</b> superior a <b>2 meses</b>; não liberação de área ou objeto. Pode também optar pela <b>suspensão</b> do cumprimento das obrigações até a regularização.",
    "Sanções (art. 156): <b>advertência</b>; <b>multa</b> (de 0,5% a 30% do valor do contrato); <b>impedimento de licitar e contratar</b> (até <b>3 anos</b>, no âmbito do ente que aplicou); <b>declaração de inidoneidade</b> (de <b>3 a 6 anos</b>, em todos os entes).",
    "A multa pode ser cumulada com as demais sanções. Inidoneidade é de competência de Ministro de Estado/Secretário (no Executivo).",
    "Nulidade: a declaração deve considerar impactos e pode haver <b>modulação</b> (continuidade do contrato com indenização por perdas e danos) quando a paralisação não atender ao interesse público."],
  teoria:[
    { h:"Extinção", p:[
      "Formas: <b>unilateral</b> pela Administração (por inexecução, razões de interesse público etc.), <b>consensual</b> (acordo, mediação, arbitragem) e <b>judicial ou arbitral</b>.",
      "Exceção do contrato não cumprido em favor do particular: admitida após os 2 meses de atraso de pagamento (e não em calamidade, guerra ou grave perturbação da ordem interna)."]}],
  quadro:{ titulo:"Sanções da Lei 14.133", head:["Sanção","Alcance","Prazo"], rows:[
    ["Advertência","Infração leve","—"],
    ["Multa","0,5% a 30% do valor","—"],
    ["Impedimento de licitar e contratar","Ente federativo que aplicou","Até 3 anos"],
    ["Declaração de inidoneidade","Todos os entes","3 a 6 anos"]]},
  pegadinhas:["Atraso de pagamento: <b>2 meses</b> (não mais 90 dias).","Impedimento: só no ente; inidoneidade: em todos."]}
],
lei:[
{ art:"Lei 14.133/2021, arts. 104 e 125", nome:"Prerrogativas e limites de alteração", sec:"clausulas", itens:[
  { id:"l14133a104", rot:"Art. 104", t:"O regime jurídico dos contratos instituído por esta Lei confere à Administração, em relação a eles, as prerrogativas de:<br>I - <b class='g1'>modificá-los, unilateralmente</b>, para melhor adequação às finalidades de interesse público, respeitados os direitos do contratado;<br>II - <b class='g1'>extingui-los, unilateralmente</b>, nos casos especificados nesta Lei;<br>III - <b class='g1'>fiscalizar</b> sua execução;<br>IV - <b class='g1'>aplicar sanções</b> motivadas pela inexecução total ou parcial do ajuste;<br>V - <b class='g1'>ocupar provisoriamente</b> bens móveis e imóveis e utilizar pessoal e serviços vinculados ao objeto do contrato nas hipóteses de: a) risco à prestação de serviços essenciais; b) necessidade de acautelar apuração administrativa de faltas contratuais pelo contratado, inclusive após extinção do contrato.<br>§ 1º As <b class='g3'>cláusulas econômico-financeiras</b> e monetárias dos contratos <b class='g3'>não poderão ser alteradas sem prévia concordância do contratado</b>.<br>§ 2º Na hipótese prevista no inciso I do caput deste artigo, as cláusulas econômico-financeiras do contrato deverão ser revistas para que se mantenha o equilíbrio contratual.", c:["ca1","ca2"] },
  { id:"l14133a125", rot:"Art. 125", t:"Nas alterações unilaterais a que se refere o inciso I do caput do art. 124 desta Lei, o contratado será <b class='g1'>obrigado a aceitar</b>, nas mesmas condições contratuais, acréscimos ou supressões de até <b class='g2'>25% (vinte e cinco por cento)</b> do valor inicial atualizado do contrato que se fizerem nas obras, nos serviços ou nas compras, e, no caso de <b class='g1'>reforma de edifício ou de equipamento</b>, o limite para os <b class='g1'>acréscimos</b> será de <b class='g2'>50% (cinquenta por cento)</b>.", c:["ca3"] }]},
{ art:"Lei 14.133/2021, arts. 106, 107 e 156", nome:"Duração e sanções", sec:"extincao", itens:[
  { id:"l14133a106", rot:"Arts. 106 e 107 (essência)", t:"Art. 106. A Administração poderá celebrar contratos com prazo de até <b class='g2'>5 (cinco) anos</b> nas hipóteses de <b class='g1'>serviços e fornecimentos contínuos</b> (...).<br>Art. 107. Os contratos de serviços e fornecimentos contínuos poderão ser prorrogados sucessivamente, respeitada a vigência máxima decenal [<b class='g2'>10 anos</b>], desde que haja previsão em edital e que a autoridade competente ateste que as condições e os preços permanecem vantajosos para a Administração (...).", c:["ca4"] },
  { id:"l14133a156", rot:"Art. 156", t:"Serão aplicadas ao responsável pelas infrações administrativas previstas nesta Lei as seguintes sanções: I - <b class='g1'>advertência</b>; II - <b class='g1'>multa</b>; III - <b class='g1'>impedimento de licitar e contratar</b>; IV - <b class='g1'>declaração de inidoneidade</b> para licitar ou contratar.<br>(...) § 3º A sanção prevista no inciso II do caput deste artigo (...) não poderá ser inferior a <b class='g2'>0,5%</b> (cinco décimos por cento) nem superior a <b class='g2'>30%</b> (trinta por cento) do valor do contrato (...).<br>§ 4º A sanção prevista no inciso III do caput deste artigo (...) impedirá o responsável de licitar ou contratar no âmbito da Administração Pública direta e indireta <b class='g3'>do ente federativo que tiver aplicado a sanção</b>, pelo prazo máximo de <b class='g2'>3 (três) anos</b>.<br>§ 5º A sanção prevista no inciso IV do caput deste artigo (...) impedirá o responsável de licitar ou contratar no âmbito da Administração Pública direta e indireta de <b class='g3'>todos os entes federativos</b>, pelo prazo mínimo de <b class='g2'>3 (três) anos</b> e máximo de <b class='g2'>6 (seis) anos</b>.", nota:"Art. 107 resumido entre colchetes; demais trechos literais com supressões indicadas.", c:["ca5","ca6"] }]}
],
juris:[],
cards:[
{ id:"ca1", tipo:"caso", sec:"clausulas", f:"Administração decide, unilateralmente, reduzir o preço unitário pago à contratada. Pode?", v:"<b>Não</b> — cláusulas econômico-financeiras exigem concordância do contratado (art. 104, §1º).", lei:["l14133a104"] },
{ id:"ca2", tipo:"caso", sec:"clausulas", f:"Empresa de coleta de lixo abandona o serviço; a Prefeitura assume os caminhões dela provisoriamente. Base legal?", v:"<b>Ocupação provisória</b> (art. 104, V, a — risco a serviço essencial).", lei:["l14133a104"] },
{ id:"ca3", tipo:"caso", sec:"alteracoes", f:"Contrato de reforma de prédio de R$ 1 milhão: a Administração quer acrescer R$ 450 mil unilateralmente. Pode?", v:"<b>Sim</b> — em reforma, acréscimos até <b>50%</b> (R$ 500 mil).", lei:["l14133a125"] },
{ id:"ca4", tipo:"numero", sec:"clausulas", f:"Vigência de serviços contínuos.", v:"Até <b>5 anos</b>, prorrogáveis até <b>10 anos</b> no total, com vantajosidade atestada.", lei:["l14133a106"] },
{ id:"ca5", tipo:"distincao", sec:"extincao", f:"Impedimento de licitar × declaração de inidoneidade.", v:"<b>Impedimento</b>: até 3 anos, no ente que aplicou. <b>Inidoneidade</b>: 3 a 6 anos, em todos os entes.", lei:["l14133a156"] },
{ id:"ca6", tipo:"numero", sec:"extincao", f:"Limites da multa contratual.", v:"De <b>0,5%</b> a <b>30%</b> do valor do contrato.", lei:["l14133a156"] },
{ id:"ca7", tipo:"caso", sec:"extincao", f:"Administração atrasa o pagamento há 70 dias. O contratado pode pedir a extinção?", v:"<b>Sim</b> — atraso superior a <b>2 meses</b> (art. 137, §2º, IV), ou optar pela suspensão das obrigações.", lei:[] },
{ id:"ca8", tipo:"distincao", sec:"alteracoes", f:"Fato do príncipe × fato da administração.", v:"<b>Fato do príncipe</b>: ato geral do Estado que repercute no contrato (novo tributo). <b>Fato da administração</b>: ação ou omissão da própria contratante sobre o contrato (não desapropriar a área).", lei:[] }
],
questoes:[]
};

/* ======================= IMPROBIDADE ADMINISTRATIVA ======================= */
T.adm_improbidade = {
meta:{ tema:"Improbidade administrativa (Lei 8.429/1992, com a Lei 14.230/2021)", atualizado:AT,
  foco:"Exigência de dolo e exclusão da modalidade culposa (Tema 1.199); sujeitos ativos e terceiros; espécies (arts. 9º, 10 e 11 — rol taxativo); sanções e gradação; ação, legitimidade, indisponibilidade, ANPC; prescrição e o julgamento das ADIs 7.156 e 7.236 (2026).",
  aviso:"O STF concluiu em 01/07/2026 o julgamento das ADIs 7.156 e 7.236 e mudou pontos importantes (prescrição intercorrente, absolvição penal, indisponibilidade). O acórdão ainda não havia sido publicado na última conferência." },
secoes:[
{ id:"dolo", titulo:"Dolo, sujeitos e espécies", curto:"Espécies",
  rapido:["Só há improbidade com <b>dolo</b>: vontade livre e consciente de alcançar o resultado ilícito, <b>não bastando a voluntariedade</b>. Acabou a improbidade <b>culposa</b> (inclusive no art. 10).",
    "Mero exercício da função sem dolo com fim ilícito não é improbidade; divergência interpretativa baseada em jurisprudência, ainda que não pacífica, também não (art. 1º, §8º — validado pelo STF).",
    "Espécies: <b>art. 9º</b> — enriquecimento ilícito; <b>art. 10</b> — lesão ao erário (exige perda patrimonial <b>efetiva</b>); <b>art. 11</b> — violação de princípios, agora com <b>rol taxativo</b> de condutas (validado pelo STF).",
    "Terceiro (particular) responde se <b>induzir ou concorrer dolosamente</b>; o STF retirou a exigência de \"benefício direto\". O ressarcimento pode ser solidário; as sanções são individuais."],
  teoria:[
    { h:"Tema 1.199 (2022)", p:[
      "1) É necessário dolo nos arts. 9º, 10 e 11. 2) A revogação da modalidade culposa é <b>irretroativa</b>: não atinge a coisa julgada nem a execução das penas. 3) Aplica-se aos atos culposos anteriores <b>sem condenação transitada em julgado</b>, devendo o juiz examinar eventual dolo. 4) O novo regime prescricional é <b>irretroativo</b>, valendo a partir da publicação da lei.",
      "Nepotismo, frustrar concurso ou licitação, revelar segredo e deixar de prestar contas estão entre as condutas do art. 11."]}],
  pegadinhas:["Improbidade culposa não existe mais.","Art. 11 virou rol <b>taxativo</b>.","Art. 10 exige dano efetivo, não presumido."]},
{ id:"sancoes", titulo:"Sanções", curto:"Sanções",
  rapido:["<b>Art. 9º</b> (enriquecimento): perda dos bens acrescidos, perda da função, <b>suspensão dos direitos políticos até 14 anos</b>, multa equivalente ao acréscimo, proibição de contratar até <b>14 anos</b>.",
    "<b>Art. 10</b> (lesão ao erário): perda dos bens acrescidos (se houver), perda da função, suspensão dos direitos políticos <b>até 12 anos</b>, multa equivalente ao dano, proibição de contratar até <b>12 anos</b>.",
    "<b>Art. 11</b> (princípios): <b>multa até 24 vezes a remuneração</b> e proibição de contratar até <b>4 anos</b> — <b>sem</b> perda da função nem suspensão dos direitos políticos.",
    "Perda da função pública e suspensão dos direitos políticos só se efetivam com o <b>trânsito em julgado</b>; o ressarcimento integral do dano, quando houver, é obrigatório e não é sanção."],
  teoria:[
    { h:"Aplicação", p:[
      "Sanções aplicadas isolada ou cumulativamente, conforme a gravidade, com proporcionalidade e razoabilidade.",
      "Não existem mais prazos mínimos de suspensão dos direitos políticos (só máximos).",
      "Acordo de não persecução civil (art. 17-B): exige ressarcimento integral do dano e reversão da vantagem indevida; homologação judicial."]}],
  quadro:{ titulo:"Sanções máximas (art. 12)", head:["Espécie","Direitos políticos","Proibição de contratar","Multa"], rows:[
    ["Art. 9º — enriquecimento ilícito","Até 14 anos","Até 14 anos","Equivalente ao acréscimo patrimonial"],
    ["Art. 10 — lesão ao erário","Até 12 anos","Até 12 anos","Equivalente ao dano"],
    ["Art. 11 — princípios","Não há","Até 4 anos","Até 24 vezes a remuneração"]]},
  pegadinhas:["Art. 11 não gera perda da função nem suspensão de direitos políticos.","Ressarcimento não é sanção."]},
{ id:"acao", titulo:"Ação, indisponibilidade e prescrição", curto:"Ação e prescrição",
  rapido:["Legitimidade: <b>Ministério Público</b> e a <b>pessoa jurídica interessada</b> (o STF restabeleceu a legitimidade dos entes lesados — ADIs 7.042 e 7.043).",
    "Ação de improbidade tem natureza <b>sancionatória civil</b> e não se confunde com ação civil pública (art. 17-D, validado pelo STF). O juiz não fica preso à capitulação da inicial (STF derrubou os §§10-C, 10-D e 10-F, I, do art. 17).",
    "Prescrição: <b>8 anos</b> a contar do fato (ou da cessação da permanência). O STF (2026) declarou <b>inconstitucional</b> a regra que reduzia o prazo pela <b>metade</b> após a interrupção (prescrição intercorrente de 4 anos) e adotou duração máxima de <b>20 anos</b> para a ação — aplicação aos processos em curso a definir no acórdão.",
    "Indisponibilidade de bens: o STF afastou a exigência de perigo de dano concreto e imediato; basta prova especialmente robusta da irregularidade. Absolvição criminal só vincula a ação de improbidade em casos excepcionais (inexistência do fato, negativa de autoria, legítima defesa, estrito cumprimento do dever legal, exercício regular de direito)."],
  teoria:[
    { h:"Ressarcimento", p:[
      "Imprescritível a ação de <b>ressarcimento</b> por <b>ato doloso</b> de improbidade (Tema 897); ressarcimento por ilícito culposo ou comum prescreve.",
      "Vedada a reversão do ônus da prova (art. 17, §19, I — validado)."]}],
  pegadinhas:["Prescrição: 8 anos — e a intercorrente pela metade caiu no STF (2026).","O ente lesado também pode propor a ação.","Ressarcimento por dolo é imprescritível."]}
],
lei:[
{ art:"Lei 8.429/1992, art. 1º", nome:"Dolo como elemento", sec:"dolo", itens:[
  { id:"lia1", rot:"Art. 1º, §§1º a 3º", t:"§ 1º Consideram-se atos de improbidade administrativa as <b class='g1'>condutas dolosas</b> tipificadas nos arts. 9º, 10 e 11 desta Lei, ressalvados tipos previstos em leis especiais.<br>§ 2º Considera-se <b class='g1'>dolo</b> a vontade livre e consciente de alcançar o resultado ilícito tipificado nos arts. 9º, 10 e 11 desta Lei, <b class='g3'>não bastando a voluntariedade do agente</b>.<br>§ 3º O mero exercício da função ou desempenho de competências públicas, <b class='g3'>sem comprovação de ato doloso com fim ilícito</b>, afasta a responsabilidade por ato de improbidade administrativa.", nota:"Redação da Lei 14.230/2021.", c:["im1","im2"], j:["stf-t1199"] },
  { id:"lia11", rot:"Art. 11, caput", t:"Constitui ato de improbidade administrativa que atenta contra os princípios da administração pública a <b class='g1'>ação ou omissão dolosa</b> que viole os deveres de <b class='g1'>honestidade, de imparcialidade e de legalidade</b>, <b class='g3'>caracterizada por uma das seguintes condutas</b>: (...)", nota:"Rol taxativo — constitucionalidade confirmada pelo STF (2026).", c:["im3"] }]},
{ art:"Lei 8.429/1992, art. 12", nome:"Sanções", sec:"sancoes", itens:[
  { id:"lia12", rot:"Art. 12, I a III", t:"I - na hipótese do art. 9º desta Lei, perda dos bens ou valores acrescidos ilicitamente ao patrimônio, perda da função pública, <b class='g1'>suspensão dos direitos políticos até 14 (catorze) anos</b>, pagamento de multa civil <b class='g1'>equivalente ao valor do acréscimo patrimonial</b> e proibição de contratar com o poder público ou de receber benefícios ou incentivos fiscais ou creditícios, direta ou indiretamente, ainda que por intermédio de pessoa jurídica da qual seja sócio majoritário, pelo prazo não superior a <b class='g2'>14 (catorze) anos</b>;<br>II - na hipótese do art. 10 desta Lei, perda dos bens ou valores acrescidos ilicitamente ao patrimônio, se concorrer esta circunstância, perda da função pública, <b class='g1'>suspensão dos direitos políticos até 12 (doze) anos</b>, pagamento de multa civil <b class='g1'>equivalente ao valor do dano</b> e proibição de contratar (...) pelo prazo não superior a <b class='g2'>12 (doze) anos</b>;<br>III - na hipótese do art. 11 desta Lei, pagamento de <b class='g1'>multa civil de até 24 (vinte e quatro) vezes o valor da remuneração</b> percebida pelo agente e proibição de contratar (...) pelo prazo não superior a <b class='g2'>4 (quatro) anos</b>;", c:["im4","im5"] }]},
{ art:"Lei 8.429/1992, art. 23", nome:"Prescrição", sec:"acao", itens:[
  { id:"lia23", rot:"Art. 23, caput e §5º", t:"A ação para a aplicação das sanções previstas nesta Lei prescreve em <b class='g2'>8 (oito) anos</b>, contados a partir da <b class='g1'>ocorrência do fato</b> ou, no caso de infrações permanentes, do dia em que cessou a permanência.<br>(...)<br>§ 5º Interrompida a prescrição, o prazo recomeça a correr do dia da interrupção, <b class='g3'>pela metade do prazo previsto no caput deste artigo</b>.", nota:"O STF declarou inconstitucional a expressão \"pela metade do prazo previsto no caput deste artigo\" (ADI 7.236, julgamento concluído em 01/07/2026) e fixou duração máxima de 20 anos para a ação. Confira o acórdão.", novo:true, c:["im6","im7"], j:["stf-adi7236"] }]}
],
juris:[
{ id:"stf-t1199", trib:"STF", tipo:"Repercussão geral", num:"ARE 843.989 (Tema 1.199)", sec:"dolo", status:"vigente", data:"18/08/2022",
  titulo:"Dolo e irretroatividade da Lei 14.230/2021",
  texto:"1) É necessária a comprovação de responsabilidade subjetiva para a tipificação dos atos de improbidade administrativa, exigindo-se, nos artigos 9º, 10 e 11 da LIA, a presença do elemento subjetivo — DOLO; 2) A norma benéfica da Lei 14.230/2021 — revogação da modalidade culposa do ato de improbidade administrativa —, é IRRETROATIVA, em virtude do artigo 5º, inciso XXXVI, da Constituição Federal, não tendo incidência em relação à eficácia da coisa julgada; nem tampouco durante o processo de execução das penas e seus incidentes; 3) A nova Lei 14.230/2021 aplica-se aos atos de improbidade administrativa culposos praticados na vigência do texto anterior da lei, porém sem condenação transitada em julgado, em virtude da revogação expressa do texto anterior; devendo o juízo competente analisar eventual dolo por parte do agente; 4) O novo regime prescricional previsto na Lei 14.230/2021 é IRRETROATIVO, aplicando-se os novos marcos temporais a partir da publicação da lei.",
  explica:"Reafirmado no julgamento das ADIs 7.156 e 7.236 (2026).", lei:["lia1"], fonte:STFRG },
{ id:"stf-adi7236", trib:"STF", tipo:"ADI", num:"ADIs 7.156 e 7.236", sec:"acao", status:"atencao", data:"concluído em 01/07/2026",
  titulo:"Reforma da LIA: o que o STF mudou",
  texto:"Inconstitucional a redução pela metade do prazo prescricional após a interrupção (art. 23, §5º), com adoção de duração máxima de 20 anos; absolvição criminal só vincula em hipóteses excepcionais (art. 21, §4º); indisponibilidade sem exigência de perigo de dano concreto e imediato (art. 16); juiz não vinculado à capitulação da inicial (art. 17, §§10-C, 10-D e 10-F, I); terceiro responde sem necessidade de benefício direto (art. 3º, §1º). Confirmados: exigência de dolo, rol taxativo do art. 11, art. 1º, §8º, vedação de inversão do ônus da prova e natureza da ação (art. 17-D).",
  explica:"Resumo conforme a divulgação do resultado; o acórdão não estava publicado na última conferência — confira a redação final das teses.", lei:["lia23"], fonte:STFJ }
],
cards:[
{ id:"im1", tipo:"caso", sec:"dolo", f:"Servidor, por negligência, deixa prescrever créditos do Município, causando prejuízo. Improbidade?", v:"<b>Não</b> — sem dolo não há improbidade desde a Lei 14.230 (Tema 1.199). Pode haver responsabilidade disciplinar ou civil.", lei:["lia1"], j:["stf-t1199"] },
{ id:"im2", tipo:"caso", sec:"dolo", f:"Condenado por improbidade culposa com trânsito em julgado em 2020 pede rescisão com base na Lei 14.230. Procede?", v:"<b>Não</b> — a revogação da forma culposa não retroage sobre a coisa julgada (Tema 1.199).", lei:["lia1"] },
{ id:"im3", tipo:"ce", sec:"dolo", f:"Certo ou errado: após a Lei 14.230, o art. 11 da LIA traz rol exemplificativo de condutas.", v:"<b>Errado.</b> Rol <b>taxativo</b> (\"caracterizada por uma das seguintes condutas\"), validado pelo STF.", lei:["lia11"] },
{ id:"im4", tipo:"caso", sec:"sancoes", f:"Agente condenado só por violação a princípios (art. 11). O juiz pode decretar a perda da função?", v:"<b>Não</b> — no art. 11 cabem multa (até 24x a remuneração) e proibição de contratar (até 4 anos).", lei:["lia12"] },
{ id:"im5", tipo:"numero", sec:"sancoes", f:"Suspensão máxima dos direitos políticos: arts. 9º e 10.", v:"Art. 9º: até <b>14 anos</b>. Art. 10: até <b>12 anos</b>. Art. 11: não há.", lei:["lia12"] },
{ id:"im6", tipo:"numero", sec:"acao", f:"Prazo prescricional da ação de improbidade.", v:"<b>8 anos</b> do fato ou da cessação da permanência. A intercorrente \"pela metade\" (4 anos) foi derrubada pelo STF (2026).", lei:["lia23"], j:["stf-adi7236"] },
{ id:"im7", tipo:"caso", sec:"acao", f:"Município lesado quer propor ação de improbidade contra ex-prefeito. Tem legitimidade?", v:"<b>Sim</b> — o STF restabeleceu a legitimidade da pessoa jurídica interessada (ADIs 7.042 e 7.043), ao lado do MP.", lei:["lia23"] }
],
questoes:[]
};

})();
