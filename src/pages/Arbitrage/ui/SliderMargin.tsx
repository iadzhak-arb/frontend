import {InputLabel, Slider, Stack, TextField} from "@mui/material";
import {type ChangeEvent, useState} from "react";
import FormControl from "@mui/material/FormControl";


type Props = {
    onChange?: (value: number[]) => void;
    init?: number[];
}

function valuetext(value: number): string {
    return `${value}`;
}

function calculateValue(value: number): number {
    if (value >= -5 && value <= 5) return value

    let newVal = 2 ** (Math.abs(value) - 5) + 4
    newVal = Math.round(newVal * 10) / 10
    return value > 0 ? newVal : -newVal
}

function inverseCalculateValue(value: number): number {
    if (value >= -5 && value <= 5) return value
    const newVal = 5 + Math.log2(Math.abs(value) - 4)
    return value > 0 ? newVal : -newVal
}

const marks = [
    {
        value: 0,
        label: '0'
    },
    {
        value: 5,
        label: '5'
    },
    {
        value: inverseCalculateValue(10),
        label: '10'
    },
    {
        value: inverseCalculateValue(50),
        label: '50'
    }
]

const initial = [0, 10]

export function SliderMargin({onChange, init}: Props) {
    const defaultValue = init && init.length === 2 ? init : initial
    const [min, setMin] = useState(defaultValue[0].toString())
    const [max, setMax] = useState(defaultValue[1].toString())
    const [value, setValue] = useState(defaultValue.map(inverseCalculateValue))
    const handleChangeRange = (_: Event, v: number[]) => {
        setValue(v)
        setMin(calculateValue(v[0]).toString())
        setMax(calculateValue(v[1]).toString())
    }
    const handleChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value
        setMin(v)
        setValue([inverseCalculateValue(Number(v)), value[1]])
    }
    const handleChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value
        setMax(v)
        setValue([value[0], inverseCalculateValue(Number(v))])
    }

    const handleChange = () => onChange?.([Number(min), Number(max)])

    return (
        <Stack direction="row" spacing={5} sx={{alignItems: "center"}}>
            <FormControl>
                <InputLabel shrink>min</InputLabel>
                <TextField
                    size="small"
                    value={min}
                    type="number"
                    sx={{mt: 1}}
                    slotProps={{htmlInput: {step: 0.1,}}}
                    onChange={handleChangeMin}
                    onBlur={handleChange}
                />
            </FormControl>
            <Slider
                step={0.1}
                value={value}
                min={-10}
                max={20}
                scale={calculateValue}
                onChange={handleChangeRange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                marks={marks}
                onChangeCommitted={handleChange}
                sx={{
                    display: {xs: "none", sm: "inherit"}
                }}
            />
            <FormControl>
                <InputLabel shrink>max</InputLabel>
                <TextField
                    size="small"
                    value={max}
                    type="number"
                    sx={{mt: 1}}
                    slotProps={{htmlInput: {step: 0.1}}}
                    onChange={handleChangeMax}
                    onBlur={handleChange}
                />
            </FormControl>

        </Stack>

    )
}