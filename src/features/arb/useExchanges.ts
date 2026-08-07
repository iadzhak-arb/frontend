import {useQuery} from "@tanstack/react-query";
import {arbClient} from "@shared/api";

export function useExchanges() {
    return useQuery({
        queryKey: ['exchanges'],
        queryFn: async () => {
            const {data} = await arbClient.GET('/exchanges');
            return data;
        }
    })
}