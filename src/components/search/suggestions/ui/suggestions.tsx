import React from "react";
import styles from "../styles/suggestions.module.css";

interface SuggestionsProps {
    elems: string[];
    onClick: (elem: string) => void;
}


const Suggestions = ({elems, onClick}: SuggestionsProps) => {
    return (
        <div className={styles.suggestionBlock}>
            <div className={styles.suggestions}>
                {elems.map(elem => (
                    <p onClick={() => onClick(elem)} key={elem}>
                        <span style={{textTransform: 'capitalize'}}>{elem}</span>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Suggestions;
