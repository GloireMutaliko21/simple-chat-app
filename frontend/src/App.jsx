import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from './components/Landing';
import Login from './pages/Login';
import { useStateContext } from "./context/ContextProvider";
import Signup from './pages/Signup';
import Chat from "./pages/Chat";
import Navbar from './components/Navbar';
import Messages from "./components/Messages";
import Contact from "./components/Contact";
import EditProfile from "./pages/EditProfile";

function App() {
  const { boolingState, loginStatus, messagesRef, chatRef, contactsShown, } = useStateContext();
  return (
    <BrowserRouter>
      <div className="relative left-0 right-0 w-full 2xl:w-[1290px]">
        <Routes>
          <Route path="/" element={
            !boolingState.isSignNotLog ?
              <div className=''>
                {!loginStatus && !localStorage.getItem("isLogged") ?
                  <div className='w-full flex justify-center items-center shadow-sm'>
                    <Landing />
                    <Login />
                  </div> :

                  <div className="relative flex">
                    <div ref={messagesRef} className="fixed z-20 w-full bg-white md:w-[420px] pr-5 md:pr-0 pl-3 md:pl-0 py-2 md:py-20 md:border-r md:shadow-2xl md:shadow-slate-200">
                      {contactsShown ? <Contact /> : <Messages />}
                      <Messages />
                    </div>
                    <div className="fixed w-full 2xl:w-[1290px] z-[10000000] bg-white border-t md:border-t-0 md:border-b bottom-0 md:bottom-auto md:top-0 md">
                      <Navbar />
                    </div>
                    <div ref={chatRef} className="block absolute bottom-0 top-0 left-0 right-0  min-h-screen md:ml-[420px] overflow-hidden">
                      <Chat />
                    </div>
                  </div>
                }
              </div> :
              <div className="flex justify-center items-center shadow-sm">
                <Landing />
                <Signup />
              </div>}
          />
          <Route
            path="/profile"
            element={<EditProfile />}
          />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
