import {Data} from "../../api";
import {Info, InfoFields} from "../../api";

function getChartDataFromData<T extends InfoFields>(
    data: Data,
    field: T,
    filter?: (info: Info) => boolean
    ): {chart: {x: string, y: Info[T]}[], max: Info[T]} {

    const chartData: {x: string, y: Info[T]}[] = [];

    const keys = Object.keys(data);
    let max = data[Number(keys[0])].info[field];
    Object.keys(data).map(code => {
        const info = data[Number(code)].info;
        if (filter && filter(info)) {
            max = max > info[field] ? max : info[field];
            chartData.push({
                x: info.name,
                y: info[field]
            })
        }
        return undefined;
    })
    return {chart: chartData, max};
}

export {getChartDataFromData};
