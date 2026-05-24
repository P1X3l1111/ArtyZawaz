import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../../lib/db";

export async function GET(req, { params }) {
  const { slug } = await params;
  const data = await readDb("blog");
  const item = data.find(i => i.slug === slug);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req, { params }) {
  const { slug } = await params;
  const body = await req.json();
  const data = await readDb("blog");
  const idx = data.findIndex(i => i.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data[idx] = { ...data[idx], ...body, slug };
  await writeDb("blog", data);
  return NextResponse.json(data[idx]);
}

export async function DELETE(req, { params }) {
  const { slug } = await params;
  const data = await readDb("blog");
  const filtered = data.filter(i => i.slug !== slug);
  await writeDb("blog", filtered);
  return NextResponse.json({ ok: true });
}
