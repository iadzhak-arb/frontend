import {Button, styled} from '@mui/material';

export const StyledButton = styled(Button)(({theme}) => ({
    border: 0,
    color: 'white',
    backgroundColor: theme.palette.primary.main,
}))