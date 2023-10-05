'use client'

import styles from "./Cart.module.css"

interface props{
    showCart: boolean,
    setShowCart: Function
}

export default function Cart({showCart, setShowCart} : props){
    const closeCart = () => {
        setShowCart(false);
    }
    return(
        <div className={`${styles.cart_container} ${ showCart && styles.active}`}>
            <div className={styles.close_container}>
                <span className={styles.close} onClick={e => closeCart()}>x</span>
            </div>
            <h1>Your Cart</h1>
            <div className={styles.cart_item}>

            </div>
            <div className={styles.price_container}>
                <p>Subtotal:</p>
                <p className={styles.price}>${}</p>
            </div>
            <button>Checkout</button>
        </div>
    )
}