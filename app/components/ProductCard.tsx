'use client'

import Link from "next/link";
import { useShoppingCart } from "../context/shoppingCartContext";
import { useUser } from "../context/userContext";
import styles from "./ProductCard.module.css"

interface props {
    id: number,
    img: string,
    alt: string,
    productName: string,
    price: number
}

export default function ProductCard({ img, alt, productName, price, id }: props) {
    const { increaseCartQuantity, setShowCart } = useShoppingCart();
    const { loggedIn, userID } = useUser();
    const { cartItems } = useShoppingCart();
    const addToDatabase = async () => {
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify({ shoppingCart: cartItems, userID: userID})
        }
        const response = await fetch('/api/setShoppingCart', options);
    }
    const addToCart = async () => {
        increaseCartQuantity(id);
        setShowCart(true);
        loggedIn ? addToDatabase() : console.log("not signed in")
    }
    return (
        <div className={styles.product_card_container}>
            <div className={styles.container}>
                <img loading="lazy" src={img} alt={alt} />
                <Link href={`products/${id}`}><h1>{productName}</h1></Link>
            </div>
            <div className={styles.container}>
                <p className={styles.price}><strong>£{price}</strong></p>
                <button className={styles.button} onClick={e => addToCart()}>Add To Cart</button>
            </div>
        </div>
    )
}