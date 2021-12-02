import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../../assets/stylesheets/styles.css';
import './App.css'
import { default as HomeIndex } from '../../Pages/Home/Index.jsx';

function App(){
  return (
    <div>
      <h1 className="bg-bolor">
        <i className="fa fa-envelope-open" aria-hidden="true"></i>  
        Hello World From React-Rollup JSX???
      </h1>
      <div className="container">
        <HomeIndex />
      </div>
    </div>
  );
}

export default App;