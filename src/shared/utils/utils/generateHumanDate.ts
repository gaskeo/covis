export function generateHumanDate(date: Date, delimiter = "-") {
    let day = (date.getDate()).toString().padStart(2, '0')
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let year = date.getFullYear();
    return [day, month, year].join(delimiter);
}
