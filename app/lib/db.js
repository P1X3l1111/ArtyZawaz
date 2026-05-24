import { put, list } from "@vercel/blob";
import { readFileSync } from "fs";
import { join } from "path";

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function getLocalFallback(name) {
  try {
    const raw = readFileSync(join(process.cwd(), "data", `${name}.json`), "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function readDb(name) {
  try {
    const { blobs } = await list({ prefix: `db/${name}.json`, token: TOKEN });
    if (blobs.length === 0) {
      // First time: seed from local JSON and save to Blob
      const localData = getLocalFallback(name);
      if (localData.length > 0) await writeDb(name, localData);
      return localData;
    }
    const url = blobs[blobs.length - 1].url;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return getLocalFallback(name);
    return await res.json();
  } catch {
    return getLocalFallback(name);
  }
}

export async function writeDb(name, data) {
  const content = JSON.stringify(data, null, 2);
  await put(`db/${name}.json`, content, {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json",
    token: TOKEN,
  });
}
