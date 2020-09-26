import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../logo.svg';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Dialog } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AuthService from '../services/AuthService';
import { useHistory } from 'react-router-dom';

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
    padding: theme.spacing(6, 3),
  },
  logo: {
    width: '150px',
    marginBottom: theme.spacing(4),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    backgroundColor: 'secondary',
    color: 'snow',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Sign({ type, ...props }) {
  let history = useHistory();
  const classes = useStyles();
  const [apiErrorResponse, setApiErrorResponse] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const handleErrorClose = () => {
    setErrorOpen(false);
  };
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', password_confirmation: '' }}
      validate={(values, apiErrorResponse) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email obligatoire';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Email non valide';
        }
        if (apiErrorResponse) {
          errors.email = 'Email déjà utilisé';
        }
        if (!values.password) {
          errors.password = 'Le mot de passe est obligatoire';
        } else if (values.password.length < 8) {
          errors.password = 'Le mot de passe est inférieur à 8 caractères';
        }
        if (
          type === 'register' &&
          values.password !== values.password_confirmation
        ) {
          errors.password_confirmation = "Le mot de passe n'est pas identique";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { email, password } = values;
        setSubmitting(true);
        type === 'login' &&
          AuthService.login(email, password)
            .then(() => {
              setSuccessOpen(true);
              history.push('/profile');
              window.location.reload();
            })
            .catch((error) => {
              console.log('i m in the catch block');
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.error) ||
                error.message ||
                error.toString();
              setApiErrorResponse(resMessage);
              setErrorOpen(true);
            })
            .then(() => {
              setSubmitting(false);
            });

        type === 'register' &&
          AuthService.register(email, password)
            .then(() => {
              history.push('/');
            })
            .catch((error) => {
              console.log('error tostring: ' + error.toString());
              const resMessage =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              setApiErrorResponse(resMessage);
              if (!Array.isArray(resMessage)) {
                setErrorOpen(true);
              }
            })
            .then(() => {
              setSubmitting(false);
            });
      }}
    >
      {({
        values,
        errors,
        touched,
        dirty,
        handleChange,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <Container component='main' className={classes.main} maxWidth='xs'>
          <Paper className={classes.paper}>
            <div className={classes.logo}>
              <img src={logo} alt='logo Banque Générale' />
            </div>
            <Typography component='h1' variant='h3'>
              {type === 'register'
                ? 'Créer votre compte'
                : 'Connexion à BG Connect'}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type='text'
                    autoComplete='email'
                    variant='outlined'
                    fullWidth
                    id='email'
                    label={dirty && errors.email ? errors.email : 'Email'}
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    error={
                      (dirty && !!errors.email) ||
                      (apiErrorResponse &&
                        Array.isArray(apiErrorResponse) &&
                        !!apiErrorResponse.find((e) => e.field === 'email'))
                    }
                  />
                  {apiErrorResponse &&
                  Array.isArray(apiErrorResponse) &&
                  !!apiErrorResponse.find((e) => e.field === 'email') ? (
                    <Grid item xs={12}>
                      <Typography
                        color='secondary'
                        component='p'
                        display='block'
                      >
                        Email déjà utilisé
                      </Typography>
                    </Grid>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    autoComplete='password'
                    fullWidth
                    name='password'
                    label={
                      dirty && !!errors.password
                        ? errors.password
                        : 'Mot de passe'
                    }
                    type='password'
                    id='password'
                    onChange={handleChange}
                    value={values.password}
                    error={dirty && !!errors.password}
                  />
                  <Dialog open={errorOpen} onClose={handleErrorClose}>
                    <Alert severity='error'>
                      {Array.isArray(apiErrorResponse)
                        ? null
                        : apiErrorResponse}
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
                  <Dialog open={successOpen} onClose={handleSuccessClose}>
                    <Alert severity='success'>
                      {type === 'register'
                        ? 'Compte crée'
                        : 'Vous êtes connecté'}
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
                </Grid>
                {type === 'register' ? (
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      autoComplete='password confirmation'
                      fullWidth
                      name='password_confirmation'
                      label={
                        dirty && !!errors.password_confirmation
                          ? errors.password_confirmation
                          : 'Confirmation du mot de passe'
                      }
                      type='password'
                      id='password_confirmation'
                      onChange={handleChange}
                      value={values.password_confirmation}
                      error={
                        touched.password_confirmation &&
                        !!errors.password_confirmation
                      }
                    />
                  </Grid>
                ) : null}
              </Grid>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                disableElevation
                disabled={isSubmitting || !isValid}
                className={classes.submit}
              >
                {type === 'register' ? 'Envoyer' : 'Connexion'}
              </Button>
              <Backdrop className={classes.backdrop} open={isSubmitting}>
                <CircularProgress color='primary' />
              </Backdrop>
              <Grid container justify='flex-end'>
                <Grid item>
                  {type === 'register' ? (
                    <Link component={RouterLink} to='/' variant='body2'>
                      Déjà un compte? connectez vous
                    </Link>
                  ) : (
                    <Link component={RouterLink} to='/register' variant='body2'>
                      Pas de compte? créer votre compte
                    </Link>
                  )}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      )}
    </Formik>
  );
}
