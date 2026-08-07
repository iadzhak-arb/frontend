import {arbClient} from "@shared/api";
import {type operations} from "@shared/api/schema-arb.ts";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

type Params = operations['serach_symbols_search_get']['parameters']['query']

export function useSearchArbitrage() {
    const [params, setParams] = useState<Params>({})

    const setExchangeBuy = (v: string) => setParams(prev => ({...prev, exchange_buy_name: v}));
    const setSymbolBuy = (v: string) => setParams(prev => ({...prev, symbol_buy_id: v}));
    const setExchangeSell = (v: string) => setParams(prev => ({...prev, exchange_sell_name: v}));
    const setSymbolSell = (v: string) => setParams(prev => ({...prev, symbol_sell_id: v}));

    const {data} = useQuery({
        queryKey: ['search-arbitrage', params],
        queryFn: async () => {
            const {data} = await arbClient.GET('/search', {
                params: {
                    query: params,
                }
            });
            return data;
        }
    });

    return {
        data,
        params,
        setExchangeBuy,
        setSymbolBuy,
        setExchangeSell,
        setSymbolSell
    }
}