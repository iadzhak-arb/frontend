import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import {Badge, Stack, Tooltip, Typography} from "@mui/material";

const values = [0, 5, 10, 30]


export function RefreshButton({onChange}: { onChange?: (value: number) => void }) {
    const [index, setIndex] = useState(0);
    const handleClick = () => {
        const newIndex = (index + 1) % values.length
        setIndex(newIndex);
        onChange?.(values[newIndex]);
    }
    const current = values[index] ? `${values[index]} сек.` : 'выкл.'
    return (
        <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
            <Typography variant="caption" color="textDisabled">
                Автообновление {current}
            </Typography>
            <Tooltip title="Нажмите для переключения">
                <IconButton
                    size="small"
                    onClick={handleClick}
                    sx={(theme) => ({
                        bgcolor: "primary.main",
                        color: "white",
                        transition: "box-shadow 0.2s ease",
                        "&:hover": {
                            bgcolor: "primary.main",
                            boxShadow: theme.shadows[3],
                            border: "none",
                        }
                    })}
                >
                    <Badge
                        badgeContent={values[index]}
                        color="primary"
                        sx={(theme) => ({
                            "& .MuiBadge-badge": {
                                border: `2px solid ${theme.palette.background.paper}`,
                                boxShadow: "none",          // убираем внутреннюю тень, если мешает
                                padding: "2px",             // чуть увеличиваем отступ внутри бейджа
                            }
                        })
                        }

                    >
                        <RefreshIcon sx={{m: 1}}/>
                    </Badge>
                </IconButton>
            </Tooltip>
        </Stack>
    )
}