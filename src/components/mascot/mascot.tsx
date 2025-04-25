import styles from "./mascot.module.css";

export default function Mascot() {
    return(
        <svg className={styles.mascot} width="57" height="53" viewBox="0 0 57 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="34.5" cy="34.5" r="34.5" fill="#FFDE00"/>
            <ellipse cx="14.5" cy="26.5" rx="6.5" ry="10.5" fill="white"/>
            <ellipse cx="12.5" cy="23.5" rx="3.5" ry="5.5" fill="black"/>
            <ellipse cx="32.5" cy="18.5" rx="6.5" ry="10.5" fill="white"/>
            <ellipse cx="30.5" cy="15.5" rx="3.5" ry="5.5" fill="black"/>
        </svg>
    );
}