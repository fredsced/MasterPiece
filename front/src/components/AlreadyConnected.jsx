import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
}));

export default function AlreadyConnected() {
  const classes = useStyles();
  return (
    <Container component='main' className={classes.main} maxWidth='xs'>
      <Paper className={classes.paper}>
        <Grid container spacing={2} justify='center'>
          <Typography component='h1' variant='h3'>
            Already connected
          </Typography>
        </Grid>
      </Paper>
    </Container>
  );
}
