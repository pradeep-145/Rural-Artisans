import { Children, createContext, useState , useContext } from "react";

const productContext = createContext();


export const useProducts=()=>{
    return useContext(productContext);
}

export const ProductContextProvider=({children})=>{
    const [products,setProducts]=useState();
    return <productContext.Provider value={{products,setProducts}}>{children}</productContext.Provider>
}