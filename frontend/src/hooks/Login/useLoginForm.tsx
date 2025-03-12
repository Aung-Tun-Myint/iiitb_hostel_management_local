// src/hooks/Login/useLoginForm.ts
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../apis/login_backend';
import { LoginContext } from '../../context/loginContext';
import { toast } from 'react-toastify';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(LoginContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted");
    console.log("Email: ", email);
    console.log("Password ", password
    );
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      const email_id = email
      const response = await login({ email_id, password });
      
      if (response.success) {
        setIsLoggedIn(true);
        toast.success('Login successful');
        // Redirect to room-allotment as the home page
        navigate('/room-allotment'); 
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    isLoading,
    setEmail,
    setPassword,
    handleSubmit
  };
};