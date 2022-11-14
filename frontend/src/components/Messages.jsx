import React from 'react'
import { NavLink } from "react-router-dom";

import { useStateContext } from '../context/ContextProvider';
import { fetchData, fetchMessages } from '../hook/useFecth';
import { HiUser } from 'react-icons/hi';
import RelatedMsg from './Loaders/RelatedMsg';

const Messages = () => {
    const { relatedUsers, serRelatedUsers, setMessagesList, setBoolingState, boolingState, userData } = useStateContext();

    const [messages] = fetchData(relatedUsers, serRelatedUsers, `/messages/messages`);

    const userId = userData._id;

    const relatedMessages = messages.messages;
    const date = new Date().toLocaleDateString();
    const completeDate = new Date();

    return (
        <div className='flex flex-col justify-start relative overflow-scroll h-full'>
            <h1 className="text-2xl text-teal-800 font-black my-2">Messages</h1>
            <div className="overflow-scroll absolute top-10 bottom-0 left-0 right-0 mb-[74px]">
                {
                    relatedMessages?.length > 0 ? relatedMessages.map(
                        ({ _id, senderId, receiverId, talkers, content, createdAt }) => {
                            const msgCompleteDate = new Date(createdAt);
                            const msgTime = new Date(createdAt).toLocaleTimeString();
                            const msgDate = new Date(createdAt).toLocaleDateString();
                            const user = talkers[0] === userId ? receiverId._id : senderId._id;
                            const receiver = talkers[0] === userId ? JSON.stringify(receiverId) : JSON.stringify(senderId);
                            return (
                                <div key={_id} onClick={() => fetchMessages(user, receiver, setMessagesList, setBoolingState, boolingState)} className='cursor-pointer'>
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
                    ) : <RelatedMsg />
                }
            </div>
        </div>
    )
}

export default Messages