import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import DataSaverOffRoundedIcon from '@mui/icons-material/DataSaverOffRounded';
import {keyframes} from "@emotion/react";


const swing = keyframes`
    0% {
        transform: rotate(-10deg);
    }
    50% {
        transform: rotate(10deg);
    }
    100% {
        transform: rotate(-10deg);
    }
`;

export default function Features({id}: { id: string }) {

    return (
        <Box
            id={id}
            sx={{width: '100%'}}

        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: {xs: 8, sm: 12},
                    pb: {xs: 8, sm: 12},
                }}
            >
                <Stack direction={{xs: "column", sm: "row"}} sx={{alignItems: 'center', width: '100%'}}>
                    <Box sx={{flexGrow: 1}}>
                        <DataSaverOffRoundedIcon
                            color="primary"
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'block',
                                opacity: 0.7,
                                animation: `${swing} 4s ease-in-out infinite`,
                                transformOrigin: 'center center', // Покачивание «от низа» выглядит естественнее
                            }}
                        />
                    </Box>
                    <Box sx={{flexGrow: 2}}>
                        <Stack spacing={5} sx={{mr: {sm: '10%', md: '20%'}}}>
                            <Typography
                                component="h2"
                                variant="h4"
                                align="right"
                                gutterBottom
                                sx={{
                                    color: 'text.primary',
                                    textAlign: {xs: 'center', sm: 'right'},
                                    fontSize: '2rem'
                                }}
                            >
                                Статистика платформы
                            </Typography>
                            <Stack>
                                <Typography variant="body1"
                                            sx={{
                                                fontSize: "1.2rem",
                                                textAlign: {xs: 'center', sm: 'right'},
                                                display: 'inline'
                                            }}
                                            gutterBottom
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            display: 'inline',
                                            fontSize: "1.6rem",
                                            fontWeight: 'bold',
                                        }}>
                                        5&nbsp;
                                    </Typography>
                                    Подключённых бирж
                                </Typography>
                                <Typography variant="body1"
                                            sx={{fontSize: "1.2rem", textAlign: {xs: 'center', sm: 'right'},}}
                                            gutterBottom>
                                    Отслеживаемых торговых пар - <b>[X]</b>
                                </Typography>
                                <Typography variant="body1"
                                            sx={{fontSize: "1.2rem", textAlign: {xs: 'center', sm: 'right'},}}
                                            gutterBottom>
                                    Прибыльных связок - <b>[X]</b>
                                </Typography>
                                <Typography variant="body1"
                                            sx={{fontSize: "1.2rem", textAlign: {xs: 'center', sm: 'right'},}}
                                            gutterBottom>
                                    Среднее время обновления связки - <b>[X]</b>
                                </Typography>

                            </Stack>

                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
