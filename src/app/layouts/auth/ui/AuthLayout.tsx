import Stack from "@mui/material/Stack";
import {HomeButton, SitemarkIcon} from "@shared/ui";
import {AuthCard} from "./AuthCard.tsx";
import {AuthContainer} from "./AuthContainer.tsx"
import {Outlet} from "@tanstack/react-router";

export function AuthLayout() {
    return (
        <AuthContainer direction="column" sx={{justifyContent: 'space-between'}}>
            <AuthCard variant="outlined">
                <Stack direction="row" spacing={2} sx={{justifyContent: "space-between", alignItems: "baseline"}}>
                    <SitemarkIcon/>
                    <HomeButton/>
                </Stack>
                <Outlet/>
            </AuthCard>
        </AuthContainer>
    )
}