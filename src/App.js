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
import {
    badColor,
    diagramData,
    getMainData, getRegionData,
    getVaccineData,
    goodColor,
} from "./Constants";
import {getCountriesAndRussianRegionsData, getRussiaHistoryData} from "./shared/api";
import {RussiaActionType, russianInit, russianReducer, WorldActionTypes, worldInit, worldReducer} from "./shared/store";
import {CasesPage} from "./pages/cases/cases";
import {MyGlobalContext} from "./shared/context";
import {WithContext} from "./app/hocs/context";
import {WithRouter} from "./app/hocs/router";
import {compose} from "./app/hocs";
import {Menu} from "./components/menu";

function Content(props) {
    const href = window.location.href.split('/')[window.location.href.split('/').length - 1];

    const [activeTab, updateActiveTab] = useState(href ? href : 'cases');

    const worldButtons = [
        {
            name: "Всего заболеваний",
            to: "cases",
            classes: ['MenuButton', 'BadButton']
        }
    ]

    return (
        <>
            <div className='Header'>
                <h1>co<span className='RedBack'>vis</span></h1>
            </div>
            <div className="contentContainer">
                <div className="contentWrapper">
                    <Menu/>
                    <div className="Diagrams">
                        {props.children}
                    </div>
                </div>
            </div>
        </>

    )
}


const ContentWithRouterAndContext = compose(WithContext, WithRouter)(Content);


function App() {


    const [worldStates, worldStatesDispatch] = useReducer(worldReducer, worldInit, i => i);
    const [russianStates, russianStatesDispatch] = useReducer(russianReducer, russianInit, i => i);

    useEffect(() => {
        if (worldStates.allCountriesData === null) {
            worldStatesDispatch([{type: WorldActionTypes.allCountriesData, data: []}]);
            getCountriesAndRussianRegionsData().then(d => {
                worldStatesDispatch([
                    {type: WorldActionTypes.allCountriesData, data: d.worldData},
                    {type: WorldActionTypes.allCountriesVaccineData, data: d.worldVaccineData},
                    {type: WorldActionTypes.countriesIds, data: d.worldRegions}
                ]);

                russianStatesDispatch([
                    {type: RussiaActionType.russiaRegionsData, data: d.russiaData},
                    {type: RussiaActionType.russiaRegionsIds, data: d.russiaRegions}
                ]);
            });
        }
    }, []);

    useEffect(() => {
        if (russianStates.russiaCasesHistory === null) {
            getRussiaHistoryData().then(d => {
                russianStatesDispatch([{type: RussiaActionType.russiaCasesHistory, data: d}]);
            });
        }
    }, []);

    // let casesData, minCases, maxCases,
    //     casesTodayData, minCasesToday, maxCasesToday,
    //     deathsData, minDeaths, maxDeaths,
    //     deathsTodayData, minDeathsToday, maxDeathsToday,
    //     vaccinesData, minVaccines, maxVaccines,
    //     vaccinesFullData, minVaccinesFull, maxVaccinesFull
    // ;
    //
    // if (russianStates.russiaCasesHistory?.cases) {
    //
    //
    //     [casesTodayData, minCasesToday, maxCasesToday] =
    //         getMainData(worldStates.allCountriesData, "cases_delta", diagramData.casesToday.label);
    //
    //     [deathsData, minDeaths, maxDeaths] =
    //         getMainData(worldStates.allCountriesData, "deaths", diagramData.deaths.label);
    //
    //     [deathsTodayData, minDeathsToday, maxDeathsToday] =
    //         getMainData(worldStates.allCountriesData, "deaths_delta", diagramData.deathsToday.label);
    //
    //     [vaccinesData, minVaccines, maxVaccines] =
    //         getVaccineData(worldStates.allCountriesVaccineData, "vac", diagramData.vaccines.label);
    //
    //     [vaccinesFullData, minVaccinesFull, maxVaccinesFull] =
    //         getVaccineData(worldStates.allCountriesVaccineData, "peop_full_vac", diagramData.vaccinesFull.label);
    // } else return <></>;
    //
    // const worldButtons = [
    //     {
    //         n: 1,
    //         name: 'Всего заболеваний',
    //         classes: ['MenuButton', 'BadButton'],
    //         to: 'cases',
    //     },
    //     {
    //         n: 2,
    //         name: 'Заболеваний сегодня',
    //         classes: ['MenuButton', 'BadButton'],
    //         to: 'casesToday',
    //         object: <BarChartContainer
    //             id={2}
    //             key={2}
    //             color={badColor}
    //             title='Заболеваний сегодня'
    //             xKey="name"
    //             yKey={diagramData.casesToday.label}
    //             max={maxCasesToday}
    //             data={casesTodayData}/>
    //     },
    //     {
    //         n: 3,
    //         name: 'Всего смертей',
    //         classes: ['MenuButton', 'BadButton'],
    //         to: 'deaths',
    //         object: <BarChartContainer
    //             id={2}
    //             key={2}
    //             color={badColor}
    //             title='Заболеваний сегодня'
    //             xKey="name"
    //             yKey={diagramData.deaths.label}
    //             max={maxDeaths}
    //             data={deathsData}/>
    //     },
    //     {
    //         n: 4,
    //         name: 'Смертей сегодня',
    //         classes: ['MenuButton', 'BadButton'],
    //         to: 'deathsToday',
    //         object: <BarChartContainer
    //             id={4}
    //             key={4}
    //             color={badColor}
    //             title='Смертей сегодня'
    //             xKey="name"
    //             yKey={diagramData.deathsToday.label}
    //             max={maxDeathsToday}
    //             data={deathsTodayData}/>
    //     },
    //     {
    //         n: 12,
    //         name: 'Вакцин сделано',
    //         classes: ['MenuButton', 'GoodButton'],
    //         to: 'vac',
    //         object: <BarChartContainer
    //             id={12}
    //             key={12}
    //             color={goodColor}
    //             title='Вакцин сделано'
    //             xKey="name"
    //             yKey={diagramData.vaccines.label}
    //             max={maxVaccines}
    //             data={vaccinesData}/>
    //     },
    //     {
    //         n: 13,
    //         name: 'Количество полных вакцинаций',
    //         classes: ['MenuButton', 'GoodButton'],
    //         to: 'vacFull',
    //         object: <BarChartContainer
    //             id={13}
    //             key={13}
    //             color={goodColor}
    //             title='Количество полных вакцинаций'
    //             xKey="name"
    //             yKey={diagramData.vaccinesFull.label}
    //             max={maxVaccinesFull}
    //             data={vaccinesFullData}/>
    //     },
    //     {
    //         n: 14,
    //         name: 'Поиск по странам',
    //         classes: ['MenuButton', 'BadButton'],
    //         to: 'search',
    //         object: <RenderCountrySearch
    //             id={14}
    //             key={14}
    //             data={worldStates.countriesIds}/>
    //     },
    // ];
    //
    // let casesDataRu, minCasesRu, maxCasesRu, deathsDataRu, minDeathsRu, maxDeathsRu;
    //
    // if (russianStates.russiaCasesHistory?.cases) {
    //     [casesDataRu, minCasesRu, maxCasesRu] =
    //         getRegionData(russianStates.russiaCasesHistory, "cases", diagramData.cases.label);
    //
    //     [deathsDataRu, minDeathsRu, maxDeathsRu] =
    //         getRegionData(russianStates.russiaCasesHistory, "deaths", diagramData.deaths.label);
    // } else return <></>;
    //
    //
    // const russiaButtons = [
    //     {
    //         n: 6,
    //         name: 'Заболеваний за месяц',
    //         classes: ['MenuButton', 'BadButton'],
    //         to: 'casesRuss',
    //         object: <LineChartContainer
    //             id={6}
    //             key={6}
    //             min={minCasesRu}
    //             max={maxCasesRu}
    //             color={badColor}
    //             xKey="name"
    //             yKey={diagramData.cases.label}
    //             title='Заболеваний за месяц'
    //             data={casesDataRu}/>
    //     },
    //     {
    //         n: 8,
    //         name: 'Смертей за месяц',
    //         classes: ['MenuButton', 'BadButton'],
    //         to: 'deathsRuss',
    //         object: <LineChartContainer
    //             id={8}
    //             key={8}
    //             min={minDeathsRu}
    //             max={maxDeathsRu}
    //             xKey="name"
    //             yKey={diagramData.deaths.label}
    //             color={badColor}
    //             title='Смертей за месяц'
    //             data={deathsDataRu}/>
    //     },
    //     {
    //         n: 9,
    //         name: 'Поиск по регионам',
    //         classes: ['MenuButton', 'BadButton'],
    //         to: 'searchRuss',
    //         object: <RenderRussiaRegionSearch id={9} key={9}
    //                                           data={russianStates.russiaRegionsIds}/>
    //     },
    //     {
    //         n: 10,
    //         name: 'Заболевания на карте',
    //         classes: ['MenuButton', 'BadButton'],
    //         to: 'casesMap',
    //         object: <RenderRussiaMap
    //             id={10}
    //             key={10}
    //             color={{r: 220, g: 20, b: 60}}
    //             fieldName='cases'
    //             data={russianStates.russiaRegionsData}/>
    //     },
    //     {
    //         n: 11,
    //         name: 'Смерти на карте',
    //         classes: ['MenuButton', 'BadButton'],
    //         to: 'deathsMap',
    //         object: <RenderRussiaMap
    //             id={11}
    //             key={11}
    //             color={{r: 120, g: 20, b: 60}}
    //             fieldName='deaths'
    //             data={russianStates.russiaRegionsData}/>
    //     },
    // ];

    console.log(worldStates)
    return <ContentWithRouterAndContext
        worldStates={worldStates}
        russiaStates={russianStates}
        ContentWrapper={({children}) => <div className="Diagrams">{children}</div>}
    />
}

export default App;
