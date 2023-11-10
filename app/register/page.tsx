'use client'

import { FormEvent, useRef, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
export default function Login() {
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState({
        usernameEmpty: '',
        passwordEmpty: '',
        invalid: ''
    });
    const route = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        const loginErrors: any = {};
        e.preventDefault();
        if (!usernameInput.current?.value.trim().length) {
            loginErrors.usernameEmpty = 'Please enter a username';
        }
        if (!passwordInput.current?.value.trim().length) {
            loginErrors.passwordEmpty = 'Please enter a password';
        }
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify({ username: usernameInput.current?.value, password: passwordInput.current?.value })
        }
        const response = await fetch('/api/auth/login', options);
        const data = await response.json();
        if (!data.authenticated) {
            loginErrors.invalid = 'Either username or password is incorrect';
        }
        setErrors(loginErrors);
        if (!Object.keys(loginErrors).length) {
            route.push('/checkout');
        }
    }
    return (
        <main className={styles.main}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <h1>Create account</h1>
                {errors.invalid ? <span className={styles.error}>{errors.invalid}</span> : <></>}
                <div className={styles.field}>
                    <input type="text" name="username" id="" placeholder="Username" ref={usernameInput} required />
                    {errors.usernameEmpty ? <span className={styles.error}>{errors.usernameEmpty}</span> : <></>}
                </div>
                <div className={styles.field}>
                    <input type="text" name="email" id="" placeholder="Email" ref={usernameInput} required />
                    {errors.usernameEmpty ? <span className={styles.error}>{errors.usernameEmpty}</span> : <></>}
                </div>
                <div className={styles.field}>
                    <input type="password" name="password" id="" placeholder="Password" ref={passwordInput} required />
                    {errors.passwordEmpty ? <span className={styles.error}>{errors.passwordEmpty}</span> : <></>}
                </div>
                <div className={styles.field}>
                    <input type="password" name="reeneterpassword" id="" placeholder="Re-enter password" ref={passwordInput} required />
                    {errors.passwordEmpty ? <span className={styles.error}>{errors.passwordEmpty}</span> : <></>}
                </div>
                <button className={styles.signin_button} >Continue</button>
            </form>
        </main>
    )
}