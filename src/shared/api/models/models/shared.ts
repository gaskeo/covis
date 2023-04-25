import {RussiaStatStructure} from "./russia";
import {WorldStatStructure} from "./world";

export type InfoFields =
    | "cases"
    | "casesDelta"
    | "date"
    | "deaths"
    | "deathsDelta"
    | "fullName"
    | "name"
    | "population"
    | "rt"
    | "searchNames"
    | "shortName"

type InfoStructureType = {
    [key in InfoFields]: unknown;
};

export interface Info extends InfoStructureType {
    cases: number;
    casesDelta: number;
    date: string;
    deaths: number;
    deathsDelta: number;
    fullName: string;
    name: string;
    population: number;
    rt: number;
    searchNames: string[]
    shortName: string;
}

export interface InfoRaw {
    cases: number;
    "cases_delta": number;
    date: string;
    deaths: number;
    "deaths_delta": number;
    "full_name": string;
    name: string;
    population: number;
    rt: number;
    "search_names": string[]
    "short_name": string;
}

export interface Data {
    [index: number]: { info: Info };
}

export interface DataRaw {
    [index: number]: { info: InfoRaw };
}

export type VaccinationFields =
    | "date"
    | "id"
    | "name"
    | "nameRu"
    | "peopleFullVaccinated"
    | "population"
    | "vaccinated"

type VaccinationStructureType = {
    [key in VaccinationFields]: unknown;
};

export interface Vaccination extends VaccinationStructureType {
    date: string;
    id: number;
    name: string;
    nameRu: string;
    peopleFullVaccinated: number;
    population: number;
    vaccinated: number;
}

interface VaccinationRaw {
    date: string;
    id: number;
    name: string;
    "name_ru": string;
    "peop_full_vac": number;
    pop: number;
    vac: number;
}

export interface VaccinationStructure {
    [index: number]: Vaccination;
}


export interface VaccinationStructureRaw {
    [index: number]: VaccinationRaw;
}

export interface CountriesAndRussianRegionsResponse {
    "russia_stat_struct": RussiaStatStructure;
    "vaccination_struct": VaccinationStructureRaw;
    "world_stat_struct": WorldStatStructure;
}


export interface RegionHistoryResponseRaw {
    cases: [a: number, b: number][];
    deaths: [a: number, b: number][];
    info: InfoRaw;
}

export interface RegionHistoryResponse {
    cases: [a: number, b: number][];
    deaths: [a: number, b: number][];
    info: Info;
}
