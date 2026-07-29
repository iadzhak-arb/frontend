import {Autocomplete, InputLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import type {SyntheticEvent} from "react";
import {useArbitrageNames} from "../api/data.ts";
import FormControl from "@mui/material/FormControl";

type Props = {
    onChange?: (value) => void;
}

export function SearchArbitrage({onChange}: Props) {
    const {data, setSearch} = useArbitrageNames();
    const label = 'Поиск';

    const handleChange = (_event, value, _reason) => {
        onChange?.(value);
    }

    const handleInputChange = (
        _event: SyntheticEvent,
        value: string, reason: string
    ) => {
        if (reason !== 'input') return;
        setSearch(value)
    }

    return (
        <FormControl>
            <InputLabel shrink>{label}</InputLabel>
            <Autocomplete
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size='small'
                    />
                )}
                options={data as any || []}
                getOptionLabel={(option) => option.name}
                onInputChange={handleInputChange}
                sx={{mt: 1}}
                slotProps={{
                    chip: {
                        size: 'small',
                    },
                    clearIndicator: {
                        sx: {
                            boxShadow: 'none',
                            border: 'none',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            },
                        }
                    } as any,
                    popupIndicator: {
                        sx: {
                            boxShadow: 'none',
                            border: 'none',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                            },
                        }
                    } as any,
                }}
            />
        </FormControl>
    )
}
