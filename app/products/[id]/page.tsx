'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { useShoppingCart } from '@/app/context/shoppingCartContext'

interface props {
    params: {
        id: number
    }
}

interface IProduct {
    id: number,
    product_name: string,
    product_image: string,
    product_price: number
}

export default function productPage({ params }: props) {
    const [product, setProduct] = useState<IProduct>();
    const { increaseCartQuantity } = useShoppingCart();
    const quantity = useRef<HTMLInputElement>(null);
    const addToCart = () => {
        if (Number(quantity.current!.value) < 1 || !Number(quantity.current!.value)) {
            console.log("invalid")
        } else {
            increaseCartQuantity(params.id, Number(quantity.current!.value));
        }
    }
    useEffect(() => {
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(params.id)
        }
        fetch('/api/getSpecificProduct', options).then(response => response.json()).then(data => setProduct(data));
    }, [])
    return (
        <div className={styles.container}>
            <img src="https://picsum.photos/seed/picsum/200/300" alt="img" />
            <div className={styles.product_info}>
                <h1>{product?.product_name}</h1>
                <div className={styles.stars}>
                    <label htmlFor="" className={styles.star}><input type="radio" name="star" id="" />⭐</label>
                    <label htmlFor="" className={styles.star}><input type="radio" name="star" id="" />⭐</label>
                    <label htmlFor="" className={styles.star}><input type="radio" name="star" id="" />⭐</label>
                    <label htmlFor="" className={styles.star}><input type="radio" name="star" id="" />⭐</label>
                    <label htmlFor="" className={styles.star}><input type="radio" name="star" id="" />⭐</label>
                </div>
                <div className={styles.price}>£{product?.product_price}</div>
                <div className={styles.add_to_cart}>
                    <input type="text" inputMode="numeric" pattern="[0-9]+" className={styles.quantity} ref={quantity} defaultValue={1} />
                    <button className={styles.button} onClick={e => addToCart()}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}