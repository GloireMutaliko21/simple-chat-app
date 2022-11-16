import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBackIosNew, MdPhotoCamera } from 'react-icons/md';

import { useStateContext } from "../context/ContextProvider";
import { fetchData } from '../hook/useFecth';
const EditProfile = () => {
    const [userInfos, setUserInfos] = useState({})
    const { userData } = useStateContext();
    const [userProfile] = fetchData(userInfos, setUserInfos, `/users/${userData._id}`);

    console.log(userProfile);

    return (
        <div className="w-full flex justify-center items-center my-10 px-5">
            <div className="fixed w-full px-3 py-2 flex justify-between items-center top-0 border-b text-teal-500">
                <Link to='/'><MdArrowBackIosNew className='' /></Link>
                <p>Edit Profile</p>
                <p></p>
            </div>
            <div className='flex items-center mt-2 w-full '>
                <div className='h-24 w-24 relative flex justify-center items-center border rounded-full'>
                    <p className='text-7xl font-black'>{userData.username[0]}</p>
                    <MdPhotoCamera className='absolute bottom-3 right-1 text-gray-500' />
                </div>
                <div className='ml-5'>{userData.username}</div>
            </div>
        </div>
    )
}

export default EditProfile;