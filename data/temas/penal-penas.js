/* Direito Penal — Parte Geral: Das penas (arts. 32 a 52 e 77 a 90) e Concurso de crimes (arts. 69 a 72 e 75).
   Criado em 09/11/2026 para cobrir os tópicos "Pena: espécies, regimes, substituição, sursis e livramento"
   e "Concurso de crimes" do edital SAEB 02/2026 (PC-BA, Investigador), que não tinham módulo.
   Texto explicativo com palavras próprias; regras conferidas com o Código Penal compilado (Câmara dos Deputados, 09/11/2026).
   PENDENTE: a lei seca literal (campo "lei") não foi transcrita porque o acesso automático ao texto literal do Planalto
   estava bloqueado na data; transcrever os arts. 32 a 52, 69 a 72, 75 e 77 a 90 do CP e ligar aos flashcards. */
(function(){
var T = window.NEXO_TEMAS = window.NEXO_TEMAS || {};
var AT = "09/11/2026";
var STJS = "https://scon.stj.jus.br/SCON/sumanot/toc.jsp";
var STFJ = "https://jurisprudencia.stf.jus.br/pages/search";
var CP = "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm";

/* ======================= PENAS ======================= */
T.penal_penas = {
  "meta": {
    "tema": "Das Penas: espécies, regimes, restritivas, multa, sursis e livramento condicional",
    "atualizado": AT,
    "caminho": ["Direito Penal", "Parte Geral", "Pena e punibilidade"],
    "foco": "Espécies de pena (art. 32); reclusão, detenção e regimes (arts. 33 a 37); detração (art. 42); restritivas de direitos (arts. 43 a 48); multa (arts. 49 a 52); suspensão condicional da pena (arts. 77 a 82); livramento condicional (arts. 83 a 90).",
    "aviso": "A lei seca literal ainda não foi transcrita neste módulo: confira os artigos no Código Penal (Planalto) antes de decorar números. Percentuais de progressão de regime estão na Lei de Execução Penal (art. 112), tratada no módulo de Execução Penal.",
    "fontes": [CP]
  },
  "secoes": [
    {
      "id": "regimes",
      "titulo": "Espécies de pena, regimes e detração (arts. 32 a 42)",
      "curto": "Regimes",
      "rapido": [
        "<b>Três espécies</b> de pena (art. 32): privativas de liberdade, restritivas de direitos e multa.",
        "<b>Reclusão</b> pode começar em regime fechado, semiaberto ou aberto. <b>Detenção</b> começa em semiaberto ou aberto, salvo necessidade de transferência ao fechado.",
        "Regra do art. 33, §2º: acima de 8 anos, fechado; acima de 4 até 8 anos, não reincidente, semiaberto; até 4 anos, não reincidente, aberto.",
        "<b>Detração</b> (art. 42): o tempo de prisão provisória, no Brasil ou no exterior, é descontado da pena e da medida de segurança.",
        "Limite de cumprimento: <b>40 anos</b> (art. 75, com a redação da Lei 13.964/2019)."
      ],
      "teoria": [
        {
          "h": "A.1 Espécies e quem cumpre onde",
          "p": [
            "As penas privativas de liberdade são <b>reclusão</b> e <b>detenção</b>. A diferença prática está no regime inicial: só a reclusão admite começar no regime fechado, e a detenção, em regra, começa no semiaberto ou no aberto.",
            "Mulheres cumprem pena em estabelecimento próprio, observados os deveres e direitos da sua condição pessoal (art. 37). O preso conserva todos os direitos não atingidos pela sentença ou pela lei, e o trabalho do preso é remunerado (arts. 38 e 39)."
          ]
        },
        {
          "h": "A.2 Os três regimes",
          "p": [
            "<b>Fechado</b>: cumprido em estabelecimento de segurança máxima ou média; trabalho comum durante o dia e isolamento no repouso noturno (art. 34).",
            "<b>Semiaberto</b>: colônia agrícola, industrial ou estabelecimento similar; admite trabalho externo e frequência a cursos (art. 35).",
            "<b>Aberto</b>: casa do albergado ou local adequado; baseia-se na autodisciplina e no senso de responsabilidade, com trabalho, curso ou outra atividade autorizada fora, e recolhimento à noite e nos dias de folga (art. 36)."
          ]
        },
        {
          "h": "A.3 Escolha do regime inicial",
          "p": [
            "O regime inicial depende da quantidade da pena, da reincidência e das circunstâncias do art. 59. O art. 33 só autoriza o semiaberto e o aberto ao <b>não reincidente</b>, nas faixas de pena acima; para o reincidente com pena de até 4 anos e circunstâncias favoráveis, a Súmula 269 do STJ permite o semiaberto.",
            "A gravidade abstrata do crime não basta para impor regime mais severo (Súmulas 440 do STJ e 718 e 719 do STF). O juiz da sentença deve considerar a detração para fixar o regime inicial (CPP, art. 387, §2º).",
            "No crime contra a administração pública, a progressão de regime depende da reparação do dano ou da devolução do produto do ilícito, com os acréscimos legais (art. 33, §4º)."
          ]
        },
        {
          "h": "A.4 Detração e limite de 40 anos",
          "p": [
            "<b>Detração</b> é o desconto do tempo de prisão provisória, de prisão administrativa e de internação em hospital de custódia na pena ou na medida de segurança. Não se confunde com <b>remição</b>, que desconta dias de trabalho ou estudo na execução penal.",
            "O tempo de cumprimento não pode ultrapassar 40 anos. Se a soma das penas for maior, elas são unificadas para esse limite. A pena unificada não serve de base para novos benefícios, como livramento condicional ou regime mais favorável (Súmula 715 do STF, cuja redação ainda cita o limite antigo de 30 anos)."
          ]
        }
      ],
      "quadro": {
        "titulo": "Regime inicial na pena de reclusão",
        "head": ["Situação", "Regime inicial", "Observação"],
        "rows": [
          ["Pena superior a 8 anos", "Fechado", "Qualquer que seja a reincidência"],
          ["Não reincidente, pena acima de 4 e até 8 anos", "Semiaberto", "Se as circunstâncias do art. 59 forem favoráveis"],
          ["Não reincidente, pena de até 4 anos", "Aberto", "Pode haver substituição por restritivas (art. 44)"],
          ["Reincidente, pena de até 4 anos", "Semiaberto possível", "Súmula 269 do STJ, com circunstâncias favoráveis"]
        ]
      },
      "pegadinhas": [
        "Detenção não começa em regime fechado; só pode ir ao fechado por regressão.",
        "Detração (prisão provisória) e remição (trabalho ou estudo) são institutos diferentes.",
        "O limite do art. 75 é de 40 anos de cumprimento, não de pena aplicada: a condenação pode passar disso."
      ]
    },
    {
      "id": "restritivas",
      "titulo": "Restritivas de direitos e multa (arts. 43 a 52)",
      "curto": "Restritivas e multa",
      "rapido": [
        "Restritivas de direitos são <b>autônomas</b> e <b>substituem</b> a pena privativa de liberdade (art. 44).",
        "Modalidades: prestação pecuniária, perda de bens e valores, prestação de serviço à comunidade ou a entidades públicas, interdição temporária de direitos e limitação de fim de semana (o inciso III do art. 43 foi vetado).",
        "Substituição: pena de até <b>4 anos</b> e crime sem violência ou grave ameaça, ou <b>qualquer pena se o crime for culposo</b>; réu não reincidente em crime doloso; circunstâncias do art. 59 favoráveis.",
        "Multa: de <b>10 a 360 dias-multa</b>; cada dia-multa vale de 1/30 a 5 vezes o maior salário mínimo mensal da época do fato.",
        "A multa não paga é <b>dívida de valor</b>; não pode ser convertida em prisão."
      ],
      "teoria": [
        {
          "h": "B.1 Requisitos da substituição (art. 44)",
          "p": [
            "<b>Objetivos</b>: pena não superior a 4 anos e crime cometido sem violência ou grave ameaça à pessoa; ou crime culposo, qualquer que seja a pena. <b>Subjetivos</b>: réu não reincidente em crime doloso e circunstâncias (culpabilidade, antecedentes, conduta social, personalidade, motivos e circunstâncias) que indiquem a suficiência da medida.",
            "O reincidente pode receber a substituição se ela for socialmente recomendável e a reincidência não decorrer da prática do mesmo crime (art. 44, §3º).",
            "Violência ou grave ameaça contra a mulher no ambiente doméstico impede a substituição (Súmula 588 do STJ)."
          ]
        },
        {
          "h": "B.2 Como a substituição é aplicada e convertida",
          "p": [
            "Pena de <b>até 1 ano</b>: uma restritiva de direitos ou multa. Pena <b>acima de 1 ano</b>: uma restritiva mais multa, ou duas restritivas.",
            "Se a restritiva for descumprida, converte-se em privativa de liberdade pelo tempo da pena substituída, descontado o tempo já cumprido, respeitado o saldo mínimo de 30 dias de detenção ou reclusão (art. 44, §4º).",
            "A restritiva de direitos não pode ser imposta como condição especial do regime aberto (Súmula 493 do STJ)."
          ]
        },
        {
          "h": "B.3 As modalidades de restritivas",
          "p": [
            "<b>Prestação pecuniária</b>: pagamento à vítima, aos dependentes ou a entidade pública ou privada com destinação social, de 1 a 360 salários mínimos, deduzido o valor de eventual reparação civil (art. 45, §1º).",
            "<b>Perda de bens e valores</b>: em favor do Fundo Penitenciário Nacional, até o valor do prejuízo causado ou do proveito obtido, o que for maior.",
            "<b>Prestação de serviço à comunidade</b>: para condenação superior a 6 meses, com 1 hora de tarefa por dia de condenação; se a pena passar de 1 ano, o condenado pode cumprir em tempo menor, nunca inferior à metade da pena (art. 46).",
            "<b>Interdição temporária de direitos</b> (art. 47): cargo ou mandato; profissão que dependa de habilitação; suspensão da habilitação para dirigir; proibição de frequentar lugares; proibição de inscrever-se em concurso, avaliação ou exame públicos.",
            "<b>Limitação de fim de semana</b>: 5 horas diárias aos sábados e domingos, em casa de albergado ou estabelecimento adequado (art. 48)."
          ]
        },
        {
          "h": "B.4 Multa (arts. 49 a 52)",
          "p": [
            "O juiz fixa o <b>número de dias-multa</b> (10 a 360) pela culpabilidade e demais circunstâncias e, depois, o <b>valor do dia-multa</b> pela situação econômica do réu. O valor pode ser aumentado até o triplo se, mesmo no máximo, for ineficaz (art. 60, §1º).",
            "Deve ser paga em 10 dias depois do trânsito em julgado; o juiz pode permitir o pagamento em parcelas ou o desconto em vencimento ou salário. Com a Lei 9.268/1996, a multa não paga é dívida de valor, executada como dívida ativa. O STF decidiu que o Ministério Público tem legitimidade prioritária para executá-la, e a Fazenda Pública age subsidiariamente (ADI 3.150).",
            "Sobrevindo doença mental ao condenado, a execução da multa fica suspensa (art. 52)."
          ]
        }
      ],
      "pegadinhas": [
        "A pena de até 4 anos só permite substituição se o crime for sem violência ou grave ameaça; no crime culposo, a quantidade da pena não importa.",
        "A multa não pode mais ser convertida em prisão; o descumprimento leva à execução como dívida de valor.",
        "O inciso III do art. 43 foi vetado: as restritivas hoje são cinco, não seis."
      ]
    },
    {
      "id": "sursis",
      "titulo": "Suspensão condicional da pena — sursis (arts. 77 a 82)",
      "curto": "Sursis",
      "rapido": [
        "Suspende a <b>execução</b> da pena privativa de liberdade de até <b>2 anos</b>, por período de prova de <b>2 a 4 anos</b>.",
        "Condições: condenado não reincidente em crime doloso; circunstâncias favoráveis; <b>não cabimento da substituição</b> por restritivas de direitos (art. 44).",
        "Sursis etário ou humanitário: pena de até <b>4 anos</b>, período de prova de <b>4 a 6 anos</b>, para maior de 70 anos ou por razões de saúde.",
        "No primeiro ano, o condenado presta serviço à comunidade ou cumpre limitação de fim de semana (sursis simples) (art. 78, §1º).",
        "Findo o prazo sem revogação, a pena é considerada extinta (art. 82)."
      ],
      "teoria": [
        {
          "h": "C.1 Requisitos",
          "p": [
            "A pena aplicada não pode ser superior a 2 anos (4 anos nos casos etário e humanitário), o condenado não pode ser reincidente em crime doloso (a condenação anterior apenas à multa não impede) e as circunstâncias do art. 59 devem autorizar a suspensão.",
            "Se for cabível a substituição por restritivas de direitos, <b>ela tem preferência</b> sobre o sursis. Por isso o sursis só vem quando a substituição não for possível ou suficiente."
          ]
        },
        {
          "h": "C.2 Condições e revogação",
          "p": [
            "Condições do sursis simples e especial estão nos arts. 78 e 79; o juiz pode impor outras condições adequadas ao fato e à situação do condenado.",
            "Revogação <b>obrigatória</b> (art. 81): condenação irrecorrível por crime doloso; frustrar, embora solvente, a execução de pena de multa ou não reparar o dano sem motivo justificado; descumprir a condição do art. 78, §1º. Revogação <b>facultativa</b>: descumprir outra condição ou ser condenado, com decisão irrecorrível, por crime culposo ou contravenção a pena privativa de liberdade ou restritiva de direitos.",
            "O sursis não se estende às penas restritivas de direitos nem à multa (art. 80)."
          ]
        },
        {
          "h": "C.3 Não confundir com outros institutos",
          "p": [
            "<b>Sursis da pena</b>: após a condenação; suspende a execução. <b>Suspensão condicional do processo</b> (Lei 9.099/1995, art. 89): antes da sentença, pena mínima de até 1 ano. <b>Acordo de não persecução penal</b> (CPP, art. 28-A): antes da denúncia, crime sem violência ou grave ameaça, pena mínima inferior a 4 anos.",
            "Nos concursos de crimes, a pena mínima é somada ou aumentada para verificar o cabimento da suspensão do processo (Súmulas 243 do STJ e 723 do STF)."
          ]
        }
      ],
      "pegadinhas": [
        "O sursis suspende a execução da pena, não o processo.",
        "Reincidente em crime doloso não tem direito ao sursis; condenação anterior só à multa não impede.",
        "Cabendo substituição por restritivas de direitos, não se concede o sursis."
      ]
    },
    {
      "id": "livramento",
      "titulo": "Livramento condicional (arts. 83 a 90)",
      "curto": "Livramento",
      "rapido": [
        "Concessão antecipada da liberdade ao condenado a pena privativa de liberdade igual ou superior a <b>2 anos</b>.",
        "Cumprimento mínimo: <b>mais de 1/3</b> (não reincidente em crime doloso e com bons antecedentes); <b>mais de 1/2</b> (reincidente em crime doloso); <b>mais de 2/3</b> nos crimes hediondos, tortura, tráfico e terrorismo, se não for reincidente específico.",
        "Exige comportamento satisfatório, bom desempenho no trabalho, aptidão para prover a própria subsistência e reparação do dano, salvo impossibilidade de fazê-lo.",
        "Pode somar penas de infrações diferentes (art. 84).",
        "Revoga-se a liberdade condicional quando o liberado é condenado a pena privativa de liberdade por crime cometido durante o benefício ou por crime anterior."
      ],
      "teoria": [
        {
          "h": "D.1 Requisitos objetivos e subjetivos",
          "p": [
            "<b>Objetivos</b>: pena igual ou superior a 2 anos; cumprimento de fração mínima (1/3, 1/2 ou 2/3, conforme o caso); reparação do dano, salvo impossibilidade.",
            "<b>Subjetivos</b>: comportamento satisfatório durante a execução, bom desempenho no trabalho e aptidão para prover a própria subsistência com trabalho honesto. Para crime doloso com violência ou grave ameaça à pessoa, o juiz deve constatar condições pessoais que façam presumir que o condenado não voltará a delinquir."
          ]
        },
        {
          "h": "D.2 Revogação e extinção da pena",
          "p": [
            "<b>Revogação obrigatória</b> (art. 86): condenação irrecorrível a pena privativa de liberdade por crime cometido durante a vigência do benefício, ou por crime anterior, observada a soma do art. 84. <b>Revogação facultativa</b> (art. 87): descumprimento das obrigações da sentença ou condenação irrecorrível por crime ou contravenção a pena que não seja privativa de liberdade.",
            "Revogado o livramento, não pode ser concedido de novo e, em regra, não se desconta da pena o tempo em que o condenado esteve solto (art. 88). Se o prazo termina sem revogação, a pena é considerada extinta (art. 90), mas o juiz só a declara depois do trânsito em julgado de eventual processo por crime cometido na vigência do benefício (art. 89).",
            "A falta grave <b>não interrompe</b> o prazo para obter livramento condicional (Súmula 441 do STJ), ao contrário da progressão de regime (Súmula 534 do STJ)."
          ]
        }
      ],
      "pegadinhas": [
        "A fração do livramento no crime hediondo é de mais de 2/3, e só vale para quem não é reincidente específico nesses crimes.",
        "Falta grave interrompe o prazo para progressão de regime, mas não para o livramento condicional.",
        "O livramento condicional não se concede ao condenado a pena inferior a 2 anos."
      ]
    }
  ],
  "importancia": {
    "nivel": 4,
    "texto": "Tema recorrente nas provas de investigador: a banca cobra números (anos, frações, dias-multa) e a diferença entre institutos parecidos (sursis, livramento, substituição, suspensão do processo). Conhecer as faixas de regime e os requisitos de cada benefício resolve a maior parte das questões.",
    "decore": [
      ["Regime inicial (não reincidente)", "mais de 8 anos: <b>fechado</b>; mais de 4 até 8: <b>semiaberto</b>; até 4: <b>aberto</b>"],
      ["Limite de cumprimento (art. 75)", "<b>40 anos</b>"],
      ["Substituição por restritivas", "pena até <b>4 anos</b> sem violência ou grave ameaça, ou crime <b>culposo</b>"],
      ["Multa", "<b>10 a 360</b> dias-multa; dia-multa de <b>1/30 a 5</b> salários mínimos"],
      ["Prestação pecuniária", "de <b>1 a 360</b> salários mínimos"],
      ["Prestação de serviço", "pena acima de <b>6 meses</b>; <b>1 hora</b> por dia de condenação"],
      ["Sursis simples", "pena até <b>2 anos</b>; período de prova de <b>2 a 4 anos</b>"],
      ["Sursis etário ou humanitário", "pena até <b>4 anos</b>; prova de <b>4 a 6 anos</b>; maior de <b>70</b> anos"],
      ["Livramento condicional", "pena de <b>2 anos</b> ou mais; <b>1/3</b>, <b>1/2</b> ou <b>2/3</b> (hediondos)"]
    ],
    "macetes": [
      ["Reclusão pode ir ao fechado, detenção não", "A detenção só começa em semiaberto ou aberto, e vai ao fechado apenas por regressão."],
      ["Sursis suspende a execução; livramento antecipa a liberdade", "No sursis, o condenado nem chega a cumprir a pena; no livramento, cumpre parte dela e sai com condições."],
      ["Falta grave: interrompe a progressão, não o livramento", "Súmulas 534 e 441 do STJ."]
    ]
  },
  "comparativo": {
    "titulo": "Sursis × livramento condicional",
    "head": ["Sursis (suspensão condicional da pena)", "Livramento condicional"],
    "rows": [
      ["<b>Momento:</b> logo após a condenação, antes de iniciar o cumprimento", "<b>Momento:</b> depois de cumprida parte da pena"],
      ["<b>Pena:</b> até 2 anos (4 anos no sursis etário ou humanitário)", "<b>Pena:</b> igual ou superior a 2 anos"],
      ["<b>Prazo de prova:</b> 2 a 4 anos (4 a 6 no etário ou humanitário)", "<b>Prazo de prova:</b> o restante da pena"],
      ["<b>Execução:</b> o condenado não chega a cumprir a pena na prisão", "<b>Execução:</b> o condenado já cumpriu parte da pena e sai com condições"],
      ["<b>Reincidência:</b> afasta, se em crime doloso", "<b>Reincidência:</b> exige fração maior (1/2) se em crime doloso"]
    ]
  },
  "prova": [
    {"tipo": "ce", "enun": "O condenado à pena de detenção pode iniciar o cumprimento em regime fechado.", "gab": "Errado", "com": "A detenção começa no semiaberto ou no aberto; só se passa ao fechado por regressão, quando houver necessidade (art. 33, caput)."},
    {"tipo": "ce", "enun": "Réu não reincidente, condenado a 4 anos de reclusão por crime sem violência ou grave ameaça, pode ter a pena substituída por restritivas de direitos.", "gab": "Certo", "com": "Estão presentes os requisitos do art. 44: pena não superior a 4 anos, crime sem violência ou grave ameaça e réu não reincidente."},
    {"tipo": "ce", "enun": "A pena de multa não paga pode ser convertida em pena privativa de liberdade.", "gab": "Errado", "com": "Desde a Lei 9.268/1996 a multa é dívida de valor, executada como dívida ativa; não se converte em prisão."},
    {"tipo": "ce", "enun": "A falta grave interrompe o prazo para a obtenção do livramento condicional.", "gab": "Errado", "com": "A Súmula 441 do STJ afirma o contrário. A falta grave interrompe a contagem para a progressão de regime (Súmula 534)."},
    {"tipo": "caso", "enun": "Condenado primário, pena de 3 anos de reclusão por furto qualificado, circunstâncias favoráveis. Qual o regime inicial e que benefício a lei admite?", "com": "Regime inicial aberto (não reincidente, pena até 4 anos). Como o furto qualificado é sem violência ou grave ameaça, cabe a substituição por restritivas de direitos, que tem preferência sobre o sursis."},
    {"tipo": "caso", "enun": "Condenado não reincidente de 72 anos, pena de 3 anos e 6 meses. O juiz pode conceder suspensão condicional da pena? Por quê?", "com": "Sim, em tese: o sursis etário admite pena de até 4 anos para o maior de 70 anos, com período de prova de 4 a 6 anos, desde que a substituição por restritivas não seja cabível."}
  ],
  "resumo": [
    "As penas são de três espécies: privativas de liberdade, restritivas de direitos e multa.",
    "Reclusão pode iniciar em fechado, semiaberto ou aberto; detenção, só em semiaberto ou aberto.",
    "Não reincidente: mais de 8 anos, fechado; mais de 4 até 8, semiaberto; até 4, aberto.",
    "A detração desconta o tempo de prisão provisória; a remição desconta trabalho ou estudo na execução.",
    "A substituição por restritivas exige pena até 4 anos e crime sem violência ou grave ameaça, ou crime culposo.",
    "A multa vai de 10 a 360 dias-multa e é dívida de valor, sem conversão em prisão.",
    "O sursis suspende a pena de até 2 anos por 2 a 4 anos; no etário ou humanitário, 4 anos de pena e prova de 4 a 6.",
    "O livramento exige pena de 2 anos ou mais e cumprimento de 1/3, 1/2 ou 2/3, conforme o caso."
  ],
  "checklist": [
    "Diferenciar reclusão de detenção quanto ao regime inicial",
    "Aplicar as faixas de regime a casos com e sem reincidência",
    "Distinguir detração de remição",
    "Listar os requisitos do art. 44 e as modalidades de restritivas",
    "Calcular a conversão da restritiva e o saldo mínimo de 30 dias",
    "Explicar a execução da multa depois da Lei 9.268/1996 e da ADI 3.150",
    "Distinguir sursis, suspensão condicional do processo e acordo de não persecução penal",
    "Enunciar as frações do livramento condicional e as hipóteses de revogação",
    "Aplicar as Súmulas 441 e 534 do STJ"
  ],
  "lei": [],
  "juris": [
    {"id": "stj-s493", "trib": "STJ", "tipo": "Súmula", "num": "493", "sec": "restritivas", "status": "vigente", "data": "Súmula do STJ", "titulo": "Restritiva como condição do regime aberto", "texto": "É inadmissível a fixação de pena substitutiva (art. 44 do CP) como condição especial ao regime aberto.", "explica": "A substituição é alternativa ao regime e não pode ser usada como condição do aberto.", "lei": [], "fonte": STJS},
    {"id": "stj-s588", "trib": "STJ", "tipo": "Súmula", "num": "588", "sec": "restritivas", "status": "vigente", "data": "Súmula do STJ", "titulo": "Violência doméstica contra a mulher e substituição", "texto": "A prática de crime ou contravenção penal contra a mulher com violência ou grave ameaça no ambiente doméstico impossibilita a substituição da pena privativa de liberdade por restritiva de direitos.", "explica": "Confira se alguma lei posterior alterou o tema antes da prova.", "lei": [], "fonte": STJS},
    {"id": "stf-adi3150", "trib": "STF", "tipo": "Controle concentrado", "num": "ADI 3.150", "sec": "restritivas", "status": "vigente", "data": "Plenário do STF, 2018/2019", "titulo": "Execução da pena de multa", "texto": "O Ministério Público tem legitimidade prioritária para executar a multa penal; a Fazenda Pública atua de forma subsidiária.", "explica": "Mantém a multa como sanção penal, mesmo executada como dívida de valor.", "lei": [], "fonte": STFJ},
    {"id": "stj-s441", "trib": "STJ", "tipo": "Súmula", "num": "441", "sec": "livramento", "status": "vigente", "data": "Súmula do STJ", "titulo": "Falta grave e livramento condicional", "texto": "A falta grave não interrompe o prazo para obtenção de livramento condicional.", "explica": "Para a progressão de regime ocorre o contrário (Súmula 534).", "lei": [], "fonte": STJS},
    {"id": "stj-s534", "trib": "STJ", "tipo": "Súmula", "num": "534", "sec": "livramento", "status": "atencao", "data": "Súmula do STJ", "titulo": "Falta grave e progressão de regime", "texto": "A prática de falta grave interrompe a contagem do prazo para fins de progressão de regime de cumprimento de pena, o qual se reinicia a partir do cometimento dessa infração.", "explica": "A Lei 13.964/2019 mudou os percentuais de progressão; confira a redação atual do art. 112 da LEP.", "lei": [], "fonte": STJS},
    {"id": "stf-s715", "trib": "STF", "tipo": "Súmula", "num": "715", "sec": "regimes", "status": "atencao", "data": "Súmula do STF", "titulo": "Pena unificada e benefícios", "texto": "A pena unificada para atender ao limite máximo de cumprimento não é considerada para a concessão de outros benefícios, como o livramento condicional ou o regime mais favorável de execução.", "explica": "O texto da súmula cita o limite antigo de 30 anos; o limite atual do art. 75 é de 40 anos (Lei 13.964/2019). Confira.", "lei": [], "fonte": STFJ}
  ],
  "cards": [
    {"id": "pn1", "tipo": "numero", "sec": "regimes", "f": "Limite máximo de cumprimento de pena (art. 75).", "v": "<b>40 anos</b> (Lei 13.964/2019).", "lei": []},
    {"id": "pn2", "tipo": "lacuna", "sec": "regimes", "f": "Detenção começa em regime ______ ou ______, salvo necessidade de transferência ao fechado.", "v": "<b>semiaberto</b> · <b>aberto</b>", "lei": []},
    {"id": "pn3", "tipo": "distincao", "sec": "regimes", "f": "Detração × remição.", "v": "<b>Detração</b>: desconta a prisão provisória na pena. <b>Remição</b>: desconta dias de trabalho ou estudo durante a execução.", "lei": []},
    {"id": "pn4", "tipo": "numero", "sec": "restritivas", "f": "Pena máxima para a substituição por restritivas em crime doloso sem violência ou grave ameaça.", "v": "<b>4 anos</b>. Crime culposo: qualquer pena.", "lei": []},
    {"id": "pn5", "tipo": "numero", "sec": "restritivas", "f": "Limites da pena de multa em dias-multa e do valor do dia-multa.", "v": "<b>10 a 360</b> dias-multa; <b>1/30 a 5</b> vezes o maior salário mínimo.", "lei": []},
    {"id": "pn6", "tipo": "ce", "sec": "restritivas", "f": "Certo ou errado: a multa não paga é convertida em detenção.", "v": "<b>Errado.</b> É dívida de valor (Lei 9.268/1996).", "lei": []},
    {"id": "pn7", "tipo": "juris", "sec": "restritivas", "f": "Homem condenado por lesão corporal contra a esposa, com violência, a 6 meses. Cabe substituir a pena por restritiva de direitos?", "v": "<b>Não.</b> Súmula 588 do STJ.", "lei": [], "j": ["stj-s588"]},
    {"id": "pn8", "tipo": "numero", "sec": "sursis", "f": "Sursis simples: pena máxima e período de prova.", "v": "Pena até <b>2 anos</b>; prova de <b>2 a 4 anos</b>.", "lei": []},
    {"id": "pn9", "tipo": "distincao", "sec": "sursis", "f": "Sursis × suspensão condicional do processo × ANPP.", "v": "<b>Sursis</b>: após a condenação. <b>Suspensão do processo</b>: pena mínima até 1 ano, Lei 9.099. <b>ANPP</b>: antes da denúncia, pena mínima menor que 4 anos, sem violência.", "lei": []},
    {"id": "pn10", "tipo": "caso", "sec": "sursis", "f": "Réu de 71 anos condenado a 4 anos de reclusão, sem substituição cabível. O que se pode conceder?", "v": "<b>Sursis etário</b>: pena de até 4 anos, prova de 4 a 6 anos, para maior de 70 anos.", "lei": []},
    {"id": "pn11", "tipo": "numero", "sec": "livramento", "f": "Fração mínima do livramento condicional para o reincidente em crime doloso.", "v": "Mais de <b>1/2</b> da pena. Hediondos: mais de <b>2/3</b>.", "lei": []},
    {"id": "pn12", "tipo": "juris", "sec": "livramento", "f": "O condenado cometeu falta grave. Ela interrompe o prazo do livramento condicional?", "v": "<b>Não.</b> Súmula 441 do STJ. A progressão de regime, sim (Súmula 534).", "lei": [], "j": ["stj-s441"]}
  ],
  "questoes": []
};

/* ======================= CONCURSO DE CRIMES ======================= */
T.penal_concurso_crimes = {
  "meta": {
    "tema": "Concurso de Crimes: material, formal e crime continuado",
    "atualizado": AT,
    "caminho": ["Direito Penal", "Parte Geral", "Pena e punibilidade"],
    "foco": "Concurso material (art. 69), concurso formal próprio e impróprio (art. 70), crime continuado simples e qualificado (art. 71), multa no concurso (art. 72), limite de 40 anos (art. 75) e súmulas.",
    "aviso": "A lei seca literal ainda não foi transcrita neste módulo: confira os arts. 69 a 72 e 75 no Código Penal (Planalto). As frações de aumento por número de crimes vêm da jurisprudência do STJ, não da lei.",
    "fontes": [CP]
  },
  "secoes": [
    {
      "id": "material",
      "titulo": "Concurso material (art. 69)",
      "curto": "Material",
      "rapido": [
        "<b>Duas ou mais ações ou omissões</b>, que geram dois ou mais crimes, idênticos ou não.",
        "Sistema do <b>cúmulo material</b>: somam-se as penas privativas de liberdade.",
        "Se há reclusão e detenção, cumpre-se primeiro a reclusão.",
        "Se uma pena privativa não for suspensa, não cabe substituição por restritivas para as demais (art. 69, §1º)."
      ],
      "teoria": [
        {
          "h": "A.1 Requisitos e consequências",
          "p": [
            "O concurso material exige <b>pluralidade de condutas</b> e <b>pluralidade de crimes</b>. Não importa se os crimes são da mesma espécie (concurso homogêneo) ou de espécies diferentes (concurso heterogêneo).",
            "As penas são somadas. Se forem compatíveis entre si, cumprem-se simultaneamente; as demais, sucessivamente, a começar pela reclusão (art. 69, §2º)."
          ]
        }
      ],
      "pegadinhas": [
        "Concurso material não exige que os crimes sejam diferentes: roubar duas vezes, em dias distintos, sem os requisitos do art. 71, é concurso material homogêneo.",
        "A soma é das penas; a multa segue regra própria (art. 72)."
      ]
    },
    {
      "id": "formal",
      "titulo": "Concurso formal (art. 70)",
      "curto": "Formal",
      "rapido": [
        "<b>Uma só ação ou omissão</b> que produz dois ou mais crimes, idênticos ou não.",
        "<b>Formal próprio</b> (perfeito): aplica-se a mais grave das penas, ou uma só se forem iguais, aumentada de <b>1/6 até 1/2</b>.",
        "<b>Formal impróprio</b> (imperfeito): a ação é dolosa e os crimes resultam de <b>desígnios autônomos</b>; as penas se somam, como no concurso material.",
        "Limite do concurso material benéfico: a pena do formal não pode ser maior que a do concurso material."
      ],
      "teoria": [
        {
          "h": "B.1 Formal próprio e impróprio",
          "p": [
            "No concurso formal <b>próprio</b>, a conduta única produz vários resultados sem que o agente queira cada um com vontade autônoma: aplica-se o sistema da <b>exasperação</b> (pena mais grave, aumentada de 1/6 a 1/2). O aumento cresce com o número de crimes: a jurisprudência do STJ usa 1/6 para 2 crimes, 1/5 para 3, 1/4 para 4, 1/3 para 5 e 1/2 para 6 ou mais.",
            "No <b>impróprio</b>, há dolo e <b>desígnios autônomos</b> em relação a cada resultado; por isso as penas são somadas (art. 70, parte final). A banca costuma cobrar a diferença: o próprio exige unidade de desígnio, e o impróprio, pluralidade de desígnios. A jurisprudência majoritária admite os desígnios autônomos também no dolo eventual; confira o enunciado."
          ]
        },
        {
          "h": "B.2 Concurso material benéfico",
          "p": [
            "Se a exasperação do concurso formal resultar em pena maior do que a soma das penas do concurso material, aplica-se a soma, mais favorável (art. 70, parágrafo único). Isso é raro, mas aparece em questões numéricas."
          ]
        }
      ],
      "pegadinhas": [
        "No concurso formal, a conduta é <b>única</b>; no material, as condutas são várias.",
        "Desígnios autônomos transformam o concurso formal em impróprio: as penas se somam, sem aumento de 1/6 a 1/2.",
        "O aumento do concurso formal varia de 1/6 a 1/2; o do crime continuado, de 1/6 a 2/3."
      ]
    },
    {
      "id": "continuado",
      "titulo": "Crime continuado (art. 71)",
      "curto": "Continuado",
      "rapido": [
        "Duas ou mais ações, crimes da <b>mesma espécie</b>, com <b>semelhança de tempo, lugar, maneira de execução</b> e outras condições: os seguintes são continuação do primeiro.",
        "Aplica-se a mais grave das penas, ou uma só, <b>aumentada de 1/6 a 2/3</b>.",
        "<b>Continuidade específica</b> (parágrafo único): crimes dolosos, contra vítimas diferentes, com violência ou grave ameaça à pessoa — o juiz pode aumentar até o <b>triplo</b>, respeitado o art. 75.",
        "É uma ficção jurídica criada em benefício do réu (sistema da exasperação)."
      ],
      "teoria": [
        {
          "h": "C.1 Requisitos e teorias",
          "p": [
            "Os requisitos objetivos são: pluralidade de ações; crimes da mesma espécie (mesmo tipo penal, incluindo as formas simples, qualificada, tentada ou consumada); e as condições de tempo, lugar, maneira de execução e outras semelhantes. Há três teorias sobre a unidade de desígnios: a <b>objetiva</b>, a <b>subjetiva</b> e a <b>mista</b> (objetivo-subjetiva). A orientação mais cobrada é a de que o art. 71 adota a teoria objetiva; confira o gabarito da banca e a jurisprudência atual.",
            "O intervalo entre as condutas não pode ser longo; a jurisprudência do STJ costuma admitir até 30 dias entre os crimes, e se for maior a continuidade tende a ser afastada."
          ]
        },
        {
          "h": "C.2 Cálculo do aumento",
          "p": [
            "O aumento de 1/6 a 2/3 depende do número de crimes: 1/6 para 2; 1/5 para 3; 1/4 para 4; 1/3 para 5; 1/2 para 6; 2/3 para 7 ou mais (jurisprudência do STJ).",
            "Na continuidade específica, o aumento pode chegar ao <b>triplo</b> da pena mais grave, com observância do concurso material benéfico (art. 70, parágrafo único) e do limite de 40 anos (art. 75)."
          ]
        }
      ],
      "quadro": {
        "titulo": "Material × formal × continuado",
        "head": ["Concurso", "Condutas e sistema de pena", "Aumento"],
        "rows": [
          ["Material (art. 69)", "Várias condutas e vários crimes; cúmulo material (soma)", "Não há; as penas se somam"],
          ["Formal próprio (art. 70, 1ª parte)", "Uma conduta e vários crimes; exasperação", "1/6 a 1/2"],
          ["Formal impróprio (art. 70, 2ª parte)", "Uma conduta dolosa, desígnios autônomos; cúmulo material", "Soma das penas"],
          ["Continuado (art. 71, caput)", "Várias condutas, mesma espécie, condições semelhantes; exasperação", "1/6 a 2/3"],
          ["Continuado específico (art. 71, parágrafo único)", "Dolosos, vítimas diferentes, violência ou grave ameaça", "Até o triplo"]
        ]
      },
      "pegadinhas": [
        "Crime continuado exige crimes da <b>mesma espécie</b>; roubo e estupro, por exemplo, não admitem continuidade entre si.",
        "A prescrição, no crime continuado, regula-se pela pena imposta na sentença, sem o acréscimo da continuação (Súmula 497 do STJ).",
        "Lei penal mais grave aplica-se ao crime continuado se sua vigência é anterior à cessação da continuidade (Súmula 711 do STF)."
      ]
    },
    {
      "id": "limites",
      "titulo": "Multa, limite de 40 anos e reflexos processuais (arts. 72 e 75)",
      "curto": "Limites e reflexos",
      "rapido": [
        "No concurso de crimes, as <b>multas</b> são aplicadas <b>distinta e integralmente</b> (art. 72).",
        "O limite de cumprimento é de <b>40 anos</b> (art. 75); a soma das penas é unificada para esse limite.",
        "Nova condenação por fato posterior ao início do cumprimento gera <b>nova unificação</b>, desprezado o tempo já cumprido (art. 75, §2º).",
        "A extinção da punibilidade incide sobre <b>cada crime</b> isoladamente (art. 119)."
      ],
      "teoria": [
        {
          "h": "D.1 Multa e unificação",
          "p": [
            "Quando há concurso de crimes, a multa de cada crime é calculada à parte e <b>não sofre a exasperação</b> do concurso formal ou do crime continuado. Cada infração mantém a sua multa.",
            "A soma das penas pode ultrapassar 40 anos, mas o cumprimento é limitado a 40; o excedente não é executado. A pena unificada não é parâmetro para benefícios, como livramento e progressão (Súmula 715 do STF)."
          ]
        },
        {
          "h": "D.2 Reflexos na suspensão do processo e na prescrição",
          "p": [
            "Para a suspensão condicional do processo (Lei 9.099, art. 89), a pena mínima é <b>somada</b> no concurso material ou <b>aumentada</b> pela fração mínima no concurso formal e no crime continuado; se ultrapassar 1 ano, não cabe o benefício (Súmulas 243 do STJ e 723 do STF).",
            "A prescrição e as demais causas de extinção da punibilidade são contadas <b>isoladamente</b> para cada crime do concurso (art. 119)."
          ]
        }
      ],
      "pegadinhas": [
        "A multa não é exasperada: cada crime mantém a sua, e as multas são somadas.",
        "O limite de 40 anos é de <b>cumprimento</b>, não de condenação."
      ]
    }
  ],
  "importancia": {
    "nivel": 4,
    "texto": "Concurso de crimes cai em questões numéricas e de distinção entre institutos parecidos. A banca pede o sistema de pena de cada concurso, as frações de aumento e o efeito sobre a suspensão do processo e a prescrição.",
    "decore": [
      ["Concurso material (art. 69)", "várias condutas; as penas se <b>somam</b>"],
      ["Formal próprio (art. 70)", "uma conduta; pena mais grave aumentada de <b>1/6 a 1/2</b>"],
      ["Formal impróprio", "desígnios <b>autônomos</b>; as penas se <b>somam</b>"],
      ["Crime continuado (art. 71)", "mesma espécie; aumento de <b>1/6 a 2/3</b>"],
      ["Continuado específico", "violência ou grave ameaça, vítimas diferentes: até o <b>triplo</b>"],
      ["Multa (art. 72)", "aplicada <b>distinta e integralmente</b>"],
      ["Limite de cumprimento (art. 75)", "<b>40 anos</b>"],
      ["Prescrição (art. 119)", "conta-se <b>crime a crime</b>"]
    ],
    "macetes": [
      ["Material soma, formal e continuado exasperam", "No material somam-se as penas; no formal próprio e no continuado, tomam-se a mais grave e um aumento."],
      ["Formal: 1/6 a 1/2; continuado: 1/6 a 2/3", "O teto do continuado é maior; no específico, vai até o triplo."],
      ["Desígnios autônomos viram material", "É a regra do formal impróprio."]
    ]
  },
  "comparativo": {
    "titulo": "Concurso formal × crime continuado",
    "head": ["Concurso formal (art. 70)", "Crime continuado (art. 71)"],
    "rows": [
      ["<b>Conduta:</b> uma só ação ou omissão", "<b>Conduta:</b> várias ações ou omissões"],
      ["<b>Crimes:</b> idênticos ou não", "<b>Crimes:</b> da mesma espécie"],
      ["<b>Condições:</b> não exige semelhança de tempo e lugar", "<b>Condições:</b> exige semelhança de tempo, lugar e modo de execução"],
      ["<b>Aumento:</b> 1/6 a 1/2", "<b>Aumento:</b> 1/6 a 2/3 (até o triplo no específico)"],
      ["<b>Exceção:</b> desígnios autônomos somam as penas", "<b>Exceção:</b> continuidade específica pode triplicar a pena"]
    ]
  },
  "prova": [
    {"tipo": "ce", "enun": "No concurso formal impróprio, aplica-se a pena do crime mais grave aumentada de 1/6 até 1/2.", "gab": "Errado", "com": "No formal impróprio, a conduta é dolosa e há desígnios autônomos, então as penas se somam, como no concurso material."},
    {"tipo": "ce", "enun": "No crime continuado, o juiz aplica a pena do crime mais grave, ou uma só se forem iguais, aumentada de 1/6 a 2/3.", "gab": "Certo", "com": "É a regra do art. 71, caput, que adota o sistema da exasperação."},
    {"tipo": "ce", "enun": "No concurso de crimes, a pena de multa também é aumentada pela regra da exasperação.", "gab": "Errado", "com": "O art. 72 manda aplicar as multas distinta e integralmente, sem exasperação."},
    {"tipo": "ce", "enun": "A prescrição do crime continuado regula-se pela pena imposta na sentença, sem considerar o acréscimo da continuação.", "gab": "Certo", "com": "É o teor da Súmula 497 do STJ."},
    {"tipo": "caso", "enun": "Em uma só ação, o agente atira e mata duas pessoas, com dolo em relação a cada vítima e vontades autônomas. Que concurso se configura e como se calcula a pena?", "com": "Concurso formal impróprio: há uma conduta, mas desígnios autônomos. As penas se somam (art. 70, parte final)."},
    {"tipo": "caso", "enun": "Furtos de mesma espécie, na mesma cidade e com o mesmo modo, em cinco dias seguidos. A pena do mais grave é de 2 anos. Qual a pena provável, pelo critério do STJ para 5 crimes?", "com": "Crime continuado, com aumento de 1/3 para 5 infrações: 2 anos e 8 meses (24 meses mais 8 meses)."}
  ],
  "resumo": [
    "Concurso material: várias condutas e crimes; as penas se somam.",
    "Concurso formal próprio: uma conduta, vários crimes; pena mais grave com aumento de 1/6 a 1/2.",
    "Concurso formal impróprio: desígnios autônomos; as penas se somam.",
    "Crime continuado: mesma espécie e condições semelhantes; aumento de 1/6 a 2/3.",
    "Continuidade específica: violência ou grave ameaça, vítimas diferentes, aumento de até o triplo.",
    "As multas são aplicadas distinta e integralmente (art. 72).",
    "O limite de cumprimento da pena é de 40 anos (art. 75).",
    "A prescrição conta-se crime a crime, sem o acréscimo do concurso (art. 119; Súmula 497 do STJ)."
  ],
  "checklist": [
    "Diferenciar material, formal e continuado pelo número de condutas",
    "Explicar o formal próprio e o impróprio (desígnios autônomos)",
    "Citar as frações de aumento de cada concurso",
    "Descrever a continuidade específica (art. 71, parágrafo único)",
    "Aplicar o art. 72 à multa",
    "Aplicar as Súmulas 243 do STJ, 723 e 711 do STF e 497 do STJ",
    "Calcular a pena em casos com número de crimes dado",
    "Explicar o limite de 40 anos e a unificação"
  ],
  "lei": [],
  "juris": [
    {"id": "stj-s497", "trib": "STJ", "tipo": "Súmula", "num": "497", "sec": "continuado", "status": "vigente", "data": "Súmula do STJ", "titulo": "Prescrição no crime continuado", "texto": "Quando se tratar de crime continuado, a prescrição regula-se pela pena imposta na sentença, não se computando o acréscimo decorrente da continuação.", "explica": "A prescrição é contada crime a crime, sem o aumento da continuidade.", "lei": [], "fonte": STJS},
    {"id": "stf-s711", "trib": "STF", "tipo": "Súmula", "num": "711", "sec": "continuado", "status": "vigente", "data": "Súmula do STF", "titulo": "Lei mais grave no crime continuado", "texto": "A lei penal mais grave aplica-se ao crime continuado ou ao crime permanente, se a sua vigência é anterior à cessação da continuidade ou da permanência.", "explica": "É exceção à regra da irretroatividade da lei mais gravosa.", "lei": [], "fonte": STFJ},
    {"id": "stj-s243", "trib": "STJ", "tipo": "Súmula", "num": "243", "sec": "limites", "status": "vigente", "data": "Súmula do STJ", "titulo": "Suspensão do processo e concurso de crimes", "texto": "O benefício da suspensão do processo não é aplicável em relação às infrações penais cometidas em concurso material, concurso formal ou continuidade delitiva, quando a pena mínima cominada, seja pelo somatório, seja pela incidência da majorante, ultrapassar o limite de um ano.", "explica": "Soma-se a pena mínima no material e aplica-se a fração mínima no formal e no continuado.", "lei": [], "fonte": STJS},
    {"id": "stf-s723", "trib": "STF", "tipo": "Súmula", "num": "723", "sec": "limites", "status": "vigente", "data": "Súmula do STF", "titulo": "Suspensão do processo e crime continuado", "texto": "Não se admite a suspensão condicional do processo por crime continuado, se a soma da pena mínima da infração mais grave com o aumento mínimo de 1/6 for superior a um ano.", "explica": "É a mesma lógica da Súmula 243 do STJ.", "lei": [], "fonte": STFJ}
  ],
  "cards": [
    {"id": "cc1", "tipo": "numero", "sec": "formal", "f": "Aumento da pena no concurso formal próprio.", "v": "De <b>1/6 até 1/2</b>.", "lei": []},
    {"id": "cc2", "tipo": "distincao", "sec": "formal", "f": "Concurso formal próprio × impróprio.", "v": "<b>Próprio</b>: uma conduta, sem desígnios autônomos; exasperação. <b>Impróprio</b>: dolo e desígnios autônomos; soma das penas.", "lei": []},
    {"id": "cc3", "tipo": "ce", "sec": "material", "f": "Certo ou errado: no concurso material, as penas privativas de liberdade são somadas.", "v": "<b>Certo</b> (art. 69).", "lei": []},
    {"id": "cc4", "tipo": "numero", "sec": "continuado", "f": "Aumento da pena no crime continuado simples e no específico.", "v": "<b>1/6 a 2/3</b>; no específico, até o <b>triplo</b>.", "lei": []},
    {"id": "cc5", "tipo": "lacuna", "sec": "continuado", "f": "Crime continuado: crimes da mesma ______, com semelhança de tempo, ______ e maneira de execução.", "v": "<b>espécie</b> · <b>lugar</b>", "lei": []},
    {"id": "cc6", "tipo": "juris", "sec": "continuado", "f": "Como se conta a prescrição no crime continuado?", "v": "Pela pena imposta na sentença, <b>sem</b> o acréscimo da continuação (Súmula 497 do STJ).", "lei": [], "j": ["stj-s497"]},
    {"id": "cc7", "tipo": "distincao", "sec": "continuado", "f": "Formal × continuado quanto ao número de condutas.", "v": "<b>Formal</b>: uma conduta. <b>Continuado</b>: várias, da mesma espécie e em condições semelhantes.", "lei": []},
    {"id": "cc8", "tipo": "numero", "sec": "limites", "f": "Limite de cumprimento da pena (art. 75).", "v": "<b>40 anos</b>.", "lei": []},
    {"id": "cc9", "tipo": "ce", "sec": "limites", "f": "Certo ou errado: no concurso, a multa é aumentada pela regra da exasperação.", "v": "<b>Errado.</b> As multas são aplicadas distinta e integralmente (art. 72).", "lei": []},
    {"id": "cc10", "tipo": "juris", "sec": "limites", "f": "Concurso material com duas penas mínimas de 8 meses. Cabe suspensão condicional do processo?", "v": "<b>Não.</b> A soma (1 ano e 4 meses) passa de 1 ano. Súmula 243 do STJ.", "lei": [], "j": ["stj-s243"]},
    {"id": "cc11", "tipo": "caso", "sec": "limites", "f": "O condenado cumpre pena e comete novo crime no cárcere. O tempo já cumprido conta na nova unificação?", "v": "<b>Não.</b> Faz-se nova unificação desprezando o tempo já cumprido (art. 75, §2º).", "lei": []}
  ],
  "questoes": []
};
})();
