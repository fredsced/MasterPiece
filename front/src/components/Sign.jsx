import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import logo from '../assets/logo.svg';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Dialog } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AuthService from '../services/AuthService';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { object, string, ref } from 'yup';
import Alert from './Alert';
import handleValidationError from '../services/handleValidationError';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 110px)',
    paddingTop: theme.spacing(6),
    marginBottom: '10px',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 3, 6, 3),
  },
  logo: {
    width: '200px',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(5),
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
const validationSchema = (type) => {
  if (type === 'register') {
    return object().shape({
      email: string()
        .email('emailNotValid')
        .required('emailRequired')
        .max(254, 'tooLong'),
      password: string()
        .min(8, 'tooShort')
        .max(25, 'tooLong')
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\S{8,25}/,
          'PasswordComplexityRequirement'
        )
        .required('passwordRequired'),
      password_confirmation: string()
        .oneOf([ref('password'), null], 'passwordNotMatch')
        .required('passwordConfirmationRequired'),
    });
  } else if (type === 'login') {
    return object().shape({
      email: string().email('emailNotValid').required('emailRequired'),
      password: string()
        .min(8, 'passwordMinMaxError')
        .max(25, 'passwordMinMaxError')
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\S{8,25}/,
          'passwordNotComplex'
        )
        .required('passwordRequired'),
    });
  }
};

export default function Sign(props) {
  const history = useHistory();
  const classes = useStyles();
  const [apiErrorTitle, setApiErrorTitle] = useState();
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [fieldsInError, setFieldsInError] = useState({});

  const handleErrorClose = () => {
    setErrorOpen(false);
  };
  const handleSuccessClose = () => {
    if (props.type === 'register') {
      setSuccessOpen(false);
      history.push('/login');
    } else if (props.type === 'login') {
      setSuccessOpen(false);
      window.location = './collaborator';
    }
  };
  const handleLoginError = (error) => {
    let resMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();
    resMessage = <FormattedMessage id={resMessage} default={resMessage} />;
    setApiErrorTitle(resMessage);
    setErrorOpen(true);
  };

  const handleRegisterError = (error) => {
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
  const resetApiErrors = () => {
    setApiErrorTitle();
    setFieldsInError({});
    setErrorOpen(false);
  };
  return (
    <Formik
      initialValues={{ email: '', password: '', password_confirmation: '' }}
      validationSchema={() => validationSchema(props.type)}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        resetApiErrors();
        const { email, password } = values;
        setSubmitting(true);
        props.type === 'login'
          ? AuthService.login(email, password)
              .then(() => {
                setSubmitting(false);
                setSuccessOpen(true);
              })
              .catch((error) => {
                handleLoginError(error);
                setSubmitting(false);
              })
          : AuthService.register(email, password)
              .then(() => {
                resetForm();
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
        handleChange,
        handleSubmit,
        isSubmitting,
        dirty,
      }) => (
        <Container component='main' className={classes.main} maxWidth='xs'>
          <Paper className={classes.paper}>
            <Grid className={classes.title} container spacing={2}>
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
                      (touched.email && Boolean(errors.email)) ||
                      Boolean(fieldsInError.email)
                    }
                  />
                  {Boolean(fieldsInError.email) ? (
                    <Grid item xs={12}>
                      <Typography
                        color='secondary'
                        component='p'
                        variant='subtitle1'
                        display='block'
                      >
                        {<FormattedMessage id={fieldsInError.email} />}
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
                      touched.password && Boolean(errors.password) ? (
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
                    error={
                      (touched.password && Boolean(errors.password)) ||
                      Boolean(fieldsInError.password)
                    }
                  />
                  {Boolean(fieldsInError.password) ? (
                    <Grid item xs={12}>
                      <Typography
                        color='secondary'
                        component='p'
                        variant='subtitle1'
                        display='block'
                      >
                        {<FormattedMessage id={fieldsInError.password} />}
                      </Typography>
                    </Grid>
                  ) : null}
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
                          Boolean(errors.password_confirmation) ? (
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
                          Boolean(errors.password_confirmation)
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
                disabled={isSubmitting || !dirty}
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
                    <Link
                      component={RouterLink}
                      underline='none'
                      to='/login'
                      variant='body2'
                    >
                      <FormattedMessage
                        id='alreadyAnAccount?'
                        defaultMessage='Already have an account? sign in'
                      />
                    </Link>
                  ) : (
                    <Link
                      component={RouterLink}
                      underline='none'
                      to='/register'
                      variant='body2'
                    >
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
Sign.propTypes = {
  type: PropTypes.oneOf(['login', 'register']).isRequired,
  userLogged: PropTypes.func,
};
