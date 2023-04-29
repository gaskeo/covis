import {useState} from 'react';

import {useGlobalContext} from "@/src/shared/context";
import {WorldActionTypes} from "@/src/shared/store";
import {getRegionData, RegionHistoryResponse} from "@/src/shared/api";
import Search from "@/src/components/search";
import RegionCharts from "@/src/components/regionCharts";
import {getRegionCodeByName} from "@/src/shared/utils";
import StartTyping from "@/src/components/startTyping";


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

    const names = worldData.map(d => d.name).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    return <div style={{width: '100%'}}>
        <Search suggestions={names} onSubmit={(region: string) => {
            getRegion(region);
        }}/>
        {!regionData && <StartTyping/>}
        <RegionCharts regionHistory={regionData}/>
    </div>
}

export {SearchPage};