import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LoginContextProvider } from './context/loginContext';
import { NavbarContextProvider } from './context/navbarContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginContextProvider>
        <NavbarContextProvider>
          <App />
        </NavbarContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
