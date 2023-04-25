import React from 'react';
import {useGlobalContext} from "../../shared/context";
import {RussiaActionType} from "../../shared/store";
import InteractiveMap from "../../components/map/ui/interactiveMap";
import {dataTypeToMapType, generateHumanDate} from "../../shared/utils";
import {casesMapColor} from "../../shared/constants";


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
