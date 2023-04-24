import React, {useRef, useState} from "react";
import {getTicketPos} from "../../../shared/utils/position";
import {AbsoluteTooltip} from "../../tooltip";
import {mapType, RussiaCSS} from "./russia";


interface InteractiveMapProps {
    data: mapType;
    color: {r: number, g: number, b: number};
    getTooltip: (activeRegion: string) => {title: string, text: string};
}

export function InteractiveMap({data, color, getTooltip}: InteractiveMapProps) {
    const ticketRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    const [activeRegion, updateActiveRegion] = useState("");
    const [ticketPos, updateTicketPos] = useState({left: "-999px", top: ""});

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


    const {title, text} = activeRegion ? getTooltip(activeRegion) : {title: "", text: ""}

    return (
        <div style={{position: "relative"}}>
            <AbsoluteTooltip
                position={ticketPos}
                tooltipRef={ticketRef}
                title={title}
                text={text}
            />
            <RussiaCSS
                mapRef={mapRef}
                sendClick={onMapClick}
                sendPos={(e) => updateTicket(e)}
                data={data}
                color={color}/>
        </div>
    )
}