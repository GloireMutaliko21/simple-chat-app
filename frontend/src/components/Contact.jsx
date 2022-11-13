import { useState, useMemo } from 'react';
import { HiUser } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";

import { useStateContext } from "../context/ContextProvider";
import { fetchData, fetchMessages } from "../hook/useFecth";

const Contact = () => {
    const { users, setUsers, setMessagesList, boolingState, setBoolingState } = useStateContext();
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
    }, [searchValue])

    return (
        <div className="flex flex-col justify-start mb-1">
            <div className="flex justify-between items-center my-4 mb-0">
                <h1 className="text-3xl text-teal-800 font-black">Contacts</h1>
                <HiUser className="h-7 w-7 text-gray-500 rounded-full" />
            </div>
            <div className='bg-gray-200 flex justify-between items-center relative ml-4 mb-4 rounded-full'>
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
            <div className="flex ml-5 overflow-clip">
                {usersData.length > 0 ? usersData.map(({ _id, username }) => _id !== localStorage.getItem('id') &&
                    <div
                        key={_id}
                        className="flex flex-col justify-center items-center mx-1 hover:cursor-pointer"
                        onClick={() => fetchMessages(_id, setMessagesList, setBoolingState, boolingState)}
                    >
                        <HiUser className="h-10 w-10 text-gray-500 border border-teal-200 p-1 rounded-full" />
                        <p className="mt-1 font-semibold w-[40px] overflow-hidden text-sm">{username}</p>
                    </div>) : <div className='text-red-500'>No user found</div>}
            </div>
        </div>
    );
}

export default Contact;