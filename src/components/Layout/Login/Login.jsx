import React, { useEffect }from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../../assets/stylesheets/styles.css';
import '../../../assets/stylesheets/login.css';
import './Login.css'


function Login(){
  useEffect(() => {    
    document.title = `Bienvenido`;
  });

  return (
    <form className="form-signin" action="/login" method="post" id="login">
      <h1 className="h3 mb-3 font-weight-normal">Bienvenido</h1>
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
        <a className="" href="/login/sign-in">
          Registrarse
        </a>
        <a id="forgotpassword" className="pull-right" href="/login/reset-password" >
          Olvidó su Contraseña
        </a>
      </div>
      <p className="mt-5 mb-3 text-muted">Powered By <a href="http://softweb.pe/"> Softtware Web Perú</a> © 2017-2018</p>
    </form>

  );
}

export default Login;