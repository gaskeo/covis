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
