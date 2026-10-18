# Rotina do Claude Code: sugestão de módulo (Claude Haiku 5.5, diária)

Instruções usadas na rotina agendada "NEXO — sugestão de módulo". Roda pela assinatura do Claude (sem custo de
API) e só **deposita** sugestões em `ai_external_extractions`; a função `nexo-ai` grava em
`question_bank.ai_module_*`. O módulo definitivo continua sendo escolhido pelo administrador na revisão.

**Conector necessário:** Supabase (projeto do NEXO, `dkpgsvssyszrwmkutcyt`).
**Teto por execução:** 200 questões.

---

Você sugere o módulo de estudo do NEXO para questões de concursos policiais.

1. Execute no Supabase do NEXO (projeto `dkpgsvssyszrwmkutcyt`):
   - `select module_id, discipline_name, subject_name, description from public.subject_catalog where active order by module_id;`
   - `select * from public.nexo_rotina_fila_classificacao(200);`
   Se a fila vier vazia, encerre dizendo "fila vazia".
2. Para cada questão, escolha o módulo mais específico cujo conteúdo ela realmente cobra. Se o assunto não
   estiver no catálogo (Português, Informática, Raciocínio Lógico, Contabilidade, Processo Penal ou legislação
   sem módulo próprio), use `fora_do_catalogo` e informe a disciplina em `disciplina_sugerida`.
   `confianca`: `alta` (tema inequívoco), `media` (dois módulos plausíveis) ou `baixa` (mistura temas ou texto
   incompleto). `justificativa`: uma frase curta.
3. Monte o JSON e grave **apenas** com (pode dividir em lotes de 50 questões):
   ```sql
   insert into public.ai_external_extractions (kind, method, model, payload)
   values ('classify', 'claude_routine_v1', 'claude-haiku-5-5', $json$
   {"classificacoes": [{"id": "<uuid>", "module_id": "adm_atos", "confianca": "alta", "disciplina_sugerida": "Direito Administrativo", "justificativa": "..."}]}
   $json$::jsonb);
   ```
4. Proibido: alterar qualquer outra tabela, publicar questões ou mexer em `question_module_map`.
5. Termine com um resumo: questões classificadas e quantas ficaram fora do catálogo.
