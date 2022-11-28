import { useState, useMemo, useRef, useEffect } from "react";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { MdPhotoCamera } from "react-icons/md";

import { useStateContext } from "../context/ContextProvider";
import Button from '../components/Button';
import Input from '../components/Input';
import defaultPrfl from '../../public/images/defaultPrfl.png'
import { postUser } from "../Api/api";

const Signup = () => {
    const { boolingState, setBoolingState, setLoginStatus } = useStateContext();
    const handleLoadLogin = () => {
        setBoolingState({ ...boolingState, isSignNotLog: false })
    }

    const imageRef = useRef();
    const [defaultUserImage, setDefaultUserImage] = useState(defaultPrfl);
    const [selectedFile, setSelectedFile] = useState();

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const handleChange = useMemo(() =>
        (e) => {
            if (e.target.name === "email") {
                setEmail(e.target.value);
            }
            if (e.target.name === "username") {
                setUsername(e.target.value);
            }
            if (e.target.name === "password") {
                setPassword(e.target.value);
            }
        }, [email, username, password]);

    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('username', username);
    formdata.append('password', password);
    formdata.append('image', selectedFile);

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

    return (
        <div className='flex flex-col justify-center min-w-[400px] max-w-max shadow-gray-200 p-10 text-teal-800 rounded-md text-left'>
            <div className='flex flex-col items-center  mb-5'>
                <img src="/images/logo.png" className='h-32' alt='Talks' />
                <p className='mb-2'>Welcome</p>
            </div>
            <div className=''>
                <div className="relative flex justify-center items-center">
                    <input ref={imageRef} type="file" name="image" id="image" className="hidden" onChange={handleChangeImage}>
                    </input>
                    <div className="relative">
                        <img src={defaultUserImage} alt="image" className="w-24 h-24 rounded-full border object-cover" />
                        <div onClick={showOpenFileDialog} className="absolute bottom-0 right-0 text-2xl text-teal-900"><MdPhotoCamera className='' /></div>
                    </div>
                </div>
                <Input
                    label='Username'
                    type='text'
                    onChange={handleChange}
                    name="username"
                />
                <Input
                    label='E-mail'
                    type='email'
                    onChange={handleChange}
                    name="email"
                />
                <Input
                    label='Mot de passe'
                    type={boolingState.showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    name="password"
                    icon={<BsEyeFill />}
                    iconMask={<BsFillEyeSlashFill />}
                />
            </div>
            <div className='flex justify-between items-center text-xs'>
                <div className='flex justify-around items-center'>
                    <input name='remember' id='remember' type="checkbox" />
                    <label htmlFor='remember' className='ml-3 cursor-pointer'>Rememver Me</label>
                </div>
                <div>
                    <span className='text-blue-800 hover:underline hover:cursor-pointer'>
                        Forgot password ?
                    </span>
                </div>
            </div>
            <div className='mt-8'>
                <Button
                    label='Sign Up'
                    style='flex justify-center w-full bg-teal-800 hover:bg-teal-700 text-white font-semibold p-3'
                    onClick={() => postUser(
                        { method: "POST", 'Content-Type': 'multipart/form-data', body: formdata },
                        '/users/signup',
                        setLoginStatus, true, handleLoadLogin
                    )}
                />
                <div className='flex justify-between items-center w-full text-center'>
                    <div className='border-t w-1/3'></div>
                    <p className='text-center my-3'>Or</p>
                    <div className='border-t w-1/3'></div>
                </div>
                <Button
                    label="Login"
                    style='flex justify-center w-full text-teal-800 font-semibold underline'
                    onClick={handleLoadLogin}
                />

            </div>
        </div>
    )
}

export default Signup;