import React, { useEffect }from 'react';
import { Link } from 'react-router-dom';

import './Index.css'

export default function Index(){
  const title = 'Bienvenido';

  useEffect(() => {    
    document.title = title;
  });

  return (
    <form className="form-signin" action="/login" method="post" id="login">
      <h1 className="h3 mb-3 font-weight-normal">{title}</h1>
      <input type="hidden" name="key" value="value" />
      <span className="extraData"></span>
      {/* USER */}
      <label htmlFor="user" className="sr-only">User</label>
      <input type="text" id="user" className="form-control" placeholder="Usuario" required="" autoFocus="" name="user" />
      {/* CSRF */}

      {/* PASS */}
      <label htmlFor="inputPassword" className="sr-only">Password</label>
      <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña" required="" name="password" />
      {/* MESSAGE */}
      <p className="message" style={{ marginTop:"10px" }} id="message"></p>
      {/* BUTTON */}
      <button className="btn btn-lg btn-primary btn-block" type="submit" style={{marginBottom: "1.5px"}}>
        Ingresar
      </button>
      <button className="btn btn-lg btn-success btn-block" type="submit" disabled>
        <i className="fa fa-google" aria-hidden="true"></i>
        Ingresar con Google
      </button>
      {/* FooTER LOGIN NAV */}
      <div className="link-login">
        <Link to="/login/sign-in">Registrarse</Link>
        <Link to="/login/reset-password" className="pull-right">Olvidó su Contraseña</Link>
      </div>
      <p className="mt-5 mb-3 text-muted">Powered By <a href="http://softweb.pe/"> Softtware Web Perú</a> © 2017-2018</p>
    </form>
  );
}
