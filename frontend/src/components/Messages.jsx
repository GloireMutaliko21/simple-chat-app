import React from 'react'
import { useStateContext } from '../context/ContextProvider';
import { fetchData } from '../hook/useFecth';

const Messages = () => {
    const { relatedUsers, serRelatedUsers } = useStateContext();
    const userId = localStorage.getItem('id')
    const [messages] = fetchData(relatedUsers, serRelatedUsers, `/messages/messages/${userId}`);
    console.log(messages);
    return (
        <div className='flex flex-col justify-start'>
            <h1 className="text-3xl text-teal-800 font-black m-4">Messages</h1>

        </div>
    )
}

export default Messages