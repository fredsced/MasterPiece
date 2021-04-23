import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RedirectedContent from '../RedirectedContent';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Dialog,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import ClearCacheService from '../../services/ClearCachesService';
import Alert from '../Alert';

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
    alignItems: 'center',
    padding: theme.spacing(4, 3),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  content: {
    width: '100%',
    marginTop: theme.spacing(5),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ManageCaches(props) {
  const classes = useStyles();
  const user = props.user;
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleClick = (cache) => {
    cache
      ? ClearCacheService.clear(cache)
          .then((response) => {
            setSuccessOpen(true);
          })
          .catch((error) => {
            setErrorOpen(true);
          })
          .finally()
      : ClearCacheService.clearAll()
          .then((response) => {
            setSuccessOpen(true);
          })
          .catch((error) => {
            setErrorOpen(true);
          })
          .finally();
  };
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };
  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  return (
    <>
      {user.isAdmin ? (
        <>
          <Container component='main' className={classes.main} maxWidth='md'>
            <Paper className={classes.paper}>
              <Grid container spacing={2} justify='center'>
                <Typography component='h1' variant='h3'>
                  <FormattedMessage
                    id='clearCache'
                    defaultMessage='Clear the referentials caches'
                  />
                </Typography>
              </Grid>
              <Grid
                className={classes.content}
                container
                spacing={2}
                direction='row'
                justify='space-evenly'
                alignItems='baseline'
              >
                <Grid
                  item
                  container
                  xs={6}
                  sm={3}
                  justify='center'
                  alignItems='baseline'
                >
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    <Typography component='h2' variant='subtitle1'>
                      <FormattedMessage
                        id='clearAllCaches'
                        defaultMessage='Clear all caches'
                      />
                    </Typography>
                  </Button>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  sm={3}
                  alignItems='baseline'
                  justify='center'
                >
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      handleClick('risks');
                    }}
                  >
                    <Typography component='h2' variant='subtitle1'>
                      <FormattedMessage
                        id='clearRisksCaches'
                        defaultMessage='Clear risks cache'
                      />
                    </Typography>
                  </Button>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  sm={3}
                  alignItems='baseline'
                  justify='center'
                >
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      handleClick('countries');
                    }}
                  >
                    <Typography component='h2' variant='subtitle1'>
                      <FormattedMessage
                        id='clearCountriesCache'
                        defaultMessage='Clear countries cache'
                      />
                    </Typography>
                  </Button>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  sm={3}
                  alignItems='baseline'
                  justify='center'
                >
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      handleClick('organisationUnits');
                    }}
                  >
                    <Typography component='h2' variant='subtitle1'>
                      <FormattedMessage
                        id='clearOrgUnitCaches'
                        defaultMessage='Clear org.units cache'
                      />
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            <BackLink
              path='/admin'
              title='back'
              defaultMessage='Back to previous page'
            />

          </Container>
          <Dialog open={successOpen} onClose={handleSuccessClose}>
            <Alert severity='success'>
              <FormattedMessage
                id='cachedCleared'
                defaultMessage='Cache cleared'
              />

              <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleSuccessClose}
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            </Alert>
          </Dialog>
          <Dialog open={errorOpen} onClose={handleErrorClose}>
            <Alert severity='error'>
              <FormattedMessage
                id='cachedNotCleared'
                defaultMessage='Error to clear cache'
              />

              <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleErrorClose}
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            </Alert>
          </Dialog>
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
ManageCaches.propTypes = {
  user: PropTypes.object.isRequired,
};
