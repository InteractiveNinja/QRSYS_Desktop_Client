import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
ReactDOM.render(
  <React.StrictMode>
    {process.env.REACT_APP_TITLE}
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
);

