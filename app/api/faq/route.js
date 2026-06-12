import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";

export async function GET() {
  const data = await readDb("faq");
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = await readDb("faq");
  const item = { ...body, id: body.id || `f${Date.now()}` };
  data.push(item);
  await writeDb("faq", data);
  return NextResponse.json(item, { status: 201 });
}
