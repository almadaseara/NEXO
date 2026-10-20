# Acervo Digital Pessoal

Seção do NEXO Revisão para cadernos digitais: escreva à mão, anote PDFs, estude com flashcards e peça ajuda à IA. Os dados ficam **só no aparelho do aluno** (IndexedDB, um banco por conta: `nexo-acervo:<id da conta>`); ainda não há sincronização com o Supabase.

## Como se integra ao NEXO

- O NEXO (`index.html`) carrega `ui/nexo-acervo.js` e `ui/nexo-acervo.css`, no mesmo padrão dos outros módulos `ui/nexo-*.js`: o item **Acervo Digital Pessoal** entra na barra lateral (depois de "Meus grifos"), o botão **Acervo** na barra de acesso do celular e um atalho na busca (Ctrl K).
- A área de conteúdo mostra `acervo/` num iframe da mesma origem, sem bordas. O menu, o cabeçalho, o cronômetro e a forma de voltar são os do NEXO, inclusive no celular (☰ e barra inferior).
- O iframe isola o editor (canvas, atalhos, CSS) do CSS/JS do NEXO e fica vivo enquanto a página está aberta: dá para ir à lei seca e voltar ao caderno no mesmo ponto. Ao sair da conta, ele é descartado.
- As seções internas (Todos os cadernos, Favoritos, Estudar, Páginas marcadas e as pastas) ficam nas abas dentro do Acervo; no menu do NEXO aparece só o item principal. A comunicação é por `postMessage` (`js/nexo.js` aqui; `ui/nexo-acervo.js` no NEXO).
- `#acervo` (ou `#acervo/caderno/ID`) reabre o Acervo e o caderno depois de recarregar. Abrir `acervo/` direto redireciona para `../#acervo`.
- **Login:** aparece para conta ativa com permissão de aluno (`profiles.active` e `can_student`), no modo Aluno ou ADM. `acervo/index.html` só libera a tela se houver a sessão do Supabase do NEXO (chave derivada de `../auth-config.js`) e o perfil validado pelo NEXO (`window.parent.nexoAcervoPerfil`); senão manda para a raiz. Ele não cria um segundo cliente do Supabase, que disputaria a renovação do token com a página principal. Como todo site estático, a proteção é do lado do navegador: os cadernos ficam só no aparelho do aluno.
- **Visual:** tokens `--nx-*` de `ui/nexo-ui.css`, copiados do NEXO em tempo real por `js/nexo.js` (inclusive na troca de tema claro/escuro), fontes DM Sans e Manrope e os mesmos padrões `.nx-head`, `.nx-seg`, `.nx-panel` e botões.
- **Offline:** `sw.js` fica em `/acervo/` e só responde por URLs dentro dessa pasta. O service worker do NEXO (`/sw.js`) continua cuidando das páginas do NEXO; o do Acervo nunca as intercepta.
- As chaves de IA nunca vão no código: cada aluno informa a própria chave no **Assistente de IA**, e ela fica só no navegador dele.

## Bibliotecas (`vendor/`) e deploy

`vendor/` é gerado por `npm install` (postinstall `scripts/vendor.mjs`) e **fica commitado** no repositório. O GitHub Pages do NEXO publica direto do branch, sem etapa de build; gerar por GitHub Action exigiria trocar a fonte do Pages para "GitHub Actions" e um build a cada commit do robô de questões (a cada 15 min). São ~14 MB, quase todo o WebLLM (IA no navegador), bem abaixo dos limites do GitHub.

Para atualizar as bibliotecas:

```bash
cd acervo
npm install
```

Depois commite `acervo/vendor/` (e `package-lock.json`). `node_modules/` é ignorado. Ao mudar arquivos do app, aumente `VERSION` em `sw.js` para os alunos receberem a versão nova.

Para testar localmente, sirva a **raiz do repositório** (não a pasta `acervo/`) e abra `/`: o Acervo usa `../auth-config.js` e o login do NEXO. Entre com e-mail e senha (o login social volta para o endereço publicado).

## Funcionalidades

**Leitura e tela**
- Todo caderno, PDF ou quadro abre em **modo leitura**: as ferramentas somem, tocar só rola a página (e revela fitas) e o selo dourado "Apenas leitura" fica na barra. Para escrever, toque em **Editar** (ou no selo); tocar de novo volta à leitura. Ao tentar escrever com a caneta no modo leitura, o aviso reaparece.
- No computador a página inteira cabe na tela; no celular ela ocupa a largura toda, com margens mínimas. Zoom pelos botões, Ctrl+roda ou pinça.

**Escrita**
- Caneta tinteiro, esferográfica, pincel e lápis (com textura), com pressão; marca-texto por baixo da tinta; paleta editável.
- **Formas perfeitas:** segure no fim do traço e ele vira linha, seta, círculo, elipse, retângulo, triângulo ou polígono.
- **Rabiscar para apagar:** rabisque por cima de algo e ele some.
- Borracha parcial ou de traço inteiro (também remove fitas), opção "só marca-texto", botão borracha da caneta.
- **Laço livre ou retangular:** mover, redimensionar, **girar** (imã a cada 15°), mudar cor, **preencher formas**, trazer para frente / enviar para trás, copiar, recortar, colar, duplicar.
- Texto e **post-its** coloridos; imagens por arquivo ou Ctrl+V.
- **Figurinhas:** emojis, carimbos ("IMPORTANTE", "VAI CAIR NA PROVA"…), washi tapes e figurinhas suas, salvas a partir do laço.

**Estudo**
- **Flashcards com repetição espaçada:** contorne algo com o laço → *Flashcard*. O verso pode ser digitado ou outra área escolhida com o laço. Revisão com notas Errei / Difícil / Bom / Fácil (teclas 1–4) e agenda automática.
- Área **Estudar** na biblioteca: cartões para hoje, baralhos e estatísticas.
- **Fita adesiva:** cubra respostas e toque para revelar ou esconder ("Esconder/Revelar todas"). No PDF exportado, as fitas escondidas saem cobrindo a resposta.
- **Gravação de áudio sincronizada:** grave a aula enquanto escreve; na reprodução, a escrita aparece no ritmo do áudio e tocar num traço pula para aquele momento.

**Assistente de IA** (opcional) — escolha o provedor em **⋯ → Assistente de IA** na biblioteca ou no botão ✦ do editor:
- **Claude** (Anthropic): melhor qualidade, pago por uso. Chave em console.anthropic.com. Modelo padrão Claude Opus 5.5 (ou Sonnet 5.5 / Haiku 5.5).
- **Google Gemini**: tem nível gratuito com limite de uso. Chave grátis em aistudio.google.com/apikey. No plano gratuito o Google pode usar o conteúdo enviado para melhorar os produtos dele.
- **No navegador** (WebLLM): grátis, sem chave e sem instalar nada. O modelo é baixado uma vez (1–5 GB) e roda na placa de vídeo via WebGPU (Chrome/Edge); depois funciona offline. Mais simples que as opções na nuvem; só o Phi-3.5 Vision lê escrita à mão. Em placas integradas (ex.: Intel Iris Xe), prefira o Qwen 3.5 2B.
- **Ollama**: grátis e privado, roda no seu PC. Instale em ollama.com, deixe o Ollama aberto e baixe um modelo com visão, por exemplo `ollama pull qwen2.5vl` (~6 GB; recomendado ter 16 GB de RAM).

O que o assistente faz:
- Resumir página ou caderno, gerar quiz interativo, gerar flashcards, perguntar às suas anotações.
- Converter escrita à mão em texto; explicar ou resolver passo a passo um trecho (ótimo para contas).
- "Escrita → busca": reconhece o que você escreveu à mão para a busca encontrar.
- As chaves ficam só neste navegador.

**Organização e navegação**
- Cadernos, **quadro branco infinito**, pastas e **subpastas com emoji**, favoritos, páginas marcadas.
- **Sumário** por caderno (o índice de PDFs é importado automaticamente).
- **Links** de uma área da página para outra página, outro caderno ou um site. Os links continuam clicáveis no PDF exportado.
- **Modo apresentação** em tela cheia com **laser**.
- Modelos: liso, pautado, quadriculado, pontilhado, Cornell, checklist, semana, mês, ano e partitura; 4 cores de papel; 3 espaçamentos; **modelos seus** a partir de imagem ou PDF.
- Busca global e no caderno (PDFs, textos e escrita reconhecida), exportação em PDF, backup em `.json` (aceita também backups do app original), offline.

## Atalhos

| Tecla | Ação |
|---|---|
| P / H / E / L / T / F / K | Caneta, marca-texto, borracha, laço, texto, fita, laser |
| Espaço (segurar) | Mover a página |
| Ctrl+Z / Ctrl+Y | Desfazer / refazer |
| Ctrl+C / X / V / D | Copiar, recortar, colar, duplicar |
| Delete | Excluir seleção |
| Ctrl+F | Buscar no caderno |
| Ctrl + / − / 0 | Zoom / ajustar à largura |
| Setas / Espaço / Esc | Navegar e sair da apresentação |

## Estrutura

```
index.html, styles.css       interface (guarda de login, visual do NEXO)
js/app.js                    inicialização, integração com o NEXO, offline
js/nexo.js                   ponte com o NEXO (postMessage) e tema claro/escuro
js/db.js                     armazenamento local (IndexedDB) e backup
js/library.js                biblioteca, pastas, capas, modelos, busca global
js/editor.js                 editor: ferramentas, seleção, páginas, áudio, apresentação
js/render.js                 desenho de modelos, tintas, fitas, PDF, texto
js/shapes.js                 reconhecimento de formas e do rabisco para apagar
js/study.js                  flashcards e repetição espaçada
js/ai.js                     assistente de IA (Claude via SDK oficial da Anthropic)
js/providers.js              provedores alternativos: Google Gemini e Ollama
js/browserai.js              IA dentro do navegador (WebLLM)
js/stickers.js               figurinhas
js/audio.js                  gravação e reprodução de áudio
js/pdftools.js               importar/exportar PDF
scripts/vendor.mjs           copia/empacota as bibliotecas para vendor/ (roda no npm install)
vendor/                      pdf.js, pdf-lib, perfect-freehand, SDK da Anthropic, WebLLM (gerado e commitado)
sw.js, manifest.webmanifest  funcionamento offline (escopo /acervo/)
```
