import {createRoot} from 'react-dom/client'
import {RouterProvider, createRouter} from '@tanstack/react-router'
import {routeTree} from './routeTree.gen'
import '@shared/global.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {NotFound} from "@pages/NotFound";


const router = createRouter({
    routeTree,
    defaultNotFoundComponent: NotFound
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
        }
    }
})

createRoot(document.getElementById('root')!).render(
    <>

        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </>
)
