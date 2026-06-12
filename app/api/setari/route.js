import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";

export async function GET() {
  const data = await readDb("setari");
  return NextResponse.json(data);
}

export async function PUT(req) {
  const body = await req.json();
  await writeDb("setari", body);
  return NextResponse.json(body);
}
