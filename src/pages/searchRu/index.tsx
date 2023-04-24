import {useReducer} from 'react';
import {useGlobalContext} from "../../shared/context";
import {RussiaActionType} from "../../shared/store";
import {getRegionData} from "../../shared/api";
import Search from "../../components/search";
import RegionCharts from "../../components/regionCharts";
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


function SearchRuPage() {
    const [regionStates, updateRegionStates] = useReducer(regionReducer, regionInit, i => i);

    const {russiaStates} = useGlobalContext();
    const russianData = russiaStates[RussiaActionType.russiaRegionsIds]
    if (!russiaStates|| !russianData || !russiaStates[RussiaActionType.russiaRegionsIds]) return <></>

    function getRegion(region: string) {
        if (!russianData) return;
        const regionIndex = getRegionCodeByName(russianData, region);
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