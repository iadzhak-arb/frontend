import {arbClient} from "@shared/api";
import {useQuery} from "@tanstack/react-query";


export function getDemoSpotSpot() {
    return useQuery({
        queryKey: ['demo', 'spot-spot'],
        refetchInterval: 30000,
        queryFn: async ({signal}) => {
            const {data} = await arbClient.GET('/demo-spot', {signal});
            return data;
        },
    })
}

export function getDemoSpotSwap() {
    return useQuery({
        queryKey: ['demo', 'spot-swap'],
        refetchInterval: 30000,
        queryFn: async ({signal}) => {
            const {data} = await arbClient.GET('/demo-swap', {signal});
            return data;
        }
    })
}
