import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { applyTheme, getStoredTheme } from './lib/theme.js';
import App from './App.jsx';
import './styles/globals.css';

applyTheme(getStoredTheme());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
