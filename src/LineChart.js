import {diagramHeight, diagramWidth} from "./Constants";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export const MyLineChart = (props) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart className='BarChart' width={window.innerWidth / diagramWidth()}
                       height={window.innerHeight / diagramHeight()}
                       data={props.data}>
                <Line type="monotone" dataKey={props.label} stroke={props.color} activeDot={{r: 12}}/>
                <CartesianGrid vertical={false} stroke="#ccc"/>
                <XAxis dataKey="name"/>
                <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                       domain={[props.minValue, props.maxValue]}/>
                <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
            </LineChart>
        </ResponsiveContainer>

    )
}