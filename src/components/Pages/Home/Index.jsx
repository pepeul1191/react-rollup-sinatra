import React from 'react';
import Autcomplete from '../../Widgets/Autocomplete/Autocomplete.jsx';
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
        <div className="col-md-4">
          <div className="form-group">
            <Autcomplete 
              url={`${BASE_URL}district/search`}
            />
          </div>
        </div>
      </div>
    );
  }
}
