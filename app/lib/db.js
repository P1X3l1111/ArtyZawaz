import { put, list } from "@vercel/blob";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function localPath(name) {
  return join(process.cwd(), "data", `${name}.json`);
}

function getLocalFallback(name) {
  try {
    return JSON.parse(readFileSync(localPath(name), "utf-8"));
  } catch {
    return [];
  }
}

function writeLocal(name, data) {
  try {
    writeFileSync(localPath(name), JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // production / read-only filesystem — ignore
  }
}

export async function readDb(name) {
  // In development, local file is always up-to-date (writeDb keeps it fresh)
  if (process.env.NODE_ENV === "development") {
    return getLocalFallback(name);
  }
  if (!TOKEN) return getLocalFallback(name);
  try {
    const { blobs } = await list({ prefix: `db/${name}.json`, token: TOKEN });
    if (blobs.length === 0) {
      const localData = getLocalFallback(name);
      const hasData = Array.isArray(localData) ? localData.length > 0 : Object.keys(localData).length > 0;
      if (hasData) await writeDb(name, localData);
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
  // Always persist locally so dev restarts don't lose data
  writeLocal(name, data);

  if (!TOKEN) return;
  await put(`db/${name}.json`, JSON.stringify(data, null, 2), {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json",
    token: TOKEN,
  });
}
