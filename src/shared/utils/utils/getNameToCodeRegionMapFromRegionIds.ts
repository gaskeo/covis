import {RegionId} from "../../store";

function getNameToCodeRegionMapFromRegionIds(regionIds: RegionId[]) {
    const nameToCode: { [name: string]: number } = {};
    regionIds.map((region) => {
            nameToCode[region.name] = Number(region.code);
        })

    return nameToCode;
}

export {getNameToCodeRegionMapFromRegionIds};
