import {Info, InfoRaw} from "../../models";

export default function infoTransformer(info: InfoRaw): Info {
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