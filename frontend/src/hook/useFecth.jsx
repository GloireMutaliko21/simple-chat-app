import { useStateContext } from "../context/ContextProvider";

export async function fetchData(data, setdata, url) {
    const { boolingState, setBoolingState } = useStateContext();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async function () {

        })();

        return () => {
            second
        }
    }, [third])

}