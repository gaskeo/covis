import {generateHumanDate} from "./generateHumanDate";
import {Data} from "../../api";

function getMaxDateFromData(data: Data) {
    function reduce(maxRegionId: string, currentRegionId: string) {
        const maxDate = new Date(data[Number(maxRegionId)].info.date);
        const currentDate = new Date(data[Number(currentRegionId)].info.date);
        return maxDate > currentDate ? maxRegionId : currentRegionId;
    }

    const maxDateString = data[Number(Object.keys(data).reduce(reduce))].info.date;
    return generateHumanDate(new Date(maxDateString), ".");
}

export {getMaxDateFromData};
