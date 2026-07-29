import {createRootRoute, Outlet} from '@tanstack/react-router'
import CssBaseline from "@mui/material/CssBaseline";
import {AppTheme} from "@shared/theme"


const RootLayout = () => (
    <>
        <AppTheme>
            <CssBaseline enableColorScheme/>
            <Outlet/>
        </AppTheme>
    </>
)

export const Route = createRootRoute({component: RootLayout})