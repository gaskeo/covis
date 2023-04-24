import React from "react";
import { MyGlobalContext } from "src/shared/context";
import {RussiaReducer, WorldReducer} from "../../../shared/store";

export function WithContext(Component: React.ElementType) {
    return function WithContextComponent({worldStates, russianStates, ...props}: {
        worldStates: WorldReducer,
        russianStates: RussiaReducer,

    }) {
        return (
            <>
                <MyGlobalContext.Provider value={{
                    worldStates: worldStates,
                    russiaStates: russianStates
                }}>
                    <Component {...props}/>
                </MyGlobalContext.Provider>
            </>
        )
    }
}