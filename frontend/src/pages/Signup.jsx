import { useStateContext } from "../context/ContextProvider";
const Signup = () => {
    const { boolingState, setBoolingState } = useStateContext();
    const handleLoadSignUp = () => {
        setBoolingState({ ...boolingState, isSignNotLog: true })
    }

    return (
        <div onClick={handleLoadSignUp}>Signup</div>
    )
}

export default Signup