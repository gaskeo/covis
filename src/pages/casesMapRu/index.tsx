import React from 'react';
import {useGlobalContext} from "../../shared/context";
import {RussiaActionType} from "../../shared/store";
import {InteractiveMap} from "../../components/maps/russia/interactiveMap";
import {dataTypeToMapType} from "../../shared/utils/dataTypeToMapType";
import {casesMapColor} from "../../constants";


function CasesMapRu() {
    const {russiaStates} = useGlobalContext();
    const russiaData = russiaStates[RussiaActionType.russiaRegionsData]

    if (!russiaData) return <></>
    const data = dataTypeToMapType(russiaData)
    return (
        <InteractiveMap
            data={data}
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
