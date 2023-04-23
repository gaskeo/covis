import {diagramHeight, diagramWidth, russia} from "../../../Constants";
import {Bar, Cell, Tooltip, XAxis, YAxis, BarChart as ReBarChart, ResponsiveContainer} from "recharts";

interface BarChartProps<D extends { [key: string | number]: string | number }> {
    data: D[];
    xKey: keyof D | string;
    color: string;
    max: number;
}


export function BarChart<D extends { [a: string | number]: string }>(
    {data, xKey, color, max}: BarChartProps<D>) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ReBarChart className='LineChart' width={window.innerWidth / diagramWidth()}
                        height={window.innerHeight / diagramHeight()}
                        data={data}>
                <XAxis dataKey="name"/>
                <YAxis
                    tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
                    width={80}
                    domain={[0, max]}
                />
                <Tooltip
                    formatter={(value) => new Intl.NumberFormat('en').format(Number(value))}
                />
                <Bar dataKey={(d) => d[xKey]} barSize={70}>
                    {data.map((d, index) =>
                        <Cell key={`cell-${index}`} fill={color}
                              style={{opacity: (d.name === russia) ? 0.5 : 1}}/>
                    )}
                </Bar>
            </ReBarChart>
        </ResponsiveContainer>

    )
}