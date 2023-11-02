'use client'

import styles from "./DiscountTag.module.css"

interface props {
    discountName: string,
    id: number,
    removeDiscount: (id: number) => void
}

export default function DiscountTag({ discountName, id, removeDiscount }: props) {
    return (
        <div className={styles.tag_container}>
            <img src="" alt="discount icon" />
            <p>{discountName}</p>
            <div className={styles.remove} onClick={e => removeDiscount(id)}>x</div>
        </div>
    )
}