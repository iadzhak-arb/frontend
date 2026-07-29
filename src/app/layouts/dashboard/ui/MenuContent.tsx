import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import {Link as RouterLink, useRouterState} from '@tanstack/react-router'
import {mainListItems, secondaryListItems} from '../config/menu.tsx'
import Divider from "@mui/material/Divider";


export default function MenuContent() {
    const router = useRouterState();
    return (
        <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
            <Stack>
                <List dense>
                    {mainListItems.map((item, index) => (
                        <ListItem key={index} disablePadding sx={{display: 'block'}}>
                            <ListItemButton selected={item.to === router.location.pathname} component={RouterLink}
                                            to={item.to}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List dense>
                    {secondaryListItems.map((item, index) => (
                        <ListItem key={index} disablePadding sx={{display: 'block'}}>
                            <ListItemButton selected={item.to === router.location.pathname} component={RouterLink}
                                            to={item.to}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Stack>

        </Stack>
    );
}
