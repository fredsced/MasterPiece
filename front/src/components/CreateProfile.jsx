import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
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
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';
import CountriesService from '../services/CountriesService';
import OrgUnitService from '../services/OrgUnitService';


const fakeCountries = [
  { iso: 'FRA', name: 'France' },
  { iso: 'USA', name: 'United States' },
  { iso: 'GBR', name: 'United KingDom' },
];

const fakeOrganisationUnits = [{ code: 'GBIS' }, { code: 'BSC' }, { code: 'GTS' }];

const LOCAL_STORAGE_USER = process.env.REACT_APP_LOCAL_STORAGE_USER;

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

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

const ValidationSchema = (countries, organisationUnits) => {
  return Yup.object().shape({
    firstname: Yup.string()
      .min(2, 'tooShort')
      .max(50, 'tooLong')
      .required('required'),
    name: Yup.string()
      .min(2, 'tooShort')
      .max(50, 'tooLong')
      .required('required'),
    sesameId: Yup.string()
      .min(7, 'tooShort')
      .max(7, 'tooLong')
      .matches(/[a,x]{1}\d{6}/i, 'notASesamId')
      .required('required'),
    countryIso: Yup.mixed()
      .oneOf(Array.from(countries, (country) => country.iso))
      .required('required'),
    ouCode: Yup.mixed()
      .oneOf(Array.from(organisationUnits, (ou) => ou.code))
      .required('required'),
  });
};

export default function Createprofile(props) {
  const { user } = props;
  const history = useHistory();
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = useState(false);
  const [uqSesameId, setUqSesameId] = useState();
  const [errorOpen, setErrorOpen] = useState(false);
  const [apiErrorResponse, setApiErrorResponse] = useState();
  const [countries, setCountries] = useState([]);
  const [organisationUnits, setOrganisationUnits] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const result = await CountriesService.getAll();
      setCountries(result);
    };
    const fetchOrgUnits = async () => {
      const orgUnits = await OrgUnitService.getAll();
      setOrganisationUnits(orgUnits);
    };
    fetchCountries();
    fetchOrgUnits();
  }, []);

  const handleSuccessClose = () => {
    const updatedUser = AuthService.getCurrentUser();
    props.updateUser(updatedUser);
    setSuccessOpen(false);
  };
  const handleErrorClose = () => {
    setErrorOpen(false);
  };
  const handleCreationError = (error) => {
    let errorMessage =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();
    switch (errorMessage) {
      case 'Network Error':
        errorMessage = <FormattedMessage id='networkError' />;
        break;
      default:
    }
    setApiErrorResponse(errorMessage);
    if (
      Array.isArray(errorMessage) &&
      errorMessage.find(
        (error) => error.field === 'sesameId' && error.code === 'UniqueSesameId'
      )
    ) {
      setUqSesameId(
        <FormattedMessage
          id='SesameNotUnique'
          defaultMessage='Sesame ID not unique'
        />
      );
    } else {
      setErrorOpen(true);
    }
  };
  const resetApiErrors = () => {
    setUqSesameId();
    setErrorOpen(false);
    setApiErrorResponse();
  };

  return (
    <Formik
      initialValues={{
        firstname: '',
        name: '',
        sesameId: '',
        countryIso: '',
        ouCode: '',
      }}
      validationSchema={() => ValidationSchema(countries, organisationUnits)}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        resetApiErrors();
        CollaboratorService.create(values)
          .then(() => {
            CollaboratorService.updateCollaboratorProfile(values);
            setSuccessOpen(true);
          })
          .catch((error) => {
            handleCreationError(error);
            console.log(error.response.data);
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
        isValid,
        touched,
      }) => (
        <Container component='main' className={classes.main} maxWidth='sm'>
          <Paper className={classes.paper}>
            <Grid container spacing={2} justify='center'>
              <Typography component='h1' variant='h3'>
                <FormattedMessage
                  id='createProfile'
                  defaultMessage='Create your profile'
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
                      error={touched.firstname && !!errors.firstname}
                      helperText={
                        touched.firstname &&
                        !!errors.firstname && (
                          <FormattedMessage
                            id={errors.firstname}
                            defaultMessage={errors.firstname}
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
                      id='name'
                      label={
                        <FormattedMessage
                          id='lastname'
                          defaultMessage='Lastname'
                        />
                      }
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && !!errors.name}
                      helperText={
                        touched.name &&
                        !!errors.name && (
                          <FormattedMessage
                            id={errors.name}
                            defaultMessage={errors.name}
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
                      id='sesameId'
                      label={
                        <FormattedMessage
                          id='sesameId'
                          defaultMessage='Sesame ID'
                        />
                      }
                      name='sesameId'
                      value={values.sesameId}
                      onChange={handleChange}
                      error={
                        !!uqSesameId || (touched.sesameId && !!errors.sesameId)
                      }
                      helperText={
                        uqSesameId ||
                        (touched.sesameId && errors.sesameId && (
                          <FormattedMessage
                            id={errors.sesameId}
                            defaultMessage={errors.sesameId}
                          />
                        ))
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container justify='center'>
                    <TextField
                      variant='standard'
                      id='ouCode'
                      size='small'
                      width='115'
                      select
                      label={
                        <FormattedMessage
                          id='organisationUnit'
                          defaultMessage='Organisation Unit'
                        />
                      }
                      name='ouCode'
                      onChange={handleChange}
                      value={values.ouCode}
                      error={touched.ouCode && !!errors.ouCode}
                      helperText={
                        touched.ouCode &&
                        !!errors.ouCode && (
                          <FormattedMessage id={errors.ouCode} />
                        )
                      }
                    >
                      {organisationUnits.map((ou) => (
                        <MenuItem key={ou.code} value={ou.code}>
                          {ou.code}
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
                      value={values.countryIso}
                      label={
                        <FormattedMessage
                          id='country'
                          defaultMessage='Country'
                        />
                      }
                      name='countryIso'
                      onChange={handleChange}
                      error={touched.countryIso && !!errors.countryIso}
                      helperText={
                        touched.countryIso &&
                        !!errors.countryIso && (
                          <FormattedMessage id={errors.countryIso} />
                        )
                      }
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.iso} value={country.iso}>
                          <FormattedMessage
                            id={country.name}
                            defaultMessage={country.name}
                          />
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Dialog open={successOpen} onClose={handleSuccessClose}>
                  <Alert severity='success'>
                    <FormattedMessage
                      id='collaboratorCreated'
                      defaultMessage='Collaborator profile created'
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
                    {apiErrorResponse}
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
                      disabled={isSubmitting}
                      className={classes.submit}
                    >
                      <FormattedMessage
                        id='send'
                        defaultMessage='Send'
                      ></FormattedMessage>
                    </Button>
                    <Backdrop className={classes.backdrop} open={isSubmitting}>
                      <CircularProgress color='primary' />
                    </Backdrop>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      )}
    </Formik>
  );
}
