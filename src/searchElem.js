export const SearchElem = (props) => {
    return (
        <div className='RegionSuggestionBlock'>
            <button className='CloseButton' onClick={() => props.onClose()}>
                <svg viewBox="0 0 40 40">
                    <path className="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"/>
                </svg>
            </button>
            <div className='RegionSuggestions'>
                {props.elems.map(e => e)}
            </div>
        </div>
    )
}