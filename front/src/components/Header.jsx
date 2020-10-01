import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.svg';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  header: {
    height: '60px',
    color: theme,
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0px 5px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '960px',
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
  service: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  accountIcon: {
    color: theme.palette.primary.main,
    fontSize: '1.75rem',
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const user = props.user;

  return (
    <header className={classes.header}>
      <Box display='flex' pt={2}>
        <Box flexGrow={1}>
          <div className={classes.logo}>
            <img src={logo} alt='logo Banque Générale' />
          </div>
        </Box>

        {user && user.userEmail ? (
          <>
            <Box pr={1}>
              <AccountCircleIcon className={classes.accountIcon} />
            </Box>
            <Box pr={6}>
              <Box>
                <Typography variant='subtitle1'>
                  {user && user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.userEmail}
                </Typography>
              </Box>
              <Box>
                <Typography variant='subtitle1'>
                  <a href='/' onClick={props.logOut()}>
                    Déconnexion
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
      </Box>
    </header>
  );
}
