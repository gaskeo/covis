import {useEffect, useReducer, useState} from 'react';

import RenderCountriesCases from './AllCountriesCases'
import RenderCountriesCasesToday from './AllCountriesCasesToday'
import RenderCountriesDeaths from './AllCountriesDeaths'
import RenderCountriesDeathsToday from './AllCountriesDeathsToday'
import RenderCountriesVaccines from './AllCountriesVaccines'
import RenderCountriesFullVaccines from './AllCountriesFullVaccines'
import RenderCountrySearch from './CountrySearch'
import RenderRussiaCasesHistory from './RussiaCasesHistory'
import RenderRussiaDeathsHistory from './RussiaDeathsHistory'
import RenderRussiaRegionSearch from './RussiaRegionSearch'
import RenderRussiaCasesMap from './RussiaCasesMap'
import RenderRussiaDeathsMap from './RussiaDeathsMap'

import './App.css';
import axios from "axios";


function worldReducer(states, action) {
    states[action.type] = action.data;
    return {...states};
}

function russianReducer(states, action) {
    states[action.type] = action.data;
    return {...states};
}

const worldInit = {
    allCountriesData: null,
    countriesIds: null,
    allCountriesVaccineData: null,
}

const russianInit = {
    russiaRegionsData: null,
    russiaRegionsIds: null,
    russiaCasesHistory: null,
}

async function getCountriesAndRussianRegionsData() {
    return await axios.get('https://milab.s3.yandex.net/2020/covid19-stat/data/v10/default_data.json').then((r) => {
        const j = r.data;
        const worldData = Object.keys(j['world_stat_struct']['data']).map(d => {
            return {name: j['world_stat_struct']['data'][d]['info']['name'].toString(), code: d}
        })

        const data = Object.keys(j['russia_stat_struct']['data']).map(d => {
            return {name: j['russia_stat_struct']['data'][d]['info']['name'].toString(), code: d}
        })
        return {
            'worldStat': j['world_stat_struct']['data'],
            'vaccineStat': j['vaccination_struct'],
            'countriesIds': worldData,

            'russiaStat': j['russia_stat_struct']['data'],
            'russiaRegionsIds': data
        };
    })
}

async function getRussiaCasesHistoryData() {
    return await axios.get('https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/225.json').then((r) => {
        return r.data
    })
}

function App() {
    const [activeTab, updateActiveTab] = useState(1);
    const [worldStates, worldStatesDispatch] = useReducer(worldReducer, worldInit, i => i);
    const [russianStates, russianStatesDispatch] = useReducer(russianReducer, russianInit, i => i);

    useEffect(() => {
        if (worldStates.allCountriesData === null) {
            worldStatesDispatch({type: 'allCountriesData', data: []});
            getCountriesAndRussianRegionsData().then(d => {
                worldStatesDispatch({type: 'allCountriesData', data: d['worldStat']});
                worldStatesDispatch({type: 'allCountriesVaccineData', data: d['vaccineStat']});
                worldStatesDispatch({type: 'countriesIds', data: d['countriesIds']});

                russianStatesDispatch({type: 'russiaRegionsData', data: d['russiaStat']});
                russianStatesDispatch({type: 'russiaRegionsIds', data: d['russiaRegionsIds']});

            });
        }
    }, [])

    useEffect(() => {
        if (russianStates.russiaCasesHistory === null) {
            russianStatesDispatch({type: 'russiaCasesHistory', data: []});
            getRussiaCasesHistoryData().then(d => {
                russianStatesDispatch({type: 'russiaCasesHistory', data: d});
            });
        }
    }, [])

    let alccdb = null;
    let alccdbt = null;
    let alcrd = null;
    let alcrdt = null;

    if (worldStates.allCountriesVaccineData !== null) {

        alccdb = <RenderCountriesCases activeTab={activeTab} data={worldStates.allCountriesData}/>
        alccdbt = <RenderCountriesCasesToday activeTab={activeTab} data={worldStates.allCountriesData}/>
        alcrd = <RenderCountriesDeaths activeTab={activeTab} data={worldStates.allCountriesData}/>
        alcrdt = <RenderCountriesDeathsToday activeTab={activeTab} data={worldStates.allCountriesData}/>
    }

    let crd = null;
    if (worldStates.countriesIds !== null) {
        crd = <RenderCountrySearch activeTab={activeTab} data={worldStates.countriesIds}/>
    }

    let acvd = null;
    let acfvd = null;
    if (worldStates.allCountriesVaccineData !== null) {
        acvd = <RenderCountriesVaccines activeTab={activeTab} data={worldStates.allCountriesVaccineData}/>
        acfvd = <RenderCountriesFullVaccines activeTab={activeTab} data={worldStates.allCountriesVaccineData}/>
    }

    let rrd = null;
    if (russianStates.russiaRegionsIds !== null) {
        rrd = <RenderRussiaRegionSearch activeTab={activeTab} data={russianStates.russiaRegionsIds}/>
    }

    let rch = null;
    let rdh = null;
    let rmc = null;
    let rmd = null;

    if (russianStates.russiaCasesHistory !== null && russianStates.russiaCasesHistory.cases !== undefined) {
        rch = <RenderRussiaCasesHistory activeTab={activeTab} data={russianStates.russiaCasesHistory}/>
        rdh = <RenderRussiaDeathsHistory activeTab={activeTab} data={russianStates.russiaCasesHistory}/>
        rmc = <RenderRussiaCasesMap activeTab={activeTab} data={russianStates.russiaRegionsData}/>
        rmd = <RenderRussiaDeathsMap activeTab={activeTab} data={russianStates.russiaRegionsData}/>
    }

    const worldButtons = [
        {n: 1, name: 'Всего заболеваний', classes: ['MenuButton', 'BadButton']},
        {n: 2, name: 'Заболеваний сегодня', classes: ['MenuButton', 'BadButton']},
        {n: 3, name: 'Всего смертей', classes: ['MenuButton', 'BadButton']},
        {n: 4, name: 'Смертей сегодня', classes: ['MenuButton', 'BadButton']},
        {n: 12, name: 'Вакцин сделано', classes: ['MenuButton', 'GoodButton']},
        {n: 13, name: 'Количество полных вакцинаций', classes: ['MenuButton', 'GoodButton']},
        {n: 14, name: 'Поиск по странам', classes: ['MenuButton', 'BadButton']},
    ]
    const russiaButtons = [
        {n: 6, name: 'Заболеваний за месяц', classes: ['MenuButton', 'BadButton']},
        {n: 8, name: 'Смертей за месяц', classes: ['MenuButton', 'BadButton']},
        {n: 9, name: 'Поиск по регионам', classes: ['MenuButton', 'BadButton']},
        {n: 10, name: 'Заболевания на карте', classes: ['MenuButton', 'BadButton']},
        {n: 11, name: 'Смерти на карте', classes: ['MenuButton', 'BadButton']},
    ]

    return (
        <div>
            <div className='Header'>
                <h1>co<span className='RedBack'>vis</span></h1>
            </div>
            <div className='Menu'>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Мир</h3>
                    {worldButtons.map(b => <button key={b.n} className={b.classes.join(' ')}
                                                   onClick={() => updateActiveTab(b.n)}>{b.name}</button>)}
                </div>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Россия</h3>
                    {russiaButtons.map(b => <button key={b.n} className={b.classes.join(' ')}
                                                    onClick={() => updateActiveTab(b.n)}>{b.name}</button>)}
                </div>

            </div>
            <div className='Diagrams'>
                {alccdb}
                {alccdbt}
                {alcrd}
                {alcrdt}
                {acvd}
                {acfvd}
                {crd}
                {rch}
                {rdh}
                {rrd}
                {rmc}
                {rmd}
            </div>
        </div>
    )
}

export default App;
