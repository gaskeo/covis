import axios from "axios";
import {CountriesAndRussianRegionsResponse, Data, VaccinationStructure} from "../models";
import {infoTransformer, getWorldInfoLink} from "../utils";

export async function getCountriesAndRussianRegionsData() {
    return axios.get<CountriesAndRussianRegionsResponse>(getWorldInfoLink()).then((r) => {
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
    );
}
