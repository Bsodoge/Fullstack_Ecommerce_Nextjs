'use client'

import Link from "next/link"
import styles from "./Header.module.css"
import Cart from "./Cart"
import { useShoppingCart } from "../context/shoppingCartContext"
import { useEffect } from "react"
import { useUser } from "../context/userContext"

export default function Header() {
    const { loggedIn, setLoggedIn } = useUser();
    const logOut = async () => {
        await fetch('api/auth/logout');
        setLoggedIn(false);
    }
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/auth/checkToken');
            const data = await response.json();
            if (data.authenticated) setLoggedIn(true);
        })();
    }, [])
    const { cartQuantity, setShowCart, showCart } = useShoppingCart();
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                NEXT
            </div>
            <div className={styles.buttons}>
                {loggedIn ? <Link href="/" onClick={logOut}><button className={styles.button}>Log out</button></Link> : <Link href="/login"><button className={styles.button}>Log in</button></Link>}
                <Link href="/"><button className={styles.button}>About</button></Link>
                <Link href="/products?category=All"><button className={styles.button}>Shop</button></Link>
                <div className={styles.wrapper}><button className={styles.button} onClick={e => setShowCart(showcart => !showcart)}>Cart ({cartQuantity})</button></div>
                <div className="search"></div>
            </div>
            <Cart />
        </header>
    )
}