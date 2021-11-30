import React, { componentDidMount }from 'react';
import { Link, useParams } from 'react-router-dom';
import './Index.css'

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Bienvenido'
    }
  }

  componentDidMount = () => {    
    let email = new URLSearchParams(location.search).get('email');
    let user = location.pathname.split('/')[2];
    console.log(email)
    console.log(user)
    if(user !== undefined){
      this.setState({title: `${this.state.title} - ${user}`});
      console.log('IF')
    }else{
      this.setState({title: 'Bienvenido'})
    }
    document.title = this.state.title;
  };

  render() {
    return (
      <form className="form-signin" action="/login" method="post" id="login">
        <h1 className="h3 mb-3 font-weight-normal">{this.state.title}</h1>
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
          <Link to="/login/sign"><i className="fa fa-google" aria-hidden="true"></i> Error XD</Link>
          <Link to="/login/reset-password" className="pull-right">Olvidó su Contraseña</Link>
        </div>
        <p className="mt-5 mb-3 text-muted">Powered By <a href="http://softweb.pe/"> Softtware Web Perú</a> © 2017-2018</p>
      </form>
    );
  }
}
