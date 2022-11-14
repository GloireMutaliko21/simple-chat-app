import { useEffect } from "react";
import openSocket from "socket.io-client";

import { useStateContext } from "../context/ContextProvider";
import { API_URL } from '../constants/apiUrl';

export function fetchData(data, setData, url) {
    const { boolingState, setBoolingState, messagesList, setMessagesList } = useStateContext();
    useEffect(() => {
        // const socket = openSocket(`http://localhost:5501`);

        // socket.on('messages', data => {
        //     if (data.action === 'sending')
        // });

        const socket = openSocket(`http://localhost:5501`);

        socket.on('messages', data => {
            if (data.key === 'sending') {
                setMessagesList([...messagesList, data.message]);
            }
        });

        const controller = new AbortController();
        const signal = controller.signal;

        (async function () {
            const paramsData = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };
            try {
                const response = await fetch(`${API_URL}${url}`, paramsData, { signal });
                const responseData = await response.json();
                if (response.status === 200) {
                    await setData(responseData.data);
                    setBoolingState({ ...boolingState, fetchData: false });
                }
                if (response.status === 401) {
                    setBoolingState({ ...boolingState, loginStatus: false });
                    localStorage.removeItem('isLogged');
                }
            } catch (error) {
                setBoolingState({ ...boolingState, loginStatus: false });
                // localStorage.removeItem('isLogged');
            }
        })();


        return () => {
            controller.abort();
            setBoolingState({ ...boolingState, fetchData: false })
        }
    }, [boolingState.fetchData, messagesList]);
    return [data];
}
export async function fetchMessages(userId, setMessagesList, setBoolingState, boolingState) {
    const controller = new AbortController();
    const signal = controller.signal;

    const paramsData = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    try {
        const response = await fetch(`${API_URL}/messages/messages/${userId}`, paramsData, { signal });
        const responseData = await response.json();
        if (response.status === 200) {
            await setMessagesList(responseData.data);
            localStorage.setItem('receiverId', userId);
        }
        if (response.status === 401) {
            localStorage.removeItem('isLogged');
        }
    } catch (error) {
        setBoolingState({ ...boolingState, loginStatus: false });
    }
}