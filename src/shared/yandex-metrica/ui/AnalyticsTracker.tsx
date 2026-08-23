import {useYandexHit} from "@shared/yandex-metrica/api/useYandexHit.ts";

export function AnalyticsTracker() {
    useYandexHit();
    return null;
}