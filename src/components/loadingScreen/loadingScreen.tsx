import styles from "./loadingScreen.module.css";
import Mascot from "../mascot/mascot";

export default function LoadingScreen() {
    return(
        <div className={styles.container}>

            <img className={styles.logo} src="/logo.png" alt="" />

            <Mascot />
        </div>
    );
}