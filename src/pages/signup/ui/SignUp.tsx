import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Link as RouterLink, useNavigate} from "@tanstack/react-router"
import {useLogin, useRegistration} from "@features/user/auth.ts";
import type {ApiError} from "@shared/api/client.ts";
import type {SyntheticEvent} from "react";


export function SignUp() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [password2Error, setPassword2Error] = React.useState(false);
    const [password2ErrorMessage, setPassword2ErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [error, setError] = React.useState('');

    const registration = useRegistration();
    const login = useLogin();
    const navigate = useNavigate();

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const password2 = document.getElementById('password2') as HTMLInputElement;
        const name = document.getElementById('name') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Неккоректный формат email.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 8) {
            setPasswordError(true);
            setPasswordErrorMessage('Минимальная длина пароля 8 знаков.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (password.value != password2.value) {
            setPassword2Error(true);
            setPassword2ErrorMessage('Пароли не совпадают.');
            isValid = false;
        } else {
            setPassword2Error(false);
            setPassword2ErrorMessage('');
        }


        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Обязательное поле.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }


        return isValid;
    };

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (nameError || emailError || passwordError || password2Error) {
            return;
        }
        const form = new FormData(event.currentTarget);
        const data = {
            first_name: form.get('name') as string,
            email: form.get('email') as string,
            password1: form.get('password') as string,
            password2: form.get('password2') as string
        };
        registration.mutate(data, {
            onSuccess: () => {
                login.mutate({
                    email: data.email,
                    password: data.password1
                }, {
                    onSuccess: () => navigate({to: '/'})
                })

            },
            onError: (error) => {
                const apiError = error as unknown as ApiError;
                setError(apiError?.data?.non_field_errors)
                if (apiError?.data?.email) {
                    setEmailError(true)
                    setEmailErrorMessage(apiError.data.email)
                }
                if (apiError?.data?.password1) {
                    setPasswordError(true)
                    setPasswordErrorMessage(apiError.data.password1)
                }
                if (apiError?.data?.password2) {
                    setPassword2Error(true)
                    setPassword2ErrorMessage(apiError.data.password2)
                }
                if (apiError?.data?.first_name) {
                    setNameError(true)
                    setNameErrorMessage(apiError.data.first_name)
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
                    <FormLabel htmlFor="name">Имя</FormLabel>
                    <TextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        placeholder="John"
                        error={nameError}
                        helperText={nameErrorMessage}
                        color={nameError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        required
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
                <FormControl>
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
                <FormControl>
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
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                    label="Получать информацию об обновлениях по почте."
                />
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
                        to={'/auth/'}
                    >
                        Войти
                    </Link>
                </Typography>
            </Box>
        </>
    );
}
