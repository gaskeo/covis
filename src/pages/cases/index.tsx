import {badColor, countriesRu} from "../../shared/constants";

import {BarChartContainer} from "../../components/charts";
import {useGlobalContext} from "../../shared/context";
import {WorldActionTypes} from "../../shared/store";
import {
    generateHumanDate,
    generateHumanNumber, getChartDataFromData,
    getMaxDateFromData,
    getNameToCodeRegionMapFromRegionIds
} from "../../shared/utils";
import Tooltip from "../../components/tooltip";

const CasesPage = () => {
    const {worldStates} = useGlobalContext();
    const worldData = worldStates[WorldActionTypes.allCountriesData]
    if (!worldStates || !worldData || !worldStates[WorldActionTypes.countriesIds]) return <>loading...</>

    const {chart: chartDataTotal, max: maxCasesTotal} =
        getChartDataFromData<"cases">(
            worldData,
            "cases",
            (info) => countriesRu.includes(info.name)
        );


    const {chart: chartDataLast, max: maxCasesLast} =
        getChartDataFromData<"casesDelta">(
            worldData,
            "casesDelta",
            (info) => countriesRu.includes(info.name)
        );

    const maxDate = getMaxDateFromData(worldData);
    const nameToCode = getNameToCodeRegionMapFromRegionIds(worldStates[WorldActionTypes.countriesIds]);

    return (
        <>
            <BarChartContainer
                color={badColor}
                title="Всего заражений"
                subtitle={`Последние данные: ${maxDate}`}
                xKey="x"
                yKey="y"
                max={maxCasesTotal * 1.1}
                data={chartDataTotal}
                tooltipGenerator={(bar) => (
                    <Tooltip
                        title={bar}
                        text={generateHumanNumber(worldData[nameToCode[bar]].info.cases)}
                        subtext={generateHumanDate(new Date(worldData[nameToCode[bar]].info.date), ".")}
                    />
                )}
            />
            <BarChartContainer
                color={badColor}
                title="Последняя дата"
                subtitle={`Последние данные: ${maxDate}`}
                xKey="x"
                yKey="y"
                max={maxCasesLast * 1.1}
                data={chartDataLast}
                tooltipGenerator={(bar) => (
                    <Tooltip
                        title={bar}
                        text={generateHumanNumber(worldData[nameToCode[bar]].info.casesDelta)}
                        subtext={generateHumanDate(new Date(worldData[nameToCode[bar]].info.date), ".")}
                    />)}
            />

        </>
    )
}

export {CasesPage};