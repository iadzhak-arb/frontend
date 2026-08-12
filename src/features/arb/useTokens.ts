import {useQuery} from "@tanstack/react-query";
import {arbClient} from "@shared/api";


export function useTokens(t: 'base' | 'quote' | 'settle') {
    return useQuery({
        queryKey: ['tokens', t],
        queryFn: async () => {
            const {data} = await arbClient.GET(`/tokens/${t}`);
            return data;
        }
    })
}
