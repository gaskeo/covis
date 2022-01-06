import {useReducer, useRef} from 'react';
import RussiaSVG from './Russia'
import {checkPage, cssMapGenerator, getRussianInfo, ticketMargin} from "./Constants";

function mapReducer(states, actions) {
    actions.map(action => {
        states[action.type] = action.data;
        return action;
    });
    return {...states};
}

const mapInit = {
    activeRegion: '',
    preparedData: null,
    ticketPos: null,
}

function RenderRussiaCasesMap(props) {
    const [dataStates, updateDataStates] = useReducer(mapReducer, mapInit, i => i)

    const ticketRef = useRef(null);
    const mapRef = useRef(null);

    function onMapClick(e, region) {
        updateDataStates([{type: 'activeRegion', data: region},]);
        updateTicket(e);
    }

    function updateTicket(e) {
        if (mapRef.current === null || ticketRef.current === null) {
            return;
        }

        let left, top;
        if (e.nativeEvent.offsetX < mapRef.current.clientWidth / 2) {
            left = e.nativeEvent.offsetX + ticketMargin + 'px';
        } else {
            left = e.nativeEvent.offsetX - ticketRef.current.clientWidth - ticketMargin + 'px';
        }

        if (e.nativeEvent.offsetY < mapRef.current.clientHeight / 2) {
            top = e.nativeEvent.offsetY + ticketMargin + 'px';
        } else {
            top = e.nativeEvent.offsetY - ticketRef.current.clientHeight - ticketMargin + 'px';
        }
        updateDataStates([{
            type: 'ticketPos', data: {left: left, top: top}
        }])
    }

    function getCasesByName(r) {
        for (let d of dataStates.preparedData) {
            if (d.name === r) {
                return d.cases;
            }
        }
        return 0;
    }

    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    if (dataStates.preparedData === null && props.data !== null) {
        updateDataStates([{type: 'preparedData', data: getRussianInfo(props.data)}]);
    }

    let cssBlock;
    if (dataStates.preparedData === null) {
        cssBlock = <div>loading...</div>;
    } else {
        cssBlock = cssMapGenerator(dataStates.preparedData, {r: 220, g: 20, b: 60})
    }

    let tt =
        <div ref={ticketRef} className='MapToolTip'
             style={{...dataStates.ticketPos, opacity: dataStates.activeRegion ? 1 : 0}}>
            <div className='MapToolTipText'>
                <p style={{margin: 0}}>{dataStates.activeRegion}</p>
                <ul style={{margin: 0, padding: 0}}>случаев
                    заболевания: {dataStates.activeRegion ? new Intl.NumberFormat('en').format(getCasesByName(dataStates.activeRegion)) : 0}</ul>
            </div>
        </div>

    const mapElem = <div ref={mapRef}>
        <RussiaSVG sendClick={onMapClick} sendPos={(e) => updateTicket(e)}/>
    </div>

    return <div style={{position: "relative"}}>
        {tt}
        {cssBlock}
        {mapElem}
    </div>
}

export default RenderRussiaCasesMap;
