import React from 'react';
import { Container, Paper, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

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
  form: {
    width: '100%',
    marginTop: theme.spacing(5),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: 220,
  },
}));

export default function SearchComplianceOfficer(props) {
  const classes = useStyles();

  return (
    <Container component='main' className={classes.main} maxWidth='md'>
      <Paper className={classes.paper}>
        <Grid container spacing={2} justify='center'>
          <Typography component='h1' variant='h3'>
            <FormattedMessage
              id='findLCO'
              defaultMessage='Find your compliance officer'
            />
          </Typography>
        </Grid>
      </Paper>
    </Container>
  );
}
