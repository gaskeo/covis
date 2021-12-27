import {useEffect, useReducer, useState} from 'react';
import {
    badColor,
    checkPage,
    diagramData, generateLinkByRegId,
    getElemsByStart,
    getRegionByName,
    getRussiaData
} from "./Constants";
import {MyLineChart} from "./LineChart";
import {SearchElem} from "./searchElem";
import axios from "axios";

function formReducer(states, actions) {
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

function RenderCountrySearch(props) {
    function GetRegion(region) {
        const regionIndex = getRegionByName(props.data, region);
        if (regionIndex !== -1) {
            searchRegion(regionIndex).then(d => updateRegionStates([
                {type: 'regionData', data: d},
                {type: 'regionDataRequired', data: false},
                {type: 'foundRegion', data: formStates.formData},
            ]));
        }
        updateFormStates([{type: 'isSearch', data: false}]);
    }


    const [formStates, updateFormStates] = useReducer(formReducer, formInit, i => i);
    const [regionStates, updateRegionStates] = useReducer(regionReducer, regionInit, i => i)

    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    if (formStates.allRegions === null) {
        let names = props.data.map(d => d.name.toLowerCase());
        names.sort((a, b) => a.localeCompare(b))
        updateFormStates([{type: 'allRegions', data: names}, {type: 'suggestions', data: names}]);
    }

    let mainData;
    if (regionStates.regionDataRequired === true) {
        mainData = <div>loading...</div>;
    } else if (regionStates.regionData !== null) {
        const [cases, minCases, maxCases] = getRussiaData(regionStates.regionData, 'cases', diagramData.cases.label)
        const [deaths, minDeaths, maxDeaths] = getRussiaData(regionStates.regionData, 'deaths', diagramData.deaths.label)

        mainData = <div>
            <div className='DiagramContainer'>
                <h2>Случаи заболевания по стране: <span
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
                <h2>Случаи смертей по стране: <span
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
                // onBlur={() => updateFormStates([{type: 'isSearch', data: false}])}
                   placeholder='Введите регион'/>
            <button className='SearchButton' disabled={!formStates.complete} onClick={() => {
                updateRegionStates([
                    {type: 'regionData', data: null},
                    {type: 'regionDataRequired', data: true},
                    {type: 'foundRegion', data: formStates.formData}]);
                GetRegion(formStates.formData)
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
                                                    GetRegion(d)

                                                }} key={index}>
                                         <span style={{textTransform: 'capitalize'}}>
                                             {d}
                                         </span>
                                                </p>)}/>
        }

        {mainData}
    </div>
}

export default RenderCountrySearch;