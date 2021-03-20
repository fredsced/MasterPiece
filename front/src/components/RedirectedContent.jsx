import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Grid, Typography, Link, Container } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
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
    padding: theme.spacing(4, 3, 2),
  },
  bottom: {
    marginTop: theme.spacing(6),
  },
}));

export default function RedirectedContent({
  mainTitle,
  mainMessage,
  link,
  linkMessage,
}) {
  const classes = useStyles();
  return (
    <Container component='main' className={classes.main} maxWidth='sm'>
      <Paper className={classes.paper}>
        <Grid container spacing={2} justify='center'>
          <Grid item>
            <Typography component='h1' variant='h4'>
              <FormattedMessage id={mainTitle} />
            </Typography>
            <Typography component='p' variant='body2'>
              <FormattedMessage id={mainMessage} />
            </Typography>
          </Grid>
          <Grid container spacing={2} justify='flex-end'>
            <Grid item className={classes.bottom}>
              <Link component={RouterLink} to={link} variant='body2'>
                <FormattedMessage
                  id={linkMessage}
                  defaultMessage='Connection'
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

RedirectedContent.propTypes = {
  mainTitle: PropTypes.string.isRequired,
  mainMessage: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkMessage: PropTypes.string.isRequired,
};
