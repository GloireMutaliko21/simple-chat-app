import { useStateContext } from "../context/ContextProvider";
import { HiUser } from 'react-icons/hi';

const Navbar = () => {
    const { userData, receiverData, messagesList } = useStateContext();

    return (
        <div className='fixed z-10 top-0 left-0 right-0 flex items-center justify-between py-1 px-10 bg-white border-b-[1px]'>
            <div className="flex items-center justify-between">
                <img src="/images/logo.png" alt="Talks App" className="w-12 h-12" />
            </div>
            {messagesList.length > 0 && <div className="flex flex-col justify-end items-center">
                <p className="bg-clip-text bg-gradient-to-r from-teal-900 via-yellow-900 to-emerald-500 text-transparent text-2xl font-black">{receiverData.username}</p>
                <p className="text-xs text-emerald-600">{receiverData.email}</p>
            </div>}
            <div className="flex flex-col items-center">
                <HiUser className="h-8 w-8 text-teal-800 border p-1 rounded-full" />
                <p className="text-xs">{userData.username}</p>
            </div>
        </div>
    )
}

export default Navbar