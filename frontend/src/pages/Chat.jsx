import { useState, useMemo, useEffect } from 'react';
import { CiMicrophoneOn } from "react-icons/ci";
import { MdSend, MdArrowBackIosNew } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";

import { useStateContext } from "../context/ContextProvider";
import "../../public/css/message.css";
import { API_URL } from '../constants/apiUrl';

const Chat = () => {
    const [msgContent, setMsgContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const { relatedUsers, messagesList, userData, receiverData, messagesRef, chatRef } = useStateContext();

    useEffect(() => {
        chatRef.current?.scrollTo({
            behavior: 'smooth',
            top: chatRef.current.scrollHeight
        });

    }, [messagesList]);

    const userId = userData._id;
    const receiverId = localStorage.getItem('receiverId');

    const date = new Date().toLocaleDateString();
    const completeDate = new Date();

    const handleChange = useMemo(() =>
        (e) => setMsgContent(e.target.value), [msgContent]
    );

    async function sendMessage() {
        const params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                content: msgContent,
                senderId: userId,
                receiverId: receiverId,
                talkers: [userId, receiverId]
            })
        }
        try {
            const response = await fetch(`${API_URL}/messages/send/${receiverId}`, params);
            if (response.status === 401 || response.status === 500) {
                setErrorMessage('Network or authorisation error');
            }
            if (response.status === 201) {
                setMsgContent('');
                setErrorMessage('');
            }
        } catch (err) {
            console.log(err.status);
        }
    }

    return (
        <div className="h-full relative bg-slate-50" style={{
            backgroundImage: 'radial-gradient(#EDF1F1 20%, transparent 20%),radial-gradient(#EDF1F1 20%, transparent 20%)',
            backgroundPosition: '0 0, 50px 50px',
            backgroundSize: '10px 10px'
        }}>
            <div className="flex justify-between items-center fixed md:hidden bg-white shadow-lg border-slate-50 border-b left-0 right-0 px-5 z-10">
                <div
                    className='flex items-center cursor-pointer'
                    onClick={() => {
                        messagesRef.current.classList.add('z-20');
                    }}
                >
                    <MdArrowBackIosNew className='text-teal-600' />
                    <p className='text-xs bg-teal-600 text-white rounded-full px-1'>{relatedUsers.messages?.length}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className="bg-clip-text bg-gradient-to-r from-teal-900 via-yellow-900 to-emerald-500 text-transparent md:text-2xl font-black">{receiverData?.username}</p>
                    <p className="text-xs text-emerald-600">{receiverData?.email}</p>
                </div>
                <div className='bg-teal-100 rounded-full w-8 h-8 flex justify-center items-center text-teal-800 font-black text-xl'>
                    {
                        receiverData?.image?.url ?
                            <img src={`${receiverData.image?.url ? receiverData?.image.url : ''}`} alt="" className='rounded-full' /> :
                            receiverData?.username[0].toUpperCase()
                    }
                </div>
            </div>
            {
                messagesList.length > 0 ?
                    <div className="h-full  border-gray-50 px-6 flex flex-col relative top-0 md:top-20">
                        {


                        }
                        <div ref={chatRef} className='min-w-max flex flex-col top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-x-clip px-5 lg:px-24 pb-24 md:pb-36 mt-12 md:mt-0 absolute'>
                            {
                                messagesList.map(message => {
                                    const senderId = message.talkers[0] === userId;
                                    const msgCompleteDate = new Date(message.createdAt);
                                    const msgTime = new Date(message.createdAt).toLocaleTimeString();
                                    const msgDate = new Date(message.createdAt).toLocaleDateString();

                                    return (
                                        <div key={message._id} className={`py-1 px-2 my-1 relative w-64 md:w-80 max-w-max ${!senderId ? 'sender bg-teal-100 text-teal-800 rounded-r-2xl rounded-tl-2xl rounded-bl-none place-self-start' : 'receiver bg-teal-700 text-white rounded-l-2xl rounded-br-2xl rounded-tr-none place-self-end'} `}>
                                            {message.content}
                                            <p className='text-[10px] text-end'>
                                                {msgDate === date ?
                                                    `Auj ${msgTime.substring(0, 5)}` :
                                                    completeDate.getDate() - 1 === msgCompleteDate.getDate() ? `Hier ${msgTime.substring(0, 5)}` : `${msgDate} ${msgTime.substring(0, 5)}`
                                                }
                                            </p>
                                        </div>
                                    )
                                })
                            }
                            <p>{errorMessage}</p>
                        </div>

                    </div> :

                    <div className="h-full bg-center bg-no-repeat flex flex-col justify-center items-center relative">
                        <p className='absolute top-20 text-xl font-bold bg-clip-text bg-gradient-to-r from-red-600 via-emerald-500 to-red-800 text-transparent tracking-widest'>Begin talks</p>
                        <img src="/images/logo.png" alt="" className="rounded-full border-[1px] border-teal-100" />
                    </div>
            }
            <div className="absolute bottom-10 md:bottom-0 left-0 right-0 z-10 bg-white pt-2">
                <div className='bg-gray-200 flex justify-between items-center relative mx-4 mb-4 rounded-full'>
                    <input
                        className={`focus:outline-none rounded-full border border-teal-200 text-teal-800 py-1 pl-4 pr-36 block appearance-none w-full`}
                        placeholder='Your massage'
                        onChange={handleChange}
                        value={msgContent}
                    >
                    </input>
                    <span className='absolute right-1 ml-3 px-2 py-1 flex items-center border rounded-full bg-slate-100 text-lg text-gray-500'>
                        <CiMicrophoneOn className="text-blue-700 hover:cursor-pointer" />
                        <TiAttachment className="ml-3 text-blue-600 text-xl hover:cursor-pointer" />
                        <span className="ml-3 hover:cursor-pointer" onClick={sendMessage}>
                            <MdSend className="text-teal-800" />
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Chat;