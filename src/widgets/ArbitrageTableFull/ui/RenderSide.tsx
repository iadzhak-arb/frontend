import {Stack, Typography, type TypographyVariant} from "@mui/material";


export const RenderSide = ({symbol, exchange, variant = 'body1'}: {
    symbol: string,
    exchange: string,
    variant?: TypographyVariant
}) => (
    <Stack sx={{maxWidth: 100}}>
        <Typography variant={variant} sx={{fontSize: {xs: '1rem'}}}>{symbol}</Typography>
        <Typography variant="caption" sx={{fontSize: {xs: '0.8rem'}}}>{exchange}</Typography>
    </Stack>
)