
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
                <div className="fixed flex flex-col items-center bottom-10 md:bottom-auto md:top-16 right-5 left-5 md:left-auto md:right-6 bg-teal-600 text-white shadow-md rounded px-10 py-3 z-40">
                    <ul className="list-none flex flex-col justify-center items-center">
                        <li className="my-5 hover:border-b hover:text-yellow-100">Profile</li>
                        <li className="mb-5 hover:border-b hover:text-yellow-100">Settings</li>
                        <li
                            className="mb-5 hover:border-b hover:text-yellow-100"
                            onClick={handleLogout}
                        >
                            Logout
                        </li>
                    </ul>
                    <div
                        className='flex md:self-end  justify-center md:justify-end w-max px-4 rounded shadow-md bg-teal-200 text-teal-800 hover:text-teal-200 hover:bg-teal-800 cursor-pointer'
                        onClick={handleChangeShowProfMenu}
                    >
                        <p className='' onClick={handleChangeShowProfMenu}>Fermer</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserProfile