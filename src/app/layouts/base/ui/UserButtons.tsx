import {useLogout} from "@features/user/auth.ts";
import {pathDashboard, pathSignIn, pathSignUp} from "@shared/config.ts";
import {Button, type ButtonProps} from "@mui/material";
import {Link as RouterLink} from "@tanstack/react-router";

export const ButtonSignIn = (props: ButtonProps) => (
    <Button
        сolor="primary"
        variant="text"
        size="small"
        component={RouterLink}
        to={pathSignIn}
        {...props}
    >
        Войти
    </Button>
)

export const ButtonSignUp = (props: ButtonProps) => (
    <Button
        color="primary"
        variant="contained"
        size="small"
        component={RouterLink}
        to={pathSignUp}
        {...props}
    >
        Регистрация
    </Button>
)

export const ButtonLogout = (props: ButtonProps) => {
    const logout = useLogout();
    const handleClick = () => logout.mutate();
    return (
        <Button
            color="primary"
            variant="text"
            size="small"
            onClick={handleClick}
            {...props}
        >
            Выйти
        </Button>
    )
}

export const ButtonDashboard = (props: ButtonProps) => (
    <Button
        color="primary"
        variant="contained"
        size="small"
        component={RouterLink}
        to={pathDashboard}
        {...props}
    >
        Кабинет
    </Button>
)