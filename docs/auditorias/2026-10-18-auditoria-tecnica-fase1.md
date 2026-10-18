# NEXO Revisão — Auditoria técnica da Fase 1

**Emissão:** 18/10/2026  
**Plano de referência:** *NEXO Revisão | Auditoria completa*, páginas 23–25 e 30–31.  
**Ambientes consultados:** GitHub `almadaseara/NEXO` e Supabase **exclusivo do NEXO**, projeto `dkpgsvssyszrwmkutcyt`.  
**Natureza:** auditoria técnica, de configuração e integridade **somente leitura**; nenhuma conta foi criada, nenhum gabarito foi alterado e nenhum SQL de modificação foi aplicado. Não equivale a homologação de segurança.

## Parecer

**Auditoria documental/técnica executada; Fase 1 NÃO homologada.** Os critérios do PDF exigem evidência de sessões reais para perfis e testes de acesso. Esses testes não podem ser substituídos pelo exame estático de RLS e ainda estão pendentes. As verificações de navegação do CI são automatizadas e não substituem um teste real com todos os papéis.

## Inventário verificado

| Indicador | Resultado | Evidência |
|---|---:|---|
| Questões totais em `question_bank` | 3.230 | consulta SQL de produção |
| Questões validadas e publicadas | 298 | consulta SQL de produção |
| Questões anuladas publicadas | 0 | consulta SQL de produção |
| Publicadas sem resposta / fonte / enunciado de ao menos 20 caracteres | 0 / 0 / 0 | consulta SQL de produção |
| Fontes em `exam_sources` | 994 | consulta SQL de produção |
| Fontes com prova e gabarito associados | 40 | consulta SQL de produção |
| Fontes adiadas | 164 | consulta SQL de produção |
| Classificações em `question_module_map` | 145 | consulta SQL de produção |
| Módulos distintos na tabela de classificação | 39 | consulta SQL de produção |
| Questões publicadas com `module_id` preenchido | 298 | consulta SQL de produção; **não prova revisão editorial** |
| Questões com `classification_status='reviewed'` | 0 | consulta SQL de produção; revisar taxonomia real de estados |
| Arquivos `data/temas/*.js` | 24 | árvore GitHub atual |
| Imagens em `assets/mapas/` | 76 | árvore GitHub atual |
| Função Edge `question-collector` | versão 26, ACTIVE | Supabase |
| Função Edge `aocp-import` | versão 1, ACTIVE | Supabase |

**Observação:** o guia cita 68 módulos de conteúdo, mas um arquivo JS pode conter vários módulos; contar arquivos `data/temas/*.js` não refuta nem confirma os 68 módulos. O inventário final de módulos efetivamente completos exige inspeção semântica módulo a módulo. Da mesma forma, 76 imagens em disco não significam cobertura de 76 assuntos, nem qualidade gráfica aprovada.

## Segurança de dados: comprovado e pendente

1. RLS **ativado** nas tabelas examinadas: `question_bank`, `question_module_map`, `profiles`, `study_plans`, `study_highlights`, `exam_sources`, `exam_documents`. O papel `anon` não recebe privilégio direto `SELECT` nessas tabelas.
2. Política `question_bank_read`: leitura do aluno autenticado depende de `status='validated'`, `publication_status='published'` e `is_nexo_aluno()`; administradores passam por `is_nexo_admin()`. Examinar essa política **não substitui** tentar consulta real como aluno ativo/inativo.
3. As funções `is_nexo_admin()` e `is_nexo_aluno()` consultam o perfil do `auth.uid()` e exigem `active=true`. `nexo_admin_definir_acesso` chama `is_nexo_admin()`, mas necessita teste de chamada real com usuário sem privilégio.
4. Supabase Security Advisor: **WARN** `pg_net` instalado em `public`; **WARN** seis funções `SECURITY DEFINER` executáveis por `authenticated` (algumas são intencionais; inspecionar todas as checagens internas antes de restringir); **WARN** proteção contra senhas vazadas desativada; **INFO** `review_flashcards` sem política RLS (sem inferir vazamento por isso).
5. Performance Advisor: 11 índices considerados sem uso na amostra atual e políticas permissivas duplicadas em `question_module_map` para `SELECT`. **Não remover índices ou políticas** sem análise de carga e efeito na UI.
6. **Não testado:** conta anônima versus sessão válida, aluno pendente, aluno ativo, editor (quando existir), administrador, logout, expiração de JWT, uploads, mutações RPC e troca de identidade. As configurações inspecionadas não autorizam afirmar homologação de segurança.
7. O `question-collector` mantém `verify_jwt=false`, mas possui verificação própria de token de cron; não ligar `verify_jwt` sem compatibilizar o invocador. O `aocp-import` está com `verify_jwt=true`.

Referências para remediação:
- [Proteção contra senhas vazadas](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)
- [Extensão instalada em public](https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public)
- [Funções SECURITY DEFINER executáveis](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable)
- [RLS sem política](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy)
- [Políticas permissivas múltiplas](https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies)

## Integridade de questões e robô

- **Zero** questões anuladas publicadas no banco, zero publicações sem resposta/fonte ou com enunciado extremamente curto segundo verificações estruturais. Isso **não comprova** gabarito correto por si.
- Lote-piloto Cebraspe de 100 questões: enunciado e resposta coincidem com documentos **extraídos**, mas a inspeção visual identificou contexto de tabela ausente nos itens PF 2025 107–110. O item 109 não estava inserido nessa fonte. Ver [issue #12](https://github.com/almadaseara/NEXO/issues/12) e relatório do lote-piloto.
- Código preventivo de retenção/extração atualizado e implantado no `question-collector` versão 26; o banco histórico **não foi saneado automaticamente**. Publicar somente após vínculo real de tabela e revisão de caderno/gabarito.
- Funções de extração/pareamento no Supabase e o robô de descoberta no GitHub são frentes diferentes. Os indicadores do GitHub não representam o total de provas/gabaritos do Supabase.
- A importação AOCP possui função Edge ativa, mas **não foi homologada ponta a ponta** com cargo, caderno, prova, gabarito definitivo, mídia e publicação manual.
- Houve execução bem-sucedida do GitHub Actions [validação contínua #39126165044](https://github.com/almadaseara/NEXO/actions/runs/39126165044), incluindo temas, extrator Cebraspe e navegação automatizada. Não é teste de sessão real.

## Matriz de aceite do PDF (página 24)

| Critério | Situação | Próxima evidência necessária |
|---|---|---|
| Inventário de módulos, imagens, questões e versões | **Parcial** | inventário semântico de módulos e migrations realmente aplicadas |
| Teste real de papéis/permissões em ambiente seguro | **Pendente** | testes com contas de papéis distintos, sem expor credenciais |
| Auditoria de integridade do banco e gabaritos publicados | **Parcial** | inspeção visual de amostra estratificada com fonte oficial e mídia |
| Correções de navegação/mapeamento/mapas | **Parcial** | teste funcional de mapas e prática com conta ativa no iPhone e desktop |
| Métricas reproduzíveis | **Atendido no recorte SQL** | repetir após mudanças e registrar data |
| Sem mexer em outros projetos | **Atendido nesta auditoria** | seguir isolando escopo por ID do projeto |

## Riscos priorizados e decisões

**P0** — Executar em ambiente seguro matriz de autenticação/autorizações (anônimo, pendente, aluno, admin, token expirado, upload e RPC), habilitar proteção contra senhas comprometidas em Auth e rever `SECURITY DEFINER` com segurança, sem quebrar controle de administração. Não aplicar mudanças automáticas de políticas de alto risco sem backup e teste de regressão.

**P1** — Completar integridade visual e contextual das questões; recuperar PF 2025 109 e tabela 107–110, incluir trilha de exceções e validar AOCP ponta a ponta, com publicação somente após revisão editorial.

**P1** — Inventário de todos os módulos reais do currículo por assunto/subassunto e cruzamento com edital; auditar imagem 3:2, correspondência e legibilidade de cada mapa (não confundir quantidade de arquivos com cobertura).

**P2** — Finalizar testes reais de simulados, caderno de erros, busca, progresso do aluno e mobile.

**P3** — Diagnóstico adaptativo, comparador de editais e radar editorial depois dos critérios P0/P1.

## Limites do parecer

Esta etapa realizou uma **auditoria técnica e documental real** com GitHub e SQL/Advisors Supabase. Não criou contas de teste, não extraiu dados privados de alunos, não declarou inexistência de vulnerabilidades e não aprovou a Fase 1 sem os cenários de sessão exigidos no plano original. O parecer serve como registro de evidências e fila de resolução.
