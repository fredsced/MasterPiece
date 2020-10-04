import React, { useState } from 'react';
import Sign from './components/Sign';
import Admin from './components/Admin';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import bgtheme from './themes/bgTheme';
import { BrowserRouter } from 'react-router-dom';
import AuthService from './services/AuthService';

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);

  function handleLogOut() {
    AuthService.logout();
  }

  function handleUserLogged(user) {
    setCurrentUser(user);
  }

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={bgtheme}>
          <Header user={currentUser} logOut={() => handleLogOut()} />
          <Switch>
            <Route exact path={['/', '/login']}>
              <Sign
                type='login'
                userLogged={(user) => handleUserLogged(user)}
              />
            </Route>
            <Route path='/register'>
              <Sign type='register' />
            </Route>
            <Route path='/profile'>
              <UserProfile user={currentUser} />
            </Route>
            <Route path='/admin'>
              <Admin />
            </Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
