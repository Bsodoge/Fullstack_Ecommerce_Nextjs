import styles from "./page.module.css"
export default function Login() {
    return (
        <main className={styles.main}>
            <form action="">
                <h1>Sign in</h1>
                <div className={styles.field}>
                    <input type="text" name="email" id="" placeholder="Email" required />
                </div>
                <button className={styles.signin_button} >Continue</button>
            </form>
            <span>New to next?</span>
            <button className={styles.signup_button}>Create your new next account</button>
        </main>
    )
}