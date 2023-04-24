import React, {useRef, useState} from 'react';
import RussiaSVG, {RussiaCSS} from '../../components/maps/russia/russia';
import {diagramData, getFieldByName, getRussianInfo} from "../../Constants";
import {useGlobalContext} from "../../shared/context";
import {RussiaActionType} from "../../shared/store";
import {getTicketPos} from "../../shared/utils/position";
import {AbsoluteTooltip, Tooltip} from "../../components/tooltip";


function RenderRussiaMap() {
    const {russiaStates} = useGlobalContext();
    const russiaData = russiaStates[RussiaActionType.russiaRegionsData]

    const ticketRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    const [activeRegion, updateActiveRegion] = useState("");
    const [ticketPos, updateTicketPos] = useState({left: "", top: ""});
    const [preparedData, updatePreparedData] = useState<any[] | null>(null);

    if (!russiaData) return <></>

    if (preparedData === null) {
        updatePreparedData(getRussianInfo(russiaData))
    }

    function onMapClick(e: React.MouseEvent, region: string) {
        updateActiveRegion(region);
        updateTicket(e);
    }

    function updateTicket(e: React.MouseEvent) {
        if (mapRef.current === null || ticketRef.current === null) {
            return;
        }
        const {left, top} = getTicketPos(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
            ticketRef.current.clientWidth,
            ticketRef.current.clientHeight,
            mapRef.current.clientWidth,
            mapRef.current.clientHeight)

        updateTicketPos({left: left, top: top})
    }

    return (
        <div style={{position: "relative"}}>
            <div>
                <AbsoluteTooltip
                    position={ticketPos}
                    tooltipRef={ticketRef}
                    title={activeRegion}
                    text={new Intl.NumberFormat('en')
                        .format(getFieldByName(preparedData, activeRegion, 'cases'))}
                />
            </div>
            <RussiaCSS
                mapRef={mapRef}
                sendClick={onMapClick}
                sendPos={(e) => updateTicket(e)}
                data={preparedData || []}
                color={{r: 220, g: 20, b: 60}}/>
        </div>
    )
}

export default RenderRussiaMap;
