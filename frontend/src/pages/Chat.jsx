import { useState, useMemo, useRef, useEffect } from 'react';
import { CiMicrophoneOn } from "react-icons/ci";
import { MdSend } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";
import openSocket from "socket.io-client";

import { useStateContext } from "../context/ContextProvider";
import "../../public/css/message.css";
import { API_URL } from '../constants/apiUrl';

const Chat = () => {
    const [msgContent, setMsgContent] = useState('');

    const chatRef = useRef();

    const { messagesList, userData } = useStateContext();

    useEffect(() => {
        chatRef.current?.scrollTo({
            behavior: 'auto',
            top: chatRef.current.scrollHeight
        })
    }, [messagesList]);

    const userId = userData._id;
    const receiverId = localStorage.getItem('receiverId');

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
            const responseData = await response.json();
            if (response.status === 201) {
                setMsgContent('');
                console.log(responseData);
            }
            // else {
            //     setErrorLoginMsg(responseData.error);
            //     setTimeout(() => {
            //         setErrorLoginMsg(null);
            //     }, 2000);
            // }
        } catch (err) {
            // setErrorLoginMsg(err.json());
            console.log(err);
        }
    }

    return (
        <div className="min-w-[780px] h-full relative" style={{
            backgroundImage: 'radial-gradient(#EDF1F1 20%, transparent 20%),radial-gradient(#EDF1F1 20%, transparent 20%)',
            backgroundPosition: '0 0, 50px 50px',
            backgroundSize: '10px 10px'
        }}>
            {
                messagesList.length > 0 ?
                    <div className="h-full  border-gray-50 px-6 flex flex-col relative">
                        <div ref={chatRef} className='min-w-max flex flex-col top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-x-clip px-6 mb-[74px] absolute'>

                            {
                                messagesList.map(message => {
                                    const senderId = message.talkers[0] === userId;

                                    return <div key={message._id} className={`py-1 px-2 my-1 relative w-64 max-w-max ${!senderId ? 'sender bg-teal-100 text-teal-800 rounded-r-2xl rounded-tl-2xl rounded-bl-none place-self-start' : 'receiver bg-slate-100 text-teal-800 rounded-l-3xl rounded-br-3xl rounded-tr-none place-self-end'} `}>
                                        {message.content}
                                    </div>
                                })
                            }
                        </div>

                    </div> :

                    <div className="h-full bg-center bg-no-repeat flex justify-center items-center">
                        <img src="/images/logo.png" alt="" className="rounded-full border-[1px] border-teal-100" />
                    </div>
            }
            <div className="absolute bottom-0 left-0 right-0">
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

export default Chat