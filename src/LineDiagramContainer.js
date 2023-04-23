import {LineChart} from "./components/charts/lineChart/lineChart.tsx";

function LineDiagramContainer(props) {
    if (!props.data || props.data.length  === 0) {
        return null;
    }

    const [data, minData, maxData] = props.getFunction(props.data, props.field, props.label)

    return (
        <div className='DiagramContainer'>
            <h2>{props.name}</h2>
            <div className='BarChartContainer'>
                <LineChart
                    data={data}
                    yKey={props.label}
                    xKey="name"
                    min={Math.ceil(minData * 0.9)}
                    max={Math.ceil(maxData * 1.1)}
                    color={props.color}/>
            </div>
        </div>
    )
}

export default LineDiagramContainer;