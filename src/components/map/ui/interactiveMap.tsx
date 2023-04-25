import React, {useRef, useState} from "react";
import {getTicketPos} from "../../../shared/utils";
import {AbsoluteTooltip} from "../../tooltip";
import RussiaCSS, {mapType} from "./russia";
import styles from "../../charts/barChart/styles/barChart.module.css";


interface InteractiveMapProps {
    data: mapType;
    color: {r: number, g: number, b: number};
    getTooltip: (activeRegion: string) => {title: string, text: string};
    title?: string;
    subtitle?: string;
}

export default function InteractiveMap({data, color, getTooltip, title: mapTitle, subtitle}: InteractiveMapProps) {
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
            <h2>{mapTitle}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <RussiaCSS
                mapRef={mapRef}
                sendClick={onMapClick}
                sendPos={(e) => updateTicket(e)}
                data={data}
                color={color}/>
        </div>
    )
}