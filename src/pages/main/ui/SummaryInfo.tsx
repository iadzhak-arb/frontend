import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {useSummary} from "@features/arb/useSummary.ts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {ListItemAvatar} from "@mui/material";
import Divider from "@mui/material/Divider";
import DataSaverOffRoundedIcon from '@mui/icons-material/DataSaverOffRounded';

const StatListItem = ({value, title, text}: { value: number, title: string, text: string }) => (
    <ListItem sx={{display: {xs: 'block', sm: 'flex'}}}>
        <ListItemAvatar sx={{width: '25%'}}>
            <Typography variant="h1" align="right" sx={{mr: 6}}>
                <b>{value}</b>
            </Typography>
        </ListItemAvatar>
        <ListItemText
            primary={
                <Typography variant="h4">
                    <b>{title}</b>
                </Typography>
            }
            secondary={text}
        />
    </ListItem>
)

export default function SummaryInfo() {
    const {data} = useSummary();
    const exchanges = data?.data?.exchanges as number;
    const symbols = data?.data?.symbols as number;
    const profit_deals = data?.data?.profit_deals as number;
    return (
        <Box
            sx={{
                pt: {xs: 4, sm: 12},
                pb: {xs: 8, sm: 16},
                color: 'white',
                bgcolor: 'grey.900',
                overflow: 'hidden',
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: {xs: 3, sm: 6},
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: {xs: 20, sm: -100},      // отступ сверху
                        left: {xs: 20, sm: -200},    // отступ слева
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <DataSaverOffRoundedIcon
                        sx={{
                            fontSize: {xs: 480, sm: 640}, // размер под экран
                            color: 'white',        // цвет иконки (можно заменить на 'white')
                            opacity: 0.05,


                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: {sm: '100%', md: '60%'},
                        textAlign: {sm: 'left', md: 'center'},
                    }}
                >
                    <List>


                        <StatListItem
                            value={symbols}
                            title="Торговых пар"
                            text="Чем больше пар в мониторинге, тем выше шанс найти арбитражную возможность под ваш
                            объём и стратегию. В том числе по редким парам, где ликвидность даёт хорошую маржу."
                        />
                        <Divider sx={{mt: 2, mb: 1, display: {xs: 'block', sm: 'none'}}}/>
                        <StatListItem
                            value={profit_deals}
                            title="Прибыльных связок"
                            text="Арбитражных связок с положительной* маржой доступны прямо сейчас — и
                            список обновляется в реальном времени. *с профитом 0,5 - 100%"
                        />
                        <Divider sx={{mt: 2, mb: 1, display: {xs: 'block', sm: 'none'}}}/>
                        <StatListItem
                            value={exchanges}
                            title="Подключенных бирж"
                            text="Платформа агрегирует данные с крупнейших криптобирж — вы видите максимум
                            возможностей для межбиржевого арбитража в одном окне."
                        />
                    </List>
                </Box>
            </Container>
        </Box>
    );
}
