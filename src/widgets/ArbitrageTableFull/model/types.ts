import {type components} from "@shared/api/schema-arb"

export type ArbitrageItem = components['schemas']['ArbitrageDetail']

export type ArbitrageTableProps = {
    data?: ArbitrageItem[];
    actions?: boolean;
    isFetching?: boolean;
}
