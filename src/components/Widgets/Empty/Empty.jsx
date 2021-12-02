import React, { componentDidMount } from 'react';
import axios from 'axios';
import './Empty.css';

export default class Empty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static defaultProps = {
  };

  componentDidMount = () => {
  };
  
  render() {
    return (<>
      <div>
        {!this.state.table && 
          <label class="{(validationMessageClass != 'text-warning') ? validationMessageClass : ''}" htmlFor="">{this.state.label}</label>
        }
      </div>
    </>)
  }
}
