// Reconhecimento de formas (segurar no fim do traço) e gesto de rabiscar para apagar.

function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }

function pathLength(pts) {
  let l = 0;
  for (let i = 1; i < pts.length; i++) l += dist(pts[i - 1], pts[i]);
  return l;
}

function bbox(pts) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of pts) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

// Douglas–Peucker: reduz o traço aos "cantos".
function simplify(pts, eps) {
  if (pts.length < 3) return pts.slice();
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let maxD = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = perpDist(pts[i], a, b);
    if (d > maxD) { maxD = d; idx = i; }
  }
  if (maxD > eps) {
    const l = simplify(pts.slice(0, idx + 1), eps);
    const r = simplify(pts.slice(idx), eps);
    return l.slice(0, -1).concat(r);
  }
  return [a, b];
}

function perpDist(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const l = Math.hypot(dx, dy);
  if (!l) return dist(p, a);
  return Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / l;
}

function sampleSegment(a, b, step, pressure, out) {
  const n = Math.max(1, Math.ceil(dist(a, b) / step));
  for (let i = 0; i < n; i++) {
    const t = i / n;
    out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, pressure]);
  }
}

function polygonPoints(corners, pressure) {
  const out = [];
  for (let i = 0; i < corners.length; i++) sampleSegment(corners[i], corners[(i + 1) % corners.length], 5, pressure, out);
  out.push([corners[0][0], corners[0][1], pressure]);
  return out;
}

function ellipsePoints(cx, cy, rx, ry, pressure) {
  const n = Math.max(24, Math.round((rx + ry) / 3));
  const out = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    out.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a), pressure]);
  }
  return out;
}

// Devolve { points, shape } ou null se não reconhecer.
export function recognizeShape(points) {
  if (points.length < 8) return null;
  const pressure = points.reduce((s, p) => s + (p[2] ?? 0.5), 0) / points.length;
  const b = bbox(points);
  const diag = Math.hypot(b.w, b.h);
  if (diag < 14) return null;
  const len = pathLength(points);
  const closed = dist(points[0], points[points.length - 1]) < Math.max(18, len * 0.18);

  if (!closed) {
    const s = simplify(points, diag * 0.08);
    if (s.length === 2) return { shape: 'line', points: linePoints(s[0], s[1], pressure) };
    // seta: linha com "ponta" desenhada no fim
    if (s.length === 4 || s.length === 3) {
      const [p0, p1] = s;
      const shaft = dist(p0, p1);
      const tail = pathLength(s.slice(1));
      if (shaft > tail * 1.6) return { shape: 'arrow', points: arrowPoints(p0, p1, pressure) };
    }
    return null;
  }

  const ring = points.slice(0, -1);
  const corners = simplify(ring.concat([ring[0]]), diag * 0.09).slice(0, -1);
  if (corners.length === 3) return { shape: 'triangle', points: polygonPoints(corners, pressure) };
  if (corners.length === 4) {
    // quase alinhado aos eixos → retângulo perfeito
    const angles = corners.map((c, i) => {
      const n = corners[(i + 1) % 4];
      return Math.abs(Math.atan2(n[1] - c[1], n[0] - c[0]));
    });
    const aligned = angles.every((a) => Math.min(a % (Math.PI / 2), Math.PI / 2 - (a % (Math.PI / 2))) < 0.3);
    if (aligned) {
      const r = bbox(corners);
      return { shape: 'rect', points: polygonPoints([[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]], pressure) };
    }
    return { shape: 'quad', points: polygonPoints(corners, pressure) };
  }
  // elipse: raio razoavelmente constante em relação ao centro
  const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
  const rx = b.w / 2, ry = b.h / 2;
  let err = 0;
  for (const [x, y] of points) {
    const d = Math.hypot((x - cx) / (rx || 1), (y - cy) / (ry || 1));
    err += Math.abs(d - 1);
  }
  err /= points.length;
  if (err < 0.22) {
    const circle = Math.abs(rx - ry) / Math.max(rx, ry) < 0.15;
    const r = (rx + ry) / 2;
    return { shape: circle ? 'circle' : 'ellipse', points: ellipsePoints(cx, cy, circle ? r : rx, circle ? r : ry, pressure) };
  }
  if (corners.length >= 5 && corners.length <= 8) return { shape: 'polygon', points: polygonPoints(corners, pressure) };
  return null;
}

export function linePoints(a, b, pressure = 0.5) {
  const out = [];
  sampleSegment(a, b, 6, pressure, out);
  out.push([b[0], b[1], pressure]);
  return out;
}

function arrowPoints(a, b, pressure) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const head = Math.min(26, dist(a, b) * 0.3);
  const l = [b[0] - head * Math.cos(ang - 0.45), b[1] - head * Math.sin(ang - 0.45)];
  const r = [b[0] - head * Math.cos(ang + 0.45), b[1] - head * Math.sin(ang + 0.45)];
  const out = [];
  sampleSegment(a, b, 6, pressure, out);
  sampleSegment(b, l, 4, pressure, out);
  sampleSegment(l, b, 4, pressure, out);
  sampleSegment(b, r, 4, pressure, out);
  out.push([r[0], r[1], pressure]);
  return out;
}

export const CLOSED_SHAPES = new Set(['triangle', 'rect', 'quad', 'circle', 'ellipse', 'polygon']);

// ---------- Rabiscar para apagar ----------
function segIntersect(a, b, c, d) {
  const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
  return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b);
}

// É um rabisco de vai-e-vem? (muitas inversões de direção num espaço pequeno)
export function isScribble(points) {
  if (points.length < 16) return false;
  const b = bbox(points);
  const diag = Math.hypot(b.w, b.h);
  if (diag < 10) return false;
  const len = pathLength(points);
  if (len < diag * 2.6) return false;
  const horizontal = b.w >= b.h;
  let reversals = 0, lastSign = 0;
  const step = Math.max(2, Math.floor(points.length / 60));
  for (let i = step; i < points.length; i += step) {
    const d = horizontal ? points[i][0] - points[i - step][0] : points[i][1] - points[i - step][1];
    if (Math.abs(d) < 0.8) continue;
    const s = Math.sign(d);
    if (lastSign && s !== lastSign) reversals++;
    lastSign = s;
  }
  return reversals >= 4;
}

// Traços cruzados pelo rabisco.
export function strokesHitByScribble(scribble, strokes) {
  const b = bbox(scribble);
  const hits = new Set();
  const pts = scribble.length > 120 ? scribble.filter((_, i) => i % 2 === 0) : scribble;
  for (const s of strokes) {
    const sb = bbox(s.points);
    if (sb.x > b.x + b.w || sb.x + sb.w < b.x || sb.y > b.y + b.h || sb.y + sb.h < b.y) continue;
    let hit = false;
    const sp = s.points;
    if (sp.length === 1) {
      hit = sp[0][0] >= b.x && sp[0][0] <= b.x + b.w && sp[0][1] >= b.y && sp[0][1] <= b.y + b.h;
    }
    for (let i = 1; i < sp.length && !hit; i++) {
      for (let j = 1; j < pts.length; j++) {
        if (segIntersect(sp[i - 1], sp[i], pts[j - 1], pts[j])) { hit = true; break; }
      }
    }
    if (hit) hits.add(s.id);
  }
  return hits;
}
