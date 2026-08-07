import {useTokens} from "@features/arb/useTokens";
import {Accordion, AccordionSummary, AccordionDetails, Skeleton, Stack} from "@mui/material";
import {AutocompleteMultiple} from "@pages/arbitrage/ui/AutocompleteMultiple.tsx";
import {SliderMargin} from "./SliderMargin"
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {useId} from "react";

type Props = {
    onTokenChange?: (value: string[]) => void;
    onMarginChange?: (value: number[]) => void;
    initMargin?: number[];
    initTokens?: string[];
}

export function CommonSet({onTokenChange, onMarginChange, initMargin, initTokens}: Props) {
    const id = useId();
    const base = useTokens('base');
    return (
        <Accordion defaultExpanded>
            <AccordionSummary id={id}>
                <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                    <FilterAltIcon fontSize="small" color="info"/><b>Токены, маржа</b>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    {base.isLoading ? <Skeleton/> :
                        <AutocompleteMultiple
                            data={base.data!}
                            label='Токены'
                            onChange={onTokenChange}
                            init={initTokens}
                        />}
                    <SliderMargin onChange={onMarginChange} init={initMargin}/>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}