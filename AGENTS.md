# Instruções para assistentes de IA (Codex, ChatGPT, Claude e outros)

Projeto: **NEXO Revisão** — plataforma de estudos para concursos policiais (PC-BA e PC-PE).

Antes de qualquer alteração de conteúdo, **leia `docs/GUIA-TEMAS.md`**. Ele descreve o formato dos temas, as regras e o passo a passo. Todo material novo ou revisado segue o **padrão NEXO de material** (seção 3-A do guia; tema de referência: Homicídio, `penal_pessoa_01`).

Regras que nunca podem ser quebradas:

1. Não inventar leis, súmulas, teses, números de processo, datas ou questões. Conferir em fonte oficial (Planalto, STF, STJ) e citar o link.
2. O que for incerto ou ainda pendente recebe `status:"atencao"` ou `"pendente"`, com "confira" na explicação.
3. Não copiar prosa de PDFs de cursos (lei seca pode ser citada literalmente).
4. Não alterar gabaritos nem o banco de questões no Supabase. Questão é publicada pela tela Administração → Revisar questões (função `nexo_admin_revisar_questao`) ou pela publicação automática da `nexo-ai` (função `nexo_auto_publicar`, decidida pelo administrador em 18/10/2026; travas em `docs/sql/2026-10-18-publicacao-automatica.sql`). Não afrouxar essas travas nem publicar por outro caminho sem pedido do administrador. O pipeline está em `docs/pipeline-questoes.md`; mudou `supabase/functions/`? Rode `node tools/testar-extrator-cebraspe.js` e `node tools/testar-pipeline.mjs` (Node 24+).
5. Preservar o código e os dados existentes; mudanças pequenas e revisáveis.

Antes de entregar qualquer mudança em `data/temas/`:

```bash
node tools/validar-temas.js          # tem que terminar com "OK"
python3 tools/testar-site.py         # tem que terminar com "OK" (requer playwright + chromium)
```

Módulo novo: inclua o `id` na constante `ARVORE` de `ui/nexo-ui.js` (árvore da barra lateral) e no tópico certo de `data/trilha/pcba.js` (trilha de estudos). Mudou cores no `index.html`? Rode `python3 tools/gerar-tema-escuro.py`.

Sempre rode `git pull --rebase origin main` antes de enviar.
