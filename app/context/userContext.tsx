import { Dispatch, ReactNode, SetStateAction, useContext, useState, createContext } from "react";


const userContext = createContext({} as userContext);

interface props {
    children: ReactNode
}

interface userContext {
    loggedIn: boolean,
    setLoggedIn: Dispatch<SetStateAction<boolean>>
}

export function userContextProvider({ children }: props) {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    return (
        <userContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </userContext.Provider >
    )
}

export function useUser(){
    return useContext(userContext);
}