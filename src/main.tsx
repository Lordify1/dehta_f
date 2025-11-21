import { StrictMode } from 'react'
import '../css/app.css';
import React, {lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import LoaderWrapper from './components/LoaderWrapper';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { OffCanvasProvider } from './context/OffCanvasContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { UIProvider } from './context/UIContext';
import { FetchProvider } from './context/FetchContext';
import { MiscProvider } from './context/MiscContext';
import FaecesRouter from './routes/router';
import axios from 'axios';
import {WebProviders} from './lib/WebProviders.jsx';
// Import your pages explicitly


export const appName = import.meta.env.VITE_APP_NAME || 'Dehta';
export const advisorName = "Dehta";
export const appUrl = import.meta.env.VITE_APP_URL || "http://localhost/dehta/public";
// export const appUrl = import.meta.env.VITE_APP_URL || "https://dehta.tech"
export const advisorUrl = import.meta.env.VITE_APP_URL || 'http://localhost/dehta/public';
// export const advisorUrl = import.meta.env.VITE_ADVISOR_URL || "https://dehta.tech";
export const date = (): number => { return new Date().getFullYear() }
export const wc_projectId = import.meta.env.VITE_PROJECT_ID_WC;
export const saleWallet = import.meta.env.VITE_SALE_WALLET;

const App = () => {

  const [user, setUser] = useState([]);

  const getUser = async () => {
    const res = await axios.post(`${advisorUrl}/user`)
    setUser(res?.data)
    // console.log(res?.data)
  }
   
  useEffect(() => {
    getUser()
  },[])


  setInterval(() => {
    localStorage.removeItem('fa_user')
  }, 100000);


  return (
    <AuthProvider auth={user}>
      <MiscProvider>
      <WebProviders>
      <UserProvider>
      <UIProvider>
      <FetchProvider>
        <OffCanvasProvider>
          <FaecesRouter/>
        </OffCanvasProvider>
      </FetchProvider>
      </UIProvider>
      </UserProvider>
      </WebProviders>
      </MiscProvider>
    </AuthProvider>
  );
};

// Initialize the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// This will set light / dark mode on load...
initializeTheme();