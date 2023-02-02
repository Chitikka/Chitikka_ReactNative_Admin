import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    aunthenticate: ()=>{},
    logOut: ()=> {}
})

export const AuthContextProvider = ({children}) => {
    const [authToken, setAuthToken] = useState()

    const authenticate = (token) => {
        setAuthToken(token)
    }

    const logOut = () => {
        setAuthToken(null)
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
