import { createContext, useState } from "react";

export const primaryContext = createContext();


const PrimaryProvider = ({ children }) => {

    // over arching state... users, threads, token, setToken
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // return provider div
    return (
        <primaryContext.Provider
            value={
                {
                    users, setUsers,
                    isLoggedIn, setIsLoggedIn
                }
            } >
            {children}
        </primaryContext.Provider>
    )
};

export default PrimaryProvider;