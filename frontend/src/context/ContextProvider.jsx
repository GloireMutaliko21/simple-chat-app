import React, { createContext, useContext, memo, useState, useRef, } from "react";


const StateContext = createContext();

export const ContextProvider = memo(({ children }) => {

    return (
        <StateContext.Provider
            value={{

            }}
        >
            {children}
        </StateContext.Provider>
    );
});

export const useStateContext = () => useContext(StateContext);