import {useEffect, useReducer, useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes, Navigate
} from "react-router-dom";

import RenderCountrySearch from './CountrySearch';
import RenderRussiaRegionSearch from './RussiaRegionSearch';
import RenderRussiaMap from './RussiaMap';
import BarDiagramContainer from "./BarDiagramContainer";
import LineDiagramContainer from "./LineDiagramContainer";

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
    const [activeTab, updateActiveTab] = useState(1);
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

    const worldButtons = [
        {
            n: 1,
            name: 'Всего заболеваний',
            classes: ['MenuButton', 'BadButton'],
            to: 'cases',
            object: <BarDiagramContainer
                id={1}
                field='cases'
                label={diagramData.cases.label}
                key={1}
                getFunction={getMainData}
                color={badColor}
                name='Всего заболеваний'
                data={worldStates.allCountriesData}/>
        },
        {
            n: 2,
            name: 'Заболеваний сегодня',
            classes: ['MenuButton', 'BadButton'],
            to: 'casesToday',
            object: <BarDiagramContainer
                id={2}
                field='cases_delta'
                label={diagramData.casesToday.label}
                key={2}
                getFunction={getMainData}
                color={badColor}
                name='Заболеваний сегодня'
                data={worldStates.allCountriesData}/>
        },
        {
            n: 3,
            name: 'Всего смертей',
            classes: ['MenuButton', 'BadButton'],
            to: 'deaths',
            object: <BarDiagramContainer
                id={3}
                field='deaths'
                label={diagramData.deaths.label}
                key={3}
                getFunction={getMainData}
                color={badColor}
                name='Всего смертей'
                data={worldStates.allCountriesData}/>
        },
        {
            n: 4,
            name: 'Смертей сегодня',
            classes: ['MenuButton', 'BadButton'],
            to: 'deathsToday',
            object: <BarDiagramContainer
                id={4}
                field='deaths'
                label={diagramData.deathsToday.label}
                key={4}
                getFunction={getMainData}
                color={badColor}
                name='Смертей сегодня'
                data={worldStates.allCountriesData}/>
        },
        {
            n: 12,
            name: 'Вакцин сделано',
            classes: ['MenuButton', 'GoodButton'],
            to: 'vac',
            object: <BarDiagramContainer
                id={12}
                field='vac'
                label={diagramData.vaccines.label}
                key={12}
                getFunction={getVaccineData}
                color={goodColor}
                name='Вакцин сделано'
                data={worldStates.allCountriesVaccineData}/>
        },
        {
            n: 13,
            name: 'Количество полных вакцинаций',
            classes: ['MenuButton', 'GoodButton'],
            to: 'vacFull',
            object: <BarDiagramContainer
                id={13}
                field='peop_full_vac'
                label={diagramData.vaccinesFull.label}
                key={13}
                getFunction={getVaccineData}
                color={goodColor}
                name='Количество полных вакцинаций'
                data={worldStates.allCountriesVaccineData}/>
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

    const russiaButtons = [
        {
            n: 6,
            name: 'Заболеваний за месяц',
            classes: ['MenuButton', 'BadButton'],
            to: 'casesRuss',
            object: <LineDiagramContainer
                id={6}
                field='cases'
                label={diagramData.cases.label}
                key={6}
                getFunction={getRegionData}
                color={badColor}
                name='Заболеваний за месяц'
                data={russianStates.russiaCasesHistory}/>
        },
        {
            n: 8,
            name: 'Смертей за месяц',
            classes: ['MenuButton', 'BadButton'],
            to: 'deathsRuss',
            object: <LineDiagramContainer
                id={8}
                field='cases'
                label={diagramData.deaths.label}
                key={8}
                getFunction={getRegionData}
                color={badColor}
                name='Смертей за месяц'
                data={russianStates.russiaCasesHistory}/>
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
                    {worldButtons.map(b => <Link key={b.n} to={'/' + b.to} className={b.classes.join(' ')}>{b.name}</Link>)}
                </div>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Россия</h3>
                    {russiaButtons.map(b => <Link key={b.n} to={'/' + b.to} className={b.classes.join(' ')}>{b.name}</Link>)}
                </div>

            </div>
            <div className='Diagrams'>
                <Routes>
                    <Route path='/' element={<Navigate to='/cases'/>}/>
                    {worldButtons.map(b => <Route path={'/' + b.to} element={b.object}/>)}
                    {russiaButtons.map(b => <Route path={'/' + b.to} element={b.object}/>)}
                </Routes>

            </div>

        </Router>
    )
}

export default App;
