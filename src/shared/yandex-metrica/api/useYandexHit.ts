import {getMetricaID} from "@shared/yandex-metrica/model/getMetricaID.ts";
import {useEffect} from "react";
import {useLocation} from "@tanstack/react-router";

export function useYandexHit() {
    const metricaId = getMetricaID();
    const location = useLocation();

    useEffect(() => {
        const fullUrl = `${location.pathname}${location.searchStr || ''}`;

        if ((window as any).ym) {
            (window as any).ym(metricaId, 'hit', fullUrl);
        }
    }, [location]);
}