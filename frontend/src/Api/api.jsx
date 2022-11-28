import { API_URL } from '../constants/apiUrl';

export async function postUser(reqParams, url, logStatus, state, fx) {
    try {
        const response = await fetch(`${API_URL}${url}`, reqParams);
        const responseData = await response.json();

        if (response.status === 201) {
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('user', JSON.stringify(responseData.user));
            logStatus(state);
            fx();
        }
    } catch (error) {
        console.log(reqParams);
        console.log(error);
    }
};