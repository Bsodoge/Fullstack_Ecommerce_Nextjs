'use client'

import { FormEvent, useRef, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
export default function Login() {
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<boolean>(false);
    const route = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!usernameInput.current?.value.trim().length || !passwordInput.current?.value.trim().length) {
            setError(true);
            return;
        }
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify({ username: usernameInput.current?.value, password: passwordInput.current?.value })
        }
        const response = await fetch('/api/auth/login', options);
        const data = await response.json();
        if (!data.authenticated) {
            setError(true);
        } else {
            setError(false);
            route.push('/checkout');
        }
    }
    return (
        <main className={styles.main}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                {error ? <span className={styles.error}>Username or password is incorrect</span> : <></>}
                <div className={styles.field}>
                    <input type="text" name="username" id="" placeholder="Username" ref={usernameInput} required />
                </div>
                <div className={styles.field}>
                    <input type="password" name="passowrd" id="" placeholder="Password" ref={passwordInput} required />
                </div>
                <button className={styles.signin_button} >Continue</button>
            </form>
            <span>New to next?</span>
            <button className={styles.signup_button}>Create your new next account</button>
        </main>
    )
}