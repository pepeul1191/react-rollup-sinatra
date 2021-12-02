import React, { componentDidMount } from 'react';
import axios from 'axios';
import './UploadFile.css';
import random from '../../../helpers/random';

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFile: React.createRef(),
      inputFileId: null,
      validationMessage: '',
      validationMessageClass: '',
      url: 'upload',
      fileName: (props.fileName !== undefined) ? props.fileName : 'file',
      label: (props.label !== undefined) ? props.label : 'Seleccionar Archivo',
      urlFile: (props.urlFile !== undefined) ? props.urlFile : 'E',
      baseUrlFile: (props.baseUrlFile !== undefined) ? props.baseUrlFile : '/',
      table: (props.table !== undefined) ? props.table : false,
      valid: (props.valid !== undefined) ? props.valid : false,
      disabled: (props.disabled !== undefined) ? props.disabled : false,
      disabledUpload: (props.disabledUpload !== undefined) ? props.disabledUpload : true,
      disabledView: (props.disabledView !== undefined) ? props.disabledView : true,
      chooserButton: (props.chooserButton !== undefined) ? props.chooserButton : {
        label: 'Buscar', 
        icon: 'fa-search', 
        class: 'btn-primary'
      },
      uploadButton: (props.uploadButton !== undefined) ? props.uploadButton : {
        label: 'Subir', 
        icon: 'fa-upload', 
        class: 'btn-success'
      },
      viewButton: (props.viewButton !== undefined) ? props.viewButton : {
        label: 'Ver', 
        icon: 'fa-picture-o', 
        class: 'btn-secondary',
        display: 'true',
      },
      validationSize: (props.validationSize !== undefined) ? props.validationSize :{
        size: 3, // MB, (MB = B / 1024^2) ... https://www.to-convert.com/en/computer/convert-byte-to-mb.php
        message: 'Archivo del tamaño supera el máximo permitido'
      }, 
      validationExtension: (props.validationExtension !== undefined) ? props.validationExtension : {
        allowed: ['image/jpeg', 'image/png', 'image/jpg', ], 
        message: 'Extensión del archivo no es válida'
      }, 
    };
  }

  static defaultProps = {
    tableKeyURL: 'url',
    tableRecordId: null,
    tableRecordKey: null,
  };

  clearMessage = () => {
    this.setState({validationMessage: ''});
    this.setState({validationMessageClass: ''});
  };

  componentDidMount = () => {
    this.setState({inputFileId: random(20)})
    if(this.props.table){
      this.setState(state => (state.chooserButton.class = 'btn-upload-table', state));
      this.setState(state => (state.uploadButton.class = 'btn-upload-table', state));
      this.setState(state => (state.viewButton.class = 'btn-upload-table', state));
    }else{
      this.setState(state => (state.chooserButton.class = `btn ${this.state.chooserButton.class}`, state));
      this.setState(state => (state.uploadButton.class = `btn ${this.state.uploadButton.class}`, state));
      this.setState(state => (state.viewButton.class = `btn ${this.state.viewButton.class}`, state));
    }
  };

  selectFile = () => {
    document.getElementById(this.state.inputFileId).click();
  };

  onFileSelected = () => {
    let inputFile = document.getElementById(this.state.inputFileId).files[0];
    if((inputFile.size / Math.pow(1024,2)) < this.state.validationSize.size){
      if(this.state.validationExtension.allowed.includes(inputFile.type)){
        this.setState({disabledUpload: false});
        this.setState({validationMessageClass: ''});
        this.setState({validationMessage: ''});
      }else{
        console.error(`Archivo seleccionado no es de extensión ${this.state.validationExtension.allowed}`);
        if(this.state.table){
          /*launchAlert({
            message: validationExtension.message,
            type: 'danger',
            timeOut: 5000
          });*/
        }else{
          this.setState({validationMessage: this.state.validationExtension.message});
          this.setState({validationMessageClass: 'text-danger'});
          setTimeout(() => this.clearMessage(), 5000);
        }
        this.setState({valid: false});
        this.setState({disabledUpload: true});
      }
    }else{
      console.error(`Archivo seleccionado pesa ${(inputFile.size / Math.pow(1024,2)).toFixed(2)} MB, el máximo es ${this.state.validationSize.size} MB`);
      if(this.state.table){
        /*launchAlert({
          message: validationSize.message,
          type: 'danger',
          timeOut: 5000
        });*/
      }else{
        this.setState({validationMessage: this.state.validationSize.message});
        this.setState({validationMessageClass: 'text-danger'});
        setTimeout(() => this.clearMessage(), 5000);
      }
      this.setState({valid: false});
      this.setState({disabledUpload: true});
    }
  };

  uploadFile = () => {
    var formData = new FormData();
    formData.append(this.state.fileName, this.state.inputFile.current.files[0]);
    let _this = this;
    axios.post(`${this.state.url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      // handle success
      // console.log(response);
      _this.setState({urlFile: response.data});
      if(_this.state.table){
        /*launchAlert({
          message: 'Se cargó el archivo con éxito',
          type: 'success',
          timeOut: 5000
        });
        dispatch('fileUploaded', {
          urlFile: urlFile,
          key: tableKeyURL,
          tableRecordId: tableRecordId,
          tableRecordKey: tableRecordKey,
        });*/
      }else{
        _this.setState({validationMessage: 'Se cargó el archivo con éxito'});
        _this.setState({validationMessageClass: 'text-success'});
        setTimeout(() => _this.clearMessage(), 5000);
      }
      _this.setState({valid: true});
      _this.setState({disabledView: false});
    })
    .catch(function (error) {
      // handle error
      console.error(error);
      if(_this.state.table){
        /*launchAlert({
          message: 'Ocurrió un error en subir el archivo',
          type: 'danger',
          timeOut: 5000
        });*/
      }else{
        _this.setState({validationMessage: 'Ocurrió un error en subir el archivo'});
        _this.setState({validationMessageClass: 'text-danger'});
      }
      setTimeout(() => _this.clearMessage(), 5000);
      _this.setState({valid: false});
    });
  };
  
  render() {
    return (<>
      {!this.state.table && 
        <label htmlFor="file">{this.state.label}</label>
      }
      <div>
        <button className={this.state.chooserButton.class} onClick={this.selectFile} disabled={this.state.disabled} >
          <i className={`fa ${this.state.chooserButton.icon}`} aria-hidden="true"></i>{this.state.chooserButton.label}
        </button>
        <button className={this.state.uploadButton.class} onClick={this.uploadFile} disabled={this.state.disabled || this.state.disabledUpload} >
          <i className={`fa ${this.state.uploadButton.icon}`} aria-hidden="true"></i>{this.state.uploadButton.label} 
        </button>
        {this.state.viewButton.display && 
          <a className={this.state.viewButton.class} href={`${this.state.baseUrlFile}${this.state.urlFile}`} rel="noopener noreferrer" target="_blank" disabled={this.state.disabled || this.state.disabledView} >
            <i className={`fa ${this.state.viewButton.icon}`} aria-hidden="true"></i>{this.state.viewButton.label} 
          </a>
        }
      </div>
      <input type="file" id={this.state.inputFileId} ref={this.state.inputFile} onChange={this.onFileSelected} />
      {!this.state.table && 
        <div className="col-sm-12 validation-message">
          <small className={this.state.validationMessageClass}>
            {this.state.validationMessage}
          </small>
        </div>
      }
    </>)
  }
}


export default UploadFile;