import {useState} from 'react';
import {useGlobalContext} from "../../shared/context";
import {RussiaActionType} from "../../shared/store";
import {getRegionData, RegionHistoryResponse} from "../../shared/api";
import Search from "../../components/search";
import RegionCharts from "../../components/regionCharts";
import {getRegionCodeByName} from "../../shared/utils";

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

    const names = russianData.map(d => d.name.toLowerCase()).sort((a, b) => a.localeCompare(b));

    return <div style={{width: '100%'}}>
        <Search suggestions={names} onSubmit={(region: string) => {
            getRegion(region);
        }}/>
        <RegionCharts regionHistory={regionData}/>
    </div>
}

export {SearchRuPage};