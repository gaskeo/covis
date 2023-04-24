import React from 'react';
import {useGlobalContext} from "../../shared/context";
import {RussiaActionType} from "../../shared/store";
import {dataTypeToMapType} from "../../shared/utils";
import InteractiveMap from "../../components/map/ui/interactiveMap";
import {deathsMapColor} from "../../shared/constants";


function DeathsMapRu() {
    const {russiaStates} = useGlobalContext();
    const russiaData = russiaStates[RussiaActionType.russiaRegionsData]

    if (!russiaData) return <></>
    const data = dataTypeToMapType(russiaData)
    return (
        <InteractiveMap
            data={data}
            color={deathsMapColor}
            getTooltip={(l) => ({
                text: new Intl.NumberFormat('en')
                    .format(data[l].deaths),
                title: l
            })}
        />
    )
}

export {DeathsMapRu};
