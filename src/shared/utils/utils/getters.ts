import {RegionId} from "../../store";

export function getRegionCodeByName(data: RegionId[], regionName: string) {
    const region = regionName.toLowerCase()
    for (let i in Object.entries(data)) {
        if (data[i].name.toLowerCase() === region) {
            return Number(data[i].code);
        }
    }
    return 0;
}
