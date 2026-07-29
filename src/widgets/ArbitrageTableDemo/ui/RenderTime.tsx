export const RenderTime = ({value}: { value: Date }) => {
    const seconds = Math.floor((new Date().getTime() - value.getTime()) / 1000);

    if (seconds < 60) return `${seconds} сек.`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} мин.`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ч.`;
    const days = Math.floor(hours / 24);
    return `${days} д.`;
}