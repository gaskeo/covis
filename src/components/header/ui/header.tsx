import styles from "../styles/header.module.css";
import Logo from "@/src/components/logo";

const Header = () => {
    return (
        <header className={styles.header}>
            <div>
                <Logo/>
            </div>
        </header>
    )
};

export default Header;