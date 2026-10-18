// Regras puras para os eventos da API oficial do Cebraspe (apis.cebraspe.org.br).
// Sem rede e sem banco: testadas por tools/testar-pipeline.mjs com eventos reais em tools/fixtures.

export interface CebraspeFile { descricaoArquivo?: string; nomeArquivo?: string; isGuid?: boolean }
export interface CebraspePair { key: string; label: string; exam: string; answer: string; exam_desc: string; key_desc: string }

const clean = (s: unknown) => String(s ?? "").replace(/\s+/g, " ").trim();

export function slug(s: string) {
  return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function cebraspeFileUrl(identifier: string, f: CebraspeFile) {
  if (f?.isGuid) return "https://cdn.cebraspe.org.br/" + f.nomeArquivo;
  return "https://cdn.cebraspe.org.br/concursos/" + identifier + "/arquivos/" + encodeURI(String(f.nomeArquivo));
}

// Concursos de carreiras policiais e afins (escopo do NEXO). Provas de cargos administrativos ficam de fora.
const POLICE_URL = /^(PC|PM|PF|PRF|DPF|PP|PPF|CBM|DEPEN|SEAP|SEJUS|SEJUSP|PJC|POLC|PCDF|PMDF|PCERJ|PEFOCE|SAP|SUSEPE|PENAL)(_|$)/i;
const POLICE_NAME = /pol[ií]cia|policial|penal|penitenci[aá]ri|bombeiro|perito|papiloscop|delegad|escriv[aã]o|investigador|guarda municipal|inspetor de pol/i;
const OUT_OF_SCOPE = /(^|_)ADM(_|$)|ADMINISTRATIV|TPAG|SERVIDOR(ES)? T[EÉ]CNICO/i;

export function isPoliceEvent(ev: { eventoURL?: string; eventoNomeCompleto?: string; eventoNomeAbreviado?: string }) {
  const url = String(ev?.eventoURL || "");
  const name = clean(ev?.eventoNomeCompleto) + " " + clean(ev?.eventoNomeAbreviado);
  if (OUT_OF_SCOPE.test(url) || OUT_OF_SCOPE.test(name)) return false;
  return POLICE_URL.test(url) || POLICE_NAME.test(name);
}

function normDesc(s: string) {
  return clean(s).toUpperCase().replace(/[–—]/g, "-").replace(/\s*-\s*/g, " - ").replace(/\s+/g, " ").trim();
}

// "PROVA OBJETIVA - CARGO 2: AGENTE" -> "CARGO 2: AGENTE"; "1.ª PROVA OBJETIVA - CURSO" -> "1 - CURSO"
export function examSuffix(desc: string): string | null {
  const d = normDesc(desc);
  if (/GABARITO|PADR[AÃ]O DE RESPOSTA|DISCURSIV|REDA[CÇ][AÃ]O|ORAL|PR[AÁ]TICA/.test(d)) return null;
  const m = d.match(/^(?:(\d+)\.?\s*[ªº]?\s*)?PROVA OBJETIVA\s*(?:-\s*)?(.*)$/);
  if (!m) return null;
  return [m[1] || "", m[2] || ""].filter(Boolean).join(" - ").trim();
}

export function answerSuffix(desc: string): string | null {
  const d = normDesc(desc);
  if (/PRELIMINAR/.test(d) || !/GABARITO/.test(d) || !/DEFINITIVO/.test(d)) return null;
  const m = d.match(/^(?:(\d+)\.?\s*[ªº]?\s*)?GABARITO (?:OFICIAL )?DEFINITIVO(?:\s*-\s*|\s+)?(?:DA\s+)?(?:(\d+)\.?\s*[ªº]?\s*)?(?:PROVA OBJETIVA)?\s*(?:-\s*)?(.*)$/);
  if (!m) return null;
  return [m[1] || m[2] || "", m[3] || ""].filter(Boolean).join(" - ").trim();
}

function baseName(f: CebraspeFile) {
  return String(f.nomeArquivo || "").toUpperCase().replace(/\.PDF$/i, "");
}

// Pareia cada prova objetiva com o gabarito DEFINITIVO correspondente.
// 1º pelo texto da descrição; 2º pelo nome do arquivo (GAB_DEFINITIVO_<prova>.PDF). Sem par seguro, nada.
export function pairCebraspeFiles(files: CebraspeFile[], identifier: string): CebraspePair[] {
  const pdfs = (files || []).filter((f) => /\.pdf$/i.test(String(f.nomeArquivo || "")));
  const exams = pdfs.map((f) => ({ f, s: examSuffix(String(f.descricaoArquivo || "")) })).filter((x) => x.s !== null);
  const keys = pdfs.map((f) => ({ f, s: answerSuffix(String(f.descricaoArquivo || "")) })).filter((x) => x.s !== null);
  const used = new Set<CebraspeFile>();
  const pairs: CebraspePair[] = [];
  for (const e of exams) {
    let k = keys.find((x) => !used.has(x.f) && x.s === e.s);
    if (!k) {
      const eb = baseName(e.f);
      k = keys.find((x) => !used.has(x.f) && baseName(x.f).replace(/^GAB_DEFINITIVO_/, "") === eb);
    }
    if (!k) continue;
    used.add(k.f);
    const label = e.s || "Prova objetiva";
    pairs.push({
      key: slug(label || baseName(e.f)) || slug(baseName(e.f)),
      label,
      exam: cebraspeFileUrl(identifier, e.f),
      answer: cebraspeFileUrl(identifier, k.f),
      exam_desc: clean(e.f.descricaoArquivo),
      key_desc: clean(k.f.descricaoArquivo),
    });
  }
  return pairs;
}
