import React, { createContext, useContext, memo, useState, useRef, } from "react";

const StateContext = createContext();

export const ContextProvider = memo(({ children }) => {
    const userData = JSON.parse(localStorage.getItem('user'));

    const [boolingState, setBoolingState] = useState({
        loginStatus: false,
        isSignNotLog: false,
        isTimeToFetch: true,
        fetchData: true,
        showPassword: false,
    });

    const [users, setUsers] = useState([]);
    const [relatedUsers, serRelatedUsers] = useState([]);
    const [messagesList, setMessagesList] = useState([]);

    const rememberMe = useRef();

    return (
        <StateContext.Provider
            value={{
                userData,
                boolingState, setBoolingState,
                users, setUsers,
                relatedUsers, serRelatedUsers,
                rememberMe,
                messagesList, setMessagesList,
            }}
        >
            {children}
        </StateContext.Provider>
    );
});

export const useStateContext = () => useContext(StateContext);