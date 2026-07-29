import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {type SyntheticEvent, useState} from "react";


const ITEMS = [
    {
        title: 'Я новичок в арбитраже. С чего мне начать на вашей платформе?',
        text: 'Начните с пробного режима он открывается после регистрации и доступен 3 дня. За это время поищите арбитражные связки и посмотрите их историю: обратите внимание, как часто меняется направление связки. Это поможет понять, насколько она «живая» и стоит ли тратить на неё время или маржа быстро пропадает и связка «зависает».'
    },
    {
        title: 'Чем личный кабинет лучше демо‑режима?',
        text: 'В личном кабинете после регистрации вы получаете полный доступ ко всем связкам (без ограничения по марже и количеству), можете гибко фильтровать их под свою стратегию, а также просматривать недавнюю историю изменения профита по каждой связке чтобы оценить, насколько она стабильна.'
    },
    {
        title: 'Как платформа находит арбитражные связки?',
        text: 'Мы не просто берём последние котировки: в реальном времени считываем стаканы цен с криптобирж. Расчёт строится на актуальных ценах и объёмах «в глубину» стакана так мы определяем максимально выгодные связки и сразу показываем ожидаемый профит и доступные объёмы для арбитража.'
    },
    {
        title: 'Почему важно, что расчёт идёт по стаканам, а не по последней цене?',
        text: 'Последняя цена не учитывает объёмы: крупная сделка может «съесть» ликвидность и сильно ухудшить итоговую маржу. Наш расчёт по стакану показывает реальный профит с учётом того, сколько можно купить/продать по выгодным ценам, это помогает избежать иллюзорных связок.',
    },
    {
        title: 'Что значит «история изменения профита» и какая часть истории доступна?',
        text: 'История показывает, как менялся расчётный профит по связке за время наблюдения это помогает понять, насколько связка устойчива и не «схлопывается» ли маржа быстро. В личном кабинете доступна только недавняя история этого достаточно, чтобы оценить текущую динамику без перегрузки данными.'
    },
    {
        title: 'Учитываются ли комиссии бирж при расчёте профита?',
        text: 'Нет, комиссии не учитываются в расчётном профите. У разных трейдеров тарифы отличаются, плюс на многих биржах действует динамическое формирование комиссий (в зависимости от объёма, уровня VIP и т.п.). Поэтому мы показываем «чистую» маржу по ценам в стаканах — а вы можете подставить свои комиссии и оценить реальную доходность связки.'
    },

]

export default function FAQ({id}: { id: string }) {
    const [expanded, setExpanded] = useState<string[]>([]);

    const handleChange =
        (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(
                isExpanded
                    ? [...expanded, panel]
                    : expanded.filter((item) => item !== panel),
            );
        };

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
            <Typography
                component="h2"
                variant="h4"
                sx={{
                    color: 'text.primary',
                    width: {sm: '100%', md: '60%'},
                    textAlign: {sm: 'left', md: 'center'},
                }}
            >
                Частые вопросы
            </Typography>
            <Box sx={{width: '100%'}}>
                {ITEMS.map((item, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded.includes(`panel${index}`)}
                        onChange={handleChange(`panel${index}`)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls={`panel${index}d-content`}
                            id={`panel${index}d-header`}
                        >
                            <Typography component="span" variant="subtitle2">
                                {item.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{maxWidth: {sm: '100%', md: '70%'}}}
                            >
                                {item.text}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Container>
    );
}
