import React from "react";
import {Route, Routes, HashRouter as Router} from "react-router-dom";
import {CasesPage} from "@/src/pages/cases";
import {DeathsPage} from "@/src/pages/deaths";
import {VaccinesPage} from "@/src/pages/vaccines";
import {VaccinesFullPage} from "@/src/pages/vaccinesFull";
import {SearchPage} from "@/src/pages/search";
import {CasesRuPage} from "@/src/pages/casesRu";
import {DeathsRuPage} from "@/src/pages/deathsRu";
import {SearchRuPage} from "@/src/pages/searchRu";
import {CasesMapRu} from "@/src/pages/casesMapRu";
import {DeathsMapRu} from "@/src/pages/deathsMapRu";
import {AboutPage} from "@/src/pages/about/about";

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