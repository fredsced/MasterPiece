import React from 'react';
import { Container, Paper, Link, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 110px)',
    paddingTop: theme.spacing(6),
    marginBottom: '10px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(6, 3, 2),
  },
}));
export default function Userprofile(props) {
  const { user } = props;
  const classes = useStyles();

  return (
    <Container component='main' className={classes.main} maxWidth='md'>
      <Paper className={classes.paper}>
        {user ? (
          <Typography component='p' variant='body1'>
            {`Hello ${user.userEmail}`}
          </Typography>
        ) : (
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
                  <FormattedMessage
                    id='connection'
                    defaultMessage='Connection'
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
