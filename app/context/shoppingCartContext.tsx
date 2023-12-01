'use client'

import { useContext, createContext, ReactNode, useState } from "react";
import { ICartItem } from "../interfaces/ICartItem";

const ShoppingCartContext = createContext({} as shoppingCartContext);



interface props {
    children: ReactNode
}

interface shoppingCartContext {
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number, quantity?: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    showCart: boolean,
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>,
    cartItems: ICartItem[],
    setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>,
    emptyCart: () => void
}


export function ShoppingCartProvider({ children }: props) {
    const [showCart, setShowCart] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }
    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)
    const increaseCartQuantity = (id: number, quantity?: number) => {
        quantity = quantity || 1;
        setCartItems(prevCartItems => {
            if (!prevCartItems.find(item => item.id === id)) {
                return [...prevCartItems, { id, quantity: quantity! }]
            }
            return prevCartItems.map(items => {
                if (items.id === id) return { ...items, quantity: items.quantity + quantity! };
                return items;
            })
        })
    }
    const decreaseCartQuantity = (id: number) => {
        setCartItems(prevCartItems => {
            if (prevCartItems.find(item => item.id === id)?.quantity === 1) {
                return prevCartItems.filter(item => item.id !== id)
            }
            return prevCartItems.map(items => {
                if (items.id === id) return { ...items, quantity: items.quantity-- };
                return items;
            })
        })
    }
    const removeFromCart = (id: number) => {
        setCartItems(prevCartItems => {
            return prevCartItems.filter(item => item.id !== id)
        })
    }
    const emptyCart = () => {
        setCartItems([]);
    }
    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartQuantity, showCart, setShowCart, cartItems , setCartItems, emptyCart}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}