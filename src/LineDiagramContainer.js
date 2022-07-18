import {MyLineChart} from "./LineChart";

function LineDiagramContainer(props) {
    if (!props.data || props.data.length  === 0) {
        return null;
    }

    const [data, minData, maxData] = props.getFunction(props.data, props.field, props.label)

    return (
        <div className='DiagramContainer'>
            <h2>{props.name}</h2>
            <div className='BarChartContainer'>
                <MyLineChart
                    data={data}
                    label={props.label}
                    minValue={Math.ceil(minData * 0.9)} maxValue={Math.ceil(maxData * 1.1)} color={props.color}/>
            </div>
        </div>
    )
}

export default LineDiagramContainer;