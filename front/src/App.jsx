import React, { useState } from 'react';
import Sign from './components/Sign';
import Admin from './components/Admin';
import Collaborator from './components/Collaborator';
import Footer from './components/Footer';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import bgtheme from './themes/bgTheme';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AuthService from './services/AuthService';
import message_en from './lang/en.json';
import message_fr from './lang/fr.json';

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);
  const browserlanguage = navigator.language.split(/[-_]/)[0];
  const startLanguage =
    browserlanguage === ('fr' || 'en') ? browserlanguage : 'en';
  const [language, setLanguage] = useState(startLanguage);

  const messages = { en: message_en, fr: message_fr };

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
                <Sign type='login' userLogged={(user) => updateUser(user)} />
              </Route>
              <Route path='/register'>
                <Sign type='register' />
              </Route>
              <Route path='/collaborator'>
                <Collaborator
                  user={currentUser}
                  updateUser={(user) => updateUser(user)}
                />
              </Route>
              <Route path='/admin'>
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
