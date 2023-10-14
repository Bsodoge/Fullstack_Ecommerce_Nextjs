'use client'

import { useShoppingCart } from "../context/shoppingCartContext";
import styles from "./Cart.module.css"
import CartItem from "./CartItem";


export default function Cart() {
    const { setShowCart, showCart, cartItems } = useShoppingCart();
    const closeCart = () => {
        setShowCart(false);
    }
    return (
        <div className={`${styles.cart_container} ${showCart && styles.active}`}>
            <div className={styles.close_container}>
                <span className={styles.close} onClick={e => closeCart()}>x</span>
            </div>
            <h1>Your Cart</h1>
            <div className={styles.cart_items}>
                {
                    cartItems.map(item => <CartItem key={item.id} id={item.id} quantity={item.quantity} />)
                }
            </div>
            <div className={styles.price_container}>
                <p>Subtotal:</p>
                <p className={styles.price}>${ }</p>
            </div>
            <button className={styles.button}>Checkout</button>
        </div>
    )
}