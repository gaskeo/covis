import {badColor} from "../../constants";

import {useGlobalContext} from "../../shared/context";
import {RussiaActionType} from "../../shared/store";
import {LineChartContainer} from "../../components/charts/lineChart/lineChartContainer";
import {generateLast30Days} from "../../shared/utils/statGenerator";

const CasesRuPage = () => {
    const {russiaStates} = useGlobalContext();
    const russiaData = russiaStates[RussiaActionType.russiaCasesHistory]
    if (!russiaStates || !russiaData || !russiaData.cases) return <></>

    const {
        data,
        min,
        max
        } = generateLast30Days(russiaData.cases)

    return (
        <LineChartContainer
            color={badColor}
            title='Заболеваний за месяц'
            xKey="x"
            yKey="y"
            min={min * 0.9}
            max={max * 1.1}
            data={data}/>
    )
}

export {CasesRuPage};