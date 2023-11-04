import { sql } from "@vercel/postgres";
const bcrypt = require('bcrypt');

export async function POST(request: Request) {
    const loginInfo = await request.json();
    const { rows } = await sql`SELECT * FROM users WHERE username = ${loginInfo.username}`;
    const match = await bcrypt.compare(loginInfo.password, rows[0].password);
    if(match) {
        return new Response(match, {status: 200});
    }
    return new Response(match, {status: 401});
}