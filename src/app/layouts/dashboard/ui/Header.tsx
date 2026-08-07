import Stack from '@mui/material/Stack';
import NavbarBreadcrumbs from './NavbarBreadcrumbs.tsx';
import {ColorModeIconDropdown} from '@shared/theme';
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import {useLogout} from "@features/auth/useLogout.ts";
import {useNavigate} from "@tanstack/react-router";


export default function Header() {
    const logout = useLogout();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout.mutate(undefined, {onSuccess: () => navigate({to: '/'})});
    }
    return (
        <Stack
            direction="row"
            sx={{
                display: {xs: 'none', md: 'flex'},
                width: '100%',
                alignItems: {xs: 'flex-start', md: 'center'},
                justifyContent: 'space-between',
                maxWidth: {sm: '100%', md: '1700px'},
                pt: 1.5,
            }}
            spacing={2}
        >
            <NavbarBreadcrumbs/>
            <Stack direction="row" sx={{gap: 1}}>
                <ColorModeIconDropdown/>
                <IconButton size="small" onClick={handleLogout}>
                    <LogoutIcon/>
                </IconButton>
            </Stack>
        </Stack>
    );
}
