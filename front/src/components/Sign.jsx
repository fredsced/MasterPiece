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
import { FormattedMessage } from 'react-intl';

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
    padding: theme.spacing(4, 3, 6, 3),
  },
  logo: {
    width: '150px',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(4),
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

export default function Sign(props) {
  let history = useHistory();
  const classes = useStyles();
  const [apiErrorResponse, setApiErrorResponse] = useState();
  const [uniqueEmailErr, setUniqueEmailErr] = useState();
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleErrorClose = () => {
    setErrorOpen(false);
  };
  const handleSuccessClose = () => {
    if (props.type === 'register') history.push('/login');
    else history.push('/profile');
    setSuccessOpen(false);
  };
  const handleLoginError = (error) => {
    let resMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();
    console.log(resMessage);
    switch (resMessage) {
      case 'Network':
        resMessage = <FormattedMessage id='networkError' />;
        break;
      case 'invalid_grant':
        resMessage = <FormattedMessage id='invalidGrant' />;
        break;
      default:
    }
    setApiErrorResponse(resMessage);
    setErrorOpen(true);
  };

  const handleRegisterError = (error) => {
    let errorMessage =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();
    console.log(errorMessage);
    switch (errorMessage) {
      case 'Network Error':
        errorMessage = <FormattedMessage id='networkError' />;
        break;
      case 'invalid_grant':
        errorMessage = (
          <FormattedMessage id='invalidGrant' defaultMessage='Invalid grant' />
        );
        break;
      default:
    }
    setApiErrorResponse(errorMessage);
    if (
      Array.isArray(errorMessage) &&
      errorMessage.find((e) => e.code === 'UniqueEmail')
    ) {
      setUniqueEmailErr(
        <FormattedMessage
          id='emailNotUnique'
          defaultMessage='Email not unique'
        />
      );
    } else {
      setErrorOpen(true);
    }
  };
  const resetApiErrors = () => {
    setApiErrorResponse();
    setUniqueEmailErr();
    setErrorOpen(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', password_confirmation: '' }}
      validate={(values, apiErrorResponse) => {
        const errors = {};
        if (!values.email) {
          errors.email = (
            <FormattedMessage
              id='emailRequired'
              defaultMessage='Email required'
            />
          );
        } else if (
          !/^[A-Z0-9._%+-]{1,64}@[A-Z0-9.-]{1,64}\.[A-Z]{1,64}$/i.test(
            values.email
          )
        ) {
          errors.email = (
            <FormattedMessage
              id='emailNotValid'
              defaultMessage='Email not valid'
            />
          );
        }
        if (apiErrorResponse) {
          errors.email = (
            <FormattedMessage
              id='emailNotUnique'
              defaultMessage='Email not unique'
            />
          );
        }
        if (!values.password) {
          errors.password = (
            <FormattedMessage
              id='passwordRequired'
              defaultMessage='Password required'
            />
          );
        } else if (values.password.length < 8 || values.password.length > 50) {
          errors.password = (
            <FormattedMessage
              id='passwordMinMax'
              defaultMessage='Password between 8 and 50 characteres'
            />
          );
        }
        if (
          props.type === 'register' &&
          values.password !== values.password_confirmation
        ) {
          errors.password_confirmation = (
            <FormattedMessage
              id='passwordNotMatch'
              defaultMessage="Password doesn't match"
            />
          );
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        resetApiErrors();
        const { email, password } = values;
        setSubmitting(true);
        props.type === 'login'
          ? AuthService.login(email, password)
              .then((response) => {
                props.userLogged(response);
                setSubmitting(false);
                setSuccessOpen(true);
              })
              .catch((error) => {
                handleLoginError(error);
                setSubmitting(false);
              })
          : AuthService.register(email, password)
              .then(() => {
                setSuccessOpen(true);
              })
              .catch((error) => {
                handleRegisterError(error);
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
            <Grid container spacing={2} justify='center'>
              <div className={classes.logo}>
                <img src={logo} alt='logo Banque Générale' />
              </div>

              <Typography component='h1' variant='h3'>
                {props.type === 'register' ? (
                  <FormattedMessage
                    id='createAccount'
                    defaultMessage='Create account'
                  />
                ) : (
                  <FormattedMessage
                    id='connectToMCP'
                    defaultMessage='Connect to MyCP'
                  />
                )}
              </Typography>
            </Grid>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type='text'
                    autoComplete='email'
                    variant='outlined'
                    fullWidth
                    id='email'
                    label={
                      dirty && errors.email ? (
                        errors.email
                      ) : (
                        <FormattedMessage id='email' defaultMessage='Email' />
                      )
                    }
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    error={(dirty && !!errors.email) || !!uniqueEmailErr}
                  />
                  {!!uniqueEmailErr ? (
                    <Grid item xs={12}>
                      <Typography
                        color='secondary'
                        component='p'
                        display='block'
                      >
                        {uniqueEmailErr}
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
                      dirty && !!errors.password ? (
                        errors.password
                      ) : (
                        <FormattedMessage
                          id='password'
                          defaultMessage='Password'
                        />
                      )
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
                      {props.type === 'register'
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
                {props.type === 'register' ? (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        autoComplete='password confirmation'
                        fullWidth
                        name='password_confirmation'
                        label={
                          dirty && !!errors.password_confirmation ? (
                            errors.password_confirmation
                          ) : (
                            <FormattedMessage
                              id='passwordConfirmation'
                              defaultMessage='Password confirmation'
                            />
                          )
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
                  </>
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
                {props.type === 'register' ? (
                  <FormattedMessage id='send' defaultMessage='Send' />
                ) : (
                  <FormattedMessage id='connection' defaultMessage='Sign In' />
                )}
              </Button>
              <Backdrop className={classes.backdrop} open={isSubmitting}>
                <CircularProgress color='primary' />
              </Backdrop>
              <Grid container justify='flex-end'>
                <Grid item>
                  {props.type === 'register' ? (
                    <Link component={RouterLink} to='/login' variant='body2'>
                      <FormattedMessage
                        id='alreadyAnAccount?'
                        defaultMessage='Already have an account? sign in'
                      />
                    </Link>
                  ) : (
                    <Link component={RouterLink} to='/register' variant='body2'>
                      <FormattedMessage
                        id='noAccount?'
                        defaultMessage='No account? register'
                      />
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
