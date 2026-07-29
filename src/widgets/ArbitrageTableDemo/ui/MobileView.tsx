import {Card, CardContent, Skeleton, Stack, Typography} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import type {ArbitrageTableProps} from "../model/types.ts";
import {RenderSide} from "./RenderSide.tsx";
import {RenderVolume} from "./RenderVolume.tsx";
import {RenderTime} from "./RenderTime.tsx";

export function MobileView({data}: ArbitrageTableProps) {
    return (
        <>
            {data ?
                data.map((item, index) => (
                    <Card key={index} sx={{mt: 2, pl: 0.5, width: "100%"}}>
                        <CardContent>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    justifyContent: "space-between"
                                }}
                            >
                                <Stack spacing={2}>
                                    <Stack direction="row">
                                        <ArrowDropUpIcon opacity={0.5} color="success"/>
                                        <RenderSide
                                            value={item.buy}
                                            variant="subtitle1"

                                        />
                                    </Stack>
                                    <Stack direction="row">
                                        <ArrowDropDownIcon opacity={0.5} color="error"/>
                                        <RenderSide
                                            value={item.sell}
                                            variant="subtitle1"
                                        />
                                    </Stack>
                                </Stack>
                                <Stack sx={{alignItems: "flex-end"}}>
                                    <Typography variant="h3" gutterBottom>{item.margin}%</Typography>
                                    <RenderVolume
                                        symbol={item.buy.symbol}
                                        base={item.volume_base}
                                        quote={item.volume_quote}
                                        align="flex-end"
                                    />
                                    <br/>
                                    <Typography color="textDisabled">
                                        <RenderTime value={new Date(item.timestamp)}/>
                                    </Typography>
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