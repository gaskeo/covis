import {Data, Info} from "./shared/api";

export const goodColor = '#00F067';
export const badColor = '#CD5C5C'


export const diagramWidth = () => {
    if (window.innerWidth >= 800) {
        return 1.4
    }
    return 1.1
}

export const diagramHeight = () => {
    if (window.innerWidth >= 800) {
        return 1.6
    }
    return 2.4
}

export const dataStates = {
    notRequested: 0,
    requested: 1,
    received: 2
}

export const countriesRu = [
    'США', 'Индия', 'Бразилия', 'Великобритания', 'Россия', 'Турция', 'Франция', 'Иран', 'Аргентина',
    'Испания', 'Колумбия', 'Италия', 'Германия', 'Индонезия', 'Мексика', 'Польша', 'ЮАР', 'Филиппины', 'Украина'
]

export const worldStatLink = 'https://milab.s3.yandex.net/2020/covid19-stat/data/v10/default_data.json'
export const russiaCasesLink = 'https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/225.json'

export function generateLinkByRegId(regIndex) {
    return `https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/${regIndex}.json?`;
}

export function checkPage(id, activeId, data) {
    if (activeId !== id) {
        return null;
    }
    if (data === null || data.length < 1) {
        return <div>загрузка...</div>;
    }
    return true;
}

export const diagramData = {
    cases: {label: 'случаев заболевания', plusMaxValue: 4_500_000},
    casesToday: {label: 'случаев заболевания сегодня', plusMaxValue: 1_000},
    deaths: {label: 'случаев смертей', plusMaxValue: 10_000},
    deathsToday: {label: 'случаев смертей сегодня', plusMaxValue: 100},
    vaccines: {label: 'вакцин сделано', plusMaxValue: 10_000_000},
    vaccinesFull: {label: 'полных вакцин сделано', plusMaxValue: 10_000_000},
}

export const russia = 'Россия'

export function getVaccineData(data, field, label) {
    let maxValue = 0;
    const convData = Object.keys(data).map(d => {
        if (countriesRu.includes(data[d]['name_ru'])) {
            maxValue = Math.max(data[d][field], maxValue);

            return {name: data[d]['name_ru'], [label]: data[d][field]}
        }
        return null;
    }).filter(a => a);

    convData.sort((a, b) => a.name.localeCompare(b.name));
    return [convData, maxValue];
}

export function getRegionData(data, field, label) {
    const date = new Date()
    date.setDate(date.getDate() - 30)
    let [minValue, maxValue] = [10_000_000_000, 0]

    const convData = Object.keys(data[field]).slice(Object.keys(data[field]).length - 30).map(d => {
        let day = (date.getDate()).toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getFullYear();

        date.setDate(date.getDate() + 1);

        maxValue = Math.max(data[field][d][1], maxValue);
        minValue = Math.min(data[field][d][1], minValue);

        return {name: `${day}-${month}-${year}`, [label]: data[field][d][1]}
    })
    return [convData, minValue, maxValue]
}

export function getElemsByStart(e, names) {
    const value = e.target.value
    const suggestions = names.map(r => {
        if (r.toLowerCase().startsWith(e.target.value.toLowerCase())) {
            return r
        }
        return null
    }).filter(a => a)

    return [value, suggestions, !!(names.includes(e.target.value.toLowerCase()))]
}

export function getRegionByName(data, regionName) {
    const reg = regionName.toLowerCase()
    for (let i in Object.entries(data)) {
        if (data[i].name.toLowerCase() === reg) {
            return data[i].code;
        }
    }
    return -1;
}

export function getRussianInfo(data) {
    return Object.keys(data).map(d => {
        if (data[d]['info']['name'] === "Россия" || data[d]['info']['name'] === "Москва") {
            return null;
        }
        return data[d]['info']
    }).filter(a => a);
}

export const ticketMargin = 10;

export function cssMapGenerator(data, color) {
    let cssNames = ['polygon', 'g', 'path', 'polyline']
    return data.map((d, index) => {
        let name = d.name
        let opacity = Math.max(d.cases / d['population'] * 6, 0.05);
        let preparedColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
        let cssText = cssNames.map(n => `${n}[data-name="${name}"] {fill: ${preparedColor}}`).join(' ')

        return <style key={index} type='text/css'>{cssText}</style>
    })
}

export function getFieldByName(data, name, field) {
    for (let d of data) {
        if (d.name === name) {
            return d[field];
        }
    }
    return 0;
}