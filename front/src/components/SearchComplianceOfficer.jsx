import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Backdrop,
  CircularProgress,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CollaboratorService from '../services/CollaboratorService';

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
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: 220,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  responselco: {
    marginTop: theme.spacing(5),
  },
  table: {
    minWidth: 650,
  },
}));

const ValidationSchema = Yup.object().shape({
  riskCode: Yup.string().required('required'),
});

export default function SearchComplianceOfficer(props) {
  const classes = useStyles();

  const [myLco, setMyLco] = useState();

  const risks = [
    { code: 'CORR', label: 'Corruption' },
    { code: 'KYC', label: 'KYC' },
  ];

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
        <Formik
          initialValues={{ riskCode: '' }}
          validationSchema={ValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            setMyLco(null);
            CollaboratorService.getMyLco(values)
              .then((response) => {
                setMyLco(response);
              })
              .catch((error) => {
                console.log(error);
              })
              .then(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                direction='row'
                justify='space-evenly'
                alignItems='baseline'
              >
                <Grid
                  item
                  container
                  xs={12}
                  sm={6}
                  justify='center'
                  alignItems='baseline'
                >
                  <Typography component='p' variant='body1'>
                    <FormattedMessage
                      id='chooseRiskScope'
                      defaultMessage='Choose the risk scope'
                    />
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  sm={6}
                  alignItems='baseline'
                  justify='center'
                >
                  <TextField
                    variant='standard'
                    id='riskCode'
                    size='small'
                    select
                    label={<FormattedMessage id='Risk' defaultMessage='Risk' />}
                    name='riskCode'
                    value={values.riskCode}
                    onChange={handleChange}
                    error={!!errors.riskCode}
                    helperText={
                      !!errors.riskCode && (
                        <FormattedMessage
                          id={errors.riskCode}
                          defaultMessage={errors.riskCode}
                        />
                      )
                    }
                  >
                    {risks.map((risk) => (
                      <MenuItem key={risk.code} value={risk.code}>
                        {
                          <FormattedMessage
                            id={risk.label}
                            defaultMessage={risk.label}
                          />
                        }
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify='center'>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      disableElevation
                      className={classes.submit}
                    >
                      <FormattedMessage
                        id='send'
                        defaultMessage='Send'
                      ></FormattedMessage>
                    </Button>
                    <Backdrop className={classes.backdrop} open={isSubmitting}>
                      <CircularProgress color='primary' />
                    </Backdrop>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
        <Grid
          className={classes.responselco}
          container
          spacing={3}
          justify='center'
        >
          {myLco && (
            <TableContainer>
              <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>
                      <FormattedMessage
                        id='firstname'
                        defaultMessage='Firstname'
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <FormattedMessage
                        id='lastname'
                        defaultMessage='Lastname'
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <FormattedMessage id='country' defaultMessage='Country' />
                    </TableCell>
                    <TableCell align='center'>
                      <FormattedMessage
                        id='Org.Unit.'
                        defaultMessage='Org.Unit.'
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <FormattedMessage id='Risk' defaultMessage='Risk' />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myLco.map((row, id) => (
                    <TableRow key={id}>
                      <TableCell key={row.firstname + id} align='center'>
                        {row.firstname}
                      </TableCell>
                      <TableCell key={row.lastname + id} align='center'>
                        {row.lastname}
                      </TableCell>
                      <TableCell key={row.country + id} align='center'>
                        {row.country}
                      </TableCell>
                      <TableCell key={row.buCode + id} align='center'>
                        {row.buCode}
                      </TableCell>
                      <TableCell key={row.riskCode + id} align='center'>
                        {
                          <FormattedMessage
                            id={row.riskCode}
                            defaultMessage={row.riskCode}
                          />
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}
