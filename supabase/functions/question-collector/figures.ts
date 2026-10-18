// NEXO — figuras embutidas no caderno oficial viram PNG (question-collector v28).
// Usa as imagens que o próprio PDF traz (pixels originais, sem renderizar a página). Figuras fatiadas em
// faixas (nome "img_a+img_b+...") são empilhadas numa imagem só. Gráficos desenhados em vetor não são
// imagens: esses ficam para a IA ou para o recorte manual na tela de revisão.
import { encode } from "npm:fast-png@6.3.0";

interface Pixels { width: number; height: number; rgba: Uint8Array }

function toRgba(img: any): Pixels | null {
  if (!img?.data || !img.width || !img.height) return null;
  const { width, height, kind, data } = img;
  const rgba = new Uint8Array(width * height * 4);
  if (kind === 3) rgba.set(data.subarray(0, rgba.length));
  else if (kind === 2) for (let i = 0, j = 0; i < width * height; i++, j += 3) { rgba[i * 4] = data[j]; rgba[i * 4 + 1] = data[j + 1]; rgba[i * 4 + 2] = data[j + 2]; rgba[i * 4 + 3] = 255; }
  else if (kind === 1) {
    const rowBytes = Math.ceil(width / 8);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const v = (data[y * rowBytes + (x >> 3)] >> (7 - (x & 7))) & 1 ? 255 : 0, i = (y * width + x) * 4;
      rgba[i] = rgba[i + 1] = rgba[i + 2] = v; rgba[i + 3] = 255;
    }
  } else return null;
  return { width, height, rgba };
}

async function imageObject(page: any, name: string): Promise<any> {
  const store = name.startsWith("g_") ? page.commonObjs : page.objs;
  return await new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), 5000);
    try { store.get(name, (v: any) => { clearTimeout(t); resolve(v); }); } catch { clearTimeout(t); resolve(null); }
  });
}

// Empilha as faixas de cima para baixo; larguras diferentes ficam alinhadas à esquerda com fundo branco.
export async function figurePng(doc: any, pageNumber: number, names: string): Promise<Uint8Array | null> {
  const page = await doc.getPage(pageNumber);
  await page.getOperatorList(); // garante que as imagens da página foram decodificadas
  const parts: Pixels[] = [];
  for (const n of names.split("+").filter(Boolean)) {
    const px = toRgba(await imageObject(page, n));
    if (px) parts.push(px);
  }
  if (!parts.length) return null;
  const width = Math.max(...parts.map((p) => p.width));
  const height = parts.reduce((s, p) => s + p.height, 0);
  if (width * height > 25_000_000) return null;
  const out = new Uint8Array(width * height * 4).fill(255);
  let y0 = 0;
  for (const p of parts) {
    for (let y = 0; y < p.height; y++) out.set(p.rgba.subarray(y * p.width * 4, (y + 1) * p.width * 4), ((y0 + y) * width) * 4);
    y0 += p.height;
  }
  return encode({ width, height, data: out, channels: 4, depth: 8 } as any);
}
