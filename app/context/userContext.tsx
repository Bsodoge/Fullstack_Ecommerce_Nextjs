'use client'

import { Dispatch, ReactNode, SetStateAction, useContext, useState, createContext } from "react";

const UserContext = createContext({} as userContext);

interface props {
    children: ReactNode
}

interface userContext {
    loggedIn: boolean,
    userID: number | undefined,
    setUserID: Dispatch<SetStateAction<number | undefined>>
    setLoggedIn: Dispatch<SetStateAction<boolean>>
}

export function UserContextProvider({ children }: props) {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userID, setUserID] = useState<number | undefined>(undefined);
    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn, userID, setUserID }}>
            {children}
        </UserContext.Provider >
    )
}

export function useUser(){
    return useContext(UserContext);
}