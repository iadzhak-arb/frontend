import {styled} from "@mui/material/styles";

export const StyledBox = styled('div')(({theme}) => ({
    alignSelf: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginTop: theme.spacing(5)
    },
    maxWidth: '100vw',      // Не шире экрана
    overflow: 'hidden',     // Обрезает всё, что вылезает
    // marginTop: theme.spacing(8),
    borderRadius: (theme.vars || theme).shape.borderRadius,
    outline: '6px solid',
    outlineColor: 'hsla(220, 25%, 80%, 0.2)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.grey[200],
    boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
    ...theme.applyStyles('dark', {
        boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
        outlineColor: 'hsla(220, 20%, 42%, 0.1)',
        borderColor: (theme.vars || theme).palette.grey[700],
    }),
}));