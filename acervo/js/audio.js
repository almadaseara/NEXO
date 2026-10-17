// Gravação de áudio sincronizada com a escrita.
import { saveAsset, uid } from './db.js';
import { getAssetBlob } from './db.js';

let recorder = null; // { id, startedAt, media, chunks, stream }

export function isRecording() { return !!recorder; }
export function currentRecording() { return recorder; }

// Milissegundos desde o início da gravação atual (ou null).
export function recordingTime() {
  return recorder ? Date.now() - recorder.startedAt : null;
}

export async function startRecording() {
  if (recorder) return recorder;
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
  const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find((m) => MediaRecorder.isTypeSupported?.(m)) || '';
  const media = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
  const chunks = [];
  media.ondataavailable = (e) => { if (e.data?.size) chunks.push(e.data); };
  media.start(1000);
  recorder = { id: uid(), startedAt: Date.now(), media, chunks, stream };
  return recorder;
}

// Para e salva. Devolve { id, assetId, startedAt, duration } ou null.
export async function stopRecording() {
  if (!recorder) return null;
  const r = recorder;
  recorder = null;
  await new Promise((res) => { r.media.onstop = res; r.media.stop(); });
  r.stream.getTracks().forEach((t) => t.stop());
  const blob = new Blob(r.chunks, { type: r.media.mimeType || 'audio/webm' });
  if (!blob.size) return null;
  const assetId = await saveAsset(blob);
  return { id: r.id, assetId, startedAt: r.startedAt, duration: Date.now() - r.startedAt };
}

// ---------- Reprodução ----------
export async function createPlayer(rec) {
  const blob = await getAssetBlob(rec.assetId);
  if (!blob) return null;
  const audio = new Audio(URL.createObjectURL(blob));
  audio.preload = 'auto';
  return audio;
}

export function formatTime(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
