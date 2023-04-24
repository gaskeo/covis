import {Data, Info} from "../api";
import {countriesRu} from "../../constants";
import {RegionId} from "../store";

export function getMainData(data: Data, field: keyof Info, label: string, name: keyof Info = 'name') {
    let maxValue = 0;
    const convData = Object.keys(data).map(d => {
        const currentData = data[Number(d)];
        const needName: string = currentData.info[name] as string;
        const includeName = countriesRu.includes(needName);
        if (includeName) {
            maxValue = Math.max(currentData.info[field] as number, maxValue);

            return {
                name: currentData.info[name] as string,
                [label]: currentData.info[field] as number
            }
        }
        return {name: "---", [label]: 0};
    }).filter(a => a.name !== "---");

    convData.sort((a, b) => a.name.localeCompare(b.name));
    return {data: convData, maxValue};
}

export function getRegionCodeByName(data: RegionId[], regionName: string) {
    const region = regionName.toLowerCase()
    for (let i in Object.entries(data)) {
        if (data[i].name.toLowerCase() === region) {
            return Number(data[i].code);
        }
    }
    return 0;
}
