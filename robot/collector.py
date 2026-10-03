#!/usr/bin/env python3
import argparse, hashlib, json, os, re, sys, time
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "robot" / "config.json"
STATE_PATH = ROOT / "data" / "robot-state.json"
STATUS_PATH = ROOT / "data" / "robot-status.json"
CANDIDATES_PATH = ROOT / "data" / "question-candidates.json"

UA = "Mozilla/5.0 (compatible; NEXO-QuestionRobot/1.0; +https://github.com/almadaseara/NEXO)"

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links=[]
        self._href=None
        self._text=[]
    def handle_starttag(self, tag, attrs):
        if tag.lower()=="a":
            self._href=dict(attrs).get("href")
            self._text=[]
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag.lower()=="a" and self._href is not None:
            self.links.append((self._href, " ".join(self._text).strip()))
            self._href=None
            self._text=[]

def now():
    return datetime.now(timezone.utc).isoformat()

def load_json(path, default):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default

def save_json(path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")

def fetch(url, timeout=20):
    req=Request(url, headers={"User-Agent":UA,"Accept":"text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8"})
    with urlopen(req, timeout=timeout) as r:
        ctype=(r.headers.get("Content-Type") or "").lower()
        data=r.read(4_000_000)
        return ctype, data, r.geturl()

def normalize_text(s):
    return re.sub(r"\s+"," ",unescape(s or "")).strip()

def classify_doc(url, text, cfg):
    hay=(url+" "+text).lower()
    for kind, kws in cfg["document_keywords"].items():
        if any(k.lower() in hay for k in kws):
            return kind
    if url.lower().endswith(".pdf"):
        return "pdf"
    return "page"

def score_candidate(url, text, cfg):
    hay=(url+" "+text).lower()
    score=0
    if "institutoaocp" in url.lower(): score += 35
    if "pciconcursos" in url.lower(): score += 18
    if url.lower().endswith(".pdf"): score += 20
    if any(k.lower() in hay for k in cfg["keywords"]): score += 20
    if "gabarito definitivo" in hay or "pós-recursos" in hay: score += 15
    if "caderno de questões" in hay or "prova objetiva" in hay: score += 10
    return min(score,100)

def allowed_domain(url):
    host=urlparse(url).netloc.lower()
    return host.endswith("institutoaocp.org.br") or host.endswith("pciconcursos.com.br") or host.endswith("arquivos.qconcursos.com")

def discover(cfg):
    queue=[(u,0) for u in cfg["seeds"]]
    seen=set()
    out=[]
    pages=0

    while queue and pages < cfg.get("max_pages_per_run",60):
        url,depth=queue.pop(0)
        if url in seen: continue
        seen.add(url)
        try:
            ctype,data,final=fetch(url)
            pages+=1
        except Exception as e:
            out.append({"url":url,"kind":"error","error":str(e),"discovered_at":now()})
            continue

        if "pdf" in ctype or final.lower().endswith(".pdf"):
            out.append({
                "id":hashlib.sha1(final.encode()).hexdigest()[:16],
                "url":final,"title":final.rsplit("/",1)[-1],"kind":"pdf",
                "score":score_candidate(final,"",cfg),"source_page":url,
                "discovered_at":now()
            })
            continue

        try:
            html=data.decode("utf-8","ignore")
        except Exception:
            continue
        parser=LinkParser()
        try: parser.feed(html)
        except Exception: pass

        page_text=normalize_text(re.sub(r"<[^>]+>"," ",html))
        page_relevant=any(k.lower() in page_text.lower() for k in cfg["keywords"])

        for href,text in parser.links:
            if not href or href.startswith(("#","javascript:","mailto:","tel:")): continue
            target=urljoin(final,href)
            if not target.startswith(("http://","https://")): continue
            label=normalize_text(text)
            kind=classify_doc(target,label,cfg)
            relevant=any(k.lower() in (target+" "+label).lower() for k in cfg["keywords"])
            doc_relevant=kind in ("prova","gabarito","pdf")

            if target.lower().endswith(".pdf") or kind in ("prova","gabarito"):
                score=score_candidate(target,label,cfg)
                if page_relevant or relevant or score>=45:
                    out.append({
                        "id":hashlib.sha1(target.encode()).hexdigest()[:16],
                        "url":target,"title":label or target.rsplit("/",1)[-1],
                        "kind":kind,"score":score,"source_page":final,
                        "discovered_at":now()
                    })
            elif depth < cfg.get("max_depth",1) and allowed_domain(target):
                if relevant or page_relevant:
                    queue.append((target,depth+1))

    uniq={}
    for x in out:
        if "id" in x:
            old=uniq.get(x["id"])
            if not old or x.get("score",0)>old.get("score",0):
                uniq[x["id"]]=x
    return list(uniq.values()), pages, [x for x in out if x.get("kind")=="error"]

def pair_candidates(items):
    provas=[x for x in items if x.get("kind")=="prova"]
    gabs=[x for x in items if x.get("kind")=="gabarito"]
    pairs=[]
    def tokens(x):
        s=(x.get("title","")+" "+x.get("url","")).lower()
        return set(re.findall(r"[a-zà-ú0-9]{4,}",s))
    for p in provas:
        pt=tokens(p)
        best=None
        bestscore=0
        for g in gabs:
            inter=len(pt & tokens(g))
            score=inter*5 + min(p.get("score",0),g.get("score",0))//10
            if score>bestscore:
                bestscore=score; best=g
        if best and bestscore>=20:
            pairs.append({
                "pair_id":hashlib.sha1((p["id"]+best["id"]).encode()).hexdigest()[:16],
                "prova_id":p["id"],"gabarito_id":best["id"],
                "confidence":min(bestscore,100),"status":"pending_validation"
            })
    return pairs

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--action",choices=["collect","pause","resume","status"],default="collect")
    args=ap.parse_args()
    cfg=load_json(CONFIG_PATH,{})
    state=load_json(STATE_PATH,{"enabled":cfg.get("enabled",True),"runs":0,"last_run":None})

    if args.action=="pause":
        state["enabled"]=False; state["updated_at"]=now(); save_json(STATE_PATH,state)
        print("Robô pausado."); return 0
    if args.action=="resume":
        state["enabled"]=True; state["updated_at"]=now(); save_json(STATE_PATH,state)
        print("Robô retomado."); return 0
    if args.action=="status":
        print(json.dumps(state,ensure_ascii=False,indent=2)); return 0
    if not state.get("enabled",True):
        print("Robô está pausado; coleta ignorada."); return 0

    existing=load_json(CANDIDATES_PATH,{"candidates":[],"pairs":[]})
    items,pages,errors=discover(cfg)
    merged={x["id"]:x for x in existing.get("candidates",[]) if "id" in x}
    for x in items:
        merged[x["id"]]=x
    all_items=sorted(merged.values(),key=lambda x:(-x.get("score",0),x.get("title","")))
    pairs=pair_candidates(all_items)
    save_json(CANDIDATES_PATH,{
        "updated_at":now(),
        "candidates":all_items,
        "pairs":pairs
    })

    state["runs"]=int(state.get("runs",0))+1
    state["last_run"]=now()
    state["last_pages_scanned"]=pages
    state["last_errors"]=len(errors)
    state["enabled"]=True
    save_json(STATE_PATH,state)

    status={
        "updated_at":now(),
        "enabled":True,
        "runs":state["runs"],
        "pages_scanned_last_run":pages,
        "candidates_total":len(all_items),
        "provas":sum(1 for x in all_items if x.get("kind")=="prova"),
        "gabaritos":sum(1 for x in all_items if x.get("kind")=="gabarito"),
        "pdfs_unclassified":sum(1 for x in all_items if x.get("kind")=="pdf"),
        "pairs_pending_validation":len(pairs),
        "errors_last_run":len(errors),
        "note":"Descoberta automática ativa. Publicação no banco de questões permanece bloqueada até validação prova↔gabarito e extração estruturada."
    }
    save_json(STATUS_PATH,status)
    print(json.dumps(status,ensure_ascii=False,indent=2))
    return 0

if __name__=="__main__":
    raise SystemExit(main())
