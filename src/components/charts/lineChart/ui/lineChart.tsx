import {CartesianGrid, Line, LineChart as ReLineChart, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis} from "recharts";
import Tooltip from "@/src/components/tooltip";
import {numberShortener} from "@/src/shared/utils";

export interface LineChartProps<D extends { [key: string | number]: string | number }> {
    data: D[];
    yKey: keyof D | string;
    xKey: keyof D | string;
    color: string;
    max: number;
    min: number;
}

export default function LineChart<D extends { [a: string | number]: string | number }>(
    {data, yKey, xKey, color, max, min}: LineChartProps<D>): JSX.Element {
    const isDesktop = window.innerWidth > 1023;

    return (
        <ResponsiveContainer width="100%" height={isDesktop? 400 : 300} debounce={1}>
            <ReLineChart data={data}>
                <Line type="monotone" dataKey={yKey as any} stroke={color} activeDot={{r: 12}}/>
                <CartesianGrid vertical={false} stroke="#ccc"/>
                <XAxis
                    dataKey={(x) => x[xKey].replaceAll("-", ".")}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                />
                <YAxis
                    tickFormatter={(value) => numberShortener(value)}
                    width={isDesktop ? 48 : 0}
                    domain={[min, max]}
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
                    formatter={(value) => new Intl.NumberFormat('en').format(Number(value))}/>
            </ReLineChart>
        </ResponsiveContainer>

    )
}