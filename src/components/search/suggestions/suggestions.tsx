import React from "react";
import styles from "./styles/suggestions.module.css";

interface SuggestionsProps {
    elems: string[];
    onClose: () => void;
    onClick: (elem: string) => void;
}


export const Suggestions = ({elems, onClose, onClick}: SuggestionsProps) => {
    return (
        <div className={styles.RegionSuggestionBlock}>
            <div className={styles.RegionSuggestions}>
                {elems.map(elem => (
                    <p onClick={() => onClick(elem)} key={elem}>
                        <span style={{textTransform: 'capitalize'}}>{elem}</span>
                    </p>
                ))}
            </div>
        </div>
    )
}