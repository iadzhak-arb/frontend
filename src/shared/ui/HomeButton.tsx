import HomeIcon from '@mui/icons-material/Home';
import IconButton from "@mui/material/IconButton";
import {Link as RouterLink} from "@tanstack/react-router";

export function HomeButton() {
    return (
        <IconButton size="small" component={RouterLink} to={"/"}>
            <HomeIcon/>
        </IconButton>
    )
}