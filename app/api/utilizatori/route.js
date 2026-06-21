import { NextResponse } from "next/server";
import { readDb, writeDb } from "../../lib/db";
import { readSanitizedBody } from "../../lib/security";

export async function GET() {
  const data = await readDb("utilizatori");
  // Never expose stored passwords to the browser.
  const safe = (data || []).map(({ parola, ...rest }) => rest);
  return NextResponse.json(safe);
}

export async function POST(req) {
  const body = await readSanitizedBody(req);
  const list = await readDb("utilizatori");
  const nou = { ...body, id: body.id || `u${Date.now()}` };
  list.push(nou);
  await writeDb("utilizatori", list);
  return NextResponse.json(nou, { status: 201 });
}
