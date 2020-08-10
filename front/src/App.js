import React from 'react';
import Sign from './components/Sign';
import Footer from './components/Footer';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <>

      <Switch>
        <Route exact path='/'>
          <Header />
          <Sign />
        </Route>
        <Route path='/creation'>
          <Header />
          <Sign type='creation' />
        </Route>




      </Switch>

      <Footer />
    </>
  );
}

export default App;
