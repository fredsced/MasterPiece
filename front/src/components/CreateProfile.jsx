import React, { useState } from 'react';
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
const countries = [
  { value: 'FRA', label: 'France' },
  { value: 'USA', label: 'United States' },
  { value: 'GBR', label: 'United KingDom' },
];

const organisationUnits = [
  { value: 'GBIS' },
  { value: 'BSC' },
  { value: 'GTS' },
];

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

const ValidationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, 'tooShort')
    .max(50, 'tooLong')
    .required('required'),
  name: Yup.string().min(2, 'tooShort').max(50, 'tooLong').required('required'),
  sesameId: Yup.string()
    .min(7, 'tooShort')
    .max(7, 'tooLong')
    .matches(/[a,x]{1}\d{6}/i, 'notASesamId')
    .required('required'),
  countryIso: Yup.mixed()
    .oneOf(Array.from(countries, (country) => country.value))
    .required('required'),
  ouCode: Yup.mixed()
    .oneOf(Array.from(organisationUnits, (ou) => ou.value))
    .required('required'),
});
export default function Createprofile(props) {
  const { user } = props;
  const history = useHistory();
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSuccessClose = () => {
    const updatedUser = AuthService.getCurrentUser();
    props.updateUser(updatedUser);
    history.push('collaborator');
    setSuccessOpen(false);
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
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        CollaboratorService.create(values)
          .then(() => {
            console.log('collaborator created !');

            CollaboratorService.setCollaboratorHasProfileToTrue();

            setSuccessOpen(true);
          })
          .catch((error) => {
            console.log(error.response);
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
                      error={touched.sesameId && !!errors.sesameId}
                      helperText={
                        touched.sesameId &&
                        !!errors.sesameId && (
                          <FormattedMessage
                            id={errors.sesameId}
                            defaultMessage={errors.sesameId}
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
                        <MenuItem key={ou.value} value={ou.value}>
                          {ou.value}
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
                        <MenuItem key={country.value} value={country.value}>
                          <FormattedMessage
                            id={country.label}
                            defaultMessage={country.label}
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
