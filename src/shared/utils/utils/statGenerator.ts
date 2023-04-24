export function generateLast30Days(data: [number, number][]) {
    const date = new Date()
    date.setDate(date.getDate() - 30)
    let [minValue, maxValue] = [10_000_000_000, 0]

    const convData = data.slice(data.length - 30).map(d => {
        let day = (date.getDate()).toString().padStart(2, '0')
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let year = date.getFullYear();

        date.setDate(date.getDate() + 1);

        maxValue = Math.max(d[1], maxValue);
        minValue = Math.min(d[1], minValue);

        return {x: `${day}-${month}-${year}`, y: d[1]}
    })
    return {data: convData, min: minValue, max: maxValue}
}
