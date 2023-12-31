import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const {shoppingCart, userID} = await request.json();
    let stringCart = JSON.stringify(shoppingCart)
    console.log(stringCart);
    const { rows } = await sql`INSERT INTO shoppingcarts (shoppingcart, user_id ) VALUES (${stringCart}, ${userID}) ON CONFLICT (user_id) DO UPDATE SET shoppingcart=${stringCart};`;
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
}