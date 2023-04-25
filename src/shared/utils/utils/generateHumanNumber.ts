const generateHumanNumber = (n: number) => new Intl.NumberFormat('en').format(Number(n))

export {generateHumanNumber};
