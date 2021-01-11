import React, { useState, useEffect } from 'react';
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
import RisksService from '../services/RisksService';
import ComplianceService from '../services/ComplianceService';
import CountriesService from '../services/CountriesService';
import OrgUnitService from '../services/OrgUnitService';
import AuthService from '../services/AuthService';

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
  responseCR: {
    marginTop: theme.spacing(5),
  },
  table: {
    minWidth: 650,
  },
}));

const ValidationSchema = Yup.object().shape({
  riskId: Yup.number().positive('not positive').required('required'),
  countryId: Yup.number().positive('not positive').required('required'),
  organisationUnitId: Yup.number()
    .positive('not positive')
    .required('required'),
});

export default function SearchComplianceOfficer() {
  const classes = useStyles();

  const currentUser = AuthService.getCurrentUser();
  let userCountry = '';
  let userOrganisationUnit = '';
  if (currentUser.accountHasProfile) {
    userCountry = currentUser.collaboratorInfo.countryId;
    console.log(typeof userCountry);
    userOrganisationUnit = parseInt(
      currentUser.collaboratorInfo.organisationUnitId
    );
  }

  const [myCR, setMyCR] = useState([]);
  const [risks, setRisks] = useState([]);
  const [countries, setCountries] = useState([]);
  const [organisationUnits, setOrganisationUnits] = useState([]);

  useEffect(() => {
    const fetchRisks = async () => {
      const result = await RisksService.getAll();
      setRisks(result);
    };
    const fetchCountries = async () => {
      const result = await CountriesService.getAll();
      setCountries(result);
    };
    const fetchOrgUnits = async () => {
      const orgUnits = await OrgUnitService.getAll();
      setOrganisationUnits(orgUnits);
    };
    fetchRisks();
    fetchCountries();
    fetchOrgUnits();
  }, []);

  return (
    <Container component='main' className={classes.main} maxWidth='md'>
      <Paper className={classes.paper}>
        <Grid container spacing={2} justify='center'>
          <Typography component='h1' variant='h3'>
            <FormattedMessage
              id='findMyCR'
              defaultMessage='Find my compliance referent'
            />
          </Typography>
        </Grid>
        <Formik
          initialValues={{
            riskId: '',
            countryId: userCountry,
            organisationUnitId: userOrganisationUnit,
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            setMyCR([]);
            ComplianceService.getMyCR(values)
              .then((response) => {
                setMyCR(response);
              })
              .catch((error) => {
                console.log(error);
              })
              .then(() => {
                setSubmitting(false);
              });
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
          }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
                direction='row'
                justify='space-evenly'
                alignItems='baseline'
              >
                {/* risk */}
                {/* risk */}
                {/* risk */}
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
                    id='riskId'
                    size='small'
                    select
                    label={<FormattedMessage id='Risk' defaultMessage='Risk' />}
                    name='riskId'
                    value={values.riskId}
                    onChange={handleChange}
                    error={touched.riskId && !!errors.riskId}
                    helperText={
                      touched.riskId &&
                      !!errors.riskId && (
                        <FormattedMessage
                          id={errors.riskId}
                          defaultMessage={errors.riskCode}
                        />
                      )
                    }
                  >
                    {risks.map((risk) => (
                      <MenuItem key={risk.id} value={risk.id}>
                        {
                          <FormattedMessage
                            id={risk.code}
                            defaultMessage={risk.label}
                          />
                        }
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {/* country */}
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
                      id='chooseYourCountry'
                      defaultMessage='Choose your country'
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
                    id='countryId'
                    size='small'
                    select
                    label={
                      <FormattedMessage id='country' defaultMessage='Country' />
                    }
                    name='countryId'
                    value={values.countryId}
                    onChange={handleChange}
                    error={touched.countryId && !!errors.countryId}
                    helperText={
                      touched.countryId &&
                      !!errors.countryId && (
                        <FormattedMessage
                          id={errors.countryId}
                          defaultMessage={errors.countryIso}
                        />
                      )
                    }
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {
                          <FormattedMessage
                            id={country.iso}
                            defaultMessage={country.name}
                          />
                        }
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {/* country */}
                {/* organisation unit */}
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
                      id='chooseYourOrgUnit'
                      defaultMessage='Choose your org.unit.'
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
                    id='organisationUnitId'
                    size='small'
                    select
                    label={
                      <FormattedMessage
                        id='Org.Unit.'
                        defaultMessage='Org.Unit.'
                      />
                    }
                    name='organisationUnitId'
                    value={values.organisationUnitId}
                    onChange={handleChange}
                    error={
                      touched.organisationUnitId && !!errors.organisationUnitId
                    }
                    helperText={
                      touched.organisationUnitId &&
                      !!errors.organisationUnitId && (
                        <FormattedMessage
                          id={errors.organisationUnitId}
                          defaultMessage={errors.organisationUnitId}
                        />
                      )
                    }
                  >
                    {organisationUnits.map((organisationUnit) => (
                      <MenuItem
                        key={organisationUnit.id}
                        value={organisationUnit.id}
                      >
                        {organisationUnit.code}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {/* country */}
                <Grid item xs={12}>
                  <Grid container justify='center'>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      disableElevation
                      className={classes.submit}
                    >
                      <FormattedMessage id='send' defaultMessage='Send' />
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
          className={classes.responseCR}
          container
          spacing={3}
          justify='center'
        >
          {myCR && myCR.length > 0 && (
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
                  {myCR.map((row, id) => (
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
