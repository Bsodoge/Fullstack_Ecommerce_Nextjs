import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    cookieStore.delete("OutsiteJWT");
    try {
        return new Response(JSON.stringify({ message: "Authenticated", authenticated: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "An error has occured", authenticated: false, error }), { status: 401 });
    }
}