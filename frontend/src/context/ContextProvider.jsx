import React, { createContext, useContext, memo, useState, useRef, } from "react";


const StateContext = createContext();

export const ContextProvider = memo(({ children }) => {
    const [boolingState, setBoolingState] = useState({
        loginStatus: false,
        isSignNotLog: false,
        isTimeToFetch: true,
        showPassword: false,
    })
    return (
        <StateContext.Provider
            value={{
                boolingState, setBoolingState
            }}
        >
            {children}
        </StateContext.Provider>
    );
});

export const useStateContext = () => useContext(StateContext);