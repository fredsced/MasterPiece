import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const Header = () => {
    return (
        <header>
            <Typography component="h1">
                {process.env.REACT_APP_WEBSITE_NAME}
            </Typography>
        </header>
    )
}

export default Header;