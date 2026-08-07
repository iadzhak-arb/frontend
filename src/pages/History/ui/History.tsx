import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {SearchArbitrage} from "./SearchArbitrage.tsx"
import {ChartOpenClose} from "./ChartOpenClose.tsx"
import {useHistory} from "../api/data.ts";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Skeleton} from "@mui/material";
import {useSearch} from "@tanstack/react-router";
import {useEffect} from "react";
import Box from "@mui/material/Box";


function formatDate(input: number) {
    const d = new Date(input * 1000);
    return Math.floor(d.getTime() / 1000);
}


function dataAdapter(data) {
    return data
        .map(({timestamp, margin}) => ({time: formatDate(timestamp), value: margin}))
        .sort((a, b) => a.time - b.time);
}

export function History() {
    const intial = useSearch({from: '/d/_layout/history'});
    const {data, params, setParams} = useHistory();

    const open_label = `${params.buy_symbol_id} ${params.buy_exchange_name} ⇒ ${params.sell_symbol_id} ${params.sell_exchange_name}`
    const close_label = `${params.sell_symbol_id} ${params.sell_exchange_name} ⇒ ${params.buy_symbol_id} ${params.buy_exchange_name}`

    useEffect(() => {
        if (
            intial.buy_exchange_name &&
            intial.sell_exchange_name &&
            intial.buy_symbol_id &&
            intial.sell_symbol_id
        ) setParams(intial)
    }, []);

    const handleChange = (v) => {
        setParams({
            buy_symbol_id: v.symbol_sell_id,
            buy_exchange_name: v.exchange_buy_name,
            sell_symbol_id: v.symbol_buy_id,
            sell_exchange_name: v.exchange_sell_name
        })
    }

    return (
        <Grid container spacing={2} sx={{width: '100%'}}>
            <Grid size={12} sx={{mb: 3}}>
                <Stack spacing={3}>
                    <Typography component="h1" variant="h4">
                        Анализ истории
                    </Typography>
                    <Typography>
                        Арбитражная связка состоит из двух сделок. Назовем их открытие и закрытие. В каждой из сделок вы
                        совершаете покупку и продажу.
                        <br/>
                        Итоговый профит это сумма профита сделки открытия и профита сделки закрытия.
                        <br/>
                        На графике вы наглядно можете изучить когда было выгодно открывать, а когда выгодно закрывать
                        сделки по арбитражной связке.
                    </Typography>
                    <Divider/>
                    <br/>
                    <SearchArbitrage onChange={handleChange}/>
                </Stack>
            </Grid>
            <Grid size={12}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        flexWrap: 'wrap',          // ← вот это включает перенос
                        gap: 2,                    // аналог spacing у Stack
                    }}
                >
                    <Chip label={open_label} color="info" sx={{mb: {xs: 1}}}/>
                    <Chip label={close_label} color="error"/>
                </Box>
            </Grid>
            <Grid size={12}>
                {data?.data &&
                    <ChartOpenClose
                        open={dataAdapter(data?.data.open)}
                        close={dataAdapter(data?.data.close)}
                    />
                    ||
                    <Skeleton variant="rectangular" height={500}/>
                }
            </Grid>
        </Grid>
    )
}