import React from 'react';
import PropTypes from 'prop-types';
import RedirectedContent from '../RedirectedContent';
import { Container, Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';

import { Link } from 'react-router-dom';
import myCompliancePal from '../../assets/myCompliancePal.svg';
import BackLink from '../BackLink';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 110px)',
    paddingTop: theme.spacing(6),
    margin: '0px auto 10px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(2, 3, 1),
    cursor: 'pointer',
    width: '250px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  accountIcon: {
    color: theme.palette.primary.main,
    fontSize: '2rem',
    alignSelf: 'flex-end',
  },
  compliancePalLogo: {
    width: '90%',
  },
  content: {
    borderTop: `1px solid ${theme.palette.primary.light}`,
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    margin: theme.spacing(6, 0, 0),
    padding: theme.spacing(3, 3, 5),
    backgroundColor: theme.palette.primary.light2,
  },
  title: {
    marginBottom: theme.spacing(6),
  },
  root: {
    flexGrow: 1,
  },
}));

export default function Admin(props) {
  const classes = useStyles();
  const user = props.user;

  return (
    <>
      {user.isAdmin ? (
        <>
          <Container component='main' className={classes.main} maxWidth='md'>
            <Grid container spacing={3} justify='center'>
              <div className={classes.compliancePalLogo}>
                <img src={myCompliancePal} alt='my Compliance Pal' />
              </div>
            </Grid>
            <Grid container spacing={3} className={classes.content}>
              <Grid container justify='flex-start' className={classes.title}>
                <Typography component='h1' variant='h3'>
                  <FormattedMessage
                    id='administratorPage'
                    defaultMessage='Administrator page'
                  />
                </Typography>
              </Grid>

              <Grid
                container
                spacing={2}
                direction='row'
                justify='space-around'
                alignItems='stretch'
                className={classes.root}
              >
                <Link
                  to={{
                    pathname: '/admin/create-compliance-referent',
                  }}
                >
                  <Paper className={classes.paper} elevation={1}>
                    <Typography component='h2' variant='h6'>
                      <FormattedMessage id='createCR' defaultMessage='Create' />
                      <Typography variant='body2'>
                        <FormattedMessage
                          id='createCRsub'
                          defaultMessage='Create a compliance referent'
                        />
                      </Typography>
                    </Typography>
                    <AccountCircleIcon className={classes.accountIcon} />
                  </Paper>
                </Link>
                <Link to={'/admin/manage-caches'}>
                  <Paper className={classes.paper}>
                    <Typography component='h2' variant='h6'>
                      <FormattedMessage
                        id='referential'
                        defaultMessage='Referential'
                      />
                    </Typography>
                    <Typography variant='body2'>
                      <FormattedMessage
                        id='updateReferential'
                        defaultMessage='Clear the cache related to countries, organisation units and risks'
                      />
                    </Typography>
                    <SettingsIcon className={classes.accountIcon} />
                  </Paper>
                </Link>
              </Grid>
            </Grid>
            <BackLink
              path='/collaborator'
              title='backToCollaboratorPage'
              defaultMessage='Back to collaborator page'
            />
          </Container>
        </>
      ) : (
        <RedirectedContent
          mainTitle='noAuthorization'
          mainMessage='noAuthorizationMessage'
          link='/collaborator'
          linkMessage='backToCollaboratorPage'
        />
      )}
    </>
  );
}
Admin.propTypes = {
  user: PropTypes.object.isRequired,
};
