import { motion } from 'framer-motion';
import { BsShieldExclamation } from 'react-icons/bs'
import { useConfirm } from '../../hooks/useConfirm';

import { Backdrop } from './Backdrop';

export const ConfirmDialog = () => {

    const { onConfirm, onCancel, isShown, text } = useConfirm();

    if (!isShown) return <></>

    return (
        <motion.div className="confirm-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
        >
            <Backdrop />
            <div className="content">
                <BsShieldExclamation className="icon" />
                {text && (
                    <p>{text}</p>
                )}
                <div className="actions">
                    <button className="btn-accept" onClick={onConfirm}>yes</button>
                    <button className="btn-decline" onClick={onCancel}>No</button>
                </div>
            </div>
        </motion.div>
    )

}
