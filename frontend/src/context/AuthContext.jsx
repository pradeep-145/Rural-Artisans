import { createContext, useContext } from "react"
import { useState } from "react";

const AuthContext = createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider=({children})=>{
    const [authUser,setAuthUser]=useState({
        user:JSON.parse(localStorage.getItem('authUser'))||null,
        type: localStorage.getItem('type') ||null
    });
    return <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>
}