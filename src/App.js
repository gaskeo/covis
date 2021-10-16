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

import './App.css';
let diagramWidth;
let diagramHeight;

if (window.innerWidth >= 800) {
    diagramWidth = 1.4;
    diagramHeight = 1.6;
} else {
    diagramWidth = 1.1;
    diagramHeight = 2.4;
}

const dataStates = {
    notRequested: 0,
    requested: 1,
    received: 2
}

function App() {
    // сложная штука... непонятная...
    async function getRussiaCasesHistoryData() {
        updateRussiaCasesHistoryDataState(dataStates.requested)
        return fetch('https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/225.json', {method: 'get'}).then((r) => {
            r.json().then((j) => {
                updateRussiaCasesHistory(j)
                updateRussiaCasesHistoryDataState(dataStates.received)
            })
        })
    }

    async function getCountriesAndRussianRegionsData() {
        updateRussiaRegionsDataState(dataStates.requested)
        updateAllCountriesDataState(dataStates.requested)
        updateAllCountriesVaccineDataState(dataStates.requested)
        return fetch('https://milab.s3.yandex.net/2020/covid19-stat/data/v10/default_data.json', {method: 'get'}).then((r) => {
            r.json().then(j => {
                updateAllCountriesData(j['world_stat_struct']['data'])
                updateRussiaRegionsData(j['russia_stat_struct']['data'])
                updateAllCountriesVaccineData(j['vaccination_struct'])

                updateAllCountriesDataState(dataStates.received)
                updateAllCountriesVaccineDataState(dataStates.received)

                let worldData = Object.keys(j['world_stat_struct']['data']).map(d => {
                    return {name: j['world_stat_struct']['data'][d]['info']['name'].toString(), code: d}
                })
                updateCountriesIds(worldData)
                updateCountriesIdsState(dataStates.received)

                let data = Object.keys(j['russia_stat_struct']['data']).map(d => {
                    return {name: j['russia_stat_struct']['data'][d]['info']['name'].toString(), code: d}
                })
                updateRussiaRegionsIds(data)
                updateRussiaRegionsDataState(dataStates.received)
            })
        })
    }

    // all countries cases
    const [activeTab, updateActiveTab] = useState(1);
    const [allCountriesData, updateAllCountriesData] = useState(null);
    const [allCountriesDataState, updateAllCountriesDataState] = useState(dataStates.notRequested);
    const [countriesIds, updateCountriesIds] = useState(null);
    const [countriesIdsState, updateCountriesIdsState] = useState(dataStates.notRequested);

    const [russiaRegionsIds, updateRussiaRegionsIds] = useState(null);
    const [russiaRegionsData, updateRussiaRegionsData] = useState(null);
    const [russiaRegionsDataState, updateRussiaRegionsDataState] = useState(dataStates.notRequested);

    let alccdb = null;
    let alccdbt = null;
    let alcrd = null;
    let alcrdt = null;
    if (allCountriesDataState === dataStates.received) {
        alccdb = <RenderCountriesCases activeTab={activeTab} Data={allCountriesData}/>
        alccdbt = <RenderCountriesCasesToday activeTab={activeTab} Data={allCountriesData}/>
        alcrd = <RenderCountriesDeaths activeTab={activeTab} Data={allCountriesData}/>
        alcrdt = <RenderCountriesDeathsToday activeTab={activeTab} Data={allCountriesData}/>
    }

    let crd = null;
    if (countriesIdsState === dataStates.received) {
        crd = <RenderCountrySearch activeTab={activeTab} Data={countriesIds}/>
    }

    const [allCountriesVaccineData, updateAllCountriesVaccineData] = useState(null);
    const [allCountriesVaccineDataState, updateAllCountriesVaccineDataState] = useState(dataStates.notRequested);

    let acvd = null;
    let acfvd = null;
    if (allCountriesVaccineDataState === dataStates.received) {
        acvd = <RenderCountriesVaccines activeTab={activeTab} Data={allCountriesVaccineData}/>
        acfvd = <RenderCountriesFullVaccines activeTab={activeTab} Data={allCountriesVaccineData}/>
    }

    // russia cases history

    if (russiaRegionsDataState === dataStates.notRequested) {
        let _ = getCountriesAndRussianRegionsData();
    }

    const [russiaCasesHistory, updateRussiaCasesHistory] = useState(null);
    const [russiaCasesHistoryDataState, updateRussiaCasesHistoryDataState] = useState(dataStates.notRequested);
    if (russiaCasesHistoryDataState === dataStates.notRequested) {
        let _ = getRussiaCasesHistoryData();
    }
    let rrd = null;
    if (russiaRegionsDataState === dataStates.received) {
        rrd = <RenderRussiaRegionSearch activeTab={activeTab} Data={russiaRegionsIds}/>
    }

    let rch = null;
    let rdh = null;
    let rmc = null;
    let rmd = null;
    if (russiaCasesHistoryDataState === dataStates.received) {
        rch = <RenderRussiaCasesHistory activeTab={activeTab} Data={russiaCasesHistory}/>
        rdh = <RenderRussiaDeathsHistory activeTab={activeTab} Data={russiaCasesHistory}/>
        rmc = <RenderRussiaCasesMap activeTab={activeTab} Data={russiaRegionsData}/>
        rmd = <RenderRussiaDeathsMap activeTab={activeTab} Data={russiaRegionsData}/>
    } else {
        alccdb = null;
    }

    return (
        <div>
            <div className='Header'>
                <h1>co<span className='RedBack'>vis</span></h1>
            </div>
            <div className='Menu'>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Мир</h3>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(1)}>Всего заболеваний
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(2)}>Заболеваний сегодня
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(3)}>Всего смертей
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(4)}>Смертей сегодня
                    </button>
                    <button className={['MenuButton', 'GoodButton'].join(' ')}
                            onClick={() => updateActiveTab(12)}>Вакцин сделано
                    </button>
                    <button className={['MenuButton', 'GoodButton'].join(' ')}
                            onClick={() => updateActiveTab(13)}>Количество полных вакцинаций
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(14)}>Поиск по странам
                    </button>
                </div>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Россия</h3>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(6)}>Заболеваний за месяц
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(8)}>Смертей за месяц
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(9)}>Поиск по регионам
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(10)}>Заболевания на карте
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(11)}>Смерти на карте
                    </button>
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
