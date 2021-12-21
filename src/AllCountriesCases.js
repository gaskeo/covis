import {badColor, checkPage, diagramData, getMainData} from './Constants';
import {MyBarChart} from "./BarChart";

function RenderCountriesCases(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    const [data, maxCases] = getMainData(props.data, 'cases', diagramData.cases.label)

    return (
        <div className='DiagramContainer'>
            <h2>Всего заболеваний</h2>
            <div className='BarChartContainer'>
                <MyBarChart data={data} maxY={Math.ceil(maxCases * 1.1)} color={badColor} label={diagramData.cases.label}/>
            </div>
        </div>
    );
}

export default RenderCountriesCases;