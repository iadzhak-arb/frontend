import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {client} from "@shared/api";

export function useArbitrageNames() {
    const [search, setSearch] = useState('');
    const {data} = useQuery({
        queryKey: ['arb_available', search],
        queryFn: async () => {
            const {data} = await client.GET('/api/arbitrage/', {
                params: {
                    query: {
                        search: search
                    }
                }
            });
            return data?.results
        }
    })

    return {
        setSearch,
        data
    }
}

export function useHistory() {
    const [id, setId] = useState(1);
    if (!id) return {open: undefined, close: undefined, setId};
    const open = useQuery({
        queryKey: ['history', id],
        queryFn: async () => {
            if (!id) return;
            const {data} = await client.GET('/api/arbitrage/{id}/', {
                params: {
                    path: {id}
                }
            });
            return data
        }
    })
    const close = useQuery({
        queryKey: ['history_back', id],
        queryFn: async () => {
            if (!id) return;
            const {data} = await client.GET('/api/arbitrage/{id}/back/', {
                params: {
                    path: {id}
                }
            });
            return data
        }
    })
    return {
        open,
        close,
        setId,
        id
    }
}
