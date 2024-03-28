import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './sidebar-02/sidebar';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Sidebar />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
