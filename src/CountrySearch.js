import {useReducer, useState} from 'react';
import {
    badColor,
    diagramData, generateLinkByRegId,
    getRegionByName,
    getRegionData
} from "./Constants";
import axios from "axios";
import {LineChartContainer} from "./components/charts/lineChart/lineChartContainer";
import {Search} from "./components/search/search";

function regionReducer(states, actions) {
    actions.map(action => {
        states[action.type] = action.data;
        return action;
    });
    return {...states};
}

const regionInit = {
    regionData: null,
    regionDataRequired: false,
    foundRegion: ''
}


async function searchRegion(regIndex) {
    return axios.get(generateLinkByRegId(regIndex))
        .then((r) => r.data
        )
}

function RenderCountrySearch(props) {
    const [regionStates, updateRegionStates] = useReducer(regionReducer, regionInit, i => i);

    if (!props.data) {
        return null;
    }

    function getRegion(region) {
        const regionIndex = getRegionByName(props.data, region);
        if (regionIndex !== -1) {
            searchRegion(regionIndex).then(d => updateRegionStates([
                {type: 'regionData', data: d},
                {type: 'foundRegion', data: region},
                {type: 'regionDataRequired', data: false},
            ]));
        }
    }
    const names = props.data.map(d => d.name.toLowerCase()).sort((a, b) => a.localeCompare(b));
    let mainData;
    if (regionStates.regionDataRequired === true) {
        mainData = <div>loading...</div>;
    } else if (regionStates.regionData !== null) {
        const [cases, minCases, maxCases] = getRegionData(regionStates.regionData, 'cases', diagramData.cases.label)
        const [deaths, minDeaths, maxDeaths] = getRegionData(regionStates.regionData, 'deaths', diagramData.deaths.label)

        mainData = <div>
            <LineChartContainer
                title={
                    <>
                        Случаи заболевания по стране: <span
                        style={{textTransform: 'capitalize'}}>{regionStates.foundRegion}</span>
                    </>
                }
                data={cases}
                yKey={diagramData.cases.label}
                xKey="name"
                min={Math.ceil(minCases * 0.9)}
                max={Math.ceil(maxCases * 1.1)}
                color={badColor}
            />
            <LineChartContainer
                title={
                    <>
                        Случаи смертей по стране: <span
                        style={{textTransform: 'capitalize'}}>{regionStates.foundRegion}</span>
                    </>
                }
                data={deaths}
                yKey={diagramData.deaths.label}
                xKey="name"
                min={Math.ceil(minDeaths * 0.9)}
                max={Math.ceil(maxDeaths * 1.1)}
                color={badColor}
            />
        </div>
    }

    return <div style={{width: '100%'}}>
        <Search suggestions={names} onSubmit={(region) => {
            getRegion(region);
        }}/>
        {mainData}
    </div>
}

export default RenderCountrySearch;