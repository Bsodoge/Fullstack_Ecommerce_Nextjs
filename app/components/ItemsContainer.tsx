import { ICartItem } from "../interfaces/ICartItem";
import styles from "./ItemsContainer.module.css";
import ListItem from "./ListItem";

interface props{
    cartItems: ICartItem[],

}

export default function ItemsContainer({cartItems} : props) {
    return (
        <div className={styles.items_container}>
            {
                cartItems.map(item => <ListItem key={item.id} id={item.id} quantity={item.quantity} />)
            }
        </div>
    )
}