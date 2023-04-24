import {countriesRu, goodColor} from "../../shared/constants";

import {BarChartContainer} from "../../components/charts/barChart/barChartContainer";
import {useGlobalContext} from "../../shared/context";
import {WorldActionTypes} from "../../shared/store";

const VaccinesFullPage = () => {
    const {worldStates} = useGlobalContext();
    const worldData = worldStates[WorldActionTypes.allCountriesVaccineData]
    if (!worldStates || !worldData || !worldStates[WorldActionTypes.countriesIds]) return <></>

    let maxValue = 0;
    const data = worldStates[WorldActionTypes.countriesIds]
        .filter(region => countriesRu.includes(region.name) && region.code !== "10000")
        .map((region) => {
            const vaccines = worldData[Number(region.code)].peopleFullVaccinated;
            maxValue = Math.max(vaccines, maxValue);
            return {
                x: worldData[Number(region.code)].nameRu,
                y: vaccines
            }
        })

    return (
        <BarChartContainer
            color={goodColor}
            title='Полных вакцин сделано'
            xKey="x"
            yKey="y"
            max={maxValue}
            data={data}/>
    )
}

export {VaccinesFullPage};