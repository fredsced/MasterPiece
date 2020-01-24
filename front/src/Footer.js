import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const sitename = 'My ConformityPal';

function Footer() {
    return (
        <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
                {`Copyright © ${sitename} ${new Date().getFullYear()}.`}
            </Typography>
        </Box>
    );
  }

  export default Footer;