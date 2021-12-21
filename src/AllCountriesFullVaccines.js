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

function RenderCountriesFullVaccines(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    let max_vaccines = 0;
    let data = Object.keys(props.data).map(d => {
        if (constants.countriesRu.includes(props.data[d]['name_ru'])) {
            max_vaccines = props.data[d]['peop_full_vac'] > max_vaccines ? props.data[d]['peop_full_vac'] : max_vaccines;

            return {name: props.data[d]['name_ru'], 'полных вакцин сделано': props.data[d]['peop_full_vac']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className='DiagramContainer'>
            <h2>Количество людей, поставивших полную вакцину</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / constants.diagramWidth()}
                          height={window.innerHeight / constants.diagramHeight()}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                           domain={[0, max_vaccines + 10000000]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Bar dataKey='полных вакцин сделано' barSize={70}>
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={constants.goodColor} style={{opacity: 0.5}}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={constants.goodColor}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

export default RenderCountriesFullVaccines;