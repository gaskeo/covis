import React, {useRef, useState} from 'react';
import {RussiaCSS} from '../../components/maps/russia/russia';
import {getFieldByName, getRussianInfo} from "../../Constants";
import {useGlobalContext} from "../../shared/context";
import {RussiaActionType} from "../../shared/store";
import {getTicketPos} from "../../shared/utils/position";
import {AbsoluteTooltip, Tooltip} from "../../components/tooltip";
import {dataTypeToMapType} from "../../shared/utils/dataTypeToMapType";
import {InteractiveMap} from "../../components/maps/russia/interactiveMap";


function DeathsMapRu() {
    const {russiaStates} = useGlobalContext();
    const russiaData = russiaStates[RussiaActionType.russiaRegionsData]

    if (!russiaData) return <></>
    const data = dataTypeToMapType(russiaData)
    return (
            <InteractiveMap
                data={data}
                color={{r: 120, g: 20, b: 60}}
                getTooltip={(l) => ({
                    text: new Intl.NumberFormat('en')
                        .format(data[l].deaths),
                    title: l
                })}
            />
    )
}

export {DeathsMapRu};
