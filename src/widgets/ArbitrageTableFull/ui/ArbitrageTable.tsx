import {useMediaQuery, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {View} from "./View.tsx";
import {MobileView} from "./MobileView.tsx";
import type {ArbitrageTableProps} from "../model/types.ts";


export function ArbitrageTable({data, actions = false, isFetching}: ArbitrageTableProps) {
    const [_, setNow] = useState(new Date())
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    if (isMobile) {
        return <MobileView actions={actions} data={data}/>
    }
    return <View actions={actions} data={data} isFetching={isFetching}/>
}

