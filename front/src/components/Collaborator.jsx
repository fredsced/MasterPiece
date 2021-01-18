import React from 'react';
import NotConnected from './NotConnected';
import { Container, Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

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
    marginTop: theme.spacing(6),
    padding: theme.spacing(3, 3),
    cursor: 'pointer',
    square: true,
  },
  accountIcon: {
    color: theme.palette.primary.main,
    padding: theme.spacing(2, 1, 1),
    fontSize: '2.5rem',
  },
}));

export default function Collaborator(props) {
  const classes = useStyles();
  const user = props.user;
  const updateUser = (userUpdated) => {
    props.updateUser(userUpdated);
  };

  return (
    <>
      {!user ? (
        <NotConnected />
      ) : (
        <>
          <Container component='main' className={classes.main} maxWidth='md'>
            <Grid container spacing={3} justify='center'>
              <Typography component='h1' variant='h3'>
                <FormattedMessage
                  id='collaboratorPage'
                  defaultMessage='Collaborator page'
                />
              </Typography>
            </Grid>

            <Grid
              container
              spacing={2}
              direction='row'
              justify='space-evenly'
              //alignItems='baseline'
            >
              <Link
                to={{
                  pathname: '/collaborator/profile',
                }}
              >
                <Paper className={classes.paper}>
                  <Grid container item xs={12} justify='space-evenly'>
                    <Typography component='h2' variant='h6'>
                      <FormattedMessage
                        id='Create Update profile'
                        defaultMessage='Create/Update profile'
                      />
                    </Typography>
                  </Grid>
                  <AccountCircleIcon className={classes.accountIcon} />
                </Paper>
              </Link>
              <Link to={'/collaborator/searchlco'}>
                <Paper className={classes.paper}>
                  <Grid container item justify='space-evenly' xs={12}>
                    <Typography component='h2' variant='h6'>
                      <FormattedMessage
                        id='Find Compliance Referent'
                        defaultMessage='Find Compliance Referent'
                      />
                    </Typography>
                  </Grid>
                  <AccountCircleIcon className={classes.accountIcon} />
                </Paper>
              </Link>
            </Grid>
          </Container>
          {/*<CreateProfile user={user} updateUser={updateUser} />
          <SearchComplianceOfficer user={user} />*/}
        </>
      )}
    </>
  );
}
