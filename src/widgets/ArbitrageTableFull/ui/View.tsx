import {Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import type {ArbitrageTableProps} from "../model/types.ts";
import {RenderSide} from "./RenderSide.tsx";
import {RenderVolume} from "./RenderVolume.tsx";
import {RenderTime} from "./RenderTime.tsx";
import {Link as RouterLink} from "@tanstack/react-router"
import IconButton from "@mui/material/IconButton";
import SsidChartIcon from '@mui/icons-material/SsidChart';

export function View({data, actions = false, isFetching}: ArbitrageTableProps) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: 'bold'}}>Покупка</TableCell>
                        <TableCell>Продажа</TableCell>
                        <TableCell>Профит, %</TableCell>
                        <TableCell>Объем</TableCell>
                        {actions && <TableCell></TableCell>}
                        <TableCell>
                            Обновленно
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{opacity: isFetching ? 0.6 : 1.0}}>
                    {data ?
                        data.map((value, index) => (
                            <TableRow key={index} hover>
                                <TableCell>
                                    <RenderSide
                                        symbol={value.buy_symbol_id}
                                        exchange={value.buy_exchange_name}
                                    />
                                </TableCell>
                                <TableCell>
                                    <RenderSide
                                        symbol={value.sell_symbol_id}
                                        exchange={value.sell_exchange_name}
                                    />
                                </TableCell>
                                <TableCell>{value.margin}</TableCell>
                                <TableCell>
                                    <RenderVolume
                                        symbol={value.buy_symbol_id}
                                        base={value.volume_base}
                                        quote={value.volume_quote}/>
                                </TableCell>
                                {actions && <TableCell>
                                    <RouterLink
                                        to="/d/history"
                                        search={{
                                            sell_exchange_name: value.sell_exchange_name,
                                            buy_exchange_name: value.buy_exchange_name,
                                            sell_symbol_id: value.sell_symbol_id,
                                            buy_symbol_id: value.buy_symbol_id
                                        }}
                                    >
                                        <IconButton size="small">
                                            <SsidChartIcon/>
                                        </IconButton>
                                    </RouterLink>
                                </TableCell>}
                                <TableCell align={actions ? "right" : "left"}>
                                    <RenderTime value={value.timestamp}/>
                                </TableCell>
                            </TableRow>
                        ))
                        :
                        Array.from({length: 4}).map((_, index) => (
                            <TableRow key={index} hover>
                                <TableCell><Skeleton/></TableCell>
                                <TableCell><Skeleton/></TableCell>
                                <TableCell><Skeleton/></TableCell>
                                <TableCell><Skeleton/></TableCell>
                                <TableCell><Skeleton/></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
