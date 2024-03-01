'use client'

import { useEffect, useState } from "react"
import { useShoppingCart } from "../context/shoppingCartContext"
import { useUser } from "../context/userContext"
import styles from "./CartItem.module.css"
import { IProduct } from "../interfaces/IProduct";

interface props {
    id: number,
    quantity: number
}

export default function CartItem({ id, quantity }: props) {
    const { removeFromCart, cartItems } = useShoppingCart();
    const { userID, loggedIn } = useUser();
    const [product, setProduct] = useState<IProduct>();
    const removeItem = async () => {
        removeFromCart(id);
	if(loggedIn){
	const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify({ shoppingCart: cartItems, userID: userID })
	}
        const response = await fetch('/api/setShoppingCart', options);
	}
        
    }
    useEffect(() => {
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(id)
        }
        fetch('/api/getSpecificProduct', options).then(response => response.json()).then(data => setProduct(data));
    }, [])
    return (
        <div className={styles.card_item_container}>
            <div className={styles.img_container}>
                <img src="" alt="test" />
            </div>
            <div className={styles.information}>
                <div className={styles.name}>{product?.product_name}</div>
                <div className={styles.price}>£{product?.product_price}</div>
                <div className={styles.quantity}>QTY: {quantity}</div>
            </div>
            <div className={styles.remove}>
                <button onClick={e => removeItem()}>Remove</button>
            </div>
        </div>
    )
}
