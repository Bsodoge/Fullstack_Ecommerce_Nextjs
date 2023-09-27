import styles from "./ShippingHeader.module.css"
import Link from "next/link"

export default function ShippingHeader(){
    return(
        <div className={styles.shipping}>
            <p>FREE 3 Day Shipping <Link href="/">Learn More</Link></p>
        </div>
    )
}