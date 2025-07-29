import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
  const [page, setPage] = useState('login');

  return (
    page === 'login' ?
      <LoginPage onSwitchToRegister={() => setPage('register')} /> :
      <RegisterPage onSwitchToLogin={() => setPage('login')} />
  );
}

export default App;
