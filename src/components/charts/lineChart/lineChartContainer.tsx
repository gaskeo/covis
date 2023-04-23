import {LineChart, LineChartProps} from "./lineChart";
import React from "react";

interface LineChartContainerProps<T extends { [key: string | number]: string | number }>
    extends LineChartProps<T> {
    title: React.ReactNode;
}


export function LineChartContainer<T extends { [key: string]: string }>(
    {title, ...props}: LineChartContainerProps<T>
) {
    if (!props.data || props.data.length === 0) {
        return null;
    }

    return (
        <div className='DiagramContainer'>
            <h2>{title}</h2>
            <div className='BarChartContainer'>
                <LineChart<T> {...props}/>
            </div>
        </div>
    )
}
