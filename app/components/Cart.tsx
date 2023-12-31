'use client'

import { useEffect, useState } from "react";
import { useShoppingCart } from "../context/shoppingCartContext";
import styles from "./Cart.module.css"
import CartItem from "./CartItem";
import Link from "next/link";

interface IProduct {
    id: number,
    product_name: string,
    product_image: string,
    product_price: number
}


export default function Cart() {
    const { setShowCart, showCart, cartItems } = useShoppingCart();
    const [products, setProducts] = useState<IProduct[]>([]);
    const formatter = new Intl.NumberFormat("en-gb", { currency: "GBP", style: "currency" })
    useEffect(() => {
        fetch('/api/getData').then(response => response.json()).then(data => setProducts(data));
    }, [])

    const closeCart = () => {
        setShowCart(false);
    }
    return (
        <div className={`${styles.cart_container} ${showCart && styles.active}`}>
            <div className={styles.close_container}>
                <span className={styles.close} onClick={e => closeCart()}>x</span>
            </div>
            {
                cartItems.length ?
                    <div>
                        <h1>Your Cart</h1>
                        <div className={styles.cart_items}>
                            {
                                cartItems.map(item => <CartItem key={item.id} id={item.id} quantity={item.quantity} />)
                            }
                        </div>
                        <div className={styles.price_container}>
                            <p>Subtotal:</p>
                            <p className={styles.price}>{formatter.format(cartItems.reduce((total, item) => total + (item.quantity * products.find(product => product.id === item.id)?.product_price!), 0))}</p>
                        </div>
                        <Link href="/checkout"><button className={styles.button}>Checkout</button></Link>
                    </div>
                    : 
                    <div className={styles.empty}>
                        <div className={styles.text}>
                            <h1>Let's add something.</h1>
                            <p>Ready to find the dessert for you?</p>
                        </div>
                        <Link href="/products?category=All"><button className={styles.shopnow_button}>Shop Now</button></Link>
                    </div>
                
            }
        </div>
    )
}