import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";

export async function GET() {
  const data = await readDb("utilizatori");
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const list = await readDb("utilizatori");
  const nou = { ...body, id: body.id || `u${Date.now()}` };
  list.push(nou);
  await writeDb("utilizatori", list);
  return NextResponse.json(nou, { status: 201 });
}
