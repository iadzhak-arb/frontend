import {Stack, Typography, type TypographyVariant} from "@mui/material";
import type {SideItem} from "@widgets/ArbitrageTable/model/types.ts";


export const RenderSide = ({value, variant = 'body1'}: { value: SideItem, variant?: TypographyVariant }) => (
    <Stack>
        <Typography variant={variant}>{value.symbol}</Typography>
        <Typography variant="caption">{value.exchange}</Typography>
    </Stack>
)