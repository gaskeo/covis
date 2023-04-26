import {badColor, countriesRu} from "@/src/shared/constants";

import {BarChartContainer} from "@/src/components/charts";
import {useGlobalContext} from "@/src/shared/context";
import {WorldActionTypes} from "@/src/shared/store";
import {
    generateHumanDate,
    generateHumanNumber,
    getChartDataFromData,
    getMaxDateFromData,
    getNameToCodeRegionMapFromRegionIds
} from "@/src/shared/utils";
import Tooltip from "@/src/components/tooltip";

const DeathsPage = () => {
    const {worldStates} = useGlobalContext();
    const worldData = worldStates[WorldActionTypes.allCountriesData]
    if (!worldStates || !worldData || !worldStates[WorldActionTypes.countriesIds]) return <>loading...</>

    const {chart: chartDataTotal, max: maxCasesTotal} =
        getChartDataFromData<"deaths">(
            worldData,
            "deaths",
            (info) => countriesRu.includes(info.name)
        );


    const {chart: chartDataLast, max: maxDeathsLast} =
        getChartDataFromData<"deathsDelta">(
            worldData,
            "deathsDelta",
            (info) => countriesRu.includes(info.name)
        );

    const maxDate = getMaxDateFromData(worldData);
    const nameToCode = getNameToCodeRegionMapFromRegionIds(worldStates[WorldActionTypes.countriesIds]);

    return (
        <>
            <BarChartContainer
                color={badColor}
                title="Всего смертей"
                subtitle={`Последние данные: 
            ${maxDate}`}
                xKey="x"
                yKey="y"
                max={maxCasesTotal * 1.1}
                data={chartDataTotal}
                tooltipGenerator={(bar) => (
                    <Tooltip
                        title={bar}
                        text={generateHumanNumber(worldData[nameToCode[bar]].info.deaths)}
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
                max={maxDeathsLast * 1.1}
                data={chartDataLast}
                tooltipGenerator={(bar) => (
                    <Tooltip
                        title={bar}
                        text={generateHumanNumber(worldData[nameToCode[bar]].info.deathsDelta)}
                        subtext={generateHumanDate(new Date(worldData[nameToCode[bar]].info.date), ".")}
                    />)}
            />

        </>
    )
}


export {DeathsPage};