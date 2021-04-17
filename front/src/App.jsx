import React, { useState, useEffect } from 'react';
import Sign from './components/Sign';
import Admin from './components/admin/Admin';
import ManageCaches from './components/admin/ManageCaches';
import CreateComplianceReferent from './components/admin/CreateComplianceReferent';
import Collaborator from './components/collaborator/Collaborator';
import RedirectedContent from './components/RedirectedContent';
import Footer from './components/Footer';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import bgtheme from './theme/bgTheme';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AuthService from './services/AuthService';
import message_en from './lang/en.json';
import message_fr from './lang/fr.json';
import Profile from './components/collaborator/Profile';
import SearchComplianceReferent from './components/collaborator/SearchComplianceReferent';

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
                  <RedirectedContent
                    mainTitle='alreadyConnected'
                    mainMessage='alreadyConnectedMessage'
                    link='/collaborator'
                    linkMessage='backToCollaboratorPage'
                  />
                ) : (
                  <Sign type='login' userLogged={(user) => updateUser(user)} />
                )}
              </Route>
              <Route exact path='/register'>
                {isAuthenticated ? (
                  <RedirectedContent
                    mainTitle='alreadyConnected'
                    mainMessage='alreadyConnectedMessage'
                    link='/collaborator'
                    linkMessage='backToCollaboratorPage'
                  />
                ) : (
                  <Sign type='register' />
                )}
              </Route>
              <Route exact path='/collaborator'>
                {!isAuthenticated ? (
                  <RedirectedContent
                    mainTitle='notConnected'
                    mainMessage='notConnectedMessage'
                    link='/login'
                    linkMessage='backToAuthentification'
                  />
                ) : (
                  <Collaborator user={currentUser} />
                )}
              </Route>
              <Route exact path='/collaborator/profile'>
                {!isAuthenticated ? (
                  <RedirectedContent
                    mainTitle='notConnected'
                    mainMessage='notConnectedMessage'
                    link='/login'
                    linkMessage='backToAuthentification'
                  />
                ) : (
                  <Profile user={currentUser} />
                )}
              </Route>
              <Route exact path='/collaborator/search-referent'>
                {!isAuthenticated ? (
                  <RedirectedContent
                    mainTitle='notConnected'
                    mainMessage='notConnectedMessage'
                    link='/login'
                    linkMessage='backToAuthentification'
                  />
                ) : (
                  <SearchComplianceReferent user={currentUser} />
                )}
              </Route>
              <Route exact path='/admin'>
                {!isAuthenticated ? (
                  <RedirectedContent
                    mainTitle='notConnected'
                    mainMessage='notConnectedMessage'
                    link='/login'
                    linkMessage='backToAuthentification'
                  />
                ) : (
                  <Admin user={currentUser} />
                )}
              </Route>
              <Route exact path='/admin/manage-caches'>
                {!isAuthenticated ? (
                  <RedirectedContent
                    mainTitle='notConnected'
                    mainMessage='notConnectedMessage'
                    link='/login'
                    linkMessage='backToAuthentification'
                  />
                ) : (
                  <ManageCaches user={currentUser} />
                )}
              </Route>
              <Route exact path='/admin/create-compliance-referent'>
                {!isAuthenticated ? (
                  <RedirectedContent
                    mainTitle='notConnected'
                    mainMessage='notConnectedMessage'
                    link='/login'
                    linkMessage='backToAuthentification'
                  />
                ) : (
                  <CreateComplianceReferent user={currentUser} />
                )}
              </Route>
              <Route path='*'>
                <RedirectedContent
                  mainTitle='notFound'
                  mainMessage='noPageFound'
                  link='/'
                  linkMessage='backTohomePage'
                />
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
