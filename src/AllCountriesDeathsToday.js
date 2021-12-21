import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from 'recharts';

import * as constants from './Constants'
import {checkPage} from "./Constants";

function RenderCountriesDeathsToday(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    let max_deaths = 0;
    const data = Object.keys(props.data).map(d => {
        if (constants.countriesRu.includes(props.data[d].info['name'])) {
            max_deaths = props.data[d].info['deaths_delta'] > max_deaths ? props.data[d].info['deaths_delta'] : max_deaths;

            return {name: props.data[d].info['name'], 'случаев смертей сегодня': props.data[d].info['deaths_delta']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className='DiagramContainer'>
            <h2>Смертей сегодня</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / constants.diagramWidth()}
                          height={window.innerHeight / constants.diagramHeight()}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                           domain={[0, max_deaths + 100]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Bar dataKey='случаев смертей сегодня' barSize={70}>
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={constants.badColor} style={{opacity: 0.5}}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={constants.badColor}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

export default RenderCountriesDeathsToday;