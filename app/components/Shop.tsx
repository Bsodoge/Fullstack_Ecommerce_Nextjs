'use client'

import styles from "./Shop.module.css"
import ProductCard from "./ProductCard"
import { useRouter, useSearchParams } from 'next/navigation'

export default function Shop() {
    const searchParams = useSearchParams(); 
    const router = useRouter();
    const category = searchParams.get("category");
    return (
        <div className={styles.shop_container}>
            <h1>{category}</h1>
            <div className={styles.grid}>
                <div className={styles.options}>
                    <h2>Shop</h2>
                    <p><strong>Selecting a filter option will automatically update results</strong></p>
                    <ul className={styles.option_list}>
                        <li><label className={styles.option} onClick={e => router.push('?category=lorem', undefined, { shallow: true })}><input type="radio" name="option"/>Lorem</label></li>
                        <li><label className={styles.option} onClick={e => router.push('?category=ipsum')}><input type="radio" name="option"/>Ipsum</label></li>
                        <li><label className={styles.option} onClick={e => router.push('?category=dolor')}><input type="radio" name="option"/>Dolor</label></li>
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