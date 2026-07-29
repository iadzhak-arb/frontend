import {useId, useState} from "react";
import FormControl from "@mui/material/FormControl";
import {InputLabel, type SelectChangeEvent} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type Props = {
    label: string,
    init?: string,
    data: Array<string>,
    onChange?: (v: string) => void,

}

export function SelectOne({label, data, onChange, init}: Props) {
    const id = useId()
    const [value, setValue] = useState<string>(init || data?.[0] || '');
    const handleChange = (e: SelectChangeEvent) => {
        setValue(e.target.value)
        onChange?.(e.target.value)
    }
    return (
        <FormControl size="small" fullWidth>
            <InputLabel id={id} shrink>{label}</InputLabel>
            <Select
                labelId={id}
                label={label}
                value={value}
                onChange={handleChange}
                sx={{mt: 1}}
            >
                {data?.map((d) => {
                    return <MenuItem key={d} value={d}>{d}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}