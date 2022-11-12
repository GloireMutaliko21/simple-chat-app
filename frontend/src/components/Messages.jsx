import React from 'react'
import { NavLink } from "react-router-dom";

import { useStateContext } from '../context/ContextProvider';
import { fetchData } from '../hook/useFecth';
import { HiUser } from 'react-icons/hi';
import { API_URL } from '../constants/apiUrl';

const Messages = () => {
    const { relatedUsers, serRelatedUsers, boolingState, setBoolingState, messagesList, setMessagesList } = useStateContext();

    const [messages] = fetchData(relatedUsers, serRelatedUsers, `/messages/messages`);

    const userId = localStorage.getItem('id')

    const relatedMessages = messages.messages;
    const date = new Date().toLocaleDateString();
    const completeDate = new Date();


    async function fetchMessages(userId) {
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
            }
            if (response.status === 401) {
                localStorage.removeItem('isLogged');
            }
        } catch (error) {
            setBoolingState({ ...boolingState, loginStatus: false });
        }
        console.log(messagesList)
    }

    return (
        <div className='flex flex-col justify-start'>
            <h1 className="text-3xl text-teal-800 font-black m-4">Messages</h1>
            <div className="ml-5">
                {
                    relatedMessages?.map(
                        ({ _id, senderId, receiverId, talkers, content, createdAt }) => {
                            const msgCompleteDate = new Date(createdAt);
                            const msgTime = new Date(createdAt).toLocaleTimeString();
                            const msgDate = new Date(createdAt).toLocaleDateString();
                            const user = talkers[0] === userId ? receiverId._id : senderId._id;
                            return (
                                <div onClick={() => fetchMessages(user)}>
                                    <NavLink to='/chat' key={_id} className="flex justify-center items-center my-2">
                                        <div>
                                            <HiUser className="h-12 w-12 text-gray-500 border p-1 rounded-full" />
                                        </div>
                                        <div className='mx-4 w-full'>
                                            <p className="font-extrabold overflow-hidden text-lg">{talkers[0] === userId ? receiverId.username : senderId.username}</p>
                                            <div>
                                                <div className='flex justify-between items-center'>
                                                    <p className='mr-3 text-gray-600'>{content}</p>
                                                    <p className='text-xs text-teal-700'>
                                                        {msgDate === date ?
                                                            msgTime.substring(0, 5) :
                                                            completeDate.getDate() - 1 === msgCompleteDate.getDate() ? 'Hier' : msgDate
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Messages