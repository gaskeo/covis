import {createContext, useContext} from "react"
import {russianInit, RussiaReducer, worldInit, WorldReducer} from "@/src/shared/store";

export type GlobalContentType = {
    worldStates: WorldReducer
    russiaStates: RussiaReducer
}
export const GlobalContext = createContext<GlobalContentType>({
    worldStates: worldInit,
    russiaStates: russianInit
})
export const useGlobalContext = () => useContext(GlobalContext)