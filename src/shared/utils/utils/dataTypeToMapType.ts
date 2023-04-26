import {Data} from "@/src/shared/api";
import {mapType} from "@/src/components/map/ui/russia";

export function dataTypeToMapType(data: Data): mapType {
    const mapType: mapType = {}
    Object.keys(data).map(key => {
        mapType[data[Number(key)].info.name] = data[Number(key)].info
        return undefined;
    });
    return mapType;
}