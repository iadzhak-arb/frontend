import {useQuery} from "@tanstack/react-query";
import {client} from "@shared/api";

export function useSummary() {
    return useQuery({
        queryKey: ['summary'],
        queryFn: async () => await client.GET('/api/summary/')
    })
}