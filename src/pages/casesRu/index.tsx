import {badColor} from "../../shared/constants";

import {useGlobalContext} from "../../shared/context";
import {RussiaActionType} from "../../shared/store";
import {LineChartContainer} from "../../components/charts";
import {generateHumanDate, generateLast30Days} from "../../shared/utils";

const CasesRuPage = () => {
    const {russiaStates} = useGlobalContext();
    const russiaData = russiaStates[RussiaActionType.russiaCasesHistory]
    if (!russiaStates || !russiaData || !russiaData.cases) return <></>

    const {
        data,
        min,
        max
        } = generateLast30Days(russiaData.cases, new Date(russiaData.info.date))
    const date = generateHumanDate(new Date(russiaData.info.date), ".")

    return (
        <LineChartContainer
            color={badColor}
            title='Заболеваний за месяц'
            subtitle={`Последние данные: ${date}`}
            xKey="x"
            yKey="y"
            min={min * 0.9}
            max={max * 1.1}
            data={data}/>
    )
}

export {CasesRuPage};