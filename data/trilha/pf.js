/* Programa da PF (referência: último edital, nº 1/2025, Cebraspe) para o cronograma e a trilha do NEXO. Fontes: edital nº 1/2025 e páginas de preparação que reproduzem sua estrutura. Delegado e Perito não estão incluídos. Cada tópico: [id, nome, módulos do NEXO, prioridade, horas]. PROGRAMA PARCIAL: o edital lista as disciplinas, mas os tópicos detalhados de cada uma ainda não foram cadastrados. Nas disciplinas de lei com capítulo no NEXO (Constitucional, Administrativo, Penal, Medicina Legal), os assuntos são os capítulos do próprio NEXO; nas demais, há um único tópico por disciplina e as horas são ESTIMATIVA da NEXO. Quando o texto oficial dos tópicos for conferido, esta lista é substituída pelo programa do edital. */
(function(){
var E = window.NEXO_EDITAIS = window.NEXO_EDITAIS || {};
E.pf = {
 "id": "pf",
 "nome": "PF (referência: edital 2025)",
 "banca": "Cebraspe",
 "edital": "Edital nº 1 – PF, de 20/05/2025 (último publicado)",
 "prova": null,
 "conferido": "23/10/2026",
 "parcial": "Disciplinas do último edital (nº 1/2025, Cebraspe), conferidas em 23/10/2026. Os assuntos detalhados de cada disciplina ainda não estão cadastrados. Novo edital ainda não publicado: refaça o plano quando sair.",
 "resumoProva": "No edital de 2025 foram 60 itens no Bloco I (Português, Direito, Estatística e Raciocínio Lógico), 36 no Bloco II (Informática) e 24 no Bloco III (específicos do cargo)",
 "provas": {
  "gerais": 96,
  "especificos": 24
 },
 "grupos": {
  "gerais": "Blocos I e II · Conhecimentos básicos",
  "especificos": "Bloco III · Conhecimentos específicos"
 },
 "cargos": {
  "agente": {
   "nome": "Agente de Polícia Federal",
   "gerais": [
    "portugues",
    "administrativo",
    "constitucional",
    "penal",
    "direitos_humanos",
    "leg_especial",
    "estatistica",
    "rlm",
    "informatica"
   ],
   "especificos": [
    "contabilidade"
   ]
  },
  "escrivao": {
   "nome": "Escrivão de Polícia Federal",
   "gerais": [
    "portugues",
    "administrativo",
    "constitucional",
    "penal",
    "direitos_humanos",
    "leg_especial",
    "estatistica",
    "rlm",
    "informatica"
   ],
   "especificos": [
    "contabilidade",
    "arquivologia"
   ]
  },
  "papiloscopista": {
   "nome": "Papiloscopista Policial Federal",
   "gerais": [
    "portugues",
    "administrativo",
    "constitucional",
    "penal",
    "direitos_humanos",
    "leg_especial",
    "estatistica",
    "rlm",
    "informatica"
   ],
   "especificos": [
    "biologia",
    "fisica",
    "quimica"
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
     "pf-lp-prog",
     "Língua Portuguesa: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     12
    ]
   ]
  },
  "administrativo": {
   "nome": "Noções de Direito Administrativo",
   "sigla": "DA",
   "cor": "#eb6834",
   "topicos": [
    [
     "pf-da-reg",
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
     "pf-da-ag",
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
     "pf-da-lic",
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
     "pf-da-ctrl",
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
   "nome": "Noções de Direito Constitucional",
   "sigla": "DC",
   "cor": "#2a78d6",
   "topicos": [
    [
     "pf-dc-princ",
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
     "pf-dc-dir",
     "Direitos e garantias individuais e coletivos (art. 5º)",
     [
      "art5_parte1",
      "art5_parte2"
     ],
     3,
     4
    ],
    [
     "pf-dc-soc",
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
     "pf-dc-org",
     "Organização político-administrativa e administração pública",
     [
      "organizacao_estado",
      "adm_publica"
     ],
     3,
     3
    ],
    [
     "pf-dc-pod",
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
     "pf-dc-func",
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
   "nome": "Noções de Direito Penal e de Direito Processual Penal",
   "sigla": "DP",
   "cor": "#1baf7a",
   "topicos": [
    [
     "pf-dp-teo",
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
     "pf-dp-pena",
     "Pena, dosimetria e extinção da punibilidade",
     [
      "penal_dosimetria",
      "penal_punibilidade"
     ],
     2,
     3
    ],
    [
     "pf-dp-pes",
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
     "pf-dp-pat",
     "Crimes contra o patrimônio",
     [
      "penal_patrimonio"
     ],
     3,
     2.5
    ],
    [
     "pf-dp-sex",
     "Crimes contra a dignidade sexual e a fé pública",
     [
      "penal_sexual",
      "penal_fe_publica"
     ],
     2,
     3
    ],
    [
     "pf-dp-adm",
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
    ],
    [
     "pf-pp-prog",
     "Direito Processual Penal: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     10
    ]
   ]
  },
  "direitos_humanos": {
   "nome": "Direitos Humanos",
   "sigla": "DH",
   "cor": "#9b4d2f",
   "topicos": [
    [
     "pf-dh-prog",
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
     "pf-le-prog",
     "Legislação Especial: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     3,
     14
    ]
   ]
  },
  "estatistica": {
   "nome": "Estatística",
   "sigla": "ES",
   "cor": "#a0522d",
   "topicos": [
    [
     "pf-es-prog",
     "Estatística: programa do edital (assuntos detalhados ainda não cadastrados)",
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
     "pf-rl-prog",
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
     "pf-in-prog",
     "Informática: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     8
    ]
   ]
  },
  "contabilidade": {
   "nome": "Contabilidade Geral",
   "sigla": "CT",
   "cor": "#3f6f6f",
   "topicos": [
    [
     "pf-ct-prog",
     "Contabilidade Geral: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     10
    ]
   ]
  },
  "arquivologia": {
   "nome": "Arquivologia",
   "sigla": "AR",
   "cor": "#7d6b4f",
   "topicos": [
    [
     "pf-ar-prog",
     "Arquivologia: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     6
    ]
   ]
  },
  "biologia": {
   "nome": "Biologia",
   "sigla": "BI",
   "cor": "#3f8f5f",
   "topicos": [
    [
     "pf-bi-prog",
     "Biologia: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     10
    ]
   ]
  },
  "fisica": {
   "nome": "Física",
   "sigla": "FI",
   "cor": "#4a6fa5",
   "topicos": [
    [
     "pf-fi-prog",
     "Física: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     10
    ]
   ]
  },
  "quimica": {
   "nome": "Química",
   "sigla": "QU",
   "cor": "#a5603f",
   "topicos": [
    [
     "pf-qu-prog",
     "Química: programa do edital (assuntos detalhados ainda não cadastrados)",
     [],
     2,
     10
    ]
   ]
  }
 }
};
})();
