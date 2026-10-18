# Rotina do Claude Code: segunda leitura das provas (Claude Sonnet 5.5, diária)

Instruções usadas na rotina agendada "NEXO — segunda leitura". Ela roda pela assinatura do Claude
(sem custo de API) e só **deposita** o resultado em `ai_external_extractions`; quem grava no banco é a
função `nexo-ai`, com as mesmas regras de validação das outras leituras. Nada é publicado.

**Conector necessário:** Supabase (projeto do NEXO, `dkpgsvssyszrwmkutcyt`).
**Teto por execução:** 2 provas ou 30 questões, o que vier primeiro.

---

Você faz a segunda leitura de provas oficiais de concursos para o banco de questões do NEXO.

1. Execute no Supabase do NEXO (projeto `dkpgsvssyszrwmkutcyt`):
   `select * from public.nexo_rotina_fila_leitura(2);`
   Se não vier nenhuma linha, encerre dizendo "fila vazia".
2. Para cada linha (no máximo 2 provas e 30 questões no total nesta execução):
   - Baixe o caderno oficial (`exam_pdf_url`) com `curl -sL -o caderno.pdf "<url>"` e confira que o arquivo
     começa com `%PDF`. Se `numeros` estiver vazio, baixe também o gabarito (`answer_key_pdf_url`).
   - Leia no PDF **somente** as questões listadas em `numeros` (se vazio, todas as objetivas). `motivos` diz por
     que cada uma ficou pendente (fórmula, figura, tabela, alternativas, não encontrada).
   - Transcreva com fidelidade absoluta: não corrija, não resuma, não complete, não invente. Fórmulas e símbolos
     em Unicode legível (ex.: `Var(X − Y) = 2`, `P → (Q ∨ ¬R)`), sem LaTeX. Tabelas como texto, uma linha por
     linha, colunas separadas por ` | `. Figuras que não dá para transcrever: registre em `figuras` com a página
     (começando em 1), uma descrição curta e a caixa aproximada `[x0, y0, x1, y1]` em frações da página (origem no
     canto superior esquerdo).
   - Texto-base ou comando de bloco ("Julgue os itens a seguir...") usado pela questão vai em `contextos`, e a
     questão aponta para ele em `contexto_id`. Não repita o texto-base no enunciado.
   - `gabarito_lido`: só se o gabarito foi baixado (lista vazia); senão `null`. Questão anulada: `anulada: true`.
   - Dúvidas, trechos ilegíveis: escreva em `alertas` da questão.
3. Monte um JSON exatamente neste formato (todas as chaves sempre presentes):
   ```json
   {
     "numeros": [71, 72],
     "caderno": {"banca": "CEBRASPE", "orgao": "...", "cargo": "...", "ano": 2021, "tipo_caderno": null, "observacoes": ""},
     "contextos": [{"id": "T1", "texto": "...", "figuras": []}],
     "questoes": [{
       "numero": 71, "tipo": "certo_errado", "contexto_id": "T1", "enunciado": "...",
       "alternativas": [], "figuras": [], "pagina": 2, "gabarito_lido": null, "anulada": false, "alertas": []
     }]
   }
   ```
   `tipo` é `certo_errado` (sem alternativas) ou `multipla_escolha` (alternativas `{"letra": "A", "texto": "..."}`
   de A até a última letra, sem a letra no texto).
4. Grave **apenas** com este comando (uma linha por prova; use dollar-quoting para o JSON):
   ```sql
   insert into public.ai_external_extractions (kind, source_id, method, model, payload)
   values ('extract', '<source_id>', 'claude_routine_v1', 'claude-sonnet-5-5', $json$<JSON>$json$::jsonb);
   ```
5. Proibido: alterar `question_bank`, `exam_sources` ou qualquer outra tabela; publicar questões; mudar gabaritos.
6. Termine com um resumo curto: provas lidas, questões transcritas, alertas relevantes.
