import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {arbClient} from "@shared/api";
import {type operations} from "@shared/api/schema-arb"
import {useEffect, useState} from "react";


export type Params = operations['latest_latest_get']['parameters']['query'];
const filtersStorage = 'arbitrage-filters';


export function useArbitrage(initial?: Params) {
    const [refetch, setRefetch] = useState(0);
    const [params, setParams] = useState<Params>(() => {
        const stored = localStorage.getItem(filtersStorage)
        return stored ? JSON.parse(stored) : initial || {}
    });

    useEffect(() => {
        return () => localStorage.setItem(filtersStorage, JSON.stringify(params));
    }, [params]);

    const {data, isFetching} = useQuery({
        queryKey: ['arbitrage', params],
        queryFn: async () => {
            const {data} = await arbClient.GET('/latest', {
                params: {
                    query: params
                },
            })
            return data
        },
        refetchInterval: (refetch * 1000),
        placeholderData: keepPreviousData,
    })

    const setPage = (v: number) => setParams({...params, page: v});
    const setLimit = (v: number) => setParams({...params, limit: v, page: 1});
    const setToken = (v: string[]) => setParams({...params, tokens: v.join(), page: 1});
    const setMarketBuy = (v: string) => setParams({...params, market_buy: v, page: 1});
    const setMarketSell = (v: string) => setParams({...params, market_sell: v, page: 1});
    const setMargin = (v: number[]) => setParams({...params, margin_min: v[0], margin_max: v[1], page: 1});
    const setExchangeBuy = (v: string[]) => setParams({...params, exchange_buy: v.join(), page: 1});
    const setExchangeSell = (v: string[]) => setParams({...params, exchange_sell: v.join(), page: 1});


    return {
        params,
        data,
        isFetching,
        setToken,
        setMarketBuy,
        setMarketSell,
        setMargin,
        setExchangeBuy,
        setExchangeSell,
        setLimit,
        setPage,
        setRefetch
    }
}