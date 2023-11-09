'use client'

import styles from "./Shop.module.css"
import ProductCard from "./ProductCard"
import { useQueryState } from 'next-usequerystate'
import { useEffect, useState } from "react";
import { IProduct } from "../interfaces/IProduct";

export default function Shop() {
    const [category, setCategory] = useQueryState('category');
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        setCategory(prevCategory => prevCategory === null ? 'All' : prevCategory);
        fetch('/api/getData').then(response => response.json()).then(data => setProducts(data));
        console.log(category)
    }, [])
    return (
        <div className={styles.shop_container}>
            <h1>{category}</h1>
            <div className={styles.grid}>
                <div className={styles.options}>
                    <h2>Shop</h2>
                    <p><strong>Selecting a filter option will automatically update results</strong></p>
                    <ul className={styles.option_list}>
                        <li><label className={styles.option} onChange={e => setCategory('All')}><input type="radio" name="option" defaultChecked={category === 'All' ? true : false} />All</label></li>
                        <li><label className={styles.option} onChange={e => setCategory('Cake')}><input type="radio" name="option" defaultChecked={category === 'Cake' ? true : false} />Cakes</label></li>
                        <li><label className={styles.option} onChange={e => setCategory('Cookies')}><input type="radio" name="option" defaultChecked={category === 'Cookies' ? true : false} />Cookies</label></li>
                        <li><label className={styles.option} onChange={e => setCategory('Confectionery')}><input type="radio" name="option" defaultChecked={category === 'Confectionery' ? true : false} />Confectioneries</label></li>
                    </ul>
                </div>
                <div className={styles.product_container}>
                    {
                        category === 'All' ?
                            products.map(product => <ProductCard key={product.id} id={product.id} img="" alt="img" productName={product.product_name} price={product.product_price} />)
                            :
                            products.filter(product => product.product_category === category).map(product => <ProductCard key={product.id} id={product.id} img="" alt="img" productName={product.product_name} price={product.product_price} />)
                    }
                </div>
            </div>
        </div>
    )
}