import {Stack, Typography, type TypographyVariant} from "@mui/material";
import type {SideItem} from "@widgets/ArbitrageTable/model/types.ts";


export const RenderSide = ({value, variant = 'body1'}: { value: SideItem, variant?: TypographyVariant }) => (
    <Stack sx={{maxWidth: 100}}>
        <Typography variant={variant} sx={{fontSize: {xs: '1rem'}}}>{value.symbol}</Typography>
        <Typography variant="caption" sx={{fontSize: {xs: '0.8rem'}}}>{value.exchange}</Typography>
    </Stack>
)