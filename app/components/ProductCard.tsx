'use client'

import { useShoppingCart } from "../context/shoppingCartContext";
import styles from "./ProductCard.module.css"

interface props {
    id: number,
    img: string,
    alt: string,
    productName: string,
    price: number
}

export default function ProductCard({ img, alt, productName, price, id }: props) {
    const { increaseCartQuantity } = useShoppingCart();
    return (
        <div className={styles.product_card_container}>
            <div className={styles.container}>
                <img loading="lazy" src={img} alt={alt} />
                <h1>{productName}</h1>
            </div>
            <div className={styles.container}>
                <p className={styles.price}><strong>£{price}</strong></p>
                <button className={styles.button} onClick={e => increaseCartQuantity(id)}>Add To Cart</button>
            </div>
        </div>
    )
}