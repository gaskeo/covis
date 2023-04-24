import {badColor, countriesRu} from "../../constants";

import {BarChartContainer} from "../../components/charts/barChart/barChartContainer";
import {useGlobalContext} from "../../shared/context";
import {WorldActionTypes} from "../../shared/store";

const CasesPage = () => {
    const {worldStates} = useGlobalContext();
    const worldData = worldStates[WorldActionTypes.allCountriesData]
    if (!worldStates || !worldData || !worldStates[WorldActionTypes.countriesIds]) return <></>

    let maxValue = 0;
    const data = worldStates[WorldActionTypes.countriesIds]
        .filter(region => countriesRu.includes(region.name) && region.code !== "10000")
        .map((region) => {
            const deaths = worldData[Number(region.code)].info.cases;
            maxValue = Math.max(deaths, maxValue);
            return {
                x: worldData[Number(region.code)].info.name,
                y: deaths
            }
        })

    return (
        <BarChartContainer
            color={badColor}
            title='Всего заболеваний'
            xKey="x"
            yKey="y"
            max={maxValue}
            data={data}/>
    )
}

export {CasesPage};