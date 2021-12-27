import {useReducer, useRef, useState} from 'react';
import RussiaSVG from './Russia'
import {checkPage} from "./Constants";
import {Tooltip} from "recharts";

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
        let margin = 3
        updateDataStates([{
            type: 'ticketPos', data: {
                left: e.nativeEvent.layerX < mapRef.current.clientWidth / 2 ? e.nativeEvent.layerX  + margin + 'px' : e.nativeEvent.layerX - ticketRef.current.clientWidth - margin + 'px',
                top: e.nativeEvent.layerY < mapRef.current.clientHeight / 2 ? e.nativeEvent.layerY + margin + 'px' : e.nativeEvent.layerY - ticketRef.current.clientHeight - margin + 'px'
            }
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
        const data = Object.keys(props.data).map(d => {
            if (props.data[d]['info']['name'] === "Россия" || props.data[d]['info']['name'] === "Москва") {
                return null;
            }
            return props.data[d]['info']
        }).filter(a => a);
        updateDataStates([{type: 'preparedData', data: data}]);
    }

    let cssBlock;
    if (dataStates.preparedData === null) {
        cssBlock = <div>loading...</div>;
    } else {
        cssBlock = dataStates.preparedData.map((d, index) => {
            let name = d.name
            let opacity = Math.max(d.cases / d.population * 6, 0.05);
            let cssText = `polyline[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        polygon[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        g[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        path[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}`
            return <style key={index} type='text/css'>{cssText}</style>
        })
    }

    let tt = <div className='MapToolTip' style={{color: 'transparent'}}><h4>1</h4><p>1</p></div>;
    if (dataStates.activeRegion) {
        tt =
            <div ref={ticketRef} className='MapToolTip'
                 style={dataStates.ticketPos ? {padding: 'auto', ...dataStates.ticketPos} : {}}>
                <h4>{dataStates.activeRegion}</h4>
                <p>случаев
                    заболевания: {new Intl.NumberFormat('en').format(getCasesByName(dataStates.activeRegion))}</p>
            </div>
    }
    const mapElem = <div ref={mapRef}>
        <RussiaSVG sendClick={onMapClick} sendPos={(e) => updateTicket(e)}/>
    </div>

    return <div style={{position: "relative"}}>
        <Tooltip formatter={() => '123'}/>
        {tt}
        {cssBlock}
        {mapElem}
    </div>
}

export default RenderRussiaCasesMap;
