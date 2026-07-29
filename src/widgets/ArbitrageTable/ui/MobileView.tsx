import type {ArbitrageTableProps} from "../model/types.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Skeleton, Stack, Typography} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {RenderSide} from "./RenderSide.tsx";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {RenderVolume} from "./RenderVolume.tsx";
import {RenderTime} from "./RenderTime.tsx";
import IconButton from "@mui/material/IconButton";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import {Link as RouterLink} from "@tanstack/react-router";

export function MobileView({data}: ArbitrageTableProps) {
    return (
        <>
            {data ?
                data.map((item, index) => (
                    <Card key={index} sx={{mt: 2, pl: 0.5, width: "100%"}}>
                        <CardContent>
                            <Stack direction="row" spacing={2} sx={{
                                justifyContent: "space-between"
                            }}>
                                <Stack spacing={2} sx={{maxWidth: 100}}>
                                    <Stack direction="row">
                                        <ArrowDropUpIcon fontSize="small" opacity={0.5} color="success"/><RenderSide
                                        value={item.buy}
                                        variant="subtitle1"/>
                                    </Stack>
                                    <Stack direction="row">
                                        <ArrowDropDownIcon fontSize="small" opacity={0.5} color="error"/> <RenderSide
                                        value={item.sell}
                                        variant="subtitle1"/>
                                    </Stack>
                                    <RouterLink
                                        to="/d/history"
                                        search={{id: item.id}}
                                    >
                                        <IconButton
                                            color="error"
                                            size="small"
                                            sx={{ml: 2}}
                                        >
                                            <SsidChartIcon/>
                                        </IconButton>
                                    </RouterLink>
                                </Stack>
                                <Stack sx={{alignItems: "flex-end"}}>
                                    <Typography variant="h3">{item.margin}%</Typography>
                                    <RenderVolume
                                        symbol={item.buy.symbol}
                                        base={item.volume_base}
                                        quote={item.volume_quote}
                                        align="flex-end"
                                    />
                                    <br/>
                                    <RenderTime value={new Date(item.timestamp)}/>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))
                :
                Array.from({length: 3}).map((_, index) => (
                    <Card key={index} sx={{mt: 2, pl: 0.5, width: "100%"}}>
                        <CardContent>
                            <Stack direction="row" spacing={2} sx={{
                                justifyContent: "space-between",
                                alignItems: "start"
                            }}>
                                <Stack>
                                    <Skeleton width={150} height={30}/>
                                    <Skeleton width={150} height={30}/>
                                </Stack>
                                <Stack sx={{alignItems: "flex-end"}}>
                                    <Skeleton width={70} height={40}/>
                                    <Skeleton width={50} height={15}/>
                                    <Skeleton width={50} height={15}/>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))

            }
        </>
    )
}