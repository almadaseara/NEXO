# Login e permissões do NEXO

O login é feito pelo **Supabase Auth** (projeto `dkpgsvssyszrwmkutcyt`). O site guarda só a chave
pública (`sb_publishable_…` em `auth-config.js` e no `index.html`); senhas e chaves secretas nunca
ficam no GitHub.

## Como entrar

- E-mail e senha (com confirmação por e-mail) ou Google.
- Toda conta nova ganha uma linha em `public.profiles` pelo gatilho `handle_new_user`, com
  `active = false` ("aguardando liberação"), a menos que o e-mail esteja em
  `app_private.authorized_users`, que define as permissões de antemão.
- O administrador libera ou bloqueia contas em **Administração → Cadastros** (`ui/nexo-cadastros.js`,
  funções `nexo_admin_listar_cadastros` e `nexo_admin_definir_acesso`).

## Permissões (`public.profiles`)

| Campo | Significado |
| --- | --- |
| `active` | Conta liberada. Sem isso a pessoa não entra e o banco não entrega nada. |
| `can_student` | Pode usar o modo Aluno. |
| `can_admin` | Pode usar o modo ADM. |
| `default_mode` | Modo ao entrar (`student` ou `admin`). |
| `role` | Campo antigo; as regras atuais usam `can_student` e `can_admin`. |

## Quem lê o quê no banco

Regras em `docs/sql/` (a mais recente é `2026-10-18-auditoria-acesso.sql`):

- `is_nexo_aluno()`: conta ativa com `can_student` ou `can_admin`. Lê questões **validadas e
  publicadas**, a classificação (`question_module_map`) e os mapas mentais.
- `is_nexo_admin()`: conta ativa com `can_admin`. Lê tudo, inclusive as tabelas do robô.
- Plano, marcações e avisos de erro: cada aluno só vê e altera as próprias linhas.
- O robô usa `service_role` nas edge functions e não depende dessas regras.

O conteúdo dos resumos (`index.html`, `data/temas/`) é público, como todo o repositório: o login
protege o que está no Supabase.
