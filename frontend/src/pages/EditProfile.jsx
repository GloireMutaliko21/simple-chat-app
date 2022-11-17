import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBackIosNew, MdPhotoCamera } from 'react-icons/md';
import { BsEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { useStateContext } from "../context/ContextProvider";
import Input from '../components/Input';
import Button from '../components/Button';
const EditProfile = () => {
    const [userInfos, setUserInfos] = useState({
        username: '',
        email: '',
        oldPwd: '',
        password: '',
    });
    const [editingMode, setEditingMode] = useState(false);
    const { userData, boolingState } = useStateContext();

    const handleChange = useMemo(() =>
        (e) => setUserInfos({ ...userInfos, [e.target.name]: e.target.value }), [userInfos]
    );

    return (
        <div className="w-full md:h-screen flex flex-col justify-center py-10 md:py-0 items-center px-5 text-gray-600">
            <div className="fixed w-full px-3 py-2 flex justify-between items-center top-0 border-b text-teal-500">
                <Link to='/'><MdArrowBackIosNew className='' /></Link>
                <p>{editingMode ? 'Edit' : ''} Profile</p>
                <p></p>
            </div>
            <div className='flex md:justify-center items-center mt-2 w-full '>
                <div className='h-28 w-28 relative flex justify-center items-center border rounded-full'>
                    <p className='text-7xl font-black'>{userData.username[0]}</p>
                    {
                        editingMode && <MdPhotoCamera className='absolute bottom-3 right-1 text-gray-500' />
                    }
                </div>
                <div className='ml-5'>
                    <p className='text-3xl'>{userData?.username}</p>
                    <p>{userData?.email}</p>
                    <p
                        className='mt-3 text-sm text-red-600 cursor-pointer'
                        onClick={() => setEditingMode(state => !state)}
                    >
                        {editingMode ? 'Annuler' : 'Edit'}
                    </p>
                </div>
            </div>
            {
                editingMode &&
                <div className='mt-4 text-teal-600'>
                    <div className='md:flex'>
                        <div>
                            <Input
                                label='Username'
                                type='text'
                                onChange={handleChange}
                                name='username'
                            />
                            <Input
                                label='Email'
                                type='email'
                                onChange={handleChange}
                                name='email'
                            />

                        </div>
                        <div className='md:ml-4'>
                            <Input
                                label='Password'
                                type={boolingState.showPassword ? 'text' : 'password'}
                                onChange={handleChange}
                                name="oldPwd"
                                icon={<BsEyeFill />}
                                iconMask={<BsFillEyeSlashFill />}
                            />
                            <Input
                                label='New Password'
                                type={boolingState.showPassword ? 'text' : 'password'}
                                onChange={handleChange}
                                name="password"
                                icon={<BsEyeFill />}
                                iconMask={<BsFillEyeSlashFill />}
                            />
                        </div>
                    </div>
                    <Button
                        label='Send'
                        style='flex justify-center w-full bg-teal-800 hover:bg-teal-700 text-white font-semibold p-3 mt-5'
                    />
                </div>
            }
        </div>
    )
}

export default EditProfile;