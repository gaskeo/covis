import {useState} from 'react';

import {useGlobalContext} from "../../shared/context";
import {WorldActionTypes} from "../../shared/store";
import {getRegionData, RegionHistoryResponse} from "../../shared/api";
import Search from "../../components/search";
import RegionCharts from "../../components/regionCharts";
import {getRegionCodeByName} from "../../shared/utils";


function SearchPage() {
    const [regionData, updateRegionData] = useState<RegionHistoryResponse | null>(null);

    const {worldStates} = useGlobalContext();
    const worldData = worldStates[WorldActionTypes.countriesIds]
    if (!worldStates || !worldData || !worldStates[WorldActionTypes.countriesIds]) return <></>

    function getRegion(region: string) {
        if (!worldData) return;
        const regionIndex = getRegionCodeByName(worldData, region);
        if (regionIndex) {
            getRegionData(regionIndex).then(d => updateRegionData(d));
        }
    }

    const names = worldData.map(d => d.name.toLowerCase()).sort((a, b) => a.localeCompare(b));
    return <div style={{width: '100%'}}>
        <Search suggestions={names} onSubmit={(region: string) => {
            getRegion(region);
        }}/>
        <RegionCharts regionHistory={regionData}/>
    </div>
}

export {SearchPage};