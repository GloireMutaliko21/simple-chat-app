import { useStateContext } from "../context/ContextProvider";

const Chat = () => {
    const { messagesList } = useStateContext();

    return (
        <div>
            {messagesList.map(message => <div key={message._id}>{message.content}</div>)}
        </div>
    )
}

export default Chat