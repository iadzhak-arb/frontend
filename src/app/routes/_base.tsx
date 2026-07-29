import {createFileRoute} from '@tanstack/react-router'
import {BaseLayout} from "@app/layouts";

export const Route = createFileRoute('/_base')({
    component: BaseLayout,
})
