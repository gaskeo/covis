import {Data, Info} from "../api";
import {mapType} from "../../components/maps/russia/russia";

export function dataTypeToMapType(data: Data): mapType {
    const mapType: mapType = {}
    Object.keys(data).map(key => {
        mapType[data[Number(key)].info.name] = data[Number(key)].info
    });
    return mapType;
}