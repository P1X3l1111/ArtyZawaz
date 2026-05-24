import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../../lib/db";

export async function PUT(req, { params }) {
  const { slug } = await params;
  const body = await req.json();
  const categorii = await readDb("categorii");
  const idx = categorii.findIndex(c => c.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  categorii[idx] = { ...categorii[idx], ...body, slug };
  await writeDb("categorii", categorii);
  return NextResponse.json(categorii[idx]);
}

export async function DELETE(req, { params }) {
  const { slug } = await params;
  const categorii = await readDb("categorii");
  const filtered = categorii.filter(c => c.slug !== slug);
  await writeDb("categorii", filtered);
  return NextResponse.json({ ok: true });
}
