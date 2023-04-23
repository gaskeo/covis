import {useEffect, useReducer, useState} from 'react';
import {
    HashRouter as Router, Route, Link, Routes, Navigate
} from "react-router-dom";

import RenderCountrySearch from './CountrySearch';
import RenderRussiaRegionSearch from './RussiaRegionSearch';
import RenderRussiaMap from './RussiaMap';
import {BarChartContainer} from "./components/charts/barChart/barChartContainer";
import {LineChartContainer} from "./components/charts/lineChart/lineChartContainer.tsx";

import './App.css';
import axios from "axios";
import {
    badColor,
    diagramData,
    getMainData, getRegionData,
    getVaccineData,
    goodColor,
    russiaCasesLink,
    worldStatLink
} from "./Constants";


function worldReducer(states, actions) {
    actions.map(action => {
        states[action.type] = action.data;
        return action;
    });
    return {...states};
}

function russianReducer(states, actions) {
    actions.map(action => {
        states[action.type] = action.data;
        return action;
    });
    return {...states};
}

const worldInit = {
    allCountriesData: null,
    countriesIds: null,
    allCountriesVaccineData: null,
};

const russianInit = {
    russiaRegionsData: null,
    russiaRegionsIds: null,
    russiaCasesHistory: null,
};

async function getCountriesAndRussianRegionsData() {
    return await axios.get(worldStatLink).then((r) => {
        const j = r.data;
        const worldData = Object.keys(j['world_stat_struct']['data']).map(d => {
            return {name: j['world_stat_struct']['data'][d]['info']['name'].toString(), code: d};
        });

        const data = Object.keys(j['russia_stat_struct']['data']).map(d => {
            return {name: j['russia_stat_struct']['data'][d]['info']['name'].toString(), code: d};
        });
        return {
            'worldStat': j['world_stat_struct']['data'],
            'vaccineStat': j['vaccination_struct'],
            'countriesIds': worldData,

            'russiaStat': j['russia_stat_struct']['data'],
            'russiaRegionsIds': data
        };
    });
}

async function getRussiaCasesHistoryData() {
    return await axios.get(russiaCasesLink).then((r) => r.data)
}

function App() {
    const href = window.location.href.split('/')[window.location.href.split('/').length - 1];

    const [activeTab, updateActiveTab] = useState(href ? href : 'cases');
    const [worldStates, worldStatesDispatch] = useReducer(worldReducer, worldInit, i => i);
    const [russianStates, russianStatesDispatch] = useReducer(russianReducer, russianInit, i => i);
    useEffect(() => {
        if (worldStates.allCountriesData === null) {
            worldStatesDispatch([{type: 'allCountriesData', data: []}]);
            getCountriesAndRussianRegionsData().then(d => {
                worldStatesDispatch([
                    {type: 'allCountriesData', data: d['worldStat']},
                    {type: 'allCountriesVaccineData', data: d['vaccineStat']},
                    {type: 'countriesIds', data: d['countriesIds']}
                ]);

                russianStatesDispatch([
                    {type: 'russiaRegionsData', data: d['russiaStat']},
                    {type: 'russiaRegionsIds', data: d['russiaRegionsIds']}
                ]);
            });
        }
    }, []);

    useEffect(() => {
        if (russianStates.russiaCasesHistory === null) {
            russianStatesDispatch([{type: 'russiaCasesHistory', data: []}]);
            getRussiaCasesHistoryData().then(d => {
                russianStatesDispatch([{type: 'russiaCasesHistory', data: d}]);
            });
        }
    }, []);

    let casesData, minCases, maxCases,
        casesTodayData, minCasesToday, maxCasesToday,
        deathsData, minDeaths, maxDeaths,
        deathsTodayData, minDeathsToday, maxDeathsToday,
        vaccinesData, minVaccines, maxVaccines,
        vaccinesFullData, minVaccinesFull, maxVaccinesFull
    ;

    if (russianStates.russiaCasesHistory?.cases) {
        [casesData, minCases, maxCases] =
            getMainData(worldStates.allCountriesData, "cases", diagramData.cases.label);

        [casesTodayData, minCasesToday, maxCasesToday] =
            getMainData(worldStates.allCountriesData, "cases_delta", diagramData.casesToday.label);

        [deathsData, minDeaths, maxDeaths] =
            getMainData(worldStates.allCountriesData, "deaths", diagramData.deaths.label);

        [deathsTodayData, minDeathsToday, maxDeathsToday] =
            getMainData(worldStates.allCountriesData, "deaths_delta", diagramData.deathsToday.label);

        [vaccinesData, minVaccines, maxVaccines] =
            getVaccineData(worldStates.allCountriesVaccineData, "vac", diagramData.vaccines.label);

        [vaccinesFullData, minVaccinesFull, maxVaccinesFull] =
            getVaccineData(worldStates.allCountriesVaccineData, "peop_full_vac", diagramData.vaccinesFull.label);
    } else return <></>;

    const worldButtons = [
        {
            n: 1,
            name: 'Всего заболеваний',
            classes: ['MenuButton', 'BadButton'],
            to: 'cases',
            object: <BarChartContainer
                id={1}
                key={1}
                color={badColor}
                title='Всего заболеваний'
                xKey="name"
                yKey={diagramData.cases.label}
                max={maxCases}
                data={casesData}/>
        },
        {
            n: 2,
            name: 'Заболеваний сегодня',
            classes: ['MenuButton', 'BadButton'],
            to: 'casesToday',
            object: <BarChartContainer
                id={2}
                key={2}
                color={badColor}
                title='Заболеваний сегодня'
                xKey="name"
                yKey={diagramData.casesToday.label}
                max={maxCasesToday}
                data={casesTodayData}/>
        },
        {
            n: 3,
            name: 'Всего смертей',
            classes: ['MenuButton', 'BadButton'],
            to: 'deaths',
            object: <BarChartContainer
                id={2}
                key={2}
                color={badColor}
                title='Заболеваний сегодня'
                xKey="name"
                yKey={diagramData.deaths.label}
                max={maxDeaths}
                data={deathsData}/>
        },
        {
            n: 4,
            name: 'Смертей сегодня',
            classes: ['MenuButton', 'BadButton'],
            to: 'deathsToday',
            object: <BarChartContainer
                id={4}
                key={4}
                color={badColor}
                title='Смертей сегодня'
                xKey="name"
                yKey={diagramData.deathsToday.label}
                max={maxDeathsToday}
                data={deathsTodayData}/>
        },
        {
            n: 12,
            name: 'Вакцин сделано',
            classes: ['MenuButton', 'GoodButton'],
            to: 'vac',
            object: <BarChartContainer
                id={12}
                key={12}
                color={goodColor}
                title='Вакцин сделано'
                xKey="name"
                yKey={diagramData.vaccines.label}
                max={maxVaccines}
                data={vaccinesData}/>
        },
        {
            n: 13,
            name: 'Количество полных вакцинаций',
            classes: ['MenuButton', 'GoodButton'],
            to: 'vacFull',
            object: <BarChartContainer
                id={13}
                key={13}
                color={goodColor}
                title='Количество полных вакцинаций'
                xKey="name"
                yKey={diagramData.vaccinesFull.label}
                max={maxVaccinesFull}
                data={vaccinesFullData}/>
        },
        {
            n: 14,
            name: 'Поиск по странам',
            classes: ['MenuButton', 'BadButton'],
            to: 'search',
            object: <RenderCountrySearch
                id={14}
                key={14}
                data={worldStates.countriesIds}/>
        },
    ];

    let casesDataRu, minCasesRu, maxCasesRu, deathsDataRu, minDeathsRu, maxDeathsRu;

    if (russianStates.russiaCasesHistory?.cases) {
        [casesDataRu, minCasesRu, maxCasesRu] =
            getRegionData(russianStates.russiaCasesHistory, "cases", diagramData.cases.label);

        [deathsDataRu, minDeathsRu, maxDeathsRu] =
            getRegionData(russianStates.russiaCasesHistory, "deaths", diagramData.deaths.label);
    } else return <></>;


    const russiaButtons = [
        {
            n: 6,
            name: 'Заболеваний за месяц',
            classes: ['MenuButton', 'BadButton'],
            to: 'casesRuss',
            object: <LineChartContainer
                id={6}
                key={6}
                min={minCasesRu}
                max={maxCasesRu}
                color={badColor}
                xKey="name"
                yKey={diagramData.cases.label}
                title='Заболеваний за месяц'
                data={casesDataRu}/>
        },
        {
            n: 8,
            name: 'Смертей за месяц',
            classes: ['MenuButton', 'BadButton'],
            to: 'deathsRuss',
            object: <LineChartContainer
                id={8}
                key={8}
                min={minDeathsRu}
                max={maxDeathsRu}
                xKey="name"
                yKey={diagramData.deaths.label}
                color={badColor}
                title='Смертей за месяц'
                data={deathsDataRu}/>
        },
        {
            n: 9,
            name: 'Поиск по регионам',
            classes: ['MenuButton', 'BadButton'],
            to: 'searchRuss',
            object: <RenderRussiaRegionSearch id={9} key={9}
                                              data={russianStates.russiaRegionsIds}/>
        },
        {
            n: 10,
            name: 'Заболевания на карте',
            classes: ['MenuButton', 'BadButton'],
            to: 'casesMap',
            object: <RenderRussiaMap
                id={10}
                key={10}
                color={{r: 220, g: 20, b: 60}}
                fieldName='cases'
                data={russianStates.russiaRegionsData}/>
        },
        {
            n: 11,
            name: 'Смерти на карте',
            classes: ['MenuButton', 'BadButton'],
            to: 'deathsMap',
            object: <RenderRussiaMap
                id={11}
                key={11}
                color={{r: 120, g: 20, b: 60}}
                fieldName='deaths'
                data={russianStates.russiaRegionsData}/>
        },
    ];

    return (
        <Router>
            <div className='Header'>
                <h1>co<span className='RedBack'>vis</span></h1>
            </div>
            <div className='Menu'>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Мир</h3>
                    {worldButtons.map(b => <Link
                        key={b.n}
                        to={b.to}
                        onClick={() => updateActiveTab(b.to)}
                        className={[...b.classes, activeTab === b.to ? '' : (b.classes.includes('BadButton') ? 'NotSelectedBadButton' : 'NotSelectedGoodButton')].join(' ')}><span>{b.name}</span></Link>)}

                </div>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Россия</h3>
                    {russiaButtons.map(b => <Link
                        key={b.n}
                        to={b.to}
                        onClick={() => updateActiveTab(b.to)}
                        className={[...b.classes, activeTab === b.to ? '' : (b.classes.includes('BadButton') ? 'NotSelectedBadButton' : 'NotSelectedGoodButton')].join(' ')}><span>{b.name}</span></Link>)}
                </div>

            </div>
            <div className='Diagrams'>
                <Routes>
                    <Route path='/' element={<Navigate to='cases'/>}/>
                    {worldButtons.map(b => <Route key={b.n} path={b.to} element={b.object}/>)}
                    {russiaButtons.map(b => <Route key={b.n} path={b.to} element={b.object}/>)}
                </Routes>

            </div>

        </Router>
    )
}

export default App;
