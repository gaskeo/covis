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

export const DataStates = {
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

export const checkPage = (id, activeId, data) => {
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
}

export const russia = 'Россия'