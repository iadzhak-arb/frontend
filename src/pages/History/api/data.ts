import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {arbClient} from "@shared/api";
import {type operations} from "@shared/api/schema-arb.ts"


type Params = operations['history_history_get']['parameters']['query']

export function useHistory() {
    const [params, setParams] = useState<Params>({
        buy_symbol_id: 'BTC/USDT',
        buy_exchange_name: 'Bybit',
        sell_symbol_id: 'BTC/USDT',
        sell_exchange_name: 'Bybit',
    })

    const setSymbolBuy = (v: string) => setParams(prev => ({...prev, buy_symbol_id: v}));
    const setExchangeBuy = (v: string) => setParams(prev => ({...prev, buy_exchange_name: v}));
    const setSymbolSell = (v: string) => setParams(prev => ({...prev, sell_symbol_id: v}));
    const setExchangeSell = (v: string) => setParams(prev => ({...prev, sell_exchange_name: v}));

    if (!params) return {
        data: undefined,
        params,
        setParams,
        setSymbolBuy,
        setExchangeBuy,
        setSymbolSell,
        setExchangeSell
    };
    const data = useQuery({
        queryKey: ['history', params],
        queryFn: async () => {
            if (!params) return;
            const {data} = await arbClient.GET('/history', {
                params: {
                    query: params
                }
            });
            return data
        }
    })
    return {
        data,
        params,
        setSymbolBuy,
        setExchangeBuy,
        setSymbolSell,
        setExchangeSell,
        setParams
    }
}
