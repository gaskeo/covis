import {Data, RegionHistoryResponse} from "../../../api";
import {RegionId} from "./shared";

export enum RussiaActionType {
    russiaRegionsData = "russiaRegionsData",
    russiaRegionsIds = "russiaRegionsIds",
    russiaCasesHistory = "russiaCasesHistory"
}

export interface RussiaReducer {
    russiaRegionsData: null | Data;
    russiaRegionsIds: null | RegionId[];
    russiaCasesHistory: null | RegionHistoryResponse;
}

interface russiaRegionsDataAction {
    type: RussiaActionType.russiaRegionsData;
    data: Data;
}

interface russiaRegionsIdsAction {
    type: RussiaActionType.russiaRegionsIds;
    data: RegionId[];
}

interface russiaCasesHistoryAction {
    type: RussiaActionType.russiaCasesHistory;
    data: RegionHistoryResponse;
}

type RussiaAction = russiaRegionsDataAction | russiaRegionsIdsAction | russiaCasesHistoryAction;


export function russiaReducer(states: RussiaReducer, actions: RussiaAction[]) {
    actions.map(action => {
        switch (action.type) {
            case RussiaActionType.russiaRegionsData:
                states[RussiaActionType.russiaRegionsData] = action.data;
                return;
            case RussiaActionType.russiaRegionsIds:
                states[RussiaActionType.russiaRegionsIds] = action.data;
                return;
            case RussiaActionType.russiaCasesHistory:
                states[RussiaActionType.russiaCasesHistory] = action.data;
        }
    });
    return {...states};
}

export const russianInit: RussiaReducer = {
    russiaRegionsData: null,
    russiaRegionsIds: null,
    russiaCasesHistory: null,
};