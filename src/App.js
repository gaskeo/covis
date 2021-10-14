import {useState} from 'react';

import './App.css';
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, LineChart, Line} from 'recharts';

const countries = {
    'USA': 'США',
    'India': 'Индия',
    'Brazil': 'Бразилия',
    'UK': 'Англия',
    'Russia': 'Россия',
    'Turkey': 'Турция',
    'France': 'Франция',
    'Iran': 'Иран',
    'Argentina': 'Аргентина',
    'Spain': 'Испания',
    'Colombia': 'Колумбия',
    'Italy': 'Италия',
    'Germany': 'Германия',
    'Indonesia': 'Индонезия',
    'Mexico': 'Мексика',
    'Poland': 'Польша',
    'South Africa': 'Южная Африка',
    'Philippines': 'Филипины',
    'Ukraine': 'Украина',
    'Malaysia': 'Малазия'
};

function RenderCountriesCases(props) {
    const id = 1;
    if (props.activeTab !== id) {
        return null;
    }

    const data = props.Data.map(d => {
        if (countries[d['country']]) {
            return {name: countries[d['country']], uv: 40, 'случаи': d['cases'], amt: 2100}
        }
        return null;
    }).filter(a => a);
    return (
        <div className='DiagramContainer'>
            <h2>Случаи заболевания по странам всего</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, data[0]['случаи'] + 1000000]}/>
                    <Tooltip/>
                    <Bar dataKey="uv" dataKey='случаи' barSize={70} fill="#8884d8">
                        {
                            data.map((d, index) => {
                                    if (d.name == 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={'#8884d8'}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={'#8882a8'}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
};

function RenderCountriesCasesToday(props) {
    const id = 2;
    if (props.activeTab !== id) {
        return null;
    }

    const data = props.Data.map(d => {
        if (countries[d['country']]) {
            return {name: countries[d['country']], 'случаев сегодня': d['todayCases']}
        }
        return null;
    }).filter(a => a);
    let sorted = data.slice();
    sorted.sort((a, b) => a['случаев сегодня'] - b['случаев сегодня'])
    return (
        <div className='DiagramContainer'>
            <h2>Случаи заболевания по странам сегодня</h2>
            <div className='BarChartContainer'>
                <BarChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                          data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis width={80} domain={[0, sorted[sorted.length - 1]['случаев сегодня'] + 1000]}/>
                    <Tooltip/>
                    <Bar dataKey="uv" dataKey='случаев сегодня' barSize={70} fill="#8884d8">
                        {
                            data.map((d, index) => {
                                    if (d.name == 'Россия') {
                                        return <Cell key={`cell-${index}`} fill={'#8884d8'}/>
                                    }
                                    return <Cell key={`cell-${index}`} fill={'#8882a8'}/>
                                }
                            )
                        }
                    </Bar>
                </BarChart>
            </div>
        </div>
    )
};

function RenderRussiaHistory(props) {
    const cases = Object.keys(props.Data['timeline']['cases']).map(d => {
        return {name: d, 'Случаев': props.Data['timeline']['cases'][d]}
    })
    return (
        <div className='DiagramContainer'>
            <h2>Случаи заболевания по России за месяц</h2>
            <div className='BarChartContainer'>
                <LineChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                           data={cases}>
                    <Line type="monotone" dataKey="Случаев" stroke="#8884d8"/>
                    <CartesianGrid vertical={false} stroke="#ccc"/>
                    <XAxis dataKey="name"/>
                    <YAxis width={80}
                           domain={[cases[0]['Случаев'] - 100000, cases[cases.length - 1]['Случаев'] + 100000]}/>
                    <Tooltip/>
                </LineChart>
            </div>
        </div>
    )
}

function App() {
    const dataStates = {
        notRequested: 0,
        requested: 1,
        received: 2
    }

    async function getCountriesCasesData() {
        updateAllCountriesCasesDataState(dataStates.requested)
        return fetch('https://disease.sh/v3/covid-19/countries?sort=cases', {method: 'get'}).then((r) => {
            r.json().then((j) => {
                updateAllCountriesCases(j)
                updateAllCountriesCasesDataState(dataStates.received)
            })
        })
    }

    async function getRussiaCasesHistoryData() {
        updateRussiaCasesHistoryDataState(dataStates.requested)
        return fetch('https://disease.sh/v3/covid-19/historical/Russia?lastdays=30', {method: 'get'}).then((r) => {
            r.json().then((j) => {
                updateRussiaCasesHistory(j)
                updateRussiaCasesHistoryDataState(dataStates.received)
            })
        })
    }

    // all countries cases
    const [allCountriesTab, updateAllCountriesTab] = useState(1);
    const [allCountriesCases, updateAllCountriesCases] = useState(null);
    const [allCountriesCasesDataState, updateAllCountriesCasesDataState] = useState(dataStates.notRequested);
    if (allCountriesCasesDataState == dataStates.notRequested) {
        getCountriesCasesData();
    }
    let alccdb = null;
    let alccdbt = null;
    if (allCountriesCasesDataState == dataStates.received) {
        alccdb = <RenderCountriesCases activeTab={allCountriesTab} Data={allCountriesCases}></RenderCountriesCases>
        alccdbt = <RenderCountriesCasesToday activeTab={allCountriesTab} Data={allCountriesCases}></RenderCountriesCasesToday>
    }

    // russia cases history
    const [russiaCasesHistory, updateRussiaCasesHistory] = useState(null);
    const [russiaCasesHistoryDataState, updateRussiaCasesHistoryDataState] = useState(dataStates.notRequested);
    if (russiaCasesHistoryDataState == dataStates.notRequested) {
        getRussiaCasesHistoryData();
    }
    let rch;
    if (russiaCasesHistoryDataState == dataStates.received) {
        rch = <RenderRussiaHistory Data={russiaCasesHistory}></RenderRussiaHistory>
    } else {
        alccdb = null;
    }

    return (
        <div>
            <div>
                <h1>Статистика covid-19</h1>
            </div>
            <div className='Menu'>
                <h3>Мир</h3>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(1)}>Всего заболеваний</button>
                <button className='MenuButton' onClick={() => updateAllCountriesTab(2)}>Заболеваний сегодня</button>
            </div>
            <div className='Diagrams'>
                {alccdb}
                {alccdbt}
                {rch}
            </div>
        </div>
    )
}

export default App;
