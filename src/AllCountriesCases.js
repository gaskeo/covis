import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from 'recharts';

const badColor = '#CD5C5C'

let diagramWidth;
let diagramHeight;

if (window.innerWidth >= 800) {
    diagramWidth = 1.4;
    diagramHeight = 1.6;
} else {
    diagramWidth = 1.1;
    diagramHeight = 2.4;
}

const countriesRu = [
    'США', 'Индия', 'Бразилия', 'Великобритания', 'Россия', 'Турция', 'Франция', 'Иран', 'Аргентина',
    'Испания', 'Колумбия', 'Италия', 'Германия', 'Индонезия', 'Мексика', 'Польша', 'ЮАР', 'Филиппины', 'Украина'
]

function RenderCountriesCases(props) {
    const id = 1;
    if (props.activeTab !== id) {
        return null;
    }
    let max_cases = 0;
    const data = Object.keys(props.Data).map(d => {
        if (countriesRu.includes(props.Data[d].info['name'])) {
            max_cases = props.Data[d].info['cases'] > max_cases ? props.Data[d].info['cases'] : max_cases;
            return {name: props.Data[d].info['name'], 'случаев заболевания': props.Data[d].info['cases']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))
    return (
        <div className='DiagramContainer'>
            <h2>Всего заболеваний</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / diagramWidth}
                          height={window.innerHeight / diagramHeight}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                           domain={[0, data[0]['случаев заболевания'] + 45000000]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Bar dataKey='случаев заболевания' barSize={70}>
                        {
                            data.map((d, index) => {

                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={badColor} style={{opacity: 0.5}}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={badColor}/>
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