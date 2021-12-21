import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from 'recharts';

import {diagramWidth, diagramHeight, countriesRu, badColor, checkPage, diagramData, russia} from './Constants';
import {MyBarChart} from "./BarChart";

function RenderCountriesCases(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    // preparing data
    let maxCases = 0;
    const data = Object.keys(props.data).map(d => {
        if (countriesRu.includes(props.data[d].info['name'])) {
            maxCases = Math.max(props.data[d].info['cases'], maxCases);

            return {
                name: props.data[d].info['name'],
                [diagramData.cases.label]: props.data[d].info['cases']
            };
        }
        return null;
    }).filter(a => a);
    data.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className='DiagramContainer'>
            <h2>Всего заболеваний</h2>
            <div className='BarChartContainer'>
                <MyBarChart data={data} maxY={maxCases + diagramData.cases.plusMaxValue} color={badColor} label={diagramData.cases.label}/>
            </div>
        </div>
    );
}

export default RenderCountriesCases;