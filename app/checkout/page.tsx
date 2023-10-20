import styles from "./page.module.css"

export default function Checkout() {
  return (
    <main className={styles.main}>
        <div className={styles.payment_column}>
            <form action="" className={styles.form}>
                <div className={styles.contact}>
                    <h3>Contact</h3>
                    <div className={styles.input}>
                        <input type="text" name="" id="" />
                    </div>
                </div>
                <div className={styles.shipping}>
                   <h3>Shipping address</h3>
                    <div className={styles.input}>
                        <input type="text" name="" id="" />
                    </div>
                    <div className={styles.input}>
                        <input type="text" name="" id="" />
                        <input type="text" name="" id="" />
                    </div>
                    <div className={styles.input}>
                        <input type="text" name="" id="" />
                    </div>
                    <div className={styles.input}>
                        <input type="text" name="" id="" />
                    </div>
                    <div className={styles.input}>
                        <input type="text" name="" id="" />
                        <input type="text" name="" id="" />
                        <input type="text" name="" id="" />
                    </div>
                </div>
                <div className={styles.button}>
                    <button>Return to cart</button>
                    <button>Continue to shipping</button>
                </div>
            </form>
        </div>
        <div className={styles.list_column}></div>
    </main>
  )
}
