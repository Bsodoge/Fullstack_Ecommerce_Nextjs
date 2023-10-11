'use client'

import { useContext, createContext, ReactNode } from "react";

const ShoppingCartContext = createContext({});

interface props {
    children: ReactNode
}

export function ShoppingCartProvider({children} : props){
    return(
        <ShoppingCartContext.Provider value={{}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}