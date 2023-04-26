import {VaccinationStructure} from "@/src/shared/api";
import {generateHumanDate} from "./generateHumanDate";

function getMaxDateFromVaccinationStructure(data: VaccinationStructure) {
    function reduce(maxRegionId: string, currentRegionId: string) {
        const maxDate = new Date(data[Number(maxRegionId)].date);
        const currentDate = new Date(data[Number(currentRegionId)].date);
        return maxDate > currentDate ? maxRegionId : currentRegionId;
    }

    const maxDateString = data[Number(Object.keys(data).reduce(reduce))].date;
    return generateHumanDate(new Date(maxDateString), ".");
}

export {getMaxDateFromVaccinationStructure};
