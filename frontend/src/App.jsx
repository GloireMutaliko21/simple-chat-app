import Landing from './components/Landing';
import Login from './pages/Login';
import { useStateContext } from "./context/ContextProvider";
import Signup from './pages/Signup';

function App() {
  const { boolingState, setBoolingState } = useStateContext();
  return (
    <div className='flex justify-between items-center w-full shadow-md px-32'>
      <Landing />
      {
        !boolingState.isSignNotLog ? <Login /> : <Signup />
      }

    </div>
  )
}

export default App
