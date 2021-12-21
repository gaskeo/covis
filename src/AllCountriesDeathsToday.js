import {badColor, checkPage, diagramData, getMainData} from "./Constants";
import {MyBarChart} from "./BarChart";

function RenderCountriesDeathsToday(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    const [data, maxDeaths] = getMainData(props.data, 'deaths_delta', diagramData.deathsToday.label)

    return (
        <div className='DiagramContainer'>
            <h2>Смертей сегодня</h2>
            <div className='BarChartContainer'>
                <MyBarChart data={data} maxY={Math.ceil(maxDeaths * 1.1)} color={badColor} label={diagramData.deathsToday.label}/>
            </div>
        </div>
    )
}

export default RenderCountriesDeathsToday;