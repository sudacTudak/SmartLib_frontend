import { ReactNode } from "react";
import styles from './PrimaryText.module.scss';
import classNames from "classnames";


interface IPrimaryTextProps {
    children: ReactNode;
    className?: string;
}

export function PrimaryText({children, className}: IPrimaryTextProps) {
    return <span className={classNames(styles.text, className)}>{children}</span>
}