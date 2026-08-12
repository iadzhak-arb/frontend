import {Box, Chip, Divider, Grid, Skeleton, Stack, Typography} from "@mui/material";
import {SearchArbitrage} from "./SearchArbitrage.tsx"
import {ChartOpenClose} from "./ChartOpenClose.tsx"
import {useHistory} from "@features/arb/useHistory.ts";
import {useSearch} from "@tanstack/react-router";
import {useEffect} from "react";
import {dataAdapter} from "../model/adapter.ts"


export function History() {
    const initial = useSearch({from: '/d/_layout/history'});
    const {data, params, setParams} = useHistory();

    const open_label = `${params.buy_symbol_id} ${params.buy_exchange_name} ⇒ ${params.sell_symbol_id} ${params.sell_exchange_name}`
    const close_label = `${params.sell_symbol_id} ${params.sell_exchange_name} ⇒ ${params.buy_symbol_id} ${params.buy_exchange_name}`

    useEffect(() => {
        if (
            initial.buy_exchange_name &&
            initial.sell_exchange_name &&
            initial.buy_symbol_id &&
            initial.sell_symbol_id
        ) setParams({
            buy_exchange_name: initial.buy_exchange_name as string,
            sell_exchange_name: initial.sell_exchange_name as string,
            buy_symbol_id: initial.buy_symbol_id as string,
            sell_symbol_id: initial.sell_symbol_id as string,
        })
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
                        Арбитражная связка — это пара сделок: одна открывает позицию, другая её закрывает. В каждой из
                        них вы одновременно что‑то покупаете и продаёте.
                    </Typography>
                    <Typography>
                        Общий доход (профит) получается, если сложить прибыль от обеих сделок — и от открытия, и от
                        закрытия.
                    </Typography>
                    <Typography>
                        На графике удобно смотреть, в какие моменты было выгодно открывать сделку, а в какие —
                        закрывать. Так проще понять, когда арбитражная связка работала лучше всего.
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