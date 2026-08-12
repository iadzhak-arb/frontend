import {Avatar, Button, Box, Container, Stack, Typography, Divider} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TimelineIcon from '@mui/icons-material/Timeline';
import {StyledBox} from "@pages/main/ui/StyledBox.tsx";
import {Link as RouterLink} from "@tanstack/react-router";
import {pathDemo, pathSignUp} from "@shared/config.ts";
import {Fragment} from "react";


const features = [
    {
        icon: <SearchIcon sx={{fontSize: "1.6rem"}}/>,
        text: 'Поиск связок спот-спот, спот-фьючерс, фьючерс-спот, фьючерс-фьючерс. Фьючерсы: бессрочные и срочные (без срока и со сроком истечения).'
    },
    {
        icon: <TimelineIcon sx={{fontSize: "1.6rem"}}/>,
        text: 'Смотрите, как доходность связки менялась со временем: пики, просадки и тренды. Принимайте решения на основе данных, а не интуиции.'
    }
]

export default function Hero({id}: { id: string }) {
    return (
        <Box
            id={id}
            sx={(theme) => ({
                width: '100%',
                backgroundRepeat: 'no-repeat',

                backgroundImage:
                    'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
                ...theme.applyStyles('dark', {
                    backgroundImage:
                        'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
                }),
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: {xs: 14, sm: 20},
                    pb: {xs: 8, sm: 12},
                }}
            >
                <Stack
                    direction={{xs: 'column', md: "row"}}
                    spacing={3}
                    useFlexGap
                    sx={{alignItems: 'center', width: {xs: '100%', sm: '100%'}}}
                >
                    <Stack spacing={5}>
                        <Typography
                            variant="h1"
                            sx={{
                                display: 'inline',
                                flexDirection: {xs: 'column', sm: 'row'},
                                alignItems: 'center',
                                textAlign: {xs: 'center', md: 'start'},
                                fontSize: 'clamp(2rem, 7vw, 2.8rem)',
                            }}
                        >
                            <Typography
                                component="span"
                                variant="h1"
                                sx={(theme) => ({
                                    fontSize: 'inherit',
                                    color: 'primary.main',
                                    ...theme.applyStyles('dark', {
                                        color: 'primary.light',
                                    }),
                                })}
                            >
                                Инструменты&nbsp;
                            </Typography>
                            для поиска и анализа арбитражных
                            связок
                        </Typography>
                        {features.map((f, i, arr) => (
                            <Fragment key={i}>
                                <Stack direction={{sm: "row"}} spacing={2} sx={{alignItems: "center"}}>
                                    <Avatar sx={(theme) => ({
                                        bgcolor: 'primary.main',
                                        mb: 3,
                                        ...theme.applyStyles('dark', {bgcolor: 'primary.light', color: 'white'})
                                    })}>
                                        {f.icon}
                                    </Avatar>
                                    <Typography variant="body1"
                                                sx={{fontSize: "1rem", textAlign: {xs: 'center', sm: 'left'},}}>
                                        {f.text}
                                    </Typography>

                                </Stack>
                                {i < arr.length - 1 && <Divider/>}
                            </Fragment>
                        ))}
                        <Stack direction={{xs: 'column', md: "row"}} spacing={{xs: 2, md: 0}}
                               sx={{justifyContent: 'space-evenly'}}>
                            <Button
                                color='inherit'
                                variant='contained'
                                component={RouterLink}
                                to={pathSignUp}
                            >
                                3 дня бесплатно
                            </Button>
                            <Button
                                color='inherit'
                                variant='contained'
                                component={RouterLink}
                                to={pathDemo}
                            >
                                Демо
                            </Button>
                            <Button
                                color='primary'
                                variant='contained'
                                component={RouterLink}
                                to={pathSignUp}
                            >
                                Регистрация
                            </Button>
                        </Stack>

                    </Stack>
                    <StyledBox>
                        <img src="/img/table-preview.png" width="100%" alt="Поиск арбитражных связок"/>
                    </StyledBox>
                </Stack>
            </Container>
        </Box>
    );
}
