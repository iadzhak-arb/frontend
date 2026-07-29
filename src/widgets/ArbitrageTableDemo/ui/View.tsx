import {Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import type {ArbitrageTableProps} from "../model/types.ts";
import {RenderSide} from "./RenderSide.tsx";
import {RenderVolume} from "./RenderVolume.tsx";
import {RenderTime} from "./RenderTime.tsx";

export function View({data, isFetching}: ArbitrageTableProps) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: 'bold'}}>Покупка</TableCell>
                        <TableCell>Продажа</TableCell>
                        <TableCell>Профит, %</TableCell>
                        <TableCell>Объем</TableCell>
                        <TableCell>Обновленно</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{opacity: isFetching ? 0.6 : 1.0}}>
                    {data ?
                        data.map((value, index) => (
                            <TableRow key={index} hover>
                                <TableCell><RenderSide value={value.buy}/></TableCell>
                                <TableCell><RenderSide value={value.sell}/></TableCell>
                                <TableCell>{value.margin}</TableCell>
                                <TableCell><RenderVolume symbol={value.buy.symbol} base={value.volume_base}
                                                         quote={value.volume_quote}/></TableCell>
                                <TableCell><RenderTime value={new Date(value.timestamp)}/></TableCell>
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
