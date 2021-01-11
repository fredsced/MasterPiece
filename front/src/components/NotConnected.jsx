import React from 'react';
import { Paper, Grid, Typography, Link, Container } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 110px)',
    paddingTop: theme.spacing(6),
    marginBottom: '10px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 3),
  },
}));

export default function NotConnected() {
  const classes = useStyles();
  return (
    <Container component='main' className={classes.main} maxWidth='sm'>
      <Paper className={classes.paper}>
        <Grid container spacing={2} justify='center'>
          <Grid item>
            <Typography component='h1' variant='h4'>
              <FormattedMessage
                id='notConnected'
                defaultMessage='You are not connected'
              />
            </Typography>
          </Grid>
          <Grid container spacing={2} justify='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/login' variant='body2'>
                <FormattedMessage id='connection' defaultMessage='Connection' />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
