import React from 'react';
import './App.css';
import SignUp from './Signup';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> My ConformityPal </h1>
      </header>
      <SignUp />
      <Footer />
    </div>
  );
}

export default App;
