import React from "react";
import styles from "../styles/logo.module.css"

const Logo = () => {
    return (
        <div className={styles.logo}>
            <h1>co<span className={styles.redBack}>vis</span></h1>
        </div>
    )
}

export default Logo;