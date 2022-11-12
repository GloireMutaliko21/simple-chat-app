import { useStateContext } from "../context/ContextProvider";
import "../../public/css/message.css";


const Chat = () => {
    const { messagesList } = useStateContext();
    const userId = localStorage.getItem('id');

    return (
        <div className="min-w-[580px] ml-20 h-full">
            {
                messagesList.length > 0 ?
                    <div className="h-full border-[1px] border-gray-50 px-6 flex flex-col relative">
                        {
                            messagesList.map(message => {
                                const senderId = message.talkers[0] === userId;
                                {/* before: content - none before: w - 0 before: h - 0 before:absolute before: border - l - 8 before: border - r - 8 before: border - r - transparent before: border - t - 8 before: border - b - 8 before: border - b - transparent before: -right - 5 before: top - 2 */ }

                                return <div key={message._id} className={`py-1 px-2 my-1 relative w-max ${!senderId ? 'sender bg-teal-800 text-white rounded-r-2xl rounded-tl-2xl rounded-bl-xl place-self-start' : 'receiver bg-slate-100 text-teal-800 border rounded-l-3xl rounded-br-3xl rounded-tr-2xl place-self-end'} `}>
                                    {message.content}
                                </div>
                            })
                        }
                        <input type="text" className="absolute bottom-0 border " />
                    </div> :

                    <div className="h-full bg-center bg-no-repeat flex justify-center items-center">
                        <img src="/images/logo.png" alt="" className="" />
                    </div>
            }
        </div>
    )
}

export default Chat