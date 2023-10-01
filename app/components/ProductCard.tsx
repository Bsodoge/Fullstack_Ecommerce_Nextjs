import styles from "./ProductCard.module.css"

interface props {
    img: string,
    alt: string,
    productName: string,
    price: number
}

export default function ProductCard({img, alt, productName, price} : props) {
    return (
        <div className={styles.product_card_container}>
            <div className={styles.container}>
                <img loading="lazy" src={img} alt={alt} />
                <h1>{productName}</h1>
            </div>
            <div className={styles.container}>
                <p className={styles.price}><strong>£{price}</strong></p>
                <button className={styles.button}>Add To Cart</button>
            </div>
        </div>
    )
}