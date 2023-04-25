import {generateHumanDate} from "./generateHumanDate";

export function generateLast30Days(data: [number, number][], lastDate?: Date) {
    const date = lastDate ? lastDate : new Date();
    date.setDate(date.getDate() - 30)
    let [minValue, maxValue] = [10_000_000_000, 0]

    const convData = data.slice(data.length - 30).map(d => {
        const humanDate = generateHumanDate(date,".")

        date.setDate(date.getDate() + 1);

        maxValue = Math.max(d[1], maxValue);
        minValue = Math.min(d[1], minValue);

        return {x: humanDate, y: d[1]}
    })
    return {data: convData, min: minValue, max: maxValue}
}
