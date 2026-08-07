import {type ReactNode} from "react";
import bybitIcon from "@shared/assets/icons/bybit.png"
import mexcIcon from "@shared/assets/icons/mexc.png"
import PublicIcon from '@mui/icons-material/Public';


const iconMap = new Map<string, string>([
    ["Bybit", bybitIcon],
    ["MEXC Global", mexcIcon]
]);


export function getIcon(name: string): ReactNode {
    const icon = iconMap.get(name);
    return icon ? <img alt={name} src={icon} width={16} height={16}/> : <PublicIcon width={16} height={16}/>
}
