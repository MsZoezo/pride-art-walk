import styles from "./spinner.module.css";

interface Props {
    color?: string;
}

export default function Spinner({ color }: Props) {
    return(
        <svg className={styles.spinner} fill={color ? color : '#ffde00'} viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="8" r="3">
                <animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="8;3;8" keySplines=".33,.66,.66,1;.33,0,.66,.33"/>
            </circle>
            <circle cx="12" cy="8" r="3">
                <animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="8;3;8" keySplines=".33,.66,.66,1;.33,0,.66,.33"/>
            </circle>
            <circle cx="20" cy="8" r="3">
                <animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="8;3;8" keySplines=".33,.66,.66,1;.33,0,.66,.33"/>
            </circle>
        </svg>
    );
}