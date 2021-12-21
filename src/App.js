import {useEffect, useReducer, useState} from 'react';

import RenderCountriesCases from './AllCountriesCases';
import RenderCountriesCasesToday from './AllCountriesCasesToday';
import RenderCountriesDeaths from './AllCountriesDeaths';
import RenderCountriesDeathsToday from './AllCountriesDeathsToday';
import RenderCountriesVaccines from './AllCountriesVaccines';
import RenderCountriesFullVaccines from './AllCountriesFullVaccines';
import RenderCountrySearch from './CountrySearch';
import RenderRussiaCasesHistory from './RussiaCasesHistory';
import RenderRussiaDeathsHistory from './RussiaDeathsHistory';
import RenderRussiaRegionSearch from './RussiaRegionSearch';
import RenderRussiaCasesMap from './RussiaCasesMap';
import RenderRussiaDeathsMap from './RussiaDeathsMap';

import './App.css';
import axios from "axios";
import {russiaCasesLink, worldStatLink} from "./Constants";


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
    return await axios.get(russiaCasesLink).then((r) => {
        return r.data;
    })
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
            object: <RenderCountriesCases id={1} key={1} activeTab={activeTab} data={worldStates.allCountriesData}/>
        },
        {
            n: 2,
            name: 'Заболеваний сегодня',
            classes: ['MenuButton', 'BadButton'],
            object: <RenderCountriesCasesToday id={2} key={2} activeTab={activeTab} data={worldStates.allCountriesData}/>
        },
        {
            n: 3,
            name: 'Всего смертей',
            classes: ['MenuButton', 'BadButton'],
            object: <RenderCountriesDeaths id={3} key={3} activeTab={activeTab} data={worldStates.allCountriesData}/>
        },
        {
            n: 4,
            name: 'Смертей сегодня',
            classes: ['MenuButton', 'BadButton'],
            object: <RenderCountriesDeathsToday id={4} key={4} activeTab={activeTab} data={worldStates.allCountriesData}/>
        },
        {
            n: 12,
            name: 'Вакцин сделано',
            classes: ['MenuButton', 'GoodButton'],
            object: <RenderCountriesVaccines id={12} key={12} activeTab={activeTab} data={worldStates.allCountriesVaccineData}/>
        },
        {
            n: 13,
            name: 'Количество полных вакцинаций',
            classes: ['MenuButton', 'GoodButton'],
            object: <RenderCountriesFullVaccines id={13} key={13} activeTab={activeTab} data={worldStates.allCountriesVaccineData}/>
        },
        {
            n: 14,
            name: 'Поиск по странам',
            classes: ['MenuButton', 'BadButton'],
            object: <RenderCountrySearch id={14} key={14} activeTab={activeTab} data={worldStates.countriesIds}/>
        },
    ];

    const russiaButtons = [
        {
            n: 6,
            name: 'Заболеваний за месяц',
            classes: ['MenuButton', 'BadButton'],
            object: <RenderRussiaCasesHistory id={6} key={6} activeTab={activeTab} data={russianStates.russiaCasesHistory}/>
        },
        {
            n: 8,
            name: 'Смертей за месяц',
            classes: ['MenuButton', 'BadButton'],
            object: <RenderRussiaDeathsHistory id={8} key={8} activeTab={activeTab} data={russianStates.russiaCasesHistory}/>
        },
        {
            n: 9,
            name: 'Поиск по регионам',
            classes: ['MenuButton', 'BadButton'],
            object: <RenderRussiaRegionSearch id={9} key={9} activeTab={activeTab} data={russianStates.russiaRegionsIds}/>
        },
        {
            n: 10,
            name: 'Заболевания на карте',
            classes: ['MenuButton', 'BadButton'],
            object: <RenderRussiaCasesMap id={10} key={10} activeTab={activeTab} data={russianStates.russiaRegionsData}/>
        },
        {
            n: 11,
            name: 'Смерти на карте',
            classes: ['MenuButton', 'BadButton'],
            object: <RenderRussiaDeathsMap id={11} key={11} activeTab={activeTab} data={russianStates.russiaRegionsData}/>
        },
    ];

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
                {worldButtons.map(b => b.object)}
                {russiaButtons.map(b => b.object)}
            </div>
        </div>
    )
}

export default App;
