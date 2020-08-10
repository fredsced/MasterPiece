import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const Header = () => {
    return (
        <header>
            <Box align='center'>
                <Typography component="h1" variant="h2">
                    {process.env.REACT_APP_WEBSITE_NAME}
                </Typography>
            </Box>
        </header>
    )
}

export default Header;