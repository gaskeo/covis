import {Data, VaccinationStructure} from "../../../api";
import {RegionId} from "./shared";

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
                return undefined;
            case WorldActionTypes.countriesIds:
                states[WorldActionTypes.countriesIds] = action.data;
                return undefined;
            case WorldActionTypes.allCountriesVaccineData:
                states[WorldActionTypes.allCountriesVaccineData] = action.data;
                return undefined;
            default:
                return undefined;
        }
    });
    return {...states};
}

export const worldInit: WorldReducer = {
    allCountriesData: null,
    countriesIds: null,
    allCountriesVaccineData: null,
};
