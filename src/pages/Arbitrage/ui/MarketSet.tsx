import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import {Skeleton} from "@mui/material";
import {SelectOne} from "@shared/ui";
import {useExchanges, useMarkets} from "../api/data.ts";
import {SelectMultiple} from "@shared/ui/SelectMultiple.tsx";
import {useId} from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

type Props = {
    name: string;
    onMarketChange?: (v: string) => void;
    onExchangeChange?: (v: string[]) => void;
    initMarket?: string;
    initExchanges?: string[];
}

export function MarketSet({name, onMarketChange, onExchangeChange, initMarket, initExchanges}: Props) {
    const markets = useMarkets();
    const exchanges = useExchanges();
    const id = useId();
    return (
        <Accordion defaultExpanded>
            <AccordionSummary id={id}>
                <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                    <FilterAltIcon fontSize="small" color="info"/>
                    <b>{name}</b>
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{mt: 2}}>
                <Stack spacing={2}>
                    {markets.isLoading ? <Skeleton/> :
                        <SelectOne label='Рынок' data={markets.data!} onChange={onMarketChange} init={initMarket}/>}
                    {exchanges.isLoading ? <Skeleton/> :
                        <SelectMultiple label='Биржи' data={exchanges.data!} onChange={onExchangeChange}
                                        init={initExchanges}/>}

                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}