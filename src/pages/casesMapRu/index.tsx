import React from 'react';
import {useGlobalContext} from "@/src/shared/context";
import {RussiaActionType} from "@/src/shared/store";
import InteractiveMap from "@/src/components/map/ui/interactiveMap";
import {dataTypeToMapType, generateHumanDate} from "@/src/shared/utils";
import {casesMapColor} from "@/src/shared/constants";


function CasesMapRu() {
    const {russiaStates} = useGlobalContext();
    const russiaData = russiaStates[RussiaActionType.russiaRegionsData]

    if (!russiaData) return <></>
    const data = dataTypeToMapType(russiaData)
    return (
        <InteractiveMap
            data={data}
            subtitle={`Последние данные: ${generateHumanDate(new Date(russiaStates.russiaCasesHistory?.info.date || ""), ".")}`}
            color={casesMapColor}
            getTooltip={(l) => ({
                text: new Intl.NumberFormat('en')
                    .format(data[l].cases),
                title: l
            })}
        />
    )
}

export {CasesMapRu};
