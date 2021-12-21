import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LineChart,
    Line,
} from 'recharts';
import {badColor, checkPage, diagramHeight, diagramWidth} from "./Constants";

function RenderRussiaDeathsHistory(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    let date = new Date()
    date.setDate(date.getDate() - 30)

    let min_cases = 1000000000;
    let max_cases = 0;
    const cases = Object.keys(props.data['deaths']).slice(Object.keys(props.data['deaths']).length - 30).map(d => {
        let day = (date.getDate()).toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getFullYear()
        date.setDate(date.getDate() + 1)
        max_cases = props.data['deaths'][d][1] > max_cases ? props.data['deaths'][d][1] : max_cases;
        min_cases = props.data['deaths'][d][1] < min_cases ? props.data['deaths'][d][1] : min_cases;
        return {name: `${day}-${month}-${year}`, 'смертей на данный день': props.data['deaths'][d][1]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Случаи смертей по России за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / diagramWidth()}
                           height={window.innerHeight / diagramHeight()}
                           data={cases}>
                    <Line type="monotone" dataKey="смертей на данный день" stroke={badColor} activeDot={{r: 12}}/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
                           domain={[min_cases - 100, max_cases + 100]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                </LineChart>
            </div>
        </div>
    )
}

export default RenderRussiaDeathsHistory;