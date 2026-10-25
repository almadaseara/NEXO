/* Programa da PM-PE 2026 (Soldado e 2º Tenente QOPM) para o cronograma e a trilha do NEXO. Fonte: Edital de Abertura nº 001/2026, Instituto AOCP, tabelas de prova objetiva (itens 10.1 e 10.2). Cada tópico: [id, nome, módulos do NEXO, prioridade, horas]. PROGRAMA PARCIAL: o edital lista as disciplinas, mas os tópicos detalhados de cada uma ainda não foram cadastrados. Nas disciplinas de lei com capítulo no NEXO (Constitucional, Administrativo, Penal, Medicina Legal), os assuntos são os capítulos do próprio NEXO; nas demais, há um único tópico por disciplina e as horas são ESTIMATIVA da NEXO. Quando o texto oficial dos tópicos for conferido, esta lista é substituída pelo programa do edital. */
(function(){
var E = window.NEXO_EDITAIS = window.NEXO_EDITAIS || {};
E["pmpe"] = {
 "id": "pmpe",
 "concurso": "pmpe",
 "fase": "pos",
 "nome": "PM-PE 2026",
 "banca": "Instituto AOCP",
 "edital": "Edital de Abertura nº 001/2026 (29/09/2026)",
 "prova": "2027-02-21",
 "conferido": "23/10/2026",
 "parcial": "Disciplinas e blocos conforme o edital nº 001/2026 (Instituto AOCP). O Anexo II, com os assuntos de cada disciplina, ainda não foi cadastrado.",
 "resumoProva": "No edital, o Soldado tem 60 questões (10 por disciplina, em 3 blocos de 20) mais redação de 40 pontos; o 2º Tenente QOPM tem 70 questões (blocos de 30, 20 e 20) mais redação de 30 pontos",
 "provas": {
  "gerais": 40,
  "especificos": 20
 },
 "grupos": {
  "gerais": "Blocos I e II",
  "especificos": "Bloco III"
 },
 "cargos": {
  "soldado": {
   "nome": "Soldado (Quadro de Praças)",
   "vagas": 1250,
   "gerais": [
    "portugues",
    "hist_pe",
    "rlm",
    "informatica",
    "redacao"
   ],
   "especificos": [
    "constitucional",
    "dh_leg"
   ]
  },
  "oficial": {
   "nome": "2º Tenente QOPM (Direito)",
   "vagas": 40,
   "provas": {
    "gerais": 30,
    "especificos": 40
   },
   "grupos": {
    "gerais": "Bloco I",
    "especificos": "Blocos II e III"
   },
   "gerais": [
    "portugues",
    "lingua_estrangeira",
    "rlm",
    "estatistica",
    "informatica",
    "redacao"
   ],
   "especificos": [
    "constitucional",
    "administrativo",
    "penal",
    "proc_penal",
    "garantias",
    "penal_militar",
    "proc_penal_militar"
   ]
  }
 },
 "disciplinas": {
  "portugues": {
   "nome": "Língua Portuguesa",
   "sigla": "LP",
   "cor": "#c2477a",
   "topicos": [
    [
     "pm-lp-prog",
     "Língua Portuguesa: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     12
    ]
   ]
  },
  "hist_pe": {
   "nome": "História de Pernambuco",
   "sigla": "HP",
   "cor": "#5c7a8a",
   "topicos": [
    [
     "pm-hp-prog",
     "História de Pernambuco: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     8
    ]
   ]
  },
  "rlm": {
   "nome": "Raciocínio Lógico",
   "sigla": "RL",
   "cor": "#8a6d1f",
   "topicos": [
    [
     "pm-rl-prog",
     "Raciocínio Lógico: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     12
    ]
   ]
  },
  "informatica": {
   "nome": "Informática",
   "sigla": "IN",
   "cor": "#2f6f9f",
   "topicos": [
    [
     "pm-in-prog",
     "Informática: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     8
    ]
   ]
  },
  "constitucional": {
   "nome": "Direito Constitucional",
   "sigla": "DC",
   "cor": "#2a78d6",
   "topicos": [
    [
     "pm-dc-princ",
     "Princípios fundamentais, normas constitucionais e teoria dos direitos fundamentais",
     [
      "principios_fundamentais",
      "normas_constitucionais",
      "teoria_direitos"
     ],
     2,
     3
    ],
    [
     "pm-dc-dir",
     "Direitos e garantias individuais e coletivos (art. 5º)",
     [
      "art5_parte1",
      "art5_parte2"
     ],
     3,
     4
    ],
    [
     "pm-dc-soc",
     "Direitos sociais, nacionalidade e direitos políticos",
     [
      "direitos_sociais",
      "nacionalidade",
      "direitos_politicos",
      "partidos"
     ],
     2,
     3
    ],
    [
     "pm-dc-org",
     "Organização político-administrativa e administração pública",
     [
      "organizacao_estado",
      "adm_publica"
     ],
     3,
     3
    ],
    [
     "pm-dc-pod",
     "Poderes Executivo, Legislativo e Judiciário",
     [
      "executivo",
      "legislativo",
      "processo_legislativo",
      "judiciario"
     ],
     2,
     5
    ],
    [
     "pm-dc-func",
     "Funções essenciais à justiça, defesa do Estado e segurança pública",
     [
      "funcoes_essenciais",
      "defesa_estado"
     ],
     3,
     3
    ]
   ]
  },
  "dh_leg": {
   "nome": "Direitos Humanos e Legislação Extravagante",
   "sigla": "DL",
   "cor": "#7a3f9b",
   "topicos": [
    [
     "pm-dl-prog",
     "Direitos Humanos e Legislação Extravagante: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     14
    ]
   ]
  },
  "redacao": {
   "nome": "Redação",
   "sigla": "RD",
   "cor": "#5c7a8a",
   "topicos": [
    [
     "pm-rd-prog",
     "Redação (prova discursiva): programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     8
    ]
   ]
  },
  "lingua_estrangeira": {
   "nome": "Língua Estrangeira (inglês ou espanhol)",
   "sigla": "LI",
   "cor": "#6a5acd",
   "topicos": [
    [
     "pm-li-prog",
     "Língua Estrangeira: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     8
    ]
   ]
  },
  "estatistica": {
   "nome": "Estatística",
   "sigla": "ES",
   "cor": "#a0522d",
   "topicos": [
    [
     "pm-es-prog",
     "Estatística: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     8
    ]
   ]
  },
  "administrativo": {
   "nome": "Direito Administrativo",
   "sigla": "DA",
   "cor": "#eb6834",
   "topicos": [
    [
     "pm-da-reg",
     "Regime jurídico-administrativo e organização administrativa",
     [
      "adm_regime_principios",
      "adm_organizacao",
      "adm_estatais_fundacoes"
     ],
     3,
     4
    ],
    [
     "pm-da-ag",
     "Agentes públicos, poderes e atos administrativos",
     [
      "adm_agentes",
      "adm_poderes",
      "adm_atos"
     ],
     3,
     4
    ],
    [
     "pm-da-lic",
     "Licitações e contratos administrativos",
     [
      "adm_licitacao_principios",
      "adm_contratacao_direta",
      "adm_contratos"
     ],
     3,
     4
    ],
    [
     "pm-da-ctrl",
     "Controle da administração, responsabilidade civil do Estado e improbidade",
     [
      "adm_controle",
      "adm_responsabilidade_estado",
      "adm_improbidade"
     ],
     3,
     4
    ]
   ]
  },
  "penal": {
   "nome": "Direito Penal",
   "sigla": "DP",
   "cor": "#1baf7a",
   "topicos": [
    [
     "pm-dp-teo",
     "Princípios, aplicação da lei penal e teoria do crime",
     [
      "penal_principios",
      "penal_aplicacao",
      "penal_fato_tipico",
      "penal_dolo_culpa",
      "penal_ilicitude",
      "penal_erros",
      "penal_concurso"
     ],
     3,
     8
    ],
    [
     "pm-dp-pena",
     "Pena, dosimetria e extinção da punibilidade",
     [
      "penal_dosimetria",
      "penal_punibilidade"
     ],
     2,
     3
    ],
    [
     "pm-dp-pes",
     "Crimes contra a pessoa",
     [
      "penal_pessoa_01",
      "penal_pessoa_02",
      "penal_pessoa_03",
      "penal_pessoa_04",
      "penal_pessoa_05",
      "penal_pessoa_06",
      "penal_pessoa_07",
      "penal_pessoa_08",
      "penal_pessoa_09",
      "penal_pessoa_10"
     ],
     3,
     5
    ],
    [
     "pm-dp-pat",
     "Crimes contra o patrimônio",
     [
      "penal_patrimonio"
     ],
     3,
     2.5
    ],
    [
     "pm-dp-sex",
     "Crimes contra a dignidade sexual e a fé pública",
     [
      "penal_sexual",
      "penal_fe_publica"
     ],
     2,
     3
    ],
    [
     "pm-dp-adm",
     "Crimes contra a administração pública e a incolumidade pública",
     [
      "penal_adm_func",
      "penal_adm_particular",
      "penal_adm_justica",
      "penal_adm_financas",
      "penal_incolumidade"
     ],
     3,
     5
    ]
   ]
  },
  "proc_penal": {
   "nome": "Direito Processual Penal",
   "sigla": "PP",
   "cor": "#0f8a8a",
   "topicos": [
    [
     "pm-pp-prog",
     "Direito Processual Penal: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     10
    ]
   ]
  },
  "garantias": {
   "nome": "Direitos e Garantias Fundamentais",
   "sigla": "GF",
   "cor": "#2a78d6",
   "topicos": [
    [
     "pm-gf-princ",
     "Princípios fundamentais, normas constitucionais e teoria dos direitos fundamentais",
     [
      "principios_fundamentais",
      "normas_constitucionais",
      "teoria_direitos"
     ],
     2,
     3
    ],
    [
     "pm-gf-dir",
     "Direitos e garantias individuais e coletivos (art. 5º)",
     [
      "art5_parte1",
      "art5_parte2"
     ],
     3,
     4
    ]
   ]
  },
  "penal_militar": {
   "nome": "Direito Penal Militar",
   "sigla": "PM",
   "cor": "#7d5a3f",
   "topicos": [
    [
     "pm-pm-prog",
     "Direito Penal Militar: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     8
    ]
   ]
  },
  "proc_penal_militar": {
   "nome": "Direito Processual Penal Militar",
   "sigla": "PX",
   "cor": "#5a7d6b",
   "topicos": [
    [
     "pm-px-prog",
     "Direito Processual Penal Militar: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     8
    ]
   ]
  }
 }
};
})();
