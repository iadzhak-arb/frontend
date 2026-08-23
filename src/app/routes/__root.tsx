import {createRootRoute, Outlet} from '@tanstack/react-router'
import CssBaseline from "@mui/material/CssBaseline";
import {AppTheme} from "@shared/theme"
import {AnalyticsTracker} from "@shared/yandex-metrica/ui/AnalyticsTracker.tsx";
import {UserAgree} from "@shared/user-agree/ui/UserAgree.tsx";
import {YandexMetrica} from "@shared/yandex-metrica/ui/YandexMetrica.tsx";
import {useCookiesAgree} from "@shared/user-agree/model/agree.ts";


const RootLayout = () => {
    const {agree, changeAgree} = useCookiesAgree();

    return (
        <>
            <YandexMetrica agree={agree}/>
            <AnalyticsTracker/>
            <AppTheme>
                <CssBaseline enableColorScheme/>
                <Outlet/>
                <UserAgree agree={agree} changeAgree={changeAgree}/>
            </AppTheme>
        </>
    )
};

export const Route = createRootRoute({component: RootLayout})