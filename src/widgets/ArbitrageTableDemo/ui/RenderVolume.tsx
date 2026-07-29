import {Stack, Typography} from "@mui/material";

function extractTokens(str: string) {
    const basePart = str.split('/')
    const quotePart = basePart.length > 1 && basePart[1].split(':') || []
    const settlePart = quotePart.length > 1 && quotePart[1].split('-') || []
    return {base: basePart[0], quote: settlePart[0] || quotePart[0]}
}

export const RenderVolume = ({symbol, base, quote, align = 'flex-start'}: {
    symbol: string,
    base: number,
    quote: number,
    align?: string
}) => {
    const tokens = extractTokens(symbol)
    return (
        <Stack sx={{alignItems: align}}>
            <Typography variant="caption" sx={{textAlign: {xs: "right"}}}>{base} <i>{tokens.base}</i></Typography>
            <Typography variant="caption" sx={{textAlign: {xs: "right"}}}>{quote} <i>{tokens.quote}</i></Typography>
        </Stack>
    )
}