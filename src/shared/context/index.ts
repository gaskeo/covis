import {createContext, useContext} from "react"
import {russianInit, RussiaReducer, worldInit, WorldReducer} from "../store";

export type GlobalContent = {
    worldStates: WorldReducer
    russiaStates: RussiaReducer
}
export const MyGlobalContext = createContext<GlobalContent>({
    worldStates: worldInit,
    russiaStates: russianInit
})
export const useGlobalContext = () => useContext(MyGlobalContext)