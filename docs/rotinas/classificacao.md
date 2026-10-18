# Rotina do Claude Code: sugestão de módulo (Claude Haiku 5.5, diária)

Instruções usadas na rotina agendada "NEXO — sugestão de módulo". Roda pela assinatura do Claude (sem custo de
API) e só **deposita** sugestões em `ai_external_extractions`; a função `nexo-ai` grava em
`question_bank.ai_module_*`. Sugestões com confiança alta são publicadas automaticamente por `nexo_auto_publicar()`; as demais vão para a revisão.

**Conector necessário:** Supabase (projeto do NEXO, `dkpgsvssyszrwmkutcyt`).
**Teto por execução:** 200 questões.

---

Você sugere o módulo de estudo do NEXO para questões de concursos policiais.

1. Execute no Supabase do NEXO (projeto `dkpgsvssyszrwmkutcyt`):
   - `select module_id, discipline_name, subject_name, description from public.subject_catalog where active order by module_id;`
   - `select * from public.nexo_rotina_fila_classificacao(50);`
   Se a fila vier vazia, encerre dizendo "fila vazia". Trabalhe **um lote de 50 por vez**: classifique o lote,
   grave-o (passo 3) e só então peça o próximo com a mesma consulta — o que já foi gravado sai da fila.
   No máximo 4 lotes (200 questões) por execução.
2. Para cada questão, escolha o módulo mais específico cujo conteúdo ela realmente cobra. Se o assunto não
   estiver no catálogo (Português, Informática, Raciocínio Lógico, Contabilidade, Processo Penal ou legislação
   sem módulo próprio), use `fora_do_catalogo` e informe a disciplina em `disciplina_sugerida`.
   Classifique pelo conteúdo jurídico ou técnico que a resposta exige, não pelas palavras do cenário (ex.: um caso
   de delegado que pergunta sobre prescrição é Direito Penal, não Polícia Judiciária).
   `confianca`: `alta` **só** quando o tema é inequívoco e o módulo cobre exatamente o assunto cobrado — a questão
   vai ao ar automaticamente nesse módulo, sem revisão; `media` quando há dois módulos plausíveis ou o módulo cobre
   o assunto só em parte; `baixa` quando a questão mistura temas, parece trazer texto de outra questão ou está
   incompleta. Na dúvida entre `alta` e `media`, use `media`. `justificativa`: uma frase curta.
3. Monte o JSON do lote e grave **apenas** com (um insert por lote):
   ```sql
   insert into public.ai_external_extractions (kind, method, model, payload)
   values ('classify', 'claude_routine_v1', 'claude-haiku-5-5', $json$
   {"classificacoes": [{"id": "<uuid>", "module_id": "adm_atos", "confianca": "alta", "disciplina_sugerida": "Direito Administrativo", "justificativa": "..."}]}
   $json$::jsonb);
   ```
4. Proibido: alterar qualquer outra tabela, publicar questões ou mexer em `question_module_map`.
5. Termine com um resumo: questões classificadas e quantas ficaram fora do catálogo.
