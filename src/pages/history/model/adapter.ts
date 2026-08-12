function formatDate(input: number) {
    const d = new Date(input * 1000);
    return Math.floor(d.getTime() / 1000);
}


export function dataAdapter(data) {
    return data
        .map(({timestamp, margin}) => ({time: formatDate(timestamp), value: margin}))
        .sort((a, b) => a.time - b.time);
}
