import { useEffect, useState } from "react"

export const useDebounce = (value, delay = 300) => {

    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(timeoutId)
        }
    }, [value, delay])

    return debouncedValue
}