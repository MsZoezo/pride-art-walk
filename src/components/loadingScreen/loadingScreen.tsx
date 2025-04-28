import styles from "./loadingScreen.module.css";
import Mascot from "../mascot/mascot";
import Spinner from "../spinner/spinner";

export default function LoadingScreen() {
    return(
        <div className={styles.container}>

            <img className={styles.logo} src="/logo.png" alt="" />

            <Spinner />

            <Mascot />
        </div>
    );
}