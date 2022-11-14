import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from './components/Landing';
import Login from './pages/Login';
import { useStateContext } from "./context/ContextProvider";
import Signup from './pages/Signup';
import Home from './pages/Home';
import Chat from "./pages/Chat";

function App() {
  const { boolingState, loginStatus, setLoginStatus } = useStateContext();
  return (
    <BrowserRouter>
      <div className="">

        {
          !boolingState.isSignNotLog ?
            <div className='w-full'>
              {!loginStatus && !localStorage.getItem("isLogged") ?
                <div className='flex justify-between items-center shadow-sm'>
                  <Landing />
                  <Login />
                </div> :

                <div className='w-full md:w-screen md:py-2 md:px-10'>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                  </Routes>
                </div>
              }
            </div> :
            <Signup />
        }
      </div>
    </BrowserRouter>
  )
}

export default App
