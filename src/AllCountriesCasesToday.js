import {checkPage, countriesRu, diagramData, badColor} from "./Constants";
import {MyBarChart} from "./BarChart";

function RenderCountriesCasesToday(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    let maxCases = 0;
    const data = Object.keys(props.data).map(d => {
        if (countriesRu.includes(props.data[d].info['name'])) {
            maxCases = Math.max(props.data[d].info['cases_delta'], maxCases);

            return {name: props.data[d].info['name'], [diagramData.casesToday.label]: props.data[d].info['cases_delta']}
        }
        return null;
    }).filter(a => a);
    data.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className='DiagramContainer'>
            <h2>Заболеваний сегодня</h2>
            <div className='BarChartContainer'>
                <MyBarChart data={data} maxY={maxCases + diagramData.casesToday.plusMaxValue} color={badColor} label={diagramData.casesToday.label}/>
            </div>
        </div>
    )
}

export default RenderCountriesCasesToday;