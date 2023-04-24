import {useReducer, useRef} from 'react';
import RussiaSVG from '../../components/maps/russia/russia';
import {checkPage, cssMapGenerator, diagramData, getFieldByName, getRussianInfo, ticketMargin} from "../../Constants";
import {useGlobalContext} from "../../shared/context";
import {RussiaActionType} from "../../shared/store";

function mapReducer(states: any, actions: any) {
    actions.map((action: any) => {
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

function RenderRussiaMap() {
    const {russiaStates} = useGlobalContext();
    const russiaData = russiaStates[RussiaActionType.russiaRegionsData]

    const [dataStates, updateDataStates] = useReducer(mapReducer, mapInit, i => i)
    const ticketRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    if (!russiaStates || !russiaData) return <></>
    function onMapClick(e: any, region: string) {
        updateDataStates([{type: 'activeRegion', data: region},]);
        updateTicket(e);
    }

    function getTicketPos(x: number, y: number, width: number, height: number) {
        let left, top;
        if (x < width / 2) {
            left = x + ticketMargin + 'px';
        } else {
            left = x - width - ticketMargin + 'px';
        }

        if (y < height / 2) {
            top = y + ticketMargin + 'px';
        } else {
            top = y - height - ticketMargin + 'px';
        }
        return {top, left}
    }

    function updateTicket(e: any) {
        if (mapRef.current === null || ticketRef.current === null) {
            return;
        }
        const {left, top} = getTicketPos(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
            mapRef.current.clientWidth,
            mapRef.current.clientHeight)

        updateDataStates([{
            type: 'ticketPos', data: {left: left, top: top}
        }])
    }

    if (dataStates.preparedData === null) {
        updateDataStates([{type: 'preparedData', data: getRussianInfo(russiaData)}]);
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
                <ul style={{margin: 0, padding: 0}}>{diagramData.cases.label}: {dataStates.activeRegion ? new Intl.NumberFormat('en')
                    .format(getFieldByName(dataStates.preparedData, dataStates.activeRegion, 'cases')) : 0}</ul>
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

export default RenderRussiaMap;
