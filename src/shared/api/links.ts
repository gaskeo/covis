export function getRegionLink(region: number) {
    return `https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/${region}.json?`;
}

const getRussiaInfoLink = () =>
    'https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/225.json';

const getWorldInfoLink = () =>
    'https://milab.s3.yandex.net/2020/covid19-stat/data/v10/default_data.json';

export {getWorldInfoLink, getRussiaInfoLink};