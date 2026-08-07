import Typography from "@mui/material/Typography";
import {SelectOne} from "@shared/ui";
import {useExchanges} from "@features/arb/useExchanges.ts";
import {useSearchArbitrage} from "@features/arb/useSearchArbitrage.ts";
import {AutocompleteOne} from "@pages/history/ui/AutocompleteOne.tsx";
import Button from "@mui/material/Button";
import {useState} from "react";

type Props = {
    onChange?: (value) => void;
}

export function SearchArbitrage({onChange}: Props) {
    const exchanges = useExchanges();
    const {
        data,
        params,
        setExchangeBuy,
        setSymbolBuy,
        setExchangeSell,
        setSymbolSell,
    } = useSearchArbitrage();
    const [err, setErr] = useState('')

    const handleClick = () => {

        const hasRequiredFields =
            params?.symbol_buy_id != null && params?.symbol_buy_id !== '' &&
            params?.symbol_sell_id != null && params?.symbol_sell_id !== '' &&
            params?.exchange_buy_name != null && params?.exchange_buy_name !== '' &&
            params?.exchange_sell_name != null && params?.exchange_sell_name !== '';

        if (!hasRequiredFields) {
            setErr('Выберите арбитражную связку');
            return;
        }

        setErr('');
        onChange?.(params)
    }

    return (
        <>
            <Typography>
                <b>Покупка</b>
            </Typography>
            <SelectOne
                label="Биржа покупки"
                data={exchanges?.data}
                onChange={setExchangeBuy}
            />
            <AutocompleteOne
                label="Тикер покупки"
                data={[...new Set(data?.map(v => v.buy_symbol_id))] as any}
                onInput={setSymbolBuy}
                onChange={setSymbolBuy}
            />
            <Typography>
                <b>Продажа</b>
            </Typography>
            <SelectOne
                label="Биржа продажи"
                data={exchanges.data}
                onChange={setExchangeSell}
            />
            <AutocompleteOne
                label="Тикер продажи"
                data={[...new Set(data?.map(v => v.sell_symbol_id))] as any}
                onInput={setSymbolSell}
                onChange={setSymbolSell}
            />
            <Typography variant="caption" color="error">
                {err}
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleClick}
            >
                Загрузить
            </ Button>
        </>
    )
}
