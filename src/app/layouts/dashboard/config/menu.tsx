import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PersonIcon from '@mui/icons-material/Person';


export const mainListItems = [
    {text: 'Связки', icon: <HomeRoundedIcon/>, to: '/d'},
    {text: 'История', icon: <AnalyticsRoundedIcon/>, to: '/d/history'},
];

export const secondaryListItems = [
    {text: 'Профиль', icon: <PersonIcon/>, to: '/d/profile'},
];