import { CSSProperties, ReactNode } from "react";
import styles from "./contactLink.module.css";
import Link from "next/link";

interface Props {
    iconColor?: string;
    color?: string;

    href: string;

    children?: ReactNode;
}

export default function ContactLink({ iconColor = '#5e3289', color = '#000', children, href }: Props) {
    return(
        <Link href={href} className={styles.link} style={{ '--color-icon': iconColor, '--color': color } as CSSProperties}>
            {children}
        </Link>
    );
}