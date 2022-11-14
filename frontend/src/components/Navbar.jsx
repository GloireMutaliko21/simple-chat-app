import { useStateContext } from "../context/ContextProvider";
import { HiUser } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import UserProfile from "./UserProfile";

const Navbar = () => {
    const { userData, receiverData, messagesList, handleChangeShowProfMenu } = useStateContext();

    return (
        <div className='fixed z-20 top-0 left-0 right-0 flex items-center justify-between py-1 px-10 bg-white border-b-[1px]'>
            <div className="flex items-center justify-between">
                <img src="/images/logo.png" alt="Talks App" className="w-12 h-12" />
            </div>
            {(messagesList.length > 0 || localStorage.getItem('receiver')) && <div className="flex flex-col justify-end items-center">
                <p className="bg-clip-text bg-gradient-to-r from-teal-900 via-yellow-900 to-emerald-500 text-transparent text-2xl font-black">{receiverData?.username}</p>
                <p className="text-xs text-emerald-600">{receiverData?.email}</p>
            </div>}
            <div className="flex flex-col items-center cursor-pointer">
                <HiUser className="h-8 w-8 text-teal-800 border p-1 rounded-full" />
                <div
                    className="flex items-center text-teal-700"
                    onClick={handleChangeShowProfMenu}
                >
                    <p className="text-xs mr-2">{userData.username}</p>
                    <IoIosArrowDown />
                </div>
                <UserProfile />
            </div>
        </div>
    )
}

export default Navbar