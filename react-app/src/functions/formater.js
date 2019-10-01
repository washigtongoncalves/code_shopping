export function dateFormatBr(value) {
    const date = new Date(value);
    return new Intl.DateTimeFormat('pt-BR').format(date);
};

export function numberFormatBr(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
};
