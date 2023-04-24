import {getCountriesAndRussianRegionsData, getRegionData, getRussiaHistoryData} from "./handlers";
import {RussiaStatStructure,
    WorldStatStructure,
    VaccinationStructure,
    VaccinationStructureRaw,
    DataRaw,
    Data,
    InfoRaw,
    Info,
    CountriesAndRussianRegionsResponse,
    RegionHistoryResponseRaw,
    RegionHistoryResponse
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
    CountriesAndRussianRegionsResponse,
    RegionHistoryResponseRaw,
    RegionHistoryResponse
};
export {getRegionData, getCountriesAndRussianRegionsData, getRussiaHistoryData};
