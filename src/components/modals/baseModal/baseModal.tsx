import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import styles from "./baseModal.module.css"

interface Props {
    isOpen: boolean;
    onClose: () => void;

    children: ReactNode;
}

export default function BaseModal({ isOpen, onClose, children }: Props) {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const html = document.documentElement;

        const scrollBarWidth = window.innerWidth - html.clientWidth;
        html.style.setProperty('--padding', `${scrollBarWidth}px`);

        html.classList.toggle('modal', isOpen);

        return () => html.classList.remove('modal');
    }, [isOpen]);

    useEffect(() => {
        if(!isOpen) return;

        const controller = new AbortController();
        const modal = modalRef.current!;

        document.addEventListener('pointerdown', evt => {
            if(modal.contains(evt.target as Node)) return;

            onClose();
        }, { signal: controller.signal });

        document.addEventListener('keydown', evt => {
            if(evt.key !== 'Escape') return;

            onClose();
        }, { signal: controller.signal });

        /* Make sure we can't click through on touch devices */
        modal.parentElement!.addEventListener('touchstart', evt => {
            if(modal.contains(evt.target as Node)) return;

            evt.preventDefault()
        });

        return () => controller.abort();
    }, [isOpen]);

    return (
        <div className={`${styles.wrapper} ${isOpen ? styles.open : styles.close}`}>
        <div className={styles.modal} ref={modalRef}>
            <div className={styles.inner}>
                <div className={styles.bar}>
                    <button onClick={onClose} className={styles.closeButton}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
        </div>
    );
}