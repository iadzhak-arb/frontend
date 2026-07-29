import {type components} from "@shared/api"

export type SideItem = components['schemas']['Orderbook']
export type ArbitrageItem = components['schemas']['ArbitrageData']

export type ArbitrageTableProps = { data?: ArbitrageItem[], isFetching?: boolean }
