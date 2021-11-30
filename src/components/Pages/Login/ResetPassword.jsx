import React, { useEffect }from 'react';
import { Link } from 'react-router-dom';
import './ResetPassword.css'

export default function ResetPassword(){
  const title = 'Restablecer Contraseña';

  useEffect(() => {    
    document.title = title;
  });

  return (
    <form className="form-signin" action="/reset-password" method="post" id="reset-password">
      <h1 className="h3 mb-3 font-weight-normal">Recuperar Contraseña</h1>
      <input type="hidden" name="key" value="value" />
      <span className="extraData"></span>
      {/* EMAIL */}
      <label htmlFor="email" className="sr-only">email</label>
      <input type="text" id="email" className="form-control" placeholder="Correo" required="" name="email" />
      {/* CSRF */}

      {/* MESSAGE*/}
      <p className="message" style={{marginTop:"10px"}} id="message"></p>
      {/* BUTTON */}
      <button className="btn btn-lg btn-primary btn-block" type="submit" disabled>
        Enviar Solicitud
      </button>
      {/* FooTER LOGIN NAV */}
      <div className="link-login">
        <a className="" href="/login">
          Ingresar
        </a>
        <Link to="/">Ingresar</Link>
        <Link to="/sign-in" className="pull-right">Registrarse</Link>
      </div>
      <p className="mt-5 mb-3 text-muted">Powered By <a href="http://softweb.pe/"> Softtware Web Perú</a> © 2017-2018</p>
    </form>

  );
}
