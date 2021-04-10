import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/logo.svg';
import logoPhone from '../assets/logo_phone.svg';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  header: {
    height: '60px',
    color: theme.palette.primary.main,
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0px 5px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '936px',
    },
    borderBottom: `1px solid ${theme.palette.primary.light}`,
  },
  logo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      width: '150px',
      marginBottom: theme.spacing(4),
    },
  },
  logoPhone: {
    display: 'block',
    width: '40px',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  service: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  accountIcon: {
    color: theme.palette.primary.main,
    fontSize: '1.75rem',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
  logout: {
    background: theme.palette.primary.main,
    textTransform: 'none',
    padding: theme.spacing(0, 1),
    border: `1px solid ${theme.palette.primary.main}`,
    color: 'snow',
    borderRadius: '3px',
    '&:hover': {
      background: theme.palette.primary.light2,
      color: theme.palette.primary.main,
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const user = props.user;
  const handleSelectLanguage = (event) => {
    props.changeLanguage(event.target.value);
  };

  return (
    <header className={classes.header}>
      <Box display='flex' pt={2}>
        <Box flexGrow={0}>
          <div className={classes.logo}>
            <img src={logo} alt='logo Banque Générale' />
          </div>
          <div className={classes.logoPhone}>
            <img src={logoPhone} alt='logo Banque Générale' />
          </div>
        </Box>
        <Box flexGrow={1} pl={6} pt={1}>
          {' '}
          {user && user.isAdmin ? (
            <Typography variant='p'>Admin</Typography>
          ) : null}
        </Box>
        {user && user.accountEmail ? (
          <>
            <Box pr={1}>
              <Link
                to={{
                  pathname: '/collaborator/profile',
                }}
                variant='body2'
              >
                <AccountCircleIcon className={classes.accountIcon} />
              </Link>
            </Box>
            <Box pr={6}>
              <Box>
                <Typography variant='subtitle1'>{user.accountEmail}</Typography>
              </Box>
              <Box>
                <Typography variant='subtitle1'>
                  <a
                    className={classes.logout}
                    href='/login'
                    onClick={() => props.logOut()}
                  >
                    <FormattedMessage id='logout' defaultMessage='Log out' />
                  </a>
                </Typography>
              </Box>
            </Box>
          </>
        ) : null}
        <Box className={classes.service}>
          <Box>
            <Typography variant='subtitle2'>
              {process.env.REACT_APP_COMPANY_SERVICE_NAME}
            </Typography>
          </Box>
          <Box>
            <Typography variant='subtitle1'>
              {process.env.REACT_APP_WEBSITE_NAME}
            </Typography>
          </Box>
        </Box>
        <Box ml={2} mt={1}>
          <select
            onChange={handleSelectLanguage}
            defaultValue={props.currentLanguage}
          >
            {['en', 'fr'].map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </Box>
      </Box>
    </header>
  );
}
Header.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
};
