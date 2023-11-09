import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Form.module.css";
import amex from "../../public/amex.svg";
import mastercard from "../../public/mastercard.svg";
import visa from "../../public/visa.svg";
import { ICardValidation } from "../interfaces/ICardValidation";
interface props {
    setFormStage: Function
}

export default function CardForm({ setFormStage }: props) {
    const [cardData, setCardData] = useState<ICardValidation>({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        securityCode: ''
    })
    const [cardErrors, setCardErrors] = useState<ICardValidation>({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        securityCode: ''
    })
    const luhnCheck = (cc: string): boolean => {
        let oddSum = 0;
        let evenSum = 0;
        cc = cc.trim();
        for (let i = cc.length - 1; i > -1; i--) {
            if (Number.isNaN(cc[i])) return false;
            if (i % 2 !== 0) oddSum += Number(cc[i]);
            else {
                let evenNum = Number(cc[i]) * 2;
                if (evenNum >= 10) evenNum = 1 + (evenNum % 10);
                evenSum += evenNum;
            };
        }
        console.log(oddSum, evenSum)
        return (oddSum + evenSum) % 10 === 0;
    }

    const handleCardSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors: any = {}
        if (!cardData.cardNumber.trim().length || !luhnCheck(cardData.cardNumber) || cardData.cardNumber.length < 10) {
            validationErrors.cardNumber = "Card Number is not valid.";
        }
        if (!cardData.cardName.trim().length) {
            validationErrors.cardName = "Card Name is not valid.";
        }
        if (!cardData.expiryDate.trim().length || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiryDate)) {
            validationErrors.expiryDate = "Expiry date is not valid.";
        }
        if (!cardData.securityCode.trim().length || Number.isNaN(cardData.securityCode.trim()) || cardData.securityCode.length < 3 || cardData.securityCode.length > 4) {
            validationErrors.securityCode = "Security Code is not valid.";
        }
        setCardErrors(validationErrors);
        if (!Object.keys(validationErrors).length) {
            console.log("pass");
        }
    }

    const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardData({ ...cardData, [name]: value });
    }

    return (
        <form action="" className={styles.form} onSubmit={handleCardSubmit}>
            <div className={styles.shipping}>
                <div className={styles.top_container}>
                    <div className={styles.text_container}>
                        <h3>Payment</h3>
                        <p>All transactions are secure and encrypted.</p>
                    </div>
                    <div className={styles.cards_list}>
                        <img src={amex.src} alt="" />
                        <img src={visa.src} alt="" />
                        <img src={mastercard.src} alt="" />
                        <p>and more...</p>
                    </div>
                </div>
                <div className={styles.input}>
                    <div className={styles.field}>
                        <input type="text" name="cardNumber" id="" placeholder="Card Number" onChange={handleCardChange} min={10} required />
                        {cardErrors.cardNumber ? <span className={styles.error}>{cardErrors.cardNumber}</span> : <></>}
                    </div>
                </div>
                <div className={styles.input}>
                    <div className={styles.field}>
                        <input type="text" name="cardName" id="" placeholder="Name on card" onChange={handleCardChange} required />
                        {cardErrors.cardName ? <span className={styles.error}>{cardErrors.cardName}</span> : <></>}
                    </div>
                </div>
                <div className={styles.input}>
                    <div className={styles.field}>
                        <input type="text" name="expiryDate" id="" placeholder="Expiration date (MM/YY)" onChange={handleCardChange} required />
                        {cardErrors.expiryDate ? <span className={styles.error}>{cardErrors.expiryDate}</span> : <></>}
                    </div>
                    <div className={styles.field}>
                        <input type="text" name="securityCode" id="" placeholder="Security Code" onChange={handleCardChange} min={3} max={4} required />
                        {cardErrors.securityCode ? <span className={styles.error}>{cardErrors.securityCode}</span> : <></>}
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={styles.return} onClick={e => setFormStage("details")}><span className={styles.right}>&#8249;</span> Return to shipping</button>
                <button className={styles.shipping_button} >Continue to payment</button>
            </div>
        </form>
    )
}