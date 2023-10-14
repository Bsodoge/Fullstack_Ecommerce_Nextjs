'use client'

import { useShoppingCart } from "../context/shoppingCartContext"
import styles from "./CartItem.module.css"

interface props {
    id: number,
    quantity: number
}

export default function CartItem({ id, quantity }: props) {
    const { removeFromCart } = useShoppingCart();
    return (
        <div className={styles.card_item_container}>
            <div className={styles.img_container}>
                <img src="" alt="test" />
            </div>
            <div className={styles.information}>
                <div className={styles.name}>{id}</div>
                <div className={styles.price}>£</div>
                <div className={styles.quantity}>QTY: {quantity}</div>
            </div>
            <div className={styles.remove}>
                <button onClick={e => removeFromCart(id)}>Remove</button>
            </div>
        </div>
    )
}