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
      <div className="w-full shadow-sm px-32">

        {
          !boolingState.isSignNotLog ?
            <div className='w-full'>
              {!boolingState.loginStatus && !localStorage.getItem("isLogged") ?
                <div className='flex justify-between items-center'>
                  <Landing />
                  <Login />
                </div> :

                <div className='min-w-[960px] py-10'>
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
