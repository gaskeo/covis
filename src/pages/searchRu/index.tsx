import {useReducer, useState} from 'react';
import {
    badColor,
    diagramData, generateLast30Days, generateLinkByRegId,
    getRegionByName, russia,
} from "../../Constants";
import axios from "axios";
import {useGlobalContext} from "../../shared/context";
import {RussiaActionType, WorldActionTypes} from "../../shared/store";
import {getRegionData} from "../../shared/api";
import {Search} from "../../components/search/search";
import {RegionCharts} from "../../components/regionCharts";

function regionReducer(states: any, actions: any) {
    actions.map((action: any) => {
        states[action.type] = action.data;
        return action;
    });
    return {...states};
}

const regionInit = {
    regionData: null,
    regionDataRequired: false,
}


async function searchRegion(regIndex: number) {
    return axios.get(generateLinkByRegId(regIndex))
        .then((r) => r.data
        )
}

function SearchRuPage() {
    const [regionStates, updateRegionStates] = useReducer(regionReducer, regionInit, i => i);

    const {russiaStates} = useGlobalContext();
    const russianData = russiaStates[RussiaActionType.russiaRegionsIds]
    if (!russiaStates|| !russianData || !russiaStates[RussiaActionType.russiaRegionsIds]) return <></>

    function getRegion(region: string) {
        const regionIndex = getRegionByName(russianData, region);
        if (regionIndex !== -1) {
            getRegionData(regionIndex).then(d => updateRegionStates([
                {type: 'regionData', data: d},
                {type: 'regionDataRequired', data: false},
            ]));
        }
    }

    const names = russianData.map(d => d.name.toLowerCase()).sort((a, b) => a.localeCompare(b));
    let mainData;
    if (regionStates.regionDataRequired) {
        mainData = <div>loading...</div>;
    }
    return <div style={{width: '100%'}}>
        <Search suggestions={names} onSubmit={(region: string) => {
            getRegion(region);
        }}/>
        {mainData}
        <RegionCharts regionHistory={regionStates.regionData}/>
    </div>
}

export {SearchRuPage};