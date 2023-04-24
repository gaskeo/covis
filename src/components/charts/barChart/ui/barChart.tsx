import {russia} from "../../../../shared/constants";
import {Bar, Cell, Tooltip as ReTooltip, XAxis, YAxis, BarChart as ReBarChart, ResponsiveContainer} from "recharts";
import Tooltip from "../../../tooltip";
import {numberShortener} from "../../../../shared/utils/numberShortener";

export interface BarChartProps<D extends { [key: string | number]: string | number }> {
    data: D[];
    xKey: keyof D | string;
    yKey: keyof D | string;
    color: string;
    max: number;
}

export default function BarChart<D extends { [a: string | number]: string | number }>(
    {data, xKey, yKey, color, max}: BarChartProps<D>) {
    const isDesktop = window.innerWidth > 1023;

    return (
        <ResponsiveContainer width="100%" debounce={1} height={isDesktop ? 400 : 300}>
            <ReBarChart data={data}>
                <XAxis
                    dataKey={(d) => d[xKey]}
                    angle={-45}
                    interval={isDesktop ? 0 : 1}
                    textAnchor="end"
                    height={100}
                />
                <YAxis
                    tickFormatter={(value) => numberShortener(value)}
                    width={44}
                    domain={[0, max]}
                />
                <ReTooltip
                    wrapperStyle={{outline: "none"}}
                    content={({label, payload, active}) =>
                        (payload && active && payload.length) &&
                        <Tooltip
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
                              style={{
                                  opacity: (d.name === russia) ? 0.5 : 1,
                              }}/>
                    )}
                </Bar>
            </ReBarChart>
        </ResponsiveContainer>

    )
}