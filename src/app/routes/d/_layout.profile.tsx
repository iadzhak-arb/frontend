import {createFileRoute} from '@tanstack/react-router'
import {Profile} from "@pages/Profile";

export const Route = createFileRoute('/d/_layout/profile')({
    component: Profile,
})
