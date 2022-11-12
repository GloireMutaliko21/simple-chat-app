import { HiUser } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { useStateContext } from "../context/ContextProvider";
import { fetchData } from "../hook/useFecth";

const Contact = () => {
    const { users, setUsers } = useStateContext();
    const [data] = fetchData(users, setUsers, '/users');
    return (
        <div className="flex flex-col justify-start mb-1">
            <div className="flex justify-between items-center m-4 mb-0">
                <h1 className="text-3xl text-teal-800 font-black">Contacts</h1>
                <HiUser className="h-7 w-7 text-gray-500 rounded-full" />
            </div>
            <div className='bg-gray-200 flex justify-between items-center relative mx-4 mb-4 rounded-full'>
                <span className='absolute left-3 mr-3 hover:cursor-pointer text-lg text-gray-500'>
                    <IoIosSearch />
                </span>
                <input
                    className={`focus:outline-none rounded-full border py-1 pr-4 pl-10 block appearance-none w-full`}
                // type={type}
                // value={value}
                // placeholder={placeholder}
                // onChange={onChange}
                // name={name}
                // disabled={disabled}
                >
                </input>
            </div>
            <div className="flex ml-5 overflow-scroll">
                {data.map(({ _id, username }) => _id !== localStorage.getItem('id') && <div key={_id} className="flex flex-col items-center mx-1">
                    <HiUser className="h-12 w-12 text-gray-500 border border-teal-600 p-1 rounded-full" />
                    <p className="mt-1 font-semibold w-[40px] overflow-hidden">{username}</p>
                </div>)}
            </div>
        </div>
    );
}

export default Contact;