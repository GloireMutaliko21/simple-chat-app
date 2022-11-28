import { useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { BsDot } from 'react-icons/bs';

import { useStateContext } from '../context/ContextProvider';
import { fetchData, fetchMessages, onlineSocket } from '../hook/useFecth';
import RelatedMsg from './Loaders/RelatedMsg';
import defaultPrfl from '../../public/images/defaultPrfl.png';

const Messages = () => {

    const [selected, setSelected] = useState(false);

    const { relatedUsers, serRelatedUsers, setMessagesList, setBoolingState, boolingState, userData, messagesRef, contactsShown, setContactsShown } = useStateContext();

    const [messages] = fetchData(relatedUsers, serRelatedUsers, `/messages/messages`);


    const userId = userData._id;

    const relatedMessages = messages.messages;
    const date = new Date().toLocaleDateString();
    const completeDate = new Date();

    const handleShowContactList = () => {
        setContactsShown(true);
    };
    onlineSocket();

    return (
        <div className='ml-3 h-screen md:overflow-hidden relative overflow-auto md:hover:overflow-auto pb-24'>
            <div className='fixed md:absolute bg-white z-10 left-4 md:left-0 right-4 pb-4 flex justify-between'>
                <h1 className="text-2xl text-teal-800 font-black ">Messages</h1>
                <p className="text-2xl text-teal-800 font-black cursor-pointer ">
                    <IoCreateOutline

                        onClick={handleShowContactList}
                    />
                </p>
            </div>

            <div className="mt-12 md:overflow-y-scroll md:absolute md:top-0 bottom-5 md:left-0 md:right-0 md:mb-[74px] md:pr-5">
                {
                    relatedMessages?.length > 0 ? relatedMessages?.map(
                        ({ _id, senderId, receiverId, talkers, content, createdAt }, idx) => {
                            const msgCompleteDate = new Date(createdAt);
                            const msgTime = new Date(createdAt).toLocaleTimeString();
                            const msgDate = new Date(createdAt).toLocaleDateString();
                            const user = talkers[0] === userId ? receiverId?._id : senderId?._id;
                            const receiver = talkers[0] === userId ? JSON.stringify(receiverId) : JSON.stringify(senderId);
                            const userImage = talkers[0] === userId ?
                                receiverId?.image?.url :
                                senderId?.image?.url;
                            const isLogged = talkers[0] === userId ? receiverId : senderId;

                            return (
                                <div
                                    key={_id}
                                    onClick={() => {
                                        fetchMessages(user, receiver, setMessagesList, setBoolingState, boolingState);
                                        messagesRef.current.classList.remove('z-20');
                                        setSelected(idx);
                                    }}
                                    className={`cursor-pointer md:py-px md:pl-2 hover:bg-teal-50 hover:text-teal-700 hover:pl-2 hover:duration-300 ${idx === selected ? 'bg-teal-50 text-teal-700' : 'bg-stone-50'}`}
                                >
                                    {<div className={`flex justify-between items-center my-2`}>
                                        <div className='h-12 w-12 relative'>

                                            <img
                                                src={`${userImage ? `${userImage}` : `${defaultPrfl}`}`} alt={talkers[0] === userId ? receiverId?.username[0] : senderId?.username[0]}
                                                className="h-10 w-10 border rounded-full object-cover object-center"
                                            />
                                            {isLogged?.isLogged === true && <BsDot className='absolute left-3 top-2 text-green-400 h-12 w-12' />}
                                        </div>
                                        <div className='mx-4 w-full border-b'>
                                            <p className="font-semibold overflow-hidden text-base">{talkers[0] === userId ? receiverId?.username : senderId?.username}</p>
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

export default Messages;