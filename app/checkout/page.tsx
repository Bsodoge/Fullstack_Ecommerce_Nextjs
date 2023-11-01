'use client'

import DiscountTag from "../components/DiscountTag";
import ListItem from "../components/ListItem";
import { useShoppingCart } from "../context/shoppingCartContext"
import { IDiscount } from "../interfaces/IDiscount";
import { IProduct } from "../interfaces/IProduct";
import styles from "./page.module.css"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import amex from "../../public/amex.svg";
import mastercard from "../../public/mastercard.svg";
import visa from "../../public/visa.svg";
import { IAddressValidation } from "../interfaces/IAddressValidation";
import { ICardValidation } from "../interfaces/ICardValidation";


export default function Checkout() {
    const { cartItems } = useShoppingCart();
    const form = useRef<HTMLFormElement>(null);
    const [formStage, setFormStage] = useState<string>("details");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [appliedDiscounts, setAppliedDiscounts] = useState<IDiscount[]>([]);
    const discountInput = useRef<HTMLInputElement>(null);
    const [addressData, setAddressData] = useState<IAddressValidation>({
        email: '',
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        county: '',
        postcode: ''
    })
    const [addressErrors, setAddressErrors] = useState<IAddressValidation>({
        email: '',
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        county: '',
        postcode: ''
    })
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
    const luhnCheck = (cc : string) : boolean => {
        let oddSum = 0;
        let evenSum = 0;
        for(let i = cc.length-1; i > -1; i--){
            if(Number.isNaN(cc[i])) return false;
            if(i % 2 !== 0) oddSum += Number(cc[i]);
            else {
                let evenNum = Number(cc[i]) * 2;
                if(evenNum >= 10) evenNum = 1 + (evenNum % 10);
                evenSum += evenNum;
            };
        }
        console.log(oddSum, evenSum)
        return (oddSum + evenSum) % 10 === 0;
    }
    const handleAddressSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors: any = {}
        if (!addressData.email.trim().length || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(addressData.email)) {
            validationErrors.email = "Email is not valid.";
        }
        if (!addressData.firstName.trim().length) {
            validationErrors.firstName = "First name is not valid.";
        }
        if (!addressData.lastName.trim().length) {
            validationErrors.lastName = "Last name is not valid.";
        }
        if (!addressData.address.trim().length) {
            validationErrors.address = "Address is not valid.";
        }
        if (!addressData.city.trim().length) {
            validationErrors.city = "City is not valid.";
        }
        if (!addressData.postcode.trim().length) {
            validationErrors.postcode = "Postcode is not valid.";
        }
        if (!addressData.county.trim().length) {
            validationErrors.county = "County is not valid.";
        }
        if (addressData.country === "0" || !addressData.country.length) {
            validationErrors.country = "Country is not valid.";
        }
        setAddressErrors(validationErrors);
        if (!Object.keys(validationErrors).length) {
            setFormStage("payment");
        }
    }
    const handleCardSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors: any = {}
        if (!cardData.cardNumber.trim().length || luhnCheck(cardData.cardNumber) || cardData.cardNumber.length < 10) {
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
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddressData({ ...addressData, [name]: value });
    }
    const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardData({ ...cardData, [name]: value });
    }
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddressData({ ...addressData, [name]: value });
    }
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
                        <form action="" className={styles.form} ref={form} onSubmit={handleAddressSubmit}>
                            <div className={styles.contact}>
                                <h3>Contact</h3>
                                <div className={styles.input}>
                                    <div className={styles.field}>
                                        <input type="email" name="email" id="" placeholder="Email" onChange={handleAddressChange} required />
                                        {addressErrors.email ? <span className={styles.error}>{addressErrors.email}</span> : <></>}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.shipping}>
                                <h3>Shipping address</h3>
                                <div className={styles.input}>
                                    <div className={styles.field}>
                                        <select name="country" onChange={handleSelectChange} required>
                                            <option value="0" label="Select a country ... ">Select a country ... </option>
                                            <optgroup label="Africa">
                                                <option value="DZ" label="Algeria">Algeria</option>
                                                <option value="AO" label="Angola">Angola</option>
                                                <option value="BJ" label="Benin">Benin</option>
                                                <option value="BW" label="Botswana">Botswana</option>
                                                <option value="BF" label="Burkina Faso">Burkina Faso</option>
                                                <option value="BI" label="Burundi">Burundi</option>
                                                <option value="CM" label="Cameroon">Cameroon</option>
                                                <option value="CV" label="Cape Verde">Cape Verde</option>
                                                <option value="CF" label="Central African Republic">Central African Republic</option>
                                                <option value="TD" label="Chad">Chad</option>
                                                <option value="KM" label="Comoros">Comoros</option>
                                                <option value="CG" label="Congo - Brazzaville">Congo - Brazzaville</option>
                                                <option value="CD" label="Congo - Kinshasa">Congo - Kinshasa</option>
                                                <option value="CI" label="Côte d’Ivoire">Côte d’Ivoire</option>
                                                <option value="DJ" label="Djibouti">Djibouti</option>
                                                <option value="EG" label="Egypt">Egypt</option>
                                                <option value="GQ" label="Equatorial Guinea">Equatorial Guinea</option>
                                                <option value="ER" label="Eritrea">Eritrea</option>
                                                <option value="ET" label="Ethiopia">Ethiopia</option>
                                                <option value="GA" label="Gabon">Gabon</option>
                                                <option value="GM" label="Gambia">Gambia</option>
                                                <option value="GH" label="Ghana">Ghana</option>
                                                <option value="GN" label="Guinea">Guinea</option>
                                                <option value="GW" label="Guinea-Bissau">Guinea-Bissau</option>
                                                <option value="KE" label="Kenya">Kenya</option>
                                                <option value="LS" label="Lesotho">Lesotho</option>
                                                <option value="LR" label="Liberia">Liberia</option>
                                                <option value="LY" label="Libya">Libya</option>
                                                <option value="MG" label="Madagascar">Madagascar</option>
                                                <option value="MW" label="Malawi">Malawi</option>
                                                <option value="ML" label="Mali">Mali</option>
                                                <option value="MR" label="Mauritania">Mauritania</option>
                                                <option value="MU" label="Mauritius">Mauritius</option>
                                                <option value="YT" label="Mayotte">Mayotte</option>
                                                <option value="MA" label="Morocco">Morocco</option>
                                                <option value="MZ" label="Mozambique">Mozambique</option>
                                                <option value="NA" label="Namibia">Namibia</option>
                                                <option value="NE" label="Niger">Niger</option>
                                                <option value="NG" label="Nigeria">Nigeria</option>
                                                <option value="RW" label="Rwanda">Rwanda</option>
                                                <option value="RE" label="Réunion">Réunion</option>
                                                <option value="SH" label="Saint Helena">Saint Helena</option>
                                                <option value="SN" label="Senegal">Senegal</option>
                                                <option value="SC" label="Seychelles">Seychelles</option>
                                                <option value="SL" label="Sierra Leone">Sierra Leone</option>
                                                <option value="SO" label="Somalia">Somalia</option>
                                                <option value="ZA" label="South Africa">South Africa</option>
                                                <option value="SD" label="Sudan">Sudan</option>
                                                <option value="SZ" label="Swaziland">Swaziland</option>
                                                <option value="ST" label="São Tomé and Príncipe">São Tomé and Príncipe</option>
                                                <option value="TZ" label="Tanzania">Tanzania</option>
                                                <option value="TG" label="Togo">Togo</option>
                                                <option value="TN" label="Tunisia">Tunisia</option>
                                                <option value="UG" label="Uganda">Uganda</option>
                                                <option value="EH" label="Western Sahara">Western Sahara</option>
                                                <option value="ZM" label="Zambia">Zambia</option>
                                                <option value="ZW" label="Zimbabwe">Zimbabwe</option>
                                            </optgroup>
                                            <optgroup label="Americas">
                                                <option value="AI" label="Anguilla">Anguilla</option>
                                                <option value="AG" label="Antigua and Barbuda">Antigua and Barbuda</option>
                                                <option value="AR" label="Argentina">Argentina</option>
                                                <option value="AW" label="Aruba">Aruba</option>
                                                <option value="BS" label="Bahamas">Bahamas</option>
                                                <option value="BB" label="Barbados">Barbados</option>
                                                <option value="BZ" label="Belize">Belize</option>
                                                <option value="BM" label="Bermuda">Bermuda</option>
                                                <option value="BO" label="Bolivia">Bolivia</option>
                                                <option value="BR" label="Brazil">Brazil</option>
                                                <option value="VG" label="British Virgin Islands">British Virgin Islands</option>
                                                <option value="CA" label="Canada">Canada</option>
                                                <option value="KY" label="Cayman Islands">Cayman Islands</option>
                                                <option value="CL" label="Chile">Chile</option>
                                                <option value="CO" label="Colombia">Colombia</option>
                                                <option value="CR" label="Costa Rica">Costa Rica</option>
                                                <option value="CU" label="Cuba">Cuba</option>
                                                <option value="DM" label="Dominica">Dominica</option>
                                                <option value="DO" label="Dominican Republic">Dominican Republic</option>
                                                <option value="EC" label="Ecuador">Ecuador</option>
                                                <option value="SV" label="El Salvador">El Salvador</option>
                                                <option value="FK" label="Falkland Islands">Falkland Islands</option>
                                                <option value="GF" label="French Guiana">French Guiana</option>
                                                <option value="GL" label="Greenland">Greenland</option>
                                                <option value="GD" label="Grenada">Grenada</option>
                                                <option value="GP" label="Guadeloupe">Guadeloupe</option>
                                                <option value="GT" label="Guatemala">Guatemala</option>
                                                <option value="GY" label="Guyana">Guyana</option>
                                                <option value="HT" label="Haiti">Haiti</option>
                                                <option value="HN" label="Honduras">Honduras</option>
                                                <option value="JM" label="Jamaica">Jamaica</option>
                                                <option value="MQ" label="Martinique">Martinique</option>
                                                <option value="MX" label="Mexico">Mexico</option>
                                                <option value="MS" label="Montserrat">Montserrat</option>
                                                <option value="AN" label="Netherlands Antilles">Netherlands Antilles</option>
                                                <option value="NI" label="Nicaragua">Nicaragua</option>
                                                <option value="PA" label="Panama">Panama</option>
                                                <option value="PY" label="Paraguay">Paraguay</option>
                                                <option value="PE" label="Peru">Peru</option>
                                                <option value="PR" label="Puerto Rico">Puerto Rico</option>
                                                <option value="BL" label="Saint Barthélemy">Saint Barthélemy</option>
                                                <option value="KN" label="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                                <option value="LC" label="Saint Lucia">Saint Lucia</option>
                                                <option value="MF" label="Saint Martin">Saint Martin</option>
                                                <option value="PM" label="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                                <option value="VC" label="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                                                <option value="SR" label="Suriname">Suriname</option>
                                                <option value="TT" label="Trinidad and Tobago">Trinidad and Tobago</option>
                                                <option value="TC" label="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                                <option value="VI" label="U.S. Virgin Islands">U.S. Virgin Islands</option>
                                                <option value="US" label="United States">United States</option>
                                                <option value="UY" label="Uruguay">Uruguay</option>
                                                <option value="VE" label="Venezuela">Venezuela</option>
                                            </optgroup>
                                            <optgroup label="Asia">
                                                <option value="AF" label="Afghanistan">Afghanistan</option>
                                                <option value="AM" label="Armenia">Armenia</option>
                                                <option value="AZ" label="Azerbaijan">Azerbaijan</option>
                                                <option value="BH" label="Bahrain">Bahrain</option>
                                                <option value="BD" label="Bangladesh">Bangladesh</option>
                                                <option value="BT" label="Bhutan">Bhutan</option>
                                                <option value="BN" label="Brunei">Brunei</option>
                                                <option value="KH" label="Cambodia">Cambodia</option>
                                                <option value="CN" label="China">China</option>
                                                <option value="GE" label="Georgia">Georgia</option>
                                                <option value="HK" label="Hong Kong SAR China">Hong Kong SAR China</option>
                                                <option value="IN" label="India">India</option>
                                                <option value="ID" label="Indonesia">Indonesia</option>
                                                <option value="IR" label="Iran">Iran</option>
                                                <option value="IQ" label="Iraq">Iraq</option>
                                                <option value="JP" label="Japan">Japan</option>
                                                <option value="JO" label="Jordan">Jordan</option>
                                                <option value="KZ" label="Kazakhstan">Kazakhstan</option>
                                                <option value="KW" label="Kuwait">Kuwait</option>
                                                <option value="KG" label="Kyrgyzstan">Kyrgyzstan</option>
                                                <option value="LA" label="Laos">Laos</option>
                                                <option value="LB" label="Lebanon">Lebanon</option>
                                                <option value="MO" label="Macau SAR China">Macau SAR China</option>
                                                <option value="MY" label="Malaysia">Malaysia</option>
                                                <option value="MV" label="Maldives">Maldives</option>
                                                <option value="MN" label="Mongolia">Mongolia</option>
                                                <option value="MM" label="Myanmar [Burma]">Myanmar [Burma]</option>
                                                <option value="NP" label="Nepal">Nepal</option>
                                                <option value="NT" label="Neutral Zone">Neutral Zone</option>
                                                <option value="KP" label="North Korea">North Korea</option>
                                                <option value="OM" label="Oman">Oman</option>
                                                <option value="PK" label="Pakistan">Pakistan</option>
                                                <option value="PS" label="Palestinian Territories">Palestinian Territories</option>
                                                <option value="YD" label="People's Democratic Republic of Yemen">People's Democratic Republic of Yemen</option>
                                                <option value="PH" label="Philippines">Philippines</option>
                                                <option value="QA" label="Qatar">Qatar</option>
                                                <option value="SA" label="Saudi Arabia">Saudi Arabia</option>
                                                <option value="SG" label="Singapore">Singapore</option>
                                                <option value="KR" label="South Korea">South Korea</option>
                                                <option value="LK" label="Sri Lanka">Sri Lanka</option>
                                                <option value="SY" label="Syria">Syria</option>
                                                <option value="TW" label="Taiwan">Taiwan</option>
                                                <option value="TJ" label="Tajikistan">Tajikistan</option>
                                                <option value="TH" label="Thailand">Thailand</option>
                                                <option value="TL" label="Timor-Leste">Timor-Leste</option>
                                                <option value="TR" label="Turkey">Turkey</option>
                                                <option value="TM" label="Turkmenistan">Turkmenistan</option>
                                                <option value="AE" label="United Arab Emirates">United Arab Emirates</option>
                                                <option value="UZ" label="Uzbekistan">Uzbekistan</option>
                                                <option value="VN" label="Vietnam">Vietnam</option>
                                                <option value="YE" label="Yemen">Yemen</option>
                                            </optgroup>
                                            <optgroup label="Europe">
                                                <option value="AL" label="Albania">Albania</option>
                                                <option value="AD" label="Andorra">Andorra</option>
                                                <option value="AT" label="Austria">Austria</option>
                                                <option value="BY" label="Belarus">Belarus</option>
                                                <option value="BE" label="Belgium">Belgium</option>
                                                <option value="BA" label="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                                <option value="BG" label="Bulgaria">Bulgaria</option>
                                                <option value="HR" label="Croatia">Croatia</option>
                                                <option value="CY" label="Cyprus">Cyprus</option>
                                                <option value="CZ" label="Czech Republic">Czech Republic</option>
                                                <option value="DK" label="Denmark">Denmark</option>
                                                <option value="DD" label="East Germany">East Germany</option>
                                                <option value="EE" label="Estonia">Estonia</option>
                                                <option value="FO" label="Faroe Islands">Faroe Islands</option>
                                                <option value="FI" label="Finland">Finland</option>
                                                <option value="FR" label="France">France</option>
                                                <option value="DE" label="Germany">Germany</option>
                                                <option value="GI" label="Gibraltar">Gibraltar</option>
                                                <option value="GR" label="Greece">Greece</option>
                                                <option value="GG" label="Guernsey">Guernsey</option>
                                                <option value="HU" label="Hungary">Hungary</option>
                                                <option value="IS" label="Iceland">Iceland</option>
                                                <option value="IE" label="Ireland">Ireland</option>
                                                <option value="IM" label="Isle of Man">Isle of Man</option>
                                                <option value="IT" label="Italy">Italy</option>
                                                <option value="JE" label="Jersey">Jersey</option>
                                                <option value="LV" label="Latvia">Latvia</option>
                                                <option value="LI" label="Liechtenstein">Liechtenstein</option>
                                                <option value="LT" label="Lithuania">Lithuania</option>
                                                <option value="LU" label="Luxembourg">Luxembourg</option>
                                                <option value="MK" label="Macedonia">Macedonia</option>
                                                <option value="MT" label="Malta">Malta</option>
                                                <option value="FX" label="Metropolitan France">Metropolitan France</option>
                                                <option value="MD" label="Moldova">Moldova</option>
                                                <option value="MC" label="Monaco">Monaco</option>
                                                <option value="ME" label="Montenegro">Montenegro</option>
                                                <option value="NL" label="Netherlands">Netherlands</option>
                                                <option value="NO" label="Norway">Norway</option>
                                                <option value="PL" label="Poland">Poland</option>
                                                <option value="PT" label="Portugal">Portugal</option>
                                                <option value="RO" label="Romania">Romania</option>
                                                <option value="RU" label="Russia">Russia</option>
                                                <option value="SM" label="San Marino">San Marino</option>
                                                <option value="RS" label="Serbia">Serbia</option>
                                                <option value="CS" label="Serbia and Montenegro">Serbia and Montenegro</option>
                                                <option value="SK" label="Slovakia">Slovakia</option>
                                                <option value="SI" label="Slovenia">Slovenia</option>
                                                <option value="ES" label="Spain">Spain</option>
                                                <option value="SJ" label="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                                <option value="SE" label="Sweden">Sweden</option>
                                                <option value="CH" label="Switzerland">Switzerland</option>
                                                <option value="UA" label="Ukraine">Ukraine</option>
                                                <option value="SU" label="Union of Soviet Socialist Republics">Union of Soviet Socialist Republics</option>
                                                <option value="GB" label="United Kingdom">United Kingdom</option>
                                                <option value="VA" label="Vatican City">Vatican City</option>
                                                <option value="AX" label="Åland Islands">Åland Islands</option>
                                            </optgroup>
                                            <optgroup label="Oceania">
                                                <option value="AS" label="American Samoa">American Samoa</option>
                                                <option value="AQ" label="Antarctica">Antarctica</option>
                                                <option value="AU" label="Australia">Australia</option>
                                                <option value="BV" label="Bouvet Island">Bouvet Island</option>
                                                <option value="IO" label="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                                <option value="CX" label="Christmas Island">Christmas Island</option>
                                                <option value="CC" label="Cocos [Keeling] Islands">Cocos [Keeling] Islands</option>
                                                <option value="CK" label="Cook Islands">Cook Islands</option>
                                                <option value="FJ" label="Fiji">Fiji</option>
                                                <option value="PF" label="French Polynesia">French Polynesia</option>
                                                <option value="TF" label="French Southern Territories">French Southern Territories</option>
                                                <option value="GU" label="Guam">Guam</option>
                                                <option value="HM" label="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
                                                <option value="KI" label="Kiribati">Kiribati</option>
                                                <option value="MH" label="Marshall Islands">Marshall Islands</option>
                                                <option value="FM" label="Micronesia">Micronesia</option>
                                                <option value="NR" label="Nauru">Nauru</option>
                                                <option value="NC" label="New Caledonia">New Caledonia</option>
                                                <option value="NZ" label="New Zealand">New Zealand</option>
                                                <option value="NU" label="Niue">Niue</option>
                                                <option value="NF" label="Norfolk Island">Norfolk Island</option>
                                                <option value="MP" label="Northern Mariana Islands">Northern Mariana Islands</option>
                                                <option value="PW" label="Palau">Palau</option>
                                                <option value="PG" label="Papua New Guinea">Papua New Guinea</option>
                                                <option value="PN" label="Pitcairn Islands">Pitcairn Islands</option>
                                                <option value="WS" label="Samoa">Samoa</option>
                                                <option value="SB" label="Solomon Islands">Solomon Islands</option>
                                                <option value="GS" label="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                                                <option value="TK" label="Tokelau">Tokelau</option>
                                                <option value="TO" label="Tonga">Tonga</option>
                                                <option value="TV" label="Tuvalu">Tuvalu</option>
                                                <option value="UM" label="U.S. Minor Outlying Islands">U.S. Minor Outlying Islands</option>
                                                <option value="VU" label="Vanuatu">Vanuatu</option>
                                                <option value="WF" label="Wallis and Futuna">Wallis and Futuna</option>
                                            </optgroup>
                                        </select>
                                        {addressErrors.country ? <span className={styles.error}>{addressErrors.country}</span> : <></>}
                                    </div>
                                </div>
                                <div className={styles.input}>
                                    <div className={styles.field}>
                                        <input type="text" name="firstName" id="" placeholder="First Name" onChange={handleAddressChange} required />
                                        {addressErrors.firstName ? <span className={styles.error}>{addressErrors.firstName}</span> : <></>}
                                    </div>
                                    <div className={styles.field}>
                                        <input type="text" name="lastName" id="" placeholder="Last Name" onChange={handleAddressChange} required />
                                        {addressErrors.lastName ? <span className={styles.error}>{addressErrors.lastName}</span> : <></>}
                                    </div>
                                </div>
                                <div className={styles.input}>
                                    <div className={styles.field}>
                                        <input type="text" name="address" id="" placeholder="Address" onChange={handleAddressChange} required />
                                        {addressErrors.address ? <span className={styles.error}>{addressErrors.address}</span> : <></>}
                                    </div>
                                </div>
                                <div className={styles.input}>
                                    <input type="text" name="apartment" id="" placeholder="Apartment,suite, etc. (optional)" onChange={handleAddressChange} />
                                </div>
                                <div className={styles.input}>
                                    <div className={styles.field}>
                                        <input type="text" name="city" id="" placeholder="City" onChange={handleAddressChange} required />
                                        {addressErrors.city ? <span className={styles.error}>{addressErrors.city}</span> : <></>}
                                    </div>
                                    <div className={styles.field}>
                                        <input type="text" name="county" id="" placeholder="County" onChange={handleAddressChange} required />
                                        {addressErrors.county ? <span className={styles.error}>{addressErrors.county}</span> : <></>}
                                    </div>
                                    <div className={styles.field}>
                                        <input type="text" name="postcode" id="" placeholder="Postcode" onChange={handleAddressChange} required />
                                        {addressErrors.postcode ? <span className={styles.error}>{addressErrors.postcode}</span> : <></>}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.buttons}>
                                <button className={styles.return}><span className={styles.right}>&#8249;</span> Return to cart</button>
                                <button className={styles.shipping_button}>Continue to payment</button>
                            </div>
                        </form>
                        :
                        <form action="" className={styles.form} ref={form} onSubmit={handleCardSubmit}>
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
                                <button className={styles.return}><span className={styles.right}>&#8249;</span> Return to shipping</button>
                                <button className={styles.shipping_button} onClick={e => setFormStage("payment")}>Continue to payment</button>
                            </div>
                        </form>
                }
            </div>
            <div className={styles.list_column}>
                <div className={styles.items_container}>
                    {
                        cartItems.map(item => <ListItem key={item.id} id={item.id} quantity={item.quantity} />)
                    }
                </div>
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
