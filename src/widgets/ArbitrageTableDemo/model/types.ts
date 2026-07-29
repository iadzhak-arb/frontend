export type SideItem = {
    exchange: string,
    symbol: string,
}

export type ArbitrageItem = {
    buy: SideItem,
    sell: SideItem,
    margin: number,
    volume_base: number,
    volume_quote: number,
    timestamp: string
}

export type ArbitrageTableProps = { data?: ArbitrageItem[], isFetching?: boolean }
