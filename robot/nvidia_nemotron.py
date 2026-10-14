#!/usr/bin/env python3
"""NEXO NVIDIA Nemotron adapter. Server-side only; never expose API keys to GitHub Pages."""
import argparse
import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions"
MODEL = "nvidia/nemotron-3-ultra-550b-a55b"
SYSTEM_PROMPT = (
    "Você é um auditor auxiliar do NEXO Revisão, especializado em concursos brasileiros. "
    "Analise o texto recebido, aponte possíveis inconsistências e separe fatos confirmados "
    "de hipóteses. Nunca invente gabarito, enunciados ou citações. "
    "Nunca declare uma questão validada: somente o confronto documental com a prova "
    "e o gabarito definitivo oficial pode autorizá-la. Responda em português."
)

def analyze(text, *, api_key=None, timeout=90):
    """Return model text; this is a suggestion, NOT an official answer-key validation."""
    if not isinstance(text, str) or not text.strip():
        raise ValueError("Informe um texto não vazio para análise.")
    key = api_key or os.environ.get("NVIDIA_API_KEY")
    if not key:
        raise RuntimeError("Configure NVIDIA_API_KEY como segredo do ambiente; nunca publique a chave.")
    body = json.dumps({
        "model": os.environ.get("NVIDIA_MODEL", MODEL),
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": text},
        ],
        "max_tokens": 2048,
        "temperature": 0.2,
        "stream": False,
    }, ensure_ascii=False).encode("utf-8")
    req = Request(ENDPOINT, data=body, headers={
        "Authorization": "Bearer " + key,
        "Content-Type": "application/json",
        "Accept": "application/json",
    }, method="POST")
    try:
        with urlopen(req, timeout=timeout) as res:
            payload = json.loads(res.read(2_000_000).decode("utf-8"))
    except HTTPError as err:
        raise RuntimeError(f"NVIDIA API retornou HTTP {err.code}; confira chave, acesso e limites.") from err
    except (URLError, TimeoutError) as err:
        raise RuntimeError("Não foi possível acessar a API NVIDIA.") from err
    try:
        answer = payload["choices"][0]["message"]["content"]
        if not isinstance(answer, str) or not answer.strip():
            raise ValueError("Resposta vazia")
        return answer
    except (KeyError, IndexError, TypeError, ValueError) as err:
        raise RuntimeError("Resposta da NVIDIA em formato inesperado.") from err

def main():
    parser = argparse.ArgumentParser(description="Teste isolado do Nemotron, sem publicar questões.")
    parser.add_argument("--text", help="Texto a ser analisado")
    parser.add_argument("--dry-run", action="store_true", help="Verifica a configuração sem chamada à API")
    args = parser.parse_args()
    if args.dry_run:
        print(json.dumps({
            "model": os.getenv("NVIDIA_MODEL", MODEL),
            "endpoint": ENDPOINT,
            "api_key_configured": bool(os.getenv("NVIDIA_API_KEY")),
            "publishes_questions": False
        }, ensure_ascii=False))
        return
    if not args.text:
        parser.error("Informe --text ou --dry-run")
    print(analyze(args.text))

if __name__ == "__main__":
    main()
