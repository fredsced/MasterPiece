import React from 'react';
import './App.css';
import Sign from './components/Sign';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Sign />
      <Footer />
    </div>
  );
}

export default App;
