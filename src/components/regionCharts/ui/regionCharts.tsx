import {badColor} from "@/src/shared/constants";
import {LineChartContainer} from "@/src/components/charts";
import {RegionHistoryResponse} from "@/src/shared/api";
import {
    generateHumanDate,
    generateLast30Days,
} from "@/src/shared/utils";
import styles from "../styles/regionCharts.module.css";

interface RegionChartsProps {
    regionHistory: RegionHistoryResponse | null;
}

const RegionCharts = ({regionHistory}: RegionChartsProps) => {
    if (!regionHistory?.cases || !regionHistory?.deaths) return <></>;
    const {
        data: cases,
        min: minCases,
        max: maxCases
    } = generateLast30Days(regionHistory.cases, new Date(regionHistory.info.date));
    const {
        data: deaths,
        min: minDeaths,
        max: maxDeaths
    } = generateLast30Days(regionHistory.deaths, new Date(regionHistory.info.date))

    const date = generateHumanDate(new Date(regionHistory.info.date), ".");

    return (
        <div className={styles.regionCharts}>
            <LineChartContainer
                title={
                    <>
                        Случаи заболевания по региону: {regionHistory.info.name}
                    </>
                }
                subtitle={`Последние данные: ${date}`}
                data={cases}
                yKey="y"
                xKey="x"
                min={minCases * 0.9}
                max={maxCases * 1.1}
                color={badColor}
            />
            <LineChartContainer
                title={
                    <>
                        Случаи смертей по региону: {regionHistory.info.name}
                    </>
                }
                subtitle={`Последние данные: ${date}`}
                data={deaths}
                yKey="y"
                xKey="x"
                min={minDeaths * 0.9}
                max={maxDeaths * 1.1}
                color={badColor}
            />
        </div>
    )
}

export default RegionCharts;
