import { sql } from "@vercel/postgres";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const bcrypt = require('bcrypt');
const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
    const registerInfo = await request.json();
    console.log(registerInfo)
    if (!registerInfo.password.trim().length || !registerInfo.username.trim().length || registerInfo.password !== registerInfo.reenterpassword) {
        return new Response(JSON.stringify({ message: 'Bad data', authenticated: false }), { status: 401 });
    }
    try {
        const { rows }  = await sql`SELECT * FROM users WHERE username = ${registerInfo.username.toLowerCase()}`;
        if(rows) return new Response(JSON.stringify({ message: 'User already exists', authenticated: false }), { status: 401 });
        const hash = await bcrypt.hash(registerInfo.password, 13);
        const createUser = await sql`INSERT INTO users (username, password) VALUES (${registerInfo.username.toLowerCase()}, ${hash})`;
        const secret = process.env.JWT_SECRET || '';
        const token = sign(
            {
                username: registerInfo.username
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
    } catch (error) {
        return new Response(JSON.stringify({ message: error, authenticated: true }), { status: 500 });
    }
}