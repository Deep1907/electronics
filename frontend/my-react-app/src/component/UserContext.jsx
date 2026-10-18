import { createContext,useState } from 'react';

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [uname,setUname] = useState(localStorage.getItem("username") || "")
    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true")


    

    return(
        <UserContext.Provider value={{ uname,setUname,isLoggedIn,setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}
