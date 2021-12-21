import {checkPage, diagramData, getMainData, badColor} from "./Constants";
import {MyBarChart} from "./BarChart";

function RenderCountriesDeaths(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    const [data, maxDeaths] = getMainData(props.data, 'deaths', diagramData.deaths.label)

    return (
        <div className='DiagramContainer'>
            <h2>Всего смертей</h2>
            <div className='BarChartContainer'>
                <MyBarChart data={data} maxY={Math.ceil(maxDeaths * 1.1)} color={badColor} label={diagramData.deaths.label}/>
            </div>
        </div>
    )
}

export default RenderCountriesDeaths