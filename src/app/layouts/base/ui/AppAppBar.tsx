import {Box, AppBar, Button, Container, Divider, MenuItem, Drawer, MenuList, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {ColorModeIconDropdown} from '@shared/theme'
import {SitemarkIcon} from '@shared/ui';
import {useUser} from "@features/user/auth.ts";
import {menu} from "@shared/config.ts"
import {useState} from "react";
import {ButtonDashboard, ButtonLogout, ButtonSignIn, ButtonSignUp} from "./UserButtons.tsx";
import {StyledToolbar} from "./StyledToolbar.tsx";
import {Link as RouterLink, useLocation} from "@tanstack/react-router";


export default function AppAppBar() {
    const [open, setOpen] = useState(false);
    const user = useUser();
    const location = useLocation();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', px: 0}}>
                        <SitemarkIcon/>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            {menu.map((value) => (
                                <Button
                                    variant="text"
                                    color="info"
                                    size="small"
                                    key={value.name}
                                    component={RouterLink}
                                    to={value.path}
                                    sx={{
                                        fontWeight: location.href == value.path ? 'bold' : 'normal'
                                    }}
                                >
                                    {value.name}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        {
                            !user.data &&
                            <>
                                <ButtonSignIn/>
                                <ButtonSignUp/>
                            </>
                        }

                        {
                            user.data &&
                            <>
                                <Typography variant="caption" color="textDisabled">{user.data?.email}</Typography>
                                <ButtonLogout/>
                                <ButtonDashboard/>
                            </>
                        }
                        <ColorModeIconDropdown/>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}, gap: 1}}>
                        <ColorModeIconDropdown size="medium"/>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                            slotProps={{
                                paper: {
                                    sx: {
                                        top: 'var(--template-frame-height, 0px)',
                                    },
                                },
                            }}
                        >
                            <Box sx={{p: 2, backgroundColor: 'background.default'}}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon/>
                                    </IconButton>
                                </Box>
                                <MenuList>
                                    {menu.map((value) => (
                                        <MenuItem
                                            key={value.name}
                                            component={RouterLink}
                                            to={value.path}
                                            onClick={toggleDrawer(false)}
                                            sx={{
                                                fontWeight: location.href == value.path ? 'bold' : 'normal'
                                            }}
                                        >
                                            {value.name}
                                        </MenuItem>
                                    ))}
                                    <Divider sx={{my: 3}}/>
                                    {
                                        !user.data &&
                                        <>
                                            <MenuItem>
                                                <ButtonSignUp size="medium" fullWidth/>
                                            </MenuItem>
                                            <MenuItem>
                                                <ButtonSignIn variant="outlined" size="medium" fullWidth/>
                                            </MenuItem>
                                        </>
                                    }
                                    {
                                        user.data &&
                                        <>
                                            <MenuItem>
                                                <ButtonDashboard size="medium" fullWidth/>
                                            </MenuItem>
                                            <MenuItem>
                                                <ButtonLogout variant="outlined" size="medium" fullWidth/>
                                            </MenuItem>
                                        </>
                                    }
                                </MenuList>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
