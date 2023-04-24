import {diagramHeight, diagramWidth, russia} from "../../../Constants";
import {Bar, Cell, Tooltip, XAxis, YAxis, BarChart as ReBarChart, ResponsiveContainer} from "recharts";
import {Tooltip as TooltipComponent} from "../../tooltip";
import styles from "./styles/barChart.module.css";
import {numberShortener} from "../../../shared/utils/numberShortener";

export interface BarChartProps<D extends { [key: string | number]: string | number }> {
    data: D[];
    xKey: keyof D | string;
    yKey: keyof D | string;
    color: string;
    max: number;
}


export function BarChart<D extends { [a: string | number]: string | number }>(
    {data, xKey, yKey, color, max}: BarChartProps<D>) {

    return (
        <ResponsiveContainer debounce={1}  height={400}>
            <ReBarChart className='LineChart' width={window.innerWidth / diagramWidth()}
                        height={window.innerHeight / diagramHeight()}
                        data={data}>
                <XAxis
                    dataKey={(d) => d[xKey]}
                    angle={-45}
                    interval={0}
                    textAnchor="end"
                    height={100}
                />
                <YAxis
                    tickFormatter={(value) => numberShortener(value)}
                    width={80}
                    domain={[0, max]}
                />
                <Tooltip
                    wrapperStyle={{outline: "none"}}
                    content={({label, payload, active}) =>
                        (payload && active && payload.length) &&
                        <TooltipComponent
                            title={label}
                            text={new Intl.NumberFormat('en').format(Number(payload[0].value))}
                        />
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