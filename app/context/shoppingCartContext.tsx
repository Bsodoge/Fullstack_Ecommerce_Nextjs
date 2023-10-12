'use client'

import { useContext, createContext, ReactNode, useState } from "react";

const ShoppingCartContext = createContext({} as shoppingCartContext);

interface cartItem {
    id: number,
    quantity: number
}

interface props {
    children: ReactNode
}

interface shoppingCartContext {
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    showCart: boolean,
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>,
    cartItems: cartItem[]
}


export function ShoppingCartProvider({ children }: props) {
    const [showCart, setShowCart] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<cartItem[]>([]);
    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }
    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)
    const increaseCartQuantity = (id: number) => {
        setCartItems(prevCartItems => {
            if (!prevCartItems.find(item => item.id === id)) {
                return [...prevCartItems, { id, quantity: 1 }]
            }
            return prevCartItems.map(items => {
                if (items.id === id) return { ...items, quantity: items.quantity++ };
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
    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartQuantity, showCart, setShowCart, cartItems }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}