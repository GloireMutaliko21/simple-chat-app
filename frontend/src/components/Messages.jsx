import React from 'react'
import { NavLink } from "react-router-dom";

import { useStateContext } from '../context/ContextProvider';
import { fetchData, fetchMessages } from '../hook/useFecth';
import { HiUser } from 'react-icons/hi';

const Messages = () => {
    const { relatedUsers, serRelatedUsers, setMessagesList } = useStateContext();

    const [messages] = fetchData(relatedUsers, serRelatedUsers, `/messages/messages`);

    const userId = localStorage.getItem('id')

    const relatedMessages = messages.messages;
    const date = new Date().toLocaleDateString();
    const completeDate = new Date();

    return (
        <div className='flex flex-col justify-start'>
            <h1 className="text-3xl text-teal-800 font-black my-4">Messages</h1>
            <div className="ml-5">
                {
                    relatedMessages?.map(
                        ({ _id, senderId, receiverId, talkers, content, createdAt }) => {
                            const msgCompleteDate = new Date(createdAt);
                            const msgTime = new Date(createdAt).toLocaleTimeString();
                            const msgDate = new Date(createdAt).toLocaleDateString();
                            const user = talkers[0] === userId ? receiverId._id : senderId._id;
                            return (
                                <div key={_id} onClick={() => fetchMessages(user, setMessagesList)} className='cursor-pointer'>
                                    <div className="flex justify-center items-center my-2">
                                        <div>
                                            <HiUser className="h-12 w-12 text-gray-500 border p-1 rounded-full" />
                                        </div>
                                        <div className='mx-4 w-full border-b'>
                                            <p className="font-extrabold overflow-hidden text-base">{talkers[0] === userId ? receiverId.username : senderId.username}</p>
                                            <div>
                                                <div className='flex justify-between items-center'>
                                                    <p className='mr-3 text-gray-600 w-[100px] overflow-hidden h-6'>{content}</p>
                                                    <p className='text-xs text-teal-700'>
                                                        {msgDate === date ?
                                                            msgTime.substring(0, 5) :
                                                            completeDate.getDate() - 1 === msgCompleteDate.getDate() ? 'Hier' : msgDate
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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