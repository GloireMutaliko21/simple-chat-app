import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBackIosNew, MdPhotoCamera } from 'react-icons/md';
import { BsEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import { useStateContext } from "../context/ContextProvider";
import Input from '../components/Input';
import Button from '../components/Button';
import { API_URL } from '../constants/apiUrl';
import defaultPrfl from '../../public/images/defaultPrfl.png'

const EditProfile = () => {
    const [userInfos, setUserInfos] = useState({
        username: '',
        email: '',
        oldPwd: '',
        password: '',
    });

    const imageRef = useRef();
    const [defaultUserImage, setDefaultUserImage] = useState(defaultPrfl);
    const [selectedFile, setSelectedFile] = useState();

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const showOpenFileDialog = () => {
        imageRef.current.click();
    };

    useEffect(() => {
        if (selectedFile) {
            const objectURL = URL.createObjectURL(selectedFile);
            setDefaultUserImage(objectURL);
            return () => URL.revokeObjectURL(objectURL);
        }
    }, [selectedFile]);

    const [editingMode, setEditingMode] = useState(false);
    const { userData, boolingState } = useStateContext();

    const handleChange = useMemo(() =>
        (e) => setUserInfos({ ...userInfos, [e.target.name]: e.target.value }), [userInfos]
    );

    const formdata = new FormData();
    formdata.append('email', userInfos.email);
    formdata.append('username', userInfos.username);
    formdata.append('password', userInfos.password);
    formdata.append('image', selectedFile);

    console.log(localStorage.getItem('token'));
    async function handleEditProfile() {
        const params = {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formdata
        }

        try {
            const response = await fetch(`${API_URL}/users/edit`, params);
            console.log(response);
            const responseData = await response.json();
            if (response.status === 201) {
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('user', JSON.stringify(responseData.user));
                console.log(responseData);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="w-full md:h-screen flex flex-col justify-center py-10 md:py-0 items-center px-5 text-gray-600">
            <div className="fixed w-full px-3 py-2 flex justify-between items-center top-0 border-b text-teal-500">
                <Link to='/'><MdArrowBackIosNew className='' /></Link>
                <p>{editingMode ? 'Edit' : ''} Profile</p>
                <p></p>
            </div>
            <div className='flex md:justify-center items-center mt-2 w-full '>
                <div className='h-28 w-28 relative flex justify-center items-center border rounded-full'>
                    <div className="relative flex justify-center items-center">
                        <input ref={imageRef} type="file" name="image" id="image" className="hidden" onChange={handleChangeImage}>
                        </input>
                        <div className="relative">
                            <img src={!selectedFile ? userData?.image?.url : defaultUserImage} alt="image" className="w-24 h-24 rounded-full border object-cover" />
                            <div onClick={showOpenFileDialog} className="absolute bottom-0 right-0 text-2xl text-teal-900"><MdPhotoCamera className='' /></div>
                        </div>
                    </div>
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
                        onClick={handleEditProfile}
                    />
                </div>
            }
        </div>
    )
}

export default EditProfile;