import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormLabel,
    FormControl,
    Link,
    TextField,
    Typography
} from '@mui/material';
import {Link as RouterLink, useNavigate} from "@tanstack/react-router"
import {useRegistration} from "@features/user/auth.ts";
import type {ApiError} from "@shared/api/client.ts";
import type {SyntheticEvent} from "react";
import {useValidation} from "../model/validation.ts";


const Agreement = ({rule, handleCheckedRule, ruleErrorMessage}) => {
    const label = (
        <Typography variant="caption" sx={{mt: 1}}>
            Нажимая кнопку 'Зарегистрироваться', я даю своё согласие
            на <Link target="_blank">обработку персональных данных</Link> и
            принимаю условия <Link target="_blank">публичной оферты</Link>.
        </Typography>
    )
    return (
        <>
            <FormControlLabel
                control={<Checkbox checked={rule} onChange={handleCheckedRule} color="primary"/>}
                label={label}
                sx={{alignItems: 'flex-start'}}
            />
            {ruleErrorMessage && <Typography variant="caption" color="error">{ruleErrorMessage}</Typography>}
        </>
    )
}

export function SignUp() {
    const {
        emailError,
        emailErrorMessage,
        password2Error,
        password2ErrorMessage,
        passwordError,
        passwordErrorMessage,
        rule,
        ruleErrorMessage,
        error,
        setError,
        setPasswordError,
        setPasswordErrorMessage,
        setEmailError,
        setEmailErrorMessage,
        handleCheckedRule,
        validateInputs

    } = useValidation();
    const registration = useRegistration();
    const navigate = useNavigate();


    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!rule || emailError || passwordError || password2Error) {
            return;
        }
        const form = new FormData(event.currentTarget);
        const data = {
            first_name: form.get('first_name') as string,
            last_name: form.get('last_name') as string,
            email: form.get('email') as string,
            password: form.get('password') as string,
        };
        registration.mutate(data, {
            onSuccess: () => {
                navigate({to: '/signin'})
            },
            onError: (error) => {
                const apiError = error as unknown as ApiError;
                console.log(apiError);
                setError(apiError?.data?.detail.non_fields)
                if (apiError?.data?.detail.email) {
                    setEmailError(true)
                    setEmailErrorMessage(apiError.data.detail.email)
                }
                if (apiError?.data?.detail.password) {
                    setPasswordError(true)
                    setPasswordErrorMessage(apiError.data.detail.password)
                }
                return;
            }
        })
    };

    return (
        <>
            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
            >
                Регистрация
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{display: 'flex', flexDirection: 'column', gap: 2}}
            >
                <FormControl>
                    <FormLabel htmlFor="first_name">Имя</FormLabel>
                    <TextField
                        autoComplete="name"
                        name="first_name"
                        fullWidth
                        id="first_name"
                        placeholder="John"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="last_name">Фамилия</FormLabel>
                    <TextField
                        autoComplete="family-name"
                        name="last_name"
                        fullWidth
                        id="last_name"
                        placeholder="Smith"
                    />
                </FormControl>
                <FormControl required>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        fullWidth
                        id="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        error={emailError}
                        helperText={emailErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl required>
                    <FormLabel htmlFor="password">Пароль</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl required>
                    <FormLabel htmlFor="password2">Повторите пароль</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password2"
                        placeholder="••••••"
                        type="password"
                        id="password2"
                        autoComplete="new-password"
                        variant="outlined"
                        error={password2Error}
                        helperText={password2ErrorMessage}
                        color={password2Error ? 'error' : 'primary'}
                    />
                </FormControl>
                {error && <Typography variant="caption" color="error">{error}</Typography>}
                <Agreement ruleErrorMessage={ruleErrorMessage} rule={rule} handleCheckedRule={handleCheckedRule}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                >
                    Зарегистрироваться
                </Button>
            </Box>
            <Divider>
                <Typography sx={{color: 'text.secondary'}}>или</Typography>
            </Divider>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <Typography sx={{textAlign: 'center'}}>
                    Уже есть аккаунт?{' '}
                    <Link
                        variant="body2"
                        sx={{alignSelf: 'center'}}
                        component={RouterLink}
                        to={'/signin'}
                    >
                        Войти
                    </Link>
                </Typography>
            </Box>
        </>
    );
}
