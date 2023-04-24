import BarChart, {BarChartProps} from "./barChart";
import React from "react";

interface BarChartContainerProps<T extends { [key: string | number]: string | number }>
    extends BarChartProps<T> {
    title: React.ReactNode;
}


export default function BarChartContainer<T extends { [key: string]: string | number }>(
    {title, ...props}: BarChartContainerProps<T>
) {
    if (!props.data || props.data.length  === 0) {
        return null;
    }

    return (
        <>
            <h2>{title}</h2>
            <div>
                <BarChart {...props}/>
            </div>
        </>
    );
}
