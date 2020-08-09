import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import axios from 'axios';
import queryString from 'query-string';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Sign = ({ type }) => {
  const classes = useStyles();
  const [apiError, setApiError] = useState([]);


  return (
    <Formik
      initialValues={{ email: '', password: '', password_confirmation: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email obligatoire';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Email non valide';
        }
        if (!values.password) {
          errors.password = 'Le mot de passe est obligatoire'
        }
        else if (values.password.length < 8) {
          errors.password = 'Le mot de passe est inférieur à 8 caractères'
        }
        if ((type === 'creation') && values.password !== values.password_confirmation) {
          errors.password_confirmation = 'Le mot de passe n\'est pas identique';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const options = {};
        const { email, password } = values;
        let valuesToSend = {};

        if (type === 'creation') {
          valuesToSend = { email, password };
          options.url = 'http://localhost:8082/api/private/accounts';
          options.method = 'POST';
          options.data = (valuesToSend);
          options.headers = {'content-type': 'application/json'}

        }
        else {
          const client_id = 'my-client-app';
          const grant_type = 'password';
          valuesToSend = { username: email, password, client_id, grant_type };
          options.method = 'POST';
          options.data = queryString.stringify(valuesToSend);
          options.url = 'http://localhost:8082/oauth/token';
          options.headers = {'content-type': 'application/x-www-form-urlencoded'}
        }
        setSubmitting(true);
        setApiError(false);
        axios(options).then(resp => {
            // to do...


          }).catch(error => {
            error.response && setApiError(error.response.data);

          }).then(() => {
            setSubmitting(false);
          })

      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting
      }) => (
          <form className="creation-form" onSubmit={handleSubmit}>
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Typography component="h2" variant="h4">
                  {type === 'creation' ?
                    'Créer votre compte' :
                    'Connectez vous'}
                </Typography>
                <Avatar className={classes.avatar}>
                </Avatar>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      autoComplete="email"
                      variant="outlined"
                      fullWidth
                      id="email"
                      label={(touched.email && errors.email) ? errors.email : 'Adresse Email'}
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      error={(touched.email && !!errors.email) || (apiError && Array.isArray(apiError) && !!apiError.find(e => e.field === 'email'))}
                    />
                    {(apiError && Array.isArray(apiError) && !!apiError.find(e => e.field === 'email')) ? (
                      <Grid item xs={12}>
                        <Typography color="secondary" component="p" display="block">Email déjà utilisé</Typography>
                      </Grid>)
                      : null
                    }
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      autoComplete="password"
                      fullWidth
                      name="password"
                      label={(touched.password && !!errors.password) ? errors.password : 'Mot de passe'}
                      type="password"
                      id="password"
                      onChange={handleChange}
                      value={values.password}
                      error={touched.password && !!errors.password}
                    />
                  </Grid>
                  {type === 'creation' ? (
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        autoComplete="password confirmation"
                        fullWidth
                        name="password_confirmation"
                        label={(touched.password_confirmation && !!errors.password_confirmation) ? errors.password_confirmation : 'Confirmation du mot de passe'}
                        type="password"
                        id="password_confirmation"
                        onChange={handleChange}
                        value={values.password_confirmation}
                        error={touched.password_confirmation && !!errors.password_confirmation}
                      />
                    </Grid>)
                    : null}
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className={classes.submit}

                >
                  Envoyer
                  </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      {type === 'creation' ?
                        'Déjà un compte? connectez vous' :
                        'Pas de compte? créer votre compte'}
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </form>
        )}
    </Formik>
  )
}
export default Sign;
