import {useUser} from "@features/auth/useUser.ts";
import {Stack, Typography, Container, TextField, Button, Grid, FormControl, Box, FormLabel} from "@mui/material";
import {useHandleUserChange} from "@pages/profile/model/useHandleUserChange.ts";
import {useHandlePasswordChange} from "@pages/profile/model/useHandlePasswordChange.ts";


export function Profile() {
    const changeUser = useHandleUserChange();
    const changePassword = useHandlePasswordChange();
    const user = useUser();

    return (
        <Container>
            <Typography variant="h3" sx={{mb: 5}}>Профиль</Typography>
            <Grid container spacing={7}>
                <Grid size={12}>
                    <Typography variant="h6" sx={{mb: 3}}>Мои данные</Typography>
                    <Stack spacing={2} component="form" onSubmit={changeUser.handleUserChange}>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                id="email"
                                defaultValue={user.data!.email}
                                disabled
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="first_name">Имя</FormLabel>
                            <TextField
                                defaultValue={user.data!.first_name}
                                id="first_name"
                                name="first_name"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="last_name">Фамилия</FormLabel>
                            <TextField
                                defaultValue={user.data!.last_name}
                                id="last_name"
                                name="last_name"
                            />
                        </FormControl>
                        <Button type="submit" variant="contained" size="small" sx={{width: 100}}>Сохранить</Button>
                    </Stack>
                </Grid>
                <Grid>
                    <Typography variant="h6" sx={{mb: 3}}>Сменить пароль</Typography>
                    <Box component="form" onSubmit={changePassword.handleChangePassword}
                         sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <FormControl>
                            <FormLabel htmlFor="new_password1">Новый пароль</FormLabel>
                            <TextField
                                type="password"
                                id="new_password1"
                                name="new_password1"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="new_password2">Повторите пароль</FormLabel>
                            <TextField
                                required
                                type="password"
                                id="new_password2"
                                name="new_password2"
                                error={!!changePassword.error}
                                helperText={changePassword.error}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            sx={{width: 100}}
                        >
                            Сохранить
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}