import React, {useRef, useState} from "react";
import Suggestions from "../suggestions";
import styles from "../styles/search.module.css";
import {useBlur} from "@/src/shared/hooks";
import NothingToShow from "@/src/components/nothingToShow";

interface SearchProps {
    onSubmit: (value: string) => void;
    suggestions: string[];
}


export default function Search({suggestions, onSubmit}: SearchProps) {
    const searchRef = useRef<HTMLDivElement>(null);
    useBlur<HTMLDivElement>(searchRef, () => updateIsSearch(false));

    const [searchValue, updateSearchValue] = useState("");

    const filteredSuggestions =
        suggestions
            .filter(s => s.toLowerCase().includes(searchValue.toLowerCase().trim()))
            .sort((a, b) => {
                const aStarts = a.toLowerCase().startsWith(searchValue.toLowerCase());
                const bStarts = b.toLowerCase().startsWith(searchValue.toLowerCase());

                return (aStarts && !bStarts && -1) || (!aStarts && bStarts && 1) || 0;
            })
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
                        (searchValue.length && filteredSuggestions.length && filteredSuggestions[0].toLowerCase().startsWith(searchValue.toLowerCase())) ?
                            <span className={styles.suggestion}>
                                {searchValue}
                                <span>
                                {filteredSuggestions[0].slice(searchValue.length)}
                            </span>
                        </span> : <></>
                    }
                    <button className={styles.searchButton} disabled={!filteredSuggestions.length} type="submit">
                        Найти
                    </button>
                </form>
                {(isSearch && filteredSuggestions.length) &&
                    <Suggestions
                        elems={filteredSuggestions.map(suggestion => {
                            let offset = 0;
                            if (!searchValue) {
                                return {
                                    key: suggestion,
                                    value: suggestion
                                };
                            }
                            return {
                                key: suggestion,
                                value:
                                    <>
                                        {suggestion.toLowerCase()
                                            .split(searchValue.toLowerCase())
                                            .map((elem, index) => {
                                                const offsetWithElem = offset + elem.length;
                                                const offsetWithElemAndSearch = offsetWithElem + searchValue.length;
                                                const component =
                                                    <span key={elem + index.toString()}>
                                                        {suggestion.slice(offset, offsetWithElem)}
                                                        <span style={{backgroundColor: "var(--color-success)"}}>
                                                            {suggestion.slice(offsetWithElem, offsetWithElemAndSearch)}
                                                        </span>
                                                    </span>;
                                                offset = offsetWithElemAndSearch;
                                                return component;
                                            })
                                        }
                                    </>
                            };
                        })}
                        onClick={(r) => _onSubmit(r)}
                    />
                }
                {(isSearch && !filteredSuggestions.length) && <NothingToShow/>}
            </div>
        </>
    )
}