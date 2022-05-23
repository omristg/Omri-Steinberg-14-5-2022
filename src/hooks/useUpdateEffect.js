import { useEffect, useRef } from "react"

export const useUpdateEffect = (cb, dependencies) => {

    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted.current) {
            isMounted.current = false
            return
        }
        return cb()
        // eslint-disable-next-line
    }, dependencies)

}