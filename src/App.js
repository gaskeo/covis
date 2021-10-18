import {useState} from 'react';

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

import constants from './Constants'

import './App.css';


function App() {
    // сложная штука... непонятная...
    async function getRussiaCasesHistoryData() {
        updateRussiaCasesHistoryDataState(constants.DataStates.requested)
        return fetch('https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/225.json', {method: 'get'}).then((r) => {
            r.json().then((j) => {
                updateRussiaCasesHistory(j)
                updateRussiaCasesHistoryDataState(constants.DataStates.received)
            })
        })
    }

    async function getCountriesAndRussianRegionsData() {
        updateRussiaRegionsDataState(constants.DataStates.requested)
        updateAllCountriesDataState(constants.DataStates.requested)
        updateAllCountriesVaccineDataState(constants.DataStates.requested)
        return fetch('https://milab.s3.yandex.net/2020/covid19-stat/data/v10/default_data.json', {method: 'get'}).then((r) => {
            r.json().then(j => {
                updateAllCountriesData(j['world_stat_struct']['data'])
                updateRussiaRegionsData(j['russia_stat_struct']['data'])
                updateAllCountriesVaccineData(j['vaccination_struct'])

                updateAllCountriesDataState(constants.DataStates.received)
                updateAllCountriesVaccineDataState(constants.DataStates.received)

                let worldData = Object.keys(j['world_stat_struct']['data']).map(d => {
                    return {name: j['world_stat_struct']['data'][d]['info']['name'].toString(), code: d}
                })
                updateCountriesIds(worldData)
                updateCountriesIdsState(constants.DataStates.received)

                let data = Object.keys(j['russia_stat_struct']['data']).map(d => {
                    return {name: j['russia_stat_struct']['data'][d]['info']['name'].toString(), code: d}
                })
                updateRussiaRegionsIds(data)
                updateRussiaRegionsDataState(constants.DataStates.received)
            })
        })
    }

    // all countries cases
    const [activeTab, updateActiveTab] = useState(1);
    const [allCountriesData, updateAllCountriesData] = useState(null);
    const [allCountriesDataState, updateAllCountriesDataState] = useState(constants.DataStates.notRequested);
    const [countriesIds, updateCountriesIds] = useState(null);
    const [countriesIdsState, updateCountriesIdsState] = useState(constants.DataStates.notRequested);

    const [russiaRegionsIds, updateRussiaRegionsIds] = useState(null);
    const [russiaRegionsData, updateRussiaRegionsData] = useState(null);
    const [russiaRegionsDataState, updateRussiaRegionsDataState] = useState(constants.DataStates.notRequested);

    let alccdb = null;
    let alccdbt = null;
    let alcrd = null;
    let alcrdt = null;
    if (allCountriesDataState === constants.DataStates.received) {
        alccdb = <RenderCountriesCases activeTab={activeTab} Data={allCountriesData}/>
        alccdbt = <RenderCountriesCasesToday activeTab={activeTab} Data={allCountriesData}/>
        alcrd = <RenderCountriesDeaths activeTab={activeTab} Data={allCountriesData}/>
        alcrdt = <RenderCountriesDeathsToday activeTab={activeTab} Data={allCountriesData}/>
    }

    let crd = null;
    if (countriesIdsState === constants.DataStates.received) {
        crd = <RenderCountrySearch activeTab={activeTab} Data={countriesIds}/>
    }

    const [allCountriesVaccineData, updateAllCountriesVaccineData] = useState(null);
    const [allCountriesVaccineDataState, updateAllCountriesVaccineDataState] = useState(constants.DataStates.notRequested);

    let acvd = null;
    let acfvd = null;
    if (allCountriesVaccineDataState === constants.DataStates.received) {
        acvd = <RenderCountriesVaccines activeTab={activeTab} Data={allCountriesVaccineData}/>
        acfvd = <RenderCountriesFullVaccines activeTab={activeTab} Data={allCountriesVaccineData}/>
    }

    // russia cases history

    if (russiaRegionsDataState === constants.DataStates.notRequested) {
        let _ = getCountriesAndRussianRegionsData();
    }

    const [russiaCasesHistory, updateRussiaCasesHistory] = useState(null);
    const [russiaCasesHistoryDataState, updateRussiaCasesHistoryDataState] = useState(constants.DataStates.notRequested);
    if (russiaCasesHistoryDataState === constants.DataStates.notRequested) {
        let _ = getRussiaCasesHistoryData();
    }
    let rrd = null;
    if (russiaRegionsDataState === constants.DataStates.received) {
        rrd = <RenderRussiaRegionSearch activeTab={activeTab} Data={russiaRegionsIds}/>
    }

    let rch = null;
    let rdh = null;
    let rmc = null;
    let rmd = null;
    if (russiaCasesHistoryDataState === constants.DataStates.received) {
        rch = <RenderRussiaCasesHistory activeTab={activeTab} Data={russiaCasesHistory}/>
        rdh = <RenderRussiaDeathsHistory activeTab={activeTab} Data={russiaCasesHistory}/>
        rmc = <RenderRussiaCasesMap activeTab={activeTab} Data={russiaRegionsData}/>
        rmd = <RenderRussiaDeathsMap activeTab={activeTab} Data={russiaRegionsData}/>
    } else {
        alccdb = null;
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
                    {worldButtons.map(b => <button key={b.n} className={b.classes.join(' ')} onClick={() => updateActiveTab(b.n)}>{b.name}</button>)}
                </div>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Россия</h3>
                    {russiaButtons.map(b => <button key={b.n} className={b.classes.join(' ')} onClick={() => updateActiveTab(b.n)}>{b.name}</button>)}
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
