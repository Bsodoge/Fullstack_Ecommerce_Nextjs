'use client'

import { FormEvent, useRef, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useUser } from "../context/userContext";
import { useShoppingCart } from "../context/shoppingCartContext";
export default function Login() {
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordReenterInput = useRef<HTMLInputElement>(null);
    const { emptyCart } = useShoppingCart();
    const { setLoggedIn, setUserID } = useUser();
    const [errors, setErrors] = useState({
        usernameEmpty: '',
        passwordEmpty: '',
        passwordShort: '',
        emailEmpty: '',
        passwordReentermpty: '',
        passwordMatch: '',
        invalid: ''
    });
    const route = useRouter();
    const handleSubmit = async (e: FormEvent) => {
        const registerErrors: any = {};
        e.preventDefault();
        if (!usernameInput.current?.value.trim().length) {
            registerErrors.usernameEmpty = 'Please enter a username';
        }
        if (!passwordInput.current?.value.trim().length) {
            registerErrors.passwordEmpty = 'Please enter a valid password';
        }
        if(passwordInput.current!.value.length < 8){
            registerErrors.passwordShort = 'Please enter a longer password';
        }
        if (!emailInput.current?.value.trim().length || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailInput.current?.value)) {
            registerErrors.emailEmpty = 'Please enter a valid email address';
        }
        if (!passwordReenterInput.current?.value.trim().length) {
            registerErrors.passwordReentermpty = 'Please re-enter password';
        }
        if (passwordReenterInput.current?.value.trim().length !== passwordInput.current?.value.trim().length) {
            registerErrors.passwordMatch = 'Passwords do not match';
        }
        if(!registerErrors.length){
            const options: RequestInit = {
                method: 'POST',
                body: JSON.stringify({ username: usernameInput.current?.value, password: passwordInput.current?.value, reenterpassword: passwordReenterInput.current?.value })
            }
            const response = await fetch('/api/auth/register', options);
            const data = await response.json();
            setUserID(data?.id);
            if (!data.authenticated) {
                registerErrors.invalid = data.message;
            }
        }
        setErrors(registerErrors);
        if (!Object.keys(registerErrors).length) {
            setLoggedIn(true);
            emptyCart();
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
                    <input type="text" name="email" id="" placeholder="Email" ref={emailInput} required />
                    {errors.emailEmpty ? <span className={styles.error}>{errors.emailEmpty}</span> : <></>}
                </div>
                <div className={styles.field}>
                    <input type="password" name="password" id="" placeholder="Password" ref={passwordInput} min={8} required />
                    {errors.passwordEmpty ? <span className={styles.error}>{errors.passwordEmpty}</span> : errors.passwordShort ? <span className={styles.error}>{errors.passwordShort}</span> : <></>}
                </div>
                <div className={styles.field}>
                    <input type="password" name="reeneterpassword" id="" placeholder="Re-enter password" ref={passwordReenterInput} required />
                    {errors.passwordReentermpty ? <span className={styles.error}>{errors.passwordReentermpty}</span> : errors.passwordMatch ? <span className={styles.error}>{errors.passwordMatch}</span> : <></>}
                </div>
                <button className={styles.signin_button} >Continue</button>
            </form>
        </main>
    )
}