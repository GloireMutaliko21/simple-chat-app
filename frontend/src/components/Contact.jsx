import { useState, useMemo } from 'react';
import { HiUser } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";

import { useStateContext } from "../context/ContextProvider";
import { fetchData, fetchMessages } from "../hook/useFecth";

const Contact = () => {
    const { users, setUsers, setMessagesList, boolingState, setBoolingState, userData, messagesRef } = useStateContext();
    const [searchValue, setSearchValue] = useState('');

    const [data] = fetchData(users, setUsers, '/users');

    const usersData = []
    const recherche = (condition, datas) => {
        if (condition) {
            return;
        } else {
            usersData.splice()
            usersData.push(datas)
        }
    };

    data.sort(
        (a, b) => (
            a.username[0].toLowerCase() < b.username[0].toLowerCase() ? -1 : 1)
    )
        .forEach(user => {
            const searchData = user.username.toLowerCase().indexOf(searchValue.toLowerCase()) === -1;
            recherche(searchData, user);
        });

    // console.log(data.sort((a, b) => (a.username[0].toLowerCase() < b.username[0].toLowerCase() ? -1 : 1)));

    const handleChangeIsFilter = useMemo(() => (e) => {
        setSearchValue(e.target.value);
    }, [searchValue]);

    const handleShowContactList = () => {
        setBoolingState(prevSates => { return { ...prevSates, showContactList: false } });
    };

    return (
        <div className="ml-3 h-screen md:overflow-hidden relative overflow-auto md:hover:overflow-auto pb-24 z-30">
            <div className='fixed md:absolute bg-white z-10 left-4 md:left-0 right-4 mb-4 pb-2 border-b'>
                <div
                    className='flex self-end justify-between items-center mb-2 px-3 rounded-full text-teal-500 cursor-pointer'
                    onClick={handleShowContactList}
                >
                    <p className='font-bold'>New Chat</p>
                    <p className=''>Close</p>
                </div>
                <div className='bg-gray-200 flex justify-between items-center relative rounded-full'>
                    <span className='absolute left-3 hover:cursor-pointer text-lg text-gray-500'>
                        <IoIosSearch />
                    </span>
                    <input
                        className={`focus:outline-none rounded-full border py-1 pr-4 pl-10 block appearance-none w-full`}
                        placeholder='Search'
                        onChange={handleChangeIsFilter}
                    >
                    </input>
                </div>
            </div>
            <div className="mt-20 text-gray-500 md:overflow-y-scroll md:absolute md:top-10 bottom-5 md:left-0 md:right-0 md:mb-[74px] md:pr-5">
                {/* <div className="flex flex-col ml-5 overflow-clip absolute right-0 top-16 text-gray-500 p-4 shadow-xl w-full rounded-xl"> */}

                {
                    usersData.length > 0 ? usersData.map((receiver) => receiver._id !== userData._id &&
                        <div
                            key={receiver._id}
                            className="flex justify-between items-center mx-1 mb-2 pb-1 hover:cursor-pointer border-b border-gray-300"
                            onClick={() => {
                                fetchMessages(receiver._id, JSON.stringify(receiver), setMessagesList, setBoolingState, boolingState);
                                handleShowContactList();
                                messagesRef.current.classList.remove('z-20');
                            }}
                        >
                            <p className="font-semibold">{receiver.username}</p>
                            {/* <HiUser className="h-10 w-10 text-yellow-500 border border-teal-200 p-1 rounded-full" /> */}
                            <div className='h-9 w-9 border border-teal-500 rounded-full flex justify-center items-center text-teal-700 font-black text-xl'>
                                {receiver.username[0].toUpperCase()}
                            </div>
                        </div>) : <div className='text-red-500'>No user found</div>
                }
            </div>
        </div>
    );
}

export default Contact;