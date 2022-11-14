
import { useStateContext } from "../context/ContextProvider";

const UserProfile = () => {
    const { boolingState, handleChangeShowProfMenu, setLoginStatus } = useStateContext();
    const handleLogout = () => {
        setLoginStatus(false);
        localStorage.removeItem('isLogged');
        localStorage.removeItem('receiver');
    }

    return (
        <div>
            {
                boolingState.showProfileMenu &&
                <div className="fixed top-16 right-6 bg-teal-600 text-white shadow-md rounded px-10 py-3">
                    <ul className="list-none ">
                        <li className="my-5 hover:border-b hover:text-yellow-100">Profile</li>
                        <li className="my-5 hover:border-b hover:text-yellow-100">Settings</li>
                        <li
                            className="my-5 hover:border-b hover:text-yellow-100"
                            onClick={handleLogout}
                        >
                            Logout
                        </li>
                    </ul>
                    <div
                        className='flex self-end justify-end mt-8 mr-2 px-2 rounded shadow-md shadow-gray-400 bg-teal-200 text-teal-800 hover:text-teal-200 hover:bg-teal-800 cursor-pointer'
                        onClick={handleChangeShowProfMenu}
                    >
                        <p className=''>Fermer</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserProfile