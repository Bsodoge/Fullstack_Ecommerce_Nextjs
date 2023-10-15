'use client'

import styles from "./Shop.module.css"
import ProductCard from "./ProductCard"
import { useQueryState } from 'next-usequerystate'
import { useEffect, useState } from "react";

interface product{
    id: number,
    product_name: string,
    product_image: string,
    product_price: number
}

export default function Shop() {
    const [category, setCategory] = useQueryState('category');
    const [products, setProducts] = useState<product[]>([]);
    useEffect(() => {
        fetch('/api/getData').then(response => response.json()).then(data => setProducts(data));
    }, [])
    return (
        <div className={styles.shop_container}>
            <h1>{category}</h1>
            <div className={styles.grid}>
                <div className={styles.options}>
                    <h2>Shop</h2>
                    <p><strong>Selecting a filter option will automatically update results</strong></p>
                    <ul className={styles.option_list}>
                        <li><label className={styles.option} onClick={e => setCategory('lorem')}><input type="radio" name="option" />Lorem</label></li>
                        <li><label className={styles.option} onClick={e => setCategory('ipsum')}><input type="radio" name="option" />Ipsum</label></li>
                        <li><label className={styles.option} onClick={e => setCategory('dolor')}><input type="radio" name="option" />Dolor</label></li>
                    </ul>
                </div>
                <div className={styles.product_container}>
                    {
                        products.map(product => <ProductCard id={product.id} img="" alt="img" productName={product.product_name} price={product.product_price} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}