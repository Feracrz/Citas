import React, { Component } from 'react';
import '../Tables.css';
import firebaseConf from '../../../Firebase';
import ListComponent from './ListComponent';

class TablePachuca extends Component {
  constructor(){
    super();
    this.state = {
      nuevo: '',
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        },
      ]
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = [];
      snap.forEach((child) => {
        lista.push({
          nombre: child.val().nombre,
          apellidop: child.val().apellidop,
          apellidom: child.val().apellidom,
          colonia: child.val().colonia,
          email: child.val().email,
          fecha: child.val().fecha,
          hora: child.val().hora,
          municipio: child.val().municipio,
          rfc: child.val().rfc,
          status: child.val().status,
          done: child.val().done,
          folio: child.val().folio,
          sede: child.val().sede,
          id: child.key
        });
      });
      this.setState({
        lista: lista
      });
    });
  }

  componentDidMount() {
    const itemsRef = firebaseConf.database().ref('agenda-cita/pachuca');
    this.listenForItems(itemsRef);
  }

  update = (item) => {
    let updates = {};
    updates['agenda-cita/pachuca/' + item.id] = {
      status: "Atendido",
      nombre: item.nombre,
      apellidop: item.apellidop,
      apellidom: item.apellidom,
      colonia: item.colonia,
      email: item.email,
      fecha: item.fecha,
      hora: item.hora,
      municipio: item.municipio,
      rfc: item.rfc,
      sede: item.sede,
      folio: item.folio
    };
    firebaseConf.database().ref().update(updates);
  }

  render() {
    return (
      <div className="App" style={{height: '100vh'}}>
        <ListComponent
          lista={this.state.lista}
          update={this.update}
        />
      </div>
    );
  }
}

export default TablePachuca;
