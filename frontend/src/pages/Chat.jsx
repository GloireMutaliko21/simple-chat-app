import { CiMicrophoneOn } from "react-icons/ci";
import { MdSend } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";

import { useStateContext } from "../context/ContextProvider";
import "../../public/css/message.css";


const Chat = () => {
    const { messagesList } = useStateContext();
    const userId = localStorage.getItem('id');
    let receiverId;

    return (
        <div className="min-w-[580px] ml-20 h-full">
            {
                messagesList.length > 0 ?
                    <div className="h-full border-[1px] border-gray-50 px-6 flex flex-col relative">
                        {
                            messagesList.map(message => {
                                const senderId = message.talkers[0] === userId;

                                return <div key={message._id} className={`py-1 px-2 my-1 relative w-max ${!senderId ? 'sender bg-teal-100 text-teal-800 rounded-r-2xl rounded-tl-2xl rounded-bl-xl place-self-start' : 'receiver bg-slate-100 text-teal-800 border rounded-l-3xl rounded-br-3xl rounded-tr-2xl place-self-end'} `}>
                                    {message.content}
                                </div>
                            })
                        }
                        <div className="absolute bottom-0 left-5 right-5">
                            <div className='bg-gray-200 flex justify-between items-center relative mx-4 mb-4 rounded-full'>
                                <input
                                    className={`focus:outline-none rounded-full border border-teal-200 text-teal-800 py-1 pl-4 pr-36 block appearance-none w-full`}
                                    placeholder='Your massage'
                                // onChange={handleChangeIsFilter}
                                >
                                </input>
                                <span className='absolute right-1 ml-3 px-2 py-1 flex items-center border rounded-full bg-slate-100 text-lg text-gray-500'>
                                    <CiMicrophoneOn className="text-blue-700 hover:cursor-pointer" />
                                    <TiAttachment className="ml-3 text-blue-600 text-xl hover:cursor-pointer" />
                                    <span className="ml-3 hover:cursor-pointer">
                                        <MdSend className="text-teal-800" />
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div> :

                    <div className="h-full bg-center bg-no-repeat flex justify-center items-center">
                        <img src="/images/logo.png" alt="" className="" />
                    </div>
            }
        </div>
    )
}

export default Chat