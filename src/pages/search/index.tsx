import {useReducer} from 'react';

import {useGlobalContext} from "../../shared/context";
import {WorldActionTypes} from "../../shared/store";
import {getRegionData} from "../../shared/api";
import {Search} from "../../components/search/search";
import {RegionCharts} from "../../components/regionCharts";
import {getRegionCodeByName} from "../../shared/utils/getters";

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

function SearchPage() {
    const [regionStates, updateRegionStates] = useReducer(regionReducer, regionInit, i => i);

    const {worldStates} = useGlobalContext();
    const worldData = worldStates[WorldActionTypes.countriesIds]
    if (!worldStates || !worldData || !worldStates[WorldActionTypes.countriesIds]) return <></>

    function getRegion(region: string) {
        if (!worldData) return;
        const regionIndex = getRegionCodeByName(worldData, region);
        if (regionIndex) {
            getRegionData(regionIndex).then(d => updateRegionStates([
                {type: 'regionData', data: d},
                {type: 'regionDataRequired', data: false},
            ]));
        }
    }

    const names = worldData.map(d => d.name.toLowerCase()).sort((a, b) => a.localeCompare(b));
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

export {SearchPage};