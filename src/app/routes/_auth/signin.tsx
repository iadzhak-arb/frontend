import {createFileRoute} from '@tanstack/react-router'
import {SignIn} from '@pages/signin'

export const Route = createFileRoute('/_auth/signin')({
    component: SignIn,
})

