import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { object, string, number } from 'yup';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Dialog,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CollaboratorService from '../services/CollaboratorService';
import AuthService from '../services/AuthService';
import CountriesService from '../services/CountriesService';
import OrgUnitService from '../services/OrgUnitService';
import { useHistory } from 'react-router-dom';
import Alert from './Alert';
import handleValidationError from '../services/handleValidationError';
import RedirectedContent from './RedirectedContent';
import BackLink from './BackLink';

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
  form: {
    width: '100%',
    marginTop: theme.spacing(5),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: 220,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ValidationSchema = () => {
  return object().shape({
    firstname: string()
      .min(2, 'tooShort')
      .max(255, 'tooLong')
      .required('required'),
    lastname: string()
      .min(2, 'tooShort')
      .max(255, 'tooLong')
      .required('required'),
    sesame: string()
      .matches(/^[a,x]\d{6}$/i, 'notASesameId')
      .required('required'),
    countryId: number().required('required'),
    organisationUnitId: number().required('required'),
  });
};

export default function Profile(props) {
  const history = useHistory();
  const classes = useStyles();
  const [errorToFetch, setErrorToFetch] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [apiErrorTitle, setApiErrorTitle] = useState();
  const [fieldsInError, setFieldsInError] = useState({});
  const [errorOpen, setErrorOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [organisationUnits, setOrganisationUnits] = useState([]);
  const hasProfile = AuthService.getCurrentUser().accountHasProfile;
  const [fetchingCountries, setFetchingCountries] = useState(true);
  const [fetchingOrgUnits, setFetchingOrgUnits] = useState(true);
  const currentUser = AuthService.getCurrentUser();
  let userFirstname = '';
  let userLastname = '';
  let userSesame = '';
  let userCountryId = '';
  let userOrganisationUnitId = '';
  if (currentUser.accountHasProfile) {
    userFirstname = currentUser.collaboratorInfo.firstname;
    userLastname = currentUser.collaboratorInfo.lastname;
    userCountryId = currentUser.collaboratorInfo.countryId;
    userSesame = currentUser.collaboratorInfo.sesame;
    userOrganisationUnitId = currentUser.collaboratorInfo.organisationUnitId;
  }

  useEffect(() => {
    const fetchCountries = () => {
      CountriesService.getAll()
        .then((result) => {
          setCountries(result.data);
        })
        .catch((error) => {
          setErrorToFetch(true);
        })
        .then(() => {
          setFetchingCountries(false);
        });
    };
    const fetchOrgUnits = () => {
      OrgUnitService.getAll()
        .then((result) => {
          setOrganisationUnits(result.data);
        })
        .catch((error) => {
          setErrorToFetch(true);
        })
        .then(() => {
          setFetchingOrgUnits(false);
        });
    };
    fetchCountries();
    fetchOrgUnits();
  }, []);

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    history.push('/collaborator');
  };
  const handleErrorClose = () => {
    setErrorOpen(false);
  };
  const handleCreationError = (error) => {
    const result = handleValidationError(error);
    setFieldsInError(result.validationErrors);

    const errorText = (
      <FormattedMessage
        id={result.errorMessage}
        default='Oups an error occurs...'
      />
    );
    setApiErrorTitle(errorText);
    setErrorOpen(true);
  };

  const resetUniqueSesameError = () => {
    const fieldsInErrorReseted = { ...fieldsInError, sesame: '' };
    setFieldsInError(fieldsInErrorReseted);
  };

  const resetApiErrors = () => {
    setFieldsInError({});
    setApiErrorTitle();
    setErrorOpen(false);
  };

  return (
    <>
      {errorToFetch ? (
        <RedirectedContent
          mainTitle='Connection issue'
          mainMessage='Sorry we cannot handle your request for the moment'
          link='/collaborator'
          linkMessage='backToCollaboratorPage'
        />
      ) : fetchingCountries || fetchingOrgUnits ? (
        <Container component='main' className={classes.main} maxWidth='sm'>
          <Backdrop
            className={classes.backdrop}
            open={fetchingCountries || fetchingOrgUnits}
          >
            <CircularProgress color='primary' />
          </Backdrop>
        </Container>
      ) : (
        <>
          <Formik
            initialValues={{
              firstname: userFirstname,
              lastname: userLastname,
              sesame: userSesame,
              countryId: userCountryId,
              organisationUnitId: userOrganisationUnitId,
            }}
            validationSchema={() => ValidationSchema()}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              resetApiErrors();
              CollaboratorService.save(values)
                .then(() => {
                  CollaboratorService.updateCollaboratorProfile(values);
                  setSuccessOpen(true);
                })
                .catch((error) => {
                  handleCreationError(error);
                })
                .then(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              dirty,
            }) => (
              <Container
                component='main'
                className={classes.main}
                maxWidth='sm'
              >
                <Paper className={classes.paper}>
                  <Grid container spacing={2} justify='center'>
                    <Typography component='h1' variant='h3'>
                      {!hasProfile ? (
                        <FormattedMessage
                          id='createProfile'
                          defaultMessage='Create your profile'
                        />
                      ) : (
                        <FormattedMessage
                          id='updateProfile'
                          defaultMessage='Update your profile'
                        />
                      )}
                    </Typography>
                  </Grid>
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid
                      container
                      spacing={2}
                      direction='row'
                      justify='space-evenly'
                      alignItems='center'
                    >
                      <Grid item sm={6} xs={12}>
                        <Grid container justify='center'>
                          <TextField
                            type='text'
                            variant='standard'
                            size='small'
                            id='firstname'
                            label={
                              <FormattedMessage
                                id='firstname'
                                defaultMessage='Firstname'
                              />
                            }
                            name='firstname'
                            value={values.firstname}
                            onChange={handleChange}
                            error={
                              (touched.firstname && !!errors.firstname) ||
                              Boolean(fieldsInError.firstname)
                            }
                            helperText={
                              touched.firstname &&
                              (Boolean(errors.firstname) ||
                                Boolean(fieldsInError.firstname)) && (
                                <FormattedMessage
                                  id={
                                    errors.firstname
                                      ? errors.firstname
                                      : fieldsInError.firstname
                                  }
                                  defaultMessage={
                                    errors.firstname
                                      ? errors.firstname
                                      : fieldsInError.firstname
                                  }
                                />
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container justify='center'>
                          <TextField
                            type='text'
                            variant='standard'
                            size='small'
                            id='lastname'
                            label={
                              <FormattedMessage
                                id='lastname'
                                defaultMessage='Lastname'
                              />
                            }
                            name='lastname'
                            value={values.lastname}
                            onChange={handleChange}
                            error={
                              (touched.lastname && !!errors.lastname) ||
                              fieldsInError.lastname
                            }
                            helperText={
                              touched.lastname &&
                              !!errors.lastname && (
                                <FormattedMessage
                                  id={errors.lastname}
                                  defaultMessage={errors.lastname}
                                />
                              )
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Grid container justify='center'>
                          <TextField
                            type='text'
                            variant='standard'
                            size='small'
                            id='sesame'
                            label={
                              <FormattedMessage
                                id='sesameId'
                                defaultMessage='Sesame ID'
                              />
                            }
                            name='sesame'
                            value={values.sesame}
                            onChange={handleChange}
                            onKeyPress={resetUniqueSesameError}
                            error={
                              (touched.sesame && !!errors.sesame) ||
                              Boolean(fieldsInError.sesame)
                            }
                            helperText={
                              (touched.sesame && errors.sesame && (
                                <FormattedMessage
                                  id={errors.sesame}
                                  defaultMessage={errors.sesame}
                                />
                              )) ||
                              (fieldsInError.sesame && (
                                <FormattedMessage id={fieldsInError.sesame} />
                              ))
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container justify='center'>
                          <TextField
                            variant='standard'
                            id='organisationUnit'
                            size='small'
                            width='115'
                            select
                            label={
                              <FormattedMessage
                                id='organisationUnit'
                                defaultMessage='Organisation Unit'
                              />
                            }
                            name='organisationUnitId'
                            onChange={handleChange}
                            value={values.organisationUnitId}
                            error={
                              touched.organisationUnitId &&
                              !!errors.organisationUnitId
                            }
                            helperText={
                              touched.organisationUnitId &&
                              !!errors.organisationUnitId && (
                                <FormattedMessage
                                  id={errors.organisationUnitId}
                                />
                              )
                            }
                          >
                            {organisationUnits.map((organisationUnit) => (
                              <MenuItem
                                key={organisationUnit.id}
                                value={organisationUnit.id}
                              >
                                {organisationUnit.code}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container justify='center'>
                          <TextField
                            variant='standard'
                            id='country'
                            size='small'
                            width='115'
                            select
                            value={values.countryId}
                            label={
                              <FormattedMessage
                                id='country'
                                defaultMessage='Country'
                              />
                            }
                            name='countryId'
                            onChange={handleChange}
                            error={touched.countryId && !!errors.countryId}
                            helperText={
                              touched.countryId &&
                              !!errors.countryId && (
                                <FormattedMessage id={errors.countryId} />
                              )
                            }
                          >
                            {countries.map((country) => (
                              <MenuItem key={country.id} value={country.id}>
                                <FormattedMessage
                                  id={country.iso}
                                  defaultMessage={country.name}
                                />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Dialog open={successOpen} onClose={handleSuccessClose}>
                        <Alert severity='success'>
                          {hasProfile ? (
                            <FormattedMessage
                              id='collaboratorUpdated'
                              defaultMessage='Collaborator profile updated'
                            />
                          ) : (
                            <FormattedMessage
                              id='collaboratorCreated'
                              defaultMessage='Collaborator profile created'
                            />
                          )}

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
                          {apiErrorTitle}
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
                      <Grid item xs={12} sm={12}>
                        <Grid container justify='center'>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            disableElevation
                            disabled={isSubmitting || !dirty}
                            className={classes.submit}
                          >
                            <FormattedMessage id='send' defaultMessage='Send' />
                          </Button>
                          <Backdrop
                            className={classes.backdrop}
                            open={isSubmitting}
                          >
                            <CircularProgress color='primary' />
                          </Backdrop>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
                <BackLink path='/collaborator' />
              </Container>
            )}
          </Formik>
        </>
      )}
    </>
  );
}
Profile.propTypes = {
  user: PropTypes.object.isRequired,
};
