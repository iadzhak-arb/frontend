import {useQuery} from "@tanstack/react-query";
import {arbClient} from "@shared/api";


export function useMarkets() {
    return useQuery({
        queryKey: ['markets'],
        queryFn: async () => {
            const {data} = await arbClient.GET('/markets');
            return data;
        }
    })
}