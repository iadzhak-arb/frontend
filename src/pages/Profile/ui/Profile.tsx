import {useUser} from "@features/auth/useUser.ts";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import {useHandlers} from "../model/handlers.ts";


export function Profile() {
    const {handleSubmitData, handleSubmitPassword, error} = useHandlers();
    const user = useUser();

    return (
        <Container>
            <Typography variant="h3" sx={{mb: 5}}>Профиль</Typography>
            <Grid container spacing={7}>
                <Grid size={12}>
                    <Typography variant="h6" sx={{mb: 3}}>Мои данные</Typography>
                    <Stack spacing={2} component="form" onSubmit={handleSubmitData}>
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
                    <Box component="form" onSubmit={handleSubmitPassword}
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
                                error={!!error.new_password2}
                                helperText={error.new_password2}
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