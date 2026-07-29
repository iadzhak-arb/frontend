import {createFileRoute} from '@tanstack/react-router'
import {History} from "@pages/History"

export const Route = createFileRoute('/d/_layout/history')({
    component: History,
    validateSearch: (search) => ({
        id: Number(search.id) || 0
    })
})
