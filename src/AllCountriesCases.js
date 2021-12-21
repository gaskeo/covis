import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from 'recharts';

import {diagramWidth, diagramHeight, countriesRu, badColor, checkPage, diagramData, russia} from './Constants';

function RenderCountriesCases(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    // preparing data
    let max_cases = 0;
    const data = Object.keys(props.data).map(d => {
        if (countriesRu.includes(props.data[d].info['name'])) {
            max_cases = props.data[d].info['cases'] > max_cases ? props.data[d].info['cases'] : max_cases;
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
                <BarChart className='BarChart' width={window.innerWidth / diagramWidth()}
                          height={window.innerHeight / diagramHeight()}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                           domain={[0, max_cases + diagramData.cases.plusMaxValue]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    <Bar dataKey={diagramData.cases.label} barSize={70}>
                        {data.map((d, index) => (d.name === russia) ?
                            <Cell key={`cell-${index}`} fill={badColor} style={{opacity: 0.5}}/> :
                            <Cell key={`cell-${index}`} fill={badColor}/>
                        )}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
}

export default RenderCountriesCases;