import React from "react";
import {Navigate, Route, Routes, HashRouter as Router} from "react-router-dom";
import {CasesPage} from "../../../pages/cases/cases";
import {RussiaReducer, WorldReducer} from "../../../shared/store";
import {CasesTodayPage} from "../../../pages/casesToday/casesToday";

const worldButtons = [
    {
        to: "cases",
        object: <CasesPage/>,
    },
    {
        to: "casesToday",
        object: <CasesTodayPage/>,
    }
]

export function WithRouter(Component: React.ElementType) {

    return function WithRouterComponent({...props}) {
        return (
            <>
                <Router>
                    <Component {...props}>
                        <Routes>
                            <Route path='/' element={<Navigate to='cases'/>}/>
                            {worldButtons.map(b =>
                                <Route key={b.to} path={b.to} element={b.object}/>)}
                        </Routes>
                    </Component>
                </Router>
            </>
        )
    }
}