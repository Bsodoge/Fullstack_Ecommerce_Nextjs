'use client'

import Link from "next/link"
import styles from "./Header.module.css"
import Cart from "./Cart"
import { useShoppingCart } from "../context/shoppingCartContext"
import { useEffect, useState } from "react"
import { useUser } from "../context/userContext"
import { ICartItem } from "../interfaces/ICartItem"

export default function Header() {
    const { cartQuantity, setShowCart, showCart, setCartItems, emptyCart } = useShoppingCart();
    const { loggedIn, setLoggedIn, setUserID } = useUser();
    const [loading, setLoading] = useState(true);
    const logOut = async () => {
        await fetch('api/auth/logout');
        setLoggedIn(false);
        emptyCart();
    }
    const setShoppingCart = async ({ newCart }: { newCart: ICartItem[] }) => {
        setCartItems(newCart);
    }
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/auth/checkToken');
            const data = await response.json();
            if (data.authenticated) {
                setUserID(data.id);
                setLoggedIn(true);
                const options: RequestInit = {
                    method: 'POST',
                    body: JSON.stringify(data.id)
                }
                const response = await fetch('/api/getShoppingCart', options);
                const cart = await response.json();
                console.log(cart);
                cart ? setCartItems(cartItems => cart) : console.log("not found");
            }
        })();
    }, [])
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