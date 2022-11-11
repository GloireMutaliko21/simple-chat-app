import { HiUser } from "react-icons/hi";
import { useStateContext } from "../context/ContextProvider";
import { fetchData } from "../hook/useFecth";

const Contact = ({ image, name }) => {
    const { users, setUsers } = useStateContext();
    const [data] = fetchData(users, setUsers, '/users')
    console.log(data);
    return (
        <div className="flex flex-col justify-start mb-10">
            <h1 className="text-4xl text-teal-800 font-black m-4">Contacts</h1>
            <div className="flex ml-5 overflow-scroll">
                {data.map(({ username }) => <div className="flex flex-col items-center mx-1">
                    <HiUser className="h-16 w-16 text-gray-500 border border-teal-600 p-1 rounded-full" />
                    <p className="mt-1 font-semibold w-[40px] overflow-hidden">{username}</p>
                </div>)}
            </div>
        </div>
    );
}

export default Contact;