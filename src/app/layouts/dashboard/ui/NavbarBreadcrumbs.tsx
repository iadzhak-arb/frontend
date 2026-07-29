import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, {breadcrumbsClasses} from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import {mainListItems} from '../config/menu.tsx'
import {useRouterState} from "@tanstack/react-router";

const StyledBreadcrumbs = styled(Breadcrumbs)(({theme}) => ({
    margin: theme.spacing(1, 0),
    [`& .${breadcrumbsClasses.separator}`]: {
        color: (theme.vars || theme).palette.action.disabled,
        margin: 1,
    },
    [`& .${breadcrumbsClasses.ol}`]: {
        alignItems: 'center',
    },
}));

export default function NavbarBreadcrumbs() {
    const router = useRouterState();
    const current = mainListItems.find((item) => item.to === router.location.pathname);
    return (
        <StyledBreadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextRoundedIcon fontSize="small"/>}
        >
            <Typography variant="body1">Гавное</Typography>
            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                {current?.text}
            </Typography>
        </StyledBreadcrumbs>
    );
}
