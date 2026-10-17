// Armazenamento local (IndexedDB). Tudo fica no aparelho.
const DB_NAME = 'nexo-acervo';
const DB_VERSION = 2;
// v2: baralhos e cartões de estudo, figurinhas (elementos salvos) e modelos personalizados.
const STORES = ['folders', 'notebooks', 'pages', 'assets', 'decks', 'cards', 'elements', 'templates'];

let dbPromise = null;

function open() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      for (const name of STORES) {
        if (!db.objectStoreNames.contains(name)) {
          const store = db.createObjectStore(name, { keyPath: 'id' });
          if (name === 'pages') store.createIndex('notebookId', 'notebookId');
          if (name === 'notebooks') store.createIndex('folderId', 'folderId');
          if (name === 'cards') store.createIndex('deckId', 'deckId');
        }
      }
    };
    req.onsuccess = () => {
      // Outra aba abriu uma versão mais nova: fecha esta conexão.
      req.result.onversionchange = () => req.result.close();
      resolve(req.result);
    };
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function wrap(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx(store, mode = 'readonly') {
  const db = await open();
  return db.transaction(store, mode).objectStore(store);
}

export const db = {
  async get(store, id) {
    return wrap((await tx(store)).get(id));
  },
  async all(store) {
    return wrap((await tx(store)).getAll());
  },
  async byIndex(store, index, value) {
    return wrap((await tx(store)).index(index).getAll(value));
  },
  async put(store, value) {
    return wrap((await tx(store, 'readwrite')).put(value));
  },
  async putMany(store, values) {
    const database = await open();
    return new Promise((resolve, reject) => {
      const t = database.transaction(store, 'readwrite');
      const s = t.objectStore(store);
      for (const v of values) s.put(v);
      t.oncomplete = () => resolve();
      t.onerror = () => reject(t.error);
    });
  },
  async delete(store, id) {
    return wrap((await tx(store, 'readwrite')).delete(id));
  },
  async clear(store) {
    return wrap((await tx(store, 'readwrite')).clear());
  },
};

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

// ---------- Operações de alto nível ----------

export async function saveAsset(blob) {
  const id = uid();
  await db.put('assets', { id, blob, type: blob.type });
  return id;
}

export async function getAssetBlob(id) {
  const a = await db.get('assets', id);
  return a ? a.blob : null;
}

export async function getNotebookPages(notebook) {
  const pages = await db.byIndex('pages', 'notebookId', notebook.id);
  const map = new Map(pages.map((p) => [p.id, p]));
  return notebook.pageIds.map((id) => map.get(id)).filter(Boolean);
}

// Todos os arquivos ainda referenciados por algum dado.
async function usedAssets() {
  const used = new Set();
  for (const p of await db.all('pages')) {
    if (p.pdf) used.add(p.pdf.assetId);
    if (p.bgAsset) used.add(p.bgAsset);
    for (const img of p.images || []) used.add(img.assetId);
  }
  for (const n of await db.all('notebooks')) for (const r of n.recordings || []) used.add(r.assetId);
  for (const t of await db.all('templates')) used.add(t.assetId);
  for (const e of await db.all('elements')) for (const img of e.items?.images || []) used.add(img.assetId);
  for (const c of await db.all('cards')) for (const side of [c.front, c.back]) if (side?.assetId) used.add(side.assetId);
  return used;
}

export async function deleteNotebook(notebook) {
  const pages = await db.byIndex('pages', 'notebookId', notebook.id);
  const assetIds = new Set();
  for (const p of pages) {
    if (p.pdf) assetIds.add(p.pdf.assetId);
    if (p.bgAsset) assetIds.add(p.bgAsset);
    for (const img of p.images || []) assetIds.add(img.assetId);
    await db.delete('pages', p.id);
  }
  for (const r of notebook.recordings || []) assetIds.add(r.assetId);
  await db.delete('notebooks', notebook.id);
  await collectGarbage(assetIds);
}

// Remove assets que não são mais usados por nenhuma página.
export async function collectGarbage(candidates) {
  if (!candidates || !candidates.size) return;
  const used = await usedAssets();
  for (const id of candidates) if (!used.has(id)) await db.delete('assets', id);
}

// ---------- Backup ----------

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

export async function exportBackup() {
  const data = { app: 'acervo-digital-pessoal', version: 1, exportedAt: new Date().toISOString() };
  for (const s of STORES) if (s !== 'assets') data[s] = await db.all(s);
  const assets = await db.all('assets');
  data.assets = [];
  for (const a of assets) data.assets.push({ id: a.id, type: a.type, data: await blobToDataURL(a.blob) });
  return new Blob([JSON.stringify(data)], { type: 'application/json' });
}

export async function importBackup(file, { replace = false } = {}) {
  const data = JSON.parse(await file.text());
  // Aceita também backups feitos no app original (antes da integração ao NEXO).
  if (data.app !== 'acervo-digital-pessoal' && data.app !== 'nanquim') throw new Error('Este arquivo não é um backup do Acervo Digital Pessoal.');
  if (replace) for (const s of STORES) await db.clear(s);
  for (const s of STORES) if (s !== 'assets' && data[s]) await db.putMany(s, data[s]);
  const assets = [];
  for (const a of data.assets || []) {
    const blob = await (await fetch(a.data)).blob();
    assets.push({ id: a.id, type: a.type, blob });
  }
  await db.putMany('assets', assets);
}
