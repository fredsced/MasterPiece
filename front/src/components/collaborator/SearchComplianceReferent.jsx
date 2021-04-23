import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RisksService from '../../services/RisksService';
import ComplianceService from '../../services/ComplianceService';
import CountriesService from '../../services/CountriesService';
import OrgUnitService from '../../services/OrgUnitService';
import AuthService from '../../services/AuthService';
import ListComplianceReferents from '../ListComplianceReferents';
import RedirectedContent from '../RedirectedContent';
import BackLink from '../BackLink';
import handleRestApiError from '../../services/handleRestApiError';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from './../Alert';
import { Dialog } from '@material-ui/core';

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

export default function SearchComplianceReferent() {
  const classes = useStyles();

  const currentUser = AuthService.getCurrentUser();
  let userCountryId = '';
  let userOrganisationUnitId = '';
  if (currentUser.accountHasProfile) {
    userCountryId = currentUser.collaboratorInfo.countryId;
    userOrganisationUnitId = currentUser.collaboratorInfo.organisationUnitId;
  }

  const [myCR, setMyCR] = useState([]);
  const [risks, setRisks] = useState([]);
  const [countries, setCountries] = useState([]);
  const [organisationUnits, setOrganisationUnits] = useState([]);
  const [fetchingCountries, setFetchingCountries] = useState(true);
  const [fetchingOrgUnits, setFetchingOrgUnits] = useState(true);
  const [errorToFetch, setErrorToFetch] = useState(false);
  const [sent, SetSent] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [restApiError, setRestApiError] = useState({});

  useEffect(() => {
    const fetchRisks = () => {
      RisksService.getAll()
        .then((result) => {
          setRisks(result.data);
        })
        .catch((error) => {
          setErrorToFetch(true);
        });
    };
    const fetchCountries = () => {
      CountriesService.getAll()
        .then((result) => {
          setCountries(result.data);
        })
        .catch((error) => {
          setErrorToFetch(true);
        })
        .then(() => {
          setFetchingCountries(false);
        });
    };
    const fetchOrgUnits = () => {
      OrgUnitService.getAll()
        .then((result) => {
          setOrganisationUnits(result.data);
        })
        .catch((error) => {
          setErrorToFetch(true);
        })
        .then(() => {
          setFetchingOrgUnits(false);
        });
    };
    fetchRisks();
    fetchCountries();
    fetchOrgUnits();
  }, []);
  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleError = (error) => {
    const result = handleRestApiError(error);
    setRestApiError(result);
    setErrorOpen(true);
  };

  return (
    <>
      {errorToFetch ? (
        <RedirectedContent
          mainTitle='Connection issue'
          mainMessage='Sorry we cannot handle your request for the moment'
          link='/collaborator'
          linkMessage='backToCollaboratorPage'
        />
      ) : fetchingCountries || fetchingOrgUnits ? (
        <Container component='main' className={classes.main} maxWidth='sm'>
          <Backdrop
            className={classes.backdrop}
            open={fetchingCountries || fetchingOrgUnits}
          >
            <CircularProgress color='primary' />
          </Backdrop>
        </Container>
      ) : (
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
              enableReinitialize={true}
              initialValues={{
                riskId: '',
                countryId: userCountryId,
                organisationUnitId: userOrganisationUnitId,
              }}
              validationSchema={ValidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setMyCR([]);
                SetSent(false);
                ComplianceService.getMyCR(values)
                  .then((response) => {
                    setMyCR(response.data);
                  })
                  .catch((error) => {
                    handleError(error.response);
                  })
                  .then(() => {
                    setSubmitting(false);
                    SetSent(true);
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
                        label={
                          <FormattedMessage id='Risk' defaultMessage='Risk' />
                        }
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
                            <FormattedMessage
                              id={risk.code}
                              defaultMessage={risk.label}
                            />
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
                          <FormattedMessage
                            id='country'
                            defaultMessage='Country'
                          />
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
                          touched.organisationUnitId &&
                          !!errors.organisationUnitId
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
                    {/* submit */}
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
                        <Backdrop
                          className={classes.backdrop}
                          open={isSubmitting}
                        >
                          <CircularProgress color='primary' />
                        </Backdrop>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
            <Dialog open={errorOpen} onClose={handleErrorClose}>
              <Alert severity='error'>
                {restApiError.length > 0 ? (
                  restApiError.errorMessage
                ) : (
                  <FormattedMessage
                    id='Connection issue'
                    default='Connection issue'
                  ></FormattedMessage>
                )}
                <IconButton
                  size='small'
                  aria-label='close'
                  color='inherit'
                  onClick={handleErrorClose}
                >
                  <CloseIcon fontSize='small' />
                </IconButton>
              </Alert>
            </Dialog>
            <Grid
              className={classes.responseCR}
              container
              spacing={3}
              justify='center'
            >
              {myCR && myCR.length > 0 ? (
                <ListComplianceReferents myCR={myCR} />
              ) : sent ? (
                <FormattedMessage
                  id='NoComplianceFound'
                  default='Sorry, No compliance referent found with these criterias'
                ></FormattedMessage>
              ) : null}
            </Grid>
          </Paper>
          <BackLink
            path='/collaborator'
            title='back'
            defaultMessage='Back to previous page'
          />
        </Container>
      )}
    </>
  );
}
SearchComplianceReferent.propTypes = {
  user: PropTypes.object.isRequired,
};
