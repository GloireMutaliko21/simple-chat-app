import { useState, useMemo } from 'react';
import { HiUser } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { RiCloseCircleLine, RiMailAddFill } from "react-icons/ri";

import { useStateContext } from "../context/ContextProvider";
import { fetchData, fetchMessages } from "../hook/useFecth";
import Button from './Button';

const Contact = () => {
    const { users, setUsers, setMessagesList, boolingState, setBoolingState, userData } = useStateContext();
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
        setBoolingState(prevSates => { return { ...prevSates, showContactList: !prevSates.showContactList } });
    };

    return (
        <div className="hidden md:flex md:flex-col justify-start mb-1 relative z-10">
            <Button
                label='New Message'
                style='flex justify-between w-full hover:border hover:border-teal-800 text-teal-800 font-semibold p-3 mb-2'
                onClick={handleShowContactList}
                icon={<RiMailAddFill className='text-xl' />}
            />
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