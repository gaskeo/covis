import axios from "axios";
import {getRegionLink} from "../utils";
import {RegionHistoryResponse, RegionHistoryResponseRaw} from "../models";

export async function getRegionData(regionIndex: number): Promise<RegionHistoryResponse> {
    return await axios.get<RegionHistoryResponseRaw>(getRegionLink(regionIndex)).then(
        r => {
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
        }
    )
}