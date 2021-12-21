import {checkPage, diagramData, getVaccineData, goodColor} from "./Constants";
import {MyBarChart} from "./BarChart";

function RenderCountriesVaccines(props) {
    const check = checkPage(props.id, props.activeTab, props.data);
    if (check !== true) {
        return check;
    }

    let [data, maxVaccines] = getVaccineData(props.data, 'vac', diagramData.vaccines.label, 'name_ru')

    return (
        <div className='DiagramContainer'>
            <h2>Вакцин сделано</h2>
            <div className='BarChartContainer'>
                <MyBarChart data={data}
                            maxY={Math.ceil(maxVaccines * 1.1)}
                            color={goodColor}
                            label={diagramData.vaccines.label}/>
            </div>
        </div>
    )
}

export default RenderCountriesVaccines;