import {Slide, Snackbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";


export function Alert() {
    const [state, setState] = useState(true)
    const handleClose = () => setState(false)
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            onClick={handleClose}
            sx={{
                color: 'inherit',
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
            }}
        >
            <CloseIcon/>
        </IconButton>
    )
    return (
        <Snackbar
            open={state}
            onClose={handleClose}
            slots={{transition: Slide}}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            autoHideDuration={6000}
            message="Hello"
            action={action}
            sx={{opacity: 0.85}}
        />
    )
}
