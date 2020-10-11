import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { IntlProvider } from 'react-intl';
import message_en from './lang/en.json';
import message_fr from './lang/fr.json';
import './index.css';

const messages = { en: message_en, fr: message_fr };
const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <>
    <IntlProvider locale={language} messages={messages[language]}>
      <App className='app' />
    </IntlProvider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
