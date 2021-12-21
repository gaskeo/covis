import {checkPage, diagramData, badColor, getMainData} from "./Constants";
import {MyBarChart} from "./BarChart";

function RenderCountriesCasesToday(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    const [data, maxCases] = getMainData(props.data, 'cases_delta', diagramData.casesToday.label)

    return (
        <div className='DiagramContainer'>
            <h2>Заболеваний сегодня</h2>
            <div className='BarChartContainer'>
                <MyBarChart data={data} maxY={Math.ceil(maxCases * 1.1)} color={badColor} label={diagramData.casesToday.label}/>
            </div>
        </div>
    )
}

export default RenderCountriesCasesToday;