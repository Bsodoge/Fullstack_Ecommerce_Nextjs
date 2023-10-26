import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const discountCode : string = await request.json();
    const { rows } = await sql`SELECT * FROm discounts WHERE code = ${discountCode.toUpperCase()};`;
    console.log(rows);
    return NextResponse.json(rows[0].discount_value, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}