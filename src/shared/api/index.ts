import axios from "axios";
import {russiaCasesLink, worldStatLink} from "../../Constants";

interface Info {
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

interface RussiaStatStructure {
    data: Data;
    dates: string[];
}

interface Vaccination {
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

interface WorldStatStructure {
    data: Data;
    dates: string[];
}

interface CountriesAndRussianRegionsResponse {
    "russia_stat_struct": RussiaStatStructure;
    "vaccination_struct": VaccinationStructure;
    "world_stat_struct": WorldStatStructure;
}

export async function getCountriesAndRussianRegionsData() {
    return axios.get<CountriesAndRussianRegionsResponse>(worldStatLink).then((r) => {
        const data = r.data;
        const worldDataRaw = data['world_stat_struct']['data']
        const worldData =
            Object.keys(worldDataRaw).map(index => {
                return {name: worldDataRaw[Number(index)]['info']['name'].toString(), code: index};
            });

        const russianDataRaw = data['russia_stat_struct']['data'];
        const russianData =
            Object.keys(russianDataRaw).map((index) => {
                return {name: russianDataRaw[Number(index)]['info']['name'].toString(), code: index};
            });

        return {
            'worldStat': worldDataRaw,
            'vaccineStat': data['vaccination_struct'],
            'countriesIds': worldData,

            'russiaStat': russianDataRaw,
            'russiaRegionsIds': russianData
        };
    });
}


interface RussiaHistoryResponse {
    cases: [a: number, b: number][];
    deaths: [a: number, b: number][];
    info: Info;
}

export async function getRussiaHistoryData() {
    return await axios.get<RussiaHistoryResponse>(russiaCasesLink).then((r) => r.data)
}