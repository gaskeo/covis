import styles from "../styles/nothingToShow.module.css";

const NothingToShow = () => {
    return (
        <div className={styles.nothingToShow}>
            <span>😔</span>
            <h3>Ничего не найдено</h3>
            <p>Попробуйте другой запрос</p>
        </div>
    )
}

export default NothingToShow;