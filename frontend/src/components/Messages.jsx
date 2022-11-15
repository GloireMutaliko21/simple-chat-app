import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
        <div className='relative top-20 md:top-2 right-3 left-3 overflow-auto h-full'>
            {/* <div className='flex flex-col justify-start relative md:relative overflow-scroll h-full'> */}
            <div className=''>
                <h1 className="text-lg md:text-2xl text-teal-800 font-black">Messages</h1>
            </div>
            {/* <h1 className="text-2xl text-teal-800 font-black my-2 absolute top-14 md:top-auto left-3">Messages</h1> */}
            <div className="">
                {/* <div className="overflow-scroll absolute md:top-10 bottom-0 left-5 md:left-0 right-3 md:right-0 mb-[74px]"> */}
                {
                    relatedMessages?.length > 0 ? relatedMessages.map(
                        ({ _id, senderId, receiverId, talkers, content, createdAt }) => {
                            const msgCompleteDate = new Date(createdAt);
                            const msgTime = new Date(createdAt).toLocaleTimeString();
                            const msgDate = new Date(createdAt).toLocaleDateString();
                            const user = talkers[0] === userId ? receiverId._id : senderId._id;
                            const receiver = talkers[0] === userId ? JSON.stringify(receiverId) : JSON.stringify(senderId);
                            return (
                                <div key={_id} onClick={() => fetchMessages(user, receiver, setMessagesList, setBoolingState, boolingState)} className={`cursor-pointer hover:bg-teal-100 hover:rounded-xl hover:text-teal-700 hover:pl-2 hover:duration-1000`}>
                                    {<div className={`flex justify-center items-center my-2`}>
                                        <div>
                                            <HiUser className="h-12 w-12 text-gray-500 border p-1 rounded-full" />
                                        </div>
                                        <div className='mx-4 w-full border-b'>
                                            <p className="font-semibold overflow-hidden text-base">{talkers[0] === userId ? receiverId.username : senderId.username}</p>
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
                                    </div>}
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