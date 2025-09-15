import React, { useState } from 'react';
import { LoginPage } from './login-Page';
import { Dashboard } from './Dashboard';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}
