import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";

export async function GET() {
  const data = await readDb("hero");
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const data = await readDb("hero");
    const newItem = { ...body, id: body.id || Date.now().toString() };
    data.push(newItem);
    await writeDb("hero", data);
    return NextResponse.json(newItem);
  } catch (err) {
    console.error("Hero POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
