import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";

export async function GET() {
  const data = await readDb("recenzii");
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = await readDb("recenzii");
  const item = { ...body, id: body.id || `r${Date.now()}` };
  data.push(item);
  await writeDb("recenzii", data);
  return NextResponse.json(item, { status: 201 });
}
