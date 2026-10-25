/* Programa da PC-PE 2026 para o cronograma e a trilha semanal do NEXO.
   Fonte: Edital nº 1 – PCPE, de 02/10/2026 (Cebraspe), item 22.2 — conteúdos programáticos de Agente de Polícia
   e Escrivão de Polícia; estrutura das provas conforme o mesmo edital. O edital fixa o número de questões
   por PROVA (não por disciplina): P1 Noções de Direito (20 questões) e P2 Conhecimentos Específicos (40 questões),
   mais a P3, prova discursiva (redação sobre segurança pública, 30 pontos). Provas objetivas em 07/03/2027.
   Delegado: o NEXO ainda não cadastrou o programa (edital lista as disciplinas, os tópicos ainda não foram conferidos),
   por isso esse cargo não aparece aqui.

   Cada tópico: [id, nome (palavras do edital, resumidas), módulos do NEXO, prioridade, horas de estudo]
   - A ordem dentro de cada disciplina é a ORDEM DE APRENDIZAGEM, que nem sempre é a ordem do edital.
   - Prioridade 3 = alta, 2 = média, 1 = complementar. Quando o tópico tem módulo no NEXO, vem da
     prioridade do módulo. Sem módulo, é uma ESTIMATIVA da NEXO (a banca não publica estatística por assunto).
   - Horas = sugestão para o primeiro estudo, sem contar revisão e questões.
   - Os módulos ligados ao tópico são o material do NEXO que cobre o assunto; o nome do tópico é o do edital. */
(function(){
var E = window.NEXO_EDITAIS = window.NEXO_EDITAIS || {};

E.pcpe = {
  id:'pcpe', concurso:'pcpe', fase:'pos', nome:'PC-PE 2026', banca:'Cebraspe', edital:'Edital nº 1 – PCPE (02/10/2026)',
  prova:'2027-03-07', conferido:'23/10/2026',
  provas:{ gerais:20, especificos:40 },
  grupos:{ gerais:'Prova 1 · Noções de Direito', especificos:'Prova 2 · Conhecimentos específicos' },
  cargos:{
    agente:{ nome:'Agente de Polícia', vagas:1200,
      gerais:['leg_estadual', 'constitucional', 'administrativo', 'penal', 'proc_penal'],
      especificos:['portugues', 'informatica', 'rlm', 'estatistica', 'contabilidade', 'atualidades'] },
    escrivao:{ nome:'Escrivão de Polícia', vagas:70,
      gerais:['leg_estadual', 'constitucional', 'administrativo', 'penal', 'proc_penal'],
      especificos:['portugues', 'informatica', 'rlm', 'estatistica', 'arquivologia', 'atualidades'] }
  },
  disciplinas:{
    leg_estadual:{ nome:'Legislação Estadual', sigla:'LE', cor:'#4f7a3a', topicos:[
      ['pe-ce', 'Constituição do Estado de Pernambuco (arts. 101 a 105-B)', [], 3, 1.5],
      ['pe-6425', 'Lei estadual nº 6.425/1972 — Estatuto do Policial Civil', [], 3, 2.5],
      ['pe-6123', 'Lei estadual nº 6.123/1968 — Estatuto do Servidor do Estado de Pernambuco', [], 3, 2],
      ['pe-lc137', 'Lei Complementar estadual nº 137/2008', [], 3, 2],
      ['pe-lc317', 'Lei Complementar estadual nº 317/2015', [], 2, 1.5]
    ]},
    constitucional:{ nome:'Direito Constitucional', sigla:'DC', cor:'#2a78d6', topicos:[
      ['pe-dc-princ', 'CF/1988: princípios fundamentais e poderes constituintes (originário, derivado e decorrente)', ['principios_fundamentais'], 2, 1.5],
      ['pe-dc-normas', 'Aplicabilidade das normas constitucionais', ['normas_constitucionais'], 2, 1],
      ['pe-dc-direitos', 'Direitos e garantias fundamentais', ['teoria_direitos', 'art5_parte1', 'art5_parte2', 'direitos_sociais', 'nacionalidade', 'direitos_politicos', 'partidos'], 3, 6],
      ['pe-dc-org', 'Organização político-administrativa: União, estados, DF, municípios e territórios', ['organizacao_estado'], 3, 1.5],
      ['pe-dc-admpub', 'Administração pública: disposições gerais e servidores públicos', ['adm_publica'], 3, 1.5],
      ['pe-dc-exec', 'Poder Executivo', ['executivo'], 2, 1],
      ['pe-dc-leg', 'Poder Legislativo', ['legislativo', 'processo_legislativo'], 2, 2],
      ['pe-dc-jud', 'Poder Judiciário', ['judiciario'], 2, 1.5],
      ['pe-dc-func', 'Funções essenciais à justiça: Ministério Público, advocacia pública e Defensoria Pública', ['funcoes_essenciais'], 2, 1.5],
      ['pe-dc-defesa', 'Defesa do Estado e das instituições democráticas', ['defesa_estado'], 3, 1.5],
      ['pe-dc-segpe', 'Segurança pública na Constituição do Estado de Pernambuco', [], 3, 1]
    ]},
    administrativo:{ nome:'Direito Administrativo', sigla:'DA', cor:'#eb6834', topicos:[
      ['pe-da-estado', 'Estado, governo e administração pública; direito administrativo', [], 2, 1],
      ['pe-da-regime', 'Regime jurídico-administrativo: conceito e princípios expressos e implícitos', ['adm_regime_principios'], 3, 1.5],
      ['pe-da-org', 'Organização administrativa: centralização, descentralização, desconcentração; administração direta e indireta', ['adm_organizacao', 'adm_estatais_fundacoes'], 3, 2],
      ['pe-da-agentes', 'Agente público; cargo, emprego e função pública', ['adm_agentes'], 3, 1.5],
      ['pe-da-poderes', 'Poderes da administração: hierárquico, disciplinar, regulamentar e de polícia; uso e abuso do poder', ['adm_poderes'], 3, 1.5],
      ['pe-da-atos', 'Ato administrativo', ['adm_atos'], 3, 2],
      ['pe-da-servicos', 'Serviços públicos', [], 2, 1.5],
      ['pe-da-proc', 'Processo administrativo', [], 2, 1.5],
      ['pe-da-licit', 'Licitações e contratos administrativos', ['adm_licitacao_principios', 'adm_contratacao_direta', 'adm_contratos'], 3, 4],
      ['pe-da-resp', 'Responsabilidade civil do Estado', ['adm_responsabilidade_estado'], 3, 1.5],
      ['pe-da-controle', 'Controle da administração: administrativo, judicial e legislativo; improbidade administrativa', ['adm_controle', 'adm_improbidade'], 3, 3]
    ]},
    penal:{ nome:'Direito Penal', sigla:'DP', cor:'#1baf7a', topicos:[
      ['pe-dp-princ', 'Princípios básicos do Direito Penal', ['penal_principios'], 2, 1.5],
      ['pe-dp-crime', 'Crime e contravenção penal', ['penal_fato_tipico', 'penal_dolo_culpa', 'penal_ilicitude', 'penal_erros'], 3, 5],
      ['pe-dp-lei', 'Aplicação da lei penal: no tempo e no espaço, tempo e lugar do crime, territorialidade e extraterritorialidade, contagem de prazo', ['penal_aplicacao'], 3, 2],
      ['pe-dp-pessoa', 'Crimes contra a pessoa', ['penal_pessoa_01', 'penal_pessoa_02', 'penal_pessoa_03', 'penal_pessoa_04', 'penal_pessoa_05', 'penal_pessoa_06', 'penal_pessoa_07', 'penal_pessoa_08', 'penal_pessoa_09', 'penal_pessoa_10'], 3, 5],
      ['pe-dp-patr', 'Crimes contra o patrimônio', ['penal_patrimonio'], 3, 2.5],
      ['pe-dp-sexual', 'Crimes contra a dignidade sexual', ['penal_sexual'], 2, 1.5],
      ['pe-dp-adm', 'Crimes contra a administração pública', ['penal_adm_func', 'penal_adm_particular', 'penal_adm_justica', 'penal_adm_financas'], 3, 2.5],
      ['pe-dp-hediondos', 'Crimes hediondos (Lei nº 8.072/1990)', [], 3, 1],
      ['pe-dp-racismo', 'Crimes resultantes de preconceito de raça ou de cor (Lei nº 7.716/1989)', [], 2, 0.5],
      ['pe-dp-abuso', 'Abuso de autoridade (Lei nº 13.869/2019)', [], 3, 1.5],
      ['pe-dp-tortura', 'Tortura (Lei nº 9.455/1997)', [], 2, 0.5],
      ['pe-dp-eca', 'Estatuto da Criança e do Adolescente (Lei nº 8.069/1990)', [], 2, 1.5],
      ['pe-dp-orcrim', 'Organizações criminosas (Lei nº 12.850/2013)', [], 3, 1.5],
      ['pe-dp-ctb', 'Crimes de trânsito (Lei nº 9.503/1997)', [], 2, 1],
      ['pe-dp-mp', 'Violência doméstica e familiar contra a mulher (Lei nº 11.340/2006)', [], 3, 1.5],
      ['pe-dp-drogas', 'Lei de drogas (Lei nº 11.343/2006)', [], 3, 2],
      ['pe-dp-henry', 'Violência doméstica e familiar contra criança e adolescente (Lei nº 14.344/2022)', [], 2, 1],
      ['pe-dp-ambiental', 'Crimes ambientais (Lei nº 9.605/1998)', [], 2, 1],
      ['pe-dp-desarm', 'Estatuto do Desarmamento (Lei nº 10.826/2003)', [], 3, 1.5],
      ['pe-dp-const', 'Disposições constitucionais aplicáveis ao direito penal', [], 2, 0.5]
    ]},
    proc_penal:{ nome:'Direito Processual Penal', sigla:'PP', cor:'#0f8a8a', topicos:[
      ['pe-pp-lei', 'Aplicação da lei processual penal no tempo, no espaço e em relação às pessoas', [], 2, 1],
      ['pe-pp-ip', 'Inquérito policial', ['pp_inquerito'], 3, 2.5],
      ['pe-pp-prova', 'Prova: exame de corpo de delito e perícias, interrogatório, confissão, testemunhas, reconhecimento, acareação, documentos, indícios, busca e apreensão', ['pp_prova_geral', 'pp_prova_orais', 'pp_prova_docs_busca'], 3, 3],
      ['pe-pp-prisao', 'Prisão e liberdade provisória', ['pp_flagrante'], 3, 2.5],
      ['pe-pp-cautelares', 'Medidas cautelares diversas da prisão', [], 3, 1.5],
      ['pe-pp-temp', 'Prisão temporária (Lei nº 7.960/1989)', [], 3, 0.5],
      ['pe-pp-jecrim', 'Juizados especiais criminais (Lei nº 9.099/1995)', [], 2, 1.5],
      ['pe-pp-invest', 'Investigação criminal (Lei nº 12.830/2013)', [], 2, 1],
      ['pe-pp-const', 'Disposições constitucionais aplicáveis ao direito processual penal', [], 2, 0.5]
    ]},
    portugues:{ nome:'Língua Portuguesa', sigla:'LP', cor:'#c2477a', topicos:[
      ['pe-lp-texto', 'Compreensão e interpretação de textos de gêneros variados; tipos e gêneros textuais', [], 3, 2.5],
      ['pe-lp-orto', 'Domínio da ortografia oficial', [], 1, 1],
      ['pe-lp-morf', 'Emprego das classes de palavras', [], 2, 2],
      ['pe-lp-coesao', 'Mecanismos de coesão textual: referenciação, substituição, repetição, conectores, sequenciação; tempos e modos verbais', [], 3, 2],
      ['pe-lp-coord', 'Coordenação e subordinação entre orações e termos', [], 2, 2],
      ['pe-lp-pont', 'Sinais de pontuação', [], 3, 1.5],
      ['pe-lp-conc', 'Concordância verbal e nominal', [], 3, 1.5],
      ['pe-lp-reg', 'Regência verbal e nominal; sinal indicativo de crase', [], 3, 2],
      ['pe-lp-pron', 'Colocação dos pronomes átonos', [], 2, 1],
      ['pe-lp-reescrita', 'Reescrita de frases e parágrafos: significação das palavras, substituição, reorganização de orações e períodos, níveis de formalidade', [], 3, 2],
      ['pe-lp-oficial', 'Correspondência oficial (Manual de Redação da Presidência da República)', [], 2, 1.5]
    ]},
    informatica:{ nome:'Informática', sigla:'IN', cor:'#2f6f9f', topicos:[
      ['pe-in-win', 'Windows: janelas, menus, barra de tarefas, pastas e arquivos, configurações e Windows Explorer', [], 2, 1.5],
      ['pe-in-word', 'Microsoft 365 — Word: formatação, listas e colunas, tabelas, estilos e modelos, cabeçalhos e rodapés, configuração de página', [], 2, 1.5],
      ['pe-in-excel', 'Microsoft 365 — Excel: fórmulas, referências absolutas e relativas, funções, formatação, classificação de dados e gráficos', [], 3, 2.5],
      ['pe-in-ppt', 'Microsoft 365 — PowerPoint: apresentações, objetos, tabelas e gráficos, slide mestre, animações, integração com Word e Excel', [], 1, 1],
      ['pe-in-rede', 'Redes de computadores: Internet, intranet, redes sociais, computação em nuvem, deep web e dark web', [], 3, 1.5],
      ['pe-in-email', 'Correio eletrônico, navegadores e sítios de busca', [], 2, 1.5],
      ['pe-in-seg', 'Segurança: acessos, programas maliciosos, antivírus e criptografia', [], 3, 2],
      ['pe-in-backup', 'Backup e armazenamento de dados na nuvem', [], 2, 1]
    ]},
    rlm:{ nome:'Raciocínio Lógico', sigla:'RL', cor:'#8a6d1f', topicos:[
      ['pe-rl-conj-num', 'Conjuntos numéricos: inteiros, racionais e reais', [], 1, 1],
      ['pe-rl-medidas', 'Sistema legal de medidas', [], 1, 0.5],
      ['pe-rl-prop', 'Razões e proporções: divisão proporcional, regras de três e porcentagens', [], 3, 2],
      ['pe-rl-equacoes', 'Equações e inequações de 1º e 2º graus; sistemas lineares', [], 2, 1.5],
      ['pe-rl-funcoes', 'Funções e gráficos', [], 1, 1],
      ['pe-rl-pa-pg', 'Progressões aritméticas e geométricas', [], 2, 1],
      ['pe-rl-estruturas', 'Compreensão de estruturas lógicas; lógica de argumentação: analogias, inferências, deduções e conclusões', [], 2, 1.5],
      ['pe-rl-proposicional', 'Lógica sentencial: proposições, tabelas-verdade, equivalências e Leis de De Morgan', [], 3, 3],
      ['pe-rl-diagramas', 'Diagramas lógicos e lógica de primeira ordem', [], 2, 1.5],
      ['pe-rl-contagem', 'Princípios de contagem e probabilidade', [], 3, 2],
      ['pe-rl-conjuntos', 'Operações com conjuntos', [], 2, 1],
      ['pe-rl-problemas', 'Problemas aritméticos, geométricos e matriciais', [], 2, 1.5]
    ]},
    estatistica:{ nome:'Estatística', sigla:'ES', cor:'#a0522d', topicos:[
      ['pe-es-descr', 'Estatística descritiva e análise exploratória: gráficos, tabelas, medidas de posição, dispersão, assimetria e curtose', [], 3, 3],
      ['pe-es-prob', 'Probabilidade: definições, axiomas, probabilidade condicional e independência', [], 3, 2],
      ['pe-es-amostra', 'Técnicas de amostragem (simples, estratificada, sistemática e por conglomerados) e tamanho amostral', [], 2, 1.5]
    ]},
    contabilidade:{ nome:'Contabilidade Geral', sigla:'CT', cor:'#3f6f6f', topicos:[
      ['pe-ct-conc', 'Conceitos, objetivos e finalidades da contabilidade', [], 2, 1],
      ['pe-ct-patr', 'Patrimônio: componentes, equação fundamental e situação líquida', [], 3, 1.5],
      ['pe-ct-fatos', 'Atos e fatos administrativos: permutativos, modificativos e mistos', [], 3, 1],
      ['pe-ct-contas', 'Contas: débitos, créditos e saldos; plano de contas', [], 3, 1.5],
      ['pe-ct-escrit', 'Escrituração: lançamentos, livros, métodos e processos; regimes de competência e de caixa', [], 3, 2],
      ['pe-ct-operacoes', 'Contabilização de operações: juros, descontos, tributos, aluguéis, folha, compras, vendas, provisões, depreciações e baixa de bens', [], 2, 3],
      ['pe-ct-balancete', 'Balancete de verificação', [], 2, 1],
      ['pe-ct-bp', 'Balanço patrimonial', [], 3, 1.5],
      ['pe-ct-dre', 'Demonstração do resultado do exercício', [], 3, 1.5],
      ['pe-ct-nbc', 'Normas Brasileiras de Contabilidade', [], 1, 1]
    ]},
    arquivologia:{ nome:'Noções de Arquivologia', sigla:'AR', cor:'#7d6b4f', topicos:[
      ['pe-ar-princ', 'Arquivística: princípios, conceitos e funções arquivísticas', [], 3, 1.5],
      ['pe-ar-leg', 'Legislação arquivística', [], 2, 1],
      ['pe-ar-sist', 'Sistemas e redes de arquivo', [], 1, 0.5],
      ['pe-ar-gestao', 'Gestão da informação e de documentos; programas de gestão de documentos', [], 3, 1.5],
      ['pe-ar-protocolo', 'Protocolo: recebimento, registro, distribuição, tramitação e expedição', [], 3, 1],
      ['pe-ar-avaliacao', 'Avaliação e classificação de documentos de arquivo', [], 3, 1.5],
      ['pe-ar-arquiv', 'Arquivamento, descrição e ordenação', [], 2, 1],
      ['pe-ar-acond', 'Acondicionamento e armazenamento; preservação e conservação', [], 2, 1],
      ['pe-ar-tipol', 'Análise tipológica de documentos de arquivo', [], 1, 0.5],
      ['pe-ar-acesso', 'Políticas de acesso aos documentos de arquivo', [], 1, 0.5],
      ['pe-ar-digital', 'Sistemas informatizados de gestão arquivística: documentos digitais, requisitos e metadados', [], 2, 1],
      ['pe-ar-micro', 'Microfilmagem de documentos de arquivo', [], 1, 0.5]
    ]},
    atualidades:{ nome:'Redação e atualidades de segurança pública', sigla:'RD', cor:'#5c7a8a', recorrente:true, topicos:[
      ['pe-at-seg', 'Tópicos relevantes e atuais na área de segurança pública (leitura de notícias)', [], 3, 1.5],
      ['pe-at-redacao', 'Prova discursiva: redação de até 30 linhas (treino de estrutura e argumentação)', [], 3, 2]
    ]}
  }
};
})();
