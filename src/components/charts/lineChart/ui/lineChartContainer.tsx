import LineChart, {LineChartProps} from "./lineChart";
import React from "react";

interface LineChartContainerProps<T extends { [key: string | number]: string | number }>
    extends LineChartProps<T> {
    title: React.ReactNode;
}


export default function LineChartContainer<T extends { [key: string]: string | number }>(
    {title, ...props}: LineChartContainerProps<T>
) {
    if (!props.data || props.data.length === 0) {
        return null;
    }

    return (
        <>
            <h2>{title}</h2>
            <div className='barChartContainer'>
                <LineChart<T> {...props}/>
            </div>
        </>
    )
}
