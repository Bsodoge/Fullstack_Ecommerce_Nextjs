import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get("OutsiteJWT");
    if (!token) {
        return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 });
    }
    try {
        const secret = process.env.JWT_SECRET || '';
        verify(token.value, secret);
        return new Response(JSON.stringify({ message: "Authenticated" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "An error has occured", error }), { status: 401 });
    }
}