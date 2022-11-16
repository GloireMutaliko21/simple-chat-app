import { HiUser } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';

import { useStateContext } from "../context/ContextProvider";
import UserProfile from "./UserProfile";

const Navbar = () => {
    const { userData, receiverData, messagesList, handleChangeShowProfMenu } = useStateContext();

    return (
        <div className='flex justify-between p-2 md:mx-6 relative'>
            <div className="flex items-center justify-between">
                <img src="/images/logo.png" alt="Talks App" className="w-12 h-12" />
            </div>
            {(messagesList.length > 0 || localStorage.getItem('receiver')) && <div className="flex flex-col justify-end items-center">
                <p className="bg-clip-text bg-gradient-to-r from-teal-900 via-yellow-900 to-emerald-500 text-transparent md:text-2xl font-black">{receiverData?.username}</p>
                <p className="text-xs text-emerald-600">{receiverData?.email}</p>
            </div>}
            <div className="flex flex-col items-center cursor-pointer">
                <HiUser className="h-8 w-8 text-teal-800 border p-1 rounded-full" />
                <div
                    className="md:flex items-center text-teal-700 hidden"
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

export default Navbar;