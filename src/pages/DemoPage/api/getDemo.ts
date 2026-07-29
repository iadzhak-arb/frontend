import {client} from "@shared/api";
import {useQuery} from "@tanstack/react-query";


export function getDemoSpotSpot() {
    return useQuery({
        queryKey: ['demo', 'spot-spot'],
        refetchInterval: 30000,
        queryFn: async ({signal}) => {
            const {data, error} = await client.GET('/api/arbitrage/demo-spot/', {signal});
            if (error) throw error;
            return data;
        },
    })
}

export function getDemoSpotSwap() {
    return useQuery({
        queryKey: ['demo', 'spot-swap'],
        refetchInterval: 30000,
        queryFn: async ({signal}) => {
            const {data, error} = await client.GET('/api/arbitrage/demo-swap/', {signal});
            if (error) throw error;
            return data;
        }
    })
}
