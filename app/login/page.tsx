'use client'

import { FormEvent, useRef, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "../context/userContext";
import { useShoppingCart } from "../context/shoppingCartContext";
export default function Login() {
    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const { setLoggedIn, setUserID } = useUser();
    const { setCartItems } = useShoppingCart();
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
            loginErrors.invalid = data.message;
        }
        setErrors(loginErrors);
        if (!Object.keys(loginErrors).length) {
            setLoggedIn(true);
            console.log(data.id)
            setUserID(data.id);
            const options: RequestInit = {
                method: 'POST',
                body: JSON.stringify(data.id)
            }
            const response = await fetch('/api/getShoppingCart', options);
            const cart = await response.json();
            console.log(cart);
            cart ? setCartItems(cartItems => cart) : console.log("not found");
            route.push('/checkout');
        }
    }
    return (
        <main className={styles.main}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                {errors.invalid ? <span className={styles.error}>{errors.invalid}</span> : <></>}
                <div className={styles.field}>
                    <input type="text" name="username" id="" placeholder="Username" ref={usernameInput} required />
                    {errors.usernameEmpty ? <span className={styles.error}>{errors.usernameEmpty}</span> : <></>}
                </div>
                <div className={styles.field}>
                    <input type="password" name="passowrd" id="" placeholder="Password" ref={passwordInput} required />
                    {errors.passwordEmpty ? <span className={styles.error}>{errors.passwordEmpty}</span> : <></>}
                </div>
                <button className={styles.signin_button} >Continue</button>
            </form>
            <span>New to next?</span>
            <Link href="/register"><button className={styles.signup_button}>Create your new next account</button></Link>
        </main>
    )
}