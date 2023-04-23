import {diagramHeight, diagramWidth, russia} from "./Constants";
import {Bar, Cell, Tooltip, XAxis, YAxis, BarChart, ResponsiveContainer} from "recharts";

export const MyBarChart = (props) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
        <BarChart className='LineChart' width={window.innerWidth / diagramWidth()}
                  height={window.innerHeight / diagramHeight()}
                  data={props.data}>
            <XAxis dataKey="name"/>
            <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                   domain={[0, props.maxY]}/>
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
            <Bar dataKey={props.label} barSize={70}>
                {props.data.map((d, index) =>
                    <Cell key={`cell-${index}`} fill={props.color} style={{opacity: (d.name === russia) ? 0.5 : 1}}/>
                )}
            </Bar>
        </BarChart>
        </ResponsiveContainer>

    )
}