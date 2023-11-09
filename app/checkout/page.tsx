'use client'

import DiscountTag from "../components/DiscountTag";
import { useShoppingCart } from "../context/shoppingCartContext"
import { IDiscount } from "../interfaces/IDiscount";
import { IProduct } from "../interfaces/IProduct";
import styles from "./page.module.css"
import { useEffect, useRef, useState } from "react";
import AddressForm from "../components/AddressForm";
import CardForm from "../components/CardForm";
import ItemsContainer from "../components/ItemsContainer";

export default function Checkout() {
    const { cartItems } = useShoppingCart();
    const [formStage, setFormStage] = useState<string>("details");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [appliedDiscounts, setAppliedDiscounts] = useState<IDiscount[]>([]);
    const discountInput = useRef<HTMLInputElement>(null);

    const removeDiscount = (id: number) => {
        const discount = appliedDiscounts.find(appliedDiscount => appliedDiscount.id === id);
        setTotalPrice(prevTotalPrice => prevTotalPrice / discount!.discount_value);
        setAppliedDiscounts(appliedDiscounts.filter(appliedDiscount => appliedDiscount.id !== id));
    }
    const applyDiscount = async () => {
        if (discountInput.current?.value.trim().length && !appliedDiscounts.find(appliedDiscount => appliedDiscount.code === discountInput.current?.value.toUpperCase())) {
            const options: RequestInit = {
                method: 'POST',
                body: JSON.stringify(discountInput.current?.value)
            }
            const response = await fetch('/api/getDiscount', options);
            const data = await response.json();
            console.log(totalPrice);
            setTotalPrice(prevTotalPrice => prevTotalPrice * data.discount_value);
            setAppliedDiscounts(prevAppliedDiscounts => [...prevAppliedDiscounts, data]);
            discountInput.current.value = '';
        }
    }
    const formatter = new Intl.NumberFormat("en-gb", { currency: "GBP", style: "currency" })
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/getData');
            const data = await response.json();
            setProducts(data);
        })();
    }, [])
    useEffect(() => {
        setTotalPrice(cartItems.reduce((total, item) => total + (item.quantity * products.find(product => product.id === item.id)?.product_price!), 0));
    }, [products])
    return (
        <main className={styles.main}>
            <div className={styles.payment_column}>
                {
                    formStage === 'details' ?
                        <AddressForm setFormStage={setFormStage}/>
                        :
                        <CardForm setFormStage={setFormStage} />
                }
            </div>
            <div className={styles.list_column}>
                <ItemsContainer cartItems={cartItems}/>
                <div className={styles.bottom_container}>
                    <div className={styles.discount_container}>
                        <div className={styles.discount_input_container}>
                            <div className={styles.input}>
                                <input type="text" name="" id="" placeholder="Discount Code or Gift Card" ref={discountInput} />
                            </div>
                            <button className={styles.button} onClick={e => applyDiscount()}>Apply</button>
                        </div>
                        {appliedDiscounts.length ?

                            <div className={styles.discount_list}>
                                {
                                    appliedDiscounts.map(appliedDiscount => <DiscountTag id={appliedDiscount.id} removeDiscount={removeDiscount} key={appliedDiscount.id} discountName={appliedDiscount.code} />)
                                }
                            </div> :

                            <></>
                        }
                    </div>
                    <div className={styles.price_container}>
                        <div className={styles.subtotal}>Subtotal</div>
                        <div>{formatter.format(totalPrice)}</div>
                    </div>
                    <div className="total_container">
                        <div>Total</div>
                        <div className={styles.total}>
                            <div className="currency">GBP</div>
                            <div>{formatter.format(totalPrice)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
