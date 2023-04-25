import React from "react";
import {Route, Routes, HashRouter as Router, Navigate} from "react-router-dom";
import {CasesPage} from "../../../pages/cases";
import {DeathsPage} from "../../../pages/deaths";
import {VaccinesPage} from "../../../pages/vaccines";
import {VaccinesFullPage} from "../../../pages/vaccinesFull";
import {SearchPage} from "../../../pages/search";
import {CasesRuPage} from "../../../pages/casesRu";
import {DeathsRuPage} from "../../../pages/deathsRu";
import {SearchRuPage} from "../../../pages/searchRu";
import {CasesMapRu} from "../../../pages/casesMapRu";
import {DeathsMapRu} from "../../../pages/deathsMapRu";
import {AboutPage} from "../../../pages/about/about";

const worldButtons = [
    {
        to: "",
        object: <AboutPage/>,
    },
    {
        to: "cases",
        object: <CasesPage/>,
    },
    {
        to: "deaths",
        object: <DeathsPage/>,
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
    },
    {
        to: "deathsRu",
        object: <DeathsRuPage/>,
    },
    {
        to: "searchRu",
        object: <SearchRuPage/>,
    },
    {
        to: "casesMap",
        object: <CasesMapRu/>,
    },
    {
        to: "deathsMap",
        object: <DeathsMapRu/>,
    }


]

export function WithRouter(Component: React.ElementType) {

    return function WithRouterComponent({...props}) {
        return (
            <>
                <Router>
                    <Component {...props}>
                        <Routes>
                            {worldButtons.map(b =>
                                <Route key={b.to} path={b.to} element={b.object}/>)}
                        </Routes>
                    </Component>
                </Router>
            </>
        )
    }
}