import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { ToastContainer } from 'react-toastify';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/main.scss';

ReactDOM.render(
  <>
    <ToastContainer />
    <App />
  </>,
  document.getElementById('root')
);
