import { BrowserRouter } from "react-router-dom";

import Landing from './components/Landing';
import Login from './pages/Login';
import { useStateContext } from "./context/ContextProvider";
import Signup from './pages/Signup';
import Chat from "./pages/Chat";
import Navbar from './components/Navbar';
import Messages from "./components/Messages";
import Contact from "./components/Contact";

function App() {
  const { boolingState, loginStatus, messagesRef, chatRef } = useStateContext();
  return (
    <BrowserRouter>
      <div className="relative left-0 right-0 w-full 2xl:w-[1290px]">
        {
          !boolingState.isSignNotLog ?
            <div className=''>
              {!loginStatus && !localStorage.getItem("isLogged") ?
                <div className='w-full flex justify-center items-center shadow-sm'>
                  <Landing />
                  <Login />
                </div> :

                <div className="relative flex">
                  <div ref={messagesRef} className="fixed z-20 w-full bg-white md:w-80 pr-5 pl-3 py-2 md:py-20 md:border-r md:shadow-2xl md:shadow-slate-200">
                    {boolingState.showContactList ? <Contact /> : <Messages />}
                    <Messages />
                  </div>
                  <div className="fixed w-full 2xl:w-[1290px] hidden md:block z-[10000000] bg-white border-b">
                    <Navbar />
                  </div>
                  <div ref={chatRef} className="block absolute bottom-0 top-0 left-0 right-0  min-h-screen md:ml-80 overflow-hidden">
                    <Chat />
                  </div>
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
