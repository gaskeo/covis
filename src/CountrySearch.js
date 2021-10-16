import {useState} from 'react';
import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LineChart,
    Line,
} from 'recharts';


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

function RenderCountrySearch(props) {
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
            max_cases = d[1] > max_cases ? d[1] : max_cases;
            min_cases = d[1] < min_cases ? d[1] : min_cases;

            return {
                name: `${day}-${month}-${year}`, 'заболеваний на данный день': d[1]
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
            max_deaths = d[1] > max_deaths ? d[1] : max_deaths;
            min_deaths = d[1] < min_deaths ? d[1] : min_deaths;

            return {
                name: `${day}-${month}-${year}`, 'смертей на данный день': d[1]
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

export default RenderCountrySearch;