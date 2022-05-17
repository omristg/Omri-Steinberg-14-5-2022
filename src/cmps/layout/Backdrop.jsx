import { motion } from "framer-motion"


export function Backdrop({ handleClose, isClosable }) {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="backdrop"
            onClick={handleClose}
            style={{ cursor: isClosable ? 'pointer' : 'auto' }}
        />
    )
}

