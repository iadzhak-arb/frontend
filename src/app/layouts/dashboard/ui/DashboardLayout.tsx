import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './AppNavbar.tsx';
import Header from './Header.tsx';
import SideMenu from './SideMenu.tsx';
import {Outlet, useNavigate} from "@tanstack/react-router";
import {useUser} from "@features/auth/useUser.ts";


export function DashboardLayout() {
    const user = useUser();
    const navigate = useNavigate();

    // Пока идет загрузка, показываем null или спиннер
    if (user.isFetching) {
        return null; // или <div>Загрузка...</div>
    }

    // Если не авторизован - перенаправляем
    if (!user.data) {
        navigate({to: '/'})
        return null;
    }

    return (
        <Box sx={{display: 'flex'}}>
            <SideMenu/>
            <AppNavbar/>
            {/* Main content */}
            <Box
                component="main"
                sx={(theme) => ({
                    flexGrow: 1,
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: 'auto',
                })}
            >
                <Stack
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        mx: 3,
                        pb: 5,
                        mt: {xs: 8, md: 0},

                    }}
                >
                    <Header/>
                    <Outlet/>
                </Stack>
            </Box>
        </Box>
    );
}
