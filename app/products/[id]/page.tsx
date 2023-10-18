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
        if (Number(quantity.current!.value) < 1) {
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
                <div className={styles.stars}></div>
                <div className={styles.price}>£{product?.product_price}</div>
                <div className={styles.add_to_cart}>
                    <input type="number" className="quantity" min={1} ref={quantity} defaultValue={1} />
                    <button className={styles.button} onClick={e => addToCart()}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}