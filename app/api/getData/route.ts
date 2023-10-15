import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const products  = await sql`SELECT * FROM Products;`;
    const rows = products.rows;
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } 
}