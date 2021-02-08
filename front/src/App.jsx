import React, { useState, useEffect } from 'react';
import Sign from './components/Sign';
import Admin from './components/Admin';
import Collaborator from './components/Collaborator';
import AlreadyConnected from './components/AlreadyConnected';
import NotConnected from './components/NotConnected';
import Footer from './components/Footer';
import Header from './components/Header';
import NoMatch from './components/NoMatch';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import bgtheme from './themes/bgTheme';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AuthService from './services/AuthService';
import message_en from './lang/en.json';
import message_fr from './lang/fr.json';
import Profile from './components/Profile';
import SearchComplianceReferent from './components/SearchComplianceReferent';

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);
  const browserlanguage = navigator.language.split(/[-_]/)[0];
  const startLanguage =
    browserlanguage === ('fr' || 'en') ? browserlanguage : 'en';
  const [language, setLanguage] = useState(startLanguage);
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated
  );

  const messages = { en: message_en, fr: message_fr };

  useEffect(() => {
    const updateIsAuthenticated = () => {
      const result = AuthService.isAuthenticated();
      setIsAuthenticated(result);
    };
    updateIsAuthenticated();
  });

  function handleLanguage(lang) {
    setLanguage(lang);
  }

  function handleLogOut() {
    AuthService.logout();
  }

  function updateUser(userUpdated) {
    setCurrentUser(userUpdated);
  }

  return (
    <div>
      <BrowserRouter>
        <IntlProvider locale={language} messages={messages[language]}>
          <ThemeProvider theme={bgtheme}>
            <Header
              user={currentUser}
              logOut={() => handleLogOut()}
              changeLanguage={(lang) => handleLanguage(lang)}
              currentLanguage={language}
            />
            <Switch>
              <Route exact path={['/', '/login']}>
                {isAuthenticated ? (
                  <AlreadyConnected />
                ) : (
                  <Sign type='login' userLogged={(user) => updateUser(user)} />
                )}
              </Route>
              <Route exact path='/register'>
                {isAuthenticated ? (
                  <AlreadyConnected />
                ) : (
                  <Sign type='register' />
                )}
              </Route>
              <Route exact path='/collaborator'>
                {!isAuthenticated ? (
                  <NotConnected />
                ) : (
                  <Collaborator
                    user={currentUser}
                    updateUser={(user) => updateUser(user)}
                  />
                )}
              </Route>
              <Route exact path='/collaborator/profile'>
                {!isAuthenticated ? (
                  <NotConnected />
                ) : (
                  <Profile
                    user={currentUser}
                    updateUser={(user) => updateUser(user)}
                  />
                )}
              </Route>
              <Route exact path='/collaborator/searchlco'>
                {!isAuthenticated ? (
                  <NotConnected />
                ) : (
                  <SearchComplianceReferent user={currentUser} />
                )}
              </Route>
              <Route exact path='/admin'>
                <Admin user={currentUser} />
              </Route>
            </Switch>
            <Footer />
          </ThemeProvider>
        </IntlProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
