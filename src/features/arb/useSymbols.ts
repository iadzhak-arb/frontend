import {arbClient} from "@shared/api";
import {useQuery} from "@tanstack/react-query";

export function useSymbols() {
    return useQuery({
        queryKey: ['symbols'],
        queryFn: async () => {
            const {data} = await arbClient.GET('/symbols');
            return data;
        }
    })
}