import {Link, Snackbar, Stack, Typography} from '@mui/material';
import {useState} from "react";
import {StyledButton} from "./StyledButton.tsx";




export function UserAgree() {
    const [open, setOpen] = useState(true);

    const handleAccept = () => console.log("Acepted!");
    const handleRefuse = () => console.log("Refused!");

    const message = (
        <>
            <Stack direction="row" spacing={2}>
                <Stack direction="column">
                    <b>Мы используем cookies</b>
                    <Typography variant="caption">
                        Яндекс.Метрика — аналитика трафика.&nbsp;
                        <Link
                            href='#'
                            sx={(theme)=>({
                                color: theme.palette.primary.main
                            })}
                        >
                            Политика cookies.
                        </Link>
                    </Typography>
                </Stack>
                <StyledButton
                    size="small"
                    onClick={handleAccept}
                >
                    Принять
                </StyledButton>
                <StyledButton
                    size="small"
                    onClick={handleRefuse}
                >
                    Отклонить
                </StyledButton>
            </Stack>
        </>
    )

    return (
        <Snackbar
            open={open}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            message={message}
        />
    )
}