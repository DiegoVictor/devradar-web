import React from 'react';
import { ToastContainer } from 'react-toastify';

import { Dashboard } from './pages/Dashboard';
import Theme from './styles/theme';

export function App() {
  return (
    <>
      <Theme />
      <ToastContainer />

      <Dashboard />
    </>
  );
}
