import { motion } from "framer-motion"


export function Backdrop({ handleClose }) {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="backdrop" onClick={handleClose}
        />
    )
}

Backdrop.defaultProps = {
    handleClose: null
}