import {createFileRoute} from '@tanstack/react-router'
import {Profile} from "@pages/profile";

export const Route = createFileRoute('/d/_layout/profile')({
    component: Profile,
})
