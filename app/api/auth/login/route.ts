import { sql } from "@vercel/postgres";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const bcrypt = require('bcrypt');
const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
    const loginInfo = await request.json();
    console.log(loginInfo);
    if (!loginInfo.password.trim().length || !loginInfo.username.trim().length) {
        return new Response(JSON.stringify({ message: 'Bad data', authenticated: false }), { status: 401 });
    }
    const { rows } = await sql`SELECT * FROM users WHERE username = ${loginInfo.username}`;
    if(!rows.length){
        return new Response(JSON.stringify({ message: 'User does not exist', authenticated: false }), { status: 401 });
    }
    const match = await bcrypt.compare(loginInfo.password, rows[0].password);
    if (!match) {
        return new Response(JSON.stringify({ message: 'Not valid', authenticated: false }), { status: 401 });
    }

    const secret = process.env.JWT_SECRET || '';
    const token = sign(
        {
            username: loginInfo.username
        },
        secret, {
        expiresIn: MAX_AGE
    })
    const serialized = serialize(
        "OutsiteJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: MAX_AGE,
        path: '/'
    }
    )
    return new Response(JSON.stringify({ message: 'Authenticated', authenticated: true }), { status: 200, headers: { "Set-Cookie": serialized } });
}