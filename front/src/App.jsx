import React, { Component } from 'react';
import Sign from './components/Sign';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import bgtheme from './themes/bgTheme';
import { BrowserRouter } from 'react-router-dom';
import AuthService from './services/AuthService';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <BrowserRouter>
          <ThemeProvider theme={bgtheme}>
            <Header user={currentUser} logOut={() => this.logOut()} />
            <Switch>
              <Route exact path='/'>
                <Sign type='login' />
              </Route>
              <Route path='/register'>
                <Sign type='register' />
              </Route>
              <Route path='/profile'>
                <UserProfile />
              </Route>
            </Switch>
            <Footer />
          </ThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
