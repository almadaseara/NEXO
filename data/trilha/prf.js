/* Programa da PRF (referência: edital de 2021, Cebraspe) para o cronograma e a trilha do NEXO. Nenhum edital novo foi publicado até 23/10/2026. Cada tópico: [id, nome, módulos do NEXO, prioridade, horas]. PROGRAMA PARCIAL: o edital lista as disciplinas, mas os tópicos detalhados de cada uma ainda não foram cadastrados. Nas disciplinas de lei com capítulo no NEXO (Constitucional, Administrativo, Penal, Medicina Legal), os assuntos são os capítulos do próprio NEXO; nas demais, há um único tópico por disciplina e as horas são ESTIMATIVA da NEXO. Quando o texto oficial dos tópicos for conferido, esta lista é substituída pelo programa do edital. */
(function(){
var E = window.NEXO_EDITAIS = window.NEXO_EDITAIS || {};
E.prf = {
 "id": "prf",
 "nome": "PRF (referência: edital 2021)",
 "banca": "Cebraspe",
 "edital": "Edital nº 1 – PRF, de 18/01/2021 (edital de referência)",
 "prova": null,
 "conferido": "23/10/2026",
 "parcial": "Disciplinas do edital de 2021 (Cebraspe), conforme página de preparação que reproduz sua estrutura; o texto oficial não pôde ser lido por inteiro. Novo edital ainda não publicado: refaça o plano quando sair.",
 "resumoProva": "No edital de 2021 foram 120 itens (certo ou errado) em 3 blocos (55, 30 e 35), mais redação",
 "provas": {
  "gerais": 0,
  "especificos": 120
 },
 "grupos": {
  "gerais": "Conhecimentos gerais",
  "especificos": "Disciplinas (base: edital 2021)"
 },
 "cargos": {
  "policial": {
   "nome": "Policial Rodoviário Federal",
   "gerais": [],
   "especificos": [
    "transito",
    "portugues",
    "rlm",
    "informatica",
    "fisica",
    "etica",
    "geopolitica",
    "ingles",
    "administrativo",
    "constitucional",
    "penal",
    "proc_penal",
    "leg_especial",
    "direitos_humanos"
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
     "rf-por-prog",
     "Língua Portuguesa: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     12
    ]
   ]
  },
  "rlm": {
   "nome": "Raciocínio Lógico-Matemático",
   "sigla": "RL",
   "cor": "#8a6d1f",
   "topicos": [
    [
     "rf-rlm-prog",
     "Raciocínio Lógico-Matemático: programa do edital (assuntos detalhados ainda não cadastrados)",
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
     "rf-inf-prog",
     "Informática: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     8
    ]
   ]
  },
  "fisica": {
   "nome": "Física",
   "sigla": "FI",
   "cor": "#4a6fa5",
   "topicos": [
    [
     "rf-fis-prog",
     "Física: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     10
    ]
   ]
  },
  "etica": {
   "nome": "Ética e Cidadania",
   "sigla": "EC",
   "cor": "#9b4d2f",
   "topicos": [
    [
     "rf-eti-prog",
     "Ética e Cidadania: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     4
    ]
   ]
  },
  "geopolitica": {
   "nome": "Geopolítica",
   "sigla": "GP",
   "cor": "#5c7a8a",
   "topicos": [
    [
     "rf-geo-prog",
     "Geopolítica: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     6
    ]
   ]
  },
  "ingles": {
   "nome": "Língua Estrangeira (Inglês)",
   "sigla": "LI",
   "cor": "#6a5acd",
   "topicos": [
    [
     "rf-ing-prog",
     "Língua Estrangeira (Inglês): programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     8
    ]
   ]
  },
  "transito": {
   "nome": "Legislação de Trânsito",
   "sigla": "LT",
   "cor": "#2f7d5b",
   "topicos": [
    [
     "rf-tra-prog",
     "Legislação de Trânsito: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     14
    ]
   ]
  },
  "direitos_humanos": {
   "nome": "Direitos Humanos",
   "sigla": "DH",
   "cor": "#9b4d2f",
   "topicos": [
    [
     "rf-dir-prog",
     "Direitos Humanos: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     6
    ]
   ]
  },
  "leg_especial": {
   "nome": "Legislação Especial",
   "sigla": "LE",
   "cor": "#7a3f9b",
   "topicos": [
    [
     "rf-leg-prog",
     "Legislação Especial: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     12
    ]
   ]
  },
  "proc_penal": {
   "nome": "Direito Processual Penal",
   "sigla": "PP",
   "cor": "#0f8a8a",
   "topicos": [
    [
     "rf-pro-prog",
     "Direito Processual Penal: programa do edital (assuntos detalhados ainda não cadastrados)",
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
     "rf-da-reg",
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
     "rf-da-ag",
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
     "rf-da-lic",
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
     "rf-da-ctrl",
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
  "constitucional": {
   "nome": "Direito Constitucional",
   "sigla": "DC",
   "cor": "#2a78d6",
   "topicos": [
    [
     "rf-dc-princ",
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
     "rf-dc-dir",
     "Direitos e garantias individuais e coletivos (art. 5º)",
     [
      "art5_parte1",
      "art5_parte2"
     ],
     3,
     4
    ],
    [
     "rf-dc-soc",
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
     "rf-dc-org",
     "Organização político-administrativa e administração pública",
     [
      "organizacao_estado",
      "adm_publica"
     ],
     3,
     3
    ],
    [
     "rf-dc-pod",
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
     "rf-dc-func",
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
  "penal": {
   "nome": "Direito Penal",
   "sigla": "DP",
   "cor": "#1baf7a",
   "topicos": [
    [
     "rf-dp-teo",
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
     "rf-dp-pena",
     "Pena, dosimetria e extinção da punibilidade",
     [
      "penal_dosimetria",
      "penal_punibilidade"
     ],
     2,
     3
    ],
    [
     "rf-dp-pes",
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
     "rf-dp-pat",
     "Crimes contra o patrimônio",
     [
      "penal_patrimonio"
     ],
     3,
     2.5
    ],
    [
     "rf-dp-sex",
     "Crimes contra a dignidade sexual e a fé pública",
     [
      "penal_sexual",
      "penal_fe_publica"
     ],
     2,
     3
    ],
    [
     "rf-dp-adm",
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
  }
 }
};
})();
