import { createContext, useState } from "react";

export const primaryContext = createContext();


const PrimaryProvider = ({ children }) => {

    // state


    // return provider div
    return (
        <primaryContext.Provider
            value={
                {

                }
            } >
            {children}
        </primaryContext.Provider>
    )
};

export default PrimaryProvider;