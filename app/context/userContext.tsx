'use client'

import { Dispatch, ReactNode, SetStateAction, useContext, useState, createContext } from "react";

const UserContext = createContext({} as userContext);

interface props {
    children: ReactNode
}

interface userContext {
    loggedIn: boolean,
    setLoggedIn: Dispatch<SetStateAction<boolean>>
}

export function UserContextProvider({ children }: props) {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider >
    )
}

export function useUser(){
    return useContext(UserContext);
}