import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from 'recharts';

import constants from './Constants'

function RenderCountriesCases(props) {
    const id = 1;
    if (props.activeTab !== id) {
        return null;
    }
    let max_cases = 0;
    const data = Object.keys(props.data).map(d => {
        if (constants.countriesRu.includes(props.data[d].info['name'])) {
            max_cases = props.data[d].info['cases'] > max_cases ? props.data[d].info['cases'] : max_cases;
            return {
                name: props.data[d].info['name'],
                'случаев заболевания': props.data[d].info['cases']} // ключи на русском печально конечно,
            // но было мало времени...
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))
    return (
        <div className='DiagramContainer'>
            <h2>Всего заболеваний</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / constants.diagramWidth}
                          height={window.innerHeight / constants.diagramHeight}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                           domain={[0, data[0]['случаев заболевания'] + 45000000]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Bar dataKey='случаев заболевания' barSize={70}>
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

export default RenderCountriesCases;