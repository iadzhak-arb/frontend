import {Autocomplete, InputLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import type {SyntheticEvent} from "react";

type Props = {
    label: string;
    data: string[] | undefined;
    onChange?: (v: string) => void;
    onInput?: (v: string) => void;
}

export function AutocompleteOne(props: Props) {
    const {
        label,
        data,
        onChange,
        onInput,
    } = props;

    const handleChange = (_event, value, _reason) => {
        onChange?.(value);
    }

    const handleInputChange = (
        _event: SyntheticEvent,
        value: string, reason: string
    ) => {
        if (reason !== 'input') return;
        onInput?.(value);
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
                options={data || []}
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