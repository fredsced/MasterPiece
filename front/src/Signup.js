import React from 'react';
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Formik initialValues={{ email: '', password: '', password_confirmation: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email obligatoire';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Email non valide';
        }
        if (!values.password) {
          errors.password = 'obligatoire'
        }
        else if (values.password.length < 8) {
          errors.password = 'inférieur à 8 caractères'
        }
        if (values.password !== values.password_confirmation) {
          errors.password_confirmation = 'Le mot de passe n\'est pas identique';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { email, password } = values;
        const valuesToSend = { email, password };
        setSubmitting(true);
        axios.post('http://localhost:8082/api/private/account',
          valuesToSend,
          {
            headers:{
              'Content-Type': 'application/json',
                      
            }
          }).then(resp => {
            // to do...
            console.log(resp);
            
          }).catch(error =>{
            // to do ...
            console.log(error);
           
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
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
          <form className="creation-form" onSubmit={handleSubmit}>
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Typography component="h1">
                  Créer votre compte
                </Typography>
                <Avatar className={classes.avatar}>
                </Avatar>
             
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        type="email"
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label={(touched.email && !!errors.email) ? errors.email : "Adresse Email"}
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && !!errors.email}
                      //helperText={touched.email ? errors.email : ''}

                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label={(touched.password && !!errors.password) ? 'Mot de passe ' + errors.password : "Mot de passe"}
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                        error={touched.password && !!errors.password}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password_confirmation"
                        label={(touched.password_confirmation && Boolean(errors.password_confirmation)) ? errors.password_confirmation : 'Confirmation du mot de passe'}
                        type="password"
                        id="password_confirmation"
                        onChange={handleChange}
                        value={values.password_confirmation}
                        error={touched.password_confirmation && !!errors.password_confirmation}
                      />
                    </Grid>
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
                        Déjà un compte? connectez vous
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
