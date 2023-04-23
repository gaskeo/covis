import React from "react";

interface SearchElemProps {
    elems: React.ReactNode[];
    onClose: () => void;
}


export const SearchElem = ({elems, onClose}: SearchElemProps) => {
    return (
        <div className='RegionSuggestionBlock'>
            <button className='CloseButton' onClick={() => onClose()}>
                <svg viewBox="0 0 40 40">
                    <path className="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"/>
                </svg>
            </button>
            <div className='RegionSuggestions'>
                {elems.map(e => e)}
            </div>
        </div>
    )
}