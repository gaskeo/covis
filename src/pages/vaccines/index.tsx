import {countriesRu, goodColor} from "../../shared/constants";

import {BarChartContainer} from "../../components/charts";
import {useGlobalContext} from "../../shared/context";
import {WorldActionTypes} from "../../shared/store";
import {
    generateHumanDate,
    generateHumanNumber,
    getChartDataFromVaccinationStructure,
    getMaxDateFromVaccinationStructure, getNameToCodeRegionMapFromRegionIds
} from "../../shared/utils";
import Tooltip from "../../components/tooltip";

const VaccinesPage = () => {
    const {worldStates} = useGlobalContext();
    const worldData = worldStates[WorldActionTypes.allCountriesVaccineData]
    if (!worldStates || !worldData || !worldStates[WorldActionTypes.countriesIds]) return <></>

    const {chart: chartDataVaccines, max: maxVaccines} = getChartDataFromVaccinationStructure<"vaccinated">(
        worldData,
        "vaccinated",
        (info) => countriesRu.includes(info.nameRu)
    )

    const {chart: chartDataFullVaccines, max: maxFullVaccines} = getChartDataFromVaccinationStructure<"peopleFullVaccinated">(
        worldData,
        "peopleFullVaccinated",
        (info) => countriesRu.includes(info.nameRu)
    )

    const maxDate = getMaxDateFromVaccinationStructure(worldData);
    const nameToCode = getNameToCodeRegionMapFromRegionIds(worldStates[WorldActionTypes.countriesIds]);
    return (
        <>
            <BarChartContainer
                color={goodColor}
                title='Вакцин сделано'
                subtitle={`Последние данные: ${maxDate}`}
                xKey="x"
                yKey="y"
                max={maxVaccines * 1.1}
                tooltipGenerator={(bar) => (
                    <Tooltip
                        title={bar}
                        text={generateHumanNumber(worldData[nameToCode[bar]].vaccinated)}
                        subtext={generateHumanDate(new Date(worldData[nameToCode[bar]].date), ".")}
                    />
                )}
                data={chartDataVaccines}/>
            <BarChartContainer
                color={goodColor}
                title='Полные вакцины'
                subtitle={`Последние данные: ${maxDate}`}
                xKey="x"
                yKey="y"
                max={maxFullVaccines * 1.1}
                tooltipGenerator={(bar) => (
                    <Tooltip
                        title={bar}
                        text={generateHumanNumber(worldData[nameToCode[bar]].peopleFullVaccinated)}
                        subtext={generateHumanDate(new Date(worldData[nameToCode[bar]].date), ".")}
                    />
                )}
                data={chartDataFullVaccines}/>
        </>
    )
}

export {VaccinesPage};