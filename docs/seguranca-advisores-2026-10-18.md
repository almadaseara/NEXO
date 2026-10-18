# Alertas de segurança do Supabase (18/10/2026)

Relatório do consultor de segurança do projeto `dkpgsvssyszrwmkutcyt`, com a decisão tomada para cada item.

| Alerta | Nível | Decisão | Motivo |
|---|---|---|---|
| `review_flashcards` com RLS ligado e sem políticas | INFO | Mantido | Intencional: a tabela não tem uso no site e fica fechada para `anon` e `authenticated` (ver `docs/sql/2026-10-18-auditoria-acesso.sql`). Sem políticas, ninguém lê nem escreve pelas chaves do navegador. |
| Extensão `pg_net` no schema `public` | WARN | Mantido | A extensão não é realocável (`relocatable: false`). Mudar de schema exige remover e recriar a extensão, o que quebraria os dois jobs de cron que chamam `net.http_post`. |
| `is_nexo_admin()` e `is_nexo_aluno()` executáveis por usuários logados | WARN | Mantido | As políticas de RLS avaliam essas funções com o papel do próprio usuário. Revogar o `EXECUTE` de `authenticated` quebraria o acesso às questões, aos mapas mentais e ao painel de admin. |
| `nexo_admin_listar_cadastros`, `nexo_admin_definir_acesso`, `nexo_admin_importacoes`, `nexo_admin_registrar_importacao` executáveis por usuários logados | WARN | Mantido | Cada função confere `is_nexo_admin()` logo no início e recusa quem não é administrador. O painel de admin chama essas funções por RPC. Trocar para `SECURITY INVOKER` dependeria de políticas de leitura e escrita de `profiles` e `exam_sources` para administradores, que não foram testadas aqui. |
| Proteção contra senhas vazadas desligada | WARN | Pendente (painel) | Não é configurável por SQL. Ativar em Authentication, Sign In / Providers, Email, opção de impedir senhas vazadas (HaveIBeenPwned). |

Revisar este documento sempre que um novo alerta aparecer ou uma função `SECURITY DEFINER` for criada.
