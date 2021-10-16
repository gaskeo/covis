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

function RenderCountriesDeathsToday(props) {
    const id = 4;
    if (props.activeTab !== id) {
        return null;
    }
    let max_deaths = 0;
    const data = Object.keys(props.Data).map(d => {
        if (countriesRu.includes(props.Data[d].info['name'])) {
            max_deaths = props.Data[d].info['deaths_delta'] > max_deaths ? props.Data[d].info['deaths_delta'] : max_deaths;

            return {name: props.Data[d].info['name'], 'случаев смертей сегодня': props.Data[d].info['deaths_delta']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className='DiagramContainer'>
            <h2>Смертей сегодня</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / diagramWidth}
                          height={window.innerHeight / diagramHeight}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                           domain={[0, max_deaths + 100]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Bar dataKey='случаев смертей сегодня' barSize={70}>
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

export default RenderCountriesDeathsToday;