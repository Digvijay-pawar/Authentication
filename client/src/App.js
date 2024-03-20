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
import { useEffect, useContext } from 'react';
import Recharge from './pages/Recharge';
import Withdrawal from './pages/Withdraw';
import My from './pages/My';
import Invite from './pages/Invite';
import { validateUser } from './api/AuthApi';
import Error from './pages/Error';

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

        const data = await validateUser();

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
        <Route path='/recharge' element={<Recharge/>}></Route>
        <Route path='/withdraw' element={<Withdrawal/>}></Route>
        <Route path='/my' element={<My/>}></Route>
        <Route path='/invite' element={<Invite/>}></Route>
        <Route path='/not-found' element={<Error/>}></Route>
      </Routes>
  );
}

export default App;
