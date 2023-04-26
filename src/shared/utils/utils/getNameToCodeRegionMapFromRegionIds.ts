import {RegionId} from "@/src/shared/store";

function getNameToCodeRegionMapFromRegionIds(regionIds: RegionId[]) {
    const nameToCode: { [name: string]: number } = {};
    regionIds.map((region) => {
            nameToCode[region.name] = Number(region.code);
            return undefined;
        })

    return nameToCode;
}

export {getNameToCodeRegionMapFromRegionIds};
