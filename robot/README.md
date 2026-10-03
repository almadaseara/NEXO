# NEXO — Robô de Questões

Este diretório contém o coletor automático de provas/gabaritos.

## Segurança / administração
O controle operacional NÃO é exposto no site público do GitHub Pages.
O painel administrativo é o próprio workflow **NEXO Question Robot** em GitHub Actions.

Somente usuários com permissão de escrita no repositório conseguem executar manualmente o workflow.
Assim, iniciar, pausar e retomar o robô ficam protegidos pela autenticação e autorização do GitHub.

## Ações
- collect — busca novos documentos
- pause — pausa as coletas agendadas
- resume — retoma as coletas
- status — mostra o estado atual

## Pipeline atual
Internet → descoberta → candidato prova/gabarito → pareamento preliminar → fila de validação.

A publicação de questões no NEXO deve ocorrer apenas depois das próximas etapas:
extração estruturada → identificação de caderno/tipo → validação do gabarito → classificação por disciplina/assunto → fiscal → publicação.

## Fontes iniciais
- Instituto AOCP
- PCI Concursos

O arquivo `robot/config.json` permite ampliar carreiras, termos e fontes.
