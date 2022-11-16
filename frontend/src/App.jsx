import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from './components/Landing';
import Login from './pages/Login';
import { useStateContext } from "./context/ContextProvider";
import Signup from './pages/Signup';
import Home from './pages/Home';
import Chat from "./pages/Chat";
import Navbar from './components/Navbar';
import Messages from "./components/Messages";

function App() {
  const { boolingState, loginStatus, setLoginStatus } = useStateContext();
  return (
    <BrowserRouter>
      <div className="relative left-0 right-0 w-full">

        {
          !boolingState.isSignNotLog ?
            <div className=''>
              {!loginStatus && !localStorage.getItem("isLogged") ?
                <div className='w-full flex justify-center items-center shadow-sm'>
                  <Landing />
                  <Login />
                </div> :

                <div className="relative flex">
                  <div className="fixed w-full md:w-80 pr-5 pl-3 py-20 md:border-r md:shadow-2xl md:shadow-slate-200">
                    <Messages />
                  </div>
                  <div className="fixed w-full z-[10000000] bg-white border-b">
                    <Navbar />
                  </div>
                  <div className="hidden absolute md:bottom-0 md:top-0 md:left-0 md:right-0 md:block min-h-screen md:ml-80 overflow-hidden">
                    <Chat />
                  </div>
                  {/* <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                  </Routes> */}
                </div>
              }
            </div> :
            <div className="flex justify-center items-center shadow-sm">
              <Landing />
              <Signup />
            </div>
        }
      </div>
    </BrowserRouter>
  )
}

export default App
