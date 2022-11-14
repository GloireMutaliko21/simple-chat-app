import { useStateContext } from "../context/ContextProvider";

const Navbar = () => {
    const { userData, receiverData } = useStateContext();

    return (
        <div className='fixed z-10 top-0 left-0 right-0 flex items-center justify-between py-1 px-10 bg-white border-b-[1px]'>
            <div className="flex items-center justify-between">
                <img src="/images/logo.png" alt="Talks App" className="w-12 h-12" />
                {/* <p className="ml-8 text-2xl font-bold">{userData.username}</p> */}
            </div>
            <div className="flex flex-col justify-end items-center">
                <p className="text-2xl font-black">{receiverData.username}</p>
                <p className="text-xs text-slate-500">{receiverData.email}</p>
            </div>
            <div></div>
        </div>
    )
}

export default Navbar