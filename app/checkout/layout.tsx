'use client'

import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const route = useRouter();
    useEffect(() => {
        (async () => {
            const response = await fetch("/api/auth/checkToken");
            console.log(response);
            if(response.status === 200) setIsLoading(false);
            else route.push("/login");
        })();
    },[])
    return (
        isLoading ? <></> :
        <main className={inter.className}>
            {children}
        </main>
    )
}
