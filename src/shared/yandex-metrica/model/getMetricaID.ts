export function getMetricaID() {
    return import.meta.env.VITE_YANDEX_METRICA || undefined;
}