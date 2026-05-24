import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";

export async function GET() {
  const data = await readDb("blog");
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = await readDb("blog");
  const slug = body.slug || body.titlu
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const newItem = { ...body, slug };
  const filtered = data.filter(i => i.slug !== slug);
  filtered.push(newItem);
  await writeDb("blog", filtered);
  return NextResponse.json(newItem);
}
