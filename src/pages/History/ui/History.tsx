import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {SearchArbitrage} from "./SearchArbitrage.tsx"
import {ChartOpenClose} from "./ChartOpenClose.tsx"
import {useHistory} from "../api/data.ts";
import Chip from "@mui/material/Chip";
import {useEffect} from "react";
import {useSearch} from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


function formatDate(input: string) {
    const d = new Date(input);
    return Math.floor(d.getTime() / 1000);
}

function dataAdapter(data) {
    return data.map(({timestamp, margin}) => ({time: formatDate(timestamp), value: margin}));
}

export function History() {
    const params = useSearch({from: '/d/_layout/history'});
    const {open, close, setId} = useHistory();

    useEffect(() => {
        if (params.id) setId(params.id);
    }, []);


    const handleSetId = (v) => {
        if (!v) return;
        setId(v.id)
    }

    return (
        <Grid container spacing={2} sx={{width: '100%'}}>
            <Grid size={12} sx={{mb: 3}}>
                <Stack spacing={3}>
                    <Typography component="h1" variant="h4">
                        Анализ истории
                    </Typography>
                    <Typography>
                        На этой странице вы можете детально изучить историю сделок по конкретной арбитражной связке.
                        После выбора связки отображаются графики маржи открытия и закрытия сделки.
                        <br/>
                        <i>Порядок указания: покупка - продажа</i>
                    </Typography>
                    <Divider/>
                    <br/>
                    <SearchArbitrage onChange={handleSetId}/>
                </Stack>
            </Grid>
            <Grid size={12}>
                <Stack direction={{sx: "column", md: "row"}} spacing={2}>
                    <Chip label={open?.data?.name} color="info" sx={{mb: {xs: 1}}}/>
                    <Chip label={close?.data?.name} color="error"/>
                </Stack>
            </Grid>
            <Grid size={12}>
                {open && open.data && close && close.data &&
                    <ChartOpenClose
                        open={dataAdapter(open.data.history)}
                        close={dataAdapter(close.data.history)}
                    />}
            </Grid>
        </Grid>
    )
}