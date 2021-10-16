import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LineChart,
    Line,
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

function RenderRussiaCasesHistory(props) {
    const id = 6;
    if (props.activeTab !== id) {
        return null;
    }
    let date = new Date()
    date.setDate(date.getDate() - 30)
    let min_cases = 10000000000000000;
    let max_cases = 0;

    const cases = Object.keys(props.Data['cases']).slice(Object.keys(props.Data['cases']).length - 30).map(d => {
        console.log(1)
        let day = (date.getDate()).toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getFullYear()
        date.setDate(date.getDate() + 1)
        max_cases = props.Data['cases'][d][1] > max_cases ? props.Data['cases'][d][1] : max_cases;
        min_cases = props.Data['cases'][d][1] < min_cases ? props.Data['cases'][d][1] : min_cases;

        return {name: `${day}-${month}-${year}`, 'заболеваний на данный день': props.Data['cases'][d][1]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Заболеваний за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                           height={window.innerHeight / diagramHeight}
                           data={cases}>
                    <Line type="monotone" dataKey="заболеваний на данный день" stroke={badColor} activeDot={{r: 12}}/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                           domain={[min_cases - 1000, max_cases + 1000]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                </LineChart>
            </div>
        </div>
    )
}

export default RenderRussiaCasesHistory;