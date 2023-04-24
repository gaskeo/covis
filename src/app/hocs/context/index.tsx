import React from "react";
import { GlobalContext } from "src/shared/context";
import {RussiaReducer, WorldReducer} from "../../../shared/store";

export function WithContext(Component: React.ElementType) {
    return function WithContextComponent({worldStates, russiaStates, ...props}: {
        worldStates: WorldReducer,
        russiaStates: RussiaReducer,

    }) {
        return (
            <>
                <GlobalContext.Provider value={{
                    worldStates: worldStates,
                    russiaStates: russiaStates
                }}>
                    <Component {...props}/>
                </GlobalContext.Provider>
            </>
        )
    }
}