import {useState} from 'react';
import {useGlobalContext} from "@/src/shared/context";
import {RussiaActionType} from "@/src/shared/store";
import {getRegionData, RegionHistoryResponse} from "@/src/shared/api";
import Search from "@/src/components/search";
import RegionCharts from "@/src/components/regionCharts";
import {getRegionCodeByName} from "@/src/shared/utils";
import StartTyping from "@/src/components/startTyping";

function SearchRuPage() {
    const [regionData, updateRegionData] = useState<RegionHistoryResponse | null>(null);

    const {russiaStates} = useGlobalContext();
    const russianData = russiaStates[RussiaActionType.russiaRegionsIds]
    if (!russiaStates|| !russianData || !russiaStates[RussiaActionType.russiaRegionsIds]) return <></>

    function getRegion(region: string) {
        if (!russianData) return;
        const regionIndex = getRegionCodeByName(russianData, region);
        if (regionIndex) {
            getRegionData(regionIndex).then(d => updateRegionData(d));
        }
    }

    const names = russianData.map(d => d.name).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    return <div style={{width: '100%'}}>
        <Search suggestions={names} onSubmit={(region: string) => {
            getRegion(region);
        }}/>
        {!regionData && <StartTyping/>}
        <RegionCharts regionHistory={regionData}/>
    </div>
}

export {SearchRuPage};