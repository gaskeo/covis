import {diagramHeight, diagramWidth} from "../../../Constants";
import {CartesianGrid, Line, LineChart as ReLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import styles from "./styles/lineChart.module.css";
import {numberShortener} from "../../../shared/utils/numberShortener";

export interface LineChartProps<D extends { [key: string | number]: string | number }> {
    data: D[];
    yKey: keyof D | string;
    xKey: keyof D | string;
    color: string;
    max: number;
    min: number;
}

export function LineChart<D extends { [a: string | number]: string }>(
    {data, yKey, xKey, color, max, min}: LineChartProps<D>
): JSX.Element {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ReLineChart className={styles.LineChart} width={window.innerWidth / diagramWidth()}
                         height={window.innerHeight / diagramHeight()}
                         data={data}>
                <Line type="monotone" dataKey={yKey as any} stroke={color} activeDot={{r: 12}}/>
                <CartesianGrid vertical={false} stroke="#ccc"/>
                <XAxis
                    dataKey={(x) => x[xKey].replaceAll("-", ".")}
                    angle={-45}
                    interval={1}
                    textAnchor="end"
                    height={80}
                />
                <YAxis
                    tickFormatter={(value) => numberShortener(value)}
                    width={80}
                    domain={[min, max]}
                />
                <Tooltip
                    wrapperStyle={{outline: "none"}}
                    content={({label, payload, active}) =>
                        (payload && active && payload.length) &&
                        <div className={styles.tooltip}>
                            <p>{label}</p>
                            <span>{new Intl.NumberFormat('en').format(Number(payload[0].value))}</span>
                        </div>
                    }
                    formatter={(value) => new Intl.NumberFormat('en').format(Number(value))}/>
            </ReLineChart>
        </ResponsiveContainer>

    )
}