import styles from "../styles/startTyping.module.css";

const StartTyping = () => {
    return (
        <div className={styles.startTyping}>
            <span>🔎</span>
            <h3>Информация о случаях заражения и смерти в регионе</h3>
            <p>Начните вводить текст в поле выше</p>
        </div>
    )
}

export default StartTyping;