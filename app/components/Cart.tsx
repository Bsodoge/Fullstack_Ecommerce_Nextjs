import styles from "./Cart.module.css"

interface props{
    showCart: boolean
}

export default function Cart({showCart} : props){
    return(
        <div className={`${styles.cart_container} ${ showCart && styles.active}`}>

        </div>
    )
}