import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

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
    padding: theme.spacing(6, 3, 2),
  },
}));
export default function Userprofile(props) {
  const { user } = props;
  const classes = useStyles();

  return (
    <Container component='main' className={classes.main} maxWidth='md'>
      <Paper className={classes.paper}>
        {user ? (
          <Typography component='p' variant='body1'>
            {`Hello ${user.userEmail}`}
          </Typography>
        ) : (
          <Grid container spacing={2} justify='center'>
            <Grid item={12}>
              <Typography component='h1' variant='h4'>
                Vous n'êtes pas connecté
              </Typography>
            </Grid>
            <Grid container spacing={2} justify='flex-end'>
              <Grid item>
                <Link component={RouterLink} to='/login' variant='body2'>
                  Connectez vous
                </Link>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
