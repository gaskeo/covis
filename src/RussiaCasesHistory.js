import {badColor, checkPage, diagramData, getRussiaData} from "./Constants";
import {MyLineChart} from "./LineChart";

function RenderRussiaCasesHistory(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    const [cases, minCases, maxCases] = getRussiaData(props.data, 'cases', diagramData.cases.label)
    return (
        <div className='DiagramContainer'>
            <h2>Заболеваний за месяц</h2>
            <div className='BarChartContainer'>
                <MyLineChart data={cases}
                             label={diagramData.cases.label}
                             minValue={Math.ceil(minCases * 0.9)} maxValue={Math.ceil(maxCases * 1.1)} color={badColor}/>
            </div>
        </div>
    )
}

export default RenderRussiaCasesHistory;