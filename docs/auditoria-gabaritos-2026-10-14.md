# Auditoria de gabaritos — 14/10/2026

Nada foi alterado no banco nem nos gabaritos. Esta auditoria só verifica e registra.

## 1. Banco de questões (Supabase, `question_bank`)

| Situação | Questões | Sem gabarito | Gabarito fora das alternativas |
|---|---:|---:|---:|
| Validadas e publicadas | 298 | 0 | 0 |
| Validadas e guardadas (`banked`) | 2.803 | 0 | 0 |
| Aguardando validação | 3 | 0 | 0 |
| Anuladas (retidas) | 126 | 0 | não se aplica |

- As 126 anuladas têm "gabarito" com valores como ANULADA; não aparecem no site.
- Das 298 publicadas, **222** têm gabarito conferido no documento oficial da banca (com link da prova e do gabarito) e **76** vieram de site espelho, **sem link** da prova nem do gabarito. No site, essas 76 aparecem com o aviso "gabarito conferido em fonte de apoio; confira no documento oficial". Recomendação: o robô deve tentar localizar o gabarito oficial delas.
- Só 145 das 298 aparecem nos temas (classificação manual em `data/banco-classificacao.json`).

## 2. Questões dos cadernos dentro do site (`index.html`)

153 questões (115 "oficiais" + 38 "do caderno").

- Gabarito vazio: **0**. Gabarito fora das alternativas: **0**. Comentário contradizendo o gabarito: **0**.
- **Corrigido na exibição:** 28 questões são Certo/Errado e, depois de respondidas, mostravam "Gabarito: A" ou "B". Agora mostram "Gabarito: Certo" ou "Errado" (o gabarito guardado não mudou).
- **Para revisar (origem):** 24 itens marcados como "Instituto AOCP - Bloco Consolidado de Fixação" (módulos `art5_parte2`, `organizacao_estado` e `executivo`), vindos do arquivo "Caderno Oficial AOCP - ... (20 Questões).pdf". Não têm ano, órgão nem cargo, e alguns enunciados não parecem de prova real (ex.: "Conforme a jurisprudência da AOCP..."). Como não é possível confirmar que são questões de prova com gabarito oficial, recomenda-se conferir o PDF de origem e, se forem exercícios de fixação, identificá-los assim ou retirá-los.
- 23 questões não informam o ano da prova e 20 têm só "Fundamentação indicada no caderno" como comentário.

## 3. Próximos passos sugeridos

1. Localizar o gabarito oficial das 76 questões publicadas sem link (robô).
2. Conferir os 24 itens do "Bloco Consolidado de Fixação".
3. Se a usuária encontrar uma questão sem gabarito no site, registrar o módulo e o número aqui para rastrear a origem.
