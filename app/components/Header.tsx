import Link from "next/link"
import styles from "./Header.module.css"

export default function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                NEXT
            </div>
            <div className={styles.buttons}>
                <Link href="/"><button className={styles.button}>About</button></Link>
                <Link href="/"><button className={styles.button}>Shop</button></Link>
                <Link href="/"><button className={styles.button}>Cart</button></Link>
                <div className="search"></div>
            </div>
        </header>
    )
}