/* Delegado de Polícia do PC-PE 2026 (Cebraspe, Edital nº 1 – PCPE, de 02/10/2026): disciplinas e número de questões conforme o edital (objetiva de 100 questões; prova em 14/03/2027). PROGRAMA PARCIAL: os tópicos detalhados de cada disciplina ainda não foram cadastrados. Nas disciplinas com capítulo no NEXO, os assuntos são os capítulos do NEXO; nas demais, um tópico por disciplina com horas ESTIMADAS. O peso de cada disciplina no plano segue o número de questões do edital. */
(function(){
var E = window.NEXO_EDITAIS = window.NEXO_EDITAIS || {}, P = E.pcpe; if(!P) return;
var disc = {
 "penal": {
  "nome": "Direito Penal",
  "sigla": "DP",
  "cor": "#1baf7a",
  "topicos": [
   [
    "dl-dp-teo",
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
    "dl-dp-pena",
    "Pena, dosimetria e extinção da punibilidade",
    [
     "penal_dosimetria",
     "penal_punibilidade"
    ],
    2,
    3
   ],
   [
    "dl-dp-pes",
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
    "dl-dp-pat",
    "Crimes contra o patrimônio",
    [
     "penal_patrimonio"
    ],
    3,
    2.5
   ],
   [
    "dl-dp-sex",
    "Crimes contra a dignidade sexual e a fé pública",
    [
     "penal_sexual",
     "penal_fe_publica"
    ],
    2,
    3
   ],
   [
    "dl-dp-adm",
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
  ],
  "peso": 15
 },
 "proc_penal": {
  "nome": "Direito Processual Penal",
  "sigla": "PP",
  "cor": "#0f8a8a",
  "topicos": [
   [
    "dl-pp-prog",
    "Direito Processual Penal: programa do edital (assuntos detalhados ainda não cadastrados)",
    [],
    3,
    12
   ]
  ],
  "peso": 15
 },
 "constitucional": {
  "nome": "Direito Constitucional",
  "sigla": "DC",
  "cor": "#2a78d6",
  "topicos": [
   [
    "dl-dc-princ",
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
    "dl-dc-dir",
    "Direitos e garantias individuais e coletivos (art. 5º)",
    [
     "art5_parte1",
     "art5_parte2"
    ],
    3,
    4
   ],
   [
    "dl-dc-soc",
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
    "dl-dc-org",
    "Organização político-administrativa e administração pública",
    [
     "organizacao_estado",
     "adm_publica"
    ],
    3,
    3
   ],
   [
    "dl-dc-pod",
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
    "dl-dc-func",
    "Funções essenciais à justiça, defesa do Estado e segurança pública",
    [
     "funcoes_essenciais",
     "defesa_estado"
    ],
    3,
    3
   ]
  ],
  "peso": 12
 },
 "administrativo": {
  "nome": "Direito Administrativo",
  "sigla": "DA",
  "cor": "#eb6834",
  "topicos": [
   [
    "dl-da-reg",
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
    "dl-da-ag",
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
    "dl-da-lic",
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
    "dl-da-ctrl",
    "Controle da administração, responsabilidade civil do Estado e improbidade",
    [
     "adm_controle",
     "adm_responsabilidade_estado",
     "adm_improbidade"
    ],
    3,
    4
   ]
  ],
  "peso": 12
 },
 "extravagante": {
  "nome": "Legislação Penal e Processual Penal Extravagante",
  "sigla": "LX",
  "cor": "#7a3f9b",
  "topicos": [
   [
    "dl-lx-prog",
    "Legislação Penal e Processual Penal Extravagante: programa do edital (assuntos detalhados ainda não cadastrados)",
    [],
    3,
    16
   ]
  ],
  "peso": 10
 },
 "civil_empresarial": {
  "nome": "Direito Civil e Empresarial",
  "sigla": "CE",
  "cor": "#8a5a3f",
  "topicos": [
   [
    "dl-ce-prog",
    "Direito Civil e Empresarial: programa do edital (assuntos detalhados ainda não cadastrados)",
    [],
    2,
    14
   ]
  ],
  "peso": 6
 },
 "leg_estadual": {
  "nome": "Legislação Estadual",
  "sigla": "LS",
  "cor": "#4f7a3a",
  "topicos": [
   [
    "dl-ls-prog",
    "Legislação Estadual: programa do edital (assuntos detalhados ainda não cadastrados)",
    [],
    3,
    4
   ]
  ],
  "peso": 5
 },
 "medicina_legal": {
  "nome": "Medicina Legal",
  "sigla": "ML",
  "cor": "#6250d6",
  "topicos": [
   [
    "dl-ml-intro",
    "Conceitos, perícias e documentos médico-legais",
    [
     "ml_introducao",
     "ml_pericias",
     "ml_documentos"
    ],
    2,
    3
   ],
   [
    "dl-ml-ident",
    "Identificação humana",
    [
     "ml_identificacao"
    ],
    2,
    1.5
   ],
   [
    "dl-ml-trauma",
    "Traumatologia, lesões corporais e asfixiologia",
    [
     "ml_traumatologia",
     "ml_lesoes_corporais",
     "ml_asfixiologia"
    ],
    3,
    5
   ],
   [
    "dl-ml-tanato",
    "Tanatologia",
    [
     "ml_tanatologia"
    ],
    3,
    2
   ],
   [
    "dl-ml-sexo",
    "Aspectos médico-legais dos crimes sexuais e psicopatologia forense",
    [
     "ml_sexologia",
     "ml_psicopatologia"
    ],
    2,
    3
   ]
  ],
  "peso": 5
 },
 "criminologia": {
  "nome": "Criminologia",
  "sigla": "CR",
  "cor": "#5a4a7d",
  "topicos": [
   [
    "dl-cr-prog",
    "Criminologia: programa do edital (assuntos detalhados ainda não cadastrados)",
    [],
    2,
    6
   ]
  ],
  "peso": 5
 },
 "direitos_humanos": {
  "nome": "Direitos Humanos",
  "sigla": "DH",
  "cor": "#9b4d2f",
  "topicos": [
   [
    "dl-dh-prog",
    "Direitos Humanos: programa do edital (assuntos detalhados ainda não cadastrados)",
    [],
    2,
    6
   ]
  ],
  "peso": 5
 },
 "tributario": {
  "nome": "Direito Tributário",
  "sigla": "DT",
  "cor": "#3f6f6f",
  "topicos": [
   [
    "dl-dt-prog",
    "Direito Tributário: programa do edital (assuntos detalhados ainda não cadastrados)",
    [],
    2,
    8
   ]
  ],
  "peso": 5
 },
 "ambiental": {
  "nome": "Direito Ambiental",
  "sigla": "DM",
  "cor": "#3f8f5f",
  "topicos": [
   [
    "dl-dm-prog",
    "Direito Ambiental: programa do edital (assuntos detalhados ainda não cadastrados)",
    [],
    2,
    6
   ]
  ],
  "peso": 5
 }
};
Object.keys(disc).forEach(function(k){ P.disciplinas['dl_' + k] = disc[k]; });
var c = {"parcial": "Delegado: disciplinas e número de questões conforme o edital; os assuntos detalhados de cada disciplina ainda não estão cadastrados.", "nome": "Delegado de Polícia", "vagas": 45, "provas": {"gerais": 0, "especificos": 100}, "grupos": {"gerais": "", "especificos": "Prova objetiva"}, "gerais": [], "especificos": ["penal", "proc_penal", "constitucional", "administrativo", "extravagante", "civil_empresarial", "leg_estadual", "medicina_legal", "criminologia", "direitos_humanos", "tributario", "ambiental"]};
c.especificos = c.especificos.map(function(k){ return 'dl_' + k; });
c.prova = '2027-03-14';
P.cargos.delegado = c;
})();
