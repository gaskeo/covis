import {useState} from 'react';
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

export default RenderRussiaDeathsMap;