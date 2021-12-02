import React from 'react';
import UploadFile from '../../Widgets/UploadFile/UploadFile.jsx';
import './Index.css'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <UploadFile 
              label='Selecionar Foto'
              validationSize={{
                size: 0.2, 
                message: 'Archivo del tamaño supera el máximo permitido :('
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
