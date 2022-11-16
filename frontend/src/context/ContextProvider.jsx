import React, { createContext, useContext, memo, useState, useRef, } from "react";

const StateContext = createContext();

export const ContextProvider = memo(({ children }) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const receiverData = JSON.parse(localStorage.getItem('receiver'));

    const [boolingState, setBoolingState] = useState({
        loginStatus: false,
        isSignNotLog: false,
        isTimeToFetch: true,
        fetchData: true,
        showPassword: false,
        showContactList: false,
        showProfileMenu: false
    });

    const [users, setUsers] = useState([]);
    const [loginStatus, setLoginStatus] = useState(false);
    const [relatedUsers, serRelatedUsers] = useState([]);
    const [messagesList, setMessagesList] = useState([]);

    const handleChangeShowProfMenu = () => {
        setBoolingState(prevState => { return { ...prevState, showProfileMenu: !prevState.showProfileMenu } })
    }

    const rememberMe = useRef();
    const messagesRef = useRef();
    const chatRef = useRef();

    return (
        <StateContext.Provider
            value={{
                userData, receiverData,
                boolingState, setBoolingState,
                loginStatus, setLoginStatus,
                handleChangeShowProfMenu,
                users, setUsers,
                relatedUsers, serRelatedUsers,
                rememberMe, messagesRef, chatRef,
                messagesList, setMessagesList,
            }}
        >
            {children}
        </StateContext.Provider>
    );
});

export const useStateContext = () => useContext(StateContext);