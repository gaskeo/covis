import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LineChart,
    Line,
} from 'recharts';
import {badColor, checkPage, diagramData, diagramHeight, diagramWidth, getRussiaData} from "./Constants";
import {MyLineChart} from "./LineChart";

function RenderRussiaDeathsHistory(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    const [deaths, minDeaths, maxDeaths] = getRussiaData(props.data, 'deaths', diagramData.deaths.label)
    return (
        <div className='DiagramContainer'>
            <h2>Случаи смертей по России за месяц</h2>
            <div className='BarChartContainer'>
                <MyLineChart data={deaths} label={diagramData.deaths.label} minValue={minDeaths} maxValue={maxDeaths} color={badColor}/>
            </div>
        </div>
    )
}

export default RenderRussiaDeathsHistory;