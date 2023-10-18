import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const itemID = await request.json();
    const { rows } = await sql`SELECT * FRoM products WHERE id = ${itemID};`;
    console.log(rows);
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}