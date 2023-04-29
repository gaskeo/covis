import React from "react";
import styles from "../styles/suggestions.module.css";

interface SuggestionsProps {
    elems: { key: string, value: React.ReactNode }[];
    onClick: (elem: string) => void;
}


const Suggestions = ({elems, onClick}: SuggestionsProps) => {
    return (
        <div className={styles.suggestionBlock}>
            <div className={styles.suggestions}>
                {elems.map(elem => (
                    <p onClick={() => onClick(elem.key)} key={elem.key}>
                        <span>{elem.value}</span>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Suggestions;
