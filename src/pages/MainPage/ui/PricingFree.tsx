import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {Link as RouterLink} from "@tanstack/react-router";
import {pathSignUp} from "@shared/config.ts";

const tiers = [
    {
        title: 'Полный доступ',
        per: '',
        subheader: 'Акция',
        price: 0,
        description: [
            'Поиск связок',
            'Анализ истории',
            'Онлайн трекер'
        ],
        buttonText: 'Регстрация',
        buttonVariant: 'contained',
        buttonColor: 'secondary',
    },
];

export default function PricingFree({id}: { id: string }) {
    return (
        <Container
            id={id}
            sx={{
                pt: {xs: 4, sm: 12},
                pb: {xs: 8, sm: 16},
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: {xs: 3, sm: 6},
            }}
        >
            <Box
                sx={{
                    width: {sm: '100%', md: '60%'},
                    textAlign: {sm: 'left', md: 'center'},
                }}
            >
                <Typography
                    component="h2"
                    variant="h4"
                    gutterBottom
                    sx={{color: 'text.primary'}}
                >
                    Цены
                </Typography>
                <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    Полный доступ ко всем инструментам — бесплатно прямо сейчас.<br/>Период бесплатного доступа скоро
                    завершится.
                </Typography>
            </Box>
            <Grid
                container
                spacing={3}
                sx={{alignItems: 'center', justifyContent: 'center', width: '100%'}}
            >
                {tiers.map((tier) => (
                    <Grid
                        size={{xs: 12, sm: tier.title === 'Неделя' ? 12 : 6, md: 5}}
                        key={tier.title}
                    >
                        <Card
                            sx={[
                                {
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                },
                                tier.title === 'Полный доступ' &&
                                ((theme) => ({
                                    border: 'none',
                                    background:
                                        'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
                                    boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                                    ...theme.applyStyles('dark', {
                                        background:
                                            'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
                                        boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                                    }),
                                })),
                            ]}
                        >
                            <CardContent>
                                <Box
                                    sx={[
                                        {
                                            mb: 1,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: 2,
                                        },
                                        tier.title === 'Полный доступ'
                                            ? {color: 'grey.100'}
                                            : {color: ''},
                                    ]}
                                >
                                    <Typography component="h3" variant="h6">
                                        {tier.title}
                                    </Typography>
                                    {tier.title === 'Полный доступ' && (
                                        <Chip icon={<AutoAwesomeIcon/>} label={tier.subheader}/>
                                    )}
                                </Box>
                                <Box
                                    sx={[
                                        {
                                            display: 'flex',
                                            alignItems: 'baseline',
                                        },
                                        tier.title === 'Полный доступ'
                                            ? {color: 'grey.50'}
                                            : {color: null},
                                    ]}
                                >
                                    <Typography component="h3" variant="h2">
                                        ${tier.price}
                                    </Typography>
                                    <Typography component="h3" variant="h6">
                                        &nbsp; {tier.per}
                                    </Typography>
                                </Box>
                                <Divider sx={{my: 2, opacity: 0.8, borderColor: 'divider'}}/>
                                {tier.description.map((line) => (
                                    <Box
                                        key={line}
                                        sx={{py: 1, display: 'flex', gap: 1.5, alignItems: 'center'}}
                                    >
                                        <CheckCircleRoundedIcon
                                            sx={[
                                                {
                                                    width: 20,
                                                },
                                                tier.title === 'Полный доступ'
                                                    ? {color: 'primary.light'}
                                                    : {color: 'primary.main'},
                                            ]}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            component={'span'}
                                            sx={[
                                                tier.title === 'Полный доступ'
                                                    ? {color: 'grey.50'}
                                                    : {color: null},
                                            ]}
                                        >
                                            {line}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                                    color={tier.buttonColor as 'primary' | 'secondary'}
                                    component={RouterLink}
                                    to={pathSignUp}
                                >
                                    {tier.buttonText}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
