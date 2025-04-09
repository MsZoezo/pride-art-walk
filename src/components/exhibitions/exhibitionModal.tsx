import styles from './exhibitionModal.module.css';

interface Props {
    open: boolean,
    onClose: () => void;
}

export default function ExhibitionModal ({ open, onClose }:Props) {
    return (
        open && (
            <div className={styles.background}>
                <div className={styles.card}>
                    { "Hi! :)" }
                    <button onClick={onClose}>Close modal</button>
                </div>
            </div>
        )
    )
}