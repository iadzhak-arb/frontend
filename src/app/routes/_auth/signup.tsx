import {createFileRoute} from '@tanstack/react-router'
import {SignUp} from "@pages/signup";

export const Route = createFileRoute('/_auth/signup')({
    component: SignUp,
})

