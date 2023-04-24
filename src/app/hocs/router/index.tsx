import React from "react";
import {Navigate, Route, Routes, HashRouter as Router} from "react-router-dom";
import {CasesPage} from "../../../pages/cases/cases";
import {RussiaReducer, WorldReducer} from "../../../shared/store";


export function WithRouter(Component: React.ElementType) {
    const worldButtons = [
        {
            n: 0,
            name: "123",
            to: "cases",
            object: <CasesPage/>,
            classes: ['MenuButton', 'BadButton']
        }
    ]
    return function WithRouterComponent({...props}) {
        return (
            <>
                <Router>
                    <Component {...props}>
                        <Routes>
                            <Route path='/' element={<Navigate to='cases'/>}/>
                            {worldButtons.map(b =>
                                <Route key={b.n} path={b.to}
                                       element={b.object}/>)}
                        </Routes>
                    </Component>
                </Router>
            </>
        )
    }
}