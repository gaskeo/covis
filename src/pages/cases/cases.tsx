import {badColor, diagramData} from "../../Constants";
import {getMainData} from "../../shared/utils/getters";

import {BarChartContainer} from "../../components/charts/barChart/barChartContainer";
import {useGlobalContext} from "../../shared/context";

const CasesPage = () => {
    const {worldStates} = useGlobalContext();
    console.log(worldStates, 1341)
    if (!worldStates) return <>333</>

    if (!worldStates?.allCountriesData) {
        return <>123</>
    }
    const {data, maxValue} =
        getMainData(worldStates.allCountriesData, "cases", diagramData.cases.label);
    return (
        <BarChartContainer
            key={1}
            color={badColor}
            title='Всего заболеваний'
            xKey="name"
            yKey={diagramData.cases.label}
            max={maxValue}
            data={data}/>
    )
}

export {CasesPage};