import {VaccinationStructure} from "@/src/shared/api";
import {Vaccination, VaccinationFields} from "@/src/shared/api";

function getChartDataFromVaccinationStructure<T extends VaccinationFields>(
    data: VaccinationStructure,
    field: T,
    filter?: (info: Vaccination) => boolean
) {
    const chartData: { x: string, y: Vaccination[T] }[] = [];
    const keys = Object.keys(data);
    let max = data[Number(keys[0])][field];
    keys.map((region) => {
        const vaccines = data[Number(region)];
        if (filter && filter(vaccines)) {
            max = max > vaccines[field] ? max : vaccines[field];
            chartData.push({
                x: data[Number(region)].nameRu,
                y: vaccines[field]
            });
        }
        return undefined;
    })
    return {chart: chartData, max};
}

export {getChartDataFromVaccinationStructure};
