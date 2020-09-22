import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    height: '39px',
    width: '90%',
    margin: '0 auto',
    borderTop: `1px solid ${theme.palette.primary.light}`,
    color: theme.palette.primary.light,
  },
  boxFooter: {
    paddingTop: theme.spacing(1),
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Box className={classes.boxFooter}>
        <Typography variant='body2' align='center'>
          {`${process.env.REACT_APP_WEBSITE_NAME} ${new Date().getFullYear()}`}
        </Typography>
      </Box>
    </footer>
  );
}
