import {russianInit, russiaReducer, RussiaActionType, RussiaReducer} from "./models/russia";
import {worldInit, worldReducer, WorldActionTypes, WorldReducer} from "./models/world";
import {RegionId} from "./models/shared";

export type {
    RussiaReducer, WorldReducer, RegionId
};

export {
    russianInit, russiaReducer, RussiaActionType,
    worldInit, worldReducer, WorldActionTypes,
};