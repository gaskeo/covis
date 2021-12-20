import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from 'recharts';

import * as constants from './Constants'

function RenderCountriesCasesToday(props) {
    const id = 2;
    if (props.activeTab !== id) {
        return null;
    }

    let max_cases = 0;
    const data = Object.keys(props.data).map(d => {
        if (constants.countriesRu.includes(props.data[d].info['name'])) {
            max_cases = props.data[d].info['cases_delta'] > max_cases ? props.data[d].info['cases_delta'] : max_cases;

            return {name: props.data[d].info['name'], 'случаев заболевания сегодня': props.data[d].info['cases_delta']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className='DiagramContainer'>
            <h2>Заболеваний сегодня</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / constants.diagramWidth()}
                          height={window.innerHeight / constants.diagramHeight()}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                           domain={[0, max_cases + 1000]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Bar dataKey='случаев заболевания сегодня' barSize={70}>
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

export default RenderCountriesCasesToday;