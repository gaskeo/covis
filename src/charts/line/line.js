import './line.css'

function LineChart(props) {
    console.log(props.colors)
    return <div className='column-diagram'>
        {props.data.map((v, index) =>
            <div key={index} className='diagram-one-column' style={{
                height: v + '%',
                width: 'calc(100% /' + props.data.length + ' - 5px)',
                backgroundColor: props.colors[index],
            }}><p>{v.toString()}</p></div>
        )}
    </div>;
}

export default LineChart