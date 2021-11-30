import React, { componentDidMount }from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css'

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Crear Cuenta',
      user: '', 
      email: ''
    }
  }

  componentDidMount = () => {    
    document.title = this.state.title;
  };

  userChange = (e) => {
    this.setState({user: e.target.value});  
  };
  
  emailChange = (e) => {
    this.setState({email: e.target.value});  
  };

  render() {
    return (
      <form className="form-signin" action="/login/create-account" method="post" id="sign-in">
        <h1 className="h3 mb-3 font-weight-normal">{this.state.title}</h1>
        <input type="hidden" name="key" value="value" />
        <span className="extraData"></span>
        {/* USER */}
        <label htmlFor="user" className="sr-only">User</label>
        <input type="text" id="user" className="form-control" placeholder="Usuario" value={this.state.user} onChange={this.userChange}  required="" autoFocus=""  name="user" />
        {/* EMAIL */}
        <label htmlFor="email" className="sr-only">email</label>
        <input type="email" id="email" className="form-control" placeholder="Correo" value={this.state.email} onChange={this.emailChange}  required="" name="email" />
        {/* CSRF */}

        {/* PASS */}
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Contraseña" required=""  name="password" />
        {/* PASS */}
        <label htmlFor="inputPassword2" className="sr-only">Password</label>
        <input type="password" id="inputPassword2" className="form-control" placeholder="Repetir Contraseña"  required="" name="password2" />
        {/* MESSAGE*/}
        <p className="message" style={{marginTop:"10px"}} id="message"></p>
        {/* BUTTON */}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Crear Usuario
        </button>
        {/* FooTER LOGIN NAV */}
        <div className="link-login">
          { this.state.email && this.state.user ? (
            <Link to={`/login/${this.state.user}?email=${this.state.email}`}>Ingresar</Link> 
          ) : (
            <Link to='/login' >Ingresar</Link> 
          )}
          <Link to="/login/reset-password" className="pull-right">Olvidó su Contraseña</Link>
        </div>
        <p className="mt-5 mb-3 text-muted">Powered By <a href="http://softweb.pe/"> Softtware Web Perú</a> © 2017-2018</p>
      </form>
    );
  }
}
