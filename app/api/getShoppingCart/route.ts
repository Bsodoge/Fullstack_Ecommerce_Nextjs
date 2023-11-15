import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const userID = await request.json();
    const { rows } = await sql`SELECT * FROM shoppingcarts WHERE user_id = ${userID};`;
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}