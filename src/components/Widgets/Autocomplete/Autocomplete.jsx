import React, { componentDidMount } from 'react';
import axios from 'axios';
import './Autocomplete.css';
import random from '../../../helpers/random';

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: (props.label !== undefined) ? props.label : 'Buscar por texto',
      placeholder: (props.placeholder !== undefined) ? props.placeholder : 'Ingrese Texto',
      value: (props.value !== undefined) ? props.value : null,
      valueId: (props.valueId !== undefined) ? props.valueId : null,
      url: (props.url !== undefined) ? props.url : '/search',
      queryParam: (props.queryParam !== undefined) ? props.queryParam : 'name',
      recordKey: (props.recordKey !== undefined) ? props.recordKey : 'id', // from server
      recordValue: (props.recordValue !== undefined) ? props.recordValue : 'name', // from server
      hintKey: (props.hintKey !== undefined) ? props.hintKey : 'id', // from client
      hintValue: (props.hintValue !== undefined) ? props.hintValue : 'name', // from client
      validationMessage: (props.validationMessage !== undefined) ? props.validationMessage : '',
      valid: (props.valid !== undefined) ? props.valid : false,
      notEmptyMessage: (props.notEmptyMessage !== undefined) ? props.notEmptyMessage : 'Debe de seleccionar un elemento',
      table: (props.table !== undefined) ? props.table : false,
      rowId: (props.rowId !== undefined) ? props.rowId : null,
      idKey: (props.idKey !== undefined) ? props.idKey : null,
      validationMessageClass: '',
      hints: [],
      displayHints: false,
      childHintActive: -1,
      root: React.createRef(),
      ul: React.createRef(),
    };
  }

  static defaultProps = {
  };

  componentDidMount = () => {
  };

  keyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        this.setState({hints: []});
        this.setState({displayHints: false});
        break;
      case 'ArrowUp':
        //console.log('arriba')
        if(this.state.childHintActive >= 1){
          if(this.state.childHintActive != -1){
            Array.from(this.state.ul.current.children)[this.state.childHintActive].classList.remove('hint-active');
          }
          Array.from(this.state.ul.current.children)[this.state.childHintActive].classList.add('hint-active');
          this.setState({childHintActive: this.state.childHintActive - 1});
        }else{
          Array.from(this.state.ul.current.children)[0].classList.remove('hint-active');
          Array.from(this.state.ul.current.children)[this.state.ul.current.childNodes.length - 1].classList.add('hint-active');
          this.setState({childHintActive: this.state.ul.current.childNodes.length - 1});
        }
        break;
      case 'ArrowDown':
        //console.log('abajo')
        if(this.state.childHintActive + 1 < Array.from(this.state.ul.current.children).length){
          if(this.state.childHintActive != -1){
            Array.from(this.state.ul.current.children)[this.state.childHintActive].classList.remove('hint-active');
          }
          Array.from(this.state.ul.current.children)[this.state.childHintActive + 1].classList.add('hint-active');
          this.setState({childHintActive: this.state.childHintActive + 1});
        }else{
          Array.from(this.state.ul.current.children)[this.state.ul.current.childNodes.length - 1].classList.remove('hint-active');
          Array.from(this.state.ul.current.children)[0].classList.add('hint-active');
          this.setState({childHintActive: 0});
        }
        break;
      case 'Enter':
        //console.log('enter');
        var li = this.state.ul.current.childNodes[this.state.childHintActive];
        this.setState({value: li.innerHTML});
        this.setState({valueId: li.getAttribute('hint-id')});
        this.setState({valid: true});
        this.setState({hints: []});
        this.setState({displayHints: false});
        // if in table, dispatch to table observer
        if(this.state.table){
          /*dispatch('autocompleteHintClick', {
            valueId: valueId,
            rowId: rowId,
            idKey: idKey,
          });*/
        }
        break;
      default:
        break;
    }
  };

  hintClick = (hintKeyP, hintValueP) => {
    //console.log(hintKeyP, hintValueP)
    this.setState({valueId:hintKeyP});
    this.setState({value:hintValueP});
    this.setState({valid:true});
    this.setState({hints:[]});
    this.setState({displayHints:false});
    // if in table, dispatch to table observer
    if(this.state.table){
      /*dispatch('autocompleteHintClick', {
        valueId: valueId,
        rowId: rowId,
        idKey: idKey,
      });*/
    }
  };

  search = (e) => {
    // update value
    this.setState({value: e.target.value});  
    // search
    this.state.validationMessage = '';
    this.state.validationMessageClass = '';
    if(e.target.value != ''){
      let _this = this;
      axios.get(`${_this.state.url}`, {
        params: {
          [_this.state.queryParam]: e.target.value
        }
      })
      .then(function (response) {
        _this.setState({displayHints: true});
        _this.setState({childHintActive: -1});
        _this.state.ul.current.setAttribute('style', `width: ${e.target.offsetWidth}px`)
        _this.setState({hints: []})
        if(response.data.length == 0){
          _this.setState({validationMessage: 'No se encontraron coincidencias'})
          _this.setState({validationMessageClass: 'text-warning'})
        }else{
          let hints = [];
          response.data.forEach(record => {
            hints.push({
              [_this.state.hintKey]: record[_this.state.recordKey],
              [_this.state.hintValue]: record[_this.state.recordValue],
            });
          });
          _this.setState({hints: hints});
          _this.setState({displayHints: true});
        }
      })
      .catch(function (error) {
        console.log(error);
        _this.setState({validationMessage: 'Ha ocurrido un erro en el servidor'});
        _this.setState({validationMessageClass: 'text-danger'});
      })
      .then(function () {
        // always executed
      });
    }else{
      //this.state.ul.classList.add('d-none');
      this.setState({hints: []})
      this.setState({displayHints: false})
    }
  };

  focusout = (e) => {
    //console.log('focusout');
  };
  
  render() {
    const hintKey = this.state.hintKey;
    const hintValue = this.state.hintValue;
    return (<>
      <div ref={this.state.root}>
        {!this.state.table && 
          <label className={`(${this.state.validationMessageClass} != 'text-warning') ? ${this.state.validationMessageClass} : ''`} htmlFor="">{this.state.label}</label>
        }
        <input 
          type="text" 
          className={`form-control ${this.state.table ? 'form-autocomplete-table' : ''} ${(this.state.validationMessageClass == 'text-danger') ? 'is-invalid' : ''}`} 
          placeholder={this.state.placeholder} 
          value={this.state.value == null ? '' : this.state.value} 
          onKeyDown={this.keyDown} 
          onChange={(e) => {this.search(e)}} 
          onBlur={this.focusout} 
        />
        <ul className={`hint-container ${this.state.displayHints ? '' : 'd-none'}`} ref={this.state.ul} >
          {this.state.hints.map((hint) => 
            <li key={random(20)} hint-id={hint[hintKey]} className="" onClick={() => this.hintClick(hint[hintKey], hint[hintValue])}>{hint[hintValue]}</li>
          )}
        </ul>
      </div>
    </>)
  }
}
