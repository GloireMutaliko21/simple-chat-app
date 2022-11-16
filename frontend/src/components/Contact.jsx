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

    data.forEach(user => {
        const searchData = user.username.toLowerCase().indexOf(searchValue.toLowerCase()) === -1;
        recherche(searchData, user);
    });

    const handleChangeIsFilter = useMemo(() => (e) => {
        setSearchValue(e.target.value);
    }, [searchValue]);

    const handleShowContactList = () => {
        messagesRef.current.classList.remove('z-20');
        setBoolingState(prevSates => { return { ...prevSates, showContactList: false } });
    };

    return (
        <div className="ml-3 h-screen md:overflow-hidden relative overflow-auto md:hover:overflow-auto pb-24 z-30">
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
            {
                boolingState.showContactList &&
                <div className="flex flex-col ml-5 overflow-clip absolute right-0 top-14 bg-teal-600 text-gray-100 p-4 shadow-xl w-full rounded-xl">
                    <div
                        className='flex self-end justify-end mb-4 px-3 rounded-full bg-teal-200 text-teal-800 hover:text-teal-200 hover:bg-teal-800 shadow-2xl cursor-pointer'
                        onClick={handleShowContactList}
                    >
                        <p className=''>Fermer</p>
                    </div>
                    {
                        usersData.length > 0 ? usersData.map((receiver) => receiver._id !== userData._id &&
                            <div
                                key={receiver._id}
                                className="flex justify-between items-center mx-1 mb-2 pb-1 hover:cursor-pointer border-b border-gray-300"
                                onClick={() => {
                                    fetchMessages(receiver._id, JSON.stringify(receiver), setMessagesList, setBoolingState, boolingState);
                                    handleShowContactList();
                                }}
                            >
                                <p className="font-semibold">{receiver.username}</p>
                                <HiUser className="h-10 w-10 text-yellow-500 border border-teal-200 p-1 rounded-full" />
                            </div>) : <div className='text-red-500'>No user found</div>
                    }
                </div>
            }
        </div>
    );
}

export default Contact;