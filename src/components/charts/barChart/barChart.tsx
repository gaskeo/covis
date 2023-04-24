import {diagramHeight, diagramWidth, russia} from "../../../Constants";
import {Bar, Cell, Tooltip, XAxis, YAxis, BarChart as ReBarChart, ResponsiveContainer} from "recharts";
import styles from "./styles/barChart.module.css";
import {number} from "prop-types";

export interface BarChartProps<D extends { [key: string | number]: string | number }> {
    data: D[];
    xKey: keyof D | string;
    yKey: keyof D | string;
    color: string;
    max: number;
}


export function BarChart<D extends { [a: string | number]: string | number }>(
    {data, xKey, yKey, color, max}: BarChartProps<D>) {
    const formatter = (value: number) => {
        if (value < 1000) {
            return value.toString();
        }
        if (value < 1_000_000) {
            return Math.ceil(value / 1000).toString() + 'k'
        }
        if (value < 1_000_000_000) {
            return Math.ceil(value / 1_000_000).toString() + 'kk'
        }
        return value.toString();
    }
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ReBarChart className='LineChart' width={window.innerWidth / diagramWidth()}
                        height={window.innerHeight / diagramHeight()}
                        data={data}>
                <XAxis
                    dataKey={(d) => d[xKey]}
                    angle={-45}
                    interval={0}
                    textAnchor="end"
                    height={80}
                />
                <YAxis
                    tickFormatter={(value) => formatter(value)}
                    width={80}
                    domain={[0, max]}
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
                    formatter={(value) => new Intl.NumberFormat('en').format(Number(value))}
                />
                <Bar dataKey={(d) => d[yKey]} barSize={70}>
                    {data.map((d, index) =>
                        <Cell key={`cell-${index}`} fill={color}
                              radius={[10, 10, 0, 0] as unknown as string}
                              className={styles.cell}
                              style={{
                                  opacity: (d.name === russia) ? 0.5 : 1,
                                  borderTopRightRadius: "5px !important",
                              }}/>
                    )}
                </Bar>
            </ReBarChart>
        </ResponsiveContainer>

    )
}