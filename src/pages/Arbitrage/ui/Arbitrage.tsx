import {Box, Grid, TablePagination} from "@mui/material";
import type {ChangeEvent, MouseEvent} from "react";
import {ArbitrageTable} from "@widgets/ArbitrageTable";
import {RefreshButton} from "@pages/Arbitrage/ui/RefreshButton.tsx";
import {MarketSet} from "./MarketSet"
import {CommonSet} from "./CommonSet.tsx";
import {useArbitrage} from "../api/data.ts";

const rowsPerPageOptions = [5, 10, 25]

export function Arbitrage() {

    const arb = useArbitrage({
        market_buy: 'spot',
        market_sell: 'spot',
        limit: rowsPerPageOptions[1],
        page: 1
    });

    const handleRowsPerPageChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        arb.setLimit(Number(event.target.value))
    }
    const handlePageChange = (_event: MouseEvent<HTMLButtonElement> | null, page: number) => {
        arb.setPage(page + 1)
    }

    return (
        <>
            <Grid container spacing={2} sx={{width: '100%'}}>
                <Grid size={{xs: 12, md: 6}}>
                    <MarketSet
                        name='Покупка'
                        onMarketChange={arb.setMarketBuy}
                        onExchangeChange={arb.setExchangeBuy}
                        initMarket={arb.params?.market_buy}
                        initExchanges={arb.params?.exchange_buy ? arb.params?.exchange_buy?.split(',') : []}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <MarketSet
                        name='Продажа'
                        onMarketChange={arb.setMarketSell}
                        onExchangeChange={arb.setExchangeSell}
                        initMarket={arb.params?.market_sell}
                        initExchanges={arb.params?.exchange_sell ? arb.params?.exchange_sell?.split(',') : []}
                    />
                </Grid>
                <Grid size={12}>
                    <CommonSet
                        onTokenChange={arb.setToken}
                        onMarginChange={arb.setMargin}
                        initMargin={[arb.params?.margin_min as number || 0, arb.params?.margin_max as number || 5]}
                        initTokens={arb.params?.token ? arb.params.token.split(',') : []}
                    />
                </Grid>
            </Grid>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                <RefreshButton onChange={arb.setRefetch}/>
            </Box>
            <ArbitrageTable data={arb.data?.results} isFetching={arb.isFetching}/>
            <TablePagination
                component="div"
                count={arb.data?.count!}
                page={arb.params?.page! - 1}
                onPageChange={handlePageChange}
                rowsPerPage={arb.params?.limit!}
                rowsPerPageOptions={rowsPerPageOptions}
                onRowsPerPageChange={handleRowsPerPageChange}
                sx={{alignSelf: 'flex-end'}}
                labelRowsPerPage="Кол-во:"
                slotProps={{
                    selectLabel: {
                        sx: {
                            display: {xs: "none", sm: "inherit"}
                        }
                    }
                }}
            />
        </>
    )
}