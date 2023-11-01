import { createContext, useState } from "react";

export const primaryContext = createContext();


const PrimaryProvider = ({ children }) => {

    // over arching state... users, threads, token, setToken
    const [users, setUsers] = useState([]);

    // return provider div
    return (
        <primaryContext.Provider
            value={
                {
                    users,
                    setUsers
                }
            } >
            {children}
        </primaryContext.Provider>
    )
};

export default PrimaryProvider;