import {useQuery} from "@tanstack/react-query";
import {arbClient} from "@shared/api";

export function useSummary() {
    return useQuery({
        queryKey: ['summary'],
        queryFn: async () => await arbClient.GET('/summary')
    })
}