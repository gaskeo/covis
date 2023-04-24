import {CartesianGrid, Line, LineChart as ReLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Tooltip as TooltipComponent} from "../../tooltip";
import {numberShortener} from "../../../shared/utils/numberShortener";

export interface LineChartProps<D extends { [key: string | number]: string | number }> {
    data: D[];
    yKey: keyof D | string;
    xKey: keyof D | string;
    color: string;
    max: number;
    min: number;
}

export function LineChart<D extends { [a: string | number]: string | number }>(
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
                <Tooltip
                    wrapperStyle={{outline: "none"}}
                    content={({label, payload, active}) =>
                        (payload && active && payload.length) &&
                        <TooltipComponent
                            title={label}
                            text={new Intl.NumberFormat('en').format(Number(payload[0].value))}
                        />
                    }
                    formatter={(value) => new Intl.NumberFormat('en').format(Number(value))}/>
            </ReLineChart>
        </ResponsiveContainer>

    )
}