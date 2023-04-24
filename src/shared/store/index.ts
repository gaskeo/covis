import {Data, RussiaHistoryResponse, RussiaHistoryResponseRaw, VaccinationStructure} from "../api/index";

type RegionId = { name: string, code: string }


export enum WorldActionTypes {
    allCountriesData = "allCountriesData",
    countriesIds = "countriesIds",
    allCountriesVaccineData = "allCountriesVaccineData"
}

export interface WorldReducer {
    [WorldActionTypes.allCountriesData]: null | Data,
    [WorldActionTypes.countriesIds]: null | RegionId[],
    [WorldActionTypes.allCountriesVaccineData]: null | VaccinationStructure,
}

interface allCountriesDataAction {
    type: WorldActionTypes.allCountriesData;
    data: Data;
}

interface countriesIdsAction {
    type: WorldActionTypes.countriesIds;
    data: RegionId[];
}

interface allCountriesVaccineDataAction {
    type: WorldActionTypes.allCountriesVaccineData;
    data: VaccinationStructure;
}

type WorldAction = allCountriesDataAction | countriesIdsAction | allCountriesVaccineDataAction;

export function worldReducer(
    states: WorldReducer,
    actions: WorldAction[]
) {
    actions.map((action) => {
        switch (action.type) {
            case WorldActionTypes.allCountriesData:
                states[WorldActionTypes.allCountriesData] = action.data;
                return;
            case WorldActionTypes.countriesIds:
                states[WorldActionTypes.countriesIds] = action.data;
                return;
            case WorldActionTypes.allCountriesVaccineData:
                states[WorldActionTypes.allCountriesVaccineData] = action.data
        }
    });
    return {...states};
}

export enum RussiaActionType {
    russiaRegionsData = "russiaRegionsData",
    russiaRegionsIds = "russiaRegionsIds",
    russiaCasesHistory = "russiaCasesHistory"
}

export interface RussiaReducer {
    russiaRegionsData: null | Data;
    russiaRegionsIds: null | RegionId[];
    russiaCasesHistory: null | RussiaHistoryResponse;
}

interface russiaRegionsDataAction {
    type: RussiaActionType.russiaRegionsData;
    data: Data;
}

interface russiaRegionsIdsAction {
    type: RussiaActionType.russiaRegionsIds;
    data: RegionId[];
}

interface russiaCasesHistoryAction {
    type: RussiaActionType.russiaCasesHistory;
    data: RussiaHistoryResponse;
}

type RussiaAction = russiaRegionsDataAction | russiaRegionsIdsAction | russiaCasesHistoryAction;


export function russianReducer(states: RussiaReducer, actions: RussiaAction[]) {
    actions.map(action => {
        switch (action.type) {
            case RussiaActionType.russiaRegionsData:
                states[RussiaActionType.russiaRegionsData] = action.data;
                return;
            case RussiaActionType.russiaRegionsIds:
                states[RussiaActionType.russiaRegionsIds] = action.data;
                return;
            case RussiaActionType.russiaCasesHistory:
                states[RussiaActionType.russiaCasesHistory] = action.data;
        }
    });
    return {...states};
}

export const worldInit: WorldReducer = {
    allCountriesData: null,
    countriesIds: null,
    allCountriesVaccineData: null,
};

export const russianInit: RussiaReducer = {
    russiaRegionsData: null,
    russiaRegionsIds: null,
    russiaCasesHistory: null,
};