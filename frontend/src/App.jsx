import Landing from './components/Landing';
import Login from './pages/Login';
import { useStateContext } from "./context/ContextProvider";
import Signup from './pages/Signup';
import Contact from './components/Contact';

function App() {
  const { boolingState, setBoolingState } = useStateContext();
  return (
    <div className='flex justify-between items-center w-full h-screen shadow-md px-32'>
      <Landing />
      {
        !boolingState.isSignNotLog ?
          <div className=''>
            {!boolingState.loginStatus ?
              <Login /> :
              <div className='w-screen h-screen'>
                <Contact />
              </div>
            }
          </div> :
          <Signup />
      }

    </div>
  )
}

export default App
