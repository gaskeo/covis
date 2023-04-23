import axios from "axios";
import {russiaCasesLink, worldStatLink} from "../../Constants";

interface Info {
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

interface InfoRaw {
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

interface RussiaStatStructure {
    data: DataRaw;
    dates: string[];
}

interface Vaccination {
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

interface WorldStatStructure {
    data: DataRaw;
    dates: string[];
}

interface CountriesAndRussianRegionsResponse {
    "russia_stat_struct": RussiaStatStructure;
    "vaccination_struct": VaccinationStructureRaw;
    "world_stat_struct": WorldStatStructure;
}

function infoTransformer(info: InfoRaw): Info {
    return {
        cases: info.cases,
        casesDelta: info["cases_delta"],
        date: info.date,
        deaths: info.deaths,
        deathsDelta: info["deaths_delta"],
        fullName: info["full_name"],
        name: info.name,
        population: info.population,
        rt: info.rt,
        searchNames: info["search_names"],
        shortName: info["short_name"]
    }
}

export async function getCountriesAndRussianRegionsData() {
    return axios.get<CountriesAndRussianRegionsResponse>(worldStatLink).then((r) => {
            const data = r.data;
            const worldDataRaw = data['world_stat_struct']['data']
            const worldData: Data = {};
            Object.keys(worldDataRaw).map(
                (index) => {
                    const currentRegion = worldDataRaw[Number(index)];
                    worldData[Number(index)] = {info: infoTransformer(currentRegion.info)}
                });

            const worldRegions =
                Object.keys(worldDataRaw).map(index => {
                    return {name: worldDataRaw[Number(index)]['info']['name'].toString(), code: index};
                });

            const vaccinationData: VaccinationStructure = {};
            Object.keys(data['vaccination_struct']).map(
                (index) => {
                    const currentVaccination = data['vaccination_struct'][Number(index)];
                    vaccinationData[Number(index)] = {
                        date: currentVaccination.date,
                        id: currentVaccination.id,
                        name: currentVaccination.name,
                        nameRu: currentVaccination["name_ru"],
                        peopleFullVaccinated: currentVaccination["peop_full_vac"],
                        population: currentVaccination.pop,
                        vaccinated: currentVaccination.vac,
                    }
                })

            const russianDataRaw = data['russia_stat_struct']['data'];
            const russianData: Data = {};
            Object.keys(russianDataRaw).map(
                (index) => {
                    const currentRegion = russianDataRaw[Number(index)];
                    russianData[Number(index)] =
                        {info: infoTransformer(currentRegion.info)}

                });

            const russianRegions =
                Object.keys(russianDataRaw).map((index) => {
                    return {name: russianDataRaw[Number(index)]['info']['name'].toString(), code: index};
                });

            return {
                worldData: worldData,
                worldVaccineData: vaccinationData,
                worldRegions: worldRegions,

                russiaData: russianData,
                russiaRegions: russianRegions
            };
        }
    )
        ;
}


export interface RussiaHistoryResponseRaw {
    cases: [a: number, b: number][];
    deaths: [a: number, b: number][];
    info: InfoRaw;
}

export interface RussiaHistoryResponse {
    cases: [a: number, b: number][];
    deaths: [a: number, b: number][];
    info: Info;
}

export async function getRussiaHistoryData(): Promise<RussiaHistoryResponse> {
    return await axios.get<RussiaHistoryResponseRaw>(russiaCasesLink).then((r) => {
        const data = r.data
        return {
            cases: data.cases,
            deaths: data.deaths,
            info: {
                cases: data.info.cases,
                casesDelta: data.info["cases_delta"],
                date: data.info.date,
                deaths: data.info.deaths,
                deathsDelta: data.info["deaths_delta"],
                fullName: data.info["full_name"],
                name: data.info.name,
                population: data.info.population,
                rt: data.info.rt,
                searchNames: data.info["search_names"],
                shortName: data.info["short_name"]
            }
        }
    })
}