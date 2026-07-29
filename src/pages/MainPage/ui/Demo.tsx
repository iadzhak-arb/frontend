import {Box, Container, Tab, Tabs} from "@mui/material";
import {ArbitrageTable} from "@widgets/ArbitrageTableDemo";
import {type SyntheticEvent, useState} from "react";
import {getDemoSpotSpot, getDemoSpotSwap} from "../../DemoPage/api/getDemo.ts";


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export function Demo() {
    const [value, setValue] = useState(0)

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const spot = getDemoSpotSpot()
    const swap = getDemoSpotSwap()

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: {xs: 1, sm: 2},
                pb: {xs: 1, sm: 2},
            }}
        >
            <Tabs value={value} onChange={handleChange} aria-label="Стратегия арбитража">
                <Tab label="Спот - Спот" {...a11yProps(0)} />
                <Tab label="Спот - Фьючерс" {...a11yProps(1)} />
            </Tabs>
            <Box hidden={value !== 0} sx={{width: '100%'}}>
                <ArbitrageTable data={spot.data} isFetching={spot.isFetching}/>
            </Box>
            <Box hidden={value !== 1} sx={{width: '100%'}}>
                <ArbitrageTable data={swap.data} isFetching={swap.isFetching}/>
            </Box>
        </Container>
    )
}