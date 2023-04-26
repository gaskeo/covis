import {russia} from "@/src/shared/constants";
import {Bar, Cell, Tooltip as ReTooltip, XAxis, YAxis, BarChart as ReBarChart, ResponsiveContainer} from "recharts";
import Tooltip from "@/src/components/tooltip";
import {generateHumanNumber, numberShortener} from "@/src/shared/utils";
import React from "react";

export interface BarChartProps<D extends { [key: string | number]: string | number }> {
    data: D[];
    xKey: keyof D | string;
    yKey: keyof D | string;
    color: string;
    max: number;
    tooltipGenerator?: (barName: string) => React.ReactNode;
}

export default function BarChart<D extends { [a: string | number]: string | number }>(
    {data, xKey, yKey, color, max, tooltipGenerator}: BarChartProps<D>) {
    const isDesktop = window.innerWidth > 1023;

    function TooltipHandler(bar: string, y: number | string): React.ReactNode {
        if (tooltipGenerator) {
            return tooltipGenerator(bar);
        }
        return (
            <Tooltip title={bar} text={generateHumanNumber(Number(y))}/>
        )
    }

    return (
        <ResponsiveContainer width="100%" debounce={1} height={isDesktop ? 400 : 300}>
            <ReBarChart data={data}>
                <XAxis
                    dataKey={(d) => d[xKey]}
                    angle={-45}
                    interval={isDesktop ? 0 : undefined}
                    textAnchor="end"
                    height={100}
                />
                <YAxis
                    tickFormatter={(value) => numberShortener(value)}
                    width={isDesktop ? 44 : 0}
                    domain={[0, max]}
                />
                <ReTooltip
                    wrapperStyle={{outline: "none"}}
                    content={({label, payload, active}) =>
                        (payload && active && payload[0]?.value) && TooltipHandler(label, payload[0].value.toString())

                    }
                    formatter={(value) => new Intl.NumberFormat('en').format(Number(value))}
                />
                <Bar dataKey={(d) => d[yKey]} barSize={70}>
                    {data.map((d, index) =>
                        <Cell key={`cell-${index}`} fill={color}
                              radius={[5, 5, 0, 0] as unknown as string}
                              style={{
                                  opacity: (d.name === russia) ? 0.5 : 1,
                              }}/>
                    )}
                </Bar>
            </ReBarChart>
        </ResponsiveContainer>

    )
}