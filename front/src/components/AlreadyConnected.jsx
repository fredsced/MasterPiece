import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

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
}));

export default function AlreadyConnected() {
  const classes = useStyles();
  return (
    <Container component='main' className={classes.main} maxWidth='sm'>
      <Paper className={classes.paper}>
        <Grid container spacing={2} justify='center'>
          <Grid item>
            <Typography component='h1' variant='h4'>
              <FormattedMessage
                id='alreadyConnected'
                defaultMessage='Already connected'
              />
            </Typography>
          </Grid>
          <Grid container spacing={2} justify='flex-end'>
            <Grid item>
              <Link component={RouterLink} to='/collaborator' variant='body2'>
                <FormattedMessage
                  id='collaboratorPage'
                  defaultMessage='Collaborator Page'
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
