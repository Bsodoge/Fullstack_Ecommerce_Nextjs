import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const {shoppingCart, userID} = await request.json();
    const stringCart = shoppingCart.map((cartItem : object) => JSON.stringify(cartItem)).toString();
    const { rows } = await sql`INSERT INTO shoppingcarts (shoppingcart, user_id ) VALUES (${stringCart}, ${userID});`;
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}