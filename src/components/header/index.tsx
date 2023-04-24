import styles from "./styles/header.module.css";
import {Logo} from "../logo";

const Header = () => {
    return (
        <header className={styles.header}>
            <div>
                <Logo/>
            </div>
        </header>
    )
};

export {Header};