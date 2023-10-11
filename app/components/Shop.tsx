'use client'

import styles from "./Shop.module.css"
import ProductCard from "./ProductCard"
import { useQueryState } from 'next-usequerystate'

export default function Shop() {
    const [category, setCategory] = useQueryState('category')
    return (
        <div className={styles.shop_container}>
            <h1>{category}</h1>
            <div className={styles.grid}>
                <div className={styles.options}>
                    <h2>Shop</h2>
                    <p><strong>Selecting a filter option will automatically update results</strong></p>
                    <ul className={styles.option_list}>
                        <li><label className={styles.option} onClick={e => setCategory('lorem')}><input type="radio" name="option"/>Lorem</label></li>
                        <li><label className={styles.option} onClick={e => setCategory('ipsum')}><input type="radio" name="option"/>Ipsum</label></li>
                        <li><label className={styles.option} onClick={e => setCategory('dolor')}><input type="radio" name="option"/>Dolor</label></li>
                    </ul>
                </div>
                <div className={styles.product_container}>
                    <ProductCard id={1} img="" alt="img" productName="test" price={2} />
                    <ProductCard id={2} img="" alt="img" productName="test" price={2} />
                    <ProductCard id={3} img="" alt="img" productName="test" price={2} />
                    <ProductCard id={4} img="" alt="img" productName="test" price={2} />
                    <ProductCard id={5} img="" alt="img" productName="test" price={2} />
                </div>
            </div>
        </div>
    )
}