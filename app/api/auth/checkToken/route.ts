import { decode, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get("OutsiteJWT");
    if (!token) {
        return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 });
    }
    try {
        let cookieValue = decode(token.value) as any;
        const secret = process.env.JWT_SECRET || '';
        verify(token.value, secret);
        return new Response(JSON.stringify({ message: "Authenticated", authenticated: true, id: cookieValue.id }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "An error has occured", authenticated: false, error }), { status: 401 });
    }
}