import {Avatar, Box, Container, Stack, Typography} from '@mui/material';
import {StyledBox} from "./StyledBox.tsx";
import {Table} from "./Table.tsx"
import RefreshIcon from '@mui/icons-material/Refresh';
import PercentIcon from '@mui/icons-material/Percent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const demoFeatures = [
    {
        text: 'Автообновление каждые 30 сек.',
        icon: <RefreshIcon/>
    },
    {
        text: 'Профит до 0.5%',
        icon: <PercentIcon/>
    },
    {
        text: 'Стратегии: спот-спот или спот-фьючерс',
        icon: <TrendingUpIcon/>
    },
]


export function DemoPage() {
    return (
        <Box
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
                    spacing={2}
                    useFlexGap
                    sx={{alignItems: 'center', width: {xs: '100%', sm: '70%'}}}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: {xs: 'column', sm: 'row'},
                            alignItems: 'center',
                            fontSize: 'clamp(2rem, 7vw, 2.8rem)',
                        }}
                    >
                        Арбитражные&nbsp;
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
                            связки
                        </Typography>
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            width: {sm: '100%', md: '80%'},
                        }}
                    >
                        Реальные данные, частичный функционал.
                    </Typography>
                </Stack>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={4}
                    sx={{
                        width: '100%',
                        justifyContent: 'space-around',
                        mt: 5,
                        mb: 5
                    }}
                >
                    {
                        demoFeatures.map((f, i) => (
                            <Stack
                                key={i}
                                direction="row"
                                spacing={2}
                                sx={{alignItems: "center"}}>
                                <Avatar sx={(theme) => ({
                                    bgcolor: 'primary.main',
                                    mb: 3,
                                    ...theme.applyStyles('dark', {bgcolor: 'primary.light', color: 'white'})
                                })}>
                                    {f.icon}
                                </Avatar>
                                <Typography variant="body1" sx={{fontSize: '1rem'}}>{f.text}</Typography>
                            </Stack>
                        ))
                    }
                </Stack>
                <StyledBox>
                    <Table/>
                </StyledBox>

            </Container>
        </Box>
    )
}