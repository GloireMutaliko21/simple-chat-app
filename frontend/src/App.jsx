import Landing from './components/Landing';
import Login from './pages/Login';
import { useStateContext } from "./context/ContextProvider";
import Signup from './pages/Signup';

function App() {
  const { boolingState, setBoolingState } = useStateContext();
  return (
    <div className='flex justify-between w-full'>
      <Landing />
      {
        boolingState.isSignNotLog ? <Login /> : <Signup />
      }

    </div>
  )
}

export default App
