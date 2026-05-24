import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../../lib/db";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const list = await readDb("utilizatori");
  const idx = list.findIndex(u => u.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  list[idx] = { ...list[idx], ...body, id };
  await writeDb("utilizatori", list);
  return NextResponse.json(list[idx]);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const list = await readDb("utilizatori");
  const filtered = list.filter(u => u.id !== id);
  await writeDb("utilizatori", filtered);
  return NextResponse.json({ ok: true });
}
