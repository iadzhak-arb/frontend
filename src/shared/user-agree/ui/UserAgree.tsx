import {Link, Snackbar, Stack, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {StyledButton} from "./StyledButton.tsx";
import Divider from "@mui/material/Divider";
import {docsPath} from '@shared/config.ts';

const message = (

    <Stack
        direction="column"
        sx={{maxWidth: {xs: '50vw', sm: 'auto'}}}
    >
        <b>Мы используем cookies</b>
        <Typography variant="caption">
            Яндекс.Метрика для аналитики трафика
        </Typography>
        <Link
            href={docsPath.cookies}
            target="_blank"
            variant="caption"
            sx={(theme) => ({
                color: theme.palette.warning.main
            })}
        >
            Политика cookies.
        </Link>
    </Stack>
);

type Props = {
    agree: boolean | undefined;
    changeAgree: (v: boolean) => void;
}

export function UserAgree({agree, changeAgree}: Props) {
    const [open, setOpen] = useState(agree == undefined);

    useEffect(() => {
        if (agree == undefined) return;
        setOpen(false);
    }, [agree])

    const handleAccept = () => changeAgree(true);
    const handleRefuse = () => changeAgree(false);

    const action = (
        <Stack direction={{xs: "column", md: "row"}} spacing={1}>
            <StyledButton
                size="small"
                onClick={handleRefuse}
            >
                Отклонить
            </StyledButton>
            <StyledButton
                size="small"
                onClick={handleAccept}
            >
                Принять
            </StyledButton>
            <Divider sx={{display: {xs: 'none', md: 'block'}}}/>
        </Stack>
    )

    return (
        <Snackbar
            open={open}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            message={message}
            action={action}
        />
    )
}