import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  backLink: {
    background: theme.palette.primary.main,
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
    color: 'snow',
    borderRadius: '3px',
    '&:hover': {
      background: theme.palette.primary.light2,
      color: theme.palette.primary.main,
    },
  },
}));

export default function BackLink({ path, title, defaultMessage }) {
  const classes = useStyles();
  return (
    <Grid container justify='flex-end'>
      <Grid item>
        <Link component={RouterLink} to={path} variant='body2'>
          <Typography variant='subtitle1' className={classes.backLink}>
            <FormattedMessage id={title} defaultMessage={defaultMessage} />
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
}
