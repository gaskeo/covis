import {BarChart} from "./components/charts/barChart/barChart.tsx";

function BarDiagramContainer(props) {
    if (!props.data || props.data.length  === 0) {
        return null;
    }
    const [data, maxData] = props.getFunction(props.data, props.field, props.label)

    return (
        <div className='DiagramContainer'>
            <h2>{props.name}</h2>
            <div className='BarChartContainer'>
                <BarChart
                    data={data}
                    max={Math.ceil(maxData * 1.1)}
                    color={props.color}
                    xKey={props.label}
                />
            </div>
        </div>
    );
}

export default BarDiagramContainer;