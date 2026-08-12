import {createFileRoute} from '@tanstack/react-router'
import {History} from "@pages/history"

export const Route = createFileRoute('/d/_layout/history')({
    component: History,
    validateSearch: (search) => ({
        buy_symbol_id: search.buy_symbol_id as string || undefined,
        buy_exchange_name: search.buy_exchange_name as string || undefined,
        sell_symbol_id: search.sell_symbol_id as string || undefined,
        sell_exchange_name: search.sell_exchange_name as string || undefined,
    })
})
