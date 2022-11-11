import { useEffect } from "react";

import { useStateContext } from "../context/ContextProvider";
import { API_URL } from '../constants/apiUrl';

export function fetchData(data, setData, url) {
    const { boolingState, setBoolingState } = useStateContext();
    useEffect(() => {
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
                if (response.status === 403) {
                    setBoolingState({ ...boolingState, loginStatus: false });
                    // localStorage.removeItem('isLogged');
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
    }, [boolingState.fetchData]);
    return [data];
}