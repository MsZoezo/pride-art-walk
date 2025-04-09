import { Dispatch, ReactNode, SetStateAction } from "react";
import styles from "./baseModal.module.css"

interface Props {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;

    children: ReactNode;
}

export default function BaseModal({ isOpen, setOpen, children }: Props) {
    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
            <div className={styles.inner}>
                <div className={styles.bar}>
                    <button onClick={() => setOpen(false)} className={styles.closeButton}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}