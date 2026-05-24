import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";

export async function GET() {
  const data = await readDb("categorii");
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const categorii = await readDb("categorii");
  categorii.push(body);
  await writeDb("categorii", categorii);
  return NextResponse.json(body, { status: 201 });
}
