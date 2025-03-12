// src/components/containers/Login/LoginContainer.tsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginForm } from '../../../hooks/Login/useLoginForm';
import LoginPresentation from '../../presentation/Login/LoginPresentation';

const LoginContainer: React.FC = () => {
  const { 
    email, 
    password, 
    isLoading,
    setEmail, 
    setPassword, 
    handleSubmit 
  } = useLoginForm();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <LoginPresentation
        email={email}
        password={password}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleSubmit}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default LoginContainer;