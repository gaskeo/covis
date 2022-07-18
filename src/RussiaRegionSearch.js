import {useReducer} from 'react';
import {
    badColor,
    diagramData, generateLinkByRegId,
    getElemsByStart,
    getRegionByName,
    getRegionData
} from "./Constants";
import {MyLineChart} from "./LineChart";
import {SearchElem} from "./searchElem";
import axios from "axios";

function formReducer(states, actions) {
    console.log(states, actions)

    actions.map(action => {
        states[action.type] = action.data;
        return action;
    });
    return {...states};
}

function regionReducer(states, actions) {
    actions.map(action => {
        states[action.type] = action.data;
        return action;
    });
    return {...states};
}

const formInit = {
    complete: false,
    isSearch: false,
    suggestions: null,
    allRegions: null,
    formData: ''
};

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

function RenderRussiaRegionSearch(props) {
    const [formStates, updateFormStates] = useReducer(formReducer, formInit, i => i);
    const [regionStates, updateRegionStates] = useReducer(regionReducer, regionInit, i => i);

    if (!props.data) {
        return null;
    }

    function getRegion(region) {
        const regionIndex = getRegionByName(props.data, region);
        if (regionIndex !== -1) {
            searchRegion(regionIndex).then(d => updateRegionStates([
                {type: 'regionData', data: d},
                {type: 'regionDataRequired', data: false},
            ]));
        }
        updateFormStates([{type: 'isSearch', data: false}]);
    }

    if (formStates.allRegions === null) {
        const names = props.data.map(d => d.name.toLowerCase()).sort((a, b) => a.localeCompare(b));
        updateFormStates([{type: 'allRegions', data: names}, {type: 'suggestions', data: names}]);
    }

    let mainData;
    if (regionStates.regionDataRequired === true) {
        mainData = <div>loading...</div>;
    } else if (regionStates.regionData !== null) {
        const [cases, minCases, maxCases] = getRegionData(regionStates.regionData, 'cases', diagramData.cases.label)
        const [deaths, minDeaths, maxDeaths] = getRegionData(regionStates.regionData, 'deaths', diagramData.deaths.label)

        mainData = <div>
            <div className='DiagramContainer'>
                <h2>Случаи заболевания по региону: <span
                    style={{textTransform: 'capitalize'}}>{regionStates.foundRegion}</span></h2>
                <div className='BarChartContainer'>
                    <MyLineChart data={cases}
                                 label={diagramData.cases.label}
                                 minValue={Math.ceil(minCases * 0.9)}
                                 maxValue={Math.ceil(maxCases * 1.1)}
                                 color={badColor}/>
                </div>
            </div>
            <div className='DiagramContainer'>
                <h2>Случаи смертей по региону: <span
                    style={{textTransform: 'capitalize'}}>{regionStates.foundRegion}</span></h2>
                <div className='BarChartContainer'>
                    <MyLineChart data={deaths}
                                 label={diagramData.deaths.label}
                                 minValue={Math.ceil(minDeaths * 0.9)}
                                 maxValue={Math.ceil(maxDeaths * 1.1)}
                                 color={badColor}/>
                </div>
            </div>
        </div>
    }

    return <div style={{width: '100%'}}>
        <div>
            <div className='InputForm'>
                <input style={{textTransform: 'capitalize'}} type='text' className='RegionInput' list='suggestions'
                       value={formStates.formData} onChange={e => {
                    const [region, newSuggestions, complete] = getElemsByStart(e, formStates.allRegions);
                    updateFormStates([
                        {type: 'formData', data: region},
                        {type: 'suggestions', data: newSuggestions},
                        {type: 'complete', data: complete}
                    ])
                }}
                       onFocus={() => updateFormStates([{type: 'isSearch', data: true}])}
                       placeholder='Введите регион'/>
                <button className='SearchButton' disabled={!formStates.complete} onClick={() => {
                    updateRegionStates([
                        {type: 'regionData', data: null},
                        {type: 'regionDataRequired', data: true},
                        {type: 'foundRegion', data: formStates.formData}]);
                    getRegion(formStates.formData);
                }}>Найти
                </button>
            </div>
            {formStates.isSearch && <SearchElem onClose={() => updateFormStates([{type: 'isSearch', data: false}])}
                                                elems={formStates.suggestions.map((d, index) =>
                                                    <p onClick={() => {
                                                        updateRegionStates([
                                                            {type: 'regionData', data: null},
                                                            {type: 'regionDataRequired', data: true},
                                                            {type: 'foundRegion', data: d}]);
                                                        getRegion(d);
                                                    }} key={index}>
                                                             <span style={{textTransform: 'capitalize'}}>
                                                                 {d}
                                                             </span>
                                                    </p>
                                                )}/>
            }
        </div>
        {mainData}
    </div>
}

export default RenderRussiaRegionSearch;