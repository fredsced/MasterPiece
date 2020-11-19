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
import * as Yup from 'yup';

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
const ValidationSchema = (type) => {
  if (type === 'register') {
    return Yup.object().shape({
      email: Yup.string()
        .email('emailNotValid')
        .required('emailRequired')
        .max(255, 'tooLong'),
      password: Yup.string()
        .min(8, 'tooShort')
        .max(30, 'tooLong')
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\S{8,30}/,
          'passwordNotComplex'
        )
        .required('passwordRequired'),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'passwordNotMatch')
        .required('required'),
    });
  } else {
    return Yup.object().shape({
      email: Yup.string().email('emailNotValid').required('emailRequired'),
      password: Yup.string().required('passwordRequired'),
    });
  }
};

export default function Sign(props) {
  const history = useHistory();
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
    else history.push('/collaborator');
    setSuccessOpen(false);
  };
  const handleLoginError = (error) => {
    let resMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();
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
    switch (errorMessage) {
      case 'Network Error':
        errorMessage = <FormattedMessage id='networkError' />;
        break;
      default:
    }
    setApiErrorResponse(errorMessage);
    if (
      Array.isArray(errorMessage) &&
      errorMessage.find((e) => e.field === 'email' && e.code === 'UniqueEmail')
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
      validationSchema={() => ValidationSchema(props.type)}
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
                      touched.email && errors.email ? (
                        <FormattedMessage
                          id={errors.email}
                          defaultMessage={errors.email}
                        />
                      ) : (
                        <FormattedMessage id='email' defaultMessage='Email' />
                      )
                    }
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    error={
                      (touched.email && !!errors.email) || !!uniqueEmailErr
                    }
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
                      touched.password && !!errors.password ? (
                        <FormattedMessage
                          id={errors.password}
                          defaultMessage={errors.password}
                        />
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
                    error={touched.password && !!errors.password}
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
                      {props.type === 'register' ? (
                        <FormattedMessage
                          id='accountCreated'
                          defaultMessage='Account created'
                        />
                      ) : (
                        <FormattedMessage
                          id='connected'
                          defaultMessage='Connected'
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
                          touched.password_confirmation &&
                          !!errors.password_confirmation ? (
                            <FormattedMessage
                              id={errors.password_confirmation}
                              defaultMessage={errors.password_confirmation}
                            />
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
                disabled={isSubmitting}
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
