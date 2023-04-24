const numberShortener = (value: number) => {
    if (value < 1000) {
        return Math.ceil(value).toString();
    }
    if (value < 1_000_000) {
        return Math.ceil(value / 1000).toString() + 'K'
    }
    if (value < 1_000_000_000) {
        return Math.ceil(value / 1_000_000).toString() + 'M'
    }
    if (value < 1_000_000_000_000) {
        return Math.ceil(value / 1_000_000_000).toString() + 'B'
    }
    return value.toString();
}

export {numberShortener}