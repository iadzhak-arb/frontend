import {createFileRoute} from '@tanstack/react-router'
import {DashboardLayout} from "@app/layouts";

export const Route = createFileRoute('/d/_layout')({
    component: DashboardLayout,
})
