import {useId, useState} from "react";
import FormControl from "@mui/material/FormControl";
import {InputLabel} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type Props = {
    label: string;
    data: Array<string>;
    onChange?: ((v: string[]) => void) | undefined;
    init?: string[];
}

export function SelectMultiple({label, data, onChange, init}: Props) {
    const id = useId()
    const [value, setValue] = useState<string[]>(init || []);
    const handleChange = (e: any) => {
        const selected = Array.isArray(e.target.value) ? e.target.value : [e.target.value];
        setValue(selected);
    }
    const handleClose = () => {
        onChange?.(value);
    }
    return (
        <FormControl size="small" fullWidth>
            <InputLabel id={id} shrink>{label}</InputLabel>
            <Select<string[]>
                labelId={id}
                label={label}
                multiple
                value={value}
                onChange={handleChange}
                onClose={handleClose}
                sx={{mt: 1}}
                displayEmpty={true}
                renderValue={(value: Array<string>) => value.length > 0 ? value.join(', ') : 'Все'}
            >
                {data?.map((d) => {
                    return <MenuItem key={d} value={d}>{d}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}
