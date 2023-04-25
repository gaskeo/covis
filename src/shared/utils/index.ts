import {dataTypeToMapType} from "./utils/dataTypeToMapType";
import {getRegionCodeByName} from "./utils/getters";
import {numberShortener} from "./utils/numberShortener";
import {getTicketPos} from "./utils/position";
import {generateLast30Days} from "./utils/statGenerator";
import {generateHumanDate} from "./utils/generateHumanDate";
import {generateHumanNumber} from "./utils/generateHumanNumber";
import {getMaxDateFromData} from "./utils/getMaxDateFromData";
import {getNameToCodeRegionMapFromRegionIds} from "./utils/getNameToCodeRegionMapFromRegionIds";
import {getChartDataFromData} from "./utils/getChartDataFromData";
import {getChartDataFromVaccinationStructure} from "./utils/getChartDataFromVaccinationStructure";
import {getMaxDateFromVaccinationStructure} from "./utils/getMaxDateFromVaccinationStructure";

export {
    generateHumanNumber,
    dataTypeToMapType,
    generateLast30Days,
    getTicketPos,
    getRegionCodeByName,
    numberShortener,
    generateHumanDate,
    getMaxDateFromData,
    getNameToCodeRegionMapFromRegionIds,
    getChartDataFromData,
    getChartDataFromVaccinationStructure,
    getMaxDateFromVaccinationStructure
};
