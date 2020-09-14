import React from 'react';
import Sign from './components/Sign';
import Footer from './components/Footer';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import bgtheme from './themes/bgTheme';


export default function App() {
  const fakeUser = {
    email: 'sylvie.martin@banquegen.com',
  }
  const noUser = {
  }
  return (
    <div>
      <ThemeProvider theme={bgtheme}>
        <Header user={fakeUser}/>
        <Switch>
          <Route exact path='/'> 
            <Sign/>
          </Route>
          <Route path='/signup'>
            <Sign type='signup' />
          </Route>
        </Switch>
        <Footer />
        
      </ThemeProvider>
    </div>
  );
}
