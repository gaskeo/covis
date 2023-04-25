import {getCountriesAndRussianRegionsData, getRegionData, getRussiaHistoryData} from "./handlers";
import {RussiaStatStructure,
    WorldStatStructure,
    VaccinationStructure,
    VaccinationStructureRaw,
    DataRaw,
    Data,
    InfoRaw,
    Info,
    InfoFields,
    CountriesAndRussianRegionsResponse,
    RegionHistoryResponseRaw,
    RegionHistoryResponse,
    Vaccination,
    VaccinationFields
} from "./models";

export type {
    RussiaStatStructure,
    WorldStatStructure,
    VaccinationStructure,
    VaccinationStructureRaw,
    DataRaw,
    Data,
    InfoRaw,
    Info,
    InfoFields,
    CountriesAndRussianRegionsResponse,
    RegionHistoryResponseRaw,
    RegionHistoryResponse,
    Vaccination,
    VaccinationFields
};
export {getRegionData, getCountriesAndRussianRegionsData, getRussiaHistoryData};
