import { createContext, useContext } from "react"
import { useState } from "react";

const AuthContext = createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider=({children})=>{
    const [authUser,setAuthUser]=useState({
        user:null,
        type:null
    });
    return <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>
}