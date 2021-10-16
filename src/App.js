import {useState} from 'react';

import RenderCountriesCases from './AllCountriesCases'
import RenderCountriesCasesToday from './AllCountriesCasesToday'
import RenderCountriesDeaths from './AllCountriesDeaths'
import RenderCountriesDeathsToday from './AllCountriesDeathsToday'
import RenderCountriesVaccines from './AllCountriesVaccines'
import RenderCountriesFullVaccines from './AllCountriesFullVaccines'

import './App.css';
import RussiaSVG from './Russia'
import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LineChart,
    Line,
} from 'recharts';

// все плохо по архитектуре конечно, но 3 дня всего было...

const goodColor = '#00F067';
const badColor = '#CD5C5C'

let diagramWidth;
let diagramHeight;

if (window.innerWidth >= 800) {
    diagramWidth = 1.4;
    diagramHeight = 1.6;
} else {
    diagramWidth = 1.1;
    diagramHeight = 2.4;
}
const dataStates = {
    notRequested: 0,
    requested: 1,
    received: 2
}
const countriesRu = [
    'США', 'Индия', 'Бразилия', 'Великобритания', 'Россия', 'Турция', 'Франция', 'Иран', 'Аргентина',
    'Испания', 'Колумбия', 'Италия', 'Германия', 'Индонезия', 'Мексика', 'Польша', 'ЮАР', 'Филиппины', 'Украина'
]

// countries

function RenderCountry(props) {
    function findRegionByStart(e) {
        updateRegion(e.target.value)

        updateSuggestions(names.map(r => {
            if (r.toLowerCase().startsWith(e.target.value.toLowerCase())) {
                return r
            }
            return null
        }).filter(a => a))

        if (names.includes(e.target.value.toLowerCase())) {
            return updateComplete(true)
        }
        return updateComplete(false)
    }

    async function searchRegion(reg) {
        if (dataState === dataStates.requested) {
            return
        }
        updateDataState(dataStates.requested)
        let index = 1;
        for (let i in Object.entries(props.Data)) {
            if (props.Data[i].name.toLowerCase() === reg.toLowerCase()) {
                index = props.Data[i].code;
                break;
            }
        }
        return fetch(`https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/${index}.json?`, {method: 'get'}).then((r) => {
            r.json().then(j => {
                updateData(j)
                updateFoundRegion(reg)
                updateDataState(dataStates.received)
            })
        })
    }

    let names = props.Data.map(d => d.name.toLowerCase())
    names.sort((a, b) => a.localeCompare(b))

    let [complete, updateComplete] = useState(false);
    let [region, updateRegion] = useState('');
    let [data, updateData] = useState(null);
    let [dataState, updateDataState] = useState(dataStates.notRequested)
    let [isSearch, updateIsSearch] = useState(0);
    let [suggestions, updateSuggestions] = useState(names);
    let [foundRegion, updateFoundRegion] = useState('');
    const id = 14
    if (props.activeTab !== id) {
        return null;
    }
    let mainData = null;
    if (dataState === dataStates.requested) {
        mainData = <div>loading...</div>
    }
    if (dataState === dataStates.received) {
        let date = new Date(Date.now() - 30 * 3600 * 1000)

        let max_cases = 0;
        let min_cases = 10000000000000000;
        let cases = data['cases'].slice(data['cases'].length - 32).map(d => {
            date.setDate(date.getDate() + 1)
            let day = (date.getDate()).toString().padStart(2, '0')
            let month = (date.getMonth()).toString().padStart(2, '0')
            let year = date.getFullYear()
            max_cases = d[0] > max_cases ? d[0] : max_cases;
            min_cases = d[0] < min_cases ? d[0] : min_cases;

            return {
                name: `${day}-${month}-${year}`, 'заболеваний на данный день': d[0]
            }
        })

        date = new Date(Date.now() - 30 * 3600 * 1000)

        let max_deaths = 0;
        let min_deaths = 1000000000000000000;
        let deaths = data['deaths'].slice(data['deaths'].length - 32).map(d => {
            date.setDate(date.getDate() + 1)
            let day = (date.getDate()).toString().padStart(2, '0')
            let month = (date.getMonth()).toString().padStart(2, '0')
            let year = date.getFullYear()
            max_deaths = d[0] > max_deaths ? d[0] : max_deaths;
            min_deaths = d[0] < min_deaths ? d[0] : min_deaths;

            return {
                name: `${day}-${month}-${year}`, 'смертей на данный день': d[0]
            }
        })
        mainData = <div>
            <div className='DiagramContainer'>
                <h2>Случаи заболевания по стране: <span style={{textTransform: 'capitalize'}}>{foundRegion}</span></h2>
                <div className='BarChartContainer'>
                    <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                               height={window.innerHeight / diagramHeight}
                               data={cases}>
                        <Line type="monotone" dataKey="заболеваний на данный день" stroke={badColor}
                              activeDot={{r: 12}}/>
                        <CartesianGrid vertical={false} stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                               domain={[min_cases - 100, max_cases + 100]}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    </LineChart>
                </div>
            </div>
            <div className='DiagramContainer'>
                <h2>Случаи смертей по стране: <span style={{textTransform: 'capitalize'}}>{foundRegion}</span></h2>
                <div className='BarChartContainer'>
                    <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                               height={window.innerHeight / diagramHeight}
                               data={deaths}>
                        <Line type="monotone" dataKey="смертей на данный день" stroke={badColor} activeDot={{r: 12}}/>
                        <CartesianGrid vertical={false} stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                               domain={[min_deaths - 100, max_deaths + 100]}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    </LineChart>
                </div>
            </div>
        </div>
    }

    let searchData = null;
    if (isSearch) {
        searchData = (
            <div className='RegionSuggestionBlock'>
                <button className='CloseButton' onClick={() => updateIsSearch(0)}>
                    <svg viewBox="0 0 40 40">
                        <path className="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"/>
                    </svg>
                </button>
                <div className='RegionSuggestions'>
                    {suggestions.map((d, index) => <p onClick={(e) => {
                        updateRegion(d);
                        updateIsSearch(0);
                        searchRegion(d);
                    }} key={index}><span style={{textTransform: 'capitalize'}}>{d}</span></p>)}
                </div>
            </div>
        )
    }
    return <div style={{width: '100%'}}>
        <div className='InputForm'>
            <input style={{textTransform: 'capitalize'}} type='text' className='RegionInput' list='suggestions'
                   value={region} onChange={findRegionByStart}
                   onFocus={() => updateIsSearch(1)}
                   placeholder='Введите регион'/>
            <button className='SearchButton' disabled={!complete} onClick={() => {
                searchRegion(region);
                updateIsSearch(0);
            }}>Найти
            </button>
        </div>
        {searchData}

        {mainData}
    </div>
}

// russia
function RenderRussiaCasesHistory(props) {
    const id = 6;
    if (props.activeTab !== id) {
        return null;
    }
    let date = new Date()
    date.setDate(date.getDate() - 30)
    let min_cases = 10000000000000000;
    let max_cases = 0;

    const cases = Object.keys(props.Data['cases']).slice(Object.keys(props.Data['cases']).length - 30).map(d => {
        console.log(1)
        let day = (date.getDate()).toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getFullYear()
        date.setDate(date.getDate() + 1)
        max_cases = props.Data['cases'][d][1] > max_cases ? props.Data['cases'][d][1] : max_cases;
        min_cases = props.Data['cases'][d][1] < min_cases ? props.Data['cases'][d][1] : min_cases;

        return {name: `${day}-${month}-${year}`, 'заболеваний на данный день': props.Data['cases'][d][1]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Заболеваний за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                           height={window.innerHeight / diagramHeight}
                           data={cases}>
                    <Line type="monotone" dataKey="заболеваний на данный день" stroke={badColor} activeDot={{r: 12}}/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en').format(value)} width={80}
                           domain={[min_cases - 1000, max_cases + 1000]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                </LineChart>
            </div>
        </div>
    )
}

function RenderRussiaDeathsHistory(props) {
    const id = 8;
    if (props.activeTab !== id) {
        return null;
    }
    let date = new Date()
    date.setDate(date.getDate() - 30)

    let min_cases = 1000000000;
    let max_cases = 0;
    const cases = Object.keys(props.Data['deaths']).slice(Object.keys(props.Data['deaths']).length - 30).map(d => {
        let day = (date.getDate()).toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getFullYear()
        date.setDate(date.getDate() + 1)
        max_cases = props.Data['deaths'][d][1] > max_cases ? props.Data['deaths'][d][1] : max_cases;
        min_cases = props.Data['deaths'][d][1] < min_cases ? props.Data['deaths'][d][1] : min_cases;
        return {name: `${day}-${month}-${year}`, 'смертей на данный день': props.Data['deaths'][d][1]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Случаи смертей по России за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                           height={window.innerHeight / diagramHeight}
                           data={cases}>
                    <Line type="monotone" dataKey="смертей на данный день" stroke={badColor} activeDot={{r: 12}}/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
                           domain={[min_cases - 100, max_cases + 100]}/>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                </LineChart>
            </div>
        </div>
    )
}

function RenderRussiaRegion(props) {
    function findRegionByStart(e) {
        updateRegion(e.target.value)

        updateSuggestions(names.map(r => {
            if (r.toLowerCase().startsWith(e.target.value.toLowerCase())) {
                return r
            }
            return null
        }).filter(a => a))

        if (names.includes(e.target.value.toLowerCase())) {
            return updateComplete(true)
        }
        return updateComplete(false)
    }

    async function searchRegion(reg) {
        if (dataState === dataStates.requested) {
            return
        }
        updateDataState(dataStates.requested)
        let index = 1;
        for (let i in Object.entries(props.Data)) {
            if (props.Data[i].name.toLowerCase() === reg.toLowerCase()) {
                index = props.Data[i].code;
                break;
            }
        }
        return fetch(`https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/${index}.json?`, {method: 'get'}).then((r) => {
            r.json().then(j => {
                updateData(j)
                updateFoundRegion(reg)
                updateDataState(dataStates.received)
            })
        })
    }

    let names = props.Data.map(d => d.name.toLowerCase())
    names.sort((a, b) => a.localeCompare(b))

    let [complete, updateComplete] = useState(false);
    let [region, updateRegion] = useState('');
    let [data, updateData] = useState(null);
    let [dataState, updateDataState] = useState(dataStates.notRequested)
    let [isSearch, updateIsSearch] = useState(0);
    let [suggestions, updateSuggestions] = useState(names);
    let [foundRegion, updateFoundRegion] = useState('');
    const id = 9
    if (props.activeTab !== id) {
        return null;
    }
    let mainData = null;
    if (dataState === dataStates.requested) {
        mainData = <div>loading...</div>
    }
    if (dataState === dataStates.received) {
        let date = new Date(Date.now() - 30 * 3600 * 1000)

        let max_cases = 0;
        let min_cases = 100000000000000000;
        let cases = data['cases'].slice(data['cases'].length - 32).map(d => {
            date.setDate(date.getDate() + 1)
            let day = (date.getDate()).toString().padStart(2, '0')
            let month = (date.getMonth()).toString().padStart(2, '0')
            let year = date.getFullYear()
            max_cases = d[1] > max_cases ? d[1] : max_cases;
            min_cases = d[1] < min_cases ? d[1] : min_cases;
            return {
                name: `${day}-${month}-${year}`, 'заболеваний на данный день': d[1]
            }
        })

        date = new Date(Date.now() - 30 * 3600 * 1000)

        let max_deaths = 0;
        let min_deaths = 100000000000000000;
        let deaths = data['deaths'].slice(data['deaths'].length - 32).map(d => {
            date.setDate(date.getDate() + 1)
            let day = (date.getDate()).toString().padStart(2, '0')
            let month = (date.getMonth()).toString().padStart(2, '0')
            let year = date.getFullYear()
            max_deaths = d[1] > max_deaths ? d[1] : max_deaths;
            min_deaths = d[1] < min_deaths ? d[1] : min_deaths;
            return {
                name: `${day}-${month}-${year}`, 'смертей на данный день': d[1]
            }
        })
        mainData = <div>
            <div className='DiagramContainer'>
                <h2>Случаи заболевания по региону: <span style={{textTransform: 'capitalize'}}>{foundRegion}</span></h2>
                <div className='BarChartContainer'>
                    <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                               height={window.innerHeight / diagramHeight}
                               data={cases}>
                        <Line type="monotone" dataKey="заболеваний на данный день" stroke={badColor}
                              activeDot={{r: 12}}/>
                        <CartesianGrid vertical={false} stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis width={80} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
                               domain={[Math.max(-10, min_cases - 100), max_cases + 100]}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    </LineChart>
                </div>
            </div>
            <div className='DiagramContainer'>
                <h2>Случаи смертей по региону: <span style={{textTransform: 'capitalize'}}>{foundRegion}</span></h2>
                <div className='BarChartContainer'>
                    <LineChart className='BarChart' width={window.innerWidth / diagramWidth}
                               height={window.innerHeight / diagramHeight}
                               data={deaths}>
                        <Line type="monotone" dataKey="смертей на данный день" stroke={badColor} activeDot={{r: 12}}/>
                        <CartesianGrid vertical={false} stroke="#ccc"/>
                        <XAxis dataKey="name"/>
                        <YAxis width={80} tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
                               domain={[Math.max(-10, min_deaths - 100), max_deaths + 100]}/>
                        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                    </LineChart>
                </div>
            </div>
        </div>
    }

    let searchData = null;
    if (isSearch) {
        searchData = (
            <div className='RegionSuggestionBlock'>
                <button className='CloseButton' onClick={() => updateIsSearch(0)}>
                    <svg viewBox="0 0 40 40">
                        <path className="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"/>
                    </svg>
                </button>
                <div className='RegionSuggestions'>
                    {suggestions.map((d, index) => <p onClick={(e) => {
                        updateRegion(d);
                        updateIsSearch(0);
                        searchRegion(d);
                    }} key={index}><span style={{textTransform: 'capitalize'}}>{d}</span></p>)}
                </div>
            </div>
        )
    }
    return <div style={{width: '100%'}}>
        <div className='InputForm'>
            <input type='text' style={{textTransform: 'capitalize'}} className='RegionInput' list='suggestions'
                   value={region} onChange={findRegionByStart}
                   onFocus={() => updateIsSearch(1)}
                   placeholder='Введите регион'/>
            <button className='SearchButton' disabled={!complete} onClick={() => {
                searchRegion(region);
                updateIsSearch(0);
            }}>Найти
            </button>
        </div>
        {searchData}

        {mainData}
    </div>
}

function RenderRussiaCasesMap(props) {
    const [activeRegion, updateActiveRegion] = useState('');

    function onMapClick(e, region) {
        updateActiveRegion(region)
    }

    function getCasesByName(r) {
        for (let d of prepareData) {
            if (d.name === r) {
                return d.cases;
            }
        }
        return 0;
    }

    const id = 10
    if (props.activeTab !== id) {
        return null;
    }


    let prepareData = Object.keys(props.Data).map(d => {
        if (props.Data[d]['info']['name'] === "Россия" || props.Data[d]['info']['name'] === "Москва") {
            return null;
        }
        return props.Data[d]['info']
    }).filter(a => a);

    let sorted = prepareData.slice()
    sorted.sort(function (a, b) {
        return a['cases'] - b['cases']
    })

    let cssBlock = prepareData.map((d, index) => {
        let name = d.name
        let opacity = Math.max(d.cases / d.population * 6, 0.05);
        let cssText = `polyline[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        polygon[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        g[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        path[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}`
        return <style key={index} type='text/css'>{cssText}</style>
    })

    let tt = <div className='MapToolTip' style={{color: 'transparent'}}><h4>1</h4><p>1</p></div>;
    if (activeRegion) {
        tt = <div className='MapToolTip'><h4>{activeRegion}</h4><p>случаев
            заболевания: {new Intl.NumberFormat('en').format(getCasesByName(activeRegion))}</p></div>
    }

    return <div style={{position: "relative"}}>
        {tt}
        {cssBlock}
        <RussiaSVG sendClick={onMapClick}/>
    </div>
}

function RenderRussiaDeathsMap(props) {
    const [activeRegion, updateActiveRegion] = useState('');

    function onMapClick(e, region) {
        updateActiveRegion(region)
    }

    function getCasesByName(r) {
        for (let d of prepareData) {
            if (d.name === r) {
                return d.deaths;
            }
        }
        return 0;
    }

    const id = 11
    if (props.activeTab !== id) {
        return null;
    }


    let prepareData = Object.keys(props.Data).map(d => {
        if (props.Data[d]['info']['name'] === "Россия" || props.Data[d]['info']['name'] === "Москва") {
            return null;
        }
        return props.Data[d]['info']
    }).filter(a => a);

    let sorted = prepareData.slice()
    sorted.sort(function (a, b) {
        return a['deaths'] - b['deaths']
    })

    let cssBlock = prepareData.map((d, index) => {
        let name = d.name
        let opacity = Math.max(d.deaths / d.population * 200, 0.05);
        let cssText = `polyline[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        polygon[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        g[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}
        path[data-name="${name}"] {fill: rgba(220, 20, 60, ${opacity}) !important}`
        return <style key={index} type='text/css'>{cssText}</style>
    })

    let tt = <div className='MapToolTip' style={{color: 'transparent'}}><h4>1</h4><p>1</p></div>;
    if (activeRegion) {
        tt = <div className='MapToolTip'><h4>{activeRegion}</h4><p>случаев
            смертей: {new Intl.NumberFormat('en').format(getCasesByName(activeRegion))}</p>
        </div>
    }

    return <div style={{position: "relative"}}>
        {tt}
        {cssBlock}
        <RussiaSVG sendClick={onMapClick}/>
    </div>
}

function App() {
    async function getRussiaCasesHistoryData() {
        updateRussiaCasesHistoryDataState(dataStates.requested)
        return fetch('https://milab.s3.yandex.net/2020/covid19-stat/data/v10/data-by-region/225.json', {method: 'get'}).then((r) => {
            r.json().then((j) => {
                updateRussiaCasesHistory(j)
                updateRussiaCasesHistoryDataState(dataStates.received)
            })
        })
    }

    async function getCountriesAndRussianRegionsData() {
        updateRussiaRegionsDataState(dataStates.requested)
        updateAllCountriesDataState(dataStates.requested)
        updateAllCountriesVaccineDataState(dataStates.requested)
        return fetch('https://milab.s3.yandex.net/2020/covid19-stat/data/v10/default_data.json', {method: 'get'}).then((r) => {
            r.json().then(j => {
                updateAllCountriesData(j['world_stat_struct']['data'])
                updateRussiaRegionsData(j['russia_stat_struct']['data'])
                updateAllCountriesVaccineData(j['vaccination_struct'])

                updateAllCountriesDataState(dataStates.received)
                updateAllCountriesVaccineDataState(dataStates.received)

                let worldData = Object.keys(j['world_stat_struct']['data']).map(d => {
                    return {name: j['world_stat_struct']['data'][d]['info']['name'].toString(), code: d}
                })
                updateCountriesIds(worldData)
                updateCountriesIdsState(dataStates.received)

                let data = Object.keys(j['russia_stat_struct']['data']).map(d => {
                    return {name: j['russia_stat_struct']['data'][d]['info']['name'].toString(), code: d}
                })
                updateRussiaRegionsIds(data)
                updateRussiaRegionsDataState(dataStates.received)
            })
        })
    }

    // all countries cases
    const [activeTab, updateActiveTab] = useState(1);
    const [allCountriesData, updateAllCountriesData] = useState(null);
    const [allCountriesDataState, updateAllCountriesDataState] = useState(dataStates.notRequested);
    const [countriesIds, updateCountriesIds] = useState(null);
    const [countriesIdsState, updateCountriesIdsState] = useState(dataStates.notRequested);

    const [russiaRegionsIds, updateRussiaRegionsIds] = useState(null);
    const [russiaRegionsData, updateRussiaRegionsData] = useState(null);
    const [russiaRegionsDataState, updateRussiaRegionsDataState] = useState(dataStates.notRequested);

    let alccdb = null;
    let alccdbt = null;
    let alcrd = null;
    let alcrdt = null;
    if (allCountriesDataState === dataStates.received) {
        alccdb = <RenderCountriesCases activeTab={activeTab} Data={allCountriesData}/>
        alccdbt = <RenderCountriesCasesToday activeTab={activeTab} Data={allCountriesData}/>
        alcrd = <RenderCountriesDeaths activeTab={activeTab} Data={allCountriesData}/>
        alcrdt = <RenderCountriesDeathsToday activeTab={activeTab} Data={allCountriesData}/>
    }

    let crd = null;
    if (countriesIdsState === dataStates.received) {
        crd = <RenderCountry activeTab={activeTab} Data={countriesIds}/>
    }

    const [allCountriesVaccineData, updateAllCountriesVaccineData] = useState(null);
    const [allCountriesVaccineDataState, updateAllCountriesVaccineDataState] = useState(dataStates.notRequested);

    let acvd = null;
    let acfvd = null;
    if (allCountriesVaccineDataState === dataStates.received) {
        acvd = <RenderCountriesVaccines activeTab={activeTab} Data={allCountriesVaccineData}/>
        acfvd = <RenderCountriesFullVaccines activeTab={activeTab} Data={allCountriesVaccineData}/>
    }

    // russia cases history

    if (russiaRegionsDataState === dataStates.notRequested) {
        let _ = getCountriesAndRussianRegionsData();
    }

    const [russiaCasesHistory, updateRussiaCasesHistory] = useState(null);
    const [russiaCasesHistoryDataState, updateRussiaCasesHistoryDataState] = useState(dataStates.notRequested);
    if (russiaCasesHistoryDataState === dataStates.notRequested) {
        let _ = getRussiaCasesHistoryData();
    }
    let rrd = null;
    if (russiaRegionsDataState === dataStates.received) {
        rrd = <RenderRussiaRegion activeTab={activeTab} Data={russiaRegionsIds}/>
    }

    let rch = null;
    let rdh = null;
    let rmc = null;
    let rmd = null;
    if (russiaCasesHistoryDataState === dataStates.received) {
        rch = <RenderRussiaCasesHistory activeTab={activeTab} Data={russiaCasesHistory}/>
        rdh = <RenderRussiaDeathsHistory activeTab={activeTab} Data={russiaCasesHistory}/>
        rmc = <RenderRussiaCasesMap activeTab={activeTab} Data={russiaRegionsData}/>
        rmd = <RenderRussiaDeathsMap activeTab={activeTab} Data={russiaRegionsData}/>
    } else {
        alccdb = null;
    }

    return (
        <div>
            <div className='Header'>
                <h1>co<span className='RedBack'>vis</span></h1>
            </div>
            <div className='Menu'>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Мир</h3>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(1)}>Всего заболеваний
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(2)}>Заболеваний сегодня
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(3)}>Всего смертей
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(4)}>Смертей сегодня
                    </button>
                    <button className={['MenuButton', 'GoodButton'].join(' ')}
                            onClick={() => updateActiveTab(12)}>Вакцин сделано
                    </button>
                    <button className={['MenuButton', 'GoodButton'].join(' ')}
                            onClick={() => updateActiveTab(13)}>Количество полных вакцинаций
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(14)}>Поиск по странам
                    </button>
                </div>
                <div className='MenuSection'>
                    <h3 className='MenuHeader'>Россия</h3>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(6)}>Заболеваний за месяц
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(8)}>Смертей за месяц
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(9)}>Поиск по регионам
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(10)}>Заболевания на карте
                    </button>
                    <button className={['MenuButton', 'BadButton'].join(' ')}
                            onClick={() => updateActiveTab(11)}>Смерти на карте
                    </button>
                </div>

            </div>
            <div className='Diagrams'>
                {alccdb}
                {alccdbt}
                {alcrd}
                {alcrdt}
                {acvd}
                {acfvd}
                {crd}
                {rch}
                {rdh}
                {rrd}
                {rmc}
                {rmd}
            </div>
        </div>
    )
}

export default App;
