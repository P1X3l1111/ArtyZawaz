import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../../lib/db";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const data = await readDb("recenzii");
  const idx = data.findIndex(i => i.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data[idx] = { ...data[idx], ...body, id };
  await writeDb("recenzii", data);
  return NextResponse.json(data[idx]);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const data = await readDb("recenzii");
  await writeDb("recenzii", data.filter(i => i.id !== id));
  return NextResponse.json({ ok: true });
}
