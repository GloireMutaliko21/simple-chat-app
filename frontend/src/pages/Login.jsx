import { useState, useMemo } from 'react';
import { FcGoogle } from 'react-icons/fc'
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import Button from '../components/Button';
import Input from '../components/Input';
import { API_URL } from '../constants/apiUrl';
import { useStateContext } from "../context/ContextProvider";

const Login = () => {
    const { boolingState, setBoolingState } = useStateContext();

    const handleLoadSignUp = () => {
        setBoolingState({ ...boolingState, isSignNotLog: true })
    }

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleChange = useMemo(() =>
        (e) => {
            if (e.target.name === "email") {
                setEmail(e.target.value);
            }
            if (e.target.name === "password") {
                setPassword(e.target.value);
            }
        }, [email, password]);

    async function handleLogin() {
        const params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        }
        try {
            if (!localStorage.getItem('isLogged')) {
                const response = await fetch(`${API_URL}/users/login`, params);
                const responseData = await response.json();
                if (response.status === 200) {
                    localStorage.setItem('token', responseData.token)
                    // if (rememberMe.current.checked) {
                    //     localStorage.setItem('isLogged', true);
                    // }
                    console.log(responseData);
                    // setUserData(responseData);
                    // setToken(responseData.token);
                    // setBoolingState({ ...boolingState, loginStatus: true });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex flex-col justify-center min-w-[400px] max-w-max shadow-gray-200 p-10 text-teal-800 rounded-md text-left'>
            <div className='flex flex-col items-center  mb-5'>
                <h1 className='text-5xl font-black bg-clip-text bg-gradient-to-l from-green-900 via-light-teal-900 to-cyan-700 text-transparent'>Talks</h1>
                <p className='mb-5'>Welcome</p>
                <Button
                    icon={<FcGoogle className='text-xl mr-2' />}
                    label='Se connecter avec google'
                    style='text-blue-gray-800 hover:bg-slate-50 text-sm font-medium shadow-md border p-2'
                />
            </div>
            <div className='flex justify-between items-center w-full mb-3 text-center'>
                <div className='border-t w-1/5'></div>
                <span className='text-xs'>OU SE CONNECTER AVEC</span>
                <div className='border-t w-1/5'></div>
            </div>
            <div className=''>
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
                    <label htmlFor='remember' className='ml-3 cursor-pointer'>Remember Me</label>
                </div>
                <div>
                    <span
                        className='text-green-600 font-semibold hover:underline hover:cursor-pointer'
                    // onClick={() => { setBoolingState({ ...boolingState, changePassWord: true }) }}
                    >
                        Forgot password ?
                    </span>
                    {/* {boolingState.changePassWord &&
                        <Dialogue
                            boolingState={boolingState.changePassWord}
                            setBoolingState={setBoolingState}
                            value={{ ...boolingState, changePassWord: false }}
                            label='Envoyer'
                            handleConfirm={() => { }}
                            title='Réinitialiser mot de passe'
                            cancel={{ ...boolingState, changePassWord: false }}
                        >
                            <div className='text-blue-gray-900 px-4'>
                                <Input
                                    label='E-mail '
                                    type='email'
                                    value=''
                                    onChange={() => { }}
                                    style='w-full'
                                />
                            </div>
                        </Dialogue>} */}
                </div>
            </div>
            <div className='mt-8'>
                <Button
                    label='Login'
                    style='flex justify-center w-full bg-teal-800 hover:bg-teal-700 text-white font-semibold p-3'
                    onClick={handleLogin}
                />
                <div className='flex justify-between items-center w-full text-center'>
                    <div className='border-t w-1/3'></div>
                    <p className='text-center my-3'>Or</p>
                    <div className='border-t w-1/3'></div>
                </div>
                <Button
                    label="Sign Up"
                    style='flex justify-center w-full text-teal-800 font-semibold underline'
                    onClick={handleLoadSignUp}
                />

            </div>
        </div>
    )
}

export default Login