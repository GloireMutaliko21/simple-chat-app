import { useState, useMemo } from "react";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { useStateContext } from "../context/ContextProvider";
import Button from '../components/Button';
import Input from '../components/Input';
import { API_URL } from '../constants/apiUrl';
const Signup = () => {
    const { boolingState, setBoolingState } = useStateContext();
    const handleLoadLogin = () => {
        setBoolingState({ ...boolingState, isSignNotLog: false })
    }

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

    async function handleSignUp() {
        const params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                username,
                password
            })
        }
        try {
            const response = await fetch(`${API_URL}/users/signup`, params);
            const responseData = await response.json();
            if (response.status === 201) {
                // if (rememberMe.current.checked) {
                //     localStorage.setItem('isLogged', true);
                // }
                console.log(responseData);
                // setUserData(responseData);
                // setToken(responseData.token);
                // setBoolingState({ ...boolingState, loginStatus: true });
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex flex-col justify-center min-w-[400px] max-w-max shadow-gray-200 p-10 text-teal-800 rounded-md text-left'>
            <div className='flex flex-col items-center  mb-5'>
                <h1 className='text-5xl font-black bg-clip-text bg-gradient-to-l from-green-900 via-light-teal-900 to-cyan-700 text-transparent'>Talks</h1>
                <p className='mb-2'>Welcome</p>
            </div>
            <div className=''>
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
                    <span
                        className='text-blue-800 hover:underline hover:cursor-pointer'
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
                    label='Sign Up'
                    style='flex justify-center w-full bg-teal-800 hover:bg-teal-700 text-white font-semibold p-3'
                    onClick={handleSignUp}
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

export default Signup