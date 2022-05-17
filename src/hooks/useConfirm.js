import { useDispatch, useSelector } from "react-redux"
import { hideConfirm, showConfirm } from "../store/preferences/preferences.slice"

let resolveCallback
export const useConfirm = () => {

    const { isConfirmShown: isShown, confirmText: text } = useSelector(({ preferencesModule }) => preferencesModule)
    const dispatch = useDispatch()

    const onConfirm = () => {
        closeConfirm()
        resolveCallback(true)
    }

    const onCancel = () => {
        closeConfirm()
        resolveCallback(false)
    }

    const confirm = (text) => {
        dispatch(showConfirm(text))
        return new Promise((res, rej) => {
            resolveCallback = res
        })
    }

    const closeConfirm = () => {
        dispatch(hideConfirm())
    }

    return { confirm, onConfirm, onCancel, isShown, text }
}