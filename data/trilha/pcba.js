/* Programa da PC-BA para o cronograma e a trilha semanal do NEXO.
   Fonte: Edital SAEB nº 02/2026 (Instituto AOCP), Anexo I — conteúdos programáticos; item 7.1 —
   provas objetivas com 40 questões de conhecimentos gerais e 60 de específicos (nota mínima 70).
   O edital não divide as questões por disciplina.

   Cada tópico: [id, nome (palavras do edital, resumidas), módulos do NEXO, prioridade, horas de estudo]
   - A ordem dentro de cada disciplina é a ORDEM DE APRENDIZAGEM (base antes do que depende dela),
     que nem sempre é a ordem do edital.
   - Prioridade 3 = alta, 2 = média, 1 = complementar. Quando o tópico tem módulo no NEXO, vem da
     prioridade do módulo. Sem módulo, é uma ESTIMATIVA da NEXO (não há estatística oficial da banca);
     a interface avisa isso.
   - Horas = sugestão para o primeiro estudo, sem contar revisão e questões. */
(function(){
var E = window.NEXO_EDITAIS = window.NEXO_EDITAIS || {};

E.pcba = {
  id:'pcba', concurso:'pcba', fase:'pos', nome:'PC-BA 2026', banca:'Instituto AOCP', edital:'Edital SAEB nº 02/2026',
  prova:'2026-12-06', conferido:'14/10/2026',
  provas:{ gerais:40, especificos:60, minimo:70 },
  cargos:{
    investigador:{ nome:'Investigador de Polícia Civil', vagas:500,
      gerais:['portugues', 'rlm', 'atualidades', 'informatica', 'igualdade', 'medicina_legal', 'leg_geral'],
      especificos:['penal', 'proc_penal', 'constitucional', 'administrativo', 'extravagante', 'estatistica', 'contabilidade'] },
    escrivao:{ nome:'Escrivão de Polícia Civil', vagas:150,
      gerais:['portugues', 'rlm', 'atualidades', 'informatica', 'igualdade', 'medicina_legal', 'leg_geral'],
      especificos:['penal', 'proc_penal', 'constitucional', 'administrativo', 'extravagante', 'estatistica', 'arquivologia'] }
  },
  disciplinas:{
    portugues:{ nome:'Língua Portuguesa', sigla:'LP', cor:'#c2477a', topicos:[
      ['lp-morf', 'Morfologia: classes de palavras e seus empregos', [], 2, 2],
      ['lp-orto', 'Ortografia, acentuação gráfica, estrutura e formação de palavras', [], 1, 1],
      ['lp-texto', 'Compreensão e interpretação de texto; tipologia e gêneros textuais', [], 3, 2],
      ['lp-termos', 'Sintaxe: termos da oração e período simples', [], 2, 1.5],
      ['lp-periodo', 'Período composto por coordenação e subordinação', [], 2, 1.5],
      ['lp-conc', 'Concordância verbal e nominal', [], 3, 1.5],
      ['lp-reg', 'Regência verbal e nominal; crase', [], 3, 1.5],
      ['lp-pont', 'Sinais de pontuação e sua função no texto', [], 3, 1.5],
      ['lp-pron', 'Colocação pronominal; funções do "que" e do "se"', [], 2, 1],
      ['lp-sem', 'Semântica: sinonímia, antonímia, figuras de linguagem', [], 2, 1],
      ['lp-coesao', 'Coesão (referenciação e sequenciação) e função textual dos vocábulos', [], 3, 1.5],
      ['lp-reescrita', 'Reescrita de frases, períodos e parágrafos', [], 3, 1.5],
      ['lp-func', 'Elementos da comunicação e funções da linguagem', [], 1, 1],
      ['lp-redof', 'Redação Oficial (Manual da Presidência da República)', [], 2, 1.5],
      ['lp-var', 'Variação linguística: norma culta', [], 1, 0.5]
    ]},
    rlm:{ nome:'Raciocínio Lógico', sigla:'RL', cor:'#8a6d1f', topicos:[
      ['rl-conj-num', 'Conjuntos numéricos: inteiros, racionais e reais', [], 1, 1],
      ['rl-prop', 'Razões e proporções, divisão proporcional, regra de três e porcentagem', [], 3, 2],
      ['rl-medidas', 'Sistema legal de medidas', [], 1, 0.5],
      ['rl-equacoes', 'Equações e inequações de 1º e 2º graus; sistemas lineares', [], 2, 1.5],
      ['rl-funcoes', 'Funções e gráficos', [], 1, 1],
      ['rl-pa-pg', 'Progressões aritméticas e geométricas', [], 2, 1],
      ['rl-proposicoes', 'Lógica proposicional: proposições simples e compostas, tabelas-verdade', [], 3, 2],
      ['rl-equiv', 'Equivalências e Leis de Morgan (negações)', [], 3, 1.5],
      ['rl-diagramas', 'Diagramas lógicos e lógica de primeira ordem', [], 2, 1.5],
      ['rl-argum', 'Estruturas lógicas e lógica de argumentação', [], 2, 1.5],
      ['rl-conjuntos', 'Operações com conjuntos', [], 2, 1],
      ['rl-contagem', 'Princípios de contagem e probabilidade', [], 3, 2],
      ['rl-problemas', 'Problemas aritméticos, geométricos e matriciais', [], 2, 1.5]
    ]},
    atualidades:{ nome:'Atualidades', sigla:'AT', cor:'#5c7a8a', recorrente:true, topicos:[
      ['at-bahia', 'Bahia e segurança pública: notícias recentes', [], 2, 1],
      ['at-brasil', 'Brasil: economia, trabalho, saúde, educação, meio ambiente', [], 2, 1],
      ['at-mundo', 'Internacional: conflitos, relações internacionais, clima', [], 2, 1],
      ['at-tec', 'Tecnologia da informação, comunicação e sociedade', [], 1, 1]
    ]},
    informatica:{ nome:'Informática', sigla:'IN', cor:'#2f6f9f', topicos:[
      ['in-rede', 'Internet, intranet e extranet: conceitos e ferramentas', [], 3, 1.5],
      ['in-seguranca', 'Segurança da informação: malwares, antivírus, criptografia', [], 3, 2],
      ['in-nuvem', 'Computação em nuvem, armazenamento em nuvem e backup', [], 2, 1],
      ['in-navegadores', 'Navegadores (Edge, Chrome, Firefox); Deep Web e Dark Web', [], 2, 1],
      ['in-email', 'Correio eletrônico', [], 2, 1],
      ['in-windows', 'Windows 11: pastas, arquivos, configurações, Explorador', [], 2, 1.5],
      ['in-word', 'Word (Office 365)', [], 2, 1.5],
      ['in-excel', 'Excel (Office 365): fórmulas, funções, gráficos', [], 3, 2],
      ['in-ppt', 'PowerPoint (Office 365)', [], 1, 1]
    ]},
    igualdade:{ nome:'Promoção da Igualdade Racial e de Gênero', sigla:'IG', cor:'#9b4d2f', topicos:[
      ['ig-cf', 'CF/88, arts. 1º, 3º, 4º e 5º', [], 3, 1.5],
      ['ig-ceba', 'Constituição da Bahia, Capítulo XXIII ("Do Negro")', [], 3, 1],
      ['ig-estatuto', 'Lei 12.288/2010 — Estatuto da Igualdade Racial', [], 3, 2],
      ['ig-7716', 'Lei 7.716/1989 — crimes de preconceito de raça ou cor; CP, art. 140 (injúria)', [], 3, 1.5],
      ['ig-estatuto-ba', 'Lei estadual 13.182/2014 — Estatuto da Igualdade Racial da Bahia', [], 2, 1.5],
      ['ig-mp', 'Lei 11.340/2006 — Lei Maria da Penha', [], 3, 1.5],
      ['ig-conv', 'Convenções: discriminação racial (Dec. 65.810/1969) e contra a mulher (Dec. 4.377/2002)', [], 2, 1.5],
      ['ig-tortura', 'Lei 9.455/1997 (tortura) e Lei 2.889/1956 (genocídio)', [], 2, 1],
      ['ig-orgaos', 'Leis 7.437/1985, 10.678/2003, 13.341/2016, 14.600/2023, Lei estadual 14.521/2022 e Dec. 4.886/2003', [], 1, 1.5]
    ]},
    medicina_legal:{ nome:'Medicina Legal', sigla:'ML', cor:'#6250d6', topicos:[
      ['ml-intro', 'Conceito, importância e divisões; corpo de delito, perícia e peritos', ['ml_introducao', 'ml_pericias'], 2, 1.5],
      ['ml-docs', 'Documentos médico-legais', ['ml_documentos'], 2, 1],
      ['ml-ident', 'Identidade, identificação e reconhecimento; métodos de identificação', ['ml_identificacao'], 2, 1.5],
      ['ml-trauma', 'Lesões por instrumentos e por projéteis de arma de fogo', ['ml_traumatologia', 'ml_lesoes_corporais'], 3, 2],
      ['ml-tanato', 'Morte: diagnóstico, fenômenos cadavéricos, cronotanatognose, exumação', ['ml_tanatologia'], 3, 2],
      ['ml-asfixia', 'Asfixias mecânicas', ['ml_asfixiologia'], 2, 1.5],
      ['ml-sexo', 'Crimes contra a dignidade sexual: aspectos médico-legais e vestígios', ['ml_sexologia'], 2, 1.5],
      ['ml-psico', 'Imputabilidade penal, capacidade civil e perturbações mentais', ['ml_psicopatologia'], 2, 1.5],
      ['ml-custodia', 'Cadeia de custódia, vestígios e evidências', ['ml_pericias'], 3, 1],
      ['ml-local', 'Local de crime; toxicomanias e embriaguez; energias térmica, elétrica e química', ['ml_traumatologia', 'ml_psicopatologia'], 2, 1.5],
      ['ml-aborto', 'Aborto, infanticídio e abandono de recém-nascido', ['ml_sexologia'], 1, 1],
      ['ml-testemunho', 'Testemunho, confissão e acareação', [], 1, 0.5],
      ['ml-violencia', 'Violência doméstica e contra vulneráveis', [], 2, 1]
    ]},
    leg_geral:{ nome:'Legislação Geral', sigla:'LG', cor:'#4f7a3a', topicos:[
      ['lg-6677', 'Lei estadual 6.677/1994 — Estatuto do Servidor da Bahia', [], 3, 2],
      ['lg-11370', 'Lei estadual 11.370/2009 — Lei Orgânica da Polícia Civil da Bahia', [], 3, 2],
      ['lg-12209', 'Lei estadual 12.209/2011 — processo administrativo na Bahia', [], 2, 1.5],
      ['lg-14634', 'Lei estadual 14.634/2023 — licitações e contratos na Bahia', [], 2, 1.5],
      ['lg-8906', 'Lei 8.906/1994 — Estatuto da Advocacia', [], 1, 1]
    ]},
    penal:{ nome:'Noções de Direito Penal', sigla:'DP', cor:'#1baf7a', topicos:[
      ['dp-princ', 'Princípios do Direito Penal', ['penal_principios'], 2, 1.5],
      ['dp-aplic', 'Aplicação da lei penal e infração penal', ['penal_aplicacao'], 3, 2],
      ['dp-fato', 'Fato típico: conduta, resultado, nexo causal; consumação e tentativa', ['penal_fato_tipico'], 3, 2],
      ['dp-dolo', 'Crime doloso e crime culposo', ['penal_dolo_culpa'], 3, 1.5],
      ['dp-erro', 'Erro de tipo e erro de proibição', ['penal_erros'], 2, 1],
      ['dp-ilic', 'Ilicitude e culpabilidade', ['penal_ilicitude'], 3, 2],
      ['dp-conc-p', 'Concurso de pessoas', ['penal_concurso'], 2, 1],
      ['dp-conc-c', 'Concurso de crimes (material, formal e continuado)', [], 2, 1],
      ['dp-pena', 'Pena: espécies, aplicação, regimes, substituição, sursis e livramento', ['penal_dosimetria'], 2, 2],
      ['dp-punib', 'Extinção da punibilidade e prescrição', ['penal_punibilidade'], 2, 1.5],
      ['dp-vida', 'Crimes contra a vida', ['penal_pessoa_01', 'penal_pessoa_02', 'penal_pessoa_03', 'penal_pessoa_04', 'penal_pessoa_05', 'penal_pessoa_06'], 3, 2],
      ['dp-lesao', 'Lesão corporal, periclitação da vida e rixa', ['penal_pessoa_07', 'penal_pessoa_08'], 3, 1.5],
      ['dp-honra', 'Crimes contra a honra e contra a liberdade individual', ['penal_pessoa_09', 'penal_pessoa_10'], 3, 1.5],
      ['dp-patr', 'Crimes contra o patrimônio', ['penal_patrimonio'], 3, 2.5],
      ['dp-sexual', 'Crimes contra a dignidade sexual', ['penal_sexual'], 2, 1.5],
      ['dp-adm', 'Crimes contra a Administração Pública', ['penal_adm_func', 'penal_adm_particular', 'penal_adm_justica', 'penal_adm_financas'], 3, 2.5],
      ['dp-fe', 'Crimes contra a fé pública', ['penal_fe_publica'], 2, 1.5],
      ['dp-incol', 'Crimes contra a incolumidade pública', ['penal_incolumidade'], 2, 1.5],
      ['dp-paz', 'Crimes contra a paz pública', [], 2, 1],
      ['dp-edd', 'Crimes contra o Estado Democrático de Direito', [], 1, 1]
    ]},
    proc_penal:{ nome:'Noções de Direito Processual Penal', sigla:'PP', cor:'#0f8a8a', topicos:[
      ['pp-intro', 'Princípios, sistemas processuais, lei processual no tempo e no espaço', [], 2, 1.5],
      ['pp-ip', 'Inquérito policial, investigações preliminares, ANPP e controle externo', ['pp_inquerito'], 3, 2.5],
      ['pp-acao', 'Ação penal e ação civil ex delicto', [], 3, 1.5],
      ['pp-comp', 'Jurisdição e competência criminal', [], 2, 1.5],
      ['pp-provas', 'Provas: teoria geral, meios de prova e de obtenção de prova', ['pp_prova_geral', 'pp_prova_orais', 'pp_prova_docs_busca'], 3, 2.5],
      ['pp-prisoes', 'Prisões e medidas cautelares diversas da prisão', ['pp_flagrante'], 3, 2.5],
      ['pp-liberdade', 'Liberdade provisória', [], 2, 1],
      ['pp-sujeitos', 'Sujeitos do processo e comunicação dos atos', [], 1, 1],
      ['pp-incidentes', 'Questões e processos incidentes; medidas assecuratórias', [], 1, 1.5],
      ['pp-proced', 'Procedimento comum: ordinário, sumário e sumaríssimo', [], 2, 1.5],
      ['pp-nulid', 'Nulidades', [], 2, 1],
      ['pp-sentenca', 'Sentença, recursos e ações autônomas de impugnação', [], 1, 2]
    ]},
    constitucional:{ nome:'Noções de Direito Constitucional', sigla:'DC', cor:'#2a78d6', topicos:[
      ['dc-normas', 'Aplicabilidade e eficácia das normas constitucionais', ['normas_constitucionais'], 2, 1],
      ['dc-teoria', 'Teoria dos direitos fundamentais', ['teoria_direitos'], 2, 1],
      ['dc-art5a', 'Direitos e deveres individuais e coletivos (art. 5º, I a XXXI)', ['art5_parte1'], 3, 2],
      ['dc-art5b', 'Garantias e remédios constitucionais (art. 5º, XXXII a LXXIX)', ['art5_parte2'], 3, 2],
      ['dc-sociais', 'Direitos sociais', ['direitos_sociais'], 2, 1],
      ['dc-nac', 'Nacionalidade', ['nacionalidade'], 2, 1],
      ['dc-pol', 'Cidadania, direitos políticos e partidos políticos', ['direitos_politicos', 'partidos'], 2, 1.5],
      ['dc-org', 'Organização político-administrativa do Estado', ['organizacao_estado'], 3, 1.5],
      ['dc-admpub', 'Administração pública: disposições gerais e servidores', ['adm_publica'], 3, 1.5],
      ['dc-exec', 'Poder Executivo', ['executivo'], 2, 1],
      ['dc-leg', 'Poder Legislativo e processo legislativo', ['legislativo', 'processo_legislativo'], 2, 2],
      ['dc-jud', 'Poder Judiciário', ['judiciario'], 2, 1.5],
      ['dc-defesa', 'Defesa do Estado e segurança pública', ['defesa_estado'], 3, 1.5]
    ]},
    administrativo:{ nome:'Noções de Direito Administrativo', sigla:'DA', cor:'#eb6834', topicos:[
      ['da-regime', 'Regime jurídico-administrativo e princípios', ['adm_regime_principios'], 3, 1.5],
      ['da-org', 'Organização administrativa e entidades da administração indireta', ['adm_organizacao', 'adm_estatais_fundacoes'], 3, 2],
      ['da-agentes', 'Agentes públicos', ['adm_agentes'], 3, 1.5],
      ['da-poderes', 'Poderes administrativos; uso e abuso do poder', ['adm_poderes'], 3, 1.5],
      ['da-atos', 'Atos administrativos', ['adm_atos'], 3, 2],
      ['da-licit', 'Licitação: princípios, modalidades, procedimento (Lei 14.133/2021)', ['adm_licitacao_principios'], 3, 2],
      ['da-direta', 'Contratação direta: dispensa e inexigibilidade', ['adm_contratacao_direta'], 3, 1],
      ['da-contratos', 'Contratos administrativos', ['adm_contratos'], 2, 1.5],
      ['da-controle', 'Controle da Administração Pública', ['adm_controle'], 2, 1.5],
      ['da-resp', 'Responsabilidade civil do Estado', ['adm_responsabilidade_estado'], 3, 1.5],
      ['da-improb', 'Improbidade administrativa', ['adm_improbidade'], 3, 1.5],
      ['da-lopc', 'Lei estadual 11.370/2009 — Lei Orgânica da Polícia Civil da Bahia', [], 3, 2],
      ['da-6677', 'Lei estadual 6.677/1994 — Estatuto do Servidor da Bahia', [], 2, 1.5]
    ]},
    extravagante:{ nome:'Legislação Penal e Processual Extravagante', sigla:'LE', cor:'#7a3f9b', topicos:[
      ['le-drogas', 'Lei 11.343/2006 — Drogas', [], 3, 2],
      ['le-abuso', 'Lei 13.869/2019 — Abuso de autoridade', ['ext_abuso'], 3, 1.5],
      ['le-desarm', 'Lei 10.826/2003 — Estatuto do Desarmamento', [], 3, 1.5],
      ['le-mp', 'Lei 11.340/2006 — Maria da Penha; Lei 14.344/2022 — Henry Borel', [], 3, 1.5],
      ['le-hediondos', 'Lei 8.072/1990 — Crimes hediondos', ['ext_hediondos'], 3, 1],
      ['le-tortura', 'Lei 9.455/1997 — Tortura', ['ext_tortura'], 2, 0.5],
      ['le-orcrim', 'Lei 12.850/2013 — Organizações criminosas; Lei 15.358/2026 — Marco legal contra o crime organizado', ['ext_orcrim'], 3, 2],
      ['le-intercep', 'Lei 9.296/1996 — Interceptação telefônica', ['ext_interceptacao'], 3, 1],
      ['le-temp', 'Lei 7.960/1989 — Prisão temporária', ['ext_temporaria'], 3, 0.5],
      ['le-jecrim', 'Leis 9.099/1995 e 10.259/2001 — Juizados Especiais Criminais', ['ext_jecrim'], 2, 1.5],
      ['le-ctb', 'Lei 9.503/1997 — crimes de trânsito', ['ext_ctb'], 2, 1],
      ['le-eca', 'Lei 8.069/1990 — ECA (crimes e ato infracional)', [], 2, 1.5],
      ['le-idoso-pcd', 'Estatuto da Pessoa Idosa e Estatuto da Pessoa com Deficiência (crimes)', [], 1, 1],
      ['le-racismo', 'Lei 7.716/1989 — Crimes de preconceito', ['ext_racismo'], 2, 0.5],
      ['le-ambiental', 'Lei 9.605/1998 — Crimes ambientais', [], 2, 1],
      ['le-lavagem', 'Lei 9.613/1998 — Lavagem de dinheiro', ['ext_lavagem'], 2, 1],
      ['le-invest', 'Leis 12.830/2013 (investigação pelo delegado), 12.037/2009 (identificação criminal) e 5.553/1968', ['ext_identificacao'], 2, 1],
      ['le-protecao', 'Lei 9.807/1999 — Proteção a vítimas e testemunhas', [], 1, 0.5],
      ['le-lep', 'Lei 7.210/1984 — Execução penal', [], 2, 1.5],
      ['le-lcp', 'Decreto-Lei 3.688/1941 — Contravenções penais', [], 1, 0.5],
      ['le-economicos', 'Crimes financeiros, tributários e contra o consumidor (Leis 7.492/1986, 8.137/1990, 8.078/1990)', ['ext_sfn'], 1, 1.5],
      ['le-outros', 'Código Eleitoral, Lei Geral do Esporte, Improbidade (Lei 8.429/1992) e DUDH', [], 1, 1.5]
    ]},
    estatistica:{ nome:'Estatística', sigla:'ES', cor:'#a0522d', topicos:[
      ['es-descr', 'Estatística descritiva: gráficos, tabelas, medidas de posição e dispersão', [], 3, 2.5],
      ['es-assim', 'Assimetria e curtose', [], 1, 1],
      ['es-prob', 'Probabilidade: axiomas, condicional e independência', [], 3, 2],
      ['es-bayes', 'Teorema de Bayes', [], 2, 1],
      ['es-amostra', 'Técnicas de amostragem e tamanho amostral', [], 2, 1.5]
    ]},
    contabilidade:{ nome:'Noções de Contabilidade', sigla:'CT', cor:'#3f6f6f', topicos:[
      ['ct-fund', 'Fundamentos, usuários e características da informação contábil', [], 2, 1],
      ['ct-patr', 'Patrimônio: ativo, passivo, PL, equação e situação líquida', [], 3, 1.5],
      ['ct-fatos', 'Atos e fatos administrativos (permutativos, modificativos, mistos)', [], 3, 1],
      ['ct-contas', 'Contas, plano de contas, débito e crédito', [], 3, 1.5],
      ['ct-escrit', 'Escrituração: partidas dobradas, lançamentos, livros e erros', [], 3, 2],
      ['ct-operacoes', 'Operações: estoques e CMV, depreciação, folha, tributos, antecipações', [], 2, 2.5],
      ['ct-balancete', 'Análise e conciliação contábil; balancete de verificação', [], 2, 1.5],
      ['ct-demonstr', 'Balanço Patrimonial, DRE e notas explicativas', [], 3, 2],
      ['ct-finmat', 'Matemática financeira: juros, descontos e taxas', [], 2, 1.5],
      ['ct-financas', 'Noções de finanças, orçamento e tributos', [], 1, 1.5]
    ]},
    arquivologia:{ nome:'Noções de Arquivologia', sigla:'AR', cor:'#7d6b4f', topicos:[
      ['ar-principios', 'Arquivística: princípios, conceitos e legislação', [], 3, 1.5],
      ['ar-gestao', 'Gestão de documentos: protocolo, classificação, arquivamento e ordenação', [], 3, 2],
      ['ar-ttd', 'Tabela de temporalidade', [], 2, 1],
      ['ar-preserv', 'Acondicionamento, armazenamento, preservação e conservação', [], 2, 1],
      ['ar-tipos', 'Tipologias documentais, suportes, microfilmagem e automação', [], 1, 1]
    ]}
  }
};
})();
