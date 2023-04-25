import BarChart, {BarChartProps} from "./barChart";
import React from "react";
import styles from "../styles/barChart.module.css"

interface BarChartContainerProps<T extends { [key: string | number]: string | number }>
    extends BarChartProps<T> {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
}


export default function BarChartContainer<T extends { [key: string]: string | number }>(
    {title, subtitle, ...props}: BarChartContainerProps<T>
) {
    if (!props.data || props.data.length  === 0) {
        return null;
    }

    return (
        <>
            <h2>{title}</h2>
            <h3 className={styles.subtitle}>{subtitle}</h3>
            <div>
                <BarChart {...props}/>
            </div>
        </>
    );
}
