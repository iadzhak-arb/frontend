import {createRootRoute, Outlet} from '@tanstack/react-router'
import CssBaseline from "@mui/material/CssBaseline";
import {AppTheme} from "@shared/theme"
import {AnalyticsTracker} from "@shared/yandex-metrica/ui/AnalyticsTracker.tsx";


const RootLayout = () => (
    <>
        <AnalyticsTracker/>
        <AppTheme>
            <CssBaseline enableColorScheme/>
            <Outlet/>
        </AppTheme>
    </>
)

export const Route = createRootRoute({component: RootLayout})