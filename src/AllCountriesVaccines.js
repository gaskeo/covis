import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from 'recharts';

const goodColor = '#00F067';

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

function RenderCountriesVaccines(props) {
    const id = 12;
    if (props.activeTab !== id) {
        return null;
    }

    let max_vaccines = 0;
    let data = Object.keys(props.Data).map(d => {
        if (countriesRu.includes(props.Data[d]['name_ru'])) {
            max_vaccines = props.Data[d]['vac'] > max_vaccines ? props.Data[d]['vac'] : max_vaccines;

            return {name: props.Data[d]['name_ru'], 'вакцин сделано': props.Data[d]['vac']}
        }
        return null;
    }).filter(a => a);

    data.sort((a, b) => a.name.localeCompare(b.name))

    return (
        <div className='DiagramContainer'>
            <h2>Вакцин сделано</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / diagramWidth}
                          height={window.innerHeight / diagramHeight}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                           domain={[0, max_vaccines + 10000000]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Bar dataKey='вакцин сделано' barSize={70}>
                        {
                            data.map((d, index) => {
                                    if (d.name === 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={goodColor} style={{opacity: 0.5}}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={goodColor}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
}

export default RenderCountriesVaccines;