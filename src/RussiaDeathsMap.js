import {useState} from 'react';
import RussiaSVG from './Russia'
import {checkPage} from "./Constants";

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

    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    let prepareData = Object.keys(props.data).map(d => {
        if (props.data[d]['info']['name'] === "Россия" || props.data[d]['info']['name'] === "Москва") {
            return null;
        }
        return props.data[d]['info']
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