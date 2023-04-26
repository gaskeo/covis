import React from 'react';
import {useGlobalContext} from "@/src/shared/context";
import {RussiaActionType} from "@/src/shared/store";
import {dataTypeToMapType, generateHumanDate} from "@/src/shared/utils";
import InteractiveMap from "@/src/components/map/ui/interactiveMap";
import {deathsMapColor} from "@/src/shared/constants";


function DeathsMapRu() {
    const {russiaStates} = useGlobalContext();
    const russiaData = russiaStates[RussiaActionType.russiaRegionsData]

    if (!russiaData) return <></>
    const data = dataTypeToMapType(russiaData)
    return (
        <InteractiveMap
            subtitle={`Последние данные: ${generateHumanDate(new Date(russiaStates.russiaCasesHistory?.info.date || ""), ".")}`}
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
