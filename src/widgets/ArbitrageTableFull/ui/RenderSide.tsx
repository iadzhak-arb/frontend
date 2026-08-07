import {Stack, Typography, type TypographyVariant} from "@mui/material";
import {getIcon} from "../config/exchange-icons.tsx"


export const RenderSide = ({symbol, exchange, variant = 'body1'}: {
    symbol: string,
    exchange: string,
    variant?: TypographyVariant
}) => (
    <Stack sx={{maxWidth: 200}}>
        <Typography variant={variant}
                    sx={{fontSize: {xs: '1rem'}, fontWeight: {xs: 'bold', sm: 'normal'}}}>{symbol}</Typography>

        <Stack direction="row" spacing={0.5} sx={{alignItems: "center"}}>

            {getIcon(exchange)}
            <Typography variant="caption" sx={{fontSize: {xs: '0.8rem'}}}>
                {exchange}
            </Typography>
        </Stack>

    </Stack>
)