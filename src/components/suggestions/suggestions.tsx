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
            <button className={styles.CloseButton} onClick={() => onClose()}>
                <svg viewBox="0 0 40 40">
                    <path className="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"/>
                </svg>
            </button>
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