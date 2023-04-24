import React from "react";
import { MyGlobalContext } from "src/shared/context";
import {RussiaReducer, WorldReducer} from "../../../shared/store";

export function WithContext(Component: React.ElementType) {
    return function WithContextComponent({worldStates, russiaStates, ...props}: {
        worldStates: WorldReducer,
        russiaStates: RussiaReducer,

    }) {
        return (
            <>
                <MyGlobalContext.Provider value={{
                    worldStates: worldStates,
                    russiaStates: russiaStates
                }}>
                    <Component {...props}/>
                </MyGlobalContext.Provider>
            </>
        )
    }
}