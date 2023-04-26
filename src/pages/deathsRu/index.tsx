import {badColor} from "@/src/shared/constants";

import {useGlobalContext} from "@/src/shared/context";
import {RussiaActionType} from "@/src/shared/store";
import {LineChartContainer} from "@/src/components/charts";
import {generateHumanDate, generateLast30Days} from "@/src/shared/utils";

const DeathsRuPage = () => {
    const {russiaStates} = useGlobalContext();
    const russiaData = russiaStates[RussiaActionType.russiaCasesHistory]
    if (!russiaStates || !russiaData || !russiaData.cases) return <></>

    const {
        data,
        min,
        max
    } = generateLast30Days(russiaData.deaths, new Date(russiaData.info.date))
    const date = generateHumanDate(new Date(russiaData.info.date), ".")

    return (
        <LineChartContainer
            color={badColor}
            title="Погибло за месяц"
            subtitle={`Последние данные: ${date}`}
            xKey="x"
            yKey="y"
            min={min * 0.9}
            max={max * 1.1}
            data={data}/>
    )
}

export {DeathsRuPage};