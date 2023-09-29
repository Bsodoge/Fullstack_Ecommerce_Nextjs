import styles from "./Footer.module.css"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.links}>
                <li><Link href="/">Terms</Link></li>
                <li><Link href="/">Privacy</Link></li>
                <li><Link href="/">Security</Link></li>
                <li><Link href="/">Blog</Link></li>
                <li><Link href="/">About</Link></li>
            </ul>
            <div className={styles.copyright}>
                <p>&#169; 2023 Next. All Rights Reserved.</p>
            </div>
        </footer>
    )
}