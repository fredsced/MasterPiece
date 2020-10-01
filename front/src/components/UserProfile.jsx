import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
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
    padding: theme.spacing(6, 3),
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
          <Typography component='p' variant='body1'>
            Vous n'êtes pas connecté
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
