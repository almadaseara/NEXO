# Banco de usuários do NEXO

O front-end do GitHub Pages não deve armazenar usuários ou senhas.

## Contrato esperado do backend

POST /login
Content-Type: application/json

Entrada:
{"email":"aluno@exemplo.com","password":"senha"}

Resposta válida para aluno:
{"ok":true,"role":"student","token":"TOKEN_DE_SESSAO"}

Resposta válida para administrador:
{"ok":true,"role":"admin","token":"TOKEN_DE_SESSAO"}

Falha:
{"ok":false,"message":"E-mail ou senha inválidos."}

## Tabela sugerida

users
- id (uuid)
- email (unique)
- password_hash
- role: student | admin
- active (boolean)
- created_at
- last_login_at

A senha deve ser armazenada apenas como hash seguro no backend (Argon2id ou bcrypt), nunca em texto puro e nunca no GitHub Pages.

O endpoint HTTPS deve ser configurado em auth-config.js.
