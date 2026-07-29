import {Autocomplete, type AutocompleteChangeDetails, type AutocompleteChangeReason, InputLabel} from "@mui/material";
import TextField from "@mui/material/TextField";
import {type SyntheticEvent, useState} from "react";
import FormControl from "@mui/material/FormControl";

type Props = {
    data: string[];
    label: string;
    onChange?: (value: string[]) => void;
    init?: string[];
}

export function AutocompleteMultiple({data, label, onChange, init}: Props) {
    const [value, setValue] = useState<string[]>(init || [])
    const handleChange = (
        _event: SyntheticEvent<Element, Event>,
        value: string[],
        _reason: AutocompleteChangeReason, _details?: AutocompleteChangeDetails<string> | undefined) => {
        setValue(value);
        onChange?.(value);
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
                options={data}
                value={value}
                multiple
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
