import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import {SitemarkIcon} from '@shared/ui';
import {Link as RouterLink} from "@tanstack/react-router";
import {Copyright} from "@shared/ui";
import {info, menu, pathGtiHub} from "@shared/config.ts";


export default function Footer() {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: {xs: 4, sm: 8},
                py: {xs: 8, sm: 10},
                textAlign: {sm: 'center', md: 'left'},
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', sm: 'row'},
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        minWidth: {xs: '100%', sm: '60%'},
                    }}
                >
                    <Box sx={{width: {xs: '100%', sm: '60%'}}}>
                        <SitemarkIcon/>
                        <Typography variant="body2" gutterBottom sx={{fontWeight: 600, mt: 2}}>
                            Арбитраж криптовалюты
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary', mb: 2}}>
                            Поогаем находить выголные сделки!
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: {xs: 'none', sm: 'flex'},
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" sx={{fontWeight: 'medium'}}>
                        Главная
                    </Typography>
                    {menu.map((value, index) => (
                        <Link
                            key={index}
                            variant="body2"
                            component={RouterLink}
                            to={value.path}
                            sx={{
                                color: 'text.secondary',
                                cursor: "pointer"
                            }}
                        >
                            {value.name}
                        </Link>
                    ))}
                </Box>
                <Box
                    sx={{
                        display: {xs: 'none', sm: 'flex'},
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" sx={{fontWeight: 'medium'}}>
                        Информация
                    </Typography>
                    {info.map((value, index) => (
                        <Link
                            key={index}
                            variant="body2"
                            component={RouterLink}
                            to={value.path}
                            sx={{
                                color: 'text.secondary',
                            }}
                        >
                            {value.name}
                        </Link>
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: {xs: 4, sm: 8},
                    width: '100%',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <div>
                    <Link
                        variant="body2"
                        href="#"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >
                        Политика конфидециальности
                    </Link>
                    <Typography sx={{display: 'inline', mx: 0.5, opacity: 0.5}}>
                        &nbsp;•&nbsp;
                    </Typography>
                    <Link
                        variant="body2"
                        href="#"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >
                        Публичная оферта
                    </Link>
                    <Copyright/>
                </div>
                <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{justifyContent: 'left', color: 'text.secondary'}}
                >
                    <IconButton
                        color="inherit"
                        size="small"
                        href={pathGtiHub}
                        target="_blank"
                        aria-label="GitHub"
                        sx={{alignSelf: 'center'}}
                    >
                        <GitHubIcon/>
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    );
}
