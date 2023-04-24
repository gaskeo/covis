import React from "react";
import {Navigate, Route, Routes, HashRouter as Router} from "react-router-dom";
import {CasesPage} from "../../../pages/cases";
import {CasesTodayPage} from "../../../pages/casesToday";
import {DeathsPage} from "../../../pages/deaths";
import {DeathsTodayPage} from "../../../pages/deathsToday";
import {VaccinesPage} from "../../../pages/vaccines";
import {VaccinesFullPage} from "../../../pages/vaccinesFull";
import {SearchPage} from "../../../pages/search";
import {CasesRuPage} from "../../../pages/casesRu";

const worldButtons = [
    {
        to: "cases",
        object: <CasesPage/>,
    },
    {
        to: "casesToday",
        object: <CasesTodayPage/>,
    },
    {
        to: "deaths",
        object: <DeathsPage/>,
    },
    {
        to: "deathsToday",
        object: <DeathsTodayPage/>,
    },
    {
        to: "vac",
        object: <VaccinesPage/>,
    },
    {
        to: "vacFull",
        object: <VaccinesFullPage/>,
    },
    {
        to: "search",
        object: <SearchPage/>,
    },
    {
        to: "casesRu",
        object: <CasesRuPage/>,
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