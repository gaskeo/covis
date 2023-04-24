import {badColor} from "../../Constants";
import {LineChartContainer} from "../charts/lineChart/lineChartContainer";
import {RegionHistoryResponse} from "../../shared/api";
import {generateLast30Days} from "../../shared/utils/statGenerator";
import styles from "./styles/regionCharts.module.css";

interface RegionChartsProps {
    regionHistory: RegionHistoryResponse | null;
}

const RegionCharts = ({regionHistory}: RegionChartsProps) => {
    if (!regionHistory?.cases || !regionHistory?.deaths) return <></>;
    const {
        data: cases,
        min: minCases,
        max: maxCases
    } = generateLast30Days(regionHistory.cases)
    const {
        data: deaths,
        min: minDeaths,
        max: maxDeaths
    } = generateLast30Days(regionHistory.deaths)

    return (
        <div className={styles.regionCharts}>
            <LineChartContainer
                title={
                    <>
                        Случаи заболевания по стране: <span
                        style={{textTransform: 'capitalize'}}>{regionHistory.info.name}</span>
                    </>
                }
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
                        Случаи смертей по стране: <span
                        style={{textTransform: 'capitalize'}}>{regionHistory.info.name}</span>
                    </>
                }
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

export {RegionCharts};