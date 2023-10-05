'use client'

import Link from "next/link"
import styles from "./Header.module.css"
import Cart from "./Cart"
import { useState } from "react"

export default function Header() {
    const [showCart, setShowCart] = useState<boolean>(false);
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                NEXT
            </div>
            <div className={styles.buttons}>
                <Link href="/"><button className={styles.button}>About</button></Link>
                <Link href="/products"><button className={styles.button}>Shop</button></Link>
                <div className={styles.wrapper}><button className={styles.button} onClick={e => setShowCart(showcart => !showcart)}>Cart</button></div>
                <div className="search"></div>
            </div>
            <Cart showCart={showCart} setShowCart={setShowCart} />
        </header>
    )
}