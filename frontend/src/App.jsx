import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from './components/Landing';
import Login from './pages/Login';
import { useStateContext } from "./context/ContextProvider";
import Signup from './pages/Signup';
import Home from './pages/Home';
import Chat from "./pages/Chat";

function App() {
  const { boolingState } = useStateContext();
  return (
    <BrowserRouter>
      <div>

        {
          !boolingState.isSignNotLog ?
            <div className=''>
              {!boolingState.loginStatus && !localStorage.getItem("isLogged") ?
                <div className='flex justify-between items-center w-full h-screen shadow-md px-32'>
                  <Landing />
                  <Login />
                </div> :

                <div className='w-full h-screen max-w-[1020px] shadow-sm px-10'>
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
