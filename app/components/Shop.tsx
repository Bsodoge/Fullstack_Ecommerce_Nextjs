'use client'

import styles from "./Shop.module.css"
import ProductCard from "./ProductCard"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"

export default function Shop() {
    const searchParams = useSearchParams(); 
    const category = searchParams.get("category");
    return (
        <div className={styles.shop_container}>
            <h1>{category}</h1>
            <div className={styles.grid}>
                <div className={styles.options}>
                    <h2>Shop</h2>
                    <p><strong>Selecting a filter option will automatically update results</strong></p>
                    <ul className={styles.option_list}>
                        <li><label className={styles.option}><Link href={`?category=lorem`}><input type="radio" name="option"/>Lorem</Link></label></li>
                        <li><label className={styles.option}><Link href={`?category=ipsum`}><input type="radio" name="option"/>Ipsum</Link></label></li>
                        <li><label className={styles.option}><Link href={`?category=dolor`}><input type="radio" name="option"/>Dolor</Link></label></li>
                    </ul>
                </div>
                <div className={styles.product_container}>
                    <ProductCard img="" alt="img" productName="test" price={2} />
                    <ProductCard img="" alt="img" productName="test" price={2} />
                    <ProductCard img="" alt="img" productName="test" price={2} />
                    <ProductCard img="" alt="img" productName="test" price={2} />
                    <ProductCard img="" alt="img" productName="test" price={2} />
                </div>
            </div>
        </div>
    )
}