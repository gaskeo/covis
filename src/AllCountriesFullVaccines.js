import {checkPage, diagramData, getVaccineData, goodColor} from "./Constants";
import {MyBarChart} from "./BarChart";

function RenderCountriesFullVaccines(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    const [data, maxVaccines] = getVaccineData(props.data, 'peop_full_vac', diagramData.vaccinesFull.label)

    return (
        <div className='DiagramContainer'>
            <h2>Количество людей, поставивших полную вакцину</h2>
            <div className='BarChartContainer'>
                <MyBarChart data={data} maxY={Math.ceil(maxVaccines * 1.1)} color={goodColor} label={diagramData.vaccinesFull.label}/>
            </div>
        </div>
    )
}

export default RenderCountriesFullVaccines;