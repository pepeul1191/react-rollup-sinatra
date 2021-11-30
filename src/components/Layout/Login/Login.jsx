import React, { useEffect }from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../../assets/stylesheets/styles.css';
import '../../../assets/stylesheets/login.css';
import './Login.css'
import Index from '../../Pages/Login/Index.jsx'
import ResetPassword from '../../Pages/Login/ResetPassword.jsx';
import SignIn from '../../Pages/Login/SignIn.jsx';
import Redirect404 from '../../Pages/Error/Redirect404.jsx';

export default function Login(){
  const title = 'Bienvenido';

  useEffect(() => {    
    document.title = title;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/:user" element={<Index />} />
        <Route path="/login" element={<Index />} />
        <Route path="/login/sign-in" element={<SignIn />} />
        <Route path="/login/reset-password" element={<ResetPassword />} />
        {/*<Route path="*" element={<Redirect404 />} />*/}
      </Routes>
    </BrowserRouter>
  );
}
