import {useState} from 'react';

import './App.css';
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell} from 'recharts';

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

function RenderCountriesBarChart(props) {
    const data = props.Data.map(d => {
        if (countries[d['country']]) {
            return {name: countries[d['country']], uv: 40, 'случаи': d['cases'], amt: 2100}
        }
        return null;
    }).filter(a => a);
    return (
        <div>
            <div>
                <h1>Статистика covid-19</h1>
            </div>
            <div className='CasesContainer'>
                <h2>Случаи заболевания по странам всего</h2>
                <div className='BarChartContainer'>
                    <BarChart className='BarChart' width={window.innerWidth / 1.2} height={window.innerHeight / 1.4}
                              data={data}>
                        <XAxis dataKey="name"/>
                        <YAxis width={80}/>
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
        </div>
    )
};

function App() {
    const dataStates = {
        notRequested: 0,
        requested: 1,
        received: 2
    }

    async function getData() {
        updateDataState(dataStates.requested)
        return fetch('https://disease.sh/v3/covid-19/countries?sort=cases', {method: 'get'}).then((r) => {
            r.json().then((j) => {
                updateTodayCases(j)
                updateDataState(dataStates.received)
            })
        })
    }

    const [todayCases, updateTodayCases] = useState(null);
    const [dataState, updateDataState] = useState(dataStates.notRequested);
    if (dataState == dataStates.notRequested) {
        getData();
    }

    if (dataState == dataStates.received) {
    } else {
        return null;

    }
    return (
        <div>
            <RenderCountriesBarChart Data={todayCases}></RenderCountriesBarChart>
        </div>
    )
}

export default App;
