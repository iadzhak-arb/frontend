import {createFileRoute} from '@tanstack/react-router'
import {AuthLayout} from "@app//layouts";

export const Route = createFileRoute('/_auth')({
    component: AuthLayout,
})

