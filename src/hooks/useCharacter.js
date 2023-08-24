import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useCharacter(url,query) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal

        async function fetchData() {
            try {
                setIsLoading(true)
                const { data } = await axios.get(`${url}=${query}`, { signal })
                setCharacters(data.results.slice(0, 4))
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setCharacters([])
                    toast.error(err?.response?.data?.error)
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }
    }, [query])

    return { isLoading, characters }
}