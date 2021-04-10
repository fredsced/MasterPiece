import { createMuiTheme } from '@material-ui/core/styles';

const bgTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#444',
      light: '#ccc',
      light2: '#f9f9f9',
    },
    secondary: {
      main: '#ff0000',
    },
  },
  typography: {
    fontFamily: 'Inter,Roboto,sans-serif',
    h1: {
      fontSize: '1.4rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
      fontWeight: 900,
    },
    h3: {
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.1rem',
      '@media (min-width:600px)': {
        fontSize: '1.3rem',
      },
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: '0.7rem',
      fontWeight: 400,
      padding: 0,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.6rem',
      fontWeight: 400,
      padding: 0,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.9rem',
      fontWeight: 400,
      padding: 0,
      lineHeight: 1.5,
    },
  },
});

export default bgTheme;
