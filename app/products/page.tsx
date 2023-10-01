import styles from "./page.module.css"
import Shop from "../components/Shop"

export default function Products(){
    return(
        <main className={styles.main}>
            <img src="" alt="" />
            <div className="shop_container">
                <Shop />
            </div>
        </main>
    )
}