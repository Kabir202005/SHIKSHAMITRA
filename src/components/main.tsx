import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';         // Import the main App component
import './index.css';                // Global CSS

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
