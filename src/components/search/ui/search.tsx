import React, {useRef, useState} from "react";
import Suggestions from "../suggestions";
import styles from "../styles/search.module.css";
import {useBlur} from "../../../shared/hooks";
import NothingToShow from "../../nothingToShow";

interface SearchProps {
    onSubmit: (value: string) => void;
    suggestions: string[];
}


export default function Search({suggestions, onSubmit}: SearchProps) {
    const searchRef = useRef<HTMLDivElement>(null);
    useBlur<HTMLDivElement>(searchRef, () => updateIsSearch(false));

    const [searchValue, updateSearchValue] = useState("");

    const filteredSuggestions = suggestions.filter(s => s.toLowerCase().includes(searchValue.toLowerCase()))
    const [isSearch, updateIsSearch] = useState(false);

    const _onSubmit = (value: string) => {
        updateIsSearch(false);
        updateSearchValue(value);
        onSubmit(value);
    }

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
                        (searchValue.length && filteredSuggestions.length && filteredSuggestions[0].startsWith(searchValue)) ?
                            <span className={styles.suggestion}>{searchValue}
                                <span>
                                {filteredSuggestions[0].slice(searchValue.length)}
                            </span>
                        </span> : <></>
                    }
                    <button className={styles.searchButton} disabled={!filteredSuggestions.length} type="submit">
                        Найти
                    </button>
                </form>
                {(isSearch && filteredSuggestions.length) ?
                    <Suggestions
                        elems={filteredSuggestions}
                        onClick={(r) => _onSubmit(r)}
                    /> : <></>
                }
                {(isSearch && !filteredSuggestions.length) ? <NothingToShow/> : <></>}
            </div>
        </>
    )
}