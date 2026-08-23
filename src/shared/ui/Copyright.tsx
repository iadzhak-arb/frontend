import Typography from "@mui/material/Typography";
import {Link} from "@mui/material";

export function Copyright() {
    return (
        <Typography variant="body2" sx={{color: 'text.secondary', mt: 1}}>
            {'Copyright © '}
            <Link
                href="/"
                sx={{
                    color: 'text.secondary',
                }}
            >
                ArbCrypto&nbsp;
            </Link>
            {new Date().getFullYear()}
        </Typography>
    );
}
