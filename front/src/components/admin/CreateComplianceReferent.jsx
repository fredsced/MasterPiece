import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
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
import ComplianceService from '../../services/ComplianceService';
import CountriesService from '../../services/CountriesService';
import OrgUnitService from '../../services/OrgUnitService';
import RiskService from '../../services/RisksService';
import LevelsService from '../../services/LevelsService';
import { useHistory } from 'react-router-dom';
import Alert from '../Alert';
import handleRestApiError from '../../services/handleRestApiError';
import RedirectedContent from '../RedirectedContent';
import BackLink from '../BackLink';

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
    country: object().required('required'),
    organisationUnit: object().required('required'),
    risk: object().required('required'),
    level: object().required('required'),
    phone: string().matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{10,30}/,
      'invalidPhoneFormat'
    ),
    email: string()
      .email('emailNotValid')
      .required('emailRequired')
      .max(254, 'tooLong'),
  });
};

export default function CreateComplianceReferent(props) {
  const history = useHistory();
  const classes = useStyles();
  const [errorToFetch, setErrorToFetch] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [apiErrorTitle, setApiErrorTitle] = useState();
  const [fieldsInError, setFieldsInError] = useState({});
  const [errorOpen, setErrorOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [organisationUnits, setOrganisationUnits] = useState([]);
  const [risks, setRisks] = useState([]);
  const [levels, setLevels] = useState([]);
  const [fetchingCountries, setFetchingCountries] = useState(true);
  const [fetchingOrgUnits, setFetchingOrgUnits] = useState(true);
  const [fetchingRisks, setFetchingRisks] = useState(true);
  const [fetchingLevels, setFetchingLevels] = useState(true);
  const [errorStatus, setErrorStatus] = useState();

  const user = props.user;

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
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            setErrorStatus(error.response.status);
          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             */
          } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
          }
        })
        .then(() => {
          setFetchingOrgUnits(false);
        });
    };
    const fetchingRisks = () => {
      RiskService.getAll()
        .then((result) => {
          setRisks(result.data);
        })
        .catch((error) => {
          setErrorToFetch(true);
        })
        .then(() => {
          setFetchingRisks(false);
        });
    };
    const fetchingLevels = () => {
      LevelsService.getAll()
        .then((result) => {
          setLevels(result.data);
        })
        .catch((error) => {
          setErrorToFetch(true);
        })
        .then(() => {
          setFetchingLevels(false);
        });
    };
    fetchCountries();
    fetchOrgUnits();
    fetchingRisks();
    fetchingLevels();
  }, []);

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    history.push('/admin');
  };
  const handleErrorClose = () => {
    setErrorOpen(false);
  };
  const handleCreationError = (error) => {
    const result = handleRestApiError(error);
    setFieldsInError(result.fieldsInError);

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
      {!user.isAdmin ? (
        <RedirectedContent
          mainTitle='noAuthorization'
          mainMessage='noAuthorizationMessage'
          link='/collaborator'
          linkMessage='backToCollaboratorPage'
        />
      ) : errorToFetch ? (
        errorStatus === 401 ? (
          <RedirectedContent
            mainTitle='notConnected'
            mainMessage='notConnectedMessage'
            link='/login'
            linkMessage='backToAuthentification'
          />
        ) : (
          <RedirectedContent
            mainTitle='Connection issue'
            mainMessage='Sorry we cannot handle your request for the moment'
            link='/admin'
            linkMessage='backToAdminPage'
          />
        )
      ) : fetchingCountries ||
        fetchingOrgUnits ||
        fetchingRisks ||
        fetchingLevels ? (
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
              firstname: '',
              lastname: '',
              sesame: '',
              country: '',
              organisationUnit: '',
              risk: '',
              level: '',
              email: '',
              phone: '',
            }}
            validationSchema={() => ValidationSchema()}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              resetApiErrors();
              ComplianceService.saveCR(values)
                .then(() => {
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
                      <FormattedMessage
                        id='createComplianceReferent'
                        defaultMessage='Create compliance referent'
                      />
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
                              Boolean(fieldsInError['collaboratorDto.sesame'])
                            }
                            helperText={
                              (touched.sesame && errors.sesame && (
                                <FormattedMessage
                                  id={errors.sesame}
                                  defaultMessage={errors.sesame}
                                />
                              )) ||
                              (fieldsInError['collaboratorDto.sesame'] && (
                                <FormattedMessage
                                  id={fieldsInError['collaboratorDto.sesame']}
                                />
                              ))
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
                            id='email'
                            label={
                              <FormattedMessage
                                id='email'
                                defaultMessage='email'
                              />
                            }
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                            error={
                              (touched.email && !!errors.email) ||
                              Boolean(fieldsInError.email)
                            }
                            helperText={
                              (touched.email && !!errors.email && (
                                <FormattedMessage
                                  id={errors.email}
                                  defaultMessage={errors.email}
                                />
                              )) ||
                              (fieldsInError.email && (
                                <FormattedMessage id={fieldsInError.email} />
                              ))
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
                            id='phone'
                            label={
                              <FormattedMessage
                                id='phone'
                                defaultMessage='phone'
                              />
                            }
                            name='phone'
                            value={values.phone}
                            onChange={handleChange}
                            error={
                              (touched.phone && Boolean(errors.phone)) ||
                              Boolean(fieldsInError.phone)
                            }
                            helperText={
                              touched.phone &&
                              (Boolean(errors.phone) ||
                                Boolean(fieldsInError.phone)) && (
                                <FormattedMessage
                                  id={
                                    Boolean(errors.phone)
                                      ? errors.phone
                                      : fieldsInError.phone
                                  }
                                  defaultMessage={
                                    errors.phone
                                      ? errors.phone
                                      : fieldsInError.phone
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
                            name='organisationUnit'
                            onChange={handleChange}
                            value={values.organisationUnit}
                            error={
                              touched.organisationUnit &&
                              !!errors.organisationUnit
                            }
                            helperText={
                              touched.organisationUnit &&
                              !!errors.organisationUnit && (
                                <FormattedMessage
                                  id={errors.organisationUnit}
                                />
                              )
                            }
                          >
                            {organisationUnits.map((organisationUnit) => (
                              <MenuItem
                                key={organisationUnit.id}
                                value={organisationUnit}
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
                            value={values.country}
                            label={
                              <FormattedMessage
                                id='country'
                                defaultMessage='Country'
                              />
                            }
                            name='country'
                            onChange={handleChange}
                            error={touched.country && !!errors.country}
                            helperText={
                              touched.country &&
                              !!errors.country && (
                                <FormattedMessage id={errors.country} />
                              )
                            }
                          >
                            {countries.map((country) => (
                              <MenuItem key={country.id} value={country}>
                                <FormattedMessage
                                  id={country.iso}
                                  defaultMessage={country.name}
                                />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container justify='center'>
                          <TextField
                            variant='standard'
                            id='risk'
                            size='small'
                            width='115'
                            select
                            value={values.risk}
                            label={
                              <FormattedMessage
                                id='risk'
                                defaultMessage='Risk'
                              />
                            }
                            name='risk'
                            onChange={handleChange}
                            error={touched.risk && !!errors.risk}
                            helperText={
                              touched.risk &&
                              !!errors.risk && (
                                <FormattedMessage id={errors.risk} />
                              )
                            }
                          >
                            {risks.map((risk) => (
                              <MenuItem key={risk.id} value={risk}>
                                <FormattedMessage
                                  id={risk.code}
                                  defaultMessage={risk.label}
                                />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container justify='center'>
                          <TextField
                            variant='standard'
                            id='level'
                            size='small'
                            width='115'
                            select
                            value={values.level}
                            label={
                              <FormattedMessage
                                id='level'
                                defaultMessage='Level'
                              />
                            }
                            name='level'
                            onChange={handleChange}
                            error={touched.level && !!errors.level}
                            helperText={
                              touched.level &&
                              !!errors.level && (
                                <FormattedMessage id={errors.level} />
                              )
                            }
                          >
                            {levels.map((level) => (
                              <MenuItem key={level.id} value={level}>
                                <FormattedMessage
                                  id={level.code}
                                  defaultMessage={level.label}
                                />
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Dialog open={successOpen} onClose={handleSuccessClose}>
                        <Alert severity='success'>
                          <FormattedMessage
                            id='complianceReferentCreated'
                            defaultMessage='Compliance referent created'
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
                <BackLink
                  path='/admin'
                  title='back'
                  defaultMessage='Back to previous page'
                />
              </Container>
            )}
          </Formik>
        </>
      )}
    </>
  );
}
CreateComplianceReferent.propTypes = {
  user: PropTypes.object.isRequired,
};
