# Acervo Digital Pessoal — arquitetura para escala

Guia para quando o Acervo tiver muitos alunos (dezenas de milhares a milhões). Nada aqui precisa
ser feito agora: a versão atual (outubro de 2026) já tem a base certa. Este documento diz **o que
mudar, em que ordem e quando**, para não haver reescrita.

Escrito em 19/10/2026. Preços e limites de fornecedores mudam: **confira** nas páginas oficiais
antes de decidir.

---

## 1. Como funciona hoje

| Parte | Onde fica | Arquivo |
|---|---|---|
| Cadernos, páginas, pastas, cartões | IndexedDB no aparelho (um banco por conta) | `acervo/js/db.js` |
| Fila de envio (`outbox`) | IndexedDB, gravada **na mesma transação** do dado | `acervo/js/db.js` |
| Cópia na nuvem dos registros | Supabase, tabela `acervo_records` (RLS por dono) | `docs/sql/2026-10-19-acervo-sincronizacao.sql` |
| PDFs, imagens, áudios | Supabase Storage, bucket privado `acervo/<uid>/<id>` | idem |
| Motor de sincronização | navegador: envia a fila, recebe por cursor, trata conflitos | `acervo/js/sync.js` |

Regras que **não mudam** em nenhuma escala:

1. O aparelho é a fonte imediata: o aluno escreve sem esperar a rede.
2. Gravação local e registro na fila acontecem juntos (tudo ou nada).
3. Conflito nunca sobrescreve em silêncio: página editada em dois aparelhos guarda as duas versões; edição vence exclusão.
4. Cada aluno só lê e grava o que é dele (RLS + função `acervo_push` que fixa o dono).
5. Arquivo original (PDF/imagem) é imutável; anotações ficam separadas dele.

---

## 2. Decisão: onde guardar os arquivos

### Opção avaliada e descartada como principal: nuvem do próprio aluno (Google Drive, OneDrive, iCloud)

Funciona para poucos usuários, mas em escala vira problema:

- **Suporte:** aluno apaga a pasta, enche o Drive, desconecta a conta, troca de e-mail → "meus cadernos sumiram".
- **Dependência:** o provedor limita chamadas por projeto e pode mudar regras de acesso; um problema lá derruba todos.
- **iCloud:** um site não grava no iCloud Drive do aluno. O caminho oficial (CloudKit JS) exige conta de desenvolvedor Apple paga e login com Apple ID dentro do NEXO.
- **Mercado:** Goodnotes (Android/Windows/Web), Notion e Notability guardam na própria nuvem e cobram assinatura. Só o Goodnotes no ecossistema Apple usa o iCloud do usuário.

**Decisão:** a nuvem do aluno entra como **opção extra** — "copiar meus cadernos para o meu Drive" (backup/exportação) — e não como armazenamento principal.

### Decisão adotada: nuvem do NEXO, com as otimizações abaixo

---

## 3. Mudanças por ordem de prioridade

### 3.1 Um arquivo guardado uma vez só (deduplicação por conteúdo) — maior economia

Alunos de concurso importam os mesmos PDFs (apostilas, provas da banca, editais, lei seca).

- Ao importar, o aparelho calcula o **SHA-256** do arquivo.
- O servidor guarda **um objeto por hash** (`blobs/<sha256>`); cada aluno guarda só a referência (`assetId → sha256`).
- Antes de enviar, o aparelho pergunta se o hash já existe; se existir, não envia nada (economia de banda também).
- Anotações continuam separadas e privadas por aluno.
- Tabela de referências (`blob_refs`: sha256, user_id) para saber quando um objeto pode ser apagado (contagem zero).

Cuidados:
- **Privacidade:** responder "esse hash já existe" revela que alguém tem o arquivo. Mitigação: a checagem é feita pelo servidor e só para arquivos acima de um tamanho mínimo; nunca expor quem tem o arquivo; o acesso de leitura ao objeto exige ter a referência.
- **Materiais do próprio NEXO** (provas oficiais, lei seca) não precisam ser enviados: o caderno referencia o material da plataforma.

### 3.2 Arquivos fora do Supabase Storage → armazenamento de objetos sem custo de saída

Em escala o caro não é guardar, é **baixar** (egress).

- PDFs/imagens/áudios em um armazenamento de objetos com saída gratuita ou barata (ex.: Cloudflare R2 — **confira** preço e limites).
- O Supabase fica só com metadados e anotações (leves).
- Acesso por **URL assinada temporária**, emitida por função do servidor que confere o dono.
- Miniaturas geradas no aparelho e guardadas separadas (regeneráveis); nunca baixar o PDF inteiro só para mostrar a capa.

### 3.3 Cota por aluno = modelo de negócio

- Plano gratuito com cota (ex.: 1–2 GB de arquivos próprios; materiais do NEXO e arquivos deduplicados podem não contar ou contar menos).
- Plano pago com mais espaço.
- Mostrar uso na biblioteca ("1,2 GB de 2 GB") e avisar antes de encher. Ao estourar: o arquivo fica só no aparelho (comportamento atual de "arquivo grande só aqui"), nunca se perde.

### 3.4 Enviar só o que mudou (operações em vez de página inteira)

Hoje cada salvamento envia a **página inteira** (todos os traços). Com páginas cheias e muitos alunos, isso gasta banda e banco.

- Passar a enviar **operações**: "traço X adicionado", "traço Y apagado", "texto Z alterado", com id próprio.
- Compactar periodicamente (snapshot da página + operações depois dele).
- Traços pesados podem ir para o armazenamento de objetos (como arquivos), deixando no banco só o índice da página.
- Conflito fica mais fino: dois aparelhos que desenham traços diferentes na mesma página **se somam** em vez de gerar cópia de conflito. CRDT só se colaboração em tempo real virar requisito.

### 3.5 Avisar em vez de perguntar (fim da consulta a cada 90 s)

Hoje cada aparelho com o Acervo aberto consulta o servidor a cada 90 s. Com 1 milhão de alunos ativos isso dá na ordem de 11 mil consultas por segundo.

- Usar notificação do servidor (canal em tempo real por aluno) só para "há novidade, cursor N".
- Aparelho parado ou em segundo plano não consulta; ao voltar ao primeiro plano, uma consulta.
- Recuo exponencial em erro (já existe: 60 s), com jitter para não sincronizar todo mundo no mesmo segundo.

### 3.6 Banco dividido por aluno

`acervo_records` com chave `(user_id, store, id)` e índice `(user_id, revision)` aguenta muito, mas bilhões de linhas pedem:

- Particionar por hash de `user_id`.
- Sequência de revisão por aluno (ou por partição) em vez de uma global.
- Limpeza de "lápides" (registros apagados) após um prazo, quando todos os aparelhos do aluno já tiverem passado do cursor.

### 3.7 Opção "Copiar para o meu Drive"

Backup exportado para o Google Drive do aluno (escopo `drive.file`: o NEXO só vê os arquivos que ele criou). Agendado (ex.: semanal) ou manual. Não é fonte da sincronização.

---

## 4. Quando fazer cada coisa

| Sinal | Fazer |
|---|---|
| Armazenamento do projeto passando de ~70% do plano | 3.1 (deduplicação) e 3.3 (cota) |
| Conta de banda/egress relevante | 3.2 (objetos com saída barata) |
| Páginas grandes demorando para salvar/sincronizar | 3.4 (operações) |
| Muitos alunos com o Acervo aberto ao mesmo tempo | 3.5 (avisar em vez de perguntar) |
| Consultas na `acervo_records` ficando lentas | 3.6 (particionar) |
| Alunos pedindo cópia própria dos cadernos | 3.7 (copiar para o Drive) |

---

## 5. Pendências que valem em qualquer escala

- Testar com iPad + Apple Pencil reais (latência, rejeição de palma, pressão).
- Testar no Safari: limites de armazenamento local e limpeza automática de dados de sites.
- Teste de restauração periódico do backup do banco e do armazenamento de objetos.
- Painel do administrador com uso por aluno (espaço, último sincronismo, erros).
