import React from 'react'
import { useStateContext } from '../context/ContextProvider';
import { fetchData } from '../hook/useFecth';
import { HiUser } from 'react-icons/hi';

const Messages = () => {
    const { relatedUsers, serRelatedUsers } = useStateContext();
    const userId = localStorage.getItem('id')
    const [messages] = fetchData(relatedUsers, serRelatedUsers, `/messages/messages`);
    // console.log(messages);
    const friends = messages.friends;
    const relatedMessages = messages.messages;
    let user;
    return (
        <div className='flex flex-col justify-start'>
            <h1 className="text-3xl text-teal-800 font-black m-4">Messages</h1>
            <div className="ml-5 overflow-scroll">
                {
                    friends?.map(({ _id, username }) => <div key={_id} className="flex items-center my-2">
                        <HiUser className="h-14 w-14 text-gray-500 border p-1 rounded-full" />
                        <div className='ml-4'>
                            <p className="font-extrabold overflow-hidden text-lg">{username}</p>
                            <div>
                                {relatedMessages.map((message, idx) =>
                                    <div key={idx}>
                                        {
                                            message.talkers.includes(_id) &&
                                            <div className='flex items-center'>
                                                <p className='mr-3'>{message.content}</p>
                                                <p className='text-xs'>{message.createdAt.substring(11, 16)}</p>
                                            </div>
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Messages