import React, { createContext, useContext, memo, useState, useRef, } from "react";


const StateContext = createContext();

export const ContextProvider = memo(({ children }) => {
    const [boolingState, setBoolingState] = useState({
        loginStatus: false,
        isSignNotLog: false,
        isTimeToFetch: true,
        fetchData: true,
        showPassword: false,
    });

    const [users, setUsers] = useState([])

    return (
        <StateContext.Provider
            value={{
                boolingState, setBoolingState,
                users, setUsers
            }}
        >
            {children}
        </StateContext.Provider>
    );
});

export const useStateContext = () => useContext(StateContext);