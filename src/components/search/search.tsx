import React, {useEffect, useRef, useState} from "react";
import {Suggestions} from "./suggestions/suggestions";
import styles from "./styles/search.module.css";

interface SearchProps {
    onSubmit: (value: string) => void;
    suggestions: string[];
}

const useBlur = <T extends HTMLElement, >(elementRef: React.RefObject<T>, onBlur: () => void) => {
    useEffect(() => {
        const root = document.getRootNode();
        const listener = (event: Event) => {
            if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
                onBlur();
            }
        }
        root.addEventListener("click", listener)
        return () => root.removeEventListener("click", listener)
    }, [])
}

function isStringInArray(data: string, array: string[]) {
    return array.map(s => s.toLowerCase())
        .includes(data.toLowerCase())
}

export function Search({suggestions, onSubmit}: SearchProps) {
    const searchRef = useRef<HTMLDivElement>(null);
    useBlur<HTMLDivElement>(searchRef, () => updateIsSearch(false));

    const [searchValue, updateSearchValue] = useState("");

    const filteredSuggestions = suggestions.filter(s => s.toLowerCase().includes(searchValue.toLowerCase()))
    const [isSearch, updateIsSearch] = useState(false);

    const inputInSuggestions = isStringInArray(searchValue, suggestions);


    const _onSubmit = (value: string) => {
        updateIsSearch(false);
        updateSearchValue(value);
        onSubmit(value);
    }

    console.log(filteredSuggestions[0])
    return (
        <>
            <div className={`${styles.blur} ${!isSearch && styles.noBlur}`}/>
            <div className={styles.searchContainer}
                 ref={searchRef}
            >
                <form
                    onFocus={() => updateIsSearch(true)}
                    autoFocus
                    className={styles.inputContainer}
                    onSubmit={e => {
                        e.preventDefault();
                        if (filteredSuggestions[0]) {
                            _onSubmit(filteredSuggestions[0])
                        }
                    }}
                >
                    <input
                        onFocus={() => updateIsSearch(true)}

                        type='text'
                        className={styles.input}
                        list='suggestions'
                        value={searchValue}
                        onChange={e => {
                            updateSearchValue(e.target.value);
                            updateIsSearch(true)
                        }}
                        placeholder='Введите регион'

                    />
                    {
                        (searchValue.length && filteredSuggestions.length) ?
                        <span className={styles.suggestion}>{searchValue}
                            <span>
                                {filteredSuggestions[0].slice(searchValue.length)}
                            </span>
                        </span> : <></>
                    }
                    <button className={styles.button} disabled={!filteredSuggestions.length} type="submit">
                        Найти
                    </button>
                </form>
                {isSearch && <Suggestions
                    onClose={() => undefined}
                    elems={filteredSuggestions}
                    onClick={(r) => _onSubmit(r)}
                />
                }
            </div>
        </>
    )
}