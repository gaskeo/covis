import {RegionHistoryResponse} from "../models";
import {getRegionData} from "./getRegionData";

export async function getRussiaHistoryData(): Promise<RegionHistoryResponse> {
    return await getRegionData(225)
}
