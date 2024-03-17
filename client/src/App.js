import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import { LoginContext } from './context/LoginContext';
import { useState, useEffect, useContext } from 'react';

function App() {
  const { setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const HomeValid = async () => {
      try {
        let token = localStorage.getItem("usersdatatoken");
        if (!token) {
          throw new Error("No token found");
        }

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/valid-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        });

        if (!res.ok) {
          throw new Error("Failed to verify user");
        }

        const data = await res.json();

        if (data.validUser) {
          setLoginData(data);
          navigate("/home");
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Error validating user:", error);
        navigate('/');
      }
    };

    // Run HomeValid only once when the component mounts
    HomeValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/home' element={<Home />} />
      </Routes>
  );
}

export default App;
