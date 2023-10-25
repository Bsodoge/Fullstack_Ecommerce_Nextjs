'use client'

import { useEffect, useState } from "react"
import styles from "./ListItem.module.css"
import { IProduct } from "../interfaces/IProduct";

interface props {
    id: number,
    quantity: number
}

export default function CartItem({ id, quantity }: props) {
    const [product, setProduct] = useState<IProduct>();

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
                <div className={styles.quantity}>{quantity}</div>
            </div>
            <div className={styles.information}>
                <div className={styles.name}>{product?.product_name}</div>
                <div className={styles.price_container}>
                    <div className={styles.price}>£{product?.product_price}</div>
                </div>
            </div>
        </div>
    )
}