import LineChart, {LineChartProps} from "./lineChart";
import React from "react";
import styles from "../styles/lineChart.module.css";

interface LineChartContainerProps<T extends { [key: string | number]: string | number }>
    extends LineChartProps<T> {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
}


export default function LineChartContainer<T extends { [key: string]: string | number }>(
    {title, subtitle, ...props}: LineChartContainerProps<T>
) {
    if (!props.data || props.data.length === 0) {
        return null;
    }

    return (
        <>
            <h2>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <div className='barChartContainer'>
                <LineChart<T> {...props}/>
            </div>
        </>
    )
}
