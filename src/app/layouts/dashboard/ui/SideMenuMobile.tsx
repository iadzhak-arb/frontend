import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, {drawerClasses} from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuContent from './MenuContent.tsx';
import {useLogout, useUser} from "@features/user/auth.ts";
import PersonIcon from '@mui/icons-material/Person';

interface SideMenuMobileProps {
    open: boolean | undefined;
    toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({open, toggleDrawer}: SideMenuMobileProps) {
    const user = useUser();
    const name = `${user.data?.first_name} ${user.data?.last_name}`
    const logout = useLogout();
    const handleLogout = () => {
        logout.mutate();
    }
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                [`& .${drawerClasses.paper}`]: {
                    backgroundImage: 'none',
                    backgroundColor: 'background.paper',
                },
            }}
        >
            <Stack
                sx={{
                    maxWidth: '70dvw',
                    height: '100%',
                }}
            >
                <Stack direction="row" sx={{p: 2, pb: 0, gap: 1}}>
                    <Stack
                        direction="row"
                        sx={{gap: 1, alignItems: 'center', flexGrow: 1, p: 1}}
                    >
                        <PersonIcon sx={{mr: 2}}/>
                        <Typography align="right" component="p" variant="h6">
                            {name}
                        </Typography>

                    </Stack>

                </Stack>
                <Typography align="right" variant="caption" sx={{mt: -1, mr: 3, mb: 2}}>{user.data?.email}</Typography>
                <Divider/>
                <Stack>
                    <MenuContent/>
                    <Divider/>
                    <Stack sx={{p: 2}}>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<LogoutRoundedIcon/>}
                            onClick={handleLogout}
                        >
                            Выйти
                        </Button>
                    </Stack>
                </Stack>

            </Stack>
        </Drawer>
    );
}
