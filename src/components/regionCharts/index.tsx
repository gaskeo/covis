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
    const [cases, minCases, maxCases] = generateLast30Days(regionHistory.cases)
    const [deaths, minDeaths, maxDeaths]
        = generateLast30Days(regionHistory.deaths)

    return (
        <div className={styles.regionCharts}>
            <LineChartContainer
                title={
                    <>
                        Случаи заболевания по стране: <span
                        style={{textTransform: 'capitalize'}}>{regionHistory.info.name}</span>
                    </>
                }
                data={cases as any}
                yKey="y"
                xKey="x"
                min={Math.ceil(Number(minCases) * 0.9)}
                max={Math.ceil(Number(maxCases) * 1.1)}
                color={badColor}
            />
            <LineChartContainer
                title={
                    <>
                        Случаи смертей по стране: <span
                        style={{textTransform: 'capitalize'}}>{regionHistory.info.name}</span>
                    </>
                }
                data={deaths as any}
                yKey="y"
                xKey="x"
                min={Math.ceil(Number(minDeaths) * 0.9)}
                max={Math.ceil(Number(maxDeaths) * 1.1)}
                color={badColor}
            />
        </div>
    )
}

export {RegionCharts};