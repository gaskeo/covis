import React, {useEffect, useReducer} from 'react';
import styles from "../styles/app.module.css";

import {getCountriesAndRussianRegionsData, getRussiaHistoryData} from "../../shared/api";
import {
    RussiaActionType,
    russianInit,
    russiaReducer,
    WorldActionTypes,
    worldInit,
    worldReducer
} from "../../shared/store";
import {WithContext, WithRouter, compose} from "../hocs";
import Menu from "../../components/menu";
import Header from "../../components/header";

function Content({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            <div className={styles.dataContainer}>
                <div className={styles.dataWrapper}>
                    <Menu/>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{height: "100px"}}></div>
        </>

    )
}


const ContentWithRouterAndContext = compose(WithContext, WithRouter)(Content);


function App() {


    const [worldStates, worldStatesDispatch] = useReducer(worldReducer, worldInit, i => i);
    const [russiaStates, russianStatesDispatch] = useReducer(russiaReducer, russianInit, i => i);

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
    }, [worldStates.allCountriesData]);

    useEffect(() => {
        if (russiaStates.russiaCasesHistory === null) {
            getRussiaHistoryData().then(d => {
                russianStatesDispatch([{type: RussiaActionType.russiaCasesHistory, data: d}]);
            });
        }
    }, []);

    return <ContentWithRouterAndContext
        worldStates={worldStates}
        russiaStates={russiaStates}
        ContentWrapper={({children}: { children: React.ReactNode }) => children}
    />
}

export default App;
