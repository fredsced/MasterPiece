import React, { useState, Component } from 'react';
import AuthService from '../services/AuthService';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  main: {
    minHeight: 'calc(100vh - 110px)',
    paddingTop: theme.spacing(6),
    marginBottom: '10px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(6, 3),
  },
});
class Userprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      classes: useStyles,
    };
  }

  //const [currentUser, setCurrentUser] = useState({});
  //setCurrentUser(AuthService.getCurrentUser);
  render() {
    const { classes } = this.props;
    return (
      <Container component='main' className={classes.main} maxWidth='xs'>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='body2'>
            {`Hello ${this.state.currentUser.userEmail}`}
          </Typography>
        </Paper>
      </Container>
    );
  }
}
export default withStyles(useStyles, { whithTheme: true })(Userprofile);
