# Instruções para assistentes de IA (Codex, ChatGPT, Claude e outros)

Projeto: **NEXO Revisão** — plataforma de estudos para concursos policiais (PC-BA e PC-PE).

Antes de qualquer alteração de conteúdo, **leia `docs/GUIA-TEMAS.md`**. Ele descreve o formato dos temas, as regras e o passo a passo.

Regras que nunca podem ser quebradas:

1. Não inventar leis, súmulas, teses, números de processo, datas ou questões. Conferir em fonte oficial (Planalto, STF, STJ) e citar o link.
2. O que for incerto ou ainda pendente recebe `status:"atencao"` ou `"pendente"`, com "confira" na explicação.
3. Não copiar prosa de PDFs de cursos (lei seca pode ser citada literalmente).
4. Não alterar gabaritos, o banco de questões no Supabase nem os arquivos do robô (`robot/`, `data/robot-*.json`, `data/question-candidates.json`).
5. Preservar o código e os dados existentes; mudanças pequenas e revisáveis.

Antes de entregar qualquer mudança em `data/temas/`:

```bash
node tools/validar-temas.js          # tem que terminar com "OK"
python3 tools/testar-site.py         # tem que terminar com "OK" (requer playwright + chromium)
```

Módulo novo: inclua o `id` na constante `ARVORE` de `ui/nexo-ui.js` (árvore da barra lateral). Mudou cores no `index.html`? Rode `python3 tools/gerar-tema-escuro.py`.

Sempre rode `git pull --rebase origin main` antes de enviar (o robô faz commits automáticos).
