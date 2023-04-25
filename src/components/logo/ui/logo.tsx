import React from "react";
import styles from "../styles/logo.module.css"
import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className={styles.logo}>
                <h1>co<span className={styles.redBack}>vis</span></h1>
        </Link>
    )
}

export default Logo;