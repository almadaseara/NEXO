# NVIDIA Nemotron — integração experimental (NEXO Revisão)

O módulo `robot/nvidia_nemotron.py` é **somente para backend / GitHub Actions**.
Não importar no `index.html` ou `revisao.html`: GitHub Pages é público e qualquer chave colocada em JavaScript seria exposta.

## Habilitar
1. Obtenha uma chave de API no NVIDIA Build: https://build.nvidia.com/nvidia/nemotron-3-ultra-550b-a55b/build
2. GitHub → repositório NEXO → Settings → Secrets and variables → Actions → New repository secret.
3. Nome do secret: `NVIDIA_API_KEY`. Cole o valor **apenas no GitHub**, não no chat.
4. Com o código aprovado e incorporado, execute manualmente o workflow **NEXO Nemotron Test** em Actions.

## Localmente
```bash
python robot/nvidia_nemotron.py --dry-run
# Com NVIDIA_API_KEY já definido no ambiente:
python robot/nvidia_nemotron.py --text "Avalie possíveis inconsistências nesta classificação: ..."
```

A resposta do Nemotron é **parecer auxiliar**, não prova de correção nem validação de gabarito.
A publicação de questões exige prova oficial, tipo de caderno identificado, gabarito definitivo correspondente e auditoria. O módulo não envia PDFs automaticamente, não grava conteúdo em banco de dados e não altera o site publicado.

O endpoint utilizado é `https://integrate.api.nvidia.com/v1/chat/completions`, modelo `nvidia/nemotron-3-ultra-550b-a55b`. Acesso e limites dependem da conta NVIDIA.
